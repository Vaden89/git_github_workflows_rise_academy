console.log("script Loaded");

const moviesContainer = document.getElementById("movies-container");

fetch("/data/movies.json")
  .then((res) => res.json())
  .then((movies) => {
    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.innerHTML = `
        <img src=${movie.image}/>
        <h1>${movie.title}</h1>
        <p>${movie.description}</p>
        <div>
          <span>Release date:</span>
          <span>${movie.releaseYear}</span>
        </div>
        <div>
          <span>Genre:</span>
          <span>${movie.genre}</span>
        </div>
      `;
      moviesContainer.append(movieCard);
    });
  })
  .catch((error) => {
    moviesContainer.innerHTML =
      "<p style='color: red'>An error occurred while fetching json data please reach out to me to fix</p>";
    console.log("error loading json: ", error);
  });
