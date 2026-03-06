export function Topbar(role) {
  if (!role) return "";

  return `
    <div class="topbar">
      <div>
        Welcome ${role === "vet" ? "Doctor" : "User"} 👋
      </div>

      <button id="logoutBtn">Logout</button>
    </div>
  `;
}