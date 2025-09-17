gsap.registerPlugin(MotionPathPlugin);

const b = document.querySelector(".boomerang");

window.addEventListener("click", () => {
  console.log("Animación iniciada");

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  gsap.set(b, { x: 0, y: 0, rotation: 0 });

  gsap.to(b, {
    duration: 3,
    ease: "power1.inOut",  // easing más visible para test
    motionPath: {
      path: [
        { x: 0, y: 0 },
        { x: vw * 0.1, y: -vh * 0.1 },
        { x: vw * 0.2, y: -vh * 0.05 },
        { x: vw * 0.1, y: vh * 0.05 },
        { x: 0, y: 0 }
      ],
      curviness: 1.5,
      autoRotate: true,
    },
    rotation: "+=1080"
  });
});