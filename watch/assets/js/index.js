const { createApp } = Vue;

createApp({
    data() {
        return {
            animes: []
        };
    },
    async mounted() {
        const response = await fetch("./Public/anime.json");
        this.animes = await response.json();
    },
    methods: {
        goToAnime(animePath) {
            window.location.href = `watch.html?anime=${encodeURIComponent(animePath)}`;
        }
    }
}).mount("#app");
