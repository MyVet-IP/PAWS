export function notFoundPage() {
  return `
    <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;
                background:linear-gradient(160deg,#fef9ff 0%,#f8f6ff 60%,#f0fdf4 100%);
                padding:2rem;font-family:'Poppins',sans-serif;">
      <div style="background:#fff;border-radius:28px;
                  box-shadow:0 8px 32px rgba(106,76,147,0.10);
                  padding:3rem 2.5rem;text-align:center;
                  max-width:480px;width:100%;position:relative;overflow:hidden;">

        <!-- Blobs decorativos -->
        <div style="position:absolute;width:160px;height:160px;border-radius:50%;
                    background:rgba(185,251,192,0.25);top:-60px;right:-50px;
                    filter:blur(30px);pointer-events:none;"></div>
        <div style="position:absolute;width:120px;height:120px;border-radius:50%;
                    background:rgba(241,192,232,0.20);bottom:-40px;left:-30px;
                    filter:blur(25px);pointer-events:none;"></div>

        <!-- Badge -->
        <div style="display:inline-flex;align-items:center;gap:6px;
                    background:#F1C0E8;color:#6A4C93;
                    font-size:0.72rem;font-weight:600;letter-spacing:0.06em;
                    text-transform:uppercase;padding:5px 14px;border-radius:999px;
                    margin-bottom:1.5rem;">
          🐾 PAWS
        </div>

        <!-- Ilustración pata con ? -->
        <div style="margin:0 auto 1.5rem;width:110px;height:110px;border-radius:50%;
                    background:linear-gradient(135deg,#FBF8CC 0%,#F1C0E8 100%);
                    display:flex;align-items:center;justify-content:center;
                    position:relative;z-index:1;">
          <svg viewBox="0 0 56 56" fill="none" style="width:56px;height:56px;">
            <ellipse cx="28" cy="34" rx="11" ry="9" fill="#6A4C93" opacity="0.85"/>
            <ellipse cx="17" cy="25" rx="5" ry="6.5" fill="#6A4C93" opacity="0.70"/>
            <ellipse cx="39" cy="25" rx="5" ry="6.5" fill="#6A4C93" opacity="0.70"/>
            <ellipse cx="22" cy="18" rx="4" ry="5" fill="#6A4C93" opacity="0.55"/>
            <ellipse cx="34" cy="18" rx="4" ry="5" fill="#6A4C93" opacity="0.55"/>
            <text x="24" y="39" font-family="Poppins,sans-serif"
                  font-weight="700" font-size="14" fill="white">?</text>
          </svg>
        </div>

        <!-- Número -->
        <div style="font-size:4rem;font-weight:700;color:#6A4C93;
                    font-family:'Poppins',sans-serif;line-height:1;
                    margin-bottom:0.5rem;position:relative;z-index:1;">404</div>

        <!-- Título -->
        <h1 style="font-size:1.25rem;font-weight:600;color:#333;
                  font-family:'Poppins',sans-serif;margin:0 0 0.75rem;
                  position:relative;z-index:1;">
          Page not found
        </h1>

        <!-- Descripción -->
        <p style="font-size:0.9rem;color:#6B7280;font-family:'Roboto',sans-serif;
                  line-height:1.6;margin:0 0 2rem;position:relative;z-index:1;">
          Looks like this page went for a walk and didn't come back.<br>
          Check the URL or head back to a safe place.
        </p>

        <!-- Botones principales -->
        <div style="display:flex;gap:12px;justify-content:center;
                    flex-wrap:wrap;position:relative;z-index:1;">
          <button onclick="window.location.hash='#/'"
            style="background:#6A4C93;color:#fff;padding:11px 24px;
                  border-radius:12px;border:none;cursor:pointer;
                  font-family:'Poppins',sans-serif;font-weight:600;
                  font-size:0.875rem;transition:opacity 150ms ease;"
            onmouseover="this.style.opacity='0.88'"
            onmouseout="this.style.opacity='1'">
            Go home
          </button>
          <button onclick="window.history.back()"
            style="background:transparent;color:#6A4C93;padding:11px 24px;
                  border-radius:12px;border:2px solid #6A4C93;cursor:pointer;
                  font-family:'Poppins',sans-serif;font-weight:600;
                  font-size:0.875rem;transition:background 150ms ease;"
            onmouseover="this.style.background='rgba(106,76,147,0.06)'"
            onmouseout="this.style.background='transparent'">
            Go back
          </button>
        </div>

        <!-- Quick links -->
        <div style="margin-top:2rem;padding-top:1.5rem;
                    border-top:1px solid #F3F4F6;position:relative;z-index:1;">
          <p style="font-size:0.75rem;color:#9CA3AF;font-family:'Roboto',sans-serif;
                    text-transform:uppercase;letter-spacing:0.06em;margin:0 0 0.75rem;">
            Or go directly to
          </p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
            ${[
      { label: 'Dashboard', hash: '#/user-dashboard' },
      { label: 'Records', hash: '#/medical-records' },
      { label: 'Appointments', hash: '#/appointments' },
      { label: 'Find clinics', hash: '#/map-page' },
    ].map(l => `
              <span onclick="window.location.hash='${l.hash}'"
                style="background:#F9FAFB;color:#6A4C93;border:1px solid #E5E7EB;
                      padding:6px 14px;border-radius:999px;font-size:0.8rem;
                      font-family:'Poppins',sans-serif;font-weight:500;cursor:pointer;"
                onmouseover="this.style.background='#F1C0E8';this.style.borderColor='#F1C0E8'"
                onmouseout="this.style.background='#F9FAFB';this.style.borderColor='#E5E7EB'">
                ${l.label}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
};

export function notFoundEvents() {

}
