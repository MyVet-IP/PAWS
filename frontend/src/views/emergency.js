export function emergencyPage() {
    return `
        <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-3xl font-bold text-red-600 flex items-center gap-3">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                                24/7 Emergencies
                            </h1>
                            <p class="text-gray-600 mt-2">Urgent veterinary care when you need it most</p>
                        </div>
                        <button onclick="window.location.hash='#/'" class="text-gray-600 hover:text-gray-800 font-medium">
                            ← Back to home
                        </button>
                    </div>
                </div>
            </header>

            <!-- Urgency Level Selector -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white rounded-3xl shadow-lg p-8 mb-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">How urgent is the situation?</h2>
                    <div class="space-y-4" id="urgencyOptions">
                        <label class="flex items-start gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-red-300 cursor-pointer transition">
                            <input type="radio" name="urgency" value="10" class="mt-1.5 w-5 h-5 text-red-600">
                            <div class="flex-1">
                                <p class="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                    <span class="w-4 h-4 bg-red-500 rounded-full"></span>
                                    Critical - Bleeding / Unresponsive / Seizures
                                </p>
                                <p class="text-sm text-gray-600 mt-1">Go to emergency immediately. Life or death situation.</p>
                            </div>
                        </label>

                        <label class="flex items-start gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-orange-300 cursor-pointer transition">
                            <input type="radio" name="urgency" value="5" class="mt-1.5 w-5 h-5 text-orange-600">
                            <div class="flex-1">
                                <p class="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                    <span class="w-4 h-4 bg-orange-500 rounded-full"></span>
                                    Urgent - Vomiting / Diarrhea / Moderate pain
                                </p>
                                <p class="text-sm text-gray-600 mt-1">Requires same-day attention. Cannot wait.</p>
                            </div>
                        </label>

                        <label class="flex items-start gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-green-300 cursor-pointer transition">
                            <input type="radio" name="urgency" value="2" class="mt-1.5 w-5 h-5 text-green-600">
                            <div class="flex-1">
                                <p class="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                    <span class="w-4 h-4 bg-green-500 rounded-full"></span>
                                    Consultation - Check-up / Vaccines / Examination
                                </p>
                                <p class="text-sm text-gray-600 mt-1">Can be scheduled. Not urgent.</p>
                            </div>
                        </label>
                    </div>

                    <button id="btn-find-emergency" class="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition text-lg">
                        Find Emergency Clinics
                    </button>
                </div>

                <!-- Emergency Clinics List -->
                <div id="emergencyClinicsContainer" class="hidden">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">24/7 Clinics Available</h2>
                    <div id="clinicsList" class="grid md:grid-cols-2 gap-6"></div>
                </div>
            </section>

            <!-- Emergency Tips -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white rounded-3xl shadow-lg p-8">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">While you get to the clinic</h3>
                    <ul class="space-y-3 text-gray-700">
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Keep your pet calm and in a safe place</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Call before going so they'll be waiting for you</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Have your pet's medical history and vaccines on hand</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
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
