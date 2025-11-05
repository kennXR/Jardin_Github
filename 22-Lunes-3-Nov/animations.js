// ============================================
// UNTOLD STORIES - Animations
// Inspirado en untold.site
// ============================================

// ============================================
// CURSOR FOLLOW EFFECT
// ============================================

function initCursorFollow() {
    const stage = document.querySelector('.stage');
    if (!stage) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        // Parallax effect on headline elements
        const headlineWords = document.querySelectorAll('.headline-word');
        const headlineImage = document.querySelector('.headline-image-wrapper');
        const headlineIllustration = document.querySelector('.headline-illustration');
        const diagonalImages = document.querySelectorAll('.diagonal-image');

        const centerX = stage.offsetWidth / 2;
        const centerY = stage.offsetHeight / 2;

        const deltaX = (cursorX - centerX) / centerX;
        const deltaY = (cursorY - centerY) / centerY;

        // Headline words subtle movement
        headlineWords.forEach((word, index) => {
            const intensity = (index + 1) * 0.3;
            const moveX = deltaX * intensity * 5;
            const moveY = deltaY * intensity * 5;
            word.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        // Headline image movement
        if (headlineImage) {
            const moveX = deltaX * 8;
            const moveY = deltaY * 8;
            headlineImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }

        // Illustration movement
        if (headlineIllustration) {
            const moveX = deltaX * -6;
            const moveY = deltaY * -6;
            headlineIllustration.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }

        // Diagonal images parallax movement
        diagonalImages.forEach((img, index) => {
            const intensity = (index % 4) * 0.5 + 0.5;
            const moveX = deltaX * intensity * 12;
            const moveY = deltaY * intensity * 12;
            
            // Get base rotation from data attribute or CSS class
            let baseRot = img.getAttribute('data-rotation');
            if (!baseRot) {
                // Extract rotation from class name (e.g., diagonal-img-1 has rotate(-15deg) in CSS)
                const classList = Array.from(img.classList);
                const imgClass = classList.find(c => c.startsWith('diagonal-img-'));
                if (imgClass) {
                    // Map to rotation values from CSS
                    const rotations = {
                        'diagonal-img-1': '-15',
                        'diagonal-img-2': '8',
                        'diagonal-img-3': '-10',
                        'diagonal-img-4': '12',
                        'diagonal-img-5': '-8',
                        'diagonal-img-6': '15',
                        'diagonal-img-7': '-12',
                        'diagonal-img-8': '10'
                    };
                    baseRot = rotations[imgClass] || '0';
                    img.setAttribute('data-rotation', baseRot);
                } else {
                    baseRot = '0';
                }
            }
            
            // Only apply parallax if not hovering (to avoid conflicts)
            if (!img.matches(':hover')) {
                img.style.transform = `rotate(${baseRot}deg) translate(${moveX}px, ${moveY}px)`;
            }
        });

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// ============================================
// HEADLINE WORD INTERACTIONS
// ============================================

function initHeadlineInteractions() {
    const headlineWords = document.querySelectorAll('.headline-word');
    
    headlineWords.forEach(word => {
        word.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.cursor = 'pointer';
        });

        word.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        word.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 68, 68, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
            const stageRect = document.querySelector('.stage').getBoundingClientRect();
            ripple.style.left = (rect.left - stageRect.left + rect.width / 2) + 'px';
            ripple.style.top = (rect.top - stageRect.top + rect.height / 2) + 'px';
            
            document.querySelector('.stage').appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation to CSS dynamically
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// HEADLINE IMAGE INTERACTIONS
// ============================================

function initHeadlineImageInteractions() {
    const headlineImage = document.querySelector('.headline-image-wrapper');
    if (!headlineImage) return;

    headlineImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
        this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.zIndex = '15';
        this.style.cursor = 'pointer';
        
        const img = this.querySelector('.headline-image');
        if (img) {
            img.style.filter = 'brightness(1.1) contrast(1.05)';
        }
    });

    headlineImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.zIndex = '10';
        
        const img = this.querySelector('.headline-image');
        if (img) {
            img.style.filter = 'brightness(1) contrast(1)';
        }
    });
}

// ============================================
// ILLUSTRATION INTERACTIONS
// ============================================

function initIllustrationInteractions() {
    const illustration = document.querySelector('.headline-illustration');
    if (!illustration) return;

    illustration.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) rotate(5deg)';
        this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.cursor = 'pointer';
        
        const svg = this.querySelector('svg');
        if (svg) {
            svg.style.filter = 'drop-shadow(0 4px 8px rgba(255, 68, 68, 0.3))';
        }
    });

    illustration.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        
        const svg = this.querySelector('svg');
        if (svg) {
            svg.style.filter = 'none';
        }
    });
}

// ============================================
// DIAGONAL IMAGES INTERACTIONS
// ============================================

function initDiagonalImageInteractions() {
    const diagonalImages = document.querySelectorAll('.diagonal-image');
    
    // Map rotations from CSS classes
    const rotations = {
        'diagonal-img-1': '-15',
        'diagonal-img-2': '8',
        'diagonal-img-3': '-10',
        'diagonal-img-4': '12',
        'diagonal-img-5': '-8',
        'diagonal-img-6': '15',
        'diagonal-img-7': '-12',
        'diagonal-img-8': '10'
    };
    
    // Store initial rotations
    diagonalImages.forEach(img => {
        const classList = Array.from(img.classList);
        const imgClass = classList.find(c => c.startsWith('diagonal-img-'));
        if (imgClass && rotations[imgClass]) {
            img.setAttribute('data-rotation', rotations[imgClass]);
        } else {
            img.setAttribute('data-rotation', '0');
        }
    });
    
    diagonalImages.forEach((img, index) => {
        const baseRotation = img.getAttribute('data-rotation') || '0';
        
        img.addEventListener('mouseenter', function() {
            this.style.transform = `rotate(0deg) scale(1.15) translateY(-15px)`;
            this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, z-index 0.4s ease';
            this.style.zIndex = '50';
            this.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.3)';
            
            const imgElement = this.querySelector('img');
            if (imgElement) {
                imgElement.style.transform = 'scale(1.1)';
            }
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = `rotate(${baseRotation}) scale(1) translateY(0)`;
            this.style.zIndex = (index + 1).toString();
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            
            const imgElement = this.querySelector('img');
            if (imgElement) {
                imgElement.style.transform = 'scale(1)';
            }
        });

        // Click interaction
        img.addEventListener('click', function() {
            this.style.transform = `rotate(0deg) scale(1.05) translateY(-5px)`;
            setTimeout(() => {
                this.style.transform = `rotate(${baseRotation}) scale(1) translateY(0)`;
            }, 200);
        });
    });
}

// ============================================
// CTA BUTTON INTERACTIONS
// ============================================

function initCTAInteractions() {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) return;

    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(-50%) translateY(-4px) scale(1.02)';
        this.style.boxShadow = '0 8px 24px rgba(255, 68, 68, 0.4)';
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const span = this.querySelector('span');
        if (span) {
            span.style.letterSpacing = '0.08em';
        }
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(255, 68, 68, 0.3)';
        
        const span = this.querySelector('span');
        if (span) {
            span.style.letterSpacing = '0.05em';
        }
    });

    ctaButton.addEventListener('mousedown', function() {
        this.style.transform = 'translateX(-50%) translateY(-2px) scale(0.98)';
    });

    ctaButton.addEventListener('mouseup', function() {
        this.style.transform = 'translateX(-50%) translateY(-4px) scale(1.02)';
    });
}

// ============================================
// NAVIGATION INTERACTIONS
// ============================================

function initNavigationInteractions() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            const letter = this.querySelector('span');
            if (letter) {
                letter.style.transform = 'scale(1.2)';
                letter.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            // Move dot if active
            const dot = this.querySelector('.nav-dot');
            if (dot && this.classList.contains('active')) {
                dot.style.transform = 'scale(1.3)';
                dot.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const letter = this.querySelector('span');
            if (letter) {
                letter.style.transform = 'scale(1)';
            }
            
            const dot = this.querySelector('.nav-dot');
            if (dot) {
                dot.style.transform = 'scale(1)';
            }
        });

        // Click to activate
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            navItems.forEach(nav => {
                const dot = nav.querySelector('.nav-dot');
                if (dot) dot.style.display = 'none';
            });
            
            // Add active to clicked
            this.classList.add('active');
            const dot = this.querySelector('.nav-dot');
            if (!dot) {
                const newDot = document.createElement('div');
                newDot.className = 'nav-dot';
                this.appendChild(newDot);
            } else {
                dot.style.display = 'block';
            }
        });
    });
}

// ============================================
// LANGUAGE SELECTOR INTERACTIONS
// ============================================

function initLanguageSelectorInteractions() {
    const languageSelector = document.querySelector('.language-selector');
    if (!languageSelector) return;

    let isOpen = false;

    languageSelector.addEventListener('mouseenter', function() {
        this.style.opacity = '0.8';
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'all 0.3s ease';
        
        const chevron = this.querySelector('.chevron');
        if (chevron) {
            chevron.style.transform = 'rotate(180deg)';
            chevron.style.transition = 'transform 0.3s ease';
        }
    });
    
    languageSelector.addEventListener('mouseleave', function() {
        if (!isOpen) {
            this.style.opacity = '1';
            this.style.transform = 'translateY(0)';
            
            const chevron = this.querySelector('.chevron');
            if (chevron) {
                chevron.style.transform = 'rotate(0deg)';
            }
        }
    });

    languageSelector.addEventListener('click', function(e) {
        e.preventDefault();
        isOpen = !isOpen;
        
        // Toggle language (simple toggle for demo)
        const span = this.querySelector('span');
        if (span) {
            span.textContent = isOpen ? '(ES)' : '(EN)';
        }
    });
}

// ============================================
// HAMBURGER BUTTON INTERACTIONS
// ============================================

function initHamburgerInteractions() {
    const hamburgerButton = document.querySelector('.hamburger-button');
    if (!hamburgerButton) return;

    let isOpen = false;

    hamburgerButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(90deg)';
        this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    hamburgerButton.addEventListener('mouseleave', function() {
        if (!isOpen) {
            this.style.transform = 'scale(1) rotate(0deg)';
        }
    });

    hamburgerButton.addEventListener('click', function() {
        isOpen = !isOpen;
        
        const spans = this.querySelectorAll('span');
        if (isOpen) {
            // Transform to X
            this.style.transform = 'scale(1.1) rotate(90deg)';
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            // Back to hamburger
            this.style.transform = 'scale(1) rotate(0deg)';
            spans[0].style.transform = 'rotate(0deg) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0deg) translate(0, 0)';
        }
        
        spans.forEach(span => {
            span.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// ============================================
// SCROLL INDICATOR INTERACTIONS
// ============================================

function initScrollIndicatorInteractions() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollArrow || !scrollIndicator) return;

    // Animate arrow
    function animateArrow() {
        scrollArrow.style.transform = 'translateY(0)';
        scrollArrow.style.transition = 'transform 0.6s ease-in-out';
        
        setTimeout(() => {
            scrollArrow.style.transform = 'translateY(8px)';
        }, 300);
    }

    setInterval(animateArrow, 1200);

    scrollArrow.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(5px) scale(1.1)';
        this.style.background = 'rgba(255, 68, 68, 0.9)';
        this.style.transition = 'all 0.3s ease';
    });

    scrollArrow.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.background = '#ff4444';
    });

    scrollArrow.addEventListener('click', function() {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// ============================================
// SMOOTH FADE IN ANIMATIONS
// ============================================

function initFadeInAnimations() {
    const elements = [
        { selector: '.header', delay: 0 },
        { selector: '.headline-container', delay: 200 },
        { selector: '.diagonal-gallery', delay: 400 },
        { selector: '.explanatory-text', delay: 600 },
        { selector: '.cta-button', delay: 800 },
        { selector: '.scroll-indicator', delay: 1000 }
    ];

    elements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Set initial transform based on element
            if (selector === '.scroll-indicator') {
                element.style.transform = 'translateY(-50%) translateX(30px)';
            } else if (selector === '.headline-container') {
                element.style.transform = 'translate(-50%, -50%) translateY(40px)';
            } else if (selector === '.diagonal-gallery') {
                // Stagger animation for diagonal images
                const diagonalImages = element.querySelectorAll('.diagonal-image');
                const rotations = {
                    'diagonal-img-1': '-15',
                    'diagonal-img-2': '8',
                    'diagonal-img-3': '-10',
                    'diagonal-img-4': '12',
                    'diagonal-img-5': '-8',
                    'diagonal-img-6': '15',
                    'diagonal-img-7': '-12',
                    'diagonal-img-8': '10'
                };
                
                diagonalImages.forEach((img, idx) => {
                    const classList = Array.from(img.classList);
                    const imgClass = classList.find(c => c.startsWith('diagonal-img-'));
                    const baseRot = (imgClass && rotations[imgClass]) ? rotations[imgClass] : '0';
                    
                    img.style.opacity = '0';
                    img.style.transform = `rotate(${baseRot}deg) scale(0.8) translateY(30px)`;
                    img.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.style.transform = `rotate(${baseRot}deg) scale(1) translateY(0)`;
                        img.setAttribute('data-rotation', baseRot);
                    }, delay + (idx * 100));
                });
                return; // Skip default animation for gallery
            } else if (selector === '.explanatory-text') {
                element.style.transform = 'translateX(40px)';
            } else if (selector === '.cta-button') {
                element.style.transform = 'translateX(-50%) translateY(30px)';
            } else {
                element.style.transform = 'translateY(-20px)';
            }
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = selector === '.scroll-indicator' 
                    ? 'translateY(-50%) translateX(0)' 
                    : selector === '.headline-container'
                    ? 'translate(-50%, -50%)'
                    : selector === '.cta-button'
                    ? 'translateX(-50%)'
                    : 'translate(0)';
            }, delay);
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactions
    initCursorFollow();
    initHeadlineInteractions();
    initHeadlineImageInteractions();
    initIllustrationInteractions();
    initDiagonalImageInteractions();
    initCTAInteractions();
    initNavigationInteractions();
    initLanguageSelectorInteractions();
    initHamburgerInteractions();
    initScrollIndicatorInteractions();
    initFadeInAnimations();
    
    // Add smooth transitions to headline words
    const headlineWords = document.querySelectorAll('.headline-word');
    headlineWords.forEach(word => {
        word.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});