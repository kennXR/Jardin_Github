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

// Cargar textura desde carpeta "tex"
const loader = new THREE.TextureLoader();
const textura = loader.load("./tex/t1.png");

// Geometría y material con textura
const geo = new THREE.SphereGeometry(1.5, 64, 64);
const material = new THREE.MeshStandardMaterial({ map: textura });
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);

// Luces
const frontLight = new THREE.PointLight("#ffffff", 500, 100);
frontLight.position.set(5, 5, 5);
scene.add(frontLight);

const rimLight = new THREE.PointLight("#0066ff", 200, 100);
rimLight.position.set(-5, -5, -5);
scene.add(rimLight);

// Luz ambiental adicional para mayor claridad
const ambientLight = new THREE.AmbientLight("#404040", 0.3);
scene.add(ambientLight);

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
