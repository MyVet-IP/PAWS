import { getUser } from "../utils.js";

// ─────────────────────────────────────────────
//  Search index
//  TODO: Replace hardcoded clinics with a fetch
//  to /api/businesses when the endpoint is ready.
// ─────────────────────────────────────────────

// Nav links — defined once, reused for desktop and mobile
const NAV_LINKS = [
  { href: "#/clinics", label: "Clinics", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'/></svg>" },
  { href: "#/emergency", label: "Emergencies", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'/></svg>" },
  { href: "#/services", label: "Services", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M7 10h10M7 14h6m-9 4h14a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2zM9 6V4a1 1 0 011-1h4a1 1 0 011 1v2'/></svg>" },
  { href: "#/tips", label: "Tips", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'/></svg>" },
];

// ─────────────────────────────────────────────
//  navbarController
// ─────────────────────────────────────────────
export function navbarController() {
  const user = getUser();
  if (user) return "";

  const currentHash = window.location.hash || "#/";

  const desktopLinks = NAV_LINKS.map(l => `
    <a href="${l.href}"
       class="nav-link ${l.href === currentHash ? 'nav-link-active' : ''}">
      <span class="nav-link-icon">${l.icon}</span>
      <span>${l.label}</span>
    </a>
  `).join('');

  const mobileLinks = NAV_LINKS.map(l => `
    <a href="${l.href}"
       class="nav-link-mobile ${l.href === currentHash ? 'nav-link-active' : ''}">
      <span>${l.icon}</span>
      <span>${l.label}</span>
    </a>
  `).join('');

  return `
  <nav class="paws-navbar">

    <!-- Decorative blobs -->
    <div class="navbar-blob navbar-blob-1"></div>
    <div class="navbar-blob navbar-blob-2"></div>

    <div class="navbar-inner">

      <!-- LOGO -->
      <a class="navbar-logo" href="#/" onclick="window.location.hash='/';return false;">
        <img src="./frontend/assets/images/PAWS_logo_bgless.png"
             alt="PAWS logo"
             class="navbar-logo-img"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <!-- Fallback if image not found -->
        <div class="navbar-logo-fallback" style="display:none;">
          <span style="font-size:28px;"><svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z'/></svg></span>
        </div>
        <div class="navbar-logo-text">
          <span class="navbar-logo-title">PAWS</span>
        </div>
      </a>

      <!-- NAV LINKS — desktop -->
      <div class="navbar-links">
        ${desktopLinks}
      </div>

      <!-- SEARCH -->
      <div class="navbar-search-wrapper" id="search-wrapper">
        <div class="navbar-search-box" id="search-box">
          <svg class="navbar-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            id="navbar-search"
            type="text"
            placeholder="Search clinics, services..."
            autocomplete="off"/>
          <button id="search-clear" class="navbar-search-clear hidden">×</button>
        </div>

        <!-- Search dropdown -->
        <div id="search-dropdown" class="navbar-dropdown hidden"></div>
      </div>

      <!-- RIGHT ACTIONS -->
      <div class="navbar-actions">

        <!-- Sign in button -->
        <button id="btn-login" class="navbar-signin-btn" onclick="window.location.hash='/login'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
          </svg>
          <span>Sign in</span>
        </button>

        <!-- Hamburger — mobile only -->
        <button id="hamburger-btn" class="navbar-hamburger" aria-label="Open menu">
          <svg id="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

      </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="navbar-mobile-menu hidden">
      <div class="navbar-mobile-links">
        ${mobileLinks}
      </div>
      <div class="navbar-mobile-search">
        <div class="navbar-search-box">
          <svg class="navbar-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input id="mobile-search" type="text"
                 placeholder="Search clinics, services..."
                 autocomplete="off"/>
        </div>
      </div>
      <div class="navbar-mobile-cta">
        <button id="btn-login-mobile" class="navbar-signin-btn w-full justify-center" onclick="window.location.hash='/login'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
          </svg>
          Sign in to PAWS
        </button>
      </div>
    </div>

  </nav>
  `;
}

// ─────────────────────────────────────────────
//  navbarEvents
// ─────────────────────────────────────────────
export function navbarEvents() {

  // ── Sign in ───────────────────────────────
  document.getElementById("btn-login")?.addEventListener("click", () => {
    window.location.hash = "/login";
  });
  document.getElementById("btn-login-mobile")?.addEventListener("click", () => {
    window.location.hash = "/login";
  });

  // ── Active link highlight ─────────────────
  function updateActiveLinks() {
    const currentHash = window.location.hash || "#/";
    document.querySelectorAll(".nav-link, .nav-link-mobile").forEach(a => {
      if (a.getAttribute("href") === currentHash) {
        a.classList.add("nav-link-active");
      } else {
        a.classList.remove("nav-link-active");
      }
    });
  }
  window.addEventListener("hashchange", updateActiveLinks);
  updateActiveLinks();

  // ── Hamburger toggle ──────────────────────
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");

  const closeMobileMenu = () => {
    mobileMenu?.classList.add("hidden");
    if (hamburgerIcon) hamburgerIcon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"/>`;
  };

  hamburgerBtn?.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove("hidden");
      hamburgerIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M6 18L18 6M6 6l12 12"/>`;
    }
  });

  mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", e => {
    if (
      mobileMenu &&
      !mobileMenu.classList.contains("hidden") &&
      !hamburgerBtn?.contains(e.target) &&
      !mobileMenu.contains(e.target)
    ) closeMobileMenu();
  });

  // Mobile search → navigate to map
  document.getElementById("mobile-search")?.addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.value.trim()) {
      window.location.hash = "#/map-page";
      closeMobileMenu();
    }
  });

  // ── Desktop search ────────────────────────
  const input = document.getElementById("navbar-search");
  const dropdown = document.getElementById("search-dropdown");
  const clearBtn = document.getElementById("search-clear");
  const searchBox = document.getElementById("search-box");

  if (!input || !dropdown) return;

  let selectedIndex = -1;
  let lastResults = [];

  input.addEventListener("focus", () => {
    searchBox.classList.add("focused");
    if (input.value.trim()) showDropdown(input.value.trim());
  });

  input.addEventListener("blur", () => {
    setTimeout(() => {
      searchBox.classList.remove("focused");
      hideDropdown();
    }, 180);
  });

  input.addEventListener("input", () => {
    const q = input.value.trim();
    selectedIndex = -1;
    clearBtn?.classList.toggle("hidden", !q);
    if (!q) { hideDropdown(); return; }
    showDropdown(q);
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    clearBtn.classList.add("hidden");
    hideDropdown();
    input.focus();
  });

  input.addEventListener("keydown", e => {
    const items = dropdown.querySelectorAll(".search-item");
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
      } else {
        navigate("#/map-page");
      }
    } else if (e.key === "Escape") {
      hideDropdown();
      input.blur();
    }
  });

  function showDropdown(query) {
    const q = query.toLowerCase();
    const results = SEARCH_INDEX.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 12);

    lastResults = results;

    if (results.length === 0) {
      dropdown.innerHTML = `
        <div style="padding:24px;text-align:center;">
          <p style="font-size:24px;margin-bottom:8px;"><svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/></svg></p>
          <p style="font-size:13px;font-weight:600;color:var(--text-primary);font-family:'Poppins',sans-serif;">
            No results for "<strong>${query}</strong>"
          </p>
          <p style="font-size:11px;color:var(--color-muted);margin-top:4px;">
            Try "vaccination", "emergency" or a clinic name
          </p>
        </div>`;
      dropdown.classList.remove("hidden");
      return;
    }

    const grouped = {};
    results.forEach(r => {
      if (!grouped[r.category]) grouped[r.category] = [];
      grouped[r.category].push(r);
    });

    const categoryIcons = { Clinics: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'/></svg>", Services: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M7 10h10M7 14h6m-9 4h14a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2zM9 6V4a1 1 0 011-1h4a1 1 0 011 1v2'/></svg>", Pages: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'/></svg>" };

    dropdown.innerHTML = Object.entries(grouped).map(([cat, items]) => `
      <div>
        <div class="dropdown-category-header">
          <span>${categoryIcons[cat] || "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'/><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'/></svg>"}</span>
          <span>${cat}</span>
        </div>
        ${items.map(item => `
          <div class="search-item" data-hash="${item.hash}">
            <span class="search-item-icon">${item.icon}</span>
            <div class="search-item-content">
              <p class="search-item-label">${highlight(item.label, q)}</p>
              <p class="search-item-desc">${item.desc}</p>
            </div>
            <svg class="search-item-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        `).join('')}
      </div>
    `).join('');

    dropdown.querySelectorAll(".search-item").forEach(el => {
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
      el.style.background = i === selectedIndex ? "rgba(144,189,244,0.15)" : "";
    });
    if (selectedIndex >= 0) items[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }

  function highlight(text, query) {
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
    return text.replace(regex,
      `<mark style="background:rgba(185,251,192,0.6);color:#166534;border-radius:3px;padding:0 2px;">$1</mark>`
    );
  }

  document.addEventListener("click", e => {
    if (!document.getElementById("search-wrapper")?.contains(e.target)) {
      hideDropdown();
    }
  });
}