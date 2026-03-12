import { clinicsPage } from "../views/clinics-view.js";
import { petProfilepage } from "../views/pet-profile.js";
import { loginPage, loginEvents } from "../views/login.js";
import { landingPage, landingEvents } from "../views/landing-page.js";
import { emergencyPage, emergencyEvents } from "../views/emergency.js";
import { registerPage, registerEvents } from "../views/register.js";
import { dashboardPage, dashboardEvents } from "../views/user-dashboard.js";
import { vetDashboardPage } from "../views/vet-dashboard.js";
import { loadMapPage, loadMapEvents} from "../views/map-page.js";
import { servicesPage,  servicesPageEvents} from "../views/services.js";
import { maintenancePage, maintenanceEvents } from "../views/maintenance.js";


const routes = {
  "/": landingPage,
  "/login": loginPage,
  "/register": registerPage,
  "/clinicas": clinicsPage,
  "/emergencias": emergencyPage,
  "/pet-profile": petProfilepage,
  "/veterinary": vetDashboardPage,
  "/user-dashboard": dashboardPage,
  "/map-page": loadMapPage,
  "/services": servicesPage,
  "/maintenance": maintenancePage,
  "/tips": () => "<h1>Health Tips - In development</h1>"
};

export function router() {
  const path = window.location.hash.slice(1) || "/";
  const app = document.getElementById("app");

  const view = routes[path];

  try {
    if (view) {
      app.innerHTML = view();
      pageEvents();

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
        dashboardEvents();
      }
      
      if (path === "/map-page") {
        loadMapEvents();
      }

      if (path === '/emergencias') {
        emergencyEvents();
      }
      if (path === "/services") {
        servicesPageEvents();
      }
      if (path === "/maintenance") {
        maintenanceEvents();
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
function pageEvents() {
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
