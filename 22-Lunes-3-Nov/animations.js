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

        // Diagonal images parallax movement - only when expanded
        const diagonalGallery = document.getElementById('diagonalGallery');
        if (diagonalGallery && diagonalGallery.classList.contains('expanded')) {
            diagonalImages.forEach((img, index) => {
                const intensity = (index % 4) * 0.5 + 0.5;
                const moveX = deltaX * intensity * 12;
                const moveY = deltaY * intensity * 12;
                
                // Get base rotation from data attribute
                const baseRot = img.getAttribute('data-rotation') || '0';
                
                // Only apply parallax if not hovering (to avoid conflicts)
                if (!img.matches(':hover')) {
                    img.style.transform = `rotate(${baseRot}deg) translate(${moveX}px, ${moveY}px)`;
                }
            });
        }

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
    const diagonalGallery = document.getElementById('diagonalGallery');
    const diagonalImages = document.querySelectorAll('.diagonal-image');
    
    if (!diagonalGallery) {
        console.warn('Diagonal gallery not found');
        return;
    }
    
    if (diagonalImages.length === 0) {
        console.warn('No diagonal images found');
        return;
    }
    
    console.log(`Initializing interactions for ${diagonalImages.length} images`);
    
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
    
    // Click to expand/collapse
    diagonalImages.forEach((img, index) => {
        // Ensure pointer events are enabled
        img.style.pointerEvents = 'auto';
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log('Image clicked, index:', index);
            
            if (!diagonalGallery.classList.contains('expanded')) {
                // Expand - deploy images
                diagonalGallery.classList.add('expanded');
                
                // Add stagger delay for smooth animation
                diagonalImages.forEach((img, idx) => {
                    // Set transition for all properties including size
                    img.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease, width 0.8s ease, height 0.8s ease, top 0.8s ease, left 0.8s ease, bottom 0.8s ease';
                    
                    // Ensure images return to full size
                    setTimeout(() => {
                        img.style.width = '180px';
                        img.style.height = '240px';
                        img.style.border = 'none';
                    }, idx * 50);
                });
            } else {
                // Collapse - return to grouped state
                diagonalGallery.classList.remove('expanded');
                
                // Add stagger delay for smooth collapse
                diagonalImages.forEach((img, idx) => {
                    // Set transition for all properties including size
                    img.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease, width 0.8s ease, height 0.8s ease, top 0.8s ease, left 0.8s ease, bottom 0.8s ease';
                    
                    // Return to small size and bottom-left position
                    setTimeout(() => {
                        img.style.width = '140px';
                        img.style.height = '190px';
                        img.style.bottom = '20%';
                        img.style.left = '8%';
                        img.style.top = 'auto';
                        
                        // Add border back to first image
                        if (idx === 0) {
                            img.style.border = '2px solid #ff4444';
                        } else {
                            img.style.border = 'none';
                        }
                    }, idx * 30);
                });
            }
        });
    });
    
    // Hover effects - both when grouped and expanded
    diagonalImages.forEach((img, index) => {
        const baseRotation = img.getAttribute('data-rotation') || '0';
        
        // Ensure pointer events and cursor
        img.style.pointerEvents = 'auto';
        img.style.cursor = 'pointer';
        
        img.addEventListener('mouseenter', function() {
            console.log('Mouse enter on image:', index);
            if (diagonalGallery.classList.contains('expanded')) {
                // Hover when expanded
                this.style.transform = `rotate(0deg) scale(1.15) translateY(-15px)`;
                this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, z-index 0.4s ease';
                this.style.zIndex = '50';
                this.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.3)';
                
                const imgElement = this.querySelector('img');
                if (imgElement) {
                    imgElement.style.transform = 'scale(1.1)';
                }
            } else {
                // Hover when grouped - more visible interaction
                this.style.transform = 'translate(0, -8px) rotate(0deg) scale(1.08)';
                this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, z-index 0.3s ease';
                this.style.zIndex = '25';
                this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.35)';
                this.style.cursor = 'pointer';
                
                const imgElement = this.querySelector('img');
                if (imgElement) {
                    imgElement.style.filter = 'brightness(1.1)';
                    imgElement.style.transition = 'filter 0.3s ease';
                }
            }
        });

        img.addEventListener('mouseleave', function() {
            if (diagonalGallery.classList.contains('expanded')) {
                // Restore when expanded
                this.style.transform = `rotate(${baseRotation}deg) scale(1) translateY(0)`;
                this.style.zIndex = (index + 1).toString();
                this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                
                const imgElement = this.querySelector('img');
                if (imgElement) {
                    imgElement.style.transform = 'scale(1)';
                }
            } else {
                // Restore when grouped
                const transforms = [
                    { translate: 'translate(0, 0)', rotate: '-5deg' },
                    { translate: 'translate(12px, -8px)', rotate: '3deg' },
                    { translate: 'translate(24px, -16px)', rotate: '-2deg' },
                    { translate: 'translate(8px, 8px)', rotate: '4deg' },
                    { translate: 'translate(20px, 4px)', rotate: '-3deg' },
                    { translate: 'translate(16px, -12px)', rotate: '2deg' },
                    { translate: 'translate(28px, -4px)', rotate: '-4deg' },
                    { translate: 'translate(32px, 0px)', rotate: '3deg' }
                ];
                
                const transform = transforms[index] || { translate: 'translate(0, 0)', rotate: '0deg' };
                this.style.transform = `${transform.translate} rotate(${transform.rotate}) scale(1)`;
                this.style.zIndex = index === 0 ? '24' : (24 - index).toString();
                this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                
                const imgElement = this.querySelector('img');
                if (imgElement) {
                    imgElement.style.filter = 'brightness(1)';
                }
            }
        });
    });
    
    // Click outside to collapse
    document.addEventListener('click', function(e) {
        if (diagonalGallery.classList.contains('expanded')) {
            const clickedInside = diagonalGallery.contains(e.target);
            const clickedOnImage = e.target.closest('.diagonal-image');
            
            // Only collapse if clicked outside the gallery (not on images)
            if (!clickedInside && !clickedOnImage) {
                diagonalGallery.classList.remove('expanded');
                
                // Animate collapse
                diagonalImages.forEach((img, idx) => {
                    img.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease, width 0.8s ease, height 0.8s ease, top 0.8s ease, left 0.8s ease, bottom 0.8s ease';
                    
                    setTimeout(() => {
                        img.style.width = '140px';
                        img.style.height = '190px';
                        img.style.bottom = '20%';
                        img.style.left = '8%';
                        img.style.top = 'auto';
                        
                        if (idx === 0) {
                            img.style.border = '2px solid #ff4444';
                        } else {
                            img.style.border = 'none';
                        }
                    }, idx * 30);
                });
            }
        }
    });
    
    console.log('Diagonal image interactions initialized successfully');
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
        { selector: '.diagonal-gallery', delay: 300 },
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
                // Show gallery container first
                element.style.opacity = '1';
                
                // Then animate each image individually with stagger
                const diagonalImages = element.querySelectorAll('.diagonal-image');
                
                diagonalImages.forEach((img, idx) => {
                    // Start hidden and scaled down at bottom-left position
                    img.style.opacity = '0';
                    img.style.bottom = '20%';
                    img.style.left = '8%';
                    img.style.top = 'auto';
                    img.style.width = '140px';
                    img.style.height = '190px';
                    img.style.transform = 'translate(0, 20px) rotate(0deg) scale(0.5)';
                    img.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.8s ease, height 0.8s ease';
                    
                    // Animate to grouped state with stagger (bottom-left stack)
                    setTimeout(() => {
                        // Different transforms for each image to create stacked effect
                        const transforms = [
                            { translate: 'translate(0, 0)', rotate: '-5deg' },
                            { translate: 'translate(12px, -8px)', rotate: '3deg' },
                            { translate: 'translate(24px, -16px)', rotate: '-2deg' },
                            { translate: 'translate(8px, 8px)', rotate: '4deg' },
                            { translate: 'translate(20px, 4px)', rotate: '-3deg' },
                            { translate: 'translate(16px, -12px)', rotate: '2deg' },
                            { translate: 'translate(28px, -4px)', rotate: '-4deg' },
                            { translate: 'translate(32px, 0px)', rotate: '3deg' }
                        ];
                        
                        const transform = transforms[idx] || { translate: 'translate(0, 0)', rotate: '0deg' };
                        const opacity = idx === 0 ? '0.95' : (idx < 3 ? '0.95' : (idx < 4 ? '0.3' : '0.2'));
                        
                        img.style.opacity = opacity;
                        img.style.width = '140px';
                        img.style.height = '190px';
                        img.style.transform = `${transform.translate} rotate(${transform.rotate}) scale(1)`;
                        
                        // Add border to first image
                        if (idx === 0) {
                            img.style.border = '2px solid #ff4444';
                        }
                    }, delay + (idx * 60));
                });
                
                // Don't animate the gallery container itself
                return;
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