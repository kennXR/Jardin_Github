// ============================================
// UNTOLD STORIES - Animations
// ============================================

// ============================================
// SMOOTH SCROLL INDICATOR
// ============================================

function initScrollIndicator() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (!scrollArrow) return;

    scrollArrow.addEventListener('click', function() {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// ============================================
// HOVER EFFECTS
// ============================================

function initHoverEffects() {
    // CTA Button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-50%) translateY(-3px)';
            this.style.boxShadow = '0 6px 16px rgba(255, 68, 68, 0.4)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(-50%) translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(255, 68, 68, 0.3)';
        });
    }

    // Hamburger button
    const hamburgerButton = document.querySelector('.hamburger-button');
    if (hamburgerButton) {
        hamburgerButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        hamburgerButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.opacity = '1';
            }
        });
    });

    // Language selector
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        languageSelector.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    }
}

// ============================================
// FADE IN ANIMATIONS
// ============================================

function initFadeInAnimations() {
    const elements = [
        '.header',
        '.headline-container',
        '.image-stack',
        '.explanatory-text',
        '.cta-button',
        '.scroll-indicator'
    ];

    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = selector === '.scroll-indicator' 
                ? 'translateY(-50%) translateX(20px)' 
                : selector === '.headline-container'
                ? 'translate(-50%, -50%) translateY(30px)'
                : selector === '.image-stack'
                ? 'translateX(-30px)'
                : selector === '.explanatory-text'
                ? 'translateX(30px)'
                : selector === '.cta-button'
                ? 'translateX(-50%) translateY(20px)'
                : 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = selector === '.scroll-indicator' 
                    ? 'translateY(-50%) translateX(0)' 
                    : selector === '.headline-container'
                    ? 'translate(-50%, -50%)'
                    : selector === '.cta-button'
                    ? 'translateX(-50%)'
                    : 'translate(0)';
            }, index * 150);
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initScrollIndicator();
    initHoverEffects();
    initFadeInAnimations();
});