// ─────────────────────────────────────────────
//  emergency.js
//  Vista de emergencias — paleta roja/naranja
//  Funciona tanto para guests (con navbar)
//  como para users logueados (dentro del Layout)
// ─────────────────────────────────────────────

export function emergencyPage() {
  return `
  <div class="font-roboto" style="min-height:100%;">

    <!-- ── HERO BANNER ──────────────────────── -->
    <div class="relative rounded-2xl overflow-hidden mb-6"
         style="background:linear-gradient(135deg,#dc2626 0%,#ea580c 60%,#f97316 100%);">

      <!-- Decorative circles -->
      <div class="absolute pointer-events-none" style="
        width:220px;height:220px;border-radius:50%;
        background:rgba(255,255,255,0.07);
        top:-60px;right:-40px;"></div>
      <div class="absolute pointer-events-none" style="
        width:140px;height:140px;border-radius:50%;
        background:rgba(255,255,255,0.06);
        bottom:-30px;left:60px;"></div>

      <div class="relative z-10 px-8 py-8 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <!-- Pulse icon -->
          <div class="relative flex-shrink-0">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center"
                 style="background:rgba(255,255,255,0.20);">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <!-- Ping animation -->
            <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white animate-ping opacity-75"></span>
            <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white"></span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white font-poppins leading-tight">24/7 Emergencies</h1>
            <p class="text-sm mt-0.5" style="color:rgba(255,255,255,0.80);">
              Urgent veterinary care when you need it most
            </p>
          </div>
        </div>

        <!-- Live indicator -->
        <div class="flex items-center gap-2 px-4 py-2 rounded-full"
             style="background:rgba(255,255,255,0.15);">
          <span class="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
          <span class="text-white font-semibold font-poppins text-sm">Available now</span>
        </div>
      </div>
    </div>

    <!-- ── URGENCY SELECTOR ──────────────────── -->
    <div class="bg-white rounded-2xl shadow-card p-6 mb-6">
      <h2 class="text-lg font-bold text-text-primary font-poppins mb-1">
        How urgent is the situation?
      </h2>
      <p class="text-text-muted text-sm mb-5">Select the level that best describes your pet's condition</p>

      <div class="flex flex-col gap-3" id="urgencyOptions">

        <!-- CRITICAL -->
        <label class="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition group"
               style="border:2px solid #FECACA; background:#FEF2F2;"
               onmouseenter="this.style.borderColor='#dc2626'"
               onmouseleave="this.style.borderColor=document.querySelector('input[name=urgency][value=10]').checked?'#dc2626':'#FECACA'">
          <input type="radio" name="urgency" value="10" class="mt-1 flex-shrink-0"
                 style="width:18px;height:18px;accent-color:#dc2626;"
                 onchange="document.querySelectorAll('.urgency-label').forEach(l=>l.style.borderColor='');
                           this.closest('label').style.borderColor='#dc2626'"/>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0"></span>
              <p class="font-bold text-text-primary font-poppins text-sm">
                Critical — Bleeding / Unresponsive / Seizures
              </p>
              <span class="ml-auto text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style="background:#dc2626;color:white;">URGENT</span>
            </div>
            <p class="text-xs text-text-muted">Go to emergency immediately. Life or death situation.</p>
          </div>
        </label>

        <!-- URGENT -->
        <label class="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition urgency-label"
               style="border:2px solid #FED7AA; background:#FFF7ED;"
               onmouseenter="this.style.borderColor='#ea580c'"
               onmouseleave="this.style.borderColor=document.querySelector('input[name=urgency][value=5]').checked?'#ea580c':'#FED7AA'">
          <input type="radio" name="urgency" value="5" class="mt-1 flex-shrink-0"
                 style="width:18px;height:18px;accent-color:#ea580c;"
                 onchange="document.querySelectorAll('label[onmouseenter]').forEach(l=>l.style.borderColor=l.querySelector('input')?.checked?'':''); this.closest('label').style.borderColor='#ea580c'"/>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:#ea580c;"></span>
              <p class="font-bold text-text-primary font-poppins text-sm">
                Urgent — Vomiting / Diarrhea / Moderate pain
              </p>
              <span class="ml-auto text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style="background:#ea580c;color:white;">SAME DAY</span>
            </div>
            <p class="text-xs text-text-muted">Requires same-day attention. Cannot wait.</p>
          </div>
        </label>

        <!-- CONSULTATION -->
        <label class="flex items-start gap-4 p-4 rounded-xl cursor-pointer transition urgency-label"
               style="border:2px solid #BBF7D0; background:#F0FDF4;"
               onmouseenter="this.style.borderColor='#16a34a'"
               onmouseleave="this.style.borderColor=document.querySelector('input[name=urgency][value=2]').checked?'#16a34a':'#BBF7D0'">
          <input type="radio" name="urgency" value="2" class="mt-1 flex-shrink-0"
                 style="width:18px;height:18px;accent-color:#16a34a;"
                 onchange="this.closest('label').style.borderColor='#16a34a'"/>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"></span>
              <p class="font-bold text-text-primary font-poppins text-sm">
                Consultation — Check-up / Vaccines / Examination
              </p>
              <span class="ml-auto text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style="background:#16a34a;color:white;">SCHEDULE</span>
            </div>
            <p class="text-xs text-text-muted">Can be scheduled. Not urgent.</p>
          </div>
        </label>

      </div>

      <!-- Find button -->
      <button id="btn-find-emergency"
        class="w-full mt-5 font-bold py-3.5 rounded-xl font-poppins text-sm transition flex items-center justify-center gap-2"
        style="background:linear-gradient(135deg,#dc2626,#ea580c);color:white;"
        onmouseenter="this.style.opacity='0.90'"
        onmouseleave="this.style.opacity='1'">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        Find Emergency Clinics Now
      </button>
    </div>

    <!-- ── CLINICS LIST ──────────────────────── -->
    <div id="emergencyClinicsContainer" class="hidden mb-6">
      <div class="flex items-center gap-3 mb-4">
        <h2 class="text-lg font-bold text-text-primary font-poppins">24/7 Clinics Available</h2>
        <span id="clinics-count" class="text-xs font-bold px-2.5 py-1 rounded-full"
              style="background:#FEF2F2;color:#dc2626;"></span>
      </div>
      <div id="clinicsList" class="grid md:grid-cols-2 gap-4"></div>
    </div>

    <!-- ── WHILE YOU GET THERE ──────────────── -->
    <div class="rounded-2xl p-6 mb-2"
         style="background:linear-gradient(135deg,#FEF2F2,#FFF7ED);">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
             style="background:linear-gradient(135deg,#dc2626,#ea580c);">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-base font-bold text-text-primary font-poppins">While you get to the clinic</h3>
      </div>

      <div class="grid sm:grid-cols-2 gap-3">
        ${[
          { icon: "🐾", tip: "Keep your pet calm and in a safe, warm place" },
          { icon: "📞", tip: "Call ahead so the clinic will be ready for you" },
          { icon: "📋", tip: "Bring medical history and vaccination records" },
          { icon: "🚫", tip: "Do not give food or water until the vet says so" },
        ].map(t => `
          <div class="flex items-start gap-3 p-3 bg-white rounded-xl shadow-card">
            <span class="text-lg flex-shrink-0">${t.icon}</span>
            <p class="text-text-soft text-xs leading-relaxed">${t.tip}</p>
          </div>
        `).join('')}
      </div>
    </div>

  </div>
  `;
}

// ─────────────────────────────────────────────
//  emergencyEvents
// ─────────────────────────────────────────────
export async function emergencyEvents() {
  const btnFind    = document.getElementById('btn-find-emergency');
  const container  = document.getElementById('emergencyClinicsContainer');
  const clinicsList= document.getElementById('clinicsList');
  const countEl    = document.getElementById('clinics-count');

  if (!btnFind) return;

  btnFind.addEventListener('click', async () => {
    const selected = document.querySelector('input[name="urgency"]:checked');

    if (!selected) {
      // Visual shake instead of alert
      btnFind.style.animation = 'none';
      btnFind.style.outline   = '3px solid #fca5a5';
      setTimeout(() => { btnFind.style.outline = 'none'; }, 1200);

      // Show inline message
      let msg = document.getElementById('urgency-error');
      if (!msg) {
        msg = document.createElement('p');
        msg.id = 'urgency-error';
        msg.className = 'text-center text-sm font-medium font-poppins mt-3';
        msg.style.color = '#dc2626';
        msg.textContent = '⚠️ Please select the urgency level first';
        btnFind.parentNode.insertBefore(msg, btnFind.nextSibling);
      }
      setTimeout(() => msg?.remove(), 2500);
      return;
    }

    // Remove error if present
    document.getElementById('urgency-error')?.remove();

    // Show loading state
    btnFind.disabled = true;
    btnFind.innerHTML = `
      <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      Searching clinics...`;

    if (container) {
      container.classList.remove('hidden');
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    try {
      const response = await fetch('/api/veterinarias');
      const clinics  = await response.json();

      const emergencyClinics = clinics.filter(c =>
        c.servicios_emergencia || c.servicios?.includes('Emergencias 24/7')
      );

      if (countEl) countEl.textContent = `${emergencyClinics.length} found`;

      if (emergencyClinics.length === 0) {
        clinicsList.innerHTML = `
          <div class="col-span-2 text-center py-10">
            <p class="text-4xl mb-3">🏥</p>
            <p class="text-text-muted font-poppins font-medium">No emergency clinics found at this time.</p>
            <p class="text-text-muted text-sm mt-1">Try calling 123 for veterinary emergencies.</p>
          </div>`;
        return;
      }

      clinicsList.innerHTML = emergencyClinics.map(clinic => `
        <div class="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-soft transition"
             style="border-left:4px solid #dc2626;">
          <div class="p-5">
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-bold text-text-primary font-poppins">${clinic.nombre}</h3>
              <span class="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ml-2"
                    style="background:#dc2626;color:white;">24/7</span>
            </div>
            <p class="text-text-muted text-sm mb-4 flex items-start gap-2">
              <svg class="w-4 h-4 flex-shrink-0 mt-0.5" style="color:#ea580c;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              ${clinic.direccion || 'Address not available'}
            </p>
            <div class="flex gap-2">
              ${clinic.telefono ? `
                <a href="tel:${clinic.telefono}"
                   class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-poppins font-semibold text-sm text-white transition"
                   style="background:#dc2626;"
                   onmouseenter="this.style.background='#b91c1c'"
                   onmouseleave="this.style.background='#dc2626'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Call Now
                </a>` : ''}
              <button onclick="window.location.hash='#/clinics'"
                class="flex-1 py-2 rounded-xl font-poppins font-semibold text-sm transition"
                style="border:2px solid #FCA5A5;color:#dc2626;"
                onmouseenter="this.style.background='#FEF2F2'"
                onmouseleave="this.style.background='transparent'">
                View Details
              </button>
            </div>
            ${clinic.whatsapp ? `
            <a href="https://api.whatsapp.com/send/?phone=%2B${clinic.whatsapp}&text=Hola%20tengo%20una%20emergencia%20con%20mi%20mascota&type=phone_number"
               target="_blank"
               class="mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-xl font-poppins font-semibold text-sm text-white transition"
               style="background:#16a34a;"
               onmouseenter="this.style.background='#15803d'"
               onmouseleave="this.style.background='#16a34a'">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>` : ''}
          </div>
        </div>
      `).join('');

    } catch (error) {
      console.error('Error loading emergency clinics:', error);
      clinicsList.innerHTML = `
        <div class="col-span-2 text-center py-10">
          <p class="text-4xl mb-3">⚠️</p>
          <p class="font-medium font-poppins" style="color:#dc2626;">Error loading clinics.</p>
          <p class="text-text-muted text-sm mt-1">Please try again or call 123.</p>
        </div>`;
    } finally {
      // Restore button
      btnFind.disabled = false;
      btnFind.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        Find Emergency Clinics Now`;
    }
  });
}