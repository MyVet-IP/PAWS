export function DashboardView() {
  return `
  <section class="flex h-screen bg-gray-50">

    <!-- SIDEBAR -->
    <aside class="w-64 bg-softpink px-6 py-8 flex flex-col justify-between">

    <div>
        <div class="flex items-center gap-3 mb-10">
        <div class="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
            🐾
        </div>
        <h2 class="text-xl font-bold text-white">MedellinVet</h2>
        </div>

        <nav class="flex flex-col gap-2 text-white/90">

        <a class="bg-white text-gray-700 p-3 rounded-full font-medium">
            Dashboard
        </a>

        <a class="hover:bg-white/30 p-3 rounded-full">
            My Profile
        </a>

        <a class="hover:bg-white/30 p-3 rounded-full">
            My Pets
        </a>

        <a class="hover:bg-white/30 p-3 rounded-full">
            Appointments
        </a>

        <a class="hover:bg-white/30 p-3 rounded-full">
            Medical History
        </a>

        </nav>
    </div>

    <!-- Caja inferior -->

    <div class="bg-white/30 rounded-xl p-4 text-white text-sm">
        <p class="font-semibold mb-1">Premium Plan</p>
        <p class="text-white/90 mb-3">
        Unlimited consultations in Medellín
        </p>
        <button class="bg-white text-pinkcustom w-full py-2 rounded-full font-semibold">
        Upgrade
        </button>
    </div>

    </aside>


    <!-- MAIN CONTENT -->
    <main class="flex-1 p-10 overflow-y-auto">

      <!-- HEADER -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">
            Welcome back, Alejandro!
          </h1>
          <p class="text-gray-500">
            You have 2 appointments scheduled this week in Medellín.
          </p>
        </div>

        <button class="bg-pinkcustom text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition">
          + Add New Pet
        </button>
      </div>

      <!-- STATS -->
      <div class="grid grid-cols-3 gap-6 mb-10">

        <div class="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-lightblue rounded-xl flex items-center justify-center">
            🐾
            </div>
            <div>
            <p class="text-gray-500 text-sm">Active Pets</p>
            <h3 class="text-xl font-bold text-gray-800">4</h3>
            </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-softpink rounded-xl flex items-center justify-center">
            📅
            </div>
            <div>
            <p class="text-gray-500 text-sm">Next Appointment</p>
            <h3 class="text-xl font-bold text-gray-800">Oct 24</h3>
            </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-lavender rounded-xl flex items-center justify-center">
            💊
            </div>
            <div>
            <p class="text-gray-500 text-sm">Active Rx</p>
            <h3 class="text-xl font-bold text-gray-800">2</h3>
            </div>
        </div>

    </div>

        <!-- PET CARD -->
        <h2 class="text-xl font-semibold text-gray-800 mb-6">
            Your Pet Family
            </h2>

            <div class="flex gap-6 flex-wrap">
            
        <div class="bg-white rounded-2xl shadow-md w-64 p-5 hover:-translate-y-1 transition">
          <img 
            src="https://placedog.net/400/300"
            class="w-full h-40 object-cover rounded-xl mb-4"
          >

          <h3 class="font-bold text-lg text-gray-800">Max</h3>
          <p class="text-gray-500 text-sm mb-4">
            Golden Retriever • 3 Years Old
          </p>

          <button class="bg-softpink w-full py-2 rounded-full font-medium">
            View Profile
          </button>
        </div>

        <!-- PET CARD -->
        <div class="bg-white rounded-2xl shadow-md w-64 p-5 hover:-translate-y-1 transition">
          <img 
            src="https://placekitten.com/400/300"
            class="w-full h-40 object-cover rounded-xl mb-4"
          >

          <h3 class="font-bold text-lg text-gray-800">Luna</h3>
          <p class="text-gray-500 text-sm mb-4">
            Bombay Cat • 2 Years Old
          </p>

          <button class="bg-softpink w-full py-2 rounded-full font-medium">
            View Profile
          </button>
        </div>

        <!-- ADD PET CARD -->
        <div class="w-64 border-2 border-dashed border-bluecustom rounded-2xl flex flex-col items-center justify-center text-gray-400">
          <span class="text-3xl mb-2">＋</span>
          <p>Add another pet</p>
        </div>
    </main>
  </section>
  `;
}