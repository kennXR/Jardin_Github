// ============================================
// UNTOLD STORIES - Animaciones
// Inspirado en untold.site
// ============================================

// ============================================
// EFECTO DE SEGUIMIENTO DEL CURSOR
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

        // Efecto parallax en los elementos del headline
        const headlineWords = document.querySelectorAll('.headline-word');
        const headlineImage = document.querySelector('.headline-image-wrapper');
        const headlineIllustration = document.querySelector('.headline-illustration');
        const diagonalImages = document.querySelectorAll('.diagonal-image');

        const centerX = stage.offsetWidth / 2;
        const centerY = stage.offsetHeight / 2;

        const deltaX = (cursorX - centerX) / centerX;
        const deltaY = (cursorY - centerY) / centerY;

        // Movimiento sutil de las palabras del headline
        headlineWords.forEach((word, index) => {
            const intensity = (index + 1) * 0.3;
            const moveX = deltaX * intensity * 5;
            const moveY = deltaY * intensity * 5;
            word.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        // Movimiento de la imagen del headline
        if (headlineImage) {
            const moveX = deltaX * 8;
            const moveY = deltaY * 8;
            headlineImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }

        // Movimiento de la ilustración
        if (headlineIllustration) {
            const moveX = deltaX * -6;
            const moveY = deltaY * -6;
            headlineIllustration.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }

        // Movimiento parallax de las imágenes diagonales - solo cuando están expandidas
        const diagonalGallery = document.getElementById('diagonalGallery');
        if (diagonalGallery && diagonalGallery.classList.contains('expanded')) {
            diagonalImages.forEach((img, index) => {
                const intensity = (index % 4) * 0.5 + 0.5;
                const moveX = deltaX * intensity * 12;
                const moveY = deltaY * intensity * 12;
                
                // Obtener rotación base desde el atributo data
                const baseRot = img.getAttribute('data-rotation') || '0';
                
                // Solo aplicar parallax si no está en hover (para evitar conflictos)
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
// INTERACCIONES DE LAS PALABRAS DEL HEADLINE
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
            // Agregar efecto ripple (ondulación)
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

    // Agregar animación ripple al CSS dinámicamente
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
// INTERACCIONES DE LA IMAGEN DEL HEADLINE
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
// INTERACCIONES DE LA ILUSTRACIÓN
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
// INTERACCIONES DE LAS IMÁGENES DIAGONALES
// ============================================

function initDiagonalImageInteractions() {
    const diagonalGallery = document.getElementById('diagonalGallery');
    const diagonalImages = document.querySelectorAll('.diagonal-image');
    
    if (!diagonalGallery) {
        console.warn('Galería diagonal no encontrada');
        return;
    }
    
    if (diagonalImages.length === 0) {
        console.warn('No se encontraron imágenes diagonales');
        return;
    }
    
    console.log(`Inicializando interacciones para ${diagonalImages.length} imágenes`);
    
    // Mapeo de rotaciones desde las clases CSS
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
    
    // Almacenar rotaciones iniciales
    diagonalImages.forEach(img => {
        const classList = Array.from(img.classList);
        const imgClass = classList.find(c => c.startsWith('diagonal-img-'));
        if (imgClass && rotations[imgClass]) {
            img.setAttribute('data-rotation', rotations[imgClass]);
        } else {
            img.setAttribute('data-rotation', '0');
        }
    });
    
    // Click para expandir/colapsar
    diagonalImages.forEach((img, index) => {
        // Asegurar que los pointer events estén habilitados
        img.style.pointerEvents = 'auto';
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            console.log('Imagen clickeada, índice:', index);
            
            if (!diagonalGallery.classList.contains('expanded')) {
                // Expandir - desplegar imágenes en trayectorias diagonales
                diagonalGallery.classList.add('expanded');
                
                // Obtener posición inicial (inferior izquierda)
                const startBottom = '20%';
                const startLeft = '8%';
                
                // Posiciones finales desde CSS
                const finalPositions = [
                    { top: '10%', left: '5%', rotate: '-15deg' },
                    { top: '20%', left: '18%', rotate: '8deg' },
                    { top: '35%', left: '30%', rotate: '-10deg' },
                    { top: '50%', left: '42%', rotate: '12deg' },
                    { top: '65%', left: '54%', rotate: '-8deg' },
                    { top: '15%', left: '65%', rotate: '15deg' },
                    { top: '45%', left: '75%', rotate: '-12deg' },
                    { top: '70%', left: '85%', rotate: '10deg' }
                ];
                
                // Agregar retraso escalonado para animación suave
                diagonalImages.forEach((img, idx) => {
                    const finalPos = finalPositions[idx] || { top: '50%', left: '50%', rotate: '0deg' };
                    
                    // Calcular dirección desde inicio (inferior izquierda ~8%, 20%) hacia posición final
                    // Convertir porcentajes a píxeles aproximados para cálculo (asumiendo 1440px ancho, 750px alto)
                    const startX = 1440 * 0.08; // 8% del ancho
                    const startY = 750 * (1 - 0.20); // 20% desde abajo = 80% desde arriba
                    
                    const finalXPercent = parseFloat(finalPos.left) / 100;
                    const finalYPercent = parseFloat(finalPos.top) / 100;
                    const finalX = 1440 * finalXPercent;
                    const finalY = 750 * finalYPercent;
                    
                    // Calcular ángulo y distancia para trayectoria diagonal
                    const deltaX = finalX - startX;
                    const deltaY = finalY - startY;
                    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    
                    // Distancia de lanzamiento: ir 30% más lejos en dirección diagonal para efecto dramático
                    const launchDistance = distance * 0.3;
                    const launchAngleRad = angle * Math.PI / 180;
                    const launchX = Math.cos(launchAngleRad) * launchDistance;
                    const launchY = Math.sin(launchAngleRad) * launchDistance;
                    
                    // Paso 1: Lanzar en dirección diagonal (instantáneo)
                    img.style.transition = 'none';
                    img.style.width = '140px';
                    img.style.height = '190px';
                    img.style.bottom = startBottom;
                    img.style.left = startLeft;
                    img.style.top = 'auto';
                    img.style.transform = `translate(${launchX}px, ${-launchY}px) rotate(${angle + 15}deg) scale(0.85)`;
                    
                    // Forzar reflow
                    img.offsetHeight;
                    
                    // Paso 2: Animar hacia posición final con arco diagonal suave
                    setTimeout(() => {
                        img.style.transition = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.9s ease, height 0.9s ease, top 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), left 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), bottom 1.2s ease, opacity 0.8s ease';
                        img.style.width = '180px';
                        img.style.height = '240px';
                        img.style.border = 'none';
                        img.style.bottom = 'auto';
                        img.style.top = finalPos.top;
                        img.style.left = finalPos.left;
                        img.style.transform = `rotate(${finalPos.rotate}) translate(0, 0) scale(1)`;
                    }, idx * 100 + 100);
                });
            } else {
                // Colapsar - volver al estado agrupado
                diagonalGallery.classList.remove('expanded');
                
                // Agregar retraso escalonado para colapso suave
                diagonalImages.forEach((img, idx) => {
                    // Establecer transición para todas las propiedades incluyendo tamaño
                    img.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease, width 0.8s ease, height 0.8s ease, top 0.8s ease, left 0.8s ease, bottom 0.8s ease';
                    
                    // Volver a tamaño pequeño y posición inferior izquierda
                    setTimeout(() => {
                        img.style.width = '140px';
                        img.style.height = '190px';
                        img.style.bottom = '20%';
                        img.style.left = '8%';
                        img.style.top = 'auto';
                        
                        // Agregar borde de vuelta a la primera imagen
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
    
    // Efectos hover - tanto cuando están agrupadas como expandidas
    diagonalImages.forEach((img, index) => {
        const baseRotation = img.getAttribute('data-rotation') || '0';
        
        // Asegurar pointer events y cursor
        img.style.pointerEvents = 'auto';
        img.style.cursor = 'pointer';
        
        img.addEventListener('mouseenter', function() {
            console.log('Mouse entró en imagen:', index);
            if (diagonalGallery.classList.contains('expanded')) {
                // Hover cuando está expandida
                this.style.transform = `rotate(0deg) scale(1.15) translateY(-15px)`;
                this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, z-index 0.4s ease';
                this.style.zIndex = '50';
                this.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.3)';
                
                const imgElement = this.querySelector('img');
                if (imgElement) {
                    imgElement.style.transform = 'scale(1.1)';
                }
            } else {
                // Hover cuando está agrupada - interacción más visible
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
                // Restaurar cuando está expandida
                this.style.transform = `rotate(${baseRotation}deg) scale(1) translateY(0)`;
                this.style.zIndex = (index + 1).toString();
                this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                
                const imgElement = this.querySelector('img');
                if (imgElement) {
                    imgElement.style.transform = 'scale(1)';
                }
            } else {
                // Restaurar cuando está agrupada
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
    
    // Click fuera para colapsar
    document.addEventListener('click', function(e) {
        if (diagonalGallery.classList.contains('expanded')) {
            const clickedInside = diagonalGallery.contains(e.target);
            const clickedOnImage = e.target.closest('.diagonal-image');
            
            // Solo colapsar si se hace click fuera de la galería (no en las imágenes)
            if (!clickedInside && !clickedOnImage) {
                diagonalGallery.classList.remove('expanded');
                
                // Animar colapso
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
    
    console.log('Interacciones de imágenes diagonales inicializadas exitosamente');
}

// ============================================
// INTERACCIONES DEL BOTÓN CTA
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
// INTERACCIONES DE NAVEGACIÓN
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
            
            // Mover punto si está activo
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

        // Click para activar
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos
            navItems.forEach(nav => nav.classList.remove('active'));
            navItems.forEach(nav => {
                const dot = nav.querySelector('.nav-dot');
                if (dot) dot.style.display = 'none';
            });
            
            // Agregar active al clickeado
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
// INTERACCIONES DEL SELECTOR DE IDIOMA
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
        
        // Alternar idioma (toggle simple para demo)
        const span = this.querySelector('span');
        if (span) {
            span.textContent = isOpen ? '(ES)' : '(EN)';
            }
        });
    }
    
// ============================================
// INTERACCIONES DEL BOTÓN HAMBURGUESA
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
            // Transformar a X
            this.style.transform = 'scale(1.1) rotate(90deg)';
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            // Volver a hamburguesa
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
// INTERACCIONES DEL INDICADOR DE SCROLL
// ============================================

function initScrollIndicatorInteractions() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollArrow || !scrollIndicator) return;

    // Animar flecha
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
// ANIMACIONES DE ENTRADA SUAVES
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
            
            // Establecer transformación inicial basada en el elemento
            if (selector === '.scroll-indicator') {
                element.style.transform = 'translateY(-50%) translateX(30px)';
            } else if (selector === '.headline-container') {
                element.style.transform = 'translate(-50%, -50%) translateY(40px)';
            } else if (selector === '.diagonal-gallery') {
                // Mostrar contenedor de galería primero
                element.style.opacity = '1';
                
                // Luego animar cada imagen individualmente con escalonamiento
                const diagonalImages = element.querySelectorAll('.diagonal-image');
                
                diagonalImages.forEach((img, idx) => {
                    // Comenzar oculta y escalada en posición inferior izquierda
                    img.style.opacity = '0';
                    img.style.bottom = '20%';
                    img.style.left = '8%';
                    img.style.top = 'auto';
                    img.style.width = '140px';
                    img.style.height = '190px';
                    img.style.transform = 'translate(0, 20px) rotate(0deg) scale(0.5)';
                    img.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.8s ease, height 0.8s ease';
                    
                    // Animar a estado agrupado con escalonamiento (pila inferior izquierda)
                    setTimeout(() => {
                        // Diferentes transformaciones para cada imagen para crear efecto de pila
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
                        
                        // Agregar borde a la primera imagen
                        if (idx === 0) {
                            img.style.border = '2px solid #ff4444';
                        }
                    }, delay + (idx * 60));
                });
                
                // No animar el contenedor de la galería en sí
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
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las interacciones
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
    
    // Agregar transiciones suaves a las palabras del headline
    const headlineWords = document.querySelectorAll('.headline-word');
    headlineWords.forEach(word => {
        word.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});