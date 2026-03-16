// ─────────────────────────────────────────────
//  topbar.js
//  - Título dinámico según ruta actual
//  - Search en vivo con dropdown (mascotas,
//    citas, clínicas, historial, especialistas)
//  - Notificaciones desde localStorage
// ─────────────────────────────────────────────

// ── Route → title map ─────────────────────────
const ROUTE_TITLES = {
  "/user-dashboard": { title: "Dashboard", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'/></svg>" },
  "/pet-profile": { title: "Pet Profile", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z'/></svg>" },
  "/my-pets": { title: "My Pets", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z'/></svg>" },
  "/appointments": { title: "Appointments", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/></svg>" },
  "/clinics": { title: "Clinics", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'/></svg>" },
  "/services": { title: "Services", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M7 10h10M7 14h6m-9 4h14a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2zM9 6V4a1 1 0 011-1h4a1 1 0 011 1v2'/></svg>" },
  "/medical-records": { title: "Medical Records", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/></svg>" },
  "/emergency": { title: "Emergency", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'/></svg>" },
  "/map-page": { title: "Map", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'/></svg>" },
  "/tips": { title: "Tips & Health", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'/></svg>" },
  "/specialists": { title: "Specialists", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'/></svg>" },
  "/veterinary": { title: "Vet Dashboard", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 3H7a2 2 0 00-2 2v4a6 6 0 006 6 6 6 0 006-6V5a2 2 0 00-2-2h-2M9 3V1m6 2V1m-3 16v3m0 0a2 2 0 100 4 2 2 0 000-4z'/></svg>" },
  "/business-appointments": { title: "Appointments", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/></svg>" },
};

// ── Static search index (logged-in context) ───
const TOPBAR_INDEX = [
  // Mascotas
  { label: "Max", category: "My Pets", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9.5 3.5c-1 0-2 .4-2.7 1.1L5 6.5H3a1 1 0 00-1 1v2a1 1 0 001 1h.5l1 7h11l1-7h.5a1 1 0 001-1v-2a1 1 0 00-1-1h-2l-1.8-1.9A3.8 3.8 0 0014.5 3.5h-5z'/></svg>", hash: "#/pet-profile", desc: "Golden Retriever · 3 years" },
  { label: "Luna", category: "My Pets", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M4 4l2 3.5M20 4l-2 3.5M8 7.5C8 6 9 5 12 5s4 1 4 2.5v1c0 4-2 7-4 8-2-1-4-4-4-8v-1z'/></svg>", hash: "#/pet-profile", desc: "Cat · 2 years" },

  // Citas
  { label: "Annual Checkup", category: "Appointments", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/></svg>", hash: "#/appointments", desc: "Upcoming — Mar 20, 2026" },
  { label: "Dental Cleaning", category: "Appointments", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/></svg>", hash: "#/appointments", desc: "Upcoming — Apr 5, 2026" },
  { label: "Vaccination Booster", category: "Appointments", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/></svg>", hash: "#/appointments", desc: "Pending confirmation" },

  // Historial médico
  { label: "Annual Checkup Jan 2024", category: "Medical Records", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/></svg>", hash: "#/medical-records", desc: "Checkup · Jan 20, 2024" },
  { label: "Dental Cleaning Nov 2023", category: "Medical Records", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/></svg>", hash: "#/medical-records", desc: "Dental · Nov 15, 2023" },
  { label: "Vaccination Update Aug 2023", category: "Medical Records", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/></svg>", hash: "#/medical-records", desc: "Vaccine · Aug 10, 2023" },
  { label: "Skin Allergy Treatment", category: "Medical Records", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/></svg>", hash: "#/medical-records", desc: "Treatment · May 22, 2023" },

  // Clínicas
  { label: "Clínica San Juan Pet", category: "Clinics", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'/></svg>", hash: "#/clinics", desc: "El Poblado · 24/7" },
  { label: "VetCare Laureles", category: "Clinics", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'/></svg>", hash: "#/clinics", desc: "Laureles · Mon–Sat" },
  { label: "Animal House Envigado", category: "Clinics", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'/></svg>", hash: "#/clinics", desc: "Envigado · 24/7" },

  // Especialistas
  { label: "Dr. Carlos Cardona", category: "Specialists", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'/></svg>", hash: "#/specialists", desc: "General Veterinary" },
  { label: "Dra. Ana Ruiz", category: "Specialists", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'/></svg>", hash: "#/specialists", desc: "Specialist in Surgery" },
  { label: "Dr. Miguel Torres", category: "Specialists", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'/></svg>", hash: "#/specialists", desc: "Dermatology & Allergies" },
];

// ── Default notifications (localStorage seed) ─
const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    type: "appointment",
    icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/></svg>",
    title: "Upcoming appointment",
    message: "Annual Checkup for Max — Mar 20 at 10:00am",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "vaccine",
    icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M19.5 4.5l-15 15M16 3l5 5-1.5 1.5M12 7l4 4M5 15l-2 4 4-2M9 11l4 4'/></svg>",
    title: "Vaccine reminder",
    message: "Rabies booster for Luna is due in 12 days",
    time: "Yesterday",
    read: false,
  },
  {
    id: 3,
    type: "vet",
    icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 3H7a2 2 0 00-2 2v4a6 6 0 006 6 6 6 0 006-6V5a2 2 0 00-2-2h-2M9 3V1m6 2V1m-3 16v3m0 0a2 2 0 100 4 2 2 0 000-4z'/></svg>",
    title: "Message from your vet",
    message: "Dr. Cardona sent you post-visit notes for Max",
    time: "2 days ago",
    read: false,
  },
  {
    id: 4,
    type: "clinic",
    icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'/></svg>",
    title: "Clinic responded",
    message: "Clínica San Juan confirmed your appointment request",
    time: "3 days ago",
    read: true,
  },
];

function getNotifications() {
  try {
    const saved = localStorage.getItem("paws_notifications");
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  } catch { return DEFAULT_NOTIFICATIONS; }
}

function saveNotifications(notifs) {
  localStorage.setItem("paws_notifications", JSON.stringify(notifs));
}

// ─────────────────────────────────────────────
//  Topbar HTML
// ─────────────────────────────────────────────
export function Topbar() {
  const hash = location.hash.replace("#", "") || "/user-dashboard";
  const current = ROUTE_TITLES[hash] || { title: "Dashboard", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'/></svg>" };
  const notifs = getNotifications();
  const unread = notifs.filter(n => !n.read).length;

  return `
  <header class="h-16 bg-white flex items-center justify-between px-5 flex-shrink-0"
          style="border-bottom:1px solid #F3F4F6;">

    <!-- LEFT: icon + page title -->
    <div class="flex items-center gap-3 flex-shrink-0">
      <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg"
           style="background:#D1FAE5;color:#065F46;">
        <svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2a2 2 0 100 4 2 2 0 000-4zM6 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm12 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 11a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm16 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-8 1c-2.5 0-5 2-5 4 0 1.5 1 2 2.5 2s2-.5 2.5-.5.5.5 2.5.5S17 18 17 16c0-2-2.5-4-5-4z'/></svg>
      </div>
      <div>
        <p class="text-xs text-gray-400 leading-none font-roboto">PAWS</p>
        <h1 id="topbar-title" class="text-base font-semibold text-gray-800 leading-tight font-poppins">
          ${current.icon} ${current.title}
        </h1>
      </div>
    </div>

    <!-- CENTER: search -->
    <div class="flex-1 flex justify-center px-6">
      <div class="relative w-full max-w-md" id="topbar-search-wrapper">

        <div class="flex items-center rounded-full px-4 py-2 text-sm transition-all"
             id="topbar-search-box"
             style="background:#F5F7F6;border:1.5px solid #E5E7EB;">
          <svg class="w-4 h-4 flex-shrink-0 mr-2" style="color:#9CA3AF;"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            id="topbar-search"
            type="text"
            placeholder="Search pets, records, clinics..."
            class="bg-transparent outline-none text-sm w-full font-roboto"
            style="color:#374151;"
            autocomplete="off"/>
          <button id="topbar-search-clear"
            class="hidden flex-shrink-0 ml-1 text-gray-400 hover:text-gray-600 transition"
            style="background:none;border:none;cursor:pointer;font-size:14px;line-height:1;">
            ×
          </button>
        </div>

        <!-- Dropdown -->
        <div id="topbar-dropdown"
             class="hidden absolute left-0 right-0 bg-white rounded-2xl overflow-hidden"
             style="top:calc(100% + 6px);max-height:380px;overflow-y:auto;
                    border:1px solid #F3F4F6;
                    box-shadow:0 8px 24px rgba(0,0,0,0.10);z-index:9999;">
        </div>

      </div>
    </div>

    <!-- RIGHT: Notifications -->
    <div class="flex items-center gap-3 flex-shrink-0">

      <!-- Notifications bell -->
      <div class="relative" id="notif-wrapper">
        <button id="btn-notif"
          class="relative flex items-center justify-center rounded-full transition"
          style="width:40px;height:40px;background:#F5F7F6;"
          onmouseenter="this.style.background='#E5E7EB'"
          onmouseleave="this.style.background='#F5F7F6'">
          <svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'/></svg>
          <!-- Unread badge -->
          ${unread > 0 ? `
            <span id="notif-badge"
                  class="absolute flex items-center justify-center rounded-full text-white font-bold"
                  style="top:4px;right:4px;width:16px;height:16px;font-size:9px;
                         background:#dc2626;font-family:'Poppins',sans-serif;">
              ${unread > 9 ? '9+' : unread}
            </span>` : `<span id="notif-badge" class="hidden"></span>`}
        </button>

        <!-- Notifications panel -->
        <div id="notif-panel"
             class="hidden absolute right-0 bg-white rounded-2xl overflow-hidden"
             style="top:calc(100% + 8px);width:320px;
                    border:1px solid #F3F4F6;
                    box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:9999;">

          <!-- Panel header -->
          <div class="flex items-center justify-between px-4 py-3"
               style="border-bottom:1px solid #F3F4F6;">
            <h3 class="font-bold font-poppins text-gray-800 text-sm">Notifications</h3>
            <button id="btn-mark-all-read"
              class="text-xs font-medium font-poppins transition"
              style="color:#6A4C93;"
              onmouseenter="this.style.opacity='0.7'"
              onmouseleave="this.style.opacity='1'">
              Mark all as read
            </button>
          </div>

          <!-- Notifications list -->
          <div id="notif-list" class="overflow-y-auto" style="max-height:320px;">
            <!-- filled by JS -->
          </div>

        </div>
      </div>

    </div>
  </header>
  `;
}

// ─────────────────────────────────────────────
//  topbarEvents — llámalo desde el router
// ─────────────────────────────────────────────
export function topbarEvents() {

  // ── Dynamic title on hash change ──────────
  function updateTitle() {
    const hash = location.hash.replace("#", "") || "/user-dashboard";
    const current = ROUTE_TITLES[hash] || { title: "Dashboard", icon: "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'/></svg>" };
    const el = document.getElementById("topbar-title");
    if (el) el.textContent = `${current.icon} ${current.title}`;
  }
  window.addEventListener("hashchange", updateTitle);
  updateTitle(); // run immediately

  // ──────────────────────────────────────────
  //  SEARCH
  // ──────────────────────────────────────────
  const input = document.getElementById("topbar-search");
  const dropdown = document.getElementById("topbar-dropdown");
  const clearBtn = document.getElementById("topbar-search-clear");
  const searchBox = document.getElementById("topbar-search-box");

  if (input && dropdown) {
    let selectedIndex = -1;
    let lastResults = [];

    // Focus styles
    input.addEventListener("focus", () => {
      searchBox.style.borderColor = "#6A4C93";
      searchBox.style.boxShadow = "0 0 0 3px rgba(106,76,147,0.12)";
      if (input.value.trim()) showDropdown(input.value.trim());
    });

    input.addEventListener("blur", () => {
      setTimeout(() => {
        searchBox.style.borderColor = "#E5E7EB";
        searchBox.style.boxShadow = "none";
        hideDropdown();
      }, 180);
    });

    // Live search
    input.addEventListener("input", () => {
      const q = input.value.trim();
      selectedIndex = -1;
      clearBtn?.classList.toggle("hidden", !q);
      if (!q) { hideDropdown(); return; }
      showDropdown(q);
    });

    // Clear
    clearBtn?.addEventListener("click", () => {
      input.value = "";
      clearBtn.classList.add("hidden");
      hideDropdown();
      input.focus();
    });

    // Keyboard nav
    input.addEventListener("keydown", e => {
      const items = dropdown.querySelectorAll(".ts-item");
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        highlightItem(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        highlightItem(items);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          navigate(items[selectedIndex].dataset.hash);
        } else if (lastResults.length > 0) {
          navigate(lastResults[0].hash);
        }
      } else if (e.key === "Escape") {
        hideDropdown();
        input.blur();
      }
    });

    function showDropdown(query) {
      const q = query.toLowerCase();

      // Also search user's pets from localStorage
      const userPets = _getUserPets();
      const dynamicIndex = [
        ...userPets.map(p => ({
          label: p.nombre || p.name,
          category: "My Pets",
          icon: p.especie === "Cat" ? "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M4 4l2 3.5M20 4l-2 3.5M8 7.5C8 6 9 5 12 5s4 1 4 2.5v1c0 4-2 7-4 8-2-1-4-4-4-8v-1z'/></svg>" : "<svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M9.5 3.5c-1 0-2 .4-2.7 1.1L5 6.5H3a1 1 0 00-1 1v2a1 1 0 001 1h.5l1 7h11l1-7h.5a1 1 0 001-1v-2a1 1 0 00-1-1h-2l-1.8-1.9A3.8 3.8 0 0014.5 3.5h-5z'/></svg>",
          hash: "#/pet-profile",
          desc: `${p.raza || p.especie} · ${p.edad} ${p.edad === 1 ? "year" : "years"}`,
        })),
        ...TOPBAR_INDEX.filter(i => i.category !== "My Pets"), // avoid duplicates
      ];

      const results = dynamicIndex.filter(item =>
        item.label.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      ).slice(0, 10);

      lastResults = results;

      if (results.length === 0) {
        dropdown.innerHTML = `
          <div class="px-4 py-6 text-center">
            <p class="text-2xl mb-2"><svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/></svg></p>
            <p class="text-sm font-medium text-gray-700 font-poppins">
              No results for "<strong>${query}</strong>"
            </p>
            <p class="text-xs text-gray-400 mt-1">Try a pet name, clinic, or record</p>
          </div>`;
        dropdown.classList.remove("hidden");
        return;
      }

      // Group by category
      const grouped = {};
      results.forEach(r => {
        if (!grouped[r.category]) grouped[r.category] = [];
        grouped[r.category].push(r);
      });

      dropdown.innerHTML = Object.entries(grouped).map(([cat, items]) => `
        <div>
          <div class="px-4 py-1.5 sticky top-0 bg-white"
               style="border-bottom:1px solid #F9FAFB;">
            <span class="text-xs font-bold uppercase tracking-wide font-poppins"
                  style="color:#9CA3AF;letter-spacing:0.1em;">${cat}</span>
          </div>
          ${items.map(item => `
            <div class="ts-item flex items-center gap-3 px-4 py-2.5 cursor-pointer transition"
                 data-hash="${item.hash}"
                 style="transition:background 100ms;"
                 onmouseenter="this.style.background='#F9FAFB'"
                 onmouseleave="this.style.background='transparent'">
              <span class="text-base w-6 text-center flex-shrink-0">${item.icon}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 font-poppins truncate">
                  ${_highlight(item.label, q)}
                </p>
                <p class="text-xs text-gray-400 truncate">${item.desc}</p>
              </div>
              <svg class="w-3 h-3 flex-shrink-0" style="color:#D1D5DB;"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          `).join('')}
        </div>
      `).join('');

      dropdown.querySelectorAll(".ts-item").forEach(el => {
        el.addEventListener("mousedown", e => {
          e.preventDefault();
          navigate(el.dataset.hash);
        });
      });

      dropdown.classList.remove("hidden");
    }

    function hideDropdown() {
      dropdown.classList.add("hidden");
      selectedIndex = -1;
    }

    function navigate(hash) {
      input.value = "";
      clearBtn?.classList.add("hidden");
      hideDropdown();
      window.location.hash = hash.startsWith('#') ? hash.slice(1) : hash;
    }

    function highlightItem(items) {
      items.forEach((el, i) => {
        el.style.background = i === selectedIndex ? "#F3F4F6" : "transparent";
      });
      if (selectedIndex >= 0) items[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }

    // Close on outside click
    document.addEventListener("click", e => {
      if (!document.getElementById("topbar-search-wrapper")?.contains(e.target)) {
        hideDropdown();
      }
    });
  }

  // ──────────────────────────────────────────
  //  NOTIFICATIONS
  // ──────────────────────────────────────────
  const bellBtn = document.getElementById("btn-notif");
  const panel = document.getElementById("notif-panel");
  const markAllBtn = document.getElementById("btn-mark-all-read");

  if (bellBtn && panel) {

    // Toggle panel
    bellBtn.addEventListener("click", e => {
      e.stopPropagation();
      const isOpen = panel.style.display === "block";
      panel.style.display = isOpen ? "none" : "block";
      if (!isOpen) renderNotifications();
    });

    // Close on outside click
    document.addEventListener("click", e => {
      if (!document.getElementById("notif-wrapper")?.contains(e.target)) {
        panel.style.display = "none";
      }
    });

    // Mark all as read
    markAllBtn?.addEventListener("click", () => {
      const notifs = getNotifications().map(n => ({ ...n, read: true }));
      saveNotifications(notifs);
      renderNotifications();
      updateBadge(0);
    });
  }

  function renderNotifications() {
    const list = document.getElementById("notif-list");
    const notifs = getNotifications();
    if (!list) return;

    if (notifs.length === 0) {
      list.innerHTML = `
        <div class="px-4 py-8 text-center">
          <p class="text-2xl mb-2"><svg style='width:1em;height:1em;display:inline-block;vertical-align:middle;' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'/></svg></p>
          <p class="text-sm text-gray-500 font-poppins">No notifications yet</p>
        </div>`;
      return;
    }

    list.innerHTML = notifs.map(n => `
      <div class="notif-item flex items-start gap-3 px-4 py-3 cursor-pointer transition"
           data-id="${n.id}"
           style="background:${n.read ? 'transparent' : 'rgba(106,76,147,0.04)'};
                  border-bottom:1px solid #F9FAFB;transition:background 100ms;"
           onmouseenter="this.style.background='#F9FAFB'"
           onmouseleave="this.style.background='${n.read ? 'transparent' : 'rgba(106,76,147,0.04)'}'">

        <!-- Icon -->
        <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
             style="background:${_notifBg(n.type)};">
          ${n.icon}
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <p class="text-xs font-semibold text-gray-800 font-poppins leading-tight">${n.title}</p>
            ${!n.read ? `<span class="w-2 h-2 rounded-full flex-shrink-0 mt-1" style="background:#6A4C93;"></span>` : ''}
          </div>
          <p class="text-xs text-gray-500 mt-0.5 leading-relaxed">${n.message}</p>
          <p class="text-xs mt-1" style="color:#9CA3AF;">${n.time}</p>
        </div>
      </div>
    `).join('');

    // Mark as read on click
    list.querySelectorAll(".notif-item").forEach(el => {
      el.addEventListener("click", () => {
        const id = Number(el.dataset.id);
        const notifs = getNotifications().map(n =>
          n.id === id ? { ...n, read: true } : n
        );
        saveNotifications(notifs);
        const unread = notifs.filter(n => !n.read).length;
        updateBadge(unread);
        renderNotifications();
      });
    });

    // Update badge count
    const unread = notifs.filter(n => !n.read).length;
    updateBadge(unread);
  }

  function updateBadge(count) {
    const badge = document.getElementById("notif-badge");
    if (!badge) return;
    if (count > 0) {
      badge.textContent = count > 9 ? "9+" : count;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  // ── Helpers ───────────────────────────────
  function _notifBg(type) {
    const map = {
      appointment: "rgba(144,189,244,0.25)",
      vaccine: "rgba(185,251,192,0.30)",
      vet: "rgba(241,192,232,0.30)",
      clinic: "rgba(251,248,204,0.50)",
    };
    return map[type] || "rgba(243,244,246,1)";
  }

  function _getUserPets() {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) return [];
      // Try to get pets from dashboard data if cached
      const dash = JSON.parse(localStorage.getItem(`pets_${user.id_cliente}`) || "[]");
      return Array.isArray(dash) ? dash : [];
    } catch { return []; }
  }

  function _highlight(text, query) {
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"
    );
    return text.replace(
      regex,
      `<mark style="background:#DDD6FE;color:#5B21B6;border-radius:3px;padding:0 2px;">$1</mark>`
    );
  }
}