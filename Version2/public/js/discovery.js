/**
 * Devgenius — Landing Page Discovery Section
 * Loads random items from multiple APIs and renders them on the homepage
 */

(async function initDiscovery() {
  const grid = document.getElementById('discovery-grid');
  const loadingEl = document.getElementById('discovery-loading');
  const shuffleBtn = document.getElementById('shuffle-btn');

  async function loadDiscovery() {
    grid.innerHTML = '';
    loadingEl.innerHTML = '';

    // Show skeletons
    for (let i = 0; i < 8; i++) {
      loadingEl.appendChild(CardRenderer.buildSkeletonCard());
    }
    loadingEl.style.display = 'grid';
    grid.style.display = 'none';

    if (shuffleBtn) {
      shuffleBtn.classList.add('loading');
      shuffleBtn.disabled = true;
    }

    try {
      const res = await fetch('/api/random?count=12');
      const data = await res.json();
      const items = data.results || [];

      loadingEl.style.display = 'none';
      grid.style.display = 'grid';
      grid.innerHTML = '';

      if (items.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1/-1;">
            <span class="empty-state-icon">🔭</span>
            <h3 class="empty-state-title">APIs are warming up</h3>
            <p class="empty-state-desc">Some APIs are waking up. Try shuffling in a moment!</p>
          </div>
        `;
      } else {
        items.forEach(item => {
          grid.appendChild(CardRenderer.buildCard(item));
        });
      }
    } catch (err) {
      console.warn('Discovery load error:', err);
      loadingEl.style.display = 'none';
      grid.style.display = 'grid';
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1;">
          <span class="empty-state-icon">📡</span>
          <h3 class="empty-state-title">Connection issue</h3>
          <p class="empty-state-desc">Couldn't reach the discovery endpoint. Make sure the server is running.</p>
        </div>
      `;
    } finally {
      if (shuffleBtn) {
        shuffleBtn.classList.remove('loading');
        shuffleBtn.disabled = false;
      }
    }
  }

  // Initial load
  await loadDiscovery();

  // Shuffle button
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', loadDiscovery);
  }
})();
