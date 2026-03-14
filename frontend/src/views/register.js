export function registerPage() {
    return `
    <section class="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-paws-purple/20 via-white to-paws-green/20">
        <div class="w-full max-w-2xl bg-white rounded-3xl shadow-medium p-8 lg:p-10 animate-fade-in">

            <!-- Header -->
            <div class="text-center mb-8">
                <div class="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-paws-green to-paws-blue flex items-center justify-center mb-4 shadow-soft">
                    <svg class="w-8 h-8 text-text-highlight" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <h1 class="text-2xl font-poppins font-bold text-text-primary mb-2">Create your account</h1>
                <p class="text-text-soft text-sm">Join the PAWS community today</p>
            </div>

            <!-- Progress Steps -->
            <div class="flex justify-center items-center gap-4 mb-8">
                <div class="flex items-center gap-2" id="step-1-indicator">
                    <span class="w-8 h-8 rounded-full bg-paws-purple text-text-primary flex items-center justify-center text-sm font-semibold">1</span>
                    <span class="text-sm font-medium text-text-primary">Information</span>
                </div>
                <div class="w-12 h-0.5 bg-gray-200" id="step-connector"></div>
                <div class="flex items-center gap-2" id="step-2-indicator">
                    <span class="w-8 h-8 rounded-full bg-gray-200 text-text-muted flex items-center justify-center text-sm font-semibold">2</span>
                    <span class="text-sm text-text-muted">Account Type</span>
                </div>
            </div>

            <!-- Error/Success Message -->
            <div id="form-message" class="hidden rounded-xl p-4 mb-6 text-sm"></div>

            <!-- Registration Form -->
            <form id="register-form" class="space-y-6">
                
                <!-- Step 1: Basic Information -->
                <div id="step-1" class="space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label for="name" class="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                            <input 
                                id="name" 
                                type="text" 
                                placeholder="John Doe"
                                class="input"
                                required
                                autocomplete="name"
                            >
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="you@example.com"
                                class="input"
                                required
                                autocomplete="email"
                            >
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-text-primary mb-2">Password</label>
                            <div class="relative">
                                <input 
                                    id="password" 
                                    type="password" 
                                    placeholder="Min. 8 characters"
                                    class="input pr-12"
                                    required
                                    minlength="8"
                                    autocomplete="new-password"
                                >
                                <button type="button" id="toggle-password" class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition" aria-label="Toggle password visibility">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label for="confirmPassword" class="block text-sm font-medium text-text-primary mb-2">Confirm Password</label>
                            <div class="relative">
                                <input 
                                    id="confirmPassword" 
                                    type="password" 
                                    placeholder="Repeat your password"
                                    class="input pr-12"
                                    required
                                    autocomplete="new-password"
                                >
                                <button type="button" id="toggle-confirm-password" class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition" aria-label="Toggle password visibility">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Password Strength Indicator -->
                    <div class="space-y-2">
                        <div class="flex gap-1">
                            <div id="strength-1" class="h-1 flex-1 rounded-full bg-gray-200 transition-colors"></div>
                            <div id="strength-2" class="h-1 flex-1 rounded-full bg-gray-200 transition-colors"></div>
                            <div id="strength-3" class="h-1 flex-1 rounded-full bg-gray-200 transition-colors"></div>
                            <div id="strength-4" class="h-1 flex-1 rounded-full bg-gray-200 transition-colors"></div>
                        </div>
                        <p id="strength-text" class="text-xs text-text-muted"></p>
                    </div>
                </div>

                <!-- Divider -->
                <div class="border-t border-gray-200 pt-6">
                    <h2 class="text-center text-text-primary font-poppins font-semibold mb-6">How are you joining us?</h2>
                    
                    <!-- Account Type Selection -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label class="relative cursor-pointer group">
                            <input type="radio" name="role" value="owner" class="peer sr-only" required>
                            <div class="border-2 border-gray-200 rounded-2xl p-6 text-center transition-all duration-200 peer-checked:border-paws-green peer-checked:bg-paws-green/10 hover:border-paws-green/50 hover:shadow-soft">
                                <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-paws-pink/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <svg class="w-8 h-8 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                </div>
                                <h3 class="font-poppins font-semibold text-text-primary mb-2">Pet Owner</h3>
                                <p class="text-xs text-text-soft leading-relaxed">I'm looking for the best veterinary services for my pets</p>
                            </div>
                            <div class="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-paws-green peer-checked:bg-paws-green flex items-center justify-center">
                                <svg class="w-3 h-3 text-white hidden peer-checked:block" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </label>

                        <label class="relative cursor-pointer group">
                            <input type="radio" name="role" value="vet" class="peer sr-only">
                            <div class="border-2 border-gray-200 rounded-2xl p-6 text-center transition-all duration-200 peer-checked:border-paws-purple peer-checked:bg-paws-purple/10 hover:border-paws-purple/50 hover:shadow-soft">
                                <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-paws-blue/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <svg class="w-8 h-8 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                    </svg>
                                </div>
                                <h3 class="font-poppins font-semibold text-text-primary mb-2">Veterinary Clinic</h3>
                                <p class="text-xs text-text-soft leading-relaxed">I want to offer my services and reach more clients</p>
                            </div>
                            <div class="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-paws-purple peer-checked:bg-paws-purple flex items-center justify-center">
                                <svg class="w-3 h-3 text-white hidden peer-checked:block" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </label>
                    </div>
                </div>
<<<<<<< HEAD

                <!-- Terms Agreement -->
                <div class="flex items-start gap-3">
                    <input type="checkbox" id="terms" class="w-4 h-4 mt-1 rounded border-gray-300 text-paws-purple focus:ring-paws-purple" required>
                    <label for="terms" class="text-sm text-text-soft">
                        I agree to the <a href="#/terms" class="text-text-highlight hover:underline">Terms of Service</a> and <a href="#/privacy" class="text-text-highlight hover:underline">Privacy Policy</a>
                    </label>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn btn-primary w-full py-3 text-base">
                    Create Account
=======
                <button type="submit" class=" w-full mt-6 bg-purple cursor-pointer rounded-full py-3 text-white font-semibold hover:opacity-90 transition">
                    Sign Up →
>>>>>>> origin/develop
                </button>

                <!-- Divider -->
                <div class="divider">
                    <span>or sign up with</span>
                </div>

                <!-- Google Sign Up -->
                <button type="button" id="google-signup" class="btn-social">
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                <button type="submit" class=" w-full mt-6 bg-purple cursor-pointer rounded-full py-3 text-white font-semibold hover:opacity-90 transition">
                    Sign Up →
                </button>

                <!-- Sign In Link -->
                <p class="text-center text-sm text-text-soft">
                    Already have an account?
<<<<<<< HEAD
                    <a href="#/login" class="text-text-highlight font-semibold hover:underline ml-1">Sign In</a>
=======
                    <a href="#/login" class="text-pink font-semibold">Sign In</a>
>>>>>>> origin/develop
                    <a href="#/login" class="text-pink font-semibold">Sign In</a>
                </p>

                <!-- Footer -->
                <div class="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-text-muted">
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-paws-green" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span>Your data is protected</span>
                    </div>
                    <div class="flex gap-4">
                        <a href="#/terms" class="hover:text-text-primary transition">Terms</a>
                        <a href="#/privacy" class="hover:text-text-primary transition">Privacy</a>
                    </div>
                </div>
            </form>
        </div>
    </section>
    `;
}

export function registerEvents() {
    const registerForm = document.getElementById("register-form");
    const formMessage = document.getElementById("form-message");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

<<<<<<< HEAD
    // Password visibility toggles
    function setupPasswordToggle(toggleId, inputId) {
        const toggle = document.getElementById(toggleId);
        const input = document.getElementById(inputId);
        
        if (toggle && input) {
            toggle.addEventListener('click', () => {
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                
                const icon = toggle.querySelector('svg');
                if (type === 'text') {
                    icon.innerHTML = `
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    `;
                } else {
                    icon.innerHTML = `
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    `;
                }
=======
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
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role: role.value
                })
>>>>>>> origin/develop
            });
        }
    }

    setupPasswordToggle('toggle-password', 'password');
    setupPasswordToggle('toggle-confirm-password', 'confirmPassword');

    // Password strength indicator
    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        return strength;
    }

    function updatePasswordStrength(password) {
        const strength = checkPasswordStrength(password);
        const strengthBars = [
            document.getElementById('strength-1'),
            document.getElementById('strength-2'),
            document.getElementById('strength-3'),
            document.getElementById('strength-4')
        ];
        const strengthText = document.getElementById('strength-text');
        
        const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];
        const texts = ['Weak', 'Fair', 'Good', 'Strong'];
        
        strengthBars.forEach((bar, index) => {
            bar.className = 'h-1 flex-1 rounded-full transition-colors';
            if (index < strength) {
                bar.classList.add(colors[strength - 1]);
            } else {
                bar.classList.add('bg-gray-200');
            }
        });
        
        if (password.length > 0) {
            strengthText.textContent = `Password strength: ${texts[strength - 1] || 'Very weak'}`;
            strengthText.className = 'text-xs';
            strengthText.classList.add(strength <= 1 ? 'text-red-500' : strength === 2 ? 'text-orange-500' : strength === 3 ? 'text-yellow-600' : 'text-green-500');
        } else {
            strengthText.textContent = '';
        }
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            updatePasswordStrength(e.target.value);
        });
    }

    // Form message helper
    function showMessage(message, success) {
        formMessage.classList.remove("hidden", "bg-red-50", "text-red-700", "bg-green-50", "text-green-700", "border-red-200", "border-green-200");
        
        if (success) {
            formMessage.classList.add("bg-green-50", "text-green-700", "border", "border-green-200");
        } else {
            formMessage.classList.add("bg-red-50", "text-red-700", "border", "border-red-200");
        }
        
        formMessage.textContent = message;
    }

    // Form submission
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const role = document.querySelector("input[name='role']:checked");
            const terms = document.getElementById("terms").checked;

            // Validation
            if (!name || !email || !password || !confirmPassword) {
                showMessage("All fields are required", false);
                return;
            }

            if (!role) {
                showMessage("Please select an account type", false);
                return;
            }

            if (!terms) {
                showMessage("Please accept the Terms of Service", false);
                return;
            }

            if (password !== confirmPassword) {
                showMessage("Passwords do not match", false);
                return;
            }

            if (password.length < 8) {
                showMessage("Password must be at least 8 characters", false);
                return;
            }

            try {
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        role: role.value
                    })
                });
        try {
            const response = await fetch("http://localhost:3000/api/register", {
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
                    showMessage(data.message || data.error || "Registration failed", false);
                    return;
                }

                showMessage("Account created successfully! Redirecting...", true);

                setTimeout(() => {
                    window.location.hash = "#/login";
                }, 1500);

            } catch (error) {
                showMessage("Connection error. Please try again.", false);
            }
        });
    }

    // Google sign up handler
    const googleSignup = document.getElementById('google-signup');
    if (googleSignup) {
        googleSignup.addEventListener('click', () => {
            console.log('Google signup initiated');
            // In production: window.location.href = '/api/auth/google/signup';
        });
    }
}