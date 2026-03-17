import { router } from "./router/router.js";
import { navbarController } from "./components/navbar.js";
import { showToast, showLoading, hideLoading } from "./utils.js";
import { showPageLoading, hidePageLoading } from "./utils.js";

let lastValidationToastAt = 0;

function getAlertIcon(message = '') {
  const text = String(message).toLowerCase();
  if (text.includes('error') || text.includes('failed') || text.includes('invalid') || text.includes('could not')) {
    return 'error';
  }
  if (text.includes('success') || text.includes('thanks') || text.includes('saved') || text.includes('booked')) {
    return 'success';
  }
  if (text.includes('warning') || text.includes('required') || text.includes('please')) {
    return 'warning';
  }
  return 'info';
}

function setupGlobalSweetAlerts() {
  const nativeAlert = window.alert.bind(window);

  window.alert = function (message) {
    const text = String(message ?? '');
    const icon = getAlertIcon(text);

    if (window.Swal && typeof window.Swal.fire === 'function') {
      window.Swal.fire({
        icon,
        text,
        confirmButtonText: 'OK',
        confirmButtonColor: '#6A4C93',
        background: '#ffffff',
        color: '#333333',
        customClass: {
          popup: 'paws-swal-popup',
          confirmButton: 'paws-swal-confirm'
        }
      });
      return;
    }

    // Fallback if CDN fails.
    showToast(text, icon === 'error' ? 'error' : 'info');
    nativeAlert(text);
  };
}

function getFieldLabel(field) {
  const id = field?.id;
  if (id) {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label?.textContent?.trim()) {
      return label.textContent.replace('*', '').trim();
    }
  }

  return field?.getAttribute('name') || field?.getAttribute('placeholder') || 'Este campo';
}

function notifyValidationIssue(field) {
  if (!field) return;

  const now = Date.now();
  if (now - lastValidationToastAt < 1200) return;

  const label = getFieldLabel(field);
  const reason = field.validationMessage || 'Completa este campo correctamente.';
  showToast(`${label}: ${reason}`, 'error');
  lastValidationToastAt = now;
}

function setupGlobalFormValidationFeedback() {
  document.addEventListener('invalid', (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
      return;
    }

    // Keep browser validation behavior but also show a clear app-level toast.
    notifyValidationIssue(field);
  }, true);

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    if (!form.checkValidity()) {
      event.preventDefault();
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid && typeof firstInvalid.focus === 'function') {
        firstInvalid.focus();
      }
      notifyValidationIssue(firstInvalid);
    }
  }, true);
}


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

window.addEventListener('load', () => {
  showPageLoading()
  setTimeout(() => {
    hidePageLoading()
  }, 500);
});

window.searchClinics = function () {
  const input = document.getElementById('search-location');
  if (input) {
    const location = input.value;
    if (location.trim()) {
      window.location.hash = `/clinics?location=${encodeURIComponent(location)}`;
    } else {
      window.location.hash = '/clinics';
    }
  }
};

// Inicializar aplicación
function initApp() {
  console.log('PAWS App inicializated');
  setupGlobalSweetAlerts();
  setupGlobalFormValidationFeedback();
  // Cargar router
  router();
}

// Event listeners
window.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("hashchange", router);
