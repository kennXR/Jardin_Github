const canvas = document.getElementById("lienzo");

console.log("Tercer ejercicio: Autorretrato");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

const ctx = canvas.getContext('2d');

const W = canvas.width;
const H = canvas.height;
const cx = W / 2;
const cy = H / 2;
const u  = Math.min(W, H) / 12;

const piel = "#A47148";
const cabello = "#111111";
const marco = "#000000";
const camisa = "#3A86FF";

ctx.fillStyle = "#F5F5F5";
ctx.fillRect(0, 0, W, H);

ctx.fillStyle = piel;
ctx.fillRect(cx - 0.7*u, cy + 2.2*u, 1.4*u, 1.2*u);

ctx.fillStyle = camisa;
ctx.fillRect(cx - 3.2*u, cy + 3.2*u, 6.4*u, 3.0*u);

ctx.beginPath();
ctx.arc(cx, cy, 2.7*u, 0, Math.PI*2);
ctx.fillStyle = piel;
ctx.fill();

ctx.beginPath();
ctx.arc(cx - 2.7*u, cy + 0.2*u, 0.55*u, 0, Math.PI*2);
ctx.arc(cx + 2.7*u, cy + 0.2*u, 0.55*u, 0, Math.PI*2);
ctx.fillStyle = piel;
ctx.fill();

ctx.beginPath();
ctx.moveTo(cx - 3.2*u, cy - 0.3*u);
ctx.arc(cx, cy - 0.3*u, 3.2*u, Math.PI, 0);
ctx.lineTo(cx + 3.2*u, cy - 0.3*u);
ctx.closePath();
ctx.fillStyle = cabello;
ctx.fill();

ctx.beginPath();
ctx.moveTo(cx - 2.8*u, cy - 0.4*u);
ctx.lineTo(cx - 4.0*u, cy + 2.2*u);
ctx.lineTo(cx - 2.2*u, cy + 2.2*u);
ctx.closePath();
ctx.fillStyle = cabello;
ctx.fill();

ctx.beginPath();
ctx.moveTo(cx + 2.8*u, cy - 0.4*u);
ctx.lineTo(cx + 4.0*u, cy + 2.2*u);
ctx.lineTo(cx + 2.2*u, cy + 2.2*u);
ctx.closePath();
ctx.fillStyle = cabello;
ctx.fill();

ctx.lineWidth = Math.max(2, u*0.12);
ctx.strokeStyle = marco;
const anchoLente = 2.0*u;
const altoLente  = 1.2*u;
const sepLentes  = 0.5*u;

ctx.strokeRect(cx - sepLentes/2 - anchoLente, cy - 0.2*u - altoLente/2, anchoLente, altoLente);
ctx.strokeRect(cx + sepLentes/2,             cy - 0.2*u - altoLente/2, anchoLente, altoLente);

ctx.beginPath();
ctx.moveTo(cx - sepLentes/2, cy - 0.2*u);
ctx.lineTo(cx + sepLentes/2, cy - 0.2*u);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(cx - sepLentes/2 - anchoLente, cy - 0.2*u);
ctx.lineTo(cx - sepLentes/2 - anchoLente - 0.7*u, cy - 0.3*u);
ctx.moveTo(cx + sepLentes/2 + anchoLente, cy - 0.2*u);
ctx.lineTo(cx + sepLentes/2 + anchoLente + 0.7*u, cy - 0.3*u);
ctx.stroke();

ctx.fillStyle = "#222";
ctx.beginPath();
ctx.arc(cx - (sepLentes/2 + anchoLente/2), cy - 0.15*u, 0.18*u, 0, Math.PI*2);
ctx.arc(cx + (sepLentes/2 + anchoLente/2), cy - 0.15*u, 0.18*u, 0, Math.PI*2);
ctx.fill();

ctx.beginPath();
ctx.moveTo(cx, cy + 0.1*u);
ctx.lineTo(cx - 0.25*u, cy + 0.7*u);
ctx.lineTo(cx + 0.25*u, cy + 0.7*u);
ctx.closePath();
ctx.fillStyle = "#8A5A3A";
ctx.fill();

ctx.beginPath();
ctx.arc(cx, cy + 1.3*u, 0.7*u, 0.1*Math.PI, 0.9*Math.PI);
ctx.lineWidth = Math.max(2, u*0.1);
ctx.strokeStyle = "#7A2E2E";
ctx.stroke();