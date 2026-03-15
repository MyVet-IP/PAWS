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
            <button class="filter-pill" data-filter="Nutrition" onclick="filterTips(this, 'Nutrition')">🥦 Nutrition</button>
            <button class="filter-pill" data-filter="Exercise" onclick="filterTips(this, 'Exercise')">🏃 Exercise</button>
            <button class="filter-pill" data-filter="Preventive Care" onclick="filterTips(this, 'Preventive Care')">💉 Prevention</button>
            <button class="filter-pill" data-filter="Dental Health" onclick="filterTips(this, 'Dental Health')">🦷 Dental</button>
            <button class="filter-pill" data-filter="Mental Wellbeing" onclick="filterTips(this, 'Mental Wellbeing')">🧠 Mental Health</button>
            <button class="filter-pill" data-filter="Grooming" onclick="filterTips(this, 'Grooming')">✂️ Grooming</button>
          </div>
        </div>
      </section>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

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
      { season: 'Spring', icon: '🌸', tip: 'Watch for seasonal allergies and increase grooming frequency', color: '#FFCFD2' },
      { season: 'Summer', icon: '☀️', tip: 'Hydration is critical. Never leave pets in parked cars', color: '#FBF8CC' },
      { season: 'Rainy Season', icon: '🌧️', tip: 'Check for fungal infections and keep paws dry after walks', color: '#90BDF4' },
      { season: 'Year-Round', icon: '🌿', tip: 'In Medellín\'s climate, mosquito prevention is always needed', color: '#B9FBC0' }
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
        alert('Thanks for subscribing! Check your inbox soon 🐾');
        document.getElementById('newsletter-email').value = '';
      }
    </script>
  `;
}

export function healthTipsEvents() {
  // Events handled inline via onclick
}
