// Medical Records Page - PAWS Pet Care Platform
export function medicalRecordsPage() {
  return `
    <div class="min-h-screen" style="background: linear-gradient(160deg, #fef9ff 0%, #f8f6ff 60%, #f0fdf4 100%); font-family: 'Poppins', sans-serif;">

      <!-- Header -->
      <header class="bg-white shadow-sm border-b" style="border-color: #f0e8ff;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <div style="display:inline-flex; align-items:center; gap:6px; background:#B9FBC0; color:#059669; font-size:0.75rem; font-weight:600; padding:5px 14px; border-radius:999px; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px; font-family:'Poppins',sans-serif;">
                Health History
              </div>
              <h1 class="text-3xl font-bold" style="color: #333333; font-family: 'Poppins', sans-serif;">Medical Records</h1>
              <p class="mt-1" style="color: #4A4A4A; font-family: 'Roboto', sans-serif; font-size: 0.95rem;">Track your pets' health history and veterinary visits</p>
            </div>
            <button onclick="window.location.hash='/#/user-dashboard'" class="font-medium hover:opacity-75 transition" style="color: #6A4C93; font-family: 'Poppins', sans-serif;">
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <!-- Stats Overview -->
        <section class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div class="stat-card fade-up" style="animation-delay: 0s;">
            <div style="font-size:1.5rem; margin-bottom:6px;">📋</div>
            <div id="stat-total" style="font-size:1.6rem; font-weight:700; color:#333; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">Total Records</div>
          </div>
          <div class="stat-card fade-up" style="animation-delay: 0.05s;">
            <div style="font-size:1.5rem; margin-bottom:6px;">🩺</div>
            <div id="stat-checkups" style="font-size:1.6rem; font-weight:700; color:#333; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">Checkups</div>
          </div>
          <div class="stat-card fade-up" style="animation-delay: 0.1s;">
            <div style="font-size:1.5rem; margin-bottom:6px;">💉</div>
            <div id="stat-vaccines" style="font-size:1.6rem; font-weight:700; color:#333; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">Vaccinations</div>
          </div>
          <div class="stat-card fade-up" style="animation-delay: 0.15s;">
            <div style="font-size:1.5rem; margin-bottom:6px;">📅</div>
            <div id="stat-upcoming" style="font-size:1.6rem; font-weight:700; color:#333; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">Upcoming Visits</div>
          </div>
        </section>

        <!-- Pet Selection & Filters -->
        <section class="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <!-- Pet Selector -->
            <div>
              <p style="font-size:0.75rem; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:10px; font-family:'Poppins',sans-serif;">Select Pet</p>
              <div id="pet-selector-list" class="flex gap-3 flex-wrap">
                <div class="pet-selector active" data-pet-id="all">
                  <div style="width:36px; height:36px; border-radius:50%; background:#F1C0E8; display:flex; align-items:center; justify-content:center; font-size:1rem;">
                    All
                  </div>
                  <span style="font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem; color:#333;">All Pets</span>
                </div>
                <!-- Pet options loaded dynamically -->
              </div>
            </div>

            <!-- Visit Type Filters -->
            <div>
              <p style="font-size:0.75rem; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:10px; font-family:'Poppins',sans-serif;">Filter by Type</p>
              <div class="flex gap-2 flex-wrap">
                <button class="filter-chip active" data-filter="all">All</button>
                <button class="filter-chip" data-filter="checkup">Checkup</button>
                <button class="filter-chip" data-filter="vaccination">Vaccination</button>
                <button class="filter-chip" data-filter="surgery">Surgery</button>
                <button class="filter-chip" data-filter="emergency">Emergency</button>
                <button class="filter-chip" data-filter="dental">Dental</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Records List -->
        <section>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold" style="color:#333; font-family:'Poppins',sans-serif;">Visit History</h2>
            <button id="btn-add-record" style="background:#6A4C93; color:white; border:none; padding:10px 20px; border-radius:12px; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; gap:6px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Add Record
            </button>
          </div>

          <div id="records-container" class="space-y-4">
            <!-- Records loaded dynamically -->
            <div class="empty-state">
              <div style="font-size:3rem; margin-bottom:16px;">📋</div>
              <p style="color:#6b7280; font-family:'Roboto',sans-serif;">Loading medical records...</p>
            </div>
          </div>
        </section>

      </main>

      <!-- Record Detail Modal -->
      <div id="modal-record-detail" class="modal-overlay">
        <div class="modal-content">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 id="modal-title" class="text-xl font-bold" style="color:#333; font-family:'Poppins',sans-serif;">Record Details</h2>
              <p id="modal-date" style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;"></p>
            </div>
            <button onclick="closeRecordModal()" style="width:36px; height:36px; border-radius:50%; background:#f3f4f6; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              <svg width="18" height="18" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div id="modal-body">
            <!-- Content loaded dynamically -->
          </div>
        </div>
      </div>

      <!-- Add Record Modal -->
      <div id="modal-add-record" class="modal-overlay">
        <div class="modal-content">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-xl font-bold" style="color:#333; font-family:'Poppins',sans-serif;">Add Medical Record</h2>
            <button onclick="closeAddModal()" style="width:36px; height:36px; border-radius:50%; background:#f3f4f6; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              <svg width="18" height="18" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <form id="form-add-record" style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label style="display:block; margin-bottom:6px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Pet *</label>
              <select id="record-pet" required style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none; background:white;">
                <option value="">Select a pet...</option>
              </select>
            </div>

            <div>
              <label style="display:block; margin-bottom:6px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Visit Type *</label>
              <select id="record-type" required style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none; background:white;">
                <option value="">Select type...</option>
                <option value="checkup">Checkup</option>
                <option value="vaccination">Vaccination</option>
                <option value="surgery">Surgery</option>
                <option value="emergency">Emergency</option>
                <option value="dental">Dental</option>
                <option value="grooming">Grooming</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label style="display:block; margin-bottom:6px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Visit Date</label>
              <input type="date" id="record-date" style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none;">
            </div>

            <div>
              <label style="display:block; margin-bottom:6px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Veterinarian Name</label>
              <input type="text" id="record-vet" placeholder="Dr. Smith" style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none;">
            </div>

            <div>
              <label style="display:block; margin-bottom:6px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Reason for Visit</label>
              <input type="text" id="record-reason" placeholder="Annual checkup, vaccination, etc." style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none;">
            </div>

            <div>
              <label style="display:block; margin-bottom:6px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Diagnosis</label>
              <textarea id="record-diagnosis" rows="2" placeholder="Diagnosis details..." style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none; resize:vertical;"></textarea>
            </div>

            <div>
              <label style="display:block; margin-bottom:6px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Treatment</label>
              <textarea id="record-treatment" rows="2" placeholder="Treatment prescribed..." style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none; resize:vertical;"></textarea>
            </div>

            <div>
              <label style="display:block; margin-bottom:6px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Notes</label>
              <textarea id="record-notes" rows="2" placeholder="Additional notes..." style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none; resize:vertical;"></textarea>
            </div>

            <button type="submit" style="width:100%; padding:14px; background:#6A4C93; color:white; border:none; border-radius:12px; font-family:'Poppins',sans-serif; font-weight:700; font-size:0.95rem; cursor:pointer; margin-top:8px;">
              Save Record
            </button>
          </form>
        </div>
      </div>

    </div>
  `;
}

export function medicalRecordsEvents() {
  let allRecords = [];
  let allPets = [];
  let selectedPetId = 'all';
  let selectedFilter = 'all';

  // Load initial data
  loadPets();
  loadRecords();

  // Filter chip events
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedFilter = chip.dataset.filter;
      renderRecords();
    });
  });

  // Add record button
  const addBtn = document.getElementById('btn-add-record');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      document.getElementById('modal-add-record').classList.add('open');
    });
  }

  // Add record form
  const addForm = document.getElementById('form-add-record');
  if (addForm) {
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await submitNewRecord();
    });
  }

  // Close modals on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  });

  // ─── Load Functions ─────────────────────────────────────────

  async function loadPets() {
    try {
      const res = await fetch(`/api/users/${user.user_id || user.id_cliente}/dashboard`);
      if (res.ok) {
        const data = await res.json();
        allPets = data.mascotas || data.pets || [];
        renderPetSelectors();
        populatePetDropdown();
      }
    } catch (err) {
      console.error('Error loading pets:', err);
    }
  }

  async function loadRecords() {
    try {
      const res = await fetch(`/api/medical-records/user/${user.user_id || user.id_cliente}`);
      if (res.ok) {
        allRecords = await res.json();
        updateStats();
        renderRecords();
      } else {
        renderEmptyState();
      }
    } catch (err) {
      console.error('Error loading records:', err);
      renderEmptyState();
    }
  }

  // ─── Render Functions ───────────────────────────────────────

  function renderPetSelectors() {
    const container = document.getElementById('pet-selector-list');
    if (!container || !allPets.length) return;

    const allOption = `
      <div class="pet-selector ${selectedPetId === 'all' ? 'active' : ''}" data-pet-id="all" onclick="window.selectPet('all')">
        <div style="width:36px; height:36px; border-radius:50%; background:#F1C0E8; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:600; color:#6A4C93;">
          All
        </div>
        <span style="font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem; color:#333;">All Pets</span>
      </div>
    `;

    const petOptions = allPets.map(pet => {
      const emoji = pet.especie === 'Cat' || pet.species === 'Cat' ? '&#128049;' :
        pet.especie === 'Dog' || pet.species === 'Dog' ? '&#128054;' : '&#128062;';
      const bgColor = pet.especie === 'Cat' || pet.species === 'Cat' ? '#F1C0E8' : '#B9FBC0';
      const petId = pet.pet_id || pet.id_mascota;
      const petName = pet.nombre || pet.name;

      return `
        <div class="pet-selector ${selectedPetId === petId ? 'active' : ''}" data-pet-id="${petId}" onclick="window.selectPet(${petId})">
          <div style="width:36px; height:36px; border-radius:50%; background:${bgColor}; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
            ${emoji}
          </div>
          <span style="font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem; color:#333;">${petName}</span>
        </div>
      `;
    }).join('');

    container.innerHTML = allOption + petOptions;
  }

  function populatePetDropdown() {
    const select = document.getElementById('record-pet');
    if (!select) return;

    select.innerHTML = '<option value="">Select a pet...</option>' +
      allPets.map(pet => {
        const petId = pet.pet_id || pet.id_mascota;
        const petName = pet.nombre || pet.name;
        return `<option value="${petId}">${petName}</option>`;
      }).join('');
  }

  function updateStats() {
    const total = allRecords.length;
    const checkups = allRecords.filter(r => r.visit_type === 'checkup').length;
    const vaccines = allRecords.filter(r => r.visit_type === 'vaccination').length;
    const upcoming = allRecords.filter(r => {
      if (!r.next_visit_date) return false;
      return new Date(r.next_visit_date) > new Date();
    }).length;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-checkups').textContent = checkups;
    document.getElementById('stat-vaccines').textContent = vaccines;
    document.getElementById('stat-upcoming').textContent = upcoming;
  }

  function renderRecords() {
    const container = document.getElementById('records-container');
    if (!container) return;

    let filtered = [...allRecords];

    // Filter by pet
    if (selectedPetId !== 'all') {
      filtered = filtered.filter(r => r.pet_id === selectedPetId);
    }

    // Filter by type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(r => r.visit_type === selectedFilter);
    }

    if (filtered.length === 0) {
      renderEmptyState();
      return;
    }

    container.innerHTML = filtered.map((record, index) => {
      const visitDate = record.visit_date ? new Date(record.visit_date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      }) : 'No date';

      const typeColors = {
        checkup: { bg: '#B9FBC0', text: '#059669' },
        vaccination: { bg: '#90BDF4', text: '#2563eb' },
        surgery: { bg: '#FFCFD2', text: '#dc2626' },
        emergency: { bg: '#FFCFD2', text: '#dc2626' },
        dental: { bg: '#FBF8CC', text: '#d97706' },
        grooming: { bg: '#F1C0E8', text: '#6A4C93' },
        other: { bg: '#e5e7eb', text: '#6b7280' }
      };
      const colors = typeColors[record.visit_type] || typeColors.other;
      const petName = record.pet_name || 'Unknown Pet';

      return `
        <div class="record-card fade-up" style="animation-delay:${index * 0.05}s;" onclick="window.viewRecord(${record.record_id})">
          <div style="display:flex; align-items:stretch;">
            <!-- Timeline indicator -->
            <div style="width:48px; display:flex; flex-direction:column; align-items:center; padding:20px 0;">
              <div class="timeline-dot" style="background:${colors.bg};"></div>
              <div class="timeline-line" style="flex:1; margin-top:8px;"></div>
            </div>
            
            <!-- Content -->
            <div style="flex:1; padding:20px 20px 20px 0;">
              <div class="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="visit-badge" style="background:${colors.bg}; color:${colors.text};">${record.visit_type}</span>
                    <span style="font-size:0.8rem; color:#9ca3af; font-family:'Roboto',sans-serif;">${visitDate}</span>
                  </div>
                  <h3 style="font-size:1rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:4px;">
                    ${petName}
                  </h3>
                  ${record.clinic_name ? `<p style="font-size:0.82rem; color:#6b7280; font-family:'Roboto',sans-serif;">at ${record.clinic_name}</p>` : ''}
                </div>
                <svg width="20" height="20" fill="none" stroke="#9ca3af" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </div>
              
              ${record.reason ? `<p style="font-size:0.85rem; color:#4A4A4A; font-family:'Roboto',sans-serif; margin-bottom:8px;"><strong>Reason:</strong> ${record.reason}</p>` : ''}
              ${record.diagnosis ? `<p style="font-size:0.85rem; color:#4A4A4A; font-family:'Roboto',sans-serif;"><strong>Diagnosis:</strong> ${record.diagnosis.substring(0, 100)}${record.diagnosis.length > 100 ? '...' : ''}</p>` : ''}
              
              ${record.next_visit_date ? `
                <div style="margin-top:12px; padding:10px 14px; background:#FBF8CC; border-radius:10px; display:inline-flex; align-items:center; gap:8px;">
                  <span style="font-size:0.9rem;">&#128197;</span>
                  <span style="font-size:0.8rem; color:#d97706; font-family:'Poppins',sans-serif; font-weight:500;">
                    Next visit: ${new Date(record.next_visit_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderEmptyState() {
    const container = document.getElementById('records-container');
    if (!container) return;

    container.innerHTML = `
      <div class="empty-state" style="background:white; border-radius:20px; padding:60px 20px;">
        <div style="font-size:4rem; margin-bottom:16px;">&#128203;</div>
        <h3 style="font-size:1.2rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:8px;">No Medical Records Yet</h3>
        <p style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.9rem; max-width:320px; margin:0 auto 24px;">
          Start tracking your pet's health history by adding their first medical record.
        </p>
        <button onclick="document.getElementById('modal-add-record').classList.add('open')" style="background:#6A4C93; color:white; border:none; padding:12px 24px; border-radius:12px; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.9rem; cursor:pointer;">
          Add First Record
        </button>
      </div>
    `;
  }

  // ─── Modal Functions ────────────────────────────────────────

  window.selectPet = function (petId) {
    selectedPetId = petId === 'all' ? 'all' : parseInt(petId);
    renderPetSelectors();
    renderRecords();
  };

  window.viewRecord = function (recordId) {
    const record = allRecords.find(r => r.record_id === recordId);
    if (!record) return;

    const modal = document.getElementById('modal-record-detail');
    const title = document.getElementById('modal-title');
    const date = document.getElementById('modal-date');
    const body = document.getElementById('modal-body');

    const visitDate = record.visit_date ? new Date(record.visit_date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }) : 'No date recorded';

    title.textContent = `${record.pet_name || 'Pet'} - ${record.visit_type.charAt(0).toUpperCase() + record.visit_type.slice(1)}`;
    date.textContent = visitDate;

    body.innerHTML = `
      <div style="margin-bottom:20px;">
        ${record.clinic_name ? `
          <div class="detail-row">
            <span style="color:#6b7280;">Clinic</span>
            <span style="color:#333; font-weight:500;">${record.clinic_name}</span>
          </div>
        ` : ''}
        ${record.veterinarian ? `
          <div class="detail-row">
            <span style="color:#6b7280;">Veterinarian</span>
            <span style="color:#333; font-weight:500;">${record.veterinarian}</span>
          </div>
        ` : ''}
        ${record.reason ? `
          <div class="detail-row">
            <span style="color:#6b7280;">Reason</span>
            <span style="color:#333; font-weight:500;">${record.reason}</span>
          </div>
        ` : ''}
      </div>

      ${record.diagnosis ? `
        <div style="margin-bottom:16px;">
          <h4 style="font-size:0.85rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:8px;">Diagnosis</h4>
          <p style="font-size:0.875rem; color:#4A4A4A; font-family:'Roboto',sans-serif; line-height:1.6; background:#f9fafb; padding:12px; border-radius:10px;">${record.diagnosis}</p>
        </div>
      ` : ''}

      ${record.treatment ? `
        <div style="margin-bottom:16px;">
          <h4 style="font-size:0.85rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:8px;">Treatment</h4>
          <p style="font-size:0.875rem; color:#4A4A4A; font-family:'Roboto',sans-serif; line-height:1.6; background:#f9fafb; padding:12px; border-radius:10px;">${record.treatment}</p>
        </div>
      ` : ''}

      ${record.notes ? `
        <div style="margin-bottom:16px;">
          <h4 style="font-size:0.85rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:8px;">Notes</h4>
          <p style="font-size:0.875rem; color:#4A4A4A; font-family:'Roboto',sans-serif; line-height:1.6; background:#f9fafb; padding:12px; border-radius:10px;">${record.notes}</p>
        </div>
      ` : ''}

      ${record.next_visit_date ? `
        <div style="background:#FBF8CC; padding:16px; border-radius:12px; display:flex; align-items:center; gap:12px;">
          <span style="font-size:1.5rem;">&#128197;</span>
          <div>
            <p style="font-size:0.8rem; color:#d97706; font-family:'Poppins',sans-serif; font-weight:600;">Next Scheduled Visit</p>
            <p style="font-size:0.9rem; color:#333; font-family:'Roboto',sans-serif;">${new Date(record.next_visit_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>
      ` : ''}

      ${record.follow_up_notes ? `
        <div style="margin-top:16px;">
          <h4 style="font-size:0.85rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:8px;">Follow-up Notes</h4>
          <p style="font-size:0.875rem; color:#4A4A4A; font-family:'Roboto',sans-serif; line-height:1.6; background:#f0fdf4; padding:12px; border-radius:10px; border:1px solid #B9FBC0;">${record.follow_up_notes}</p>
        </div>
      ` : ''}
    `;

    modal.classList.add('open');
  };

  window.closeRecordModal = function () {
    document.getElementById('modal-record-detail').classList.remove('open');
  };

  window.closeAddModal = function () {
    document.getElementById('modal-add-record').classList.remove('open');
  };

  // ─── Submit New Record ──────────────────────────────────────

  async function submitNewRecord() {
    const petId = document.getElementById('record-pet').value;
    const visitType = document.getElementById('record-type').value;

    if (!petId || !visitType) {
      alert('Please select a pet and visit type.');
      return;
    }

    const body = {
      pet_id: parseInt(petId),
      user_id: user.user_id || user.id_cliente,
      visit_type: visitType,
      visit_date: document.getElementById('record-date').value || null,
      veterinarian: document.getElementById('record-vet').value || null,
      reason: document.getElementById('record-reason').value || null,
      diagnosis: document.getElementById('record-diagnosis').value || null,
      treatment: document.getElementById('record-treatment').value || null,
      notes: document.getElementById('record-notes').value || null
    };

    try {
      const res = await fetch('/api/medical-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        window.closeAddModal();
        document.getElementById('form-add-record').reset();
        loadRecords();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save record.');
      }
    } catch (err) {
      console.error('Error saving record:', err);
      alert('Failed to save record. Please try again.');
    }
  }
}
