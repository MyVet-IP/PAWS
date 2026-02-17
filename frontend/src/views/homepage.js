export function homepageView() {
    return `
        <section class="bg-gray-50">
            <!-- Navbar -->
            <nav class="bg-white shadow-sm sticky top-0 z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <!-- Logo -->
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                                <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
                                </svg>
                            </div>
                            <span class="text-lg font-semibold text-gray-900">PetCare</span>
                        </div>

                        <!-- Search Bar -->
                        <div class="hidden md:flex flex-1 max-w-md mx-8">
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                    </svg>
                                </div>
                                <input type="text" placeholder="Find services for your mascot..." class="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300">
                            </div>
                        </div>

                        <!-- Right Menu -->
                        <div class="flex items-center gap-6">
                            <a href="#" class="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900">Services</a>
                            <a href="#" class="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900">Community</a>
                            <button class="relative p-2 text-gray-400 hover:text-gray-600">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                </svg>
                            </button>
                            <div class="w-8 h-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div class="bg-gradient-to-br from-purple-50 via-purple-50 to-gray-100 rounded-3xl px-8 md:px-16 py-16 md:py-24 text-center">
                    <div class="max-w-3xl mx-auto">
                        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">Your pet's best life starts here</p>
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
                            Everything your pet needs
                        </h1>
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-300 mb-6">
                            in one place
                        </h1>
                        <p class="text-gray-600 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                            Connecting you with the best local veterinary, grooming, and care experts.<br>
                            Because they are more than just pets, they are family.
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button class="px-8 py-3 bg-purple-300 hover:bg-purple-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                                Get Started
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                            <button class="px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors border border-gray-200">
                                Browse Reviews
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Services Section -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div class="flex items-end justify-between mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">Our Services</h2>
                        <p class="text-gray-600">Explore professional care tailored for your companion</p>
                    </div>
                    <a href="#" class="hidden md:block text-purple-400 hover:text-purple-500 text-sm font-medium">View all categories →</a>
                </div>

                <!-- Services Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Service 1 -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Veterinarias cercanas</h3>
                        <p class="text-gray-600 text-sm">Find the top-rated clinics in your immediate neighborhood</p>
                    </div>

                    <!-- Service 2 -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Veterinarias a domicilio</h3>
                        <p class="text-gray-600 text-sm">Quality medical care delivered right to your front door</p>
                    </div>

                    <!-- Service 3 -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Pet shop</h3>
                        <p class="text-gray-600 text-sm">Premium supplies, food, and toys for every kind of companion</p>
                    </div>

                    <!-- Service 4 -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Refugios y adopciones</h3>
                        <p class="text-gray-600 text-sm">Find your new best friend and give them a forever home</p>
                    </div>

                    <!-- Service 5 -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Grooming / spa</h3>
                        <p class="text-gray-600 text-sm">Pamper your pet with professional cleaning and styling</p>
                    </div>

                    <!-- Service 6 -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Paseadores de perros</h3>
                        <p class="text-gray-600 text-sm">Trusted local walkers for your dog's daily exercise needs</p>
                    </div>

                    <!-- Service 7 -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Guarderías / hoteles</h3>
                        <p class="text-gray-600 text-sm">Safe and comfortable boarding while you're away</p>
                    </div>

                    <!-- Service 8 -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Entrenadores caninos</h3>
                        <p class="text-gray-600 text-sm">Expert behavior and trick training for all breeds</p>
                    </div>

                    <!-- Service 9 -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-red-100">
                        <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Servicios de emergencia 24/7</h3>
                        <p class="text-gray-600 text-sm">Immediate care for urgent situations at any time of day</p>
                    </div>
                </div>
            </section>

            <!-- Trust Section -->
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <!-- Left: Image -->
                    <div class="relative">
                        <div class="bg-gradient-to-br from-gray-100 to-purple-50 rounded-3xl p-8 md:p-12">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%239ca3af'%3E🐕 🐶%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%239ca3af'%3EHappy pets%3C/text%3E%3C/svg%3E" alt="Happy dogs" class="w-full rounded-2xl">
                            <div class="absolute bottom-12 left-12 bg-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
                                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-500 font-medium">VERIFIED PARTNERS</p>
                                    <p class="text-sm font-bold text-gray-900">500+ Experts</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Content -->
                    <div>
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Trust your companion with the best in your area
                        </h2>
                        <div class="space-y-4 mb-8">
                            <div class="flex gap-3">
                                <div class="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                                    <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <p class="text-gray-700">All service providers are background checked and verified.</p>
                            </div>
                            <div class="flex gap-3">
                                <div class="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                                    <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <p class="text-gray-700">Read real reviews from other pet parents in your community.</p>
                            </div>
                            <div class="flex gap-3">
                                <div class="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                                    <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <p class="text-gray-700">Secure online booking and 24/7 support messaging.</p>
                            </div>
                        </div>
                        <a href="#" class="inline-block text-purple-400 hover:text-purple-500 font-medium text-sm">
                            Learn about our vetting process →
                        </a>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="bg-white border-t border-gray-100 mt-20">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                        <!-- Logo & Description -->
                        <div class="lg:col-span-2">
                            <div class="flex items-center gap-2 mb-4">
                                <div class="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"/>
                                    </svg>
                                </div>
                                <span class="text-lg font-semibold text-gray-900">PetCare</span>
                            </div>
                            <p class="text-sm text-gray-600 max-w-xs">Making pet ownership easier and more joyful through technology and community-driven care.</p>
                            <div class="flex gap-3 mt-4">
                                <a href="#" class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="#" class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <!-- Services -->
                        <div>
                            <h3 class="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Services</h3>
                            <ul class="space-y-3 text-sm">
                                <li><a href="#" class="text-gray-600 hover:text-purple-600">Veterinary</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-purple-600">Grooming</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-purple-600">Dog Walkers</a></li>
                            </ul>
                        </div>

                        <!-- Company -->
                        <div>
                            <h3 class="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Company</h3>
                            <ul class="space-y-3 text-sm">
                                <li><a href="#" class="text-gray-600 hover:text-purple-600">About Us</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-purple-600">Contact</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-purple-600">Careers</a></li>
                            </ul>
                        </div>

                        <!-- Support -->
                        <div>
                            <h3 class="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Support</h3>
                            <ul class="space-y-3 text-sm">
                                <li><a href="#" class="text-gray-600 hover:text-purple-600">Help Center</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-purple-600">Privacy</a></li>
                                <li><a href="#" class="text-gray-600 hover:text-purple-600">Terms</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Bottom Bar -->
                    <div class="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p class="text-sm text-gray-500">© 2024 PetCare Platform. All rights reserved.</p>
                        <div class="flex items-center gap-2 text-sm text-gray-600">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                            </svg>
                            <span>English (US)</span>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    `
}