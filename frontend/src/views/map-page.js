// ─────────────────────────────────────────────
//  map-page.js
//  ✅ Real data from /api/businesses?type=clinic
//  ✅ Google Maps key from /api/config
//  ✅ Dynamic zone filter chips
// ─────────────────────────────────────────────

let _allClinics = [];
let _googleMap  = null;
let _mapMarkers = [];

// ─────────────────────────────────────────────
//  loadMapPage — returns HTML string
// ─────────────────────────────────────────────
export function loadMapPage() {
  return `
  <div class="map-wrapper font-roboto">

    <!-- ════════════════════════ SIDEBAR ════ -->
    <aside class="map-sidebar">

      <!-- Search + filter -->
      <div class="map-search-bar">
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
               style="color:var(--color-muted);"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input id="map-search" type="text" placeholder="Search clinics..." autocomplete="off"/>
        </div>
        <button id="btn-open-filters" class="map-filter-btn" title="Filters">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
          </svg>
          <span id="filter-dot" class="hidden absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style="background:var(--text-highlight);"></span>
        </button>
      </div>

      <!-- Results count -->
      <div class="map-results-bar">
        <p class="text-xs font-roboto" style="color:var(--text-muted);">
          <span id="map-count" class="font-semibold" style="color:var(--text-primary);">...</span> clinics found
        </p>
        <button id="btn-clear-filters" class="hidden text-xs font-semibold font-poppins"
                style="color:var(--text-highlight);">
          Clear filters
        </button>
      </div>

      <!-- Clinic cards -->
      <div id="clinic-list">
        <div class="p-4 text-center text-xs" style="color:var(--text-muted);">Loading clinics...</div>
      </div>

      <!-- Empty state -->
      <div id="clinic-empty">
        <p class="text-4xl mb-3">🔍</p>
        <p class="font-semibold font-poppins text-sm" style="color:var(--text-primary);">No clinics found</p>
        <p class="text-xs mt-1" style="color:var(--text-muted);">Try adjusting your search or filters</p>
      </div>

    </aside>

    <!-- ══════════════════════════ MAP ══════ -->
    <div class="map-container">
      <div id="mapContainer">
        <div class="map-placeholder" id="map-placeholder">
          <div class="map-placeholder-icon">
            <svg class="w-8 h-8" style="color:var(--text-highlight);"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
          </div>
          <p class="font-semibold font-poppins text-sm" style="color:var(--text-primary);">
            Map loading...
          </p>
          <p class="text-xs mt-1" style="color:var(--text-muted);">
            Google Maps will render here
          </p>
        </div>
      </div>
    </div>

  </div>

  <!-- ═══════════════════ MODAL: FILTERS ══ -->
  <div id="modal-filters">
    <div class="filter-modal-card animate-scale-in">
      <div class="filter-modal-header">
        <h3 class="font-bold font-poppins text-sm" style="color:var(--text-primary);">Filters</h3>
        <button id="modal-filters-close"
          class="flex items-center justify-center rounded-full transition"
          style="width:28px;height:28px;border:none;cursor:pointer;
                 background:var(--bg-muted);color:var(--text-muted);"
          onmouseenter="this.style.background='#E5E7EB'"
          onmouseleave="this.style.background='var(--bg-muted)'">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="filter-modal-body">
        <div>
          <p class="filter-section-label">Quick</p>
          <div class="flex flex-wrap gap-1.5">
            <button class="fchip fchip-active" data-type="quick" data-value="all">All</button>
            <button class="fchip" data-type="quick" data-value="24h">🕐 24h only</button>
            <button class="fchip" data-type="quick" data-value="emergency">🚨 Emergency</button>
            <button class="fchip" data-type="quick" data-value="verified">✅ Verified</button>
          </div>
        </div>
        <div>
          <p class="filter-section-label">Zone</p>
          <div id="zone-chips" class="flex flex-wrap gap-1.5"></div>
        </div>
        <button id="btn-apply-filters"
          class="w-full py-2 rounded-xl font-poppins font-semibold text-sm text-white transition"
          style="background:var(--text-highlight);"
          onmouseenter="this.style.opacity='0.90'"
          onmouseleave="this.style.opacity='1'">
          Apply filters
        </button>
      </div>
    </div>
  </div>

  <!-- ══════════════════ MODAL: DETAIL ════ -->
  <div id="modal-clinic-detail">
    <div class="detail-modal-card animate-scale-in">

      <!-- Gradient header -->
      <div class="detail-modal-header">
        <button id="modal-detail-close" class="detail-modal-close">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
               style="background:rgba(255,255,255,0.20);">🏥</div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 id="dc-name" class="font-bold text-white font-poppins text-base leading-tight"></h2>
              <span id="dc-verified" class="hidden text-xs px-2 py-0.5 rounded-full font-semibold"
                    style="background:rgba(185,251,192,0.25);color:#B9FBC0;">✓ Verified</span>
            </div>
            <p id="dc-location" class="text-xs mt-0.5" style="color:rgba(255,255,255,0.70);"></p>
          </div>
        </div>
        <!-- Rating badges -->
        <div class="absolute flex gap-2" style="bottom:-16px;left:24px;">
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white"
               style="box-shadow:var(--shadow-soft);">
            <svg class="w-3 h-3" style="color:#f59e0b;" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span id="dc-rating" class="text-xs font-bold font-poppins" style="color:var(--text-primary);"></span>
            <span id="dc-reviews" class="text-xs" style="color:var(--text-muted);"></span>
          </div>
          <div id="dc-24h" class="hidden px-3 py-1.5 rounded-xl"
               style="background:#dc2626;box-shadow:var(--shadow-soft);">
            <span class="text-xs font-bold text-white">24/7</span>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="px-6 pt-8 pb-6 flex flex-col gap-4">
        <p id="dc-description" class="text-sm leading-relaxed" style="color:var(--text-soft);"></p>

        <div class="flex flex-col gap-2">
          <div class="flex items-start gap-3">
            <div class="detail-info-icon">
              <svg class="w-4 h-4" style="color:var(--text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs font-poppins" style="color:var(--text-muted);">Address</p>
              <p id="dc-address" class="text-sm font-medium" style="color:var(--text-primary);"></p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="detail-info-icon">
              <svg class="w-4 h-4" style="color:var(--text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs font-poppins" style="color:var(--text-muted);">Schedule</p>
              <p id="dc-hours" class="text-sm font-medium" style="color:var(--text-primary);"></p>
            </div>
          </div>
        </div>

        <div id="dc-website-row" class="hidden flex items-start gap-3">
          <div class="detail-info-icon">
            <svg class="w-4 h-4" style="color:var(--text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </div>
          <div>
            <p class="text-xs font-poppins" style="color:var(--text-muted);">Website</p>
            <a id="dc-website" href="#" target="_blank" rel="noopener"
               class="text-sm font-medium" style="color:var(--text-highlight);"></a>
          </div>
        </div>

        <div style="height:1px;background:var(--bg-muted);"></div>

        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <a id="dc-call" href="#"
               class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                      font-poppins font-semibold text-sm text-white transition"
               style="background:var(--text-highlight);"
               onmouseenter="this.style.opacity='0.90'"
               onmouseleave="this.style.opacity='1'">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Call
            </a>
            <button id="dc-focus"
               class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                      font-poppins font-semibold text-sm transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              View on map
            </button>
          </div>
          <a id="dc-whatsapp" href="#" target="_blank"
             class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
                    font-poppins font-semibold text-sm text-white transition"
             style="background:#16a34a;"
             onmouseenter="this.style.opacity='0.90'"
             onmouseleave="this.style.opacity='1'">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
  `;
}

// ─────────────────────────────────────────────
//  initGoogleMap — loads the map with markers
// ─────────────────────────────────────────────
function initGoogleMap(clinics) {
  const placeholder = document.getElementById('map-placeholder');
  if (placeholder) placeholder.style.display = 'none';

  const center = { lat: 6.2442, lng: -75.5812 };

  _googleMap = new google.maps.Map(document.getElementById('mapContainer'), {
    center,
    zoom: 12,
    styles: [
      { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', stylers: [{ visibility: 'off' }] },
    ],
    mapTypeControl:    false,
    fullscreenControl: false,
    streetViewControl: false,
  });

  _addMarkers(clinics);
}

function _addMarkers(clinics) {
  _mapMarkers.forEach(m => m.setMap(null));
  _mapMarkers = [];

  clinics.forEach(c => {
    const marker = new google.maps.Marker({
      position: { lat: c.lat, lng: c.lng },
      map:      _googleMap,
      title:    c.name,
      icon: {
        path:        google.maps.SymbolPath.CIRCLE,
        scale:       10,
        fillColor:   c.emergency ? '#dc2626' : '#6A4C93',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 2,
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="font-family:'Poppins',sans-serif;padding:4px;">
          <p style="font-weight:700;font-size:13px;margin:0 0 2px;">${c.name}</p>
          <p style="font-size:11px;color:#6b7280;margin:0 0 6px;">${c.location}</p>
          <button onclick="window.openClinicDetail(${c.id})"
                  style="font-size:11px;color:#6A4C93;font-weight:600;
                         background:none;border:none;cursor:pointer;padding:0;">
            See details →
          </button>
        </div>`,
    });

    marker.addListener('click', () => {
      infoWindow.open(_googleMap, marker);
    });

    _mapMarkers.push(marker);
  });
}

// ─────────────────────────────────────────────
//  loadMapEvents
// ─────────────────────────────────────────────
export async function loadMapEvents() {
  let filtered     = [];
  let searchQuery  = "";
  let activeCardId = null;

  let pendingFilters = { quick: "all", zones: [] };
  let activeFilters  = { quick: "all", zones: [] };

  const filterModal = document.getElementById("modal-filters");
  const detailModal = document.getElementById("modal-clinic-detail");
  const openFilter  = () => filterModal?.classList.add("open");
  const closeFilter = () => filterModal?.classList.remove("open");
  const openDetail  = () => detailModal?.classList.add("open");
  const closeDetail = () => detailModal?.classList.remove("open");

  // ── Fetch config + clinics in parallel ────
  let mapsKey = '';
  try {
    const [configRes, clinicsRes] = await Promise.all([
      fetch('/api/config'),
      fetch('/api/businesses?type=clinic'),
    ]);

    if (configRes.ok) {
      const cfg = await configRes.json();
      mapsKey = cfg.mapsKey || '';
    }

    if (clinicsRes.ok) {
      const businesses = await clinicsRes.json();
      _allClinics = businesses
        .map(b => ({
          id:          b.business_id,
          name:        b.name,
          location:    b.zone ? `${b.zone}, Medellín` : (b.city || 'Medellín'),
          address:     b.address || '',
          rating:      parseFloat(b.rating_average) || 0,
          reviews:     b.rating_count || 0,
          zone:        b.zone || '',
          open24:      !!b.is_24h,
          emergency:   !!b.is_24h,
          phone:       b.phone || null,
          whatsapp:    b.whatsapp || null,
          website:     b.website || null,
          hours:       b.is_24h
                         ? 'Monday to Sunday — 24 hours'
                         : 'Mon–Fri 8am–6pm · Sat 8am–2pm',
          verified:    b.nit_verified === 'verified',
          description: b.address || 'Veterinary clinic in Medellín.',
          lat:         parseFloat(b.latitude),
          lng:         parseFloat(b.longitude),
        }))
        .filter(c => !isNaN(c.lat) && !isNaN(c.lng));
    }
  } catch (err) {
    console.error('Error loading map data:', err);
  }

  filtered = [..._allClinics];

  // ── Build zone chips dynamically ──────────
  const zones = [...new Set(_allClinics.map(c => c.zone).filter(Boolean))].sort();
  const zoneChipsEl = document.getElementById('zone-chips');
  if (zoneChipsEl && zones.length > 0) {
    zoneChipsEl.innerHTML = zones.map(z =>
      `<button class="fchip" data-type="zone" data-value="${z}">${z}</button>`
    ).join('');
  }

  // ── Init Google Maps ──────────────────────
  if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsKey}&callback=window.__initMap`;
    script.async = true;
    script.defer = true;
    window.__initMap = () => {
      initGoogleMap(_allClinics);
      delete window.__initMap;
    };
    document.head.appendChild(script);
  } else {
    initGoogleMap(_allClinics);
  }

  // ── Expose helpers ────────────────────────
  window.updateMapMarkers = (clinicList) => {
    if (_googleMap) _addMarkers(clinicList);
  };

  window.focusVet = (id) => {
    const c = _allClinics.find(cl => cl.id === id);
    if (!c || !_googleMap) return;
    _googleMap.panTo({ lat: c.lat, lng: c.lng });
    _googleMap.setZoom(15);
  };

  // ── Modal events ──────────────────────────
  document.getElementById("btn-open-filters")?.addEventListener("click", () => {
    syncChipsToActive();
    openFilter();
  });

  document.getElementById("modal-filters-close")?.addEventListener("click", closeFilter);
  filterModal?.addEventListener("click", e => { if (e.target === filterModal) closeFilter(); });
  document.getElementById("modal-detail-close")?.addEventListener("click", closeDetail);
  detailModal?.addEventListener("click", e => { if (e.target === detailModal) closeDetail(); });

  // ── Filter chips (event delegation) ───────
  filterModal?.addEventListener("click", e => {
    const chip = e.target.closest(".fchip");
    if (!chip) return;
    const { type, value } = chip.dataset;
    if (type === "quick") {
      filterModal.querySelectorAll(".fchip[data-type='quick']")
        .forEach(c => c.classList.remove("fchip-active"));
      chip.classList.add("fchip-active");
      pendingFilters.quick = value;
    } else if (type === "zone") {
      chip.classList.toggle("fchip-active");
      if (chip.classList.contains("fchip-active")) pendingFilters.zones.push(value);
      else pendingFilters.zones = pendingFilters.zones.filter(z => z !== value);
    }
  });

  document.getElementById("btn-apply-filters")?.addEventListener("click", () => {
    activeFilters = {
      quick: pendingFilters.quick,
      zones: [...pendingFilters.zones],
    };
    applyAll();
    updateFilterDot();
    closeFilter();
  });

  document.getElementById("btn-clear-filters")?.addEventListener("click", () => {
    activeFilters  = { quick: "all", zones: [] };
    pendingFilters = { quick: "all", zones: [] };
    const search = document.getElementById("map-search");
    if (search) { search.value = ""; searchQuery = ""; }
    syncChipsToActive();
    applyAll();
    updateFilterDot();
  });

  // ── Search ────────────────────────────────
  document.getElementById("map-search")?.addEventListener("input", e => {
    searchQuery = e.target.value.trim();
    applyAll();
  });

  // ── Filter + search logic ─────────────────
  function applyAll() {
    filtered = _allClinics.filter(c => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!c.name.toLowerCase().includes(q) &&
            !c.location.toLowerCase().includes(q) &&
            !c.address.toLowerCase().includes(q)) return false;
      }
      if (activeFilters.quick === "24h"       && !c.open24)    return false;
      if (activeFilters.quick === "emergency" && !c.emergency) return false;
      if (activeFilters.quick === "verified"  && !c.verified)  return false;
      if (activeFilters.zones.length > 0 &&
          !activeFilters.zones.includes(c.zone)) return false;
      return true;
    });
    renderCards(filtered);
    if (typeof window.updateMapMarkers === "function") window.updateMapMarkers(filtered);
  }

  function updateFilterDot() {
    const dot      = document.getElementById("filter-dot");
    const clearBtn = document.getElementById("btn-clear-filters");
    const hasActive = activeFilters.quick !== "all" || activeFilters.zones.length > 0;
    dot?.classList.toggle("hidden", !hasActive);
    clearBtn?.classList.toggle("hidden", !hasActive);
  }

  function syncChipsToActive() {
    pendingFilters = {
      quick: activeFilters.quick,
      zones: [...activeFilters.zones],
    };
    filterModal?.querySelectorAll(".fchip[data-type='quick']").forEach(c =>
      c.classList.toggle("fchip-active", c.dataset.value === activeFilters.quick));
    filterModal?.querySelectorAll(".fchip[data-type='zone']").forEach(c =>
      c.classList.toggle("fchip-active", activeFilters.zones.includes(c.dataset.value)));
  }

  // ── Render cards ──────────────────────────
  function renderCards(clinics) {
    const list    = document.getElementById("clinic-list");
    const empty   = document.getElementById("clinic-empty");
    const countEl = document.getElementById("map-count");
    if (!list) return;

    if (countEl) countEl.textContent = clinics.length;

    if (clinics.length === 0) {
      list.innerHTML = "";
      list.classList.add("hidden");
      empty?.classList.add("visible");
      return;
    }

    list.classList.remove("hidden");
    empty?.classList.remove("visible");

    list.innerHTML = clinics.map(c => `
      <div class="clinic-card ${activeCardId === c.id ? 'active' : ''}" data-id="${c.id}">
        <div class="clinic-card-icon">🏥</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-1 mb-0.5">
            <p class="font-semibold font-poppins leading-tight truncate"
               style="font-size:13px;color:var(--text-primary);">${c.name}</p>
            ${c.rating > 0 ? `
            <div class="flex items-center gap-0.5 flex-shrink-0">
              <svg class="w-3 h-3" style="color:#f59e0b;" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="font-bold font-poppins" style="font-size:11px;color:var(--text-primary);">${c.rating.toFixed(1)}</span>
            </div>` : ''}
          </div>
          <p class="flex items-center gap-1 mb-1.5" style="font-size:11px;color:var(--text-muted);">
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            ${c.location}
          </p>
          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-1">
              ${c.open24   ? `<span class="badge-24h-small">24/7</span>` : ''}
              ${c.verified ? `<span class="badge-verified">✓</span>` : ''}
            </div>
            <button class="btn-clinic-detail" data-id="${c.id}">Details →</button>
          </div>
        </div>
      </div>
    `).join('');

    list.querySelectorAll(".clinic-card").forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest(".btn-clinic-detail")) return;
        const id = Number(card.dataset.id);
        activeCardId = id;
        renderCards(filtered);
        if (typeof window.focusVet === "function") window.focusVet(id);
      });
    });

    list.querySelectorAll(".btn-clinic-detail").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        openClinicDetail(Number(btn.dataset.id));
      });
    });
  }

  // ── Clinic detail modal ───────────────────
  function openClinicDetail(id) {
    const c = _allClinics.find(cl => cl.id === id);
    if (!c) return;

    const el = id => document.getElementById(id);
    el("dc-name").textContent        = c.name;
    el("dc-location").textContent    = c.location;
    el("dc-address").textContent     = c.address;
    el("dc-hours").textContent       = c.hours;
    el("dc-description").textContent = c.description;
    el("dc-rating").textContent      = c.rating > 0 ? c.rating.toFixed(1) : '—';
    el("dc-reviews").textContent     = c.reviews > 0 ? `(${c.reviews} reviews)` : '';
    el("dc-verified").classList.toggle("hidden", !c.verified);
    el("dc-24h").classList.toggle("hidden", !c.open24);

    const websiteRow = el("dc-website-row");
    const websiteLink = el("dc-website");
    if (c.website && websiteRow && websiteLink) {
      websiteRow.classList.remove("hidden");
      websiteLink.href        = c.website;
      websiteLink.textContent = c.website.replace(/^https?:\/\//, '');
    } else if (websiteRow) {
      websiteRow.classList.add("hidden");
    }

    const callBtn = el("dc-call");
    if (callBtn) callBtn.href = c.phone ? `tel:${c.phone}` : "#";

    const waBtn = el("dc-whatsapp");
    if (waBtn) {
      waBtn.href = c.whatsapp
        ? `https://api.whatsapp.com/send/?phone=%2B${c.whatsapp}&text=Hola%20quiero%20informacion`
        : "#";
      waBtn.style.display = c.whatsapp ? "flex" : "none";
    }

    const focusBtn = el("dc-focus");
    focusBtn?.replaceWith(focusBtn.cloneNode(true));
    document.getElementById("dc-focus")?.addEventListener("click", () => {
      closeDetail();
      if (typeof window.focusVet === "function") window.focusVet(id);
    });

    openDetail();
  }

  window.openClinicDetail = openClinicDetail;

  // ── Initial render ────────────────────────
  renderCards(_allClinics);
}
