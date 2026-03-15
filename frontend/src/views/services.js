import { SERVICES_DATA } from './servicesData.js';

// ─────────────────────────────────────────────
// VIEW
// ─────────────────────────────────────────────
export function servicesPage() {

  const cards = SERVICES_DATA.map(p => `
    <div class="pp-service-card" data-cat="${p.cat}">

      <div class="pp-card-top">
        <div class="pp-provider-header">
          <img class="pp-provider-avatar" src="${p.avatar}" alt="${p.name}" />
          <div class="pp-provider-info">
            <div class="pp-provider-name">${p.name}</div>
            <div class="pp-provider-meta">${p.location}</div>
          </div>
          <div class="pp-provider-rating">
            <span class="pp-star">★</span>${p.rating}
          </div>
        </div>

        <div class="pp-cat-badge" style="background:${p.badgeBg}; color:${p.badgeColor};">
          ${p.catIcon} ${p.catLabel}
        </div>

        <div class="pp-card-title">${p.title}</div>
        <div class="pp-card-desc">${p.desc}</div>

        <div class="pp-tags">
          ${p.tags.map(t => `<span class="pp-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="pp-card-bottom">
        <img src="${p.image}" alt="${p.name}" />
        <div class="pp-card-footer">
          <span class="pp-price">${p.price}</span>
          <button class="pp-card-cta" style="color:${p.badgeColor};">Book now →</button>
        </div>
      </div>

    </div>
  `).join('');

  return `
  <style>
    .pp-hero-title { font-family: 'Poppins', sans-serif; }
    .pp-hero-title .accent { color: #6A4C93; }

    .pp-filter-row {
      display: flex; gap: 10px;
      overflow-x: auto; -webkit-overflow-scrolling: touch;
      scrollbar-width: none; padding-bottom: 4px;
    }
    .pp-filter-row::-webkit-scrollbar { display: none; }

    .pp-cards-track {
      display: flex; gap: 20px;
      overflow-x: auto; -webkit-overflow-scrolling: touch;
      scrollbar-width: none; padding-bottom: 8px;
      scroll-snap-type: x mandatory;
    }
    .pp-cards-track::-webkit-scrollbar { display: none; }

    .pp-service-card {
      flex: 0 0 290px; scroll-snap-align: start;
      background: #fff; border-radius: 22px; overflow: hidden;
      box-shadow: 0 2px 14px rgba(0,0,0,.06);
      display: flex; flex-direction: column;
      transition: transform .22s ease, box-shadow .22s ease;
      cursor: pointer;
    }
    .pp-service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 32px rgba(0,0,0,.12);
    }

    .pp-card-top { padding: 20px 20px 14px; flex: 1; display: flex; flex-direction: column; gap: 10px; }

    .pp-provider-header { display: flex; align-items: center; gap: 10px; }
    .pp-provider-avatar {
      width: 44px; height: 44px; border-radius: 50%;
      object-fit: cover; flex-shrink: 0;
      border: 2px solid #F1C0E8;
    }
    .pp-provider-info { flex: 1; min-width: 0; }
    .pp-provider-name {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 14px; color: #333;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .pp-provider-meta { font-size: 11.5px; color: #999; margin-top: 1px; }
    .pp-provider-rating {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 13px; color: #333; white-space: nowrap;
    }
    .pp-star { color: #FBBF24; margin-right: 2px; }

    .pp-cat-badge {
      display: inline-flex; align-items: center; gap: 5px;
      font-family: 'Poppins', sans-serif; font-size: 10.5px; font-weight: 700;
      letter-spacing: .06em; text-transform: uppercase;
      padding: 4px 12px; border-radius: 100px; width: fit-content;
    }

    .pp-card-title {
      font-family: 'Poppins', sans-serif;
      font-size: 16px; font-weight: 700; color: #222; line-height: 1.3;
    }
    .pp-card-desc { font-size: 12.5px; color: #777; line-height: 1.55; }

    .pp-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
    .pp-tag {
      font-size: 11px; color: #6A4C93; background: #F3EEFF;
      padding: 3px 10px; border-radius: 100px;
      font-family: 'Poppins', sans-serif; font-weight: 500;
    }

    .pp-card-bottom { position: relative; height: 150px; overflow: hidden; }
    .pp-card-bottom img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .pp-card-footer {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: linear-gradient(to top, rgba(0,0,0,.55), transparent);
      padding: 10px 14px 12px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .pp-price {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 13px; color: #fff;
    }
    .pp-card-cta {
      font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
      background: rgba(255,255,255,.9); border: none; cursor: pointer;
      padding: 5px 14px; border-radius: 100px;
      transition: background .18s, transform .18s;
    }
    .pp-card-cta:hover { background: #fff; transform: scale(1.05); }

    .pp-pill {
      display: flex; align-items: center; gap: 7px; white-space: nowrap;
      padding: 9px 18px; border-radius: 100px;
      font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 500;
      cursor: pointer; border: none;
      transition: background .18s, color .18s, box-shadow .18s;
    }
    .pp-pill.active {
      background: #fff; color: #6A4C93;
      box-shadow: 0 2px 12px rgba(0,0,0,.1); font-weight: 600;
    }
    .pp-pill:not(.active) { background: transparent; color: #555; }
    .pp-pill:not(.active):hover { background: rgba(255,255,255,.6); }

    .pp-dots { display: flex; gap: 6px; justify-content: center; margin-top: 20px; }
    .pp-dot { width: 28px; height: 6px; border-radius: 3px; background: #D8D8E8; transition: background .2s; }
    .pp-dot.active { background: #6A4C93; }

    .pp-view-all {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
      color: #6A4C93; background: #fff; padding: 14px 32px; border-radius: 100px;
      border: none; cursor: pointer;
      box-shadow: 0 2px 14px rgba(0,0,0,.08);
      transition: box-shadow .2s, transform .2s;
    }
    .pp-view-all:hover { box-shadow: 0 6px 24px rgba(0,0,0,.14); transform: translateY(-2px); }

    .pp-empty {
      display: none; flex: 0 0 100%; text-align: center; padding: 60px 20px;
      font-family: 'Poppins', sans-serif; color: #bbb; font-size: 15px;
    }

    @media (max-width: 600px) {
      .pp-hero-title { font-size: 26px !important; }
      .pp-service-card { flex: 0 0 250px; }
      .pp-card-bottom { height: 130px; }
    }
    @media (max-width: 375px) {
      .pp-hero-title { font-size: 22px !important; }
      .pp-service-card { flex: 0 0 220px; }
    }
  </style>

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
        ${cards}
        <div class="pp-empty" id="pp-empty">No providers found for this category.</div>
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
export function servicesPageEvents() {
  const pills = document.querySelectorAll('#pp-filters .pp-pill');
  const cards = document.querySelectorAll('#pp-cards .pp-service-card');
  const track = document.getElementById('pp-cards');
  const dots = document.querySelectorAll('#pp-dots .pp-dot');
  const empty = document.getElementById('pp-empty');

  function syncDots() {
    if (!track || !dots.length) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 0) { dots.forEach((d, i) => d.classList.toggle('active', i === 0)); return; }
    const idx = Math.min(Math.round((track.scrollLeft / max) * (dots.length - 1)), dots.length - 1);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function filterCards(cat) {
    let visible = 0;
    cards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.style.display = match ? 'flex' : 'none';
      if (match) visible++;
    });
    if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
    if (track) track.scrollLeft = 0;
    syncDots();
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterCards(pill.dataset.cat);
    });
  });

  if (track) track.addEventListener('scroll', syncDots, { passive: true });

  cards.forEach(card => {
    // clicking the whole card goes to provider detail (existing behavior)
    const navigate = () => {
      const provider = card.querySelector('.pp-provider-name')?.textContent?.trim();
      document.dispatchEvent(new CustomEvent('navigate', {
        detail: { view: 'providerDetail', provider }
      }));
    };
    card.addEventListener('click', navigate);

    // Book now buttons currently lead to a maintenance page while booking is disabled
    const bookBtn = card.querySelector('.pp-card-cta');
    if (bookBtn) {
      bookBtn.addEventListener('click', e => {
        e.stopPropagation();
        // route to maintenance view
        window.location.hash = '/maintenance';
      });
    }
  });

  // Wire "View All Services" to maintenance page while full listing/booking is under maintenance
  const viewAllBtn = document.querySelector('.pp-view-all');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '/maintenance';
    });
  }

  syncDots();
}