import { router } from "./router.js";
import { navbarController } from "./controllers/navbar.js";
import { apiService } from "./views/services/api.js";
import { showToast, showLoading, hideLoading } from "./utils.js";

// Global functions to use in HTML
window.viewClinicDetails = function(clinicId) {
  showToast(`Viewing clinic details ${clinicId}`, 'info');
  // Here you could navigate to a detail view
};

window.bookAppointment = function(clinicId) {
  showLoading();
  setTimeout(() => {
    hideLoading();
    showToast('Appointment booked successfully!', 'success');
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

// ES modules are deferred, the DOM is already ready when it gets here
router();
navbarController;

window.addEventListener("hashchange", router);
