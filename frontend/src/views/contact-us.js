export function contactUsPage() {
  const faqs = [
    { q: 'How do I list my clinic on PAWS?', a: 'Fill out the form on our Work With Us page or send us an email. Onboarding takes less than 48 hours.' },
    { q: 'Is PAWS free for pet owners?', a: 'Yes, completely free. We charge clinics a small monthly fee for premium features, not pet owners.' },
    { q: 'How are clinic ratings calculated?', a: 'Ratings are based on verified reviews from real appointments made through the platform.' },
    { q: 'Can I request a home visit through PAWS?', a: 'Some clinics offer home visits. Filter by "Home Visit" in the specialties section to find them.' },
    { q: 'What if I have an emergency at 3am?', a: 'Use our Emergency section - it shows 24/7 clinics near you with direct WhatsApp and call links.' }
  ];

  const channels = [
    { icon: 'mail', label: 'Email', value: 'hola@paws.com.co', sub: 'We reply within 24 hours', color: 'purple', href: 'mailto:hola@paws.com.co' },
    { icon: 'chat', label: 'WhatsApp', value: '+57 300 000 0000', sub: 'Mon - Fri, 8am - 6pm', color: 'green', href: 'https://wa.me/573000000000' },
    { icon: 'location_on', label: 'Location', value: 'Medellin, Antioquia', sub: 'Serving the Aburra Valley', color: 'blue', href: '#' },
    { icon: 'photo_camera', label: 'Instagram', value: '@paws.medellin', sub: 'Daily pet tips & updates', color: 'yellow', href: 'https://instagram.com' }
  ];

  const topics = ['General Question', 'Clinic Support', 'Bug Report', 'Partnership', 'Other'];

  return `
    <div class="contact-page">
      <!-- Header -->
      <header class="contact-header">
        <div class="contact-header-content">
          <div class="contact-header-info">
            <div class="contact-badge">
              <span class="material-symbols-outlined" style="font-size: 14px;">chat</span>
              Get In Touch
            </div>
            <h1 class="contact-page-title">Contact Us</h1>
            <p class="contact-page-subtitle">We're here to help - and we actually reply.</p>
          </div>
          <button onclick="window.location.hash='/#/'" class="contact-back-btn">
            <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">arrow_back</span>
            Back to home
          </button>
        </div>
      </header>

      <main class="contact-main">

        <!-- Contact Channels -->
        <section class="contact-channels">
          <div class="contact-channels-grid">
            ${channels.map((c, i) => `
              <a href="${c.href}" class="contact-card contact-fade-up contact-fade-up-delay-${Math.min(i + 1, 3)}" target="_blank">
                <div class="contact-card-icon contact-card-icon--${c.color}">
                  <span class="material-symbols-outlined">${c.icon}</span>
                </div>
                <p class="contact-card-label">${c.label}</p>
                <p class="contact-card-value contact-card-value--${c.color}">${c.value}</p>
                <p class="contact-card-sub">${c.sub}</p>
              </a>
            `).join('')}
          </div>
        </section>

        <!-- Form + FAQ -->
        <section class="contact-content-grid">

          <!-- Contact Form -->
          <div class="contact-form-container">
            <h2 class="contact-form-title">Send Us a Message</h2>

            <!-- Topic Pills -->
            <div class="contact-topics">
              ${topics.map((t, i) => `
                <button class="contact-topic-btn ${i === 0 ? 'active' : ''}" onclick="selectTopic(this)">${t}</button>
              `).join('')}
            </div>

            <div class="contact-form-fields">
              <div class="contact-form-group">
                <label class="contact-form-label">Your Name *</label>
                <input type="text" id="c-name" class="contact-form-input" placeholder="Carlos Rodriguez">
              </div>
              <div class="contact-form-group">
                <label class="contact-form-label">Email *</label>
                <input type="email" id="c-email" class="contact-form-input" placeholder="carlos@gmail.com">
              </div>
              <div class="contact-form-group">
                <label class="contact-form-label">Message *</label>
                <textarea id="c-message" class="contact-form-input contact-form-textarea" rows="5" placeholder="Tell us what's on your mind..."></textarea>
              </div>
              <button class="contact-submit-btn" onclick="submitContact()">
                Send Message
                <span class="material-symbols-outlined" style="vertical-align: middle; margin-left: 4px; font-size: 18px;">arrow_forward</span>
              </button>
            </div>
            <p id="c-success" class="contact-success-msg">
              <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 4px;">check_circle</span>
              Message sent! We'll reply within 24 hours.
            </p>
          </div>

          <!-- FAQ -->
          <div class="contact-faq-section">
            <h2 class="contact-faq-title">Frequently Asked Questions</h2>
            ${faqs.map((f, i) => `
              <div class="contact-faq-item" id="faq-${i}">
                <button class="contact-faq-question" onclick="toggleFaq(${i})">
                  <span>${f.q}</span>
                  <span class="contact-faq-arrow material-symbols-outlined" id="arrow-${i}">expand_more</span>
                </button>
                <div class="contact-faq-answer" id="faq-a-${i}">${f.a}</div>
              </div>
            `).join('')}

            <!-- Still need help? -->
            <div class="contact-help-card">
              <div class="contact-help-icon">
                <span class="material-symbols-outlined" style="font-size: 1.8rem;">help</span>
              </div>
              <p class="contact-help-title">Still have questions?</p>
              <p class="contact-help-text">Our team is online Mon-Fri, 8am-6pm</p>
              <a href="https://wa.me/573000000000" target="_blank" class="contact-help-btn">
                <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle; margin-right: 4px;">chat</span>
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </section>

      </main>
    </div>
  `;
}

export function contactUsEvents() {
  // Initialize topic selection
  window.selectedTopic = 'General Question';

  window.selectTopic = function (btn) {
    document.querySelectorAll('.contact-topic-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.selectedTopic = btn.textContent;
  };

  window.toggleFaq = function (index) {
    const answer = document.getElementById('faq-a-' + index);
    const arrow = document.getElementById('arrow-' + index);
    const item = document.getElementById('faq-' + index);
    const isOpen = answer.classList.contains('open');

    // Close all
    document.querySelectorAll('.contact-faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.contact-faq-arrow').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.contact-faq-item').forEach(a => a.classList.remove('open'));

    if (!isOpen) {
      answer.classList.add('open');
      arrow.classList.add('open');
      item.classList.add('open');
    }
  };

  window.submitContact = function () {
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const message = document.getElementById('c-message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    // In production: POST to /api/contact
    console.log('Contact form:', { name, email, message, topic: window.selectedTopic });
    document.getElementById('c-success').classList.add('show');
    document.getElementById('c-name').value = '';
    document.getElementById('c-email').value = '';
    document.getElementById('c-message').value = '';
  };
}
