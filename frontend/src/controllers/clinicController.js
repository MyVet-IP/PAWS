const animalFilters = ['dog', 'cat', 'exotic'];

function filterClinics(filter) {
    const allCards = document.querySelectorAll('.clinic-card');
    const countEl  = document.getElementById('results-count');
    let visible = 0;

    allCards.forEach(card => {
    const animals = JSON.parse(card.dataset.animals || '[]');
    const show = filter === 'all' || !animalFilters.includes(filter) || animals.includes(filter);
    card.style.display = show ? 'block' : 'none';
    if (show) visible++;
    });

    countEl.textContent = visible;
}

function searchClinicsHere() {
    const location = document.getElementById('clinic-search').value;
    if (location.trim()) {
    window.location.hash = `#/clinicas?location=${encodeURIComponent(location)}`;
    } else {
    window.location.hash = '#/clinicas';
    }
}

export function ClinicsController() {
  // Filters
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        filterClinics(e.target.dataset.filter);
    }
    });

  // search w enter
    document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('clinic-search') === document.activeElement) {
        searchClinicsHere();
    }
    });
}