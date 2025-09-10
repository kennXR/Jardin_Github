const canvas = document.getElementById("lienzo");
console.log(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const W = canvas.width;
const H = canvas.height;


ctx.fillStyle = "#ffffff";



ctx.strokeStyle = "blue";
ctx.lineWidth = 2;

for (let y = 0; y < H; y += 20) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(W, y);
  ctx.stroke();
}