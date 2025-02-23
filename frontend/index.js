// Helper function to create elements
function createElement(type, props, ...children) {
    const element = document.createElement(type);

    if (props) {
        for (const key in props) {
            if (key.startsWith('on')) {
                // Event listeners
                element.addEventListener(key.substring(2).toLowerCase(), props[key]);
            } else if (key === 'style') {
                // Style object
                for (const styleKey in props[key]) {
                    element.style[styleKey] = props[key][styleKey];
                }
            } else {
                // Other attributes
                element.setAttribute(key, props[key]);
            }
        }
    }

    for (const child of children) {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child) {
            element.appendChild(child);
        }
    }
    return element;
}


// --- Components ---

// Navbar Component
function Navbar() {
    return createElement('div', { className: 'navbar glass' },
        createElement('div', { className: 'navbar-left' },
            createElement('img', { src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', alt: 'Netflix Logo', className: 'navbar-logo' }),
            createElement('a', { href: '#', onclick: () => renderBrowsePage() }, 'Home'),
            createElement('a', { href: '#', onclick: () => renderBrowsePage() }, 'TV Shows'),
            createElement('a', { href: '#', onclick: () => renderBrowsePage() }, 'Movies'),
            createElement('a', { href: '#', onclick: () => renderBrowsePage() }, 'New & Popular'),
            createElement('a', { href: '#', onclick: () => renderMyListPage() }, 'My List')
        ),
        createElement('div', { className: 'navbar-right' },
            createElement('a', { href: '#', onclick: () => renderSearchPage()}, createElement('i', {className: 'fas fa-search'})), // Placeholder for search icon
            createElement('a', { href: '#', onclick: () => renderKidsPage()}, 'Kids'),
            createElement('img', { src: 'https://via.placeholder.com/30', alt: 'User Profile', onclick: () => alert('Profile dropdown - Not implemented') }) // Placeholder
        )
    );
}

// Hero Section Component
function Hero() {
    return createElement('div', { className: 'hero' },
        createElement('div', { className: 'hero-background', style: { backgroundImage: 'url(https://unsplash.com/photos/a-person-holding-a-remote-control-in-front-of-a-tv-mZabS7Gnl94)' } }),
        createElement('div', { className: 'hero-content' },
            createElement('h1', null, 'Unlimited movies, TV shows, and more.'),
            createElement('p', null, 'Watch anywhere. Cancel anytime.'),
            createElement('button', { className: 'btn btn-primary', onclick: () => renderSignUpPage() }, 'Sign Up Now'),
            createElement('a', { href: '#', style: { color: '#E5E5E5', marginLeft: '15px' }, onclick: () => renderSignInPage() }, 'Sign In')
        )
    );
}

// Feature Section Component
function Feature({ imageSrc, title, description }) {
    return createElement('div', { className: 'feature' },
        createElement('div', { className: 'feature-image' },
            createElement('img', { src: imageSrc, alt: title })
        ),
        createElement('div', { className: 'feature-text' },
            createElement('h2', null, title),
            createElement('p', null, description)
        )
    );
}

// Footer Component
function Footer() {
    return createElement('div', { className: 'footer' },
        createElement('p', null,
            createElement('a', { href: '#' }, 'FAQ'),
            createElement('a', { href: '#' }, 'Help Center'),
            createElement('a', { href: '#' }, 'Terms of Use'),
            createElement('a', { href: '#' }, 'Privacy'),
            createElement('a', { href: '#' }, 'Cookie Preferences'),
            createElement('a', { href: '#' }, 'Corporate Information')
        ),
        createElement('p', null, '© 2023 Netflix Clone') // Added copyright
    );
}

// --- Page Rendering Functions ---

// Landing Page
function renderLandingPage() {
    const root = document.getElementById('root');
    root.innerHTML = ''; // Clear previous content

    root.appendChild(Hero());
    root.appendChild(createElement('div', { className: 'features' },
        Feature({ imageSrc: 'https://www.pexels.com/photo/woman-in-black-tank-top-using-macbook-pro-3765114/', title: 'Watch on any device', description: 'Stream on your phone, tablet, laptop, and TV.' }),
        Feature({ imageSrc: 'https://unsplash.com/photos/a-hand-holding-a-cell-phone-with-a-download-icon-on-it-JHGJos-eybo', title: 'Download and go', description: 'Save your favorites easily and always have something to watch.' }),
        Feature({ imageSrc: 'https://www.pexels.com/photo/children-watching-on-flat-screen-tv-3589019/', title: 'Create profiles for kids', description: 'Send kids on adventures with their favorite characters in a space made just for them—free with your membership.' })
    ));
    root.appendChild(Footer());
}

// Sign-Up Page
function renderSignUpPage() {
    const root = document.getElementById('root');
    root.innerHTML = '';

    const form = createElement('form', { className: 'form-container', onsubmit: handleSignUp },
        createElement('h2', null, 'Sign Up'),
        createElement('div', { className: 'form-group' },
            createElement('label', { htmlFor: 'email' }, 'Email'),
            createElement('input', { type: 'email', id: 'email', required: true })
        ),
        createElement('div', { className: 'form-group' },
            createElement('label', { htmlFor: 'password' }, 'Password'),
            createElement('input', { type: 'password', id: 'password', required: true })
        ),
        createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Start Membership'),
        createElement('a', { href: '#', style: { color: '#AAAAAA', display: 'block', marginTop: '10px' }, onclick: (e) => { e.preventDefault(); renderSignInPage(); } }, 'Sign in')
    );

    root.appendChild(form);
    root.appendChild(Footer());

    function handleSignUp(event) {
        event.preventDefault();
        // In a real app, you'd handle form submission (e.g., send data to a server)
        alert('Sign-up form submitted.  (Not a real sign-up process)');
        renderBrowsePage(); // Redirect to browse after "sign-up"
    }
}

// Sign-In Page
function renderSignInPage() {
    const root = document.getElementById('root');
    root.innerHTML = '';

    const form = createElement('form', { className: 'form-container', onsubmit: handleSignIn },
        createElement('h2', null, 'Sign In'),
        createElement('div', { className: 'form-group' },
            createElement('label', { htmlFor: 'email' }, 'Email'),
            createElement('input', { type: 'email', id: 'email', required: true })
        ),
        createElement('div', { className: 'form-group' },
            createElement('label', { htmlFor: 'password' }, 'Password'),
            createElement('input', { type: 'password', id: 'password', required: true })
        ),
        createElement('button', { type: 'submit', className: 'btn btn-primary' }, 'Sign In'),
        createElement('a', { href: '#', style: { color: '#AAAAAA', display: 'block', marginTop: '10px' }, onclick: (e) => { e.preventDefault(); renderSignUpPage(); } }, 'Sign up now')
    );

    root.appendChild(form);
    root.appendChild(Footer());

    function handleSignIn(event) {
        event.preventDefault();
        // In a real app, you'd handle authentication (e.g., check credentials against a server)
        alert('Sign-in form submitted. (Not a real sign-in process)');
        renderBrowsePage(); // Redirect to browse after "sign-in"
    }
}


// Browse Page
function renderBrowsePage() {
    const root = document.getElementById('root');
    root.innerHTML = '';

    root.appendChild(Navbar());
    root.appendChild(Carousel()); // Add the carousel
    root.appendChild(createElement('div', { className: 'content-row' },
        createElement('h2', null, 'Trending Now'),
        createElement('div', { className: 'posters' },
            ...createPosterElements(['https://unsplash.com/photos/a-movie-theater-with-a-large-screen-and-red-seats-p-xSlmX-bdA'], onPosterClick)
        )
    ));
    root.appendChild(createElement('div', { className: 'content-row' },
        createElement('h2', null, 'Comedies'),
        createElement('div', { className: 'posters' },
            ...createPosterElements(['https://www.pexels.com/photo/people-watching-a-movie-1117132/'], onPosterClick)
        )
    ));
    // Add more content rows as needed...

    root.appendChild(Footer());

    function onPosterClick(imageUrl) {
        renderMovieDetails(imageUrl); // Show details when a poster is clicked
    }
}

// Carousel Component
function Carousel() {
    const carouselInner = createElement('div', { className: 'carousel-inner' });
    const carousel = createElement('div', { className: 'carousel' }, carouselInner);

    const items = [
        { image: 'https://unsplash.com/photos/man-in-black-jacket-standing-beside-woman-in-black-dress-6pep-i-Sejk', title: 'Featured Movie 1', description: 'Description 1' },
        { image: 'https://www.pexels.com/photo/man-and-woman-near-mountain-cliff-718978/', title: 'Featured Movie 2', description: 'Description 2' },
        // Add more carousel items as needed
    ];

    items.forEach((item, index) => {
        const carouselItem = createElement('div', { className: 'carousel-item' },
            createElement('img', { src: item.image, alt: item.title }),
            createElement('div', { className: 'carousel-caption' },
                createElement('h3', null, item.title),
                createElement('p', null, item.description)
            )
        );
        carouselInner.appendChild(carouselItem);
    });

    // Basic carousel functionality (auto-advance)
    let currentSlide = 0;
    setInterval(() => {
        currentSlide = (currentSlide + 1) % items.length;
        const translateX = -currentSlide * 100;
        carouselInner.style.transform = `translateX(${translateX}%)`;
    }, 5000); // Change slide every 5 seconds

    return carousel;
}


// Helper function to create multiple poster elements
function createPosterElements(imageUrls, clickHandler) {
    return imageUrls.map(url =>
        createElement('div', { className: 'poster', onclick: () => clickHandler(url) },
            createElement('img', { src: url, alt: 'Movie Poster' }),
            createElement('div', { className: 'poster-overlay' },
                createElement('h3', null, 'Movie Title'),
                createElement('p', null, 'Brief description'),
                createElement('button', { className: 'btn btn-primary' }, 'Play'),
                createElement('button', { className: 'btn btn-secondary' }, 'More Info')
            )
        )
    );
}


// Movie Details Page (Modal)
function renderMovieDetails(imageUrl) {
    const modal = createElement('div', { className: 'modal' },
        createElement('div', { className: 'modal-content' },
            createElement('button', { className: 'modal-close', onclick: closeModal }, 'X'),
            createElement('img', { src: imageUrl, alt: 'Movie Backdrop', style: { width: '100%', marginBottom: '20px' } }),
            createElement('h2', null, 'Movie Title'),
            createElement('p', null, 'Year: 2023 | Rating: PG-13 | Duration: 2h 30m'),
            createElement('p', null, 'Movie description...'),
            createElement('button', { className: 'btn btn-primary' }, 'Play'),
            createElement('button', { className: 'btn btn-secondary' }, 'Add to My List'),
            // ... Add more details (cast, crew, etc.) as needed ...
        )
    );

    document.body.appendChild(modal);

    function closeModal() {
        document.body.removeChild(modal);
    }
}

// Search Page
function renderSearchPage(){
    const root = document.getElementById('root');
    root.innerHTML = '';

    root.appendChild(Navbar());
    const searchContainer = createElement('div', {className: 'search-container'},
        createElement('input', {type: 'text', className: 'search-bar', placeholder: 'Search for movies, shows, genres...'}),
        createElement('div', {className: 'search-results'})
    );
    root.appendChild(searchContainer);
    root.appendChild(Footer());
}

// My List Page
function renderMyListPage(){
    const root = document.getElementById('root');
    root.innerHTML = '';

    root.appendChild(Navbar());
    const myListContainer = createElement('div', {className: 'my-list-container'},
        createElement('h2', null, 'My List'),
        createElement('div', {className: 'content-row'},
            createElement('div', {className: 'posters'})
        )
    );
    root.appendChild(myListContainer);
    root.appendChild(Footer());
}

// Kids Profile Page
function renderKidsPage(){
    const root = document.getElementById('root');
    root.innerHTML = '';

    root.appendChild(Navbar());
    const kidsContainer = createElement('div', {className: 'kids-container'},
        createElement('h2', null, 'Kids'),
        createElement('div', {className: 'content-row'},
            createElement('div', {className: 'posters'})
        )
    );
    root.appendChild(kidsContainer);
    root.appendChild(Footer());
}

// Initial render (Landing Page)
renderLandingPage();
