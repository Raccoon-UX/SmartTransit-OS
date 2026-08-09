# 🏛️ SMARTTRANSIT OS — COMPREHENSIVE PLATFORM DOCUMENTATION

**Official Government Public Transport & Urban Mobility Operating System**  
*Implementation Milestones: ST-01 through ST-80 | Release: v1.0.0 Stable*

---

## 1. Executive Summary & Platform Overview

SmartTransit OS is an enterprise-grade, smart city public transportation platform designed for municipal transit corporations (such as MSRTC, BEST, and TMT). It unifies four specialized role portals into a single, cohesive web application:

1. 👤 **Passenger Commuter Portal**: Live map search, route planner, digital stop kiosks, active journey status, service advisories, and Marathi localization.
2. 👨‍✈️ **Driver Cockpit**: Waypoint GPS navigation, live vehicle occupancy reporter, shift timetable, and 3-way multi-channel emergency SOS dispatch (WhatsApp `+91 7710893839`, Gmail `vsujal956@gmail.com`, and SMS).
3. 👩‍💼 **Transport Admin Console**: Fleet management, driver assignments, route network control, schedule dispatcher, and demand heatmaps.
4. 👨‍💻 **System Operations Center (SOC)**: Infrastructure health monitoring, telemetry stream simulator, database backup manager, and RBAC key security.

---

## 2. Technical Architecture & Component Tree

```text
SmartTransit OS Architecture
├── src/
│   ├── assets/                      # Brand logos, bus photos, loader images
│   ├── components/
│   │   ├── navigation/              # AppSidebar, NavContainer, RoleSwitcher
│   │   ├── profile/                 # ProfileMenu, UserProfileDrawer, UserPreferencesDrawer, UserSecurityDrawer
│   │   ├── public/                  # PublicNavbar, PublicFooter, PublicInfoModal
│   │   ├── system/                  # SmartTransitLoader, LiveSystemIndicator
│   │   └── ui/                      # UserAvatar, Button, Drawer, Modal, Badge
│   ├── context/
│   │   ├── AuthContext.jsx          # Role authentication & demo switcher
│   │   ├── ThemeContext.jsx         # Dark/Light theme token state
│   │   └── PublicAccessibilityContext.jsx # Marathi / English localization & text scaling
│   ├── layouts/
│   │   ├── AppHeader.jsx            # Top government masthead header
│   │   ├── AppShell.jsx             # Main dashboard container
│   │   └── PublicLayout.jsx         # Landing page wrapper & footer
│   ├── modules/
│   │   ├── admin/                   # Fleet, Drivers, Routes, Schedules, Analytics
│   │   ├── ai/                      # AI Intelligence Center, AIDemoControls
│   │   ├── driver/                  # Navigation, Occupancy, Emergency SOS
│   │   ├── passenger/               # Live Map, Search, Active Trip Card
│   │   └── soc/                     # Telemetry Engine, Backups, Security
│   ├── routes/
│   │   ├── AppRouter.jsx            # Lazy-loaded route code-splitting
│   │   └── ProtectedRoute.jsx       # RBAC path protection
│   └── services/
│       ├── ai/                      # aiEngine.js predictive inference
│       ├── auth/                    # rbacConfig.js, authTypes.js, ROLE_METADATA
│       └── driver/                  # incidentService.js multi-channel SOS
```

---

## 3. Implementation Trajectory (ST-01 to ST-80)

- **ST-01 → ST-10**: System Architecture, AppShell, Theme Tokens, Design System.
- **ST-11 → ST-20**: RBAC Guarding, AuthContext, RoleSwitcher (`admin`, `driver`, `passenger`, `systemAdmin`).
- **ST-21 → ST-30**: Passenger Portal, Live Bus Map, Journey Planner, Active Trip Card.
- **ST-31 → ST-40**: Transport Admin Console, Fleet Management, Driver Assignment Modals, Route Control.
- **ST-41 → ST-50**: System Operations Center (SOC), Infrastructure Telemetry, Emergency Dispatch.
- **ST-51 → ST-60**: AI Intelligence Center, Predictive ETAs, Occupancy Forecasting, Anomaly Detection.
- **ST-61 → ST-70**: Multi-Channel SOS Alert Dispatcher (WhatsApp & Gmail), Marathi Localization.
- **ST-71 → ST-80**: Vite Bundle Optimization (455.85 kB initial chunk), Header Clipping Fix, UserAvatar Component, Profile Drawers, and Interactive Documentation Portal.

---

## 4. Production Build Verification

```bash
$ npm run build

> smarttransit-os@1.0.0 build
> vite build

✓ 2127 modules transformed.
dist/assets/index-OYgtvvHB.js  593.62 kB │ gzip: 160.89 kB
✓ built in 23.69s
0 errors, 0 warnings
```

---

## 5. Verification Checklist

- [x] **Preloader Timer**: Set to exact 1.5 - 2.5 seconds with step sequence.
- [x] **Header Profile Menu**: Integrated `UserAvatar` (Priya Nambiar, Vikram Jadhav, Aarav Sharma, Devraj Sen) with status indicators.
- [x] **Profile Drawers**: Functional right-side drawers for "My Profile & ID", "Transit Preferences", and "Security & RBAC Keys".
- [x] **Emergency SOS**: Multi-channel alert deep links to WhatsApp (`+91 7710893839`) and Gmail (`vsujal956@gmail.com`).
- [x] **Interactive Documentation Portal**: Fully accessible in `documentation/index.html` with screenshots from `documentation/img/`.
