/**
 * Devgenius Discovery Engine
 * Fetches random items from many APIs to populate the homepage
 */

const fetchers = require('./fetchers');

const DISCOVERY_POOL = [
  { fn: () => fetchers.fetchDogs(''), weight: 3 },
  { fn: () => fetchers.fetchRandomFox(), weight: 2 },
  { fn: () => fetchers.fetchDuckImages(), weight: 2 },
  { fn: () => fetchers.fetchJikan(''), weight: 3 },
  { fn: () => fetchers.fetchGhibli(), weight: 3 },
  { fn: () => fetchers.fetchNekosBest(), weight: 2 },
  { fn: () => fetchers.fetchArtInstituteChicago(''), weight: 3 },
  { fn: () => fetchers.fetchPokemon(''), weight: 3 },
  { fn: () => fetchers.fetchRickAndMorty(''), weight: 2 },
  { fn: () => fetchers.fetchDisney(''), weight: 2 },
  { fn: () => fetchers.fetchGenshin(''), weight: 2 },
  { fn: () => fetchers.fetchFreeToGame(''), weight: 2 },
  { fn: () => fetchers.fetchMealDB(''), weight: 3 },
  { fn: () => fetchers.fetchCocktailDB(''), weight: 2 },
  { fn: () => fetchers.fetchBoredAPI(), weight: 1 },
  { fn: () => fetchers.fetchChuckNorris(''), weight: 1 },
  { fn: () => fetchers.fetchUselessFacts(), weight: 1 },
  { fn: () => fetchers.fetchSpaceflightNews(''), weight: 3 },
  { fn: () => fetchers.fetchRestCountries(''), weight: 2 },
  { fn: () => fetchers.fetchiTunes('top hits'), weight: 2 },
  { fn: () => fetchers.fetchPoetryDB(''), weight: 1 },
  { fn: () => fetchers.fetchOpenBrewery(''), weight: 1 },
];

async function getRandomDiscovery(count = 16) {
  // Shuffle the pool and pick a subset
  const shuffled = [...DISCOVERY_POOL].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 10);
  
  const settled = await Promise.allSettled(selected.map(s => s.fn()));
  
  let allResults = settled
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .filter(Boolean)
    .filter(r => r.title && r.title.length > 1);

  // Shuffle for variety
  allResults = allResults.sort(() => Math.random() - 0.5);
  
  // Dedupe by title
  const seen = new Set();
  allResults = allResults.filter(r => {
    const key = (r.title || '').toLowerCase().substring(0, 25);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  
  return allResults.slice(0, count);
}

module.exports = { getRandomDiscovery };
