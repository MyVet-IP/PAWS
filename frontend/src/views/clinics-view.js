// ─────────────────────────────────────────────
//  clinics-view.js
//  ✅ Migrado al sistema de tokens PAWS
//  ✅ Filtros y sort funcionales
//  ✅ Load More oculto hasta implementación
//  ✅ Placeholder visual para imágenes
// ─────────────────────────────────────────────

// In-memory store for loaded clinics — used by filters and sort
let _allClinics = [];

export function clinicsPage() {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
  const searchLocation = urlParams.get('location') || '';

  return `
  <div class="font-roboto flex flex-col gap-0" style="min-height:100%;">

    <!-- ── HEADER ──────────────────────────── -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold font-poppins" style="color:var(--text-primary);">
        Veterinary Clinics
      </h1>
      <p class="text-sm mt-1" style="color:var(--text-muted);">
        Find the best care for your pet in Medellín
      </p>
    </div>

    <!-- ── SEARCH + FILTERS ─────────────────── -->
    <div class="bg-white rounded-2xl p-4 mb-5 flex flex-col gap-4"
         style="box-shadow:var(--shadow-card);border:1px solid var(--bg-muted);">

      <!-- Search bar -->
      <div class="flex gap-3 items-center">
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
               style="color:var(--color-muted);"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <input
            type="text"
            id="clinic-search"
            value="${searchLocation}"
            placeholder="Search by name, zone or service..."
            class="w-full rounded-xl font-roboto outline-none transition"
            style="padding:9px 12px 9px 34px;font-size:13px;
                   border:1px solid var(--bg-muted);color:var(--text-primary);
                   transition:var(--transition-fast);"
            onfocus="this.style.borderColor='var(--text-highlight)';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.12)'"
            onblur="this.style.borderColor='var(--bg-muted)';this.style.boxShadow='none'"/>
        </div>
        <button id="btn-clinic-search"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-poppins font-semibold text-sm
                 text-white transition"
          style="background:var(--text-highlight);transition:var(--transition-fast);white-space:nowrap;"
          onmouseenter="this.style.opacity='0.90'"
          onmouseleave="this.style.opacity='1'">
          Search
        </button>
      </div>

      <!-- Filter chips -->
      <div class="flex gap-2 flex-wrap">
        <button class="clinic-filter-btn clinic-filter-active" data-filter="all">All</button>
        <button class="clinic-filter-btn" data-filter="emergency">🚨 24/7 Emergency</button>
        <button class="clinic-filter-btn" data-filter="surgery">🔬 Surgery</button>
        <button class="clinic-filter-btn" data-filter="cardiology">❤️ Cardiology</button>
        <button class="clinic-filter-btn" data-filter="dental">🦷 Dental</button>
        <button class="clinic-filter-btn" data-filter="lab">🧪 Laboratory</button>
      </div>

    </div>

    <!-- ── RESULTS META ──────────────────────── -->
    <div class="flex items-center justify-between mb-4">
      <p class="text-sm font-roboto" style="color:var(--text-muted);">
        <span id="results-count" class="font-semibold" style="color:var(--text-primary);">—</span>
        clinics found
        ${searchLocation ? ` in <strong style="color:var(--text-primary);">${searchLocation}</strong>` : ''}
      </p>
      <select id="sort-select"
        class="rounded-xl font-roboto outline-none transition"
        style="padding:7px 12px;font-size:12px;
               border:1px solid var(--bg-muted);color:var(--text-soft);
               background:white;transition:var(--transition-fast);"
        onfocus="this.style.borderColor='var(--text-highlight)'"
        onblur="this.style.borderColor='var(--bg-muted)'">
        <option value="rating">Sort by rating</option>
        <option value="name">Sort by name</option>
        <option value="zone">Sort by zone</option>
      </select>
    </div>

    <!-- ── CLINICS GRID ──────────────────────── -->
    <div id="clinics-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div class="col-span-3 flex items-center justify-center gap-2 py-16"
           style="color:var(--text-muted);">
        <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <span class="text-sm font-poppins">Loading clinics...</span>
      </div>
    </div>

    <!-- Load More — hidden until implemented -->
    <!-- TODO: show when pagination is ready -->
    <div id="load-more-wrapper" class="hidden text-center mt-8">
      <button id="btn-load-more"
        class="px-8 py-2.5 rounded-xl font-poppins font-semibold text-sm transition"
        style="background:var(--bg-muted);color:var(--text-soft);
               border:1px solid var(--bg-muted);transition:var(--transition-fast);"
        onmouseenter="this.style.borderColor='var(--text-highlight)';this.style.color='var(--text-highlight)'"
        onmouseleave="this.style.borderColor='var(--bg-muted)';this.style.color='var(--text-soft)'">
        Load more clinics
      </button>
    </div>

  </div>
  `;
}

// ─────────────────────────────────────────────
//  renderClinicCard
// ─────────────────────────────────────────────
function renderClinicCard(clinic) {
  const whatsappIcon = `
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>`;

  // Visual placeholder when no image — uses clinic name initials
  const initials = (clinic.nombre || '?')
    .split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const imageSection = clinic.imagen
    ? `<img src="${clinic.imagen}" alt="${clinic.nombre}"
            class="w-full h-full object-cover"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
       <div class="clinic-img-placeholder" style="display:none;">${initials}</div>`
    : `<div class="clinic-img-placeholder">${initials}</div>`;

  return `
    <div class="bg-white rounded-2xl overflow-hidden transition clinic-card"
         style="box-shadow:var(--shadow-card);transition:var(--transition-fast);">

      <!-- Image / Placeholder -->
      <div class="relative overflow-hidden" style="height:176px;background:var(--bg-muted);">
        ${imageSection}
        <div class="absolute top-3 left-3 flex gap-2">
          ${clinic.estado === 'Activa' ? `
            <span class="text-xs font-bold px-2.5 py-1 rounded-full"
                  style="background:var(--color-green);color:var(--text-primary);">
              ● Open
            </span>` : ''}
          ${clinic.servicios_emergencia ? `
            <span class="text-xs font-bold px-2.5 py-1 rounded-full"
                  style="background:#FEE2E2;color:#dc2626;">
              24/7
            </span>` : ''}
        </div>
        <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full"
             style="background:rgba(255,255,255,0.92);backdrop-filter:blur(4px);">
          <span class="text-xs font-bold" style="color:#d97706;">
            ★ ${clinic.rating || '4.9'}
          </span>
        </div>
      </div>

      <!-- Body -->
      <div class="p-5">
        <h3 class="font-bold font-poppins mb-1" style="font-size:15px;color:var(--text-primary);">
          ${clinic.nombre}
        </h3>
        <div class="flex items-start gap-1.5 mb-4" style="color:var(--text-muted);">
          <svg class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="text-xs">${clinic.direccion || 'Medellín, Colombia'}</span>
        </div>

        <!-- Services tags -->
        ${clinic.servicios && clinic.servicios.length > 0 ? `
          <div class="flex flex-wrap gap-1 mb-4">
            ${clinic.servicios.slice(0, 3).map(s => `
              <span class="text-xs px-2 py-0.5 rounded-full font-roboto"
                    style="background:var(--bg-muted);color:var(--text-soft);">${s}</span>
            `).join('')}
          </div>` : ''}

        <!-- Action buttons -->
        <div class="flex gap-2 mb-2">
          ${clinic.telefono ? `
            <a href="tel:${clinic.telefono}"
               class="flex-1 flex items-center justify-center py-2 px-3 rounded-xl
                      font-poppins font-semibold text-xs text-white transition"
               style="background:var(--text-highlight);transition:var(--transition-fast);"
               onmouseenter="this.style.opacity='0.90'"
               onmouseleave="this.style.opacity='1'">
              📞 Call
            </a>` : ''}
          <button onclick="viewClinicDetails(${clinic.id_veterinaria})"
            class="flex-1 py-2 px-3 rounded-xl font-poppins font-semibold text-xs transition"
            style="border:1.5px solid var(--text-highlight);color:var(--text-highlight);
                   background:transparent;transition:var(--transition-fast);"
            onmouseenter="this.style.background='rgba(106,76,147,0.08)'"
            onmouseleave="this.style.background='transparent'">
            Details
          </button>
        </div>

        ${clinic.whatsapp ? `
        <button onclick="window.open('https://api.whatsapp.com/send/?phone=%2B${clinic.whatsapp}&text=Hola%20quiero%20informacion%20sobre%20${encodeURIComponent(clinic.nombre)}','_blank')"
          class="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl
                 font-poppins font-semibold text-xs text-white transition"
          style="background:#16a34a;transition:var(--transition-fast);"
          onmouseenter="this.style.background='#15803d'"
          onmouseleave="this.style.background='#16a34a'">
          ${whatsappIcon}
          WhatsApp
        </button>` : ''}
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────
//  renderGrid — renders filtered + sorted list
// ─────────────────────────────────────────────
export async function renderGrid() {
  const grid = document.getElementById('clinics-grid');
  const countEl = document.getElementById('results-count');
  if (!grid) return;

  if (countEl) countEl.textContent = clinics.length;

  if (clinics.length === 0) {
    grid.innerHTML = `
      <div class="col-span-3 text-center py-16">
        <p class="text-4xl mb-3">🏥</p>
        <p class="font-poppins font-medium" style="color:var(--text-primary);">No clinics found</p>
        <p class="text-sm mt-1" style="color:var(--text-muted);">Try a different search or filter</p>
      </div>`;
    return;
  }

  grid.innerHTML = clinics.map(renderClinicCard).join('');
}

// ─────────────────────────────────────────────
//  applyFiltersAndSort — runs on every change
// ─────────────────────────────────────────────
function applyFiltersAndSort() {
  const searchVal = document.getElementById('clinic-search')?.value.trim().toLowerCase() || '';
  const activeBtn = document.querySelector('.clinic-filter-active');
  const activeFilter = activeBtn?.dataset.filter || 'all';
  const sortVal = document.getElementById('sort-select')?.value || 'rating';

  // Filter by search text
  let result = _allClinics.filter(c => {
    if (searchVal) {
      const name = (c.nombre || '').toLowerCase();
      const address = (c.direccion || '').toLowerCase();
      const zone = (c.zona || '').toLowerCase();
      const services = (c.servicios || []).join(' ').toLowerCase();
      if (!name.includes(searchVal) &&
        !address.includes(searchVal) &&
        !zone.includes(searchVal) &&
        !services.includes(searchVal)) return false;
    }
    return true;
  });

  // Filter by chip
  if (activeFilter !== 'all') {
    const filterMap = {
      emergency: c => c.servicios_emergencia || (c.servicios || []).some(s => s.toLowerCase().includes('emergencia')),
      surgery: c => (c.servicios || []).some(s => s.toLowerCase().includes('cirug')),
      cardiology: c => (c.servicios || []).some(s => s.toLowerCase().includes('cardiolog')),
      dental: c => (c.servicios || []).some(s => s.toLowerCase().includes('dental') || s.toLowerCase().includes('odontolog')),
      lab: c => (c.servicios || []).some(s => s.toLowerCase().includes('laborator')),
    };
    if (filterMap[activeFilter]) {
      result = result.filter(filterMap[activeFilter]);
    }
  }

  // Sort
  result = [...result].sort((a, b) => {
    if (sortVal === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortVal === 'name') return (a.nombre || '').localeCompare(b.nombre || '');
    if (sortVal === 'zone') return (a.zona || '').localeCompare(b.zona || '');
    return 0;
  });

  renderGrid(result);
}

// ─────────────────────────────────────────────
//  initClinicsView — fetches from API
// ─────────────────────────────────────────────
export async function initClinicsView() {
  const grid = document.getElementById('clinics-grid');
  if (!grid) return;

  try {
    const res = await fetch('/api/clinics');
    if (!res.ok) throw new Error('Error loading clinics');
    const clinics = await res.json();

    _allClinics = clinics;
    applyFiltersAndSort();

  } catch (err) {
    grid.innerHTML = `
      <div class="col-span-3 text-center py-16">
        <p class="text-4xl mb-3">⚠️</p>
        <p class="font-poppins font-medium" style="color:#dc2626;">Error loading clinics</p>
        <p class="text-sm mt-1" style="color:var(--text-muted);">${err.message}</p>
      </div>`;
  }
}

// ─────────────────────────────────────────────
//  clinicsEvents
// ─────────────────────────────────────────────
export function clinicsEvents() {

  // Search button
  document.getElementById('btn-clinic-search')?.addEventListener('click', () => {
    applyFiltersAndSort();
  });

  // Search on Enter
  document.getElementById('clinic-search')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') applyFiltersAndSort();
  });

  // Live search while typing
  document.getElementById('clinic-search')?.addEventListener('input', () => {
    applyFiltersAndSort();
  });

  // Filter chips
  document.querySelectorAll('.clinic-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.clinic-filter-btn')
        .forEach(b => b.classList.remove('clinic-filter-active'));
      btn.classList.add('clinic-filter-active');
      applyFiltersAndSort();
    });
  });

  // Sort
  document.getElementById('sort-select')?.addEventListener('change', () => {
    applyFiltersAndSort();
  });

  // Load initial data
  initClinicsView();
}