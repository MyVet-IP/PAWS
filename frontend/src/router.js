import { PetProfileView } from "./views/pet-profile.js";
import { DashboardView, initDashboard } from "./views/user-dashboard.js";
import { loadLandingPage, initLanding } from "./views/landing-page.js";
import { ClinicsView, initClinicsView } from "./views/clinics-view.js";
import { loadLoginPage, initLogin } from "./views/login.js";
import { loadRegisterPage, initRegister } from "./views/register.js";
import { EmergencyView, initEmergency } from "./views/emergency.js";

const routes = {
  "/": loadLandingPage,
  "/register": loadRegisterPage,
  "/login": loadLoginPage,
  "/pet-profile": PetProfileView,
  "/user-dashboard": DashboardView,
  "/clinicas": ClinicsView,
  "/emergencias": EmergencyView,
  "/tips": () => "<h1>Health Tips - In development</h1>"
};

export function router() {
  const path = window.location.hash.slice(1) || "/";
  const app = document.getElementById("app");

  const view = routes[path];

  try {
    if (view) {
      app.innerHTML = view();
      initializePageEvents();
      if (path === '/')               initLanding();
      if (path === '/login')          initLogin();
      if (path === '/register')       initRegister();
      if (path === '/clinicas')       initClinicsView();
      if (path === '/user-dashboard') initDashboard();
      if (path === '/emergencias')    initEmergency();
    } else {
      app.innerHTML = "<h1>Page not found</h1>";
    }
  } catch (err) {
    console.error("Error loading view:", err);
    app.innerHTML = `<div style="padding:2rem;color:red;font-family:monospace"><b>Error loading view:</b><pre>${err.message}</pre></div>`;
  }
}

// Function to initialize navigation events
function initializePageEvents() {
  // Landing page navigation buttons
  const loginBtn = document.querySelector('.btn-primary');
  const searchBtn = document.querySelector('button[class*="btn-primary"]:has(svg)');

  if (loginBtn && loginBtn.textContent.includes('Sign In')) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/login';
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/clinicas';
    });
  }

  // Navbar links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        window.location.hash = href;
      }
    });
  });
}
