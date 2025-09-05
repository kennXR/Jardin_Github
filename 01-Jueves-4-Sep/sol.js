// Variables globales
let scene, camera, renderer, mesh, animationId;
let animationState = "idle"; // "idle", "running", "completed"

// Crear el sol 3D
function createSun() {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load("./textura/t1.png", onTextureLoaded, undefined, onTextureError);

    function onTextureLoaded(texture) {
        const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: texture });
        mesh = new THREE.Mesh(geometry, matcapMaterial);
        mesh.position.set(-4, -1, -8);
        scene.add(mesh);
    }

    function onTextureError(error) {
        console.error("Error cargando textura:", error);
        const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
        mesh = new THREE.Mesh(geometry, basicMaterial);
        mesh.position.set(-4, -1, -8);
        scene.add(mesh);
    }
}

// Inicialización de Three.js
function initThreeJS() {
    const canvas = document.getElementById("lienzo");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
    camera.position.z = 10;

    createSun();

    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.width, canvas.height);
}

// Verificar si el sol está listo
function isSunReady() {
    return mesh !== null && mesh !== undefined;
}

// Verificar si se puede animar
function canAnimate() {
    return (animationState === "idle" || animationState === "completed") && isSunReady();
}

// Verificar si está animando
function isAnimating() {
    return animationState === "running";
}

// Rotar el sol
function rotateSun() {
    if (isSunReady() && isAnimating()) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
    }
}

// Loop de animación
function animate() {
    rotateSun();
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
}

// Subir el sol
function moveSunUp() {
    gsap.to(mesh.position, {
        duration: 2.5,
        x: 0,
        y: 3,
        ease: "power2.out",
        onComplete: moveSunDown
    });
}

// Bajar el sol
function moveSunDown() {
    gsap.to(mesh.position, {
        duration: 2.5,
        x: 4,
        y: -1,
        ease: "power2.in",
        onComplete: finishAnimation
    });
}

// Terminar animación
function finishAnimation() {
    animationState = "completed";
}

// Iniciar animación del atardecer
function startSunsetAnimation() {
    if (canAnimate()) {
        animationState = "running";
        moveSunUp();
    }
}

// Resetear animación
function resetAnimation() {
    animationState = "idle";
    
    if (isSunReady()) {
        gsap.set(mesh.position, { x: -4, y: -1, z: -8 });
        mesh.rotation.set(0, 0, 0);
    }
}

// Redimensionar ventana
function handleResize() {
    const canvas = document.getElementById("lienzo");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
}

// Configurar eventos
function setupEventListeners() {
    const startButton = document.getElementById("button");
    const resetButton = document.getElementById("button2");

    if (startButton) {
        startButton.onclick = startSunsetAnimation;
    }
    
    if (resetButton) {
        resetButton.onclick = resetAnimation;
    }

    window.onresize = handleResize;
}

// Inicializar aplicación
function initApp() {
    initThreeJS();
    setupEventListeners();
    animate();
}

// Inicio
document.addEventListener("DOMContentLoaded", initApp);