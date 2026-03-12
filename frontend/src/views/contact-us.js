export function contactUsPage() {
  const faqs = [
    { q: 'How do I list my clinic on PAWS?', a: 'Fill out the form on our Work With Us page or send us an email. Onboarding takes less than 48 hours.' },
    { q: 'Is PAWS free for pet owners?', a: 'Yes, completely free. We charge clinics a small monthly fee for premium features, not pet owners.' },
    { q: 'How are clinic ratings calculated?', a: 'Ratings are based on verified reviews from real appointments made through the platform.' },
    { q: 'Can I request a home visit through PAWS?', a: 'Some clinics offer home visits. Filter by "Home Visit" in the specialties section to find them.' },
    { q: 'What if I have an emergency at 3am?', a: 'Use our Emergency section — it shows 24/7 clinics near you with direct WhatsApp and call links.' }
  ];

  const channels = [
    { icon: '📧', label: 'Email', value: 'hola@paws.com.co', sub: 'We reply within 24 hours', color: '#F1C0E8', accent: '#6A4C93', href: 'mailto:hola@paws.com.co' },
    { icon: '💬', label: 'WhatsApp', value: '+57 300 000 0000', sub: 'Mon – Fri, 8am – 6pm', color: '#B9FBC0', accent: '#059669', href: 'https://wa.me/573000000000' },
    { icon: '📍', label: 'Location', value: 'Medellín, Antioquia', sub: 'Serving the Aburrá Valley', color: '#90BDF4', accent: '#2563eb', href: '#' },
    { icon: '📱', label: 'Instagram', value: '@paws.medellin', sub: 'Daily pet tips & updates', color: '#FBF8CC', accent: '#d97706', href: 'https://instagram.com' }
  ];

  return `
    <div class="min-h-screen" style="background: linear-gradient(160deg, #fef9ff 0%, #f8f6ff 60%, #f0fdf4 100%); font-family: 'Poppins', sans-serif;">

      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">

      <style>
        .contact-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          display: block;
        }
        .contact-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.09); }
        .contact-icon {
          width: 64px; height: 64px; border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; margin: 0 auto 16px;
        }
        .form-input {
          width: 100%; padding: 12px 16px;
          border: 1.5px solid #e5e7eb; border-radius: 12px;
          font-family: 'Roboto', sans-serif; font-size: 0.9rem; color: #333;
          outline: none; transition: border-color 0.2s; box-sizing: border-box;
          background: #fafafa;
        }
        .form-input:focus { border-color: #6A4C93; background: white; }
        .form-label {
          display: block; margin-bottom: 6px;
          font-family: 'Poppins', sans-serif; font-size: 0.82rem;
          font-weight: 600; color: #4A4A4A;
        }
        .submit-btn {
          width: 100%; padding: 14px;
          background: #6A4C93; color: white; border: none;
          border-radius: 12px; font-family: 'Poppins', sans-serif;
          font-weight: 700; font-size: 0.95rem; cursor: pointer;
          transition: background 0.2s;
        }
        .submit-btn:hover { background: #5a3d80; }
        .faq-item {
          background: white;
          border-radius: 14px;
          border: 1.5px solid #f0e8ff;
          overflow: hidden;
          margin-bottom: 10px;
          transition: border-color 0.2s;
        }
        .faq-item.open { border-color: #6A4C93; }
        .faq-q {
          width: 100%; background: none; border: none;
          padding: 18px 20px; text-align: left;
          font-family: 'Poppins', sans-serif; font-size: 0.9rem;
          font-weight: 600; color: #333; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          gap: 12px;
        }
        .faq-a {
          padding: 0 20px; max-height: 0; overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s;
          font-family: 'Roboto', sans-serif; font-size: 0.875rem;
          color: #4A4A4A; line-height: 1.6;
        }
        .faq-a.open { max-height: 200px; padding: 0 20px 18px; }
        .faq-arrow { transition: transform 0.3s; flex-shrink:0; color:#6A4C93; font-size:1rem; }
        .faq-arrow.open { transform: rotate(180deg); }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.45s ease forwards; }
        .topic-btn {
          padding: 7px 18px;
          border-radius: 999px; border: 1.5px solid #e5e7eb;
          background: white; font-family: 'Poppins', sans-serif;
          font-size: 0.8rem; font-weight: 500; color: #6b7280;
          cursor: pointer; transition: all 0.15s;
        }
        .topic-btn.active, .topic-btn:hover {
          background: #6A4C93; border-color: #6A4C93; color: white;
        }
      </style>

      <!-- Header -->
      <header class="bg-white shadow-sm border-b" style="border-color:#f0e8ff;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <div style="display:inline-flex; align-items:center; gap:6px; background:#FFCFD2; color:#dc2626; font-size:0.75rem; font-weight:600; padding:5px 14px; border-radius:999px; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px; font-family:'Poppins',sans-serif;">
                💬 Get In Touch
              </div>
              <h1 class="text-3xl font-bold" style="color:#333; font-family:'Poppins',sans-serif;">Contact Us</h1>
              <p class="mt-1" style="color:#4A4A4A; font-family:'Roboto',sans-serif; font-size:0.95rem;">We're here to help — and we actually reply.</p>
            </div>
            <button onclick="window.location.hash='#/'" class="font-medium hover:opacity-75 transition" style="color:#6A4C93; font-family:'Poppins',sans-serif;">
              ← Back to home
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <!-- Contact Channels -->
        <section class="mb-14">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            ${channels.map((c, i) => `
              <a href="${c.href}" class="contact-card fade-up" style="animation-delay:${i*0.07}s;" target="_blank">
                <div class="contact-icon" style="background:${c.color};">${c.icon}</div>
                <p class="font-bold mb-1" style="color:#333; font-family:'Poppins',sans-serif; font-size:0.85rem;">${c.label}</p>
                <p style="color:${c.accent}; font-family:'Poppins',sans-serif; font-size:0.82rem; font-weight:600; margin-bottom:4px;">${c.value}</p>
                <p style="color:#9ca3af; font-family:'Roboto',sans-serif; font-size:0.75rem;">${c.sub}</p>
              </a>
            `).join('')}
          </div>
        </section>

        <!-- Form + FAQ -->
        <section class="grid md:grid-cols-2 gap-10 mb-14">

          <!-- Contact Form -->
          <div style="background:white; border-radius:24px; padding:40px; box-shadow:0 2px 20px rgba(0,0,0,0.06);">
            <h2 class="text-xl font-bold mb-6" style="color:#333; font-family:'Poppins',sans-serif;">Send Us a Message</h2>

            <!-- Topic Pills -->
            <div class="flex flex-wrap gap-2 mb-6">
              ${['General Question', 'Clinic Support', 'Bug Report', 'Partnership', 'Other'].map((t, i) => `
                <button class="topic-btn ${i===0?'active':''}" onclick="selectTopic(this)">${t}</button>
              `).join('')}
            </div>

            <div style="display:flex; flex-direction:column; gap:16px;">
              <div>
                <label class="form-label">Your Name *</label>
                <input type="text" id="c-name" class="form-input" placeholder="Carlos Rodríguez">
              </div>
              <div>
                <label class="form-label">Email *</label>
                <input type="email" id="c-email" class="form-input" placeholder="carlos@gmail.com">
              </div>
              <div>
                <label class="form-label">Message *</label>
                <textarea id="c-message" class="form-input" rows="5" placeholder="Tell us what's on your mind..."></textarea>
              </div>
              <button class="submit-btn" onclick="submitContact()">Send Message →</button>
            </div>
            <p id="c-success" style="display:none; text-align:center; color:#059669; font-family:'Poppins',sans-serif; font-weight:600; margin-top:16px; font-size:0.9rem;">
              ✅ Message sent! We'll reply within 24 hours.
            </p>
          </div>

          <!-- FAQ -->
          <div>
            <h2 class="text-xl font-bold mb-6" style="color:#333; font-family:'Poppins',sans-serif;">Frequently Asked Questions</h2>
            ${faqs.map((f, i) => `
              <div class="faq-item" id="faq-${i}">
                <button class="faq-q" onclick="toggleFaq(${i})">
                  <span>${f.q}</span>
                  <span class="faq-arrow" id="arrow-${i}">▾</span>
                </button>
                <div class="faq-a" id="faq-a-${i}">${f.a}</div>
              </div>
            `).join('')}

            <!-- Still need help? -->
            <div style="background:linear-gradient(135deg,#6A4C93,#8b5cf6); border-radius:16px; padding:24px; text-align:center; color:white; margin-top:20px;">
              <div style="font-size:1.8rem; margin-bottom:8px;">🤔</div>
              <p class="font-semibold mb-1" style="font-family:'Poppins',sans-serif; font-size:0.9rem;">Still have questions?</p>
              <p style="font-family:'Roboto',sans-serif; font-size:0.8rem; opacity:0.8; margin-bottom:14px;">Our team is online Mon–Fri, 8am–6pm</p>
              <a href="https://wa.me/573000000000" target="_blank" style="display:inline-block; background:#B9FBC0; color:#059669; padding:9px 22px; border-radius:10px; font-family:'Poppins',sans-serif; font-weight:600; font-size:0.82rem; text-decoration:none;">
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>

        </section>

      </main>
    </div>

    <script>
      let selectedTopic = 'General Question';

      function selectTopic(btn) {
        document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTopic = btn.textContent;
      }

      function toggleFaq(index) {
        const answer = document.getElementById('faq-a-' + index);
        const arrow  = document.getElementById('arrow-' + index);
        const item   = document.getElementById('faq-' + index);
        const isOpen = answer.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
        document.querySelectorAll('.faq-arrow').forEach(a => a.classList.remove('open'));
        document.querySelectorAll('.faq-item').forEach(a => a.classList.remove('open'));

        if (!isOpen) {
          answer.classList.add('open');
          arrow.classList.add('open');
          item.classList.add('open');
        }
      }

      function submitContact() {
        const name    = document.getElementById('c-name').value.trim();
        const email   = document.getElementById('c-email').value.trim();
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
        console.log('Contact form:', { name, email, message, topic: selectedTopic });
        document.getElementById('c-success').style.display = 'block';
        document.getElementById('c-name').value = '';
        document.getElementById('c-email').value = '';
        document.getElementById('c-message').value = '';
      }
    </script>
  `;
}

export function contactUsEvents() {
  // Events handled inline
}
