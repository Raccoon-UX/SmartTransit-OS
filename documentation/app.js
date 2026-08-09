// SmartTransit OS — Official Documentation Portal Interactive Logic

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. TRANSIT OS PRELOADER SEQUENCE (1.8s)
  // ==========================================
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const loaderStepText = document.getElementById('loader-step-text');

  const loaderSteps = [
    { p: 20, text: '01 — Loading platform' },
    { p: 45, text: '02 — Loading modules' },
    { p: 70, text: '03 — Loading architecture' },
    { p: 88, text: '04 — Loading intelligence' },
    { p: 100, text: '05 — Loading documentation' },
  ];

  let currentStepIdx = 0;

  const preloaderInterval = setInterval(() => {
    if (currentStepIdx < loaderSteps.length) {
      const step = loaderSteps[currentStepIdx];
      loaderBar.style.width = `${step.p}%`;
      loaderPercent.textContent = `${step.p}%`;
      loaderStepText.textContent = step.text;
      currentStepIdx++;
    } else {
      clearInterval(preloaderInterval);
      setTimeout(() => {
        if (loader) {
          loader.classList.add('opacity-0', 'pointer-events-none');
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }
      }, 300);
    }
  }, 350);

  // ==========================================
  // 2. SCROLL PROGRESS & ACTIVE SIDEBAR LINK
  // ==========================================
  const progressBar = document.getElementById('reading-progress-bar');
  const navProgressText = document.getElementById('nav-progress-text');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.doc-nav-link');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

    if (progressBar) progressBar.style.width = `${scrollPercent}%`;
    if (navProgressText) navProgressText.textContent = `${Math.round(scrollPercent)}% Read`;

    // Highlight current active section link
    let currentSectionId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollTop >= top && scrollTop < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // ==========================================
  // 3. THEME TOGGLE SWITCHER
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
    });
  }

  // ==========================================
  // 4. ROLE EXPERIENCE TAB SWITCHER
  // ==========================================
  const roleTabs = document.querySelectorAll('.role-tab');
  const roleContent = document.getElementById('role-content');

  const roleData = {
    admin: {
      title: 'Transport Admin — Operational Control',
      sub: 'Persona: Priya Nambiar (Chief Dispatch Officer)',
      id: 'admin',
      modules: [
        '• Dispatch Command Overview (`/admin/dashboard`)',
        '• Municipal Fleet Management (`/admin/fleet`)',
        '• Driver Roster & Assignments (`/admin/drivers`)',
        '• Transit Routes & Timetables (`/admin/routes`)',
        '• Schedule Dispatcher (`/admin/schedules`)',
      ],
      privileges: [
        '✓ Reassign driver units to active buses',
        '✓ Trigger fleet emergency advisories',
        '✓ Monitor live crowding & demand heatmaps',
        '✓ Export operational GTFS-RT logs',
      ]
    },
    passenger: {
      title: 'Passenger Commuter — Live Transit Portal',
      sub: 'Persona: Aarav Sharma (Daily Metro Commuter)',
      id: 'passenger',
      modules: [
        '• Live Bus Tracking & Search (`/passenger/search`)',
        '• Journey Route Planner (`/passenger/planner`)',
        '• Smart Bus Stop Kiosks (`/passenger/stops`)',
        '• Active Trip Tracking (`/passenger/dashboard`)',
        '• Commuter Advisories (`/passenger/alerts`)',
      ],
      privileges: [
        '✓ Search routes by origin & destination',
        '✓ Real-time occupancy forecast checking',
        '✓ Save favorite routes & bus stops',
        '✓ Receive service advisories',
      ]
    },
    driver: {
      title: 'Driver Cockpit — In-Vehicle Operator Panel',
      sub: 'Persona: Vikram Jadhav (Senior Bus Pilot)',
      id: 'driver',
      modules: [
        '• Route Navigation & Waypoints (`/driver/navigation`)',
        '• Live Vehicle Occupancy (`/driver/occupancy`)',
        '• Emergency Multi-Channel SOS (`/driver/emergency`)',
        '• Trip Schedule Roster (`/driver/trip`)',
        '• Shift Reports (`/driver/reports`)',
      ],
      privileges: [
        '✓ Real-time GPS waypoint navigation',
        '✓ Report manual occupancy surge',
        '✓ Trigger multi-channel SOS to WhatsApp/Gmail',
        '✓ View shift timetables',
      ]
    },
    systemAdmin: {
      title: 'System Operations Center (SOC) — Command Desk',
      sub: 'Persona: Devraj Sen (SOC Infrastructure Engineer)',
      id: 'systemAdmin',
      modules: [
        '• SOC Overview & Incident Command (`/soc`)',
        '• Infrastructure Telemetry (`/soc/telemetry`)',
        '• AI Model Health & Latency (`/soc/models`)',
        '• Database & Backups (`/soc/backups`)',
        '• Security & Audit Logs (`/soc/security`)',
      ],
      privileges: [
        '✓ System infrastructure health monitoring',
        '✓ Database backup restoration',
        '✓ AI model latency calibration',
        '✓ Security audit key enforcement',
      ]
    }
  };

  roleTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const selectedRole = tab.getAttribute('data-role');
      roleTabs.forEach((t) => {
        t.classList.remove('active', 'bg-[#B83E12]', 'text-white');
        t.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      });

      tab.classList.add('active', 'bg-[#B83E12]', 'text-white');
      tab.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');

      const data = roleData[selectedRole];
      if (data && roleContent) {
        roleContent.innerHTML = `
          <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2">
            <div>
              <h3 class="text-base font-extrabold text-slate-900 dark:text-white">${data.title}</h3>
              <p class="text-xs text-slate-500 font-mono">${data.sub}</p>
            </div>
            <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-sky-400 font-mono font-bold">Role ID: ${data.id}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <span class="text-[10px] text-slate-500 uppercase font-bold block mb-1">Accessible Modules</span>
              <ul class="space-y-1 text-slate-700 dark:text-slate-300">
                ${data.modules.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
            <div>
              <span class="text-[10px] text-slate-500 uppercase font-bold block mb-1">Operational Privileges</span>
              <ul class="space-y-1 text-slate-700 dark:text-slate-300">
                ${data.privileges.map(p => `<li>${p}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      }
    });
  });

  // ==========================================
  // 5. INTERACTIVE LIGHTBOX PREVIEW MODAL
  // ==========================================
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');

  const closeLightbox = () => {
    if (lightbox) lightbox.classList.add('hidden');
  };

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');

      if (lightboxImg) lightboxImg.src = imgSrc;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxDesc) lightboxDesc.textContent = desc;
      if (lightbox) lightbox.classList.remove('hidden');
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

});
