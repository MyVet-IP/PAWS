import { router } from "./router/router.js";
import { navbarController } from "./components/navbar.js";
import { apiService } from "../../backend/services/api.js";
import { showToast, showLoading, hideLoading } from "./utils.js";


// Funciones globales para usar en HTML
window.viewClinicDetails = function (clinicId) {
  showToast(`Viendo detalles de la clínica ${clinicId}`, 'info');
  // Aquí podrías navegar a una vista de detalle
  console.log('Ver detalles de clínica:', clinicId);
};

window.bookAppointment = function (clinicId) {
  showLoading();
  setTimeout(() => {
    hideLoading();
    showToast('Appointment booked successfully!', 'success');
  }, 1500);
};

window.searchClinics = function () {
  const input = document.getElementById('search-location');
  if (input) {
    const location = input.value;
    if (location.trim()) {
      window.location.hash = `/#/clinicas?location=${encodeURIComponent(location)}`;
    } else {
      window.location.hash = '/#/clinicas';
    }
  }
};

// Inicializar aplicación
function initApp() {
  console.log('VetCare App iniciada');
  // Cargar router
  router();
}

// Event listeners
window.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("hashchange", router);
