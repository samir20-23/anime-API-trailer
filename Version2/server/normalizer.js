/**
 * Devgenius Response Normalizer
 * Converts any API response into a unified result format
 */

function detectContentType(data) {
  if (!data) return 'data';
  const str = JSON.stringify(data).toLowerCase();
  if (str.includes('.mp4') || str.includes('.webm') || str.includes('youtube') || str.includes('video')) return 'video';
  if (str.includes('.jpg') || str.includes('.jpeg') || str.includes('.png') || str.includes('.gif') || str.includes('.webp') || str.includes('image_url') || str.includes('imageurl') || str.includes('artwork') || str.includes('thumbnail')) return 'image';
  return 'text';
}

function extractImage(data) {
  if (!data || typeof data !== 'object') return null;
  const keys = ['image', 'image_url', 'imageUrl', 'img', 'photo', 'photo_url', 'thumbnail', 'artwork', 'cover', 'icon', 'url', 'message', 'link', 'file'];
  for (const key of keys) {
    if (data[key] && typeof data[key] === 'string' && /\.(jpg|jpeg|png|gif|webp|svg)/i.test(data[key])) {
      return data[key];
    }
  }
  // Check nested
  if (Array.isArray(data)) {
    for (const item of data) {
      const img = extractImage(item);
      if (img) return img;
    }
  }
  for (const val of Object.values(data)) {
    if (val && typeof val === 'object') {
      const img = extractImage(val);
      if (img) return img;
    }
  }
  return null;
}

function extractTitle(data) {
  if (!data) return 'Result';
  const keys = ['title', 'name', 'breed', 'value', 'fact', 'joke', 'setup', 'question', 'word', 'english_name', 'anime_name', 'character', 'activity'];
  for (const key of keys) {
    if (data[key] && typeof data[key] === 'string' && data[key].length > 0) {
      return data[key].substring(0, 120);
    }
  }
  // For arrays take the first element
  if (Array.isArray(data) && data.length > 0) {
    return extractTitle(data[0]);
  }
  const str = JSON.stringify(data);
  return str.length > 100 ? str.substring(0, 100) + '...' : str;
}

function extractDescription(data) {
  if (!data) return '';
  const keys = ['description', 'body', 'content', 'text', 'summary', 'synopsis', 'overview', 'extract', 'punchline', 'delivery', 'fact', 'joke', 'explanation', 'value'];
  for (const key of keys) {
    if (data[key] && typeof data[key] === 'string' && data[key].length > 5) {
      return data[key].substring(0, 300);
    }
  }
  if (Array.isArray(data)) {
    for (const item of data) {
      const d = extractDescription(item);
      if (d) return d;
    }
  }
  return '';
}

function extractUrl(data) {
  if (!data) return null;
  const keys = ['url', 'link', 'permalink', 'web_url', 'source', 'homepage'];
  for (const key of keys) {
    if (data[key] && typeof data[key] === 'string' && data[key].startsWith('http')) {
      return data[key];
    }
  }
  return null;
}

function normalize(rawData, source, category, query = '') {
  if (!rawData) return [];
  
  // Wrap non-array responses
  const items = Array.isArray(rawData) ? rawData : [rawData];
  
  return items.slice(0, 20).map(item => {
    const image = extractImage(item);
    const contentType = image ? 'image' : detectContentType(item);
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      title: extractTitle(item),
      description: extractDescription(item),
      image: image,
      video: null,
      url: extractUrl(item),
      category,
      source,
      tags: [category.toLowerCase(), source.toLowerCase()].filter(Boolean),
      contentType,
      query,
      timestamp: Date.now(),
      raw: item
    };
  }).filter(r => r.title && r.title !== 'Result' && r.title.length > 1);
}

// Special normalizers for specific APIs
const NORMALIZERS = {
  'dogs-api': (data) => {
    if (data.message) {
      const url = Array.isArray(data.message) ? data.message[0] : data.message;
      return [{ id: Math.random().toString(36).substr(2,9), title: 'Random Dog', description: 'A random dog photo', image: url, url, category: 'Animals', source: 'Dogs API', tags: ['dog', 'animals', 'photo'], contentType: 'image', raw: data }];
    }
    return [];
  },
  'jikan': (data) => {
    const items = data.data || (Array.isArray(data) ? data : [data]);
    return items.slice(0, 12).map(item => ({
      id: Math.random().toString(36).substr(2,9),
      title: item.title || item.name || 'Anime',
      description: item.synopsis || item.about || '',
      image: item.images?.jpg?.image_url || item.images?.jpg?.large_image_url || null,
      url: item.url || null,
      category: 'Anime',
      source: 'Jikan (MyAnimeList)',
      tags: ['anime', ...(item.genres?.map(g => g.name.toLowerCase()) || [])],
      contentType: item.images ? 'image' : 'text',
      raw: item
    }));
  },
  'ghibli': (data) => {
    const items = Array.isArray(data) ? data : [data];
    return items.slice(0, 12).map(item => ({
      id: Math.random().toString(36).substr(2,9),
      title: item.title || 'Studio Ghibli Film',
      description: item.description || '',
      image: item.image || item.movie_banner || null,
      url: null,
      category: 'Anime',
      source: 'Studio Ghibli API',
      tags: ['anime', 'ghibli', 'film'],
      contentType: item.image ? 'image' : 'text',
      raw: item
    }));
  },
  'pokeapi': (data) => {
    const sprites = data.sprites;
    const img = sprites?.other?.['official-artwork']?.front_default || sprites?.front_default;
    return [{
      id: Math.random().toString(36).substr(2,9),
      title: data.name ? data.name.charAt(0).toUpperCase() + data.name.slice(1) : 'Pokémon',
      description: `Height: ${data.height}, Weight: ${data.weight}. Types: ${data.types?.map(t=>t.type.name).join(', ')}`,
      image: img,
      url: `https://www.pokemon.com/en/pokedex/${data.name}`,
      category: 'Games & Comics',
      source: 'PokéAPI',
      tags: ['pokemon', 'game', 'nintendo', ...(data.types?.map(t=>t.type.name)||[])],
      contentType: img ? 'image' : 'text',
      raw: data
    }];
  },
  'art-institute': (data) => {
    const items = data.data || [data];
    return items.slice(0, 12).map(item => ({
      id: Math.random().toString(36).substr(2,9),
      title: item.title || 'Artwork',
      description: item.description || item.medium_display || item.artist_display || '',
      image: item.image_id ? `https://www.artic.edu/iiif/2/${item.image_id}/full/400,/0/default.jpg` : null,
      url: item.id ? `https://www.artic.edu/artworks/${item.id}` : null,
      category: 'Art & Design',
      source: 'Art Institute of Chicago',
      tags: ['art', 'museum', 'painting', ...(item.style_titles||[]).map(s=>s.toLowerCase())],
      contentType: item.image_id ? 'image' : 'text',
      raw: item
    }));
  },
  'met-museum': (data) => {
    const objectIds = data.objectIDs || [];
    return [{
      id: Math.random().toString(36).substr(2,9),
      title: data.title || 'Met Museum Artwork',
      description: data.artistDisplayName ? `By ${data.artistDisplayName}, ${data.artistDisplayBio || ''}` : '',
      image: data.primaryImageSmall || data.primaryImage || null,
      url: data.objectURL || null,
      category: 'Art & Design',
      source: 'Metropolitan Museum of Art',
      tags: ['art', 'museum', 'met', data.classification].filter(Boolean).map(t=>t.toLowerCase()),
      contentType: data.primaryImage ? 'image' : 'text',
      raw: data
    }];
  },
  'rick-and-morty': (data) => {
    const items = data.results || (Array.isArray(data) ? data : [data]);
    return items.slice(0, 12).map(item => ({
      id: Math.random().toString(36).substr(2,9),
      title: item.name || 'Character',
      description: `${item.status || ''} ${item.species || ''} from ${item.origin?.name || 'Unknown'}`,
      image: item.image || null,
      url: item.url || null,
      category: 'Games & Comics',
      source: 'Rick and Morty API',
      tags: ['rick and morty', 'animation', 'character'],
      contentType: item.image ? 'image' : 'text',
      raw: item
    }));
  },
  'open-library': (data) => {
    const docs = data.docs || [data];
    return docs.slice(0, 12).map(item => ({
      id: Math.random().toString(36).substr(2,9),
      title: item.title || 'Book',
      description: item.author_name ? `By ${item.author_name[0]}${item.first_publish_year ? ` (${item.first_publish_year})` : ''}` : '',
      image: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` : null,
      url: item.key ? `https://openlibrary.org${item.key}` : null,
      category: 'Books',
      source: 'Open Library',
      tags: ['book', 'library', ...(item.subject?.slice(0,3)||[]).map(s=>s.toLowerCase())],
      contentType: item.cover_i ? 'image' : 'text',
      raw: item
    }));
  },
  'coingecko': (data) => {
    const items = Array.isArray(data) ? data : [data];
    return items.slice(0, 12).map(item => ({
      id: Math.random().toString(36).substr(2,9),
      title: `${item.name} (${(item.symbol||'').toUpperCase()})`,
      description: `Price: $${item.current_price?.toLocaleString() || 'N/A'} | Market Cap: $${item.market_cap?.toLocaleString() || 'N/A'} | Change 24h: ${item.price_change_percentage_24h?.toFixed(2) || 'N/A'}%`,
      image: item.image || null,
      url: `https://www.coingecko.com/en/coins/${item.id}`,
      category: 'Cryptocurrency',
      source: 'CoinGecko',
      tags: ['crypto', 'bitcoin', 'finance', item.id],
      contentType: item.image ? 'image' : 'data',
      raw: item
    }));
  },
  'rest-countries': (data) => {
    const items = Array.isArray(data) ? data : [data];
    return items.slice(0, 12).map(item => ({
      id: Math.random().toString(36).substr(2,9),
      title: item.name?.common || item.name?.official || 'Country',
      description: `Capital: ${item.capital?.[0] || 'N/A'} | Population: ${item.population?.toLocaleString() || 'N/A'} | Region: ${item.region || 'N/A'}`,
      image: item.flags?.png || item.flags?.svg || null,
      url: null,
      category: 'Geocoding',
      source: 'REST Countries',
      tags: ['country', 'geography', 'world', item.region?.toLowerCase()].filter(Boolean),
      contentType: item.flags?.png ? 'image' : 'data',
      raw: item
    }));
  }
};

module.exports = { normalize, NORMALIZERS };
