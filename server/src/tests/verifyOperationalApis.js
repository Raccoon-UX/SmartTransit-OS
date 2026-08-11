/**
 * SmartTransit OS — Comprehensive Operational REST APIs (Incidents, Alerts & SOC) Test Suite
 */

import config from '../config/env.js';

const API_BASE = `http://localhost:${config.port}/api/v1`;

async function runOperationalApisVerification() {
  console.log('========================================');
  console.log('SMARTTRANSIT OS OPERATIONAL APIs TEST SUITE');
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
    console.log('[0/4 Authenticating Personas]');
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
    // 1. INCIDENTS APIs
    // ------------------------------------------
    console.log('\n[1/4 Testing Incident REST APIs]');

    // 1a. Driver files incident
    const createIncRes = await fetch(`${API_BASE}/incidents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.DRIVER}`,
      },
      body: JSON.stringify({
        title: 'Mild Tire Pressure Drop on Highway',
        severity: 'LOW',
        type: 'MECHANICAL',
        location: 'Western Highway Exchange (BST-104)',
        busNumber: 'Bus 245',
        message: 'Tire sensor flagged 28 PSI on rear axle.',
      }),
    });
    const createIncJson = await createIncRes.json();
    const testIncidentCode = createIncJson.data?.incidentCode;
    assert(createIncRes.status === 201 && testIncidentCode, 'Driver files field incident (201 Created)');

    // 1b. Passenger views disruptions
    const pIncRes = await fetch(`${API_BASE}/incidents`, {
      headers: { Authorization: `Bearer ${tokens.PASSENGER}` },
    });
    const pIncJson = await pIncRes.json();
    assert(pIncRes.ok && Array.isArray(pIncJson.data), 'Passenger retrieves public disruptions (200 OK)');

    // 1c. Admin views all incidents
    const aIncRes = await fetch(`${API_BASE}/incidents`, {
      headers: { Authorization: `Bearer ${tokens.ADMIN}` },
    });
    const aIncJson = await aIncRes.json();
    assert(aIncRes.ok && aIncJson.data.length >= 2, 'Admin views complete incident registry (200 OK)');

    // 1d. Admin updates incident status to INVESTIGATING
    const updateIncRes = await fetch(`${API_BASE}/incidents/${testIncidentCode}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.ADMIN}`,
      },
      body: JSON.stringify({
        status: 'RESOLVED',
        resolutionNote: 'Depot mobile technician verified tire integrity. Normal pressure restored.',
      }),
    });
    const updateIncJson = await updateIncRes.json();
    assert(updateIncRes.ok && updateIncJson.data?.status === 'RESOLVED', 'Admin resolves incident with timeline note (200 OK)');

    // 1e. Unauthorized Passenger cannot create incident
    const pCreateIncRes = await fetch(`${API_BASE}/incidents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.PASSENGER}`,
      },
      body: JSON.stringify({ title: 'Unauthorized Report', location: 'Depot' }),
    });
    assert(pCreateIncRes.status === 403, 'Unauthorized Passenger cannot file incident (403 Forbidden)');

    // ------------------------------------------
    // 2. ALERTS APIs
    // ------------------------------------------
    console.log('\n[2/4 Testing Alert REST APIs]');

    // 2a. Public alert list
    const alertsRes = await fetch(`${API_BASE}/alerts`);
    const alertsJson = await alertsRes.json();
    assert(alertsRes.ok && Array.isArray(alertsJson.data) && alertsJson.data.length >= 3, 'Public alert list retrieves advisory bulletins (200 OK)');

    // 2b. Public alert detail
    const alertDetailRes = await fetch(`${API_BASE}/alerts/ALT-2026-001`);
    const alertDetailJson = await alertDetailRes.json();
    assert(alertDetailRes.ok && alertDetailJson.data?.alertId === 'ALT-2026-001', 'Public alert detail for ALT-2026-001');

    // 2c. Admin broadcasts new alert
    const createAlertRes = await fetch(`${API_BASE}/alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.ADMIN}`,
      },
      body: JSON.stringify({
        title: 'Special Event Metro Feeder Frequency Increase',
        message: 'Double-decker buses operating at 5 min headways for evening sports fixture.',
        severity: 'INFO',
        category: 'FREQUENCY',
        affectedRouteCode: 'RT-108',
      }),
    });
    const createAlertJson = await createAlertRes.json();
    const testAlertId = createAlertJson.data?.alertId;
    assert(createAlertRes.status === 201 && testAlertId, 'Admin broadcasts transit alert (201 Created)');

    // 2d. Unauthorized Passenger cannot create alert
    const pCreateAlertRes = await fetch(`${API_BASE}/alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.PASSENGER}`,
      },
      body: JSON.stringify({ title: 'Spam Alert', message: 'Fake' }),
    });
    assert(pCreateAlertRes.status === 403, 'Unauthorized Passenger cannot broadcast alert (403 Forbidden)');

    // 2e. SOC updates alert
    const updateAlertRes = await fetch(`${API_BASE}/alerts/${testAlertId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens.SOC}`,
      },
      body: JSON.stringify({ severity: 'INFO', isActive: false }),
    });
    assert(updateAlertRes.ok, 'SOC updates alert operational state (200 OK)');

    // ------------------------------------------
    // 3. SOC INFRASTRUCTURE & METRICS APIs
    // ------------------------------------------
    console.log('\n[3/4 Testing SOC Infrastructure & Metrics APIs]');

    // 3a. SOC queries overview
    const socOverviewRes = await fetch(`${API_BASE}/soc/overview`, {
      headers: { Authorization: `Bearer ${tokens.SOC}` },
    });
    const socOverviewJson = await socOverviewRes.json();
    assert(socOverviewRes.ok && socOverviewJson.data?.globalStatus, 'SOC retrieves cluster overview (200 OK)');

    // 3b. SOC queries node cluster
    const socNodesRes = await fetch(`${API_BASE}/soc/nodes`, {
      headers: { Authorization: `Bearer ${tokens.SOC}` },
    });
    const socNodesJson = await socNodesRes.json();
    assert(socNodesRes.ok && Array.isArray(socNodesJson.data) && socNodesJson.data.length >= 3, 'SOC retrieves server nodes cluster (200 OK)');

    // 3c. SOC triggers surge simulation
    const surgeRes = await fetch(`${API_BASE}/soc/surge`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokens.SOC}` },
    });
    const surgeJson = await surgeRes.json();
    assert(surgeRes.ok && surgeJson.data?.apiLatencyMs === 184, 'SOC simulates traffic surge with elevated latency (200 OK)');

    // 3d. SOC triggers scale-out recovery
    const scaleRes = await fetch(`${API_BASE}/soc/scale-out`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokens.SOC}` },
    });
    const scaleJson = await scaleRes.json();
    assert(scaleRes.ok && scaleJson.data?.backpressureState === 'NORMAL', 'SOC executes cluster scale-out recovery (200 OK)');

    // 3e. Unauthorized Passenger receives 403 on SOC endpoints
    const pSocRes = await fetch(`${API_BASE}/soc/overview`, {
      headers: { Authorization: `Bearer ${tokens.PASSENGER}` },
    });
    assert(pSocRes.status === 403, 'Unauthorized Passenger blocked from SOC overview (403 Forbidden)');

    // 3f. Unauthorized Driver receives 403 on SOC endpoints
    const dSocRes = await fetch(`${API_BASE}/soc/overview`, {
      headers: { Authorization: `Bearer ${tokens.DRIVER}` },
    });
    assert(dSocRes.status === 403, 'Unauthorized Driver blocked from SOC overview (403 Forbidden)');

    // 3g. SOC / Admin reads audit logs
    const auditRes = await fetch(`${API_BASE}/soc/audit-logs`, {
      headers: { Authorization: `Bearer ${tokens.SOC}` },
    });
    const auditJson = await auditRes.json();
    assert(auditRes.ok && Array.isArray(auditJson.data) && auditJson.data.length >= 5, 'SOC retrieves governance audit logs (200 OK)');

    // ------------------------------------------
    // 4. SECURITY & HEALTH
    // ------------------------------------------
    console.log('\n[4/4 Testing Security Invariants & Health]');

    // 4a. Verify audit log contains no password or token
    const firstAudit = auditJson.data[0];
    assert(
      firstAudit?.metadata?.password === undefined &&
        firstAudit?.metadata?.token === undefined &&
        firstAudit?.metadata?.jwt === undefined,
      'Audit logs strictly sanitize passwords and secrets'
    );

    // 4b. Health check reports UP & CONNECTED
    const healthRes = await fetch(`${API_BASE}/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.ok && healthJson.data?.database === 'CONNECTED', 'Health check reports UP and database CONNECTED');

    console.log('\n========================================');
    console.log('SMARTTRANSIT OS OPERATIONAL APIs TEST SUMMARY');
    console.log('========================================');
    console.log(`TOTAL TESTS: ${passed + failed}`);
    console.log(`PASSED:      ${passed}`);
    console.log(`FAILED:      ${failed}`);
    console.log(`STATUS:      ${failed === 0 ? 'ALL PASS' : 'FAILURES DETECTED'}`);
    console.log('========================================\n');

    process.exit(failed === 0 ? 0 : 1);
  } catch (error) {
    console.error('Fatal operational test error:', error);
    process.exit(1);
  }
}

runOperationalApisVerification();
