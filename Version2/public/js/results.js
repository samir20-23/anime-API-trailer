/**
 * Devgenius — Results Page Logic
 * Loads search results, renders cards, handles filters and sorting
 */

(async function initResults() {
  const query = new URLSearchParams(window.location.search).get('q') || '';
  const searchInput = document.getElementById('results-search-input');
  const searchBtn = document.getElementById('results-search-btn');
  const resultsGrid = document.getElementById('results-grid');
  const resultsLoading = document.getElementById('results-loading');
  const resultsCount = document.getElementById('results-count');
  const resultsEmpty = document.getElementById('results-empty');
  const loadMoreArea = document.getElementById('load-more-area');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const categoryPills = document.getElementById('results-category-pills');
  const categoryFilters = document.getElementById('category-filters');
  const sourceFilters = document.getElementById('source-filters');

  if (searchInput) searchInput.value = query;
  document.title = query ? `"${query}" — Devgenius` : 'Search Results — Devgenius';

  let allResults = [];
  let filteredResults = [];
  let currentPage = 0;
  const PAGE_SIZE = 24;

  const activeFilters = {
    types: new Set(),
    categories: new Set(),
    sources: new Set()
  };

  let currentSort = 'relevance';
  let isListView = false;

  // ─── Navbar scroll effect ───────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ─── Search again ───────────────────────────────────────────────────────────
  function navigateSearch() {
    const q = (searchInput?.value || '').trim();
    if (q) window.location.href = `/results.html?q=${encodeURIComponent(q)}`;
  }

  searchBtn?.addEventListener('click', navigateSearch);
  searchInput?.addEventListener('keydown', e => { if (e.key === 'Enter') navigateSearch(); });

  // ─── Skeleton loading ───────────────────────────────────────────────────────
  function showLoading() {
    resultsLoading.innerHTML = '';
    resultsLoading.style.display = 'grid';
    resultsLoading.className = 'results-loading';
    for (let i = 0; i < 12; i++) {
      resultsLoading.appendChild(CardRenderer.buildSkeletonCard());
    }
    resultsGrid.style.display = 'none';
    if (resultsEmpty) resultsEmpty.classList.add('hidden');
  }

  function hideLoading() {
    resultsLoading.style.display = 'none';
    resultsGrid.style.display = 'grid';
  }

  // ─── Fetch results ──────────────────────────────────────────────────────────
  async function fetchResults(q) {
    showLoading();
    resultsCount.textContent = `Searching for "${q}"...`;

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      allResults = data.results || [];
      const cats = data.categories || [];

      // Category pills
      if (categoryPills) {
        categoryPills.innerHTML = cats.map(cat => `
          <span class="category-pill">
            ${CardRenderer.getCategoryEmoji(cat)} ${cat}
          </span>
        `).join('');
      }

      buildFilters(allResults);
      applyFiltersAndSort();

      resultsCount.textContent = `${allResults.length} results for "${q}"`;

      // Update page title with stat-apis count
      if (allResults.length === 0) {
        resultsEmpty?.classList.remove('hidden');
      }

    } catch (err) {
      console.error('Results fetch error:', err);
      hideLoading();
      resultsCount.textContent = 'Error loading results';
      resultsGrid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <span class="empty-state-icon">⚠️</span>
          <h3 class="empty-state-title">Something went wrong</h3>
          <p class="empty-state-desc">Could not load results. Make sure the server is running on port 3001.</p>
        </div>
      `;
      resultsGrid.style.display = 'grid';
      resultsLoading.style.display = 'none';
    }
  }

  // ─── Build dynamic filters ──────────────────────────────────────────────────
  function buildFilters(results) {
    // Count content types
    const typeCounts = {};
    const catCounts = {};
    const srcCounts = {};

    results.forEach(r => {
      typeCounts[r.contentType] = (typeCounts[r.contentType] || 0) + 1;
      catCounts[r.category] = (catCounts[r.category] || 0) + 1;
      srcCounts[r.source] = (srcCounts[r.source] || 0) + 1;
    });

    // Update type counts
    ['image', 'text', 'data', 'video'].forEach(type => {
      const el = document.getElementById(`count-${type}`);
      if (el) el.textContent = typeCounts[type] || 0;
    });

    // Category filters
    if (categoryFilters) {
      const cats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
      categoryFilters.innerHTML = cats.map(([cat, count]) => `
        <div class="filter-option" data-filter="category" data-value="${cat}">
          <div class="filter-checkbox"></div>
          <span class="filter-label">${CardRenderer.getCategoryEmoji(cat)} ${cat}</span>
          <span class="filter-count">${count}</span>
        </div>
      `).join('');
    }

    // Source filters
    if (sourceFilters) {
      const srcs = Object.entries(srcCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
      sourceFilters.innerHTML = srcs.map(([src, count]) => `
        <div class="filter-option" data-filter="source" data-value="${src}">
          <div class="filter-checkbox"></div>
          <span class="filter-label">${src}</span>
          <span class="filter-count">${count}</span>
        </div>
      `).join('');
    }

    // Attach filter click handlers
    document.querySelectorAll('.filter-option').forEach(option => {
      // Remove any previously attached listeners to avoid duplicates if buildFilters is run again
      const newOption = option.cloneNode(true);
      option.parentNode.replaceChild(newOption, option);

      newOption.addEventListener('click', () => {
        const filterType = newOption.getAttribute('data-filter');
        const value = newOption.getAttribute('data-value');
        const checkbox = newOption.querySelector('.filter-checkbox');

        let filterSet;
        if (filterType === 'type') filterSet = activeFilters.types;
        else if (filterType === 'category') filterSet = activeFilters.categories;
        else if (filterType === 'source') filterSet = activeFilters.sources;

        if (filterSet.has(value)) {
          filterSet.delete(value);
          checkbox.classList.remove('checked');
        } else {
          filterSet.add(value);
          checkbox.classList.add('checked');
        }

        applyFiltersAndSort();
      });
    });
  }

  // ─── Apply filters + sort ────────────────────────────────────────────────────
  function applyFiltersAndSort() {
    filteredResults = allResults.filter(r => {
      if (activeFilters.types.size > 0 && !activeFilters.types.has(r.contentType)) return false;
      if (activeFilters.categories.size > 0 && !activeFilters.categories.has(r.category)) return false;
      if (activeFilters.sources.size > 0 && !activeFilters.sources.has(r.source)) return false;
      return true;
    });

    if (currentSort === 'category') {
      filteredResults.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
    } else if (currentSort === 'source') {
      filteredResults.sort((a, b) => (a.source || '').localeCompare(b.source || ''));
    }
    // 'relevance' keeps server order

    currentPage = 0;
    resultsGrid.innerHTML = '';
    renderPage();
  }

  // ─── Render a page of results ────────────────────────────────────────────────
  function renderPage() {
    hideLoading();
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const slice = filteredResults.slice(start, end);

    if (filteredResults.length === 0) {
      resultsEmpty?.classList.remove('hidden');
      loadMoreArea.style.display = 'none';
      resultsCount.textContent = `No results for "${query}"`;
    } else {
      resultsEmpty?.classList.add('hidden');
      resultsCount.textContent = `${filteredResults.length} result${filteredResults.length !== 1 ? 's' : ''} for "${query}"`;
    }

    slice.forEach((item, i) => {
      const card = CardRenderer.buildCard(item);
      card.style.animationDelay = `${(i % PAGE_SIZE) * 0.04}s`;
      resultsGrid.appendChild(card);
    });

    // Load more button
    const hasMore = end < filteredResults.length;
    loadMoreArea.style.display = hasMore ? 'block' : 'none';
  }

  // ─── Load more ───────────────────────────────────────────────────────────────
  loadMoreBtn?.addEventListener('click', () => {
    currentPage++;
    renderPage();
  });

  // ─── Sort tabs ───────────────────────────────────────────────────────────────
  document.querySelectorAll('.sort-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sort-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentSort = tab.getAttribute('data-sort');
      applyFiltersAndSort();
    });
  });

  // ─── View toggle ─────────────────────────────────────────────────────────────
  document.getElementById('grid-view')?.addEventListener('click', () => {
    isListView = false;
    resultsGrid.classList.remove('list-view');
    document.getElementById('grid-view').classList.add('active');
    document.getElementById('list-view')?.classList.remove('active');
  });

  document.getElementById('list-view')?.addEventListener('click', () => {
    isListView = true;
    resultsGrid.classList.add('list-view');
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view')?.classList.remove('active');
  });

  // ─── Clear filters ────────────────────────────────────────────────────────────
  document.getElementById('filters-clear')?.addEventListener('click', () => {
    activeFilters.types.clear();
    activeFilters.categories.clear();
    activeFilters.sources.clear();
    document.querySelectorAll('.filter-checkbox').forEach(el => el.classList.remove('checked'));
    applyFiltersAndSort();
  });

  // ─── Mobile filters toggle ────────────────────────────────────────────────────
  const filtersToggle = document.getElementById('filters-toggle');
  const filtersSidebar = document.getElementById('filters-sidebar');
  if (window.innerWidth <= 1024 && filtersToggle) {
    filtersToggle.style.display = 'flex';
    filtersToggle.addEventListener('click', () => {
      filtersSidebar.classList.toggle('mobile-open');
    });
  }

  // ─── Start ──────────────────────────────────────────────────────────────────
  if (query) {
    fetchResults(query);
  } else {
    hideLoading();
    resultsCount.textContent = 'No query provided';
    resultsEmpty?.classList.remove('hidden');
  }

})();
