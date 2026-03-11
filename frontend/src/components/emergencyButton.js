export function EmergencyButton() {
  return `
  <button
    id="btn-emergency-fab"
    class="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center z-40 transition transform hover:scale-110"
    aria-label="Emergencies"
  >
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  </button>
  `;
}