/**
 * SmartTransit OS — Realtime Socket.IO Synchronization & Security Test Suite
 */

import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

import { io as Client } from 'socket.io-client';
import mongoose from 'mongoose';
import config from '../config/env.js';
import { User, Bus, Route, Stop, Trip, Incident, Alert, SocMetric, AiInsight, AuditLog } from '../models/index.js';

const SOCKET_URL = `http://localhost:${config.port}`;
const API_BASE = `http://localhost:${config.port}/api/v1`;

async function runSocketVerification() {
  console.log('========================================');
  console.log('SMARTTRANSIT OS REALTIME SOCKET.IO TESTS');
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

    // Baseline Database Document Counts
    const beforeCounts = {
      users: await User.countDocuments(),
      buses: await Bus.countDocuments(),
      routes: await Route.countDocuments(),
      stops: await Stop.countDocuments(),
      trips: await Trip.countDocuments(),
      incidents: await Incident.countDocuments(),
      alerts: await Alert.countDocuments(),
    };

    // 1. Fetch Tokens for Each Role
    console.log('[1/5 Authenticating Test Role Tokens]');
    async function getToken(role) {
      const res = await fetch(`${API_BASE}/auth/demo-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      return data.data?.accessToken;
    }

    const passengerToken = await getToken('PASSENGER');
    const driverToken = await getToken('DRIVER');
    const adminToken = await getToken('ADMIN');
    const socToken = await getToken('SOC');

    assert(passengerToken && driverToken && adminToken && socToken, 'Generated access tokens for Passenger, Driver, Admin, SOC');

    // 2. Test Unauthenticated Connection (Should be Rejected)
    console.log('\n[2/5 Testing Unauthenticated Socket Connection Rejection]');
    const unauthPassed = await new Promise((resolve) => {
      const unauthSocket = Client(SOCKET_URL, {
        reconnection: false,
        timeout: 2000,
      });

      unauthSocket.on('connect_error', (err) => {
        unauthSocket.close();
        resolve(err.message === 'AUTHENTICATION_REQUIRED' || err.message.includes('AUTHENTICATION'));
      });

      unauthSocket.on('connect', () => {
        unauthSocket.close();
        resolve(false);
      });
    });
    assert(unauthPassed, 'Unauthenticated connection rejected with AUTHENTICATION_REQUIRED');

    // 3. Test Passenger Connected to Public Stream
    console.log('\n[3/5 Testing Passenger Public Telemetry Stream]');
    const passengerSocket = Client(SOCKET_URL, {
      auth: { token: passengerToken },
      reconnection: false,
    });

    let receivedBusPosition = false;
    let passengerReceivedSocMetrics = false;

    await new Promise((resolve) => {
      passengerSocket.on('connect', () => {
        passengerSocket.on('bus:position', (pos) => {
          if (pos && pos.busNumber && pos.coordinates) {
            receivedBusPosition = true;
          }
        });

        passengerSocket.on('soc:metrics', () => {
          passengerReceivedSocMetrics = true;
        });

        // Wait 4.5 seconds to capture a telemetry loop tick
        setTimeout(resolve, 4500);
      });
    });

    assert(receivedBusPosition, 'Passenger socket successfully received public bus:position telemetry');
    assert(!passengerReceivedSocMetrics, 'Passenger socket blocked from receiving private soc:metrics');
    passengerSocket.close();

    // 4. Test SOC Connected to Infrastructure Stream
    console.log('\n[4/5 Testing SOC Infrastructure Telemetry Stream]');
    const socSocket = Client(SOCKET_URL, {
      auth: { token: socToken },
      reconnection: false,
    });

    let socReceivedMetrics = false;
    await new Promise((resolve) => {
      socSocket.on('connect', () => {
        socSocket.on('soc:metrics', (metrics) => {
          if (metrics && metrics.globalStatus === 'OPERATIONAL') {
            socReceivedMetrics = true;
          }
        });

        // Wait 4.5 seconds to capture SOC metrics
        setTimeout(resolve, 4500);
      });
    });

    assert(socReceivedMetrics, 'SOC socket successfully received authorized soc:metrics payload');
    socSocket.close();

    // 5. Database Count Integrity (No High-Frequency Writes)
    console.log('\n[5/5 Verifying Database Write Immutability During Realtime Streams]');
    const afterCounts = {
      users: await User.countDocuments(),
      buses: await Bus.countDocuments(),
      routes: await Route.countDocuments(),
      stops: await Stop.countDocuments(),
      trips: await Trip.countDocuments(),
      incidents: await Incident.countDocuments(),
      alerts: await Alert.countDocuments(),
    };

    const isCountsEqual = Object.keys(beforeCounts).every((k) => beforeCounts[k] === afterCounts[k]);
    assert(isCountsEqual, 'Database document counts remain identical (0 high-frequency GPS writes to MongoDB)');

    console.log('\n========================================');
    console.log('SMARTTRANSIT OS REALTIME TEST SUMMARY');
    console.log('========================================');
    console.log(`TOTAL TESTS: ${passed + failed}`);
    console.log(`PASSED:      ${passed}`);
    console.log(`FAILED:      ${failed}`);
    console.log(`STATUS:      ${failed === 0 ? 'ALL PASS' : 'FAILURES DETECTED'}`);
    console.log('========================================\n');

    await mongoose.disconnect();
    process.exit(failed === 0 ? 0 : 1);
  } catch (err) {
    console.error('Fatal socket verification error:', err);
    process.exit(1);
  }
}

runSocketVerification();
