// frontend/src/services/clinics-service.js

const API_URL = 'http://localhost:3000/api/clinics';

const state = {
  coords: null,
  //debounceTimer: null
};

// ── Botón de geolocalización ───────────────────────────────
export function handleGeolocation() {
  if (!navigator.geolocation) {
    showLocationStatus('Tu navegador no soporta geolocalización.', 'text-red-500');
    return;
  }

  const btn  = document.getElementById('btn-location');
  const text = document.getElementById('btn-location-text');

  btn.disabled = true;
  btn.classList.add('opacity-60', 'cursor-not-allowed');
  text.textContent = 'Getting location...';
  showLocationStatus('Requesting location permissions (Check the box Remember this decision for better service)...', 'text-gray-500');

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      state.coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      btn.disabled = false;
      btn.classList.remove('opacity-60', 'cursor-not-allowed', 'bg-purple-100', 'text-purple-700');
      btn.classList.add('bg-green-100', 'text-green-700');
      text.textContent = 'Location active';
      showLocationStatus('Location detected — searching for clinics within 10 km', 'text-green-600');

      fetchClinics();
    },
    (err) => {
      btn.disabled = false;
      btn.classList.remove('opacity-60', 'cursor-not-allowed');
      resetLocationBtn();

      const msgs = {
        1: 'Location permission denied.',
        2: 'Your location could not be determined.',
        3: 'The location request took too long.',
      };
      showLocationStatus(msgs[err.code] || '⚠ Error obteniendo ubicación.', 'text-red-500');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
}

// ── Fetch al API ───────────────────────────────────────────
export async function fetchClinics() {
  const params = new URLSearchParams();

  if (state.coords) {
    params.set('lat',    state.coords.lat);
    params.set('lng',    state.coords.lng);
    params.set('radius', 10);
  } else {
    const searchVal = document.getElementById('clinic-search')?.value?.trim();
    if (searchVal) params.set('location', searchVal);
  }

  try {
    const res  = await fetch(`${API_URL}?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    renderClinics(data.clinics, data.mode);

    const count = document.getElementById('results-count');
    if (count) count.textContent = data.total;

  } catch (err) {
    console.error('[clinics-service] Error:', err);
    showLocationStatus('⚠ Error al cargar clínicas. Verificá la conexión.', 'text-red-500');
  }
}

// ── Render de cards ────────────────────────────────────────
function renderClinics(clinics, mode) {
  const grid = document.getElementById('clinics-grid');
  if (!grid) return;

  if (!clinics || clinics.length === 0) {
    grid.innerHTML = `
      <div class="col-span-3 text-center py-16 text-gray-400">
        <p class="text-4xl mb-3">🐾</p>
        <p class="font-semibold text-gray-500">No se encontraron clínicas</p>
        <p class="text-sm mt-1">Intentá ajustar los filtros o ampliar el radio de búsqueda</p>
      </div>`;
    return;
  }

  grid.innerHTML = clinics.map(c => `
    <div class="clinic-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div class="relative h-48">
        <img src="${c.imagen || './frontend/assets/images/lllll.jpg'}"
             alt="${c.nombre}"
             class="w-full h-full object-cover">
        ${c.distancia_km !== undefined ? `
          <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span class="text-sm font-medium text-purple-700">${c.distancia_km} km</span>
          </div>` : ''}
        ${c.servicios?.some(s => s.nombre === 'Urgencias') ? `
          <div class="absolute top-4 left-4">
            <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Urgencias 24/7</span>
          </div>` : ''}
      </div>

      <div class="p-6">
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-xl font-bold text-gray-800">${c.nombre}</h3>
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-sm font-semibold text-gray-700">${c.rating}</span>
          </div>
        </div>

        <div class="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>${c.direccion}</span>
        </div>

        <div class="flex gap-2 flex-wrap mb-4">
          ${(c.servicios || []).slice(0, 3).map(s =>
            `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium">${s.nombre}</span>`
          ).join('')}
        </div>

        <div class="flex gap-3">
          <button class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
            Ver detalles
          </button>
          <button class="flex-1 border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
            Reservar cita
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Helpers ────────────────────────────────────────────────
function showLocationStatus(msg, colorClass) {
  const el = document.getElementById('location-status');
  if (!el) return;
  el.className = `text-sm mt-2 ${colorClass}`;
  el.textContent = msg;
}

function resetLocationBtn() {
  const btn  = document.getElementById('btn-location');
  const text = document.getElementById('btn-location-text');
  if (!btn || !text) return;
  btn.classList.remove('bg-green-100', 'text-green-700');
  btn.classList.add('bg-purple-100', 'text-purple-700');
  text.textContent = 'Use my location';
}