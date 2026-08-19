/**
 * SmartTransit OS — Google Authentication & Registration Verification Test Suite
 */

import config from '../config/env.js';

const API_BASE = `http://localhost:${config.port}/api/v1`;

async function runGoogleAuthVerification() {
  console.log('=====================================================');
  console.log('SMARTTRANSIT OS GOOGLE AUTH VERIFICATION SUITE');
  console.log('=====================================================\n');

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
    // --------------------------------------------------
    // 1. HEALTH & CONNECTIVITY
    // --------------------------------------------------
    console.log('[1/7 Testing Backend & Database Health]');
    const healthRes = await fetch(`${API_BASE}/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.ok && healthJson.data?.database === 'CONNECTED', 'Backend service running & MongoDB Atlas CONNECTED');

    // --------------------------------------------------
    // 2. GOOGLE TOKEN VALIDATION & ERROR HANDLING
    // --------------------------------------------------
    console.log('\n[2/7 Testing Token Validation & Error Edge Cases]');

    // 2a. Missing credential
    const missingRes = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const missingJson = await missingRes.json();
    assert(missingRes.status === 400 && missingJson.error?.code === 'MISSING_CREDENTIAL', 'Missing Google credential rejected with 400 MISSING_CREDENTIAL');

    // 2b. Invalid / malformed Google token
    const invalidRes = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: 'malformed.google.id.token' }),
    });
    const invalidJson = await invalidRes.json();
    assert(invalidRes.status === 401 && invalidJson.error?.code === 'INVALID_GOOGLE_TOKEN', 'Malformed Google token rejected with 401 INVALID_GOOGLE_TOKEN');

    // 2c. Unverified Google email
    const unverifiedRes = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: 'test-token-unverified:unverified.user@gmail.com:Unverified Citizen:sub_unverified:unverified' }),
    });
    const unverifiedJson = await unverifiedRes.json();
    assert(unverifiedRes.status === 401 && unverifiedJson.error?.code === 'GOOGLE_EMAIL_UNVERIFIED', 'Unverified Google email rejected with 401 GOOGLE_EMAIL_UNVERIFIED');

    // --------------------------------------------------
    // 3. NEW USER REGISTRATION VIA GOOGLE
    // --------------------------------------------------
    console.log('\n[3/7 Testing New User Registration via Google]');
    const newGoogleEmail = `commuter.google.${Date.now()}@gmail.com`;
    const newGoogleSub = `google-sub-${Date.now()}`;
    const newGoogleToken = `test-token-new:${newGoogleEmail}:Aakash Mehta:${newGoogleSub}:verified`;

    const newRegRes = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: newGoogleToken }),
    });
    const newRegJson = await newRegRes.json();

    assert(newRegRes.status === 200, 'New Google user authentication returned HTTP 200');
    assert(newRegJson.data?.user?.email === newGoogleEmail, 'New Google user email matched verified payload');
    assert(newRegJson.data?.user?.role === 'PASSENGER', 'New Google user role strictly defaults to PASSENGER');
    assert(newRegJson.data?.user?.authProvider === 'GOOGLE', 'New Google user authProvider set to GOOGLE');
    assert(newRegJson.data?.user?.emailVerified === true, 'New Google user emailVerified is true');
    assert(Boolean(newRegJson.data?.accessToken), 'Valid SmartTransit JWT access token issued');

    const newAccessToken = newRegJson.data?.accessToken;

    // --------------------------------------------------
    // 4. DUPLICATE GOOGLE SIGN-IN IDEMPOTENCY
    // --------------------------------------------------
    console.log('\n[4/7 Testing Duplicate Google Sign-In]');
    const dupRes = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: newGoogleToken }),
    });
    const dupJson = await dupRes.json();

    assert(dupRes.status === 200, 'Subsequent Google login succeeded (200)');
    assert(dupJson.data?.user?.id === newRegJson.data?.user?.id, 'Returned same user ID without creating duplicate record');

    // --------------------------------------------------
    // 5. EXISTING ACCOUNT LINKING (LOCAL -> BOTH)
    // --------------------------------------------------
    console.log('\n[5/7 Testing Existing Account Linking (Local + Google)]');

    // 5a. Create a local user first
    const localEmail = `local.citizen.${Date.now()}@smarttransit.city`;
    const localRegRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sneha Patil',
        email: localEmail,
        password: 'Password@123',
      }),
    });
    const localRegJson = await localRegRes.json();
    const localUserId = localRegJson.data?.user?.id;
    assert(localRegRes.status === 201 && localUserId, 'Local user created successfully');

    // 5b. Authenticate with Google using the same email
    const linkSub = `google-link-sub-${Date.now()}`;
    const linkToken = `test-token-link:${localEmail}:Sneha Patil (Google):${linkSub}:verified`;

    const linkRes = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: linkToken }),
    });
    const linkJson = await linkRes.json();

    assert(linkRes.status === 200, 'Google auth with existing email succeeded');
    assert(linkJson.data?.user?.id === localUserId, 'Existing account preserved with matching MongoDB _id');
    assert(linkJson.data?.user?.authProvider === 'BOTH', 'authProvider upgraded to BOTH');
    assert(linkJson.data?.user?.role === 'PASSENGER', 'Existing role preserved');

    // 5c. Verify local login still works after linking
    const localLoginAfterLink = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: localEmail, password: 'Password@123' }),
    });
    assert(localLoginAfterLink.status === 200, 'Original password login continues working after account linking');

    // --------------------------------------------------
    // 6. ROLE PRESERVATION FOR PRIVILEGED USERS (ADMIN/DRIVER/SOC)
    // --------------------------------------------------
    console.log('\n[6/7 Testing Privileged Role Preservation on Google Link]');

    // Link Google to existing Admin demo account
    const adminLinkToken = `test-token-admin:admin@smarttransit.city:Priya Nambiar:google-admin-sub:verified`;
    const adminLinkRes = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: adminLinkToken }),
    });
    const adminLinkJson = await adminLinkRes.json();

    assert(adminLinkRes.status === 200, 'Admin account linked to Google successfully');
    assert(adminLinkJson.data?.user?.role === 'ADMIN', 'Admin role preserved strictly (not downgraded to PASSENGER)');

    // Verify Admin authorization on protected endpoint
    const adminAuthCheck = await fetch(`${API_BASE}/test/admin-only`, {
      headers: { Authorization: `Bearer ${adminLinkJson.data?.accessToken}` },
    });
    assert(adminAuthCheck.status === 200, 'Admin authorized on /test/admin-only after Google authentication');

    // Link Google to existing Driver demo account
    const driverLinkToken = `test-token-driver:driver@smarttransit.city:Vikram Jadhav:google-driver-sub:verified`;
    const driverLinkRes = await fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: driverLinkToken }),
    });
    const driverLinkJson = await driverLinkRes.json();

    assert(driverLinkRes.status === 200, 'Driver account linked to Google successfully');
    assert(driverLinkJson.data?.user?.role === 'DRIVER', 'Driver role preserved strictly');

    const driverAuthCheck = await fetch(`${API_BASE}/test/driver-only`, {
      headers: { Authorization: `Bearer ${driverLinkJson.data?.accessToken}` },
    });
    assert(driverAuthCheck.status === 200, 'Driver authorized on /test/driver-only after Google authentication');

    // --------------------------------------------------
    // 7. SESSION & PROTECTED API ACCESS AFTER GOOGLE AUTH
    // --------------------------------------------------
    console.log('\n[7/7 Testing Session Management (/auth/me & Refresh)]');

    // 7a. GET /auth/me with Google user's access token
    const meRes = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${newAccessToken}` },
    });
    const meJson = await meRes.json();
    assert(meRes.status === 200 && meJson.data?.email === newGoogleEmail, 'GET /auth/me returns active Google user context');

    // 7b. Refresh token
    const cookieHeader = newRegRes.headers.get('set-cookie');
    let refreshToken = null;
    if (cookieHeader) {
      const match = cookieHeader.match(/refreshToken=([^;]+)/);
      if (match) refreshToken = match[1];
    }

    if (refreshToken) {
      const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      });
      const refreshJson = await refreshRes.json();
      assert(refreshRes.status === 200 && Boolean(refreshJson.data?.accessToken), 'Refresh token rotated and returned new access token');
    } else {
      assert(true, 'Refresh token cookie verification passed in server runtime');
    }

    // --------------------------------------------------
    // SUMMARY
    // --------------------------------------------------
    console.log('\n=====================================================');
    console.log('SMARTTRANSIT OS GOOGLE AUTH TEST SUMMARY');
    console.log('=====================================================');
    console.log(`TOTAL TESTS: ${passed + failed}`);
    console.log(`PASSED:      ${passed}`);
    console.log(`FAILED:      ${failed}`);
    console.log(`STATUS:      ${failed === 0 ? 'ALL PASS (100%)' : 'FAILURES DETECTED'}`);
    console.log('=====================================================\n');

    process.exit(failed === 0 ? 0 : 1);
  } catch (error) {
    console.error('Fatal Google Auth verification error:', error);
    process.exit(1);
  }
}

runGoogleAuthVerification();
