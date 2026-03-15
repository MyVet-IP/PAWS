// ─────────────────────────────────────────────
//  pet-profile.js
//  Solo retorna el contenido interno del <main>
//  El Layout ya inyecta Aside + Topbar
// ─────────────────────────────────────────────

export function petProfilepage() {
  const pet = {
    name:      'Max',
    species:   'Dog',
    breed:     'Golden Retriever',
    age:       '3 years',
    weight:    '32 kg',
    gender:    'Male',
    microchip: 'CHIP-2024-00142',
    birthday:  'March 15, 2021',
    color:     'Golden',
    allergies:  ['Chicken', 'Certain antibiotics'],
    conditions: ['Hip dysplasia (mild)']
  };

  const reminders = [
    { title: 'Rabies Booster', date: 'In 12 days',  description: 'Annual mandatory vaccination.', type: 'vaccine',    color: '#FFCFD2', accent: '#dc2626' },
    { title: 'Deworming Pill', date: 'In 3 weeks',  description: 'Monthly treatment reminder.',   type: 'medication', color: '#90BDF4', accent: '#2563eb' },
    { title: 'Dental Checkup', date: 'In 2 months', description: 'Routine dental examination.',   type: 'checkup',    color: '#B9FBC0', accent: '#059669' }
  ];

  const history = [
    { date: 'Jan 20, 2024', title: 'Annual Checkup',         description: 'Comprehensive physical examination. Heart and dental health are excellent. Weight stable.', type: 'checkup',   color: '#F1C0E8' },
    { date: 'Nov 15, 2023', title: 'Dental Cleaning',        description: 'Professional scale and polish. Minor tartar removed. No extractions needed.',               type: 'dental',    color: '#90BDF4' },
    { date: 'Aug 10, 2023', title: 'Vaccination Update',     description: 'DHPP booster administered. No adverse reactions observed.',                                 type: 'vaccine',   color: '#B9FBC0' },
    { date: 'May 22, 2023', title: 'Skin Allergy Treatment', description: 'Treated for seasonal allergies. Prescribed antihistamines for 2 weeks.',                    type: 'treatment', color: '#FFCFD2' }
  ];

  return `
  <div class="font-roboto">

    <!-- ── TOP ACTION BAR ──────────────────── -->
    <div class="flex items-center justify-between mb-6">
      <button onclick="history.back()"
        class="flex items-center gap-2 text-text-highlight hover:opacity-75 transition font-medium font-poppins text-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
      <div class="flex gap-3">
        <button class="px-4 py-2 border border-paws-pink text-text-primary rounded-xl font-poppins font-medium text-sm hover:bg-paws-pink transition">
          Medical Report
        </button>
        <button class="px-4 py-2 bg-text-highlight text-white rounded-xl font-poppins font-medium text-sm hover:opacity-90 transition">
          Schedule Visit
        </button>
      </div>
    </div>

    <!-- ── MAIN GRID ────────────────────────── -->
    <div class="grid lg:grid-cols-3 gap-6">

      <!-- ════════════════════════════════════ -->
      <!--  LEFT COLUMN                         -->
      <!-- ════════════════════════════════════ -->
      <div class="lg:col-span-1 flex flex-col gap-5">

        <!-- ── PET CARD ──────────────────────── -->
        <div class="bg-white rounded-2xl shadow-card overflow-hidden">

          <!-- Avatar centrado — sin banner rosado -->
          <div class="flex flex-col items-center pt-7 pb-4 px-5">

            <!-- Foto / placeholder redondo -->
            <div class="relative mb-3">
              <div id="pet-avatar-wrapper"
                   class="rounded-full overflow-hidden flex items-center justify-center bg-surface-soft"
                   style="width:88px;height:88px;
                          border:3px solid #B9FBC0;
                          box-shadow:0 0 0 5px rgba(185,251,192,0.18);">
                <span style="font-size:2.4rem;">🐕</span>
              </div>
              <!-- Edit badge -->
              <button id="btn-edit-pet"
                class="absolute flex items-center justify-center rounded-full border-2 border-white
                       bg-text-highlight hover:opacity-90 transition"
                style="width:26px;height:26px;bottom:-2px;right:-2px;cursor:pointer;"
                title="Edit pet profile">
                <svg style="width:11px;height:11px;color:white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z"/>
                </svg>
              </button>
            </div>

            <!-- Nombre + estado -->
            <h1 id="pet-display-name" class="text-xl font-bold text-text-primary font-poppins">${pet.name}</h1>
            <p id="pet-display-breed" class="text-text-soft text-sm font-roboto mb-2">${pet.breed}</p>
            <span class="px-3 py-1 rounded-full text-xs font-semibold font-poppins"
                  style="background:rgba(185,251,192,0.35);color:#059669;">
              Healthy
            </span>
          </div>

          <div class="px-5 pb-5">
            <!-- Quick stats -->
            <div class="grid grid-cols-3 gap-2 mb-5">
              ${[
                { id: 'pet-display-age',    value: pet.age,    label: 'Age'    },
                { id: 'pet-display-weight', value: pet.weight, label: 'Weight' },
                { id: 'pet-display-gender', value: pet.gender, label: 'Gender' },
              ].map(s => `
                <div class="text-center p-2 bg-surface-soft rounded-xl">
                  <p id="${s.id}" class="font-bold text-text-primary font-poppins text-sm leading-tight">${s.value}</p>
                  <p class="text-xs text-text-muted mt-0.5">${s.label}</p>
                </div>
              `).join('')}
            </div>

            <!-- Detail rows -->
            <div class="space-y-1">
              ${[
                { id: 'pet-display-species',   label: 'Species',   value: pet.species,   highlight: false },
                { id: 'pet-display-birthday',  label: 'Birthday',  value: pet.birthday,  highlight: false },
                { id: 'pet-display-color',     label: 'Color',     value: pet.color,     highlight: false },
                { id: 'pet-display-microchip', label: 'Microchip', value: pet.microchip, highlight: true  },
              ].map(d => `
                <div class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span class="text-text-muted text-sm">${d.label}</span>
                  <span id="${d.id}" class="font-medium text-sm ${d.highlight ? 'text-text-highlight' : 'text-text-primary'}">
                    ${d.value}
                  </span>
                </div>
              `).join('')}
            </div>

            <!-- Edit button full width -->
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

        <!-- ── HEALTH NOTES ───────────────────── -->
        <div class="bg-white rounded-2xl shadow-card p-5">
          <h3 class="font-bold text-text-primary font-poppins mb-4">Health Notes</h3>

          ${pet.allergies.length > 0 ? `
            <div class="mb-4">
              <p class="text-xs text-text-muted uppercase tracking-wide mb-2 font-poppins">Allergies</p>
              <div class="flex flex-wrap gap-2">
                ${pet.allergies.map(a => `
                  <span class="px-3 py-1 rounded-full text-xs font-medium"
                        style="background:rgba(255,207,210,0.4);color:#be185d;">${a}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${pet.conditions.length > 0 ? `
            <div>
              <p class="text-xs text-text-muted uppercase tracking-wide mb-2 font-poppins">Conditions</p>
              <div class="flex flex-wrap gap-2">
                ${pet.conditions.map(c => `
                  <span class="px-3 py-1 rounded-full text-xs font-medium"
                        style="background:rgba(251,248,204,0.7);color:#92400e;">${c}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

      </div>

      <!-- ════════════════════════════════════ -->
      <!--  RIGHT COLUMN                        -->
      <!-- ════════════════════════════════════ -->
      <div class="lg:col-span-2 flex flex-col gap-6">

        <!-- Health Reminders -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-text-primary font-poppins">Health Reminders</h2>
            <button class="text-text-highlight text-sm font-medium font-poppins hover:underline">View All</button>
          </div>
          <div class="grid sm:grid-cols-3 gap-4">
            ${reminders.map(r => `
              <div class="bg-white rounded-2xl shadow-card p-5 hover:shadow-soft transition"
                   style="border-left:4px solid ${r.color};">
                <p class="text-xs font-semibold uppercase tracking-wide mb-1 font-poppins"
                   style="color:${r.accent};">${r.date}</p>
                <h3 class="font-bold text-text-primary font-poppins mb-1 text-sm">${r.title}</h3>
                <p class="text-text-soft text-xs mb-3">${r.description}</p>
                <button class="font-semibold text-xs font-poppins hover:underline" style="color:${r.accent};">
                  ${r.type === 'vaccine' ? 'Confirm Appointment' : r.type === 'medication' ? 'Add to Calendar' : 'Schedule Now'} →
                </button>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Medical History -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-text-primary font-poppins">Medical History</h2>
            <button class="text-text-highlight text-sm font-medium font-poppins hover:underline">Download Records</button>
          </div>
          <div class="flex flex-col gap-3">
            ${history.map(h => `
              <div class="bg-white rounded-2xl shadow-card p-4 hover:shadow-soft transition">
                <div class="flex items-start gap-3">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-base"
                       style="background:${h.color};">
                    ${h.type === 'checkup' ? '🩺' : h.type === 'dental' ? '🦷' : h.type === 'vaccine' ? '💉' : '💊'}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-2 mb-0.5">
                      <h3 class="font-bold text-text-primary font-poppins text-sm">${h.title}</h3>
                      <span class="text-xs text-text-muted font-poppins shrink-0">${h.date}</span>
                    </div>
                    <p class="text-text-soft text-xs leading-relaxed">${h.description}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="text-center mt-5">
            <button class="px-6 py-2.5 border border-gray-200 text-text-soft rounded-xl font-poppins
                           font-medium text-sm hover:border-text-highlight hover:text-text-highlight transition">
              Load More Records
            </button>
          </div>
        </section>

      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════ -->
  <!--  MODAL: EDIT PET PROFILE                -->
  <!-- ═══════════════════════════════════════ -->
  <div id="modal-edit-pet"
       style="display:none;position:fixed;inset:0;z-index:9999;
              align-items:center;justify-content:center;
              background:rgba(51,51,51,0.50);backdrop-filter:blur(6px);">

    <div class="bg-white rounded-2xl shadow-medium w-full mx-4 overflow-hidden animate-scale-in"
         style="max-width:480px;max-height:90vh;overflow-y:auto;">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 sticky top-0 bg-white"
           style="border-bottom:1px solid #F3F4F6;">
        <div>
          <h2 class="font-bold font-poppins text-text-primary" style="font-size:16px;">Edit Pet Profile</h2>
          <p class="text-text-muted" style="font-size:11px;margin-top:2px;">Update ${pet.name}'s information</p>
        </div>
        <button id="modal-pet-close"
          class="flex items-center justify-center rounded-full transition"
          style="width:34px;height:34px;border:none;cursor:pointer;background:#F3F4F6;color:#6B7280;"
          onmouseenter="this.style.background='#E5E7EB'"
          onmouseleave="this.style.background='#F3F4F6'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <div class="px-6 py-5 flex flex-col gap-4">

        <!-- Two columns: name + species -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">
              Pet name
            </label>
            <input id="pet-edit-name" type="text" placeholder="e.g. Max"
              class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none transition"
              style="padding:9px 12px;font-size:13px;"
              onfocus="this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
              onblur="this.style.borderColor='#E5E7EB';this.style.boxShadow='none'"/>
          </div>
          <div>
            <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">
              Species
            </label>
            <select id="pet-edit-species"
              class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none transition bg-white"
              style="padding:9px 12px;font-size:13px;"
              onfocus="this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
              onblur="this.style.borderColor='#E5E7EB';this.style.boxShadow='none'">
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <!-- breed + color -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">
              Breed
            </label>
            <input id="pet-edit-breed" type="text" placeholder="e.g. Golden Retriever"
              class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none transition"
              style="padding:9px 12px;font-size:13px;"
              onfocus="this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
              onblur="this.style.borderColor='#E5E7EB';this.style.boxShadow='none'"/>
          </div>
          <div>
            <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">
              Color
            </label>
            <input id="pet-edit-color" type="text" placeholder="e.g. Golden"
              class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none transition"
              style="padding:9px 12px;font-size:13px;"
              onfocus="this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
              onblur="this.style.borderColor='#E5E7EB';this.style.boxShadow='none'"/>
          </div>
        </div>

        <!-- age + weight -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">
              Age
            </label>
            <input id="pet-edit-age" type="text" placeholder="e.g. 3 years"
              class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none transition"
              style="padding:9px 12px;font-size:13px;"
              onfocus="this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
              onblur="this.style.borderColor='#E5E7EB';this.style.boxShadow='none'"/>
          </div>
          <div>
            <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">
              Weight
            </label>
            <input id="pet-edit-weight" type="text" placeholder="e.g. 32 kg"
              class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none transition"
              style="padding:9px 12px;font-size:13px;"
              onfocus="this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
              onblur="this.style.borderColor='#E5E7EB';this.style.boxShadow='none'"/>
          </div>
        </div>

        <!-- gender + birthday -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">
              Gender
            </label>
            <select id="pet-edit-gender"
              class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none transition bg-white"
              style="padding:9px 12px;font-size:13px;"
              onfocus="this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
              onblur="this.style.borderColor='#E5E7EB';this.style.boxShadow='none'">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">
              Birthday
            </label>
            <input id="pet-edit-birthday" type="text" placeholder="e.g. March 15, 2021"
              class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none transition"
              style="padding:9px 12px;font-size:13px;"
              onfocus="this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
              onblur="this.style.borderColor='#E5E7EB';this.style.boxShadow='none'"/>
          </div>
        </div>

        <!-- microchip — full width -->
        <div>
          <label class="block font-semibold font-poppins mb-1.5 text-text-soft" style="font-size:11px;">
            Microchip ID
          </label>
          <input id="pet-edit-microchip" type="text" placeholder="e.g. CHIP-2024-00142"
            class="w-full border border-gray-200 rounded-xl font-roboto text-text-primary outline-none transition"
            style="padding:9px 12px;font-size:13px;"
            onfocus="this.style.borderColor='#6A4C93';this.style.boxShadow='0 0 0 3px rgba(106,76,147,0.15)'"
            onblur="this.style.borderColor='#E5E7EB';this.style.boxShadow='none'"/>
        </div>

        <!-- Divider -->
        <div style="height:1px;background:#F3F4F6;margin:2px 0;"></div>

        <!-- Buttons -->
        <div class="flex gap-3">
          <button id="btn-pet-cancel"
            class="flex-1 py-2.5 border-2 border-gray-200 text-text-soft rounded-xl font-poppins
                   font-semibold text-sm hover:border-gray-300 transition">
            Cancel
          </button>
          <button id="btn-pet-save"
            class="flex-1 py-2.5 bg-text-highlight text-white rounded-xl font-poppins
                   font-semibold text-sm hover:opacity-90 transition">
            Save changes
          </button>
        </div>

        <!-- Success -->
        <div id="pet-edit-success"
             class="text-center font-semibold font-poppins rounded-xl bg-paws-green text-text-primary"
             style="display:none;padding:10px;font-size:13px;">
          ✅ Pet profile updated!
        </div>

      </div>
    </div>
  </div>
  `;
}

// ─────────────────────────────────────────────
//  petProfileEvents — registra listeners
//  Llámalo desde el router
// ─────────────────────────────────────────────
export function petProfileEvents() {
  const modal    = document.getElementById("modal-edit-pet");
  const closeBtn = document.getElementById("modal-pet-close");
  const cancelBtn= document.getElementById("btn-pet-cancel");
  const saveBtn  = document.getElementById("btn-pet-save");
  const success  = document.getElementById("pet-edit-success");

  // Botones que abren el modal
  ["btn-edit-pet", "btn-edit-pet-full"].forEach(id => {
    document.getElementById(id)?.addEventListener("click", () => {
      _fillPetModal();
      if (modal) modal.style.display = "flex";
    });
  });

  // Cerrar — X y Cancel
  const closeModal = () => { if (modal) modal.style.display = "none"; };
  closeBtn?.addEventListener("click",  closeModal);
  cancelBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  // Guardar
  saveBtn?.addEventListener("click", () => {
    _applyPetChanges();
    if (success) {
      success.style.display = "block";
      setTimeout(() => {
        success.style.display = "none";
        closeModal();
      }, 1600);
    }
  });
}

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

/** Rellena el modal con los valores actuales mostrados en la card */
function _fillPetModal() {
  const map = {
    "pet-edit-name":      "pet-display-name",
    "pet-edit-breed":     "pet-display-breed",
    "pet-edit-age":       "pet-display-age",
    "pet-edit-weight":    "pet-display-weight",
    "pet-edit-gender":    "pet-display-gender",
    "pet-edit-color":     "pet-display-color",
    "pet-edit-birthday":  "pet-display-birthday",
    "pet-edit-microchip": "pet-display-microchip",
  };

  Object.entries(map).forEach(([inputId, displayId]) => {
    const input   = document.getElementById(inputId);
    const display = document.getElementById(displayId);
    if (input && display) input.value = display.textContent.trim();
  });

  // Sincronizar selects
  const speciesInput = document.getElementById("pet-edit-species");
  // No hay display id para species — lo dejamos como está

  const genderInput  = document.getElementById("pet-edit-gender");
  const genderDisplay= document.getElementById("pet-display-gender");
  if (genderInput && genderDisplay) genderInput.value = genderDisplay.textContent.trim();
}

/** Aplica los valores del modal a los elementos de la card */
function _applyPetChanges() {
  const map = {
    "pet-edit-name":      "pet-display-name",
    "pet-edit-breed":     "pet-display-breed",
    "pet-edit-age":       "pet-display-age",
    "pet-edit-weight":    "pet-display-weight",
    "pet-edit-gender":    "pet-display-gender",
    "pet-edit-color":     "pet-display-color",
    "pet-edit-birthday":  "pet-display-birthday",
    "pet-edit-microchip": "pet-display-microchip",
  };

  Object.entries(map).forEach(([inputId, displayId]) => {
    const input   = document.getElementById(inputId);
    const display = document.getElementById(displayId);
    if (input && display && input.value.trim()) {
      display.textContent = input.value.trim();
    }
  });
}