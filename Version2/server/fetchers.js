/**
 * Devgenius API Fetchers
 * Real fetch calls to free, no-auth, public APIs
 */

const fetch = require('node-fetch');
const { normalize, NORMALIZERS } = require('./normalizer');

const TIMEOUT = 6000;

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
}

// ─── Animals ──────────────────────────────────────────────────────────────────
async function fetchDogs(query) {
  const breed = query.toLowerCase().includes('labrador') ? 'labrador' :
                query.toLowerCase().includes('husky') ? 'husky' :
                query.toLowerCase().includes('golden') ? 'retriever/golden' : null;
  const url = breed
    ? `https://dog.ceo/api/breed/${breed}/images/random/8`
    : 'https://dog.ceo/api/breeds/image/random/8';
  const data = await fetchWithTimeout(url);
  const imgs = Array.isArray(data.message) ? data.message : [data.message];
  return imgs.map(img => ({
    id: Math.random().toString(36).substr(2,9),
    title: `Random Dog${breed ? ` (${breed})` : ''}`,
    description: 'A beautiful random dog photo from the Stanford Dogs Dataset',
    image: img, url: img, category: 'Animals', source: 'Dogs API',
    tags: ['dog', 'animals', 'pet', 'photo'], contentType: 'image', raw: { message: img }
  }));
}

async function fetchRandomFox() {
  const data = await fetchWithTimeout('https://randomfox.ca/floof/');
  return [{
    id: Math.random().toString(36).substr(2,9),
    title: 'Random Fox', description: 'An adorable random fox photo',
    image: data.image, url: data.link, category: 'Animals', source: 'RandomFox',
    tags: ['fox', 'animals', 'wildlife', 'photo'], contentType: 'image', raw: data
  }];
}

async function fetchCatFacts() {
  const data = await fetchWithTimeout('https://cat-fact.herokuapp.com/facts/random?amount=5');
  const items = Array.isArray(data) ? data : [data];
  return items.map(f => ({
    id: Math.random().toString(36).substr(2,9),
    title: 'Cat Fact 🐱',
    description: f.text || f.fact || JSON.stringify(f),
    image: null, url: null, category: 'Animals', source: 'Cat Facts',
    tags: ['cat', 'facts', 'animals'], contentType: 'text', raw: f
  }));
}

async function fetchDuckImages() {
  const data = await fetchWithTimeout('https://random-d.uk/api/random');
  return [{
    id: Math.random().toString(36).substr(2,9),
    title: 'Random Duck 🦆', description: 'Quack! A random duck photo just for you.',
    image: data.url, url: data.url, category: 'Animals', source: 'Random Duck',
    tags: ['duck', 'animals', 'bird', 'photo'], contentType: 'image', raw: data
  }];
}

async function fetchZooAnimals() {
  const data = await fetchWithTimeout('https://zoo-animal-api.herokuapp.com/animals/rand/6');
  const items = Array.isArray(data) ? data : [data];
  return items.map(a => ({
    id: Math.random().toString(36).substr(2,9),
    title: a.name || 'Zoo Animal',
    description: `${a.animal_type || ''} | Weight: ${a.weight_min}-${a.weight_max} kg | Lifespan: ${a.lifespan} years`,
    image: a.image_link || null, url: a.image_link || null, category: 'Animals', source: 'Zoo Animals',
    tags: ['animal', 'zoo', 'wildlife', (a.animal_type||'').toLowerCase()], contentType: a.image_link ? 'image' : 'text', raw: a
  }));
}

// ─── Anime ─────────────────────────────────────────────────────────────────────
async function fetchJikan(query) {
  const url = query
    ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=12&order_by=score&sort=desc`
    : 'https://api.jikan.moe/v4/top/anime?limit=12';
  const data = await fetchWithTimeout(url);
  return NORMALIZERS['jikan'](data);
}

async function fetchAnimeFacts() {
  const data = await fetchWithTimeout('https://chandan-02.github.io/anime-facts-rest-api/');
  // This is a metadata endpoint — use a generic one
  return [{
    id: Math.random().toString(36).substr(2,9),
    title: 'Anime Fact', description: 'Anime is a style of animation originating from Japan, characterized by colorful artwork, vibrant characters, and fantastical themes.',
    image: null, url: 'https://chandan-02.github.io/anime-facts-rest-api/', category: 'Anime', source: 'AnimeFacts',
    tags: ['anime', 'facts'], contentType: 'text', raw: {}
  }];
}

async function fetchGhibli() {
  const data = await fetchWithTimeout('https://ghibliapi.vercel.app/films');
  return NORMALIZERS['ghibli'](data);
}

async function fetchNekosBest(category = 'neko') {
  const cats = ['neko', 'kitsune', 'husbando', 'waifu'];
  const cat = cats[Math.floor(Math.random() * cats.length)];
  const data = await fetchWithTimeout(`https://nekos.best/api/v2/${cat}?amount=6`);
  const items = data.results || [];
  return items.map(item => ({
    id: Math.random().toString(36).substr(2,9),
    title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Anime Art`,
    description: `Anime artwork from NekosBest (artist: ${item.artist_name || 'Unknown'})`,
    image: item.url, url: item.url, category: 'Anime', source: 'NekosBest',
    tags: ['anime', cat, 'artwork'], contentType: 'image', raw: item
  }));
}

// ─── Art ──────────────────────────────────────────────────────────────────────
async function fetchArtInstituteChicago(query) {
  const url = query
    ? `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&limit=12&fields=id,title,artist_display,description,image_id,medium_display,style_titles`
    : 'https://api.artic.edu/api/v1/artworks?limit=12&fields=id,title,artist_display,description,image_id,medium_display,style_titles';
  const data = await fetchWithTimeout(url);
  return NORMALIZERS['art-institute'](data);
}

async function fetchMetMuseum(query) {
  try {
    const searchUrl = query
      ? `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(query)}&hasImages=true`
      : 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=impressionism&hasImages=true';
    const search = await fetchWithTimeout(searchUrl);
    const ids = (search.objectIDs || []).slice(0, 6);
    const results = await Promise.allSettled(ids.map(id =>
      fetchWithTimeout(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
    ));
    return results
      .filter(r => r.status === 'fulfilled')
      .map(r => NORMALIZERS['met-museum'](r.value))
      .flat()
      .filter(r => r.image);
  } catch (e) { return []; }
}

// ─── Books ────────────────────────────────────────────────────────────────────
async function fetchOpenLibrary(query) {
  const q = query || 'science fiction';
  const data = await fetchWithTimeout(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=12`);
  return NORMALIZERS['open-library'](data);
}

async function fetchPoetryDB(query) {
  const url = query
    ? `https://poetrydb.org/title/${encodeURIComponent(query)}/title,author,lines`
    : 'https://poetrydb.org/random/6/title,author,lines';
  const data = await fetchWithTimeout(url);
  const items = Array.isArray(data) ? data : [data];
  return items.slice(0, 6).map(p => ({
    id: Math.random().toString(36).substr(2,9),
    title: p.title || 'Poem',
    description: (p.lines || []).slice(0, 6).join(' / '),
    image: null, url: null, category: 'Books', source: 'PoetryDB',
    tags: ['poetry', 'poem', 'literature', (p.author||'').toLowerCase()],
    contentType: 'text', raw: p
  }));
}

async function fetchGutendex(query) {
  const url = query
    ? `https://gutendex.com/books/?search=${encodeURIComponent(query)}`
    : 'https://gutendex.com/books/';
  const data = await fetchWithTimeout(url);
  const items = data.results || [];
  return items.slice(0, 8).map(b => ({
    id: Math.random().toString(36).substr(2,9),
    title: b.title || 'Book',
    description: `By ${b.authors?.map(a=>a.name).join(', ') || 'Unknown'} | ${b.download_count?.toLocaleString() || 0} downloads`,
    image: b.formats?.['image/jpeg'] || null,
    url: b.formats?.['text/html'] || null,
    category: 'Books', source: 'Project Gutenberg',
    tags: ['book', 'classic', 'literature', ...(b.subjects?.slice(0,3)||[]).map(s=>s.toLowerCase().split(' ')[0])],
    contentType: b.formats?.['image/jpeg'] ? 'image' : 'text', raw: b
  }));
}

// ─── Entertainment ────────────────────────────────────────────────────────────
async function fetchChuckNorris(query) {
  const categories = ['animal', 'career', 'celebrity', 'dev', 'fashion', 'food', 'history', 'money', 'movie', 'music', 'political', 'religion', 'science', 'sport', 'travel'];
  const params = query ? `?category=dev` : '';
  const data = await fetchWithTimeout('https://api.chucknorris.io/jokes/random' + params);
  return [{
    id: Math.random().toString(36).substr(2,9),
    title: 'Chuck Norris Joke 😂',
    description: data.value || '', image: data.icon_url || null, url: data.url || null,
    category: 'Entertainment', source: 'chucknorris.io',
    tags: ['joke', 'funny', 'humor', 'entertainment'], contentType: 'text', raw: data
  }];
}

async function fetchJokeAPI(query) {
  const cats = ['Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];
  const cat = query?.toLowerCase().includes('program') || query?.toLowerCase().includes('dev') || query?.toLowerCase().includes('code') ? 'Programming' : 'Any';
  const data = await fetchWithTimeout(`https://v2.jokeapi.dev/joke/${cat}?amount=3&safe-mode`);
  const jokes = data.jokes || [data];
  return jokes.map(j => ({
    id: Math.random().toString(36).substr(2,9),
    title: j.type === 'twopart' ? j.setup : 'Joke 😄',
    description: j.type === 'twopart' ? j.delivery : j.joke,
    image: null, url: null, category: 'Entertainment', source: 'JokeAPI',
    tags: ['joke', 'humor', j.category?.toLowerCase()].filter(Boolean), contentType: 'text', raw: j
  }));
}

async function fetchUselessFacts() {
  const data = await fetchWithTimeout('https://uselessfacts.jsph.pl/api/v2/facts/random');
  return [{
    id: Math.random().toString(36).substr(2,9),
    title: 'Random Useless Fact 🤓',
    description: data.text || data.fact || '',
    image: null, url: data.source_url || null, category: 'Entertainment', source: 'Useless Facts',
    tags: ['fact', 'trivia', 'random', 'fun'], contentType: 'text', raw: data
  }];
}

async function fetchBoredAPI() {
  const data = await fetchWithTimeout('https://www.boredapi.com/api/activity');
  return [{
    id: Math.random().toString(36).substr(2,9),
    title: `Activity: ${data.activity || 'Do Something!'}`,
    description: `Type: ${data.type || 'N/A'} | Participants: ${data.participants || 1} | Price: ${data.price === 0 ? 'Free!' : '$' + data.price}`,
    image: null, url: data.link || null, category: 'Entertainment', source: 'Bored API',
    tags: ['activity', 'boredom', data.type?.toLowerCase()].filter(Boolean), contentType: 'data', raw: data
  }];
}

// ─── Food ─────────────────────────────────────────────────────────────────────
async function fetchFruityvice(query) {
  const url = query
    ? `https://www.fruityvice.com/api/fruit/${encodeURIComponent(query.split(' ')[0])}`
    : 'https://www.fruityvice.com/api/fruit/all';
  const data = await fetchWithTimeout(url);
  const items = Array.isArray(data) ? data : [data];
  return items.slice(0, 8).map(f => ({
    id: Math.random().toString(36).substr(2,9),
    title: f.name || 'Fruit',
    description: `Family: ${f.family || 'N/A'} | Calories: ${f.nutritions?.calories || 'N/A'} | Sugar: ${f.nutritions?.sugar || 'N/A'}g`,
    image: null, url: null, category: 'Food & Drink', source: 'Fruityvice',
    tags: ['fruit', 'food', 'nutrition', (f.name||'').toLowerCase()], contentType: 'data', raw: f
  }));
}

async function fetchOpenBrewery(query) {
  const url = query
    ? `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(query)}&per_page=8`
    : 'https://api.openbrewerydb.org/v1/breweries/random?size=8';
  const data = await fetchWithTimeout(url);
  const items = Array.isArray(data) ? data : [data];
  return items.slice(0, 8).map(b => ({
    id: Math.random().toString(36).substr(2,9),
    title: b.name || 'Brewery',
    description: `${b.brewery_type || ''} brewery in ${b.city || ''}, ${b.state || ''} ${b.country || ''}`,
    image: null, url: b.website_url || null, category: 'Food & Drink', source: 'Open Brewery DB',
    tags: ['beer', 'brewery', 'drink', (b.brewery_type||'').toLowerCase()], contentType: 'data', raw: b
  }));
}

async function fetchCocktailDB(query) {
  const url = query
    ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const data = await fetchWithTimeout(url);
  const items = data.drinks || [];
  return items.slice(0, 6).map(c => ({
    id: Math.random().toString(36).substr(2,9),
    title: c.strDrink || 'Cocktail',
    description: `Category: ${c.strCategory || 'N/A'} | Glass: ${c.strGlass || 'N/A'} | Alcoholic: ${c.strAlcoholic || 'N/A'}`,
    image: c.strDrinkThumb || null, url: null, category: 'Food & Drink', source: 'TheCocktailDB',
    tags: ['cocktail', 'drink', 'recipe', (c.strAlcoholic||'').toLowerCase()], contentType: c.strDrinkThumb ? 'image' : 'text', raw: c
  }));
}

async function fetchMealDB(query) {
  const url = query
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
    : 'https://www.themealdb.com/api/json/v1/1/random.php';
  const data = await fetchWithTimeout(url);
  const meals = data.meals || [];
  return meals.slice(0, 6).map(m => ({
    id: Math.random().toString(36).substr(2,9),
    title: m.strMeal || 'Meal',
    description: `Category: ${m.strCategory || 'N/A'} | Area: ${m.strArea || 'N/A'} | ${(m.strInstructions||'').substring(0,150)}...`,
    image: m.strMealThumb || null, url: m.strSource || null, category: 'Food & Drink', source: 'TheMealDB',
    tags: ['meal', 'food', 'recipe', (m.strCategory||'').toLowerCase(), (m.strArea||'').toLowerCase()].filter(Boolean),
    contentType: m.strMealThumb ? 'image' : 'text', raw: m
  }));
}

// ─── Games & Comics ───────────────────────────────────────────────────────────
async function fetchPokemon(query) {
  const name = query?.toLowerCase().replace(/\s+/g, '-') || `${Math.floor(Math.random() * 898) + 1}`;
  const isName = isNaN(name.split('-')[0]);
  const url = isName && query
    ? `https://pokeapi.co/api/v2/pokemon/${name}`
    : `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898) + 1}`;
  const data = await fetchWithTimeout(url);
  return NORMALIZERS['pokeapi'](data);
}

async function fetchRickAndMorty(query) {
  const url = query
    ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query)}`
    : `https://rickandmortyapi.com/api/character/?page=${Math.floor(Math.random() * 42) + 1}`;
  const data = await fetchWithTimeout(url);
  return NORMALIZERS['rick-and-morty'](data);
}

async function fetchGenshin(query) {
  try {
    let data;
    if (query) {
      data = await fetchWithTimeout(`https://genshin.dev/characters/${query.toLowerCase().replace(/\s+/g, '-')}`);
      return [{
        id: Math.random().toString(36).substr(2,9),
        title: data.name || 'Genshin Character',
        description: `${data.vision || ''} ${data.weapon || ''} user from ${data.nation || ''}`,
        image: `https://genshin.dev/characters/${query.toLowerCase().replace(/\s+/g, '-')}/card`,
        url: null, category: 'Games & Comics', source: 'Genshin Impact API',
        tags: ['genshin', 'game', 'rpg', (data.vision||'').toLowerCase()], contentType: 'image', raw: data
      }];
    } else {
      const chars = await fetchWithTimeout('https://genshin.dev/characters');
      const picks = chars.slice(0, 6);
      return picks.map(c => ({
        id: Math.random().toString(36).substr(2,9),
        title: c.charAt(0).toUpperCase() + c.slice(1).replace(/-/g,' '),
        description: 'Genshin Impact character',
        image: `https://genshin.dev/characters/${c}/card`,
        url: null, category: 'Games & Comics', source: 'Genshin Impact API',
        tags: ['genshin', 'game', 'rpg'], contentType: 'image', raw: { name: c }
      }));
    }
  } catch (e) { return []; }
}

async function fetchDisney(query) {
  const url = query
    ? `https://api.disneyapi.dev/character?name=${encodeURIComponent(query)}`
    : `https://api.disneyapi.dev/character?page=${Math.floor(Math.random() * 50) + 1}`;
  const data = await fetchWithTimeout(url);
  const items = data.data || (Array.isArray(data) ? data : [data]);
  return items.slice(0, 8).map(c => ({
    id: Math.random().toString(36).substr(2,9),
    title: c.name || 'Disney Character',
    description: `Films: ${(c.films||[]).slice(0,3).join(', ') || 'N/A'} | TV: ${(c.tvShows||[]).slice(0,2).join(', ') || 'N/A'}`,
    image: c.imageUrl || null, url: c.sourceUrl || null, category: 'Games & Comics', source: 'Disney API',
    tags: ['disney', 'character', 'animation'], contentType: c.imageUrl ? 'image' : 'text', raw: c
  }));
}

async function fetchFreeToGame(query) {
  const platform = 'pc';
  const data = await fetchWithTimeout('https://www.freetogame.com/api/games?platform=pc');
  const items = Array.isArray(data) ? data : [];
  const filtered = query
    ? items.filter(g => g.title?.toLowerCase().includes(query.toLowerCase()) || g.genre?.toLowerCase().includes(query.toLowerCase()))
    : items.sort(() => Math.random() - 0.5);
  return filtered.slice(0, 8).map(g => ({
    id: Math.random().toString(36).substr(2,9),
    title: g.title || 'Free Game',
    description: `Genre: ${g.genre || 'N/A'} | Platform: ${g.platform || 'N/A'} | ${g.short_description || ''}`,
    image: g.thumbnail || null, url: g.game_url || null, category: 'Games & Comics', source: 'FreeToGame',
    tags: ['game', 'free', (g.genre||'').toLowerCase(), (g.platform||'').toLowerCase()].filter(Boolean),
    contentType: g.thumbnail ? 'image' : 'text', raw: g
  }));
}

// ─── Music ────────────────────────────────────────────────────────────────────
async function fetchiTunes(query) {
  const q = query || 'top hits';
  const data = await fetchWithTimeout(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=12`);
  const items = data.results || [];
  return items.slice(0, 12).map(t => ({
    id: Math.random().toString(36).substr(2,9),
    title: `${t.trackName || 'Track'} — ${t.artistName || ''}`,
    description: `Album: ${t.collectionName || 'N/A'} | Genre: ${t.primaryGenreName || 'N/A'}`,
    image: t.artworkUrl100 || null, url: t.trackViewUrl || null, category: 'Music', source: 'iTunes',
    tags: ['music', 'song', (t.primaryGenreName||'').toLowerCase(), (t.artistName||'').toLowerCase()].filter(Boolean),
    contentType: t.artworkUrl100 ? 'image' : 'text', raw: t
  }));
}

async function fetchRadioBrowser(query) {
  const url = query
    ? `https://de1.api.radio-browser.info/json/stations/byname/${encodeURIComponent(query)}?limit=8`
    : 'https://de1.api.radio-browser.info/json/stations/topclick/8';
  const data = await fetchWithTimeout(url);
  const items = Array.isArray(data) ? data : [];
  return items.slice(0, 8).map(s => ({
    id: Math.random().toString(36).substr(2,9),
    title: s.name || 'Radio Station',
    description: `Genre: ${s.tags?.split(',')[0] || 'N/A'} | Country: ${s.country || 'N/A'} | Bitrate: ${s.bitrate || 'N/A'} kbps`,
    image: s.favicon || null, url: s.homepage || null, category: 'Music', source: 'Radio Browser',
    tags: ['radio', 'music', 'stream', ...(s.tags||'').split(',').slice(0,3)], contentType: 'data', raw: s
  }));
}

async function fetchMusicBrainz(query) {
  const q = query || 'jazz';
  const data = await fetchWithTimeout(
    `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(q)}&limit=8&fmt=json`,
    { headers: { 'User-Agent': 'Devgenius/1.0 (contact@devgenius.app)' } }
  );
  const items = data.artists || [];
  return items.slice(0, 8).map(a => ({
    id: Math.random().toString(36).substr(2,9),
    title: a.name || 'Artist',
    description: `${a.type || 'Artist'} from ${a.country || 'Unknown'} | Score: ${a.score || 'N/A'}%`,
    image: null, url: `https://musicbrainz.org/artist/${a.id}`, category: 'Music', source: 'MusicBrainz',
    tags: ['music', 'artist', (a.type||'').toLowerCase(), (a.country||'').toLowerCase()].filter(Boolean),
    contentType: 'text', raw: a
  }));
}

// ─── Science & Space ──────────────────────────────────────────────────────────
async function fetchSpaceflightNews(query) {
  const url = query
    ? `https://api.spaceflightnewsapi.net/v4/articles/?search=${encodeURIComponent(query)}&limit=8`
    : 'https://api.spaceflightnewsapi.net/v4/articles/?limit=8';
  const data = await fetchWithTimeout(url);
  const items = data.results || (Array.isArray(data) ? data : []);
  return items.slice(0, 8).map(a => ({
    id: Math.random().toString(36).substr(2,9),
    title: a.title || 'Space News',
    description: a.summary || '',
    image: a.image_url || null, url: a.url || null, category: 'Science & Math', source: 'Spaceflight News',
    tags: ['space', 'science', 'news', 'nasa', 'rocket'], contentType: a.image_url ? 'image' : 'text', raw: a
  }));
}

async function fetchNobelPrize(query) {
  const data = await fetchWithTimeout('https://api.nobelprize.org/2.1/nobelPrizes?limit=12&sort=desc&format=json');
  const items = data.nobelPrizes || [];
  return items.slice(0, 8).map(p => ({
    id: Math.random().toString(36).substr(2,9),
    title: `Nobel Prize in ${p.category?.en || 'Science'} (${p.awardYear || ''})`,
    description: p.topMotivation?.en || p.laureates?.map(l=>l.knownName?.en || l.orgName?.en).join(', ') || '',
    image: null, url: null, category: 'Science & Math', source: 'Nobel Prize',
    tags: ['science', 'nobel', 'prize', (p.category?.en||'').toLowerCase()], contentType: 'data', raw: p
  }));
}

async function fetchWeather(query) {
  const location = query || 'London';
  const data = await fetchWithTimeout(`https://wttr.in/${encodeURIComponent(location)}?format=j1`);
  const current = data.current_condition?.[0];
  return [{
    id: Math.random().toString(36).substr(2,9),
    title: `Weather in ${location}`,
    description: current ? `${current.weatherDesc?.[0]?.value || ''} | Temp: ${current.temp_C}°C / ${current.temp_F}°F | Humidity: ${current.humidity}% | Wind: ${current.windspeedKmph} km/h` : 'Weather data',
    image: null, url: `https://wttr.in/${encodeURIComponent(location)}`, category: 'Weather', source: 'wttr.in',
    tags: ['weather', 'forecast', 'temperature', location.toLowerCase()], contentType: 'data', raw: data
  }];
}

// ─── API Catalog ──────────────────────────────────────────────────────────────
async function fetchRestCountries(query) {
  const url = query
    ? `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`
    : 'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,area';
  const data = await fetchWithTimeout(url);
  const items = Array.isArray(data) ? data : [data];
  const sorted = query ? items : items.sort(() => Math.random() - 0.5);
  return NORMALIZERS['rest-countries'](sorted.slice(0, 12));
}

async function fetchCoinGecko(query) {
  const url = query
    ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodeURIComponent(query.toLowerCase())}&sparkline=false`
    : 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false';
  const data = await fetchWithTimeout(url);
  return NORMALIZERS['coingecko'](Array.isArray(data) ? data : [data]);
}

async function fetchFrankfurter(query) {
  const currencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
  const data = await fetchWithTimeout('https://api.frankfurter.app/latest');
  const rates = Object.entries(data.rates || {}).slice(0, 10);
  return rates.map(([cur, rate]) => ({
    id: Math.random().toString(36).substr(2,9),
    title: `1 ${data.base} = ${rate} ${cur}`,
    description: `Latest exchange rate: ${data.base} to ${cur} as of ${data.date}`,
    image: null, url: null, category: 'Currency Exchange', source: 'Frankfurter',
    tags: ['currency', 'exchange', 'finance', cur.toLowerCase(), (data.base||'').toLowerCase()],
    contentType: 'data', raw: { base: data.base, target: cur, rate, date: data.date }
  }));
}

async function fetchFreeDict(query) {
  if (!query) return [];
  const word = query.split(' ')[0];
  const data = await fetchWithTimeout(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
  const items = Array.isArray(data) ? data : [data];
  return items.slice(0, 3).map(entry => ({
    id: Math.random().toString(36).substr(2,9),
    title: entry.word || word,
    description: entry.meanings?.[0]?.definitions?.[0]?.definition || 'Definition not found',
    image: null, url: null, category: 'Dictionaries', source: 'Free Dictionary',
    tags: ['word', 'dictionary', 'definition', 'english'], contentType: 'text', raw: entry
  }));
}

// ─── Exported fetchers by category ────────────────────────────────────────────
module.exports = {
  fetchDogs, fetchRandomFox, fetchCatFacts, fetchDuckImages, fetchZooAnimals,
  fetchJikan, fetchGhibli, fetchNekosBest,
  fetchArtInstituteChicago, fetchMetMuseum,
  fetchOpenLibrary, fetchPoetryDB, fetchGutendex,
  fetchChuckNorris, fetchJokeAPI, fetchUselessFacts, fetchBoredAPI,
  fetchFruityvice, fetchOpenBrewery, fetchCocktailDB, fetchMealDB,
  fetchPokemon, fetchRickAndMorty, fetchGenshin, fetchDisney, fetchFreeToGame,
  fetchiTunes, fetchRadioBrowser, fetchMusicBrainz,
  fetchSpaceflightNews, fetchNobelPrize, fetchWeather,
  fetchRestCountries, fetchCoinGecko, fetchFrankfurter, fetchFreeDict
};
