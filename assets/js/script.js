// Menu mobile
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Animation au défilement
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementPosition < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Fermer le menu mobile si ouvert
            if (navLinks.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Carte Leaflet
function initMap() {
    const map = L.map('map').setView([48.8566, 2.3522], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([48.8566, 2.3522]).addTo(map)
        .bindPopup('Nos bureaux à Paris')
        .openPopup();
}

// Initialiser la carte lorsque la section est visible
function initMapWhenVisible() {
    const contactSection = document.getElementById('contact');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initMap();
            observer.disconnect();
        }
    }, { threshold: 0.1 });
    
    observer.observe(contactSection);
}

document.addEventListener('DOMContentLoaded', initMapWhenVisible);

// Effet de parallaxe sur l'image du header
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const headerOverlay = document.querySelector('.header-overlay');
    
    if (headerOverlay) {
        headerOverlay.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});