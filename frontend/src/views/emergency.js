export function EmergencyView() {
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
                                Emergencias 24/7
                            </h1>
                            <p class="text-gray-600 mt-2">Atención veterinaria urgente cuando más la necesitas</p>
                        </div>
                        <button onclick="window.location.hash='#/'" class="text-gray-600 hover:text-gray-800 font-medium">
                            ← Volver al inicio
                        </button>
                    </div>
                </div>
            </header>

            <!-- Urgency Level Selector -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white rounded-3xl shadow-lg p-8 mb-8">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">¿Qué tan urgente es la situación?</h2>
                    <div class="space-y-4" id="urgencyOptions">
                        <label class="flex items-start gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-red-300 cursor-pointer transition">
                            <input type="radio" name="urgency" value="10" class="mt-1.5 w-5 h-5 text-red-600">
                            <div class="flex-1">
                                <p class="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                    <span class="w-4 h-4 bg-red-500 rounded-full"></span>
                                    Crítico - Sangrado / No responde / Convulsiones
                                </p>
                                <p class="text-sm text-gray-600 mt-1">Ve inmediatamente a urgencias. Situación de vida o muerte.</p>
                            </div>
                        </label>

                        <label class="flex items-start gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-orange-300 cursor-pointer transition">
                            <input type="radio" name="urgency" value="5" class="mt-1.5 w-5 h-5 text-orange-600">
                            <div class="flex-1">
                                <p class="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                    <span class="w-4 h-4 bg-orange-500 rounded-full"></span>
                                    Urgente - Vómito / Diarrea / Dolor moderado
                                </p>
                                <p class="text-sm text-gray-600 mt-1">Requiere atención el mismo día. No puede esperar.</p>
                            </div>
                        </label>

                        <label class="flex items-start gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-green-300 cursor-pointer transition">
                            <input type="radio" name="urgency" value="2" class="mt-1.5 w-5 h-5 text-green-600">
                            <div class="flex-1">
                                <p class="font-bold text-gray-800 flex items-center gap-2 text-lg">
                                    <span class="w-4 h-4 bg-green-500 rounded-full"></span>
                                    Consulta - Revisión / Vacunas / Chequeo
                                </p>
                                <p class="text-sm text-gray-600 mt-1">Se puede programar. No es urgente.</p>
                            </div>
                        </label>
                    </div>

                    <button id="btn-find-emergency" class="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition text-lg">
                        Buscar Clínicas de Emergencia
                    </button>
                </div>

                <!-- Emergency Clinics List -->
                <div id="emergencyClinicsContainer" class="hidden">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Clínicas 24/7 Disponibles</h2>
                    <div id="clinicsList" class="grid md:grid-cols-2 gap-6"></div>
                </div>
            </section>

            <!-- Emergency Tips -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white rounded-3xl shadow-lg p-8">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Mientras llegas a la clínica</h3>
                    <ul class="space-y-3 text-gray-700">
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Mantén a tu mascota tranquila y en un lugar seguro</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Llama antes de ir para que te estén esperando</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>Ten a mano el historial médico y vacunas de tu mascota</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            <span>No le des comida ni agua hasta que el veterinario lo autorice</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    `;
}

export async function initEmergency() {
    const btnFind = document.getElementById('btn-find-emergency');
    const container = document.getElementById('emergencyClinicsContainer');
    const clinicsList = document.getElementById('clinicsList');

    if (btnFind) {
        btnFind.addEventListener('click', async () => {
            const selected = document.querySelector('input[name="urgency"]:checked');
            
            if (!selected) {
                alert('Por favor selecciona el nivel de urgencia');
                return;
            }

            const urgencyLevel = parseInt(selected.value);
            
            // Mostrar contenedor de clínicas
            if (container) {
                container.classList.remove('hidden');
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Cargar clínicas de emergencia
            try {
                const response = await fetch('http://localhost:3000/api/veterinarias');
                const clinics = await response.json();
                
                // Filtrar solo clínicas con servicio de emergencia
                const emergencyClinics = clinics.filter(clinic => 
                    clinic.servicios_emergencia || clinic.servicios?.includes('Emergencias 24/7')
                );

                if (emergencyClinics.length === 0) {
                    clinicsList.innerHTML = '<p class="col-span-2 text-center text-gray-500 py-8">No se encontraron clínicas de emergencia disponibles.</p>';
                    return;
                }

                // Renderizar clínicas
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
                                ${clinic.direccion || 'Dirección no disponible'}
                            </p>
                            <div class="flex gap-3">
                                ${clinic.telefono ? `<a href="tel:${clinic.telefono}" class="flex-1 bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg font-medium transition">Llamar Ahora</a>` : ''}
                                <button onclick="window.location.hash='#/clinicas'" class="flex-1 border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-500 py-2 rounded-lg font-medium transition">Ver Detalles</button>
                            </div>
                        </div>
                    </div>
                `).join('');

            } catch (error) {
                console.error('Error loading emergency clinics:', error);
                clinicsList.innerHTML = '<p class="col-span-2 text-center text-red-500 py-8">Error al cargar las clínicas. Por favor intenta de nuevo.</p>';
            }
        });
    }
}
