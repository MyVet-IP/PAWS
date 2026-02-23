// frontend/src/views/vet-dashboard.js

export function vetDashboardPage() {
  return `
  <section class="flex min-h-screen bg-gray-100">

    <!-- SIDEBAR -->
    <aside class="w-64 bg-white shadow-sm px-6 py-8 flex flex-col justify-between">

      <div>
        <div class="flex items-center gap-3 mb-10">
          <div class="w-10 h-10 rounded-xl bg-lavender flex items-center justify-center text-white font-bold">
            🐾
          </div>
          <h2 class="text-xl font-bold text-gray-800">
            San Juan Pet
          </h2>
        </div>

        <nav class="flex flex-col gap-3 text-gray-600">

          <a class="flex items-center gap-3 p-3 rounded-xl bg-lavender/20 text-gray-800 font-medium">
            📊 Dashboard
          </a>

          <a class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            🐶 Pacientes
          </a>

          <a class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            📅 Citas
          </a>

          <a class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            🏥 Mi Clínica
          </a>

          <a class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
            ⚙️ Configuración
          </a>

        </nav>
      </div>

      <button class="bg-lavender text-white py-3 rounded-xl font-semibold shadow hover:scale-105 transition">
        Cerrar Sesión
      </button>

    </aside>

    <!-- MAIN -->
    <main class="flex-1 p-8 flex gap-8">

      <!-- CENTER CONTENT -->
      <div class="flex-1">

        <!-- TOP BANNER -->
        <div class="relative rounded-3xl overflow-hidden shadow-sm mb-8">
          <img 
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee"
            class="w-full h-48 object-cover blur-[2px] brightness-90"
          />

          <div class="absolute inset-0 flex items-center justify-between px-8">
            <h1 class="text-3xl font-bold text-white">
              Mi Clínica
            </h1>

            <button class="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold shadow">
              Editar Información
            </button>
          </div>
        </div>

        <!-- GENERAL INFO (FULL WIDTH) -->
        <div class="bg-white p-8 rounded-3xl shadow-sm mb-8">
        <h3 class="text-xl font-bold text-gray-800 mb-3">
            Información General
        </h3>

        <p class="text-gray-600 leading-relaxed max-w-3xl">
            En San Juan Pet brindamos atención integral para mascotas con tecnología
            moderna, personal especializado y un enfoque centrado en el bienestar
            animal. Nuestro compromiso es ofrecer diagnósticos precisos y un servicio
            cercano para cada paciente.
        </p>
        </div>

        <div class="bg-white p-8 rounded-3xl shadow-sm mb-8">
            <!-- NUESTROS SERVICIOS (FULL WIDTH COMO INFORMACIÓN GENERAL) -->
            <section class="bg-white rounded-3xl shadow-sm p-8 mb-8">

            <!-- Título -->
            <h3 class="text-xl font-bold text-gray-800 mb-6">
                Nuestros Servicios
            </h3>

            <!-- Grid de servicios -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">

                <!-- Servicio -->
                <div class="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition">
                <div class="text-4xl mb-3">💉</div>
                <p class="text-sm font-semibold text-gray-700">Vacunación</p>
                </div>

                <!-- Servicio -->
                <div class="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition">
                <div class="text-4xl mb-3">🩺</div>
                <p class="text-sm font-semibold text-gray-700">Consulta</p>
                </div>

                <!-- Servicio -->
                <div class="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition">
                <div class="text-4xl mb-3">🩻</div>
                <p class="text-sm font-semibold text-gray-700">Rayos X</p>
                </div>

                <!-- Servicio -->
                <div class="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition">
                <div class="text-4xl mb-3">🔬</div>
                <p class="text-sm font-semibold text-gray-700">Laboratorio</p>
                </div>

                <!-- Puedes agregar más -->
                <div class="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition">
                <div class="text-4xl mb-3">🏥</div>
                <p class="text-sm font-semibold text-gray-700">Cirugía</p>
                </div>

                <div class="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition">
                <div class="text-4xl mb-3">🧴</div>
                <p class="text-sm font-semibold text-gray-700">Desparasitación</p>
                </div>

            </div>

            </section>

        </div>

        <!-- LOWER CARDS -->
        <div class="grid grid-cols-2 gap-6 mb-8">

        <!-- INFO CARDS -->

          <div class="bg-white p-6 rounded-2xl shadow-sm">
            
          </div>

        </div>

      </div>

      <!-- RIGHT PANEL -->
      <aside class="w-80 flex flex-col gap-6">

        <!-- STATS -->
        <div class="bg-white p-6 rounded-2xl shadow-sm">
          <div class="bg-white rounded-3xl shadow-sm p-8 w-full max-w-md">

        <!-- Header -->
        <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-lavender/20 text-lavender rounded-full flex items-center justify-center text-lg">
            ⏰
            </div>
            <h3 class="text-lg font-bold text-gray-800">
            Horarios
            </h3>
        </div>

        <!-- Schedule List -->
        <div class="space-y-4 text-sm">

            <div class="flex justify-between items-center">
            <span class="text-gray-800">
                Lunes
            </span>
            <span class="text-gray-400 font-medium">
                09:00 - 20:00
            </span>
            </div>
            <div class="flex justify-between items-center">
            <span class="text-gray-800">
                Martes
            </span>
            <span class="text-gray-400 font-medium">
                10:00 - 14:00
            </span>
            </div>
            <div class="flex justify-between items-center">
            <span class="text-gray-800">
                Miercoles
            </span>
            <span class="text-gray-400 font-medium">
                10:00 - 14:00
            </span>
            </div>
            <div class="flex justify-between items-center">
            <span class="text-gray-800">
                Jueves
            </span>
            <span class="text-gray-400 font-medium">
                10:00 - 14:00
            </span>
            </div>
            <div class="flex justify-between items-center">
            <span class="text-gray-800">
                Viernes
            </span>
            <span class="text-gray-400 font-medium">
                10:00 - 14:00
            </span>
            </div>
            <div class="flex justify-between items-center">
            <span class="text-gray-800">
                Sábado
            </span>
            <span class="text-gray-400 font-medium">
                10:00 - 14:00
            </span>
            </div>
            <div class="flex justify-between items-center">
            <span class="text-gray-800">
                Domingo
            </span>
            <span class="text-gray-400 font-medium">
                10:00 - 14:00
            </span>
            </div>
        </div>

        </div>

        </div>

        <!-- TEAM -->
        <div class="bg-white p-6 rounded-2xl shadow-sm">
          <h3 class="font-semibold text-gray-700 mb-4">
            Nuestro Equipo
          </h3>

          <div class="space-y-3">

            <div class="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" class="w-10 h-10 rounded-full"/>
              <span class="text-gray-700">Dr. Carlos Cardona</span>
            </div>

            <div class="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" class="w-10 h-10 rounded-full"/>
              <span class="text-gray-700">Dra. Ana Ruiz</span>
            </div>

          </div>
        </div>

        <!-- MAP -->
        <div class="bg-white p-4 rounded-2xl shadow-sm">
          <h3 class="font-semibold text-gray-700 mb-3">
            Ubicación
          </h3>
          <img 
            src="https://maps.googleapis.com/maps/api/staticmap?center=Medellin&zoom=13&size=300x150&maptype=roadmap"
            class="w-full rounded-xl"
          />
        </div>

      </aside>

    </main>
  </section>
  `;
}