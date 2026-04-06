/**
 * Devgenius — Adaptive Card Renderer
 * Creates beautiful, adaptive result cards based on content type
 */

function getCategoryEmoji(category) {
  const emojis = {
    'Animals': '🐾', 'Anime': '⛩️', 'Art & Design': '🎨', 'Books': '📚',
    'Business': '💼', 'Calendar': '📅', 'Cryptocurrency': '₿', 'Currency Exchange': '💱',
    'Development': '⚙️', 'Dictionaries': '📖', 'Entertainment': '🎭', 'Environment': '🌿',
    'Finance': '📈', 'Food & Drink': '🍔', 'Games & Comics': '🎮', 'Geocoding': '🗺️',
    'Government': '🏛️', 'Health': '❤️', 'Jobs': '💼', 'Machine Learning': '🤖',
    'Music': '🎵', 'News': '📰', 'Open Data': '📊', 'Photography': '📷',
    'Science & Math': '🔬', 'Security': '🔒', 'Shopping': '🛍️', 'Social': '💬',
    'Sports & Fitness': '⚽', 'Test Data': '🧪', 'Transportation': '✈️',
    'Video': '🎬', 'Weather': '🌤️'
  };
  return emojis[category] || '🔮';
}

function truncate(str, n) {
  if (!str) return '';
  return str.length > n ? str.slice(0, n) + '…' : str;
}

function buildCard(item) {
  const hasImage = item.image && item.image.startsWith('http');
  const cat = item.category || 'Discovery';
  const emoji = getCategoryEmoji(cat);
  const tags = (item.tags || []).slice(0, 3).filter(Boolean);

  const typeClass = `content-type-${item.contentType || 'text'}`;
  const typeName = (item.contentType || 'text').toUpperCase();

  const card = document.createElement('div');
  card.className = 'card result-card animate-fade-up';
  card.setAttribute('data-category', cat);
  card.setAttribute('data-type', item.contentType || 'text');
  card.setAttribute('data-source', item.source || '');

  let imageHtml;
  if (hasImage) {
    imageHtml = `
      <div style="position:relative;">
        <img
          class="card-image"
          src="${escapeHtml(item.image)}"
          alt="${escapeHtml(item.title)}"
          loading="lazy"
          onerror="this.parentElement.innerHTML='<div class=\\'card-img-placeholder\\'><span>${emoji}</span></div>'"
        />
        <span class="content-type-badge ${typeClass}" style="position:absolute; top:10px; right:10px;">${typeName}</span>
      </div>
    `;
  } else {
    imageHtml = `
      <div class="card-img-placeholder" style="position:relative;">
        <span>${emoji}</span>
        <span class="content-type-badge ${typeClass}" style="position:absolute; top:10px; right:10px;">${typeName}</span>
      </div>
    `;
  }

  const desc = truncate(item.description || '', 120);
  const tagsHtml = tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');

  card.innerHTML = `
    ${imageHtml}
    <div class="card-body">
      <div class="card-source">${emoji} ${escapeHtml(item.source || cat)}</div>
      <h3 class="card-title">${escapeHtml(truncate(item.title || '', 80))}</h3>
      ${desc ? `<p class="card-desc">${escapeHtml(desc)}</p>` : ''}
      ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
    </div>
    ${item.url ? `
      <div class="card-footer">
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer"
           style="font-size:0.75rem; color:var(--text-muted); transition:color 0.2s;"
           onmouseover="this.style.color='var(--accent-violet)'"
           onmouseout="this.style.color='var(--text-muted)'">
          View Source ↗
        </a>
        <span style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(cat)}</span>
      </div>
    ` : ''}
  `;

  // Click handler — open URL or copy to clipboard
  card.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
    if (item.url) {
      window.open(item.url, '_blank', 'noopener');
    } else if (item.image) {
      window.open(item.image, '_blank', 'noopener');
    }
  });

  if (item.url || item.image) {
    card.style.cursor = 'pointer';
  }

  return card;
}

function buildSkeletonCard() {
  const div = document.createElement('div');
  div.className = 'skeleton-card';
  div.innerHTML = `
    <div class="skeleton skeleton-image" style="aspect-ratio:16/10;"></div>
    <div class="skeleton-body">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-desc"></div>
      <div class="skeleton skeleton-desc"></div>
    </div>
  `;
  return div;
}

function renderSkeletons(container, count = 8) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    container.appendChild(buildSkeletonCard());
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(text)));
  return div.innerHTML;
}

// Expose globally
window.CardRenderer = { buildCard, buildSkeletonCard, renderSkeletons, getCategoryEmoji };
