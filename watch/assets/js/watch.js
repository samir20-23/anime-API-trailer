const { createApp } = Vue;

createApp({
    data() {
        return {
            animeTitle: "",
            videos: [],
            playerSrc: ""
        };
    },
    async mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.animeTitle = urlParams.get("anime");

        if (!this.animeTitle) {
            alert("Anime not found!");
            window.location.href = "index.html";
            return;
        }

        const response = await fetch(`./Public/${this.animeTitle}/${this.animeTitle}.json`);
        this.videos = await response.json();
    },
    methods: {
        playVideo(videoFile) {
            this.playerSrc = `./Public/${videoFile}`;
        }
    }
}).mount("#app");
