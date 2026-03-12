export function Topbar() {

  const route = location.hash.replace("#", "") || "dashboard";

  const titles = {
    dashboard: "Dashboard",
    pets: "My Pets",
    petview: "Pet Profile",
    clinics: "Clinics",
    services: "Services",
    appointments: "Appointments",
    emergency: "Emergency"
  };

  const currentTitle = titles[route] || "Dashboard";

  return `

  <header class="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

    <!-- 🐾 LEFT: LOGO + PAGE -->
    <div class="flex items-center gap-3">

      <div class="w-9 h-9 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold">
        🐾
      </div>

      <div>
        <p class="text-xs text-gray-400 leading-none">
          PAWS
        </p>

        <h1 class="text-lg font-semibold text-gray-800 leading-none">
          ${currentTitle}
        </h1>
      </div>

    </div>


    <!-- 🔍 CENTER: SEARCH -->
    <div class="flex-1 flex justify-center px-6">

      <input 
        type="text"
        placeholder="Search records..."
        class="w-full max-w-md bg-[#F5F7F6] border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
      />

    </div>


    <!-- ✨ RIGHT: ACTIONS -->
    <div class="flex items-center gap-3">

      <!-- ADD BUTTON -->
      <button class="bg-green-200 hover:bg-green-300 text-green-800 px-4 py-2 rounded-full text-sm font-medium transition">
        + Add Record
      </button>

      <!-- NOTIFICATIONS -->
      <button class="w-10 h-10 bg-[#F5F7F6] hover:bg-gray-200 rounded-full flex items-center justify-center transition">
        🔔
      </button>

    </div>

  </header>

  `;
}