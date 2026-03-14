// emergencyButton.js
export function EmergencyButton() {
  
  console.log("EmergencyButton ejecutado");

  // 💀 Eliminar botón previo si existe
  const existing = document.getElementById("emergency-btn");
  if (existing) existing.remove();

  const btn = document.createElement("button");
  btn.id = "emergency-btn";
  btn.className = `
    fixed bottom-6 right-6
    w-16 h-16
    rounded-full
    bg-[#FF0000]
    flex items-center justify-center
    text-white
    shadow-[0_0_30px_rgba(255,0,0,0.9)]
    animate-pulse
    hover:scale-110
    hover:shadow-[0_0_50px_rgba(255,0,0,1)]
    transition
    cursor-grab
    z-50
  `;
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
         class="w-12 h-12"
         fill="white"
         viewBox="0 0 24 24">
      <path d="M1 21h22L12 2 1 21zm11-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-1-5h2v-4h-2v4z"/>
    </svg>
  `;

  btn.addEventListener("dblclick", () => {
    window.location.hash = '#/emergency';
  });

  document.body.appendChild(btn);

  makeDraggable(btn);
}

// Función para arrastrar el botón
function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    element.classList.remove("cursor-grab");
    element.classList.add("cursor-grabbing");

    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    element.style.left = e.clientX - offsetX + "px";
    element.style.top = e.clientY - offsetY + "px";
    element.style.right = "auto";
    element.style.bottom = "auto";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    element.classList.remove("cursor-grabbing");
    element.classList.add("cursor-grab");
  });
}

