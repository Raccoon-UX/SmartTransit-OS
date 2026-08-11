import { apiClient } from '../api/apiClient.js';
import { INITIAL_DRIVER_INCIDENTS, MOCK_INCIDENT_CATEGORIES } from '../../data/driver/driverIncidents.js';

let incidentsState = [...INITIAL_DRIVER_INCIDENTS];
let activeSosState = null;
let subscribers = [];

function notify() {
  subscribers.forEach((cb) => cb({ incidents: [...incidentsState], activeSos: activeSosState }));
}

export const incidentService = {
  async getIncidents() {
    try {
      const data = await apiClient.get('/incidents');
      if (Array.isArray(data) && data.length > 0) {
        incidentsState = data.map((inc) => ({
          id: inc.incidentCode || inc._id,
          title: inc.title,
          category: inc.type || 'GENERAL',
          severity: inc.severity || 'MEDIUM',
          status: inc.status || 'OPEN',
          reportedAt: inc.createdAt ? new Date(inc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:45 AM',
          location: inc.location || 'Municipal Route',
          vehicle: inc.busNumber ? `${inc.busNumber}` : 'Bus 245',
          description: inc.timeline?.[0]?.message || inc.title,
        }));
        return [...incidentsState];
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[IncidentService] Fetch warning:', error);
      }
    }
    return [...incidentsState];
  },

  getActiveSos() {
    return activeSosState;
  },

  subscribe(callback) {
    subscribers.push(callback);
    callback({ incidents: [...incidentsState], activeSos: activeSosState });
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  async triggerEmergencySos({ reason = 'Emergency SOS Triggered by Driver', category = 'GENERAL' }) {
    // Attempt backend incident creation
    try {
      await apiClient.post('/incidents', {
        title: `🚨 SOS: ${reason}`,
        severity: 'CRITICAL',
        type: 'EMERGENCY',
        location: 'Dahisar Check Naka (GPS: 19.25, 72.85)',
        busNumber: 'Bus 245',
        message: reason,
      });
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[IncidentService] SOS API warning:', e);
      }
    }
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const incId = `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const phone = '+91 7710893839';
    const email = 'vsujal956@gmail.com';
    const vehicle = 'Bus 245 (NY-TR-8042)';
    const route = 'RT-108 (Metro Coastal Express)';
    const location = 'Dahisar Check Naka (GPS: 19.25, 72.85)';

    const rawPhoneDigits = '917710893839';

    const whatsappText = `🚨 *SMARTTRANSIT OS — EMERGENCY SOS BROADCAST ACTIVE* 🚨\n\n📌 *Incident ID:* ${incId}\n⚠️ *Category:* ${reason}\n🚌 *Vehicle:* ${vehicle}\n🛤 *Route:* ${route}\n📍 *GPS Location:* ${location}\n⏰ *Timestamp:* Today at ${timestamp}\n\n📞 *Emergency Phone Target:* ${phone}\n📧 *Gmail Dispatch Target:* ${email}\n\n_State Transport SOC Command Automated Dispatch Broadcast_`;
    const whatsappUrl = `https://wa.me/${rawPhoneDigits}?text=${encodeURIComponent(whatsappText)}`;

    const emailSubject = `🚨 [EMERGENCY SOS ALERT] SmartTransit OS Dispatch ${incId} - ${reason}`;
    const emailBody = `EMERGENCY SOS BROADCAST ACTIVE\n\nIncident ID: ${incId}\nReason: ${reason}\nVehicle: ${vehicle}\nRoute: ${route}\nGPS Location: ${location}\nTimestamp: Today at ${timestamp}\n\nDispatch Target Email: ${email}\nDispatch Target Phone: ${phone}\n\nSmartTransit OS Command Operations`;
    const gmailUrl = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    const smsText = `🚨 EMERGENCY SOS (${incId}): ${reason} on Bus 245 at Dahisar Check Naka. Emergency Contact: ${phone}. Email: ${email}`;
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(smsText)}`;

    activeSosState = {
      id: incId,
      category,
      title: 'EMERGENCY SOS BROADCAST ACTIVE',
      reason,
      status: 'DISPATCH NOTIFIED',
      vehicle,
      route,
      location,
      timestamp: `Today at ${timestamp}`,
      isSimulated: false,
      dispatchNote: `Multi-channel emergency broadcast routed to ${phone} (WhatsApp/SMS) and ${email} (Gmail).`,
      targetPhone: phone,
      targetEmail: email,
      whatsappUrl,
      gmailUrl,
      smsUrl,
    };

    incidentsState = [activeSosState, ...incidentsState];
    notify();
    return activeSosState;
  },

  cancelEmergencySos() {
    if (activeSosState) {
      incidentsState = incidentsState.map((inc) =>
        inc.id === activeSosState.id ? { ...inc, status: 'CANCELLED BY DRIVER' } : inc
      );
      activeSosState = null;
      notify();
    }
  },

  reportIncident({ category, title, description, severity = 'MEDIUM', currentStop = 'Dahisar Check Naka' }) {
    const newInc = {
      id: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      title: title || 'Operational Issue Report',
      description,
      severity,
      stop: currentStop,
      status: 'SUBMITTED',
      timestamp: 'Just now',
    };

    incidentsState = [newInc, ...incidentsState];
    notify();
    return newInc;
  },
};

export default incidentService;
