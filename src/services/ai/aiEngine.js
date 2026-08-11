/**
 * SmartTransit OS — Central AI Orchestration & Intelligence Engine
 * Orchestrates deterministic simulated AI inference across all domains,
 * manages confidence scoring, explainability factors, recommendation lifecycle,
 * and controls live demo simulation triggers (Simulate Delay, Crowd Surge, GPS Anomaly, API Degradation).
 */

import { apiClient } from '../api/apiClient.js';
import { socketClient } from '../realtime/socketClient.js';
import { MOCK_AI_OVERVIEW } from '../../data/ai/aiOverview.js';
import { MOCK_ETA_PREDICTIONS } from '../../data/ai/etaPredictions.js';
import { MOCK_OCCUPANCY_FORECASTS } from '../../data/ai/occupancyForecasts.js';
import { MOCK_DEMAND_FORECASTS, MOCK_DEMAND_HEATMAP } from '../../data/ai/demandForecasts.js';
import { MOCK_ROUTE_INSIGHTS } from '../../data/ai/routeInsights.js';
import { MOCK_ANOMALY_EVENTS } from '../../data/ai/anomalyEvents.js';
import { MOCK_DRIVER_INSIGHTS } from '../../data/ai/driverInsights.js';
import { MOCK_ALERT_PREDICTIONS } from '../../data/ai/alertPredictions.js';
import { MOCK_INCIDENT_INSIGHTS, MOCK_SYSTEM_INSIGHTS } from '../../data/ai/incidentInsights.js';
import { MOCK_RECOMMENDATIONS } from '../../data/ai/recommendations.js';
import { MOCK_AI_ACTIVITY } from '../../data/ai/aiActivity.js';
import { MOCK_AI_SETTINGS } from '../../data/ai/aiSettings.js';

let state = {
  overview: { ...MOCK_AI_OVERVIEW },
  etaPredictions: [...MOCK_ETA_PREDICTIONS],
  occupancyForecasts: [...MOCK_OCCUPANCY_FORECASTS],
  demandForecasts: [...MOCK_DEMAND_FORECASTS],
  demandHeatmap: { ...MOCK_DEMAND_HEATMAP },
  routeInsights: [...MOCK_ROUTE_INSIGHTS],
  anomalyEvents: [...MOCK_ANOMALY_EVENTS],
  driverInsights: [...MOCK_DRIVER_INSIGHTS],
  alertPredictions: [...MOCK_ALERT_PREDICTIONS],
  incidentInsights: [...MOCK_INCIDENT_INSIGHTS],
  systemInsights: { ...MOCK_SYSTEM_INSIGHTS },
  recommendations: [...MOCK_RECOMMENDATIONS],
  activityLog: [...MOCK_AI_ACTIVITY],
  settings: { ...MOCK_AI_SETTINGS },
  isSimulationActive: false,
  activeSimulationType: null, // 'DELAY' | 'CROWD_SURGE' | 'GPS_ANOMALY' | 'API_DEGRADATION' | null
  _provenance: {
    source: 'SIMULATION',
    mode: 'OFFLINE_FALLBACK',
    modelType: 'AI_ORCHESTRATOR',
    confidencePercent: 90,
  },
};

let subscribers = [];
let timer = null;

function notify() {
  subscribers.forEach((cb) => cb({ ...state }));
}

// ----------------------------------------------------
// Realtime Socket.IO Listeners for Incremental AI Events
// ----------------------------------------------------
socketClient.subscribe('ai:recommendation', (rec) => {
  if (!rec) return;
  const newRec = {
    id: `rec-live-${Date.now()}`,
    type: rec.type || 'OCCUPANCY',
    title: rec.recommendation || 'Operational Recommendation',
    impact: 'Moderate Impact',
    confidence: rec.confidencePercent || 91,
    status: 'PENDING',
    timestamp: 'Just now (Live)',
    _provenance: rec._provenance || { source: 'HYBRID', mode: 'ONLINE' },
  };
  state.recommendations = [newRec, ...state.recommendations];
  notify();
});

socketClient.subscribe('ai:anomaly', (anom) => {
  if (!anom) return;
  const newAnom = {
    id: anom.id || `anom-live-${Date.now()}`,
    severity: anom.severity || 'WARNING',
    type: anom.category || 'ANOMALY',
    title: anom.title || 'Operational Anomaly',
    entity: anom.entity || 'Fleet Gateway',
    timestamp: 'Just now (Live)',
    status: 'ACTIVE',
    _provenance: anom._provenance || { source: 'RULE_ENGINE', mode: 'ONLINE' },
  };
  state.anomalyEvents = [newAnom, ...state.anomalyEvents];
  notify();
});

socketClient.subscribe('ai:eta:update', (eta) => {
  if (!eta?.busNumber) return;
  state.etaPredictions = state.etaPredictions.map((p) => {
    if (p.busNumber === eta.busNumber) {
      return {
        ...p,
        aiPredictedEta: `In ${eta.predictedEtaMinutes}m`,
        confidence: eta.confidencePercent || p.confidence,
        _provenance: eta._provenance || { source: 'HYBRID', mode: 'ONLINE' },
      };
    }
    return p;
  });
  notify();
});

function startEngineTimer() {
  if (timer) return;
  timer = setInterval(() => {
    // If Socket.IO is actively delivering live telemetry, do not jitter latency
    if (socketClient.isRealtimeActive()) return;

    state.overview.avgInferenceLatencyMs = Math.max(28, Math.min(65, state.overview.avgInferenceLatencyMs + Math.floor(Math.random() * 5 - 2)));
    notify();
  }, 3000);
}

export const aiEngine = {
  getSnapshot() {
    return { ...state };
  },

  async syncWithBackend() {
    try {
      const [overviewData, recsData, anomsData] = await Promise.allSettled([
        apiClient.get('/ai/overview'),
        apiClient.get('/ai/recommendations'),
        apiClient.get('/ai/anomalies'),
      ]);

      if (overviewData.status === 'fulfilled' && overviewData.value) {
        state.overview = { ...state.overview, ...overviewData.value };
      }
      if (recsData.status === 'fulfilled' && Array.isArray(recsData.value) && recsData.value.length > 0) {
        state.recommendations = recsData.value;
      }
      if (anomsData.status === 'fulfilled' && Array.isArray(anomsData.value) && anomsData.value.length > 0) {
        state.anomalyEvents = anomsData.value;
      }

      state._provenance = {
        source: 'DATABASE',
        mode: 'ONLINE',
        modelType: 'AI_ORCHESTRATOR',
        confidencePercent: 94,
        syncedAt: new Date().toISOString(),
      };
      notify();
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[AIEngine] Backend sync warning:', e);
      }
    }
  },

  subscribe(callback) {
    subscribers.push(callback);
    if (!timer) startEngineTimer();
    callback({ ...state });
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
      if (subscribers.length === 0 && timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  },

  /** Demo Simulation Triggers */
  triggerSimulateDelay() {
    const updatedEta = state.etaPredictions.map((eta) => {
      if (eta.busId === 'b-245') {
        return {
          ...eta,
          aiPredictedEta: '10:48',
          delayMinutes: 6,
          confidence: 88,
          confidenceLevel: 'HIGH',
          factors: [
            { label: 'Traffic bottleneck near Magathane', impactMin: 4.8 },
            { label: 'Signal delay', impactMin: 1.2 },
          ],
        };
      }
      return eta;
    });

    const newActivity = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      type: 'SIMULATION_TRIGGERED',
      entity: 'Bus 245 / RT-108',
      message: 'DEMO SIMULATION: Simulated traffic delay (+6 min delay).',
      user: 'Demo User',
    };

    state = {
      ...state,
      etaPredictions: updatedEta,
      isSimulationActive: true,
      activeSimulationType: 'DELAY',
      activityLog: [newActivity, ...state.activityLog],
    };
    notify();
  },

  triggerSimulateCrowdSurge() {
    const updatedOcc = state.occupancyForecasts.map((occ) => {
      if (occ.routeId === 'RT-108') {
        return {
          ...occ,
          currentOccupancy: 94,
          forecast10min: 98,
          riskLevel: 'CRITICAL',
          riskLabel: 'OVERCROWDED',
          confidence: 92,
        };
      }
      return occ;
    });

    const newRecommendation = {
      id: `REC-SURGE-${Date.now()}`,
      title: 'Dispatch emergency relief bus to RT-108',
      category: 'Fleet & Dispatch',
      categoryCode: 'FLEET',
      reason: 'Crowd surge simulation: RT-108 predicted occupancy at 98%.',
      expectedImpact: 'Relieve crowding by ~22%.',
      confidence: 92,
      confidenceLevel: 'HIGH',
      priority: 'CRITICAL',
      createdAt: 'Just now',
      status: 'NEW',
      targetEntity: 'RT-108',
    };

    const newActivity = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      type: 'SIMULATION_TRIGGERED',
      entity: 'RT-108 Corridor',
      message: 'DEMO SIMULATION: Simulated passenger crowd surge (94% -> 98%).',
      user: 'Demo User',
    };

    state = {
      ...state,
      occupancyForecasts: updatedOcc,
      recommendations: [newRecommendation, ...state.recommendations],
      isSimulationActive: true,
      activeSimulationType: 'CROWD_SURGE',
      activityLog: [newActivity, ...state.activityLog],
    };
    notify();
  },

  triggerSimulateGpsAnomaly() {
    const newAnomaly = {
      id: `ANM-GPS-${Date.now()}`,
      entity: 'Bus 312',
      entityId: 'b-312',
      domain: 'GPS',
      type: 'GPS_DROPOUT',
      title: 'Simulated GPS Telemetry Loss',
      description: 'GPS telemetry stream interrupted for 2 minutes on Airport Link corridor.',
      severity: 'HIGH',
      confidence: 94,
      confidenceLevel: 'HIGH',
      possibleCause: 'Simulated GPS receiver failure or hardware disconnect.',
      suggestedAction: 'Verify GPS hardware connection.',
      status: 'DETECTED',
      detectedAt: 'Just now',
      relatedRoute: 'RT-204',
    };

    const newActivity = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      type: 'SIMULATION_TRIGGERED',
      entity: 'Bus 312',
      message: 'DEMO SIMULATION: Simulated GPS telemetry dropout anomaly.',
      user: 'Demo User',
    };

    state = {
      ...state,
      anomalyEvents: [newAnomaly, ...state.anomalyEvents],
      isSimulationActive: true,
      activeSimulationType: 'GPS_ANOMALY',
      activityLog: [newActivity, ...state.activityLog],
    };
    notify();
  },

  triggerSimulateApiDegradation() {
    const newAnomaly = {
      id: `ANM-API-${Date.now()}`,
      entity: 'API Gateway',
      entityId: 'api-gw-01',
      domain: 'API',
      type: 'LATENCY_SPIKE',
      title: 'Simulated API Latency Degradation',
      description: 'P95 API latency spiked to 240ms under simulated traffic surge.',
      severity: 'CRITICAL',
      confidence: 89,
      confidenceLevel: 'HIGH',
      possibleCause: 'Simulated application gateway saturation.',
      suggestedAction: 'Scale out application nodes via SOC.',
      status: 'DETECTED',
      detectedAt: 'Just now',
      relatedRoute: null,
    };

    const newActivity = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      type: 'SIMULATION_TRIGGERED',
      entity: 'API Gateway',
      message: 'DEMO SIMULATION: Simulated API latency degradation (240ms).',
      user: 'Demo User',
    };

    state = {
      ...state,
      anomalyEvents: [newAnomaly, ...state.anomalyEvents],
      overview: {
        ...state.overview,
        avgInferenceLatencyMs: 142,
      },
      isSimulationActive: true,
      activeSimulationType: 'API_DEGRADATION',
      activityLog: [newActivity, ...state.activityLog],
    };
    notify();
  },

  resetSimulation() {
    state = {
      overview: { ...MOCK_AI_OVERVIEW },
      etaPredictions: [...MOCK_ETA_PREDICTIONS],
      occupancyForecasts: [...MOCK_OCCUPANCY_FORECASTS],
      demandForecasts: [...MOCK_DEMAND_FORECASTS],
      demandHeatmap: { ...MOCK_DEMAND_HEATMAP },
      routeInsights: [...MOCK_ROUTE_INSIGHTS],
      anomalyEvents: [...MOCK_ANOMALY_EVENTS],
      driverInsights: [...MOCK_DRIVER_INSIGHTS],
      alertPredictions: [...MOCK_ALERT_PREDICTIONS],
      incidentInsights: [...MOCK_INCIDENT_INSIGHTS],
      systemInsights: { ...MOCK_SYSTEM_INSIGHTS },
      recommendations: [...MOCK_RECOMMENDATIONS],
      activityLog: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          type: 'SIMULATION_RESET',
          entity: 'AI Engine',
          message: 'AI simulation state reset to default baseline.',
          user: 'Demo User',
        },
        ...MOCK_AI_ACTIVITY,
      ],
      settings: { ...MOCK_AI_SETTINGS },
      isSimulationActive: false,
      activeSimulationType: null,
    };
    notify();
  },

  /** Recommendation Actions */
  updateRecommendationStatus(id, newStatus) {
    state = {
      ...state,
      recommendations: state.recommendations.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec)),
      activityLog: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          type: 'RECOMMENDATION_UPDATE',
          entity: id,
          message: `Recommendation status changed to ${newStatus}.`,
          user: 'Transport Admin',
        },
        ...state.activityLog,
      ],
    };
    notify();
  },

  /** Alert Actions */
  updateAlertStatus(id, newStatus) {
    state = {
      ...state,
      alertPredictions: state.alertPredictions.map((alt) => (alt.id === id ? { ...alt, status: newStatus } : alt)),
      activityLog: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          type: 'ALERT_STATUS_UPDATE',
          entity: id,
          message: `AI Draft Alert status changed to ${newStatus}.`,
          user: 'Transport Admin',
        },
        ...state.activityLog,
      ],
    };
    notify();
  },
};

export default aiEngine;
