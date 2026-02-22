// Controller for navigation
class NavbarController {
  constructor() {
    this.currentPage = window.location.hash.slice(1) || '/';
    this.init();
  }

  init() {
    // Listen to route changes
    window.addEventListener('hashchange', () => {
      this.currentPage = window.location.hash.slice(1) || '/';
      this.updateActiveNavigation();
    });
  }

  // Update active navigation
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

  // Programmatic navigation
  navigateTo(path) {
    window.location.hash = `#${path}`;
  }

  // Get current page
  getCurrentPage() {
    return this.currentPage;
  }

  // Go back
  goBack() {
    window.history.back();
  }
}

// Export single instance
export const navbarController = new NavbarController();