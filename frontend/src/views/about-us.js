export function aboutUsPage() {
  const team = [
    { name: 'Ulith', role: 'Project Lead', emoji: '1', color: 'purple' },
    { name: 'Ximena', role: 'Backend & Deployment', emoji: '2', color: 'blue' },
    { name: 'Anderson', role: 'Research & Field Work', emoji: '3', color: 'green' },
    { name: 'Andreina', role: 'UI/UX Design', emoji: '4', color: 'yellow' },
    { name: 'Faiber', role: 'AI Integration', emoji: '5', color: 'pink' },
    { name: 'Jose', role: 'Frontend & Geolocation', emoji: '6', color: 'purple' }
  ];

  const values = [
    { icon: 'heart', title: 'Pet-First Philosophy', description: 'Every decision we make starts with one question: is this better for the pets of Medellin?', color: 'pink' },
    { icon: 'science', title: 'Evidence-Based Care', description: 'We only partner with clinics that meet rigorous quality standards and maintain verified credentials.', color: 'blue' },
    { icon: 'handshake', title: 'Community Driven', description: 'We are built by Medellin for Medellin. The Paisa community and its pets are our reason for existing.', color: 'green' },
    { icon: 'rocket', title: 'Technology for Good', description: 'We use modern technology not for its own sake, but to genuinely reduce the time between a sick pet and quality care.', color: 'yellow' }
  ];

  const getAvatarBg = (color) => {
    const colors = {
      purple: 'background: var(--color-purple);',
      blue: 'background: var(--color-blue);',
      green: 'background: var(--color-green);',
      yellow: 'background: var(--color-yellow);',
      pink: 'background: var(--color-pink);'
    };
    return colors[color] || colors.purple;
  };

  return `
    <div class="about-page">

      <!-- Header -->
      <header class="about-header">
        <div class="about-header-content">
          <button onclick="window.location.hash='#/'" class="about-back-btn">
            <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">arrow_back</span>
            Back to home
          </button>
        </div>
      </header>

      <!-- Hero -->
      <section class="about-hero">
        <div class="about-hero-circle-1"></div>
        <div class="about-hero-circle-2"></div>
        <div class="about-hero-content about-fade-up">
          <div class="about-hero-icon">
            <span class="material-symbols-outlined" style="font-size: 3rem;">pets</span>
          </div>
          <h1 class="about-hero-title">We Exist Because <br>Pets Deserve Better</h1>
          <p class="about-hero-subtitle">
            PAWS was born in Medellin with a simple mission: make quality veterinary care as easy to find as ordering food online.
          </p>
        </div>
      </section>

      <main class="about-main">

        <!-- Our Story -->
        <section class="about-section">
          <div class="about-story-grid">
            <div class="about-fade-up">
              <div class="about-story-badge">Our Story</div>
              <h2 class="about-story-title">From a Classroom Project to Medellin's Vet Platform</h2>
              <p class="about-story-text">
                PAWS started as a university project by a team of six students who shared a common frustration: finding a good vet for a sick pet in Medellin at midnight was nearly impossible.
              </p>
              <p class="about-story-text">
                We spent months talking to pet owners across El Poblado, Laureles, Envigado, and Bello. The problem was always the same - too many clinics with no way to compare them, and no real-time information about availability or specialties.
              </p>
              <p class="about-story-text">
                So we built PAWS: a platform that connects Medellin's pet owners with the right care at the right moment, powered by geolocation and real data from verified clinics.
              </p>
            </div>
            <div class="about-timeline-card">
              <div class="about-milestone">
                <div class="about-milestone-dot about-milestone-dot--green"></div>
                <div>
                  <p class="about-milestone-title">The Idea</p>
                  <p class="about-milestone-desc">Six students, one shared problem, and a Scrum board on a Monday morning.</p>
                </div>
              </div>
              <div class="about-milestone">
                <div class="about-milestone-dot about-milestone-dot--blue"></div>
                <div>
                  <p class="about-milestone-title">Sprint 1-3: Foundation</p>
                  <p class="about-milestone-desc">Database, authentication, clinic listings, and emergency messaging built from scratch.</p>
                </div>
              </div>
              <div class="about-milestone">
                <div class="about-milestone-dot about-milestone-dot--purple"></div>
                <div>
                  <p class="about-milestone-title">Sprint 4-5: Intelligence</p>
                  <p class="about-milestone-desc">Geolocation, filters, AI integration, and real clinic partnerships added.</p>
                </div>
              </div>
              <div class="about-milestone">
                <div class="about-milestone-dot about-milestone-dot--yellow"></div>
                <div>
                  <p class="about-milestone-title">Today & Beyond</p>
                  <p class="about-milestone-desc">Serving the Aburra Valley with plans to expand across Colombia.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Values -->
        <section class="about-section">
          <div class="about-values-header">
            <h2 class="about-values-title">What We Stand For</h2>
            <p class="about-values-subtitle">The principles that guide every decision we make</p>
          </div>
          <div class="about-values-grid">
            ${values.map((v, i) => `
              <div class="about-value-card about-fade-up about-fade-up-delay-${i + 1}">
                <div class="about-value-icon about-value-icon--${v.color}">
                  <span class="material-symbols-outlined">${v.icon === 'heart' ? 'favorite' : v.icon === 'science' ? 'science' : v.icon === 'handshake' ? 'handshake' : 'rocket_launch'}</span>
                </div>
                <div>
                  <h3 class="about-value-title">${v.title}</h3>
                  <p class="about-value-desc">${v.description}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Team -->
        <section class="about-section">
          <div class="about-team-header">
            <h2 class="about-team-title">Meet the Team</h2>
            <p class="about-team-subtitle">Six people. One goal. Infinite love for animals.</p>
          </div>
          <div class="about-team-grid">
            ${team.map((m, i) => `
              <div class="about-team-card about-fade-up about-fade-up-delay-${Math.min(i + 1, 5)}">
                <div class="about-team-avatar" style="${getAvatarBg(m.color)}">
                  <span class="material-symbols-outlined">person</span>
                </div>
                <h3 class="about-team-name">${m.name}</h3>
                <p class="about-team-role">${m.role}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- CTA -->
        <section class="about-cta">
          <h2 class="about-cta-title">Want to Be Part of PAWS?</h2>
          <p class="about-cta-text">We're always looking for passionate people - whether you're a vet, a developer, or just a pet lover.</p>
          <div class="about-cta-buttons">
            <button onclick="window.location.hash='#/work-with-us'" class="about-cta-btn-primary">
              Work With Us
            </button>
            <button onclick="window.location.hash='#/contact'" class="about-cta-btn-secondary">
              Contact Us
            </button>
          </div>
        </section>

      </main>
    </div>
  `;
}

export function aboutUsEvents() {
  // Events handled inline via onclick attributes
}
