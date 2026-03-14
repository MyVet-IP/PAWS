// User Schedule Appointments Page - PAWS Pet Care Platform
export function userScheduleAppointmentsPage() {
  return `
    <div class="min-h-screen" style="background: linear-gradient(160deg, #fef9ff 0%, #f8f6ff 60%, #f0fdf4 100%); font-family: 'Poppins', sans-serif;">

      <!-- Header -->
      <header class="bg-white shadow-sm border-b" style="border-color: #f0e8ff;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <div style="display:inline-flex; align-items:center; gap:6px; background:#90BDF4; color:#2563eb; font-size:0.75rem; font-weight:600; padding:5px 14px; border-radius:999px; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px; font-family:'Poppins',sans-serif;">
                Scheduling
              </div>
              <h1 class="text-3xl font-bold" style="color: #333333; font-family: 'Poppins', sans-serif;">My Appointments</h1>
              <p class="mt-1" style="color: #4A4A4A; font-family: 'Roboto', sans-serif; font-size: 0.95rem;">Schedule and manage veterinary appointments for your pets</p>
            </div>
            <button onclick="window.location.hash='#/user-dashboard'" class="font-medium hover:opacity-75 transition" style="color: #6A4C93; font-family: 'Poppins', sans-serif;">
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <!-- Stats Overview -->
        <section class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div class="stat-card fade-up" style="animation-delay: 0s;">
            <div style="font-size:1.5rem; margin-bottom:6px;">&#128197;</div>
            <div id="stat-upcoming" style="font-size:1.6rem; font-weight:700; color:#333; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">Upcoming</div>
          </div>
          <div class="stat-card fade-up" style="animation-delay: 0.05s;">
            <div style="font-size:1.5rem; margin-bottom:6px;">&#9989;</div>
            <div id="stat-confirmed" style="font-size:1.6rem; font-weight:700; color:#333; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">Confirmed</div>
          </div>
          <div class="stat-card fade-up" style="animation-delay: 0.1s;">
            <div style="font-size:1.5rem; margin-bottom:6px;">&#128336;</div>
            <div id="stat-pending" style="font-size:1.6rem; font-weight:700; color:#333; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">Pending</div>
          </div>
          <div class="stat-card fade-up" style="animation-delay: 0.15s;">
            <div style="font-size:1.5rem; margin-bottom:6px;">&#128203;</div>
            <div id="stat-completed" style="font-size:1.6rem; font-weight:700; color:#333; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">Completed</div>
          </div>
        </section>

        <!-- Tabs & New Appointment Button -->
        <section class="bg-white rounded-2xl p-4 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex gap-2">
            <button class="tab-btn active" data-tab="upcoming">Upcoming</button>
            <button class="tab-btn" data-tab="past">Past</button>
            <button class="tab-btn" data-tab="all">All</button>
          </div>
          <button id="btn-new-appointment" style="background:#6A4C93; color:white; border:none; padding:12px 24px; border-radius:12px; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.9rem; cursor:pointer; display:flex; align-items:center; gap:8px;">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Book Appointment
          </button>
        </section>

        <!-- Appointments List -->
        <section>
          <div id="appointments-container" class="space-y-4">
            <div style="text-align:center; padding:60px 20px;">
              <div style="font-size:3rem; margin-bottom:16px;">&#128197;</div>
              <p style="color:#6b7280; font-family:'Roboto',sans-serif;">Loading appointments...</p>
            </div>
          </div>
        </section>

      </main>

      <!-- New Appointment Modal -->
      <div id="modal-new-appointment" class="modal-overlay">
        <div class="modal-content">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-xl font-bold" style="color:#333; font-family:'Poppins',sans-serif;">Book New Appointment</h2>
              <p style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Schedule a visit for your pet</p>
            </div>
            <button onclick="window.closeNewAppointmentModal()" style="width:36px; height:36px; border-radius:50%; background:#f3f4f6; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              <svg width="18" height="18" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Step Indicator -->
          <div class="step-indicator justify-center mb-8">
            <div class="step-dot active" id="step-1">1</div>
            <div class="step-line" id="line-1-2"></div>
            <div class="step-dot pending" id="step-2">2</div>
            <div class="step-line" id="line-2-3"></div>
            <div class="step-dot pending" id="step-3">3</div>
            <div class="step-line" id="line-3-4"></div>
            <div class="step-dot pending" id="step-4">4</div>
          </div>

          <!-- Step Content -->
          <div id="booking-step-content">
            <!-- Step 1: Select Pet -->
            <div id="booking-step-1" class="booking-step">
              <h3 style="font-size:1rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:16px;">Select Your Pet</h3>
              <div id="booking-pet-list" class="grid grid-cols-2 gap-3">
                <!-- Pets loaded dynamically -->
              </div>
            </div>

            <!-- Step 2: Select Clinic -->
            <div id="booking-step-2" class="booking-step" style="display:none;">
              <h3 style="font-size:1rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:16px;">Choose a Clinic</h3>
              <div id="booking-clinic-list" class="space-y-3" style="max-height:300px; overflow-y:auto;">
                <!-- Clinics loaded dynamically -->
              </div>
            </div>

            <!-- Step 3: Select Date & Time -->
            <div id="booking-step-3" class="booking-step" style="display:none;">
              <h3 style="font-size:1rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:16px;">Select Date & Time</h3>
              
              <div style="margin-bottom:20px;">
                <label style="display:block; margin-bottom:8px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Date</label>
                <input type="date" id="booking-date" style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none;">
              </div>

              <div>
                <label style="display:block; margin-bottom:8px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Available Time Slots</label>
                <div id="booking-time-slots" class="grid grid-cols-3 gap-2">
                  <!-- Time slots rendered dynamically -->
                </div>
              </div>
            </div>

            <!-- Step 4: Confirm Details -->
            <div id="booking-step-4" class="booking-step" style="display:none;">
              <h3 style="font-size:1rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:16px;">Confirm Appointment</h3>
              
              <div id="booking-summary" style="background:#f9fafb; border-radius:16px; padding:20px; margin-bottom:20px;">
                <!-- Summary loaded dynamically -->
              </div>

              <div style="margin-bottom:16px;">
                <label style="display:block; margin-bottom:8px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Reason for Visit</label>
                <select id="booking-reason" style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none; background:white;">
                  <option value="checkup">Regular Checkup</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="grooming">Grooming</option>
                  <option value="dental">Dental Care</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style="display:block; margin-bottom:8px; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; color:#4A4A4A;">Additional Notes (Optional)</label>
                <textarea id="booking-notes" rows="3" placeholder="Any special requirements or information..." style="width:100%; padding:12px 16px; border:1.5px solid #e5e7eb; border-radius:12px; font-family:'Roboto',sans-serif; font-size:0.9rem; color:#333; outline:none; resize:vertical;"></textarea>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button id="btn-prev-step" onclick="window.prevBookingStep()" style="padding:12px 24px; border-radius:12px; border:1.5px solid #e5e7eb; background:white; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.9rem; color:#6b7280; cursor:pointer; display:none;">
              Previous
            </button>
            <button id="btn-next-step" onclick="window.nextBookingStep()" style="padding:12px 24px; border-radius:12px; border:none; background:#6A4C93; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.9rem; color:white; cursor:pointer; margin-left:auto;">
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- Appointment Detail Modal -->
      <div id="modal-appointment-detail" class="modal-overlay">
        <div class="modal-content">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 id="detail-title" class="text-xl font-bold" style="color:#333; font-family:'Poppins',sans-serif;">Appointment Details</h2>
              <p id="detail-status" style="margin-top:8px;"></p>
            </div>
            <button onclick="window.closeDetailModal()" style="width:36px; height:36px; border-radius:50%; background:#f3f4f6; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              <svg width="18" height="18" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div id="detail-body">
            <!-- Content loaded dynamically -->
          </div>

          <div id="detail-actions" class="flex gap-3 mt-6">
            <!-- Actions loaded dynamically -->
          </div>
        </div>
      </div>

    </div>
  `;
}

export function userScheduleAppointmentsEvents() {
  let allAppointments = [];
  let allPets = [];
  let allClinics = [];
  let currentTab = 'upcoming';
  let bookingStep = 1;
  let bookingData = {
    pet: null,
    clinic: null,
    date: null,
    time: null,
    reason: 'checkup',
    notes: ''
  };

  // Initialize
  loadPets();
  loadClinics();
  loadAppointments();
  setupDatePicker();

  // Tab events
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      renderAppointments();
    });
  });

  // New appointment button
  const newBtn = document.getElementById('btn-new-appointment');
  if (newBtn) {
    newBtn.addEventListener('click', () => {
      resetBookingFlow();
      document.getElementById('modal-new-appointment').classList.add('open');
    });
  }

  // Close modals on backdrop
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  });

  // ─── Load Functions ─────────────────────────────────────────

  async function loadPets() {
    try {
      const res = await fetch(`/api/users/${user.user_id || user.id_cliente}/dashboard`);
      if (res.ok) {
        const data = await res.json();
        allPets = data.mascotas || data.pets || [];
        renderBookingPets();
      }
    } catch (err) {
      console.error('Error loading pets:', err);
    }
  }

  async function loadClinics() {
    try {
      const res = await fetch('/api/clinics');
      if (res.ok) {
        allClinics = await res.json();
        renderBookingClinics();
      }
    } catch (err) {
      console.error('Error loading clinics:', err);
    }
  }

  async function loadAppointments() {
    try {
      // Note: Replace with actual appointments endpoint when available
      // For now using mock data structure
      const res = await fetch(`/api/users/${user.user_id || user.id_cliente}/appointments`);
      if (res.ok) {
        allAppointments = await res.json();
      } else {
        // Use empty array if no appointments endpoint
        allAppointments = [];
      }
      updateStats();
      renderAppointments();
    } catch (err) {
      console.error('Error loading appointments:', err);
      allAppointments = [];
      updateStats();
      renderAppointments();
    }
  }

  function setupDatePicker() {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
      const today = new Date();
      const minDate = today.toISOString().split('T')[0];
      const maxDate = new Date(today.setMonth(today.getMonth() + 3)).toISOString().split('T')[0];
      dateInput.min = minDate;
      dateInput.max = maxDate;
      dateInput.addEventListener('change', () => {
        bookingData.date = dateInput.value;
        renderTimeSlots();
      });
    }
  }

  // ─── Stats & Render ─────────────────────────────────────────

  function updateStats() {
    const now = new Date();
    const upcoming = allAppointments.filter(a => new Date(a.date) >= now && a.status !== 'cancelled').length;
    const confirmed = allAppointments.filter(a => a.status === 'confirmed').length;
    const pending = allAppointments.filter(a => a.status === 'pending').length;
    const completed = allAppointments.filter(a => a.status === 'completed').length;

    document.getElementById('stat-upcoming').textContent = upcoming;
    document.getElementById('stat-confirmed').textContent = confirmed;
    document.getElementById('stat-pending').textContent = pending;
    document.getElementById('stat-completed').textContent = completed;
  }

  function renderAppointments() {
    const container = document.getElementById('appointments-container');
    if (!container) return;

    const now = new Date();
    let filtered = [...allAppointments];

    if (currentTab === 'upcoming') {
      filtered = filtered.filter(a => new Date(a.date) >= now && a.status !== 'cancelled');
    } else if (currentTab === 'past') {
      filtered = filtered.filter(a => new Date(a.date) < now || a.status === 'completed');
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:60px 20px; background:white; border-radius:20px;">
          <div style="font-size:4rem; margin-bottom:16px;">&#128197;</div>
          <h3 style="font-size:1.2rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:8px;">No Appointments</h3>
          <p style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.9rem; max-width:320px; margin:0 auto 24px;">
            ${currentTab === 'upcoming' ? "You don't have any upcoming appointments. Book one now!" : "No past appointments to show."}
          </p>
          ${currentTab === 'upcoming' ? `
            <button onclick="document.getElementById('btn-new-appointment').click()" style="background:#6A4C93; color:white; border:none; padding:12px 24px; border-radius:12px; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.9rem; cursor:pointer;">
              Book Your First Appointment
            </button>
          ` : ''}
        </div>
      `;
      return;
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    container.innerHTML = filtered.map((apt, index) => {
      const aptDate = new Date(apt.date);
      const dateStr = aptDate.toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric'
      });
      const timeStr = apt.time || '10:00 AM';
      const petName = apt.pet_name || 'Pet';
      const clinicName = apt.clinic_name || 'Clinic';

      const statusClasses = {
        pending: 'status-pending',
        confirmed: 'status-confirmed',
        completed: 'status-completed',
        cancelled: 'status-cancelled'
      };

      const statusIcons = {
        pending: '&#128336;',
        confirmed: '&#9989;',
        completed: '&#9989;',
        cancelled: '&#10060;'
      };

      return `
        <div class="appointment-card fade-up" style="animation-delay:${index * 0.05}s;" onclick="window.viewAppointment(${apt.appointment_id || index})">
          <div style="display:flex; align-items:stretch;">
            <!-- Date Column -->
            <div style="width:100px; background:linear-gradient(135deg, #6A4C93 0%, #8b5cf6 100%); color:white; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px 12px;">
              <span style="font-size:1.8rem; font-weight:700; font-family:'Poppins',sans-serif;">${aptDate.getDate()}</span>
              <span style="font-size:0.75rem; text-transform:uppercase; opacity:0.9; font-family:'Poppins',sans-serif;">${aptDate.toLocaleDateString('en-US', { month: 'short' })}</span>
              <span style="font-size:0.7rem; opacity:0.75; margin-top:4px; font-family:'Roboto',sans-serif;">${aptDate.getFullYear()}</span>
            </div>
            
            <!-- Content -->
            <div style="flex:1; padding:20px;">
              <div class="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 style="font-size:1rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:4px;">
                    ${petName}
                  </h3>
                  <p style="font-size:0.85rem; color:#6b7280; font-family:'Roboto',sans-serif;">
                    ${apt.reason || 'Checkup'} at ${clinicName}
                  </p>
                </div>
                <span class="status-badge ${statusClasses[apt.status] || 'status-pending'}">
                  ${statusIcons[apt.status] || statusIcons.pending} ${apt.status || 'Pending'}
                </span>
              </div>
              
              <div class="flex items-center gap-4" style="font-size:0.82rem; color:#6b7280; font-family:'Roboto',sans-serif;">
                <span style="display:flex; align-items:center; gap:4px;">
                  &#128337; ${timeStr}
                </span>
                <span style="display:flex; align-items:center; gap:4px;">
                  &#128205; ${apt.address || 'Address not specified'}
                </span>
              </div>
            </div>

            <!-- Arrow -->
            <div style="display:flex; align-items:center; padding-right:20px;">
              <svg width="20" height="20" fill="none" stroke="#9ca3af" stroke-width="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ─── Booking Flow ───────────────────────────────────────────

  function resetBookingFlow() {
    bookingStep = 1;
    bookingData = { pet: null, clinic: null, date: null, time: null, reason: 'checkup', notes: '' };
    updateStepIndicators();
    showBookingStep(1);
    document.getElementById('btn-prev-step').style.display = 'none';
    document.getElementById('btn-next-step').textContent = 'Next';
  }

  function renderBookingPets() {
    const container = document.getElementById('booking-pet-list');
    if (!container) return;

    if (allPets.length === 0) {
      container.innerHTML = `
        <div class="col-span-2 text-center py-8">
          <p style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.9rem;">No pets found. Please add a pet first.</p>
          <button onclick="window.location.hash='#/user-dashboard'" style="margin-top:12px; background:#6A4C93; color:white; border:none; padding:10px 20px; border-radius:10px; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.85rem; cursor:pointer;">
            Add Pet
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = allPets.map(pet => {
      const petId = pet.pet_id || pet.id_mascota;
      const petName = pet.nombre || pet.name;
      const emoji = pet.especie === 'Cat' || pet.species === 'Cat' ? '&#128049;' : '&#128054;';
      const bgColor = pet.especie === 'Cat' || pet.species === 'Cat' ? '#F1C0E8' : '#B9FBC0';
      const isSelected = bookingData.pet?.id === petId;

      return `
        <div class="clinic-card ${isSelected ? 'selected' : ''}" onclick="window.selectBookingPet(${petId}, '${petName}')">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:48px; height:48px; border-radius:50%; background:${bgColor}; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
              ${emoji}
            </div>
            <div>
              <p style="font-weight:600; color:#333; font-family:'Poppins',sans-serif; font-size:0.9rem;">${petName}</p>
              <p style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">${pet.especie || pet.species || 'Pet'}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderBookingClinics() {
    const container = document.getElementById('booking-clinic-list');
    if (!container) return;

    if (allClinics.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8">
          <p style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.9rem;">No clinics available.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = allClinics.map(clinic => {
      const clinicId = clinic.clinic_id || clinic.id_clinica;
      const clinicName = clinic.nombre || clinic.name;
      const isSelected = bookingData.clinic?.id === clinicId;

      return `
        <div class="clinic-card ${isSelected ? 'selected' : ''}" onclick="window.selectBookingClinic(${clinicId}, '${clinicName}', '${clinic.direccion || clinic.address || ''}')">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:48px; height:48px; border-radius:12px; background:#90BDF4; display:flex; align-items:center; justify-content:center; font-size:1.3rem;">
              &#127973;
            </div>
            <div style="flex:1;">
              <p style="font-weight:600; color:#333; font-family:'Poppins',sans-serif; font-size:0.9rem;">${clinicName}</p>
              <p style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">${clinic.direccion || clinic.address || 'Address not available'}</p>
            </div>
            ${clinic.rating ? `
              <div style="display:flex; align-items:center; gap:4px;">
                <span style="color:#f59e0b;">&#9733;</span>
                <span style="font-size:0.85rem; font-weight:600; color:#333;">${clinic.rating}</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderTimeSlots() {
    const container = document.getElementById('booking-time-slots');
    if (!container) return;

    const slots = [
      '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
      '04:00 PM', '05:00 PM', '06:00 PM'
    ];

    // Simulate some unavailable slots
    const unavailable = ['12:00 PM', '01:00 PM'];

    container.innerHTML = slots.map(slot => {
      const isUnavailable = unavailable.includes(slot);
      const isSelected = bookingData.time === slot;

      return `
        <button class="time-slot ${isSelected ? 'selected' : ''} ${isUnavailable ? 'unavailable' : ''}"
                onclick="${isUnavailable ? '' : `window.selectBookingTime('${slot}')`}"
                ${isUnavailable ? 'disabled' : ''}>
          ${slot}
        </button>
      `;
    }).join('');
  }

  function renderBookingSummary() {
    const container = document.getElementById('booking-summary');
    if (!container) return;

    const dateStr = bookingData.date ? new Date(bookingData.date).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    }) : 'Not selected';

    container.innerHTML = `
      <div style="display:grid; gap:12px;">
        <div style="display:flex; justify-content:space-between; padding-bottom:12px; border-bottom:1px solid #e5e7eb;">
          <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Pet</span>
          <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.85rem;">${bookingData.pet?.name || 'Not selected'}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding-bottom:12px; border-bottom:1px solid #e5e7eb;">
          <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Clinic</span>
          <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.85rem;">${bookingData.clinic?.name || 'Not selected'}</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding-bottom:12px; border-bottom:1px solid #e5e7eb;">
          <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Date</span>
          <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.85rem;">${dateStr}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Time</span>
          <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.85rem;">${bookingData.time || 'Not selected'}</span>
        </div>
      </div>
    `;
  }

  function showBookingStep(step) {
    document.querySelectorAll('.booking-step').forEach(s => s.style.display = 'none');
    document.getElementById(`booking-step-${step}`).style.display = 'block';

    // Update prev/next buttons
    document.getElementById('btn-prev-step').style.display = step > 1 ? 'block' : 'none';
    document.getElementById('btn-next-step').textContent = step === 4 ? 'Confirm Booking' : 'Next';

    // Render step-specific content
    if (step === 3) {
      renderTimeSlots();
    } else if (step === 4) {
      renderBookingSummary();
    }
  }

  function updateStepIndicators() {
    for (let i = 1; i <= 4; i++) {
      const dot = document.getElementById(`step-${i}`);
      const line = document.getElementById(`line-${i - 1}-${i}`);

      if (i < bookingStep) {
        dot.className = 'step-dot completed';
        dot.innerHTML = '&#10003;';
        if (line) line.className = 'step-line active';
      } else if (i === bookingStep) {
        dot.className = 'step-dot active';
        dot.textContent = i;
        if (line) line.className = 'step-line active';
      } else {
        dot.className = 'step-dot pending';
        dot.textContent = i;
        if (line) line.className = 'step-line';
      }
    }
  }

  // ─── Global Functions ───────────────────────────────────────

  window.selectBookingPet = function (id, name) {
    bookingData.pet = { id, name };
    renderBookingPets();
  };

  window.selectBookingClinic = function (id, name, address) {
    bookingData.clinic = { id, name, address };
    renderBookingClinics();
  };

  window.selectBookingTime = function (time) {
    bookingData.time = time;
    renderTimeSlots();
  };

  window.nextBookingStep = async function () {
    // Validate current step
    if (bookingStep === 1 && !bookingData.pet) {
      alert('Please select a pet.');
      return;
    }
    if (bookingStep === 2 && !bookingData.clinic) {
      alert('Please select a clinic.');
      return;
    }
    if (bookingStep === 3 && (!bookingData.date || !bookingData.time)) {
      alert('Please select a date and time.');
      return;
    }

    if (bookingStep === 4) {
      // Submit booking
      await submitBooking();
      return;
    }

    bookingStep++;
    updateStepIndicators();
    showBookingStep(bookingStep);
  };

  window.prevBookingStep = function () {
    if (bookingStep > 1) {
      bookingStep--;
      updateStepIndicators();
      showBookingStep(bookingStep);
    }
  };

  window.closeNewAppointmentModal = function () {
    document.getElementById('modal-new-appointment').classList.remove('open');
  };

  window.closeDetailModal = function () {
    document.getElementById('modal-appointment-detail').classList.remove('open');
  };

  window.viewAppointment = function (id) {
    const apt = allAppointments.find(a => (a.appointment_id || allAppointments.indexOf(a)) === id);
    if (!apt) return;

    const modal = document.getElementById('modal-appointment-detail');
    document.getElementById('detail-title').textContent = `${apt.pet_name || 'Pet'} - ${apt.reason || 'Appointment'}`;

    const statusClasses = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    document.getElementById('detail-status').innerHTML = `<span class="status-badge ${statusClasses[apt.status] || 'status-pending'}">${apt.status || 'Pending'}</span>`;

    const aptDate = new Date(apt.date);
    document.getElementById('detail-body').innerHTML = `
      <div style="background:#f9fafb; border-radius:16px; padding:20px; margin-bottom:20px;">
        <div style="display:grid; gap:12px;">
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Date</span>
            <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.85rem;">${aptDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Time</span>
            <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.85rem;">${apt.time || '10:00 AM'}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Clinic</span>
            <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.85rem;">${apt.clinic_name || 'Clinic'}</span>
          </div>
          ${apt.address ? `
            <div style="display:flex; justify-content:space-between;">
              <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Address</span>
              <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.85rem;">${apt.address}</span>
            </div>
          ` : ''}
        </div>
      </div>

      ${apt.notes ? `
        <div style="margin-bottom:16px;">
          <h4 style="font-size:0.85rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:8px;">Notes</h4>
          <p style="font-size:0.875rem; color:#4A4A4A; font-family:'Roboto',sans-serif; line-height:1.6; background:#f9fafb; padding:12px; border-radius:10px;">${apt.notes}</p>
        </div>
      ` : ''}
    `;

    // Actions based on status
    const actionsDiv = document.getElementById('detail-actions');
    if (apt.status === 'pending' || apt.status === 'confirmed') {
      actionsDiv.innerHTML = `
        <button onclick="window.cancelAppointment(${apt.appointment_id})" style="flex:1; padding:12px; border-radius:12px; border:1.5px solid #FFCFD2; background:white; color:#dc2626; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.9rem; cursor:pointer;">
          Cancel Appointment
        </button>
        <button onclick="window.rescheduleAppointment(${apt.appointment_id})" style="flex:1; padding:12px; border-radius:12px; border:none; background:#6A4C93; color:white; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.9rem; cursor:pointer;">
          Reschedule
        </button>
      `;
    } else {
      actionsDiv.innerHTML = '';
    }

    modal.classList.add('open');
  };

  window.cancelAppointment = async function (id) {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      // API call to cancel
      const apt = allAppointments.find(a => a.appointment_id === id);
      if (apt) apt.status = 'cancelled';
      renderAppointments();
      updateStats();
      window.closeDetailModal();
    } catch (err) {
      console.error('Error cancelling appointment:', err);
    }
  };

  window.rescheduleAppointment = function (id) {
    window.closeDetailModal();
    // Open booking modal with pre-filled data
    document.getElementById('btn-new-appointment').click();
  };

  async function submitBooking() {
    bookingData.reason = document.getElementById('booking-reason').value;
    bookingData.notes = document.getElementById('booking-notes').value;

    const body = {
      pet_id: bookingData.pet.id,
      user_id: user.user_id || user.id_cliente,
      clinic_id: bookingData.clinic.id,
      date: bookingData.date,
      time: bookingData.time,
      reason: bookingData.reason,
      notes: bookingData.notes,
      status: 'pending'
    };

    try {
      // Note: Replace with actual endpoint
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const newApt = await res.json();
        allAppointments.unshift({
          ...newApt,
          pet_name: bookingData.pet.name,
          clinic_name: bookingData.clinic.name,
          address: bookingData.clinic.address
        });
        window.closeNewAppointmentModal();
        updateStats();
        renderAppointments();
        alert('Appointment booked successfully!');
      } else {
        // Fallback: add to local state
        allAppointments.unshift({
          appointment_id: Date.now(),
          pet_id: bookingData.pet.id,
          pet_name: bookingData.pet.name,
          clinic_id: bookingData.clinic.id,
          clinic_name: bookingData.clinic.name,
          address: bookingData.clinic.address,
          date: bookingData.date,
          time: bookingData.time,
          reason: bookingData.reason,
          notes: bookingData.notes,
          status: 'pending'
        });
        window.closeNewAppointmentModal();
        updateStats();
        renderAppointments();
      }
    } catch (err) {
      console.error('Error booking appointment:', err);
      // Fallback: add to local state
      allAppointments.unshift({
        appointment_id: Date.now(),
        pet_id: bookingData.pet.id,
        pet_name: bookingData.pet.name,
        clinic_id: bookingData.clinic.id,
        clinic_name: bookingData.clinic.name,
        address: bookingData.clinic.address,
        date: bookingData.date,
        time: bookingData.time,
        reason: bookingData.reason,
        notes: bookingData.notes,
        status: 'pending'
      });
      window.closeNewAppointmentModal();
      updateStats();
      renderAppointments();
    }
  }
}
