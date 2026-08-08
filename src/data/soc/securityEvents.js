/**
 * SmartTransit OS — Security Event Stream & Metrics Dataset
 */

export const MOCK_SECURITY_EVENTS = [
  { id: 'sec-101', timestamp: '10:49 AM', eventType: 'RATE_LIMIT_TRIGGERED', severity: 'INFO', source: 'IP 192.168.1.xxx (Anonymized)', details: '120 req/min limit applied to public search endpoint' },
  { id: 'sec-102', timestamp: '10:45 AM', eventType: 'UNAUTHORIZED_ROUTE_ATTEMPT', severity: 'HIGH', source: 'Session #8410', details: 'Non-admin user attempted access to /admin/dispatch' },
  { id: 'sec-103', timestamp: '10:42 AM', eventType: 'FAILED_LOGIN_THRESHOLD', severity: 'WARNING', source: 'Account driver@smarttransit.city', details: '3 consecutive invalid OTP entries' },
];

export const MOCK_SECURITY_METRICS = {
  authSuccessRatePercent: 99.8,
  failedLoginCount: 12,
  blockedRequestsCount: 45,
  rateLimitEventsCount: 8,
  activeIncidentsCount: 0,
};
