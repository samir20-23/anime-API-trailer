const { createApp } = Vue;

createApp({
    data() {
        return {
            searchQuery: '',
            localAnime: [],
            topAnime: []
        };
    },
    computed: {
        filteredLocalAnime() {
            return this.localAnime.filter(anime => anime.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
    },
    methods: {
       async fetchAnimeData() {
    const res = await fetch('./public/anime.json');
    let animeData = await res.json();

    // Add a random image selection for each anime
    this.localAnime = animeData.map(anime => {
        const randomImage = anime.image[Math.floor(Math.random() * anime.image.length)];  // Select a random image
        return { ...anime, image: randomImage };  // Add the random image to each anime
    });

    const apiRes = await fetch('./public/api.json');
    const apiData = await apiRes.json();
    const apiAnimeRes = await fetch(apiData.url);
    const apiAnimeData = await apiAnimeRes.json();
    this.topAnime = apiAnimeData.data;
}
,
        goToWatch(animeTitle) {
            window.location.href = `watch.html?anime=${encodeURIComponent(animeTitle)}`;
        },
        showTrailer(trailerUrl) {
            document.getElementById('trailer-frame').src = trailerUrl.embed_url;
        }
    },
    mounted() {
        this.fetchAnimeData();
    }
}).mount("#app");
// 