let loginType = "user"; // user o business

export function loginPage() {
    return `
    <section class="min-h-screen bg-pink font-sans">
        <main class="flex min-h-screen">

            <!-- LEFT -->
            <section class="hidden md:flex w-2/3 bg-green-light items-center justify-center">
                <div class="text-center max-w-sm">
                    <div class="bg-gradient-to-b from-teal-700 to-teal-900 p-6 rounded-3xl shadow-lg ">
                        <div class="3modelcontainer"></div>
                    </div>
                    <h2 class="mt-6 text-xl font-semibold text-blue">We care for what you love</h2>
                    <p class="mt-2 text-sm text-gray">
                        connecting pet owners in Medellin with the best veterinary professionals
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

                    <!-- SELECTOR DE LOGIN -->
                    <div class="flex gap-2 mb-6">
                        <button id="btn-user" class="flex-1 py-2 rounded-full bg-pink border text-white text-sm">
                            User
                        </button>
                        <button id="btn-business" class="flex-1 py-2 rounded-full border text-sm">
                            Business
                        </button>
                    </div>

                    <h1 id="login-title" class="text-2xl font-bold mb-1">
                        User Login
                    </h1>

                    <p class="text-sm text-gray mb-6">
                        Enter your credentials to access your account
                    </p>

                    <p id="login-error" class="text-red-500 text-sm mb-2"></p>

                    <form id="login-form" class="space-y-4">

                        <div>
                            <label class="text-sm">Email</label>

                            <input
                            id="login-email"
                            type="email"
                            placeholder="mail@example.com"
                            class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-1"
                            required>
                        </div>

                        <div>
                            <label class="text-sm">Password</label>

                            <input
                            id="login-password"
                            type="password"
                            placeholder="********"
                            class="mt-1 w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-1"
                            required>
                        </div>

                        <button
                        type="submit"
                        class="w-full py-2 rounded-full bg-pink text-white font-semibold hover:opacity-90 transition">

                            Sign In

                        </button>

                        <div class="text-center text-xs text-gray">
                            Or continue with
                        </div>

                        <div class="flex gap-3">
                            <button 
                            onclick="window.location.href='http://localhost:3000/auth/google'"
                            type="button"
                            class="flex-1 border rounded-full py-2">

                                Google

                            </button>
                        </div>

                        <p class="text-center text-sm mt-4">
                            Don't have an account?
                            <a href="#/register" class="text-pink font-semibold">
                                Sign Up
                            </a>
                        </p>

                    </form>

                </div>
            </section>

        </main>
    </section>
    `;
}

export function loginEvents() {

    const form = document.getElementById('login-form');
    const btnUser = document.getElementById('btn-user');
    const btnBusiness = document.getElementById('btn-business');
    const title = document.getElementById('login-title');

    if (!form) return;

    // CAMBIO DE LOGIN
    btnUser.onclick = () => {
        loginType = "user";
        title.textContent = "User Login";

        btnUser.classList.add("bg-pink","text-white");
        btnBusiness.classList.remove("bg-pink","text-white");
    };

    btnBusiness.onclick = () => {
        loginType = "business";
        title.textContent = "Business Login";

        btnBusiness.classList.add("bg-pink","text-white");
        btnUser.classList.remove("bg-pink","text-white");
    };

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const errBox = document.getElementById('login-error');

        errBox.textContent = '';

        if (!email || !password) {
            errBox.textContent = "Email and password are required";
            return;
        }

        try {

            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role: loginType })
            });

            const data = await res.json();

            if (!res.ok) {
                errBox.textContent = data.error || "Invalid credentials";
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify(data));

            if (data.role === "business") {
                window.location.hash = "#/veterinary";
            } else {
                window.location.hash = "#/user-dashboard";
            }

        } catch (error) {

            errBox.textContent = "Connection error. Please try again.";

        }

    });

}

