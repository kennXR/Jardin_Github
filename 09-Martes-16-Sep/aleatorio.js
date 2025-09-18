const rect = document.getElementById("rect");

rect.addEventListener("click", e => {
  const W = window.innerWidth, H = window.innerHeight;
  const rw = rect.offsetWidth, rh = rect.offsetHeight;

  let x = Math.random() * (W - rw);
  let y = Math.random() * (H - rh);

  if (Math.abs(x - e.clientX) < 100 && Math.abs(y - e.clientY) < 100) {
    x += (x > e.clientX ? 100 : -100);
    y += (y > e.clientY ? 100 : -100);
  }

  gsap.to(rect, {
    x: Math.min(Math.max(0, x), W - rw),
    y: Math.min(Math.max(0, y), H - rh),
    duration: 0.6
  });
});