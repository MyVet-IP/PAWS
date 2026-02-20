import { router } from "./router.js";
import { navbarController } from "./controllers/navbar.js";
import { apiService } from "./services/api.js";
import { showToast, showLoading, hideLoading } from "./utils.js";

// Funciones globales para usar en HTML
window.viewClinicDetails = function(clinicId) {
  showToast(`Viendo detalles de la clínica ${clinicId}`, 'info');
  // Aquí podrías navegar a una vista de detalle
  console.log('Ver detalles de clínica:', clinicId);
};

window.bookAppointment = function(clinicId) {
  showLoading();
  setTimeout(() => {
    hideLoading();
    showToast('¡Cita reservada exitosamente!', 'success');
  }, 1500);
  console.log('Reservar cita en clínica:', clinicId);
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

// Inicializar aplicación
function initApp() {
  console.log('VetCare App iniciada');
  
  // Cargar router
  router();
  
  // Inicializar controladores
  navbarController;
}

// Event listeners
window.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
