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
          <div class="relative flex-shrink-0">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center"
                 style="background:rgba(255,255,255,0.20);">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
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
      <p class="text-text-muted text-sm mb-5">
        Select the level that best describes your pet's condition
      </p>

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
        style="background:linear-gradient(135deg,#dc2626,#ea580c);color:white;
               transition:var(--transition-fast);"
        onmouseenter="this.style.opacity='0.90'"
        onmouseleave="this.style.opacity='1'">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        Find Emergency Clinics Now
      </button>
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
  const btnFind = document.getElementById('btn-find-emergency');
  if (!btnFind) return;

  btnFind.addEventListener('click', () => {
    const selected = document.querySelector('input[name="urgency"]:checked');

    // Validate urgency selection
    if (!selected) {
      btnFind.style.outline = '3px solid #fca5a5';
      setTimeout(() => { btnFind.style.outline = 'none'; }, 1200);

      let msg = document.getElementById('urgency-error');
      if (!msg) {
        msg = document.createElement('p');
        msg.id        = 'urgency-error';
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

    // Loading state briefly so the user sees feedback
    btnFind.disabled = true;
    btnFind.innerHTML = `
      <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      Finding clinics...`;

    // Short delay so the user sees the loading state, then redirect
    setTimeout(() => {
      // Redirect to map with emergency filter preactivated
      // loadMapEvents() reads this param on init and activates the filter
      window.location.hash = '#/map-page?filter=emergency';
    }, 600);
  });
}