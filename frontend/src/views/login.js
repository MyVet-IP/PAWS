export function loginPage() {
    return `
    <section class="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-paws-yellow/30 via-white to-paws-purple/20">
        <div class="w-full max-w-5xl grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-medium overflow-hidden animate-fade-in">
            
            <!-- Left Side - Branding Panel -->
            <div class="hidden lg:flex flex-col justify-between bg-gradient-to-br from-paws-green to-paws-blue p-10 relative overflow-hidden">
                <!-- Decorative Elements -->
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                
                <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-8">
                        <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-soft">
                            <svg class="w-7 h-7 text-text-highlight" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        </div>
                        <span class="text-2xl font-poppins font-bold text-text-primary">PAWS</span>
                    </div>
                    
                    <h2 class="text-3xl font-poppins font-bold text-text-primary mb-4 text-balance">
                        We care for what you love
                    </h2>
                    <p class="text-text-soft text-base leading-relaxed">
                        Connecting pet owners in Medellin with the best veterinary professionals. 
                        Your best friend deserves exceptional care.
                    </p>
                </div>
                
                <div class="relative z-10 space-y-6">
                    <!-- Trust Indicators -->
                    <div class="flex items-center gap-4">
                        <div class="flex -space-x-2">
                            <div class="w-10 h-10 rounded-full bg-paws-pink border-2 border-white flex items-center justify-center text-xs font-medium">JL</div>
                            <div class="w-10 h-10 rounded-full bg-paws-purple border-2 border-white flex items-center justify-center text-xs font-medium">MA</div>
                            <div class="w-10 h-10 rounded-full bg-paws-blue border-2 border-white flex items-center justify-center text-xs font-medium">SC</div>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-text-primary">+2,000 happy pet owners</p>
                            <p class="text-xs text-text-soft">Joined this month</p>
                        </div>
                    </div>
                    
                    <!-- Testimonial Card -->
                    <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-soft">
                        <div class="flex items-center gap-1 mb-2">
                            ${Array(5).fill('<svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>').join('')}
                        </div>
                        <p class="text-sm text-text-soft italic">"The best platform for finding veterinary care. Luna loves her new vet!"</p>
                        <p class="text-xs text-text-highlight font-medium mt-2">- Maria G., Pet Owner</p>
                    </div>
                </div>
            </div>

            <!-- Right Side - Login Forms -->
            <div class="p-8 lg:p-10">
                <!-- Mobile Logo -->
                <div class="lg:hidden flex items-center justify-center gap-2 mb-8">
                    <div class="w-10 h-10 bg-paws-green rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-text-highlight" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                    <span class="text-xl font-poppins font-bold text-text-primary">PAWS</span>
                </div>

                <div class="text-center mb-8">
                    <h1 class="text-2xl font-poppins font-bold text-text-primary mb-2">Welcome back!</h1>
                    <p class="text-text-soft text-sm">Sign in to continue to your account</p>
                </div>

                <!-- Tab Switcher -->
                <div class="tab-container mb-8">
                    <button type="button" id="tab-user" class="tab-btn active" data-tab="user">
                        <span class="flex items-center justify-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            Pet Owner
                        </span>
                    </button>
                    <button type="button" id="tab-enterprise" class="tab-btn" data-tab="enterprise">
                        <span class="flex items-center justify-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                            </svg>
                            Veterinary Clinic
                        </span>
                    </button>
                </div>

                <!-- Error Message Area -->
                <p id="login-error" class="text-red-500 text-sm mb-4 text-center hidden"></p>

                <!-- User Login Form -->
                <form id="login-form-user" class="space-y-5">
                    <div>
                        <label for="login-email-user" class="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                        <input 
                            id="login-email-user" 
                            type="email" 
                            placeholder="you@example.com" 
                            class="input"
                            required
                            autocomplete="email"
                        >
                    </div>

                    <div>
                        <label for="login-password-user" class="block text-sm font-medium text-text-primary mb-2">Password</label>
                        <div class="relative">
                            <input 
                                id="login-password-user" 
                                type="password" 
                                placeholder="Enter your password" 
                                class="input pr-12"
                                required
                                autocomplete="current-password"
                            >
                            <button type="button" id="toggle-password-user" class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition" aria-label="Toggle password visibility">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-paws-purple focus:ring-paws-purple">
                            <span class="text-sm text-text-soft">Remember me</span>
                        </label>
                        <a href="/#/forgot-password" class="text-sm text-text-highlight hover:underline font-medium">
                            Forgot password?
                        </a>
                    </div>

                    <button type="submit" class="btn btn-primary w-full py-3">
                        Sign In
                    </button>

                    <div class="divider">
                        <span>or continue with</span>
                    </div>

                    <button type="button" id="google-login-user" class="btn-social">
                        <svg class="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                    </button>
                </form>

                <!-- Enterprise Login Form (Hidden by default) -->
                <form id="login-form-enterprise" class="space-y-5 hidden">
                    <div class="bg-paws-yellow/50 rounded-xl p-4 mb-2">
                        <p class="text-sm text-text-soft flex items-center gap-2">
                            <svg class="w-5 h-5 text-text-highlight flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Sign in with your clinic credentials to manage appointments and services.
                        </p>
                    </div>

                    <div>
                        <label for="login-email-enterprise" class="block text-sm font-medium text-text-primary mb-2">Business Email</label>
                        <input 
                            id="login-email-enterprise" 
                            type="email" 
                            placeholder="clinic@veterinary.com" 
                            class="input"
                            required
                            autocomplete="email"
                        >
                    </div>

                    <div>
                        <label for="login-password-enterprise" class="block text-sm font-medium text-text-primary mb-2">Password</label>
                        <div class="relative">
                            <input 
                                id="login-password-enterprise" 
                                type="password" 
                                placeholder="Enter your password" 
                                class="input pr-12"
                                required
                                autocomplete="current-password"
                            >
                            <button type="button" id="toggle-password-enterprise" class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition" aria-label="Toggle password visibility">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-paws-purple focus:ring-paws-purple">
                            <span class="text-sm text-text-soft">Remember me</span>
                        </label>
                        <a href="/#/forgot-password" class="text-sm text-text-highlight hover:underline font-medium">
                            Forgot password?
                        </a>
                    </div>

                    <button type="submit" class="btn btn-accent w-full py-3">
                        Sign In to Dashboard
                    </button>

                    <div class="divider">
                        <span>or continue with</span>
                    </div>

                    <button type="button" id="google-login-enterprise" class="btn-social">
                        <svg class="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                    </button>
                </form>

                <!-- Footer Links -->
                <div class="mt-8 text-center">
                    <p class="text-sm text-text-soft">
                        Don't have an account?
                        <a href="/#/register" class="text-text-highlight font-semibold hover:underline ml-1">
                            Create Account
                        </a>
                    </p>
                </div>

                <div class="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-6 text-xs text-text-muted">
                    <a href="/#/terms" class="hover:text-text-primary transition">Terms</a>
                    <a href="/#/privacy" class="hover:text-text-primary transition">Privacy</a>
                    <a href="/#/help" class="hover:text-text-primary transition">Help</a>
                </div>
            </div>
        </div>
    </section>
    `;
}

export function loginEvents() {
    // Tab switching logic
    const tabUser = document.getElementById('tab-user');
    const tabEnterprise = document.getElementById('tab-enterprise');
    const formUser = document.getElementById('login-form-user');
    const formEnterprise = document.getElementById('login-form-enterprise');
    const errorBox = document.getElementById('login-error');

    function switchTab(activeTab, inactiveTab, showForm, hideForm) {
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');
        showForm.classList.remove('hidden');
        hideForm.classList.add('hidden');
        errorBox.classList.add('hidden');
        errorBox.textContent = '';
    }

    if (tabUser && tabEnterprise) {
        tabUser.addEventListener('click', () => {
            switchTab(tabUser, tabEnterprise, formUser, formEnterprise);
        });

        tabEnterprise.addEventListener('click', () => {
            switchTab(tabEnterprise, tabUser, formEnterprise, formUser);
        });
    }

    // Password visibility toggle
    function setupPasswordToggle(toggleId, inputId) {
        const toggle = document.getElementById(toggleId);
        const input = document.getElementById(inputId);

        if (toggle && input) {
            toggle.addEventListener('click', () => {
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;

                // Update icon
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
            });
        }
    }

    setupPasswordToggle('toggle-password-user', 'login-password-user');
    setupPasswordToggle('toggle-password-enterprise', 'login-password-enterprise');

    // Form submission handler
    async function handleLogin(e, emailId, passwordId, role) {
        e.preventDefault();

        const email = document.getElementById(emailId).value.trim();
        const password = document.getElementById(passwordId).value;

        errorBox.classList.add('hidden');
        errorBox.textContent = '';

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            });

            const data = await res.json();

            if (!res.ok) {
                errorBox.textContent = data.error || 'Login failed. Please try again.';
                errorBox.classList.remove('hidden');
                return;
            }

            // Store session
            localStorage.setItem('user', JSON.stringify(data));

            // Redirect based on role
            if (data.role === 'business') {
                window.location.hash = '/veterinary';
            } else if (data.role === 'admin') {
                window.location.hash = '/admin-dashboard';
            } else {
                window.location.hash = '/user-dashboard';
            }
        } catch (error) {
            errorBox.textContent = 'Connection error. Please try again.';
            errorBox.classList.remove('hidden');
        }
    }

    // User form submission
    if (formUser) {
        formUser.addEventListener('submit', (e) => {
            handleLogin(e, 'login-email-user', 'login-password-user', 'owner');
        });
    }

    // Enterprise form submission
    if (formEnterprise) {
        formEnterprise.addEventListener('submit', (e) => {
            handleLogin(e, 'login-email-enterprise', 'login-password-enterprise', 'clinic');
        });
    }

    // Google login handlers (placeholder - would integrate with actual OAuth)
    const googleLoginUser = document.getElementById('google-login-user');
    const googleLoginEnterprise = document.getElementById('google-login-enterprise');

    if (googleLoginUser) {
        googleLoginUser.addEventListener('click', () => {
            window.location.href = '/api/auth/google?role=user';
        });
    }

    if (googleLoginEnterprise) {
        googleLoginEnterprise.addEventListener('click', () => {
            window.location.href = '/api/auth/google?role=business';
        });
    }
}