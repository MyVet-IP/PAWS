import { getUser } from "../utils.js";
import { Layout } from "../layout/layout.js";

import { clinicsPage } from "../views/clinics-view.js";
import { petProfilepage } from "../views/pet-profile.js";
import { loginPage, loginEvents } from "../views/login.js";
import { landingPage, landingEvents } from "../views/landing-page.js";
import { emergencyPage, emergencyEvents } from "../views/emergency.js";
import { EmergencyButton } from "../components/emergencyButton.js";
import { registerPage, registerEvents } from "../views/register.js";
import { dashboardPage, dashboardEvents } from "../views/user-dashboard.js";
import { vetDashboardPage } from "../views/vet-dashboard.js";


function checkAuth(roleRequired){
  const user = getUser();

  if(!user){
    window.location.hash = "#/login";
    return false;
  }

  if(roleRequired && user.role !== roleRequired){
    window.location.hash = "#/unauthorized"; // crea esta vista simple
    return false;
  }

  return true;
}

const routes = {
  "/": landingPage,
  "/login": () => {
    const user= getUser();
    if(user) {
      window.location.hash = "#/user-dashboard";
      return "";
    }
    return loginPage();
  },

  "/register": registerPage,
  "/clinics": clinicsPage,
  "/emergency": emergencyPage,
  "/pet-profile": petProfilepage,
  "/veterinary": () => {
    if(!checkAuth("vet")) return;
    return vetDashboardPage();
  },

  "/user-dashboard": () => {
    if(!checkAuth("owner")) return;
    return dashboardPage();
  },
  "/tips": () => "<h1>Health Tips - In development</h1>",

  "/unauthorized": () => `
    <div class="p-10 text-center">
      <h1 class="text-2xl font-bold text-red-500">
        Unauthorized access
      </h1>
      <p>You don't have permission to view this page.</p>
    </div>
  `
};

export function router() {
  const path = window.location.hash.slice(1) || "/";
    console.log("Router ejecutado en path:", path);
  const app = document.getElementById("app");

  const view = routes[path];

  try {
    if (view) {
      const html = view();
      app.innerHTML = Layout(html);

      pageEvents();
          console.log("EmergencyButton llamado desde router");
      EmergencyButton();

      if (path === "/") {
        landingEvents();
      }

      if (path === "/login") {
        loginEvents();
      }

      if (path === "/register") {
        registerEvents();
      }

      if (path === "/user-dashboard") {
        dashboardEvents();
      }

      if (path === '/emergency') {
        emergencyEvents();
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
      window.location.hash = '#/clinics';
    });
  }

  // Navbar links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    if (!link.dataset.listener) {
      link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href !== '#') {
        window.location.hash = href;
      }
    });

    link.dataset.listener = "true";
    
    }
  });
}



