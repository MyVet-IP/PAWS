import { getUser, checkAuth } from "../utils.js";
import { Layout } from "../layout/layout.js";
import { AuthLayout } from "../layout/auth-layout.js";
import { Aside, asideEvents } from "../components/aside.js";

import { clinicsPage } from "../views/clinics-view.js";
import { petProfilepage, petProfileEvents } from "../views/pet-profile.js";
import { loginPage, loginEvents } from "../views/login.js";
import { landingPage, landingEvents } from "../views/landing-page.js";
import { emergencyPage, emergencyEvents } from "../views/emergency.js";
import { EmergencyButton } from "../components/emergencyButton.js";
import { registerPage, registerEvents } from "../views/register.js";
import { dashboardPage, dashboardEvents } from "../views/user-dashboard.js";
import { vetDashboardPage, vetDashboardEvents } from "../views/vet-dashboard.js";
import { loadMapPage, loadMapEvents } from "../views/map-page.js";
import { healthTipsPage } from "../views/health-tips.js";

const PUBLIC_PATHS = ["/", "/login", "/register"];

const routes = {
  "/": landingPage,
  "/login": () => {
    const user = getUser();
    if (user) {
      window.location.hash = "#/user-dashboard";
      return "";
    }
    return loginPage();
  },

  "/register": registerPage,
  "/clinics": clinicsPage,
  "/emergency": emergencyPage,
  "/pet-profile": () => {
    if (!checkAuth("owner")) return;
    return petProfilepage();
  },
  "/veterinary": () => {
    if (!checkAuth("vet")) return;
    return vetDashboardPage();
  },

  "/user-dashboard": () => {
    if (!checkAuth("owner")) return;
    return dashboardPage();
  },
  "/map-page": loadMapPage,
  "/tips": healthTipsPage,

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

  const viewFunction = routes[path];

  try {

    if (!viewFunction) {
      app.innerHTML = "<h1>Page not found</h1>";
      return;
    }

    const html = viewFunction();

    // ===== Layout selector =====
    if (path === "/login" || path === "/register") {
      app.innerHTML = AuthLayout(html);
    } else {
      app.innerHTML = Layout(html);
    }

    // ===== Global components =====
    pageEvents();
    EmergencyButton();

    // ===== Page-specific events =====
    runPageEvents(path);

  } catch (error) {

    console.error("Error loading view:", error);

    app.innerHTML = `
      <div style="padding:2rem;color:red;font-family:monospace">
        <b>Error loading view:</b>
        <pre>${error.message}</pre>
      </div>
    `;
  }
}

// ==================== PAGE EVENTS ====================

function runPageEvents(path) {

  if (!PUBLIC_PATHS.includes(path)) {
    asideEvents();
  }

  switch (path) {

    case "/":
      landingEvents();
      break;

    case "/login":
      loginEvents();
      break;

    case "/register":
      registerEvents();
      break;

    case "/user-dashboard":
      dashboardEvents();
      break;

    case "/map-page":
      loadMapEvents();
      break;

    case "/emergency":
      emergencyEvents();
      break;

    case "/pet-profile":
      petProfileEvents();
      break

    case "/veterinary":
      vetDashboardEvents();
      break;
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



