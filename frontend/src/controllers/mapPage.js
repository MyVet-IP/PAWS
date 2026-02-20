// 1. Data
// replace array with the db connection 

const clinicsDB = [
    {
        id: 1,
        name: "Clínica San Juan Pet",
        location: "El Poblado, Medellín",
        rating: 4.9,
        reviews: 128,
        services: ["Urgencias", "Cirugía"],
        verified: true,
        open24: true,
        lat: 6.2100,
        lng: -75.5680
    },
    {
        id: 2,
        name: "VetCare Laureles",
        location: "Laureles, Medellín",
        rating: 4.7,
        reviews: 89,
        services: ["Consulta", "Vacunación"],
        verified: true,
        open24: false,
        lat: 6.2444,
        lng: -75.5963
    },
    {
        id: 3,
        name: "Animal House Envigado",
        location: "Envigado, Medellín",
        rating: 4.8,
        reviews: 203,
        services: ["Urgencias", "Ortopedia"],
        verified: false,
        open24: true,
        lat: 6.1695,
        lng: -75.5924
    }
];

// status

const MapPage = (() => {

    const MEDELLIN = { lat: 6.2442, lng: -75.5812 };
    let map = null;
    let markers = [];
    let activeInfoWindow = null;

//Render sidebar cards 

    function renderCards(clinics) {
        const list = document.getElementById('clinicList');
        if (!list) return;

        list.innerHTML = clinics.map(clinic => `
            <div
                class="flex items-center gap-3 p-3 rounded-2xl border shadow-sm cursor-pointer hover:shadow-md transition"
                onclick="MapPage.focusClinic(${clinic.id})"
            >
                <div class="w-12 h-12 rounded-full bg-purple/40 flex items-center justify-center text-xs shrink-0">
                    🐾
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-center gap-2">
                        <h3 class="font-semibold text-sm truncate">${clinic.name}</h3>
                        <span class="text-xs bg-pink/20 text-pink px-2 py-0.5 rounded-full shrink-0">${clinic.rating}</span>
                    </div>
                    <p class="text-xs text-gray">${clinic.location}</p>
                    <div class="flex gap-2 mt-1 flex-wrap">
                        ${clinic.services.map(s =>
                            `<span class="text-[10px] bg-blue-light/60 px-2 py-0.5 rounded-full">${s}</span>`
                        ).join('')}
                        ${clinic.open24 ? '<span class="text-[10px] bg-green-light/60 px-2 py-0.5 rounded-full">24h</span>' : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
 // Create markdowns on the map
    function placeMarkers(clinics) {
        // clear past markdowns
        markers.forEach(({ marker, infoWindow }) => {
            marker.setMap(null);
            infoWindow.close();
        });
        markers = [];
        const bounds = new google.maps.LatLngBounds();
        clinics.forEach(clinic => {
            const lat = clinic.lat ?? (MEDELLIN.lat + (Math.random() - 0.5) * 0.05);
            const lng = clinic.lng ?? (MEDELLIN.lng + (Math.random() - 0.5) * 0.05);
            const pos = { lat, lng };
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
                content:
                    `<div style="padding:8px;max-width:240px;font-family:sans-serif">
                        <h3 style="font-weight:700;margin:0 0 4px">${clinic.name}</h3>
                        <p style="color:#666;font-size:13px;margin:0 0 6px">${clinic.location}</p>
                        <div style="display:flex;align-items:center;gap:4px;margin-bottom:8px">
                            <span style="color:#fbbf24">★</span>
                            <span style="font-weight:600">${clinic.rating}</span>
                            <span style="color:#999;font-size:12px">(${clinic.reviews} reseñas)</span>
                        </div>
                        <a href="clinica.html?id=${clinic.id}"
                            style="color:#cdb4db;font-weight:600;text-decoration:none">
                            Ver detalles →
                        </a>
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
        if (clinics.length > 0) {
            map.fitBounds(bounds);
            if (clinics.length === 1) map.setZoom(15);
        }
    }
//focus vet (desde) navbar
    function focusClinic(id) {
        const entry = markers.find(m => m.id === id);
        if (!entry) return;
        if (activeInfoWindow) activeInfoWindow.close();
        map.panTo(entry.marker.getPosition());
        map.setZoom(16);
        entry.infoWindow.open(map, entry.marker);
        activeInfoWindow = entry.infoWindow;
    }

    //Callback of Google Maps (need to be global ;p)

    function initMap() {
        map = new google.maps.Map(document.getElementById('mapContainer'), {
            zoom: 13,
            center: MEDELLIN,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            styles: [
                { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
            ]
        });

        placeMarkers(clinicsDB);
        renderCards(clinicsDB);
    }

    // Public API
    return { initMap, focusClinic };

})();

// Google Maps require that the callback need to be a global function
window.initMap = MapPage.initMap;