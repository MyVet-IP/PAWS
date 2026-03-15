// ─────────────────────────────────────────────
//  medical-records.js
//  ✅ Inline styles extracted to medical-records.css
//  ✅ PAWS design tokens applied
//  ✅ Hover states on record cards
// ─────────────────────────────────────────────

export function medicalRecordsPage() {
  return `
  <div class="mr-wrapper">

    <!-- ── HEADER ──────────────────────────── -->
    <div class="mr-header">
      <div>
        <span class="mr-badge">Health History</span>
        <h1 class="mr-title">Medical Records</h1>
        <p class="mr-subtitle">Track your pets' health history and veterinary visits</p>
      </div>
      <button onclick="window.location.hash='#/user-dashboard'" class="mr-back-btn">
        ← Back to Dashboard
      </button>
    </div>

    <!-- ── STATS ─────────────────────────────── -->
    <section class="mr-stats">
      <div class="mr-stat-card fade-up" style="animation-delay:0s;">
        <div class="mr-stat-icon">
          <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <div id="stat-total" class="mr-stat-value">0</div>
        <div class="mr-stat-label">Total Records</div>
      </div>
      <div class="mr-stat-card fade-up" style="animation-delay:0.05s;">
        <div class="mr-stat-icon">
          <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        </div>
        <div id="stat-checkups" class="mr-stat-value">0</div>
        <div class="mr-stat-label">Checkups</div>
      </div>
      <div class="mr-stat-card fade-up" style="animation-delay:0.1s;">
        <div class="mr-stat-icon">
          <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        </div>
        <div id="stat-vaccines" class="mr-stat-value">0</div>
        <div class="mr-stat-label">Vaccinations</div>
      </div>
      <div class="mr-stat-card fade-up" style="animation-delay:0.15s;">
        <div class="mr-stat-icon">
          <svg fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        <div id="stat-upcoming" class="mr-stat-value">0</div>
        <div class="mr-stat-label">Upcoming Visits</div>
      </div>
    </section>

    <!-- ── FILTERS ───────────────────────────── -->
    <section class="mr-filters-card">
      <div class="mr-filters-inner">

        <!-- Pet selector -->
        <div>
          <p class="mr-filter-label">Select Pet</p>
          <div id="pet-selector-list" class="mr-pet-list">
            <div class="pet-selector active" data-pet-id="all">
              <div class="pet-sel-avatar" style="background:var(--purple-pastel);">All</div>
              <span class="pet-sel-name">All Pets</span>
            </div>
          </div>
        </div>

        <!-- Type filters -->
        <div>
          <p class="mr-filter-label">Filter by Type</p>
          <div class="mr-chips">
            <button class="mr-chip mr-chip-active" data-filter="all">All</button>
            <button class="mr-chip" data-filter="checkup">Checkup</button>
            <button class="mr-chip" data-filter="vaccination">Vaccination</button>
            <button class="mr-chip" data-filter="surgery">Surgery</button>
            <button class="mr-chip" data-filter="emergency">Emergency</button>
            <button class="mr-chip" data-filter="dental">Dental</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ── RECORDS LIST ──────────────────────── -->
    <section>
      <div class="mr-list-header">
        <h2 class="mr-list-title">Visit History</h2>
        <button id="btn-add-record" class="mr-add-btn">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14"/>
          </svg>
          Add Record
        </button>
      </div>

      <div id="records-container" class="mr-records-list">
        <div class="mr-empty">
          <div class="mr-empty-icon">📋</div>
          <p class="mr-empty-text">Loading medical records...</p>
        </div>
      </div>
    </section>

  </div>

  <!-- ── MODAL: RECORD DETAIL ──────────────── -->
  <div id="modal-record-detail" class="mr-modal-overlay">
    <div class="mr-modal-card">
      <div class="mr-modal-header">
        <div>
          <h2 id="modal-title" class="mr-modal-title">Record Details</h2>
          <p id="modal-date" class="mr-modal-subtitle"></p>
        </div>
        <button class="mr-modal-close" onclick="window.closeRecordModal()">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div id="modal-body" class="mr-modal-body"></div>
    </div>
  </div>

  <!-- ── MODAL: ADD RECORD ─────────────────── -->
  <div id="modal-add-record" class="mr-modal-overlay">
    <div class="mr-modal-card">
      <div class="mr-modal-header">
        <h2 class="mr-modal-title">Add Medical Record</h2>
        <button class="mr-modal-close" onclick="window.closeAddModal()">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <form id="form-add-record" class="mr-form">
        <div class="mr-form-group">
          <label class="mr-label">Pet *</label>
          <select id="record-pet" required class="mr-input">
            <option value="">Select a pet...</option>
          </select>
        </div>
        <div class="mr-form-group">
          <label class="mr-label">Visit Type *</label>
          <select id="record-type" required class="mr-input">
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
        <div class="mr-form-group">
          <label class="mr-label">Visit Date</label>
          <input type="date" id="record-date" class="mr-input"/>
        </div>
        <div class="mr-form-group">
          <label class="mr-label">Veterinarian Name</label>
          <input type="text" id="record-vet" placeholder="Dr. Smith" class="mr-input"/>
        </div>
        <div class="mr-form-group">
          <label class="mr-label">Reason for Visit</label>
          <input type="text" id="record-reason" placeholder="Annual checkup, vaccination, etc." class="mr-input"/>
        </div>
        <div class="mr-form-group">
          <label class="mr-label">Diagnosis</label>
          <textarea id="record-diagnosis" rows="2" placeholder="Diagnosis details..." class="mr-input mr-textarea"></textarea>
        </div>
        <div class="mr-form-group">
          <label class="mr-label">Treatment</label>
          <textarea id="record-treatment" rows="2" placeholder="Treatment prescribed..." class="mr-input mr-textarea"></textarea>
        </div>
        <div class="mr-form-group">
          <label class="mr-label">Notes</label>
          <textarea id="record-notes" rows="2" placeholder="Additional notes..." class="mr-input mr-textarea"></textarea>
        </div>
        <button type="submit" class="mr-submit-btn">Save Record</button>
      </form>
    </div>
  </div>
  `;
}

// ─────────────────────────────────────────────
//  medicalRecordsEvents
// ─────────────────────────────────────────────
export function medicalRecordsEvents() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return;

  let allRecords    = [];
  let allPets       = [];
  let selectedPetId = 'all';
  let selectedFilter= 'all';

  loadPets();
  loadRecords();

  // Filter chips
  document.querySelectorAll('.mr-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.mr-chip').forEach(c => c.classList.remove('mr-chip-active'));
      chip.classList.add('mr-chip-active');
      selectedFilter = chip.dataset.filter;
      renderRecords();
    });
  });

  // Add record button
  document.getElementById('btn-add-record')?.addEventListener('click', () => {
    document.getElementById('modal-add-record').classList.add('open');
  });

  // Add record form
  document.getElementById('form-add-record')?.addEventListener('submit', async e => {
    e.preventDefault();
    await submitNewRecord();
  });

  // Close modals on backdrop click
  document.querySelectorAll('.mr-modal-overlay').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('open');
    });
  });

  // ── Load functions ────────────────────────
  async function loadPets() {
    try {
      const res = await fetch(`/api/users/${user.user_id || user.id_cliente}/dashboard`);
      if (!res.ok) return;
      const data = await res.json();
      allPets = data.mascotas || data.pets || [];
      renderPetSelectors();
      populatePetDropdown();
    } catch (err) {
      console.error('Error loading pets:', err);
    }
  }

  async function loadRecords() {
    try {
      const res = await fetch(`/api/medical-records/user/${user.user_id || user.id_cliente}`);
      if (!res.ok) { renderEmptyState(); return; }
      allRecords = await res.json();
      updateStats();
      renderRecords();
    } catch (err) {
      console.error('Error loading records:', err);
      renderEmptyState();
    }
  }

  // ── Render functions ──────────────────────
  function renderPetSelectors() {
    const container = document.getElementById('pet-selector-list');
    if (!container || !allPets.length) return;

    const allOption = `
      <div class="pet-selector ${selectedPetId === 'all' ? 'active' : ''}"
           data-pet-id="all" onclick="window.selectPet('all')">
        <div class="pet-sel-avatar" style="background:var(--purple-pastel);">All</div>
        <span class="pet-sel-name">All Pets</span>
      </div>`;

    const petOptions = allPets.map(pet => {
      const petId   = pet.pet_id || pet.id_mascota;
      const petName = pet.nombre || pet.name;
      const species = pet.especie || pet.species || '';
      const bg      = species === 'Cat' ? 'var(--color-pink)' : 'var(--color-green)';
      const emoji   = species === 'Cat' ? '🐱' : species === 'Dog' ? '🐶' : '🐾';
      return `
        <div class="pet-selector ${selectedPetId === petId ? 'active' : ''}"
             data-pet-id="${petId}" onclick="window.selectPet(${petId})">
          <div class="pet-sel-avatar" style="background:${bg};">${emoji}</div>
          <span class="pet-sel-name">${petName}</span>
        </div>`;
    }).join('');

    container.innerHTML = allOption + petOptions;
  }

  function populatePetDropdown() {
    const select = document.getElementById('record-pet');
    if (!select) return;
    select.innerHTML = '<option value="">Select a pet...</option>' +
      allPets.map(pet => {
        const petId   = pet.pet_id || pet.id_mascota;
        const petName = pet.nombre || pet.name;
        return `<option value="${petId}">${petName}</option>`;
      }).join('');
  }

  function updateStats() {
    const total    = allRecords.length;
    const checkups = allRecords.filter(r => r.visit_type === 'checkup').length;
    const vaccines = allRecords.filter(r => r.visit_type === 'vaccination').length;
    const upcoming = allRecords.filter(r =>
      r.next_visit_date && new Date(r.next_visit_date) > new Date()
    ).length;

    document.getElementById('stat-total').textContent    = total;
    document.getElementById('stat-checkups').textContent = checkups;
    document.getElementById('stat-vaccines').textContent = vaccines;
    document.getElementById('stat-upcoming').textContent = upcoming;
  }

  function renderRecords() {
    const container = document.getElementById('records-container');
    if (!container) return;

    let filtered = [...allRecords];
    if (selectedPetId !== 'all') {
      filtered = filtered.filter(r => r.pet_id === selectedPetId);
    }
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(r => r.visit_type === selectedFilter);
    }

    if (filtered.length === 0) { renderEmptyState(); return; }

    // Type color map using PAWS tokens
    const TYPE_COLORS = {
      checkup:     { bg: 'var(--color-green)', text: 'var(--color-green-dark)' },
      vaccination: { bg: 'var(--color-blue)',  text: '#2563eb' },
      surgery:     { bg: 'var(--color-pink)',  text: '#dc2626' },
      emergency:   { bg: 'var(--color-pink)',  text: '#dc2626' },
      dental:      { bg: 'var(--color-yellow)',text: '#d97706' },
      grooming:    { bg: 'var(--purple-pastel)',text: 'var(--text-highlight)' },
      other:       { bg: 'var(--bg-muted)',    text: 'var(--text-muted)' },
    };

    container.innerHTML = filtered.map((record, i) => {
      const visitDate = record.visit_date
        ? new Date(record.visit_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : 'No date';
      const colors  = TYPE_COLORS[record.visit_type] || TYPE_COLORS.other;
      const petName = record.pet_name || 'Unknown Pet';

      return `
        <div class="mr-record-card fade-up" style="animation-delay:${i * 0.05}s;"
             onclick="window.viewRecord(${record.record_id})">
          <div class="mr-record-inner">

            <!-- Timeline -->
            <div class="mr-timeline">
              <div class="mr-timeline-dot" style="background:${colors.bg};"></div>
              <div class="mr-timeline-line"></div>
            </div>

            <!-- Content -->
            <div class="mr-record-content">
              <div class="mr-record-top">
                <div>
                  <div class="mr-record-meta">
                    <span class="mr-visit-badge" style="background:${colors.bg};color:${colors.text};">
                      ${record.visit_type}
                    </span>
                    <span class="mr-record-date">${visitDate}</span>
                  </div>
                  <h3 class="mr-record-pet">${petName}</h3>
                  ${record.clinic_name ? `<p class="mr-record-clinic">at ${record.clinic_name}</p>` : ''}
                </div>
                <svg class="mr-record-arrow" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </div>

              ${record.reason ? `<p class="mr-record-detail"><strong>Reason:</strong> ${record.reason}</p>` : ''}
              ${record.diagnosis ? `<p class="mr-record-detail"><strong>Diagnosis:</strong> ${record.diagnosis.substring(0,100)}${record.diagnosis.length > 100 ? '...' : ''}</p>` : ''}

              ${record.next_visit_date ? `
                <div class="mr-next-visit">
                  <span>📅</span>
                  <span>Next visit: ${new Date(record.next_visit_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>` : ''}
            </div>
          </div>
        </div>`;
    }).join('');
  }

  function renderEmptyState() {
    const container = document.getElementById('records-container');
    if (!container) return;
    container.innerHTML = `
      <div class="mr-empty-full">
        <div class="mr-empty-icon-lg">📋</div>
        <h3 class="mr-empty-title">No Medical Records Yet</h3>
        <p class="mr-empty-sub">Start tracking your pet's health history by adding their first medical record.</p>
        <button onclick="document.getElementById('modal-add-record').classList.add('open')"
                class="mr-add-btn">
          Add First Record
        </button>
      </div>`;
  }

  // ── Modal functions ───────────────────────
  window.selectPet = (petId) => {
    selectedPetId = petId === 'all' ? 'all' : parseInt(petId);
    renderPetSelectors();
    renderRecords();
  };

  window.viewRecord = (recordId) => {
    const record = allRecords.find(r => r.record_id === recordId);
    if (!record) return;

    const visitDate = record.visit_date
      ? new Date(record.visit_date).toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
      : 'No date recorded';

    document.getElementById('modal-title').textContent =
      `${record.pet_name || 'Pet'} — ${record.visit_type.charAt(0).toUpperCase() + record.visit_type.slice(1)}`;
    document.getElementById('modal-date').textContent = visitDate;

    document.getElementById('modal-body').innerHTML = `
      <div class="mr-detail-rows">
        ${record.clinic_name ? `<div class="mr-detail-row"><span>Clinic</span><span>${record.clinic_name}</span></div>` : ''}
        ${record.veterinarian ? `<div class="mr-detail-row"><span>Veterinarian</span><span>${record.veterinarian}</span></div>` : ''}
        ${record.reason ? `<div class="mr-detail-row"><span>Reason</span><span>${record.reason}</span></div>` : ''}
      </div>
      ${record.diagnosis ? `
        <div class="mr-detail-section">
          <h4 class="mr-detail-heading">Diagnosis</h4>
          <p class="mr-detail-text">${record.diagnosis}</p>
        </div>` : ''}
      ${record.treatment ? `
        <div class="mr-detail-section">
          <h4 class="mr-detail-heading">Treatment</h4>
          <p class="mr-detail-text">${record.treatment}</p>
        </div>` : ''}
      ${record.notes ? `
        <div class="mr-detail-section">
          <h4 class="mr-detail-heading">Notes</h4>
          <p class="mr-detail-text">${record.notes}</p>
        </div>` : ''}
      ${record.next_visit_date ? `
        <div class="mr-next-visit-detail">
          <span style="font-size:1.4rem;">📅</span>
          <div>
            <p class="mr-next-visit-label">Next Scheduled Visit</p>
            <p class="mr-next-visit-value">${new Date(record.next_visit_date).toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' })}</p>
          </div>
        </div>` : ''}
      ${record.follow_up_notes ? `
        <div class="mr-detail-section">
          <h4 class="mr-detail-heading">Follow-up Notes</h4>
          <p class="mr-detail-text mr-followup-text">${record.follow_up_notes}</p>
        </div>` : ''}`;

    document.getElementById('modal-record-detail').classList.add('open');
  };

  window.closeRecordModal = () =>
    document.getElementById('modal-record-detail').classList.remove('open');

  window.closeAddModal = () =>
    document.getElementById('modal-add-record').classList.remove('open');

  // ── Submit new record ─────────────────────
  async function submitNewRecord() {
    const petId     = document.getElementById('record-pet').value;
    const visitType = document.getElementById('record-type').value;

    if (!petId || !visitType) {
      alert('Please select a pet and visit type.');
      return;
    }

    const body = {
      pet_id:      parseInt(petId),
      user_id:     user.user_id || user.id_cliente,
      visit_type:  visitType,
      visit_date:  document.getElementById('record-date').value      || null,
      veterinarian:document.getElementById('record-vet').value       || null,
      reason:      document.getElementById('record-reason').value    || null,
      diagnosis:   document.getElementById('record-diagnosis').value || null,
      treatment:   document.getElementById('record-treatment').value || null,
      notes:       document.getElementById('record-notes').value     || null,
    };

    try {
      const res = await fetch('/api/medical-records', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
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