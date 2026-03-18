// ─────────────────────────────────────────────
//  clinics-view.js
// ─────────────────────────────────────────────

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

    <!-- ── SEARCH + FILTERS ROW ─────────────── -->
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
        <button class="clinic-filter-btn" data-filter="emergency">
          <svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
          24/7 Emergency
        </button>
        <button class="clinic-filter-btn" data-filter="surgery">
          <svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 3l2 4-5 9h14L15 7l2-4M5 20h14M12 3v4"/></svg>
          Surgery
        </button>
        <button class="clinic-filter-btn" data-filter="cardiology">
          <svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          Cardiology
        </button>
        <button class="clinic-filter-btn" data-filter="dental">
          <svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3c-2.5 0-5 2-5 5 0 2 .5 3 1 5 .5 2 1 5 2 8h1c.5-2 1-4 1-5s.5 3 1 5h1c1-3 1.5-6 2-8 .5-2 1-3 1-5 0-3-2.5-5-5-5z"/></svg>
          Dental
        </button>
        <button class="clinic-filter-btn" data-filter="lab">
          <svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 3v8l-4 7a1 1 0 001 1h12a1 1 0 001-1l-4-7V3M9 3h6M7 16h10"/></svg>
          Laboratory
        </button>
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

    <!-- ── LOAD MORE ─────────────────────────── -->
    <div class="text-center mt-8">
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
//  Placeholder gradient — varies by business_id
//  so each clinic gets its own color
// ─────────────────────────────────────────────
const GRADIENTS = [
  'background:linear-gradient(135deg,#6A4C93 0%,#8B5FBF 100%)',   // morado
  'background:linear-gradient(135deg,#1D9E75 0%,#34D399 100%)',   // verde
  'background:linear-gradient(135deg,#2563EB 0%,#60A5FA 100%)',   // azul
  'background:linear-gradient(135deg,#dc2626 0%,#f97316 100%)',   // rojo-naranja
  'background:linear-gradient(135deg,#7C3AED 0%,#EC4899 100%)',   // violeta-rosa
  'background:linear-gradient(135deg,#0891B2 0%,#06B6D4 100%)',   // cian
  'background:linear-gradient(135deg,#D97706 0%,#FBBF24 100%)',   // ámbar
  'background:linear-gradient(135deg,#059669 0%,#6A4C93 100%)',   // verde-morado
];

function _clinicGradient(id) {
  return GRADIENTS[(id || 0) % GRADIENTS.length];
}

// ─────────────────────────────────────────────
//  renderClinicCard
// ─────────────────────────────────────────────
function renderClinicCard(clinic) {
  const whatsappIcon = `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  const contactPhone = clinic.whatsapp || clinic.phone || null;
  const location = clinic.address || clinic.zone || '';

  return `
    <div class="bg-white rounded-2xl overflow-hidden transition"
         style="box-shadow:var(--shadow-card);transition:var(--transition-fast);"
         onmouseenter="this.style.boxShadow='var(--shadow-medium)';this.style.transform='translateY(-2px)'"
         onmouseleave="this.style.boxShadow='var(--shadow-card)';this.style.transform='none'">
      <div class="relative h-44 overflow-hidden" id="card-img-${clinic.business_id}"
           style="${clinic.image_url ? 'background:var(--bg-muted)' : _clinicGradient(clinic.business_id)}">

        ${clinic.image_url ? `
        <!-- Real photo — on error swaps to gradient placeholder via JS -->
        <img src="${clinic.image_url}"
             alt="${clinic.name}"
             class="w-full h-full object-cover"
             onerror="
               this.style.display='none';
               this.parentElement.style.cssText='${_clinicGradient(clinic.business_id)}';
               this.parentElement.querySelector('.clinic-placeholder-content').style.display='flex';
             "/>` : ''}

        <!-- Placeholder content — visible when no image or image fails -->
        <div class="clinic-placeholder-content absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
             style="${clinic.image_url ? 'display:none' : 'display:flex'}">
          <div class="absolute pointer-events-none" style="width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,0.08);top:-40px;right:-30px;"></div>
          <div class="absolute pointer-events-none" style="width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,0.06);bottom:-20px;left:20px;"></div>
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10" style="background:rgba(255,255,255,0.20);">
            <svg style="width:28px;height:28px;color:white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <p class="font-poppins font-bold text-white text-center px-4 leading-tight relative z-10"
             style="font-size:12px;text-shadow:0 1px 3px rgba(0,0,0,0.25);">${clinic.zone || 'Medellín'}</p>
        </div>

        <!-- Badges — always visible -->
        <div class="absolute top-3 left-3 flex gap-2 z-10">
          ${clinic.is_24h
      ? `<span class="text-xs font-bold px-2.5 py-1 rounded-full"
                     style="background:${clinic.image_url ? '#fef9c3' : 'rgba(255,255,255,0.25)'};
                            color:${clinic.image_url ? '#92400e' : 'white'};
                            backdrop-filter:blur(4px);">24/7</span>`
      : ''}
          ${clinic.status === 'active'
      ? `<span class="text-xs font-bold px-2.5 py-1 rounded-full"
                     style="background:${clinic.image_url ? 'var(--color-green)' : 'rgba(185,251,192,0.30)'};
                            color:${clinic.image_url ? 'var(--text-primary)' : '#B9FBC0'};
                            backdrop-filter:blur(4px);">Open</span>`
      : ''}
        </div>
        ${clinic.rating ? `
        <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full z-10"
             style="background:${clinic.image_url ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.22)'};backdrop-filter:blur(4px);">
          <span class="text-xs font-bold" style="color:${clinic.image_url ? '#d97706' : 'white'};">
            ★ ${parseFloat(clinic.rating).toFixed(1)}
          </span>
        </div>` : ''}
      </div>
      <div class="p-5">
        <div class="flex items-start justify-between mb-1">
          <h3 class="font-bold font-poppins" style="font-size:15px;color:var(--text-primary);">${clinic.name}</h3>
          ${clinic._distKm && clinic._distKm < 9999
      ? `<span class="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ml-2"
                     style="background:#F0FDF4;color:#16a34a;">
                 📍 ${clinic._distKm < 1 ? Math.round(clinic._distKm * 1000) + 'm' : clinic._distKm.toFixed(1) + 'km'}
               </span>`
      : ''}
        </div>
        ${location ? `
        <div class="flex items-start gap-1.5 mb-3" style="color:var(--text-muted);">
          <svg class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="text-xs">${location}</span>
        </div>` : ''}
        ${clinic.specialties && clinic.specialties.length > 0 ? `
        <div class="flex flex-wrap gap-1 mb-4">
          ${clinic.specialties.slice(0, 3).map(s => `<span class="text-xs px-2 py-0.5 rounded-full font-roboto" style="background:var(--bg-muted);color:var(--text-soft);">${s.name}</span>`).join('')}
          ${clinic.specialties.length > 3 ? `<span class="text-xs px-2 py-0.5 rounded-full" style="background:var(--bg-muted);color:var(--text-soft);">+${clinic.specialties.length - 3}</span>` : ''}
        </div>` : '<div class="mb-4"></div>'}
        <div class="flex gap-2 mb-2">
          ${clinic.phone ? `
          <a href="tel:${clinic.phone}"
             class="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-poppins font-semibold text-xs text-white transition"
             style="background:var(--text-highlight);transition:var(--transition-fast);"
             onmouseenter="this.style.opacity='0.90'" onmouseleave="this.style.opacity='1'">
            <svg style="width:0.9em;height:0.9em;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            Call
          </a>` : ''}
          <button onclick="window.location.hash='#/clinics/${clinic.business_id}'"
            class="flex-1 py-2 px-3 rounded-xl font-poppins font-semibold text-xs transition"
            style="border:1.5px solid var(--text-highlight);color:var(--text-highlight);background:transparent;transition:var(--transition-fast);"
            onmouseenter="this.style.background='rgba(106,76,147,0.08)'"
            onmouseleave="this.style.background='transparent'">
            Details
          </button>
        </div>
        ${contactPhone ? `
        <button onclick="window.open('https://api.whatsapp.com/send/?phone=${encodeURIComponent(contactPhone)}&text=${encodeURIComponent('Hola, quiero información sobre ' + clinic.name)}&type=phone_number&app_absent=0','_blank')"
          class="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl font-poppins font-semibold text-xs text-white transition"
          style="background:#16a34a;transition:var(--transition-fast);"
          onmouseenter="this.style.background='#15803d'" onmouseleave="this.style.background='#16a34a'">
          ${whatsappIcon} WhatsApp
        </button>` : ''}
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────
//  Estado y lógica de filtros
// ─────────────────────────────────────────────
const FILTER_MAP = {
  emergency: { terms: ['emergency', 'urgencia', 'urgencias'], field24h: true },
  surgery: { terms: ['surgery', 'cirugía', 'cirugia', 'surgical'] },
  cardiology: { terms: ['cardiology', 'cardiología', 'cardiologia', 'cardio'] },
  dental: { terms: ['dental', 'odontología', 'odontologia', 'dentistry'] },
  lab: { terms: ['laboratory', 'laboratorio', 'lab', 'diagnostics', 'diagnóstico'] },
};

function applyFilters(allClinics, filter, search, sort) {
  let list = [...allClinics];

  if (filter !== 'all') {
    const rule = FILTER_MAP[filter];
    if (rule) {
      list = list.filter(c => {
        const specs = (c.specialties || []).map(s => s.name.toLowerCase());
        const matchesSpec = rule.terms.some(t => specs.some(s => s.includes(t)));
        const matches24h = rule.field24h && c.is_24h;
        return matchesSpec || matches24h;
      });
    }
  }

  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(c =>
      (c.name || '').toLowerCase().includes(q) ||
      (c.address || '').toLowerCase().includes(q) ||
      (c.zone || '').toLowerCase().includes(q) ||
      (c.specialties || []).some(s => s.name.toLowerCase().includes(q))
    );
  }

  if (sort === 'rating') list.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
  else if (sort === 'name') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  return list;
}

function renderGrid(list) {
  const grid = document.getElementById('clinics-grid');
  const countEl = document.getElementById('results-count');
  if (!grid) return;
  if (countEl) countEl.textContent = list.length;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-3 text-center py-16">
        <div style="margin-bottom:12px;color:var(--text-muted);">
          <svg style="width:2.5rem;height:2.5rem;display:inline-block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
        <p class="font-poppins font-medium" style="color:var(--text-primary);">No clinics found</p>
        <p class="text-sm mt-1" style="color:var(--text-muted);">Try a different search or filter</p>
      </div>`;
    return;
  }
  grid.innerHTML = list.map(renderClinicCard).join('');
}

// ─────────────────────────────────────────────
//  clinicsEvents
//  IMPORTANTE: los listeners se registran ANTES
//  del fetch para que funcionen inmediatamente.
//  El fetch llena allClinics y dispara refresh().
// ─────────────────────────────────────────────
export function clinicsEvents() {
  let allClinics = [];
  let activeFilter = 'all';
  let loaded = false;
  let _userLat = null;
  let _userLng = null;

  // Pedir ubicación al cargar — si está concedida responde inmediato
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        _userLat = pos.coords.latitude;
        _userLng = pos.coords.longitude;
        console.log('[PAWS Clinics] Ubicación:', _userLat, _userLng);
        if (loaded) refresh(); // re-ordena las cards si los datos ya llegaron
      },
      (err) => console.warn('[PAWS Clinics] Geolocation error:', err.code),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  }

  function _haversine(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function _sortByDistance(list) {
    if (!_userLat || !_userLng) return list;
    return [...list].map(c => ({
      ...c,
      _distKm: (c.latitude && c.longitude)
        ? _haversine(_userLat, _userLng, parseFloat(c.latitude), parseFloat(c.longitude))
        : 9999,
    })).sort((a, b) => a._distKm - b._distKm);
  }

  const getSearch = () => document.getElementById('clinic-search')?.value.trim() || '';
  const getSort = () => document.getElementById('sort-select')?.value || 'rating';
  const refresh = () => {
    if (!loaded) return;
    let list = applyFilters(allClinics, activeFilter, getSearch(), getSort());
    list = _sortByDistance(list); // siempre ordenar por distancia al final
    renderGrid(list);
  };

  // ── 1. Registrar todos los listeners PRIMERO ─
  document.querySelectorAll('.clinic-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.clinic-filter-btn')
        .forEach(b => b.classList.remove('clinic-filter-active'));
      btn.classList.add('clinic-filter-active');
      activeFilter = btn.dataset.filter;
      refresh();
    });
  });

  document.getElementById('btn-clinic-search')?.addEventListener('click', () => {
    const q = getSearch();
    window.location.hash = q ? `/clinics?location=${encodeURIComponent(q)}` : '/clinics';
    refresh();
  });

  document.getElementById('clinic-search')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-clinic-search')?.click();
  });

  document.getElementById('sort-select')?.addEventListener('change', refresh);

  // ── 2. Fetch DESPUÉS de registrar listeners ──
  const grid = document.getElementById('clinics-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="col-span-3 flex items-center justify-center gap-2 py-16" style="color:var(--text-muted);">
        <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <span class="text-sm font-poppins">Loading clinics...</span>
      </div>`;
  }

  fetch('/api/businesses?type=clinic')
    .then(res => {
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      return res.json();
    })
    .then(data => {
      allClinics = data;
      loaded = true;
      refresh();
    })
    .catch(err => {
      if (grid) grid.innerHTML = `
        <div class="col-span-3 text-center py-16">
          <div style="margin-bottom:12px;color:#dc2626;">
            <svg style="width:2.5rem;height:2.5rem;display:inline-block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
          </div>
          <p class="font-poppins font-medium" style="color:#dc2626;">Error loading clinics</p>
          <p class="text-sm mt-1" style="color:var(--text-muted);">${err.message}</p>
        </div>`;
    });
}

export const initClinicsView = clinicsEvents;