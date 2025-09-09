const canvas = document.getElementById("lienzo");

console.log("Tercer ejercicio: Autorretrato estilo Mondrian irregular");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const piel = "#E0AA82";
const cabello = "#111111";
const lentes = "#000000";
const ojos = "#222222";
const boca = "#C0392B";
const camisa = "#3A86FF";
const fondo = "#FFFFFF";

function rect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 6;
  ctx.strokeRect(x, y, w, h);
}

function randomSize(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

const caraW = randomSize(180, 240);
const caraH = randomSize(220, 280);
const caraX = canvas.width/2 - caraW/2;
const caraY = canvas.height/2 - caraH/2;

for (let y=0; y<canvas.height; ) {
  let h = randomSize(40, 120);
  for (let x=0; x<canvas.width; ) {
    let w = randomSize(40, 120);
    rect(x, y, w, h, fondo);
    x += w;
  }
  y += h;
}

rect(caraX - 80, caraY - 60, caraW+160, caraH+200, cabello);
rect(caraX, caraY, caraW, caraH, piel);

let lentesW = caraW/3;
let lentesH = caraH/6;
rect(caraX + caraW/8, caraY + caraH/3, lentesW, lentesH, lentes);
rect(caraX + caraW/2, caraY + caraH/3, lentesW, lentesH, lentes);

rect(caraX + caraW/8 + 15, caraY + caraH/3 + 15, 20, 20, ojos);
rect(caraX + caraW/2 + 15, caraY + caraH/3 + 15, 20, 20, ojos);

rect(caraX + caraW/2 - 15, caraY + caraH/2, 30, 40, "#8A5A3A");

rect(caraX + caraW/2 - 40, caraY + caraH/2 + 70, 80, 25, boca);

rect(caraX + caraW/2 - 40, caraY + caraH, 80, 60, piel);

rect(caraX - 60, caraY + caraH + 60, caraW+120, 160, camisa);