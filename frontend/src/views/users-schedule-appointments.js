// ─────────────────────────────────────────────
//  users-schedule-appointments.js
//  ✅ All emojis replaced with SVG icons
// ─────────────────────────────────────────────

// ── SVG icon helpers ──────────────────────────
const SVG = {
  calendar: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  check:    `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  clock:    `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  clipboard:`<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
  clockSm:  `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  pin:      `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  checkSm:  `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
  xmark:    `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
  hospital: `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`,
  paw:      `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19c-4 0-7-2.686-7-6 0-1.562.75-2.976 2-4a8 8 0 0110 0c1.25 1.024 2 2.438 2 4 0 3.314-3 6-7 6z"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="15.5" cy="7.5" r="1.5"/><circle cx="5.5" cy="11" r="1.5"/><circle cx="18.5" cy="11" r="1.5"/></svg>`,
  calendarEmpty: `<svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
  plus:     `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14"/></svg>`,
};

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
          <div class="stat-card fade-up" style="animation-delay:0s;">
            <div style="color:#6A4C93;margin-bottom:6px;">${SVG.calendar}</div>
            <div id="stat-upcoming" style="font-size:1.6rem;font-weight:700;color:#333;font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem;color:#6b7280;font-family:'Roboto',sans-serif;">Upcoming</div>
          </div>
          <div class="stat-card fade-up" style="animation-delay:0.05s;">
            <div style="color:#059669;margin-bottom:6px;">${SVG.check}</div>
            <div id="stat-confirmed" style="font-size:1.6rem;font-weight:700;color:#333;font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem;color:#6b7280;font-family:'Roboto',sans-serif;">Confirmed</div>
          </div>
          <div class="stat-card fade-up" style="animation-delay:0.1s;">
            <div style="color:#d97706;margin-bottom:6px;">${SVG.clock}</div>
            <div id="stat-pending" style="font-size:1.6rem;font-weight:700;color:#333;font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem;color:#6b7280;font-family:'Roboto',sans-serif;">Pending</div>
          </div>
          <div class="stat-card fade-up" style="animation-delay:0.15s;">
            <div style="color:#2563eb;margin-bottom:6px;">${SVG.clipboard}</div>
            <div id="stat-completed" style="font-size:1.6rem;font-weight:700;color:#333;font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.8rem;color:#6b7280;font-family:'Roboto',sans-serif;">Completed</div>
          </div>
        </section>

        <!-- Tabs & New Appointment Button -->
        <section class="bg-white rounded-2xl p-4 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex gap-2">
            <button class="tab-btn active" data-tab="upcoming">Upcoming</button>
            <button class="tab-btn" data-tab="past">Past</button>
            <button class="tab-btn" data-tab="all">All</button>
          </div>
          <button id="btn-new-appointment" style="background:#6A4C93;color:white;border:none;padding:12px 24px;border-radius:12px;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.9rem;cursor:pointer;display:flex;align-items:center;gap:8px;">
            ${SVG.plus}
            Book Appointment
          </button>
        </section>

        <!-- Appointments List -->
        <section>
          <div id="appointments-container" class="space-y-4">
            <div style="text-align:center;padding:60px 20px;">
              <div style="color:#9ca3af;margin-bottom:16px;display:flex;justify-content:center;">${SVG.calendarEmpty}</div>
              <p style="color:#6b7280;font-family:'Roboto',sans-serif;">Loading appointments...</p>
            </div>
          </div>
        </section>

      </main>

      <!-- New Appointment Modal -->
      <div id="modal-new-appointment" class="modal-overlay">
        <div class="modal-content">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-xl font-bold" style="color:#333;font-family:'Poppins',sans-serif;">Book New Appointment</h2>
              <p style="color:#6b7280;font-family:'Roboto',sans-serif;font-size:0.85rem;">Schedule a visit for your pet</p>
            </div>
            <button onclick="window.closeNewAppointmentModal()" style="width:36px;height:36px;border-radius:50%;background:#f3f4f6;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;">
              <svg width="18" height="18" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
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
            <div id="booking-step-1" class="booking-step">
              <h3 style="font-size:1rem;font-weight:600;color:#333;font-family:'Poppins',sans-serif;margin-bottom:16px;">Select Your Pet</h3>
              <div id="booking-pet-list" class="grid grid-cols-2 gap-3"></div>
            </div>

            <div id="booking-step-2" class="booking-step" style="display:none;">
              <h3 style="font-size:1rem;font-weight:600;color:#333;font-family:'Poppins',sans-serif;margin-bottom:16px;">Choose a Clinic</h3>
              <div id="booking-clinic-list" class="space-y-3" style="max-height:300px;overflow-y:auto;"></div>
            </div>

            <div id="booking-step-3" class="booking-step" style="display:none;">
              <h3 style="font-size:1rem;font-weight:600;color:#333;font-family:'Poppins',sans-serif;margin-bottom:16px;">Select Date & Time</h3>
              <div style="margin-bottom:20px;">
                <label style="display:block;margin-bottom:8px;font-family:'Poppins',sans-serif;font-size:0.82rem;font-weight:600;color:#4A4A4A;">Date</label>
                <input type="date" id="booking-date" style="width:100%;padding:12px 16px;border:1.5px solid #e5e7eb;border-radius:12px;font-family:'Roboto',sans-serif;font-size:0.9rem;color:#333;outline:none;">
              </div>
              <div>
                <label style="display:block;margin-bottom:8px;font-family:'Poppins',sans-serif;font-size:0.82rem;font-weight:600;color:#4A4A4A;">Available Time Slots</label>
                <div id="booking-time-slots" class="grid grid-cols-3 gap-2"></div>
              </div>
            </div>

            <div id="booking-step-4" class="booking-step" style="display:none;">
              <h3 style="font-size:1rem;font-weight:600;color:#333;font-family:'Poppins',sans-serif;margin-bottom:16px;">Confirm Appointment</h3>
              <div id="booking-summary" style="background:#f9fafb;border-radius:16px;padding:20px;margin-bottom:20px;"></div>
              <div style="margin-bottom:16px;">
                <label style="display:block;margin-bottom:8px;font-family:'Poppins',sans-serif;font-size:0.82rem;font-weight:600;color:#4A4A4A;">Reason for Visit</label>
                <select id="booking-reason" style="width:100%;padding:12px 16px;border:1.5px solid #e5e7eb;border-radius:12px;font-family:'Roboto',sans-serif;font-size:0.9rem;color:#333;outline:none;background:white;">
                  <option value="checkup">Regular Checkup</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="grooming">Grooming</option>
                  <option value="dental">Dental Care</option>
                  <option value="emergency">Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style="display:block;margin-bottom:8px;font-family:'Poppins',sans-serif;font-size:0.82rem;font-weight:600;color:#4A4A4A;">Additional Notes (Optional)</label>
                <textarea id="booking-notes" rows="3" placeholder="Any special requirements or information..." style="width:100%;padding:12px 16px;border:1.5px solid #e5e7eb;border-radius:12px;font-family:'Roboto',sans-serif;font-size:0.9rem;color:#333;outline:none;resize:vertical;"></textarea>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button id="btn-prev-step" onclick="window.prevBookingStep()" style="padding:12px 24px;border-radius:12px;border:1.5px solid #e5e7eb;background:white;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.9rem;color:#6b7280;cursor:pointer;display:none;">
              Previous
            </button>
            <button id="btn-next-step" onclick="window.nextBookingStep()" style="padding:12px 24px;border-radius:12px;border:none;background:#6A4C93;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.9rem;color:white;cursor:pointer;margin-left:auto;">
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
              <h2 id="detail-title" class="text-xl font-bold" style="color:#333;font-family:'Poppins',sans-serif;">Appointment Details</h2>
              <p id="detail-status" style="margin-top:8px;"></p>
            </div>
            <button onclick="window.closeDetailModal()" style="width:36px;height:36px;border-radius:50%;background:#f3f4f6;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;">
              <svg width="18" height="18" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div id="detail-body"></div>
          <div id="detail-actions" class="flex gap-3 mt-6"></div>
        </div>
      </div>

    </div>
  `;
}

export function userScheduleAppointmentsEvents() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const TIME_SLOT_OPTIONS = [
    { value: '08:00', label: '08:00 AM' },
    { value: '09:00', label: '09:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '01:00 PM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '15:00', label: '03:00 PM' },
    { value: '16:00', label: '04:00 PM' },
    { value: '17:00', label: '05:00 PM' },
    { value: '18:00', label: '06:00 PM' },
  ];

  let allAppointments = [];
  let allPets         = [];
  let allClinics      = [];
  let currentTab      = 'upcoming';
  let bookingStep     = 1;
  let bookingData     = { pet: null, clinic: null, date: null, time: null, reason: 'checkup', notes: '' };

  loadPets();
  loadClinics();
  loadAppointments();
  setupDatePicker();

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      renderAppointments();
    });
  });

  document.getElementById('btn-new-appointment')?.addEventListener('click', () => {
    resetBookingFlow();
    document.getElementById('modal-new-appointment').classList.add('open');
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  });

  // ── Load functions ────────────────────────
  async function loadPets() {
    if (!user) return;
    try {
      const userId = user.user_id || user.id;
      const res = await fetch(`/api/users/${userId}/dashboard`);
      if (res.ok) { const data = await res.json(); allPets = data.pets || []; renderBookingPets(); }
    } catch (err) { console.error('Error loading pets:', err); }
  }

  async function loadClinics() {
    try {
      const res = await fetch('/api/businesses?type=clinic');
      if (res.ok) { allClinics = await res.json(); renderBookingClinics(); }
    } catch (err) { console.error('Error loading clinics:', err); }
  }

  async function loadAppointments() {
    if (!user) { allAppointments = []; updateStats(); renderAppointments(); return; }
    try {
      const userId = user.user_id || user.id;
      const res = await fetch(`/api/users/${userId}/appointments`);
      allAppointments = res.ok ? await res.json() : [];
    } catch { allAppointments = []; }
    updateStats();
    renderAppointments();
  }

  function setupDatePicker() {
    const dateInput = document.getElementById('booking-date');
    if (!dateInput) return;
    const today   = new Date();
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = new Date(today.setMonth(today.getMonth() + 3)).toISOString().split('T')[0];
    dateInput.addEventListener('change', () => { bookingData.date = dateInput.value; renderTimeSlots(); });
  }

  function formatTimeLabel(time24h) {
    if (!time24h || typeof time24h !== 'string') return 'Not selected';
    const [h, m] = time24h.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return time24h;
    const suffix = h >= 12 ? 'PM' : 'AM';
    return `${String(h % 12 || 12).padStart(2,'0')}:${String(m).padStart(2,'0')} ${suffix}`;
  }

  function buildAppointmentDateTime(date, time) {
    if (!date || !time) return null;
    const [y, mo, d] = date.split('-').map(Number);
    const [h, mi]    = time.split(':').map(Number);
    if ([y,mo,d,h,mi].some(isNaN)) return null;
    const dt = new Date(y, mo - 1, d, h, mi);
    return dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d ? dt : null;
  }

  function validateFutureDateTime(date, time) {
    const dt = buildAppointmentDateTime(date, time);
    if (!dt) return 'Please select a valid date and time.';
    if (dt <= new Date()) return 'Please choose a future time for your appointment.';
    return null;
  }

  // ── Stats ─────────────────────────────────
  function updateStats() {
    const now = new Date();
    document.getElementById('stat-upcoming').textContent  = allAppointments.filter(a => new Date(a.date) >= now && a.status !== 'cancelled').length;
    document.getElementById('stat-confirmed').textContent = allAppointments.filter(a => a.status === 'confirmed').length;
    document.getElementById('stat-pending').textContent   = allAppointments.filter(a => a.status === 'pending').length;
    document.getElementById('stat-completed').textContent = allAppointments.filter(a => a.status === 'completed').length;
  }

  // ── Render appointments ───────────────────
  function renderAppointments() {
    const container = document.getElementById('appointments-container');
    if (!container) return;

    const now = new Date();
    let filtered = [...allAppointments];
    if (currentTab === 'upcoming') filtered = filtered.filter(a => new Date(a.date) >= now && a.status !== 'cancelled');
    else if (currentTab === 'past')  filtered = filtered.filter(a => new Date(a.date) < now || a.status === 'completed');

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:60px 20px;background:white;border-radius:20px;">
          <div style="color:#9ca3af;margin-bottom:16px;display:flex;justify-content:center;">${SVG.calendarEmpty}</div>
          <h3 style="font-size:1.2rem;font-weight:600;color:#333;font-family:'Poppins',sans-serif;margin-bottom:8px;">No Appointments</h3>
          <p style="color:#6b7280;font-family:'Roboto',sans-serif;font-size:0.9rem;max-width:320px;margin:0 auto 24px;">
            ${currentTab === 'upcoming' ? "You don't have any upcoming appointments. Book one now!" : "No past appointments to show."}
          </p>
          ${currentTab === 'upcoming' ? `
            <button onclick="document.getElementById('btn-new-appointment').click()" style="background:#6A4C93;color:white;border:none;padding:12px 24px;border-radius:12px;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.9rem;cursor:pointer;">
              Book Your First Appointment
            </button>` : ''}
        </div>`;
      return;
    }

    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Status config
    const STATUS = {
      pending:   { cls: 'status-pending',   icon: SVG.clock,   label: 'Pending'   },
      confirmed: { cls: 'status-confirmed', icon: SVG.check,   label: 'Confirmed' },
      completed: { cls: 'status-completed', icon: SVG.check,   label: 'Completed' },
      cancelled: { cls: 'status-cancelled', icon: SVG.xmark,   label: 'Cancelled' },
    };

    container.innerHTML = filtered.map((apt, i) => {
      const aptDate  = new Date(apt.date);
      const s        = STATUS[apt.status] || STATUS.pending;
      const petName  = apt.pet_name   || 'Pet';
      const clinicName = apt.clinic_name || 'Clinic';

      return `
        <div class="appointment-card fade-up" style="animation-delay:${i * 0.05}s;" onclick="window.viewAppointment(${apt.appointment_id || i})">
          <div style="display:flex;align-items:stretch;">
            <!-- Date column -->
            <div style="width:100px;background:linear-gradient(135deg,#6A4C93,#8b5cf6);color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 12px;">
              <span style="font-size:1.8rem;font-weight:700;font-family:'Poppins',sans-serif;">${aptDate.getDate()}</span>
              <span style="font-size:0.75rem;text-transform:uppercase;opacity:0.9;font-family:'Poppins',sans-serif;">${aptDate.toLocaleDateString('en-US',{month:'short'})}</span>
              <span style="font-size:0.7rem;opacity:0.75;margin-top:4px;font-family:'Roboto',sans-serif;">${aptDate.getFullYear()}</span>
            </div>
            <!-- Content -->
            <div style="flex:1;padding:20px;">
              <div class="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 style="font-size:1rem;font-weight:600;color:#333;font-family:'Poppins',sans-serif;margin-bottom:4px;">${petName}</h3>
                  <p style="font-size:0.85rem;color:#6b7280;font-family:'Roboto',sans-serif;">${apt.reason || 'Checkup'} at ${clinicName}</p>
                </div>
                <span class="status-badge ${s.cls}" style="display:flex;align-items:center;gap:4px;">
                  ${s.icon} ${s.label}
                </span>
              </div>
              <div class="flex items-center gap-4" style="font-size:0.82rem;color:#6b7280;font-family:'Roboto',sans-serif;">
                <span style="display:flex;align-items:center;gap:4px;">${SVG.clockSm} ${apt.time || '10:00 AM'}</span>
                <span style="display:flex;align-items:center;gap:4px;">${SVG.pin} ${apt.address || 'Address not specified'}</span>
              </div>
            </div>
            <!-- Arrow -->
            <div style="display:flex;align-items:center;padding-right:20px;">
              <svg width="20" height="20" fill="none" stroke="#9ca3af" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  // ── Booking flow ──────────────────────────
  function resetBookingFlow() {
    bookingStep = 1;
    bookingData = { pet: null, clinic: null, date: null, time: null, reason: 'checkup', notes: '' };
    updateStepIndicators();
    showBookingStep(1);
    document.getElementById('btn-prev-step').style.display = 'none';
    document.getElementById('btn-next-step').textContent   = 'Next';
  }

  function renderBookingPets() {
    const container = document.getElementById('booking-pet-list');
    if (!container) return;
    if (allPets.length === 0) {
      container.innerHTML = `
        <div class="col-span-2 text-center py-8">
          <p style="color:#6b7280;font-family:'Roboto',sans-serif;font-size:0.9rem;">No pets found. Please add a pet first.</p>
          <button onclick="window.location.hash='/user-dashboard'" style="margin-top:12px;background:#6A4C93;color:white;border:none;padding:10px 20px;border-radius:10px;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.85rem;cursor:pointer;">Add Pet</button>
        </div>`;
      return;
    }
    container.innerHTML = allPets.map(pet => {
      const isSelected = bookingData.pet?.id === pet.pet_id;
      const isCat      = (pet.species_name || '').toLowerCase().includes('cat');
      const bg         = isCat ? '#F1C0E8' : '#B9FBC0';
      return `
        <div class="clinic-card ${isSelected ? 'selected' : ''}" onclick="window.selectBookingPet(${pet.pet_id}, '${pet.name}')">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:48px;height:48px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;color:#6A4C93;">
              ${SVG.paw}
            </div>
            <div>
              <p style="font-weight:600;color:#333;font-family:'Poppins',sans-serif;font-size:0.9rem;">${pet.name}</p>
              <p style="font-size:0.8rem;color:#6b7280;font-family:'Roboto',sans-serif;">${pet.species_name || 'Pet'}</p>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  function renderBookingClinics() {
    const container = document.getElementById('booking-clinic-list');
    if (!container) return;
    if (allClinics.length === 0) {
      container.innerHTML = `<div class="text-center py-8"><p style="color:#6b7280;font-family:'Roboto',sans-serif;font-size:0.9rem;">No clinics available.</p></div>`;
      return;
    }
    container.innerHTML = allClinics.map(clinic => {
      const isSelected = bookingData.clinic?.id === clinic.business_id;
      return `
        <div class="clinic-card ${isSelected ? 'selected' : ''}" onclick="window.selectBookingClinic(${clinic.business_id}, '${clinic.name}', '${clinic.address || clinic.zone || ''}')">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:48px;height:48px;border-radius:12px;background:#90BDF4;display:flex;align-items:center;justify-content:center;color:#1d4ed8;">
              ${SVG.hospital}
            </div>
            <div style="flex:1;">
              <p style="font-weight:600;color:#333;font-family:'Poppins',sans-serif;font-size:0.9rem;">${clinic.name}</p>
              <p style="font-size:0.8rem;color:#6b7280;font-family:'Roboto',sans-serif;">${clinic.address || clinic.zone || 'Address not available'}</p>
            </div>
            ${clinic.rating ? `
              <div style="display:flex;align-items:center;gap:4px;">
                <svg width="14" height="14" fill="#f59e0b" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span style="font-size:0.85rem;font-weight:600;color:#333;">${clinic.rating}</span>
              </div>` : ''}
          </div>
        </div>`;
    }).join('');
  }

  function renderTimeSlots() {
    const container = document.getElementById('booking-time-slots');
    if (!container) return;
    const unavailable = ['12:00', '13:00'];
    container.innerHTML = TIME_SLOT_OPTIONS.map(slot => {
      const isUnavail  = unavailable.includes(slot.value);
      const isSelected = bookingData.time === slot.value;
      return `
        <button class="time-slot ${isSelected ? 'selected' : ''} ${isUnavail ? 'unavailable' : ''}"
                onclick="${isUnavail ? '' : `window.selectBookingTime('${slot.value}')`}"
                ${isUnavail ? 'disabled' : ''}>
          ${slot.label}
        </button>`;
    }).join('');
  }

  function renderBookingSummary() {
    const container = document.getElementById('booking-summary');
    if (!container) return;
    const dateStr = bookingData.date
      ? new Date(bookingData.date).toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' })
      : 'Not selected';
    const rows = [
      { label: 'Pet',   value: bookingData.pet?.name    || 'Not selected' },
      { label: 'Clinic',value: bookingData.clinic?.name || 'Not selected' },
      { label: 'Date',  value: dateStr },
      { label: 'Time',  value: formatTimeLabel(bookingData.time) },
    ];
    container.innerHTML = `
      <div style="display:grid;gap:12px;">
        ${rows.map((r, i) => `
          <div style="display:flex;justify-content:space-between;padding-bottom:12px;${i < rows.length - 1 ? 'border-bottom:1px solid #e5e7eb;' : ''}">
            <span style="color:#6b7280;font-family:'Roboto',sans-serif;font-size:0.85rem;">${r.label}</span>
            <span style="color:#333;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.85rem;">${r.value}</span>
          </div>`).join('')}
      </div>`;
  }

  function showBookingStep(step) {
    document.querySelectorAll('.booking-step').forEach(s => s.style.display = 'none');
    document.getElementById(`booking-step-${step}`).style.display = 'block';
    document.getElementById('btn-prev-step').style.display = step > 1 ? 'block' : 'none';
    document.getElementById('btn-next-step').textContent   = step === 4 ? 'Confirm Booking' : 'Next';
    if (step === 3) renderTimeSlots();
    if (step === 4) renderBookingSummary();
  }

  function updateStepIndicators() {
    for (let i = 1; i <= 4; i++) {
      const dot  = document.getElementById(`step-${i}`);
      const line = document.getElementById(`line-${i-1}-${i}`);
      if (i < bookingStep) {
        dot.className = 'step-dot completed';
        dot.innerHTML = SVG.checkSm;
        if (line) line.className = 'step-line active';
      } else if (i === bookingStep) {
        dot.className   = 'step-dot active';
        dot.textContent = i;
        if (line) line.className = 'step-line active';
      } else {
        dot.className   = 'step-dot pending';
        dot.textContent = i;
        if (line) line.className = 'step-line';
      }
    }
  }

  // ── Global functions ──────────────────────
  window.selectBookingPet    = (id, name)              => { bookingData.pet    = { id, name };    renderBookingPets();    };
  window.selectBookingClinic = (id, name, address)     => { bookingData.clinic = { id, name, address }; renderBookingClinics(); };
  window.selectBookingTime   = (time)                  => { bookingData.time   = time;             renderTimeSlots();      };

  window.nextBookingStep = async () => {
    if (bookingStep === 1 && !bookingData.pet)                              { alert('Please select a pet.');              return; }
    if (bookingStep === 2 && !bookingData.clinic)                           { alert('Please select a clinic.');           return; }
    if (bookingStep === 3 && (!bookingData.date || !bookingData.time))      { alert('Please select a date and time.');    return; }
    if (bookingStep === 3) { const err = validateFutureDateTime(bookingData.date, bookingData.time); if (err) { alert(err); return; } }
    if (bookingStep === 4) { await submitBooking(); return; }
    bookingStep++;
    updateStepIndicators();
    showBookingStep(bookingStep);
  };

  window.prevBookingStep = () => {
    if (bookingStep > 1) { bookingStep--; updateStepIndicators(); showBookingStep(bookingStep); }
  };

  window.closeNewAppointmentModal = () => document.getElementById('modal-new-appointment').classList.remove('open');
  window.closeDetailModal         = () => document.getElementById('modal-appointment-detail').classList.remove('open');

  window.viewAppointment = (id) => {
    const apt = allAppointments.find(a => (a.appointment_id || allAppointments.indexOf(a)) === id);
    if (!apt) return;

    document.getElementById('detail-title').textContent = `${apt.pet_name || 'Pet'} - ${apt.reason || 'Appointment'}`;

    const STATUS = {
      pending:   { cls: 'status-pending',   label: 'Pending'   },
      confirmed: { cls: 'status-confirmed', label: 'Confirmed' },
      completed: { cls: 'status-completed', label: 'Completed' },
      cancelled: { cls: 'status-cancelled', label: 'Cancelled' },
    };
    const s = STATUS[apt.status] || STATUS.pending;
    document.getElementById('detail-status').innerHTML = `<span class="status-badge ${s.cls}">${s.label}</span>`;

    const aptDate = new Date(apt.date);
    const rows = [
      { label: 'Date',    value: aptDate.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' }) },
      { label: 'Time',    value: apt.time || '10:00 AM' },
      { label: 'Clinic',  value: apt.clinic_name || 'Clinic' },
      ...(apt.address ? [{ label: 'Address', value: apt.address }] : []),
    ];

    document.getElementById('detail-body').innerHTML = `
      <div style="background:#f9fafb;border-radius:16px;padding:20px;margin-bottom:20px;">
        <div style="display:grid;gap:12px;">
          ${rows.map(r => `
            <div style="display:flex;justify-content:space-between;">
              <span style="color:#6b7280;font-family:'Roboto',sans-serif;font-size:0.85rem;">${r.label}</span>
              <span style="color:#333;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.85rem;">${r.value}</span>
            </div>`).join('')}
        </div>
      </div>
      ${apt.notes ? `
        <div style="margin-bottom:16px;">
          <h4 style="font-size:0.85rem;font-weight:600;color:#333;font-family:'Poppins',sans-serif;margin-bottom:8px;">Notes</h4>
          <p style="font-size:0.875rem;color:#4A4A4A;font-family:'Roboto',sans-serif;line-height:1.6;background:#f9fafb;padding:12px;border-radius:10px;">${apt.notes}</p>
        </div>` : ''}`;

    const actionsDiv = document.getElementById('detail-actions');
    if (apt.status === 'pending' || apt.status === 'confirmed') {
      actionsDiv.innerHTML = `
        <button onclick="window.cancelAppointment(${apt.appointment_id})" style="flex:1;padding:12px;border-radius:12px;border:1.5px solid #FFCFD2;background:white;color:#dc2626;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.9rem;cursor:pointer;">Cancel Appointment</button>
        <button onclick="window.rescheduleAppointment(${apt.appointment_id})" style="flex:1;padding:12px;border-radius:12px;border:none;background:#6A4C93;color:white;font-family:'Poppins',sans-serif;font-weight:600;font-size:0.9rem;cursor:pointer;">Reschedule</button>`;
    } else {
      actionsDiv.innerHTML = '';
    }

    document.getElementById('modal-appointment-detail').classList.add('open');
  };

  window.cancelAppointment = async (id) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      if (!res.ok) throw new Error('Failed to cancel');
      const apt = allAppointments.find(a => a.appointment_id === id);
      if (apt) apt.status = 'cancelled';
      renderAppointments();
      updateStats();
      window.closeDetailModal();
    } catch { alert('Could not cancel the appointment. Please try again.'); }
  };

  window.rescheduleAppointment = () => {
    window.closeDetailModal();
    document.getElementById('btn-new-appointment').click();
  };

  async function submitBooking() {
    bookingData.reason = document.getElementById('booking-reason').value;
    bookingData.notes  = document.getElementById('booking-notes').value;
    const err = validateFutureDateTime(bookingData.date, bookingData.time);
    if (err) { alert(err); return; }

    const userId = user.user_id || user.id;
    const body = {
      pet_id:      bookingData.pet.id,
      user_id:     userId,
      business_id: bookingData.clinic.id,
      date:        bookingData.date,
      time:        bookingData.time,
      notes:       bookingData.notes || bookingData.reason || null,
      status:      'pending',
    };

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const newApt = await res.json();
        allAppointments.unshift({ ...newApt, pet_name: bookingData.pet.name, clinic_name: bookingData.clinic.name, address: bookingData.clinic.address });
        window.closeNewAppointmentModal();
        updateStats();
        renderAppointments();
        alert('Appointment booked successfully!');
      } else {
        const errPayload = await res.json().catch(() => ({}));
        alert(errPayload.error || 'Could not book the appointment. Please verify date and time.');
      }
    } catch { alert('Could not book the appointment right now. Please try again.'); }
  }
}