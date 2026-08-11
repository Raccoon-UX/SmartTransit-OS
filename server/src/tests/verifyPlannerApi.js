/**
 * SmartTransit OS — Multimodal Journey Planner API & Behavioral Parity Test Suite
 */

import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

import config from '../config/env.js';
import mongoose from 'mongoose';
import { User, Route, Stop, Bus, Trip, Incident, Alert, SocMetric, AiInsight, AuditLog } from '../models/index.js';

const API_BASE = `http://localhost:${config.port}/api/v1`;

async function getDocumentCounts() {
  return {
    users: await User.countDocuments(),
    routes: await Route.countDocuments(),
    stops: await Stop.countDocuments(),
    buses: await Bus.countDocuments(),
    trips: await Trip.countDocuments(),
    incidents: await Incident.countDocuments(),
    alerts: await Alert.countDocuments(),
    socMetrics: await SocMetric.countDocuments(),
    aiInsights: await AiInsight.countDocuments(),
    auditLogs: await AuditLog.countDocuments(),
  };
}

async function runPlannerVerification() {
  console.log('========================================');
  console.log('SMARTTRANSIT OS MULTIMODAL PLANNER TEST');
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
    const initialCounts = await getDocumentCounts();

    // ------------------------------------------
    // 1. PUBLIC ACCESS & MULTIMODAL TEST (SCENARIO A)
    // ------------------------------------------
    console.log('[1/5 Testing Public Multimodal Journey Scenario A (Borivali -> Vashi)]');
    const resA = await fetch(`${API_BASE}/planner/multimodal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin: 'Borivali Railway Station',
        destination: 'Vashi Sector 17',
        preferences: { priority: 'BEST_OVERALL' },
      }),
    });
    const jsonA = await resA.json();

    assert(resA.ok && jsonA.success, 'Public access without auth header (200 OK)');
    assert(
      jsonA.data?.status === 'MULTIMODAL_ROUTE_FOUND' || jsonA.data?.options?.length > 0,
      'Multimodal route found for Borivali -> Vashi'
    );
    assert(jsonA.data?.recommendedOption?.segments?.length >= 3, 'Structured multimodal segments present');

    // ------------------------------------------
    // 2. DIRECT ROUTE SCENARIO (SCENARIO B)
    // ------------------------------------------
    console.log('\n[2/5 Testing Direct Route Scenario B]');
    const resB = await fetch(`${API_BASE}/planner/multimodal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Borivali Central Hub',
        to: 'Andheri West Exchange',
      }),
    });
    const jsonB = await resB.json();

    assert(resB.ok && jsonB.data?.options?.length > 0, 'Direct route calculated between known corridor stops');
    const directOption = jsonB.data?.options?.find((o) => o.type === 'DIRECT');
    assert(directOption && directOption.transfersCount === 0, 'Zero-transfer direct option identified');

    // ------------------------------------------
    // 3. WALKING & TRANSFER SEGMENTS (SCENARIO C & D)
    // ------------------------------------------
    console.log('\n[3/5 Testing Walking, Transfer Segments & Feasibility]');
    const transferOption = jsonA.data?.options?.find((o) => o.type === 'MULTIMODAL' || o.transfersCount >= 1);
    assert(transferOption !== undefined, 'Transfer multimodal option produced in candidate pool');

    const hasWalkToStop = transferOption?.segments?.some((s) => s.type === 'WALK' && s.subType === 'WALK_TO_STOP');
    const hasBusLeg = transferOption?.segments?.some((s) => s.type === 'BUS');
    const hasTransferInterchange = transferOption?.segments?.some((s) => s.type === 'TRANSFER');
    const hasWalkToDest = transferOption?.segments?.some((s) => s.type === 'WALK' && s.subType === 'WALK_TO_DESTINATION');

    assert(hasWalkToStop && hasBusLeg && hasTransferInterchange && hasWalkToDest, 'Complete WALK -> BUS -> TRANSFER -> BUS -> WALK itinerary structure');
    assert(transferOption?.feasibility?.reason !== undefined, 'Walking feasibility reasoning included (ON_TIME_FEASIBLE or PASSENGER_MAY_MISS_BUS)');

    // ------------------------------------------
    // 4. PREFERENCE RANKINGS (SCENARIO G, H, I)
    // ------------------------------------------
    console.log('\n[4/5 Testing Preference Rankings & Error Validations]');
    
    // 4a. Fastest
    const resFast = await fetch(`${API_BASE}/planner/multimodal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin: 'Borivali Railway Station',
        destination: 'Vashi Sector 17',
        preferences: { priority: 'FASTEST' },
      }),
    });
    const jsonFast = await resFast.json();
    assert(resFast.ok && jsonFast.data?.recommendedOption?.badge?.includes('FASTEST'), 'FASTEST preference ranked properly with badge');

    // 4b. Fewest Transfers
    const resTrans = await fetch(`${API_BASE}/planner/multimodal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin: 'Borivali Railway Station',
        destination: 'Vashi Sector 17',
        preferences: { priority: 'FEWEST_TRANSFERS' },
      }),
    });
    const jsonTrans = await resTrans.json();
    assert(resTrans.ok && jsonTrans.data?.recommendedOption !== null, 'FEWEST_TRANSFERS preference evaluated');

    // 4c. Invalid Origin
    const resInvOrig = await fetch(`${API_BASE}/planner/multimodal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination: 'Vashi Sector 17' }),
    });
    assert(resInvOrig.status === 400, 'Missing origin rejected with 400 Bad Request');

    // 4d. Invalid Destination
    const resInvDest = await fetch(`${API_BASE}/planner/multimodal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin: 'Borivali Railway Station' }),
    });
    assert(resInvDest.status === 400, 'Missing destination rejected with 400 Bad Request');

    // ------------------------------------------
    // 5. DATABASE IMMUTABILITY VERIFICATION
    // ------------------------------------------
    console.log('\n[5/5 Testing Database Immutability]');
    const finalCounts = await getDocumentCounts();

    const isCountsIdentical = Object.keys(initialCounts).every(
      (k) => initialCounts[k] === finalCounts[k]
    );

    assert(isCountsIdentical, 'Planner API is strictly READ-ONLY (Document counts before vs after are identical)');

    console.log('\n========================================');
    console.log('SMARTTRANSIT OS PLANNER TEST SUMMARY');
    console.log('========================================');
    console.log(`TOTAL TESTS: ${passed + failed}`);
    console.log(`PASSED:      ${passed}`);
    console.log(`FAILED:      ${failed}`);
    console.log(`STATUS:      ${failed === 0 ? 'ALL PASS' : 'FAILURES DETECTED'}`);
    console.log('========================================\n');

    await mongoose.disconnect();
    process.exit(failed === 0 ? 0 : 1);
  } catch (error) {
    console.error('Fatal planner test error:', error);
    process.exit(1);
  }
}

runPlannerVerification();
