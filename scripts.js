let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("carousel-slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
    }
    setTimeout(showSlides, 2000);
}

function moveSlide(n) {
    slideIndex += n;
    let slides = document.getElementsByClassName("carousel-slide");
    if (slideIndex > slides.length) {
        slideIndex = 1;
    } else if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
    }
}

function showTrailer(youtubeUrl) {
    let modal = document.getElementById("trailer-modal");
    let iframe = document.getElementById("trailer-video");
    iframe.src = youtubeUrl;
    modal.style.display = "block";
}

function closeTrailer() {
    let modal = document.getElementById("trailer-modal");
    let iframe = document.getElementById("trailer-video");
    iframe.src = "";
    modal.style.display = "none";
}

function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;

            
            let email = getCookie('user_email');
            if (email) {
                document.getElementById('user-email').textContent = email;
            }
        })
        .catch(error => console.error('Error loading header:', error));
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
}

function loadWatchlist() {
    let email = getCookie('user_email');
    console.log('Email from cookie:', email);
    fetch(`data/fetch_watchlist.php?email=${encodeURIComponent(email)}`)
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Fetch response:', data);
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }
            let watchlistContainer = document.getElementById('watchlist-container');
            watchlistContainer.innerHTML = '';
            if (data.length > 0) {
                data.forEach(movie => {
                    let movieElement = document.createElement('div');
                    movieElement.classList.add('movie');
                    movieElement.innerHTML = `
                        <img src="${movie.thumbnail}" alt="${movie.title}">
                        <p>${movie.title}</p>
                    `;
                    movieElement.addEventListener('click', () => {
                        let url = new URL('/disneyplus/movpreview.html', window.location.origin);
                        url.searchParams.set('title', movie.title);
                        url.searchParams.set('image', movie.thumbnail);
                        url.searchParams.set('description', movie.description || '');
                        url.searchParams.set('logo', movie.logo || '');
                        url.searchParams.set('trailer', movie.trailer || '');
                        window.location.href = url.toString();
                    });
                    watchlistContainer.appendChild(movieElement);
                });
            } else {
                watchlistContainer.innerHTML = '<p>No movies in your watchlist.</p>';
            }
        })
        .catch(error => console.error('Error loading watchlist:', error));
}

function toggleDropdown() {
    let dropdown = document.querySelector(".dropdown-menu");
    dropdown.classList.toggle("show");
}

function logout() {
    document.cookie = 'user_email=; Max-Age=0; path=/';
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', showSlides);
document.addEventListener('DOMContentLoaded', loadWatchlist);
document.addEventListener('DOMContentLoaded', loadHeader);
document.addEventListener('DOMContentLoaded', loadFooter);
