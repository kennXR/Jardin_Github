console.log(THREE);

// Canvas
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ajustar cámara al redimensionar ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera.aspect = canvas.width / canvas.height;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.width, canvas.height);
});

// Escena y renderer
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.width, canvas.height);
renderer.setClearColor("#0a0c2c");

// Cámara
const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
camera.position.set(0, 2, 10);

// Textura
const loader = new THREE.TextureLoader();
const textura = loader.load("./tex/t1.png");

// Cúpula de la medusa
const domeGeo = new THREE.SphereGeometry(1.5, 64, 64, 0, Math.PI * 2, 0, Math.PI / 1.6);
const domeMat = new THREE.MeshPhysicalMaterial({
  map: textura,
  transparent: true,
  opacity: 0.85,
  roughness: 0.2,
  metalness: 0.1,
  clearcoat: 0.5,
  emissive: new THREE.Color(0x0044ff),
  emissiveIntensity: 0.3,
  side: THREE.DoubleSide,
});
const dome = new THREE.Mesh(domeGeo, domeMat);
scene.add(dome);

// Grupo de tentáculos
const tentaclesGroup = new THREE.Group();
scene.add(tentaclesGroup);

// Función para crear tentáculo
function createTentacleGeometry(length, segments = 30, curvature = 0.4, randomness = 0.2) {
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const y = -length * t;

    const curveX = Math.sin(t * Math.PI * curvature) * (Math.random() - 0.5) * randomness;
    const curveZ = Math.cos(t * Math.PI * curvature) * (Math.random() - 0.5) * randomness;

    points.push(new THREE.Vector3(curveX, y, curveZ));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, segments, 0.08, 8, false);
  geometry.translate(0, -length / 2, 0); // 🔽 centra el pivot más hacia arriba
  return geometry;
}

// Crear tentáculos
const tentacles = [];
const numTentacles = 18;

for (let i = 0; i < numTentacles; i++) {
  const length = 4 + Math.random() * 2;
  const tGeo = createTentacleGeometry(length);

  const tMat = new THREE.MeshStandardMaterial({
    color: 0x88ccff,
    emissive: 0x0022aa,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.9,
  });

  const tentacle = new THREE.Mesh(tGeo, tMat);

   // Posición inicial — base debajo del domo
   const angle = (i / numTentacles) * Math.PI * 2;
   const radius = 0.6 + Math.random() * 0.3;
   tentacle.position.set(Math.cos(angle) * radius, -1.3, Math.sin(angle) * radius);
   // Rotación para que los tentáculos apunten hacia abajo correctamente
   tentacle.rotation.x = 0; // Sin inclinación hacia la cámara
   tentacle.rotation.z = angle; // Orientación radial
  tentaclesGroup.add(tentacle);

  tentacles.push({
    mesh: tentacle,
    offset: Math.random() * Math.PI * 2,
    waveSpeed: 1 + Math.random() * 0.5,
  });
}

// Luces
const frontLight = new THREE.PointLight(0xffffff, 300, 150);
frontLight.position.set(6, 6, 6);
scene.add(frontLight);

const rimLight = new THREE.PointLight(0x0066ff, 200, 150);
rimLight.position.set(-6, -4, -6);
scene.add(rimLight);

const ambientLight = new THREE.AmbientLight(0x202040, 0.6);
scene.add(ambientLight);

// Partículas decorativas
const particlesGeo = new THREE.BufferGeometry();
const pCount = 250;
const pPositions = new Float32Array(pCount * 3);
for (let i = 0; i < pCount; i++) {
  pPositions[i * 3] = (Math.random() - 0.5) * 8;
  pPositions[i * 3 + 1] = (Math.random() - 1.0) * 4;
  pPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
}
particlesGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
const particlesMat = new THREE.PointsMaterial({
  color: 0x3399ff,
  size: 0.05,
  transparent: true,
  opacity: 0.3,
});
const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

// Animación
const clock = new THREE.Clock();
const amplitude = 0.4;
const levitationSpeed = 0.9;

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Movimiento de la cúpula
  dome.position.y = Math.sin(t * levitationSpeed) * amplitude;
  const scalePulse = 1 + Math.sin(t * 1.5) * 0.06;
  dome.scale.set(scalePulse, scalePulse, scalePulse);

   // Movimiento ondulante natural de los tentáculos
   tentacles.forEach(({ mesh, offset, waveSpeed }) => {
     const wave = Math.sin(t * 2 * waveSpeed + offset);
     // Movimiento ondulante horizontal (balanceo)
     mesh.rotation.x = wave * 0.2; // Balanceo hacia adelante y atrás
     mesh.rotation.y = Math.sin(t * waveSpeed + offset) * 0.15; // Balanceo lateral
     // Contracción vertical
     mesh.scale.y = 1 + Math.sin(t * waveSpeed + offset) * 0.1;
   });

  // Grupo acompaña la cúpula
  tentaclesGroup.position.y = dome.position.y - 0.6;

  // Movimiento de partículas
  particles.position.y = Math.sin(t * 0.3) * 0.2;

  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}

animate();
