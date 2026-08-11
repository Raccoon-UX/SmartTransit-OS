/**
 * SmartTransit OS — Comprehensive Authentication & RBAC Test Suite
 */

import config from '../config/env.js';

const API_BASE = `http://localhost:${config.port}/api/v1`;

async function runAuthVerification() {
  console.log('========================================');
  console.log('SMARTTRANSIT OS AUTH VERIFICATION SUITE');
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
    // 1. HEALTH CHECK
    // ------------------------------------------
    console.log('[1/7 Testing Health Endpoint]');
    const healthRes = await fetch(`${API_BASE}/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.ok && healthJson.data?.database === 'CONNECTED', 'Health endpoint reports UP and database CONNECTED');

    // ------------------------------------------
    // 2. LOGIN TESTS
    // ------------------------------------------
    console.log('\n[2/7 Testing Login Endpoints]');
    
    // 2a. Valid credentials
    const validLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'driver@smarttransit.city', password: 'DemoPass@2026' }),
    });
    const validLoginJson = await validLoginRes.json();
    assert(validLoginRes.ok && validLoginJson.data?.accessToken && validLoginJson.data?.user?.role === 'DRIVER', 'Valid credentials login');
    assert(validLoginJson.data?.user?.passwordHash === undefined, 'Password hashes never returned in user response');

    // 2b. Invalid password
    const invalidPassRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'driver@smarttransit.city', password: 'WrongPassword!123' }),
    });
    assert(invalidPassRes.status === 401, 'Invalid credentials rejected with 401');

    // 2c. Unknown user
    const unknownUserRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nonexistent@smarttransit.city', password: 'DemoPass@2026' }),
    });
    assert(unknownUserRes.status === 401, 'Unknown user email rejected with 401');

    // ------------------------------------------
    // 3. REGISTRATION TESTS
    // ------------------------------------------
    console.log('\n[3/7 Testing Registration]');
    const testRegEmail = `commuter.${Date.now()}@test.smarttransit.city`;
    
    // 3a. Successful registration
    const regRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Rohan Deshmukh',
        email: testRegEmail,
        password: 'SecurePass@123',
        role: 'ADMIN', // Attempt privileged role escalation
      }),
    });
    const regJson = await regRes.json();
    assert(regRes.status === 201 && regJson.data?.user?.role === 'PASSENGER', 'Passenger registration created with enforced role=PASSENGER');

    // 3b. Duplicate email rejected
    const dupRegRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Rohan Duplicate',
        email: testRegEmail,
        password: 'SecurePass@123',
      }),
    });
    assert(dupRegRes.status === 400, 'Duplicate email registration rejected with 400');

    // ------------------------------------------
    // 4. DEMO LOGIN TESTS
    // ------------------------------------------
    console.log('\n[4/7 Testing Demo Logins]');
    const roles = ['PASSENGER', 'DRIVER', 'ADMIN', 'SOC'];
    const tokens = {};

    for (const r of roles) {
      const demoRes = await fetch(`${API_BASE}/auth/demo-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: r }),
      });
      const demoJson = await demoRes.json();
      assert(demoRes.ok && demoJson.data?.user?.role === r, `Demo login for role ${r}`);
      tokens[r] = demoJson.data?.accessToken;
    }

    // ------------------------------------------
    // 5. GET /AUTH/ME & JWT TESTS
    // ------------------------------------------
    console.log('\n[5/7 Testing GET /auth/me & Token Validation]');
    
    // 5a. Valid token
    const meRes = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${tokens.ADMIN}` },
    });
    const meJson = await meRes.json();
    assert(meRes.ok && meJson.data?.email === 'admin@smarttransit.city', 'Valid access token accepted at /auth/me');

    // 5b. Missing token
    const noTokenRes = await fetch(`${API_BASE}/auth/me`);
    assert(noTokenRes.status === 401, 'Missing token rejected with 401');

    // 5c. Invalid token
    const invalidTokenRes = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: 'Bearer invalid.tampered.jwt.signature' },
    });
    assert(invalidTokenRes.status === 401, 'Invalid token rejected with 401');

    // ------------------------------------------
    // 6. RBAC RESTRICTION TESTS
    // ------------------------------------------
    console.log('\n[6/7 Testing Server-Side RBAC Restrictions]');

    // 6a. Passenger access to driver endpoint -> 403
    const pOnDriver = await fetch(`${API_BASE}/test/driver-only`, {
      headers: { Authorization: `Bearer ${tokens.PASSENGER}` },
    });
    assert(pOnDriver.status === 403, 'Passenger access to Driver endpoint rejected (403)');

    // 6b. Driver access to driver endpoint -> 200
    const dOnDriver = await fetch(`${API_BASE}/test/driver-only`, {
      headers: { Authorization: `Bearer ${tokens.DRIVER}` },
    });
    assert(dOnDriver.status === 200, 'Driver access to Driver endpoint authorized (200)');

    // 6c. Driver access to admin endpoint -> 403
    const dOnAdmin = await fetch(`${API_BASE}/test/admin-only`, {
      headers: { Authorization: `Bearer ${tokens.DRIVER}` },
    });
    assert(dOnAdmin.status === 403, 'Driver access to Admin endpoint rejected (403)');

    // 6d. Admin access to admin endpoint -> 200
    const aOnAdmin = await fetch(`${API_BASE}/test/admin-only`, {
      headers: { Authorization: `Bearer ${tokens.ADMIN}` },
    });
    assert(aOnAdmin.status === 200, 'Admin access to Admin endpoint authorized (200)');

    // 6e. Admin access to SOC endpoint -> 403
    const aOnSoc = await fetch(`${API_BASE}/test/soc-only`, {
      headers: { Authorization: `Bearer ${tokens.ADMIN}` },
    });
    assert(aOnSoc.status === 403, 'Admin access to SOC endpoint rejected (403)');

    // 6f. SOC access to SOC endpoint -> 200
    const sOnSoc = await fetch(`${API_BASE}/test/soc-only`, {
      headers: { Authorization: `Bearer ${tokens.SOC}` },
    });
    assert(sOnSoc.status === 200, 'SOC access to SOC endpoint authorized (200)');

    // ------------------------------------------
    // 7. SUMMARY
    // ------------------------------------------
    console.log('\n========================================');
    console.log('SMARTTRANSIT OS AUTH TEST SUMMARY');
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

runAuthVerification();
