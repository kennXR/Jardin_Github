const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Colores
const piel = "#c19e83";
const cabello = "#111111";
const lentes = "#ffffff";
const ojos = "#000000";
const boca = "#ffa3a3";
const camisa = "#670000";
const fondo = "#FFFFFF";
const fondoAzul = "#b3d9ff"; // azul pastel

function randomSize(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function drawRect(r, color) {
  ctx.fillStyle = color;
  ctx.fillRect(r.x, r.y, r.w, r.h);
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 6;
  ctx.strokeRect(r.x, r.y, r.w, r.h);
}

// 1. Retícula irregular
let grid = [];
for (let y = 0; y < canvas.height; ) {
  let h = randomSize(40, 120);
  for (let x = 0; x < canvas.width; ) {
    let w = randomSize(40, 120);
    grid.push({ x, y, w, h });
    x += w;
  }
  y += h;
}

// 2. Zona del retrato
const caraW = 200;
const caraH = 260;
const caraX = canvas.width / 2 - caraW / 2;
const caraY = canvas.height / 2 - caraH / 2;

// Márgenes para el cabello
const margenCabelloArriba = 100; // límite hacia arriba
const margenCabello = 80;        // extensión hacia los lados

// 3. Pintar cada celda
for (let r of grid) {
  // 👇 Fondo aleatorio: 70% blanco, 30% azul pastel
  let color = Math.random() < 0.3 ? fondoAzul : fondo;

  // Cara
  if (
    r.x + r.w > caraX &&
    r.x < caraX + caraW &&
    r.y + r.h > caraY &&
    r.y < caraY + caraH
  ) {
    color = piel;
  }

  // Cabello general arriba (con límite)
  if (
    r.y + r.h < caraY + caraH / 4 &&
    r.y + r.h > caraY - margenCabelloArriba &&
    r.x + r.w > caraX - 40 &&
    r.x < caraX + caraW + 40
  ) {
    color = cabello;
  }

  // Cabello a los lados (con límite)
  if (
    // lado izquierdo
    (r.x + r.w <= caraX &&
     r.x + r.w > caraX - margenCabello &&
     r.y + r.h > caraY && r.y < caraY + caraH) ||

    // lado derecho
    (r.x >= caraX + caraW &&
     r.x < caraX + caraW + margenCabello &&
     r.y + r.h > caraY && r.y < caraY + caraH)
  ) {
    color = cabello;
  }

  // Camisa
  if (
    r.y > caraY + caraH &&
    r.y < caraY + caraH + 160 &&
    r.x + r.w > caraX - 60 &&
    r.x < caraX + caraW + 60
  ) {
    color = camisa;
  }

  // Lentes
  if (
    r.y > caraY + caraH / 3 &&
    r.y < caraY + caraH / 2 &&
    ((r.x > caraX + caraW / 8 && r.x < caraX + caraW / 2.5) ||
      (r.x > caraX + caraW / 2 && r.x < caraX + caraW * 0.85))
  ) {
    color = lentes;
  }

  // Ojos
  if (
    r.y > caraY + caraH / 3 + 10 &&
    r.y < caraY + caraH / 2 &&
    ((r.x > caraX + caraW / 4 && r.x < caraX + caraW / 3) ||
      (r.x > caraX + caraW * 0.65 && r.x < caraX + caraW * 0.75))
  ) {
    color = ojos;
  }

  // Boca
  if (
    r.y > caraY + caraH * 0.7 &&
    r.y < caraY + caraH * 0.85 &&
    r.x > caraX + caraW / 3 &&
    r.x < caraX + caraW * 0.66
  ) {
    color = boca;
  }

  drawRect(r, color);
}