import { getUser } from "../utils.js";

export function navbarController() {

  const user = getUser();

  //if we have a logged user the guess navbar will not showed.
  if (user) return "";

  return `

  <nav class="bg-gray-100 border-b border-gray-200 px-6 py-3">

    <div class="max-w-7xl mx-auto flex items-center justify-between">

      <!-- LOGO -->
      <div 
      class="flex items-center gap-2 font-bold text-gray-800 cursor-pointer"
      onclick="window.location.hash='/#/'">

        <span class="text-green-600 text-xl">🐾</span>

        <span class="text-lg tracking-wide">
          PAWS
        </span>

      </div>


      <!-- NAV LINKS -->
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">

        <a href="/#/clinics"
        class="flex items-center gap-1 hover:text-green-600 transition">

          🏥 Clinics
        </a>

        <a href="/#/emergency"
        class="flex items-center gap-1 hover:text-red-500 transition">

          ✴️ Emergencies
        </a>

        <a href="/#/services"
        class="flex items-center gap-1 hover:text-green-600 transition">

          🧼 Services
        </a>

        <a href="/#/tips"
        class="flex items-center gap-1 hover:text-green-600 transition">

          💡 Tips
        </a>

      </div>


      <!-- SEARCH -->
      <div class="flex items-center gap-4">

        <div class="hidden lg:flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 w-72">

          <span class="text-gray-400 mr-2">🔍</span>

          <input
          type="text"
          placeholder="Search clinics, services, tips..."
          class="bg-transparent outline-none text-sm w-full placeholder-gray-400"/>

        </div>

      </div>


      <!-- SIGN IN -->
      <button
      id="btn-login"
      class="bg-green-400 hover:bg-green-500 text-white font-semibold px-5 py-2 rounded-full transition">

        Sign in

      </button>

    </div>

  </nav>

  `;
}

export function navbarEvents() {
  const loginBtn = document.getElementById("btn-login");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.hash = "/#/login";
    });
  }
}





