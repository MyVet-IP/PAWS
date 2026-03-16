export function specialistsPage() {
  const specialists = [
    {
      name: 'Dr. Camila Torres',
      role: 'Veterinary Cardiologist',
      clinic: 'Clinica Veterinaria El Poblado',
      neighborhood: 'El Poblado, Medellin',
      experience: '12 years',
      rating: 4.9,
      reviews: 143,
      animals: ['Dogs', 'Cats'],
      color: 'purple',
      availability: 'Mon - Fri',
      badge: 'Top Rated'
    },
    {
      name: 'Dr. Andres Mejia',
      role: 'Exotic Animal Specialist',
      clinic: 'Centro Medico Veterinario Laureles',
      neighborhood: 'Laureles, Medellin',
      experience: '8 years',
      rating: 4.8,
      reviews: 89,
      animals: ['Birds', 'Reptiles', 'Rabbits'],
      color: 'blue',
      availability: 'Tue - Sat',
      badge: 'Exotic Expert'
    },
    {
      name: 'Dra. Valentina Rios',
      role: 'Veterinary Surgeon',
      clinic: 'Veterinaria Envigado',
      neighborhood: 'Envigado, Antioquia',
      experience: '15 years',
      rating: 5.0,
      reviews: 201,
      animals: ['Dogs', 'Cats', 'Rabbits'],
      color: 'green',
      availability: 'Mon - Sat',
      badge: 'Perfect Score'
    },
    {
      name: 'Dr. Felipe Castro',
      role: 'Veterinary Dermatologist',
      clinic: 'Clinica Animal Belen',
      neighborhood: 'Belen, Medellin',
      experience: '6 years',
      rating: 4.7,
      reviews: 67,
      animals: ['Dogs', 'Cats'],
      color: 'yellow',
      availability: 'Mon - Thu',
      badge: 'Specialist'
    },
    {
      name: 'Dra. Mariana Ospina',
      role: 'Veterinary Dentist',
      clinic: 'VetSalud Sabaneta',
      neighborhood: 'Sabaneta, Antioquia',
      experience: '9 years',
      rating: 4.6,
      reviews: 112,
      animals: ['Dogs', 'Cats'],
      color: 'pink',
      availability: 'Wed - Sun',
      badge: 'Dental Expert'
    },
    {
      name: 'Dr. Juan Pablo Velez',
      role: 'Veterinary Neurologist',
      clinic: 'Veterinaria La Candelaria',
      neighborhood: 'La Candelaria, Medellin',
      experience: '11 years',
      rating: 4.8,
      reviews: 78,
      animals: ['Dogs', 'Cats'],
      color: 'purple',
      availability: 'Mon - Fri',
      badge: 'Neuro Expert'
    }
  ];

  const specialties = ['All', 'Cardiology', 'Surgery', 'Dermatology', 'Dentistry', 'Neurology', 'Exotic Animals'];
  const animals = ['All Animals', 'Dogs', 'Cats', 'Birds', 'Reptiles', 'Rabbits'];

  const stats = [
    { number: '40+', label: 'Verified Specialists', icon: 'stethoscope' },
    { number: '8', label: 'Specialty Areas', icon: 'science' },
    { number: '4.8', label: 'Average Rating', icon: 'star' },
    { number: '2,000+', label: 'Consultations Done', icon: 'assignment' }
  ];

  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    return '★'.repeat(fullStars);
  };

  return `
    <div class="specialists-page">

      <!-- Header -->
      <header class="specialists-header">
        <div class="specialists-header-content">
          <div class="specialists-header-info">
            <div class="specialists-badge">
              <span class="material-symbols-outlined" style="font-size: 14px;">verified</span>
              Verified Professionals
            </div>
            <h1 class="specialists-page-title">Our Specialists</h1>
            <p class="specialists-page-subtitle">Board-certified veterinary specialists across the Aburra Valley</p>
          </div>
          <button onclick="window.location.hash='/'" class="specialists-back-btn">
            <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">arrow_back</span>
            Back to home
          </button>
        </div>
      </header>

      <!-- Stats Bar -->
      <section class="specialists-stats-bar">
        <div class="specialists-stats-container">
          <div class="specialists-stats-grid">
            ${stats.map(s => `
              <div class="specialists-stat-item">
                <div class="specialists-stat-icon">
                  <span class="material-symbols-outlined">${s.icon}</span>
                </div>
                <div class="specialists-stat-number">${s.number}</div>
                <div class="specialists-stat-label">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Filters -->
      <section class="specialists-filters">
        <div class="specialists-filters-content">
          <div class="specialists-filter-row">
            <span class="specialists-filter-label">Specialty:</span>
            ${specialties.map((s, i) => `
              <button class="specialists-filter-chip ${i === 0 ? 'active' : ''}" onclick="filterSpecialists(this, '${s}', 'specialty')">${s}</button>
            `).join('')}
          </div>
          <div class="specialists-filter-row">
            <span class="specialists-filter-label">Animal:</span>
            ${animals.map((a, i) => `
              <button class="specialists-filter-chip ${i === 0 ? 'active' : ''}" onclick="filterSpecialists(this, '${a}', 'animal')">${a}</button>
            `).join('')}
          </div>
        </div>
      </section>

      <main class="specialists-main">

        <!-- Specialists Grid -->
        <div id="specialists-grid" class="specialists-grid">
          ${specialists.map((sp, i) => `
            <div class="specialist-card specialists-fade-up specialists-fade-up-delay-${Math.min(i + 1, 5)}">
              <!-- Color top bar -->
              <div class="specialist-card-accent specialist-card-accent--${sp.color}"></div>
              <div class="specialist-card-content">
                <!-- Header row -->
                <div class="specialist-card-header">
                  <div class="specialist-avatar specialist-avatar--${sp.color}">
                    <span class="material-symbols-outlined" style="font-size: 1.8rem;">person</span>
                  </div>
                  <div class="specialist-info">
                    <div class="specialist-info-header">
                      <div>
                        <h3 class="specialist-name">${sp.name}</h3>
                        <p class="specialist-role specialist-role--${sp.color}">${sp.role}</p>
                      </div>
                      <span class="specialist-badge specialist-badge--${sp.color}">${sp.badge}</span>
                    </div>
                  </div>
                </div>

                <!-- Clinic & location -->
                <div class="specialist-location">
                  <p class="specialist-location-item specialist-clinic">
                    <span class="material-symbols-outlined" style="font-size: 16px;">local_hospital</span>
                    <span>${sp.clinic}</span>
                  </p>
                  <p class="specialist-location-item specialist-neighborhood">
                    <span class="material-symbols-outlined" style="font-size: 16px;">location_on</span>
                    <span>${sp.neighborhood}</span>
                  </p>
                </div>

                <!-- Rating -->
                <div class="specialist-rating">
                  <span class="specialist-stars">${getStars(sp.rating)}</span>
                  <span class="specialist-rating-number">${sp.rating}</span>
                  <span class="specialist-reviews">(${sp.reviews} reviews)</span>
                </div>

                <!-- Meta -->
                <div class="specialist-meta">
                  <span>
                    <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle;">schedule</span>
                    ${sp.availability}
                  </span>
                  <span>
                    <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle;">work_history</span>
                    ${sp.experience} exp.
                  </span>
                </div>

                <!-- Animal tags -->
                <div class="specialist-animals">
                  ${sp.animals.map(a => `<span class="specialist-animal-tag">${a}</span>`).join('')}
                </div>

                <!-- Actions -->
                <div class="specialist-actions">
                  <button class="specialist-btn-primary specialist-btn-primary--${sp.color}">
                    Book Appointment
                  </button>
                  <button class="specialist-btn-secondary specialist-btn-secondary--${sp.color}">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- CTA: Are you a vet? -->
        <div class="specialists-cta">
          <div class="specialists-cta-icon">
            <span class="material-symbols-outlined" style="font-size: 2.5rem;">stethoscope</span>
          </div>
          <h3 class="specialists-cta-title">Are You a Veterinary Specialist?</h3>
          <p class="specialists-cta-text">Join PAWS and connect with thousands of pet owners in Medellin looking for specialized care.</p>
          <button onclick="window.location.hash='/work-with-us'" class="specialists-cta-btn">
            Join as a Specialist
            <span class="material-symbols-outlined" style="vertical-align: middle; margin-left: 4px; font-size: 18px;">arrow_forward</span>
          </button>
        </div>

      </main>
    </div>
  `;
}

export function specialistsEvents() {
  let activeSpecialty = 'All';
  let activeAnimal = 'All Animals';
  let allSpecialists = [];

  // Cargar especialistas desde /api/businesses (veterinarios con especialidades)
  async function loadSpecialists() {
    const grid = document.getElementById('specialists-grid');
    if (!grid) return;

    try {
      const [bizRes, specRes] = await Promise.all([
        fetch('/api/businesses?type=vet'),
        fetch('/api/businesses/specialties')
      ]);

      if (!bizRes.ok) throw new Error('Error loading specialists');
      const businesses = await bizRes.json();
      const specialties = specRes.ok ? await specRes.json() : [];

      // Actualizar chips de especialidades dinámicamente
      const specRow = document.querySelector('.specialists-filter-row');
      if (specRow && specialties.length > 0) {
        const allChip = specRow.querySelector('[onclick*="All"]');
        const existingChips = specRow.querySelectorAll('.specialists-filter-chip:not(:first-child)');
        existingChips.forEach(c => c.remove());
        specialties.forEach(s => {
          const btn = document.createElement('button');
          btn.className = 'specialists-filter-chip';
          btn.textContent = s.name;
          btn.onclick = () => window.filterSpecialists(btn, s.name, 'specialty');
          specRow.appendChild(btn);
        });
      }

      if (businesses.length === 0) {
        // Mantener datos de demo si no hay datos reales aún
        return;
      }

      allSpecialists = businesses;
      renderSpecialists(businesses);
    } catch (err) {
      console.error('Error loading specialists:', err);
      // Mantener datos de demo en caso de error
    }
  }

  function renderSpecialists(list) {
    const grid = document.getElementById('specialists-grid');
    if (!grid || list.length === 0) return;

    const colors = ['purple', 'blue', 'green', 'yellow', 'pink'];
    grid.innerHTML = list.map((biz, i) => {
      const color = colors[i % colors.length];
      const specs = (biz.specialties || []).map(s => s.name).join(', ') || 'General Veterinary';
      const animals = (biz.animal_types || []).map(a => `<span class="specialist-animal-tag">${a.name}</span>`).join('');
      return `
        <div class="specialist-card">
          <div class="specialist-card-accent specialist-card-accent--${color}"></div>
          <div class="specialist-card-content">
            <div class="specialist-card-header">
              <div class="specialist-avatar specialist-avatar--${color}">
                <span class="material-symbols-outlined" style="font-size:1.8rem;">local_hospital</span>
              </div>
              <div class="specialist-info">
                <div class="specialist-info-header">
                  <div>
                    <h3 class="specialist-name">${biz.name}</h3>
                    <p class="specialist-role specialist-role--${color}">${specs}</p>
                  </div>
                  ${biz.rating ? `<span class="specialist-badge specialist-badge--${color}">★ ${biz.rating}</span>` : ''}
                </div>
              </div>
            </div>
            <div class="specialist-location">
              <p class="specialist-location-item specialist-neighborhood">
                <span class="material-symbols-outlined" style="font-size:16px;">location_on</span>
                <span>${biz.address || biz.zone || 'Medellín'}</span>
              </p>
            </div>
            ${animals ? `<div class="specialist-animals">${animals}</div>` : ''}
            <div class="specialist-actions">
              <button class="specialist-btn-primary specialist-btn-primary--${color}"
                      onclick="window.location.hash='#/appointments'">
                Book Appointment
              </button>
              <button class="specialist-btn-secondary specialist-btn-secondary--${color}"
                      onclick="window.location.hash='#/clinics'">
                View Clinic
              </button>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  window.filterSpecialists = function (btn, value, type) {
    btn.parentElement.querySelectorAll('.specialists-filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');

    if (type === 'specialty') activeSpecialty = value;
    else activeAnimal = value;

    // Filtrar lista actual
    let filtered = allSpecialists.length > 0 ? allSpecialists : [];
    if (filtered.length === 0) return; // usar demo data si no hay API data

    if (activeSpecialty !== 'All') {
      filtered = filtered.filter(b =>
        (b.specialties || []).some(s => s.name.toLowerCase().includes(activeSpecialty.toLowerCase()))
      );
    }
    if (activeAnimal !== 'All Animals') {
      filtered = filtered.filter(b =>
        (b.animal_types || []).some(a => a.name.toLowerCase().includes(activeAnimal.toLowerCase()))
      );
    }
    renderSpecialists(filtered.length > 0 ? filtered : allSpecialists);
  };

  // Intentar cargar desde la API; si falla, mantiene los datos de demo del HTML
  loadSpecialists();
}
