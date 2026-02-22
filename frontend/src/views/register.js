export function loadRegisterPage() {
    return `
    <section class="min-h-screen bg-gradient-to-br from-purple/20 to-blue/20 flex items-center justify-center">
        <main class="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8">
            <!--header-->
            <div class="text-center mb-6">
                <div class="mx-auto w-14 h-14 rounded-full bg-green-light flex items-center justify-center mb-3">
                    <span class="text-xs">(--logo--)</span>
                </div>
                <h1 class="text-2xl font-bold">Create your account</h1>
                <p class="text-sm text-gray">Join the MedellinVet community</p>
            </div>
            <!--Steps-->
            <div class="flex justify-center items-center gap-6 mb-6 text-sm">
                <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-pink text-white flex items-center justify-center text-xs">1</span>
                    Information
                </div>
                <div class="flex items-center gap-2 text-gray-500">
                    <span class="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs">2</span>
                    Profile Type
                </div>
            </div>
            <form class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-gray text-sm">Full Name</label>
                        <input type="text" placeholder="e.g. Mariana Lopez"
                        class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2">
                    </div>
                    <div>
                        <label class=" text-sm">Email</label>
                        <input type="email" placeholder="example@gmail.com"
                        class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2">
                    </div>
                    <div>
                        <label class=" text-sm">Password</label>
                        <input type="password" placeholder="********"
                        class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2">
                    </div>
                    <div>
                        <label class=" text-sm">Confirm Password</label>
                        <input type="password" placeholder="********"
                        class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2">
                    </div>
                </div>
                <hr class="my-6 border-gray-300 ">
                <h2 class="text-center text-gray-700 font-semibold mb-1">How are you joining us?</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div class="border-2 border-pink rounded-2xl p-4 text-center cursor-pointer hover:shadow">
                        <div class="text-2xl mb-2">(dog icon)</div>
                        <h3 class="font-semibold">I'm a Pet Owner</h3>
                        <p class="text-xs text-gray mt-3">I'm looking for the best services for my pet</p>
                    </div>
                    <div class="border-2 border-pink rounded-2xl p-4 text-center cursor-pointer hover:shadow">
                        <div class="text-2xl mb-2">(vet icon)</div>
                        <h3 class="font-semibold">Veterinary Clinic</h3>
                        <p class="text-xs text-gray mt-3">I want to offer my services and clinics</p>
                    </div>
                </div>
                <button class=" w-full mt-6 bg-purple cursor-pointer rounded-full py-3 text-white font-semibold hover:opacity-90 transition">
                    Sign Up →
                </button>
                <p class="text-center text-sm mt-4">
                    Already have an account?
                    <a href="../views/login.html" class="text-pink font-semibold">Sign In</a>
                </p>
                <div class="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray/70">
                    <div class="flex items-center gap-1">
                        <span class="material-icons text-sm">verified_user</span>
                        <span>Your data is protected</span>
                    </div>
                    <div class="flex gap-4">
                        <a href="#">Terms</a>
                        <a href="#">Privacy</a>
                    </div>
                </div>
            </form>
        </main>
    </section>
    `}