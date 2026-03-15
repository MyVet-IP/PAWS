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
  getMockClinics() {
    return Promise.resolve([
      {
        id: 1,
        name: 'Paws & Hearts Wellness',
        location: 'Polanco, Ciudad de México',
        rating: 4.9,
        specialties: ['CIRUGÍA', 'RAYOS X', 'DENTAL'],
        image: './frontend/assets/images/lllll.jpg'
      },
      {
        id: 2,
        name: 'Centro Médico Animal',
        location: 'Santa Fe, Ciudad de México',
        rating: 4.8,
        specialties: ['CARDIOLOGÍA', 'VACUNAS'],
        image: './frontend/assets/images/lllll.jpg',
        emergency: true
      },
      {
        id: 3,
        name: 'San Francisco Hospital',
        location: 'Condesa, Ciudad de México',
        rating: 5.0,
        specialties: ['LABORATORIO', 'FISIOTERAPIA'],
        image: './frontend/assets/images/lllll.jpg'
      }
    ]);
  }
}

// Exportar instancia única
export const apiService = new ApiService();