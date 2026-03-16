export function workWithUsPage() {
  const roles = [
    {
      title: 'Veterinary Clinic Partner',
      icon: 'local_hospital',
      color: 'green',
      description: 'List your clinic on PAWS and reach thousands of pet owners actively looking for care in your neighborhood.',
      perks: ['Free listing for the first 3 months', 'Verified badge on your profile', 'Real-time appointment requests', 'Analytics dashboard for your clinic'],
      cta: 'List My Clinic'
    },
    {
      title: 'Specialist Veterinarian',
      icon: 'stethoscope',
      color: 'purple',
      description: 'Join our network of verified specialists and connect directly with pet owners who need your expertise.',
      perks: ['Build your personal specialist profile', 'Receive filtered appointment requests', 'Peer review and rating system', 'Monthly performance reports'],
      cta: 'Join as Specialist'
    },
    {
      title: 'Student / Intern',
      icon: 'school',
      color: 'blue',
      description: 'Are you a vet student or junior developer? We offer internships and collaboration opportunities.',
      perks: ['Real project experience', 'Mentorship from the core team', 'Reference letter upon completion', 'Flexible remote schedule'],
      cta: 'Apply Now'
    },
    {
      title: 'Community Ambassador',
      icon: 'campaign',
      color: 'yellow',
      description: 'Help us grow the PAWS community in your neighborhood. Perfect for passionate pet lovers.',
      perks: ['Share your love for animals', 'Exclusive PAWS Ambassador perks', 'Monthly community meetups', 'Co-create content and campaigns'],
      cta: 'Become Ambassador'
    }
  ];

  const benefits = [
    { icon: 'trending_up', text: 'Access to 500+ active pet owners in Medellin' },
    { icon: 'lock', text: 'Secure, GDPR-compliant data handling' },
    { icon: 'bolt', text: 'Onboarding in less than 48 hours' },
    { icon: 'chat', text: 'Dedicated support via WhatsApp' },
    { icon: 'analytics', text: 'Real-time analytics for your profile' },
    { icon: 'public', text: 'Growing presence across the Aburra Valley' }
  ];

  const stats = [
    { n: '500+', l: 'Pet Owners' },
    { n: '8', l: 'Partner Clinics' },
    { n: '4.8', l: 'Avg Rating' },
    { n: '48h', l: 'Onboarding' }
  ];

  return `
    <div class="work-page">

      <!-- Header -->
      <header class="work-header">
        <div class="work-header-content">
          <div class="work-header-info">
            <div class="work-badge">
              <span class="material-symbols-outlined" style="font-size: 14px;">rocket_launch</span>
              Opportunities
            </div>
            <h1 class="work-page-title">Work With Us</h1>
            <p class="work-page-subtitle">Join the veterinary ecosystem that's changing pet care in Medellin</p>
          </div>
          <button onclick="window.location.hash='/#/'" class="work-back-btn">
            <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">arrow_back</span>
            Back to home
          </button>
        </div>
      </header>

      <main class="work-main">

        <!-- Roles Grid -->
        <section class="work-roles-section">
          <div class="work-section-header">
            <h2 class="work-section-title">How Can You Join?</h2>
            <p class="work-section-subtitle">Choose the role that fits you best</p>
          </div>
          <div class="work-roles-grid">
            ${roles.map((r, i) => `
              <div class="work-role-card work-fade-up work-fade-up-delay-${Math.min(i + 1, 3)}">
                <div class="work-role-accent work-role-accent--${r.color}"></div>
                <div class="work-role-content">
                  <div class="work-role-header">
                    <div class="work-role-icon work-role-icon--${r.color}">
                      <span class="material-symbols-outlined">${r.icon}</span>
                    </div>
                    <h3 class="work-role-title">${r.title}</h3>
                  </div>
                  <p class="work-role-desc">${r.description}</p>
                  <div class="work-perks">
                    ${r.perks.map(p => `
                      <div class="work-perk-item">
                        <div class="work-perk-check work-perk-check--${r.color}">
                          <span class="material-symbols-outlined" style="font-size: 12px;">check</span>
                        </div>
                        <span>${p}</span>
                      </div>
                    `).join('')}
                  </div>
                  <button class="work-role-cta work-role-cta--${r.color}" onclick="scrollToForm('${r.title}')">
                    ${r.cta}
                    <span class="material-symbols-outlined" style="vertical-align: middle; margin-left: 4px; font-size: 16px;">arrow_forward</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Why Join -->
        <section class="work-why-section">
          <div class="work-why-grid">
            <div>
              <h2 class="work-why-title">Why Partner With PAWS?</h2>
              ${benefits.map(b => `
                <div class="work-benefit-item">
                  <span class="work-benefit-icon material-symbols-outlined">${b.icon}</span>
                  <span>${b.text}</span>
                </div>
              `).join('')}
            </div>
            <div class="work-stats-card">
              <div class="work-stats-icon">
                <span class="material-symbols-outlined" style="font-size: 3rem;">trending_up</span>
              </div>
              <div class="work-stats-grid">
                ${stats.map(s => `
                  <div>
                    <div class="work-stat-number">${s.n}</div>
                    <div class="work-stat-label">${s.l}</div>
                  </div>
                `).join('')}
              </div>
              <p class="work-stats-text">Numbers growing every week as we expand across the Aburra Valley.</p>
            </div>
          </div>
        </section>

        <!-- Contact Form -->
        <section id="join-form" class="work-form-container">
          <div class="work-form-header">
            <h2 class="work-form-title">Get In Touch</h2>
            <p class="work-form-subtitle">Fill out the form and we'll reach out within 24 hours</p>
          </div>
          <div class="work-form-fields">
            <div class="work-form-group">
              <label class="work-form-label">Full Name *</label>
              <input type="text" id="ww-name" class="work-form-input" placeholder="Maria Garcia">
            </div>
            <div class="work-form-group">
              <label class="work-form-label">Email *</label>
              <input type="email" id="ww-email" class="work-form-input" placeholder="maria@clinica.com">
            </div>
            <div class="work-form-group">
              <label class="work-form-label">Phone / WhatsApp</label>
              <input type="tel" id="ww-phone" class="work-form-input" placeholder="+57 302 226 6234">
            </div>
            <div class="work-form-group">
              <label class="work-form-label">I'm interested in *</label>
              <select id="ww-role" class="work-form-input work-form-select">
                <option value="">Select an option...</option>
                <option>Veterinary Clinic Partner</option>
                <option>Specialist Veterinarian</option>
                <option>Student / Intern</option>
                <option>Community Ambassador</option>
              </select>
            </div>
            <div class="work-form-group">
              <label class="work-form-label">Tell us about yourself</label>
              <textarea id="ww-message" class="work-form-input work-form-textarea" rows="4" placeholder="Brief description of your clinic, specialty, or background..."></textarea>
            </div>
            <button class="work-submit-btn" onclick="submitWorkForm()">
              Send Application
              <span class="material-symbols-outlined" style="vertical-align: middle; margin-left: 4px; font-size: 18px;">arrow_forward</span>
            </button>
          </div>
          <p id="ww-success" class="work-success-msg">
            <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">check_circle</span>
            Application received! We'll contact you within 24h.
          </p>
        </section>

      </main>
    </div>
  `;
}

export function workWithUsEvents() {
  window.scrollToForm = function (role) {
    document.getElementById('join-form').scrollIntoView({ behavior: 'smooth' });
    const select = document.getElementById('ww-role');
    if (select) {
      for (let opt of select.options) {
        if (opt.text === role) {
          select.value = opt.value;
          break;
        }
      }
    }
  };

  window.submitWorkForm = function () {
    const name = document.getElementById('ww-name').value.trim();
    const email = document.getElementById('ww-email').value.trim();
    const role = document.getElementById('ww-role').value;

    if (!name || !email || !role) {
      alert('Please fill in your name, email, and area of interest.');
      return;
    }
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    // In production: POST to /api/work-with-us
    console.log('Work application:', { name, email, role });
    document.getElementById('ww-success').classList.add('show');
    document.getElementById('ww-name').value = '';
    document.getElementById('ww-email').value = '';
    document.getElementById('ww-phone').value = '';
    document.getElementById('ww-role').value = '';
    document.getElementById('ww-message').value = '';
  };
}
