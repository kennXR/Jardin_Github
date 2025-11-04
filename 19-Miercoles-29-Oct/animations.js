// Animaciones inspiradas en JAMAREA - INTRO SEQUENCE

// Función de intro animado como JAMAREA
function initIntroSequence() {
    // Mapeo de transforms originales que deben preservarse
    const originalTransforms = {
        '.project-title': 'translateX(-50%)',
        '.center-card': 'translateX(-50%)',
        '.kenne-reth': 'translateX(-50%)',
        '.agency': 'translateX(-50%)'
    };

    // Ocultar todos los elementos inicialmente
    const elementsToHide = [
        '.topbar',
        '.project-title',
        '.thumb',
        '.center-card',
        '.mid-label',
        '.kenne-reth',
        '.agency',
        '.corner-bubble'
    ];
    
    elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.opacity = '0';
            // Preservar transform original si existe
            const originalTransform = originalTransforms[selector];
            if (originalTransform) {
                el.style.transform = originalTransform + ' translateY(20px)';
            } else {
                el.style.transform = 'translateY(20px)';
            }
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
    });

    // Secuencia de aparición 
    const sequence = [
        { selector: '.topbar', delay: 0 },
        { selector: '.giants', delay: 200 },
        { selector: '.project-title', delay: 600 },
        { selector: '.thumb', delay: 1000, stagger: 80 },
        { selector: '.center-card', delay: 1600 },
        { selector: '.mid-label', delay: 2000 },
        { selector: '.kenne-reth', delay: 2400 },
        { selector: '.agency', delay: 2800 },
        { selector: '.corner-bubble', delay: 3200 }
    ];

    // Mapa de opacidades originales para las miniaturas
    const thumbOpacities = {
        't1': 0.35,
        't2': 0.45,
        't3': 0.30,
        't4': 0.35,
        't5': 0.55,
        't6': 0.55
    };

    sequence.forEach(({ selector, delay, stagger }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                // Para miniaturas, restaurar opacidad original
                if (selector === '.thumb') {
                    const className = Array.from(el.classList).find(cls => cls.startsWith('t'));
                    const originalOpacity = thumbOpacities[className] || 0.4;
                    el.style.opacity = originalOpacity;
                } else {
                    el.style.opacity = '1';
                }
                // Restaurar transform original si existe
                const originalTransform = originalTransforms[selector];
                if (originalTransform) {
                    el.style.transform = originalTransform;
                } else {
                    el.style.transform = 'translateY(0)';
                }
            }, delay + (stagger ? index * stagger : 0));
        });
    });
    
    // Aplicar animación especial a giants después de un pequeño delay
    setTimeout(() => {
        const giants = document.querySelector('.giants');
        if (giants) {
            giants.style.opacity = '1';
            giants.style.animation = 'introGiantText 1.2s ease-out forwards';
        }
    }, 200);
}

// Animación de opacidad en las miniaturas
function initThumbOpacityAnimations() {
    const thumbs = document.querySelectorAll('.thumb');
    const opacityMap = {
        't1': 0.35,
        't2': 0.45,
        't3': 0.30,
        't4': 0.35,
        't5': 0.55,
        't6': 0.55
    };
    
    thumbs.forEach((thumb, index) => {
        const className = Array.from(thumb.classList).find(cls => cls.startsWith('t'));
        const baseOpacity = opacityMap[className] || 0.4;
        thumb.style.setProperty('--base-opacity', baseOpacity);
        thumb.style.animation = `pulseOpacity ${2.5 + index * 0.2}s ease-in-out infinite`;
        thumb.style.animationDelay = `${index * 0.15}s`;
    });
}

// Animación de color en la tarjeta central
function initCenterCardColorAnimation() {
    const centerCard = document.querySelector('.center-card img');
    if (centerCard) {
        centerCard.style.transition = 'filter 0.8s ease-in-out';
        centerCard.style.animation = 'colorShift 4s ease-in-out infinite';
    }
}

// Hover effects para las miniaturas
function initThumbHovers() {
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach(thumb => {
        thumb.addEventListener('mouseenter', function() {
            this.style.filter = 'grayscale(0%) brightness(1.1) hue-rotate(180deg)';
            this.style.opacity = '0.9';
            this.style.transition = 'all 0.4s ease';
        });
        
        thumb.addEventListener('mouseleave', function() {
            const className = Array.from(this.classList).find(cls => cls.startsWith('t'));
            const opacityMap = {
                't1': 0.35,
                't2': 0.45,
                't3': 0.30,
                't4': 0.35,
                't5': 0.55,
                't6': 0.55
            };
            const originalOpacity = opacityMap[className] || 0.4;
            this.style.filter = 'grayscale(100%) brightness(1.15)';
            this.style.opacity = originalOpacity;
        });
    });
}

// Hover effect para la tarjeta central
function initCenterCardHover() {
    const centerCard = document.querySelector('.center-card');
    const centerImg = document.querySelector('.center-card img');
    
    if (centerCard && centerImg) {
        centerCard.addEventListener('mouseenter', function() {
            centerImg.style.filter = 'hue-rotate(90deg) saturate(1.3)';
            centerImg.style.transform = 'scale(1.05)';
            centerImg.style.transition = 'all 0.5s ease';
        });
        
        centerCard.addEventListener('mouseleave', function() {
            centerImg.style.filter = 'none';
            centerImg.style.transform = 'scale(1)';
        });
    }
}

// Animación de textos que aparecen y desaparecen (después del intro)
function initTextAnimations() {
    const textsToAnimate = [
        { selector: '.project-title', duration: 4 },
        { selector: '.kenne-reth', duration: 5 },
        { selector: '.agency', duration: 4.5 },
        { selector: '.mid-label', duration: 3.5 }
    ];

    textsToAnimate.forEach((config, index) => {
        const elements = document.querySelectorAll(config.selector);
        elements.forEach((el, elIndex) => {
            // Iniciar después del intro
            setTimeout(() => {
                el.style.animation = `fadeInOut ${config.duration}s ease-in-out infinite`;
                el.style.animationDelay = `${index * 0.4 + elIndex * 0.2}s`;
            }, 5000);
        });
    });
}

// Inicializar todas las animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Primero el intro
    initIntroSequence();
    
    // Luego las animaciones continuas (después de 4 segundos)
    setTimeout(() => {
        initTextAnimations();
        initThumbOpacityAnimations();
        initCenterCardColorAnimation();
        initThumbHovers();
        initCenterCardHover();
    }, 4000);
});

