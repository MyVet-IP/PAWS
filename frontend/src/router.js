import { PetProfileView } from "./views/pet-profile.js";
import { DashboardView, initDashboard } from "./views/user-dashboard.js";
import { loadLandingPage } from "./views/landing-page.js";
import { ClinicsView } from "./views/clinics-view.js";
import { loadLoginPage, initLogin } from "./views/login.js";
import { loadRegisterPage } from "./views/register.js";

const routes = {
  "/": loadLandingPage,
  "/register": loadRegisterPage,
  "/login": loadLoginPage,
  "/pet-profile": PetProfileView,
  "/user-dashboard": DashboardView,
  "/clinicas": ClinicsView,
  "/emergencias": () => "<h1>Emergencias 24/7 - En desarrollo</h1>",
  "/tips": () => "<h1>Tips de Salud - En desarrollo</h1>"
};

export function router() {
  console.log("Router funcionando");

  const path = window.location.hash.slice(1) || "/";
  const app = document.getElementById("app");

  const view = routes[path];

  try {
    if (view) {
      app.innerHTML = view();
      initializePageEvents();
      if (path === '/login')          initLogin();
      if (path === '/user-dashboard') initDashboard();
    } else {
      app.innerHTML = "<h1>Página no encontrada</h1>";
    }
  } catch (err) {
    console.error("Error cargando vista:", err);
    app.innerHTML = `<div style="padding:2rem;color:red;font-family:monospace"><b>Error al cargar la vista:</b><pre>${err.message}</pre></div>`;
  }
}

// Función para inicializar eventos de navegación
function initializePageEvents() {
  // Botones de navegación del landing
  const loginBtn = document.querySelector('.btn-primary');
  const searchBtn = document.querySelector('button[class*="btn-primary"]:has(svg)');

  if (loginBtn && loginBtn.textContent.includes('Ingresar')) {
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

  // Enlaces del navbar
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        window.location.hash = href;
      }
    });
  });
}
