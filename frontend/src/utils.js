// General utilities for the application

// Format date
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Validate email
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Capitalize first letter
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Generate unique ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce for searches
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

// Notifications
export function showToast(message, type = 'success', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const id = 'toast-' + Math.random().toString(36).substr(2, 9);
  toast.id = id;
  toast.className = `paws-toast toast-${type}`;

  const icons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  };

  const titles = {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information'
  };

  toast.innerHTML = `
    <div class="toast-icon">
      <span class="material-symbols-outlined">${icons[type]}</span>
    </div>
    <div class="toast-content">
      <div class="toast-title">${titles[type]}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.classList.add('toast-out'); setTimeout(() => this.parentElement.remove(), 400)">
      <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
    </button>
    <div class="toast-progress" style="animation: toast-progress ${duration}ms linear forwards;"></div>
  `;

  // Internal progress bar animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes toast-progress {
      from { width: 100%; }
      to { width: 0%; }
    }
  `;
  document.head.appendChild(style);

  container.appendChild(toast);

  // Auto-remove
  setTimeout(() => {
    if (document.getElementById(id)) {
      toast.classList.add('toast-out');
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 400);
    }
  }, duration);
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

// Screen Loading

export function showPageLoading(target = document.body) {
  const pageLoader = document.createElement('div');
  pageLoader.id = 'loading-screen';
  pageLoader.className = 'fixed inset-0 bg-surface-soft dark:bg-dark-bg flex items-center justify-center z-[9999] transition-opacity duration-500';
  pageLoader.innerHTML = `
  <div class="text-center">
    <div class="w-16 h-16 mx-auto mb-4 relative">
      <div class="absolute inset-0 rounded-full border-4 border-paws-green animate-ping"></div>
      <div
        class="absolute inset-2 rounded-full border-4 border-t-paws-purple border-r-paws-pink border-b-paws-blue border-l-paws-yellow animate-spin"">
      </div>
    </div>
    <p class="text-text-highlight dark:text-paws-purple font-poppins font-semibold animate-pulse-soft">Loading VetCare...</p>
  </div>
  `;
  target.appendChild(pageLoader);
}

export function hidePageLoading() {
  const pageLoader = document.getElementById('loading-screen');
  if (pageLoader) {
    pageLoader.style.opacity = '0';
    setTimeout(() => pageLoader.remove(), 500);
  }
}


// utils.js
export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}


export function checkAuth(role) {
  const user = getUser();
  if (!user) {
    window.location.hash = "/login";
    return false;
  }

  const allowedRoles = Array.isArray(role) ? role : [role];
  if (!allowedRoles.includes(user.role)) {
    window.location.hash = "/unauthorized";
    return false;
  }

  return true;
}

export function clearAuth() {
  localStorage.removeItem('user');
}

export async function authFetch(input, init = {}) {
  const config = { ...init, credentials: 'include' };
  const res = await fetch(input, config);
  if (res.status === 401 || res.status === 403) {
    clearAuth();
  }
  return res;
}

export async function logoutUser() {
  try {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  } catch { }
  clearAuth();
  window.location.hash = '#/login';
}