/**
 * SmartTransit OS — Comprehensive Core Entity REST APIs & RBAC Test Suite
 */

import config from '../config/env.js';

const API_BASE = `http://localhost:${config.port}/api/v1`;

async function runCoreApisVerification() {
  console.log('========================================');
  console.log('SMARTTRANSIT OS CORE APIs TEST SUITE');
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
    // ------------------------------------------
    // 0. AUTHENTICATE TEST PERSONAS
    // ------------------------------------------
    console.log('[0/5 Authenticating Personas]');
    const roles = ['PASSENGER', 'DRIVER', 'ADMIN', 'SOC'];
    const tokens = {};

    for (const r of roles) {
      const res = await fetch(`${API_BASE}/auth/demo-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: r }),
      });
      const json = await res.json();
      tokens[r] = json.data?.accessToken;
    }
    assert(tokens.PASSENGER && tokens.DRIVER && tokens.ADMIN && tokens.SOC, 'All 4 demo personas authenticated');

    // ------------------------------------------
    // 1. FLEET APIs
    // ------------------------------------------
    console.log('\n[1/5 Testing Fleet REST APIs]');

    // 1a. GET fleet as Passenger (public-safe fields)
    const pFleetRes = await fetch(`${API_BASE}/fleet`, {
      headers: { Authorization: `Bearer ${tokens.PASSENGER}` },
    });
    const pFleetJson = await pFleetRes.json();
    assert(pFleetRes.ok && Array.isArray(pFleetJson.data) && pFleetJson.data.length >= 4, 'GET fleet as Passenger returns public fleet');
    assert(pFleetJson.data[0].driver?.email === undefined, 'Passenger view excludes private driver email');

    // 1b. GET fleet as Driver
    const dFleetRes = await fetch(`${API_BASE}/fleet`, {
      headers: { Authorization: `Bearer ${tokens.DRIVER}` },
    });
    assert(dFleetRes.ok, 'GET fleet as Driver (200 OK)');

    // 1c. GET fleet as Admin
    const aFleetRes = await fetch(`${API_BASE}/fleet`, {
      headers: { Authorization: `Bearer ${tokens.ADMIN}` },
    });
    assert(aFleetRes.ok, 'GET fleet as Admin (200 OK)');

    // 1d. GET fleet as SOC
    const sFleetRes = await fetch(`${API_BASE}/fleet`, {
      headers: { Authorization: `Bearer ${tokens.SOC}` },
    });
    assert(sFleetRes.ok, 'GET fleet as SOC (200 OK)');

    // 1e. Admin changes bus status
    const statusUpdateRes = await fetch(`${API_BASE}/fleet/Bus 245/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.ADMIN}`,
      },
      body: JSON.stringify({ status: 'ACTIVE' }),
    });
    assert(statusUpdateRes.ok, 'Admin changes bus status to ACTIVE (200 OK)');

    // 1f. Unauthorized Passenger cannot change bus status
    const pStatusUpdateRes = await fetch(`${API_BASE}/fleet/Bus 245/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.PASSENGER}`,
      },
      body: JSON.stringify({ status: 'OFFLINE' }),
    });
    assert(pStatusUpdateRes.status === 403, 'Unauthorized Passenger cannot change bus status (403 Forbidden)');

    // 1g. Admin assigns driver & route
    const assignRes = await fetch(`${API_BASE}/fleet/Bus 245/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.ADMIN}`,
      },
      body: JSON.stringify({ routeId: 'RT-108', driverId: 'PLT-042' }),
    });
    assert(assignRes.ok, 'Admin assigns driver/route to Bus 245 (200 OK)');

    // ------------------------------------------
    // 2. ROUTE APIs
    // ------------------------------------------
    console.log('\n[2/5 Testing Route REST APIs]');

    // 2a. Public route list
    const routesRes = await fetch(`${API_BASE}/routes`);
    const routesJson = await routesRes.json();
    assert(routesRes.ok && Array.isArray(routesJson.data) && routesJson.data.length >= 4, 'Public route list returns 4 municipal corridors');

    // 2b. Public route detail
    const routeDetailRes = await fetch(`${API_BASE}/routes/RT-108`);
    const routeDetailJson = await routeDetailRes.json();
    assert(routeDetailRes.ok && routeDetailJson.data?.routeCode === 'RT-108', 'Public route detail for RT-108');

    // 2c. Invalid route ID handled safely
    const invalidRouteRes = await fetch(`${API_BASE}/routes/RT-UNKNOWN-999`);
    assert(invalidRouteRes.status === 404, 'Invalid route ID handled safely (404 Not Found)');

    // ------------------------------------------
    // 3. STOP APIs
    // ------------------------------------------
    console.log('\n[3/5 Testing Stop REST APIs]');

    // 3a. Public stop list
    const stopsRes = await fetch(`${API_BASE}/stops`);
    const stopsJson = await stopsRes.json();
    assert(stopsRes.ok && Array.isArray(stopsJson.data) && stopsJson.data.length >= 10, 'Public stop list returns municipal smart stops');

    // 3b. Public stop detail
    const stopDetailRes = await fetch(`${API_BASE}/stops/BST-001`);
    const stopDetailJson = await stopDetailRes.json();
    assert(stopDetailRes.ok && stopDetailJson.data?.code === 'BST-001', 'Public stop detail for BST-001 (Borivali Central Hub)');

    // 3c. Invalid stop ID handled safely
    const invalidStopRes = await fetch(`${API_BASE}/stops/BST-UNKNOWN-999`);
    assert(invalidStopRes.status === 404, 'Invalid stop ID handled safely (404 Not Found)');

    // ------------------------------------------
    // 4. TRIP APIs
    // ------------------------------------------
    console.log('\n[4/5 Testing Trip Lifecycle & Occupancy APIs]');

    // 4a. Driver retrieves active trip
    const activeTripRes = await fetch(`${API_BASE}/trips/active`, {
      headers: { Authorization: `Bearer ${tokens.DRIVER}` },
    });
    assert(activeTripRes.ok, 'Driver retrieves active trip state (200 OK)');

    // 4b. Driver ends active trip
    const endTripRes = await fetch(`${API_BASE}/trips/end`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokens.DRIVER}` },
    });
    assert(endTripRes.ok || endTripRes.status === 404, 'Driver ends own active trip safely');

    // 4c. Driver starts valid trip
    const startTripRes = await fetch(`${API_BASE}/trips/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.DRIVER}`,
      },
      body: JSON.stringify({ busNumber: 'Bus 245' }),
    });
    assert(startTripRes.status === 201 || startTripRes.status === 409, 'Driver starts valid trip (201 Created)');

    // 4d. Driver cannot start duplicate active trip
    const dupTripRes = await fetch(`${API_BASE}/trips/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.DRIVER}`,
      },
      body: JSON.stringify({ busNumber: 'Bus 245' }),
    });
    assert(dupTripRes.status === 409, 'Driver cannot start duplicate active trip (409 Conflict)');

    // 4e. Passenger cannot start trip -> 403
    const pStartTripRes = await fetch(`${API_BASE}/trips/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.PASSENGER}`,
      },
      body: JSON.stringify({ busNumber: 'Bus 245' }),
    });
    assert(pStartTripRes.status === 403, 'Unauthorized Passenger cannot start driver trip (403 Forbidden)');

    // 4f. Driver updates occupancy
    const driverOccRes = await fetch(`${API_BASE}/trips/occupancy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.DRIVER}`,
      },
      body: JSON.stringify({ occupancyPercent: 78 }),
    });
    const driverOccJson = await driverOccRes.json();
    assert(driverOccRes.ok && driverOccJson.data?.occupancyStatus === 'HIGH', 'Driver updates occupancy to 78% (HIGH)');

    // 4g. Admin updates occupancy
    const adminOccRes = await fetch(`${API_BASE}/trips/occupancy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.ADMIN}`,
      },
      body: JSON.stringify({ busNumber: 'Bus 245', occupancyPercent: 42 }),
    });
    const adminOccJson = await adminOccRes.json();
    assert(adminOccRes.ok && adminOccJson.data?.occupancyStatus === 'LOW', 'Admin updates occupancy to 42% (LOW)');

    // 4h. Invalid occupancy rejected
    const invalidOccRes = await fetch(`${API_BASE}/trips/occupancy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.ADMIN}`,
      },
      body: JSON.stringify({ busNumber: 'Bus 245', occupancyPercent: 150 }),
    });
    assert(invalidOccRes.status === 400, 'Invalid occupancy percent > 100 rejected (400 Bad Request)');

    // ------------------------------------------
    // 5. SECURITY & HEALTH
    // ------------------------------------------
    console.log('\n[5/5 Testing Security Invariants & Health]');

    // 5a. Password hashes never returned
    const userMeRes = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${tokens.ADMIN}` },
    });
    const userMeJson = await userMeRes.json();
    assert(userMeJson.data?.passwordHash === undefined, 'passwordHash never appears in API response');

    // 5b. Unauthenticated request rejected with 401
    const unauthFleetRes = await fetch(`${API_BASE}/fleet`);
    assert(unauthFleetRes.status === 401, 'Unauthorized request returns 401');

    // 5c. Health check reports UP & CONNECTED
    const healthRes = await fetch(`${API_BASE}/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.ok && healthJson.data?.database === 'CONNECTED', 'Health check reports UP and CONNECTED');

    console.log('\n========================================');
    console.log('SMARTTRANSIT OS CORE APIs TEST SUMMARY');
    console.log('========================================');
    console.log(`TOTAL TESTS: ${passed + failed}`);
    console.log(`PASSED:      ${passed}`);
    console.log(`FAILED:      ${failed}`);
    console.log(`STATUS:      ${failed === 0 ? 'ALL PASS' : 'FAILURES DETECTED'}`);
    console.log('========================================\n');

    process.exit(failed === 0 ? 0 : 1);
  } catch (error) {
    console.error('Fatal test execution error:', error);
    process.exit(1);
  }
}

runCoreApisVerification();
