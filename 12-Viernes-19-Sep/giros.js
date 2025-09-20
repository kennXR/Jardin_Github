console.log(THREE);
console.log(gsap);

// Canvas
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Escena y renderer
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.width, canvas.height);
renderer.setClearColor("#0a0c2c");

// Cámara
const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 7;

// Geometría y material (sin texturas externas)
const geo = new THREE.SphereGeometry(1.5, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: "#ffffff" });
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

// Luces
const frontLight = new THREE.PointLight("#ffffff", 300, 100);
frontLight.position.set(7, 3, 3);
scene.add(frontLight);

const rimLight = new THREE.PointLight("#0066ff", 50, 100);
rimLight.position.set(-7, -3, -7);
scene.add(rimLight);

// Botón y animación con GSAP
const boton = document.getElementById("giros");
boton.addEventListener("click", () => {
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 4, // 720°
    duration: 2,
    ease: "power2.inOut"
  });
});

// Animación
function animate() {
  requestAnimationFrame(animate);
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
}
animate();
