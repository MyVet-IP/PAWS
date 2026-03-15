import { getUser } from "../utils.js";

export function Aside() {
  const user = getUser();
  if (!user) return "";

  const isVet = user.role === "business";
  const photo = user.photo || null;
  const initials = (user.name || "U")
    .split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

  const currentHash = window.location.hash || "#/user-dashboard";

  return `
  <aside id="app-aside"
    class="hidden md:flex h-screen flex-col overflow-hidden relative font-poppins"
    style="width:240px;min-width:240px;
           background:linear-gradient(160deg,#6A4C93 0%,#8B5FBF 50%,#7A3FA0 100%);">

    <div class="absolute pointer-events-none" style="width:180px;height:180px;border-radius:50%;
      background:rgba(185,251,192,0.10);top:-50px;left:-50px;filter:blur(35px);"></div>
    <div class="absolute pointer-events-none" style="width:130px;height:130px;border-radius:50%;
      background:rgba(241,192,232,0.13);bottom:80px;right:-30px;filter:blur(28px);"></div>

    <!-- ── LOGO ──────────────────────────────── -->
    <div class="flex items-center gap-2 px-5 pt-4 pb-3 relative">
      <div class="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
           style="background:rgba(185,251,192,0.22);">🐾</div>
      <span class="font-bold text-surface-light tracking-widest" style="font-size:15px;letter-spacing:0.18em;">
        PAWS
      </span>
    </div>

    <!-- Divider -->
    <div class="mx-4 mb-3" style="height:1px;background:rgba(255,255,255,0.12);"></div>

    <!-- ── PROFILE CARD ────────────────────── -->
    <div id="aside-profile-trigger"
         class="mx-3 mb-3 rounded-xl flex flex-col items-center cursor-pointer relative transition-all"
         style="padding:14px 12px 10px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.16);"
         onmouseenter="this.style.background='rgba(185,251,192,0.16)'"
         onmouseleave="this.style.background='rgba(255,255,255,0.10)'">

      <!-- Avatar -->
      <div class="relative mb-2">
        <div id="aside-avatar-wrapper"
             class="rounded-full overflow-hidden flex items-center justify-center"
             style="width:60px;height:60px;border:2.5px solid #B9FBC0;box-shadow:0 0 0 4px rgba(185,251,192,0.15);">
          ${photo
      ? `<img src="${photo}" class="w-full h-full object-cover" alt="avatar"/>`
      : `<div class="w-full h-full flex items-center justify-center font-bold text-white"
                    style="font-size:1.2rem;background:linear-gradient(135deg,#B9FBC0,#6A4C93);">
                 ${initials}
               </div>`
    }
        </div>

        <!-- Online dot — color dinámico necesita style -->
        <span class="absolute" style="bottom:2px;right:2px;width:10px;height:10px;border-radius:50%;
              background:#B9FBC0;border:2px solid #7A3FA0;"></span>

        <!-- Edit badge -->
        <div class="absolute flex items-center justify-center"
             style="bottom:-2px;right:-4px;width:20px;height:20px;border-radius:50%;
                    background:#B9FBC0;border:2px solid #6A4C93;">
          <svg style="width:9px;height:9px;color:#333;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
              d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z"/>
          </svg>
        </div>
      </div>

      <!-- Nombre -->
      <p class="font-bold text-surface-light text-center" style="font-size:13px;">
        ${user.name?.split(" ")[0] || "User"}
      </p>

      <!-- Role badge -->
      <span class="mt-1 font-medium rounded-full" style="font-size:10px;padding:2px 10px;
            background:rgba(185,251,192,0.20);color:#B9FBC0;">
        ${isVet ? "🩺 Veterinarian" : "🐾 Pet Owner"}
      </span>

      <!-- Hint -->
      <p style="margin-top:5px;font-size:10px;color:rgba(255,255,255,0.28);">Click to edit profile</p>
    </div>

    <!-- ── NAV LABEL ─────────────────────────── -->
    <p class="font-semibold uppercase tracking-widest px-5 mb-1"
       style="font-size:9.5px;color:rgba(255,255,255,0.28);">
      Navigation
    </p>

    <!-- ── NAV MENU ──────────────────────────── -->
    <nav class="flex-1 px-2 flex flex-col gap-0.5 overflow-hidden">
      ${isVet ? vetMenu(currentHash) : ownerMenu(currentHash)}
    </nav>

    <!-- ── LOGOUT ────────────────────────────── -->
    <div class="px-2 pb-4 pt-2 relative">
      <div class="mb-2" style="height:1px;background:rgba(255,255,255,0.12);"></div>
      <button id="aside-logout-btn"
        class="w-full flex items-center gap-2 rounded-xl font-medium font-poppins transition-all"
        style="padding:9px 14px;font-size:13px;border:none;cursor:pointer;
               background:transparent;color:rgba(255,255,255,0.55);"
        onmouseenter="this.style.background='rgba(255,207,210,0.18)';this.style.color='#FFCFD2';"
        onmouseleave="this.style.background='transparent';this.style.color='rgba(255,255,255,0.55)';">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        Sign out
      </button>
    </div>
  </aside>

  <!-- ═══════════════════════════════════════ -->
  <!--  MODAL: EDIT PROFILE                    -->
  <!-- ═══════════════════════════════════════ -->
  <div id="modal-edit-profile"
       class="fixed inset-0 z-50 items-center justify-center"
       style="display:none;background:rgba(51,51,51,0.55);backdrop-filter:blur(6px);">

    <div class="bg-white rounded-2xl shadow-medium w-full mx-4 overflow-hidden animate-scale-in"
         style="max-width:420px;">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5"
           style="background:linear-gradient(135deg,#6A4C93,#8B5FBF);">
        <div>
          <h2 class="font-bold text-surface-light font-poppins" style="font-size:16px;margin:0;">
            Edit Profile
          </h2>
          <p style="font-size:11px;color:rgba(255,255,255,0.55);margin:3px 0 0;">
            Saved locally on your device
          </p>
        </div>
        <button id="modal-profile-close"
          class="flex items-center justify-center rounded-full transition-all"
          style="width:34px;height:34px;border:none;cursor:pointer;
                 background:rgba(255,255,255,0.15);color:white;"
          onmouseenter="this.style.background='rgba(255,255,255,0.28)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.15)'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Avatar upload -->
      <div class="flex flex-col items-center pt-5 pb-2">
        <div class="relative cursor-pointer" id="avatar-upload-wrapper">
          <div id="modal-avatar-preview"
               class="rounded-full overflow-hidden flex items-center justify-center"
               style="width:80px;height:80px;border:3px solid #F1C0E8;">
            <!-- llenado por _fillModal -->
          </div>
          <!-- Overlay cámara — opacity gestionado por JS -->
          <div id="avatar-overlay"
               class="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none"
               style="background:rgba(106,76,147,0.60);opacity:0;transition:opacity 150ms ease;">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <input type="file" id="photo-file-input" accept="image/*"
                 class="absolute inset-0 opacity-0 cursor-pointer rounded-full w-full h-full"/>
        </div>
        <p class="text-text-muted mt-1" style="font-size:11px;">Click photo to change</p>
      </div>

      <!-- Campos -->
      <div class="px-6 pb-6 flex flex-col gap-3 mt-1">

        <div>
          <label class="block font-semibold text-text-soft font-poppins mb-1" style="font-size:11px;">
            Full name
          </label>
          <input id="edit-name" type="text" placeholder="Your full name"
                 class="w-full border border-surface-muted rounded-md font-roboto text-text-primary
                        transition-all outline-none"
                 style="padding:9px 14px;font-size:13px;"
                 onfocus="this.style.borderColor='#F1C0E8';this.style.boxShadow='0 0 0 3px rgba(241,192,232,0.3)'"
                 onblur="this.style.borderColor='';this.style.boxShadow=''"/>
        </div>

        <div>
          <label class="block font-semibold text-text-soft font-poppins mb-1" style="font-size:11px;">
            Email
          </label>
          <input id="edit-email" type="email" disabled
                 class="w-full border border-surface-muted rounded-md font-roboto
                        bg-surface-muted text-text-muted cursor-not-allowed"
                 style="padding:9px 14px;font-size:13px;"/>
          <p class="text-text-muted mt-0.5" style="font-size:10px;">Email cannot be changed here</p>
        </div>

        <div>
          <label class="block font-semibold text-text-soft font-poppins mb-1" style="font-size:11px;">
            Phone
          </label>
          <input id="edit-phone" type="tel" placeholder="+57 300 000 0000"
                 class="w-full border border-surface-muted rounded-md font-roboto text-text-primary
                        transition-all outline-none"
                 style="padding:9px 14px;font-size:13px;"
                 onfocus="this.style.borderColor='#F1C0E8';this.style.boxShadow='0 0 0 3px rgba(241,192,232,0.3)'"
                 onblur="this.style.borderColor='';this.style.boxShadow=''"/>
        </div>

        <!-- Save button — usa token paws-green de tu config -->
        <button id="btn-save-profile"
          class="w-full font-semibold font-poppins rounded-md transition-all border-none cursor-pointer
                 bg-paws-green hover:bg-paws-greenDark text-text-primary"
          style="padding:11px;font-size:14px;">
          Save changes
        </button>

        <!-- Success -->
        <div id="profile-success"
             class="text-center font-semibold font-poppins rounded-md bg-paws-green text-text-primary"
             style="display:none;padding:10px;font-size:13px;">
          ✅ Profile updated!
        </div>

      </div>
    </div>
  </div>
  `;
}

// ─────────────────────────────────────────────
//  ownerMenu — sin Emergency
// ─────────────────────────────────────────────
function ownerMenu(currentHash) {
  const links = [
    { href: "#/user-dashboard", label: "Dashboard", icon: "📊" },
    { href: "#/pet-profile", label: "My Pets", icon: "🐾" },
    { href: "#/appointments", label: "Appointments", icon: "📅" },
    { href: "#/clinics", label: "Clinics", icon: "🏥" },
  ];
  return links.map(l => navLink(l, currentHash)).join("");
}

// ─────────────────────────────────────────────
//  vetMenu — sin Emergency
// ─────────────────────────────────────────────
function vetMenu(currentHash) {
  const links = [
    { href: "#/veterinary", label: "Dashboard", icon: "📊" },
    { href: "#/business-appointments", label: "Appointments", icon: "📅" },
    { href: "#/pet-profile", label: "Patients", icon: "🐾" },
    { href: "#/medical-records", label: "Medical Records", icon: "📋" },
  ];
  return links.map(l => navLink(l, currentHash)).join("");
}

// ─────────────────────────────────────────────
//  navLink — clases Tailwind + style solo para
//  los valores de color con opacidad custom
//  que Tailwind CDN no puede generar dinámicamente
// ─────────────────────────────────────────────
function navLink({ href, label, icon }, currentHash) {
  const isActive = currentHash === href;

  // Base styles que NUNCA deben perderse en hover
  const base = `padding:9px 14px;font-size:13px;border-left:3px solid transparent;`;

  // Solo cambian background, color y border-left-color — el base se preserva
  const activeStyle = `${base}background:rgba(185,251,192,0.20);color:#B9FBC0;border-left-color:#B9FBC0;`;
  const normalStyle = `${base}color:rgba(255,255,255,0.65);`;
  const hoverStyle = `${base}color:rgba(255,255,255,0.65);background:rgba(255,255,255,0.09);`;

  // cssText ahora siempre incluye el base, así no se pierden padding ni font-size
  const hOn = `this.style.cssText='${hoverStyle}'`;
  const hOff = `this.style.cssText='${isActive ? activeStyle : normalStyle}'`;

  return `
    <a href="${href}"
       class="flex items-center gap-2 rounded-xl font-medium font-poppins transition-all no-underline"
       style="${isActive ? activeStyle : normalStyle}"
       ${!isActive ? `onmouseenter="${hOn}" onmouseleave="${hOff}"` : ""}>
      <span class="text-center" style="width:18px;font-size:14px;">${icon}</span>
      ${label}
    </a>
  `;
}

// ─────────────────────────────────────────────
//  asideEvents
// ─────────────────────────────────────────────
export function asideEvents() {
  let user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return;

  const modal = document.getElementById("modal-edit-profile");
  const trigger = document.getElementById("aside-profile-trigger");
  const closeBtn = document.getElementById("modal-profile-close");
  const saveBtn = document.getElementById("btn-save-profile");
  const fileInput = document.getElementById("photo-file-input");
  const logoutBtn = document.getElementById("aside-logout-btn");
  const successMsg = document.getElementById("profile-success");

  // Hover sobre avatar del modal
  const avatarWrapper = document.getElementById("avatar-upload-wrapper");
  const overlay = document.getElementById("avatar-overlay");
  if (avatarWrapper && overlay) {
    avatarWrapper.addEventListener("mouseenter", () => overlay.style.opacity = "1");
    avatarWrapper.addEventListener("mouseleave", () => overlay.style.opacity = "0");
  }

  const openModal = () => { if (modal) modal.style.display = "flex"; };
  const closeModal = () => { if (modal) modal.style.display = "none"; };

  // Abrir modal
  trigger?.addEventListener("click", () => {
    user = JSON.parse(localStorage.getItem("user") || "null");
    _fillModal(user);
    openModal();
  });

  // Cerrar — X
  closeBtn?.addEventListener("click", closeModal);

  // Cerrar — backdrop
  modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  // Preview foto en vivo
  fileInput?.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const preview = document.getElementById("modal-avatar-preview");
      if (preview) _renderAvatar(preview, e.target.result);
    };
    reader.readAsDataURL(file);
  });

  // Guardar
  saveBtn?.addEventListener("click", () => {
    user = JSON.parse(localStorage.getItem("user") || "null");
    const newName = document.getElementById("edit-name")?.value.trim();
    const newPhone = document.getElementById("edit-phone")?.value.trim();

    if (fileInput?.files[0]) {
      const reader = new FileReader();
      reader.onload = e => _persistAndRefresh(user, newName, newPhone, e.target.result, closeModal, successMsg);
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      _persistAndRefresh(user, newName, newPhone, user.photo || null, closeModal, successMsg);
    }
  });

  // Logout
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.hash = "/";
  });
}

// ─────────────────────────────────────────────
//  Helpers privados
// ─────────────────────────────────────────────

function _fillModal(user) {
  const nameEl = document.getElementById("edit-name");
  const emailEl = document.getElementById("edit-email");
  const phoneEl = document.getElementById("edit-phone");
  const preview = document.getElementById("modal-avatar-preview");
  const success = document.getElementById("profile-success");

  if (nameEl) nameEl.value = user.name || "";
  if (emailEl) emailEl.value = user.email || "";
  if (phoneEl) phoneEl.value = user.phone || "";
  if (success) success.style.display = "none";
  if (preview) _renderAvatar(preview, user.photo || null, user.name);
}

function _renderAvatar(el, photo, name = "") {
  if (photo) {
    el.innerHTML = `<img src="${photo}" class="w-full h-full object-cover" alt="avatar"/>`;
  } else {
    const initials = (name || "U").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
    el.innerHTML = `
      <div class="w-full h-full flex items-center justify-center font-bold text-white"
           style="font-size:1.4rem;background:linear-gradient(135deg,#B9FBC0,#6A4C93);">
        ${initials}
      </div>`;
  }
}

function _persistAndRefresh(user, name, phone, photo, closeModal, successMsg) {
  const updated = {
    ...user,
    ...(name ? { name } : {}),
    ...(phone ? { phone } : {}),
    ...(photo ? { photo } : {}),
  };
  localStorage.setItem("user", JSON.stringify(updated));

  // Actualizar avatar en sidebar
  const wrapper = document.getElementById("aside-avatar-wrapper");
  if (wrapper) _renderAvatar(wrapper, photo, name || user.name);

  // Actualizar saludo en dashboard
  const dashName = document.getElementById("dash-username");
  if (dashName) dashName.textContent = `Welcome, ${(name || user.name)?.split(" ")[0]}!`;

  // Mostrar éxito y cerrar
  if (successMsg) {
    successMsg.style.display = "block";
    setTimeout(() => {
      successMsg.style.display = "none";
      closeModal();
    }, 1600);
  } else {
    closeModal();
  }
}