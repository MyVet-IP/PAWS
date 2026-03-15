export function registerPage() {
    return `
    <section class="register-section">
        <div class="register-card animate-fade-in">

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
                <div class="flex items-center gap-2">
                    <span class="w-8 h-8 rounded-full bg-paws-purple text-text-primary flex items-center justify-center text-sm font-semibold">1</span>
                    <span class="text-sm font-medium text-text-primary">Information</span>
                </div>
                <div class="w-12 h-0.5" style="background:var(--bg-muted);"></div>
                <div class="flex items-center gap-2">
                    <span class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                          style="background:var(--bg-muted);color:var(--text-muted);">2</span>
                    <span class="text-sm" style="color:var(--text-muted);">Account Type</span>
                </div>
            </div>

            <!-- Error/Success Message -->
            <div id="form-message" class="hidden rounded-xl p-4 mb-6 text-sm register-message"></div>

            <!-- Registration Form -->
            <form id="register-form" class="space-y-6">

                <!-- Basic Information -->
                <div class="space-y-5">
                    <div class="register-fields-grid">

                        <div>
                            <label for="name" class="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                            <input id="name" type="text" placeholder="John Doe"
                                class="input" required autocomplete="name">
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                            <input id="email" type="email" placeholder="you@example.com"
                                class="input" required autocomplete="email">
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-text-primary mb-2">Password</label>
                            <div class="relative">
                                <input id="password" type="password" placeholder="Min. 8 characters"
                                    class="input pr-12" required minlength="8" autocomplete="new-password">
                                <button type="button" id="toggle-password"
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition"
                                    aria-label="Toggle password visibility">
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
                                <input id="confirmPassword" type="password" placeholder="Repeat your password"
                                    class="input pr-12" required autocomplete="new-password">
                                <button type="button" id="toggle-confirm-password"
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition"
                                    aria-label="Toggle password visibility">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                </button>
                            </div>
                            <!-- Confirm password visual feedback -->
                            <p id="confirm-password-msg" class="confirm-msg hidden"></p>
                        </div>
                    </div>

                    <!-- Password Strength -->
                    <div class="space-y-2">
                        <div class="flex gap-1">
                            <div id="strength-1" class="strength-bar"></div>
                            <div id="strength-2" class="strength-bar"></div>
                            <div id="strength-3" class="strength-bar"></div>
                            <div id="strength-4" class="strength-bar"></div>
                        </div>
                        <p id="strength-text" class="text-xs" style="color:var(--text-muted);"></p>
                    </div>
                </div>

                <!-- Account Type -->
                <div class="pt-6" style="border-top:1px solid var(--bg-muted);">
                    <h2 class="text-center text-text-primary font-poppins font-semibold mb-6">
                        How are you joining us?
                    </h2>
                    <div class="register-fields-grid">

                        <!-- Pet Owner -->
                        <label class="relative cursor-pointer group">
                            <input type="radio" name="role" value="owner" class="peer sr-only" required>
                            <div class="role-card border-2 rounded-2xl p-6 text-center transition-all
                                        peer-checked:border-paws-green peer-checked:bg-paws-green/10
                                        hover:shadow-soft"
                                 style="border-color:var(--bg-muted);">
                                <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-paws-pink/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <svg class="w-8 h-8 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                </div>
                                <h3 class="font-poppins font-semibold text-text-primary mb-2">Pet Owner</h3>
                                <p class="text-xs text-text-soft leading-relaxed">I'm looking for the best veterinary services for my pets</p>
                            </div>
                            <div class="role-check absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                                 style="border-color:var(--bg-muted);">
                                <svg class="w-3 h-3 text-white hidden peer-checked:block" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </label>

                        <!-- Veterinary Clinic -->
                        <label class="relative cursor-pointer group">
                            <input type="radio" name="role" value="vet" class="peer sr-only">
                            <div class="role-card border-2 rounded-2xl p-6 text-center transition-all
                                        peer-checked:border-paws-purple peer-checked:bg-paws-purple/10
                                        hover:shadow-soft"
                                 style="border-color:var(--bg-muted);">
                                <div class="w-14 h-14 mx-auto mb-4 rounded-xl bg-paws-blue/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <svg class="w-8 h-8 text-text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                    </svg>
                                </div>
                                <h3 class="font-poppins font-semibold text-text-primary mb-2">Veterinary Clinic</h3>
                                <p class="text-xs text-text-soft leading-relaxed">I want to offer my services and reach more clients</p>
                            </div>
                            <div class="role-check absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                                 style="border-color:var(--bg-muted);">
                                <svg class="w-3 h-3 text-white hidden peer-checked:block" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Terms -->
                <div class="flex items-start gap-3">
                    <input type="checkbox" id="terms" class="w-4 h-4 mt-1 rounded"
                        style="accent-color:var(--text-highlight);" required>
                    <label for="terms" class="text-sm text-text-soft">
                        I agree to the
                        <a href="#/terms" class="text-text-highlight hover:underline">Terms of Service</a>
                        and
                        <a href="#/privacy" class="text-text-highlight hover:underline">Privacy Policy</a>
                    </label>
                </div>

                <!-- Submit -->
                <button type="submit" class="btn btn-primary w-full py-3 text-base">
                    Create Account
                </button>

                <!-- Sign In -->
                <p class="text-center text-sm text-text-soft">
                    Already have an account?
                    <a href="#/login" class="text-text-highlight font-semibold hover:underline ml-1">Sign In</a>
                </p>

                <!-- Footer -->
                <div class="pt-6 flex items-center justify-between text-xs"
                     style="border-top:1px solid var(--bg-muted);color:var(--text-muted);">
                    <div class="flex items-center gap-2">
                        <svg class="w-4 h-4" style="color:var(--color-green);" fill="currentColor" viewBox="0 0 20 20">
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
    const registerForm  = document.getElementById("register-form");
    const formMessage   = document.getElementById("form-message");
    const passwordInput = document.getElementById("password");
    const confirmInput  = document.getElementById("confirmPassword");
    const confirmMsg    = document.getElementById("confirm-password-msg");

    // ── Password visibility toggles ──────────
    function setupPasswordToggle(toggleId, inputId) {
        const toggle = document.getElementById(toggleId);
        const input  = document.getElementById(inputId);
        if (!toggle || !input) return;
        toggle.addEventListener('click', () => {
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            const icon = toggle.querySelector('svg');
            if (type === 'text') {
                icon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>`;
            } else {
                icon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>`;
            }
        });
    }

    setupPasswordToggle('toggle-password', 'password');
    setupPasswordToggle('toggle-confirm-password', 'confirmPassword');

    // ── Password strength ─────────────────────
    const STRENGTH_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
    const STRENGTH_LABELS = ['Weak', 'Fair', 'Good', 'Strong'];

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        return strength;
    }

    function updatePasswordStrength(password) {
        const strength     = checkPasswordStrength(password);
        const bars         = [1,2,3,4].map(i => document.getElementById(`strength-${i}`));
        const strengthText = document.getElementById('strength-text');
        bars.forEach((bar, i) => {
            if (!bar) return;
            bar.style.background = i < strength ? STRENGTH_COLORS[strength - 1] : 'var(--bg-muted)';
        });
        if (strengthText) {
            strengthText.textContent = password.length > 0
                ? `Password strength: ${STRENGTH_LABELS[strength - 1] || 'Very weak'}`
                : '';
            strengthText.style.color = STRENGTH_COLORS[strength - 1] || '#ef4444';
        }
    }

    passwordInput?.addEventListener('input', e => {
        updatePasswordStrength(e.target.value);
        // Re-validate confirm if already typed
        if (confirmInput?.value) validateConfirmPassword();
    });

    // ── Confirm password visual validation ────
    function validateConfirmPassword() {
        const pw      = passwordInput?.value || '';
        const confirm = confirmInput?.value  || '';
        if (!confirmMsg || !confirmInput) return;

        if (confirm.length === 0) {
            confirmMsg.classList.add('hidden');
            confirmInput.style.borderColor = 'var(--bg-muted)';
            return;
        }

        if (pw === confirm) {
            confirmMsg.textContent = '✓ Passwords match';
            confirmMsg.classList.remove('hidden', 'confirm-msg-error');
            confirmMsg.classList.add('confirm-msg-success');
            confirmInput.style.borderColor = '#22c55e';
        } else {
            confirmMsg.textContent = '✗ Passwords do not match';
            confirmMsg.classList.remove('hidden', 'confirm-msg-success');
            confirmMsg.classList.add('confirm-msg-error');
            confirmInput.style.borderColor = '#ef4444';
        }
    }

    confirmInput?.addEventListener('input', validateConfirmPassword);

    // ── Form message helper ───────────────────
    function showMessage(message, success) {
        if (!formMessage) return;
        formMessage.classList.remove('hidden');
        formMessage.textContent = message;
        formMessage.style.background = success
            ? 'rgba(185,251,192,0.30)' : 'rgba(255,207,210,0.40)';
        formMessage.style.color  = success ? 'var(--color-green-dark)' : '#dc2626';
        formMessage.style.border = success
            ? '1px solid var(--color-green)' : '1px solid var(--color-pink)';
    }

    // ── Form submission ───────────────────────
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name            = document.getElementById("name").value.trim();
            const email           = document.getElementById("email").value.trim();
            const password        = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const role            = document.querySelector("input[name='role']:checked");
            const terms           = document.getElementById("terms").checked;

            if (!name || !email || !password || !confirmPassword) {
                showMessage("All fields are required", false); return;
            }
            if (!role) {
                showMessage("Please select an account type", false); return;
            }
            if (!terms) {
                showMessage("Please accept the Terms of Service", false); return;
            }
            if (password !== confirmPassword) {
                showMessage("Passwords do not match", false);
                validateConfirmPassword();
                return;
            }
            if (password.length < 8) {
                showMessage("Password must be at least 8 characters", false); return;
            }

            try {
                const response = await fetch("/api/register", {
                    method:  "POST",
                    headers: { "Content-Type": "application/json" },
                    body:    JSON.stringify({ name, email, password, role: role.value }),
                });
                const data = await response.json();
                if (!response.ok) {
                    showMessage(data.message || data.error || "Registration failed", false);
                    return;
                }
                showMessage("Account created successfully! Redirecting...", true);
                setTimeout(() => { window.location.hash = "#/login"; }, 1500);
            } catch {
                showMessage("Connection error. Please try again.", false);
            }
        });
    }
}