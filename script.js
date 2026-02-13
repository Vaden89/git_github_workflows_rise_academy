const moviesContainer = document.getElementById("movies-container");
const genresContainer = document.getElementById("genres-container");

loadMovies("all");
loadGenres();

function loadMovies(genre) {
  moviesContainer.innerHTML = "";

  fetch("/data/movies.json")
    .then((res) => res.json())
    .then((movies) => {
      movies.forEach((movie) => {
        if (movie.genre != genre && genre != "all") {
          return;
        }

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
}

function loadGenres() {
  fetch("/data/genres.json")
    .then((res) => res.json())
    .then((genres) => {
      genres.forEach((genre) => {
        const genreContainer = document.createElement("button");
        genreContainer.innerText = genre;

        genreContainer.addEventListener("click", (e) => {
          e.preventDefault();
          loadMovies(genre);
        });

        genresContainer.append(genreContainer);
      });
    })
    .catch((err) =>
      console.log("An Error Occurred while fetching genre data", err),
    );
}
