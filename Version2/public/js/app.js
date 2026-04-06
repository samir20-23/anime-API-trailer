/**
 * Devgenius — App Init
 * Stars animation, navbar scroll, categories load, trending, stats counter
 */

// ─── Stars Canvas ─────────────────────────────────────────────────────────────
(function initStars() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const stars = Array.from({ length: 220 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.7 + 0.1,
    speed: Math.random() * 0.3 + 0.05,
    twinkle: Math.random() * Math.PI * 2
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() * 0.001;

    stars.forEach(s => {
      s.twinkle += s.speed * 0.015;
      const alpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars.forEach(s => {
      s.x = Math.random() * W;
      s.y = Math.random() * H;
    });
  });
})();

// ─── Navbar scroll effect ─────────────────────────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ─── Scroll indicator ─────────────────────────────────────────────────────────
(function initScroll() {
  const scrollDown = document.getElementById('scroll-down');
  if (!scrollDown) return;

  scrollDown.addEventListener('click', () => {
    document.getElementById('discovery')?.scrollIntoView({ behavior: 'smooth' });
  });
})();

// ─── Animated counter ─────────────────────────────────────────────────────────
(function initCounter() {
  const statEl = document.getElementById('stat-apis');
  if (!statEl) return;

  // Fetch real count from registry
  fetch('/api/categories')
    .then(r => r.json())
    .then(cats => {
      const total = cats.reduce((s, c) => s + c.count, 0);
      if (total > 0) {
        let count = 0;
        const target = total;
        const duration = 1500;
        const step = Math.ceil(target / (duration / 16));
        const interval = setInterval(() => {
          count = Math.min(count + step, target);
          statEl.textContent = count.toLocaleString() + '+';
          if (count >= target) clearInterval(interval);
        }, 16);
      }
    })
    .catch(() => { });
})();

// ─── Load categories ──────────────────────────────────────────────────────────
(async function initCategories() {
  const grid = document.getElementById('category-grid');
  const countLabel = document.getElementById('category-count');
  if (!grid) return;

  try {
    const res = await fetch('/api/categories');
    const cats = await res.json();

    if (countLabel) {
      countLabel.textContent = `${cats.length} categories, ${cats.reduce((s, c) => s + c.count, 0).toLocaleString()}+ APIs indexed`;
    }

    grid.innerHTML = '';
    cats.forEach((cat, i) => {
      const card = document.createElement('div');
      card.className = 'category-card animate-fade-up';
      card.style.animationDelay = `${i * 0.03}s`;
      card.innerHTML = `
        <div class="category-card-emoji">${cat.emoji}</div>
        <div class="category-card-name">${cat.name}</div>
        <div class="category-card-count">${cat.count}</div>
      `;
      card.addEventListener('click', () => {
        window.location.href = `/results.html?q=${encodeURIComponent(cat.keywords?.[0] || cat.name)}`;
      });
      grid.appendChild(card);
    });
  } catch (err) {
    console.warn('Categories load error:', err);
    grid.innerHTML = '<p style="color:var(--text-muted); padding:20px;">Could not load categories.</p>';
  }
})();

// ─── Load trending ─────────────────────────────────────────────────────────────
(async function initTrending() {
  const container = document.getElementById('trending-chips');
  if (!container) return;

  try {
    const res = await fetch('/api/trending');
    const trending = await res.json();

    container.innerHTML = trending.map(t => `
      <button class="trending-chip" onclick="window.location.href='/results.html?q=${encodeURIComponent(t.query)}'">
        <span>${t.emoji}</span>
        ${t.query}
      </button>
    `).join('');
  } catch {
    container.innerHTML = `
      <button class="trending-chip" onclick="window.location.href='/results.html?q=anime'">⛩️ Anime</button>
      <button class="trending-chip" onclick="window.location.href='/results.html?q=pokemon'">⚡ Pokemon</button>
      <button class="trending-chip" onclick="window.location.href='/results.html?q=space news'">🚀 Space</button>
    `;
  }
})();

// ─── Toast notifications ──────────────────────────────────────────────────────
window.showToast = function (msg, duration = 3001) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};
