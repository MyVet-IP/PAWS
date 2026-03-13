export function workWithUsPage() {
  const roles = [
    {
      title: 'Veterinary Clinic Partner',
      icon: '🏥',
      color: '#B9FBC0',
      accent: '#059669',
      description: 'List your clinic on PAWS and reach thousands of pet owners actively looking for care in your neighborhood.',
      perks: ['Free listing for the first 3 months', 'Verified badge on your profile', 'Real-time appointment requests', 'Analytics dashboard for your clinic'],
      cta: 'List My Clinic'
    },
    {
      title: 'Specialist Veterinarian',
      icon: '🩺',
      color: '#F1C0E8',
      accent: '#6A4C93',
      description: 'Join our network of verified specialists and connect directly with pet owners who need your expertise.',
      perks: ['Build your personal specialist profile', 'Receive filtered appointment requests', 'Peer review and rating system', 'Monthly performance reports'],
      cta: 'Join as Specialist'
    },
    {
      title: 'Student / Intern',
      icon: '🎓',
      color: '#90BDF4',
      accent: '#2563eb',
      description: 'Are you a vet student or junior developer? We offer internships and collaboration opportunities.',
      perks: ['Real project experience', 'Mentorship from the core team', 'Reference letter upon completion', 'Flexible remote schedule'],
      cta: 'Apply Now'
    },
    {
      title: 'Community Ambassador',
      icon: '📣',
      color: '#FBF8CC',
      accent: '#d97706',
      description: 'Help us grow the PAWS community in your neighborhood. Perfect for passionate pet lovers.',
      perks: ['Share your love for animals', 'Exclusive PAWS Ambassador perks', 'Monthly community meetups', 'Co-create content and campaigns'],
      cta: 'Become Ambassador'
    }
  ];

  const benefits = [
    { icon: '📈', text: 'Access to 500+ active pet owners in Medellín' },
    { icon: '🔒', text: 'Secure, GDPR-compliant data handling' },
    { icon: '⚡', text: 'Onboarding in less than 48 hours' },
    { icon: '💬', text: 'Dedicated support via WhatsApp' },
    { icon: '📊', text: 'Real-time analytics for your profile' },
    { icon: '🌎', text: 'Growing presence across the Aburrá Valley' }
  ];

  return `
    <div class="min-h-screen" style="background: linear-gradient(160deg, #fef9ff 0%, #f5f8ff 60%, #f0fdf4 100%); font-family: 'Poppins', sans-serif;">

      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">

      <style>
        .role-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 20px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex; flex-direction: column;
        }
        .role-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.10); }
        .perk-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 9px 0; border-bottom: 1px solid #f5f5f5;
          font-family: 'Roboto', sans-serif; font-size: 0.875rem; color: #4A4A4A;
        }
        .perk-item:last-child { border-bottom: none; }
        .perk-check {
          width: 20px; height: 20px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; flex-shrink: 0; margin-top: 1px;
        }
        .role-cta {
          display: block; width: 100%; padding: 13px;
          border: none; border-radius: 12px;
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: 0.875rem; cursor: pointer;
          transition: opacity 0.2s;
          text-align: center;
        }
        .role-cta:hover { opacity: 0.85; }
        .benefit-item {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 0; border-bottom: 1px solid #f0f0f0;
          font-family: 'Roboto', sans-serif; font-size: 0.9rem; color: #4A4A4A;
        }
        .benefit-item:last-child { border-bottom: none; }
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          font-family: 'Roboto', sans-serif;
          font-size: 0.9rem;
          color: #333;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .form-input:focus { border-color: #6A4C93; }
        .form-label {
          display: block; margin-bottom: 6px;
          font-family: 'Poppins', sans-serif; font-size: 0.82rem;
          font-weight: 600; color: #4A4A4A;
        }
        .submit-btn {
          width: 100%; padding: 14px;
          background: #6A4C93; color: white;
          border: none; border-radius: 12px;
          font-family: 'Poppins', sans-serif; font-weight: 700;
          font-size: 0.95rem; cursor: pointer;
          transition: background 0.2s;
        }
        .submit-btn:hover { background: #5a3d80; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.45s ease forwards; }
      </style>

      <!-- Header -->
      <header class="bg-white shadow-sm border-b" style="border-color:#f0e8ff;">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <div style="display:inline-flex; align-items:center; gap:6px; background:#FBF8CC; color:#d97706; font-size:0.75rem; font-weight:600; padding:5px 14px; border-radius:999px; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px; font-family:'Poppins',sans-serif;">
                🚀 Opportunities
              </div>
              <h1 class="text-3xl font-bold" style="color:#333; font-family:'Poppins',sans-serif;">Work With Us</h1>
              <p class="mt-1" style="color:#4A4A4A; font-family:'Roboto',sans-serif; font-size:0.95rem;">Join the veterinary ecosystem that's changing pet care in Medellín</p>
            </div>
            <button onclick="window.location.hash='#/'" class="font-medium hover:opacity-75 transition" style="color:#6A4C93; font-family:'Poppins',sans-serif;">
              ← Back to home
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <!-- Roles Grid -->
        <section class="mb-16">
          <div class="text-center mb-10">
            <h2 class="text-2xl font-bold mb-2" style="color:#333; font-family:'Poppins',sans-serif;">How Can You Join?</h2>
            <p style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.9rem;">Choose the role that fits you best</p>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            ${roles.map((r, i) => `
              <div class="role-card fade-up" style="animation-delay:${i*0.08}s;">
                <div style="height:5px; background:${r.color};"></div>
                <div class="p-7 flex-1 flex flex-col">
                  <div class="flex items-center gap-3 mb-4">
                    <div style="width:48px; height:48px; border-radius:14px; background:${r.color}; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">${r.icon}</div>
                    <h3 class="text-lg font-bold" style="color:#333; font-family:'Poppins',sans-serif;">${r.title}</h3>
                  </div>
                  <p class="mb-5" style="color:#4A4A4A; font-family:'Roboto',sans-serif; font-size:0.875rem; line-height:1.6;">${r.description}</p>
                  <div class="flex-1 mb-5">
                    ${r.perks.map(p => `
                      <div class="perk-item">
                        <div class="perk-check" style="background:${r.color}; color:${r.accent};">✓</div>
                        <span>${p}</span>
                      </div>
                    `).join('')}
                  </div>
                  <button class="role-cta" style="background:${r.color}; color:${r.accent};" onclick="scrollToForm('${r.title}')">
                    ${r.cta} →
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Why Join -->
        <section class="mb-16">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-2xl font-bold mb-6" style="color:#333; font-family:'Poppins',sans-serif;">Why Partner With PAWS?</h2>
              ${benefits.map(b => `
                <div class="benefit-item">
                  <span style="font-size:1.3rem;">${b.icon}</span>
                  <span>${b.text}</span>
                </div>
              `).join('')}
            </div>
            <div style="background:linear-gradient(135deg,#6A4C93,#8b5cf6); border-radius:24px; padding:40px; color:white; text-align:center;">
              <div style="font-size:3rem; margin-bottom:16px;">📈</div>
              <div class="grid grid-cols-2 gap-6 mb-6">
                ${[
                  { n:'500+', l:'Pet Owners' },
                  { n:'8', l:'Partner Clinics' },
                  { n:'4.8★', l:'Avg Rating' },
                  { n:'48h', l:'Onboarding' }
                ].map(s=>`
                  <div>
                    <div style="font-size:1.6rem; font-weight:700; font-family:'Poppins',sans-serif;">${s.n}</div>
                    <div style="font-size:0.8rem; opacity:0.75; font-family:'Roboto',sans-serif;">${s.l}</div>
                  </div>
                `).join('')}
              </div>
              <p style="font-family:'Roboto',sans-serif; font-size:0.85rem; opacity:0.8; line-height:1.6;">Numbers growing every week as we expand across the Aburrá Valley.</p>
            </div>
          </div>
        </section>

        <!-- Contact Form -->
        <section id="join-form" style="background:white; border-radius:24px; padding:48px; box-shadow:0 2px 20px rgba(0,0,0,0.07); max-width:640px; margin:0 auto;">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold mb-2" style="color:#333; font-family:'Poppins',sans-serif;">Get In Touch</h2>
            <p style="color:#6b7280; font-family:'Roboto',sans-serif; font-size:0.9rem;">Fill out the form and we'll reach out within 24 hours</p>
          </div>
          <div style="display:flex; flex-direction:column; gap:18px;">
            <div>
              <label class="form-label">Full Name *</label>
              <input type="text" id="ww-name" class="form-input" placeholder="María García">
            </div>
            <div>
              <label class="form-label">Email *</label>
              <input type="email" id="ww-email" class="form-input" placeholder="maria@clinica.com">
            </div>
            <div>
              <label class="form-label">Phone / WhatsApp</label>
              <input type="tel" id="ww-phone" class="form-input" placeholder="+57 300 000 0000">
            </div>
            <div>
              <label class="form-label">I'm interested in *</label>
              <select id="ww-role" class="form-input" style="background:white; cursor:pointer;">
                <option value="">Select an option...</option>
                <option>Veterinary Clinic Partner</option>
                <option>Specialist Veterinarian</option>
                <option>Student / Intern</option>
                <option>Community Ambassador</option>
              </select>
            </div>
            <div>
              <label class="form-label">Tell us about yourself</label>
              <textarea id="ww-message" class="form-input" rows="4" placeholder="Brief description of your clinic, specialty, or background..."></textarea>
            </div>
            <button class="submit-btn" onclick="submitWorkForm()">Send Application →</button>
          </div>
          <p id="ww-success" style="display:none; text-align:center; color:#059669; font-family:'Poppins',sans-serif; font-weight:600; margin-top:16px;">
            ✅ Application received! We'll contact you within 24h.
          </p>
        </section>

      </main>
    </div>

    <script>
      function scrollToForm(role) {
        document.getElementById('join-form').scrollIntoView({ behavior: 'smooth' });
        const select = document.getElementById('ww-role');
        if (select) {
          for (let opt of select.options) {
            if (opt.text === role) { select.value = opt.value; break; }
          }
        }
      }

      function submitWorkForm() {
        const name  = document.getElementById('ww-name').value.trim();
        const email = document.getElementById('ww-email').value.trim();
        const role  = document.getElementById('ww-role').value;

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
        document.getElementById('ww-success').style.display = 'block';
        document.getElementById('ww-name').value = '';
        document.getElementById('ww-email').value = '';
        document.getElementById('ww-phone').value = '';
        document.getElementById('ww-role').value = '';
        document.getElementById('ww-message').value = '';
      }
    </script>
  `;
}

export function workWithUsEvents() {
  // Events handled inline
}
