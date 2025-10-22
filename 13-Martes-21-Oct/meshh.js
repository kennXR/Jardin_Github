console.log(THREE);

// --- Canvas
const canvas = document.getElementById("lienzo");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- Ajustar cámara al redimensionar ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera.aspect = canvas.width / canvas.height;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.width, canvas.height);
});

// --- Escena y renderer
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.width, canvas.height);
renderer.setClearColor("#88ccff"); // Azul claro

// --- Cámara
const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
camera.position.set(0, 0, 14); // Más alejada para la cúpula más grande

// --- Textura
const loader = new THREE.TextureLoader();
const textura = loader.load("./tex/bubble2.png");

// --- Cúpula de la medusa
const domeGeo = new THREE.SphereGeometry(2.2, 64, 64, 0, Math.PI * 2, 0, Math.PI / 1.6);
const domeMat = new THREE.MeshPhysicalMaterial({
  map: textura,
  color: new THREE.Color(0xffaacc), // Rosa claro
  transparent: true,
  opacity: 0.6, // Más transparente
  roughness: 0.1, // Más brillante
  metalness: 0.0, // Sin metal
  clearcoat: 0.8, // Más brillo de burbuja
  clearcoatRoughness: 0.0, // Superficie muy lisa
  emissive: new THREE.Color(0xaa4488),
  emissiveIntensity: 0.2,
  side: THREE.DoubleSide,
});
const dome = new THREE.Mesh(domeGeo, domeMat);
// Centrar la cúpula en el lienzo
dome.position.set(0, 0, 0);
scene.add(dome);

// --- Grupo de tentáculos
const tentaclesGroup = new THREE.Group();
scene.add(tentaclesGroup);

// --- Función para crear tentáculo
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
  return geometry;
}

// --- Crear tentáculos
const tentacles = [];
const numTentacles = 18;

for (let i = 0; i < numTentacles; i++) {
  const length = 3 + Math.random() * 1; // Reducida para mantener dentro del lienzo
  const tGeo = createTentacleGeometry(length);

  // Cargar textura t1 para los tentáculos
  const tentacleTexture = loader.load("./tex/t1.png");
  
  const tMat = new THREE.MeshStandardMaterial({
    map: tentacleTexture,
    color: 0xffaacc, // Rosa claro como la cúpula
    emissive: 0xaa4488,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.8,
    roughness: 0.2,
    metalness: 0.0,
  });

  const tentacle = new THREE.Mesh(tGeo, tMat);

   // Distribución radial debajo del domo
   const angle = (i / numTentacles) * Math.PI * 2;
   const radius = 1; // Ajustado para la cúpula más grande
   tentacle.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

  // 🔹 Rotación base SIN tocarla (queda natural colgando)
  tentacle.rotation.x = 0;
  tentacle.rotation.y = 0;
  tentacle.rotation.z = 0;

  tentaclesGroup.add(tentacle);

  tentacles.push({
    mesh: tentacle,
    offset: Math.random() * Math.PI * 2,
    waveSpeed: 1 + Math.random() * 0.5,
    length: length,
    radius: radius,
    angle: angle,
  });
}

// --- Luces
const frontLight = new THREE.PointLight(0xffffff, 300, 150);
frontLight.position.set(6, 6, 6);
scene.add(frontLight);

const rimLight = new THREE.PointLight(0x0066ff, 200, 150);
rimLight.position.set(-6, -4, -6);
scene.add(rimLight);

const ambientLight = new THREE.AmbientLight(0x202040, 0.6);
scene.add(ambientLight);

// --- Partículas decorativas
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

// --- Animación
const clock = new THREE.Clock();
const amplitude = 0.2; // Reducida para mantener dentro del lienzo
const levitationSpeed = 0.9;

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Movimiento de la cúpula (mantener centrada)
  dome.position.y = Math.sin(t * levitationSpeed) * amplitude;
  dome.position.x = 0; // Mantener centrada en X
  dome.position.z = 0; // Mantener centrada en Z
  const scalePulse = 1 + Math.sin(t * 1.5) * 0.06;
  dome.scale.set(scalePulse, scalePulse, scalePulse);

  // Posicionar grupo de tentáculos debajo de la cúpula (centrado)
  tentaclesGroup.position.y = dome.position.y - 0.2;
  tentaclesGroup.position.x = 0; // Mantener centrado en X
  tentaclesGroup.position.z = 0; // Mantener centrado en Z

  // Ondulación de tentáculos (movimiento reducido)
  tentacles.forEach(({ mesh, offset, waveSpeed }) => {
    const wave = Math.sin(t * 2 * waveSpeed + offset);
    mesh.rotation.z = wave * 0.08; // Reducido
    mesh.rotation.x = wave * 0.05; // Reducido
    mesh.scale.y = 1 + Math.abs(Math.sin(t * waveSpeed + offset)) * 0.03; // Reducido
  });

  // Rotación global sutil del grupo
  tentaclesGroup.rotation.y = Math.sin(t * 0.5) * 0.1;

  // Partículas (movimiento reducido)
  particles.position.y = Math.sin(t * 0.3) * 0.1;

  camera.lookAt(0, 0, 0); // Siempre mirar al centro
  renderer.render(scene, camera);
}

animate();
