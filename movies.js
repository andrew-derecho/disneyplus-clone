async function fetchMovies() {
    try {
        let response = await fetch('data/fetch_movies.php');
        let movies = await response.json();

        let middleIndex = Math.ceil(movies.length / 2);
        let recommendedMovies = movies.slice(0, middleIndex);
        let newlyAddedMovies = movies.slice(middleIndex);

        populateMovies('recommended-movies', recommendedMovies);
        populateMovies('newly-added', newlyAddedMovies);
        populateCarousel('carousel-container', movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function getYouTubeThumbnail(url) {
    let videoId = url.split('v=')[1].split('&')[0];
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
}

function populateMovies(sectionId, movieList) {
    let section = document.getElementById(sectionId);
    section.innerHTML = ''; movieList.forEach(movie => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.onclick = () => openHeroPage(movie);

        let thumbnail = movie.thumbnail;
        movieDiv.innerHTML = `
            <img src="${thumbnail}" alt="${movie.name}">
            <p>${movie.name}</p>
        `;

        section.appendChild(movieDiv);
    });
}

function populateCarousel(containerId, movieList) {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; movieList.forEach(movie => {
        let slideDiv = document.createElement('div');
        slideDiv.classList.add('carousel-slide');
        slideDiv.onclick = () => openHeroPage(movie);

        let thumbnail = movie.thumbnail;
        slideDiv.innerHTML = `
            <img src="${thumbnail}" alt="${movie.name}">
        `;

        container.appendChild(slideDiv);
    });

    let slides = document.getElementsByClassName("carousel-slide");
    if (slides.length > 0) {
        slides[0].style.display = "block";
    }
}

function openHeroPage(movie) {
    let url = new URL(window.location.href);
    url.pathname = '/disneyplus/movpreview.html'; url.searchParams.set('title', movie.name);
    url.searchParams.set('image', movie.thumbnail);
    url.searchParams.set('trailer', movie.trailer);
    url.searchParams.set('description', movie.description || 'No description available.');
    url.searchParams.set('logo', movie.logo);
    window.location.href = url.toString();
}

document.addEventListener('DOMContentLoaded', fetchMovies);
