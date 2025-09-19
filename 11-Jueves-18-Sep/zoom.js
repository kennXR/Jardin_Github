// --- Escena ---
const canvas = document.getElementById("lienzo");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaadfff);

const cam = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
cam.position.set(0, 2, 8);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// --- Luz ---
const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(5, 10, 5);
scene.add(light);

// --- Árbol ---
const loader = new THREE.TextureLoader();
let tree;

function makeTree(foliageTex, trunkTex) {
  const g = new THREE.Group();
  scene.add(g);

  const matF = new THREE.MeshStandardMaterial({ map: foliageTex, color: 0x2e8b57, roughness: 0.8, flatShading: true });
  const matT = new THREE.MeshStandardMaterial({ map: trunkTex, color: 0x8B5A2B, roughness: 1, flatShading: true });
  const sph = new THREE.SphereGeometry(1, 32, 32);

  // Follaje
  for (let l = 0; l < 5; l++) {
    const h = 1.2 + l * 0.55, r = 1.8 - l * 0.25;
    for (let i = 0; i < 22; i++) {
      const m = new THREE.Mesh(sph, matF);
      m.scale.set(0.32, 0.32, 0.32);
      const a = (i / 22) * Math.PI * 2;
      m.position.set(Math.cos(a) * (r + Math.random() * 0.2 - 0.1),
                     h + (Math.random() * 0.2 - 0.1),
                     Math.sin(a) * (r + Math.random() * 0.2 - 0.1));
      g.add(m);
    }
  }
  const top = new THREE.Mesh(sph, matF);
  top.scale.set(0.28, 0.28, 0.28);
  top.position.set(0, 1.2 + 5 * 0.55, 0);
  g.add(top);

  // Tronco
  for (let i = 0; i < 5; i++) {
    const bR = 0.35 * (1 - i * 0.08);
    const tR = 0.35 * (1 - (i + 1) * 0.08);
    const cyl = new THREE.CylinderGeometry(tR, bR, 0.7, 16);
    const trunk = new THREE.Mesh(cyl, matT);
    trunk.position.set(0, 0.35 + i * 0.7 - 1, 0);
    g.add(trunk);
  }
  return g;
}

// --- Animación ---
function animate() {
  requestAnimationFrame(animate);
  if (tree) tree.rotation.y += 0.002;
  renderer.render(scene, cam);
}
animate();

// --- Texturas ---
loader.load('./textura/t1.png', f => {
  loader.load('./textura/t2.png', t => {
    tree = makeTree(f, t);
  });
});

// --- Zoom ---
const initialZ = cam.position.z, minZ = 3.5;
document.getElementById("zoomIn").onclick  = () => gsap.to(cam.position, { z: minZ, duration: 1, ease: "power2.out" });
document.getElementById("zoomOut").onclick = () => gsap.to(cam.position, { z: initialZ, duration: 1, ease: "power2.out" });