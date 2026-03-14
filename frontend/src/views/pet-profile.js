export function petProfilepage() {
  return `
  <section class="flex gap-12 p-10 bg-gray-50 min-h-screen">

    <!-- RIGHT CONTENT -->
    <main class="flex-1">

      <!-- TOP ACTIONS -->
      <div class="flex justify-end gap-4 mb-6">
        <button class="border border-pink text-gray-700 px-5 py-2 rounded-full">
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
          <p class="text-sm text-pink font-semibold mb-2">
            IN 12 DAYS
          </p>
          <h3 class="font-bold text-lg text-gray-800">
            Rabies Booster
          </h3>
          <p class="text-gray-500 text-sm">
            Annual mandatory vaccination.
          </p>

          <button class="text-pink mt-3 font-semibold">
            Confirm Appointment →
          </button>
        </div>

        <div class="bg-lightblue/40 p-6 rounded-2xl">
          <p class="text-sm text-blue font-semibold mb-2">
            IN 3 WEEKS
          </p>
          <h3 class="font-bold text-lg text-gray-800">
            Deworming Pill
          </h3>
          <p class="text-gray-500 text-sm">
            Monthly treatment reminder.
          </p>

          <button class="text-blue mt-3 font-semibold">
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
          <p class="text-sm text-pink font-semibold mb-1">
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
          <p class="text-sm text-blue font-semibold mb-1">
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