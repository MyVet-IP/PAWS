export function Aside(role, path) {
  if (!role) return "";

  if (role === "user") {
    return `
      <aside class="aside">
        <h3>🐶 User Panel</h3>
        <a href="#/user-dashboard" class="${path === "/user-dashboard" ? "active" : ""}">Dashboard</a>
        <a href="#/pet-profile" class="${path === "/pet-profile" ? "active" : ""}">My Pets</a>
        <a href="#/emergencias">Emergency</a>
      </aside>
    `;
  }

  if (role === "vet") {
    return `
      <aside class="aside">
        <h3>🩺 Vet Panel</h3>
        <a href="#/veterinary" class="${path === "/veterinary" ? "active" : ""}">Dashboard</a>
        <a href="#/clinicas">Clinics</a>
      </aside>
    `;
  }

  return "";
}