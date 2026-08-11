import mongoose from 'mongoose';
import { User, Bus, Route, Stop, Trip, Incident, Alert, SocMetric, AiInsight, AuditLog } from '../models/index.js';

const LOCAL_URI = 'mongodb://127.0.0.1:27017/smarttransit_os';

async function inspectLocalDatabase() {
  console.log('==============================================');
  console.log('STEP 1 — LOCAL MONGODB BASELINE INSPECTION');
  console.log('==============================================\n');

  try {
    await mongoose.connect(LOCAL_URI);
    const db = mongoose.connection.db;

    console.log(`[Database Connection] Connected to: ${LOCAL_URI}`);
    console.log(`[Database Name] ${db.databaseName}\n`);

    // 1. Document Counts
    const models = [
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

    console.log('--- 1. COLLECTION DOCUMENT COUNTS ---');
    const counts = {};
    for (const item of models) {
      const count = await item.model.countDocuments();
      counts[item.collection] = count;
      console.log(`- ${item.collection.padEnd(15)}: ${count} documents`);
    }

    // 2. Indexes per Collection
    console.log('\n--- 2. COLLECTION INDEXES ---');
    for (const item of models) {
      const indexes = await item.model.collection.indexes();
      const indexNames = indexes.map((idx) => Object.keys(idx.key).join('+')).join(', ');
      console.log(`- ${item.collection.padEnd(15)}: [${indexNames}]`);
    }

    // 3. Entity Reference Integrity
    console.log('\n--- 3. IMPORTANT ENTITY REFERENCES ---');
    const bus245 = await Bus.findOne({ busNumber: 'Bus 245' }).populate('routeId').populate('driverId');
    if (bus245) {
      console.log(`- Bus 245 -> Route: ${bus245.routeId?.routeCode || 'N/A'} (${bus245.routeId?.routeName || 'N/A'}), Driver: ${bus245.driverId?.name || 'N/A'} (${bus245.driverId?.driverProfile?.badgeId || 'N/A'})`);
    }

    const bus504 = await Bus.findOne({ busNumber: 'Bus 504' }).populate('routeId');
    if (bus504) console.log(`- Bus 504 -> Route: ${bus504.routeId?.routeCode || 'N/A'} (${bus504.routeId?.routeName || 'N/A'})`);

    const bus312 = await Bus.findOne({ busNumber: 'Bus 312' }).populate('routeId');
    if (bus312) console.log(`- Bus 312 -> Route: ${bus312.routeId?.routeCode || 'N/A'} (${bus312.routeId?.routeName || 'N/A'})`);

    const bus118 = await Bus.findOne({ busNumber: 'Bus 118' }).populate('routeId');
    if (bus118) console.log(`- Bus 118 -> Route: ${bus118.routeId?.routeCode || 'N/A'} (${bus118.routeId?.routeName || 'N/A'})`);

    // 4. Password Security
    console.log('\n--- 4. PASSWORD SECURITY AUDIT ---');
    const allUsers = await User.find({}, { passwordHash: 1 });
    const nonBcrypt = allUsers.filter((u) => !u.passwordHash || !u.passwordHash.startsWith('$2a$') && !u.passwordHash.startsWith('$2b$'));
    console.log(`- Total User Accounts: ${allUsers.length}`);
    console.log(`- Bcrypt Hashed Passwords: ${allUsers.length - nonBcrypt.length}`);
    console.log(`- Plaintext Passwords: ${nonBcrypt.length}`);

    await mongoose.disconnect();
    console.log('\n[Baseline Inspection Complete]');
  } catch (err) {
    console.error('Inspection failed:', err);
    process.exit(1);
  }
}

inspectLocalDatabase();
