// ─────────────────────────────────────────────
//  vet-clinic-profile.js
//  Vista pública del perfil de la clínica
//  visible desde el menú lateral del vet
// ─────────────────────────────────────────────

export function vetClinicProfilePage() {
  return `
  <div id="vcp-root" class="font-roboto">

    <!-- Loading -->
    <div id="vcp-loading" class="flex items-center justify-center gap-2 py-20"
         style="color:var(--text-muted);">
      <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      <span class="text-sm font-poppins">Loading profile...</span>
    </div>

    <!-- Content -->
    <div id="vcp-content" style="display:none;">

      <!-- ── TOP BAR ───────────────────────────── -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <a href="#/veterinary"
             class="flex items-center gap-1.5 text-sm font-medium font-poppins transition"
             style="color:var(--text-highlight);"
             onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Dashboard
          </a>
          <span style="color:var(--text-muted);">/</span>
          <span class="text-sm font-poppins" style="color:var(--text-soft);">My Profile</span>
        </div>
        <a href="#/veterinary"
           class="flex items-center gap-2 px-4 py-2 rounded-xl font-poppins font-semibold text-sm text-white transition"
           style="background:var(--text-highlight);"
           onmouseenter="this.style.opacity='0.88'" onmouseleave="this.style.opacity='1'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Edit Profile
        </a>
      </div>

      <!-- ── HERO CARD ─────────────────────────── -->
      <div class="bg-white rounded-2xl overflow-hidden mb-6" style="box-shadow:var(--shadow-card);">
        <div class="relative h-48 overflow-hidden" style="background:var(--bg-muted);">
          <img id="vcp-image" src="" alt="Clinic"
               class="w-full h-full object-cover"
               onerror="this.style.display='none'"/>
          <div class="absolute inset-0 flex items-end"
               style="background:linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%);">
          </div>
          <!-- Badges -->
          <div class="absolute top-3 left-3 flex gap-2">
            <span id="vcp-status-badge" class="text-xs font-bold px-3 py-1 rounded-full"
                  style="background:#dcfce7;color:#166534;">Active</span>
            <span id="vcp-24h-badge" class="text-xs font-bold px-3 py-1 rounded-full"
                  style="display:none;background:#fef9c3;color:#92400e;">24/7</span>
          </div>
          <!-- Rating -->
          <div id="vcp-rating-wrap" class="absolute top-3 right-3 px-2.5 py-1 rounded-full"
               style="background:rgba(255,255,255,0.92);">
            <span class="text-xs font-bold" style="color:#d97706;">
              ★ <span id="vcp-rating">—</span>
            </span>
          </div>
        </div>

        <div class="p-6 flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <h1 id="vcp-name" class="text-2xl font-bold font-poppins mb-1"
                style="color:var(--text-primary);">—</h1>
            <p id="vcp-description" class="text-sm leading-relaxed"
               style="color:var(--text-soft);">—</p>
            <div id="vcp-address-row" class="flex items-center gap-1.5 mt-2"
                 style="color:var(--text-muted);">
              <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span id="vcp-address" class="text-xs">—</span>
            </div>
          </div>
          <div class="flex flex-col gap-2 shrink-0">
            <a id="vcp-phone-btn" href="#"
               class="flex items-center gap-2 px-4 py-2 rounded-xl font-poppins font-semibold text-xs text-white transition"
               style="background:var(--text-highlight);"
               onmouseenter="this.style.opacity='0.88'" onmouseleave="this.style.opacity='1'">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span id="vcp-phone-txt">Call</span>
            </a>
            <a id="vcp-whatsapp-btn" href="#" target="_blank"
               class="flex items-center gap-2 px-4 py-2 rounded-xl font-poppins font-semibold text-xs text-white transition"
               style="background:#16a34a;"
               onmouseenter="this.style.opacity='0.88'" onmouseleave="this.style.opacity='1'">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <!-- ── TWO COLUMN ────────────────────────── -->
      <div class="flex gap-6">

        <!-- LEFT -->
        <div class="flex-1 flex flex-col gap-6 min-w-0">

          <!-- Services -->
          <div class="bg-white rounded-2xl p-6" style="box-shadow:var(--shadow-card);">
            <h2 class="font-bold font-poppins mb-4" style="font-size:16px;color:var(--text-primary);">
              Our Services
            </h2>
            <div id="vcp-services" class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <p class="col-span-4 text-sm text-center py-4" style="color:var(--text-muted);">
                No services added yet. <a href="#/veterinary" style="color:var(--text-highlight);">Add them from your dashboard.</a>
              </p>
            </div>
          </div>

          <!-- Map -->
          <div class="bg-white rounded-2xl p-6" style="box-shadow:var(--shadow-card);">
            <h2 class="font-bold font-poppins mb-4" style="font-size:16px;color:var(--text-primary);">
              Location
            </h2>
            <div id="vcp-map" class="w-full rounded-xl overflow-hidden mb-3"
                 style="height:220px;background:var(--bg-muted);">
              <div class="w-full h-full flex flex-col items-center justify-center gap-2"
                   style="color:var(--text-muted);">
                <svg class="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p class="text-xs font-poppins opacity-60">No coordinates available</p>
              </div>
            </div>
            <p id="vcp-map-address" class="text-xs mb-3" style="color:var(--text-soft);"></p>
            <a id="vcp-directions" href="#" target="_blank"
               class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-poppins font-semibold text-sm transition"
               style="background:var(--text-primary);color:white;"
               onmouseenter="this.style.opacity='0.85'" onmouseleave="this.style.opacity='1'">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              Get Directions
            </a>
          </div>

        </div>

        <!-- RIGHT -->
        <div class="flex flex-col gap-5" style="width:280px;min-width:280px;">

          <!-- Opening Hours -->
          <div class="bg-white rounded-2xl p-5" style="box-shadow:var(--shadow-card);">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center"
                   style="background:rgba(106,76,147,0.12);">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     style="color:var(--text-highlight);">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="font-bold font-poppins text-sm" style="color:var(--text-primary);">
                Opening Hours
              </h3>
            </div>
            <div id="vcp-schedule" class="flex flex-col gap-1 text-xs font-roboto">
              <p style="color:var(--text-muted);">Loading...</p>
            </div>
          </div>

          <!-- Contact -->
          <div class="bg-white rounded-2xl p-5" style="box-shadow:var(--shadow-card);">
            <h3 class="font-bold font-poppins text-sm mb-3" style="color:var(--text-primary);">
              Contact
            </h3>
            <div class="flex flex-col gap-2">
              <div id="vcp-contact-phone" class="flex items-center gap-2 text-xs"
                   style="color:var(--text-soft);">
                <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span id="vcp-contact-phone-txt">—</span>
              </div>
              <div id="vcp-contact-email" class="flex items-center gap-2 text-xs"
                   style="color:var(--text-soft);display:none!important;">
                <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span id="vcp-contact-email-txt">—</span>
              </div>
            </div>
          </div>

          <!-- NIT verified -->
          <div id="vcp-verified-badge" class="rounded-2xl p-4 flex items-center gap-3"
               style="display:none!important;background:rgba(185,251,192,0.25);border:1px solid rgba(185,251,192,0.5);">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 style="color:#166534;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <p class="font-semibold font-poppins text-xs" style="color:#166534;">Verified Business</p>
              <p class="text-xs mt-0.5" style="color:#15803d;">NIT verified by PAWS</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  `;
}

// ─────────────────────────────────────────────
//  vetClinicProfileEvents
// ─────────────────────────────────────────────
export async function vetClinicProfileEvents() {
  const loading = document.getElementById('vcp-loading');
  const content = document.getElementById('vcp-content');

  try {
    // 1. Fetch business data
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const userId = user?.user_id || user?.id;
    if (!userId) throw new Error('No user session found');

    // Prefer the _business_id already cached by vet-dashboard (calls getById with full joins)
    const VET_DEFAULTS = {
      schedule: [
        { day: 'Monday', hours: '09:00 - 18:00', closed: false },
        { day: 'Tuesday', hours: '09:00 - 18:00', closed: false },
        { day: 'Wednesday', hours: '09:00 - 18:00', closed: false },
        { day: 'Thursday', hours: '09:00 - 18:00', closed: false },
        { day: 'Friday', hours: '09:00 - 18:00', closed: false },
        { day: 'Saturday', hours: '09:00 - 14:00', closed: false },
        { day: 'Sunday', hours: '', closed: true },
      ],
      services: [],
    };
    const local = (() => {
      try { return { ...VET_DEFAULTS, ...(JSON.parse(localStorage.getItem('vet_dashboard') || '{}')) }; }
      catch { return VET_DEFAULTS; }
    })();

    let bizRes;
    if (local._business_id) {
      bizRes = await fetch(`/api/businesses/${local._business_id}`);
    } else {
      bizRes = await fetch(`/api/businesses/user/${userId}`);
    }

    if (!bizRes.ok) {
      if (bizRes.status === 404) {
        if (loading) loading.innerHTML = `
          <div class="text-center py-20">
            <p class="font-poppins font-semibold" style="color:var(--text-primary);">No clinic profile found</p>
            <p class="text-sm mt-1" style="color:var(--text-muted);">Complete your registration to set up your clinic.</p>
            <a href="#/veterinary" class="inline-block mt-4 px-5 py-2 rounded-xl text-sm font-poppins font-semibold text-white"
               style="background:var(--text-highlight);">Go to Dashboard</a>
          </div>`;
        return;
      }
      throw new Error(`Server error ${bizRes.status}`);
    }
    const biz = await bizRes.json();

    // 3. Populate hero
    const el = id => document.getElementById(id);

    if (biz.image_url) {
      el('vcp-image').src = biz.image_url;
    } else {
      el('vcp-image').style.display = 'none';
    }

    el('vcp-name').textContent        = biz.name || '—';
    el('vcp-description').textContent = biz.description || local.description || '';
    el('vcp-address').textContent     = biz.address || '—';
    el('vcp-map-address').textContent = biz.address || '';

    if (biz.rating_average) {
      el('vcp-rating').textContent = parseFloat(biz.rating_average).toFixed(1);
    } else {
      el('vcp-rating-wrap').style.display = 'none';
    }

    if (biz.is_24h) el('vcp-24h-badge').style.display = '';

    if (biz.status !== 'active') {
      el('vcp-status-badge').textContent = biz.status || 'inactive';
      el('vcp-status-badge').style.background = '#fee2e2';
      el('vcp-status-badge').style.color = '#991b1b';
    }

    // 4. Phone / WhatsApp buttons
    const phone = biz.phone || biz.whatsapp || '';
    if (phone) {
      el('vcp-phone-btn').href = `tel:${phone}`;
      el('vcp-phone-txt').textContent = phone;
      el('vcp-contact-phone-txt').textContent = phone;
    } else {
      el('vcp-phone-btn').style.display = 'none';
    }

    if (biz.whatsapp || biz.phone) {
      const wa = biz.whatsapp || biz.phone;
      el('vcp-whatsapp-btn').href = `https://api.whatsapp.com/send/?phone=${encodeURIComponent(wa)}&text=${encodeURIComponent('Hola, quiero información sobre ' + biz.name)}&type=phone_number&app_absent=0`;
    } else {
      el('vcp-whatsapp-btn').style.display = 'none';
    }

    if (biz.email) {
      el('vcp-contact-email').style.removeProperty('display');
      el('vcp-contact-email-txt').textContent = biz.email;
    }

    // 5. Verified badge
    if (biz.nit_verified === 'verified') {
      el('vcp-verified-badge').style.removeProperty('display');
    }

    // 6. Map
    if (biz.latitude && biz.longitude) {
      el('vcp-map').innerHTML = `
        <iframe
          width="100%" height="100%" frameborder="0" style="border:0;"
          src="https://maps.google.com/maps?q=${biz.latitude},${biz.longitude}&z=15&output=embed"
          allowfullscreen loading="lazy">
        </iframe>`;
      el('vcp-directions').href = `https://www.google.com/maps/dir/?api=1&destination=${biz.latitude},${biz.longitude}`;
    } else if (biz.address) {
      el('vcp-directions').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.address)}`;
    }

    // 7. Services (from localStorage)
    if (local.services && local.services.length > 0) {
      const ICONS = {
        syringe:   `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>`,
        clipboard: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>`,
        document:  `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`,
        heart:     `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>`,
        plus:      `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>`,
        lab:       `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>`,
      };
      el('vcp-services').innerHTML = local.services.map(s => `
        <div class="${s.bg} rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-2 shadow-soft">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 style="color:var(--text-highlight);">
              ${ICONS[s.icon] || ICONS.plus}
            </svg>
          </div>
          <p class="text-xs font-semibold font-poppins" style="color:var(--text-primary);">${s.label}</p>
        </div>
      `).join('');
    }

    // 8. Schedule — prefer API data (getById includes it), fallback to localStorage
    const schedule = (biz.schedule && biz.schedule.length > 0)
      ? biz.schedule.map(s => ({
          day: s.day_of_week,
          hours: s.is_open ? `${s.open_time || ''} - ${s.close_time || ''}` : '',
          closed: !s.is_open,
        }))
      : local.schedule;
    el('vcp-schedule').innerHTML = schedule.map(s => `
      <div class="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
        <span class="font-medium" style="color:var(--text-primary);">${s.day}</span>
        <span style="color:${s.closed ? '#f87171' : 'var(--text-muted)'};">
          ${s.closed ? 'Closed' : s.hours}
        </span>
      </div>
    `).join('');

    // 9. Show content
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = '';

  } catch (err) {
    console.error('vetClinicProfileEvents error:', err);
    if (loading) loading.innerHTML = `
      <div class="text-center py-20">
        <p class="font-poppins font-semibold" style="color:#dc2626;">Error loading profile</p>
        <p class="text-sm mt-1" style="color:var(--text-muted);">${err.message}</p>
      </div>`;
  }
}
