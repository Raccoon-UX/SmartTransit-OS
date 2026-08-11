/**
 * SmartTransit OS — Dual-Mode Service Integration & Provenance Verification Suite
 */

import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

import config from '../config/env.js';
import mongoose from 'mongoose';
import { Bus, Route, Stop, User, AuditLog } from '../models/index.js';

const API_BASE = `http://localhost:${config.port}/api/v1`;

async function runDualModeVerification() {
  console.log('========================================');
  console.log('SMARTTRANSIT OS DUAL-MODE VERIFICATION');
  console.log('========================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`PASS  ${testName}`);
      passed++;
    } else {
      console.error(`FAIL  ${testName}`);
      failed++;
    }
  }

  try {
    await mongoose.connect(config.mongodbUri);

    // ------------------------------------------
    // 1. ONLINE MODE: API CLIENT & AUTHENTICATION
    // ------------------------------------------
    console.log('[1/4 Testing Online Mode: Authentication & Fleet API]');
    const loginRes = await fetch(`${API_BASE}/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'ADMIN' }),
    });
    const loginJson = await loginRes.json();
    const adminToken = loginJson.data?.accessToken;
    assert(loginRes.ok && adminToken, 'Online demo-login yields valid access token');

    const fleetRes = await fetch(`${API_BASE}/fleet`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const fleetJson = await fleetRes.json();
    assert(fleetRes.ok && Array.isArray(fleetJson.data) && fleetJson.data.length >= 4, 'Online GET /fleet returns MongoDB documents');

    // ------------------------------------------
    // 2. DATA PROVENANCE TEST (PROVES MONGODB LIVE SOURCING)
    // ------------------------------------------
    console.log('\n[2/4 Running Live Data Provenance Verification]');
    // Update Bus 245 in MongoDB to 91% occupancy
    const testOccupancy = 91;
    await Bus.findOneAndUpdate(
      { busNumber: 'Bus 245' },
      { $set: { occupancyPercent: testOccupancy, occupancyStatus: 'FULL' } }
    );

    const busRes = await fetch(`${API_BASE}/fleet/Bus 245`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const busJson = await busRes.json();
    assert(busJson.data?.occupancyPercent === testOccupancy, `Data provenance verified: MongoDB live value (${testOccupancy}%) served via API`);

    // Reset back to baseline 65%
    await Bus.findOneAndUpdate(
      { busNumber: 'Bus 245' },
      { $set: { occupancyPercent: 65, occupancyStatus: 'MEDIUM' } }
    );

    // ------------------------------------------
    // 3. STRICT ERROR CLASSIFICATION (NO FALLBACK FOR 401/403/400/404)
    // ------------------------------------------
    console.log('\n[3/4 Verifying Strict Error Classification]');
    const unauthRes = await fetch(`${API_BASE}/fleet`);
    assert(unauthRes.status === 401, '401 Unauthorized strictly preserved (not masked)');

    const forbiddenRes = await fetch(`${API_BASE}/soc/overview`, {
      headers: { Authorization: `Bearer ${adminToken}` }, // Admin accessing SOC endpoint
    });
    assert(forbiddenRes.status === 403, '403 Forbidden strictly preserved (not masked)');

    const notFoundRes = await fetch(`${API_BASE}/fleet/Bus 9999 NONEXISTENT`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert(notFoundRes.status === 404, '404 Not Found strictly preserved (not masked)');

    // ------------------------------------------
    // 4. OFFLINE FALLBACK RESILIENCE TEST
    // ------------------------------------------
    console.log('\n[4/4 Testing Offline Mock Fallback Resilience]');
    // Check that mock datasets are available and complete
    const { MOCK_PASSENGER_BUSES } = await import('../../../src/data/passenger/mockBuses.js');
    const { MOCK_PASSENGER_ROUTES } = await import('../../../src/data/passenger/mockRoutes.js');
    const { MOCK_PASSENGER_STOPS } = await import('../../../src/data/passenger/mockStops.js');
    const { MOCK_ADMIN_FLEET } = await import('../../../src/data/admin/adminFleet.js');

    assert(Array.isArray(MOCK_PASSENGER_BUSES) && MOCK_PASSENGER_BUSES.length >= 4, 'Mock passenger fleet intact');
    assert(Array.isArray(MOCK_PASSENGER_ROUTES) && MOCK_PASSENGER_ROUTES.length >= 4, 'Mock routes intact');
    assert(Array.isArray(MOCK_PASSENGER_STOPS) && MOCK_PASSENGER_STOPS.length >= 5, 'Mock stops intact');
    assert(Array.isArray(MOCK_ADMIN_FLEET) && MOCK_ADMIN_FLEET.length >= 4, 'Mock admin fleet intact');

    console.log('\n========================================');
    console.log('SMARTTRANSIT OS DUAL-MODE TEST SUMMARY');
    console.log('========================================');
    console.log(`TOTAL TESTS: ${passed + failed}`);
    console.log(`PASSED:      ${passed}`);
    console.log(`FAILED:      ${failed}`);
    console.log(`STATUS:      ${failed === 0 ? 'ALL PASS' : 'FAILURES DETECTED'}`);
    console.log('========================================\n');

    await mongoose.disconnect();
    process.exit(failed === 0 ? 0 : 1);
  } catch (error) {
    console.error('Fatal dual-mode test error:', error);
    process.exit(1);
  }
}

runDualModeVerification();
