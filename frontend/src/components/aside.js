import { getUser } from "../utils.js";

export function Aside() {

  const user = getUser();
  if (!user) return "";

  const isVet = user.role === "vet"

  return `

  <aside class="w-72 h-screen bg-[#F5F7F6] border-r border-gray-200 p-4 flex flex-col gap-4">

    <!-- 🐾 PET PROFILE CARD -->
    <div class="bg-white rounded-3xl p-5 shadow-sm">

      <div class="flex flex-col items-center text-center">

        <!-- PET IMAGE -->
        <div class="relative mb-3">

          <img 
          src="https://placekitten.com/200/200"
          class="w-24 h-24 rounded-full border-4 border-green-200 object-cover"/>

          <!-- ONLINE DOT -->
          <span class="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>

        </div>

        <h2 class="text-xl font-semibold text-gray-800">
          🐾 ${user.name}
        </h2>

      </div>
      
      <nav class="space-y-2">

        ${
          isVet
          ? vetMenu()
          : ownerMenu()
        }

      </nav>

    <!-- 👤 OWNER CONTACT -->
    <div class="bg-white rounded-2xl p-4 shadow-sm">

      <h3 class="text-sm font-semibold mb-3 text-purple-600">
        Owner Contact
      </h3>

      <div class="flex items-center justify-between">

        <div class="flex items-center gap-3">

          <div class="w-10 h-10 bg-green-100 rounded-full"></div>

          <div class="text-sm">
            <p class="font-medium text-gray-800">Carlos Arboleda</p>
            <p class="text-gray-400 text-xs">El Poblado, Medellín</p>
          </div>

        </div>

        <button class="bg-green-200 hover:bg-green-300 text-green-800 w-10 h-10 rounded-full flex items-center justify-center transition">

          📞

        </button>

      </div>
      <!-- ⚙️ BOTTOM -->
    <div class="px-4 pb-6">

      <a href="#/settings"
      class="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-white transition">

        ⚙️ Settings
      </a>
    </div>
    
  </aside>

  `;
}

function vetMenu() {
  return `
    <a href="#dashboard" class="block p-2 rounded hover:bg-green-100">
      📊 Dashboard
    </a>

    <a href="#patients" class="block p-2 rounded hover:bg-green-100">
      🐶 Patients
    </a>

    <a href="#appointments" class="block p-2 rounded hover:bg-green-100">
      📅 Appointments
    </a>

    <a href="#records" class="block p-2 rounded hover:bg-green-100">
      📋 Medical Records
    </a>

    <a href="#services" class="block p-2 rounded hover:bg-green-100">
      🩺 Services
    </a>

    <a href="#emergency" class="block p-2 rounded hover:bg-red-100 text-red-600">
      🚨 Emergency
    </a>
  `;
}

          //<!-- 📋 MENU -->
    function ownerMenu() {
    return `
      <nav class="flex flex-col gap-1 px-3 text-sm font-medium text-gray-700 flex-1">

        <!-- ACTIVE -->
        <a href="#/user-dashboard"
        class="flex items-center gap-3 px-4 py-2 rounded-lg bg-green-600 text-white">

          📊 Dashboard
        </a>

        <a href="#/pets"
        class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white transition">

          🐾 My Pets
        </a>

        <a href="#/appointments"
        class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white transition">

          📅 Appointments
        </a>

        <a href="#/clinics"
        class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white transition">

          🏥 Clinics
        </a>

        <a href="#/services"
        class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white transition">

          🛁 Services
        </a>

        <a href="#/emergency"
        class="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition">

          🚨 Emergency
        </a>

      </nav>

     `;
}