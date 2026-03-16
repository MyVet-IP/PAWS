export function forgotPasswordPage() {
    return `
      <div class="h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style="background: linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%);">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div>
            <div class="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900" style="font-family: 'Poppins', sans-serif;">
              Recover Password
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
          </div>
          
          <form id="forgot-password-form" class="mt-8 space-y-6">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address">
              </div>
            </div>
  
            <div id="form-message" class="hidden text-sm text-center p-3 rounded-md"></div>
  
            <div>
              <button type="submit" id="submit-btn" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200" style="background: linear-gradient(135deg, var(--color-purple, #6A4C93) 0%, var(--color-green, #B9FBC0) 100%);">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-white group-hover:text-gray-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                Send Recovery Link
              </button>
            </div>
            
            <div class="text-sm text-center">
              <a href="/#/login" class="font-medium hover:underline transition-colors duration-200" style="color: var(--color-purple, #6A4C93);">
                Back to sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    `;
  }
  
  export function forgotPasswordEvents() {
    const form = document.getElementById('forgot-password-form');
    const msgDiv = document.getElementById('form-message');
    const btn = document.getElementById('submit-btn');
  
    if (!form) return;
  
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email-address').value;
        
        btn.disabled = true;
        btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...`;
        msgDiv.classList.add('hidden');
  
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            
            const data = await res.json();
            
            msgDiv.classList.remove('hidden', 'bg-red-50', 'text-red-600');
            msgDiv.classList.add('bg-green-50', 'text-green-600');
            msgDiv.textContent = data.message || "If the email exists, a password recovery link has been sent.";
            form.reset();
            
        } catch (error) {
            msgDiv.classList.remove('hidden', 'bg-green-50', 'text-green-600');
            msgDiv.classList.add('bg-red-50', 'text-red-600');
            msgDiv.textContent = "Error sending the email. Please try again later.";
            console.error(error);
        } finally {
            btn.disabled = false;
            btn.innerHTML = `Send Recovery Link`;
        }
    });
  }
