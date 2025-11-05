// ============================================
// THE BEST YOU - Parallax Animations
// ============================================

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
            // Restaurar posición inicial (sin desplazamiento parallax)
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

// ============================================
// HOVER EFFECTS - Imágenes parallax
// ============================================

function initParallaxImageHovers() {
    const parallaxImages = document.querySelectorAll('.parallax-img');
    
    parallaxImages.forEach(img => {
        const layer = img.closest('.parallax-layer');
        
        // Efecto al pasar el mouse sobre la imagen
        layer.addEventListener('mouseenter', function() {
            img.style.transition = 'all 0.3s ease';
            img.style.transform = 'scale(1.1)';
            img.style.filter = 'brightness(1.2) blur(0px)';
            img.style.zIndex = '10';
            layer.style.zIndex = '10';
        });
        
        // Restaurar cuando el mouse sale
        layer.addEventListener('mouseleave', function() {
            const originalBlur = layer.classList.contains('layer-far') ? '10px' :
                                layer.classList.contains('layer-mid') ? '4px' :
                                '1px';
            img.style.transition = 'all 0.4s ease';
            img.style.transform = 'scale(1)';
            
            // Restaurar filtro original según la capa
            if (layer.classList.contains('dalia-far-1')) {
                img.style.filter = 'blur(10px) brightness(1.1)';
            } else if (layer.classList.contains('dalia-far-2')) {
                img.style.filter = 'blur(12px) brightness(1.2)';
            } else if (layer.classList.contains('dalia-far-3')) {
                img.style.filter = 'blur(9px) brightness(1.15)';
            } else if (layer.classList.contains('dalia-mid-1')) {
                img.style.filter = 'blur(4px)';
            } else if (layer.classList.contains('dalia-mid-2')) {
                img.style.filter = 'blur(3px)';
            } else if (layer.classList.contains('dalia-mid-3')) {
                img.style.filter = 'blur(4px)';
            } else if (layer.classList.contains('dalia-mid-4')) {
                img.style.filter = 'blur(2px)';
            } else {
                img.style.filter = 'blur(1px)';
            }
            
            img.style.zIndex = '1';
            layer.style.zIndex = '';
        });
    });
}

// ============================================
// HOVER EFFECTS - Botones
// ============================================

function initButtonHovers() {
    // Botón Next
    const nextButton = document.querySelector('.next-button');
    if (nextButton) {
        nextButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
            this.style.transition = 'all 0.3s ease';
            
            const icon = this.querySelector('.button-icon');
            if (icon) {
                icon.style.transform = 'rotate(90deg) scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        nextButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
            this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            
            const icon = this.querySelector('.button-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    }
    
    // Botón de acción (action-button)
    const actionButton = document.querySelector('.action-button');
    if (actionButton) {
        actionButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(5deg)';
            this.style.background = 'rgba(255, 255, 255, 0.35)';
            this.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.4)';
        });
        
        actionButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            this.style.boxShadow = 'none';
        });
    }
    
    // Selector de idioma
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        languageSelector.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Tarjetas del carrusel
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('card-center') 
                ? 'scale(1.05) translateY(-5px)' 
                : this.classList.contains('card-left')
                    ? 'translateX(-25px) scale(0.95) translateY(-5px)'
                    : 'translateX(25px) scale(0.95) translateY(-5px)';
            this.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.3)';
            this.style.zIndex = '5';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('card-center') 
                ? 'scale(1)' 
                : this.classList.contains('card-left')
                    ? 'translateX(-30px) scale(0.9)'
                    : 'translateX(30px) scale(0.9)';
            this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)';
            this.style.zIndex = '';
        });
    });
}

// Inicializar todas las animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar las rotaciones iniciales de las capas parallax
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach(layer => {
        const rotation = parseFloat(layer.getAttribute('data-rotation')) || 0;
        // Aplicar rotación inicial sin desplazamiento
        layer.style.transform = `translate(0, 0) rotate(${rotation}deg)`;
    });
    
    // Inicializar parallax - efecto principal
    initParallaxEffect();
    
    // Inicializar efectos hover para imágenes parallax
    initParallaxImageHovers();
    
    // Inicializar efectos hover para botones
    initButtonHovers();
    
    // Animaciones suaves de entrada para los elementos
    const elements = document.querySelectorAll('.header, .content-container, .product-container, .footer, .ticket-graphic');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Animación especial para las tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            card.style.opacity = card.classList.contains('card-center') ? '1' : '0.7';
            card.style.transform = card.classList.contains('card-center') 
                ? 'scale(1)' 
                : card.classList.contains('card-left')
                    ? 'translateX(-30px) scale(0.9)'
                    : 'translateX(30px) scale(0.9)';
        }, 800 + index * 100);
    });
});
