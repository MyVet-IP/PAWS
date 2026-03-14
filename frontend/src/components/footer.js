export function Footer() {
  return `
    <footer class="bg-[#F5F7F6] border-t border-gray-200 mt-12">

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <!-- 🐾 Logo / Nombre -->
          <div class="flex items-center gap-3">

            <div class="w-9 h-9 bg-green-200 rounded-full flex items-center justify-center text-green-800 text-lg">
              🐾
            </div>

            <span class="font-semibold text-lg text-gray-800 tracking-wide">
              PAWS
            </span>

          </div>


          <!-- 🔗 Links -->
          <nav class="flex flex-wrap justify-center gap-6 text-sm text-gray-600">

            <a href="/#/" class="hover:text-green-600 transition">
              Home
            </a>

            <a href="/#/clinics" class="hover:text-green-600 transition">
              Clinics
            </a>

            <a href="/#/emergency" class="hover:text-red-500 transition">
              Emergency
            </a>

            <a href="/#/about" class="hover:text-purple-600 transition">
              About Us
            </a>

          </nav>


          <!-- © Derechos -->
          <p class="text-xs text-gray-400 text-center md:text-right">
            &copy; ${new Date().getFullYear()} PAWS. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  `;
}