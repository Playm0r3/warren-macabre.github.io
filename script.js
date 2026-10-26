document.getElementById('year').textContent = new Date().getFullYear();
 
(function () {
  const c = document.getElementById('sky'), g = c.getContext('2d');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bodies = [
    { a: .30, e: .15, s: 1.0, r: 5,  p: 0 },
    { a: .52, e: .10, s: .55, r: 9,  p: 2.1 },
    { a: .75, e: .25, s: .32, r: 6,  p: 4.2 }
  ];
  let size = 0, dpr = 1;
 
  function resize() {
    dpr = window.devicePixelRatio || 1;
    size = c.clientWidth;
    c.width = c.height = Math.round(size * dpr);
  }
 
  function draw(t) {
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue('--muted').trim();
    const line = css.getPropertyValue('--line').trim();
    const sun = css.getPropertyValue('--sun').trim();
    const cx = size / 2, cy = size / 2, R = size / 2 * .95;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, size, size);
    g.lineWidth = 1;
 
    for (const b of bodies) {
      const a = b.a * R, bb = a * Math.sqrt(1 - b.e * b.e), f = a * b.e;
      g.strokeStyle = line;
      g.beginPath();
      g.ellipse(cx - f, cy, a, bb, 0, 0, Math.PI * 2);
      g.stroke();
      const ang = t * b.s + b.p;
      g.fillStyle = ink;
      g.beginPath();
      g.arc(cx - f + a * Math.cos(ang), cy + bb * Math.sin(ang), b.r, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = sun;
    g.beginPath();
    g.arc(cx, cy, 14, 0, Math.PI * 2);
    g.fill();
  }
 
  function loop(ms) { draw(ms / 1000 * .6); requestAnimationFrame(loop); }
 
  resize();
  addEventListener('resize', () => { resize(); if (still) draw(1); });
  if (still) draw(1); else requestAnimationFrame(loop);
})();