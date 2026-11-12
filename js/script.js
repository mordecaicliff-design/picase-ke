/* ===================== Navbar Scroll Effect ===================== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===================== Mobile Menu Toggle ===================== */
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
});

/* Close mobile menu when clicking a link */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

/* ===================== Hero Slider ===================== */
const heroTrack = document.getElementById('heroTrack');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.getElementById('heroDots');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
const totalHeroSlides = heroSlides.length;
let currentHeroSlide = 0;
let heroInterval;

function initHeroSlider() {
  heroSlides.forEach((slide, index) => {
    const dot = document.createElement('span');
    dot.dataset.index = index;
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToHeroSlide(index));
    heroDots.appendChild(dot);
  });

  heroInterval = setInterval(() => {
    currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
    goToHeroSlide(currentHeroSlide);
  }, 5000);

  heroPrev.addEventListener('click', () => {
    clearInterval(heroInterval);
    currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
    goToHeroSlide(currentHeroSlide);
    heroInterval = setInterval(() => {
      currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
      goToHeroSlide(currentHeroSlide);
    }, 5000);
  });

  heroNext.addEventListener('click', () => {
    clearInterval(heroInterval);
    currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
    goToHeroSlide(currentHeroSlide);
    heroInterval = setInterval(() => {
      currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
      goToHeroSlide(currentHeroSlide);
    }, 5000);
  });

  // Pause on hover
  const heroSlider = document.querySelector('.hero-slider');
  heroSlider.addEventListener('mouseenter', () => clearInterval(heroInterval));
  heroSlider.addEventListener('mouseleave', () => {
    heroInterval = setInterval(() => {
      currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
      goToHeroSlide(currentHeroSlide);
    }, 5000);
  });
}

function goToHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(-${i * 100}%)`;
  });

  const dots = heroDots.querySelectorAll('span');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentHeroSlide = index;
}

/* ===================== Slider Cards ===================== */
const sliderContainer = document.getElementById('sliderContainer');
const sliderCards = document.querySelectorAll('.slider-card');
const cardDots = document.getElementById('cardDots');
const cardPrev = document.getElementById('cardPrev');
const cardNext = document.getElementById('cardNext');
const cardCount = sliderCards.length;
let currentCard = 0;

function initSliderCards() {
  // Create dots
  sliderCards.forEach((card, index) => {
    const dot = document.createElement('span');
    dot.dataset.index = index;
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToCard(index));
    cardDots.appendChild(dot);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToCard((currentCard - 1 + cardCount) % cardCount);
    if (e.key === 'ArrowRight') goToCard((currentCard + 1) % cardCount);
  });

  // Prefetch next card for smooth scrolling
  cardPrev.addEventListener('click', () => {
    const newIndex = (currentCard - 1 + cardCount) % cardCount;
    goToCard(newIndex);
  });

  cardNext.addEventListener('click', () => {
    const newIndex = (currentCard + 1) % cardCount;
    goToCard(newIndex);
  });
}

function goToCard(index) {
  // Hide all cards
  sliderCards.forEach(card => {
    card.style.display = 'none';
  });

  // Show selected card with animation
  sliderCards[index].style.display = 'flex';
  sliderCards[index].style.animation = 'slideIn 0.4s ease forwards';

  // Update dots
  const dots = cardDots.querySelectorAll('span');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentCard = index;
}

// Add keyframe for slide-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);

/* ===================== Contact Form ===================== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
    // Show success message
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = '#22C55E';
    btn.style.color = '#fff';

    // Reset after 3 seconds
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
      contactForm.reset();
    }, 3000);
  }
});
