const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const W = canvas.width;
const H = canvas.height;


const lines = [];
for (let y = 0; y < H; y += 20) {
  lines.push({
    y: y,
    baseWidth: 2 + Math.random() * 3,   // grosor base
    phase: Math.random() * Math.PI * 2, // fase para animación
    speed: 0.02 + Math.random() * 0.02  // velocidad
  });
}

function draw() {
  // Clear canvas with transparent background to show CSS gradient
  ctx.clearRect(0, 0, W, H);

  ctx.strokeStyle = "#ffffff";

  lines.forEach(line => {

    const width = line.baseWidth + Math.sin(line.phase) * 3;
    ctx.lineWidth = Math.max(0.5, width);

    ctx.beginPath();
    ctx.moveTo(0, line.y);
    ctx.lineTo(W, line.y);
    ctx.stroke();

  
    line.phase += line.speed;
  });

  requestAnimationFrame(draw);
}

draw();