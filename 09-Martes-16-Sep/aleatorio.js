const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const W = canvas.width;
const H = canvas.height;

let t = 0;

function draw() {
  t += 0.02;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.translate(W / 2, H / 2);

  for (let i = 0; i < 40; i++) {
    let r = Math.max(5, i * 20 + Math.sin(t + i * 0.2) * 15);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = i % 2 === 0 ? "black" : "white";
    ctx.lineWidth = 20;
    ctx.stroke();
  }

  ctx.restore();
  requestAnimationFrame(draw);
}

draw();