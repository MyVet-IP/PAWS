export function Footer() {
  return `
  <footer style="background:linear-gradient(135deg,#fce4ec 0%,#f3e5f5 40%,#e3f2fd 100%);
                 border-top:1px solid rgba(106,76,147,0.12);">

    <!-- Main footer content -->
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">

        <!-- Brand column -->
        <div class="md:col-span-1 flex flex-col gap-4">
          <a href="#/" class="flex items-center gap-3 w-fit">
            <img src="/frontend/assets/images/PAWS_logo_bgless.png"
                 alt="PAWS"
                 style="width:48px;height:48px;object-fit:contain;
                        filter:drop-shadow(0 2px 6px rgba(106,76,147,0.25));"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
            <div style="display:none;width:48px;height:48px;border-radius:12px;
                        background:linear-gradient(135deg,#F1C0E8,#90BDF4);
                        align-items:center;justify-content:center;font-size:22px;"><svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z'/></svg></div>
            <div>
              <p style="font-family:'Poppins',sans-serif;font-weight:800;font-size:18px;
                        background:linear-gradient(135deg,#6A4C93,#2563eb);
                        -webkit-background-clip:text;-webkit-text-fill-color:transparent;
                        background-clip:text;line-height:1.1;">PAWS</p>
              <p style="font-size:8px;font-weight:500;letter-spacing:0.06em;
                        color:#9333ea;opacity:0.75;text-transform:uppercase;
                        font-family:'Roboto',sans-serif;">
                Protection · Accessibility · Wellbeing · Support
              </p>
            </div>
          </a>
          <p style="font-size:12px;color:var(--text-muted);font-family:'Roboto',sans-serif;
                    line-height:1.6;max-width:200px;">
            Connecting pet owners in Medellín with the best veterinary professionals.
          </p>
        </div>

        <!-- Services column -->
        <div class="flex flex-col gap-3">
          <h4 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:12px;
                     text-transform:uppercase;letter-spacing:0.08em;color:var(--text-highlight);">
            Services
          </h4>
          <div class="flex flex-col gap-2">
            ${[
      { href: "#/clinics", label: "Veterinary Clinics" },
      { href: "#/emergency", label: "24/7 Emergency" },
      { href: "#/services", label: "Our Services" },
      { href: "#/specialists", label: "Specialists" },
      { href: "#/map-page", label: "Clinic Map" },
    ].map(l => `
              <a href="${l.href}" class="footer-link">${l.label}</a>
            `).join('')}
          </div>
        </div>

        <!-- Company column -->
        <div class="flex flex-col gap-3">
          <h4 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:12px;
                     text-transform:uppercase;letter-spacing:0.08em;color:var(--text-highlight);">
            Company
          </h4>
          <div class="flex flex-col gap-2">
            ${[
      { href: "#/about-us", label: "About Us" },
      { href: "#/tips", label: "Health Tips" },
      { href: "#/work-with-us", label: "Work with Us" },
      { href: "#/contact", label: "Contact" },
    ].map(l => `
              <a href="${l.href}" class="footer-link">${l.label}</a>
            `).join('')}
          </div>
        </div>

        <!-- Social + App column -->
        <div class="flex flex-col gap-3">
          <h4 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:12px;
                     text-transform:uppercase;letter-spacing:0.08em;color:var(--text-highlight);">
            Follow Us
          </h4>
          <div class="flex gap-3">
            <!-- Instagram -->
            <a href="#" class="footer-social-btn" aria-label="Instagram">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <!-- Facebook -->
            <a href="#" class="footer-social-btn" aria-label="Facebook">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <!-- WhatsApp -->
            <a href="#" class="footer-social-btn" aria-label="WhatsApp">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          <!-- Quick access -->
          <div class="mt-2">
            <a href="#/register"
               class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold
                      font-poppins text-white transition"
               style="background:linear-gradient(135deg,var(--text-highlight),#5b8dee);
                      box-shadow:0 4px 12px rgba(106,76,147,0.30);"
               onmouseenter="this.style.opacity='0.90'"
               onmouseleave="this.style.opacity='1'">
              <svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M5 3l1.5 4.5L11 9l-4.5 1.5L5 15l-1.5-4.5L-1 9l4.5-1.5L5 3zM19 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z'/></svg> Create free account
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div style="border-top:1px solid rgba(106,76,147,0.10);">
      <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p style="font-size:11px;color:var(--text-muted);font-family:'Roboto',sans-serif;">
          © ${new Date().getFullYear()} PAWS. All rights reserved.
        </p>
        <div class="flex items-center gap-5">
          <a href="#/privacy"
             style="font-size:11px;color:var(--text-muted);font-family:'Roboto',sans-serif;
                    transition:var(--transition-fast);"
             onmouseenter="this.style.color='var(--text-highlight)'"
             onmouseleave="this.style.color='var(--text-muted)'">
            Privacy Policy
          </a>
          <a href="#/terms"
             style="font-size:11px;color:var(--text-muted);font-family:'Roboto',sans-serif;
                    transition:var(--transition-fast);"
             onmouseenter="this.style.color='var(--text-highlight)'"
             onmouseleave="this.style.color='var(--text-muted)'">
            Terms of Use
          </a>
          <a href="#/contact"
             style="font-size:11px;color:var(--text-muted);font-family:'Roboto',sans-serif;
                    transition:var(--transition-fast);"
             onmouseenter="this.style.color='var(--text-highlight)'"
             onmouseleave="this.style.color='var(--text-muted)'">
            Contact
          </a>
        </div>
      </div>
    </div>

    <!-- Footer link styles -->
    <style>
      .footer-link {
        font-size: 13px;
        font-family: 'Roboto', sans-serif;
        color: var(--text-soft);
        text-decoration: none;
        transition: var(--transition-fast);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .footer-link:hover {
        color: var(--text-highlight);
        padding-left: 4px;
      }
      .footer-social-btn {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-highlight);
        background: rgba(106,76,147,0.10);
        border: 1.5px solid rgba(106,76,147,0.15);
        transition: var(--transition-fast);
        text-decoration: none;
      }
      .footer-social-btn:hover {
        background: rgba(106,76,147,0.20);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(106,76,147,0.20);
      }
    </style>

  </footer>
  `;
}