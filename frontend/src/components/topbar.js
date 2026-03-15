// ─────────────────────────────────────────────
//  topbar.js
//  - Título dinámico según ruta actual
//  - Search en vivo con dropdown (mascotas,
//    citas, clínicas, historial, especialistas)
//  - Notificaciones desde localStorage
// ─────────────────────────────────────────────

// ── Route → title map ─────────────────────────
const ROUTE_TITLES = {
  "/user-dashboard":        { title: "Dashboard",         icon: "📊" },
  "/pet-profile":           { title: "Pet Profile",        icon: "🐾" },
  "/my-pets":               { title: "My Pets",            icon: "🐾" },
  "/appointments":          { title: "Appointments",       icon: "📅" },
  "/clinics":               { title: "Clinics",            icon: "🏥" },
  "/services":              { title: "Services",           icon: "🧼" },
  "/medical-records":       { title: "Medical Records",    icon: "📋" },
  "/emergency":             { title: "Emergency",          icon: "🚨" },
  "/map-page":              { title: "Map",                icon: "🗺️" },
  "/tips":                  { title: "Tips & Health",      icon: "💡" },
  "/specialists":           { title: "Specialists",        icon: "👨‍⚕️" },
  "/veterinary":            { title: "Vet Dashboard",      icon: "🩺" },
  "/business-appointments": { title: "Appointments",       icon: "📅" },
};

// ── Static search index (logged-in context) ───
const TOPBAR_INDEX = [
  // Mascotas
  { label: "Max",          category: "My Pets",     icon: "🐶", hash: "#/pet-profile", desc: "Golden Retriever · 3 years" },
  { label: "Luna",         category: "My Pets",     icon: "🐱", hash: "#/pet-profile", desc: "Cat · 2 years" },

  // Citas
  { label: "Annual Checkup",      category: "Appointments", icon: "📅", hash: "#/appointments", desc: "Upcoming — Mar 20, 2026" },
  { label: "Dental Cleaning",     category: "Appointments", icon: "📅", hash: "#/appointments", desc: "Upcoming — Apr 5, 2026" },
  { label: "Vaccination Booster", category: "Appointments", icon: "📅", hash: "#/appointments", desc: "Pending confirmation" },

  // Historial médico
  { label: "Annual Checkup Jan 2024",     category: "Medical Records", icon: "📋", hash: "#/medical-records", desc: "Checkup · Jan 20, 2024" },
  { label: "Dental Cleaning Nov 2023",    category: "Medical Records", icon: "📋", hash: "#/medical-records", desc: "Dental · Nov 15, 2023" },
  { label: "Vaccination Update Aug 2023", category: "Medical Records", icon: "📋", hash: "#/medical-records", desc: "Vaccine · Aug 10, 2023" },
  { label: "Skin Allergy Treatment",      category: "Medical Records", icon: "📋", hash: "#/medical-records", desc: "Treatment · May 22, 2023" },

  // Clínicas
  { label: "Clínica San Juan Pet",  category: "Clinics", icon: "🏥", hash: "#/clinics", desc: "El Poblado · 24/7" },
  { label: "VetCare Laureles",      category: "Clinics", icon: "🏥", hash: "#/clinics", desc: "Laureles · Mon–Sat" },
  { label: "Animal House Envigado", category: "Clinics", icon: "🏥", hash: "#/clinics", desc: "Envigado · 24/7" },

  // Especialistas
  { label: "Dr. Carlos Cardona", category: "Specialists", icon: "👨‍⚕️", hash: "#/specialists", desc: "General Veterinary" },
  { label: "Dra. Ana Ruiz",      category: "Specialists", icon: "👩‍⚕️", hash: "#/specialists", desc: "Specialist in Surgery" },
  { label: "Dr. Miguel Torres",  category: "Specialists", icon: "👨‍⚕️", hash: "#/specialists", desc: "Dermatology & Allergies" },
];

// ── Default notifications (localStorage seed) ─
const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    type: "appointment",
    icon: "📅",
    title: "Upcoming appointment",
    message: "Annual Checkup for Max — Mar 20 at 10:00am",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "vaccine",
    icon: "💉",
    title: "Vaccine reminder",
    message: "Rabies booster for Luna is due in 12 days",
    time: "Yesterday",
    read: false,
  },
  {
    id: 3,
    type: "vet",
    icon: "🩺",
    title: "Message from your vet",
    message: "Dr. Cardona sent you post-visit notes for Max",
    time: "2 days ago",
    read: false,
  },
  {
    id: 4,
    type: "clinic",
    icon: "🏥",
    title: "Clinic responded",
    message: "Clínica San Juan confirmed your appointment request",
    time: "3 days ago",
    read: true,
  },
];

function getNotifications() {
  try {
    const saved = localStorage.getItem("paws_notifications");
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  } catch { return DEFAULT_NOTIFICATIONS; }
}

function saveNotifications(notifs) {
  localStorage.setItem("paws_notifications", JSON.stringify(notifs));
}

// ─────────────────────────────────────────────
//  Topbar HTML
// ─────────────────────────────────────────────
export function Topbar() {
  const hash    = location.hash.replace("#", "") || "/user-dashboard";
  const current = ROUTE_TITLES[hash] || { title: "Dashboard", icon: "📊" };
  const notifs  = getNotifications();
  const unread  = notifs.filter(n => !n.read).length;

  return `
  <header class="h-16 bg-white flex items-center justify-between px-5 flex-shrink-0"
          style="border-bottom:1px solid #F3F4F6;">

    <!-- LEFT: icon + page title -->
    <div class="flex items-center gap-3 flex-shrink-0">
      <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg"
           style="background:#D1FAE5;color:#065F46;">
        🐾
      </div>
      <div>
        <p class="text-xs text-gray-400 leading-none font-roboto">PAWS</p>
        <h1 id="topbar-title" class="text-base font-semibold text-gray-800 leading-tight font-poppins">
          ${current.icon} ${current.title}
        </h1>
      </div>
    </div>

    <!-- CENTER: search -->
    <div class="flex-1 flex justify-center px-6">
      <div class="relative w-full max-w-md" id="topbar-search-wrapper">

        <div class="flex items-center rounded-full px-4 py-2 text-sm transition-all"
             id="topbar-search-box"
             style="background:#F5F7F6;border:1.5px solid #E5E7EB;">
          <svg class="w-4 h-4 flex-shrink-0 mr-2" style="color:#9CA3AF;"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            id="topbar-search"
            type="text"
            placeholder="Search pets, records, clinics..."
            class="bg-transparent outline-none text-sm w-full font-roboto"
            style="color:#374151;"
            autocomplete="off"/>
          <button id="topbar-search-clear"
            class="hidden flex-shrink-0 ml-1 text-gray-400 hover:text-gray-600 transition"
            style="background:none;border:none;cursor:pointer;font-size:14px;line-height:1;">
            ✕
          </button>
        </div>

        <!-- Dropdown -->
        <div id="topbar-dropdown"
             class="hidden absolute left-0 right-0 bg-white rounded-2xl overflow-hidden"
             style="top:calc(100% + 6px);max-height:380px;overflow-y:auto;
                    border:1px solid #F3F4F6;
                    box-shadow:0 8px 24px rgba(0,0,0,0.10);z-index:9999;">
        </div>

      </div>
    </div>

    <!-- RIGHT: Notifications -->
    <div class="flex items-center gap-3 flex-shrink-0">

      <!-- Notifications bell -->
      <div class="relative" id="notif-wrapper">
        <button id="btn-notif"
          class="relative flex items-center justify-center rounded-full transition"
          style="width:40px;height:40px;background:#F5F7F6;"
          onmouseenter="this.style.background='#E5E7EB'"
          onmouseleave="this.style.background='#F5F7F6'">
          🔔
          <!-- Unread badge -->
          ${unread > 0 ? `
            <span id="notif-badge"
                  class="absolute flex items-center justify-center rounded-full text-white font-bold"
                  style="top:4px;right:4px;width:16px;height:16px;font-size:9px;
                         background:#dc2626;font-family:'Poppins',sans-serif;">
              ${unread > 9 ? '9+' : unread}
            </span>` : `<span id="notif-badge" class="hidden"></span>`}
        </button>

        <!-- Notifications panel -->
        <div id="notif-panel"
             class="hidden absolute right-0 bg-white rounded-2xl overflow-hidden"
             style="top:calc(100% + 8px);width:320px;
                    border:1px solid #F3F4F6;
                    box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:9999;">

          <!-- Panel header -->
          <div class="flex items-center justify-between px-4 py-3"
               style="border-bottom:1px solid #F3F4F6;">
            <h3 class="font-bold font-poppins text-gray-800 text-sm">Notifications</h3>
            <button id="btn-mark-all-read"
              class="text-xs font-medium font-poppins transition"
              style="color:#6A4C93;"
              onmouseenter="this.style.opacity='0.7'"
              onmouseleave="this.style.opacity='1'">
              Mark all as read
            </button>
          </div>

          <!-- Notifications list -->
          <div id="notif-list" class="overflow-y-auto" style="max-height:320px;">
            <!-- filled by JS -->
          </div>

        </div>
      </div>

    </div>
  </header>
  `;
}

// ─────────────────────────────────────────────
//  topbarEvents — llámalo desde el router
// ─────────────────────────────────────────────
export function topbarEvents() {

  // ── Dynamic title on hash change ──────────
  function updateTitle() {
    const hash    = location.hash.replace("#", "") || "/user-dashboard";
    const current = ROUTE_TITLES[hash] || { title: "Dashboard", icon: "📊" };
    const el      = document.getElementById("topbar-title");
    if (el) el.textContent = `${current.icon} ${current.title}`;
  }
  window.addEventListener("hashchange", updateTitle);
  updateTitle(); // run immediately

  // ──────────────────────────────────────────
  //  SEARCH
  // ──────────────────────────────────────────
  const input      = document.getElementById("topbar-search");
  const dropdown   = document.getElementById("topbar-dropdown");
  const clearBtn   = document.getElementById("topbar-search-clear");
  const searchBox  = document.getElementById("topbar-search-box");

  if (input && dropdown) {
    let selectedIndex = -1;
    let lastResults   = [];

    // Focus styles
    input.addEventListener("focus", () => {
      searchBox.style.borderColor = "#6A4C93";
      searchBox.style.boxShadow   = "0 0 0 3px rgba(106,76,147,0.12)";
      if (input.value.trim()) showDropdown(input.value.trim());
    });

    input.addEventListener("blur", () => {
      setTimeout(() => {
        searchBox.style.borderColor = "#E5E7EB";
        searchBox.style.boxShadow   = "none";
        hideDropdown();
      }, 180);
    });

    // Live search
    input.addEventListener("input", () => {
      const q = input.value.trim();
      selectedIndex = -1;
      clearBtn?.classList.toggle("hidden", !q);
      if (!q) { hideDropdown(); return; }
      showDropdown(q);
    });

    // Clear
    clearBtn?.addEventListener("click", () => {
      input.value = "";
      clearBtn.classList.add("hidden");
      hideDropdown();
      input.focus();
    });

    // Keyboard nav
    input.addEventListener("keydown", e => {
      const items = dropdown.querySelectorAll(".ts-item");
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        highlightItem(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        highlightItem(items);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          navigate(items[selectedIndex].dataset.hash);
        } else if (lastResults.length > 0) {
          navigate(lastResults[0].hash);
        }
      } else if (e.key === "Escape") {
        hideDropdown();
        input.blur();
      }
    });

    function showDropdown(query) {
      const q = query.toLowerCase();

      // Also search user's pets from localStorage
      const userPets = _getUserPets();
      const dynamicIndex = [
        ...userPets.map(p => ({
          label: p.nombre || p.name,
          category: "My Pets",
          icon: p.especie === "Cat" ? "🐱" : "🐶",
          hash: "#/pet-profile",
          desc: `${p.raza || p.especie} · ${p.edad} ${p.edad === 1 ? "year" : "years"}`,
        })),
        ...TOPBAR_INDEX.filter(i => i.category !== "My Pets"), // avoid duplicates
      ];

      const results = dynamicIndex.filter(item =>
        item.label.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)  ||
        item.category.toLowerCase().includes(q)
      ).slice(0, 10);

      lastResults = results;

      if (results.length === 0) {
        dropdown.innerHTML = `
          <div class="px-4 py-6 text-center">
            <p class="text-2xl mb-2">🔍</p>
            <p class="text-sm font-medium text-gray-700 font-poppins">
              No results for "<strong>${query}</strong>"
            </p>
            <p class="text-xs text-gray-400 mt-1">Try a pet name, clinic, or record</p>
          </div>`;
        dropdown.classList.remove("hidden");
        return;
      }

      // Group by category
      const grouped = {};
      results.forEach(r => {
        if (!grouped[r.category]) grouped[r.category] = [];
        grouped[r.category].push(r);
      });

      dropdown.innerHTML = Object.entries(grouped).map(([cat, items]) => `
        <div>
          <div class="px-4 py-1.5 sticky top-0 bg-white"
               style="border-bottom:1px solid #F9FAFB;">
            <span class="text-xs font-bold uppercase tracking-wide font-poppins"
                  style="color:#9CA3AF;letter-spacing:0.1em;">${cat}</span>
          </div>
          ${items.map(item => `
            <div class="ts-item flex items-center gap-3 px-4 py-2.5 cursor-pointer transition"
                 data-hash="${item.hash}"
                 style="transition:background 100ms;"
                 onmouseenter="this.style.background='#F9FAFB'"
                 onmouseleave="this.style.background='transparent'">
              <span class="text-base w-6 text-center flex-shrink-0">${item.icon}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 font-poppins truncate">
                  ${_highlight(item.label, q)}
                </p>
                <p class="text-xs text-gray-400 truncate">${item.desc}</p>
              </div>
              <svg class="w-3 h-3 flex-shrink-0" style="color:#D1D5DB;"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          `).join('')}
        </div>
      `).join('');

      dropdown.querySelectorAll(".ts-item").forEach(el => {
        el.addEventListener("mousedown", e => {
          e.preventDefault();
          navigate(el.dataset.hash);
        });
      });

      dropdown.classList.remove("hidden");
    }

    function hideDropdown() {
      dropdown.classList.add("hidden");
      selectedIndex = -1;
    }

    function navigate(hash) {
      input.value = "";
      clearBtn?.classList.add("hidden");
      hideDropdown();
      window.location.hash = hash.startsWith('#') ? hash.slice(1) : hash;
    }

    function highlightItem(items) {
      items.forEach((el, i) => {
        el.style.background = i === selectedIndex ? "#F3F4F6" : "transparent";
      });
      if (selectedIndex >= 0) items[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }

    // Close on outside click
    document.addEventListener("click", e => {
      if (!document.getElementById("topbar-search-wrapper")?.contains(e.target)) {
        hideDropdown();
      }
    });
  }

  // ──────────────────────────────────────────
  //  NOTIFICATIONS
  // ──────────────────────────────────────────
  const bellBtn    = document.getElementById("btn-notif");
  const panel      = document.getElementById("notif-panel");
  const markAllBtn = document.getElementById("btn-mark-all-read");

  if (bellBtn && panel) {

    // Toggle panel
    bellBtn.addEventListener("click", e => {
      e.stopPropagation();
      const isOpen = panel.style.display === "block";
      panel.style.display = isOpen ? "none" : "block";
      if (!isOpen) renderNotifications();
    });

    // Close on outside click
    document.addEventListener("click", e => {
      if (!document.getElementById("notif-wrapper")?.contains(e.target)) {
        panel.style.display = "none";
      }
    });

    // Mark all as read
    markAllBtn?.addEventListener("click", () => {
      const notifs = getNotifications().map(n => ({ ...n, read: true }));
      saveNotifications(notifs);
      renderNotifications();
      updateBadge(0);
    });
  }

  function renderNotifications() {
    const list   = document.getElementById("notif-list");
    const notifs = getNotifications();
    if (!list) return;

    if (notifs.length === 0) {
      list.innerHTML = `
        <div class="px-4 py-8 text-center">
          <p class="text-2xl mb-2">🔔</p>
          <p class="text-sm text-gray-500 font-poppins">No notifications yet</p>
        </div>`;
      return;
    }

    list.innerHTML = notifs.map(n => `
      <div class="notif-item flex items-start gap-3 px-4 py-3 cursor-pointer transition"
           data-id="${n.id}"
           style="background:${n.read ? 'transparent' : 'rgba(106,76,147,0.04)'};
                  border-bottom:1px solid #F9FAFB;transition:background 100ms;"
           onmouseenter="this.style.background='#F9FAFB'"
           onmouseleave="this.style.background='${n.read ? 'transparent' : 'rgba(106,76,147,0.04)'}'">

        <!-- Icon -->
        <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
             style="background:${_notifBg(n.type)};">
          ${n.icon}
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <p class="text-xs font-semibold text-gray-800 font-poppins leading-tight">${n.title}</p>
            ${!n.read ? `<span class="w-2 h-2 rounded-full flex-shrink-0 mt-1" style="background:#6A4C93;"></span>` : ''}
          </div>
          <p class="text-xs text-gray-500 mt-0.5 leading-relaxed">${n.message}</p>
          <p class="text-xs mt-1" style="color:#9CA3AF;">${n.time}</p>
        </div>
      </div>
    `).join('');

    // Mark as read on click
    list.querySelectorAll(".notif-item").forEach(el => {
      el.addEventListener("click", () => {
        const id     = Number(el.dataset.id);
        const notifs = getNotifications().map(n =>
          n.id === id ? { ...n, read: true } : n
        );
        saveNotifications(notifs);
        const unread = notifs.filter(n => !n.read).length;
        updateBadge(unread);
        renderNotifications();
      });
    });

    // Update badge count
    const unread = notifs.filter(n => !n.read).length;
    updateBadge(unread);
  }

  function updateBadge(count) {
    const badge = document.getElementById("notif-badge");
    if (!badge) return;
    if (count > 0) {
      badge.textContent = count > 9 ? "9+" : count;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  // ── Helpers ───────────────────────────────
  function _notifBg(type) {
    const map = {
      appointment: "rgba(144,189,244,0.25)",
      vaccine:     "rgba(185,251,192,0.30)",
      vet:         "rgba(241,192,232,0.30)",
      clinic:      "rgba(251,248,204,0.50)",
    };
    return map[type] || "rgba(243,244,246,1)";
  }

  function _getUserPets() {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) return [];
      // Try to get pets from dashboard data if cached
      const dash = JSON.parse(localStorage.getItem(`pets_${user.id_cliente}`) || "[]");
      return Array.isArray(dash) ? dash : [];
    } catch { return []; }
  }

  function _highlight(text, query) {
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"
    );
    return text.replace(
      regex,
      `<mark style="background:#DDD6FE;color:#5B21B6;border-radius:3px;padding:0 2px;">$1</mark>`
    );
  }
}