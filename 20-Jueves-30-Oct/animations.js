// ============================================
// ETHICAL LIFE - Parallax Animations
// ============================================

// Función de intro (opcional, puede eliminarse si no se necesita)
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
        // Establecer la opacidad base para la animación CSS
        thumb.style.setProperty('--base-opacity', baseOpacity);
        // Mantener la opacidad original constante (sin animación de pulso)
        thumb.style.opacity = baseOpacity;
        // No aplicar animación de pulso para mantener opacidad constante
        // thumb.style.animation = `pulseOpacity ${2.5 + index * 0.2}s ease-in-out infinite`;
        // thumb.style.animationDelay = `${index * 0.15}s`;
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

// ============================================
// PARALLAX EFFECT - Imágenes PNG que reaccionan al mouse
// ============================================

function initParallaxEffect() {
    const stage = document.querySelector('.stage');
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    if (!stage || parallaxLayers.length === 0) {
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let isMouseInStage = false;
    let animationFrameId = null;
    
    // Función para obtener el centro del stage
    function getStageCenter() {
        const stageRect = stage.getBoundingClientRect();
        return {
            centerX: stageRect.left + stageRect.width / 2,
            centerY: stageRect.top + stageRect.height / 2,
            width: stageRect.width,
            height: stageRect.height
        };
    }
    
    // Función para actualizar el parallax usando requestAnimationFrame
    function updateParallax() {
        if (!isMouseInStage) {
            animationFrameId = null;
            return;
        }
        
        const stageCenter = getStageCenter();
        
        // Calcular el desplazamiento desde el centro (-1 a 1)
        const deltaX = (mouseX - stageCenter.centerX) / (stageCenter.width / 2);
        const deltaY = (mouseY - stageCenter.centerY) / (stageCenter.height / 2);
        
        // Intensidad del movimiento (ajustable)
        const maxMove = 50; // píxeles máximo de movimiento
        
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
            const rotation = parseFloat(layer.getAttribute('data-rotation')) || 0;
            
            // Calcular el desplazamiento basado en la velocidad de la capa
            const moveX = deltaX * maxMove * speed;
            const moveY = deltaY * maxMove * speed;
            
            // Aplicar transformación combinando translate con rotación
            layer.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
        });
        
        animationFrameId = requestAnimationFrame(updateParallax);
    }
    
    // Función para actualizar la posición del mouse
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!animationFrameId && isMouseInStage) {
            animationFrameId = requestAnimationFrame(updateParallax);
        }
    }
    
    // Función cuando el mouse entra al stage
    function handleMouseEnter(e) {
        isMouseInStage = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Agregar clase para desactivar transición durante movimiento activo
        const parallaxContainer = document.querySelector('.parallax-container');
        if (parallaxContainer) {
            parallaxContainer.classList.add('active');
        }
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateParallax);
        }
    }
    
    // Función para resetear cuando el mouse sale del stage
    function resetParallax() {
        isMouseInStage = false;
        // Remover clase para activar transición suave al resetear
        const parallaxContainer = document.querySelector('.parallax-container');
        if (parallaxContainer) {
            parallaxContainer.classList.remove('active');
        }
        parallaxLayers.forEach(layer => {
            const rotation = parseFloat(layer.getAttribute('data-rotation')) || 0;
            layer.style.transform = `translate(0, 0) rotate(${rotation}deg)`;
        });
    }
    
    // Event listeners
    stage.addEventListener('mousemove', handleMouseMove);
    stage.addEventListener('mouseleave', resetParallax);
    stage.addEventListener('mouseenter', handleMouseEnter);
    
    // Actualizar centro cuando se redimensiona la ventana
    window.addEventListener('resize', function() {
        if (isMouseInStage && !animationFrameId) {
            animationFrameId = requestAnimationFrame(updateParallax);
        }
    });
}

// Inicializar todas las animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar parallax - efecto principal
    initParallaxEffect();
    
    // Opcional: agregar animaciones suaves de entrada
    const elements = document.querySelectorAll('.header, .bg-text, .product-container, .footer');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

