console.log("Sesión: Líneas dinámicas 3D");
console.log("THREE:", THREE);

// 1. Definir canvas
const canvas = document.getElementById("lienzo");
const W = window.innerWidth;
const H = window.innerHeight;
canvas.width = W;
canvas.height = H;

// 2. Escena
const scene = new THREE.Scene();

// 3. Cámara
const camera = new THREE.PerspectiveCamera(75, W/H, 0.1, 1000);
camera.position.set(0, 0, 300);

// 4. Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(W, H);
renderer.setClearColor(0x000000);

// 5. Luces (no necesarias para MeshBasicMaterial)
// const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLight.position.set(0, 1, 0);
// scene.add(directionalLight);

// 6. Crear "líneas" como cajas
const lines = [];

for (let y = 0; y < H; y += 30) {
  const baseWidth = 5 + Math.random() * 10;
  const phase = Math.random() * Math.PI * 2;
  const speed = 0.02 + Math.random() * 0.02;
  const vy = 0.5 + Math.random() * 1.0;

  // Geometría + material básico
  const geometry = new THREE.BoxGeometry(W, baseWidth, 20 + Math.random() * 30);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color().setHSL(Math.random(), 1, 0.8)
  });

  const box = new THREE.Mesh(geometry, material);
  box.position.set(0, y - H/2, 0);

  scene.add(box);

  lines.push({ box, baseWidth, phase, speed, vy, material });
}

console.log(`Creadas ${lines.length} líneas`);

// 7. Animación
function animate() {
  requestAnimationFrame(animate);

  lines.forEach(line => {
    // grosor variable
    const width = line.baseWidth + Math.sin(line.phase) * 5;
    line.box.scale.y = Math.max(0.5, width);

    // movimiento vertical
    line.box.position.y += line.vy;
    if (line.box.position.y > H/2) {
      line.box.position.y = -H/2;
    }

    // fase
    line.phase += line.speed;

    // color dinámico (hue shift)
    const hue = (Date.now() * 0.05 + line.phase * 50) % 360;
    line.material.color.setHSL(hue / 360, 1, 0.8);
  });

  renderer.render(scene, camera);
}

animate();