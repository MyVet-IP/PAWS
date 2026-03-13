export function specialistsPage() {
  const specialists = [
    {
      name: 'Dr. Camila Torres',
      role: 'Veterinary Cardiologist',
      clinic: 'Clinica Veterinaria El Poblado',
      neighborhood: 'El Poblado, Medellín',
      experience: '12 years',
      rating: 4.9,
      reviews: 143,
      animals: ['Dogs', 'Cats'],
      color: '#F1C0E8',
      accent: '#6A4C93',
      availability: 'Mon – Fri',
      badge: 'Top Rated'
    },
    {
      name: 'Dr. Andrés Mejía',
      role: 'Exotic Animal Specialist',
      clinic: 'Centro Medico Veterinario Laureles',
      neighborhood: 'Laureles, Medellín',
      experience: '8 years',
      rating: 4.8,
      reviews: 89,
      animals: ['Birds', 'Reptiles', 'Rabbits'],
      color: '#90BDF4',
      accent: '#2563eb',
      availability: 'Tue – Sat',
      badge: 'Exotic Expert'
    },
    {
      name: 'Dra. Valentina Ríos',
      role: 'Veterinary Surgeon',
      clinic: 'Veterinaria Envigado',
      neighborhood: 'Envigado, Antioquia',
      experience: '15 years',
      rating: 5.0,
      reviews: 201,
      animals: ['Dogs', 'Cats', 'Rabbits'],
      color: '#B9FBC0',
      accent: '#059669',
      availability: 'Mon – Sat',
      badge: 'Perfect Score'
    },
    {
      name: 'Dr. Felipe Castro',
      role: 'Veterinary Dermatologist',
      clinic: 'Clinica Animal Belen',
      neighborhood: 'Belén, Medellín',
      experience: '6 years',
      rating: 4.7,
      reviews: 67,
      animals: ['Dogs', 'Cats'],
      color: '#FBF8CC',
      accent: '#d97706',
      availability: 'Mon – Thu',
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
      color: '#FFCFD2',
      accent: '#dc2626',
      availability: 'Wed – Sun',
      badge: 'Dental Expert'
    },
    {
      name: 'Dr. Juan Pablo Vélez',
      role: 'Veterinary Neurologist',
      clinic: 'Veterinaria La Candelaria',
      neighborhood: 'La Candelaria, Medellín',
      experience: '11 years',
      rating: 4.8,
      reviews: 78,
      animals: ['Dogs', 'Cats'],
      color: '#F1C0E8',
      accent: '#6A4C93',
      availability: 'Mon – Fri',
      badge: 'Neuro Expert'
    }
  ];

  const specialties = ['All', 'Cardiology', 'Surgery', 'Dermatology', 'Dentistry', 'Neurology', 'Exotic Animals'];
  const animals = ['All Animals', 'Dogs', 'Cats', 'Birds', 'Reptiles', 'Rabbits'];

  return `
    <div class="min-h-screen" style="background: linear-gradient(160deg, #fef9ff 0%, #f8f6ff 60%, #f0fdf4 100%); font-family: 'Poppins', sans-serif;">

      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">

      <style>
        .specialist-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 20px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .specialist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.10);
        }
        .specialist-avatar {
          width: 72px; height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          flex-shrink: 0;
        }
        .badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: 'Poppins', sans-serif;
        }
        .animal-tag {
          display: inline-block;
          font-size: 0.75rem;
          padding: 3px 10px;
          border-radius: 999px;
          background: #f3f4f6;
          color: #6b7280;
          font-family: 'Roboto', sans-serif;
        }
        .stars {
          color: #f59e0b;
          font-size: 0.8rem;
          letter-spacing: 1px;
        }
        .btn-primary {
          width: 100%;
          padding: 11px;
          border: none;
          border-radius: 12px;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.85; }
        .btn-secondary {
          width: 100%;
          padding: 10px;
          border-radius: 12px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          font-size: 0.85rem;
          cursor: pointer;
          background: white;
          transition: all 0.2s;
        }
        .filter-chip {
          padding: 7px 18px;
          border-radius: 999px;
          border: 1.5px solid #e5e7eb;
          background: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .filter-chip.active, .filter-chip:hover {
          background: #6A4C93;
          border-color: #6A4C93;
          color: white;
        }
        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
      </style>

      <!-- Header -->
      <header class="bg-white shadow-sm border-b" style="border-color: #f0e8ff;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <div style="display:inline-flex; align-items:center; gap:6px; background:#B9FBC0; color:#059669; font-size:0.75rem; font-weight:600; padding:5px 14px; border-radius:999px; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px; font-family:'Poppins',sans-serif;">
                🩺 Verified Professionals
              </div>
              <h1 class="text-3xl font-bold" style="color: #333333; font-family: 'Poppins', sans-serif;">Our Specialists</h1>
              <p class="mt-1" style="color: #4A4A4A; font-family: 'Roboto', sans-serif; font-size: 0.95rem;">Board-certified veterinary specialists across the Aburrá Valley</p>
            </div>
            <button onclick="window.location.hash='#/'" class="font-medium hover:opacity-75 transition" style="color: #6A4C93; font-family: 'Poppins', sans-serif;">
              ← Back to home
            </button>
          </div>
        </div>
      </header>

      <!-- Stats Bar -->
      <section style="background: linear-gradient(135deg, #6A4C93, #8b5cf6); padding: 32px 0;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${[
              { number: '40+', label: 'Verified Specialists', icon: '🩺' },
              { number: '8', label: 'Specialty Areas', icon: '🔬' },
              { number: '4.8★', label: 'Average Rating', icon: '⭐' },
              { number: '2,000+', label: 'Consultations Done', icon: '📋' }
            ].map(s => `
              <div class="text-center text-white">
                <div style="font-size:1.6rem; margin-bottom:4px;">${s.icon}</div>
                <div style="font-size:1.5rem; font-weight:700; font-family:'Poppins',sans-serif;">${s.number}</div>
                <div style="font-size:0.8rem; opacity:0.8; font-family:'Roboto',sans-serif;">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Filters -->
      <section class="bg-white border-b" style="border-color:#f5f5f5;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex flex-col gap-3">
            <div class="flex gap-2 flex-wrap items-center">
              <span style="font-size:0.75rem; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.05em; font-family:'Poppins',sans-serif; margin-right:4px;">Specialty:</span>
              ${specialties.map((s, i) => `
                <button class="filter-chip ${i === 0 ? 'active' : ''}" onclick="filterSpecialists(this, '${s}', 'specialty')">${s}</button>
              `).join('')}
            </div>
            <div class="flex gap-2 flex-wrap items-center">
              <span style="font-size:0.75rem; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.05em; font-family:'Poppins',sans-serif; margin-right:4px;">Animal:</span>
              ${animals.map((a, i) => `
                <button class="filter-chip ${i === 0 ? 'active' : ''}" onclick="filterSpecialists(this, '${a}', 'animal')" style="border-color:#e5e7eb;">${a}</button>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <!-- Specialists Grid -->
        <div id="specialists-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          ${specialists.map((sp, i) => `
            <div class="specialist-card fade-up" style="animation-delay:${i * 0.07}s;">
              <!-- Color top bar -->
              <div style="height:6px; background:${sp.color};"></div>
              <div class="p-6">
                <!-- Header row -->
                <div class="flex items-start gap-4 mb-4">
                  <div class="specialist-avatar" style="background:${sp.color};">👨‍⚕️</div>
                  <div class="flex-1">
                    <div class="flex items-start justify-between gap-2">
                      <div>
                        <h3 class="font-bold text-base" style="color:#333; font-family:'Poppins',sans-serif;">${sp.name}</h3>
                        <p style="color:${sp.accent}; font-size:0.82rem; font-weight:600; font-family:'Poppins',sans-serif;">${sp.role}</p>
                      </div>
                      <span class="badge" style="background:${sp.color}; color:${sp.accent};">${sp.badge}</span>
                    </div>
                  </div>
                </div>

                <!-- Clinic & location -->
                <div class="mb-3" style="font-family:'Roboto',sans-serif;">
                  <p style="font-size:0.82rem; color:#4A4A4A; display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                    🏥 <span>${sp.clinic}</span>
                  </p>
                  <p style="font-size:0.82rem; color:#6b7280; display:flex; align-items:center; gap:6px;">
                    📍 <span>${sp.neighborhood}</span>
                  </p>
                </div>

                <!-- Rating -->
                <div class="flex items-center gap-2 mb-3">
                  <span class="stars">${'★'.repeat(Math.floor(sp.rating))}</span>
                  <span style="font-size:0.85rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif;">${sp.rating}</span>
                  <span style="font-size:0.78rem; color:#9ca3af; font-family:'Roboto',sans-serif;">(${sp.reviews} reviews)</span>
                </div>

                <!-- Meta -->
                <div class="flex gap-4 mb-4" style="font-family:'Roboto',sans-serif; font-size:0.8rem; color:#6b7280;">
                  <span>🕐 ${sp.availability}</span>
                  <span>📅 ${sp.experience} exp.</span>
                </div>

                <!-- Animal tags -->
                <div class="flex flex-wrap gap-2 mb-5">
                  ${sp.animals.map(a => `<span class="animal-tag">${a}</span>`).join('')}
                </div>

                <!-- Actions -->
                <div class="flex flex-col gap-2">
                  <button class="btn-primary" style="background:${sp.color}; color:${sp.accent};">
                    Book Appointment
                  </button>
                  <button class="btn-secondary" style="border:1.5px solid ${sp.color}; color:${sp.accent};">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- CTA: Are you a vet? -->
        <div style="background:white; border-radius:20px; padding:40px; text-align:center; box-shadow:0 2px 20px rgba(0,0,0,0.06); border:1px solid #f0e8ff;">
          <div style="font-size:2.5rem; margin-bottom:12px;">🩺</div>
          <h3 class="text-xl font-bold mb-2" style="color:#333; font-family:'Poppins',sans-serif;">Are You a Veterinary Specialist?</h3>
          <p class="mb-6" style="color:#4A4A4A; font-family:'Roboto',sans-serif; font-size:0.9rem; max-width:480px; margin:0 auto 24px;">Join PAWS and connect with thousands of pet owners in Medellín looking for specialized care.</p>
          <button onclick="window.location.hash='#/work-with-us'" style="background:#6A4C93; color:white; border:none; padding:13px 32px; border-radius:12px; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.9rem; cursor:pointer;">
            Join as a Specialist →
          </button>
        </div>

      </main>
    </div>

    <script>
      let activeSpecialty = 'All';
      let activeAnimal = 'All Animals';

      function filterSpecialists(btn, value, type) {
        const group = type === 'specialty'
          ? btn.parentElement
          : btn.parentElement;

        btn.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');

        if (type === 'specialty') activeSpecialty = value;
        else activeAnimal = value;

        // Simple visual filter — in production would re-fetch from API
        console.log('Filter:', activeSpecialty, activeAnimal);
      }
    </script>
  `;
}

export function specialistsEvents() {
  // Events handled inline
}
