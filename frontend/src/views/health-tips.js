export function healthTipsPage() {
  const tips = [
    {
      category: 'Nutrition',
      color: '#B9FBC0',
      icon: '🥦',
      accent: '#6A4C93',
      title: 'Balanced Diet for Your Pet',
      description: 'A proper diet is the foundation of your pet\'s health. Make sure to provide age-appropriate food with the right balance of proteins, carbohydrates, and fats.',
      tips: ['Choose food appropriate for your pet\'s life stage', 'Avoid giving human food — many are toxic to pets', 'Always keep fresh water available', 'Measure portions to prevent obesity']
    },
    {
      category: 'Exercise',
      color: '#90BDF4',
      icon: '🏃',
      accent: '#2563eb',
      title: 'Keep Them Active & Happy',
      description: 'Regular physical activity prevents obesity, strengthens muscles, and improves your pet\'s mental wellbeing. Each species has different needs.',
      tips: ['Dogs need at least 30 min of exercise daily', 'Cats benefit from interactive toys and climbing structures', 'Avoid intense exercise in extreme heat', 'Introduce new activities gradually']
    },
    {
      category: 'Preventive Care',
      color: '#F1C0E8',
      icon: '💉',
      accent: '#6A4C93',
      title: 'Vaccines & Deworming',
      description: 'Prevention is always better than cure. Keeping your pet\'s vaccination schedule up to date protects them and the whole family.',
      tips: ['Schedule annual vaccine boosters', 'Deworm every 3 months for dogs and cats', 'Use flea and tick prevention year-round', 'Keep a health record for your pet']
    },
    {
      category: 'Dental Health',
      color: '#FBF8CC',
      icon: '🦷',
      accent: '#d97706',
      title: 'Don\'t Ignore Their Teeth',
      description: 'Dental disease affects over 80% of pets by age 3. Good oral hygiene prevents pain, infections, and even heart disease.',
      tips: ['Brush teeth 2–3 times per week', 'Offer dental chews approved by vets', 'Schedule annual dental cleanings', 'Watch for bad breath — it\'s a warning sign']
    },
    {
      category: 'Mental Wellbeing',
      color: '#FFCFD2',
      icon: '🧠',
      accent: '#dc2626',
      title: 'Emotional Health Matters Too',
      description: 'Pets experience stress, anxiety, and boredom. A stimulating environment and quality time with you are essential for their emotional balance.',
      tips: ['Provide enrichment toys and puzzles', 'Maintain consistent daily routines', 'Socialize puppies and kittens early', 'Never punish — use positive reinforcement']
    },
    {
      category: 'Grooming',
      color: '#B9FBC0',
      icon: '✂️',
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
              <div class="tips-hero-badge mb-2">🐾 Expert Advice</div>
              <h1 class="text-3xl font-bold" style="color: #333333; font-family: 'Poppins', sans-serif;">Health Tips</h1>
              <p class="mt-1" style="color: #4A4A4A; font-family: 'Roboto', sans-serif; font-size: 0.95rem;">Evidence-based advice to keep your furry friends thriving</p>
            </div>
            <button onclick="window.location.hash='/'" class="font-medium hover:opacity-75 transition" style="color: #6A4C93; font-family: 'Poppins', sans-serif;">
              ← Back to home
            </button>
          </div>
        </div>
      </header>

      <!-- Filter Bar -->
      <!-- <section class="bg-white border-b" style="border-color: #f5f5f5;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex gap-3 flex-wrap items-center">
            <span style="font-family: 'Poppins', sans-serif; font-size: 0.8rem; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Filter by:</span>
            <button class="filter-pill active" data-filter="all" onclick="filterTips(this, 'all')">All Topics</button>
            <button class="filter-pill" data-filter="Nutrition" onclick="filterTips(this, 'Nutrition')">🥦 Nutrition</button>
            <button class="filter-pill" data-filter="Exercise" onclick="filterTips(this, 'Exercise')">🏃 Exercise</button>
            <button class="filter-pill" data-filter="Preventive Care" onclick="filterTips(this, 'Preventive Care')">💉 Prevention</button>
            <button class="filter-pill" data-filter="Dental Health" onclick="filterTips(this, 'Dental Health')">🦷 Dental</button>
            <button class="filter-pill" data-filter="Mental Wellbeing" onclick="filterTips(this, 'Mental Wellbeing')">🧠 Mental Health</button>
            <button class="filter-pill" data-filter="Grooming" onclick="filterTips(this, 'Grooming')">✂️ Grooming</button>
          </div>
        </div>
      </section> -->

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <!-- Personalized AI Tips (loaded via API if user has pets) -->
        <div id="ai-tips-section" style="display:none;" class="mb-10">
          <div class="flex items-center gap-3 mb-5">
            <div>
              <h2 class="text-xl font-bold font-poppins" style="color:#333;">Personalized for <span id="ai-tips-pet-name">your pet</span></h2>
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
        alert('Thanks for subscribing! Check your inbox soon 🐾');
        document.getElementById('newsletter-email').value = '';
      }
  `;
}

export async function healthTipsEvents() {
  // Events handled inline via onclick (filter + newsletter)
  if (window.n8nChatInstance) {
    console.log('[healthTipsEvents] n8n chat already initialized, skipping...');
  } else {
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
      // Helper to detect if a chat DOM node is present
      function isChatMounted() {
        try {
          if (document.querySelector('[data-n8n-chat], [data-chat]')) return true;
          const byRole = Array.from(document.querySelectorAll('[role="dialog"], [aria-label]')).find(el => {
            const aria = (el.getAttribute('aria-label') || '').toLowerCase();
            return aria.includes('chat') || aria.includes('assistant');
          });
          if (byRole) return true;
          // fallback: any fixed element near bottom-right large enough
          const fixedEls = Array.from(document.querySelectorAll('body *')).filter(el => {
            try { const cs = getComputedStyle(el); return cs.position === 'fixed'; } catch (e) { return false; }
          });
          for (const el of fixedEls) {
            const r = el.getBoundingClientRect();
            if (r.width > 200 && r.height > 200 && (r.left + r.width) > (window.innerWidth - 200) && (r.top + r.height) > (window.innerHeight - 200)) return true;
          }
          return false;
        } catch (e) { return false; }
      }

      // Flags for library vs instance
      window.n8nChatLibLoaded = window.n8nChatLibLoaded || false;
      window.n8nChatInstance = window.n8nChatInstance || false;

      const createOptions = {
        webhookUrl: 'https://arnoldow.app.n8n.cloud/webhook/ee61227d-70ff-4cbb-8869-421d70b6f730/chat',
        showWelcomeScreen: false,
        defaultLanguage: 'en',
        initialMessages: [
          'Hi there! I\'m PAWS Assistant 🐾',
          'I can help you with general pet care questions or how to use our platform. Remember, my suggestions don\'t replace a professional veterinary assessment.'
        ],
        i18n: {
          en: {
            title: 'PAWS Assistant 🐾',
            subtitle: 'Ask me about pet care or how to use PAWS.',
            getStarted: ['How do I book an appointment?', 'Vaccines & deworming', 'My pet won\'t eat'],
            inputPlaceholder: 'Type your question here...',
            footer: 'PAWS · For guidance only, does not replace professional advice'
          }
        }
      };

      // Load library (ESM preferred) and create chat if needed
      async function ensureN8nChat() {
        // Try ESM import
        try {
          const mod = await import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
          const createChat = mod.createChat ?? mod.default?.createChat ?? mod.default;
          window.n8nChatLibLoaded = true;
          if (typeof createChat === 'function' && !isChatMounted()) {
            createChat(createOptions);
            window.n8nChatInstance = true;
            console.log('[healthTipsEvents] created n8n chat via ESM import');
          }
          return;
        } catch (e) {
          console.warn('[healthTipsEvents] ESM import failed, falling back to UMD', e);
        }

        // Fallback: load UMD script if not already loaded
        try {
          const src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.umd.js';
          if (!document.querySelector(`script[src="${src}"]`)) {
            await new Promise((resolve, reject) => {
              const s = document.createElement('script');
              s.src = src;
              s.async = true;
              s.onload = resolve;
              s.onerror = reject;
              document.body.appendChild(s);
            });
          }
          const createChatGlobal = window.createChat ?? window.n8n?.createChat ?? window['@n8n']?.createChat;
          window.n8nChatLibLoaded = true;
          if (typeof createChatGlobal === 'function' && !isChatMounted()) {
            createChatGlobal(createOptions);
            window.n8nChatInstance = true;
            console.log('[healthTipsEvents] created n8n chat via UMD script');
          }
        } catch (err) {
          console.error('[healthTipsEvents] could not load n8n chat library', err);
        }
      }

      // Ensure chat is present now (or recreate if library already loaded but instance missing)
      try {
        await ensureN8nChat();
        if (window.n8nChatLibLoaded && !isChatMounted()) {
          // attempt once more using globals if available
          try {
            const createChatGlobal = window.createChat ?? window.n8n?.createChat ?? window['@n8n']?.createChat;
            if (typeof createChatGlobal === 'function') {
              createChatGlobal(createOptions);
              window.n8nChatInstance = true;
              console.log('[healthTipsEvents] recreated n8n chat via global createChat');
            }
          } catch (e) { /* ignore */ }
        }
      } catch (e) {
        console.warn('[healthTipsEvents] unexpected error ensuring n8n chat', e);
      }
    } catch (err) {
      console.error('[healthTipsEvents] unexpected error initializing n8n chat', err);
    }
  }

  // Load personalized tips for the logged-in user's first pet
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  const TOPICS = ['Nutrition', 'Exercise', 'Preventive Care', 'Dental Health', 'Grooming', 'Mental Wellbeing'];
  const TOPIC_ICONS = { Nutrition: '🥦', Exercise: '🏃', 'Preventive Care': '💉', 'Dental Health': '🦷', Grooming: '✂️', 'Mental Wellbeing': '🧠' };
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
              ${TOPIC_ICONS[topic] || '✨'} ${topic}
            </div>
            <div class="tip-list-item mt-3">
              <div class="tip-check" style="background:${color};color:${accent};">✓</div>
              <span style="font-family:'Roboto',sans-serif;font-size:0.875rem;color:#4A4A4A;">${tip}</span>
            </div>
          </div>
        `).join('');

        if (data.from_cache) {
          container.insertAdjacentHTML('beforeend', '<p class="text-xs col-span-3 text-center mt-1" style="color:#9CA3AF;">' + data.source + '</p>');
        }
      } catch (err) {
        loading.textContent = 'Could not load AI tips. Showing general advice below.';
      }
    }
  } catch (err) {
    console.error('Health tips AI error:', err);
  }
}