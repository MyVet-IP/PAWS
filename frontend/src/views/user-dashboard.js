export function dashboardEvents() {
  // const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  // if (!user) { window.location.hash = '#/login'; return; }

  // Update name
  // const nameEl = document.getElementById('dash-username');
  // if (nameEl) nameEl.textContent = `Welcome, ${user.nombre.split(' ')[0]}!`;

  //   // Load pets
  //   fetch(`/api/users/${user.id_cliente}/dashboard`)
  //     .then(r => r.json())
  //     .then(data => {
  //       const grid = document.getElementById('pets-grid');
  //       if (!grid) return;
  //       const pets = data.mascotas || [];

  //       const cards = pets.map(p => `
  //         <div class="bg-white rounded-2xl shadow-md w-64 p-5 hover:-translate-y-1 transition">
  //           <div class="w-full h-40 bg-lightblue rounded-xl mb-4 flex items-center justify-center text-5xl">
  //             ${p.especie === 'Cat' ? '🐱' : '🐶'}
  //           </div>
  //           <h3 class="font-bold text-lg text-gray-800">${p.nombre}</h3>
  //           <p class="text-gray-500 text-sm mb-4">${p.raza || p.especie} • ${p.edad} ${p.edad === 1 ? 'year' : 'years'}</p>
  //           <button class="bg-softpink w-full py-2 rounded-full font-medium">View profile</button>
  //         </div>
  //       `).join('');

  //       grid.innerHTML = cards + `
  //         <div onclick="document.getElementById('modal-add-pet').classList.remove('hidden')"
  //              class="w-64 border-2 border-dashed border-blue rounded-2xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-pink transition">
  //           <span class="text-3xl mb-2">＋</span>
  //           <p>Add pet</p>
  //         </div>`;

  //       // Counter
  //       const countEl = document.getElementById('pets-count');
  //       if (countEl) countEl.textContent = pets.length;
  //     })
  //     .catch(() => { });

  //   // Form to add pet
  //   const addForm = document.getElementById('add-pet-form');
  //   if (addForm) {
  //     addForm.addEventListener('submit', async (e) => {
  //       e.preventDefault();
  //       const user = JSON.parse(localStorage.getItem('currentUser'));
  //       const body = {
  //         nombre: document.getElementById('pet-nombre').value,
  //         especie: document.getElementById('pet-especie').value,
  //         raza: document.getElementById('pet-raza').value,
  //         edad: parseInt(document.getElementById('pet-edad').value),
  //         id_cliente: user.id_cliente
  //       };
  //       const res = await fetch('/api/mascotas', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(body)
  //       });
  //       if (res.ok) {
  //         document.getElementById('modal-add-pet').classList.add('hidden');
  //         addForm.reset();
  //         initDashboard(); // reload
  //       }
  //     });
  //   }

  //   // Close modal
  //   document.getElementById('modal-close')?.addEventListener('click', () => {
  //     document.getElementById('modal-add-pet').classList.add('hidden');
  //   });

  //   // Header button
  //   document.getElementById('btn-add-pet')?.addEventListener('click', () => {
  //     document.getElementById('modal-add-pet').classList.remove('hidden');
  //   });
}

export function dashboardPage() {
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
        <button class="bg-white text-pink w-full py-2 rounded-full font-semibold">
        Upgrade
        </button>
    </div>

    </aside>


    <!-- MAIN CONTENT -->
    <main class="flex-1 p-10 overflow-y-auto">

      <!-- HEADER -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 id="dash-username" class="text-3xl font-bold text-gray-800">Welcome!</h1>
          <p class="text-gray-500">Medellin, Colombia</p>
        </div>
        <button id="btn-add-pet" class="bg-pink text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition">
          + Add pet
        </button>
      </div>

      <!-- STATS -->
      <div class="grid grid-cols-3 gap-6 mb-10">

        <div class="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div class="w-12 h-12 bg-lightblue rounded-xl flex items-center justify-center">🐾</div>
            <div>
              <p class="text-gray-500 text-sm">Pets</p>
              <h3 id="pets-count" class="text-xl font-bold text-gray-800">...</h3>
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

        <h2 class="text-xl font-semibold text-gray-800 mb-6">Your pets</h2>
        <div id="pets-grid" class="flex gap-6 flex-wrap">
          <p class="text-gray-400">Loading...</p>
        </div>

    </main>
  </section>

  <!-- ADD PET MODAL -->
  <div id="modal-add-pet" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-800">Add pet</h2>
        <button id="modal-close" class="text-gray-400 hover:text-gray-600 text-2xl">×</button>
      </div>
      <form id="add-pet-form" class="space-y-4">
        <div>
          <label class="text-sm text-gray-600">Name</label>
          <input id="pet-nombre" type="text" required placeholder="e.g. Bruno"
            class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink">
        </div>
        <div>
          <label class="text-sm text-gray-600">Species</label>
          <select id="pet-especie" class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink">
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label class="text-sm text-gray-600">Breed</label>
          <input id="pet-raza" type="text" placeholder="e.g. Labrador"
            class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink">
        </div>
        <div>
          <label class="text-sm text-gray-600">Age (years)</label>
          <input id="pet-edad" type="number" min="0" max="30" required
            class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink">
        </div>
        <button type="submit"
          class="w-full bg-pink text-white py-2 rounded-full font-semibold hover:opacity-90 transition">
          Save
        </button>
      </form>
    </div>
  </div>
  `;

}