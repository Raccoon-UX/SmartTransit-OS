# 📖 SmartTransit OS — Technical Documentation Portal

**Official Documentation & Architecture Manual for SmartTransit OS**  
*Implementation Milestones: ST-01 through ST-95 | Release: v2.4.0 Production*

---

## 🎯 Overview

This directory contains the complete, standalone **Technical Documentation & Engineering Portal** for SmartTransit OS. It provides an institutional-grade, human-designed technical overview of the platform across 20 comprehensive chapters, interactive architecture visualizers, multi-role persona breakdowns, live search (`Ctrl + K`), realistic vector map technical specs, and media galleries.

- **Live Application Portal**: [https://smarttransit-os.vercel.app/](https://smarttransit-os.vercel.app/)
- **GitHub Repository**: [https://github.com/Raccoon-UX/smarttransit-os](https://github.com/Raccoon-UX/smarttransit-os)
- **Emergency / Grievance Contact**:
  - 📧 **Gmail**: `vsujal956@gmail.com`
  - 💬 **WhatsApp & Phone**: `+91 7710893839`

---

## 📂 Documentation Directory Structure

```text
documentation/
├── index.html          # Interactive Master Documentation Web Portal (HTML5)
├── styles.css          # Documentation styling, custom scrollbars, print styles
├── app.js              # Preloader sequence, active scroll spy, search (Ctrl+K), lightbox
├── DOCUMENTATION.md    # Master technical manual in pure Markdown format
├── README.md           # This documentation guide
└── img/                # Visual media assets, screenshots, and official logos
    ├── 1logo.png           # SmartTransit OS Primary Brand Logo
    ├── 1msrtc logo1.png    # MSRTC Emblem & Government Insignia
    ├── 1BEST Bus_logo.png  # Brihanmumbai Electric Supply & Transport (BEST) Logo
    ├── 1TMT_logo.png       # Thane Municipal Transport (TMT) Logo
    ├── 1PublicBus.webp     # Municipal Transit Bus Fleet Asset
    ├── 1Mobility-Hubs.png  # Urban Mobility Hubs Terminal Asset
    ├── 1loaderPage.png     # Preloader Interface Screenshot
    └── ...                 # Additional route and vehicle photos
```

---

## 📑 Master Documentation Chapters

The documentation portal is organized into 5 structured categories:

### Category 01 — Foundation
- **`01. Platform Overview`**: System identity, mission, and 8-point platform status matrix.
- **`02. System Architecture`**: Multi-tier architecture (Clients, Gateway, Core Services, AI Engine, Telemetry Buffer, Cloud Persistence).
- **`03. How It Works`**: 5-step operational lifecycle workflow from commuter query to multi-channel incident sync.

### Category 02 — Product & Core Modules
- **`04. ST Roster (ST-01 → ST-95)`**: Full 95 milestone evolutionary roadmap.
- **`05. Features & Capabilities`**: Consolidated capability matrix for Passenger, Driver, Admin, and SOC.
- **`06. Realistic Vector City Map Engine`**: In-house SVG map architecture, road hierarchies, waterways, and vehicle heading markers.
- **`07. Role Experiences`**: Interactive tabbed persona breakdown (Priya Nambiar, Aarav Sharma, Vikram Jadhav, Devraj Sen).
- **`08. Cross-Module Integration`**: Entity tracking across corridors (`Bus 245` on `RT-108`, `Bus 504` on `RT-415`).

### Category 03 — Intelligence & Visual Systems
- **`09. AI Predictive Engine`**: Predictive ETAs, crowding forecasting, and delay simulations.
- **`10. Analytics & Decisions`**: Operational metrics, prediction accuracy, and inference latency benchmarks.
- **`11. High-Contrast Dark & Light Visual System`**: Dual-theme tokens, Obsidian map rendering, and luminous status badges.

### Category 04 — Engineering & Security
- **`12. Full System Architecture`**: Infographic flow diagram, multi-tier topology, and failover buffer.
- **`13. How To Use — Operations Guide`**: Step-by-step operational guide for Passengers, Drivers, Dispatch Admins, SOC Ops, and AI Center.
- **`14. Technology Constellation`**: React 18, Vite 6, Tailwind CSS 3.4, Lucide Icons, Node.js, Express, and GTFS-RT schemas.
- **`15. RBAC Matrix & Google Authentication`**: Route-by-route authorization matrix and Google Identity Services (GIS) integration.
- **`16. Testing & Verification`**: Structured test cases (Crowd surge, role switching, multi-channel SOS).
- **`17. Build Verification`**: Clean build logs showing 0 errors and 0 warnings (`npm run build`).
- **`18. Bundle & Performance`**: Code-splitting and optimized initial chunks.

### Category 05 — Impact & Future
- **`19. Public Impact & Benefits`**: Civic mobility advantages for commuters, drivers, operators, and cities.
- **`20. Strategic Roadmap`**: 4-phase rollout roadmap from prototype to multi-city municipal network.

---

## ⚡ Interactive Features

1. **Global Search (`Ctrl + K` / `Cmd + K`)**: Instant search dialog to jump directly to any milestone, chapter, or module.
2. **Reading Progress Indicator**: Top gradient progress bar displaying `% Read` in real time as you scroll.
3. **Role Persona Switcher**: Live tabbed component displaying accessible routes and privileges per role.
4. **Screenshot Lightbox Gallery**: Clickable media cards that open high-resolution previews in a fullscreen modal.
5. **Dark / Light Theme Toggle**: Seamless mode switcher with persisted theme preferences.
6. **Print & PDF Export Ready**: Clean print CSS rules to export formatted documentation without headers or sidebars.

---

## 🚀 How to View Locally

You can open the documentation portal in any modern web browser:

1. **Directly**: Open `documentation/index.html` in your browser.
2. **Via Local Dev Server**:
   ```bash
   npm run dev
   ```
   Navigate to: `http://localhost:5173/documentation/index.html`
