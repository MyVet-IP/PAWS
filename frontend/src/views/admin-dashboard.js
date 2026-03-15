export function adminDashboardPage() {
    return `
  <div class="admin-dashboard">
    <!-- Admin Header -->
    <div class="admin-header">
      <div class="admin-header-content">
        <div class="admin-header-info">
          <h1>Admin Dashboard</h1>
          <p>Manage users, pets, businesses and system settings</p>
        </div>
        <div class="admin-header-actions">
          <div class="admin-search">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" id="global-search" placeholder="Search users, pets, businesses...">
          </div>
          <button id="btn-admin-logout" class="admin-btn-header secondary" title="Logout">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-header">
          <div class="admin-stat-icon users">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
          </div>
          <span class="admin-stat-badge positive">+12%</span>
        </div>
        <p class="admin-stat-value" id="stat-users">0</p>
        <p class="admin-stat-label">Total Users</p>
      </div>

      <div class="admin-stat-card">
        <div class="admin-stat-header">
          <div class="admin-stat-icon pets">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <span class="admin-stat-badge positive">+8%</span>
        </div>
        <p class="admin-stat-value" id="stat-pets">0</p>
        <p class="admin-stat-label">Total Pets</p>
      </div>

      <div class="admin-stat-card">
        <div class="admin-stat-header">
          <div class="admin-stat-icon clinics">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <span class="admin-stat-badge positive">+5%</span>
        </div>
        <p class="admin-stat-value" id="stat-businesses">0</p>
        <p class="admin-stat-label">Businesses</p>
      </div>

      <div class="admin-stat-card">
        <div class="admin-stat-header">
          <div class="admin-stat-icon appointments">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="admin-stat-badge positive">0%</span>
        </div>
        <p class="admin-stat-value" id="stat-appointments">0</p>
        <p class="admin-stat-label">Appointments</p>
      </div>

      <div class="admin-stat-card">
        <div class="admin-stat-header">
          <div class="admin-stat-icon emergencies">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <span class="admin-stat-badge negative">-3%</span>
        </div>
        <p class="admin-stat-value" id="stat-emergencies">0</p>
        <p class="admin-stat-label">Emergencies</p>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="admin-main-grid">
      <!-- Left Column: Tabs Panel -->
      <div class="admin-panel">
        <div class="admin-panel-header">
          <div class="admin-tabs" id="admin-tabs">
            <button class="admin-tab active" data-tab="users">Users</button>
            <button class="admin-tab" data-tab="pets">Pets</button>
            <button class="admin-tab" data-tab="businesses">Businesses</button>
            <button class="admin-tab" data-tab="appointments">Appointments</button>
          </div>
          <div class="admin-panel-actions" id="tab-panel-actions">
            <!-- Dynamic actions injected per tab -->
          </div>
        </div>

        <!-- Tab Content: Users -->
        <div class="tab-content active admin-panel-body no-padding" id="tab-users">
          <div class="admin-panel-header" style="border-top: 1px solid var(--bg-muted);">
            <h3 class="admin-panel-title">User Management</h3>
            <button class="admin-btn primary" id="btn-add-user">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Add User
            </button>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Pets</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="users-table-body">
              <tr><td colspan="6"><div class="admin-loading"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>Loading users...</div></td></tr>
            </tbody>
          </table>
        </div>

        <!-- Tab Content: Pets -->
        <div class="tab-content admin-panel-body no-padding" id="tab-pets">
          <div class="admin-panel-header" style="border-top: 1px solid var(--bg-muted);">
            <h3 class="admin-panel-title">Pet Management</h3>
            <select id="filter-species" class="admin-form-select" style="width:auto;">
              <option value="">All Species</option>
              <option value="Dog">Dogs</option>
              <option value="Cat">Cats</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>Pet</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="pets-table-body">
              <tr><td colspan="6"><div class="admin-loading"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>Loading pets...</div></td></tr>
            </tbody>
          </table>
        </div>

        <!-- Tab Content: Businesses -->
        <div class="tab-content admin-panel-body no-padding" id="tab-businesses">
          <div class="admin-panel-header" style="border-top: 1px solid var(--bg-muted);">
            <h3 class="admin-panel-title">Business Management</h3>
            <div class="admin-panel-actions">
              <select id="filter-business-type" class="admin-form-select" style="width:auto;">
                <option value="">All Types</option>
                <option value="clinic">Veterinary Clinics</option>
                <option value="petshop">Pet Shops</option>
                <option value="grooming">Grooming</option>
              </select>
              <button class="admin-btn primary" id="btn-add-business">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Add Business
              </button>
            </div>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>Business</th>
                <th>Type</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="businesses-table-body">
              <tr><td colspan="6"><div class="admin-loading"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>Loading businesses...</div></td></tr>
            </tbody>
          </table>
        </div>

        <!-- Tab Content: Appointments -->
        <div class="tab-content admin-panel-body no-padding" id="tab-appointments">
          <div class="admin-panel-header" style="border-top: 1px solid var(--bg-muted);">
            <h3 class="admin-panel-title">Appointments</h3>
            <select id="filter-appointment-status" class="admin-form-select" style="width:auto;">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Pet</th>
                <th>Owner</th>
                <th>Business</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="appointments-table-body">
              <tr><td colspan="7"><div class="admin-loading"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>Loading appointments...</div></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Column - Sidebar -->
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">

        <!-- Quick Actions -->
        <div class="admin-panel">
          <div class="admin-panel-header">
            <h3 class="admin-panel-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Quick Actions
            </h3>
          </div>
          <div class="admin-panel-body">
            <div class="admin-quick-actions">
              <button class="admin-quick-btn" id="qa-export-users">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span>Export Users</span>
              </button>
              <button class="admin-quick-btn" id="qa-send-notification">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
                <span>Send Notification</span>
              </button>
              <button class="admin-quick-btn" id="qa-view-reports">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span>View Reports</span>
              </button>
              <button class="admin-quick-btn" id="qa-system-settings">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="admin-panel">
          <div class="admin-panel-header">
            <h3 class="admin-panel-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Recent Activity
            </h3>
          </div>
          <div class="admin-panel-body no-padding">
            <div class="admin-activity-list" id="activity-list">
              <div class="admin-activity-item">
                <div class="admin-activity-icon new-user">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  </svg>
                </div>
                <div class="admin-activity-content">
                  <p>New user registered</p>
                  <span class="admin-activity-time">2 minutes ago</span>
                </div>
              </div>
              <div class="admin-activity-item">
                <div class="admin-activity-icon new-pet">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <div class="admin-activity-content">
                  <p>New pet added: <strong>Max</strong></p>
                  <span class="admin-activity-time">15 minutes ago</span>
                </div>
              </div>
              <div class="admin-activity-item">
                <div class="admin-activity-icon appointment">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="admin-activity-content">
                  <p>Appointment scheduled</p>
                  <span class="admin-activity-time">1 hour ago</span>
                </div>
              </div>
              <div class="admin-activity-item">
                <div class="admin-activity-icon business">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <div class="admin-activity-content">
                  <p>New clinic registered</p>
                  <span class="admin-activity-time">3 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pet Statistics -->
        <div class="admin-panel">
          <div class="admin-panel-header">
            <h3 class="admin-panel-title">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Pet Statistics
            </h3>
          </div>
          <div class="admin-panel-body">
            <div class="admin-mini-stats">
              <div class="admin-mini-stat">
                <div class="admin-mini-stat-info">
                  <div class="admin-mini-stat-icon" style="background-color: rgba(185,251,192,0.4);">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  </div>
                  <span class="admin-mini-stat-label">🐶 Dogs</span>
                </div>
                <span class="admin-mini-stat-value" id="dogs-count">0</span>
              </div>
              <div class="admin-mini-stat">
                <div class="admin-mini-stat-info">
                  <div class="admin-mini-stat-icon" style="background-color: rgba(144,189,244,0.4);">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  </div>
                  <span class="admin-mini-stat-label">🐱 Cats</span>
                </div>
                <span class="admin-mini-stat-value" id="cats-count">0</span>
              </div>
              <div class="admin-mini-stat">
                <div class="admin-mini-stat-info">
                  <div class="admin-mini-stat-icon" style="background-color: rgba(251,248,204,0.6);">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  </div>
                  <span class="admin-mini-stat-label">🐾 Other</span>
                </div>
                <span class="admin-mini-stat-value" id="other-count">0</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- User Modal -->
    <div id="modal-user" class="admin-modal-overlay">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h2 class="admin-modal-title" id="modal-user-title">Add User</h2>
          <button class="admin-modal-close" id="close-user-modal">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="admin-modal-body">
          <form id="user-form">
            <input type="hidden" id="user-id">
            <div class="admin-form-group">
              <label class="admin-form-label" for="user-nombre">Name</label>
              <input type="text" id="user-nombre" class="admin-form-input" required placeholder="Full name">
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label" for="user-email">Email</label>
              <input type="email" id="user-email" class="admin-form-input" required placeholder="email@example.com">
            </div>
            <div class="admin-form-row">
              <div class="admin-form-group">
                <label class="admin-form-label" for="user-telefono">Phone</label>
                <input type="tel" id="user-telefono" class="admin-form-input" placeholder="+57 300 123 4567">
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label" for="user-direccion">Address</label>
                <input type="text" id="user-direccion" class="admin-form-input" placeholder="Street address">
              </div>
            </div>
          </form>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="admin-btn secondary flex-1" id="cancel-user-modal">Cancel</button>
          <button type="submit" form="user-form" class="admin-btn primary flex-1">Save User</button>
        </div>
      </div>
    </div>

    <!-- Business Modal -->
    <div id="modal-business" class="admin-modal-overlay">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h2 class="admin-modal-title" id="modal-business-title">Add Business</h2>
          <button class="admin-modal-close" id="close-business-modal">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="admin-modal-body">
          <form id="business-form">
            <input type="hidden" id="business-id">
            <div class="admin-form-group">
              <label class="admin-form-label" for="business-nombre">Business Name</label>
              <input type="text" id="business-nombre" class="admin-form-input" required placeholder="Business name">
            </div>
            <div class="admin-form-row">
              <div class="admin-form-group">
                <label class="admin-form-label" for="business-tipo">Type</label>
                <select id="business-tipo" class="admin-form-select" required>
                  <option value="">Select type</option>
                  <option value="clinic">Veterinary Clinic</option>
                  <option value="petshop">Pet Shop</option>
                  <option value="grooming">Grooming</option>
                </select>
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label" for="business-telefono">Phone</label>
                <input type="tel" id="business-telefono" class="admin-form-input" placeholder="+57 300 123 4567">
              </div>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label" for="business-direccion">Address</label>
              <input type="text" id="business-direccion" class="admin-form-input" required placeholder="Street address">
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label" for="business-horario">Hours</label>
              <input type="text" id="business-horario" class="admin-form-input" placeholder="Mon-Fri 8am-6pm">
            </div>
          </form>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="admin-btn secondary flex-1" id="cancel-business-modal">Cancel</button>
          <button type="submit" form="business-form" class="admin-btn primary flex-1">Save Business</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div id="modal-delete" class="admin-modal-overlay">
      <div class="admin-modal" style="max-width: 24rem;">
        <div class="admin-modal-header">
          <h2 class="admin-modal-title">Confirm Delete</h2>
          <button class="admin-modal-close" id="close-delete-modal">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="admin-modal-body">
          <p id="delete-message" style="font-size: 0.875rem; color: var(--text-soft);">Are you sure you want to delete this item? This action cannot be undone.</p>
        </div>
        <div class="admin-modal-footer">
          <button type="button" class="admin-btn secondary flex-1" id="cancel-delete">Cancel</button>
          <button type="button" class="admin-btn danger flex-1" id="confirm-delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
  `;
}

// Store for delete action callback
let deleteCallback = null;

export function adminDashboardEvents() {

    // Initialize tabs
    initTabs();

    // Initialize modals
    initModals();

    // Load initial data
    loadStats();
    loadUsers();
    loadPets();
    loadBusinesses();
    loadAppointments();

    // Logout
    const logoutBtn = document.getElementById('btn-admin-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.hash = '#/';
        });
    }

    // Global search
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.toLowerCase();
            filterCurrentTab(query);
        }, 300));
    }

    // Quick actions
    document.getElementById('qa-export-users')?.addEventListener('click', exportUsers);
    document.getElementById('qa-send-notification')?.addEventListener('click', () => alert('Notification feature coming soon'));
    document.getElementById('qa-view-reports')?.addEventListener('click', () => alert('Reports feature coming soon'));
    document.getElementById('qa-system-settings')?.addEventListener('click', () => alert('Settings feature coming soon'));
}

function initTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            const tabId = tab.dataset.tab;
            document.getElementById(`tab-${tabId}`)?.classList.add('active');
        });
    });

    // Filter listeners
    document.getElementById('filter-species')?.addEventListener('change', (e) => {
        loadPets(e.target.value);
    });

    document.getElementById('filter-business-type')?.addEventListener('change', (e) => {
        loadBusinesses(e.target.value);
    });

    document.getElementById('filter-appointment-status')?.addEventListener('change', (e) => {
        loadAppointments(e.target.value);
    });
}

function initModals() {
    // User modal
    const userModal = document.getElementById('modal-user');
    const addUserBtn = document.getElementById('btn-add-user');
    const userForm = document.getElementById('user-form');

    addUserBtn?.addEventListener('click', () => {
        document.getElementById('modal-user-title').textContent = 'Add User';
        userForm?.reset();
        document.getElementById('user-id').value = '';
        userModal?.classList.add('open');
    });

    document.getElementById('close-user-modal')?.addEventListener('click', () => userModal?.classList.remove('open'));
    document.getElementById('cancel-user-modal')?.addEventListener('click', () => userModal?.classList.remove('open'));
    userModal?.addEventListener('click', (e) => { if (e.target === userModal) userModal.classList.remove('open'); });

    userForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveUser();
        userModal?.classList.remove('open');
    });

    // Business modal
    const businessModal = document.getElementById('modal-business');
    const addBusinessBtn = document.getElementById('btn-add-business');
    const businessForm = document.getElementById('business-form');

    addBusinessBtn?.addEventListener('click', () => {
        document.getElementById('modal-business-title').textContent = 'Add Business';
        businessForm?.reset();
        document.getElementById('business-id').value = '';
        businessModal?.classList.add('open');
    });

    document.getElementById('close-business-modal')?.addEventListener('click', () => businessModal?.classList.remove('open'));
    document.getElementById('cancel-business-modal')?.addEventListener('click', () => businessModal?.classList.remove('open'));
    businessModal?.addEventListener('click', (e) => { if (e.target === businessModal) businessModal.classList.remove('open'); });

    businessForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveBusiness();
        businessModal?.classList.remove('open');
    });

    // Delete modal
    const deleteModal = document.getElementById('modal-delete');

    document.getElementById('close-delete-modal')?.addEventListener('click', () => deleteModal?.classList.remove('open'));
    document.getElementById('cancel-delete')?.addEventListener('click', () => deleteModal?.classList.remove('open'));
    deleteModal?.addEventListener('click', (e) => { if (e.target === deleteModal) deleteModal.classList.remove('open'); });

    document.getElementById('confirm-delete')?.addEventListener('click', async () => {
        if (deleteCallback) {
            await deleteCallback();
            deleteCallback = null;
        }
        deleteModal?.classList.remove('open');
    });
}

// Load stats
async function loadStats() {
    try {
        const [usersRes, petsRes, businessesRes, appointmentsRes] = await Promise.all([
            fetch('/api/clientes'),
            fetch('/api/mascotas'),
            fetch('/api/establecimientos'),
            fetch('/api/citas')
        ]);

        const users = await usersRes.json();
        const pets = await petsRes.json();
        const businesses = await businessesRes.json();
        const appointments = await appointmentsRes.json();

        document.getElementById('stat-users').textContent = users.length || 0;
        document.getElementById('stat-pets').textContent = pets.length || 0;
        document.getElementById('stat-businesses').textContent = businesses.length || 0;
        document.getElementById('stat-appointments').textContent = appointments.length || 0;

        // Pet statistics
        const dogs = pets.filter(p => p.especie === 'Dog' || p.especie === 'Perro').length;
        const cats = pets.filter(p => p.especie === 'Cat' || p.especie === 'Gato').length;
        const other = pets.length - dogs - cats;

        document.getElementById('dogs-count').textContent = dogs;
        document.getElementById('cats-count').textContent = cats;
        document.getElementById('other-count').textContent = other;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load users
async function loadUsers() {
    const tbody = document.getElementById('users-table-body');
    if (!tbody) return;

    try {
        const res = await fetch('/api/clientes');
        const users = await res.json();

        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6"><div class="admin-empty-state"><p>No users found</p></div></td></tr>';
            return;
        }

        const avatarColors = ['green', 'blue', 'pink', 'purple', 'yellow'];

        tbody.innerHTML = users.map((user, i) => `
      <tr>
        <td>
          <div class="admin-user-cell">
            <div class="admin-avatar ${avatarColors[i % avatarColors.length]}">${(user.nombre || 'U')[0].toUpperCase()}</div>
            <div class="admin-user-info">
              <h4>${user.nombre || 'Unknown'}</h4>
            </div>
          </div>
        </td>
        <td>${user.email || '-'}</td>
        <td>${user.telefono || '-'}</td>
        <td><span class="admin-status verified">${user.pet_count || 0} pets</span></td>
        <td>${formatDate(user.created_at)}</td>
        <td>
          <div class="admin-actions">
            <button class="admin-action-btn edit" onclick="editUser(${user.id_cliente})" title="Edit">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button class="admin-action-btn delete" onclick="confirmDeleteUser(${user.id_cliente})" title="Delete">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
    } catch (error) {
        console.error('Error loading users:', error);
        tbody.innerHTML = '<tr><td colspan="6"><div class="admin-empty-state"><p>Error loading users</p></div></td></tr>';
    }
}

// Load pets
async function loadPets(filterSpecies = '') {
    const tbody = document.getElementById('pets-table-body');
    if (!tbody) return;

    try {
        const res = await fetch('/api/mascotas');
        let pets = await res.json();

        if (filterSpecies) {
            pets = pets.filter(p => p.especie === filterSpecies);
        }

        if (pets.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6"><div class="admin-empty-state"><p>No pets found</p></div></td></tr>';
            return;
        }

        tbody.innerHTML = pets.map(pet => {
            const isCat = pet.especie === 'Cat' || pet.especie === 'Gato';
            const isDog = pet.especie === 'Dog' || pet.especie === 'Perro';
            const speciesClass = isDog ? 'owner' : isCat ? 'vet' : 'business';
            return `
      <tr>
        <td>
          <div class="admin-user-cell">
            <div class="admin-avatar ${isCat ? 'blue' : 'green'}" style="font-size:1.1rem;">${isCat ? '🐱' : '🐶'}</div>
            <div class="admin-user-info">
              <h4>${pet.nombre || 'Unknown'}</h4>
            </div>
          </div>
        </td>
        <td><span class="admin-role ${speciesClass}">${pet.especie || '-'}</span></td>
        <td>${pet.raza || '-'}</td>
        <td>${pet.edad || '-'} yrs</td>
        <td>${pet.owner_name || '-'}</td>
        <td>
          <div class="admin-actions">
            <button class="admin-action-btn view" onclick="viewPet(${pet.id_mascota})" title="View">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
            <button class="admin-action-btn delete" onclick="confirmDeletePet(${pet.id_mascota})" title="Delete">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `}).join('');
    } catch (error) {
        console.error('Error loading pets:', error);
        tbody.innerHTML = '<tr><td colspan="6"><div class="admin-empty-state"><p>Error loading pets</p></div></td></tr>';
    }
}

// Load businesses
async function loadBusinesses(filterType = '') {
    const tbody = document.getElementById('businesses-table-body');
    if (!tbody) return;

    try {
        const res = await fetch('/api/establecimientos');
        let businesses = await res.json();

        if (filterType) {
            businesses = businesses.filter(b => b.tipo === filterType);
        }

        if (businesses.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6"><div class="admin-empty-state"><p>No businesses found</p></div></td></tr>';
            return;
        }

        tbody.innerHTML = businesses.map(business => {
            const typeClass = business.tipo === 'clinic' ? 'owner' : business.tipo === 'petshop' ? 'business' : 'vet';
            return `
      <tr>
        <td>
          <div class="admin-user-cell">
            <div class="admin-avatar purple">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div class="admin-user-info">
              <h4>${business.nombre || 'Unknown'}</h4>
            </div>
          </div>
        </td>
        <td><span class="admin-role ${typeClass}">${business.tipo || '-'}</span></td>
        <td>${business.direccion || '-'}</td>
        <td>${business.telefono || '-'}</td>
        <td>
          <span style="color: #f59e0b; font-size: 0.8rem;">
            ${'★'.repeat(Math.floor(business.rating || 0))}${'☆'.repeat(5 - Math.floor(business.rating || 0))}
          </span>
          <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 4px;">${business.rating || 'N/A'}</span>
        </td>
        <td>
          <div class="admin-actions">
            <button class="admin-action-btn edit" onclick="editBusiness(${business.id_establecimiento})" title="Edit">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button class="admin-action-btn delete" onclick="confirmDeleteBusiness(${business.id_establecimiento})" title="Delete">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `}).join('');
    } catch (error) {
        console.error('Error loading businesses:', error);
        tbody.innerHTML = '<tr><td colspan="6"><div class="admin-empty-state"><p>Error loading businesses</p></div></td></tr>';
    }
}

// Load appointments
async function loadAppointments(filterStatus = '') {
    const tbody = document.getElementById('appointments-table-body');
    if (!tbody) return;

    try {
        const res = await fetch('/api/citas');
        let appointments = await res.json();

        if (filterStatus) {
            appointments = appointments.filter(a => a.estado === filterStatus);
        }

        if (appointments.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7"><div class="admin-empty-state"><p>No appointments found</p></div></td></tr>';
            return;
        }

        tbody.innerHTML = appointments.map(apt => `
      <tr>
        <td>${formatDate(apt.fecha)}</td>
        <td>${apt.hora || '-'}</td>
        <td>${apt.pet_name || '-'}</td>
        <td>${apt.owner_name || '-'}</td>
        <td>${apt.business_name || '-'}</td>
        <td><span class="admin-status ${getStatusClass(apt.estado)}">${apt.estado || 'pending'}</span></td>
        <td>
          <div class="admin-actions">
            <button class="admin-action-btn view" onclick="updateAppointmentStatus(${apt.id_cita})" title="Update Status">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </button>
            <button class="admin-action-btn delete" onclick="confirmDeleteAppointment(${apt.id_cita})" title="Cancel">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
    } catch (error) {
        console.error('Error loading appointments:', error);
        tbody.innerHTML = '<tr><td colspan="7"><div class="admin-empty-state"><p>Error loading appointments</p></div></td></tr>';
    }
}

// Save user
async function saveUser() {
    const id = document.getElementById('user-id').value;
    const data = {
        nombre: document.getElementById('user-nombre').value,
        email: document.getElementById('user-email').value,
        telefono: document.getElementById('user-telefono').value,
        direccion: document.getElementById('user-direccion').value
    };

    try {
        const url = id ? `/api/clientes/${id}` : '/api/clientes';
        const method = id ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        loadUsers();
        loadStats();
    } catch (error) {
        console.error('Error saving user:', error);
    }
}

// Save business
async function saveBusiness() {
    const id = document.getElementById('business-id').value;
    const data = {
        nombre: document.getElementById('business-nombre').value,
        tipo: document.getElementById('business-tipo').value,
        direccion: document.getElementById('business-direccion').value,
        telefono: document.getElementById('business-telefono').value,
        horario: document.getElementById('business-horario').value
    };

    try {
        const url = id ? `/api/establecimientos/${id}` : '/api/establecimientos';
        const method = id ? 'PUT' : 'POST';
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        loadBusinesses();
        loadStats();
    } catch (error) {
        console.error('Error saving business:', error);
    }
}

// Global functions for onclick handlers
window.editUser = async function (id) {
    try {
        const res = await fetch(`/api/clientes/${id}`);
        const user = await res.json();
        document.getElementById('modal-user-title').textContent = 'Edit User';
        document.getElementById('user-id').value = id;
        document.getElementById('user-nombre').value = user.nombre || '';
        document.getElementById('user-email').value = user.email || '';
        document.getElementById('user-telefono').value = user.telefono || '';
        document.getElementById('user-direccion').value = user.direccion || '';
        document.getElementById('modal-user')?.classList.add('open');
    } catch (error) {
        console.error('Error loading user:', error);
    }
};

window.confirmDeleteUser = function (id) {
    document.getElementById('delete-message').textContent = 'Are you sure you want to delete this user? All associated data will be removed.';
    deleteCallback = async () => {
        await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
        loadUsers();
        loadStats();
    };
    document.getElementById('modal-delete')?.classList.add('open');
};

window.viewPet = function (id) {
    window.location.hash = `#/pet-profile/${id}`;
};

window.confirmDeletePet = function (id) {
    document.getElementById('delete-message').textContent = 'Are you sure you want to delete this pet? All medical records will be removed.';
    deleteCallback = async () => {
        await fetch(`/api/mascotas/${id}`, { method: 'DELETE' });
        loadPets();
        loadStats();
    };
    document.getElementById('modal-delete')?.classList.add('open');
};

window.editBusiness = async function (id) {
    try {
        const res = await fetch(`/api/establecimientos/${id}`);
        const business = await res.json();
        document.getElementById('modal-business-title').textContent = 'Edit Business';
        document.getElementById('business-id').value = id;
        document.getElementById('business-nombre').value = business.nombre || '';
        document.getElementById('business-tipo').value = business.tipo || '';
        document.getElementById('business-direccion').value = business.direccion || '';
        document.getElementById('business-telefono').value = business.telefono || '';
        document.getElementById('business-horario').value = business.horario || '';
        document.getElementById('modal-business')?.classList.add('open');
    } catch (error) {
        console.error('Error loading business:', error);
    }
};

window.confirmDeleteBusiness = function (id) {
    document.getElementById('delete-message').textContent = 'Are you sure you want to delete this business?';
    deleteCallback = async () => {
        await fetch(`/api/establecimientos/${id}`, { method: 'DELETE' });
        loadBusinesses();
        loadStats();
    };
    document.getElementById('modal-delete')?.classList.add('open');
};

window.updateAppointmentStatus = async function (id) {
    const newStatus = prompt('Enter new status (pending, confirmed, completed, cancelled):');
    if (newStatus && ['pending', 'confirmed', 'completed', 'cancelled'].includes(newStatus)) {
        try {
            await fetch(`/api/citas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: newStatus })
            });
            loadAppointments();
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    }
};

window.confirmDeleteAppointment = function (id) {
    document.getElementById('delete-message').textContent = 'Are you sure you want to cancel this appointment?';
    deleteCallback = async () => {
        await fetch(`/api/citas/${id}`, { method: 'DELETE' });
        loadAppointments();
        loadStats();
    };
    document.getElementById('modal-delete')?.classList.add('open');
};

// Export users to CSV
function exportUsers() {
    fetch('/api/clientes')
        .then(res => res.json())
        .then(users => {
            const csv = [
                ['Name', 'Email', 'Phone', 'Address', 'Joined'].join(','),
                ...users.map(u => [u.nombre, u.email, u.telefono, u.direccion, u.created_at].join(','))
            ].join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'users-export.csv';
            a.click();
        });
}

// Utility functions
function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getStatusClass(status) {
    const classes = {
        pending: 'pending',
        confirmed: 'verified',
        completed: 'active',
        cancelled: 'inactive'
    };
    return classes[status] || 'inactive';
}

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

function filterCurrentTab(query) {
    const activeTab = document.querySelector('.admin-tab.active')?.dataset.tab;
    const rows = document.querySelectorAll(`#tab-${activeTab} tbody tr`);
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}