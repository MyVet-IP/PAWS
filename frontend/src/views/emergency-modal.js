import { apiService } from "../services/api.js"

function showLoading() {
  const loadingHTML = `
    <div id="loading-overlay"
      class="fixed inset-0 z-[999] flex items-center justify-center bg-[rgba(15,23,42,0.5)] backdrop-blur-sm">

      <div class="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center gap-4">

        <div class="w-10 h-10 border-4 border-primary-pink border-t-transparent rounded-full animate-spin"></div>

        <p class="font-bold text-[#334155]">
          Finding emergency clinics...
        </p>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", loadingHTML);
}

function hideLoading() {
  const loader = document.getElementById("loading-overlay");
  if (loader) loader.remove();
}

export function modalView(){
  return `<section>
    <!-- Overlay -->
    <div
      class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[rgba(15,23,42,0.6)] backdrop-blur-sm"
    >
      <!-- Modal -->
      <div
        class="relative bg-white w-full max-w-[900px] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden max-h-[calc(100vh-2rem)] overflow-y-auto"
      >
        <!-- Header -->
        <div class="pt-12 px-12 text-center">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-soft-green text-[#334155] text-xs font-bold uppercase tracking-[0.05em] mb-4"
          >
            <span class="material-symbols-outlined text-[1rem]"
              >check_circle</span
            >
            Specialists Available Now
          </div>

          <!-- Title -->
          <h1
            class="text-red-600 text-[2.25rem] font-black leading-[1.2] tracking-[-0.03em] mb-4"
          >
            Emergency Services
          </h1>

          <!-- Subtitle -->
          <p class="text-[#64748b] text-lg font-medium max-w-xl mx-auto">
            Time is critical. Select your pet category for immediate redirection
            to the nearest specialized emergency unit.
          </p>
        </div>

        <!-- Body / Cards -->
        <div class="pt-8 px-12 pb-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Card: Dogs & Cats -->
            <button
              class="group flex flex-col items-center text-center outline-none border-none bg-transparent cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-95"
            >
              <div
                class="w-full aspect-[4/3] rounded-2xl mb-6 bg-primary-pink overflow-hidden border-4 border-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow duration-300 group-hover:shadow-[0_10px_25px_-5px_rgba(255,175,204,0.4)]"
              >
                <img
                  alt="Dogs &amp; Cats"
                  class="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiDOq4ifShCjxpjTDd6aMRG1RTkOvVQv6VmB5mH6NQ5ZfDJ54cSHoJXWAZSx03YgfYMOT903pbN2VtKCMWRk16odFaKhJFa6Ma1HPSchbmfRGgW0LkgULFRQPBgK4hmIUNbKTxa8cUQy5Q8DpWpeCIIAffZJgs9p0Ruv5C9p8vxJsRq4xiKDUAa61y_U9O3T7_QDz6WYE6ikzCHtxzU_aTuNzyo4-A-4IrIjZftkmgyb3zr6mQsgNoDAPgJONx97u4KR91IoRBclf5"
                />
              </div>
              <h3 class="text-2xl font-black text-primary-pink mb-2">
                Dogs &amp; Cats
              </h3>
              <p class="text-[#64748b] text-sm font-semibold max-w-[240px]">
                Domestic canine and feline urgent care and triage.
              </p>
            </button>

            <!-- Card: Exotic Animals -->
            <button
              class="group flex flex-col items-center text-center outline-none border-none bg-transparent cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-95"
            >
              <div
                class="w-full aspect-[4/3] rounded-2xl mb-6 bg-primary-pink overflow-hidden border-4 border-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-shadow duration-300 group-hover:shadow-[0_10px_25px_-5px_rgba(255,175,204,0.4)]"
              >
                <img
                  alt="Exotic Animals"
                  class="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkOS-VqY03QrM711Y8GYXGbb59OHEnNOFGbYtfuSMTi50sMBv37jdc3O5M7VdFG8N01lnaQ3OTek8Y9uMAtOyRvkeUusrj4s37pikBCqDtfyV4C1TmezjeAvx-_i7nOF1LqlLGosrmbjNK5kUxCJQd9zzxUCy9_i1QCkP4nDhHKh1j0PornFyCyYGRgwVyXEDTtEANo9lp7plV6I-An9-tTod2J9CjuuDqewVPf5IgtOtZ-LZ4xrxikB280OYKI3gBW2FeoSzvk4i2"
                />
              </div>
              <h3 class="text-2xl font-black text-primary-pink mb-2">
                Exotic Animals
              </h3>
              <p class="text-[#64748b] text-sm font-semibold max-w-[240px]">
                Rabbits, birds, reptiles, and specialized small animal care.
              </p>
            </button>
          </div>
        </div>

        <!-- Close button -->
        <button
          class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#f1f5f9] text-[#94a3b8] border-none cursor-pointer shadow-sm transition-all duration-200 hover:text-primary-pink hover:bg-white"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  </section>`
}

export async function modalEvents(){
  const cards =document.querySelectorAll(".group");

  cards.forEach((card, index) => {
    card.addEventListener("click", async () => {
      showLoading();
    console.log("Card clickeada:", index);

      try {
        const clinics = await apiService.getClinics();

        console.log("Data from backend:", clinics);
        
        hideLoading();
        if (index === 0) {
          console.log("Dogs & Cats seleccionados");
        } else {
          console.log("Exotic seleccionados");
        }

      } catch (error) {
        hideLoading();
        console.error("Clinics load wrong:", error);
      }

    });
  })

  const closeBtn = document.querySelector(".absolute.top-6.right-6");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.querySelector(".fixed.inset-0").remove();
    });
  }


}

