// Controller para la navegación
class NavbarController {
  constructor() {
    this.currentPage = window.location.hash.slice(1) || '/';
    this.init();
  }

  init() {
    // Escuchar cambios de ruta
    window.addEventListener('hashchange', () => {
      this.currentPage = window.location.hash.slice(1) || '/';
      this.updateActiveNavigation();
    });
  }

  // Actualizar navegación activa
  updateActiveNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === this.currentPage || href === `#${this.currentPage}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Navegación programática
  navigateTo(path) {
    window.location.hash = `#${path}`;
  }

  // Obtener página actual
  getCurrentPage() {
    return this.currentPage;
  }

  // Ir atrás
  goBack() {
    window.history.back();
  }
}

// Exportar instancia única
export const navbarController = new NavbarController();