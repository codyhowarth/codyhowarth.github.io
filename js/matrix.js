// Subtle matrix rain behind the terminal pages.
// Visitors with reduced motion keep the static matrix2.jpg background instead.
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'term-rain';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  var ctx = canvas.getContext('2d');
  var glyphs = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモラリルレロワヲン0123456789ABCDEFZ';
  var size = 18;
  var stepMs = 80; // lower = faster rain
  var drops = [];
  var last = 0;

  // ponytail: canvas is not scaled for devicePixelRatio; slight blur suits a background
  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.fillStyle = '#070d09';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = size + 'px monospace';
    drops = [];
    for (var i = 0; i < Math.ceil(canvas.width / size); i++) {
      drops.push(-Math.random() * canvas.height / size); // staggered start
    }
  }

  function draw(t) {
    requestAnimationFrame(draw);
    if (t - last < stepMs) return;
    last = t;

    ctx.fillStyle = 'rgba(7, 13, 9, 0.08)'; // fade old glyphs into trails
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(143, 224, 172, 0.2)';
    for (var i = 0; i < drops.length; i++) {
      ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], i * size, drops[i] * size);
      drops[i] = drops[i] * size > canvas.height && Math.random() > 0.97 ? 0 : drops[i] + 1;
    }
  }

  addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();
