// Por favor traten de no tocar mucho los estilos, me demore arreglandolo, gracias
export function loadLandingPage() {
    return `
        <div class="hero-gradient min-h-screen">
        <nav class="main-nav bg-white/80 border-b border-gray-200/50 sticky-nav">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16 md:h-20">
                    <div class="flex items-center gap-2">
                        <div class="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center overflow-hidden">
                            <img src="./frontend/assets/images/lllll.jpg" alt="VetCare Logo" class="w-full h-full object-cover">
                        </div>
                        <span class="text-xl font-bold text-gray-800">VetCare</span>
                    </div>

                    <div class="hidden md:flex items-center gap-8">
                        <a href="#/clinicas" class="text-gray-700 hover:text-purple-600 font-medium transition-colors">Clínicas</a>
                        <a href="#/emergencias" class="text-red-500 hover:text-red-600 font-medium transition-colors">Emergencias</a>
                        <a href="#/tips" class="text-gray-700 hover:text-purple-600 font-medium transition-colors">Tips de Salud</a>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="hidden lg:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            <input type="text" placeholder="Buscar especialista..." class="bg-transparent border-none outline-none text-sm w-40 search-input-min">
                        </div>
                        <button id="btn-ingresar" class="btn-primary font-semibold px-6 py-2 rounded-full">Ingresar</button>
                    </div>
                </div>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div class="grid lg:grid-cols-2 gap-12 items-center hero-section">
                <div class="space-y-6">
                    <div class="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-xs font-semibold">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        CUIDADO PROFESIONAL GARANTIZADO
                    </div>

                    <h1 class="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                        Encuentra el mejor <span class="text-purple-400">cuidado</span> para tu mascota
                    </h1>

                    <p class="text-gray-600 text-lg">
                        Conectamos a dueños de mascotas con las clínicas veterinarias más calificadas y especialistas de confianza. Tu mejor amigo merece una atención excepcional.
                    </p>

                    <div class="flex items-center gap-3 bg-white rounded-3xl shadow-custom p-2">
                        <div class="flex items-center gap-2 px-4 flex-1">
                            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <input type="text" id="searchInput" placeholder="Ciudad o código postal" class="flex-1 border-none outline-none py-3">
                        </div>
                        <button id="btn-search" class="btn-primary font-semibold px-8 py-3 rounded-2xl flex items-center gap-2">
                            Buscar
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="flex -space-x-2">
                            <div class="w-10 h-10 rounded-full border-2 border-white avatar-gradient-1"></div>
                            <div class="w-10 h-10 rounded-full border-2 border-white avatar-gradient-2"></div>
                            <div class="w-10 h-10 rounded-full border-2 border-white avatar-gradient-3"></div>
                        </div>
                        <span class="text-sm text-gray-600 font-medium">+2k mascotas atendidas este mes</span>
                    </div>
                </div>

                <div class="relative">
                    <div class="rounded-3xl shadow-2xl overflow-hidden relative">
                        <img src="./frontend/assets/images/lllll.jpg" alt="Veterinaria profesional atendiendo mascota" class="w-full h-96 object-cover">

                        <div class="absolute top-8 right-8 bg-sky-100 rounded-2xl p-4 shadow-card max-w-xs">
                            <div class="flex items-start gap-3">
                                <div class="w-10 h-10 bg-sky-400 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-gray-800 text-sm">Cuidado Experto</p>
                                    <p class="text-xs text-gray-600">Más de 500 clínicas verificadas</p>
                                </div>
                            </div>
                        </div>

                        <div class="absolute bottom-8 left-8 bg-rose-100 rounded-2xl p-4 shadow-card max-w-xs">
                            <div class="flex gap-1 mb-2">
                                <svg class="star-icon" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="star-icon" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="star-icon" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="star-icon" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <svg class="star-icon" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <span class="ml-1 text-sm font-bold text-gray-800">4.9/5</span>
                            </div>
                            <p class="text-xs text-gray-700">"El mejor servicio para mi gato Luna"</p>
                        </div>
                    </div>
                </div>
            </div>

            <section class="mt-24">
                <div class="flex items-start justify-between mb-8">
                    <div>
                        <h2 class="text-4xl font-bold text-gray-800 mb-2">Clínicas Destacadas</h2>
                        <p class="text-gray-600">Seleccionamos cuidadosamente las clínicas con mejores valoraciones y<br>servicios especializados para la tranquilidad de tu familia.</p>
                    </div>
                    <a href="#/clinicas" class="text-purple-400 hover:text-purple-500 font-medium flex items-center gap-1">
                        Ver todas las clínicas
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>

                <div id="clinicCards" class="grid md:grid-cols-3 gap-6">
                    <div class="col-span-3 text-center py-12 text-gray-400">Cargando clínicas...</div>
                </div>
            </section>

            <section class="mt-24">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">¿Por qué elegir VetCare?</h2>
                    <p class="text-gray-500 max-w-2xl mx-auto">Diseñamos una experiencia sin estrés para que encontrar la mejor atención médica sea tan fácil como dar un paseo en el parque</p>
                </div>

                <div class="grid md:grid-cols-3 gap-8 mb-16">
                    <div class="bg-white rounded-3xl shadow-sm p-8 text-center">
                        <div class="w-16 h-16 bg-purple-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                            <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-3">Veterinarios Verificados</h3>
                        <p class="text-gray-500 text-sm">Cada especialista y clínica en nuestra red pasa por un riguroso proceso de validación de licencias y certificaciones</p>
                    </div>

                    <div class="bg-white rounded-3xl shadow-sm p-8 text-center">
                        <div class="w-16 h-16 bg-pink-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                            <svg class="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-3">Agenda al Instante</h3>
                        <p class="text-gray-500 text-sm">Olvídate de las llamadas eternas. Reserva tu cita directamente desde nuestra plataforma en segundos, 24/7</p>
                    </div>

                    <div class="bg-white rounded-3xl shadow-sm p-8 text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                            <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-800 mb-3">Soporte Continuo</h3>
                        <p class="text-gray-500 text-sm">Nuestro equipo está disponible para ayudarte a encontrar especialistas o resolver dudas sobre tu reserva en cualquier momento</p>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-purple-200 to-purple-300 rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
                    <div class="relative z-10 text-center max-w-3xl mx-auto">
                        <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">¿Listo para darle a tu mascota<br>el cuidado que merece?</h2>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onclick="window.location.hash='#/register'" class="bg-gray-800 text-white px-8 py-4 rounded-2xl font-medium hover:bg-gray-700 transition">Empieza hoy gratis</button>
                            <button class="bg-white text-gray-800 px-8 py-4 rounded-2xl font-medium hover:bg-gray-50 transition">Soy una clínica</button>
                        </div>
                    </div>
                    <div class="absolute right-12 top-1/2 -translate-y-1/2 opacity-20 hidden md:block">
                        <svg class="w-48 h-48 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                </div>
            </section>
        </main>

        <footer class="bg-gray-950 text-white pt-16 pb-8 footer-spacing">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center overflow-hidden">
                                <img src="./frontend/assets/images/lllll.jpg" alt="VetCare Logo" class="w-full h-full object-cover">
                            </div>
                            <span class="text-xl font-bold">VetCare</span>
                        </div>
                        <p class="text-gray-300 text-sm mb-6 footer-desc">
                            La plataforma líder en búsqueda y gestión de salud para mascotas en Latinoamérica. Tu mascota, nuestra prioridad.
                        </p>
                        <div class="flex gap-3">
                            <a href="#twitter" class="w-10 h-10 bg-gray-900 hover:bg-purple-400 rounded-full flex items-center justify-center transition" aria-label="Twitter">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#instagram" class="w-10 h-10 bg-gray-900 hover:bg-purple-400 rounded-full flex items-center justify-center transition" aria-label="Instagram">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 class="font-bold text-lg mb-4">Plataforma</h3>
                        <ul class="space-y-3">
                            <li><a href="#/clinicas" class="footer-link text-gray-300 text-sm">Encontrar Clínicas</a></li>
                            <li><a href="#/emergencias" class="footer-link text-gray-300 text-sm">Servicios 24h</a></li>
                            <li><a href="#/especialistas" class="footer-link text-gray-300 text-sm">Especialistas</a></li>
                            <li><a href="#/tips" class="footer-link text-gray-300 text-sm">Blog de Salud</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-bold text-lg mb-4">Compañía</h3>
                        <ul class="space-y-3">
                            <li><a href="#/nosotros" class="footer-link text-gray-300 text-sm">Sobre Nosotros</a></li>
                            <li><a href="#/trabajo" class="footer-link text-gray-300 text-sm">Trabaja con nosotros</a></li>
                            <li><a href="#/contacto" class="footer-link text-gray-300 text-sm">Contacto</a></li>
                            <li><a href="#/prensa" class="footer-link text-gray-300 text-sm">Prensa</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-bold text-lg mb-4">Suscríbete</h3>
                        <p class="text-gray-300 text-sm mb-4">Recibe consejos de salud semanales para tus mascotas.</p>
                        <form>
                            <input type="email" placeholder="tu@email.com" class="w-full px-4 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-sm mb-3">
                            <button type="submit" class="w-full bg-purple-400 hover:bg-purple-500 text-gray-900 font-semibold px-6 py-3 rounded-full transition">
                                Unirse
                            </button>
                        </form>
                    </div>
                </div>

                <div class="border-t border-white/10 pt-8">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p class="text-gray-400 text-sm">© 2026 VetCare. Todos los derechos reservados.</p>
                        <div class="flex gap-6">
                            <a href="#/terminos" class="footer-link text-gray-400 text-sm">Términos y Condiciones</a>
                            <a href="#/privacidad" class="footer-link text-gray-400 text-sm">Privacidad</a>
                            <a href="#/cookies" class="footer-link text-gray-400 text-sm">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <button id="btn-emergency-fab" class="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg z-40 emergency-fab" aria-label="Emergencias">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
        </button>

        <div id="modalsContainer"></div>
        </div>
    `;
}

export async function initLanding() {
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
                    <span class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Abierto ahora</span>
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
                    Ver detalles
                </button>
            </div>
        </div>
    `).join('');
}
