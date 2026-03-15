// ─────────────────────────────────────────────
//  emergencyButton.js
//  Floating draggable emergency button
//  - Hidden on /emergency route
//  - Constrained within viewport bounds
//  - Pulse/glow animation for urgency
// ─────────────────────────────────────────────

export function EmergencyButton() {
  // Don't show on emergency page — user is already there
  if (window.location.hash === "#/emergency") return;

  // Remove any existing button
  document.getElementById("emergency-btn")?.remove();

  const btn = document.createElement("button");
  btn.id = "emergency-btn";

  Object.assign(btn.style, {
    position:     "fixed",
    bottom:       "24px",
    right:        "24px",
    width:        "60px",
    height:       "60px",
    borderRadius: "50%",
    background:   "linear-gradient(135deg,#dc2626,#ea580c)",
    display:      "flex",
    alignItems:   "center",
    justifyContent: "center",
    color:        "white",
    border:       "none",
    cursor:       "grab",
    zIndex:       "9990",
  });

  btn.className = "emergency-float-btn";

  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
         style="width:28px;height:28px;pointer-events:none;"
         fill="white"
         viewBox="0 0 24 24">
      <path d="M1 21h22L12 2 1 21zm11-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-1-5h2v-4h-2v4z"/>
    </svg>
  `;

  // Tooltip
  btn.title = "Emergency — double click to open";

  // Navigate on double click
  btn.addEventListener("dblclick", () => {
    window.location.hash = "#/emergency";
  });

  // Single click hint
  btn.addEventListener("click", () => {
    if (!btn._dragged) {
      btn.style.transform = "scale(0.92)";
      setTimeout(() => { btn.style.transform = ""; }, 120);
    }
    btn._dragged = false;
  });

  document.body.appendChild(btn);
  makeDraggable(btn);

  // Hide button when navigating to /emergency
  window.addEventListener("hashchange", () => {
    const existing = document.getElementById("emergency-btn");
    if (!existing) return;
    if (window.location.hash === "#/emergency") {
      existing.remove();
    }
  });
}

// ─────────────────────────────────────────────
//  makeDraggable — keeps button inside viewport
// ─────────────────────────────────────────────
function makeDraggable(element) {
  let isDragging = false;
  let startX, startY, startLeft, startTop;

  element.addEventListener("mousedown", e => {
    isDragging    = true;
    element._dragged = false;

    // Convert current position to top/left if using bottom/right
    const rect    = element.getBoundingClientRect();
    startLeft     = rect.left;
    startTop      = rect.top;
    startX        = e.clientX;
    startY        = e.clientY;

    element.style.right  = "auto";
    element.style.bottom = "auto";
    element.style.left   = startLeft + "px";
    element.style.top    = startTop  + "px";

    element.style.cursor = "grabbing";
    e.preventDefault();
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    element._dragged = true;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    const btnW = element.offsetWidth;
    const btnH = element.offsetHeight;
    const maxX = window.innerWidth  - btnW - 8;
    const maxY = window.innerHeight - btnH - 8;

    // Clamp within viewport with 8px margin
    const newLeft = Math.min(Math.max(8, startLeft + dx), maxX);
    const newTop  = Math.min(Math.max(8, startTop  + dy), maxY);

    element.style.left = newLeft + "px";
    element.style.top  = newTop  + "px";
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    element.style.cursor = "grab";
  });

  // Touch support
  element.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    const rect  = element.getBoundingClientRect();
    isDragging  = true;
    startLeft   = rect.left;
    startTop    = rect.top;
    startX      = touch.clientX;
    startY      = touch.clientY;
    element.style.right  = "auto";
    element.style.bottom = "auto";
    element.style.left   = startLeft + "px";
    element.style.top    = startTop  + "px";
  }, { passive: true });

  document.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx    = touch.clientX - startX;
    const dy    = touch.clientY - startY;
    const btnW  = element.offsetWidth;
    const btnH  = element.offsetHeight;
    const maxX  = window.innerWidth  - btnW - 8;
    const maxY  = window.innerHeight - btnH - 8;

    element.style.left = Math.min(Math.max(8, startLeft + dx), maxX) + "px";
    element.style.top  = Math.min(Math.max(8, startTop  + dy), maxY) + "px";
  }, { passive: true });

  document.addEventListener("touchend", () => { isDragging = false; });
}