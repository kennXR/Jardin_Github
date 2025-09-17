console.log("Octavo ejercicio: Boomerang");
console.log(gsap);

const b = document.querySelector(".boomerang");

window.addEventListener("click", () => {
  // Resetear posición inicial
  gsap.set(b, { x: 0, y: 0, rotation: 0 });
  
  // Crear timeline para animación de boomerang
  const tl = gsap.timeline();
  
  tl.to(b, {
    duration: 1,
    x: 200,
    y: -100,
    rotation: 180,
    ease: "power2.out"
  })
  .to(b, {
    duration: 1,
    x: 400,
    y: -50,
    rotation: 360,
    ease: "power2.in"
  })
  .to(b, {
    duration: 1,
    x: 0,
    y: 0,
    rotation: 540,
    ease: "power2.inOut"
  });
});
