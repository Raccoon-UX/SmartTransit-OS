import React, { useState, Suspense, lazy } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { LandingPage } from '../modules/landing/LandingPage.jsx';
import { LoginPage } from '../modules/auth/LoginPage.jsx';
import { RegisterPage } from '../modules/auth/RegisterPage.jsx';
import { ForgotPasswordPage } from '../modules/auth/ForgotPasswordPage.jsx';
import { OtpVerificationPage } from '../modules/auth/OtpVerificationPage.jsx';
import { ResetPasswordPage } from '../modules/auth/ResetPasswordPage.jsx';
import { UnauthorizedPage } from '../modules/auth/UnauthorizedPage.jsx';
import { ProtectedRoute } from '../components/auth/ProtectedRoute.jsx';
import { AppShell } from '../layouts/AppShell.jsx';
import { AppShellShowcase } from '../components/shell/AppShellShowcase.jsx';
import { ErrorBoundary } from '../components/system/ErrorBoundary.jsx';
import { PageLoading } from '../components/ui/LoadingStates.jsx';

// Passenger Portal Pages (Lazy Loaded)
const PassengerDashboard = lazy(() => import('../modules/passenger/pages/PassengerDashboard.jsx').then((m) => ({ default: m.PassengerDashboard })));
const LiveMapPage = lazy(() => import('../modules/passenger/pages/LiveMapPage.jsx').then((m) => ({ default: m.LiveMapPage })));
const BusSearchPage = lazy(() => import('../modules/passenger/pages/BusSearchPage.jsx').then((m) => ({ default: m.BusSearchPage })));
const PassengerBusDetailPage = lazy(() => import('../modules/passenger/pages/BusDetailPage.jsx').then((m) => ({ default: m.BusDetailPage })));
const RoutesListPage = lazy(() => import('../modules/passenger/pages/RoutesListPage.jsx').then((m) => ({ default: m.RoutesListPage })));
const PassengerRouteDetailPage = lazy(() => import('../modules/passenger/pages/RouteDetailPage.jsx').then((m) => ({ default: m.RouteDetailPage })));
const JourneyPlannerPage = lazy(() => import('../modules/passenger/pages/JourneyPlannerPage.jsx').then((m) => ({ default: m.JourneyPlannerPage })));
const FavoritesPage = lazy(() => import('../modules/passenger/pages/FavoritesPage.jsx').then((m) => ({ default: m.FavoritesPage })));
const NotificationsPage = lazy(() => import('../modules/passenger/pages/NotificationsPage.jsx').then((m) => ({ default: m.NotificationsPage })));
const PassengerProfilePage = lazy(() => import('../modules/passenger/pages/PassengerProfilePage.jsx').then((m) => ({ default: m.PassengerProfilePage })));

// Driver Portal Pages (Lazy Loaded)
const DriverDashboard = lazy(() => import('../modules/driver/pages/DriverDashboard.jsx').then((m) => ({ default: m.DriverDashboard })));
const DriverTripPage = lazy(() => import('../modules/driver/pages/DriverTripPage.jsx').then((m) => ({ default: m.DriverTripPage })));
const DriverNavigationPage = lazy(() => import('../modules/driver/pages/DriverNavigationPage.jsx').then((m) => ({ default: m.DriverNavigationPage })));
const DriverOccupancyPage = lazy(() => import('../modules/driver/pages/DriverOccupancyPage.jsx').then((m) => ({ default: m.DriverOccupancyPage })));
const DriverEmergencyPage = lazy(() => import('../modules/driver/pages/DriverEmergencyPage.jsx').then((m) => ({ default: m.DriverEmergencyPage })));
const DriverReportsPage = lazy(() => import('../modules/driver/pages/DriverReportsPage.jsx').then((m) => ({ default: m.DriverReportsPage })));
const DriverProfilePage = lazy(() => import('../modules/driver/pages/DriverProfilePage.jsx').then((m) => ({ default: m.DriverProfilePage })));

// Transport Admin Portal Pages (Lazy Loaded)
const AdminDashboard = lazy(() => import('../modules/admin/pages/AdminDashboard.jsx').then((m) => ({ default: m.AdminDashboard })));
const FleetPage = lazy(() => import('../modules/admin/pages/FleetPage.jsx').then((m) => ({ default: m.FleetPage })));
const AdminBusDetailPage = lazy(() => import('../modules/admin/pages/BusDetailPage.jsx').then((m) => ({ default: m.BusDetailPage })));
const DriversPage = lazy(() => import('../modules/admin/pages/DriversPage.jsx').then((m) => ({ default: m.DriversPage })));
const AdminDriverDetailPage = lazy(() => import('../modules/admin/pages/DriverDetailPage.jsx').then((m) => ({ default: m.DriverDetailPage })));
const RoutesPage = lazy(() => import('../modules/admin/pages/RoutesPage.jsx').then((m) => ({ default: m.RoutesPage })));
const AdminRouteDetailPage = lazy(() => import('../modules/admin/pages/RouteDetailPage.jsx').then((m) => ({ default: m.RouteDetailPage })));
const StopsPage = lazy(() => import('../modules/admin/pages/StopsPage.jsx').then((m) => ({ default: m.StopsPage })));
const AdminStopDetailPage = lazy(() => import('../modules/admin/pages/StopDetailPage.jsx').then((m) => ({ default: m.StopDetailPage })));
const SchedulesPage = lazy(() => import('../modules/admin/pages/SchedulesPage.jsx').then((m) => ({ default: m.SchedulesPage })));
const DispatchPage = lazy(() => import('../modules/admin/pages/DispatchPage.jsx').then((m) => ({ default: m.DispatchPage })));
const AlertsPage = lazy(() => import('../modules/admin/pages/AlertsPage.jsx').then((m) => ({ default: m.AlertsPage })));
const AnalyticsPage = lazy(() => import('../modules/admin/pages/AnalyticsPage.jsx').then((m) => ({ default: m.AnalyticsPage })));
const ReportsPage = lazy(() => import('../modules/admin/pages/ReportsPage.jsx').then((m) => ({ default: m.ReportsPage })));
const AdminSocPreviewPage = lazy(() => import('../modules/admin/pages/SocPage.jsx').then((m) => ({ default: m.SocPage })));
const SettingsPage = lazy(() => import('../modules/admin/pages/SettingsPage.jsx').then((m) => ({ default: m.SettingsPage })));

// SOC System Operations Center Pages (Lazy Loaded)
const SocOverviewPage = lazy(() => import('../modules/soc/pages/SocOverviewPage.jsx').then((m) => ({ default: m.SocOverviewPage })));
const InfrastructurePage = lazy(() => import('../modules/soc/pages/InfrastructurePage.jsx').then((m) => ({ default: m.InfrastructurePage })));
const ServersPage = lazy(() => import('../modules/soc/pages/ServersPage.jsx').then((m) => ({ default: m.ServersPage })));
const ApiMonitoringPage = lazy(() => import('../modules/soc/pages/ApiMonitoringPage.jsx').then((m) => ({ default: m.ApiMonitoringPage })));
const SessionsPage = lazy(() => import('../modules/soc/pages/SessionsPage.jsx').then((m) => ({ default: m.SessionsPage })));
const GpsMonitoringPage = lazy(() => import('../modules/soc/pages/GpsMonitoringPage.jsx').then((m) => ({ default: m.GpsMonitoringPage })));
const DatabasePage = lazy(() => import('../modules/soc/pages/DatabasePage.jsx').then((m) => ({ default: m.DatabasePage })));
const BackupsPage = lazy(() => import('../modules/soc/pages/BackupsPage.jsx').then((m) => ({ default: m.BackupsPage })));
const SecurityPage = lazy(() => import('../modules/soc/pages/SecurityPage.jsx').then((m) => ({ default: m.SecurityPage })));
const IncidentsPage = lazy(() => import('../modules/soc/pages/IncidentsPage.jsx').then((m) => ({ default: m.IncidentsPage })));
const TelemetryPage = lazy(() => import('../modules/soc/pages/TelemetryPage.jsx').then((m) => ({ default: m.TelemetryPage })));
const ScalabilityPage = lazy(() => import('../modules/soc/pages/ScalabilityPage.jsx').then((m) => ({ default: m.ScalabilityPage })));
const SocSettingsPage = lazy(() => import('../modules/soc/pages/SocSettingsPage.jsx').then((m) => ({ default: m.SocSettingsPage })));

// AI Intelligence Layer Pages (Lazy Loaded)
const AiOverviewPage = lazy(() => import('../modules/ai/pages/AiOverviewPage.jsx').then((m) => ({ default: m.AiOverviewPage })));
const EtaIntelligencePage = lazy(() => import('../modules/ai/pages/EtaIntelligencePage.jsx').then((m) => ({ default: m.EtaIntelligencePage })));
const OccupancyForecastPage = lazy(() => import('../modules/ai/pages/OccupancyForecastPage.jsx').then((m) => ({ default: m.OccupancyForecastPage })));
const DemandForecastPage = lazy(() => import('../modules/ai/pages/DemandForecastPage.jsx').then((m) => ({ default: m.DemandForecastPage })));
const RouteIntelligencePage = lazy(() => import('../modules/ai/pages/RouteIntelligencePage.jsx').then((m) => ({ default: m.RouteIntelligencePage })));
const AnomalyDetectionPage = lazy(() => import('../modules/ai/pages/AnomalyDetectionPage.jsx').then((m) => ({ default: m.AnomalyDetectionPage })));
const DriverIntelligencePage = lazy(() => import('../modules/ai/pages/DriverIntelligencePage.jsx').then((m) => ({ default: m.DriverIntelligencePage })));
const IntelligentAlertsPage = lazy(() => import('../modules/ai/pages/IntelligentAlertsPage.jsx').then((m) => ({ default: m.IntelligentAlertsPage })));
const IncidentIntelligencePage = lazy(() => import('../modules/ai/pages/IncidentIntelligencePage.jsx').then((m) => ({ default: m.IncidentIntelligencePage })));
const SystemIntelligencePage = lazy(() => import('../modules/ai/pages/SystemIntelligencePage.jsx').then((m) => ({ default: m.SystemIntelligencePage })));
const RecommendationCenterPage = lazy(() => import('../modules/ai/pages/RecommendationCenterPage.jsx').then((m) => ({ default: m.RecommendationCenterPage })));
const AiActivityPage = lazy(() => import('../modules/ai/pages/AiActivityPage.jsx').then((m) => ({ default: m.AiActivityPage })));
const ModelHealthPage = lazy(() => import('../modules/ai/pages/ModelHealthPage.jsx').then((m) => ({ default: m.ModelHealthPage })));
const AiSettingsPage = lazy(() => import('../modules/ai/pages/AiSettingsPage.jsx').then((m) => ({ default: m.AiSettingsPage })));

import { SmartTransitLoader } from '../components/system/SmartTransitLoader.jsx';
import { StatusBadge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { ROLE_METADATA } from '../services/auth/authTypes.js';
import { canAccessPath } from '../services/auth/rbacConfig.js';


export function AppRouter() {
  const { user, role, isAuthenticated, logout } = useAuth();
  const [currentRoute, setCurrentRoute] = useState('/'); // '/', '/login', etc.
  const [isInitialBoot, setIsInitialBoot] = useState(true);

  const [verificationEmail, setVerificationEmail] = useState('sysadmin@smarttransit.city');

  const navigateTo = (path) => {
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initial Application Boot Loader
  if (isInitialBoot) {
    return <SmartTransitLoader onComplete={() => setIsInitialBoot(false)} />;
  }

  // Route 1: Public Landing Page
  if (currentRoute === '/') {
    return (
      <LandingPage
        onSwitchToShell={() => {
          const defaultPath = (role && ROLE_METADATA[role]?.defaultRoute) || '/soc/overview';
          navigateTo(defaultPath);
        }}
        onOpenSignIn={() => navigateTo('/login')}
      />
    );
  }


  // Route 2: Login Page (/login)
  if (currentRoute === '/login') {
    return (
      <LoginPage
        onNavigateHome={() => navigateTo('/')}
        onNavigateRegister={() => navigateTo('/register')}
        onNavigateForgotPassword={() => navigateTo('/forgot-password')}
        onLoginSuccess={(authUser) => {
          const defaultPath = ROLE_METADATA[authUser.role]?.defaultRoute || '/soc/overview';
          navigateTo(defaultPath);
        }}
      />
    );
  }

  // Route 3: Register Page (/register)
  if (currentRoute === '/register') {
    return (
      <RegisterPage
        onNavigateHome={() => navigateTo('/')}
        onNavigateLogin={() => navigateTo('/login')}
        onRegisterSuccess={() => {
          navigateTo('/soc/overview');
        }}
      />
    );
  }

  // Route 4: Forgot Password (/forgot-password)
  if (currentRoute === '/forgot-password') {
    return (
      <ForgotPasswordPage
        onNavigateLogin={() => navigateTo('/login')}
        onOtpRequested={({ emailOrPhone }) => {
          setVerificationEmail(emailOrPhone);
          navigateTo('/verify');
        }}
      />
    );
  }

  // Route 5: OTP Verification (/verify)
  if (currentRoute === '/verify') {
    return (
      <OtpVerificationPage
        targetEmail={verificationEmail}
        onNavigateLogin={() => navigateTo('/login')}
        onVerifySuccess={() => {
          navigateTo('/reset-password');
        }}
      />
    );
  }

  // Route 6: Reset Password (/reset-password)
  if (currentRoute === '/reset-password') {
    return (
      <ResetPasswordPage
        onNavigateLogin={() => navigateTo('/login')}
        onResetSuccess={() => {
          navigateTo('/login');
        }}
      />
    );
  }

  // Route 7: Unauthorized Page (/unauthorized)
  if (currentRoute === '/unauthorized') {
    return (
      <UnauthorizedPage
        onNavigateBack={() => navigateTo('/')}
        onNavigateDashboard={() => {
          const defaultPath = (role && ROLE_METADATA[role]?.defaultRoute) || '/login';
          navigateTo(defaultPath);
        }}
      />
    );
  }

  // Helper to resolve the active navigation item ID
  const getActiveNavItem = () => {
    // AI routes mapping
    if (currentRoute.startsWith('/ai')) {
      if (currentRoute.includes('/eta')) return 'ai-eta';
      if (currentRoute.includes('/occupancy')) return 'ai-occupancy';
      if (currentRoute.includes('/demand')) return 'ai-demand';
      if (currentRoute.includes('/routes')) return 'ai-routes';
      if (currentRoute.includes('/anomalies')) return 'ai-anomalies';
      if (currentRoute.includes('/drivers')) return 'ai-drivers';
      if (currentRoute.includes('/alerts')) return 'ai-alerts';
      if (currentRoute.includes('/incidents')) return 'ai-incidents';
      if (currentRoute.includes('/system')) return 'ai-system';
      if (currentRoute.includes('/recommendations')) return 'ai-recommendations';
      if (currentRoute.includes('/activity')) return 'ai-activity';
      if (currentRoute.includes('/models')) return 'ai-models';
      if (currentRoute.includes('/settings')) return 'ai-settings';
      return 'ai-overview';
    }

    // SOC routes mapping
    if (currentRoute.startsWith('/soc')) {
      if (currentRoute.includes('/infrastructure')) return 'soc-infrastructure';
      if (currentRoute.includes('/servers')) return 'soc-servers';
      if (currentRoute.includes('/api')) return 'soc-api';
      if (currentRoute.includes('/sessions')) return 'soc-sessions';
      if (currentRoute.includes('/gps')) return 'soc-gps';
      if (currentRoute.includes('/database')) return 'soc-database';
      if (currentRoute.includes('/backups')) return 'soc-backups';
      if (currentRoute.includes('/security')) return 'soc-security';
      if (currentRoute.includes('/incidents')) return 'soc-incidents';
      if (currentRoute.includes('/telemetry')) return 'soc-telemetry';
      if (currentRoute.includes('/scalability')) return 'soc-scalability';
      if (currentRoute.includes('/settings')) return 'soc-settings';
      return 'soc-overview';
    }


    // Transport Admin routes mapping
    if (currentRoute.startsWith('/admin')) {
      if (currentRoute.startsWith('/admin/fleet')) return 'admin-fleet';
      if (currentRoute.startsWith('/admin/drivers')) return 'admin-drivers';
      if (currentRoute.startsWith('/admin/routes')) return 'admin-routes';
      if (currentRoute.startsWith('/admin/stops')) return 'admin-stops';
      if (currentRoute.includes('/schedules')) return 'admin-schedules';
      if (currentRoute.includes('/dispatch')) return 'admin-dispatch';
      if (currentRoute.includes('/alerts')) return 'admin-alerts';
      if (currentRoute.includes('/analytics')) return 'admin-analytics';
      if (currentRoute.includes('/reports')) return 'admin-reports';
      if (currentRoute.includes('/soc')) return 'admin-soc';
      if (currentRoute.includes('/settings')) return 'admin-settings';
      return 'admin-dashboard';
    }

    // Driver routes mapping
    if (currentRoute.startsWith('/driver')) {
      if (currentRoute.includes('/trip')) return 'driver-trip';
      if (currentRoute.includes('/navigation')) return 'driver-navigation';
      if (currentRoute.includes('/occupancy')) return 'driver-occupancy';
      if (currentRoute.includes('/emergency')) return 'driver-emergency';
      if (currentRoute.includes('/reports')) return 'driver-reports';
      if (currentRoute.includes('/profile')) return 'driver-profile';
      return 'driver-dashboard';
    }

    // Passenger routes mapping
    if (currentRoute.includes('/live-map')) return 'live-map';
    if (currentRoute.includes('/search')) return 'search-bus';
    if (currentRoute.includes('/routes')) return 'routes';
    if (currentRoute.includes('/planner') || currentRoute.includes('/journey-planner')) return 'journey-planner';
    if (currentRoute.includes('/favorites')) return 'favorites';
    if (currentRoute.includes('/notifications')) return 'notifications';
    if (currentRoute.includes('/profile')) return 'profile';
    return 'dashboard';
  };

  // Helper to render the active App Content
  const renderAppContent = () => {
    // AI Module Pages & Centralized RBAC Gate
    if (currentRoute.startsWith('/ai')) {
      if (!canAccessPath(role || 'systemAdmin', currentRoute)) {
        return (
          <UnauthorizedPage
            onNavigateBack={() => navigateTo('/')}
            onNavigateDashboard={() => {
              const defaultPath = (role && ROLE_METADATA[role]?.defaultRoute) || '/login';
              navigateTo(defaultPath);
            }}
          />
        );
      }

      if (currentRoute === '/ai' || currentRoute === '/ai/overview') {
        return <AiOverviewPage onNavigate={navigateTo} />;
      }
      if (currentRoute === '/ai/eta') {
        return <EtaIntelligencePage />;
      }
      if (currentRoute === '/ai/occupancy') {
        return <OccupancyForecastPage />;
      }
      if (currentRoute === '/ai/demand') {
        return <DemandForecastPage />;
      }
      if (currentRoute === '/ai/routes') {
        return <RouteIntelligencePage />;
      }
      if (currentRoute === '/ai/anomalies') {
        return <AnomalyDetectionPage />;
      }
      if (currentRoute === '/ai/drivers') {
        return <DriverIntelligencePage />;
      }
      if (currentRoute === '/ai/alerts') {
        return <IntelligentAlertsPage />;
      }
      if (currentRoute === '/ai/incidents') {
        return <IncidentIntelligencePage />;
      }
      if (currentRoute === '/ai/system') {
        return <SystemIntelligencePage />;
      }
      if (currentRoute === '/ai/recommendations') {
        return <RecommendationCenterPage />;
      }
      if (currentRoute === '/ai/activity') {
        return <AiActivityPage />;
      }
      if (currentRoute === '/ai/models') {
        return <ModelHealthPage />;
      }
      if (currentRoute === '/ai/settings') {
        return <AiSettingsPage />;
      }
    }

    // SOC Module Pages
    if (currentRoute === '/soc' || currentRoute === '/soc/overview') {
      return <SocOverviewPage />;
    }

    if (currentRoute === '/soc/infrastructure') {
      return <InfrastructurePage />;
    }
    if (currentRoute === '/soc/servers') {
      return <ServersPage />;
    }
    if (currentRoute === '/soc/api') {
      return <ApiMonitoringPage />;
    }
    if (currentRoute === '/soc/sessions') {
      return <SessionsPage />;
    }
    if (currentRoute === '/soc/gps') {
      return <GpsMonitoringPage />;
    }
    if (currentRoute === '/soc/database') {
      return <DatabasePage />;
    }
    if (currentRoute === '/soc/backups') {
      return <BackupsPage />;
    }
    if (currentRoute === '/soc/security') {
      return <SecurityPage />;
    }
    if (currentRoute === '/soc/incidents') {
      return <IncidentsPage />;
    }
    if (currentRoute === '/soc/telemetry') {
      return <TelemetryPage />;
    }
    if (currentRoute === '/soc/scalability') {
      return <ScalabilityPage />;
    }
    if (currentRoute === '/soc/settings') {
      return <SocSettingsPage />;
    }

    // Transport Admin Module Pages
    if (currentRoute === '/admin' || currentRoute === '/admin/dashboard') {
      return <AdminDashboard onNavigate={navigateTo} />;
    }
    if (currentRoute === '/admin/fleet') {
      return <FleetPage onNavigate={navigateTo} />;
    }
    if (currentRoute.startsWith('/admin/fleet/')) {
      const busId = currentRoute.replace('/admin/fleet/', '');
      return <AdminBusDetailPage busId={busId} onNavigate={navigateTo} />;
    }
    if (currentRoute === '/admin/drivers') {
      return <DriversPage onNavigate={navigateTo} />;
    }
    if (currentRoute.startsWith('/admin/drivers/')) {
      const driverId = currentRoute.replace('/admin/drivers/', '');
      return <AdminDriverDetailPage driverId={driverId} onNavigate={navigateTo} />;
    }
    if (currentRoute === '/admin/routes') {
      return <RoutesPage onNavigate={navigateTo} />;
    }
    if (currentRoute.startsWith('/admin/routes/')) {
      const routeId = currentRoute.replace('/admin/routes/', '');
      return <AdminRouteDetailPage routeId={routeId} onNavigate={navigateTo} />;
    }
    if (currentRoute === '/admin/stops') {
      return <StopsPage onNavigate={navigateTo} />;
    }
    if (currentRoute.startsWith('/admin/stops/')) {
      const stopId = currentRoute.replace('/admin/stops/', '');
      return <AdminStopDetailPage stopId={stopId} onNavigate={navigateTo} />;
    }
    if (currentRoute === '/admin/schedules') {
      return <SchedulesPage />;
    }
    if (currentRoute === '/admin/dispatch') {
      return <DispatchPage />;
    }
    if (currentRoute === '/admin/alerts') {
      return <AlertsPage />;
    }
    if (currentRoute === '/admin/analytics') {
      return <AnalyticsPage />;
    }
    if (currentRoute === '/admin/reports') {
      return <ReportsPage />;
    }
    if (currentRoute === '/admin/soc') {
      return (
        <AdminSocPreviewPage
          onOpenSoc={() => navigateTo('/soc/overview')}
        />
      );
    }
    if (currentRoute === '/admin/settings') {
      return <SettingsPage />;
    }

    // Driver Module Pages
    if (currentRoute === '/driver' || currentRoute === '/driver/dashboard') {
      return <DriverDashboard onNavigate={navigateTo} />;
    }
    if (currentRoute === '/driver/trip') {
      return <DriverTripPage onNavigate={navigateTo} />;
    }
    if (currentRoute === '/driver/navigation') {
      return <DriverNavigationPage onNavigate={navigateTo} />;
    }
    if (currentRoute === '/driver/occupancy') {
      return <DriverOccupancyPage />;
    }
    if (currentRoute === '/driver/emergency') {
      return <DriverEmergencyPage />;
    }
    if (currentRoute === '/driver/reports') {
      return <DriverReportsPage />;
    }
    if (currentRoute === '/driver/profile') {
      return <DriverProfilePage onLogoutSuccess={() => navigateTo('/login')} />;
    }

    // Passenger Module Pages
    if (currentRoute === '/passenger' || currentRoute === '/passenger/dashboard') {
      return <PassengerDashboard onNavigate={navigateTo} />;
    }
    if (currentRoute === '/passenger/live-map') {
      return <LiveMapPage onNavigate={navigateTo} />;
    }
    if (currentRoute.startsWith('/passenger/search')) {
      const q = currentRoute.includes('?q=') ? decodeURIComponent(currentRoute.split('?q=')[1]) : '';
      return <BusSearchPage initialQuery={q} onNavigate={navigateTo} />;
    }
    if (currentRoute.startsWith('/passenger/bus/')) {
      const busId = currentRoute.replace('/passenger/bus/', '');
      return <PassengerBusDetailPage busId={busId} onNavigate={navigateTo} />;
    }
    if (currentRoute === '/passenger/routes') {
      return <RoutesListPage onNavigate={navigateTo} />;
    }
    if (currentRoute.startsWith('/passenger/routes/')) {
      const routeId = currentRoute.replace('/passenger/routes/', '');
      return <PassengerRouteDetailPage routeId={routeId} onNavigate={navigateTo} />;
    }
    if (currentRoute === '/passenger/planner' || currentRoute === '/passenger/journey-planner') {
      return <JourneyPlannerPage onNavigate={navigateTo} />;
    }
    if (currentRoute === '/passenger/favorites') {
      return <FavoritesPage onNavigate={navigateTo} />;
    }
    if (currentRoute === '/passenger/notifications') {
      return <NotificationsPage />;
    }
    if (currentRoute === '/passenger/profile') {
      return <PassengerProfilePage onLogoutSuccess={() => navigateTo('/login')} />;
    }

    // Fallback View
    return (
      <div className="space-y-6 text-left">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" leftIcon={ArrowLeft} onClick={() => navigateTo('/')}>
              Public Website
            </Button>
            <span className="text-xs font-mono text-slate-400">
              Route: <strong className="text-transit-500">{currentRoute}</strong>
            </span>
          </div>
          <StatusBadge status="ACTIVE" label={user?.name || 'Session'} size="sm" />
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-transit-500/10 text-transit-600 dark:text-transit-400 border border-transit-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
                {ROLE_METADATA[role]?.name || role} Command Area
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                RBAC Verified • User ID: {user?.id} • Department: SRE / NOC Operations
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <Button variant="primary" size="sm" onClick={() => navigateTo('/soc/overview')}>
              Open SOC Command Overview
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateTo('/admin/dashboard')}>
              Open Transport Admin
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateTo('/driver/dashboard')}>
              Open Driver Cockpit
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateTo('/passenger/dashboard')}>
              Open Passenger Portal
            </Button>
          </div>
        </div>

        <AppShellShowcase />
      </div>
    );
  };

  // Protected Application Shell
  return (
    <ProtectedRoute
      onNavigateToLogin={() => navigateTo('/login')}
      onNavigateToUnauthorized={() => navigateTo('/unauthorized')}
    >
      <AppShell
        currentRole={role || 'systemAdmin'}
        activeItemId={getActiveNavItem()}
        onSelectItem={(navItem) => {
          if (navItem.path) {
            navigateTo(navItem.path);
          }
        }}
      >
        <ErrorBoundary>
          <Suspense fallback={<PageLoading message="Loading transit module..." />}>
            {renderAppContent()}
          </Suspense>
        </ErrorBoundary>
      </AppShell>
    </ProtectedRoute>
  );
}

export default AppRouter;

