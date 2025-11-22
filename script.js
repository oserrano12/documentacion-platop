// Smooth scroll para navegación
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del scroll suave
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar la página
                history.pushState(null, null, targetId);
            }
        });
    });

    // Observer para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animación escalonada para los features
                if (entry.target.id === 'introduccion') {
                    animateFeatures();
                }
                
                // Animación escalonada para los componentes
                if (entry.target.id === 'componentes') {
                    animateComponents();
                }
            }
        });
    }, observerOptions);

    // Observar todas las secciones principales
    document.querySelectorAll('.info-card').forEach(el => {
        observer.observe(el);
    });

    // Efecto de hover para las tarjetas de equipo
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(11, 74, 117, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(11, 74, 117, 0.1)';
        });
    });

    // Botón de "volver arriba" dinámico
    createBackToTopButton();
});

// Función para animar features de manera escalonada
function animateFeatures() {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Función para animar componentes de manera escalonada
function animateComponents() {
    const components = document.querySelectorAll('.component');
    components.forEach((component, index) => {
        setTimeout(() => {
            component.style.opacity = '1';
            component.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Función para crear botón "Volver arriba"
function createBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Volver al inicio');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--uts-azul);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(11, 74, 117, 0.3);
        z-index: 1000;
    `;

    document.body.appendChild(backToTopButton);

    // Mostrar/ocultar botón basado en scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // Acción del botón
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efecto hover
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--uts-azul-claro)';
        this.style.transform = 'scale(1.1)';
    });

    backToTopButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--uts-azul)';
        this.style.transform = 'scale(1)';
    });
}

// Cargar estados iniciales de animación
window.addEventListener('load', function() {
    // Inicializar opacidades para animación
    document.querySelectorAll('.feature').forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    document.querySelectorAll('.component').forEach(component => {
        component.style.opacity = '0';
        component.style.transform = 'translateY(20px)';
        component.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});