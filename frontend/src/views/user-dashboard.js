//  user-dashboard.js

const HEALTH_TIPS = [
  { icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M12 3C12 3 6 9.5 6 14a6 6 0 0012 0c0-4.5-6-11-6-11z'/></svg>", tip: "Make sure your pet always has fresh water available — hydration is key to kidney health.", color: "var(--color-blue)" },
  { icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M12 3c-2.5 0-5 2-5 5 0 2 .5 3 1 5 .5 2 1 5 2 8h1c.5-2 1-4 1-5s.5 3 1 5h1c1-3 1.5-6 2-8 .5-2 1-3 1-5 0-3-2.5-5-5-5z'/></svg>", tip: "Brush your pet\'s teeth 2–3 times a week to prevent tartar and gum disease.", color: "var(--color-green)" },
  { icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M13 5a2 2 0 100-4 2 2 0 000 4zm-2 4l-2 9M9 9l4 2 3-3M7 14l2-1M15 9l2 5'/></svg>", tip: "Dogs need at least 30 minutes of exercise daily. A tired dog is a happy dog!", color: "var(--color-pink)" },
  { icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M3 3v18M7 3v5a4 4 0 01-4 4m14-9v18m0 0a4 4 0 004-4V7a4 4 0 00-4-4'/></svg>", tip: "Measure your pet\'s food portions — obesity is the #1 preventable health issue in pets.", color: "var(--color-yellow)" },
  { icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/></svg>", tip: "Check your pet\'s ears weekly for redness or odor — early detection prevents infections.", color: "var(--purple-pastel)" },
  { icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M19.5 4.5l-15 15M16 3l5 5-1.5 1.5M12 7l4 4M5 15l-2 4 4-2M9 11l4 4'/></svg>", tip: "Keep vaccinations up to date. Annual boosters protect against serious diseases.", color: "var(--color-green)" },
  { icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 12a3 3 0 106 0v3a3 3 0 01-6 0v-3zM6 9a3 3 0 00-3 3M18 9a3 3 0 013 3M9 9V7a3 3 0 016 0v2'/></svg>", tip: "Deworm your pet every 3 months — internal parasites can affect the whole family.", color: "var(--color-blue)" },
];

const NEARBY_CLINICS = [
  { name: "Clínica San Juan Pet", zone: "El Poblado", open24: true, rating: 4.9, hash: "#/clinics" },
  { name: "VetCare Laureles", zone: "Laureles", open24: false, rating: 4.7, hash: "#/clinics" },
  { name: "Animal House Envigado", zone: "Envigado", open24: true, rating: 4.8, hash: "#/clinics" },
];

// ─────────────────────────────────────────────
//  dashboardPage
// ─────────────────────────────────────────────
export function dashboardPage() {
  const tip = HEALTH_TIPS[Math.floor(Math.random() * HEALTH_TIPS.length)];

  return `
  <div class="flex flex-col gap-6 font-roboto">

    <!-- ── HEADER ──────────────────────────── -->
    <div class="flex items-start justify-between">
      <div>
        <h1 id="dash-username" class="text-2xl font-bold text-text-primary font-poppins">
          Welcome! 
        </h1>
        <p class="text-sm mt-1 flex items-center gap-1.5" style="color:var(--text-muted);">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Medellin, Colombia
        </p>
      </div>
      <button id="btn-add-pet"
        class="flex items-center gap-2 px-4 py-2 rounded-xl font-poppins font-semibold text-sm
               text-white transition"
        style="background:var(--text-highlight);transition:var(--transition-fast);"
        onmouseenter="this.style.opacity='0.90'"
        onmouseleave="this.style.opacity='1'">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Add pet
      </button>
    </div>

    <!-- ── STATS + NEXT APPOINTMENT ─────────── -->
    <div class="grid grid-cols-3 gap-4">

      <!-- Pets count -->
      <div class="bg-white rounded-2xl p-5 flex items-center gap-4"
           style="box-shadow:var(--shadow-card);border:1px solid var(--bg-muted);">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
             style="background:rgba(185,251,192,0.35);"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z"/></svg></div>
        <div>
          <p class="text-xs font-poppins" style="color:var(--text-muted);">My Pets</p>
          <h3 id="pets-count" class="text-2xl font-bold font-poppins" style="color:var(--text-primary);">0</h3>
        </div>
      </div>

      <!-- Next appointment — destacada -->
      <div class="bg-white rounded-2xl p-5 col-span-2 flex items-center gap-4 relative overflow-hidden"
           style="box-shadow:var(--shadow-card);border:1px solid var(--bg-muted);">
        <div class="absolute right-0 top-0 bottom-0 w-1.5 rounded-r-2xl"
             style="background:linear-gradient(180deg,var(--text-highlight),var(--purple-pastel));"></div>
        <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
             style="background:rgba(241,192,232,0.35);"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-poppins" style="color:var(--text-muted);">Next Appointment</p>
          <h3 id="next-appointment-text"
              class="font-bold font-poppins text-base leading-tight mt-0.5"
              style="color:var(--text-primary);">
            No upcoming appointments
          </h3>
          <p id="next-appointment-sub" class="text-xs mt-0.5" style="color:var(--text-muted);">
            Schedule a visit with your vet
          </p>
        </div>
        <a href="#/appointments"
           class="flex-shrink-0 text-xs font-semibold font-poppins px-3 py-1.5 rounded-xl transition"
           style="background:rgba(106,76,147,0.10);color:var(--text-highlight);
                  transition:var(--transition-fast);"
           onmouseenter="this.style.background='rgba(106,76,147,0.18)'"
           onmouseleave="this.style.background='rgba(106,76,147,0.10)'">
          Book →
        </a>
      </div>

    </div>

    <!-- ── TWO COLUMN: PETS + SIDEBAR ────────── -->
    <div class="grid grid-cols-3 gap-5">

      <!-- LEFT: Pets (2 cols) -->
      <div class="col-span-2 flex flex-col gap-4">

        <!-- Pets header -->
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold font-poppins" style="color:var(--text-primary);">Your pets</h2>
          <a href="#/pet-profile"
             class="text-xs font-semibold font-poppins flex items-center gap-1"
             style="color:var(--text-highlight);transition:var(--transition-fast);">
            View all
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <!-- Pets grid -->
        <div id="pets-grid" class="grid grid-cols-2 gap-4">
          <div class="col-span-2 flex items-center gap-2 text-sm py-4" style="color:var(--text-muted);">
            <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Loading your pets...
          </div>
        </div>

        <!-- Nearby clinics -->
        <div class="mt-2">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-bold font-poppins" style="color:var(--text-primary);">Clinics near you</h2>
            <a href="#/clinics"
               class="text-xs font-semibold font-poppins flex items-center gap-1"
               style="color:var(--text-highlight);">
              See all
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <div class="flex flex-col gap-2">
            ${NEARBY_CLINICS.map(c => `
              <a href="${c.hash}"
                 class="bg-white rounded-xl p-4 flex items-center gap-3 transition"
                 style="box-shadow:var(--shadow-card);border:1px solid var(--bg-muted);
                        transition:var(--transition-fast);"
                 onmouseenter="this.style.borderColor='var(--text-highlight)'"
                 onmouseleave="this.style.borderColor='var(--bg-muted)'">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                     style="background:rgba(144,189,244,0.25);"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg></div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold font-poppins text-sm truncate" style="color:var(--text-primary);">${c.name}</p>
                  <p class="text-xs" style="color:var(--text-muted);">${c.zone}</p>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  ${c.open24 ? `
                    <span class="text-xs font-bold px-2 py-0.5 rounded-full"
                          style="background:#FEE2E2;color:#dc2626;">24/7</span>` : ''}
                  <span class="text-xs font-bold font-poppins" style="color:var(--text-primary);">★ ${c.rating}</span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- RIGHT SIDEBAR (1 col) -->
      <div class="flex flex-col gap-4">

        <!-- Daily health tip -->
        <div class="rounded-2xl p-5"
             style="background:${tip.color}20;border:1.5px solid ${tip.color};
                    box-shadow:var(--shadow-card);">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xl">${tip.icon}</span>
            <p class="font-bold font-poppins text-sm" style="color:var(--text-primary);">Tip of the day</p>
          </div>
          <p class="text-xs leading-relaxed" style="color:var(--text-soft);">${tip.tip}</p>
          <a href="#/tips"
             class="inline-block mt-3 text-xs font-semibold font-poppins"
             style="color:var(--text-highlight);transition:var(--transition-fast);">
            More tips →
          </a>
        </div>

        <!-- Quick actions -->
        <div class="bg-white rounded-2xl p-5"
             style="box-shadow:var(--shadow-card);border:1px solid var(--bg-muted);">
          <p class="font-bold font-poppins text-sm mb-3" style="color:var(--text-primary);">Quick actions</p>
          <div class="flex flex-col gap-2">

            <a href="#/emergency"
               class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium font-poppins transition"
               style="background:#FEF2F2;color:#dc2626;transition:var(--transition-fast);"
               onmouseenter="this.style.background='#FEE2E2'"
               onmouseleave="this.style.background='#FEF2F2'">
              <span><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg></span> Emergency
            </a>

            <a href="#/appointments"
               class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium font-poppins transition"
               style="background:rgba(144,189,244,0.20);color:var(--color-blue);
                      transition:var(--transition-fast);"
               onmouseenter="this.style.background='rgba(144,189,244,0.35)'"
               onmouseleave="this.style.background='rgba(144,189,244,0.20)'">
              <span><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></span> Book appointment
            </a>

            <a href="#/map-page"
               class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium font-poppins transition"
               style="background:rgba(185,251,192,0.25);color:var(--color-green-dark);
                      transition:var(--transition-fast);"
               onmouseenter="this.style.background='rgba(185,251,192,0.45)'"
               onmouseleave="this.style.background='rgba(185,251,192,0.25)'">
              <span><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg></span> Find clinic on map
            </a>

            <a href="#/medical-records"
               class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium font-poppins transition"
               style="background:rgba(241,192,232,0.25);color:var(--text-highlight);
                      transition:var(--transition-fast);"
               onmouseenter="this.style.background='rgba(241,192,232,0.45)'"
               onmouseleave="this.style.background='rgba(241,192,232,0.25)'">
              <span><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></span> Medical records
            </a>

          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- ── ADD PET MODAL ──────────────────────── -->
  <div id="modal-add-pet"
       style="display:none;position:fixed;inset:0;z-index:var(--z-modal);
              align-items:center;justify-content:center;
              background:rgba(51,51,51,0.50);backdrop-filter:blur(6px);">

    <div class="bg-white rounded-2xl w-full mx-4 overflow-hidden animate-scale-in"
         style="max-width:420px;box-shadow:var(--shadow-strong);">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5"
           style="background:linear-gradient(135deg,var(--text-highlight),#8B5FBF);">
        <h2 class="font-bold text-white font-poppins" style="font-size:16px;">Add new pet</h2>
        <button id="modal-close"
          class="flex items-center justify-center rounded-full transition"
          style="width:32px;height:32px;border:none;cursor:pointer;
                 background:rgba(255,255,255,0.15);color:white;
                 transition:var(--transition-fast);"
          onmouseenter="this.style.background='rgba(255,255,255,0.28)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.15)'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="px-6 py-5 flex flex-col gap-4">

        <div>
          <label class="block text-xs font-semibold font-poppins mb-1.5" style="color:var(--text-soft);">Name</label>
          <input id="pet-nombre" type="text" required placeholder="e.g. Bruno"
            class="w-full rounded-xl font-roboto outline-none transition"
            style="padding:9px 12px;font-size:13px;
                   border:1px solid var(--bg-muted);color:var(--text-primary);
                   transition:var(--transition-fast);"
            onfocus="this.style.borderColor='var(--text-highlight)';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
            onblur="this.style.borderColor='var(--bg-muted)';this.style.boxShadow='none'"/>
        </div>

        <div>
          <label class="block text-xs font-semibold font-poppins mb-1.5" style="color:var(--text-soft);">Species</label>
          <select id="pet-especie"
            class="w-full rounded-xl font-roboto outline-none bg-white"
            style="padding:9px 12px;font-size:13px;
                   border:1px solid var(--bg-muted);color:var(--text-primary);
                   transition:var(--transition-fast);"
            onfocus="this.style.borderColor='var(--text-highlight)'"
            onblur="this.style.borderColor='var(--bg-muted)'">
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold font-poppins mb-1.5" style="color:var(--text-soft);">Breed</label>
          <input id="pet-raza" type="text" placeholder="e.g. Labrador"
            class="w-full rounded-xl font-roboto outline-none transition"
            style="padding:9px 12px;font-size:13px;
                   border:1px solid var(--bg-muted);color:var(--text-primary);
                   transition:var(--transition-fast);"
            onfocus="this.style.borderColor='var(--text-highlight)';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
            onblur="this.style.borderColor='var(--bg-muted)';this.style.boxShadow='none'"/>
        </div>

        <div>
          <label class="block text-xs font-semibold font-poppins mb-1.5" style="color:var(--text-soft);">Age (years)</label>
          <input id="pet-edad" type="number" min="0" max="30" required
            class="w-full rounded-xl font-roboto outline-none transition"
            style="padding:9px 12px;font-size:13px;
                   border:1px solid var(--bg-muted);color:var(--text-primary);
                   transition:var(--transition-fast);"
            onfocus="this.style.borderColor='var(--text-highlight)';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
            onblur="this.style.borderColor='var(--bg-muted)';this.style.boxShadow='none'"/>
        </div>

        <p id="pet-error-msg" class="text-xs text-center" style="color:#ef4444;min-height:16px;"></p>

        <button id="btn-save-pet"
          class="w-full py-3 rounded-xl font-poppins font-bold text-sm text-white transition"
          style="background:var(--text-highlight);transition:var(--transition-fast);"
          onmouseenter="this.style.opacity='0.90'"
          onmouseleave="this.style.opacity='1'">
          Save Pet
        </button>

      </div>
    </div>
  </div>
  `;
}

// ─────────────────────────────────────────────
//  dashboardEvents
// ─────────────────────────────────────────────
export function dashboardEvents() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Agregar esto antes de cualquier fetch:
  if (!user || !user.user_id) {
    console.error('No user_id found in localStorage', user);
    return;
  }

  const modal = document.getElementById('modal-add-pet');

  // ── Username ──────────────────────────────
  const nameEl = document.getElementById('dash-username');
  if (nameEl && user) {
    const first = (user.name || user.nombre || 'there').split(' ')[0];
    nameEl.textContent = `Welcome, ${first}! `;
  }

  // ── Modal ─────────────────────────────────
  const openModal = () => {
    if (modal) modal.style.display = 'flex';
    const errMsg = document.getElementById('pet-error-msg');
    if (errMsg) errMsg.textContent = '';
  };
  const closeModal = () => { if (modal) modal.style.display = 'none'; };

  document.getElementById('btn-add-pet')?.addEventListener('click', openModal);
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // ── Save pet ──────────────────────────────
  document.getElementById('btn-save-pet')?.addEventListener('click', async () => {
    const name = document.getElementById('pet-nombre')?.value.trim();
    const species = document.getElementById('pet-especie')?.value;
    const breed = document.getElementById('pet-raza')?.value.trim();
    const age = parseInt(document.getElementById('pet-edad')?.value);

    if (!name || isNaN(age)) return;

    // animal_type_id: 1=Dog, 2=Cat, 3=Other (según seed de la BD)
    const SPECIES_MAP = { Dog: 1, Cat: 2, Other: 3 };
    const animal_type_id = SPECIES_MAP[species] || 3;

    // birth_date aproximada a partir de la edad en años
    const birthYear = new Date().getFullYear() - age;
    const birth_date = `${birthYear}-01-01`;

    const body = { name, animal_type_id, breed: breed || null, birth_date, user_id: user?.user_id || user?.id };

    try {
      const res = await fetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        closeModal();
        document.getElementById('pet-nombre').value = '';
        document.getElementById('pet-raza').value = '';
        document.getElementById('pet-edad').value = '';
        loadPets(user);
      } else {
        const err = await res.json();
        const errMsg = document.getElementById('pet-error-msg');
        if (errMsg) errMsg.textContent = err.error || 'Could not save pet. Try again.';
      }
    } catch (err) {
      console.error('Error adding pet:', err);
    }
  });

  // ── Load data ─────────────────────────────
  loadPets(user);
  loadNextAppointment(user);
}

// ─────────────────────────────────────────────
//  loadPets
// ─────────────────────────────────────────────
async function loadPets(user) {
  const grid = document.getElementById('pets-grid');
  const countEl = document.getElementById('pets-count');
  if (!grid || !user) return;

  try {
    const userId = user.user_id || user.id;
    const res = await fetch(`/api/users/${userId}/dashboard`);
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    const pets = data.pets || [];

    if (countEl) countEl.textContent = pets.length;

    const addCard = `
      <div onclick="document.getElementById('modal-add-pet').style.display='flex'"
           class="bg-white rounded-2xl flex flex-col items-center justify-center py-8 cursor-pointer transition"
           style="box-shadow:var(--shadow-card);min-height:120px;
                  border:2px dashed var(--bg-muted);
                  transition:var(--transition-fast);"
           onmouseenter="this.style.borderColor='var(--text-highlight)';this.style.background='rgba(106,76,147,0.03)'"
           onmouseleave="this.style.borderColor='var(--bg-muted)';this.style.background='white'">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
             style="background:rgba(106,76,147,0.10);">
          <svg class="w-5 h-5" style="color:var(--text-highlight);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </div>
        <p class="text-xs font-semibold font-poppins" style="color:var(--text-highlight);">Add pet</p>
      </div>`;

    if (pets.length === 0) {
      grid.innerHTML = `
        <div class="bg-white rounded-2xl p-6 flex items-center gap-4"
             style="box-shadow:var(--shadow-card);border:1px solid var(--bg-muted);">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
               style="background:rgba(185,251,192,0.30);"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z"/></svg></div>
          <div class="flex-1">
            <p class="font-bold font-poppins text-sm" style="color:var(--text-primary);">No pets yet</p>
            <p class="text-xs mt-0.5" style="color:var(--text-muted);">Add your first pet to track their health</p>
          </div>
        </div>
        ${addCard}`;
      return;
    }

    // API devuelve: pet_id, name, breed, species_name, birth_date, medical_records
    const cards = pets.map(p => {
      const species = p.species_name || '';
      const isCat = species.toLowerCase().includes('cat');
      const emoji = isCat ? '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 4l2 3.5M20 4l-2 3.5M8 7.5C8 6 9 5 12 5s4 1 4 2.5v1c0 4-2 7-4 8-2-1-4-4-4-8v-1z"/></svg>' : species.toLowerCase().includes('dog') ? '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.5 3.5c-1 0-2 .4-2.7 1.1L5 6.5H3a1 1 0 00-1 1v2a1 1 0 001 1h.5l1 7h11l1-7h.5a1 1 0 001-1v-2a1 1 0 00-1-1h-2l-1.8-1.9A3.8 3.8 0 0014.5 3.5h-5z"/></svg>' : '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z"/></svg>';
      const bg = isCat ? 'rgba(241,192,232,0.30)' : 'rgba(185,251,192,0.30)';
      const records = (p.medical_records || []).length;
      let ageText = '';
      if (p.birth_date) {
        const yrs = Math.floor((Date.now() - new Date(p.birth_date)) / (365.25 * 24 * 3600 * 1000));
        ageText = `${yrs} ${yrs === 1 ? 'year' : 'years'}`;
      }
      return `
      <div class="bg-white rounded-2xl p-4 cursor-pointer transition"
           style="box-shadow:var(--shadow-card);border:1px solid var(--bg-muted);transition:var(--transition-fast);"
           onclick="window.location.hash='/pet-profile/' + ${p.pet_id}"
           onmouseenter="this.style.boxShadow='var(--shadow-soft)';this.style.transform='translateY(-2px)'"
           onmouseleave="this.style.boxShadow='var(--shadow-card)';this.style.transform='none'">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
               style="background:${bg};">${emoji}</div>
          <div class="flex-1 min-w-0">
            <p class="font-bold font-poppins text-sm truncate" style="color:var(--text-primary);">${p.name}</p>
            <p class="text-xs truncate" style="color:var(--text-muted);">${p.breed || species}</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          ${ageText
          ? `<span class="text-xs px-2 py-0.5 rounded-full font-medium"
                    style="background:rgba(185,251,192,0.35);color:var(--color-green-dark);">${ageText}</span>`
          : '<span></span>'}
          ${records > 0
          ? `<span class="text-xs font-poppins" style="color:var(--text-muted);"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg> ${records} record${records !== 1 ? 's' : ''}</span>`
          : `<span class="text-xs font-semibold font-poppins" style="color:var(--text-highlight);">View →</span>`}
        </div>
      </div>`;
    }).join('');

    grid.innerHTML = cards + addCard;

  } catch (err) {
    console.error(err);
    grid.innerHTML = `
      <div class="col-span-2 text-center py-4">
        <p class="text-sm" style="color:var(--text-muted);">Could not load pets.
          <button onclick="window.location.reload()" class="underline"
                  style="color:var(--text-highlight);">Retry</button>
        </p>
      </div>`;
  }
}

// ─────────────────────────────────────────────
//  loadNextAppointment
// ─────────────────────────────────────────────
async function loadNextAppointment(user) {
  if (!user) return;
  try {
    const userId = user.user_id || user.id;
    const res = await fetch(`/api/users/${userId}/appointments`);
    if (!res.ok) return;
    const appointments = await res.json();
    // Filtrar solo citas futuras y tomar la primera
    const now = new Date();
    const upcoming = (Array.isArray(appointments) ? appointments : [])
      .filter(a => new Date(a.date) >= now && a.status !== 'cancelled');
    const next = upcoming[0] || null;

    const textEl = document.getElementById('next-appointment-text');
    const subEl = document.getElementById('next-appointment-sub');

    if (next && textEl) {
      textEl.textContent = next.business_name || next.notes || 'Appointment scheduled';
      if (subEl) {
        const d = new Date(next.date);
        subEl.textContent = `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${next.time || ''}`;
      }
    }
  } catch {
    // silently fail — default text already shown
  }
}