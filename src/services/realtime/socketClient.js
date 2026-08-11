/**
 * SmartTransit OS — Managed Singleton Realtime Socket Client
 * 
 * Provides controlled Socket.IO lifecycle:
 * 1. Exactly ONE managed socket connection per browser session.
 * 2. Automatic JWT authentication on handshake.
 * 3. State machine tracking: OFFLINE_SIMULATION | CONNECTING_REALTIME | REALTIME_ACTIVE | REALTIME_DISCONNECTED.
 * 4. Duplicate listener prevention and automatic subscription cleanup.
 */

import { io } from 'socket.io-client';
import { apiClient } from '../api/apiClient.js';

export const REALTIME_STATES = {
  OFFLINE_SIMULATION: 'OFFLINE_SIMULATION',
  CONNECTING_REALTIME: 'CONNECTING_REALTIME',
  REALTIME_ACTIVE: 'REALTIME_ACTIVE',
  REALTIME_DISCONNECTED: 'REALTIME_DISCONNECTED',
};

class ManagedSocketClient {
  constructor() {
    this.socket = null;
    this.state = REALTIME_STATES.OFFLINE_SIMULATION;
    this.stateSubscribers = new Set();
    this.eventListeners = new Map(); // eventName -> Set(handler)
    this.reconnectGraceTimer = null;
  }

  getState() {
    return this.state;
  }

  isRealtimeActive() {
    return this.state === REALTIME_STATES.REALTIME_ACTIVE;
  }

  onStateChange(callback) {
    this.stateSubscribers.add(callback);
    callback(this.state);
    return () => {
      this.stateSubscribers.delete(callback);
    };
  }

  setState(newState) {
    if (this.state === newState) return;
    this.state = newState;
    this.stateSubscribers.forEach((cb) => {
      try {
        cb(newState);
      } catch (err) {
        console.error('[SocketClient] State subscriber error:', err);
      }
    });
  }

  connect(explicitToken = null) {
    const token = explicitToken || apiClient.getAccessToken();

    if (!token) {
      this.setState(REALTIME_STATES.OFFLINE_SIMULATION);
      return;
    }

    if (this.socket && this.socket.connected) {
      return;
    }

    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.setState(REALTIME_STATES.CONNECTING_REALTIME);

    const socketUrl = import.meta.env?.VITE_WS_URL || 'http://localhost:5000';

    this.socket = io(socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      timeout: 6000,
    });

    this.socket.on('connect', () => {
      this.setState(REALTIME_STATES.REALTIME_ACTIVE);

      // Re-bind all registered listeners
      this.eventListeners.forEach((handlers, eventName) => {
        handlers.forEach((handler) => {
          this.socket.on(eventName, handler);
        });
      });
    });

    this.socket.on('disconnect', (reason) => {
      if (this.reconnectGraceTimer) clearTimeout(this.reconnectGraceTimer);
      this.reconnectGraceTimer = setTimeout(() => {
        if (!this.socket || !this.socket.connected) {
          this.setState(REALTIME_STATES.REALTIME_DISCONNECTED);
        }
      }, 1500);
    });

    this.socket.on('connect_error', (err) => {
      this.setState(REALTIME_STATES.REALTIME_DISCONNECTED);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.setState(REALTIME_STATES.OFFLINE_SIMULATION);
  }

  subscribe(eventName, handler) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set());
    }

    const handlers = this.eventListeners.get(eventName);
    if (handlers.has(handler)) return () => {}; // Prevent duplicate registration

    handlers.add(handler);

    if (this.socket && this.socket.connected) {
      this.socket.on(eventName, handler);
    }

    return () => {
      this.unsubscribe(eventName, handler);
    };
  }

  unsubscribe(eventName, handler) {
    const handlers = this.eventListeners.get(eventName);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.eventListeners.delete(eventName);
      }
    }

    if (this.socket) {
      this.socket.off(eventName, handler);
    }
  }
}

export const socketClient = new ManagedSocketClient();
export default socketClient;
