const menuByRole = {
  user: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Pets", path: "/my-pets" },
    { name: "Veterinarias", path: "/clinics" },
    { name: "Emergencia", path: "/emergency" }
  ],
  veterinary: [
    { name: "Dashboard", path: "/vet-dashboard" },
    { name: "Citas", path: "/appointments" },
    { name: "Mascotas Atendidas", path: "/patients" },
    { name: "Perfil", path: "/vet-profile" }
  ]
};

export function Aside(role) {
  const menu = menuByRole[role] || [];

  return `
    <aside class="w-64 bg-softpink px-6 py-6 flex flex-col justify-between">

      <div>
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-8">
          <div class="w-12 h-12 bg-white rounded-full"></div>
          <h1 class="text-xl font-bold text-white">PAWS</h1>
        </div>

        <!-- Search -->
        <input 
          type="text" 
          placeholder="Buscar..."
          class="w-full mb-6 p-2 rounded-lg"
        />

        <!-- Menú dinámico -->
        <nav class="flex flex-col gap-3">
          ${menu.map(item => `
            <a href="#${item.path}" class="text-white hover:bg-white hover:text-softpink p-2 rounded-lg">
              ${item.name}
            </a>
          `).join("")}
        </nav>
      </div>

      <!-- Emergencia -->
      <div class="bg-red-500 text-white p-4 rounded-xl text-center">
        🚨 Emergencia 24H
      </div>

    </aside>
  `;
}
