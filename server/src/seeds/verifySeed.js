import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

import { connectDatabase, closeDatabase } from '../config/db.js';
import {
  User,
  Bus,
  Route,
  Stop,
  Trip,
  Incident,
  Alert,
  SocMetric,
  AiInsight,
  AuditLog,
} from '../models/index.js';

async function verifySeededData() {
  console.log('[Seed Verification] Connecting to database...');
  await connectDatabase();

  const userCount = await User.countDocuments();
  const routeCount = await Route.countDocuments();
  const stopCount = await Stop.countDocuments();
  const busCount = await Bus.countDocuments();
  const tripCount = await Trip.countDocuments();
  const incidentCount = await Incident.countDocuments();
  const alertCount = await Alert.countDocuments();
  const socCount = await SocMetric.countDocuments();
  const aiCount = await AiInsight.countDocuments();
  const auditCount = await AuditLog.countDocuments();

  console.log(`[Document Counts] Users: ${userCount}, Routes: ${routeCount}, Stops: ${stopCount}, Buses: ${busCount}, Trips: ${tripCount}, Incidents: ${incidentCount}, Alerts: ${alertCount}, SOC: ${socCount}, AI: ${aiCount}, Audit: ${auditCount}`);

  // Verify Entity References
  const bus245 = await Bus.findOne({ busNumber: 'Bus 245' }).populate('routeId').populate('driverId');
  console.log(`[Reference Check] Bus 245 -> Route: ${bus245.routeId?.routeCode} (${bus245.routeId?.routeName}), Driver: ${bus245.driverId?.name} (${bus245.driverId?.driverProfile?.badgeId})`);

  if (!bus245.routeId || bus245.routeId.routeCode !== 'RT-108') {
    throw new Error('Bus 245 route reference failed');
  }
  if (!bus245.driverId || bus245.driverId.driverProfile?.badgeId !== 'PLT-042') {
    throw new Error('Bus 245 driver reference failed');
  }

  // Verify Passwords are not plaintext
  const rawUser = await User.findOne({ email: 'driver@smarttransit.city' }).select('+passwordHash');
  console.log(`[Security Check] Password hash format: ${rawUser.passwordHash.substring(0, 7)}... (Length: ${rawUser.passwordHash.length})`);
  if (!rawUser.passwordHash.startsWith('$2a$') && !rawUser.passwordHash.startsWith('$2b$')) {
    throw new Error('Password is not properly bcrypt hashed');
  }

  console.log('[Seed Verification] ✅ All entity relationships and security constraints verified successfully!');
  await closeDatabase();
  process.exit(0);
}

verifySeededData().catch(async (e) => {
  console.error('[Seed Verification Error]', e);
  await closeDatabase();
  process.exit(1);
});
