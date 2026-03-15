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
          <button onclick="window.location.hash='/#/'" class="specialists-back-btn">
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
          <button onclick="window.location.hash='/#/work-with-us'" class="specialists-cta-btn">
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

  window.filterSpecialists = function (btn, value, type) {
    btn.parentElement.querySelectorAll('.specialists-filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');

    if (type === 'specialty') activeSpecialty = value;
    else activeAnimal = value;

    // Simple visual filter - in production would re-fetch from API
    console.log('Filter:', activeSpecialty, activeAnimal);
  };
}
