import { PetProfileView } from "./views/pet-profile.js";
import { DashboardView } from "./views/user-dashboard.js";
import { ClinicsView } from "./views/clinics-view.js";
<<<<<<< Updated upstream
import { loadLoginPage } from "./views/login.js";
import { loadRegisterPage } from "./views/register.js";
import { VetDashboardView } from "./views/vet-dashboard.js";
=======
import { loadLandingPage, landingEvents } from "./views/landing-page.js";
import { loadLoginPage, initLoginEvents } from "./views/login.js";
import { loadRegisterPage, initRegisterEvents } from "./views/register.js";
>>>>>>> Stashed changes

const routes = {
  "/": loadLandingPage,
  "/register": loadRegisterPage,
  "/login": loadLoginPage,
  "/pet-profile": PetProfileView,
  "/user-dashboard": DashboardView,
  "/vet-dashboard": VetDashboardView
};

export function router() {
  console.log("Router funcionando");

  const path = window.location.hash.slice(1) || "/";
  const app = document.getElementById("app");

  const view = routes[path];

  if (view) {
    app.innerHTML = view();

    // Inicializar eventos después de cargar la vista

    if (path === "/") {
      landingEvents();
    }

    if (path === "/login") {
      initLoginEvents();
    }

    if (path === "/register") {
      initRegisterEvents();
    }

  } else {
    app.innerHTML = "<h1>Página no encontrada</h1>";
  }
}
