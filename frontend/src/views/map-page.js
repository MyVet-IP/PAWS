
const CLINICS_SAMPLE = [
  {
    id: 1, name: "Clínica San Juan Pet",
    location: "El Poblado, Medellín",
    address: "Calle 10 # 43D-50, El Poblado",
    rating: 4.9, reviews: 128,
    services: ["Urgencias", "Cirugía", "Vacunación"],
    zone: "Poblado", open24: true, emergency: true,
    phone: "+57 300 111 2222", whatsapp: "573001112222",
    hours: "Lunes a Domingo — 24 horas", verified: true,
    description: "Clínica veterinaria de alta complejidad con más de 15 años de experiencia. UCI veterinaria, laboratorio clínico y especialistas certificados.",
    lat: 6.2100, lng: -75.5680,
  },
  {
    id: 2, name: "VetCare Laureles",
    location: "Laureles, Medellín",
    address: "Carrera 76 # 39-12, Laureles",
    rating: 4.7, reviews: 89,
    services: ["Consulta", "Vacunación", "Dermatología"],
    zone: "Laureles", open24: false, emergency: false,
    phone: "+57 300 333 4444", whatsapp: "573003334444",
    hours: "Lun–Vie 8am–6pm · Sáb 8am–2pm", verified: true,
    description: "Atención integral con enfoque en medicina preventiva y bienestar animal. Ambiente tranquilo y equipo especializado.",
    lat: 6.2444, lng: -75.5963,
  },
  {
    id: 3, name: "Animal House Envigado",
    location: "Envigado, Medellín",
    address: "Calle 37 Sur # 43B-10, Envigado",
    rating: 4.8, reviews: 203,
    services: ["Urgencias", "Ortopedia", "Laboratorio"],
    zone: "Envigado", open24: true, emergency: true,
    phone: "+57 300 555 6666", whatsapp: "573005556666",
    hours: "Lunes a Domingo — 24 horas", verified: false,
    description: "Especialistas en ortopedia y traumatología animal. Atención de urgencias 24/7 con equipos de diagnóstico de última generación.",
    lat: 6.1695, lng: -75.5924,
  },
  {
    id: 4, name: "PetSalud Belén",
    location: "Belén, Medellín",
    address: "Carrera 76 # 33-40, Belén",
    rating: 4.5, reviews: 64,
    services: ["Consulta", "Cirugía", "Odontología"],
    zone: "Belén", open24: false, emergency: false,
    phone: "+57 300 777 8888", whatsapp: null,
    hours: "Lunes a Sábado 9am–7pm", verified: true,
    description: "Clínica veterinaria con ambiente familiar y atención personalizada. Servicio de odontología veterinaria especializada.",
    lat: 6.2305, lng: -75.6122,
  },
  {
    id: 5, name: "Vet 24 Sabaneta",
    location: "Sabaneta, Medellín",
    address: "Calle 75 Sur # 45-20, Sabaneta",
    rating: 4.6, reviews: 47,
    services: ["Urgencias", "Vacunación", "Consulta"],
    zone: "Sabaneta", open24: true, emergency: true,
    phone: "+57 300 999 0000", whatsapp: "573009990000",
    hours: "Lunes a Domingo — 24 horas", verified: true,
    description: "Urgencias veterinarias disponibles las 24 horas. Equipo de guardia permanente para atender cualquier emergencia de tu mascota.",
    lat: 6.1510, lng: -75.6170,
  },
];

const ALL_ZONES    = [...new Set(CLINICS_SAMPLE.map(c => c.zone))];
const ALL_SERVICES = [...new Set(CLINICS_SAMPLE.flatMap(c => c.services))];

// ─────────────────────────────────────────────
//  loadMapPage
// ─────────────────────────────────────────────
export function loadMapPage() {
  return `
  <div class="font-roboto flex" style="height:calc(100vh - 64px);">

    <!-- ════════════════════════════════════════ -->
    <!--  SIDEBAR                                 -->
    <!-- ════════════════════════════════════════ -->
    <aside class="flex flex-col bg-white overflow-hidden flex-shrink-0"
           style="width:320px;border-right:1px solid #F3F4F6;">

      <!-- ── Search + Filter button ────────── -->
      <div class="px-4 pt-4 pb-3 flex items-center gap-2 flex-shrink-0"
           style="border-bottom:1px solid #F3F4F6;">

        <!-- Search -->
        <div class="relative flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-text-muted"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input id="map-search" type="text" placeholder="Search clinics..."
            class="w-full border border-gray-200 rounded-xl text-sm font-roboto
                   text-text-primary outline-none transition"
            style="padding:8px 10px 8px 34px;"
            onfocus="this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.12)'"
            onblur="this.style.borderColor='#E5E7EB';this.style.boxShadow='none'"/>
        </div>

        <!-- Filter button -->
        <button id="btn-open-filters"
          class="relative flex items-center justify-center rounded-xl border border-gray-200
                 transition flex-shrink-0 hover:border-text-highlight"
          style="width:38px;height:38px;background:white;"
          onmouseenter="this.style.background='rgba(106,76,147,0.06)'"
          onmouseleave="this.style.background='white'"
          title="Filters">
          <svg class="w-4 h-4 text-text-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
          </svg>
          <!-- Active dot -->
          <span id="filter-dot"
                class="hidden absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style="background:#6A4C93;"></span>
        </button>
      </div>

      <!-- ── Results count ──────────────────── -->
      <div class="px-4 py-2 flex-shrink-0 flex items-center justify-between">
        <p class="text-xs text-text-muted font-roboto">
          <span id="map-count" class="font-semibold text-text-primary">${CLINICS_SAMPLE.length}</span>
          clinics found
        </p>
        <button id="btn-clear-filters"
          class="hidden text-xs font-medium font-poppins transition"
          style="color:#6A4C93;"
          onmouseenter="this.style.opacity='0.7'"
          onmouseleave="this.style.opacity='1'">
          Clear filters
        </button>
      </div>

      <!-- ── Cards list ─────────────────────── -->
      <div id="clinic-list" class="flex-1 overflow-y-auto px-3 pb-3 flex flex-col gap-2">
        <!-- rendered by JS -->
      </div>

      <!-- Empty state -->
      <div id="clinic-empty" class="hidden flex-1 flex flex-col items-center justify-center p-8 text-center">
        <p class="text-4xl mb-3">🔍</p>
        <p class="font-semibold text-text-primary font-poppins text-sm">No clinics found</p>
        <p class="text-text-muted text-xs mt-1">Try adjusting your search or filters</p>
      </div>

    </aside>

    <!-- ════════════════════════════════════════ -->
    <!--  MAP                                     -->
    <!-- ════════════════════════════════════════ -->
    <div class="flex-1 relative" style="background:#E8EAE9;">
      <div id="mapContainer" class="w-full h-full">
        <!-- Google Maps placeholder -->
        <div class="w-full h-full flex flex-col items-center justify-center"
             style="background:linear-gradient(135deg,#F3F4F6,#E5E7EB);">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
               style="background:rgba(106,76,147,0.12);">
            <svg class="w-8 h-8 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
          </div>
          <p class="font-semibold text-text-primary font-poppins text-sm">Map loading...</p>
          <p class="text-text-muted text-xs mt-1">Google Maps will render here</p>
        </div>
      </div>
    </div>
  </div>

  <!-- ════════════════════════════════════════ -->
  <!--  MODAL: FILTERS                          -->
  <!-- ════════════════════════════════════════ -->
  <div id="modal-filters"
       style="display:none;position:fixed;inset:0;z-index:9999;
              align-items:flex-start;justify-content:flex-start;
              background:rgba(51,51,51,0.35);backdrop-filter:blur(3px);">

    <!-- Positioned near the filter button: top-left of sidebar -->
    <div class="bg-white rounded-2xl shadow-medium overflow-hidden animate-scale-in"
         style="position:absolute;top:120px;left:12px;width:296px;">

      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3"
           style="border-bottom:1px solid #F3F4F6;">
        <h3 class="font-bold font-poppins text-text-primary text-sm">Filters</h3>
        <button id="modal-filters-close"
          class="flex items-center justify-center rounded-full transition"
          style="width:28px;height:28px;border:none;cursor:pointer;background:#F3F4F6;color:#6B7280;"
          onmouseenter="this.style.background='#E5E7EB'"
          onmouseleave="this.style.background='#F3F4F6'">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="px-4 py-4 flex flex-col gap-4">

        <!-- Quick filters -->
        <div>
          <p class="text-xs font-semibold font-poppins uppercase tracking-wide text-text-muted mb-2"
             style="font-size:9.5px;">Quick</p>
          <div class="flex flex-wrap gap-1.5">
            <button class="fchip fchip-active" data-type="quick" data-value="all">All</button>
            <button class="fchip" data-type="quick" data-value="24h">🕐 24h only</button>
            <button class="fchip" data-type="quick" data-value="emergency">🚨 Emergency</button>
            <button class="fchip" data-type="quick" data-value="verified">✅ Verified</button>
          </div>
        </div>

        <!-- Zone -->
        <div>
          <p class="text-xs font-semibold font-poppins uppercase tracking-wide text-text-muted mb-2"
             style="font-size:9.5px;">Zone</p>
          <div class="flex flex-wrap gap-1.5">
            ${ALL_ZONES.map(z => `
              <button class="fchip" data-type="zone" data-value="${z}">${z}</button>
            `).join('')}
          </div>
        </div>

        <!-- Services -->
        <div>
          <p class="text-xs font-semibold font-poppins uppercase tracking-wide text-text-muted mb-2"
             style="font-size:9.5px;">Services</p>
          <div class="flex flex-wrap gap-1.5">
            ${ALL_SERVICES.map(s => `
              <button class="fchip" data-type="service" data-value="${s}">${s}</button>
            `).join('')}
          </div>
        </div>

        <!-- Apply -->
        <button id="btn-apply-filters"
          class="w-full py-2 rounded-xl font-poppins font-semibold text-sm text-white transition"
          style="background:#6A4C93;"
          onmouseenter="this.style.opacity='0.90'"
          onmouseleave="this.style.opacity='1'">
          Apply filters
        </button>

      </div>
    </div>
  </div>

  <!-- ════════════════════════════════════════ -->
  <!--  MODAL: CLINIC DETAIL                    -->
  <!-- ════════════════════════════════════════ -->
  <div id="modal-clinic-detail"
       style="display:none;position:fixed;inset:0;z-index:9999;
              align-items:center;justify-content:center;
              background:rgba(51,51,51,0.50);backdrop-filter:blur(6px);">

    <div class="bg-white rounded-2xl shadow-medium w-full mx-4 overflow-hidden animate-scale-in"
         style="max-width:460px;max-height:90vh;overflow-y:auto;">

      <!-- Gradient header -->
      <div class="relative px-6 pt-6 pb-12"
           style="background:linear-gradient(135deg,#6A4C93,#8B5FBF);">
        <button id="modal-detail-close"
          class="absolute top-4 right-4 flex items-center justify-center rounded-full"
          style="width:32px;height:32px;border:none;cursor:pointer;
                 background:rgba(255,255,255,0.15);color:white;transition:background 150ms;"
          onmouseenter="this.style.background='rgba(255,255,255,0.28)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.15)'">
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

        <!-- Rating + 24h -->
        <div class="absolute -bottom-4 left-6 flex gap-2">
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-soft bg-white">
            <svg class="w-3 h-3" style="color:#f59e0b;" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span id="dc-rating" class="text-xs font-bold text-text-primary font-poppins"></span>
            <span id="dc-reviews" class="text-xs text-text-muted"></span>
          </div>
          <div id="dc-24h" class="hidden px-3 py-1.5 rounded-xl shadow-soft"
               style="background:#dc2626;">
            <span class="text-xs font-bold text-white">24/7</span>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="px-6 pt-8 pb-6 flex flex-col gap-4">

        <p id="dc-description" class="text-text-soft text-sm leading-relaxed"></p>

        <!-- Info rows -->
        <div class="flex flex-col gap-2">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-surface-muted">
              <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-text-muted font-poppins">Address</p>
              <p id="dc-address" class="text-sm text-text-primary font-medium"></p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-surface-muted">
              <svg class="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs text-text-muted font-poppins">Schedule</p>
              <p id="dc-hours" class="text-sm text-text-primary font-medium"></p>
            </div>
          </div>
        </div>

        <!-- Services -->
        <div>
          <p class="text-xs font-semibold font-poppins uppercase tracking-wide text-text-muted mb-2"
             style="font-size:9.5px;">Services</p>
          <div id="dc-services" class="flex flex-wrap gap-2"></div>
        </div>

        <div style="height:1px;background:#F3F4F6;"></div>

        <!-- Actions -->
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <a id="dc-call" href="#"
               class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                      font-poppins font-semibold text-sm text-white transition"
               style="background:#6A4C93;"
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
                      font-poppins font-semibold text-sm transition"
               style="border:2px solid #E5E7EB;color:#6A4C93;"
               onmouseenter="this.style.borderColor='#6A4C93';this.style.background='rgba(106,76,147,0.05)'"
               onmouseleave="this.style.borderColor='#E5E7EB';this.style.background='transparent'">
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

  <!-- Filter chip styles -->
  <style>
    .fchip {
      padding: 4px 11px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 500;
      font-family: 'Poppins', sans-serif;
      border: 1.5px solid #E5E7EB;
      background: white;
      color: #4A4A4A;
      cursor: pointer;
      transition: all 150ms ease;
      white-space: nowrap;
    }
    .fchip:hover { border-color: #6A4C93; color: #6A4C93; }
    .fchip-active { background: #6A4C93 !important; border-color: #6A4C93 !important; color: white !important; }

    .clinic-card {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 11px;
      border-radius: 14px;
      border: 1.5px solid #F3F4F6;
      background: white;
      cursor: pointer;
      transition: all 150ms ease;
    }
    .clinic-card:hover { border-color: #6A4C93; box-shadow: 0 3px 10px rgba(106,76,147,0.10); }
    .clinic-card.active { border-color: #6A4C93; background: rgba(106,76,147,0.04); }
  </style>
  `;
}

// ─────────────────────────────────────────────
//  loadMapEvents
// ─────────────────────────────────────────────
export function loadMapEvents() {
  let filtered    = [...CLINICS_SAMPLE];
  let searchQuery = "";
  let activeCardId= null;

  // Pending filters (applied only on "Apply")
  let pendingFilters = { quick: "all", zones: [], services: [] };
  // Active filters (currently applied)
  let activeFilters  = { quick: "all", zones: [], services: [] };

  // ── Modal helpers ─────────────────────────
  const filterModal = document.getElementById("modal-filters");
  const detailModal = document.getElementById("modal-clinic-detail");

  const openFilter  = () => { if (filterModal) filterModal.style.display = "flex"; };
  const closeFilter = () => { if (filterModal) filterModal.style.display = "none"; };
  const openDetail  = () => { if (detailModal) detailModal.style.display = "flex"; };
  const closeDetail = () => { if (detailModal) detailModal.style.display = "none"; };

  // Open filter modal
  document.getElementById("btn-open-filters")?.addEventListener("click", () => {
    // Sync chips to activeFilters before opening
    syncChipsToActive();
    openFilter();
  });

  // Close filter modal
  document.getElementById("modal-filters-close")?.addEventListener("click", closeFilter);
  filterModal?.addEventListener("click", e => { if (e.target === filterModal) closeFilter(); });

  // Close detail modal
  document.getElementById("modal-detail-close")?.addEventListener("click", closeDetail);
  detailModal?.addEventListener("click", e => { if (e.target === detailModal) closeDetail(); });

  // ── Filter chips (inside modal) ───────────
  document.querySelectorAll(".fchip").forEach(chip => {
    chip.addEventListener("click", () => {
      const type  = chip.dataset.type;
      const value = chip.dataset.value;

      if (type === "quick") {
        document.querySelectorAll(".fchip[data-type='quick']")
          .forEach(c => c.classList.remove("fchip-active"));
        chip.classList.add("fchip-active");
        pendingFilters.quick = value;

      } else if (type === "zone") {
        chip.classList.toggle("fchip-active");
        if (chip.classList.contains("fchip-active")) {
          pendingFilters.zones.push(value);
        } else {
          pendingFilters.zones = pendingFilters.zones.filter(z => z !== value);
        }

      } else if (type === "service") {
        chip.classList.toggle("fchip-active");
        if (chip.classList.contains("fchip-active")) {
          pendingFilters.services.push(value);
        } else {
          pendingFilters.services = pendingFilters.services.filter(s => s !== value);
        }
      }
    });
  });

  // ── Apply filters button ──────────────────
  document.getElementById("btn-apply-filters")?.addEventListener("click", () => {
    activeFilters = { ...pendingFilters, zones: [...pendingFilters.zones], services: [...pendingFilters.services] };
    applyAll();
    updateFilterDot();
    closeFilter();
  });

  // ── Clear filters ─────────────────────────
  document.getElementById("btn-clear-filters")?.addEventListener("click", () => {
    activeFilters  = { quick: "all", zones: [], services: [] };
    pendingFilters = { quick: "all", zones: [], services: [] };
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

  // ── Apply all filters + search ────────────
  function applyAll() {
    filtered = CLINICS_SAMPLE.filter(c => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!c.name.toLowerCase().includes(q) &&
            !c.location.toLowerCase().includes(q) &&
            !c.services.some(s => s.toLowerCase().includes(q))) return false;
      }
      if (activeFilters.quick === "24h"       && !c.open24)     return false;
      if (activeFilters.quick === "emergency" && !c.emergency)  return false;
      if (activeFilters.quick === "verified"  && !c.verified)   return false;
      if (activeFilters.zones.length > 0 && !activeFilters.zones.includes(c.zone)) return false;
      if (activeFilters.services.length > 0 && !activeFilters.services.every(s => c.services.includes(s))) return false;
      return true;
    });

    renderCards(filtered);

    // Notify map (tu compañero conecta esto)
    if (typeof window.updateMapMarkers === "function") window.updateMapMarkers(filtered);
  }

  function updateFilterDot() {
    const dot      = document.getElementById("filter-dot");
    const clearBtn = document.getElementById("btn-clear-filters");
    const hasActive = activeFilters.quick !== "all"
                    || activeFilters.zones.length > 0
                    || activeFilters.services.length > 0;
    dot?.classList.toggle("hidden", !hasActive);
    clearBtn?.classList.toggle("hidden", !hasActive);
  }

  function syncChipsToActive() {
    pendingFilters = {
      quick:    activeFilters.quick,
      zones:    [...activeFilters.zones],
      services: [...activeFilters.services],
    };
    document.querySelectorAll(".fchip[data-type='quick']").forEach(c => {
      c.classList.toggle("fchip-active", c.dataset.value === activeFilters.quick);
    });
    document.querySelectorAll(".fchip[data-type='zone']").forEach(c => {
      c.classList.toggle("fchip-active", activeFilters.zones.includes(c.dataset.value));
    });
    document.querySelectorAll(".fchip[data-type='service']").forEach(c => {
      c.classList.toggle("fchip-active", activeFilters.services.includes(c.dataset.value));
    });
  }

  // ── Render cards ──────────────────────────
  function renderCards(clinics) {
    const list   = document.getElementById("clinic-list");
    const empty  = document.getElementById("clinic-empty");
    const countEl= document.getElementById("map-count");

    if (!list) return;
    if (countEl) countEl.textContent = clinics.length;

    if (clinics.length === 0) {
      list.innerHTML = "";
      empty?.classList.remove("hidden");
      list.classList.add("hidden");
      return;
    }
    empty?.classList.add("hidden");
    list.classList.remove("hidden");

    list.innerHTML = clinics.map(c => `
      <div class="clinic-card ${activeCardId === c.id ? 'active' : ''}" data-id="${c.id}">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
             style="background:rgba(106,76,147,0.10);">🏥</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-1 mb-0.5">
            <p class="font-semibold text-text-primary font-poppins leading-tight truncate"
               style="font-size:13px;">${c.name}</p>
            <div class="flex items-center gap-0.5 flex-shrink-0">
              <svg class="w-3 h-3" style="color:#f59e0b;" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="font-bold text-text-primary font-poppins" style="font-size:11px;">${c.rating}</span>
            </div>
          </div>

          <p class="text-text-muted flex items-center gap-1 mb-1.5" style="font-size:11px;">
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            ${c.location}
          </p>

          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-1">
              ${c.open24 ? `<span style="font-size:10px;padding:2px 7px;border-radius:999px;background:#FEE2E2;color:#dc2626;font-weight:600;">24/7</span>` : ''}
              ${c.verified ? `<span style="font-size:10px;padding:2px 7px;border-radius:999px;background:rgba(185,251,192,0.40);color:#059669;">✓</span>` : ''}
              ${c.services.slice(0,1).map(s =>
                `<span style="font-size:10px;padding:2px 7px;border-radius:999px;background:#F3F4F6;color:#4A4A4A;">${s}</span>`
              ).join('')}
            </div>
            <!-- Details button -->
            <button class="btn-clinic-detail flex-shrink-0 text-text-highlight font-poppins font-semibold
                           hover:underline transition" data-id="${c.id}"
                    style="font-size:11px;">
              Details →
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Bind card events
    list.querySelectorAll(".clinic-card").forEach(card => {
      card.addEventListener("click", e => {
        // If click is on the "Details" button, skip card focus
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

  // ── Open clinic detail modal ──────────────
  function openClinicDetail(id) {
    const c = CLINICS_SAMPLE.find(cl => cl.id === id);
    if (!c) return;

    const el = selector => document.getElementById(selector);

    el("dc-name").textContent        = c.name;
    el("dc-location").textContent    = c.location;
    el("dc-address").textContent     = c.address;
    el("dc-hours").textContent       = c.hours;
    el("dc-description").textContent = c.description;
    el("dc-rating").textContent      = c.rating;
    el("dc-reviews").textContent     = `(${c.reviews} reviews)`;

    el("dc-verified").classList.toggle("hidden", !c.verified);
    el("dc-24h").classList.toggle("hidden", !c.open24);

    el("dc-services").innerHTML = c.services.map(s => `
      <span class="px-3 py-1 rounded-full text-xs font-medium font-poppins"
            style="background:rgba(106,76,147,0.10);color:#6A4C93;">${s}</span>
    `).join('');

    // Call
    const callBtn = el("dc-call");
    if (callBtn) { callBtn.href = c.phone ? `tel:${c.phone}` : "#"; }

    // WhatsApp
    const waBtn = el("dc-whatsapp");
    if (waBtn) {
      if (c.whatsapp) {
        waBtn.href = `https://api.whatsapp.com/send/?phone=%2B${c.whatsapp}&text=Hola%20quiero%20informacion`;
        waBtn.style.display = "flex";
      } else {
        waBtn.style.display = "none";
      }
    }

    // Focus on map
    const focusBtn = el("dc-focus");
    focusBtn?.replaceWith(focusBtn.cloneNode(true)); // clear old listener
    document.getElementById("dc-focus")?.addEventListener("click", () => {
      closeDetail();
      if (typeof window.focusVet === "function") window.focusVet(id);
    });

    openDetail();
  }

  // Expose globally for Google Maps integration
  window.openClinicDetail = openClinicDetail;

  // ── Initial render ────────────────────────
  renderCards(CLINICS_SAMPLE);
}