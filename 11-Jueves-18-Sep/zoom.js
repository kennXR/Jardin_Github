console.log("Sesión: Líneas dinámicas 3D");
console.log("THREE:", THREE);

// 1. Canvas
const canvas = document.getElementById("lienzo");
const W = window.innerWidth;
const H = window.innerHeight;

// 2. Escena
const scene = new THREE.Scene();

// 3. Cámara
const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
camera.position.z = 200;

// 4. Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(W, H);
renderer.setClearColor(0x000000);

// 5. Crear líneas como cajas
const lines = [];

for (let y = 0; y < H; y += 40) {
  const baseWidth = 8 + Math.random() * 12;
  const phase = Math.random() * Math.PI * 2;
  const speed = 0.01 + Math.random() * 0.02;
  const vy = 0.3 + Math.random() * 0.7;

  // Geometría
  const geometry = new THREE.BoxGeometry(W * 0.8, baseWidth, 30);
  
  // Material
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color().setHSL(Math.random(), 1, 0.7)
  });

  // Mesh
  const box = new THREE.Mesh(geometry, material);
  box.position.set(0, y - H/2, 0);

  scene.add(box);
  lines.push({ box, baseWidth, phase, speed, vy, material });
}

console.log(`Creadas ${lines.length} líneas`);

// 6. Animación
function animate() {
  requestAnimationFrame(animate);

  lines.forEach(line => {
    // Grosor variable
    const width = line.baseWidth + Math.sin(line.phase) * 8;
    line.box.scale.y = Math.max(0.2, width / line.baseWidth);

    // Movimiento vertical
    line.box.position.y += line.vy;
    if (line.box.position.y > H/2 + 50) {
      line.box.position.y = -H/2 - 50;
    }

    // Actualizar fase
    line.phase += line.speed;

    // Color dinámico
    const hue = (Date.now() * 0.03 + line.phase * 30) % 360;
    line.material.color.setHSL(hue / 360, 1, 0.7);
  });

  renderer.render(scene, camera);
}

animate();