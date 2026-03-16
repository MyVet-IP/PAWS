//  pet-profile.js

// ── Helpers ──────────────────────────────────────────────────
function calcAge(birthDate) {
  if (!birthDate) return '—';
  const years = Math.floor((Date.now() - new Date(birthDate)) / (1000 * 60 * 60 * 24 * 365.25));
  return years === 1 ? '1 year' : `${years} years`;
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const VISIT_META = {
  Checkup: { bg: '#F1C0E8', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 3H7a2 2 0 00-2 2v4a6 6 0 006 6 6 6 0 006-6V5a2 2 0 00-2-2h-2M9 3V1m6 2V1m-3 16v3m0 0a2 2 0 100 4 2 2 0 000-4z"/></svg>' },
  Vaccination: { bg: '#B9FBC0', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.5 4.5l-15 15M16 3l5 5-1.5 1.5M12 7l4 4M5 15l-2 4 4-2M9 11l4 4"/></svg>' },
  Surgery: { bg: '#FFCFD2', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 3l2 4-5 9h14L15 7l2-4M5 20h14M12 3v4"/></svg>' },
  Dental: { bg: '#90BDF4', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3c-2.5 0-5 2-5 5 0 2 .5 3 1 5 .5 2 1 5 2 8h1c.5-2 1-4 1-5s.5 3 1 5h1c1-3 1.5-6 2-8 .5-2 1-3 1-5 0-3-2.5-5-5-5z"/></svg>' },
  Deworming: { bg: '#FBF8CC', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.5 6.5l7 7a5 5 0 01-7-7zm0 0a5 5 0 00-7 7l7-7zM8 12l4 4"/></svg>' },
  Emergency: { bg: '#FFCFD2', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>' },
  'Follow-up': { bg: '#B9FBC0', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>' },
  Grooming: { bg: '#90BDF4', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 9a3 3 0 100-6 3 3 0 000 6zm0 0l12 6M6 9l6 3M18 15a3 3 0 100 6 3 3 0 000-6zm0 0L6 9"/></svg>' },
  Other: { bg: '#F3F4F6', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>' },
};

const SPECIES_EMOJI = { Dog: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.5 3.5c-1 0-2 .4-2.7 1.1L5 6.5H3a1 1 0 00-1 1v2a1 1 0 001 1h.5l1 7h11l1-7h.5a1 1 0 001-1v-2a1 1 0 00-1-1h-2l-1.8-1.9A3.8 3.8 0 0014.5 3.5h-5z"/></svg>', Cat: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 4l2 3.5M20 4l-2 3.5M8 7.5C8 6 9 5 12 5s4 1 4 2.5v1c0 4-2 7-4 8-2-1-4-4-4-8v-1z"/></svg>', Bird: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20 4c-2 0-4 1-5 3H8a4 4 0 000 8h1l1 3h2l1-3h3c2.2 0 4-1.8 4-4V4zM8 11a1 1 0 110-2 1 1 0 010 2z"/></svg>', Rabbit: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 3c0 3-2 4-2 7a6 6 0 0012 0c0-3-2-4-2-7M9 17c0 1.5.5 3 3 3s3-1.5 3-3"/></svg>' };

// ── Page skeleton ─────────────────────────────────────────────
export function petProfilepage({ pet_id } = {}) {
  return `
  <div class="font-roboto" id="pet-profile-root" data-pet-id="${pet_id || ''}">

    <!-- Top bar -->
    <div class="flex items-center justify-between mb-6">
      <button onclick="window.history.back()"
        class="flex items-center gap-2 text-text-highlight hover:opacity-75 transition font-medium font-poppins text-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
      <button id="btn-schedule-visit"
        class="px-4 py-2 bg-text-highlight text-white rounded-xl font-poppins font-medium text-sm hover:opacity-90 transition">
        Schedule Visit
      </button>
    </div>

    <!-- Loading -->
    <div id="pet-profile-loading" class="flex items-center justify-center py-20 text-text-muted font-poppins text-sm gap-2">
      <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      Loading pet profile...
    </div>

    <!-- Content grid (hidden until data arrives) -->
    <div id="pet-profile-content" class="grid lg:grid-cols-3 gap-6" style="display:none">

      <!-- ═══ LEFT ══════════════════════════════ -->
      <div class="lg:col-span-1 flex flex-col gap-5">

        <!-- Pet card -->
        <div class="bg-white rounded-2xl shadow-card overflow-hidden">
          <div class="flex flex-col items-center pt-7 pb-4 px-5">
            <div class="relative mb-3">
              <div class="rounded-full overflow-hidden flex items-center justify-center bg-surface-soft"
                   style="width:88px;height:88px;border:3px solid #B9FBC0;box-shadow:0 0 0 5px rgba(185,251,192,0.18);">
                <span id="pet-avatar-emoji" style="font-size:2.4rem;"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z"/></svg></span>
              </div>
              <button id="btn-edit-pet"
                class="absolute flex items-center justify-center rounded-full border-2 border-white bg-text-highlight hover:opacity-90 transition"
                style="width:26px;height:26px;bottom:-2px;right:-2px;cursor:pointer;" title="Edit pet">
                <svg style="width:11px;height:11px;color:white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z"/>
                </svg>
              </button>
            </div>
            <h1 id="pet-display-name" class="text-xl font-bold text-text-primary font-poppins">—</h1>
            <p id="pet-display-breed" class="text-text-soft text-sm font-roboto mb-2">—</p>
            <span class="px-3 py-1 rounded-full text-xs font-semibold font-poppins"
                  style="background:rgba(185,251,192,0.35);color:#059669;">Healthy</span>
          </div>

          <div class="px-5 pb-5">
            <!-- Quick stats -->
            <div class="grid grid-cols-3 gap-2 mb-5">
              <div class="text-center p-2 bg-surface-soft rounded-xl">
                <p id="pet-display-age" class="font-bold text-text-primary font-poppins text-sm">—</p>
                <p class="text-xs text-text-muted mt-0.5">Age</p>
              </div>
              <div class="text-center p-2 bg-surface-soft rounded-xl">
                <p id="pet-display-weight" class="font-bold text-text-primary font-poppins text-sm">—</p>
                <p class="text-xs text-text-muted mt-0.5">Weight</p>
              </div>
              <div class="text-center p-2 bg-surface-soft rounded-xl">
                <p id="pet-display-species" class="font-bold text-text-primary font-poppins text-sm">—</p>
                <p class="text-xs text-text-muted mt-0.5">Species</p>
              </div>
            </div>

            <!-- Detail rows -->
            <div class="space-y-1">
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-text-muted text-sm">Birthday</span>
                <span id="pet-display-birthday" class="font-medium text-sm text-text-primary">—</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-text-muted text-sm">Owner</span>
                <span id="pet-display-owner" class="font-medium text-sm text-text-primary">—</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-text-muted text-sm">Pet ID</span>
                <span id="pet-display-id" class="font-medium text-sm text-text-highlight">—</span>
              </div>
            </div>

            <button id="btn-edit-pet-full"
              class="w-full mt-5 py-2.5 border-2 border-text-highlight text-text-highlight rounded-xl
                     font-poppins font-semibold text-sm hover:bg-text-highlight hover:text-white transition flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z"/>
              </svg>
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Notes pulled from most recent record -->
        <div id="pet-health-notes" class="bg-white rounded-2xl shadow-card p-5" style="display:none">
          <h3 class="font-bold text-text-primary font-poppins mb-3">Latest Notes</h3>
          <p id="pet-health-notes-text" class="text-text-soft text-sm leading-relaxed"></p>
        </div>
      </div>

      <!-- ═══ RIGHT ═════════════════════════════ -->
      <div class="lg:col-span-2 flex flex-col gap-6">

        <!-- Upcoming appointments -->
        <section id="section-reminders" style="display:none">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-text-primary font-poppins">Upcoming Appointments</h2>
            <a href="#/appointments" class="text-text-highlight text-sm font-medium font-poppins hover:underline">View All</a>
          </div>
          <div id="reminders-container" class="grid sm:grid-cols-3 gap-4"></div>
        </section>

        <!-- Medical history -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-text-primary font-poppins">Medical History</h2>
            <a href="#/medical-records" class="text-text-highlight text-sm font-medium font-poppins hover:underline">View All</a>
          </div>
          <div id="history-container" class="flex flex-col gap-3">
            <p class="text-text-muted text-sm text-center py-10">No medical records yet.</p>
          </div>
        </section>
      </div>
    </div>

    <!-- ═══ EDIT MODAL ═════════════════════════════════════ -->
    <div id="modal-edit-pet"
         style="display:none;position:fixed;inset:0;z-index:9999;align-items:center;justify-content:center;
                background:rgba(51,51,51,0.50);backdrop-filter:blur(6px);">
      <div class="bg-white rounded-2xl shadow-medium w-full mx-4"
           style="max-width:480px;max-height:90vh;overflow-y:auto;">
        <div class="flex items-center justify-between px-6 py-5 sticky top-0 bg-white"
             style="border-bottom:1px solid #F3F4F6;">
          <h2 class="font-bold font-poppins text-text-primary" style="font-size:16px;">Edit Pet Profile</h2>
          <button id="modal-pet-close"
            style="width:34px;height:34px;border:none;cursor:pointer;background:#F3F4F6;border-radius:50%;"
            onmouseenter="this.style.background='#E5E7EB'" onmouseleave="this.style.background='#F3F4F6'">
            <svg class="w-4 h-4 m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="px-6 py-5 flex flex-col gap-4">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">Name</label>
              <input id="pet-edit-name" type="text" placeholder="e.g. Max"
                class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none"
                style="padding:9px 12px;font-size:13px;"
                onfocus="this.style.borderColor='#6A4C93'" onblur="this.style.borderColor='#E5E7EB'"/>
            </div>
            <div>
              <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">Breed</label>
              <input id="pet-edit-breed" type="text" placeholder="e.g. Golden Retriever"
                class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none"
                style="padding:9px 12px;font-size:13px;"
                onfocus="this.style.borderColor='#6A4C93'" onblur="this.style.borderColor='#E5E7EB'"/>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">Weight (kg)</label>
              <input id="pet-edit-weight" type="number" step="0.1" placeholder="e.g. 32"
                class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none"
                style="padding:9px 12px;font-size:13px;"
                onfocus="this.style.borderColor='#6A4C93'" onblur="this.style.borderColor='#E5E7EB'"/>
            </div>
            <div>
              <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">Birth date</label>
              <input id="pet-edit-birthday" type="date"
                class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none"
                style="padding:9px 12px;font-size:13px;"
                onfocus="this.style.borderColor='#6A4C93'" onblur="this.style.borderColor='#E5E7EB'"/>
            </div>
          </div>
          <div class="flex gap-3 mt-2">
            <button id="btn-pet-cancel"
              class="flex-1 py-2.5 border-2 border-gray-200 text-text-soft rounded-xl font-poppins font-semibold text-sm hover:border-gray-300 transition">
              Cancel
            </button>
            <button id="btn-pet-save"
              class="flex-1 py-2.5 bg-text-highlight text-white rounded-xl font-poppins font-semibold text-sm hover:opacity-90 transition">
              Save changes
            </button>
          </div>
          <div id="pet-edit-success"
               class="text-center font-semibold font-poppins rounded-xl bg-paws-green text-text-primary"
               style="display:none;padding:10px;font-size:13px;">
            <svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Pet profile updated!
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ── Events — all data comes from the API ──────────────────────
export async function petProfileEvents(petId) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  const root = document.getElementById('pet-profile-root');
  const id = petId || parseInt(root?.dataset.petId) || null;

  // Schedule visit button
  document.getElementById('btn-schedule-visit')?.addEventListener('click', () => {
    window.location.hash = id ? `/appointments?pet_id=${id}` : '/appointments';
  });

  await _loadProfile(id, user);
  _initEditModal();
}

async function _loadProfile(petId, user) {
  const loading = document.getElementById('pet-profile-loading');
  try {
    let pet;

    if (petId) {
      const res = await fetch(`/api/pets/${petId}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Pet not found');
      pet = await res.json();
    } else {
      const res = await fetch(`/api/pets/user/${user.user_id}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Could not load pets');
      const pets = await res.json();
      if (!pets.length) { loading.textContent = 'No pets registered yet.'; return; }
      pet = pets[0];
    }

    // Parallel fetch: records + upcoming appointments
    const [recRes, aptRes] = await Promise.all([
      fetch(`/api/medical-records/pet/${pet.pet_id}`, { credentials: 'include' }),
      fetch(`/api/users/${user.user_id}/appointments?status=pending`, { credentials: 'include' })
    ]);

    const records = recRes.ok ? await recRes.json() : [];
    const allApts = aptRes.ok ? await aptRes.json() : [];
    const petApts = allApts.filter(a => a.pet_id === pet.pet_id).slice(0, 3);

    _renderPet(pet);
    _renderHistory(records);
    _renderReminders(petApts);

    // Show latest notes if any
    const latestWithNotes = records.find(r => r.notes);
    if (latestWithNotes) {
      document.getElementById('pet-health-notes').style.display = '';
      document.getElementById('pet-health-notes-text').textContent = latestWithNotes.notes;
    }

    loading.style.display = 'none';
    document.getElementById('pet-profile-content').style.display = '';
    document.getElementById('pet-profile-root').dataset.petId = pet.pet_id;

  } catch (err) {
    console.error('Pet profile error:', err);
    loading.textContent = 'Could not load pet profile. Please try again.';
  }
}

function _renderPet(pet) {
  const species = pet.species_name || pet.animal_type_name || '—';
  document.getElementById('pet-avatar-emoji').textContent = SPECIES_EMOJI[species] || '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z"/></svg>';
  document.getElementById('pet-display-name').textContent = pet.name || '—';
  document.getElementById('pet-display-breed').textContent = pet.breed || '—';
  document.getElementById('pet-display-age').textContent = calcAge(pet.birth_date);
  document.getElementById('pet-display-weight').textContent = pet.weight_kg ? `${pet.weight_kg} kg` : '—';
  document.getElementById('pet-display-species').textContent = species;
  document.getElementById('pet-display-birthday').textContent = fmtDate(pet.birth_date);
  document.getElementById('pet-display-owner').textContent = pet.owner_name || '—';
  document.getElementById('pet-display-id').textContent = `#${pet.pet_id}`;
}

function _renderHistory(records) {
  const c = document.getElementById('history-container');
  if (!records.length) return;
  c.innerHTML = records.map(r => {
    const m = VISIT_META[r.visit_type] || VISIT_META.Other;
    return `
      <div class="bg-white rounded-2xl shadow-card p-4 hover:shadow-soft transition">
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
               style="background:${m.bg};">${m.icon}</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-0.5">
              <h3 class="font-bold text-text-primary font-poppins text-sm">${r.visit_type}</h3>
              <span class="text-xs text-text-muted shrink-0">${fmtDate(r.visit_date)}</span>
            </div>
            ${r.veterinarian ? `<p class="text-xs text-text-muted mb-0.5">Dr. ${r.veterinarian}${r.clinic_name ? ' · ' + r.clinic_name : ''}</p>` : ''}
            ${r.diagnosis ? `<p class="text-text-soft text-xs leading-relaxed">${r.diagnosis}</p>` : (r.reason ? `<p class="text-text-soft text-xs leading-relaxed">${r.reason}</p>` : '')}
          </div>
        </div>
      </div>`;
  }).join('');
}

function _renderReminders(appointments) {
  if (!appointments.length) return;
  document.getElementById('section-reminders').style.display = '';
  const COLORS = [
    { bg: '#FFCFD2', fg: '#dc2626' },
    { bg: '#90BDF4', fg: '#2563eb' },
    { bg: '#B9FBC0', fg: '#059669' },
  ];
  document.getElementById('reminders-container').innerHTML = appointments.map((a, i) => {
    const c = COLORS[i % 3];
    return `
      <div class="bg-white rounded-2xl shadow-card p-5 hover:shadow-soft transition"
           style="border-left:4px solid ${c.bg};">
        <p class="text-xs font-semibold uppercase tracking-wide mb-1 font-poppins" style="color:${c.fg};">
          ${fmtDate(a.date)}${a.time ? ' · ' + a.time : ''}
        </p>
        <h3 class="font-bold text-text-primary font-poppins mb-1 text-sm">${a.business_name || 'Appointment'}</h3>
        <p class="text-text-soft text-xs mb-2">${a.notes || ''}</p>
        <span class="text-xs font-medium px-2 py-0.5 rounded-full"
              style="background:${c.bg};color:${c.fg};">${a.status}</span>
      </div>`;
  }).join('');
}

function _initEditModal() {
  const modal = document.getElementById('modal-edit-pet');
  const close = () => { modal.style.display = 'none'; };

  const open = () => {
    document.getElementById('pet-edit-name').value = document.getElementById('pet-display-name')?.textContent.trim() || '';
    document.getElementById('pet-edit-breed').value = document.getElementById('pet-display-breed')?.textContent.trim() || '';
    const w = document.getElementById('pet-display-weight')?.textContent.replace(' kg', '').trim();
    document.getElementById('pet-edit-weight').value = w !== '—' ? w : '';
    modal.style.display = 'flex';
  };

  ['btn-edit-pet', 'btn-edit-pet-full'].forEach(id => document.getElementById(id)?.addEventListener('click', open));
  document.getElementById('modal-pet-close')?.addEventListener('click', close);
  document.getElementById('btn-pet-cancel')?.addEventListener('click', close);
  modal?.addEventListener('click', e => { if (e.target === modal) close(); });

  document.getElementById('btn-pet-save')?.addEventListener('click', async () => {
    const petId = parseInt(document.getElementById('pet-profile-root').dataset.petId);
    if (!petId) return;

    const body = {};
    const name = document.getElementById('pet-edit-name').value.trim();
    const breed = document.getElementById('pet-edit-breed').value.trim();
    const weight = document.getElementById('pet-edit-weight').value.trim();
    const bday = document.getElementById('pet-edit-birthday').value;
    if (name) body.name = name;
    if (breed) body.breed = breed;
    if (weight) body.weight_kg = parseFloat(weight);
    if (bday) body.birth_date = bday;
    if (!Object.keys(body).length) { close(); return; }

    try {
      const res = await fetch(`/api/pets/${petId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      });
      if (res.ok) {
        const updated = await res.json();
        _renderPet(updated);
        const s = document.getElementById('pet-edit-success');
        s.style.display = 'block';
        setTimeout(() => { s.style.display = 'none'; close(); }, 1600);
      } else {
        alert('Failed to update pet profile.');
      }
    } catch { alert('Connection error. Please try again.'); }
  });
}