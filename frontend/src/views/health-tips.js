export function healthTipsPage() {
  const tips = [
    {
      category: 'Nutrition',
      color: '#B9FBC0',
      icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3a5 5 0 015 5c0 2-1 3.5-2.5 4.5M12 3a5 5 0 00-5 5c0 2 1 3.5 2.5 4.5M12 12.5V21M9 21h6"/></svg>',
      accent: '#6A4C93',
      title: 'Balanced Diet for Your Pet',
      description: 'A proper diet is the foundation of your pet\'s health. Make sure to provide age-appropriate food with the right balance of proteins, carbohydrates, and fats.',
      tips: ['Choose food appropriate for your pet\'s life stage', 'Avoid giving human food — many are toxic to pets', 'Always keep fresh water available', 'Measure portions to prevent obesity']
    },
    {
      category: 'Exercise',
      color: '#90BDF4',
      icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 5a2 2 0 100-4 2 2 0 000 4zm-2 4l-2 9M9 9l4 2 3-3M7 14l2-1M15 9l2 5"/></svg>',
      accent: '#2563eb',
      title: 'Keep Them Active & Happy',
      description: 'Regular physical activity prevents obesity, strengthens muscles, and improves your pet\'s mental wellbeing. Each species has different needs.',
      tips: ['Dogs need at least 30 min of exercise daily', 'Cats benefit from interactive toys and climbing structures', 'Avoid intense exercise in extreme heat', 'Introduce new activities gradually']
    },
    {
      category: 'Preventive Care',
      color: '#F1C0E8',
      icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.5 4.5l-15 15M16 3l5 5-1.5 1.5M12 7l4 4M5 15l-2 4 4-2M9 11l4 4"/></svg>',
      accent: '#6A4C93',
      title: 'Vaccines & Deworming',
      description: 'Prevention is always better than cure. Keeping your pet\'s vaccination schedule up to date protects them and the whole family.',
      tips: ['Schedule annual vaccine boosters', 'Deworm every 3 months for dogs and cats', 'Use flea and tick prevention year-round', 'Keep a health record for your pet']
    },
    {
      category: 'Dental Health',
      color: '#FBF8CC',
      icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3c-2.5 0-5 2-5 5 0 2 .5 3 1 5 .5 2 1 5 2 8h1c.5-2 1-4 1-5s.5 3 1 5h1c1-3 1.5-6 2-8 .5-2 1-3 1-5 0-3-2.5-5-5-5z"/></svg>',
      accent: '#d97706',
      title: 'Don\'t Ignore Their Teeth',
      description: 'Dental disease affects over 80% of pets by age 3. Good oral hygiene prevents pain, infections, and even heart disease.',
      tips: ['Brush teeth 2–3 times per week', 'Offer dental chews approved by vets', 'Schedule annual dental cleanings', 'Watch for bad breath — it\'s a warning sign']
    },
    {
      category: 'Mental Wellbeing',
      color: '#FFCFD2',
      icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 5a7 7 0 00-7 7c0 2.4 1.2 4.5 3 5.7V20h8v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 00-7-7zM9 20h6"/></svg>',
      accent: '#dc2626',
      title: 'Emotional Health Matters Too',
      description: 'Pets experience stress, anxiety, and boredom. A stimulating environment and quality time with you are essential for their emotional balance.',
      tips: ['Provide enrichment toys and puzzles', 'Maintain consistent daily routines', 'Socialize puppies and kittens early', 'Never punish — use positive reinforcement']
    },
    {
      category: 'Grooming',
      color: '#B9FBC0',
      icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 9a3 3 0 100-6 3 3 0 000 6zm0 0l12 6M6 9l6 3M18 15a3 3 0 100 6 3 3 0 000-6zm0 0L6 9"/></svg>',
      accent: '#059669',
      title: 'Grooming is Health Care',
      description: 'Regular grooming does more than keep your pet looking great. It helps you detect lumps, skin issues, or parasites before they become serious.',
      tips: ['Brush coat weekly to prevent matting', 'Trim nails every 3–4 weeks', 'Clean ears monthly to prevent infections', 'Check skin for unusual lumps or redness']
    }
  ];

  return `
    <div class="min-h-screen" style="background: linear-gradient(160deg, #f8f6ff 0%, #fef9f9 50%, #f0fdf4 100%); font-family: 'Poppins', sans-serif;">

      <!-- Header -->
      <header class="bg-white shadow-sm border-b" style="border-color: #f0e8ff;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <div class="tips-hero-badge mb-2"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z"/></svg> Expert Advice</div>
              <h1 class="text-3xl font-bold" style="color: #333333; font-family: 'Poppins', sans-serif;">Health Tips</h1>
              <p class="mt-1" style="color: #4A4A4A; font-family: 'Roboto', sans-serif; font-size: 0.95rem;">Evidence-based advice to keep your furry friends thriving</p>
            </div>
            <button onclick="window.location.hash='/#/'" class="font-medium hover:opacity-75 transition" style="color: #6A4C93; font-family: 'Poppins', sans-serif;">
              ← Back to home
            </button>
          </div>
        </div>
      </header>

      <!-- Filter Bar -->
      <section class="bg-white border-b" style="border-color: #f5f5f5;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex gap-3 flex-wrap items-center">
            <span style="font-family: 'Poppins', sans-serif; font-size: 0.8rem; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Filter by:</span>
            <button class="filter-pill active" data-filter="all" onclick="filterTips(this, 'all')">All Topics</button>
            <button class="filter-pill" data-filter="Nutrition" onclick="filterTips(this, 'Nutrition')"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3a5 5 0 015 5c0 2-1 3.5-2.5 4.5M12 3a5 5 0 00-5 5c0 2 1 3.5 2.5 4.5M12 12.5V21M9 21h6"/></svg> Nutrition</button>
            <button class="filter-pill" data-filter="Exercise" onclick="filterTips(this, 'Exercise')"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 5a2 2 0 100-4 2 2 0 000 4zm-2 4l-2 9M9 9l4 2 3-3M7 14l2-1M15 9l2 5"/></svg> Exercise</button>
            <button class="filter-pill" data-filter="Preventive Care" onclick="filterTips(this, 'Preventive Care')"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.5 4.5l-15 15M16 3l5 5-1.5 1.5M12 7l4 4M5 15l-2 4 4-2M9 11l4 4"/></svg> Prevention</button>
            <button class="filter-pill" data-filter="Dental Health" onclick="filterTips(this, 'Dental Health')"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3c-2.5 0-5 2-5 5 0 2 .5 3 1 5 .5 2 1 5 2 8h1c.5-2 1-4 1-5s.5 3 1 5h1c1-3 1.5-6 2-8 .5-2 1-3 1-5 0-3-2.5-5-5-5z"/></svg> Dental</button>
            <button class="filter-pill" data-filter="Mental Wellbeing" onclick="filterTips(this, 'Mental Wellbeing')"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 5a7 7 0 00-7 7c0 2.4 1.2 4.5 3 5.7V20h8v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 00-7-7zM9 20h6"/></svg> Mental Health</button>
            <button class="filter-pill" data-filter="Grooming" onclick="filterTips(this, 'Grooming')"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 9a3 3 0 100-6 3 3 0 000 6zm0 0l12 6M6 9l6 3M18 15a3 3 0 100 6 3 3 0 000-6zm0 0L6 9"/></svg> Grooming</button>
          </div>
        </div>
      </section>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <!-- Personalized AI Tips (loaded via API if user has pets) -->
        <div id="ai-tips-section" style="display:none;" class="mb-10">
          <div class="flex items-center gap-3 mb-5">
            <span class="text-2xl"><svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3l1.5 4.5L11 9l-4.5 1.5L5 15l-1.5-4.5L-1 9l4.5-1.5L5 3zM19 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg></span>
            <div>
              <h2 class="text-xl font-bold font-poppins" style="color:#333;">Personalized for <span id="ai-tips-pet-name">your pet</span></h2>
              <p class="text-sm" style="color:#6B7280;font-family:'Roboto',sans-serif;">Generated by AI based on your pet's profile</p>
            </div>
          </div>
          <div id="ai-tips-container" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <!-- filled by JS -->
          </div>
          <div id="ai-tips-loading" class="text-center py-6 text-sm" style="color:#6B7280;">
            <svg class="w-4 h-4 animate-spin inline mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Generating personalized tips...
          </div>
          <div id="ai-tips-select" class="flex gap-3 flex-wrap mt-3">
            <span class="text-xs font-semibold" style="color:#6B7280;align-self:center;">Topic:</span>
          </div>
        </div>

        <!-- Tips Grid -->
        <div id="tips-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          ${tips.map((tip, i) => `
            <div class="tip-card fade-up" data-category="${tip.category}" style="animation-delay: ${i * 0.08}s;">
              <div class="tip-card-accent" style="background: ${tip.color};"></div>
              <div class="tip-category-badge" style="background: ${tip.color}; color: ${tip.accent};">
                ${tip.icon} ${tip.category}
              </div>
              <h3 class="text-lg font-bold mb-3" style="color: #333333; font-family: 'Poppins', sans-serif;">${tip.title}</h3>
              <p class="mb-5" style="color: #4A4A4A; font-family: 'Roboto', sans-serif; font-size: 0.875rem; line-height: 1.6;">${tip.description}</p>
              <div>
                ${tip.tips.map(t => `
                  <div class="tip-list-item">
                    <div class="tip-check" style="background: ${tip.color}; color: ${tip.accent};">✓</div>
                    <span>${t}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Seasonal Section -->
        <section class="mb-16">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold mb-2" style="color: #333333; font-family: 'Poppins', sans-serif;">Seasonal Care Guide</h2>
            <p style="color: #4A4A4A; font-family: 'Roboto', sans-serif; font-size: 0.9rem;">Tips that change with the year, tailored to Medellín's climate</p>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${[
      { season: 'Spring', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 12a2 2 0 100-4 2 2 0 000 4zm0 0c0 4-3 6-3 6m3-6c0 4 3 6 3 6m-3-6c-4 0-6-3-6-3m6 3c-4 0-6 3-6 3m6-6c4 0 6-3 6-3m-6 3c4 0 6 3 6 3"/></svg>', tip: 'Watch for seasonal allergies and increase grooming frequency', color: '#FFCFD2' },
      { season: 'Summer', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3v2m0 14v2M3 12h2m14 0h2m-3.22-5.78l-1.42 1.42M6.64 17.36l-1.42 1.42M17.36 17.36l1.42 1.42M6.64 6.64L5.22 5.22M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>', tip: 'Hydration is critical. Never leave pets in parked cars', color: '#FBF8CC' },
      { season: 'Rainy Season', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 103 16.29M8 19v2m4-4v2m4-2v2"/></svg>', tip: 'Check for fungal infections and keep paws dry after walks', color: '#90BDF4' },
      { season: 'Year-Round', icon: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 22V12m0 0C12 6 6 4 3 3c0 3 2 9 9 9zm0 0c0-6 6-8 9-9 0 3-2 9-9 9z"/></svg>', tip: 'In Medellín\'s climate, mosquito prevention is always needed', color: '#B9FBC0' }
    ].map(s => `
              <div class="seasonal-card">
                <div class="text-3xl mb-3">${s.icon}</div>
                <div class="font-semibold mb-2" style="color: #333; font-family: 'Poppins', sans-serif; font-size: 0.9rem;">${s.season}</div>
                <p style="color: #4A4A4A; font-family: 'Roboto', sans-serif; font-size: 0.8rem; line-height: 1.5;">${s.tip}</p>
                <div style="height: 3px; background: ${s.color}; border-radius: 99px; margin-top: 16px;"></div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Newsletter -->
        <section class="newsletter-section mb-12">
          <h2 class="text-2xl font-bold mb-2" style="font-family: 'Poppins', sans-serif;">Get Weekly Health Tips</h2>
          <p style="font-family: 'Roboto', sans-serif; opacity: 0.85; margin-bottom: 28px; font-size: 0.95rem;">Join 500+ pet owners in Medellín who receive expert advice every week.</p>
          <div class="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" class="newsletter-input" id="newsletter-email">
            <button class="newsletter-btn" onclick="subscribeNewsletter()">Subscribe</button>
          </div>
          <p style="font-family: 'Roboto', sans-serif; font-size: 0.75rem; opacity: 0.6; margin-top: 12px;">No spam, ever. Unsubscribe anytime.</p>
        </section>

      </main>
    </div>

    <script>
      function filterTips(btn, category) {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tip-card').forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }

      function subscribeNewsletter() {
        const email = document.getElementById('newsletter-email').value;
        if (!email || !email.includes('@')) {
          alert('Please enter a valid email address.');
          return;
        }
        alert('Thanks for subscribing! Check your inbox soon <svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z"/></svg>');
        document.getElementById('newsletter-email').value = '';
      }
      <!-- N8N Chatbot CSS -->
    <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
  `;
}

export async function healthTipsEvents() {
  // Events handled inline via onclick (filter + newsletter)

  // Initialize n8n chat widget (robust loader + diagnostics)
  try {
    console.log('[healthTipsEvents] initializing n8n chat...');

    // Ensure stylesheet for n8n chat is present in <head>
    (function ensureN8nCss() {
      const href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      if (!document.querySelector(`link[href="${href}"]`)) {
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = href;
        document.head.appendChild(l);
        console.log('[healthTipsEvents] n8n chat stylesheet injected in head');
      }
    })();

    // Inject theme overrides for the n8n chat widget using PAWS design tokens
    (function injectN8nTheme() {
      if (document.getElementById('paws-n8n-theme')) return;
      try {
        const docStyle = getComputedStyle(document.documentElement);
        const colorPrimary = docStyle.getPropertyValue('--color-purple') || '#6A4C93';
        const colorAccent = docStyle.getPropertyValue('--color-green') || '#B9FBC0';
        const textPrimary = docStyle.getPropertyValue('--text-primary') || '#333333';
        const textMuted = docStyle.getPropertyValue('--color-muted') || '#9CA3AF';
        const radius = docStyle.getPropertyValue('--radius-md') || '12px';
        const shadow = docStyle.getPropertyValue('--shadow-medium') || '0 8px 24px rgba(0,0,0,0.12)';
        const zToast = docStyle.getPropertyValue('--z-toast') || '10000';

        const css = `:root {
          /* PAWS -> n8n chat theme overrides */
          --chat--color--primary: ${colorPrimary};
          --chat--color--accent: ${colorAccent};
          --chat--heading--color: ${textPrimary};
          --chat--text--color: ${textPrimary};
          --chat--input--placeholder--color: ${textMuted};
          --chat--window--border-radius: ${radius};
          --chat--toggle--border-radius: ${radius};
          --chat--window--box-shadow: ${shadow};
          --chat--window--z-index: ${zToast};
          /* Position slightly above footer and to the right to match PAWS spacing */
          --chat--window--bottom: 28px;
          --chat--window--right: 28px;
        }`;

        const s = document.createElement('style');
        s.id = 'paws-n8n-theme';
        s.appendChild(document.createTextNode(css));
        document.head.appendChild(s);
        console.log('[healthTipsEvents] injected PAWS -> n8n theme overrides');
      } catch (e) {
        console.warn('[healthTipsEvents] failed to inject n8n theme overrides', e);
      }
    })();

    if (!window.n8nChatInitialized) {
      window.n8nChatInitialized = true;

      // Try dynamic ESM import first
      const tryImport = async () => {
        try {
          const mod = await import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
          console.log('[healthTipsEvents] n8n module loaded via ESM import', mod);
          // find createChat in module (named export or default)
          const createChat = mod.createChat ?? mod.default?.createChat ?? mod.default;
          if (typeof createChat === 'function') return createChat;
          console.warn('[healthTipsEvents] createChat not found in ESM module', Object.keys(mod));
          return null;
        } catch (err) {
          console.warn('[healthTipsEvents] ESM import failed, will fallback to script tag loader', err);
          return null;
        }
      };

      const createChatFn = await tryImport();
      if (createChatFn) {
        try {
          createChatFn({
            webhookUrl: 'https://arnoldow.app.n8n.cloud/webhook/ee61227d-70ff-4cbb-8869-421d70b6f730/chat',
            showWelcomeScreen: false,
            defaultLanguage: 'es',
            initialMessages: [
              '¡Hola! Soy PAWS Assistant 🐾',
              'Puedo ayudarte con dudas generales sobre el cuidado de tu mascota o cómo usar nuestra plataforma. Recuerda que mis sugerencias no reemplazan la valoración de tu veterinario.'
            ],
            i18n: {
              es: {
                title: 'PAWS Assistant 🐾',
                subtitle: 'Pregúntame sobre el cuidado de tu mascota o cómo usar PAWS.',
                getStarted: [
                  '¿Cómo reservo una cita?',
                  'Vacunas y desparasitaciones',
                  'Mi mascota no come bien'
                ],
                inputPlaceholder: 'Escribe tu pregunta aquí...',
                footer: 'PAWS · Información orientativa, no sustituye a un profesional'
              },
              en: {
                title: 'PAWS Assistant 🐾',
                subtitle: 'Ask me about pet care or how to use PAWS.',
                getStarted: [
                  'How do I book an appointment?',
                  'Vaccines & deworming',
                  "My pet won't eat"
                ],
                inputPlaceholder: 'Type your question here...',
                footer: 'PAWS · Guidance only, not a substitute for veterinary care'
              }
            }
          });
          console.log('[healthTipsEvents] n8n chat created via ESM import');
        } catch (err) {
          console.error('[healthTipsEvents] error calling createChat from ESM import', err);
        }
      } else {
        // Fallback: insert UMD script tag and wait for global
        await new Promise((resolve, reject) => {
          const src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.umd.js';
          if (document.querySelector(`script[src="${src}"]`)) return resolve();
          const s = document.createElement('script');
          s.src = src;
          s.async = true;
          s.onload = () => {
            console.log('[healthTipsEvents] n8n UMD script loaded');
            resolve();
          };
          s.onerror = (e) => {
            console.error('[healthTipsEvents] failed to load n8n UMD script', e);
            reject(e);
          };
          document.body.appendChild(s);
        }).then(() => {
          // after script loads, expect a global createChat
          const createChatGlobal = window.createChat ?? window.n8n?.createChat ?? window['@n8n']?.createChat;
          if (typeof createChatGlobal === 'function') {
            try {
              createChatGlobal({
                webhookUrl: 'https://arnoldow.app.n8n.cloud/webhook/ee61227d-70ff-4cbb-8869-421d70b6f730/chat',
                showWelcomeScreen: false,
                defaultLanguage: 'es',
                initialMessages: [
                  '¡Hola! Soy PAWS Assistant 🐾',
                  'Puedo ayudarte con dudas generales sobre el cuidado de tu mascota o cómo usar nuestra plataforma. Recuerda que mis sugerencias no reemplazan la valoración de tu veterinario.'
                ],
                i18n: {
                  es: {
                    title: 'PAWS Assistant 🐾',
                    subtitle: 'Pregúntame sobre el cuidado de tu mascota o cómo usar PAWS.',
                    getStarted: [
                      '¿Cómo reservo una cita?',
                      'Vacunas y desparasitaciones',
                      'Mi mascota no come bien'
                    ],
                    inputPlaceholder: 'Escribe tu pregunta aquí...',
                    footer: 'PAWS · Información orientativa, no sustituye a un profesional'
                  },
                  en: {
                    title: 'PAWS Assistant 🐾',
                    subtitle: 'Ask me about pet care or how to use PAWS.',
                    getStarted: [
                      'How do I book an appointment?',
                      'Vaccines & deworming',
                      "My pet won't eat"
                    ],
                    inputPlaceholder: 'Type your question here...',
                    footer: 'PAWS · Guidance only, not a substitute for veterinary care'
                  }
                }
              });
              console.log('[healthTipsEvents] n8n chat created via UMD script');
            } catch (err) {
              console.error('[healthTipsEvents] error calling createChatGlobal', err);
            }
          } else {
            console.warn('[healthTipsEvents] createChat not found after UMD script load — inspect globals', Object.keys(window).filter(k=>k.toLowerCase().includes('n8n')).slice(0,20));
          }
        }).catch(() => {
          console.error('[healthTipsEvents] could not load n8n chat library by any method');
        });
      }
    } else {
      console.log('[healthTipsEvents] n8nChatInitialized already true — skipping initialization');
    }
  } catch (err) {
    console.error('[healthTipsEvents] unexpected error initializing n8n chat', err);
  }

  // Load personalized tips for the logged-in user's first pet
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  const TOPICS = ['Nutrition', 'Exercise', 'Preventive Care', 'Dental Health', 'Grooming', 'Mental Wellbeing'];
  const TOPIC_ICONS = { Nutrition: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3a5 5 0 015 5c0 2-1 3.5-2.5 4.5M12 3a5 5 0 00-5 5c0 2 1 3.5 2.5 4.5M12 12.5V21M9 21h6"/></svg>', Exercise: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 5a2 2 0 100-4 2 2 0 000 4zm-2 4l-2 9M9 9l4 2 3-3M7 14l2-1M15 9l2 5"/></svg>', 'Preventive Care': '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.5 4.5l-15 15M16 3l5 5-1.5 1.5M12 7l4 4M5 15l-2 4 4-2M9 11l4 4"/></svg>', 'Dental Health': '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3c-2.5 0-5 2-5 5 0 2 .5 3 1 5 .5 2 1 5 2 8h1c.5-2 1-4 1-5s.5 3 1 5h1c1-3 1.5-6 2-8 .5-2 1-3 1-5 0-3-2.5-5-5-5z"/></svg>', Grooming: '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 9a3 3 0 100-6 3 3 0 000 6zm0 0l12 6M6 9l6 3M18 15a3 3 0 100 6 3 3 0 000-6zm0 0L6 9"/></svg>', 'Mental Wellbeing': '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 5a7 7 0 00-7 7c0 2.4 1.2 4.5 3 5.7V20h8v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 00-7-7zM9 20h6"/></svg>' };
  const TOPIC_COLORS = { Nutrition: '#B9FBC0', Exercise: '#90BDF4', 'Preventive Care': '#F1C0E8', 'Dental Health': '#FBF8CC', Grooming: '#B9FBC0', 'Mental Wellbeing': '#FFCFD2' };

  try {
    const petsRes = await fetch(`/api/pets/user/${user.user_id}`, { credentials: 'include' });
    if (!petsRes.ok) return;
    const pets = await petsRes.json();
    if (!pets.length) return;

    const pet = pets[0];
    const ageYears = pet.birth_date
      ? Math.floor((Date.now() - new Date(pet.birth_date)) / (1000 * 60 * 60 * 24 * 365.25))
      : null;

    document.getElementById('ai-tips-section').style.display = '';
    document.getElementById('ai-tips-pet-name').textContent = pet.name;

    // Topic selector buttons
    const selectDiv = document.getElementById('ai-tips-select');
    TOPICS.forEach(topic => {
      const btn = document.createElement('button');
      btn.className = 'filter-pill text-xs';
      btn.textContent = `${TOPIC_ICONS[topic]} ${topic}`;
      btn.onclick = () => loadAiTips(pet, ageYears, topic);
      selectDiv.appendChild(btn);
    });

    // Load first topic automatically
    await loadAiTips(pet, ageYears, TOPICS[0]);

    async function loadAiTips(pet, ageYears, topic) {
      const container = document.getElementById('ai-tips-container');
      const loading = document.getElementById('ai-tips-loading');
      container.innerHTML = '';
      loading.style.display = 'block';

      try {
        const species = pet.species_name || pet.animal_type_name || 'Dog';
        const res = await fetch('/api/ai/care-tips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ species, breed: pet.breed || null, age_years: ageYears, topic })
        });

        if (!res.ok) throw new Error('AI request failed');
        const data = await res.json();
        loading.style.display = 'none';

        const color = TOPIC_COLORS[topic] || '#B9FBC0';
        const accent = '#6A4C93';
        container.innerHTML = (data.tips || []).map((tip, i) => `
          <div class="tip-card fade-up" style="animation-delay:${i * 0.08}s;">
            <div class="tip-card-accent" style="background:${color};"></div>
            <div class="tip-category-badge" style="background:${color};color:${accent};">
              ${TOPIC_ICONS[topic] || '<svg style="width:1em;height:1em;display:inline-block;vertical-align:middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3l1.5 4.5L11 9l-4.5 1.5L5 15l-1.5-4.5L-1 9l4.5-1.5L5 3zM19 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>'} ${topic}
            </div>
            <div class="tip-list-item mt-3">
              <div class="tip-check" style="background:${color};color:${accent};">✓</div>
              <span style="font-family:'Roboto',sans-serif;font-size:0.875rem;color:#4A4A4A;">${tip}</span>
            </div>
          </div>
        `).join('');

        if (data.from_cache) {
          container.insertAdjacentHTML('beforeend', '<p class="text-xs col-span-3 text-center mt-1" style="color:#9CA3AF;">From cache · ' + data.source + '</p>');
        }
      } catch (err) {
        loading.textContent = 'Could not load AI tips. Showing general advice below.';
      }
    }
  } catch (err) {
    console.error('Health tips AI error:', err);
  }
}