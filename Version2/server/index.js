/**
 * Devgenius — Express Server
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { getRegistry, getAllCategories, searchCategoriesByQuery, CATEGORY_EMOJIS } = require('./registry');
const { search } = require('./search');
const { getRandomDiscovery } = require('./discovery');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ─── Simple in-memory cache ───────────────────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute

function fromCache(key) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < CACHE_TTL) return hit.data;
  return null;
}
function toCache(key, data) {
  cache.set(key, { data, ts: Date.now() });
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/registry — Full API registry grouped by category
app.get('/api/registry', (req, res) => {
  const cached = fromCache('registry');
  if (cached) return res.json(cached);
  const data = getRegistry();
  toCache('registry', data);
  res.json(data);
});

// GET /api/categories — All categories with metadata
app.get('/api/categories', (req, res) => {
  const cached = fromCache('categories');
  if (cached) return res.json(cached);
  const data = getAllCategories();
  toCache('categories', data);
  res.json(data);
});

// GET /api/search?q=... — Smart search
app.get('/api/search', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.status(400).json({ error: 'Missing query parameter q' });

  const cacheKey = `search:${q.toLowerCase()}`;
  const cached = fromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const results = await search(q);
    toCache(cacheKey, results);
    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed', message: err.message });
  }
});

// GET /api/random?count=16 — Random discovery items
app.get('/api/random', async (req, res) => {
  const count = Math.min(parseInt(req.query.count) || 16, 40);

  try {
    const results = await getRandomDiscovery(count);
    res.json({ count: results.length, results });
  } catch (err) {
    console.error('Discovery error:', err);
    res.status(500).json({ error: 'Discovery failed', message: err.message });
  }
});

// GET /api/trending — Trending topics
app.get('/api/trending', (req, res) => {
  const trending = [
    { query: 'Pokemon', category: 'Games & Comics', emoji: '⚡' },
    { query: 'Space news', category: 'Science & Math', emoji: '🚀' },
    { query: 'Anime', category: 'Anime', emoji: '⛩️' },
    { query: 'Random dogs', category: 'Animals', emoji: '🐕' },
    { query: 'Bitcoin', category: 'Cryptocurrency', emoji: '₿' },
    { query: 'Cocktail recipes', category: 'Food & Drink', emoji: '🍹' },
    { query: 'Rick and Morty', category: 'Games & Comics', emoji: '🛸' },
    { query: 'Impressionism art', category: 'Art & Design', emoji: '🎨' },
    { query: 'Jazz music', category: 'Music', emoji: '🎷' },
    { query: 'Countries world', category: 'Geocoding', emoji: '🗺️' },
    { query: 'Pokemon Pikachu', category: 'Games & Comics', emoji: '⚡' },
    { query: 'Funny jokes', category: 'Entertainment', emoji: '😂' },
    { query: 'Genshin Impact', category: 'Games & Comics', emoji: '✨' },
    { query: 'Studio Ghibli', category: 'Anime', emoji: '🌸' },
    { query: 'Weather London', category: 'Weather', emoji: '🌤️' }
  ];
  res.json(trending);
});

// GET /api/suggest?q=... — Search suggestions
app.get('/api/suggest', (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  const suggestions = [
    'anime characters', 'random dogs', 'space news', 'bitcoin price',
    'cocktail recipes', 'pokemon pikachu', 'rick and morty', 'impressionist art',
    'jazz music', 'world countries', 'funny jokes', 'genshin impact',
    'studio ghibli films', 'weather forecast', 'nobel prize winners',
    'free games', 'open library books', 'random fox', 'color palette',
    'cryptocurrency markets', 'classic literature', 'disney characters'
  ];

  const matched = q
    ? suggestions.filter(s => s.includes(q)).slice(0, 8)
    : suggestions.slice(0, 8);

  res.json(matched);
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Devgenius server running at http://localhost:${PORT}`);
  console.log(`📚 API Registry loaded with ${Object.keys(getRegistry()).length} categories`);
  const total = Object.values(getRegistry()).reduce((s, v) => s + v.length, 0);
  console.log(`🔌 Total APIs indexed: ${total}`);
  console.log(`\nReady to search everything! ✨\n`);
});
