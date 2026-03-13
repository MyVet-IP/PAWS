export function loadMapPage() {
    return `
    <main class="flex h-[calc(100vh-80px)]">
        <aside class="w-full md:w-1/3 border-r-2 border-gray-200 p-6 overflow-y-auto">
            <h1 class="text-2xl font-bold mb-4">Encuentra la mejor vet</h1>
            
            <div class="relative mb-4">
                <input id="searchInput" type="text" placeholder="Search by near or service"
                    class="w-full px-4 py-3 rounded-xl bg-blue-light/40 outline-none focus:ring-2 focus:ring-blue">
            </div>
            
            <div class="flex flex-wrap gap-2 mb-6 text-xs" id="filterButtons">
                <button class="px-3 py-1 rounded-full bg-pink text-white filter-btn" data-filter="all">All</button>
                <button class="px-3 py-1 rounded-full border filter-btn" data-filter="24h">24h</button>
                <button class="px-3 py-1 rounded-full border filter-btn" data-filter="Urgencias">Urgencias</button>
                <button class="px-3 py-1 rounded-full border filter-btn" data-filter="Poblado">Poblado</button>
            </div>

            <div id="clinicList" class="space-y-4"></div>
        </aside>
        
        <div id="mapContainer" class="hidden md:block md:w-2/3 bg-gray-100"></div>
    </main>
    `;
    // Nota: Eliminamos las etiquetas <script> de aquí.
}

export function loadMapEvents() {
    // 1. Data (Simulando la base de datos por ahora)
    const clinicsDB = [
        { id: 1, name: "Clínica San Juan Pet", location: "El Poblado, Medellín", rating: 4.9, reviews: 128, services: ["Urgencias", "Cirugía"], verified: true, open24: true, lat: 6.2100, lng: -75.5680 },
        { id: 2, name: "VetCare Laureles", location: "Laureles, Medellín", rating: 4.7, reviews: 89, services: ["Consulta", "Vacunación"], verified: true, open24: false, lat: 6.2444, lng: -75.5963 },
        { id: 3, name: "Animal House Envigado", location: "Envigado, Medellín", rating: 4.8, reviews: 203, services: ["Urgencias", "Ortopedia"], verified: false, open24: true, lat: 6.1695, lng: -75.5924 }
    ];

    const MEDELLIN = { lat: 6.2442, lng: -75.5812 };
    let map = null;
    let markers = [];
    let activeInfoWindow = null;

    // Render sidebar cards 
    function renderCards(clinics) {
        const list = document.getElementById('clinicList');
        if (!list) return;

        list.innerHTML = clinics.map(clinic => `
            <div class="flex items-center gap-3 p-3 rounded-2xl border shadow-sm cursor-pointer hover:shadow-md transition"
                 onclick="window.focusVet(${clinic.id})"> <div class="w-12 h-12 rounded-full bg-purple/40 flex items-center justify-center text-xs shrink-0">🐾</div>
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-center gap-2">
                        <h3 class="font-semibold text-sm truncate">${clinic.name}</h3>
                        <span class="text-xs bg-pink/20 text-pink px-2 py-0.5 rounded-full shrink-0">★ ${clinic.rating}</span>
                    </div>
                    <p class="text-xs text-gray-500">${clinic.location}</p>
                    <div class="flex gap-2 mt-1 flex-wrap">
                        ${clinic.services.map(s => `<span class="text-[10px] bg-blue-light/60 px-2 py-0.5 rounded-full">${s}</span>`).join('')}
                        ${clinic.open24 ? '<span class="text-[10px] bg-green-light/60 text-green-800 px-2 py-0.5 rounded-full">24h</span>' : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Create markers on the map
    function placeMarkers(clinics) {
        markers.forEach(({ marker }) => marker.setMap(null));
        markers = [];
        const bounds = new google.maps.LatLngBounds();

        clinics.forEach(clinic => {
            const pos = { lat: clinic.lat, lng: clinic.lng };
            const marker = new google.maps.Marker({
                position: pos,
                map,
                title: clinic.name,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 11,
                    fillColor: '#cdb4db',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 2
                }
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="padding:8px;max-width:240px;font-family:sans-serif">
                        <h3 style="font-weight:700;margin:0 0 4px">${clinic.name}</h3>
                        <p style="color:#666;font-size:13px;margin:0 0 6px">${clinic.location}</p>
                        <a href="clinica.html?id=${clinic.id}" style="color:#cdb4db;font-weight:600;text-decoration:none">Ver detalles →</a>
                    </div>`
            });

            marker.addListener('click', () => {
                if (activeInfoWindow) activeInfoWindow.close();
                infoWindow.open(map, marker);
                activeInfoWindow = infoWindow;
            });

            markers.push({ id: clinic.id, marker, infoWindow });
            bounds.extend(pos);
        });

        if (clinics.length > 0 && map) {
            map.fitBounds(bounds);
        }
    }

    // Función expuesta globalmente para el onClick de las tarjetas
    window.focusVet = function (id) {
        const entry = markers.find(m => m.id === id);
        if (!entry || !map) return;

        if (activeInfoWindow) activeInfoWindow.close();
        map.panTo(entry.marker.getPosition());
        map.setZoom(16);
        entry.infoWindow.open(map, entry.marker);
        activeInfoWindow = entry.infoWindow;
    };

    // Callback de Google Maps
    window.initMap = function () {
        const mapDiv = document.getElementById('mapContainer');
        if (!mapDiv) return;

        map = new google.maps.Map(mapDiv, {
            zoom: 13,
            center: MEDELLIN,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
        });

        placeMarkers(clinicsDB);
        renderCards(clinicsDB);
    };

    // 4. Inyección dinámica y segura del script de Google Maps
    if (!document.getElementById('google-maps-script')) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        // Idealmente, reemplaza 'TU_API_KEY' con una variable de entorno en el futuro
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDoaEx8ykVQ4oyLJkP2yFzO2cmp8vT7Dk0&libraries=places&v=weekly`;
        script.async = true;
        document.head.appendChild(script);
    } else if (window.google && window.google.maps) {
        // Si el script ya estaba cargado por haber navegado antes, inicializamos directo
        window.initMap();
    }
}