/* ===========================
   VENOM CORE — main.js
   =========================== */

// ── Navbar scroll state ──────────────────────────────────────────────────────
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Mobile menu ──────────────────────────────────────────────────────────────
(function () {
  const burger = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mobile-close');
  if (!burger || !mobileNav) return;

  const open = () => {
    mobileNav.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    mobileNav.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

// ── Active nav link ──────────────────────────────────────────────────────────
(function () {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path || (path === '' && href === '/') || (path.endsWith('index.html') && href === '/')) {
      a.classList.add('active');
    }
  });
})();

// ── Intersection Observer — fade-in ─────────────────────────────────────────
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// ── Hero canvas particle field ───────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  const rand = (min, max) => Math.random() * (max - min) + min;

  const init = () => {
    particles = Array.from({ length: 80 }, () => ({
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.15, 0.15), vy: rand(-0.25, -0.05),
      size: rand(1, 2.5),
      alpha: rand(0.2, 0.7),
      color: Math.random() > 0.75 ? '#ff6b2b' : '#00ff9c',
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -4) p.y = H + 4;
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
    });
    animId = requestAnimationFrame(draw);
  };

  resize();
  init();
  draw();
  window.addEventListener('resize', () => { cancelAnimationFrame(animId); resize(); init(); draw(); });
})();

// ── Stat counter animation ───────────────────────────────────────────────────
(function () {
  const stats = document.querySelectorAll('[data-count]');
  if (!stats.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  stats.forEach(s => io.observe(s));
})();

// ── Contact form handling ────────────────────────────────────────────────────
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<span>Sending…</span>';
    btn.disabled = true;

    // Simulate async submission (replace with real fetch/netlify form handling)
    setTimeout(() => {
      form.reset();
      btn.innerHTML = original;
      btn.disabled = false;
      if (successMsg) {
        successMsg.style.display = 'flex';
        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
      }
    }, 1200);
  });
})();

// ── Smooth parallax for hero bg ──────────────────────────────────────────────
(function () {
  const heroBg = document.querySelector('.hero-bg-parallax');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.35}px)`;
  }, { passive: true });
})();
