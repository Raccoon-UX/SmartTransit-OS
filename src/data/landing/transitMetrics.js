/**
 * SmartTransit OS — Prototype Landing Metrics
 * Isolated mock data ready to connect to real analytics APIs in future stages.
 */

export const LANDING_METRICS = {
  hero: {
    activeBuses: 256,
    connectedRiders: '8,451',
    systemUptime: '99.98%',
    networkStatus: 'LIVE TRANSIT NETWORK',
  },

  preview: {
    activeFleet: 256,
    liveTrips: 184,
    averageEta: '6 min',
    onTimeRate: '94.7%',
  },

  impact: [
    {
      value: '256+',
      label: 'Active Fleet Buses',
      description: 'Simulated real-time vehicles tracked simultaneously across metropolitan routes.',
      trend: '+14% this month',
    },
    {
      value: '8K+',
      label: 'Connected Commuters',
      description: 'Passengers receiving live bus arrival updates and crowding status.',
      trend: 'Peak morning mesh',
    },
    {
      value: '94.7%',
      label: 'On-Time Performance',
      description: 'AI-assisted schedule dispatch reducing curb waiting uncertainty.',
      trend: '+3.2% vs. baseline',
    },
    {
      value: '99.98%',
      label: 'Platform Uptime',
      description: 'High-availability telemetry ingestion gateway and WebSocket cluster.',
      trend: 'Zero critical outages',
    },
  ],
};
