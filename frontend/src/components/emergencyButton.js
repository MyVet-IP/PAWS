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
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#dc2626,#ea580c)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    border: "none",
    cursor: "grab",
    // Keep below chat widget z-index so the chat container appears above the emergency button
    zIndex: "9000",
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
  // Position the button a bit above any bottom-right fixed widget (chat) if detected
  positionAboveChatIfPresent(btn);
  makeDraggable(btn);
  // We'll keep the emergency button stacked above other fixed widgets by default.

  // Hide button when navigating to /emergency
  window.addEventListener("hashchange", () => {
    const existing = document.getElementById("emergency-btn");
    if (!existing) return;
    if (window.location.hash === "#/emergency") {
      existing.remove();
    }
  });
}

// Try to find a fixed-position element in the bottom-right quadrant (likely the chat toggle)
function findBottomRightFixedElement() {
  const els = Array.from(document.querySelectorAll('body *'));
  let best = null;
  for (const el of els) {
    try {
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed') continue;
      const rect = el.getBoundingClientRect();
      // candidate should be near bottom-right
      const nearRight = (rect.left + rect.width) > (window.innerWidth - 200);
      const nearBottom = (rect.top + rect.height) > (window.innerHeight - 200);
      if (!nearRight || !nearBottom) continue;
      const distance = Math.hypot(window.innerWidth - (rect.left + rect.width), window.innerHeight - (rect.top + rect.height));
      if (!best || distance < best.distance) best = { el, rect, distance };
    } catch (e) { /* ignore */ }
  }
  return best ? best.rect : null;
}

function positionAboveChatIfPresent(btn) {
  try {
    const gap = 12; // px between chat and emergency button
    const rect = findBottomRightFixedElement();
    if (rect) {
      // rect.top + rect.height = bottom coordinate from top; compute bottom offset
      const candidateBottomOffset = Math.round(window.innerHeight - (rect.top + rect.height));
      const newBottom = candidateBottomOffset + Math.round(rect.height) + gap;
      // set bottom as pixels and keep right at 24px
      btn.style.bottom = newBottom + 'px';
      btn.style.right = '24px';
      // ensure it's below chat visually by lowering z-index if needed
      // chat usually has higher z-index; keep button lower so chat overlays it
      btn.style.zIndex = '9000';
    } else {
      // fallback: keep it slightly above default (100px) to be safe
      btn.style.bottom = '100px';
      btn.style.right = '24px';
      btn.style.zIndex = '9000';
    }
  } catch (e) {
    // ignore and keep default
  }
}

// ─────────────────────────────────────────────
//  makeDraggable — keeps button inside viewport
// ─────────────────────────────────────────────
function makeDraggable(element) {
  let isDragging = false;
  let startX, startY, startLeft, startTop;

  element.addEventListener("mousedown", e => {
    isDragging = true;
    element._dragged = false;

    // Convert current position to top/left if using bottom/right
    const rect = element.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    startX = e.clientX;
    startY = e.clientY;

    element.style.right = "auto";
    element.style.bottom = "auto";
    element.style.left = startLeft + "px";
    element.style.top = startTop + "px";

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

    // Basic viewport clamps
    const maxX = window.innerWidth - btnW - 8;
    const maxY = window.innerHeight - btnH - 8;
    const newLeft = Math.min(Math.max(8, startLeft + dx), maxX);
    const newTop = Math.min(Math.max(8, startTop + dy), maxY);

    element.style.left = newLeft + "px";
    element.style.top = newTop + "px";
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    element.style.cursor = "grab";
  });

  // Touch support
  element.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    const rect = element.getBoundingClientRect();
    isDragging = true;
    startLeft = rect.left;
    startTop = rect.top;
    startX = touch.clientX;
    startY = touch.clientY;
    element.style.right = "auto";
    element.style.bottom = "auto";
    element.style.left = startLeft + "px";
    element.style.top = startTop + "px";
  }, { passive: true });

  document.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    const btnW = element.offsetWidth;
    const btnH = element.offsetHeight;
    const maxX = window.innerWidth - btnW - 8;
    const maxY = window.innerHeight - btnH - 8;

    const newLeft = Math.min(Math.max(8, startLeft + dx), maxX);
    const newTop = Math.min(Math.max(8, startTop + dy), maxY);
    element.style.left = newLeft + "px";
    element.style.top = newTop + "px";
  }, { passive: true });

  document.addEventListener("touchend", () => { isDragging = false; });
}

// Compute an exclusion zone (top-left corner) for the chat widget area
// Note: exclusion-zone logic was intentionally removed to allow stacking of widgets.