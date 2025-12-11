// ============================================
// Main Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.getElementById('enterButton');
    const mainNav = document.getElementById('mainNav');
    const closeButton = document.getElementById('closeButton');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Enter button click
    enterButton.addEventListener('click', () => {
        mainNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close button click
    closeButton.addEventListener('click', () => {
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking outside
    mainNav.addEventListener('click', (e) => {
        if (e.target === mainNav) {
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Nav items click handlers (you can add navigation logic here)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const label = item.querySelector('.nav-label').textContent;
            console.log(`Navigate to: ${label}`);
            // Add your navigation logic here
        });
    });
    
    // Sound toggle (placeholder - you can add actual sound logic)
    let soundEnabled = false;
    document.addEventListener('click', () => {
        if (!soundEnabled) {
            soundEnabled = true;
            console.log('Sound enabled');
            // Add sound logic here if needed
        }
    });
    
    // Keyboard ESC to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

