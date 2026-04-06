/**
 * Devgenius — Search Bar Logic
 * Handles search input, autocomplete, history, and navigation
 */

(function initSearch() {
  const HISTORY_KEY = 'devgenius_history';
  const MAX_HISTORY = 12;

  // ─── History helpers ─────────────────────────────────────────────────────────
  function getHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
    catch { return []; }
  }

  function addToHistory(q) {
    const hist = getHistory().filter(h => h.toLowerCase() !== q.toLowerCase());
    hist.unshift(q);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(hist.slice(0, MAX_HISTORY)));
  }

  // ─── Navigate to results ────────────────────────────────────────────────────
  function navigate(q) {
    if (!q.trim()) return;
    addToHistory(q.trim());
    window.location.href = `/results.html?q=${encodeURIComponent(q.trim())}`;
  }

  // Make globally available
  window.searchFor = navigate;

  // ─── Hero Search Bar ─────────────────────────────────────────────────────────
  const input = document.getElementById('hero-search-input');
  const clearBtn = document.getElementById('hero-search-clear');
  const submitBtn = document.getElementById('hero-search-submit');
  const dropdown = document.getElementById('hero-dropdown');
  const dropdownItems = document.getElementById('dropdown-items');
  const dropdownLabel = document.getElementById('dropdown-label');

  if (!input) return;

  let selectedIndex = -1;
  let currentItems = [];
  let debounceTimer = null;

  // Animated placeholder
  const placeholders = [
    'Search anime characters...',
    'Try: space news nasa...',
    'Search: random dogs...',
    'Try: bitcoin price...',
    'Search: cocktail recipes...',
    'Try: studio ghibli films...',
    'Search: impressionist art...',
    'Try: funny jokes...',
    'Search: world countries...',
    'Try: pokemon pikachu...',
  ];

  let phIdx = 0;
  function rotatePlaceholder() {
    input.setAttribute('placeholder', placeholders[phIdx++ % placeholders.length]);
  }
  setInterval(rotatePlaceholder, 3001);

  // Clear button
  function updateClear() {
    clearBtn.classList.toggle('visible', input.value.length > 0);
  }

  clearBtn.addEventListener('click', () => {
    input.value = '';
    updateClear();
    input.focus();
    hideDropdown();
  });

  input.addEventListener('input', () => {
    updateClear();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => showSuggestions(input.value), 200);
  });

  // Submit
  function doSearch() {
    const q = input.value.trim();
    if (q) navigate(q);
  }

  submitBtn.addEventListener('click', doSearch);

  input.addEventListener('keydown', (e) => {
    const items = dropdownItems.querySelectorAll('.dropdown-item');
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && items[selectedIndex]) {
        input.value = currentItems[selectedIndex];
        hideDropdown();
        doSearch();
      } else {
        doSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      updateHighlight(items);
    } else if (e.key === 'Escape') {
      hideDropdown();
    }
  });

  function updateHighlight(items) {
    items.forEach((el, i) => el.classList.toggle('highlighted', i === selectedIndex));
    if (selectedIndex >= 0 && items[selectedIndex]) {
      input.value = currentItems[selectedIndex];
    }
  }

  async function showSuggestions(q) {
    selectedIndex = -1;

    if (!q) {
      // Show search history
      const hist = getHistory();
      if (hist.length === 0) { hideDropdown(); return; }
      dropdownLabel.textContent = 'Recent Searches';
      currentItems = hist;
      renderDropdownItems(hist, '🕐');
      showDropdown();
    } else {
      dropdownLabel.textContent = 'Suggestions';
      try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}`);
        const suggestions = await res.json();
        currentItems = suggestions;
        renderDropdownItems(suggestions, '🔍');
        showDropdown();
      } catch {
        currentItems = getHistory().filter(h => h.toLowerCase().includes(q.toLowerCase()));
        renderDropdownItems(currentItems, '🕐');
        if (currentItems.length) showDropdown(); else hideDropdown();
      }
    }
  }

  function renderDropdownItems(items, icon) {
    dropdownItems.innerHTML = items.map((item, i) => `
      <div class="dropdown-item" data-index="${i}">
        <div class="dropdown-item-icon">${icon}</div>
        <span>${escapeHtml(item)}</span>
      </div>
    `).join('');

    dropdownItems.querySelectorAll('.dropdown-item').forEach(el => {
      el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const idx = parseInt(el.getAttribute('data-index'));
        input.value = currentItems[idx];
        hideDropdown();
        doSearch();
      });
    });
  }

  function showDropdown() { dropdown.classList.add('visible'); }
  function hideDropdown() {
    dropdown.classList.remove('visible');
    selectedIndex = -1;
  }

  input.addEventListener('focus', () => {
    if (input.value) showSuggestions(input.value);
    else showSuggestions('');
  });

  document.addEventListener('mousedown', (e) => {
    if (!document.getElementById('hero-search-container').contains(e.target)) {
      hideDropdown();
    }
  });

  // ─── Category chips ──────────────────────────────────────────────────────────
  document.querySelectorAll('.hero-category-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      navigate(chip.getAttribute('data-query'));
    });
  });

  // ─── Nav search button ───────────────────────────────────────────────────────
  const navSearchBtn = document.getElementById('nav-search-btn');
  if (navSearchBtn) {
    navSearchBtn.addEventListener('click', () => {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(String(text)));
    return div.innerHTML;
  }
})();
