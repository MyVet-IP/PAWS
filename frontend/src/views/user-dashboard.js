export function dashboardPage() {
  return `
  <!-- HEADER ROW -->
  <div class="flex justify-between items-center mb-8">
    <div>
      <h1 id="dash-username" class="text-2xl font-bold text-gray-800">Welcome!</h1>
      <p class="text-gray-400 text-sm mt-1 flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        Medellin, Colombia
      </p>
    </div>
    <div class="flex items-center gap-3">
      <button id="btn-add-pet"
        class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Add pet
      </button>
      <button id="btn-logout"
        class="w-10 h-10 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center transition"
        title="Logout">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
      </button>
    </div>
  </div>
 
  <!-- STATS -->
  <div class="grid grid-cols-3 gap-5 mb-10">
 
    <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
      <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">🐾</div>
      <div>
        <p class="text-gray-400 text-xs">Pets</p>
        <h3 id="pets-count" class="text-2xl font-bold text-gray-800">0</h3>
      </div>
    </div>
 
    <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
      <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">📅</div>
      <div>
        <p class="text-gray-400 text-xs">Next Appointment</p>
        <h3 class="text-2xl font-bold text-gray-800">--</h3>
      </div>
    </div>
 
    <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
      <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">💊</div>
      <div>
        <p class="text-gray-400 text-xs">Active Rx</p>
        <h3 class="text-2xl font-bold text-gray-800">0</h3>
      </div>
    </div>
 
  </div>
 
  <!-- PETS SECTION -->
  <div class="flex items-center justify-between mb-5">
    <h2 class="text-lg font-semibold text-gray-800">Your pets</h2>
    <a href="#/pet-profile" class="text-green-600 hover:underline text-sm font-medium flex items-center gap-1">
      View all
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </a>
  </div>
 
  <div id="pets-grid" class="flex gap-5 flex-wrap">
    <div class="text-gray-400 text-sm flex items-center gap-2">
      <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
      Loading...
    </div>
  </div>
 
  <!-- ADD PET MODAL -->
  <div id="modal-add-pet"
       class="hidden fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-bold text-gray-800">Add new pet</h2>
        <button id="modal-close"
          class="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <form id="add-pet-form" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input id="pet-nombre" type="text" required placeholder="e.g. Bruno"
            class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"/>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Species</label>
          <select id="pet-especie"
            class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300">
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Breed</label>
          <input id="pet-raza" type="text" placeholder="e.g. Labrador"
            class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"/>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
          <input id="pet-edad" type="number" min="0" max="30" required
            class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"/>
        </div>
        <button type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl text-sm transition">
          Save Pet
        </button>
      </form>
    </div>
  </div>
  `;
}

export function dashboardEvents() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Update username
  const nameEl = document.getElementById('dash-username');
  if (nameEl && user) {
    nameEl.textContent = `Welcome, ${user.nombre?.split(' ')[0] || 'User'}!`;
  }

  // Logout button
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.hash = '#/';
    });
  }

  // Add pet modal — open
  const addPetBtn = document.getElementById('btn-add-pet');
  const modal = document.getElementById('modal-add-pet');
  const modalClose = document.getElementById('modal-close');

  if (addPetBtn && modal) {
    addPetBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  }

  // Add pet modal — close via X button
  if (modalClose && modal) {
    modalClose.addEventListener('click', () => modal.classList.add('hidden'));
  }

  // Close modal clicking backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  // Add pet form submit
  const addForm = document.getElementById('add-pet-form');
  if (addForm) {
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem('user'));
      const body = {
        nombre: document.getElementById('pet-nombre').value,
        especie: document.getElementById('pet-especie').value,
        raza: document.getElementById('pet-raza').value,
        edad: parseInt(document.getElementById('pet-edad').value),
        id_cliente: user?.id_cliente
      };

      try {
        const res = await fetch('/api/mascotas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (res.ok) {
          modal.classList.add('hidden');
          addForm.reset();
          loadPets();
        }
      } catch (error) {
        console.error('Error adding pet:', error);
      }
    });
  }

  // Initial load
  loadPets();
}

// ─────────────────────────────────────────────
//  loadPets — fetches and renders the pet grid
// ─────────────────────────────────────────────
async function loadPets() {
  const grid = document.getElementById('pets-grid');
  const countEl = document.getElementById('pets-count');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!grid || !user) return;

  try {
    const res = await fetch(`/api/users/${user.id_cliente}/dashboard`);
    if (!res.ok) throw new Error('Failed to load pets');

    const data = await res.json();
    const pets = data.mascotas || [];

    if (countEl) countEl.textContent = pets.length;

    const addCard = `
      <div onclick="document.getElementById('modal-add-pet').classList.remove('hidden')"
           class="w-64 border-2 border-dashed border-green-300 rounded-3xl flex flex-col items-center justify-center py-16 text-gray-400 cursor-pointer hover:border-green-500 hover:bg-green-50 transition group">
        <div class="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition">
          <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </div>
        <p class="font-medium text-gray-500">Add pet</p>
      </div>
    `;

    if (pets.length === 0) {
      grid.innerHTML = addCard.replace('Add pet', 'Add your first pet');
      return;
    }

    const cards = pets.map(p => `
      <div class="bg-white rounded-3xl shadow-sm w-64 p-6 hover:shadow-md hover:-translate-y-1 transition group border border-gray-100">
        <div class="w-full h-40 bg-gradient-to-br ${p.especie === 'Cat' ? 'from-purple-100 to-pink-100' : 'from-green-100 to-blue-100'} rounded-2xl mb-4 flex items-center justify-center text-5xl">
          ${p.especie === 'Cat' ? '🐱' : p.especie === 'Dog' ? '🐶' : '🐾'}
        </div>
        <h3 class="font-bold text-lg text-gray-800">${p.nombre}</h3>
        <p class="text-gray-400 text-sm mb-4">${p.raza || p.especie} · ${p.edad} ${p.edad === 1 ? 'year' : 'years'}</p>
        <button class="w-full bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 rounded-xl text-sm transition">
          View profile
        </button>
      </div>
    `).join('');

    grid.innerHTML = cards + addCard;

  } catch (error) {
    console.error(error);
    grid.innerHTML = `<p class="text-gray-400">Unable to load pets. Please try again.</p>`;
  }
}