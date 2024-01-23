document.addEventListener('DOMContentLoaded', async () => {
    const orderSelect = document.getElementById('order-select');
    const filterInput = document.getElementById('filter-input');
    const moviesList = document.getElementById('movies');
    const selectedMovie = document.getElementById('selected-movie');
    
    
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/?format=json');
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };
  

    const renderMovies = (movies) => {
        moviesList.innerHTML = '';
        movies.forEach(movie => {
          const li = document.createElement('li');
          const titleContainer = document.createElement('div');
          const releaseDateContainer = document.createElement('div');
      
          titleContainer.textContent = `Episode ${movie.episode_id} - ${movie.title} `;
          releaseDateContainer.textContent = `${movie.release_date}`;
      
          li.appendChild(titleContainer);
          li.appendChild(releaseDateContainer);
      
          li.addEventListener('click', () => showMovieDetails(movie));
          moviesList.appendChild(li);
        });
      };
      
    const showMovieDetails = (movie) => {
        selectedMovie.innerHTML = `<h3><strong>${movie.title}</strong></h3><br>
          <strong>Episode:</strong> ${movie.episode_id}<br>
          <strong>Director:</strong> ${movie.director}<br>
          <strong>Producer:</strong> ${movie.producer}<br>
          <strong>Release Date:</strong> ${movie.release_date}<br>
          ${movie.opening_crawl}`;
      };
      
    orderSelect.addEventListener('change', async () => {
      const orderBy = orderSelect.value;
      const movies = await fetchData();
      movies.sort((a, b) => (orderBy === 'year') ? a.release_date.localeCompare(b.release_date) : a.episode_id - b.episode_id);
      renderMovies(movies);
    });
  
    filterInput.addEventListener('input', async () => {
      const filterText = filterInput.value.toLowerCase();
      const movies = await fetchData();
      const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(filterText));
      renderMovies(filteredMovies);
    });

    const initialMovies = await fetchData();
    renderMovies(initialMovies);
  });
  