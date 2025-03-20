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
            this.localAnime = await res.json();

            const apiRes = await fetch('./public/api.json');
            const apiData = await apiRes.json();
            const apiAnimeRes = await fetch(apiData.url);
            const apiAnimeData = await apiAnimeRes.json();
            this.topAnime = apiAnimeData.data;
        },
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