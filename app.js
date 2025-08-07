const form = document.querySelector('form');
const container = document.querySelector('.image-container');
const detailSection = document.querySelector('.movie-detail');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  container.innerHTML = '';
  detailSection.innerHTML = '';
  const query = form.querySelector('input').value.trim();
  if (query) {
    await fetchMovies(query);
  }
});

async function fetchMovies(query) {
  const apiKey = '4710949e';
  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  const data = await res.json();

  if (data.Response === "True") {
    showMovieCards(data.Search);
  } else {
    container.innerHTML = `<p>No results found for "${query}".</p>`;
  }
}

function showMovieCards(movies) {
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    card.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}" style="width: 100%; border-radius: 8px;">
      <h3>${movie.Title}</h3>
      <p><i class="fa-solid fa-calendar-days"></i> ${movie.Year}</p>
    `;

    card.addEventListener('click', () => {
      fetchMovieDetails(movie.imdbID);
    });

    container.appendChild(card);
  });
}

async function fetchMovieDetails(imdbID) {
  const apiKey = '4710949e';
  const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
  const movie = await res.json();

  if (movie.Response === "True") {
    showMovieDetails(movie);
  } else {
    detailSection.innerHTML = "<p>Details not found.</p>";
  }
}

function showMovieDetails(movie) {
  detailSection.innerHTML = `
    <h2>${movie.Title} (${movie.Year})</h2>
    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}" />
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Actors:</strong> ${movie.Actors}</p>
    <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <div style="clear: both;"></div>
  `;
}
