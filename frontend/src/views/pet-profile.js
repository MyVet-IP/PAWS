// frontend/src/views/petProfile.js

export function PetProfileView() {
  return `
    <section class="petProfile">

      <aside class="sidebar">
        <div class="petCard">
          <img src="https://placedog.net/200" alt="Luna">
          <h2>Luna</h2>
          <p>Golden Retriever</p>
          <p>Female</p>

          <button>Edit Profile</button>
        </div>
      </aside>

      <main class="content">

        <h2>Health Reminders</h2>

        <div class="reminders">
          <div class="card">Rabies Booster</div>
          <div class="card">Vet Visit</div>
        </div>

        <h2>Medical History</h2>

        <div class="history">
          <div class="card">Annual Checkup</div>
          <div class="card">Vaccination</div>
        </div>

      </main>

    </section>
  `;
}
