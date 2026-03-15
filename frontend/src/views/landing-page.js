// Landing Page - PAWS Pet Care Platform
export function landingPage() {
    return `
<!-- Hero Section -->
<section class="bg-paws-yellow min-h-[90vh] font-roboto rounded-3xl mx-4 lg:mx-8 mt-2 flex items-center justify-center relative overflow-hidden">
    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-paws-green/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-paws-purple/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-6 animate-slide-up">
                <div class="inline-flex items-center gap-2 bg-paws-pink text-text-highlight px-4 py-2 rounded-full text-xs font-semibold font-poppins shadow-soft">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    GUARANTEED PROFESSIONAL CARE
                </div>

                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight font-poppins text-balance">
                    Elevated Care for your <span class="text-text-highlight">best friend.</span>
                </h1>

                <p class="text-text-soft text-lg font-roboto leading-relaxed max-w-lg">
                    We connect pet owners with the most qualified veterinary clinics and trusted specialists. 
                    Your best friend deserves exceptional care.
                </p>

                <div class="flex items-center gap-3 bg-white rounded-full shadow-medium p-2 max-w-md">
                    <input 
                        type="text" 
                        id="searchInput" 
                        placeholder="City or zip code" 
                        class="flex-1 border-none outline-none py-3 font-roboto text-text-primary px-4 rounded-full bg-transparent"
                    >
                    <button 
                        id="btn-search" 
                        class="btn btn-primary px-6 py-3 whitespace-nowrap"
                    >
                        Search
                    </button>
                </div>

                <div class="flex items-center gap-4">
                    <div class="flex -space-x-2">
                        <div class="w-10 h-10 rounded-full border-2 border-white bg-paws-green flex items-center justify-center text-xs font-medium shadow-soft">JL</div>
                        <div class="w-10 h-10 rounded-full border-2 border-white bg-paws-purple flex items-center justify-center text-xs font-medium shadow-soft">MA</div>
                        <div class="w-10 h-10 rounded-full border-2 border-white bg-paws-blue flex items-center justify-center text-xs font-medium shadow-soft">SC</div>
                    </div>
                    <span class="text-sm text-text-soft font-medium font-roboto">+2k pets treated this month</span>
                </div>
            </div>

            <div class="relative animate-fade-in">
                <div class="rounded-3xl shadow-medium overflow-hidden relative">
                    <img src="./frontend/assets/images/hero-pet.jpg" alt="Professional veterinarian caring for pet" class="w-full h-96 object-cover">
                    <div class="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-soft max-w-xs">
                        <div class="flex items-center gap-2 mb-1">
                            <div class="flex">
                                ${Array(5).fill('<svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>').join('')}
                            </div>
                            <span class="text-sm font-bold text-text-primary font-poppins">4.9/5</span>
                        </div>
                        <p class="text-sm text-text-soft font-roboto italic">"The best service for my cat Luna"</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</section>

<!-- Featured Clinics -->
<section class="py-20 mx-4 lg:mx-8">
    <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-start justify-between gap-4 mb-10">
            <div>
                <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-3 font-poppins">Featured Clinics</h2>
                <p class="text-text-soft font-roboto max-w-md">We carefully select clinics with the best ratings and specialized services for your family's peace of mind.</p>
            </div>
            <a href="/#/clinics" class="text-text-highlight hover:text-text-highlight/80 font-medium flex items-center gap-2 font-poppins transition group">
                View all clinics
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
            </a>
        </div>
        <div id="clinicCards" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="col-span-full text-center py-12 text-paws-blue font-roboto">Loading clinics...</div>
        </div>
    </div>
</section>

<!-- Why choose PAWS -->
<section class="py-20 mx-4 lg:mx-8">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-poppins">Why choose PAWS?</h2>
            <p class="text-text-soft max-w-2xl mx-auto font-roboto">We design a stress-free experience so finding the best medical care is as easy as a walk in the park</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mb-16">
            <div class="bg-paws-yellow rounded-3xl shadow-card p-8 text-center hover:shadow-medium transition-shadow">
                <div class="w-14 h-14 mx-auto mb-5 rounded-xl bg-white flex items-center justify-center shadow-soft">
                    <svg class="w-7 h-7 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-text-primary mb-3 font-poppins">Verified Veterinarians</h3>
                <p class="text-text-soft text-sm font-roboto">Every specialist and clinic undergoes rigorous validation</p>
            </div>
            
            <div class="bg-paws-pink rounded-3xl shadow-card p-8 text-center hover:shadow-medium transition-shadow">
                <div class="w-14 h-14 mx-auto mb-5 rounded-xl bg-white flex items-center justify-center shadow-soft">
                    <svg class="w-7 h-7 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-text-primary mb-3 font-poppins">Instant Scheduling</h3>
                <p class="text-text-soft text-sm font-roboto">Book your appointment directly from our platform in seconds</p>
            </div>
            
            <div class="bg-paws-blue rounded-3xl shadow-card p-8 text-center hover:shadow-medium transition-shadow">
                <div class="w-14 h-14 mx-auto mb-5 rounded-xl bg-white flex items-center justify-center shadow-soft">
                    <svg class="w-7 h-7 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-text-primary mb-3 font-poppins">Continuous Support</h3>
                <p class="text-text-soft text-sm font-roboto">Our team is available to help you anytime</p>
            </div>
        </div>

        <!-- CTA Banner -->
        <div class="bg-gradient-to-br from-paws-purple to-paws-green rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div class="relative z-10 text-center max-w-3xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-6 font-poppins text-balance">Ready to give your pet the care they deserve?</h2>
                <p class="text-text-soft mb-8 font-roboto">Join thousands of pet owners who trust PAWS for their furry friends' health.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onclick="window.location.hash='/register'" class="btn btn-primary px-8 py-4 text-base">
                        Start today free
                    </button>
                    <button onclick="window.location.hash='/register'" class="btn btn-secondary px-8 py-4 text-base">
                        I'm a clinic
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Stats Section -->
<section class="py-16 mx-4 lg:mx-8">
    <div class="max-w-7xl mx-auto">
        <div class="bg-white rounded-3xl shadow-card p-8 md:p-12">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="text-center">
                    <p class="text-3xl md:text-4xl font-bold text-text-highlight font-poppins">500+</p>
                    <p class="text-text-soft text-sm font-roboto mt-1">Verified Clinics</p>
                </div>
                <div class="text-center">
                    <p class="text-3xl md:text-4xl font-bold text-text-highlight font-poppins">50k+</p>
                    <p class="text-text-soft text-sm font-roboto mt-1">Happy Pets</p>
                </div>
                <div class="text-center">
                    <p class="text-3xl md:text-4xl font-bold text-text-highlight font-poppins">4.9</p>
                    <p class="text-text-soft text-sm font-roboto mt-1">Average Rating</p>
                </div>
                <div class="text-center">
                    <p class="text-3xl md:text-4xl font-bold text-text-highlight font-poppins">24/7</p>
                    <p class="text-text-soft text-sm font-roboto mt-1">Emergency Support</p>
                </div>
            </div>
        </div>
    </div>
</section>

<div id="modalsContainer"></div>
    `;
}

export async function landingEvents() {
    const btnSearch = document.getElementById('btn-search');

    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            const searchInput = document.getElementById('searchInput');
            const location = searchInput?.value || '';
            window.location.hash = `/clinics?location=${encodeURIComponent(location)}`;
        });
    }

    // Load clinics
    try {
        const response = await fetch('/api/businesses?type=clinic');
        if (response.ok) {
            const clinics = await response.json();
            renderClinicCards(clinics.slice(0, 3));
        } else {
            renderClinicCards([]);
        }
    } catch (error) {
        console.error('Error loading clinics:', error);
        renderClinicCards([]);
    }
}

function renderClinicCards(clinics) {
    const container = document.getElementById('clinicCards');
    if (!container) return;

    if (!clinics || clinics.length === 0) {
        container.innerHTML = `
            <div class="bg-white rounded-3xl shadow-card overflow-hidden hover:shadow-medium transition group">
                <div class="relative h-48 bg-paws-green/20">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg class="w-16 h-16 text-paws-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                    </div>
                    <span class="absolute top-4 right-4 bg-paws-green text-text-primary px-3 py-1 rounded-full text-xs font-semibold">Featured</span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-text-primary font-poppins mb-2">Pet Care Clinic</h3>
                    <p class="text-text-soft text-sm mb-4 font-roboto">Professional veterinary services for your pets</p>
                    <button onclick="window.location.hash='/#/clinics'" class="w-full bg-paws-purple/20 hover:bg-paws-purple/30 text-text-highlight font-semibold py-2 rounded-xl transition font-poppins">
                        View details
                    </button>
                </div>
            </div>
            <div class="bg-white rounded-3xl shadow-card overflow-hidden hover:shadow-medium transition group">
                <div class="relative h-48 bg-paws-blue/20">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg class="w-16 h-16 text-paws-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    </div>
                    <span class="absolute top-4 right-4 bg-paws-blue text-text-primary px-3 py-1 rounded-full text-xs font-semibold">24/7</span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-text-primary font-poppins mb-2">Emergency Center</h3>
                    <p class="text-text-soft text-sm mb-4 font-roboto">Round the clock emergency pet care services</p>
                    <button onclick="window.location.hash='/#/clinics'" class="w-full bg-paws-purple/20 hover:bg-paws-purple/30 text-text-highlight font-semibold py-2 rounded-xl transition font-poppins">
                        View details
                    </button>
                </div>
            </div>
            <div class="bg-white rounded-3xl shadow-card overflow-hidden hover:shadow-medium transition group">
                <div class="relative h-48 bg-paws-pink/20">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg class="w-16 h-16 text-paws-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                        </svg>
                    </div>
                    <span class="absolute top-4 right-4 bg-paws-pink text-text-primary px-3 py-1 rounded-full text-xs font-semibold">Popular</span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-text-primary font-poppins mb-2">Wellness Spa</h3>
                    <p class="text-text-soft text-sm mb-4 font-roboto">Grooming and wellness services for pets</p>
                    <button onclick="window.location.hash='/#/clinics'" class="w-full bg-paws-purple/20 hover:bg-paws-purple/30 text-text-highlight font-semibold py-2 rounded-xl transition font-poppins">
                        View details
                    </button>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = clinics.map(clinic => `
        <div class="bg-white rounded-3xl shadow-card overflow-hidden hover:shadow-medium transition group">
            <div class="relative h-48">
                <img src="${clinic.imagen || './frontend/assets/images/lllll.jpg'}" alt="${clinic.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                ${clinic.estado === 'Abierto' ? `
                    <span class="absolute top-4 right-4 bg-paws-green text-text-primary px-3 py-1 rounded-full text-xs font-semibold">Open now</span>
                ` : ''}
            </div>
            <div class="p-6">
                <div class="flex items-start justify-between mb-2">
                    <h3 class="text-xl font-semibold text-text-primary font-poppins">${clinic.name}</h3>
                    <div class="flex items-center gap-1">
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span class="text-sm font-semibold text-text-primary">${clinic.rating || '4.9'}</span>
                    </div>
                </div>
                <p class="text-text-soft text-sm mb-4 font-roboto">${clinic.address}</p>
                <button onclick="window.location.hash='/#/clinics'" class="w-full bg-paws-purple/20 hover:bg-paws-purple/30 text-text-highlight font-semibold py-2 rounded-xl transition font-poppins">
                    View details
                </button>
            </div>
        </div>
    `).join('');
}