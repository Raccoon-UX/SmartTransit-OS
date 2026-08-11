/**
 * SmartTransit OS — Unified API Client Adapter
 * 
 * Provides robust dual-mode HTTP networking:
 * 1. Automatic Bearer JWT injection from storage.
 * 2. Timeout handling via AbortController.
 * 3. Strict error classification (Network Failure, 5xx, 401, 403, 400, 404).
 * 4. Fallback-eligibility flag for controlled offline mock resilience.
 */

const API_BASE_URL =
  import.meta.env?.VITE_API_URL || 'http://localhost:5000/api/v1';

const DEFAULT_TIMEOUT_MS = 5000;
const ACCESS_TOKEN_KEY = 'smarttransit_access_token';

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'NETWORK_ERROR', isFallbackEligible = false, details = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.isFallbackEligible = isFallbackEligible;
    this.details = details;
  }
}

export const apiClient = {
  baseUrl: API_BASE_URL,

  getAccessToken() {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY) || null;
    } catch {
      return null;
    }
  },

  setAccessToken(token) {
    try {
      if (token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    } catch (e) {
      console.warn('[ApiClient] Failed to write access token:', e);
    }
  },

  clearAccessToken() {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (e) {
      console.warn('[ApiClient] Failed to clear access token:', e);
    }
  },

  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      headers = {},
      body = null,
      timeout = DEFAULT_TIMEOUT_MS,
      params = null,
      skipAuth = false,
    } = options;

    let url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          searchParams.append(key, val);
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    const requestHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (!skipAuth) {
      const token = this.getAccessToken();
      if (token) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }
    }

    const fetchOptions = {
      method,
      headers: requestHeaders,
      signal: controller.signal,
      credentials: 'include', // for HttpOnly refresh cookie
    };

    if (body && typeof body === 'object') {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      const res = await fetch(url, fetchOptions);
      clearTimeout(timer);

      let responseData = null;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await res.json();
      }

      if (!res.ok) {
        const errorInfo = responseData?.error || {};
        const code = errorInfo.code || `HTTP_${res.status}`;
        const message = errorInfo.message || `Request failed with HTTP status ${res.status}`;

        // 502, 503, 504 are eligible for offline fallback
        const isFallbackEligible = [502, 503, 504].includes(res.status);

        throw new ApiError(message, {
          status: res.status,
          code,
          isFallbackEligible,
          details: errorInfo,
        });
      }

      // Unwrap standard `{ success: true, data: ... }` envelope
      if (responseData && typeof responseData === 'object' && 'success' in responseData) {
        return responseData.data;
      }

      return responseData;
    } catch (error) {
      clearTimeout(timer);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error.name === 'AbortError') {
        throw new ApiError(`Request timeout after ${timeout}ms`, {
          status: 408,
          code: 'TIMEOUT',
          isFallbackEligible: true,
        });
      }

      // Network unreachable or connection refused
      throw new ApiError(error.message || 'Network connection failed', {
        status: 0,
        code: 'NETWORK_FAILURE',
        isFallbackEligible: true,
      });
    }
  },

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  },

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  },

  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  },
};

export default apiClient;
