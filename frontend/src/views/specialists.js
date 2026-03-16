export function specialistsPage() {
  const specialties = ['All', 'Cardiology', 'Surgery', 'Dermatology', 'Dentistry', 'Neurology', 'Exotic Animals'];
  const animals = ['All Animals', 'Dogs', 'Cats', 'Birds', 'Reptiles', 'Rabbits'];

  const stats = [
    { number: '40+', label: 'Verified Specialists', icon: 'stethoscope' },
    { number: '8', label: 'Specialty Areas', icon: 'science' },
    { number: '4.8', label: 'Average Rating', icon: 'star' },
    { number: '2,000+', label: 'Consultations Done', icon: 'assignment' }
  ];

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
          <!-- Filled dynamically by specialistsEvents() via GET /api/businesses?type=vet -->
          <div style="grid-column:1/-1;display:flex;align-items:center;justify-content:center;gap:10px;padding:60px 0;color:#888;">
            <svg style="width:20px;height:20px;animation:spin 1s linear infinite;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span style="font-family:'Poppins',sans-serif;font-size:14px;">Loading specialists...</span>
          </div>
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

      allSpecialists = businesses;

      if (businesses.length === 0) {
        grid.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:60px 0;color:#888;">
            <span class="material-symbols-outlined" style="font-size:3rem;display:block;margin-bottom:12px;">search_off</span>
            <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:600;color:#444;">No specialists found</p>
            <p style="font-family:'Roboto',sans-serif;font-size:13px;margin-top:4px;">Check back soon as new vets join the platform.</p>
          </div>`;
        return;
      }

      renderSpecialists(businesses);
    } catch (err) {
      console.error('Error loading specialists:', err);
      const grid = document.getElementById('specialists-grid');
      if (grid) grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 0;color:#888;">
          <span class="material-symbols-outlined" style="font-size:3rem;display:block;margin-bottom:12px;">error</span>
          <p style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:600;color:#dc2626;">Could not load specialists</p>
          <p style="font-family:'Roboto',sans-serif;font-size:13px;margin-top:4px;">${err.message}</p>
        </div>`;
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
    let filtered = [...allSpecialists];
    if (filtered.length === 0) return;

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

  loadSpecialists();
}
