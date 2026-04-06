/**
 * Devgenius API Registry
 * Parses both README files from apis/ and public-apis/ directories
 * Builds a comprehensive registry of 1000+ public APIs
 */

const fs = require('fs');
const path = require('path');

// ─── Keyword maps for smart search ───────────────────────────────────────────
const CATEGORY_KEYWORDS = {
  'Animals': ['cat', 'cats', 'dog', 'dogs', 'animal', 'animals', 'pet', 'pets', 'wildlife', 'fox', 'duck', 'bird', 'birds', 'fish', 'bear', 'wolf', 'rabbit', 'shiba', 'puppy', 'kitten', 'axolotl', 'zoo', 'nature', 'creature'],
  'Anime': ['anime', 'manga', 'naruto', 'ghibli', 'waifu', 'jikan', 'otaku', 'animation', 'japanese', 'cartoon', 'studio', 'one piece', 'attack', 'titan', 'demon', 'dragonball', 'pokemon', 'hentai', 'neko', 'sayings', 'character'],
  'Art & Design': ['art', 'design', 'color', 'colour', 'palette', 'icon', 'icons', 'museum', 'paint', 'painting', 'artist', 'creative', 'illustration', 'graphic', 'aesthetic', 'beautiful', 'svg', 'visual', 'pattern', 'font', 'typography'],
  'Books': ['book', 'books', 'library', 'literature', 'read', 'reading', 'author', 'novel', 'poetry', 'poem', 'bible', 'quran', 'scripture', 'text', 'story', 'fiction', 'nonfiction', 'gutenberg', 'publish'],
  'Business': ['business', 'company', 'corporate', 'startup', 'enterprise', 'commerce', 'market', 'email', 'trello', 'kanban', 'work', 'office', 'professional'],
  'Calendar': ['calendar', 'holiday', 'holidays', 'date', 'event', 'schedule', 'day', 'week', 'month', 'year', 'time', 'nameday', 'festival'],
  'Cloud Storage & File Sharing': ['cloud', 'storage', 'file', 'files', 'upload', 'download', 'share', 'dropbox', 'drive', 'folder', 'backup', 'hosting'],
  'Cryptocurrency': ['crypto', 'cryptocurrency', 'bitcoin', 'ethereum', 'blockchain', 'btc', 'eth', 'token', 'defi', 'nft', 'coin', 'wallet', 'trading', 'exchange', 'altcoin', 'solana', 'cardano'],
  'Currency Exchange': ['currency', 'exchange', 'forex', 'rate', 'rates', 'usd', 'eur', 'money', 'convert', 'conversion', 'dollar', 'euro', 'pound'],
  'Development': ['dev', 'developer', 'code', 'coding', 'programming', 'api', 'github', 'git', 'npm', 'docker', 'screenshot', 'qr', 'ip', 'dns', 'url', 'json', 'webhook', 'tool', 'tools', 'cli', 'devops', 'cloud'],
  'Dictionaries': ['word', 'words', 'dictionary', 'definition', 'meaning', 'synonym', 'antonym', 'vocabulary', 'language', 'thesaurus', 'lexicon', 'english', 'spell'],
  'Entertainment': ['joke', 'jokes', 'meme', 'memes', 'funny', 'humor', 'comedy', 'laugh', 'fun', 'random', 'useless', 'facts', 'trivia', 'chuck', 'norris', 'quote', 'quotes'],
  'Environment': ['environment', 'climate', 'carbon', 'green', 'air', 'pollution', 'co2', 'energy', 'solar', 'wind', 'earth', 'eco', 'sustainability', 'emission'],
  'Finance': ['finance', 'stock', 'stocks', 'market', 'invest', 'investment', 'portfolio', 'financial', 'trading', 'nasdaq', 'nyse', 'etf', 'dividend', 'treasury', 'bank'],
  'Food & Drink': ['food', 'drink', 'recipe', 'recipes', 'meal', 'eat', 'eating', 'cooking', 'cook', 'restaurant', 'cocktail', 'beer', 'coffee', 'tea', 'fruit', 'vegetable', 'nutrition', 'ingredient', 'cuisine', 'breakfast', 'dinner', 'lunch'],
  'Games & Comics': ['game', 'games', 'gaming', 'pokemon', 'minecraft', 'zelda', 'fortnite', 'comic', 'superhero', 'marvel', 'dc', 'rpg', 'fps', 'strategy', 'puzzle', 'board', 'chess', 'card', 'steam', 'ghibli'],
  'Geocoding': ['geo', 'map', 'maps', 'location', 'coordinates', 'latitude', 'longitude', 'address', 'city', 'country', 'countries', 'zip', 'postal', 'place', 'places'],
  'Government': ['government', 'gov', 'public', 'data', 'official', 'law', 'legal', 'congress', 'parliament', 'senate', 'federal', 'municipal', 'census'],
  'Health': ['health', 'medical', 'medicine', 'disease', 'covid', 'virus', 'symptom', 'hospital', 'doctor', 'nutrition', 'fitness', 'mental', 'wellness', 'care'],
  'Jobs': ['job', 'jobs', 'career', 'work', 'employment', 'hire', 'hiring', 'freelance', 'resume', 'salary', 'remote'],
  'Machine Learning': ['ai', 'ml', 'machine learning', 'artificial intelligence', 'vision', 'nlp', 'image recognition', 'deep learning', 'neural', 'model', 'predict'],
  'Music': ['music', 'song', 'songs', 'artist', 'album', 'playlist', 'spotify', 'sound', 'audio', 'melody', 'beat', 'track', 'genre', 'radio', 'concert', 'lyrics', 'band'],
  'News': ['news', 'headline', 'article', 'journalism', 'media', 'press', 'newspaper', 'breaking', 'current events', 'politics', 'world'],
  'Open Data': ['open data', 'dataset', 'public data', 'statistics', 'census', 'record', 'archive', 'historical'],
  'Photography': ['photo', 'photos', 'photography', 'picture', 'pictures', 'image', 'images', 'camera', 'lens', 'instagram', 'flickr', 'unsplash'],
  'Programming': ['programming', 'code snippet', 'library', 'framework', 'javascript', 'python', 'java', 'typescript', 'rust', 'golang'],
  'Science & Math': ['science', 'math', 'physics', 'chemistry', 'biology', 'astronomy', 'space', 'nasa', 'planet', 'galaxy', 'star', 'moon', 'sun', 'mars', 'rocket', 'formula', 'research', 'experiment'],
  'Security': ['security', 'hack', 'vulnerability', 'malware', 'virus', 'cyber', 'password', 'encryption', 'firewall', 'threat'],
  'Shopping': ['shopping', 'shop', 'store', 'buy', 'sell', 'product', 'price', 'discount', 'deal', 'amazon', 'ecommerce'],
  'Social': ['social', 'twitter', 'reddit', 'community', 'network', 'post', 'share', 'follow'],
  'Sports & Fitness': ['sport', 'sports', 'football', 'soccer', 'basketball', 'baseball', 'tennis', 'golf', 'olympic', 'athlete', 'team', 'score', 'fitness', 'gym', 'workout', 'exercise'],
  'Test Data': ['fake', 'dummy', 'mock', 'placeholder', 'lorem', 'test', 'sample', 'generate'],
  'Transportation': ['transport', 'transportation', 'flight', 'airline', 'train', 'bus', 'uber', 'taxi', 'vehicle', 'commute', 'travel', 'airport'],
  'Video': ['video', 'youtube', 'movie', 'movies', 'film', 'cinema', 'tv', 'television', 'show', 'series', 'stream', 'watch', 'trailer'],
  'Weather': ['weather', 'forecast', 'temperature', 'rain', 'snow', 'wind', 'sunny', 'cloud', 'storm', 'hurricane', 'climate', 'humidity']
};

// ─── Parse a single markdown table row ───────────────────────────────────────
function parseTableRow(line) {
  const cols = line.split('|').map(c => c.trim()).filter(c => c !== '');
  if (cols.length < 3) return null;
  
  // Extract name & URL from markdown link [Name](url)
  const linkMatch = cols[0].match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!linkMatch) return null;
  
  return {
    name: linkMatch[1],
    url: linkMatch[2],
    description: cols[1] || '',
    auth: cols[2] || 'No',
    https: cols[3] === 'Yes',
    cors: cols[4] || 'Unknown'
  };
}

// ─── Parse a README.md file ───────────────────────────────────────────────────
function parseReadme(filePath) {
  if (!fs.existsSync(filePath)) return {};
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const categories = {};
  let currentCategory = null;
  let isInTable = false;
  
  for (const line of lines) {
    // Detect category headers
    const h3Match = line.match(/^###\s+(.+)/);
    if (h3Match) {
      currentCategory = h3Match[1].trim().replace(/[*_]/g, '');
      if (!categories[currentCategory]) {
        categories[currentCategory] = [];
      }
      isInTable = false;
      continue;
    }
    
    // Detect table header row
    if (line.includes('| API |') || line.includes('|:---|') || line.includes('|---|')) {
      isInTable = true;
      continue;
    }
    
    // Parse table data rows
    if (isInTable && currentCategory && line.startsWith('|') && line.includes('[')) {
      const entry = parseTableRow(line);
      if (entry) {
        categories[currentCategory].push(entry);
      }
    }
    
    // Table end detection
    if (isInTable && !line.startsWith('|') && line.trim() !== '') {
      isInTable = false;
    }
  }
  
  return categories;
}

// ─── Build merged registry ────────────────────────────────────────────────────
function buildRegistry() {
  const apisPath = path.join(__dirname, '../apis/README.md');
  const publicApisPath = path.join(__dirname, '../public-apis/README.md');
  
  const source1 = parseReadme(apisPath);
  const source2 = parseReadme(publicApisPath);
  
  // Merge categories
  const merged = {};
  const allCategories = new Set([...Object.keys(source1), ...Object.keys(source2)]);
  
  for (const cat of allCategories) {
    const entries1 = source1[cat] || [];
    const entries2 = source2[cat] || [];
    
    // Deduplicate by URL
    const seen = new Set();
    const combined = [];
    
    for (const entry of [...entries1, ...entries2]) {
      const key = entry.url.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        combined.push({
          ...entry,
          category: cat,
          tags: CATEGORY_KEYWORDS[cat] || [],
          id: `${cat.toLowerCase().replace(/\s+/g, '-')}-${combined.length}`
        });
      }
    }
    
    if (combined.length > 0) {
      merged[cat] = combined;
    }
  }
  
  return merged;
}

// ─── Singleton registry ───────────────────────────────────────────────────────
let _registry = null;

function getRegistry() {
  if (!_registry) {
    _registry = buildRegistry();
  }
  return _registry;
}

function getAllCategories() {
  const registry = getRegistry();
  return Object.keys(registry).map(name => ({
    name,
    count: registry[name].length,
    keywords: CATEGORY_KEYWORDS[name] || [],
    emoji: CATEGORY_EMOJIS[name] || '🔮'
  })).sort((a, b) => b.count - a.count);
}

function searchCategoriesByQuery(query) {
  const q = query.toLowerCase();
  const terms = q.split(/\s+/).filter(t => t.length > 1);
  
  const scores = {};
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const term of terms) {
      for (const kw of keywords) {
        if (kw === term) score += 10;
        else if (kw.includes(term) || term.includes(kw)) score += 5;
      }
      // Also match category name itself
      if (category.toLowerCase().includes(term)) score += 8;
    }
    if (score > 0) scores[category] = score;
  }
  
  return Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .map(([cat]) => cat);
}

const CATEGORY_EMOJIS = {
  'Animals': '🐾',
  'Anime': '⛩️',
  'Anti-Malware': '🛡️',
  'Art & Design': '🎨',
  'Authentication': '🔐',
  'Authentication & Authorization': '🔐',
  'Blockchain': '⛓️',
  'Books': '📚',
  'Business': '💼',
  'Calendar': '📅',
  'Cloud Storage & File Sharing': '☁️',
  'Continuous Integration': '🔄',
  'Cryptocurrency': '₿',
  'Currency Exchange': '💱',
  'Data Validation': '✅',
  'Development': '⚙️',
  'Dictionaries': '📖',
  'Documents & Productivity': '📄',
  'Email': '📧',
  'Entertainment': '🎭',
  'Environment': '🌿',
  'Events': '🎪',
  'Finance': '📈',
  'Food & Drink': '🍔',
  'Games & Comics': '🎮',
  'Geocoding': '🗺️',
  'Government': '🏛️',
  'Health': '❤️',
  'Jobs': '💼',
  'Machine Learning': '🤖',
  'Music': '🎵',
  'News': '📰',
  'Open Data': '📊',
  'Open Source Projects': '💻',
  'Patent': '📜',
  'Personality': '🧠',
  'Phone': '📱',
  'Photography': '📷',
  'Programming': '💻',
  'Science & Math': '🔬',
  'Security': '🔒',
  'Shopping': '🛍️',
  'Social': '💬',
  'Sports & Fitness': '⚽',
  'Test Data': '🧪',
  'Text Analysis': '📝',
  'Tracking': '📡',
  'Transportation': '✈️',
  'URL Shorteners': '🔗',
  'Vehicle': '🚗',
  'Video': '🎬',
  'Weather': '🌤️'
};

module.exports = { getRegistry, getAllCategories, searchCategoriesByQuery, CATEGORY_KEYWORDS, CATEGORY_EMOJIS };
