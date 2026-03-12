// backend/services/geocoder.js
// Convierte direcciones a coordenadas usando Nominatim (OpenStreetMap)
// Incluye caché en memoria para no repetir llamadas por la misma dirección

// Caché simple en memoria: { "dirección": { lat, lng, timestamp } }
const coordsCache = {};

// Tiempo de vida del caché: 24 horas en milisegundos
const CACHE_TTL = 24 * 60 * 60 * 1000;

async function geocodificarDireccion(direccion) {
  // 1. Verificar si ya está en caché y no expiró
  const cached = coordsCache[direccion];
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    console.log(`[Geocoder] Caché hit: ${direccion}`);
    return { lat: cached.lat, lng: cached.lng };
  }

  // 2. Si no está en caché, llamar a Nominatim
  try {
    // Agregar ", Medellín, Colombia" para mejorar precisión de resultados locales
    const query = encodeURIComponent(`${direccion}, Medellín, Colombia`);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

    console.log(`[Geocoder] Consultando Nominatim: ${direccion}`);

    const response = await fetch(url, {
      headers: {
        // Nominatim requiere un User-Agent identificando tu app
        'User-Agent': 'PAWS-VetApp/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim respondió con status ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      console.warn(`[Geocoder] No se encontraron coords para: ${direccion}`);
      return null; // Dirección no encontrada
    }

    const coords = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };

    // 3. Guardar en caché con timestamp
    coordsCache[direccion] = { ...coords, timestamp: Date.now() };
    console.log(`[Geocoder] Coords obtenidas y cacheadas: ${direccion} → ${coords.lat}, ${coords.lng}`);

    return coords;

  } catch (error) {
    console.error(`[Geocoder] Error geocodificando "${direccion}":`, error.message);
    return null; // Si falla, retorna null en vez de crashear
  }
}

// Calcula distancia en km entre dos puntos usando fórmula de Haversine
function calcularDistanciaKm(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Redondear a 1 decimal
}

module.exports = { geocodificarDireccion, calcularDistanciaKm };