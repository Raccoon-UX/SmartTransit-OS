import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

import mongoose from 'mongoose';
import { User, Bus, Route, Stop, Trip, Incident, Alert, SocMetric, AiInsight, AuditLog } from '../models/index.js';
import config from '../config/env.js';

const LOCAL_URI = 'mongodb://127.0.0.1:27017/smarttransit_os';
const TARGET_ATLAS_URI = process.env.MONGODB_ATLAS_URI || config.mongodbUri;

const MODELS = [
  { name: 'User', model: User, collection: 'users' },
  { name: 'Route', model: Route, collection: 'routes' },
  { name: 'Stop', model: Stop, collection: 'stops' },
  { name: 'Bus', model: Bus, collection: 'buses' },
  { name: 'Trip', model: Trip, collection: 'trips' },
  { name: 'Incident', model: Incident, collection: 'incidents' },
  { name: 'Alert', model: Alert, collection: 'alerts' },
  { name: 'SocMetric', model: SocMetric, collection: 'soc_metrics' },
  { name: 'AiInsight', model: AiInsight, collection: 'ai_insights' },
  { name: 'AuditLog', model: AuditLog, collection: 'audit_logs' },
];

async function runMigration() {
  console.log('====================================================');
  console.log('SMARTTRANSIT OS — LOCAL TO MONGODB ATLAS MIGRATION');
  console.log('====================================================\n');

  if (!TARGET_ATLAS_URI || TARGET_ATLAS_URI.includes('127.0.0.1') || TARGET_ATLAS_URI.includes('localhost')) {
    console.warn('[Configuration Check]');
    console.warn('Target MONGODB_URI is currently pointing to local MongoDB.');
    console.warn('To migrate to Atlas, provide your MongoDB Atlas connection string in server/.env:');
    console.warn('MONGODB_URI=mongodb+srv://<DB_USER>:<DB_PASSWORD>@<CLUSTER>.mongodb.net/smarttransit_os?retryWrites=true&w=majority\n');
    return { status: 'CONFIG_REQUIRED', message: 'Atlas connection string needed in server/.env' };
  }

  // Sanitize URI for safe logging (no credentials displayed)
  const sanitizedUri = TARGET_ATLAS_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
  console.log(`[Target Atlas Destination] ${sanitizedUri}`);

  let localConnection = null;
  let atlasConnection = null;

  try {
    // 1. Connect to Local MongoDB and Export Current State
    console.log('\n[1/5 Reading Local MongoDB Source]');
    localConnection = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log(`- Connected to local database: ${localConnection.name}`);

    const exportedData = {};
    for (const item of MODELS) {
      const localColl = localConnection.collection(item.collection);
      const docs = await localColl.find({}).toArray();
      exportedData[item.collection] = docs;
      console.log(`  ✓ Exported ${item.collection.padEnd(15)}: ${docs.length} documents`);
    }

    // 2. Connect to Target MongoDB Atlas Cluster
    console.log('\n[2/5 Connecting to MongoDB Atlas]');
    atlasConnection = await mongoose.createConnection(TARGET_ATLAS_URI).asPromise();
    console.log(`- Connected to Atlas database: ${atlasConnection.name}`);

    // 3. Safe Upsert / Import preserving ObjectIds and timestamps
    console.log('\n[3/5 Migrating Documents to Atlas (Safe Upsert)]');
    for (const item of MODELS) {
      const docs = exportedData[item.collection];
      if (docs.length === 0) continue;

      const atlasColl = atlasConnection.collection(item.collection);
      const operations = docs.map((doc) => ({
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: doc },
          upsert: true,
        },
      }));

      const result = await atlasColl.bulkWrite(operations);
      console.log(`  ✓ Migrated ${item.collection.padEnd(15)}: ${result.upsertedCount + result.modifiedCount + result.matchedCount} records processed`);
    }

    // 4. Ensure Mongoose Schema Indexes on Atlas
    console.log('\n[4/5 Synchronizing Schema Indexes on Atlas]');
    for (const item of MODELS) {
      const ModelOnAtlas = atlasConnection.model(item.name, item.model.schema);
      await ModelOnAtlas.createIndexes();
      const atlasIndexes = await ModelOnAtlas.collection.indexes();
      const indexSummary = atlasIndexes.map((idx) => Object.keys(idx.key).join('+')).join(', ');
      console.log(`  ✓ Indexes for ${item.collection.padEnd(15)}: [${indexSummary}]`);
    }

    // 5. Verify Document Counts Local vs Atlas
    console.log('\n[5/5 Verifying Document Counts & Entity References]');
    let allMatched = true;
    for (const item of MODELS) {
      const localCount = exportedData[item.collection].length;
      const atlasColl = atlasConnection.collection(item.collection);
      const atlasCount = await atlasColl.countDocuments();
      const match = localCount === atlasCount;
      if (!match) allMatched = false;
      console.log(`  ${match ? '✓' : '✗'} ${item.collection.padEnd(15)} -> Local: ${localCount}, Atlas: ${atlasCount} (${match ? 'MATCH' : 'MISMATCH'})`);
    }

    // Verify key relationships on Atlas
    const BusOnAtlas = atlasConnection.model('Bus', Bus.schema);
    const bus245 = await BusOnAtlas.findOne({ busNumber: 'Bus 245' }).populate('routeId').populate('driverId');
    if (bus245) {
      console.log(`\n- Verified Bus 245 on Atlas: Route=${bus245.routeId?.routeCode || 'N/A'}, Driver=${bus245.driverId?.name || 'N/A'}`);
    }

    console.log('\n====================================================');
    console.log(`MIGRATION STATUS: ${allMatched ? 'SUCCESSFULLY COMPLETED' : 'WARNING DETECTED'}`);
    console.log('====================================================\n');

    await localConnection.close();
    await atlasConnection.close();
    return { status: 'SUCCESS', allMatched };
  } catch (err) {
    console.error('\nMigration execution error:', err.message);
    if (localConnection) await localConnection.close().catch(() => {});
    if (atlasConnection) await atlasConnection.close().catch(() => {});
    return { status: 'ERROR', error: err.message };
  }
}

// Execute migration
runMigration().then((res) => {
  if (res.status === 'ERROR') process.exit(1);
});
