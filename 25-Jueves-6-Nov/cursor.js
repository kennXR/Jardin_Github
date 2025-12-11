// ============================================
// Cursor Circle Follow
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const cursorCircle = document.getElementById('cursorCircle');
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;
    
    // Smoothing factor (0-1), lower = smoother but slower
    const smoothing = 0.15;
    
    // Update mouse position
    function updateMousePosition(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    
    // Animate circle to mouse position with easing
    function animateCircle() {
        // Calculate the difference between target and current position
        const dx = mouseX - circleX;
        const dy = mouseY - circleY;
        
        // Apply easing (lerp)
        circleX += dx * smoothing;
        circleY += dy * smoothing;
        
        // Update circle position
        cursorCircle.style.left = circleX + 'px';
        cursorCircle.style.top = circleY + 'px';
        
        // Continue animation
        requestAnimationFrame(animateCircle);
    }
    
    // Initialize circle position
    function initCircle() {
        circleX = window.innerWidth / 2;
        circleY = window.innerHeight / 2;
        cursorCircle.style.left = circleX + 'px';
        cursorCircle.style.top = circleY + 'px';
    }
    
    // Check for interactive elements
    function checkHover(e) {
        const target = e.target;
        const isButton = target.tagName === 'BUTTON' || 
                        target.classList.contains('enter-button') ||
                        target.classList.contains('nav-item') ||
                        target.closest('.nav-item') ||
                        target.closest('button');
        
        const isLink = target.tagName === 'A' || target.closest('a');
        
        if (isButton || isLink) {
            cursorCircle.classList.add('hover');
            if (target.classList.contains('enter-button') || target.closest('.enter-button')) {
                cursorCircle.classList.add('button-hover');
            }
        } else {
            cursorCircle.classList.remove('hover', 'button-hover');
        }
    }
    
    // Event listeners
    document.addEventListener('mousemove', (e) => {
        updateMousePosition(e);
        checkHover(e);
    });
    
    // Initialize
    initCircle();
    animateCircle();
    
    // Hide cursor circle on mobile/tablet
    if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) {
        cursorCircle.style.display = 'none';
        document.body.style.cursor = 'default';
    }
});

