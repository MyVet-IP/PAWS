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
          ${generateClinicCards()}
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

// Function to generate clinic cards
function generateClinicCards() {
  const clinics = [
    {
      id: 1,
      name: 'Paws & Hearts Wellness',
      location: 'Polanco, Mexico City',
      rating: 4.9,
      reviewCount: 127,
      specialties: ['SURGERY', 'X-RAYS', 'DENTAL'],
      image: './frontend/assets/images/lllll.jpg',
      isSpecialist: true,
      distance: '2.3 km'
    },
    {
      id: 2,
      name: 'Animal Medical Center',
      location: 'Santa Fe, Mexico City',
      rating: 4.8,
      reviewCount: 89,
      specialties: ['CARDIOLOGY', 'VACCINES'],
      image: './frontend/assets/images/lllll.jpg',
      emergency: true,
      distance: '1.8 km'
    },
    {
      id: 3,
      name: 'San Francisco Hospital',
      location: 'Condesa, Mexico City',
      rating: 5.0,
      reviewCount: 95,
      specialties: ['LABORATORY', 'PHYSIOTHERAPY'],
      image: './frontend/assets/images/lllll.jpg',
      distance: '3.1 km'
    },
    {
      id: 4,
      name: 'Los Amigos Veterinary',
      location: 'Roma Norte, Mexico City',
      rating: 4.7,
      reviewCount: 203,
      specialties: ['CONSULTATION', 'VACCINES', 'GROOMING'],
      image: './frontend/assets/images/lllll.jpg',
      distance: '1.2 km'
    },
    {
      id: 5,
      name: 'Feline Specialized Clinic',
      location: 'Doctores, Mexico City',
      rating: 4.9,
      reviewCount: 156,
      specialties: ['FELINES', 'BEHAVIOR'],
      image: './frontend/assets/images/lllll.jpg',
      isSpecialist: true,
      distance: '4.5 km'
    },
    {
      id: 6,
      name: '24/7 Veterinary Hospital',
      location: 'Del Valle, Mexico City',
      rating: 4.6,
      reviewCount: 312,
      specialties: ['EMERGENCY', 'SURGERY', 'X-RAYS'],
      image: './frontend/assets/images/lllll.jpg',
      emergency: true,
      distance: '2.9 km'
    }
  ];

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
      </div>
    </div>
  `).join('');
}