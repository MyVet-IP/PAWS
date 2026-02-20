import { router } from "./router.js";
import { navbarController } from "./controllers/navbar.js";
import { apiService } from "./views/services/api.js";
import { showToast, showLoading, hideLoading } from "./utils.js";

// Funciones globales para usar en HTML
window.viewClinicDetails = function(clinicId) {
  showToast(`Viendo detalles de la clínica ${clinicId}`, 'info');
  // Aquí podrías navegar a una vista de detalle
};

window.bookAppointment = function(clinicId) {
  showLoading();
  setTimeout(() => {
    hideLoading();
    showToast('¡Cita reservada exitosamente!', 'success');
  }, 1500);
};

window.searchClinics = function() {
  const input = document.getElementById('search-location');
  if (input) {
    const location = input.value;
    if (location.trim()) {
      window.location.hash = `#/clinicas?location=${encodeURIComponent(location)}`;
    } else {
      window.location.hash = '#/clinicas';
    }
  }
};

// Los módulos ES son diferidos, el DOM ya está listo cuando llega aquí
router();
navbarController;

window.addEventListener("hashchange", router);
