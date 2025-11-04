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
