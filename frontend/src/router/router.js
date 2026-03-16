import { getUser, checkAuth } from "../utils.js";
import { Layout } from "../layout/layout.js";
import { AuthLayout } from "../layout/auth-layout.js";
import { Aside, asideEvents } from "../components/aside.js";
import { notFoundPage } from "../components/404-not-found.js";

import { clinicsPage } from "../views/clinics-view.js";
import { healthTipsPage, healthTipsEvents } from "../views/health-tips.js";
import { loginPage, loginEvents } from "../views/login.js";
import { loadMapPage, loadMapEvents } from "../views/map-page.js";
import { aboutUsPage, aboutUsEvents } from "../views/about-us.js";
import { EmergencyButton } from "../components/emergencyButton.js";
import { registerPage, registerEvents } from "../views/register.js";
import { landingPage, landingEvents } from "../views/landing-page.js";
import { servicesPage, servicesPageEvents } from "../views/services.js";
import { emergencyPage, emergencyEvents } from "../views/emergency.js";
import { contactUsPage, contactUsEvents } from "../views/contact-us.js";
import { petProfilepage, petProfileEvents } from "../views/pet-profile.js";
import { dashboardPage, dashboardEvents } from "../views/user-dashboard.js";
import { workWithUsPage, workWithUsEvents } from "../views/work-with-us.js";
import { specialistsPage, specialistsEvents } from "../views/specialists.js";
import { vetDashboardPage, vetDashboardEvents } from "../views/vet-dashboard.js";
import { medicalRecordsPage, medicalRecordsEvents } from "../views/medical-records.js";
import { adminDashboardPage, adminDashboardEvents } from "../views/admin-dashboard.js";
import { userScheduleAppointmentsPage, userScheduleAppointmentsEvents } from "../views/users-schedule-appointments.js";
import { businessScheduleAppointmentsPage, businessScheduleAppointmentsEvents } from "../views/bussines-schedule-appointments.js";

const PUBLIC_PATHS = ["/", "/login", "/register"];

const routes = {
  "/": landingPage,
  "/login": () => {
    const user = getUser();
    if (user) {
      if (user.role === 'business') {
        window.location.hash = "/veterinary";
      } else if (user.role === 'admin') {
        window.location.hash = "/admin-dashboard";
      } else {
        window.location.hash = "/user-dashboard";
      }
      return "";
    }
    return loginPage();
  },

  "/clinics": clinicsPage,
  "/register": registerPage,
  "/emergency": emergencyPage,
  "/pet-profile": petProfilepage,
  "/veterinary": vetDashboardPage,
  "/services": servicesPage,

  "/tips": healthTipsPage,
  "/map-page": loadMapPage,
  "/about-us": aboutUsPage,
  "/contact": contactUsPage,
  "/work-with-us": workWithUsPage,
  "/specialists": specialistsPage,
  "/user-dashboard": dashboardPage,
  "/medical-records": medicalRecordsPage,
  "/admin-dashboard": adminDashboardPage,
  "/appointments": userScheduleAppointmentsPage,
  "/business-appointments": businessScheduleAppointmentsPage,


  "/unauthorized": () => `
    <div class="p-10 text-center">
      <h1 class="text-2xl font-bold text-red-500">
        Unauthorized access
      </h1>
      <p>You don't have permission to view this page.</p>
    </div>
  `,

  "/google-login-success": () => {
    try {
      const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
      const user = JSON.parse(decodeURIComponent(params.get("user") || "{}"));
      if (user && user.email) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("user_id", user.id);
        if (user.role === 'business') {
          window.location.hash = "/veterinary";
        } else if (user.role === 'admin') {
          window.location.hash = "/admin-dashboard";
        } else {
          window.location.hash = "/user-dashboard";
        }
      } else {
        window.location.hash = "/login";
      }
    } catch (e) {
      window.location.hash = "/login";
    }
    return "";
  }
};

const PROTECTED = {
  "/user-dashboard": "user",
  "/pet-profile": "user",
  "/appointments": "user",
  "/veterinary": "business",
  "/business-appointments": "business",
  "/medical-records": "user",
  "/admin-dashboard": "admin",
};

export function router() {
  const fullHash = window.location.hash.slice(1) || "/";
  const path = fullHash.split("?")[0];
  console.log("Router ejecutado en path:", path);
  const app = document.getElementById("app");

  // Dynamic segment support: /pet-profile/:id
  let resolvedPath = path;
  let routeParams = {};
  if (path.startsWith('/pet-profile/')) {
    const id = parseInt(path.split('/pet-profile/')[1]);
    if (id) { routeParams.pet_id = id; resolvedPath = '/pet-profile'; }
  }

  const viewFunction = routes[resolvedPath] || routes[path];

  try {

    if (!viewFunction) {
      app.innerHTML = Layout(notFoundPage());
      return;
    }

    const authKey = resolvedPath in PROTECTED ? resolvedPath : path;
    if (authKey in PROTECTED) {
      if (!checkAuth(PROTECTED[authKey])) return;
    }

    const html = resolvedPath === '/pet-profile' ? viewFunction(routeParams) : viewFunction();

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
    runPageEvents(resolvedPath, routeParams);

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

function runPageEvents(path, params = {}) {

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

    case "/admin-dashboard":
      adminDashboardEvents();
      break;

    case "/map-page":
      loadMapEvents();
      break;

    case "/emergency":
      emergencyEvents();
      break;

    case "/pet-profile":
      petProfileEvents(params.pet_id);
      break

    case "/veterinary":
      vetDashboardEvents();
      break;

    case "/services":
      servicesPageEvents();
      break;

    case "/about-us":
      aboutUsEvents();
      break;

    case "/contact":
      contactUsEvents();
      break;

    case "/work-with-us":
      workWithUsEvents();
      break;

    case "/specialists":
      specialistsEvents();
      break;

    case "/tips":
      healthTipsEvents();
      break;

    case "/medical-records":
      medicalRecordsEvents();
      break;

    case "/appointments":
      userScheduleAppointmentsEvents();
      break;

    case "/business-appointments":
      businessScheduleAppointmentsEvents();
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
      window.location.hash = '/login';
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '/clinics';
    });
  }

  // Navbar links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    if (!link.dataset.listener) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href && href !== '#') {
          window.location.hash = href.startsWith('#') ? href.slice(1) : href;
        }
      });

      link.dataset.listener = "true";

    }
  });
}