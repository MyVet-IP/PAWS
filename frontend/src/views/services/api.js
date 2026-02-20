const API_BASE_URL = 'http://localhost:3000/api'; // Cambiar por la URL del backend

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

  
  async getAllClientes() {
    return this.request('/clientes');
  }

  async getClienteById(id) {
    return this.request(`/clientes/${id}`);
  }

  async createCliente(nombre, email, password, telefono = null) {
    return this.request('/clientes', {
      method: 'POST',
      body: JSON.stringify({ nombre, email, password, telefono })
    });
  }

  async updateCliente(id, data) {
    return this.request(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  
  async getClinics(location = '') {
    return this.request(`/clinics${location ? `?location=${encodeURIComponent(location)}` : ''}`);
  }

  async getClinicById(id) {
    return this.request(`/clinics/${id}`);
  }

  async createVeterinaria(nombre, direccion, telefono, estado, rating, imagen) {
    return this.request('/veterinarias', {
      method: 'POST',
      body: JSON.stringify({ nombre, direccion, telefono, estado, rating, imagen })
    });
  }

  
  async getAllServicios() {
    return this.request('/servicios');
  }

  async createServicio(nombre, descripcion) {
    return this.request('/servicios', {
      method: 'POST',
      body: JSON.stringify({ nombre, descripcion })
    });
  }

  
  async getAllMascotas() {
    return this.request('/mascotas');
  }

  async getPetProfile(petId) {
    return this.request(`/pets/${petId}`);
  }

  async createMascota(nombre, especie, raza, edad, id_cliente) {
    return this.request('/mascotas', {
      method: 'POST',
      body: JSON.stringify({ nombre, especie, raza, edad, id_cliente })
    });
  }

  async updatePetProfile(petId, data) {
    return this.request(`/pets/${petId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  
  async getAllVisitas() {
    return this.request('/visitas');
  }

  async getVisitasByMascota(id_mascota) {
    return this.request(`/visitas/mascota/${id_mascota}`);
  }

  async createVisita(diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria) {
    return this.request('/visitas', {
      method: 'POST',
      body: JSON.stringify({ diagnostico, medicamentos, chequeos, id_mascota, id_veterinaria })
    });
  }

  
  async getAllEmergencias() {
    return this.request('/emergencias');
  }

  async createEmergencia(descripcion, id_mascota, id_veterinaria) {
    return this.request('/emergencias', {
      method: 'POST',
      body: JSON.stringify({ descripcion, id_mascota, id_veterinaria })
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

  
  async checkHealth() {
    return this.request('/health');
  }

  // Método para simular datos
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

export const apiService = new ApiService();