export function maintenancePage() {
  return `
  <style>
    .maintenance-root { font-family: 'Poppins', sans-serif; min-height: calc(100vh - 80px); display:flex; align-items:center; justify-content:center; background: linear-gradient(180deg,#FBF8FF 0%, #F5FAFF 100%); }
    .maintenance-card { background: #fff; padding: 36px; border-radius: 18px; box-shadow: 0 8px 30px rgba(13,22,39,0.08); max-width:820px; text-align:center; }
    .maintenance-title { font-size: 22px; font-weight: 800; color: #6A4C93; margin-bottom: 8px; }
    .maintenance-sub { color: #666; margin-bottom: 18px; }
    .maintenance-btn { background: #6A4C93; color:#fff; border:none; padding: 12px 20px; border-radius: 12px; cursor:pointer; font-weight:700; }
  </style>

  <section class="maintenance-root">
    <div class="maintenance-card">
      <div class="maintenance-title">Página en mantenimiento</div>
      <div class="maintenance-sub">Estamos mejorando esta sección. Por ahora la funcionalidad de reservas está temporalmente deshabilitada.</div>
      <button class="maintenance-btn" id="btn-maintenance-back">Volver al inicio</button>
    </div>
  </section>
  `;
}

export function maintenanceEvents() {
  const back = document.getElementById('btn-maintenance-back');
  if (back) back.addEventListener('click', () => { window.location.hash = '#/'; });
}
