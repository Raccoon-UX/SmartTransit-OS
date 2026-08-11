import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

import mongoose from 'mongoose';
import config from './env.js';

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  try {
    const conn = await mongoose.connect(config.mongodbUri, options);
    isConnected = true;
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error('[Database] MongoDB runtime connection error:', err.message);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database] MongoDB connection lost. Attempting reconnection...');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('[Database] MongoDB reconnected successfully.');
      isConnected = true;
    });

    return conn.connection;
  } catch (error) {
    console.warn(`[Database] Initial MongoDB connection attempt failed: ${error.message}`);
    isConnected = false;
    // Do not crash server; return state so health checks report DISCONNECTED accurately
    return null;
  }
}

export function getDatabaseStatus() {
  const readyState = mongoose.connection.readyState;
  switch (readyState) {
    case 1:
      return 'CONNECTED';
    case 2:
      return 'CONNECTING';
    case 3:
      return 'DISCONNECTING';
    default:
      return 'DISCONNECTED';
  }
}

export async function closeDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    isConnected = false;
    console.log('[Database] MongoDB connection closed cleanly.');
  }
}

export default { connectDatabase, getDatabaseStatus, closeDatabase };
