// ─────────────────────────────────────────────
//  vet-dashboard.js
//  Contenido interno del <main> — Layout inyecta Aside + Topbar
//  Modales: Edit Profile+Info, Schedule, Services, Team
//  Persistencia: localStorage
// ─────────────────────────────────────────────

// ── Estado desde localStorage ─────────────────
// ── Defaults locales (se sobreescriben con datos de la API) ──
const VET_DEFAULTS = {
  clinicName: "My Clinic",
  description: "We provide comprehensive care for pets with modern technology, specialized staff, and a focus on animal wellbeing.",
  phone: "",
  address: "Medellin, Colombia",
  schedule: [
    { day: "Monday", hours: "09:00 - 20:00", closed: false },
    { day: "Tuesday", hours: "10:00 - 18:00", closed: false },
    { day: "Wednesday", hours: "10:00 - 18:00", closed: false },
    { day: "Thursday", hours: "10:00 - 18:00", closed: false },
    { day: "Friday", hours: "10:00 - 18:00", closed: false },
    { day: "Saturday", hours: "10:00 - 14:00", closed: false },
    { day: "Sunday", hours: "", closed: true },
  ],
  services: [
    { id: 1, label: "Vaccination", bg: "bg-paws-green/20", icon: "syringe" },
    { id: 2, label: "Consultation", bg: "bg-paws-blue/20", icon: "clipboard" },
    { id: 3, label: "X-Ray", bg: "bg-paws-pink/20", icon: "document" },
    { id: 4, label: "Laboratory", bg: "bg-paws-purple/20", icon: "lab" },
    { id: 5, label: "Surgery", bg: "bg-paws-yellow/30", icon: "heart" },
    { id: 6, label: "Deworming", bg: "bg-paws-green/20", icon: "plus" },
  ],
  team: [
    { id: 1, initials: "CC", name: "Dr. Carlos Cardona", role: "General Veterinary", bg: "bg-paws-green" },
    { id: 2, initials: "AR", name: "Dra. Ana Ruiz", role: "Specialist in Surgery", bg: "bg-paws-pink" },
  ],
};

function getVetData() {
  try {
    const saved = localStorage.getItem("vet_dashboard");
    return saved ? { ...VET_DEFAULTS, ...JSON.parse(saved) } : { ...VET_DEFAULTS };
  } catch { return { ...VET_DEFAULTS }; }
}

function saveVetData(data) {
  localStorage.setItem("vet_dashboard", JSON.stringify(data));
}

// ── Carga datos del negocio desde la API y actualiza el estado local ──
async function loadBusinessFromAPI() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return;
    const userId = user.user_id || user.id;

    // Prefer user-specific endpoint to avoid status/type filters from generic list.
    const res = await fetch(`/api/businesses/user/${userId}`);
    if (!res.ok) return;
    const biz = await res.json();
    if (!biz) return;

    // Mapear campos de la API al formato local
    const local = getVetData();
    local.clinicName = biz.name || local.clinicName;
    local.phone = biz.phone || local.phone;
    local.address = biz.address || local.address;
    local.description = biz.description || local.description;
    local._business_id = biz.business_id;

    // Mapear horario si viene de la API
    if (biz.schedule && biz.schedule.length > 0) {
      local.schedule = biz.schedule.map(s => ({
        day: s.day_of_week,
        hours: s.is_open ? `${s.open_time || ''} - ${s.close_time || ''}` : '',
        closed: !s.is_open
      }));
    }

    saveVetData(local);

    // Actualizar DOM si ya está montado
    const el = id => document.getElementById(id);
    if (el("vet-banner-name")) el("vet-banner-name").textContent = local.clinicName;
    if (el("vet-description")) el("vet-description").textContent = local.description;
    if (el("vet-address")) el("vet-address").textContent = local.address;

    return local;
  } catch (err) {
    console.error("Error loading business from API:", err);
  }
}

// ── Persiste cambios del perfil en la API ──
async function saveProfileToAPI(data) {
  try {
    const businessId = data._business_id;
    if (!businessId) {
      return { ok: false, error: "No business profile found for this account." };
    }

    const res = await fetch(`/api/businesses/${businessId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.clinicName, phone: data.phone, address: data.address, description: data.description })
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: payload.error || "Could not save clinic profile." };
    }

    return { ok: true, business: payload };
  } catch (err) {
    console.error("Error saving profile to API:", err);
    return { ok: false, error: "Connection error while saving clinic profile." };
  }
}

function toHourMinute(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const hh = Number(match[1]);
  const mm = Number(match[2]);
  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function parseScheduleHours(hoursText) {
  if (!hoursText) return { open_time: null, close_time: null };
  const parts = String(hoursText).split('-').map(p => p.trim());
  if (parts.length !== 2) return { open_time: null, close_time: null };

  const open_time = toHourMinute(parts[0]);
  const close_time = toHourMinute(parts[1]);
  if (!open_time || !close_time) return { open_time: null, close_time: null };

  return { open_time, close_time };
}

async function saveScheduleToAPI(data) {
  try {
    const businessId = data._business_id;
    if (!businessId) {
      return { ok: false, error: "No business profile found for this account." };
    }

    const days = data.schedule.map(s => {
      if (s.closed) {
        return { day_of_week: s.day, open_time: null, close_time: null, is_open: false };
      }

      const parsed = parseScheduleHours(s.hours);
      return {
        day_of_week: s.day,
        open_time: parsed.open_time,
        close_time: parsed.close_time,
        is_open: true
      };
    });

    const invalidOpenDay = days.find(d => d.is_open && (!d.open_time || !d.close_time));
    if (invalidOpenDay) {
      return { ok: false, error: `Invalid hours format for ${invalidOpenDay.day_of_week}. Use HH:mm - HH:mm` };
    }

    const res = await fetch(`/api/businesses/${businessId}/schedule`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ days })
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: payload.error || 'Could not save clinic schedule.' };
    }

    return { ok: true, schedule: payload };
  } catch (err) {
    console.error('Error saving schedule to API:', err);
    return { ok: false, error: 'Connection error while saving schedule.' };
  }
}

function showActionAlert({ icon = 'info', title = '', text = '', timer = 1800 }) {
  if (window.Swal && typeof window.Swal.fire === 'function') {
    return window.Swal.fire({
      icon,
      title,
      text,
      timer,
      timerProgressBar: true,
      showConfirmButton: false,
      confirmButtonColor: '#6A4C93'
    });
  }
  alert(text || title);
  return Promise.resolve();
}

function showSavingAlert(title = 'Saving changes...') {
  if (window.Swal && typeof window.Swal.fire === 'function') {
    window.Swal.fire({
      title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => window.Swal.showLoading()
    });
  }
}

function closeSavingAlert() {
  if (window.Swal && typeof window.Swal.close === 'function' && window.Swal.isVisible()) {
    window.Swal.close();
  }
}

// ── SVG paths por tipo de icono ───────────────
function serviceIconPath(type) {
  const icons = {
    syringe: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>`,
    clipboard: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>`,
    document: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>`,
    lab: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>`,
    heart: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>`,
    plus: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>`,
  };
  return icons[type] || icons.plus;
}

// ── Render helpers ────────────────────────────
function renderServices(services) {
  return services.map(s => `
    <div class="${s.bg} rounded-2xl p-4 flex flex-col items-center justify-center text-center
                hover:shadow-soft transition group relative cursor-pointer">
      <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-2 shadow-soft">
        <svg class="w-5 h-5 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          ${serviceIconPath(s.icon)}
        </svg>
      </div>
      <p class="text-xs font-semibold text-text-primary font-poppins">${s.label}</p>
      <button class="btn-delete-service absolute top-2 right-2 w-5 h-5 rounded-full
                     bg-red-100 text-red-500 items-center justify-center
                     opacity-0 group-hover:opacity-100 transition flex"
              data-id="${s.id}" title="Remove">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  `).join('');
}

function renderTeam(team) {
  return team.map(m => `
    <div class="flex items-center justify-between group">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full ${m.bg} flex items-center justify-center
                    text-xs font-semibold text-text-primary shrink-0">
          ${m.initials}
        </div>
        <div>
          <p class="text-text-primary font-medium text-xs font-poppins">${m.name}</p>
          <p class="text-text-muted text-xs">${m.role}</p>
        </div>
      </div>
      <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button class="btn-edit-member w-7 h-7 rounded-lg bg-surface-muted hover:bg-paws-blue/20
                       flex items-center justify-center transition" data-id="${m.id}">
          <svg class="w-3.5 h-3.5 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z"/>
          </svg>
        </button>
        <button class="btn-delete-member w-7 h-7 rounded-lg bg-surface-muted hover:bg-red-100
                       flex items-center justify-center transition" data-id="${m.id}">
          <svg class="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

function renderScheduleDisplay(schedule) {
  return schedule.map(s => `
    <div class="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
      <span class="text-text-primary font-medium">${s.day}</span>
      <span class="${s.closed ? 'text-red-400' : 'text-text-muted'}">${s.closed ? 'Closed' : s.hours}</span>
    </div>
  `).join('');
}

// ── Input style constants ─────────────────────
const INP = `width:100%;padding:9px 12px;font-size:13px;border:1px solid #E5E7EB;
             border-radius:12px;font-family:'Roboto',sans-serif;outline:none;
             transition:border-color 150ms,box-shadow 150ms;box-sizing:border-box;`;
const FOCUS = `this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'`;
const BLUR = `this.style.borderColor='#E5E7EB';this.style.boxShadow='none'`;

// ── Modal wrapper helper ──────────────────────
function modal(id, title, subtitle, body) {
  return `
  <div id="${id}" style="display:none;position:fixed;inset:0;z-index:9999;
       align-items:center;justify-content:center;
       background:rgba(51,51,51,0.50);backdrop-filter:blur(6px);">
    <div class="bg-white rounded-2xl shadow-medium w-full mx-4 overflow-hidden animate-scale-in"
         style="max-width:480px;max-height:90vh;overflow-y:auto;">
      <div class="flex items-center justify-between px-6 py-5 sticky top-0 bg-white"
           style="border-bottom:1px solid #F3F4F6;">
        <div>
          <h2 class="modal-title font-bold font-poppins text-text-primary" style="font-size:16px;">${title}</h2>
          ${subtitle ? `<p class="text-text-muted mt-0.5" style="font-size:11px;">${subtitle}</p>` : ''}
        </div>
        <button class="btn-close-modal flex items-center justify-center rounded-full transition"
          style="width:34px;height:34px;border:none;cursor:pointer;background:#F3F4F6;color:#6B7280;"
          data-modal="${id}"
          onmouseenter="this.style.background='#E5E7EB'"
          onmouseleave="this.style.background='#F3F4F6'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="px-6 py-5">${body}</div>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────
//  vetDashboardPage
// ─────────────────────────────────────────────
export function vetDashboardPage() {
  const data = getVetData();
  const bgOptions = ["bg-paws-green/20", "bg-paws-blue/20", "bg-paws-pink/20", "bg-paws-purple/20", "bg-paws-yellow/30"];
  const iconOptions = ["syringe", "clipboard", "document", "lab", "heart", "plus"];
  const bgMembers = ["bg-paws-green", "bg-paws-pink", "bg-paws-blue", "bg-paws-purple", "bg-paws-yellow"];

  // ── Modal: Edit Profile + General Info ──────
  const modalProfile = modal("modal-vet-profile", "Edit Clinic Profile", "Saved", `
    <div class="flex flex-col gap-4">
      <div>
        <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">Clinic name</label>
        <input id="vp-name" type="text" value="${data.clinicName}" style="${INP}" onfocus="${FOCUS}" onblur="${BLUR}"/>
      </div>
      <div>
        <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">Phone</label>
        <input id="vp-phone" type="tel" placeholder="+57 302 226 6234" value="${data.phone}" style="${INP}" onfocus="${FOCUS}" onblur="${BLUR}"/>
      </div>
      <div>
        <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">Address</label>
        <input id="vp-address" type="text" value="${data.address}" style="${INP}" onfocus="${FOCUS}" onblur="${BLUR}"/>
      </div>
      <div>
        <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">General Information</label>
        <textarea id="vp-description" rows="4" style="${INP}resize:vertical;" onfocus="${FOCUS}" onblur="${BLUR}">${data.description}</textarea>
      </div>
      <div style="height:1px;background:#F3F4F6;"></div>
      <div class="flex gap-3">
        <button class="btn-close-modal flex-1 py-2.5 border-2 border-gray-200 text-text-soft rounded-xl font-poppins font-semibold text-sm hover:border-gray-300 transition" data-modal="modal-vet-profile">Cancel</button>
        <button id="btn-save-profile" class="flex-1 py-2.5 bg-text-highlight text-white rounded-xl font-poppins font-semibold text-sm hover:opacity-90 transition">Save changes</button>
      </div>
      <div id="profile-success" style="display:none;" class="text-center font-semibold font-poppins rounded-xl bg-paws-green text-text-primary py-2.5 text-sm"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Profile updated!</div>
    </div>
  `);

  // ── Modal: Schedule ──────────────────────────
  const scheduleRows = data.schedule.map((s, i) => `
    <div class="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
      <span class="text-text-primary font-medium text-sm w-24 shrink-0 font-poppins">${s.day}</span>
      <input type="text" class="schedule-hours flex-1 border border-gray-200 rounded-xl text-sm
             font-roboto text-text-primary outline-none transition" data-index="${i}"
             value="${s.hours}" placeholder="09:00 - 18:00"
             style="padding:6px 10px;${s.closed ? 'background:#F9FAFB;color:#9CA3AF;' : ''}"
             ${s.closed ? 'disabled' : ''}
             onfocus="${FOCUS}" onblur="${BLUR}"/>
      <label class="flex items-center gap-1.5 text-xs text-text-muted cursor-pointer shrink-0">
        <input type="checkbox" class="schedule-closed" data-index="${i}"
               ${s.closed ? 'checked' : ''} style="accent-color:#6A4C93;width:14px;height:14px;"/>
        Closed
      </label>
    </div>
  `).join('');

  const modalSchedule = modal("modal-vet-schedule", "Edit Schedule", "Set opening hours per day", `
    <div class="flex flex-col gap-1 mb-5">${scheduleRows}</div>
    <div style="height:1px;background:#F3F4F6;margin-bottom:16px;"></div>
    <div class="flex gap-3">
      <button class="btn-close-modal flex-1 py-2.5 border-2 border-gray-200 text-text-soft rounded-xl font-poppins font-semibold text-sm" data-modal="modal-vet-schedule">Cancel</button>
      <button id="btn-save-schedule" class="flex-1 py-2.5 bg-text-highlight text-white rounded-xl font-poppins font-semibold text-sm hover:opacity-90 transition">Save schedule</button>
    </div>
    <div id="schedule-success" style="display:none;margin-top:12px;" class="text-center font-semibold font-poppins rounded-xl bg-paws-green text-text-primary py-2.5 text-sm"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Schedule updated!</div>
  `);

  // ── Modal: Service ───────────────────────────
  const modalService = modal("modal-vet-service", "Service", "", `
    <div class="flex flex-col gap-4">
      <input type="hidden" id="svc-edit-id"/>
      <div>
        <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">Service name</label>
        <input id="svc-name" type="text" placeholder="e.g. Ultrasound" style="${INP}" onfocus="${FOCUS}" onblur="${BLUR}"/>
      </div>
      <div>
        <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">Background color</label>
        <select id="svc-bg" class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none bg-white" style="padding:9px 12px;font-size:13px;" onfocus="${FOCUS}" onblur="${BLUR}">
          ${bgOptions.map(b => `<option value="${b}">${b.replace('bg-paws-', '').replace('/20', '').replace('/30', '')}</option>`).join('')}
        </select>
      </div>
      <div>
        <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">Icon</label>
        <select id="svc-icon" class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none bg-white" style="padding:9px 12px;font-size:13px;" onfocus="${FOCUS}" onblur="${BLUR}">
          ${iconOptions.map(ic => `<option value="${ic}">${ic}</option>`).join('')}
        </select>
      </div>
      <div style="height:1px;background:#F3F4F6;"></div>
      <div class="flex gap-3">
        <button class="btn-close-modal flex-1 py-2.5 border-2 border-gray-200 text-text-soft rounded-xl font-poppins font-semibold text-sm" data-modal="modal-vet-service">Cancel</button>
        <button id="btn-save-service" class="flex-1 py-2.5 bg-text-highlight text-white rounded-xl font-poppins font-semibold text-sm hover:opacity-90 transition">Save service</button>
      </div>
    </div>
  `);

  // ── Modal: Team member ───────────────────────
  const modalTeam = modal("modal-vet-team", "Team Member", "", `
    <div class="flex flex-col gap-4">
      <input type="hidden" id="tm-edit-id"/>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">Full name</label>
          <input id="tm-name" type="text" placeholder="Dr. Name Lastname" style="${INP}" onfocus="${FOCUS}" onblur="${BLUR}"/>
        </div>
        <div>
          <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">Initials (2 chars)</label>
          <input id="tm-initials" type="text" placeholder="NL" maxlength="2" style="${INP}" onfocus="${FOCUS}" onblur="${BLUR}"/>
        </div>
      </div>
      <div>
        <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">Role / Specialty</label>
        <input id="tm-role" type="text" placeholder="e.g. General Veterinary" style="${INP}" onfocus="${FOCUS}" onblur="${BLUR}"/>
      </div>
      <div>
        <label class="block font-semibold font-poppins text-text-soft mb-1.5" style="font-size:11px;">Avatar color</label>
        <select id="tm-bg" class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none bg-white" style="padding:9px 12px;font-size:13px;" onfocus="${FOCUS}" onblur="${BLUR}">
          ${bgMembers.map(b => `<option value="${b}">${b.replace('bg-paws-', '')}</option>`).join('')}
        </select>
      </div>
      <div style="height:1px;background:#F3F4F6;"></div>
      <div class="flex gap-3">
        <button class="btn-close-modal flex-1 py-2.5 border-2 border-gray-200 text-text-soft rounded-xl font-poppins font-semibold text-sm" data-modal="modal-vet-team">Cancel</button>
        <button id="btn-save-member" class="flex-1 py-2.5 bg-text-highlight text-white rounded-xl font-poppins font-semibold text-sm hover:opacity-90 transition">Save member</button>
      </div>
    </div>
  `);

  return `
  <div class="font-roboto" id="vet-dashboard-root">

    <!-- ── WELCOME BANNER ──────────────────── -->
    <div class="relative rounded-2xl overflow-hidden shadow-card mb-6"
         style="background:linear-gradient(135deg,#6A4C93,#8B5FBF);">
      <div class="absolute inset-0 opacity-15 pointer-events-none">
        <div class="absolute top-0 right-0 w-56 h-56 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
      <div class="relative z-10 flex items-center justify-between px-8 py-7">
        <div>
          <h1 id="vet-banner-name" class="text-2xl font-bold text-white font-poppins mb-1">${data.clinicName}</h1>
          <p class="text-white/70 text-sm">Manage your clinic and appointments</p>
        </div>
        <button id="btn-open-profile"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-poppins font-semibold text-sm
                 bg-white text-text-highlight hover:bg-white/90 transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Edit Profile
        </button>
      </div>
    </div>

    <!-- ── STATS ────────────────────────────── -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-2xl p-5 shadow-card">
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl bg-paws-green/30 flex items-center justify-center">
            <svg class="w-5 h-5 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <span class="text-xs text-green-500 font-medium bg-green-50 px-2 py-1 rounded-full">+12%</span>
        </div>
        <p class="text-2xl font-bold text-text-primary font-poppins">156</p>
        <p class="text-sm text-text-muted">Total Patients</p>
      </div>
      <div class="bg-white rounded-2xl p-5 shadow-card">
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl bg-paws-blue/30 flex items-center justify-center">
            <svg class="w-5 h-5 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-xs text-green-500 font-medium bg-green-50 px-2 py-1 rounded-full">+5%</span>
        </div>
        <p class="text-2xl font-bold text-text-primary font-poppins">24</p>
        <p class="text-sm text-text-muted">This Week</p>
      </div>
      <div class="bg-white rounded-2xl p-5 shadow-card">
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl bg-paws-pink/30 flex items-center justify-center">
            <svg class="w-5 h-5 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <span class="text-xs text-orange-500 font-medium bg-orange-50 px-2 py-1 rounded-full">3 pending</span>
        </div>
        <p class="text-2xl font-bold text-text-primary font-poppins">8</p>
        <p class="text-sm text-text-muted">Today</p>
      </div>
      <div class="bg-white rounded-2xl p-5 shadow-card">
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl bg-paws-yellow/50 flex items-center justify-center">
            <svg class="w-5 h-5 text-text-highlight" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>
        <p class="text-2xl font-bold text-text-primary font-poppins">4.9</p>
        <p class="text-sm text-text-muted">Average Rating</p>
      </div>
    </div>

    <!-- ── TWO COLUMN ───────────────────────── -->
    <div class="flex gap-6">

      <!-- LEFT -->
      <div class="flex-1 flex flex-col gap-6">

        <!-- General Info -->
        <div class="bg-white p-6 rounded-2xl shadow-card">
          <h3 class="text-lg font-bold text-text-primary font-poppins mb-2">General Information</h3>
          <p id="vet-description" class="text-text-soft leading-relaxed font-roboto text-sm">${data.description}</p>
        </div>

        <!-- Services -->
        <div class="bg-white p-6 rounded-2xl shadow-card">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-lg font-bold text-text-primary font-poppins">Our Services</h3>
            <button id="btn-open-service"
              class="text-text-highlight text-sm font-medium font-poppins hover:underline flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Add service
            </button>
          </div>
          <div id="services-grid" class="grid grid-cols-2 md:grid-cols-4 gap-3">
            ${renderServices(data.services)}
          </div>
        </div>

      </div>

      <!-- RIGHT -->
      <div class="flex flex-col gap-5" style="width:280px;min-width:280px;">

        <!-- Schedule -->
        <div class="bg-white p-5 rounded-2xl shadow-card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 bg-paws-purple/20 rounded-xl flex items-center justify-center">
              <svg class="w-4 h-4 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-text-primary font-poppins text-sm">Schedule</h3>
          </div>
          <div id="schedule-display" class="flex flex-col gap-1 text-xs font-roboto">
            ${renderScheduleDisplay(data.schedule)}
          </div>
          <button id="btn-open-schedule"
            class="mt-4 w-full text-text-highlight text-xs font-medium font-poppins hover:underline">
            Edit schedule
          </button>
        </div>

        <!-- Team -->
        <div class="bg-white p-5 rounded-2xl shadow-card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-text-primary font-poppins text-sm">Our Team</h3>
            <button id="btn-open-team"
              class="text-text-highlight text-xs font-medium font-poppins hover:underline">
              + Add
            </button>
          </div>
          <div id="team-list" class="flex flex-col gap-3">
            ${renderTeam(data.team)}
          </div>
        </div>

        <!-- Location -->
        <div class="bg-white p-5 rounded-2xl shadow-card">
          <h3 class="font-bold text-text-primary font-poppins text-sm mb-3">Location</h3>
          <div class="w-full h-28 bg-paws-blue/20 rounded-xl flex items-center justify-center mb-3">
            <svg class="w-8 h-8 text-text-highlight opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <p id="vet-address" class="text-xs text-text-soft font-roboto">${data.address}</p>
        </div>

      </div>
    </div>
  </div>

  ${modalProfile}
  ${modalSchedule}
  ${modalService}
  ${modalTeam}
  `;
}

// ─────────────────────────────────────────────
//  vetDashboardEvents
// ─────────────────────────────────────────────
export function vetDashboardEvents() {
  let data = getVetData();
  // Cargar datos reales desde la API en segundo plano
  loadBusinessFromAPI().then(apiData => { if (apiData) data = apiData; });

  const openModal = id => { const m = document.getElementById(id); if (m) m.style.display = "flex"; };
  const closeModal = id => { const m = document.getElementById(id); if (m) m.style.display = "none"; };

  const showSuccess = (elId, modalId) => {
    const el = document.getElementById(elId);
    if (!el) { closeModal(modalId); return; }
    el.style.display = "block";
    setTimeout(() => { el.style.display = "none"; closeModal(modalId); }, 1600);
  };

  // ── Close buttons (X + Cancel) ───────────────
  document.querySelectorAll(".btn-close-modal").forEach(btn => {
    btn.addEventListener("click", () => closeModal(btn.dataset.modal));
  });

  // ── Backdrop click ───────────────────────────
  ["modal-vet-profile", "modal-vet-schedule", "modal-vet-service", "modal-vet-team"].forEach(id => {
    document.getElementById(id)?.addEventListener("click", e => {
      if (e.target === document.getElementById(id)) closeModal(id);
    });
  });

  // ────────────────────────────────────────────
  //  1. EDIT PROFILE + GENERAL INFO
  // ────────────────────────────────────────────
  document.getElementById("btn-open-profile")?.addEventListener("click", () => {
    data = getVetData();
    document.getElementById("vp-name").value = data.clinicName;
    document.getElementById("vp-phone").value = data.phone;
    document.getElementById("vp-address").value = data.address;
    document.getElementById("vp-description").value = data.description;
    openModal("modal-vet-profile");
  });

  document.getElementById("btn-save-profile")?.addEventListener("click", async () => {
    data = getVetData();
    data.clinicName = document.getElementById("vp-name").value.trim() || data.clinicName;
    data.phone = document.getElementById("vp-phone").value.trim();
    data.address = document.getElementById("vp-address").value.trim() || data.address;
    data.description = document.getElementById("vp-description").value.trim() || data.description;

    showSavingAlert('Saving clinic profile...');
    const saveResult = await saveProfileToAPI(data);
    closeSavingAlert();
    if (!saveResult?.ok) {
      showActionAlert({ icon: 'error', title: 'Could not save profile', text: saveResult?.error || 'Please try again.' });
      return;
    }

    if (saveResult.business?.business_id) {
      data._business_id = saveResult.business.business_id;
    }
    saveVetData(data);

    // Live DOM update
    const el = id => document.getElementById(id);
    if (el("vet-banner-name")) el("vet-banner-name").textContent = data.clinicName;
    if (el("vet-description")) el("vet-description").textContent = data.description;
    if (el("vet-address")) el("vet-address").textContent = data.address;

    showSuccess("profile-success", "modal-vet-profile");
    showActionAlert({ icon: 'success', title: 'Profile updated', text: 'Your clinic information was saved.' });
  });

  // ────────────────────────────────────────────
  //  2. SCHEDULE
  // ────────────────────────────────────────────
  document.getElementById("btn-open-schedule")?.addEventListener("click", () => {
    data = getVetData();
    data.schedule.forEach((s, i) => {
      const inp = document.querySelector(`.schedule-hours[data-index="${i}"]`);
      const chk = document.querySelector(`.schedule-closed[data-index="${i}"]`);
      if (inp) { inp.value = s.hours; inp.disabled = s.closed; inp.style.background = s.closed ? "#F9FAFB" : ""; inp.style.color = s.closed ? "#9CA3AF" : ""; }
      if (chk) chk.checked = s.closed;
    });
    openModal("modal-vet-schedule");
  });

  document.querySelectorAll(".schedule-closed").forEach(chk => {
    chk.addEventListener("change", () => {
      const inp = document.querySelector(`.schedule-hours[data-index="${chk.dataset.index}"]`);
      if (inp) { inp.disabled = chk.checked; inp.style.background = chk.checked ? "#F9FAFB" : ""; inp.style.color = chk.checked ? "#9CA3AF" : ""; }
    });
  });

  document.getElementById("btn-save-schedule")?.addEventListener("click", async () => {
    data = getVetData();
    data.schedule = data.schedule.map((s, i) => ({
      ...s,
      hours: document.querySelector(`.schedule-hours[data-index="${i}"]`)?.value.trim() || s.hours,
      closed: document.querySelector(`.schedule-closed[data-index="${i}"]`)?.checked ?? s.closed,
    }));

    showSavingAlert('Saving schedule...');
    const saveResult = await saveScheduleToAPI(data);
    closeSavingAlert();
    if (!saveResult?.ok) {
      showActionAlert({ icon: 'error', title: 'Could not save schedule', text: saveResult?.error || 'Please review your hours format.' });
      return;
    }

    saveVetData(data);
    const display = document.getElementById("schedule-display");
    if (display) display.innerHTML = renderScheduleDisplay(data.schedule);
    showSuccess("schedule-success", "modal-vet-schedule");
    showActionAlert({ icon: 'success', title: 'Schedule updated', text: 'Your clinic schedule was saved.' });
  });

  // ────────────────────────────────────────────
  //  3. SERVICES
  // ────────────────────────────────────────────
  document.getElementById("btn-open-service")?.addEventListener("click", () => {
    document.getElementById("svc-edit-id").value = "";
    document.getElementById("svc-name").value = "";
    const titleEl = document.querySelector("#modal-vet-service .modal-title");
    if (titleEl) titleEl.textContent = "Add Service";
    openModal("modal-vet-service");
  });

  document.getElementById("btn-save-service")?.addEventListener("click", () => {
    const editId = document.getElementById("svc-edit-id").value;
    const label = document.getElementById("svc-name").value.trim();
    const bg = document.getElementById("svc-bg").value;
    const icon = document.getElementById("svc-icon").value;
    if (!label) {
      showActionAlert({ icon: 'warning', title: 'Service name required', text: 'Please enter a name before saving.' });
      return;
    }

    data = getVetData();
    if (editId) {
      data.services = data.services.map(s => String(s.id) === editId ? { ...s, label, bg, icon } : s);
    } else {
      data.services.push({ id: Date.now(), label, bg, icon });
    }
    saveVetData(data);
    const grid = document.getElementById("services-grid");
    if (grid) grid.innerHTML = renderServices(data.services);
    _bindServiceEvents();
    closeModal("modal-vet-service");
  });

  _bindServiceEvents();

  // ────────────────────────────────────────────
  //  4. TEAM
  // ────────────────────────────────────────────
  document.getElementById("btn-open-team")?.addEventListener("click", () => {
    ["tm-edit-id", "tm-name", "tm-initials", "tm-role"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    const titleEl = document.querySelector("#modal-vet-team .modal-title");
    if (titleEl) titleEl.textContent = "Add Member";
    openModal("modal-vet-team");
  });

  document.getElementById("btn-save-member")?.addEventListener("click", () => {
    const editId = document.getElementById("tm-edit-id").value;
    const name = document.getElementById("tm-name").value.trim();
    const initials = document.getElementById("tm-initials").value.trim().toUpperCase();
    const role = document.getElementById("tm-role").value.trim();
    const bg = document.getElementById("tm-bg").value;
    if (!name) {
      showActionAlert({ icon: 'warning', title: 'Member name required', text: 'Please enter the team member name.' });
      return;
    }

    data = getVetData();
    if (editId) {
      data.team = data.team.map(m => String(m.id) === editId ? { ...m, name, initials, role, bg } : m);
    } else {
      data.team.push({ id: Date.now(), name, initials: initials || name.slice(0, 2).toUpperCase(), role, bg });
    }
    saveVetData(data);
    const list = document.getElementById("team-list");
    if (list) list.innerHTML = renderTeam(data.team);
    _bindTeamEvents();
    closeModal("modal-vet-team");
  });

  _bindTeamEvents();

  // ────────────────────────────────────────────
  //  Event delegation helpers
  //  Se llaman después de cada re-render de lista
  // ────────────────────────────────────────────
  function _bindServiceEvents() {
    document.querySelectorAll(".btn-delete-service").forEach(btn => {
      // clonar para limpiar listeners viejos
      const fresh = btn.cloneNode(true);
      btn.replaceWith(fresh);
      fresh.addEventListener("click", e => {
        e.stopPropagation();

        const removeService = () => {
          data = getVetData();
          data.services = data.services.filter(s => s.id !== Number(fresh.dataset.id));
          saveVetData(data);
          const grid = document.getElementById("services-grid");
          if (grid) grid.innerHTML = renderServices(data.services);
          _bindServiceEvents();
        };

        if (window.Swal && typeof window.Swal.fire === 'function') {
          window.Swal.fire({
            icon: 'warning',
            title: 'Delete service?',
            text: 'This action cannot be undone.',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc2626'
          }).then(result => {
            if (result.isConfirmed) {
              removeService();
              showActionAlert({ icon: 'success', title: 'Service removed' });
            }
          });
          return;
        }

        removeService();
      });
    });
  }

  function _bindTeamEvents() {
    document.querySelectorAll(".btn-edit-member, .btn-delete-member").forEach(btn => {
      const fresh = btn.cloneNode(true);
      btn.replaceWith(fresh);
    });

    document.querySelectorAll(".btn-edit-member").forEach(btn => {
      btn.addEventListener("click", () => {
        data = getVetData();
        const m = data.team.find(t => String(t.id) === String(btn.dataset.id));
        if (!m) return;
        document.getElementById("tm-edit-id").value = String(m.id);
        document.getElementById("tm-name").value = m.name;
        document.getElementById("tm-initials").value = m.initials;
        document.getElementById("tm-role").value = m.role;
        document.getElementById("tm-bg").value = m.bg;
        const titleEl = document.querySelector("#modal-vet-team .modal-title");
        if (titleEl) titleEl.textContent = "Edit Member";
        openModal("modal-vet-team");
      });
    });

    document.querySelectorAll(".btn-delete-member").forEach(btn => {
      btn.addEventListener("click", () => {
        const removeMember = () => {
          data = getVetData();
          data.team = data.team.filter(m => m.id !== Number(btn.dataset.id));
          saveVetData(data);
          const list = document.getElementById("team-list");
          if (list) list.innerHTML = renderTeam(data.team);
          _bindTeamEvents();
        };

        if (window.Swal && typeof window.Swal.fire === 'function') {
          window.Swal.fire({
            icon: 'warning',
            title: 'Delete team member?',
            text: 'This action cannot be undone.',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc2626'
          }).then(result => {
            if (result.isConfirmed) {
              removeMember();
              showActionAlert({ icon: 'success', title: 'Member removed' });
            }
          });
          return;
        }

        removeMember();
      });
    });
  }
}