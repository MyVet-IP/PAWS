export function vetClinicProfilePage() {
  return `
  <div id="vcp-root" class="font-roboto" style="max-width:1100px;margin:0 auto;">

    <div id="vcp-loading" class="flex items-center justify-center gap-2 py-20"
         style="color:var(--text-muted);">
      <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      <span class="text-sm font-poppins">Loading profile...</span>
    </div>

    <div id="vcp-content" style="display:none;">

      <div class="flex items-center justify-between mb-5">
        <div id="vcp-owner-nav" class="flex items-center gap-3">
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
          <span class="text-sm font-poppins font-semibold" style="color:var(--text-primary);">Clinic Profile</span>
        </div>
        <a id="vcp-edit-btn" href="#/veterinary"
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

      <div class="bg-white rounded-2xl overflow-hidden mb-6" style="box-shadow:0 1px 12px rgba(106,76,147,0.08);">
        <div class="flex flex-col md:flex-row">
          <div id="vcp-image-area" class="relative overflow-hidden cursor-pointer"
               style="min-height:220px;width:100%;max-width:340px;background:linear-gradient(135deg,#6A4C93 0%,#8B5FBF 100%);">
            <img id="vcp-image" src="" alt="Clinic"
                 class="w-full h-full object-cover"
                 style="min-height:220px;"
                 onerror="this.style.display='none'"/>
            <div id="vcp-image-placeholder" class="absolute inset-0 flex flex-col items-center justify-center gap-2" style="display:none;">
              <svg class="w-12 h-12" fill="none" stroke="rgba(255,255,255,0.35)" viewBox="0 0 24 24" stroke-width="1">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div id="vcp-image-overlay" class="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all"
                 style="background:rgba(106,76,147,0.65);opacity:0;pointer-events:none;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="text-white text-xs font-poppins font-semibold">Click to upload photo</span>
            </div>
            <input type="file" id="vcp-photo-input" accept="image/*"
                   class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" style="z-index:2;"/>
            <div id="vcp-upload-toast" class="absolute bottom-3 left-3 right-3 text-center py-2 rounded-lg font-poppins font-semibold text-xs text-white transition-all"
                 style="background:rgba(22,163,74,0.9);opacity:0;pointer-events:none;transform:translateY(8px);">
              Photo updated!
            </div>
          </div>

          <div class="flex-1 p-6 flex flex-col justify-center">
            <h1 id="vcp-name" class="text-2xl font-bold font-poppins mb-1.5" style="color:var(--text-primary);">—</h1>
            <p id="vcp-description" class="text-sm leading-relaxed mb-3" style="color:var(--text-soft);">—</p>

            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span id="vcp-status-badge" class="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                    style="background:#dcfce7;color:#166534;">
                <span style="width:6px;height:6px;border-radius:50%;background:#16a34a;display:inline-block;"></span>
                Active
              </span>
              <span id="vcp-24h-badge" class="text-xs font-bold px-3 py-1 rounded-full"
                    style="display:none;background:#fef9c3;color:#92400e;">24/7</span>
              <div id="vcp-rating-wrap" class="flex items-center gap-1 px-3 py-1 rounded-full"
                   style="background:#fffbeb;border:1px solid #fde68a;">
                <span style="color:#f59e0b;font-size:12px;">&#9733;</span>
                <span id="vcp-rating" class="text-xs font-bold" style="color:#d97706;">—</span>
              </div>
            </div>

            <div id="vcp-address-row" class="flex items-center gap-1.5 mb-4" style="color:var(--text-muted);">
              <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span id="vcp-address" class="text-xs">—</span>
            </div>

            <div class="flex items-center gap-2">
              <a id="vcp-phone-btn" href="#"
                 class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-poppins font-semibold text-xs text-white transition"
                 style="background:var(--text-highlight);"
                 onmouseenter="this.style.opacity='0.88'" onmouseleave="this.style.opacity='1'">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span id="vcp-phone-txt">Call</span>
              </a>
              <a id="vcp-whatsapp-btn" href="#" target="_blank"
                 class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-poppins font-semibold text-xs text-white transition"
                 style="background:#16a34a;"
                 onmouseenter="this.style.opacity='0.88'" onmouseleave="this.style.opacity='1'">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a id="vcp-email-btn" href="#" style="display:none;"
                 class="flex items-center justify-center w-10 h-10 rounded-xl transition"
                 title="Send email"
                 onmouseenter="this.style.background='var(--bg-muted)'" onmouseleave="this.style.background='transparent'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--text-soft);">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-6" style="align-items:flex-start;">

        <div class="flex-1 flex flex-col gap-6 min-w-0">

          <div class="bg-white rounded-2xl p-6" style="box-shadow:0 1px 12px rgba(106,76,147,0.08);">
            <div class="flex items-center gap-2.5 mb-5">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center"
                   style="background:rgba(106,76,147,0.10);">
                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     style="color:var(--text-highlight);width:18px;height:18px;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h2 class="font-bold font-poppins" style="font-size:16px;color:var(--text-primary);">
                Our Services
              </h2>
            </div>
            <div id="vcp-services" class="grid grid-cols-2 gap-3">
              <p class="col-span-2 text-sm text-center py-6" style="color:var(--text-muted);">
                No services added yet.
                <a href="#/veterinary" class="font-semibold" style="color:var(--text-highlight);">Add them from your dashboard.</a>
              </p>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6" style="box-shadow:0 1px 12px rgba(106,76,147,0.08);">
            <div class="flex items-center gap-2.5 mb-5">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center"
                   style="background:rgba(106,76,147,0.10);">
                <svg style="color:var(--text-highlight);width:18px;height:18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h2 class="font-bold font-poppins" style="font-size:16px;color:var(--text-primary);">
                Location
              </h2>
            </div>

            <div id="vcp-map" class="w-full rounded-xl overflow-hidden mb-4"
                 style="height:280px;background:linear-gradient(135deg,var(--bg-muted),#E5E7EB);">
              <div class="w-full h-full flex flex-col items-center justify-center gap-2"
                   style="color:var(--text-muted);">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center"
                     style="background:rgba(106,76,147,0.10);">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       style="color:var(--text-highlight);opacity:0.6;">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <p class="text-xs font-poppins" style="opacity:0.6;">Set your location from the dashboard</p>
              </div>
            </div>

            <div class="flex items-center justify-between gap-3">
              <div class="flex-1 min-w-0">
                <p id="vcp-map-address" class="text-sm font-medium truncate" style="color:var(--text-primary);"></p>
                <p id="vcp-map-city" class="text-xs" style="color:var(--text-muted);"></p>
              </div>
              <a id="vcp-directions" href="#" target="_blank"
                 class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-poppins font-semibold text-xs transition shrink-0"
                 style="background:var(--bg-muted);color:var(--text-highlight);"
                 onmouseenter="this.style.background='rgba(106,76,147,0.12)'" onmouseleave="this.style.background='var(--bg-muted)'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
                Get Directions
              </a>
            </div>
          </div>

        </div>

        <div class="flex flex-col gap-5" style="width:300px;min-width:300px;">

          <div class="bg-white rounded-2xl p-5" style="box-shadow:0 1px 12px rgba(106,76,147,0.08);">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center"
                   style="background:rgba(106,76,147,0.10);">
                <svg style="color:var(--text-highlight);width:18px;height:18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="font-bold font-poppins text-sm" style="color:var(--text-primary);">
                Opening Hours
              </h3>
            </div>
            <div id="vcp-schedule" class="flex flex-col gap-0 text-xs font-roboto">
              <p style="color:var(--text-muted);">Loading...</p>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-5" style="box-shadow:0 1px 12px rgba(106,76,147,0.08);">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center"
                   style="background:rgba(106,76,147,0.10);">
                <svg style="color:var(--text-highlight);width:18px;height:18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <h3 class="font-bold font-poppins text-sm" style="color:var(--text-primary);">
                Contact
              </h3>
            </div>
            <div class="flex flex-col gap-3">
              <div id="vcp-contact-phone" class="flex items-center gap-3 p-3 rounded-xl" style="background:var(--bg-muted);">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:white;">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--text-highlight);">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-medium" style="color:var(--text-muted);">Phone</p>
                  <p id="vcp-contact-phone-txt" class="text-xs font-semibold" style="color:var(--text-primary);">—</p>
                </div>
              </div>
              <div id="vcp-contact-email" class="flex items-center gap-3 p-3 rounded-xl" style="display:none;background:var(--bg-muted);">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:white;">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--text-highlight);">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-medium" style="color:var(--text-muted);">Email</p>
                  <p id="vcp-contact-email-txt" class="text-xs font-semibold" style="color:var(--text-primary);">—</p>
                </div>
              </div>
            </div>
          </div>

          <div id="vcp-emergency-info" class="rounded-2xl p-4" style="display:none;background:rgba(254,243,199,0.5);border:1px solid #fde68a;">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style="background:#fef9c3;">
                <svg class="w-4 h-4" fill="none" stroke="#d97706" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold font-poppins" style="color:#92400e;">Emergency Services</p>
                <p class="text-xs mt-0.5" style="color:#a16207;">Available 24/7 for registered patients.</p>
                <a id="vcp-emergency-call" href="#" class="text-xs font-bold mt-1 inline-block" style="color:#d97706;">
                  Call now
                </a>
              </div>
            </div>
          </div>

          <div id="vcp-verified-badge" class="rounded-2xl p-4 flex items-center gap-3"
               style="display:none;background:rgba(185,251,192,0.20);border:1px solid rgba(185,251,192,0.45);">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style="background:rgba(185,251,192,0.4);">
              <svg class="w-4.5 h-4.5" fill="none" stroke="#166534" viewBox="0 0 24 24" style="width:18px;height:18px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="font-semibold font-poppins text-xs" style="color:#166534;">Verified Business</p>
              <p class="text-xs mt-0.5" style="color:#15803d;">NIT verified by PAWS</p>
            </div>
          </div>

        </div>
      </div>

      <div class="text-center py-6 mt-4">
        <p class="text-xs font-poppins" style="color:var(--text-muted);">
          &copy; 2024 PAWS Vet Clinic. All rights reserved.
        </p>
      </div>

    </div>
  </div>
  `;
}

export async function vetClinicProfileEvents(params = {}) {
  const loading = document.getElementById('vcp-loading');
  const content = document.getElementById('vcp-content');

  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const userId = user?.user_id || user?.id;
    if (!userId) throw new Error('No user session found');
    const requestedBusinessId = Number(params?.business_id) || null;
    const canEdit = user?.role === 'business' && !requestedBusinessId;

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
    if (requestedBusinessId) {
      bizRes = await fetch(`/api/businesses/${requestedBusinessId}`);
    } else if (local._business_id) {
      bizRes = await fetch(`/api/businesses/${local._business_id}`);
    } else {
      bizRes = await fetch(`/api/businesses/user/${userId}`);
    }

    if (!bizRes.ok) {
      if (bizRes.status === 404) {
        if (loading) loading.innerHTML = `
          <div class="text-center py-20">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                 style="background:rgba(106,76,147,0.10);">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--text-highlight);">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <p class="font-poppins font-semibold text-lg" style="color:var(--text-primary);">No clinic profile found</p>
            <p class="text-sm mt-1 mb-5" style="color:var(--text-muted);">${canEdit ? 'Complete your registration to set up your clinic.' : 'This clinic profile is not available right now.'}</p>
            <a href="${canEdit ? '#/veterinary' : '#/clinics'}" class="inline-block px-6 py-2.5 rounded-xl text-sm font-poppins font-semibold text-white"
              style="background:var(--text-highlight);">${canEdit ? 'Go to Dashboard' : 'Back to clinics'}</a>
          </div>`;
        return;
      }
      throw new Error(`Server error ${bizRes.status}`);
    }
    const biz = await bizRes.json();

    const el = id => document.getElementById(id);

    if (!canEdit) {
      const ownerNav = el('vcp-owner-nav');
      const editBtn = el('vcp-edit-btn');
      const photoInput = el('vcp-photo-input');
      const imageOverlay = el('vcp-image-overlay');
      const imageArea = el('vcp-image-area');

      if (ownerNav) ownerNav.style.display = 'none';
      if (editBtn) editBtn.style.display = 'none';
      if (photoInput) photoInput.style.display = 'none';
      if (imageOverlay) imageOverlay.style.display = 'none';
      if (imageArea) imageArea.style.cursor = 'default';
    }

    if (biz.image_url) {
      el('vcp-image').src = biz.image_url;
    } else {
      el('vcp-image').style.display = 'none';
      el('vcp-image-placeholder').style.display = 'flex';
    }

    el('vcp-name').textContent        = biz.name || '—';
    el('vcp-description').textContent = biz.description || local.description || 'Professional Veterinary Services';
    el('vcp-address').textContent     = biz.address || '—';
    el('vcp-map-address').textContent = biz.address || '';
    el('vcp-map-city').textContent    = biz.city ? `${biz.zone ? biz.zone + ', ' : ''}${biz.city}` : '';

    if (biz.rating_average && parseFloat(biz.rating_average) > 0) {
      el('vcp-rating').textContent = parseFloat(biz.rating_average).toFixed(1);
    } else {
      el('vcp-rating-wrap').style.display = 'none';
    }

    if (biz.is_24h) {
      el('vcp-24h-badge').style.display = '';
      el('vcp-emergency-info').style.display = '';
      const emergencyPhone = biz.phone || biz.whatsapp || '';
      if (emergencyPhone) {
        el('vcp-emergency-call').href = `tel:${emergencyPhone}`;
        el('vcp-emergency-call').textContent = emergencyPhone;
      }
    }

    if (biz.status !== 'active') {
      const badge = el('vcp-status-badge');
      badge.innerHTML = `<span style="width:6px;height:6px;border-radius:50%;background:#dc2626;display:inline-block;"></span> ${biz.status || 'inactive'}`;
      badge.style.background = '#fee2e2';
      badge.style.color = '#991b1b';
    }

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
      el('vcp-contact-email').style.display = 'flex';
      el('vcp-contact-email-txt').textContent = biz.email;
      el('vcp-email-btn').style.display = 'flex';
      el('vcp-email-btn').href = `mailto:${biz.email}`;
    }

    if (biz.nit_verified === 'verified') {
      el('vcp-verified-badge').style.display = 'flex';
    }

    _initProfileMap(biz, el, canEdit);

    const profileServicesRaw = (biz.services && biz.services.length > 0)
      ? biz.services
      : (canEdit ? (local.services || []) : []);
    const profileServices = profileServicesRaw.map(s => (typeof s === 'string' ? { label: s } : s));

    if (profileServices.length > 0) {
      const ICONS = {
        syringe:   `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>`,
        clipboard: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>`,
        document:  `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`,
        heart:     `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>`,
        plus:      `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>`,
        lab:       `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>`,
      };
      el('vcp-services').innerHTML = profileServices.map(s => `
        <div class="rounded-2xl p-4 flex items-start gap-3 transition"
             style="background:var(--bg-muted);border:1px solid transparent;"
             onmouseenter="this.style.borderColor='rgba(106,76,147,0.15)';this.style.boxShadow='0 2px 8px rgba(106,76,147,0.08)'"
             onmouseleave="this.style.borderColor='transparent';this.style.boxShadow='none'">
          <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0"
               style="box-shadow:0 1px 4px rgba(0,0,0,0.06);">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 style="color:var(--text-highlight);">
              ${ICONS[s.icon] || ICONS.plus}
            </svg>
          </div>
          <div>
            <p class="text-sm font-semibold font-poppins" style="color:var(--text-primary);">${s.label}</p>
            ${s.description ? `<p class="text-xs mt-0.5" style="color:var(--text-muted);">${s.description}</p>` : ''}
          </div>
        </div>
      `).join('');
    } else {
      el('vcp-services').innerHTML = canEdit
        ? `<p class="col-span-2 text-sm text-center py-6" style="color:var(--text-muted);">No services added yet. <a href="#/veterinary" class="font-semibold" style="color:var(--text-highlight);">Add them from your dashboard.</a></p>`
        : `<p class="col-span-2 text-sm text-center py-6" style="color:var(--text-muted);">No services listed yet.</p>`;
    }

    const schedule = (biz.schedule && biz.schedule.length > 0)
      ? biz.schedule.map(s => ({
          day: s.day_of_week,
          hours: s.is_open ? `${_formatTime(s.open_time)} - ${_formatTime(s.close_time)}` : '',
          closed: !s.is_open,
        }))
      : local.schedule;

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    el('vcp-schedule').innerHTML = schedule.map(s => {
      const isToday = s.day === today;
      return `
      <div class="flex justify-between items-center py-2.5 transition"
           style="border-bottom:1px solid var(--bg-muted);${isToday ? 'background:rgba(106,76,147,0.04);margin:0 -12px;padding-left:12px;padding-right:12px;border-radius:8px;' : ''}">
        <span class="font-medium flex items-center gap-1.5" style="color:${isToday ? 'var(--text-highlight)' : 'var(--text-primary)'};">
          ${isToday ? '<span style="width:5px;height:5px;border-radius:50%;background:var(--text-highlight);display:inline-block;"></span>' : ''}
          ${s.day}
        </span>
        <span class="font-semibold" style="color:${s.closed ? '#ef4444' : 'var(--text-soft)'};">
          ${s.closed ? 'CLOSED' : s.hours}
        </span>
      </div>`;
    }).join('');

    const imageArea = el('vcp-image-area');
    const imageOverlay = el('vcp-image-overlay');
    const photoInput = el('vcp-photo-input');
    const uploadToast = el('vcp-upload-toast');

    if (canEdit && imageArea && imageOverlay) {
      imageArea.addEventListener('mouseenter', () => { imageOverlay.style.opacity = '1'; });
      imageArea.addEventListener('mouseleave', () => { imageOverlay.style.opacity = '0'; });
    }

    if (canEdit && photoInput) {
      photoInput.addEventListener('change', async () => {
        const file = photoInput.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        const img = el('vcp-image');
        const placeholder = el('vcp-image-placeholder');
        img.src = previewUrl;
        img.style.display = '';
        if (placeholder) placeholder.style.display = 'none';

        const businessId = biz.business_id;
        try {
          const formData = new FormData();
          formData.append('image', file);

          const res = await fetch(`/api/businesses/${businessId}/image`, {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) throw new Error('Upload failed');

          const updated = await res.json();

          img.src = updated.image_url;
          URL.revokeObjectURL(previewUrl);

          const cached = JSON.parse(localStorage.getItem('vet_dashboard') || '{}');
          cached.image_url = updated.image_url;
          localStorage.setItem('vet_dashboard', JSON.stringify(cached));

          if (uploadToast) {
            uploadToast.style.opacity = '1';
            uploadToast.style.transform = 'translateY(0)';
            setTimeout(() => {
              uploadToast.style.opacity = '0';
              uploadToast.style.transform = 'translateY(8px)';
            }, 2000);
          }
        } catch (err) {
          console.error('Failed to save clinic photo:', err);
        }
      });
    }

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

function _formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${String(h12).padStart(2, '0')}:${m} ${ampm}`;
}

async function _initProfileMap(biz, el, canEdit = false) {
  const mapEl = document.getElementById('vcp-map');
  const directionsEl = document.getElementById('vcp-directions');
  const addressEl = el('vcp-map-address');
  const cityEl = el('vcp-map-city');
  const heroAddressEl = el('vcp-address');
  if (!mapEl) return;

  const lat = Number.parseFloat(biz.latitude);
  const lng = Number.parseFloat(biz.longitude);
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);
  const fullAddress = [biz.address, biz.zone, biz.city].filter(Boolean).join(', ');

  let apiKey = '';
  try {
    const configRes = await fetch('/api/config');
    const config = await configRes.json();
    apiKey = config.mapsKey || '';
  } catch { /* no key */ }

  if (!apiKey) {
    if (hasCoords) {
      mapEl.innerHTML = `
        <iframe width="100%" height="100%" frameborder="0" style="border:0;border-radius:12px;"
          src="https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed"
          allowfullscreen loading="lazy"></iframe>`;
      directionsEl.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    } else if (fullAddress) {
      const q = encodeURIComponent(fullAddress);
      mapEl.innerHTML = `
        <iframe width="100%" height="100%" frameborder="0" style="border:0;border-radius:12px;"
          src="https://maps.google.com/maps?q=${q}&z=15&output=embed"
          allowfullscreen loading="lazy"></iframe>`;
      directionsEl.href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
    }
    return;
  }

  const loadMaps = () => new Promise((resolve) => {
    if (typeof google !== 'undefined' && google.maps) return resolve();
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });

  await loadMaps();
  mapEl.innerHTML = '';

  const center = hasCoords
    ? { lat, lng }
    : { lat: 6.2442, lng: -75.5812 };

  const map = new google.maps.Map(mapEl, {
    center,
    zoom: hasCoords ? 16 : 12,
    styles: [
      { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', stylers: [{ visibility: 'off' }] },
    ],
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: true,
  });

  let marker = null;
  const geocoder = new google.maps.Geocoder();

  if (!canEdit) {
    if (hasCoords) {
      marker = new google.maps.Marker({
        position: center,
        map,
        draggable: false,
        title: biz.name || 'Clinic location',
      });
      directionsEl.href = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    } else if (fullAddress) {
      geocoder.geocode({ address: fullAddress }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const p = results[0].geometry.location;
          const pos = { lat: p.lat(), lng: p.lng() };

          map.setCenter(pos);
          map.setZoom(16);

          marker = new google.maps.Marker({
            position: pos,
            map,
            draggable: false,
            title: biz.name || 'Clinic location',
          });

          if (addressEl && !addressEl.textContent) addressEl.textContent = results[0].formatted_address;
          if (heroAddressEl && !heroAddressEl.textContent) heroAddressEl.textContent = results[0].formatted_address;
          if (cityEl && !cityEl.textContent) {
            const cityComp = results[0].address_components.find(c =>
              c.types.includes('locality') || c.types.includes('administrative_area_level_2')
            );
            cityEl.textContent = cityComp ? cityComp.long_name : '';
          }

          directionsEl.href = `https://www.google.com/maps/dir/?api=1&destination=${pos.lat},${pos.lng}`;
        }
      });
    }
    return;
  }

  function placeMarker(pos, shouldSave = true) {
    if (marker) {
      marker.setPosition(pos);
    } else {
      marker = new google.maps.Marker({
        position: pos,
        map,
        draggable: true,
        title: 'Drag to adjust location',
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#6A4C93',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 3,
        },
      });

      marker.addListener('dragend', () => {
        const p = marker.getPosition();
        saveLocation({ lat: p.lat(), lng: p.lng() });
      });
    }

    if (shouldSave) saveLocation(pos);
  }

  let saveTimeout = null;
  async function saveLocation(pos) {
    directionsEl.href = `https://www.google.com/maps/dir/?api=1&destination=${pos.lat},${pos.lng}`;

    geocoder.geocode({ location: pos }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const addr = results[0].formatted_address;
        if (addressEl) addressEl.textContent = addr;
        if (heroAddressEl) heroAddressEl.textContent = addr;

        const cityComp = results[0].address_components.find(c =>
          c.types.includes('locality') || c.types.includes('administrative_area_level_2')
        );
        if (cityEl) cityEl.textContent = cityComp ? cityComp.long_name : '';

        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          _saveLocationToAPI(biz.business_id, pos.lat, pos.lng, addr, cityComp?.long_name);
        }, 600);
      } else {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          _saveLocationToAPI(biz.business_id, pos.lat, pos.lng, '', '');
        }, 600);
      }
    });
  }

  map.addListener('click', (e) => {
    const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    placeMarker(pos);
    map.panTo(pos);
  });

  if (hasCoords) {
    placeMarker(center, false);
    directionsEl.href = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
  }

  if (!hasCoords) {
    const hint = document.createElement('div');
    hint.className = 'font-poppins';
    hint.style.cssText = 'position:absolute;bottom:12px;left:50%;transform:translateX(-50%);background:white;padding:8px 16px;border-radius:10px;font-size:12px;font-weight:600;color:#6A4C93;box-shadow:0 2px 8px rgba(0,0,0,0.15);z-index:5;white-space:nowrap;pointer-events:none;';
    hint.textContent = 'Click on the map to set your clinic location';
    mapEl.style.position = 'relative';
    mapEl.appendChild(hint);

    map.addListener('click', () => {
      if (hint.parentNode) hint.remove();
    });
  }
}

async function _saveLocationToAPI(businessId, lat, lng, address, city) {
  try {
    const body = { latitude: lat, longitude: lng };
    if (address) body.address = address;

    await fetch(`/api/businesses/${businessId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('[VCP] Failed to save location:', err);
  }
}
