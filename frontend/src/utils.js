// Utilidades generales para la aplicación

// Formatear fecha
export function formatDate(date) {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Validar email
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Capitalizar primera letra
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Generar ID único
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce para búsquedas
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Toast notifications
export function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 transition-opacity duration-300 ${
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  }`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Loading spinner
export function showLoading(target = document.body) {
  const loader = document.createElement('div');
  loader.id = 'loading-spinner';
  loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  loader.innerHTML = `
    <div class="bg-white rounded-lg p-6 flex items-center gap-3">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
      <span class="text-gray-700">Cargando...</span>
    </div>
  `;
  target.appendChild(loader);
}

export function hideLoading() {
  const loader = document.getElementById('loading-spinner');
  if (loader) {
    loader.remove();
  }
}