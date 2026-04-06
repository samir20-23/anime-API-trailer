
document.addEventListener("DOMContentLoaded", function() {
  let contentDiv = document.getElementById("content");
  
let search = document.getElementById("search");
function fetchAnimeData() {
 searchValue = search.value.trim().toLowerCase();
    
    url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchValue)}`;

   fetch(url)
   .then(response => response.json())
    .then(data => { 
      function forloop() {
           for (let i = 0; i < Math.min(data.data.length, 10); i++) {
        let animeElement = createAnimeElement(data.data[i]);
        contentDiv.appendChild(animeElement);
    }
    
      }
      forloop();
       let and = document.getElementById("and");
      and.addEventListener("click",forloop); 
        
      })
  }
  
  search.addEventListener("input",fetchAnimeData)
  function createAnimeElement(anime) {
    // 
    let imganime=anime.images.jpg.large_image_url;
    let titleanime=anime.title;
    let videoanime= anime.trailer.embed_url;
    let textanime=anime.synopsis;
    // 

    let animeDiv = document.createElement("div");
    animeDiv.classList.add("anime");

    let img = document.createElement("img");
    img.src = imganime;
    img.classList.add("img");
    animeDiv.appendChild(img);

    let title = document.createElement("h1");
    title.textContent =titleanime ;
    title.classList.add("title");
    animeDiv.appendChild(title);

    let iframe = document.createElement("iframe");
    iframe.src =videoanime;
    iframe.classList.add("video-iframe");
    animeDiv.appendChild(iframe);



    let synopsis = document.createElement("p");
    synopsis.textContent = textanime;
    synopsis.classList.add("text");

    animeDiv.appendChild(synopsis);

    return animeDiv;
  }
 
  window.addEventListener("scroll", function() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
     
      let and  = document.getElementById("and");
     and.style.display="block";
    }else{
     and.style.display="none";
    }
  });

  fetchAnimeData();
});


let search = document.getElementById("search");
let searchbtn = document.getElementById("submit");
let logo = document.getElementById("logo");
logo.addEventListener("click", function() {
  location.reload();
});

function searchfilter() {
  window.scrollY=0;

  let searchValue = search.value.trim().toLowerCase();
  
  let animeItems = document.querySelectorAll(".anime");

  animeItems.forEach(anime => {
    let title = anime.querySelector(".title").textContent.toLowerCase();
    let synopsis = anime.querySelector(".text").textContent.toLowerCase();
    let match = title.includes(searchValue) || synopsis.includes(searchValue);
    anime.style.display = match ? "block" : "none";
  });
}

search.addEventListener("input", searchfilter);
    searchbtn.addEventListener("click", searchfilter);

 