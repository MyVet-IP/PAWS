export function resetPasswordPage() {
    return `
      <div class="h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style="background: linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%);">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div>
            <div class="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900" style="font-family: 'Poppins', sans-serif;">
              Reset Password
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Please enter your new password below.
            </p>
          </div>
          
          <form id="reset-password-form" class="mt-8 space-y-6">
            <input type="hidden" id="reset-token" name="token">
            
            <div class="rounded-md shadow-sm space-y-3">
              <div>
                <label for="new-password" class="sr-only">New Password</label>
                <input id="new-password" name="password" type="password" required class="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="New Password">
              </div>
              <div>
                <label for="confirm-password" class="sr-only">Confirm Password</label>
                <input id="confirm-password" name="confirm-password" type="password" required class="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Confirm Password">
              </div>
            </div>
  
            <div id="form-message" class="hidden text-sm text-center p-3 rounded-md"></div>
  
            <div>
              <button type="submit" id="submit-btn" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200" style="background: linear-gradient(135deg, var(--color-purple, #6A4C93) 0%, var(--color-green, #B9FBC0) 100%);">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
  
  export function resetPasswordEvents() {
    const form = document.getElementById('reset-password-form');
    const msgDiv = document.getElementById('form-message');
    const btn = document.getElementById('submit-btn');
    const tokenInput = document.getElementById('reset-token');
  
    if (!form) return;
    // Retrieve the token from URL — try multiple parsing strategies
    // Email clients may format the URL differently
    let token = null;
    
    // Strategy 1: Token in hash query string — /#/reset-password?token=xxx
    const hashParts = window.location.hash.split("?");
    if (hashParts.length > 1) {
        token = new URLSearchParams(hashParts[1]).get('token');
    }
    
    // Strategy 2: Token in main query string — /?token=xxx#/reset-password
    if (!token) {
        token = new URLSearchParams(window.location.search).get('token');
    }
    
    // Strategy 3: Full URL regex fallback — catch any token= pattern
    if (!token) {
        const match = window.location.href.match(/[?&]token=([^&#]+)/);
        if (match) token = decodeURIComponent(match[1]);
    }
    
    if (tokenInput) {
        tokenInput.value = token || "";
    }
  
    if (!token) {
        msgDiv.classList.remove('hidden');
        msgDiv.classList.add('bg-red-50', 'text-red-600');
        msgDiv.textContent = "Invalid or missing recovery token in the URL.";
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
    }
  
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const currentToken = tokenInput.value;
  
        if (password !== confirmPassword) {
            msgDiv.classList.remove('hidden', 'bg-green-50', 'text-green-600');
            msgDiv.classList.add('bg-red-50', 'text-red-600');
            msgDiv.textContent = "Passwords do not match.";
            return;
        }
        
        btn.disabled = true;
        btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Updating...`;
        msgDiv.classList.add('hidden');
  
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: currentToken, newPassword: password })
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || "Error updating password");
            }
            
            msgDiv.classList.remove('hidden', 'bg-red-50', 'text-red-600');
            msgDiv.classList.add('bg-green-50', 'text-green-600');
            msgDiv.innerHTML = `${data.message} <br> <a href="/#/login" class="underline font-bold mt-2 block">Go to Sign In</a>`;
            form.reset();
            
        } catch (error) {
            msgDiv.classList.remove('hidden', 'bg-green-50', 'text-green-600');
            msgDiv.classList.add('bg-red-50', 'text-red-600');
            msgDiv.textContent = error.message || "Error updating the password.";
        } finally {
            btn.disabled = false;
            btn.innerHTML = `Update Password`;
        }
    });
  }
