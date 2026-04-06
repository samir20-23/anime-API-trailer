/**
 * Devgenius Smart Search Engine
 * Maps any query → categories → fetches from multiple APIs → returns unified results
 */

const { searchCategoriesByQuery, getRegistry } = require('./registry');
const fetchers = require('./fetchers');

// ─── Category → fetcher mapping ───────────────────────────────────────────────
const CATEGORY_FETCHERS = {
  'Animals': async (q) => {
    const results = await Promise.allSettled([
      fetchers.fetchDogs(q),
      fetchers.fetchRandomFox(),
      fetchers.fetchCatFacts(),
      fetchers.fetchZooAnimals()
    ]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Anime': async (q) => {
    const results = await Promise.allSettled([
      fetchers.fetchJikan(q),
      fetchers.fetchGhibli(),
      fetchers.fetchNekosBest()
    ]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Art & Design': async (q) => {
    const results = await Promise.allSettled([
      fetchers.fetchArtInstituteChicago(q),
      fetchers.fetchMetMuseum(q)
    ]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Books': async (q) => {
    const results = await Promise.allSettled([
      fetchers.fetchOpenLibrary(q),
      fetchers.fetchPoetryDB(q),
      fetchers.fetchGutendex(q)
    ]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Entertainment': async (q) => {
    const results = await Promise.allSettled([
      fetchers.fetchChuckNorris(q),
      fetchers.fetchJokeAPI(q),
      fetchers.fetchUselessFacts(),
      fetchers.fetchBoredAPI()
    ]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Food & Drink': async (q) => {
    const results = await Promise.allSettled([
      fetchers.fetchFruityvice(q),
      fetchers.fetchOpenBrewery(q),
      fetchers.fetchCocktailDB(q),
      fetchers.fetchMealDB(q)
    ]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Games & Comics': async (q) => {
    const results = await Promise.allSettled([
      fetchers.fetchPokemon(q),
      fetchers.fetchRickAndMorty(q),
      fetchers.fetchDisney(q),
      fetchers.fetchGenshin(q),
      fetchers.fetchFreeToGame(q)
    ]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Music': async (q) => {
    const results = await Promise.allSettled([
      fetchers.fetchiTunes(q),
      fetchers.fetchRadioBrowser(q),
      fetchers.fetchMusicBrainz(q)
    ]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Science & Math': async (q) => {
    const results = await Promise.allSettled([
      fetchers.fetchSpaceflightNews(q),
      fetchers.fetchNobelPrize(q)
    ]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Weather': async (q) => {
    const results = await Promise.allSettled([fetchers.fetchWeather(q)]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Geocoding': async (q) => {
    const results = await Promise.allSettled([fetchers.fetchRestCountries(q)]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Cryptocurrency': async (q) => {
    const results = await Promise.allSettled([fetchers.fetchCoinGecko(q)]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Currency Exchange': async (q) => {
    const results = await Promise.allSettled([fetchers.fetchFrankfurter(q)]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  },
  'Dictionaries': async (q) => {
    const results = await Promise.allSettled([fetchers.fetchFreeDict(q)]);
    return results.filter(r => r.status === 'fulfilled').flatMap(r => r.value);
  }
};

// ─── Default fallback fetchers for broad or unmatched queries ─────────────────
const DEFAULT_FETCHERS = [
  () => fetchers.fetchDogs(''),
  () => fetchers.fetchChuckNorris(''),
  () => fetchers.fetchUselessFacts(),
  () => fetchers.fetchPokemon(''),
  () => fetchers.fetchBoredAPI(),
  () => fetchers.fetchGhibli()
];

const STOP_WORDS = new Set(['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't", 'want', 'select', 'anything', 'something', 'random', 'find', 'search', 'give', 'show', 'tell', 'results', 'stuff', 'please', 'can', 'you']);

function cleanQuery(query) {
  const terms = query.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
  const filtered = terms.filter(t => !STOP_WORDS.has(t) && t.length > 1);
  return filtered.length > 0 ? filtered.join(' ') : query;
}

// ─── Main search function ─────────────────────────────────────────────────────
async function search(query, limit = 100) {
  const originalQ = (query || '').trim();
  const fetchedQ = cleanQuery(originalQ);
  
  let matchedCategories = searchCategoriesByQuery(originalQ);
  
  const registry = getRegistry();
  let allApis = [];
  
  for (const cat in registry) {
    allApis.push(...registry[cat]);
  }
  
  // Map 'name' to 'title' so frontend renders it properly
  let results = allApis.map(api => ({
    ...api,
    title: api.name,
    link: api.url // Map url to link if needed by frontend
  }));
  
  // Deduplicate by URL
  const seen = new Set();
  results = results.filter(api => {
    if (seen.has(api.url)) return false;
    seen.add(api.url);
    return true;
  });
  
  // Score and rank results based on keyword matching
  results = rankResults(results, originalQ);
  
  // Filter out results that didn't match at all, if there was a query
  if (fetchedQ.trim() !== '') {
     results = results.filter(r => r._score > 0);
  }
  
  if (results.length === 0 && originalQ.trim() !== '') {
    // Fall back to discovery
    const { getRandomDiscovery } = require('./discovery');
    results = await getRandomDiscovery(16);
    results = results.map(r => ({ ...r, title: r.title, description: 'Discovery: ' + r.description }));
    matchedCategories = ['Discovery'];
  }
  
  if (matchedCategories.length === 0) matchedCategories = ['All Categories'];
  
  return {
    query: originalQ,
    total: results.length,
    categories: matchedCategories.slice(0, 5),
    results: results.slice(0, limit)
  };
}

// ─── Rank results by relevance ────────────────────────────────────────────────
function rankResults(results, query) {
  const q = query.toLowerCase();
  const terms = q.split(/\s+/).filter(t => t.length > 1);
  
  if (terms.length === 0) {
    return results.map(r => ({ ...r, _score: 1 }));
  }

  return results.map(r => {
    let score = 0;
    const text = `${r.title} ${r.description} ${r.category} ${r.tags?.join(' ')}`.toLowerCase();
    
    for (const term of terms) {
      if (r.title?.toLowerCase().includes(term)) score += 10;
      else if (r.description?.toLowerCase().includes(term)) score += 5;
      else if (text.includes(term)) score += 2;
    }
    
    // Boost items with images
    if (r.image) score += 2;
    // Boost items with urls
    if (r.url) score += 1;
    
    return { ...r, _score: score };
  }).sort((a, b) => b._score - a._score);
}

module.exports = { search, CATEGORY_FETCHERS };
