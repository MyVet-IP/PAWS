export function emergencyPage() {
    return `
            <div class="min-h-screen bg-[#FBF8CC] font-roboto px-4 lg:px-8 pt-4 pb-8">

            <!-- Header -->
            <div class="bg-[#FFCFD2] rounded-[3rem] px-8 py-8 mb-6 mt-4">
                <div class="max-w-5xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-[#333333] font-poppins flex items-center gap-3">
                            <span class="w-3 h-3 bg-[#6A4C93] rounded-full"></span>
                            24/7 Emergencies
                        </h1>
                        <p class="text-[#4A4A4A] mt-2">Urgent veterinary care when you need it most</p>
                    </div>
                    <button onclick="window.location.hash='#/'" class="text-[#6A4C93] hover:text-[#333333] font-medium font-poppins transition">
                        ← Back to home
                    </button>
                </div>
            </div>

            <!-- Urgency Selector -->
            <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white rounded-3xl shadow-sm p-8 mb-8">
                    <h2 class="text-2xl font-bold text-[#333333] mb-6 font-poppins">How urgent is the situation?</h2>
                    <div class="space-y-4" id="urgencyOptions">

                        <label class="flex items-start gap-4 p-5 border-2 border-[#FFCFD2] rounded-3xl hover:border-[#6A4C93] cursor-pointer transition">
                            <input type="radio" name="urgency" value="10" class="mt-1.5 w-5 h-5 accent-[#6A4C93]">
                            <div class="flex-1">
                                <p class="font-bold text-[#333333] flex items-center gap-2 text-lg font-poppins">
                                    <span class="w-3 h-3 bg-[#FFCFD2] border-2 border-[#6A4C93] rounded-full"></span>
                                    Critical — Bleeding / Unresponsive / Seizures
                                </p>
                                <p class="text-sm text-[#4A4A4A] mt-1">Go to emergency immediately. Life or death situation.</p>
                            </div>
                        </label>

                        <label class="flex items-start gap-4 p-5 border-2 border-[#FFCFD2] rounded-3xl hover:border-[#6A4C93] cursor-pointer transition">
                            <input type="radio" name="urgency" value="5" class="mt-1.5 w-5 h-5 accent-[#6A4C93]">
                            <div class="flex-1">
                                <p class="font-bold text-[#333333] flex items-center gap-2 text-lg font-poppins">
                                    <span class="w-3 h-3 bg-[#90BDF4] rounded-full"></span>
                                    Urgent — Vomiting / Diarrhea / Moderate pain
                                </p>
                                <p class="text-sm text-[#4A4A4A] mt-1">Requires same-day attention. Cannot wait.</p>
                            </div>
                        </label>

                        <label class="flex items-start gap-4 p-5 border-2 border-[#FFCFD2] rounded-3xl hover:border-[#6A4C93] cursor-pointer transition">
                            <input type="radio" name="urgency" value="2" class="mt-1.5 w-5 h-5 accent-[#6A4C93]">
                            <div class="flex-1">
                                <p class="font-bold text-[#333333] flex items-center gap-2 text-lg font-poppins">
                                    <span class="w-3 h-3 bg-[#B9FBC0] rounded-full"></span>
                                    Consultation — Check-up / Vaccines / Examination
                                </p>
                                <p class="text-sm text-[#4A4A4A] mt-1">Can be scheduled. Not urgent.</p>
                            </div>
                        </label>
                    </div>

                    <button id="btn-find-emergency" class="w-full mt-6 bg-[#6A4C93] hover:bg-[#F1C0E8] text-white hover:text-[#333333] font-bold py-4 rounded-3xl transition text-lg font-poppins">
                        Find Emergency Clinics
                    </button>
                </div>

                <!-- Emergency Clinics List -->
                <div id="emergencyClinicsContainer" class="hidden">
                    <h2 class="text-2xl font-bold text-[#333333] mb-6 font-poppins">24/7 Clinics Available</h2>
                    <div id="clinicsList" class="grid md:grid-cols-2 gap-6"></div>
                </div>
            </section>

            <!-- Tips -->
            <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-16">
                <div class="bg-gradient-to-br from-[#F1C0E8] to-[#B9FBC0] rounded-[3rem] p-8">
                    <h3 class="text-xl font-bold text-[#333333] mb-6 font-poppins">While you get to the clinic</h3>
                    <ul class="space-y-4 text-[#4A4A4A]">
                        <li class="flex items-start gap-3">
                            <span class="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[#6A4C93] font-bold text-xs">✓</span>
                            <span>Keep your pet calm and in a safe place</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[#6A4C93] font-bold text-xs">✓</span>
                            <span>Call before going so they'll be waiting for you</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[#6A4C93] font-bold text-xs">✓</span>
                            <span>Have your pet's medical history and vaccines on hand</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <span class="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[#6A4C93] font-bold text-xs">✓</span>
                            <span>Do not give food or water until the vet authorizes it</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    `;
}

export async function emergencyEvents() {
    const btnFind = document.getElementById('btn-find-emergency');
    const container = document.getElementById('emergencyClinicsContainer');
    const clinicsList = document.getElementById('clinicsList');

    if (btnFind) {
        btnFind.addEventListener('click', async () => {
            const selected = document.querySelector('input[name="urgency"]:checked');

            if (!selected) {
                alert('Please select the urgency level');
                return;
            }

            const urgencyLevel = parseInt(selected.value);

            // Show clinics container
            if (container) {
                container.classList.remove('hidden');
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Load emergency clinics
            try {
                const response = await fetch('http://localhost:3000/api/veterinarias');
                const clinics = await response.json();

                // Filter only clinics with emergency service
                const emergencyClinics = clinics.filter(clinic =>
                    clinic.servicios_emergencia || clinic.servicios?.includes('Emergencias 24/7')
                );

                if (emergencyClinics.length === 0) {
                    clinicsList.innerHTML = '<p class="col-span-2 text-center text-gray-500 py-8">No emergency clinics available found.</p>';
                    return;
                }

                // Render clinics
                clinicsList.innerHTML = emergencyClinics.map(clinic => `
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                        <div class="p-6">
                            <div class="flex items-start justify-between mb-3">
                                <h3 class="text-xl font-bold text-gray-800">${clinic.nombre}</h3>
                                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">24/7</span>
                            </div>
                            <p class="text-gray-600 text-sm mb-4 flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                    ${clinic.direccion || 'Address not available'}
                            </p>
                            <div class="flex gap-3">
                                ${clinic.telefono ? `<a href="tel:${clinic.telefono}" class="flex-1 bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg font-medium transition">Call Now</a>` : ''}
                                <button onclick="window.location.hash='#/clinicas'" class="flex-1 border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-500 py-2 rounded-lg font-medium transition">View Details</button>
                            </div>
                            ${clinic.whatsapp ? `
                            <a href="https://api.whatsapp.com/send/?phone=%2B${clinic.whatsapp}&text=Hola%20quiero%20informacion&type=phone_number&app_absent=1" target="_blank"
                                class="mt-3 flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                Enviar WhatsApp
                            </a>` : ''}

                        </div>
                    </div>
                `).join('');

            } catch (error) {
                console.error('Error loading emergency clinics:', error);
                clinicsList.innerHTML = '<p class="col-span-2 text-center text-red-500 py-8">Error loading clinics. Please try again.</p>';
            }
        });
    }
}
