console.log("Ejercicio: Ajuste de ventanas");

// Crear canvas y renderer
const canvas = document.getElementById("lienzo");
const renderer = new THREE.WebGLRenderer({canvas});

// Escena y cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Cargar texturas
const loader = new THREE.TextureLoader();
const textures = [
  loader.load("./tex/t1.png"), // chica
  loader.load("./tex/t2.png"), // mediana
  loader.load("./tex/t3.png")  // grande
];

// Material y objeto
const material = new THREE.MeshMatcapMaterial();
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Ajustar tamaño ventana + cambiar textura
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  // Elegir textura según ancho
  material.matcap = w < 600 ? textures[0] : w < 1000 ? textures[1] : textures[2];
}
window.addEventListener("resize", resize);
resize(); // aplicar al inicio

// Animación
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();