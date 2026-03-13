// Please try not to modify the styles too much, it took me a while to fix them, thanks
export function landingPage() {
    return `
<!-- Hero Section -->
<div class="bg-[#FBF8CC] min-h-screen font-roboto rounded-[3rem] mx-4 lg:mx-8 mt-1 flex items-center justify-center">
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div class="space-y-6">
        <div class="inline-flex items-center gap-2 bg-[#FFCFD2] text-[#6A4C93] px-4 py-2 rounded-full text-xs font-semibold font-poppins">
          GUARANTEED PROFESSIONAL CARE
        </div>

        <h1 class="text-5xl md:text-6xl font-bold text-[#333333] leading-tight font-poppins">
          Elevated Care for your <span class="text-[#6A4C93]">best friend.</span>
        </h1>

        <p class="text-[#4A4A4A] text-lg font-roboto">
          We connect pet owners with the most qualified veterinary clinics and trusted specialists. 
          Your best friend deserves exceptional care.
        </p>

        <div class="flex items-center gap-3 bg-white rounded-3xl shadow-md p-2">
          <input type="text" id="searchInput" placeholder="City or zip code" 
                 class="flex-1 border-none outline-none py-3 font-roboto text-[#333333] px-4 rounded-3xl">
          <button id="btn-search" 
                  class="bg-[#B9FBC0] text-[#333333] font-poppins font-semibold px-8 py-3 rounded-3xl hover:bg-[#9FEFA8] transition">
            Search
          </button>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex -space-x-2">
            <div class="w-10 h-10 rounded-full border-2 border-white bg-[#B9FBC0]"></div>
            <div class="w-10 h-10 rounded-full border-2 border-white bg-[#F1C0E8]"></div>
            <div class="w-10 h-10 rounded-full border-2 border-white bg-[#90BDF4]"></div>
          </div>
          <span class="text-sm text-[#4A4A4A] font-medium font-roboto">+2k pets treated this month</span>
        </div>
      </div>

      <div class="relative">
        <div class="rounded-3xl shadow-2xl overflow-hidden relative">
          <img src="./frontend/assets/images/hero-pet.jpg" alt="Professional veterinarian caring for pet" class="w-full h-96 object-cover">
          <div class="absolute bottom-8 left-8 bg-[#FFCFD2] rounded-3xl p-4 shadow-md max-w-xs">
            <span class="ml-1 text-sm font-bold text-[#333333] font-poppins">4.9/5</span>
            <p class="text-xs text-[#4A4A4A] font-roboto">"The best service for my cat Luna"</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<!-- Featured Clinics -->
<section class="mt-24 mb-16 mx-4 lg:mx-8">
  <div class="flex items-start justify-between mb-8">
    <div>
      <h2 class="text-4xl font-bold text-[#333333] mb-2 font-poppins">Featured Clinics</h2>
      <p class="text-[#4A4A4A] font-roboto">We carefully select clinics with the best ratings and<br>specialized services for your family's peace of mind.</p>
    </div>
    <a href="#/clinicas" class="text-[#6A4C93] hover:text-[#F1C0E8] font-medium flex items-center gap-1 font-poppins">
      View all clinics
    </a>
  </div>
  <div id="clinicCards" class="grid md:grid-cols-3 gap-6">
    <div class="col-span-3 text-center py-12 text-[#90BDF4] font-roboto">Loading clinics...</div>
  </div>
</section>

<!-- Why choose PAWS -->
<section class="mt-24 mb-16">
  <div class="text-center mb-16">
    <h2 class="text-3xl md:text-4xl font-semibold text-[#333333] mb-4 font-poppins">Why choose PAWS?</h2>
    <p class="text-[#4A4A4A] max-w-2xl mx-auto font-roboto">We design a stress-free experience so finding the best medical care is as easy as a walk in the park</p>
  </div>

  <div class="grid md:grid-cols-3 gap-8 mb-16">
    <div class="bg-[#FBF8CC] rounded-3xl shadow-sm p-8 text-center">
      <h3 class="text-xl font-semibold text-[#333333] mb-3 font-poppins">Verified Veterinarians</h3>
      <p class="text-[#4A4A4A] text-sm font-roboto">Every specialist and clinic undergoes rigorous validation</p>
    </div>
    <div class="bg-[#FFCFD2] rounded-3xl shadow-sm p-8 text-center">
      <h3 class="text-xl font-semibold text-[#333333] mb-3 font-poppins">Instant Scheduling</h3>
      <p class="text-[#4A4A4A] text-sm font-roboto">Book your appointment directly from our platform in seconds</p>
    </div>
    <div class="bg-[#90BDF4] rounded-3xl shadow-sm p-8 text-center">
      <h3 class="text-xl font-semibold text-[#333333] mb-3 font-poppins">Continuous Support</h3>
      <p class="text-[#4A4A4A] text-sm font-roboto">Our team is available to help you anytime</p>
    </div>
  </div>

  <div class="bg-gradient-to-br from-[#F1C0E8] to-[#B9FBC0] rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
    <div class="relative z-10 text-center max-w-3xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-semibold text-[#333333] mb-8 font-poppins">Ready to give your pet<br>the care they deserve?</h2>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button onclick="window.location.hash='#/register'" class="bg-[#B9FBC0] text-[#333333] px-8 py-4 rounded-3xl font-poppins font-semibold hover:bg-[#9FEFA8] transition">Start today free</button>
        <button class="bg-white border-2 border-[#6A4C93] text-[#6A4C93] px-8 py-4 rounded-3xl font-poppins font-semibold hover:bg-[#F1C0E8] transition">I'm a clinic</button>
      </div>
    </div>
  </div>
</section>

<footer class="bg-[#F1C0E8] text-[#333333] pt-16 pb-8 font-roboto rounded-[3rem] mx-4 lg:mx-8 mb-4">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-10 h-10 bg-[#B9FBC0] rounded-full flex items-center justify-center overflow-hidden">
            <img src="./frontend/assets/images/lllll.jpg" alt="PAWS Logo" class="w-full h-full object-cover">
          </div>
          <span class="text-xl font-bold font-poppins">PAWS</span>
        </div>
        <p class="text-[#4A4A4A] text-sm mb-6">
          The leading platform for pet health search and management in Latin America. Your pet, our priority.
        </p>
        <div class="flex gap-3">
          <a href="#twitter" class="w-10 h-10 bg-[#FFCFD2] hover:bg-[#90BDF4] rounded-full flex items-center justify-center transition" aria-label="Twitter">
            <svg class="w-5 h-5 text-[#333333]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832..."/>
            </svg>
          </a>
          <a href="#instagram" class="w-10 h-10 bg-[#FFCFD2] hover:bg-[#90BDF4] rounded-full flex items-center justify-center transition" aria-label="Instagram">
            <svg class="w-5 h-5 text-[#333333]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204..."/>
            </svg>
          </a>
        </div>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4 font-poppins">Platform</h3>
        <ul class="space-y-3">
          <li><a href="#/clinicas" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">Find Clinics</a></li>
          <li><a href="#/emergencias" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">24/7 Services</a></li>
          <li><a href="#/especialistas" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">Specialists</a></li>
          <li><a href="#/tips" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">Health Blog</a></li>
        </ul>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4 font-poppins">Company</h3>
        <ul class="space-y-3">
          <li><a href="#/nosotros" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">About Us</a></li>
          <li><a href="#/trabajo" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">Work with us</a></li>
          <li><a href="#/contacto" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">Contact</a></li>
          <li><a href="#/prensa" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">Press</a></li>
        </ul>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4 font-poppins">Subscribe</h3>
        <p class="text-[#4A4A4A] text-sm mb-4">Receive weekly health tips for your pets.</p>
        <form>
          <input type="email" placeholder="your@email.com" 
                 class="w-full px-4 py-3 rounded-full bg-[#FBF8CC] border border-[#90BDF4] text-[#333333] placeholder-[#6A4C93] text-sm mb-3">
          <button type="submit" 
                  class="w-full bg-[#B9FBC0] hover:bg-[#9FEFA8] text-[#333333] font-semibold px-6 py-3 rounded-full transition font-poppins">
            Join
          </button>
        </form>
      </div>
    </div>

    <div class="border-t border-[#90BDF4] pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-[#4A4A4A] text-sm font-roboto">© 2026 PAWS. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#/terminos" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">Terms & Conditions</a>
          <a href="#/privacidad" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">Privacy</a>
          <a href="#/cookies" class="text-[#4A4A4A] text-sm hover:text-[#6A4C93]">Cookies</a>
        </div>
      </div>
    </div>
  </div>
</footer>
<div id="modalsContainer"></div>
    `;
}

export async function landingEvents() {
    const btnIngresar = document.getElementById('btn-ingresar');
    const btnSearch = document.getElementById('btn-search');
    const btnEmergencyFab = document.getElementById('btn-emergency-fab');

    if (btnIngresar) {
        btnIngresar.addEventListener('click', () => {
            window.location.hash = '#/login';
        });
    }

    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const searchInput = document.getElementById('searchInput');
            const location = searchInput?.value || '';
            window.location.hash = `#/clinicas?location=${encodeURIComponent(location)}`;
        });
    }

    if (btnEmergencyFab) {
        btnEmergencyFab.addEventListener('click', () => {
            window.location.hash = '#/emergencias';
        });
    }

    try {
        const response = await fetch('http://localhost:3000/api/clinics');
        if (response.ok) {
            const clinics = await response.json();
            renderClinicCards(clinics.slice(0, 3));
        }
    } catch (error) {
        console.error('Error loading clinics:', error);
    }
}

function renderClinicCards(clinics) {
    const container = document.getElementById('clinicCards');
    if (!container || !clinics || clinics.length === 0) return;

    container.innerHTML = clinics.map(clinic => `
        <div class="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition">
            <div class="relative h-48">
                <img src="${clinic.imagen || './frontend/assets/images/lllll.jpg'}" alt="${clinic.nombre}" class="w-full h-full object-cover">
                ${clinic.estado === 'Abierto' ? `
                    <span class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Open now</span>
                ` : ''}
            </div>
            <div class="p-6">
                <div class="flex items-start justify-between mb-2">
                    <h3 class="text-xl font-semibold text-gray-800">${clinic.nombre}</h3>
                    <div class="flex items-center gap-1">
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span class="text-sm font-semibold text-gray-700">${clinic.rating || '4.9'}</span>
                    </div>
                </div>
                <p class="text-gray-600 text-sm mb-4">${clinic.direccion}</p>
                <button onclick="window.location.hash='#/clinicas'" class="w-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-semibold py-2 rounded-xl transition">
                    View details
                </button>
            </div>
        </div>
    `).join('');
}