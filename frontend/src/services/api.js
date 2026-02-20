// API Service para VetCare
const API_BASE_URL = 'http://localhost:3000/api'; // Cambiar por tu URL del backend

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método genérico para hacer peticiones
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Métodos específicos para la aplicación
  async getClinics(location = '') {
    return this.request(`/clinics${location ? `?location=${encodeURIComponent(location)}` : ''}`);
  }

  async getClinicById(id) {
    return this.request(`/clinics/${id}`);
  }

  async getPetProfile(petId) {
    return this.request(`/pets/${petId}`);
  }

  async updatePetProfile(petId, data) {
    return this.request(`/pets/${petId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async getUserDashboard(userId) {
    return this.request(`/users/${userId}/dashboard`);
  }

  async bookAppointment(appointmentData) {
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    });
  }

// Método para simular datos (mientras no hay backend)
  getMockClinics(animalType = '') {
  const clinics = [
    {
      id: 1,
      name: 'Paws & Hearts Wellness',
      location: 'Polanco, CDMX',
      rating: 4.9,
      reviewCount: 127,
      emergency: false,
      isSpecialist: true,
      specialties: ['CIRUGÍA', 'RAYOS X', 'DENTAL'],
      animalTypes: ['dog', 'cat', 'bird']
    },
    {
      id: 2,
      name: 'Centro Médico Animal',
      location: 'Santa Fe, CDMX',
      rating: 4.8,
      reviewCount: 89,
      emergency: true,
      isSpecialist: false,
      specialties: ['CARDIOLOGÍA', 'VACUNAS'],
      animalTypes: ['dog', 'cat']
    },
    {
      id: 3,
      name: 'Clínica Especializada en Felinos',
      location: 'Doctores, CDMX',
      rating: 4.9,
      reviewCount: 156,
      emergency: false,
      isSpecialist: true,
      specialties: ['FELINOS', 'COMPORTAMIENTO'],
      animalTypes: ['cat']  // solo atiende gatos
    },
    {
      id: 4,
      name: 'Hospital Veterinario 24/7',
      location: 'Del Valle, CDMX',
      rating: 4.6,
      reviewCount: 312,
      emergency: true,
      isSpecialist: false,
      specialties: ['URGENCIAS', 'CIRUGÍA'],
      animalTypes: ['dog', 'cat', 'exotic']
    },
    {
      id: 5,
      name: 'Aviario & Exóticos del Sur',
      location: 'Coyoacán, CDMX',
      rating: 4.7,
      reviewCount: 74,
      emergency: false,
      isSpecialist: true,
      specialties: ['AVES', 'REPTILES', 'EXÓTICOS'],
      animalTypes: ['bird', 'exotic']  // ni perros ni gatos
    }
  ];

  // Si no hay filtro, devuelve todas
  // Si hay filtro, solo devuelve las que atienden ese animal
  const results = animalType
    ? clinics.filter(clinic => clinic.animalTypes.includes(animalType.toLowerCase()))
    : clinics;

  return Promise.resolve({
    success: true,
    count: results.length,
    filter: animalType || 'all',
    data: results
  });
}
}

// Exportar instancia única
export const apiService = new ApiService();