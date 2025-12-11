// ============================================
// Sistema de Imágenes Hover 2D
// Basado en Body of Water Anthology
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const hoverImageContainer = document.getElementById('hoverImageContainer');
    const hoverImage = document.getElementById('hoverImage');
    
    let currentImageSrc = null;
    let hoverTimeout = null;

    // Función para mostrar la imagen
    function showImage(imageSrc) {
        if (currentImageSrc === imageSrc && hoverImageContainer.classList.contains('visible')) {
            return; // Ya está mostrando esta imagen
        }

        // Pre-cargar la imagen antes de mostrarla
        const img = new Image();
        img.onload = () => {
            hoverImage.src = imageSrc;
            hoverImage.alt = imageSrc.split('/').pop();
            currentImageSrc = imageSrc;
            
            // Pequeño delay para suavizar la transición
            requestAnimationFrame(() => {
                hoverImageContainer.classList.add('visible');
            });
        };
        img.onerror = () => {
            console.warn(`No se pudo cargar la imagen: ${imageSrc}`);
        };
        img.src = imageSrc;
    }

    // Función para ocultar la imagen
    function hideImage() {
        hoverImageContainer.classList.remove('visible');
        // Limpiar el src después de la animación para evitar parpadeos
        setTimeout(() => {
            if (!hoverImageContainer.classList.contains('visible')) {
                hoverImage.src = '';
                currentImageSrc = null;
            }
        }, 600); // Esperar a que termine la transición CSS
    }

    // Event listeners para cada elemento del menú
    menuItems.forEach(item => {
        const imageSrc = item.getAttribute('data-image');

        // Mouse enter - mostrar imagen con un pequeño delay
        item.addEventListener('mouseenter', () => {
            // Limpiar cualquier timeout pendiente
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }

            // Mostrar la imagen después de un pequeño delay para suavizar la experiencia
            hoverTimeout = setTimeout(() => {
                showImage(imageSrc);
            }, 150);
        });

        // Mouse leave - ocultar imagen
        item.addEventListener('mouseleave', () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }
            hideImage();
        });

        // Click - mantener la imagen visible (opcional, puedes remover esto si no lo quieres)
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (hoverImageContainer.classList.contains('visible')) {
                hideImage();
            } else {
                showImage(imageSrc);
            }
        });
    });

    // Ocultar imagen cuando el mouse sale del contenedor de la imagen
    hoverImageContainer.addEventListener('mouseleave', () => {
        hideImage();
    });

    // Asegurarse de que la imagen se oculte cuando se carga la página
    hideImage();
});

