import { PetProfileView } from "./views/pet-profile.js";
import { DashboardView } from "./views/user-dashboard.js";

const routes = {
  "/": () => "<h1>pending for the landing</h1>",
  "/pet-profile": PetProfileView,
  "/user-dashboard": DashboardView
};

export function router() {
  console.log("Router funcionando");

  const path = window.location.hash.slice(1) || "/";
  const app = document.getElementById("app");

  const view = routes[path];

  if (view) {
    app.innerHTML = view();
  }
}
