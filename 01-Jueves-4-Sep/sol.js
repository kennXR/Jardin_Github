console.log("Sesion 5. Ejercicio01: Atardecer");
console.log("THREE: ", THREE);
console.log(gsap);

// Variables globales
let scene, camera, renderer, mesh, animationId;
let isAnimating = false;

// Inicialización de Three.js
function initThreeJS() {
    const canvas = document.getElementById("lienzo");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);

    // 🌞 Sol más pequeño
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load("./textura/t1.png", (texture) => {
        const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: texture });
        mesh = new THREE.Mesh(geometry, matcapMaterial);

        // Posición inicial del sol 3D
        mesh.position.set(-3, 0, -8);
        scene.add(mesh);
    });

    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.width, canvas.height);
    renderer.render(scene, camera);
}

// Loop de animación Three.js
function animate() {
    if (mesh && isAnimating) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
}

// Animación del sol en curva
function startSunsetAnimation() {
    if (isAnimating) return;
    isAnimating = true;

    // 🌞 HTML (.sol)
    const tlHtml = gsap.timeline({
        onComplete: () => { isAnimating = false; }
    });

    tlHtml.to(".sol", {
        duration: 2.5,
        x: 0,
        y: -150, // sube
        ease: "power2.out"
    });

    tlHtml.to(".sol", {
        duration: 2.5,
        x: 200,
        y: 0, // baja
        ease: "power2.in"
    });

    // 🌞 Three.js (mesh)
    if (mesh) {
        const tlMesh = gsap.timeline();

        tlMesh.to(mesh.position, {
            duration: 2.5,
            x: 0,
            y: 3, // sube
            ease: "power2.out"
        });

        tlMesh.to(mesh.position, {
            duration: 2.5,
            x: 3,
            y: 0, // baja
            ease: "power2.in"
        });
    }
}

// Reset de la animación
function resetAnimation() {
    isAnimating = false;

    // HTML
    gsap.set(".sol", { x: 0, y: 0, backgroundColor: "#FFD700" });

    // Three.js
    if (mesh) {
        gsap.set(mesh.position, { x: -3, y: 0, z: -8 });
        mesh.rotation.set(0, 0, 0);
    }
}

// Eventos
function setupEventListeners() {
    document.getElementById("button").onclick = startSunsetAnimation;
    document.getElementById("button2").onclick = resetAnimation;

    window.onresize = () => {
        const canvas = document.getElementById("lienzo");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        camera.aspect = canvas.width / canvas.height;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.width, canvas.height);
    };
}

// Inicio
document.addEventListener("DOMContentLoaded", () => {
    initThreeJS();
    setupEventListeners();
    animate();
});