export function loadLoginPage() {
    return `
    <section class="min-h-screen bg-pink font-sans">
        <main class="flex min-h-screen">

            <!-- LEFT -->
            <section class="hidden md:flex w-2/3 bg-green-light items-center justify-center">
                <div class="text-center max-w-sm">
                    <div class="bg-gradient-to-b from-teal-700 to-teal-900 p-6 rounded-3xl shadow-lg ">
                        <div class="3modelcontainer"></div>
                    </div>
                    <h2 class="mt-6 text-xl font-semibold text-blue">Cuidamos lo que amas</h2>
                    <p class="mt-2 text-sm text-gray">
                        conectando a los duenos de mascotas en medellin con los mejores profesionales veterinarios
                    </p>
                </div>
            </section>

            <!-- RIGHT -->
            <section class="w-full md:w-1/2 bg-white flex items-center justify-center">
                <div class="w-full max-w-md px-8">

                    <div class="flex items-center gap-2 mb-6">
                        <span class="px-3 py-1 rounded-full bg-blue-light text-blue text-xs">
                            medical_services
                        </span>
                        <span class="font-semibold text-purple">MedellinVet</span>
                    </div>

                    <h1 class="text-2xl font-bold mb-1">¡Hola de nuevo!</h1>
                    <p class="text-sm text-gray mb-6">
                        Ingresa tus credenciales para acceder a tu cuenta
                    </p>

                    <form id="login-form" class="space-y-4">
                        <div>
                            <label class="text-sm ">Correo electronico</label>
                            <input id="email" type="email" placeholder="mail@ejemplo.com"
                                class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-1">
                        </div>

                        <div>
                            <label class="text-sm ">Contrasena</label>
                            <input id="password" type="password" placeholder="********"
                                class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-1">
                        </div>

                        <div class="flex justify-between items-center text-sm">
                            <label class="flex-items-center gap-2">
                                <input type="checkbox" id="rememberMe">
                                Recordarme
                            </label>
                            <a href="#" class="text-pink hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <div id="form-message" class="hidden mt-3 p-3 rounded text-sm"></div>

                        <button
                            class="w-full py-2 rounded-full bg-pink text-white font-semibold hover:opacity-90 transition">
                            Iniciar Sesion
                        </button>

                        <div class="text-center text-xs text-gray">O continua con</div>

                        <a href="http://localhost:4000/auth/google" class="flex gap-3">
                            <button type="button" class="flex-1 border rounded-full py-2">
                                Google
                            </button>
                        </a>

                        <p class="text-center text-sm mt-4">
                            ¿No tienes cuenta?
                            <a href="#" id="register-link" class="text-pink font-semibold">
                                Registrarse
                            </a>
                        </p>

                        <div class="mt-6 text-xs text-center text-gray">
                            MedellinVet | privacidad | terminos | soporte
                        </div>
                    </form>

                </div>
            </section>
        </main>
    </section>
    `;
}

export function loginEvents() {

    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("form-message");

    if (!loginForm) return;

    const registerLink = document.querySelector("#register-link");

    if (registerLink) {
        registerLink.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.hash = "#/register";
        });
    }

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const rememberMe = document.getElementById("rememberMe").checked;

        if (!email || !password) {
            showMessage(loginMessage, "Todos los campos son obligatorios", false);
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage(loginMessage, data.message, false);
                return;
            }

            if (rememberMe) {
                localStorage.setItem("user", JSON.stringify(data));
            } else {
                sessionStorage.setItem("user", JSON.stringify(data));
            }

            showMessage(loginMessage, "Login exitoso ✔", true);

            setTimeout(() => {
                if (data.role === "vet") {
                    window.location.hash = "#/pet-profile";
                } else {
                    window.location.hash = "#/user-dashboard";
                }
            }, 1000);

        } catch (error) {
            showMessage(loginMessage, "Error conectando con el servidor", false);
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
