console.log("Octavo ejercicio: Boomerang");
console.log(gsap);

gsap.registerPlugin(MotionPathPlugin);

const b = document.querySelector(".boomerang");

window.addEventListener("click", () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Reinicia boomerang en posición inicial
  gsap.set(b, { x: 0, y: 0, rotation: 0 });

  gsap.to(b, {
    duration: 4,
    ease: "power1.inOut",
    motionPath: {
      path: [
        { x: 0, y: 0 },                             // Inicio
        { x: vw * 0.3, y: -vh * 0.3 },              // Subida diagonal
        { x: vw * 0.6, y: -vh * 0.1 },              // Punto más alejado (derecha)
        { x: vw * 0.3, y: vh * 0.2 },               // Curva de regreso (baja a la izquierda)
        { x: 0, y: 0 }                              // Regresa al origen
      ],
      curviness: 1.5,
      autoRotate: true
    },
    rotation: "+=1080"
  });
});