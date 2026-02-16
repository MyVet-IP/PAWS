export function PetProfileView() {
  return `
  <section class="flex gap-12 p-10 bg-gray-50 min-h-screen">

    <!-- LEFT COLUMN -->
    <aside class="w-[360px]">

      <div class="bg-white rounded-3xl shadow-sm overflow-hidden">

        <!-- Header gradient -->
        <div class="h-24 bg-gradient-to-r from-lavender to-softpink px-6 flex items-center">
          <p class="text-white font-semibold tracking-wide text-sm">
            GENERAL INFO
          </p>
        </div>

        <div class="px-6 pb-8 text-center relative">

          <!-- Pet Image Container -->
          <div class="relative -mt-16 mb-6 flex justify-center">

            <div class="w-48 h-48 rounded-3xl bg-lightblue p-3 shadow-md">
              <img 
                src="https://placedog.net/400"
                class="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <!-- HEALTH BADGE -->
            <span class="absolute bottom-0 translate-y-1/2 bg-lavender text-white text-xs px-4 py-1 rounded-full shadow">
              ● HEALTHY
            </span>

          </div>

          <h2 class="text-3xl font-bold text-gray-800">
            Luna
          </h2>

          <p class="text-gray-400 text-sm tracking-wide mt-1">
            GOLDEN RETRIEVER • FEMALE
          </p>

          <!-- Stats -->
          <div class="flex justify-center gap-4 mt-8">

            <div class="bg-softpink/40 px-5 py-4 rounded-2xl w-24">
              <p class="text-xs text-gray-400">AGE</p>
              <p class="font-bold text-gray-800 text-lg">3.5y</p>
            </div>

            <div class="bg-lightblue/40 px-5 py-4 rounded-2xl w-24">
              <p class="text-xs text-gray-400">WEIGHT</p>
              <p class="font-bold text-gray-800 text-lg">28kg</p>
            </div>

            <div class="bg-lavender/40 px-5 py-4 rounded-2xl w-24">
              <p class="text-xs text-gray-400">BLOOD</p>
              <p class="font-bold text-gray-800 text-lg">DEA 1</p>
            </div>

          </div>

        </div>

      </div>

    </aside>



    <!-- RIGHT CONTENT -->
    <main class="flex-1">

      <!-- TOP ACTIONS -->
      <div class="flex justify-end gap-4 mb-6">
        <button class="border border-pinkcustom text-gray-700 px-5 py-2 rounded-full">
          Medical Report
        </button>

        <button class="bg-lavender text-white px-5 py-2 rounded-full">
          Schedule Visit
        </button>
      </div>

      <!-- HEALTH REMINDERS -->
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Health Reminders
      </h2>

      <div class="grid grid-cols-2 gap-6 mb-10">

        <div class="bg-softpink/30 p-6 rounded-2xl">
          <p class="text-sm text-pinkcustom font-semibold mb-2">
            IN 12 DAYS
          </p>
          <h3 class="font-bold text-lg text-gray-800">
            Rabies Booster
          </h3>
          <p class="text-gray-500 text-sm">
            Annual mandatory vaccination.
          </p>

          <button class="text-pinkcustom mt-3 font-semibold">
            Confirm Appointment →
          </button>
        </div>

        <div class="bg-lightblue/40 p-6 rounded-2xl">
          <p class="text-sm text-bluecustom font-semibold mb-2">
            IN 3 WEEKS
          </p>
          <h3 class="font-bold text-lg text-gray-800">
            Deworming Pill
          </h3>
          <p class="text-gray-500 text-sm">
            Monthly treatment reminder.
          </p>

          <button class="text-bluecustom mt-3 font-semibold">
            Add to Calendar →
          </button>
        </div>

      </div>

      <!-- MEDICAL HISTORY -->
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Medical History
      </h2>

      <div class="space-y-6">

        <div class="bg-white p-6 rounded-2xl shadow-sm">
          <p class="text-sm text-pinkcustom font-semibold mb-1">
            JAN 20, 2024
          </p>
          <h3 class="font-bold text-lg text-gray-800">
            Annual Checkup
          </h3>
          <p class="text-gray-500 text-sm">
            Comprehensive physical examination. Heart and dental health are excellent.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm">
          <p class="text-sm text-bluecustom font-semibold mb-1">
            NOV 15, 2023
          </p>
          <h3 class="font-bold text-lg text-gray-800">
            Scale & Polish
          </h3>
          <p class="text-gray-500 text-sm">
            Professional dental cleaning.
          </p>
        </div>

      </div>

    </main>

  </section>
  `;
}