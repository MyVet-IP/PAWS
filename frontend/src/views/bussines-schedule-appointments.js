export function businessScheduleAppointmentsPage() {
  return `
    <div class="min-h-screen" style="background: linear-gradient(160deg, #fef9ff 0%, #f8f6ff 60%, #f0fdf4 100%); font-family: 'Poppins', sans-serif;">

      <!-- Header -->
      <header class="bg-white shadow-sm border-b" style="border-color: #f0e8ff;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <div style="display:inline-flex; align-items:center; gap:6px; background:#F1C0E8; color:#6A4C93; font-size:0.75rem; font-weight:600; padding:5px 14px; border-radius:999px; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px; font-family:'Poppins',sans-serif;">
                Business Portal
              </div>
              <h1 class="text-3xl font-bold" style="color: #333333; font-family: 'Poppins', sans-serif;">Appointment Management</h1>
              <p class="mt-1" style="color: #4A4A4A; font-family: 'Roboto', sans-serif; font-size: 0.95rem;">Manage your clinic's appointments and schedule</p>
            </div>
            <button onclick="window.location.hash='/#/veterinary'" class="font-medium hover:opacity-75 transition" style="color: #6A4C93; font-family: 'Poppins', sans-serif;">
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <!-- Stats Overview -->
        <section class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <div class="stat-card fade-up text-center" style="animation-delay: 0s;">
            <div style="font-size:1.3rem; margin-bottom:4px;">&#128197;</div>
            <div id="stat-today" style="font-size:1.4rem; font-weight:700; color:#333; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.75rem; color:#6b7280; font-family:'Roboto',sans-serif;">Today</div>
          </div>
          <div class="stat-card fade-up text-center" style="animation-delay: 0.05s;">
            <div style="font-size:1.3rem; margin-bottom:4px;">&#128336;</div>
            <div id="stat-pending" style="font-size:1.4rem; font-weight:700; color:#d97706; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.75rem; color:#6b7280; font-family:'Roboto',sans-serif;">Pending</div>
          </div>
          <div class="stat-card fade-up text-center" style="animation-delay: 0.1s;">
            <div style="font-size:1.3rem; margin-bottom:4px;">&#9989;</div>
            <div id="stat-confirmed" style="font-size:1.4rem; font-weight:700; color:#059669; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.75rem; color:#6b7280; font-family:'Roboto',sans-serif;">Confirmed</div>
          </div>
          <div class="stat-card fade-up text-center" style="animation-delay: 0.15s;">
            <div style="font-size:1.3rem; margin-bottom:4px;">&#128203;</div>
            <div id="stat-completed" style="font-size:1.4rem; font-weight:700; color:#2563eb; font-family:'Poppins',sans-serif;">0</div>
            <div style="font-size:0.75rem; color:#6b7280; font-family:'Roboto',sans-serif;">Completed</div>
          </div>
          <div class="stat-card fade-up text-center" style="animation-delay: 0.2s;">
            <div style="font-size:1.3rem; margin-bottom:4px;">&#128178;</div>
            <div id="stat-revenue" style="font-size:1.4rem; font-weight:700; color:#6A4C93; font-family:'Poppins',sans-serif;">$0</div>
            <div style="font-size:0.75rem; color:#6b7280; font-family:'Roboto',sans-serif;">Today's Revenue</div>
          </div>
        </section>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-3 gap-8">

          <!-- Calendar Panel -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div class="calendar-header">
                <h3 id="calendar-month" style="font-size:1rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif;">March 2026</h3>
                <div class="calendar-nav">
                  <button onclick="window.prevMonth()">
                    <svg width="16" height="16" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24">
                      <path d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button onclick="window.nextMonth()">
                    <svg width="16" height="16" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="calendar-grid">
                <div class="calendar-day-header">Sun</div>
                <div class="calendar-day-header">Mon</div>
                <div class="calendar-day-header">Tue</div>
                <div class="calendar-day-header">Wed</div>
                <div class="calendar-day-header">Thu</div>
                <div class="calendar-day-header">Fri</div>
                <div class="calendar-day-header">Sat</div>
              </div>
              <div id="calendar-days" class="calendar-grid">
                <!-- Days rendered dynamically -->
              </div>
            </div>

            <!-- Day Schedule -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <h3 id="day-schedule-title" style="font-size:1rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:16px;">Today's Schedule</h3>
              <div id="day-schedule" class="time-slot-list">
                <!-- Schedule loaded dynamically -->
              </div>
            </div>
          </div>

          <!-- Appointments List -->
          <div class="lg:col-span-2">
            <!-- Filters -->
            <div class="bg-white rounded-2xl p-4 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
              <div class="flex gap-2 flex-wrap">
                <button class="filter-chip active" data-filter="all">All</button>
                <button class="filter-chip" data-filter="pending">Pending</button>
                <button class="filter-chip" data-filter="confirmed">Confirmed</button>
                <button class="filter-chip" data-filter="in-progress">In Progress</button>
                <button class="filter-chip" data-filter="completed">Completed</button>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="text" id="search-input" placeholder="Search client or pet..." style="padding:8px 16px; border:1.5px solid #e5e7eb; border-radius:10px; font-family:'Roboto',sans-serif; font-size:0.85rem; width:200px; outline:none;">
              </div>
            </div>

            <!-- Appointments -->
            <div id="appointments-list" class="space-y-4">
              <div style="text-align:center; padding:60px 20px; background:white; border-radius:20px;">
                <div style="font-size:3rem; margin-bottom:16px;">&#128197;</div>
                <p style="color:#6b7280; font-family:'Roboto',sans-serif;">Loading appointments...</p>
              </div>
            </div>
          </div>

        </div>

      </main>

      <!-- Appointment Detail Modal -->
      <div id="modal-appointment-detail" class="modal-overlay">
        <div class="modal-content">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 id="modal-title" class="text-xl font-bold" style="color:#333; font-family:'Poppins',sans-serif;">Appointment Details</h2>
              <p id="modal-status" style="margin-top:8px;"></p>
            </div>
            <button onclick="window.closeAppointmentModal()" style="width:36px; height:36px; border-radius:50%; background:#f3f4f6; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              <svg width="18" height="18" fill="none" stroke="#6b7280" stroke-width="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div id="modal-body">
            <!-- Content loaded dynamically -->
          </div>

          <div id="modal-actions" class="flex gap-3 mt-6 flex-wrap">
            <!-- Actions loaded dynamically -->
          </div>
        </div>
      </div>

    </div>
  `;
}

export function businessScheduleAppointmentsEvents() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  let allAppointments = [];
  let currentFilter = 'all';
  let searchQuery = '';
  let selectedDate = new Date();
  let calendarMonth = new Date();

  // Initialize
  loadAppointments();
  renderCalendar();
  setupEventListeners();

  function setupEventListeners() {
    // Filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.dataset.filter;
        renderAppointments();
      });
    });

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderAppointments();
      });
    }

    // Close modal on backdrop
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    });
  }

  async function loadAppointments() {
    try {
      // Get the business_id of the logged-in user
      const businessRes = await fetch('/api/businesses', { credentials: 'include' });
      let businessId = null;

      if (businessRes.ok) {
        const businesses = await businessRes.json();
        const userId = user?.user_id || user?.id;
        const myBusiness = businesses.find(b => b.user_id === userId);
        businessId = myBusiness?.business_id;
      }

      if (!businessId) {
        // User has no registered business yet
        allAppointments = [];
        renderEmptyState('No business registered for your account yet.');
        updateStats();
        renderCalendar();
        return;
      }

      const res = await fetch(`/api/businesses/${businessId}/appointments`, { credentials: 'include' });
      if (res.ok) {
        allAppointments = await res.json();
      } else {
        allAppointments = [];
      }
    } catch (err) {
      console.error('Error loading appointments:', err);
      allAppointments = [];
    }

    updateStats();
    renderAppointments();
    renderDaySchedule();
    renderCalendar();
  }

  function renderEmptyState(message) {
    const container = document.getElementById('appointments-list');
    if (!container) return;
    container.innerHTML = `
      <div style="text-align:center; padding:60px 20px; background:white; border-radius:20px;">
        <div style="font-size:3.5rem; margin-bottom:16px;">🏥</div>
        <h3 style="font-size:1.1rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:8px;">
          ${message}
        </h3>
        <p style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.9rem;">
          Register your business to start managing appointments.
        </p>
      </div>
    `;
  }

  // ─── Stats ──────────────────────────────────────────────────

  function updateStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayAppts = allAppointments.filter(a => a.date === today);

    document.getElementById('stat-today').textContent = todayAppts.length;
    document.getElementById('stat-pending').textContent = allAppointments.filter(a => a.status === 'pending').length;
    document.getElementById('stat-confirmed').textContent = allAppointments.filter(a => a.status === 'confirmed').length;
    document.getElementById('stat-completed').textContent = allAppointments.filter(a => a.status === 'completed').length;

    // Mock revenue calculation
    const completedToday = todayAppts.filter(a => a.status === 'completed').length;
    document.getElementById('stat-revenue').textContent = `$${completedToday * 50}`;
  }

  // ─── Calendar ───────────────────────────────────────────────

  function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    document.getElementById('calendar-month').textContent =
      `${monthNames[calendarMonth.getMonth()]} ${calendarMonth.getFullYear()}`;

    const container = document.getElementById('calendar-days');
    if (!container) return;

    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const selectedStr = selectedDate.toISOString().split('T')[0];

    // Get appointment counts by date
    const appointmentsByDate = {};
    allAppointments.forEach(apt => {
      if (!appointmentsByDate[apt.date]) appointmentsByDate[apt.date] = [];
      appointmentsByDate[apt.date].push(apt);
    });

    let html = '';

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      html += `<div class="calendar-day other-month">${day}</div>`;
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateStr === todayStr;
      const isSelected = dateStr === selectedStr;
      const dayAppts = appointmentsByDate[dateStr] || [];

      let dotHtml = '';
      if (dayAppts.length > 0) {
        const pending = dayAppts.some(a => a.status === 'pending');
        const confirmed = dayAppts.some(a => a.status === 'confirmed');
        dotHtml = `
          <div class="dot-indicator">
            ${pending ? '<div class="dot" style="background:#FBF8CC;"></div>' : ''}
            ${confirmed ? '<div class="dot" style="background:#B9FBC0;"></div>' : ''}
          </div>
        `;
      }

      html += `
        <div class="calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" 
             onclick="window.selectCalendarDate('${dateStr}')">
          ${day}
          ${dotHtml}
        </div>
      `;
    }

    // Next month days
    const totalCells = firstDay + daysInMonth;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
      html += `<div class="calendar-day other-month">${day}</div>`;
    }

    container.innerHTML = html;
  }

  window.prevMonth = function () {
    calendarMonth.setMonth(calendarMonth.getMonth() - 1);
    renderCalendar();
  };

  window.nextMonth = function () {
    calendarMonth.setMonth(calendarMonth.getMonth() + 1);
    renderCalendar();
  };

  window.selectCalendarDate = function (dateStr) {
    selectedDate = new Date(dateStr + 'T00:00:00');
    renderCalendar();
    renderDaySchedule();
  };

  // ─── Day Schedule ───────────────────────────────────────────

  function renderDaySchedule() {
    const container = document.getElementById('day-schedule');
    const titleEl = document.getElementById('day-schedule-title');
    if (!container) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const isToday = dateStr === new Date().toISOString().split('T')[0];

    titleEl.textContent = isToday ? "Today's Schedule" :
      selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    const dayAppts = allAppointments
      .filter(a => a.date === dateStr)
      .sort((a, b) => {
        const timeA = convertTo24Hour(a.time);
        const timeB = convertTo24Hour(b.time);
        return timeA.localeCompare(timeB);
      });

    if (dayAppts.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:40px 20px;">
          <div style="font-size:2.5rem; margin-bottom:12px;">&#128467;</div>
          <p style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.9rem;">No appointments scheduled</p>
        </div>
      `;
      return;
    }

    // Group by time blocks
    const timeBlocks = {};
    dayAppts.forEach(apt => {
      const hour = apt.time.split(':')[0];
      const period = apt.time.includes('PM') && !apt.time.startsWith('12') ? 'Afternoon' : 'Morning';
      const block = parseInt(hour) < 12 || apt.time.includes('AM') ? 'Morning' : 'Afternoon';
      if (!timeBlocks[block]) timeBlocks[block] = [];
      timeBlocks[block].push(apt);
    });

    container.innerHTML = Object.entries(timeBlocks).map(([block, appts]) => `
      <div class="time-block">
        <div class="time-block-header">
          <span>${block === 'Morning' ? '&#9728;' : '&#127769;'}</span>
          ${block}
          <span style="font-weight:400; color:#6b7280; font-size:0.8rem;">(${appts.length} appointments)</span>
        </div>
        ${appts.map(apt => {
      const statusColors = {
        pending: '#FBF8CC',
        confirmed: '#B9FBC0',
        'in-progress': '#F1C0E8',
        completed: '#90BDF4',
        cancelled: '#FFCFD2'
      };
      return `
            <div class="mini-appointment" style="border-left-color:${statusColors[apt.status] || '#e5e7eb'};" onclick="window.viewAppointmentDetail(${apt.appointment_id})">
              <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:4px;">
                <span style="font-weight:600; color:#333; font-family:'Poppins',sans-serif; font-size:0.85rem;">${apt.time}</span>
                <span class="status-badge status-${apt.status}" style="font-size:0.65rem; padding:3px 8px;">${apt.status}</span>
              </div>
              <p style="font-size:0.82rem; color:#4A4A4A; font-family:'Roboto',sans-serif;">${apt.pet_name} - ${apt.reason}</p>
              <p style="font-size:0.75rem; color:#9ca3af; font-family:'Roboto',sans-serif;">${apt.owner_name || apt.client_name}</p>
            </div>
          `;
    }).join('')}
      </div>
    `).join('');
  }

  function convertTo24Hour(time) {
    const [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
    hours = parseInt(hours);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  // ─── Appointments List ──────────────────────────────────────

  function renderAppointments() {
    const container = document.getElementById('appointments-list');
    if (!container) return;

    let filtered = [...allAppointments];

    // Apply status filter
    if (currentFilter !== 'all') {
      filtered = filtered.filter(a => a.status === currentFilter);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(a => {
        const client = (a.owner_name || a.client_name || '').toLowerCase();
        const pet = (a.pet_name || '').toLowerCase();
        return client.includes(searchQuery) || pet.includes(searchQuery);
      });
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return convertTo24Hour(a.time).localeCompare(convertTo24Hour(b.time));
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:60px 20px; background:white; border-radius:20px;">
          <div style="font-size:4rem; margin-bottom:16px;">&#128269;</div>
          <h3 style="font-size:1.2rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:8px;">No Appointments Found</h3>
          <p style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.9rem;">
            ${currentFilter !== 'all' ? `No ${currentFilter} appointments.` : 'Try adjusting your search or filters.'}
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map((apt, index) => {
      const aptDate = new Date(apt.date + 'T00:00:00');
      const isToday = apt.date === new Date().toISOString().split('T')[0];
      const isPast = aptDate < new Date(new Date().toISOString().split('T')[0]);

      const statusClasses = {
        pending: 'status-pending',
        confirmed: 'status-confirmed',
        'in-progress': 'status-in-progress',
        completed: 'status-completed',
        cancelled: 'status-cancelled'
      };

      const petEmoji = apt.pet_species === 'Cat' ? '&#128049;' : '&#128054;';

      return `
        <div class="appointment-row fade-up" style="animation-delay:${index * 0.03}s;" onclick="window.viewAppointmentDetail(${apt.appointment_id})">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
              <!-- Pet Avatar -->
              <div style="width:56px; height:56px; border-radius:14px; background:${apt.pet_species === 'Cat' ? '#F1C0E8' : '#B9FBC0'}; display:flex; align-items:center; justify-content:center; font-size:1.5rem; flex-shrink:0;">
                ${petEmoji}
              </div>
              
              <!-- Info -->
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h4 style="font-weight:600; color:#333; font-family:'Poppins',sans-serif; font-size:0.95rem;">${apt.pet_name}</h4>
                  <span style="font-size:0.8rem; color:#6b7280; font-family:'Roboto',sans-serif;">(${apt.pet_breed || apt.pet_species})</span>
                </div>
                <p style="font-size:0.85rem; color:#4A4A4A; font-family:'Roboto',sans-serif; margin-bottom:4px;">
                  ${apt.reason} - ${apt.owner_name || apt.client_name}
                </p>
                <div class="flex items-center gap-3" style="font-size:0.8rem; color:#9ca3af; font-family:'Roboto',sans-serif;">
                  <span>&#128197; ${isToday ? 'Today' : aptDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span>&#128337; ${apt.time}</span>
                </div>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <span class="status-badge ${statusClasses[apt.status]}">${apt.status}</span>
              <svg width="20" height="20" fill="none" stroke="#9ca3af" stroke-width="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ─── Appointment Detail Modal ───────────────────────────────

  window.viewAppointmentDetail = function (id) {
    const apt = allAppointments.find(a => a.appointment_id === id);
    if (!apt) return;

    const modal = document.getElementById('modal-appointment-detail');
    const aptDate = new Date(apt.date + 'T00:00:00');

    document.getElementById('modal-title').textContent = `${apt.pet_name} - ${apt.reason}`;

    const statusClasses = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      'in-progress': 'status-in-progress',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    document.getElementById('modal-status').innerHTML = `<span class="status-badge ${statusClasses[apt.status]}">${apt.status}</span>`;

    document.getElementById('modal-body').innerHTML = `
      <!-- Client Info -->
      <div style="background:#f9fafb; border-radius:16px; padding:20px; margin-bottom:20px;">
        <h4 style="font-size:0.85rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:12px;">Client Information</h4>
        <div style="display:grid; gap:8px;">
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Name</span>
            <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem;">${apt.owner_name || apt.client_name}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Phone</span>
            <a href="tel:${apt.owner_phone || apt.client_phone}" style="color:#6A4C93; font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem; text-decoration:none;">${apt.owner_phone || apt.client_phone}</a>
          </div>
        </div>
      </div>

      <!-- Pet Info -->
      <div style="background:#f9fafb; border-radius:16px; padding:20px; margin-bottom:20px;">
        <h4 style="font-size:0.85rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:12px;">Pet Information</h4>
        <div style="display:grid; gap:8px;">
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Name</span>
            <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem;">${apt.pet_name}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Species</span>
            <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem;">${apt.pet_species}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Breed</span>
            <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem;">${apt.pet_breed || 'Not specified'}</span>
          </div>
        </div>
      </div>

      <!-- Appointment Info -->
      <div style="background:#f9fafb; border-radius:16px; padding:20px; margin-bottom:20px;">
        <h4 style="font-size:0.85rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:12px;">Appointment Details</h4>
        <div style="display:grid; gap:8px;">
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Date</span>
            <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem;">${aptDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Time</span>
            <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem;">${apt.time}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.85rem;">Reason</span>
            <span style="color:#333; font-family:'Poppins',sans-serif; font-weight:500; font-size:0.85rem;">${apt.reason}</span>
          </div>
        </div>
      </div>

      ${apt.notes ? `
        <div style="margin-bottom:16px;">
          <h4 style="font-size:0.85rem; font-weight:600; color:#333; font-family:'Poppins',sans-serif; margin-bottom:8px;">Notes</h4>
          <p style="font-size:0.875rem; color:#4A4A4A; font-family:'Roboto',sans-serif; line-height:1.6; background:#FBF8CC; padding:12px; border-radius:10px;">${apt.notes}</p>
        </div>
      ` : ''}
    `;

    // Render action buttons based on status
    const actionsDiv = document.getElementById('modal-actions');
    let actionsHtml = '';

    if (apt.status === 'pending') {
      actionsHtml = `
        <button class="action-btn action-btn-confirm" onclick="window.updateAppointmentStatus(${apt.appointment_id}, 'confirmed')">
          &#9989; Confirm
        </button>
        <button class="action-btn action-btn-cancel" onclick="window.updateAppointmentStatus(${apt.appointment_id}, 'cancelled')">
          &#10060; Decline
        </button>
      `;
    } else if (apt.status === 'confirmed') {
      actionsHtml = `
        <button class="action-btn action-btn-confirm" onclick="window.updateAppointmentStatus(${apt.appointment_id}, 'in-progress')" style="background:#F1C0E8; color:#6A4C93;">
          &#128260; Start Visit
        </button>
        <button class="action-btn action-btn-cancel" onclick="window.updateAppointmentStatus(${apt.appointment_id}, 'cancelled')">
          &#10060; Cancel
        </button>
      `;
    } else if (apt.status === 'in-progress') {
      actionsHtml = `
        <button class="action-btn action-btn-complete" onclick="window.updateAppointmentStatus(${apt.appointment_id}, 'completed')">
          &#9989; Complete Visit
        </button>
      `;
    }

    // Add WhatsApp button
    actionsHtml += `
      <a href="https://wa.me/${apt.owner_phone || apt.client_phone?.replace(/\D/g, '')}" target="_blank" style="text-decoration:none;">
        <button class="action-btn" style="background:#25D366; color:white;">
          &#128172; WhatsApp
        </button>
      </a>
    `;

    actionsDiv.innerHTML = actionsHtml;
    modal.classList.add('open');
  };

  window.updateAppointmentStatus = async function (id, newStatus) {
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        alert('Failed to update appointment status. Please try again.');
        return;
      }

      // Update local state to avoid a full reload
      const apt = allAppointments.find(a => a.appointment_id === id);
      if (apt) apt.status = newStatus;

      updateStats();
      renderAppointments();
      renderDaySchedule();
      renderCalendar();

      const statusClasses = {
        pending: 'status-pending',
        confirmed: 'status-confirmed',
        'in-progress': 'status-in-progress',
        completed: 'status-completed',
        cancelled: 'status-cancelled'
      };
      document.getElementById('modal-status').innerHTML =
        `<span class="status-badge ${statusClasses[newStatus]}">${newStatus}</span>`;

      window.viewAppointmentDetail(id);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Connection error. Please try again.');
    }
  };

  window.closeAppointmentModal = function () {
    document.getElementById('modal-appointment-detail').classList.remove('open');
  };
}