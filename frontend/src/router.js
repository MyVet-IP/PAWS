import { PetProfileView } from "./views/pet-profile.js";
import { DashboardView } from "./views/user-dashboard.js";
import { ClinicsView } from "./views/clinics-view.js";
import { loadLandingPage, landingEvents } from "./views/landing-page.js";
import { loadLoginPage, loginEvents } from "./views/login.js";
import { loadRegisterPage, registerEvents } from "./views/register.js";

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
  console.log("Router working");

  const path = window.location.hash.slice(1) || "/";
  const app = document.getElementById("app");

  const view = routes[path];

  if (path === '/clinicas'){
    ClinicsController();
  }

  if (view) {
    app.innerHTML = view();

    // Inicializar eventos después de cargar la vista

    if (path === "/") {
      landingEvents();
    }

    if (path === "/login") {
      loginEvents();
    }

    if (path === "/register") {
      registerEvents();
    }

  } else {
    app.innerHTML = "<h1>Página no encontrada</h1>";
  }
}
