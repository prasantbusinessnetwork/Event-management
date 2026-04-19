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

const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.1 });

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

// INITIALIZE ALL
document.addEventListener('DOMContentLoaded', () => {
    initLuxuryInteractions();
    initSectionReveals();
    if (navbar) initNavbarScroll();
    initMobileMenu();
});
