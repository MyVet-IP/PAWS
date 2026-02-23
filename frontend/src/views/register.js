export function registerPage() {
    return `
    <section class="min-h-screen bg-gradient-to-br from-purple/20 to-blue/20 flex items-center justify-center">
        <main class="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8">

            <!-- header -->
            <div class="text-center mb-6">
                <div class="mx-auto w-14 h-14 rounded-full bg-green-light flex items-center justify-center mb-3">
                    <span class="text-xs">(--logo--)</span>
                </div>
                <h1 class="text-2xl font-bold">Create your account</h1>
                <p class="text-sm text-gray">Join the MedellinVet community</p>
            </div>

            <!-- Steps -->
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

            <form id="register-form" class="space-y-4">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-gray text-sm">Full Name</label>
                        <input id="name" type="text" placeholder="e.g. Mariana Lopez"
                        class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2">
                    </div>

                    <div>
                        <label class=" text-sm">Email</label>
                        <input id="email" type="email" placeholder="example@gmail.com"
                        class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2">
                    </div>

                    <div>
                        <label class=" text-sm">Password</label>
                        <input id="password" type="password" placeholder="********"
                        class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2">
                    </div>

                    <div>
                        <label class=" text-sm">Confirm Password</label>
                        <input id="confirmPassword" type="password" placeholder="********"
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

                <div
                    class="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray/70">
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
        `;
}

export function registerEvents() {

    const registerForm = document.getElementById("register-form");
    const registerMessage = document.getElementById("form-message");

    if (!registerForm) return;

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const role = document.querySelector("input[name='role']:checked");

        if (!name || !email || !password || !confirmPassword || !role) {
            showMessage(registerMessage, "Todos los campos son obligatorios", false);
            return;
        }

        if (password !== confirmPassword) {
            showMessage(registerMessage, "Las contraseñas no coinciden", false);
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role: role.value
                })
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage(registerMessage, data.message, false);
                return;
            }

            showMessage(registerMessage, "Registro exitoso ✔", true);

            setTimeout(() => {
                window.location.hash = "#/login";
            }, 1000);

        } catch (error) {
            showMessage(registerMessage, "Error conectando con el servidor", false);
        }
    });
}

function showMessage(element, message, success) {
    element.classList.remove("hidden");
    element.classList.remove("bg-red-100", "text-red-700", "bg-green-100", "text-green-700");

    if (success) {
        element.classList.add("bg-green-100", "text-green-700");
    } else {
        element.classList.add("bg-red-100", "text-red-700");
    }

    element.textContent = message;
}