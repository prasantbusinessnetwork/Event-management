// LUXURY CURSOR LOGIC
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    if (cursor) cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    if (follower) follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
});

function initLuxuryInteractions() {
    document.querySelectorAll('a, button, input, select, textarea, .card').forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (follower) {
                follower.style.transform += ' scale(2)';
                follower.style.background = 'rgba(255,255,255,0.1)';
            }
        });
        link.addEventListener('mouseleave', () => {
            if (follower) {
                follower.style.background = 'transparent';
                follower.style.transform = follower.style.transform.replace(' scale(2)', '');
            }
        });
    });
}

// SECTION REVEAL LOGIC
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, { 
    root: null,
    rootMargin: '0px 0px -30px 0px',
    threshold: 0 
});

function initSectionReveals() {
    document.querySelectorAll('.reveal, section, .card, .stat-item, .section-title').forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
        revealObserver.observe(el);
    });
}

// STICKY NAVBAR SHOW/HIDE ON SCROLL
let lastScroll = 0;
const navbar = document.getElementById('navbar');

function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-hide');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-hide')) {
            navbar.classList.add('scroll-hide');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-hide')) {
            navbar.classList.remove('scroll-hide');
        }
        lastScroll = currentScroll;
    });
}

// HERO SLIDESHOW LOGIC
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slides .slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 6000); // Crossfade every 6 seconds
}

// MOBILE MENU LOGIC
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// SUCCESS POPUP LOGIC
function showSuccessPopup() {
    let popup = document.getElementById('successPopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'successPopup';
        popup.className = 'success-popup';
        popup.innerHTML = `
            <div class="success-icon">✓</div>
            <h2 class="gradient-text">Success!</h2>
            <p>Your details have been recorded. Our team will contact you shortly.</p>
            <button class="success-close-btn" onclick="this.parentElement.classList.remove('active')">Close</button>
        `;
        document.body.appendChild(popup);
    }
    setTimeout(() => popup.classList.add('active'), 100);
}

// FORM SUBMISSION TO GOOGLE SHEETS
function initFormSubmission() {
    const handleSubmission = (form) => {
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXyRmnI9eKLRf--1AOMywv0gvM5YjMT45fWP4k1jzzWtBUn7yxtIHBYcfUVBkmDc-G/exec';

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data)
            })
            .then(() => {
                showSuccessPopup();
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');
            })
            .finally(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        });
    };

    handleSubmission(document.getElementById('registrationForm'));
    handleSubmission(document.getElementById('contactForm'));
}

// INITIALIZE ALL
document.addEventListener('DOMContentLoaded', () => {
    initLuxuryInteractions();
    initSectionReveals();
    initHeroSlideshow();
    initFormSubmission();
    if (navbar) initNavbarScroll();
    initMobileMenu();
});
