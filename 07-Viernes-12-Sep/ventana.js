console.log("Septimo ejercicio: Ayuste de ventanas");
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
