// ─────────────────────────────────────────────
// VIEW
// ─────────────────────────────────────────────
export function servicesPage() {


  return `
  <section class="font-body min-h-screen" style="background: linear-gradient(160deg, #F5F4FA 0%, #EEF4FF 50%, #FAF0F8 100%);">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">

      <div class="text-center mb-10">
        <p class="text-[11px] font-title font-bold tracking-[.2em] text-gray-400 uppercase mb-4">Our Services</p>
        <h1 class="pp-hero-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-pawsText leading-tight mb-4">
          Everything your pet needs in <span class="accent">one place</span>
        </h1>
        <p class="text-base sm:text-lg text-gray-400 font-body max-w-xl mx-auto">
          Explore by category and book with trusted providers in Medellín.
        </p>
      </div>

      <div class="pp-filter-row mb-10" id="pp-filters">
        <button class="pp-pill active" data-cat="all">🐾 All Services</button>
        <button class="pp-pill" data-cat="grooming">✂️ Grooming &amp; Spa</button>
        <button class="pp-pill" data-cat="petshops">🛒 Pet Shops</button>
        <button class="pp-pill" data-cat="adoption">❤️ Adoption</button>
        <button class="pp-pill" data-cat="walkers">🦮 Dog Walkers</button>
        <button class="pp-pill" data-cat="homevet">🩺 Home Vet</button>
        <button class="pp-pill" data-cat="paseadores">🐕 Paseadores</button>
        <button class="pp-pill" data-cat="guarderias">🏠 Guarderías</button>
      </div>

      <div class="pp-cards-track" id="pp-cards">
        <!-- Filled dynamically by servicesPageEvents() via /api/businesses -->
        <div id="pp-loading" style="display:flex;align-items:center;justify-content:center;gap:10px;padding:60px 20px;min-width:100%;color:#888;">
          <svg style="width:20px;height:20px;animation:spin 1s linear infinite;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <span style="font-family:'Poppins',sans-serif;font-size:14px;">Loading services...</span>
        </div>
        <div class="pp-empty" id="pp-empty" style="display:none;">No providers found for this category.</div>
      </div>

      <div class="pp-dots" id="pp-dots">
        <div class="pp-dot active"></div>
        <div class="pp-dot"></div>
        <div class="pp-dot"></div>
        <div class="pp-dot"></div>
      </div>

      <div class="flex justify-center mt-10">
        <button class="pp-view-all">View All Services ›</button>
      </div>

    </div>
  </section>
  `;
}

// ─────────────────────────────────────────────
// EVENTS
// ─────────────────────────────────────────────

// Mapeo: data-cat del pill → business_type de la DB (puede ser varios)
const CAT_MAP = {
  grooming: null,        // no tiene tipo propio aún; se mostrará vacío hasta que se agregue
  petshops: 'petshop',
  adoption: 'shelter',
  walkers: 'dog_walker',
  homevet: 'vet',
  paseadores: 'dog_walker',
  guarderias: 'daycare',
};

const CAT_META = {
  clinic: { cat: 'clinic', catLabel: 'Clinic', catIcon: '🏥', badgeBg: '#E0F2FE', badgeColor: '#0284C7' },
  vet: { cat: 'homevet', catLabel: 'Home Vet', catIcon: '🩺', badgeBg: '#EDE9FE', badgeColor: '#7C3AED' },
  petshop: { cat: 'petshops', catLabel: 'Pet Shop', catIcon: '🛒', badgeBg: '#FEF9C3', badgeColor: '#B45309' },
  shelter: { cat: 'adoption', catLabel: 'Adoption', catIcon: '❤️', badgeBg: '#FCE7F3', badgeColor: '#9D174D' },
  dog_walker: { cat: 'walkers', catLabel: 'Dog Walker', catIcon: '🦮', badgeBg: '#DCFCE7', badgeColor: '#15803D' },
  daycare: { cat: 'guarderias', catLabel: 'Guardería', catIcon: '🏠', badgeBg: '#FDF4FF', badgeColor: '#9333EA' },
};

function renderServiceCard(biz) {
  const meta = CAT_META[biz.business_type] || { cat: biz.business_type, catLabel: biz.business_type, catIcon: '🐾', badgeBg: '#F3F4F6', badgeColor: '#374151' };
  const location = biz.address || biz.zone || 'Medellín';
  const rating = biz.rating ? `★${parseFloat(biz.rating).toFixed(1)}` : '';
  const tags = (biz.specialties || []).map(s => s.name).slice(0, 3);

  return `
    <div class="pp-service-card" data-cat="${meta.cat}" data-id="${biz.business_id}">
      <div class="pp-card-top">
        <div class="pp-provider-header">
          <div class="pp-provider-avatar" style="background:${meta.badgeBg};display:flex;align-items:center;justify-content:center;font-size:1.4rem;border-radius:50%;width:44px;height:44px;flex-shrink:0;">
            ${meta.catIcon}
          </div>
          <div class="pp-provider-info">
            <div class="pp-provider-name">${biz.name}</div>
            <div class="pp-provider-meta">${location}</div>
          </div>
          ${rating ? `<div class="pp-provider-rating"><span class="pp-star">★</span>${parseFloat(biz.rating).toFixed(1)}</div>` : ''}
        </div>

        <div class="pp-cat-badge" style="background:${meta.badgeBg}; color:${meta.badgeColor};">
          ${meta.catIcon} ${meta.catLabel}
        </div>

        <div class="pp-card-title">${biz.name}</div>
        ${biz.description ? `<div class="pp-card-desc">${biz.description}</div>` : ''}

        <div class="pp-tags">
          ${tags.map(t => `<span class="pp-tag">${t}</span>`).join('')}
          ${biz.is_24h ? '<span class="pp-tag">24/7</span>' : ''}
        </div>
      </div>

      <div class="pp-card-bottom">
        ${biz.image_url
      ? `<img src="${biz.image_url}" alt="${biz.name}" />`
      : `<div style="height:120px;background:${meta.badgeBg};display:flex;align-items:center;justify-content:center;font-size:3rem;">${meta.catIcon}</div>`
    }
        <div class="pp-card-footer">
          <span class="pp-price">${biz.phone ? `📞 ${biz.phone}` : location}</span>
          <button class="pp-card-cta" style="color:${meta.badgeColor};" data-id="${biz.business_id}">Book now →</button>
        </div>
      </div>
    </div>`;
}

export async function servicesPageEvents() {
  const track = document.getElementById('pp-cards');
  const dots = document.querySelectorAll('#pp-dots .pp-dot');
  const empty = document.getElementById('pp-empty');
  const loading = document.getElementById('pp-loading');

  let allServices = [];
  let activeCat = 'all';

  // ── Dots sync ────────────────────────────────────────────────
  function syncDots() {
    if (!track || !dots.length) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 0) { dots.forEach((d, i) => d.classList.toggle('active', i === 0)); return; }
    const idx = Math.min(Math.round((track.scrollLeft / max) * (dots.length - 1)), dots.length - 1);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  // ── Render filtered list ─────────────────────────────────────
  function renderFiltered(cat) {
    if (!track) return;
    const filtered = cat === 'all'
      ? allServices
      : allServices.filter(b => {
        const meta = CAT_META[b.business_type];
        return meta && (meta.cat === cat || (cat === 'paseadores' && meta.cat === 'walkers'));
      });

    // Remove old cards (keep loading and empty divs)
    track.querySelectorAll('.pp-service-card').forEach(c => c.remove());

    if (filtered.length === 0) {
      if (empty) empty.style.display = 'block';
      syncDots();
      return;
    }
    if (empty) empty.style.display = 'none';

    const html = filtered.map(renderServiceCard).join('');
    track.insertAdjacentHTML('afterbegin', html);

    // Bind card events
    track.querySelectorAll('.pp-service-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        window.location.hash = `/clinics`;
      });
      const bookBtn = card.querySelector('.pp-card-cta');
      if (bookBtn) {
        bookBtn.addEventListener('click', e => {
          e.stopPropagation();
          window.location.hash = '/appointments';
        });
      }
    });

    track.scrollLeft = 0;
    syncDots();
  }

  // ── Load from API ────────────────────────────────────────────
  async function loadServices() {
    try {
      // Fetch all relevant business types in parallel
      const types = ['vet', 'petshop', 'shelter', 'dog_walker', 'daycare'];
      const results = await Promise.all(
        types.map(t => fetch(`/api/businesses?type=${t}`).then(r => r.ok ? r.json() : []))
      );
      allServices = results.flat();

      if (loading) loading.style.display = 'none';

      if (allServices.length === 0) {
        if (empty) empty.style.display = 'block';
        return;
      }

      renderFiltered(activeCat);
    } catch (err) {
      console.error('Error loading services:', err);
      if (loading) loading.innerHTML = `<span style="font-family:'Poppins',sans-serif;font-size:14px;color:#dc2626;">⚠️ Could not load services</span>`;
    }
  }

  // ── Filter pills ─────────────────────────────────────────────
  const pills = document.querySelectorAll('#pp-filters .pp-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCat = pill.dataset.cat;
      renderFiltered(activeCat);
    });
  });

  if (track) track.addEventListener('scroll', syncDots, { passive: true });

  // ── View All ─────────────────────────────────────────────────
  const viewAllBtn = document.querySelector('.pp-view-all');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', e => {
      e.preventDefault();
      window.location.hash = '/clinics';
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  await loadServices();
}