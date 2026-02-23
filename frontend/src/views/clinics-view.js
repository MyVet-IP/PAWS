export function ClinicsView() {
  // Get search parameters from URL
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
  const searchLocation = urlParams.get('location') || '';

  return `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Veterinary Clinics</h1>
              <p class="text-gray-600 mt-2">Find the best care for your pet</p>
            </div>
            <button onclick="window.location.hash='#/'" class="text-purple-600 hover:text-purple-700 font-medium">
              ← Back to home
            </button>
          </div>
        </div>
      </header>

      <!-- Search Bar -->
      <section class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex gap-4 items-center">
            <div class="flex-1 relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <input 
                type="text" 
                id="clinic-search" 
                value="${searchLocation}"
                placeholder="Search by city or zip code..." 
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
            </div>
            <button onclick="searchClinicsHere()" class="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      <!-- Filters -->
      <section class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex gap-4 flex-wrap">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="emergency">24/7 Emergency</button>
            <button class="filter-btn" data-filter="surgery">Surgery</button>
            <button class="filter-btn" data-filter="cardiology">Cardiology</button>
            <button class="filter-btn" data-filter="dental">Dental</button>
            <button class="filter-btn" data-filter="lab">Laboratory</button>
          </div>
        </div>
      </section>

      <!-- Results -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-6 flex items-center justify-between">
          <p class="text-gray-600">
            <span id="results-count">6</span> clinics found
            ${searchLocation ? ` in <strong>${searchLocation}</strong>` : ''}
          </p>
          <select id="sort-select" class="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="rating">Sort by rating</option>
            <option value="distance">Sort by distance</option>
            <option value="name">Sort by name</option>
          </select>
        </div>

        <div id="clinics-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="col-span-3 text-center py-12 text-gray-400">Cargando clínicas...</div>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-12">
          <button onclick="loadMoreClinics()" class="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-300 transition-colors">
            Load more clinics
          </button>
        </div>
      </main>
    </div>

    <script>
      // Function to search clinics from this page
      function searchClinicsHere() {
        const location = document.getElementById('clinic-search').value;
        if (location.trim()) {
          window.location.hash = \`#/clinicas?location=\${encodeURIComponent(location)}\`;
        } else {
          window.location.hash = '#/clinicas';
        }
      }

      // Filters
      document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
          // Remove active from all buttons
          document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
          // Add active to clicked button
          e.target.classList.add('active');
          
          // Here you could filter the clinics
          filterClinics(e.target.dataset.filter);
        }
      });

      function filterClinics(filter) {
        // Implement filtering here
      }

      function loadMoreClinics() {
        // Implement loading more clinics
      }

      // Search with Enter
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && document.getElementById('clinic-search') === document.activeElement) {
          searchClinicsHere();
        }
      });
    </script>

    <style>
      .filter-btn {
        @apply px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer;
      }
      .filter-btn.active {
        @apply bg-purple-600 text-white hover:bg-purple-700;
      }
    </style>
  `;
}

function renderClinicCard(clinic) {
  const whatsappIcon = `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  return `
    <div class="clinic-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div class="relative h-48">
        <img src="${clinic.imagen || './frontend/assets/images/lllll.jpg'}" alt="${clinic.nombre}" class="w-full h-full object-cover">
        <div class="absolute top-4 left-4 flex gap-2">
          ${clinic.estado === 'Activa' ? '<span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Abierta</span>' : ''}
        </div>
        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span class="text-sm font-semibold text-yellow-500">★ ${clinic.rating || '4.9'}</span>
        </div>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-1">${clinic.nombre}</h3>
        <div class="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>${clinic.direccion}</span>
        </div>
        <div class="flex gap-3 mb-3">
          ${clinic.telefono ? `<a href="tel:${clinic.telefono}" class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium text-center">Llamar</a>` : ''}
          <button onclick="viewClinicDetails(${clinic.id_veterinaria})" class="flex-1 border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
            Ver detalles
          </button>
        </div>
        <button onclick="window.open('https://api.whatsapp.com/send/?phone=%2B573193052287&text=Hola%20quiero%20informacion%20sobre%20${encodeURIComponent(clinic.nombre)}&type=phone_number&app_absent=0', '_blank')"
          class="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
          ${whatsappIcon}
          Enviar WhatsApp
        </button>
      </div>
    </div>
  `;
}

export async function initClinicsView() {
  const grid = document.getElementById('clinics-grid');
  const countEl = document.getElementById('results-count');
  if (!grid) return;

  try {
    const res = await fetch('/api/clinics');
    if (!res.ok) throw new Error('Error al cargar clínicas');
    const clinics = await res.json();

    if (clinics.length === 0) {
      grid.innerHTML = '<p class="col-span-3 text-center text-gray-400 py-12">No se encontraron clínicas.</p>';
      return;
    }

    if (countEl) countEl.textContent = clinics.length;
    grid.innerHTML = clinics.map(renderClinicCard).join('');
  } catch (err) {
    grid.innerHTML = `<p class="col-span-3 text-center text-red-500 py-12">Error al cargar clínicas: ${err.message}</p>`;
  }
}

function generateClinicCards() {
  const clinics = [];

  return clinics.map(clinic => `
    <div class="clinic-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div class="relative h-48">
        <img src="${clinic.image}" alt="${clinic.name}" class="w-full h-full object-cover">
        <div class="absolute top-4 left-4 flex gap-2">
          ${clinic.isSpecialist ? '<span class="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">Especialista</span>' : ''}
          ${clinic.emergency ? '<span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Urgencias 24/7</span>' : ''}
        </div>
        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span class="text-sm font-medium text-gray-700">${clinic.distance}</span>
        </div>
      </div>
      
      <div class="p-6">
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-xl font-bold text-gray-800">${clinic.name}</h3>
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-sm font-semibold text-gray-700">${clinic.rating}</span>
            <span class="text-xs text-gray-500">(${clinic.reviewCount})</span>
          </div>
        </div>
        
        <div class="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>${clinic.location}</span>
        </div>
        
        <div class="flex gap-2 flex-wrap mb-4">
          ${clinic.specialties.map(specialty => 
            `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium">${specialty}</span>`
          ).join('')}
        </div>
        
        <div class="flex gap-3">
          <button onclick="viewClinicDetails(${clinic.id})" class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
            Ver detalles
          </button>
          <button onclick="bookAppointment(${clinic.id})" class="flex-1 border border-purple-600 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
            Reservar cita
          </button>
        </div>
        <div class="mt-3">
          <a href="https://wa.me/573001234567?text=Hola%20quiero%20informacion%20sobre%20${encodeURIComponent(clinic.name)}" target="_blank"
            class="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enviar WhatsApp
          </a>
        </div>
      </div>
    </div>
  `).join('');
}