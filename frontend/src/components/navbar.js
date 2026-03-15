import { getUser } from "../utils.js";

// ─────────────────────────────────────────────
//  Search index
//  TODO: Replace hardcoded clinics with a fetch
//  to /api/businesses when the endpoint is ready.
// ─────────────────────────────────────────────
const SEARCH_INDEX = [
  // Clinics (hardcoded — see TODO above)
  { label: "Clínica San Juan Pet", category: "Clinics", icon: "🏥", hash: "#/map-page", desc: "El Poblado, Medellín" },
  { label: "VetCare Laureles", category: "Clinics", icon: "🏥", hash: "#/map-page", desc: "Laureles, Medellín" },
  { label: "Animal House Envigado", category: "Clinics", icon: "🏥", hash: "#/map-page", desc: "Envigado, Medellín" },
  { label: "PetSalud Belén", category: "Clinics", icon: "🏥", hash: "#/map-page", desc: "Belén, Medellín" },
  { label: "Vet 24 Sabaneta", category: "Clinics", icon: "🏥", hash: "#/map-page", desc: "Sabaneta, Medellín" },

  // Services
  { label: "Vaccination", category: "Services", icon: "💉", hash: "#/services", desc: "Preventive vaccines for your pet" },
  { label: "Surgery", category: "Services", icon: "🔬", hash: "#/services", desc: "Specialized surgical procedures" },
  { label: "Consultation", category: "Services", icon: "🩺", hash: "#/services", desc: "General veterinary consultation" },
  { label: "Dental Cleaning", category: "Services", icon: "🦷", hash: "#/services", desc: "Professional dental hygiene" },
  { label: "Deworming", category: "Services", icon: "💊", hash: "#/services", desc: "Internal and external deworming" },
  { label: "X-Ray", category: "Services", icon: "📋", hash: "#/services", desc: "Diagnostic imaging" },
  { label: "Laboratory", category: "Services", icon: "🧪", hash: "#/services", desc: "Blood and urine tests" },
  { label: "Pet Shop", category: "Services", icon: "🛍️", hash: "#/services", desc: "Food, accessories and toys" },
  { label: "Grooming", category: "Services", icon: "✂️", hash: "#/services", desc: "Bath, cut and styling" },
  { label: "Dermatology", category: "Services", icon: "🐾", hash: "#/services", desc: "Skin and coat care" },

  // Pages
  { label: "Clinics near me", category: "Pages", icon: "📍", hash: "#/clinics", desc: "Find all clinics in Medellín" },
  { label: "Emergency", category: "Pages", icon: "🚨", hash: "#/emergency", desc: "24/7 urgent veterinary care" },
  { label: "Map", category: "Pages", icon: "🗺️", hash: "#/map-page", desc: "Interactive clinic map" },
  { label: "Tips & Health", category: "Pages", icon: "💡", hash: "#/tips", desc: "Care tips for your pet" },
  { label: "Specialists", category: "Pages", icon: "👨‍⚕️", hash: "#/specialists", desc: "Certified veterinary specialists" },
  { label: "About us", category: "Pages", icon: "🐾", hash: "#/about-us", desc: "Know the PAWS team" },
  { label: "Work with us", category: "Pages", icon: "💼", hash: "#/work-with-us", desc: "Join the PAWS network" },
  { label: "Contact", category: "Pages", icon: "📩", hash: "#/contact", desc: "Get in touch with us" },
  { label: "Register", category: "Pages", icon: "✨", hash: "#/register", desc: "Create your free account" },
];

// Nav links — defined once, reused for desktop and mobile
const NAV_LINKS = [
  { href: "#/clinics", label: "Clinics", icon: "🏥" },
  { href: "#/emergency", label: "Emergencies", icon: "✴️" },
  { href: "#/services", label: "Services", icon: "🧼" },
  { href: "#/tips", label: "Tips", icon: "💡" },
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
          <span style="font-size:28px;">🐾</span>
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
          <button id="search-clear" class="navbar-search-clear hidden">✕</button>
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
          <p style="font-size:24px;margin-bottom:8px;">🔍</p>
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

    const categoryIcons = { Clinics: "🏥", Services: "🧼", Pages: "📄" };

    dropdown.innerHTML = Object.entries(grouped).map(([cat, items]) => `
      <div>
        <div class="dropdown-category-header">
          <span>${categoryIcons[cat] || "📌"}</span>
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