import { PetProfileView } from "./views/pet-profile.js";
import { DashboardView, initDashboard } from "./views/user-dashboard.js";
import { loadLandingPage, initLanding } from "./views/landing-page.js";
import { ClinicsView } from "./views/clinics-view.js";
import { loadLandingPage, landingEvents } from "./views/landing-page.js";
import { loadLoginPage, loginEvents, initLogin } from "./views/login.js";
import { loadRegisterPage, registerEvents } from "./views/register.js";
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

      if (path === "/") {
        landingEvents();
      }

      if (path === "/login") {
        loginEvents();
      }

      if (path === "/register") {
        registerEvents();
      }

      if (path === '/user-dashboard') {
        registerEvents();
      }

      if (path === '/emergencias') {
        initEmergency();
      }

    } else {
      app.innerHTML = "<h1>Page not found</h1>";
    }
  } catch (error) {
    console.error("Error loading view:", error);
    app.innerHTML = `<div style="padding:2rem;color:red;font-family:monospace"><b>Error loading view:</b><pre>${error.message}</pre></div>`;
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
