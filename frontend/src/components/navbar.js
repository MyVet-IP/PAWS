import { getUser } from "../utils.js";

// ─────────────────────────────────────────────
//  Search index — todo lo que el guest puede
//  encontrar desde el navbar
// ─────────────────────────────────────────────
const SEARCH_INDEX = [
  // Clínicas
  { label: "Clínica San Juan Pet",    category: "Clinics",  icon: "🏥", hash: "#/map-page", desc: "El Poblado, Medellín" },
  { label: "VetCare Laureles",        category: "Clinics",  icon: "🏥", hash: "#/map-page", desc: "Laureles, Medellín" },
  { label: "Animal House Envigado",   category: "Clinics",  icon: "🏥", hash: "#/map-page", desc: "Envigado, Medellín" },
  { label: "PetSalud Belén",          category: "Clinics",  icon: "🏥", hash: "#/map-page", desc: "Belén, Medellín" },
  { label: "Vet 24 Sabaneta",         category: "Clinics",  icon: "🏥", hash: "#/map-page", desc: "Sabaneta, Medellín" },

  // Servicios
  { label: "Vaccination",             category: "Services", icon: "💉", hash: "#/services", desc: "Preventive vaccines for your pet" },
  { label: "Surgery",                 category: "Services", icon: "🔬", hash: "#/services", desc: "Specialized surgical procedures" },
  { label: "Consultation",            category: "Services", icon: "🩺", hash: "#/services", desc: "General veterinary consultation" },
  { label: "Dental Cleaning",         category: "Services", icon: "🦷", hash: "#/services", desc: "Professional dental hygiene" },
  { label: "Deworming",               category: "Services", icon: "💊", hash: "#/services", desc: "Internal and external deworming" },
  { label: "X-Ray",                   category: "Services", icon: "📋", hash: "#/services", desc: "Diagnostic imaging" },
  { label: "Laboratory",              category: "Services", icon: "🧪", hash: "#/services", desc: "Blood and urine tests" },
  { label: "Pet Shop",                category: "Services", icon: "🛍️", hash: "#/services", desc: "Food, accessories and toys" },
  { label: "Grooming",                category: "Services", icon: "✂️", hash: "#/services", desc: "Bath, cut and styling" },
  { label: "Dermatology",             category: "Services", icon: "🐾", hash: "#/services", desc: "Skin and coat care" },

  // Páginas
  { label: "Clinics near me",         category: "Pages",    icon: "📍", hash: "#/clinics",    desc: "Find all clinics in Medellín" },
  { label: "Emergency",               category: "Pages",    icon: "🚨", hash: "#/emergency",  desc: "24/7 urgent veterinary care" },
  { label: "Map",                     category: "Pages",    icon: "🗺️", hash: "#/map-page",   desc: "Interactive clinic map" },
  { label: "Tips & Health",           category: "Pages",    icon: "💡", hash: "#/tips",       desc: "Care tips for your pet" },
  { label: "Specialists",             category: "Pages",    icon: "👨‍⚕️", hash: "#/specialists", desc: "Certified veterinary specialists" },
  { label: "About us",                category: "Pages",    icon: "🐾", hash: "#/about-us",   desc: "Know the PAWS team" },
  { label: "Work with us",            category: "Pages",    icon: "💼", hash: "#/work-with-us", desc: "Join the PAWS network" },
  { label: "Contact",                 category: "Pages",    icon: "📩", hash: "#/contact",    desc: "Get in touch with us" },
  { label: "Register",                category: "Pages",    icon: "✨", hash: "#/register",   desc: "Create your free account" },
];

// ─────────────────────────────────────────────
//  navbarController
// ─────────────────────────────────────────────
export function navbarController() {
  const user = getUser();
  if (user) return "";

  return `
  <nav class="bg-gray-100 border-b border-gray-200 px-6 py-3 relative z-50">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">

      <!-- LOGO -->
      <div class="flex items-center gap-2 font-bold text-gray-800 cursor-pointer flex-shrink-0"
           onclick="window.location.hash='#/'">
        <span class="text-green-600 text-xl">🐾</span>
        <span class="text-lg tracking-wide">PAWS</span>
      </div>

      <!-- NAV LINKS -->
      <div class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 flex-shrink-0">
        <a href="#/clinics"   class="flex items-center gap-1 hover:text-green-600 transition">🏥 Clinics</a>
        <a href="#/emergency" class="flex items-center gap-1 hover:text-red-500 transition">✴️ Emergencies</a>
        <a href="#/services"  class="flex items-center gap-1 hover:text-green-600 transition">🧼 Services</a>
        <a href="#/tips"      class="flex items-center gap-1 hover:text-green-600 transition">💡 Tips</a>
      </div>

      <!-- SEARCH -->
      <div class="hidden lg:block relative flex-1 max-w-sm" id="search-wrapper">
        <div class="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2
                    transition-all" id="search-box"
             style="transition:border-color 150ms,box-shadow 150ms;">
          <span class="text-gray-400 mr-2 flex-shrink-0">🔍</span>
          <input
            id="navbar-search"
            type="text"
            placeholder="Search clinics, services, tips..."
            class="bg-transparent outline-none text-sm w-full placeholder-gray-400"
            autocomplete="off"/>
          <!-- Clear button -->
          <button id="search-clear"
            class="hidden text-gray-400 hover:text-gray-600 transition ml-1 flex-shrink-0"
            style="font-size:16px;line-height:1;background:none;border:none;cursor:pointer;">
            ✕
          </button>
        </div>

        <!-- DROPDOWN -->
        <div id="search-dropdown"
             class="hidden absolute left-0 right-0 bg-white rounded-2xl shadow-medium overflow-hidden"
             style="top:calc(100% + 8px);max-height:420px;overflow-y:auto;
                    border:1px solid #F3F4F6;z-index:9999;">
          <!-- filled by JS -->
        </div>
      </div>

      <!-- SIGN IN -->
      <button id="btn-login"
        class="bg-green-400 hover:bg-green-500 text-white font-semibold px-5 py-2
               rounded-full transition flex-shrink-0 text-sm">
        Sign in
      </button>

    </div>
  </nav>
  `;
}

// ─────────────────────────────────────────────
//  navbarEvents
// ─────────────────────────────────────────────
export function navbarEvents() {

  // ── Sign in button ────────────────────────
  document.getElementById("btn-login")?.addEventListener("click", () => {
    window.location.hash = "#/login";
  });

  // ── Search elements ───────────────────────
  const input      = document.getElementById("navbar-search");
  const dropdown   = document.getElementById("search-dropdown");
  const clearBtn   = document.getElementById("search-clear");
  const searchBox  = document.getElementById("search-box");

  if (!input || !dropdown) return;

  let selectedIndex = -1; // keyboard nav
  let lastResults   = [];

  // ── Focus / blur styles on the box ───────
  input.addEventListener("focus", () => {
    searchBox.style.borderColor = "#4ade80";
    searchBox.style.boxShadow   = "0 0 0 3px rgba(74,222,128,0.15)";
    if (input.value.trim()) showDropdown(input.value.trim());
  });

  input.addEventListener("blur", () => {
    // Delay so click on dropdown item fires first
    setTimeout(() => {
      searchBox.style.borderColor = "";
      searchBox.style.boxShadow   = "";
      hideDropdown();
    }, 180);
  });

  // ── Live search while typing ──────────────
  input.addEventListener("input", () => {
    const q = input.value.trim();
    selectedIndex = -1;
    clearBtn?.classList.toggle("hidden", !q);

    if (!q) { hideDropdown(); return; }
    showDropdown(q);
  });

  // ── Clear button ──────────────────────────
  clearBtn?.addEventListener("click", () => {
    input.value = "";
    clearBtn.classList.add("hidden");
    hideDropdown();
    input.focus();
  });

  // ── Keyboard navigation ───────────────────
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
        const hash = items[selectedIndex].dataset.hash;
        navigate(hash);
      } else if (lastResults.length > 0) {
        // Navigate to first result
        navigate(lastResults[0].hash);
      } else {
        // Fallback: search on map page
        navigate(`#/map-page`);
      }
    } else if (e.key === "Escape") {
      hideDropdown();
      input.blur();
    }
  });

  // ── Search logic ──────────────────────────
  function showDropdown(query) {
    const q = query.toLowerCase();

    const results = SEARCH_INDEX.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q)  ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 12); // max 12 results

    lastResults = results;

    if (results.length === 0) {
      dropdown.innerHTML = `
        <div class="px-5 py-6 text-center">
          <p class="text-2xl mb-2">🔍</p>
          <p class="text-sm font-medium text-gray-700 font-poppins">No results for "<strong>${query}</strong>"</p>
          <p class="text-xs text-gray-400 mt-1">Try "vaccination", "emergency" or a clinic name</p>
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

    const categoryIcons = { Clinics: "🏥", Services: "🧼", Pages: "📄" };

    dropdown.innerHTML = Object.entries(grouped).map(([cat, items]) => `
      <div>
        <!-- Category header -->
        <div class="flex items-center gap-2 px-4 py-2 sticky top-0 bg-white"
             style="border-bottom:1px solid #F9FAFB;">
          <span style="font-size:11px;">${categoryIcons[cat] || "📌"}</span>
          <span class="text-xs font-bold uppercase tracking-wide font-poppins"
                style="color:#9CA3AF;letter-spacing:0.1em;">${cat}</span>
        </div>
        <!-- Items -->
        ${items.map(item => `
          <div class="search-item flex items-center gap-3 px-4 py-2.5 cursor-pointer transition"
               data-hash="${item.hash}"
               style="transition:background 100ms;"
               onmouseenter="this.style.background='#F9FAFB'"
               onmouseleave="this.style.background='transparent'">
            <span class="text-base flex-shrink-0 w-6 text-center">${item.icon}</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 font-poppins truncate">
                ${highlight(item.label, q)}
              </p>
              <p class="text-xs text-gray-400 truncate">${item.desc}</p>
            </div>
            <svg class="w-3.5 h-3.5 flex-shrink-0" style="color:#D1D5DB;"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        `).join('')}
      </div>
    `).join('');

    // Bind click on items
    dropdown.querySelectorAll(".search-item").forEach(el => {
      el.addEventListener("mousedown", e => {
        e.preventDefault(); // prevent blur from firing first
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
    window.location.hash = hash;
  }

  function highlightItem(items) {
    items.forEach((el, i) => {
      el.style.background = i === selectedIndex ? "#F3F4F6" : "transparent";
    });
    if (selectedIndex >= 0) items[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }

  // Highlight matching text in label
  function highlight(text, query) {
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
    return text.replace(regex, `<mark style="background:#BBF7D0;color:#166534;border-radius:3px;padding:0 2px;">$1</mark>`);
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", e => {
    if (!document.getElementById("search-wrapper")?.contains(e.target)) {
      hideDropdown();
    }
  });
}