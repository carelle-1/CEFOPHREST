// Header scroll effect
const header = document.getElementById('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hero Slider
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-nav .dot');
const heroPrev = document.getElementById('hero-prev');
const heroNext = document.getElementById('hero-next');
let currentHeroSlide = 0;
let heroSlideInterval;

function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentHeroSlide = index;
}

function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
}

function prevHeroSlide() {
    currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
}

if (heroSlides.length > 0) {
    heroSlideInterval = setInterval(nextHeroSlide, 6000);

    if (heroDots.length > 0) {
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showHeroSlide(index);
                clearInterval(heroSlideInterval);
                heroSlideInterval = setInterval(nextHeroSlide, 6000);
            });
        });
    }

    if (heroPrev) {
        heroPrev.addEventListener('click', () => {
            prevHeroSlide();
            clearInterval(heroSlideInterval);
            heroSlideInterval = setInterval(nextHeroSlide, 6000);
        });
    }

    if (heroNext) {
        heroNext.addEventListener('click', () => {
            nextHeroSlide();
            clearInterval(heroSlideInterval);
            heroSlideInterval = setInterval(nextHeroSlide, 6000);
        });
    }
}

// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Testimonials slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.nav-dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    testimonials.forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}

if (testimonials.length > 1) {
    slideInterval = setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
}

// Form validation for contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Reset errors
        const errorElements = contactForm.querySelectorAll('.error');
        errorElements.forEach(el => el.remove());

        // Name validation
        if (!name || name.value.trim() === '') {
            showError(name, 'Le nom est requis');
            isValid = false;
        }

        // Email validation
        if (!email || email.value.trim() === '') {
            showError(email, 'L\'email est requis');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Veuillez entrer un email valide');
            isValid = false;
        }

        // Subject validation
        if (!subject || subject.value.trim() === '') {
            showError(subject, 'Le sujet est requis');
            isValid = false;
        }

        // Message validation
        if (!message || message.value.trim() === '') {
            showError(message, 'Le message est requis');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            return;
        }

        if (false) {
            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Envoyé!';
            submitBtn.disabled = true;

            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = 'Envoyer le message';
                submitBtn.disabled = false;

                // Show success notification
                showNotification('Votre message a été envoyé avec succès!', 'success');
            }, 1000);
        }
    });
}

function showError(input, message) {
    if (!input) return;
    const formGroup = input.parentElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.textContent = message;
    input.style.borderColor = '#e74c3c';
    formGroup.appendChild(errorElement);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Newsletter form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]');
        if (email && isValidEmail(email.value)) {
            showNotification('Abonnement réussi!', 'success');
            newsletterForm.reset();
        } else {
            showNotification('Veuillez entrer un email valide', 'error');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if header should have scrolled class on load
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    }
});
