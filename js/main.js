/* ============================================
   ASTROMINDCARE.in — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- MOBILE NAV TOGGLE ----------
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // ---------- NAVBAR SCROLL EFFECT ----------
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const currentScroll = window.scrollY;
    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ---------- ACTIVE NAV LINK HIGHLIGHT ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---------- FADE-IN ON SCROLL ----------
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ---------- BACK TO TOP BUTTON ----------
  const backToTop = document.querySelector('.back-to-top');

  function handleBackToTop() {
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- CONTACT FORM (Web3Forms) ----------
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success');
  const formFields = document.querySelector('.form-fields');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          if (formFields) formFields.style.display = 'none';
          if (formSuccess) formSuccess.classList.add('show');
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Error — Try Again';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }

  // ---------- STAT COUNTER ANIMATION ----------
  const statNumbers = document.querySelectorAll('.stat-number');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.getAttribute('data-count');
        const suffix = target.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * finalValue);
          target.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            target.textContent = finalValue + suffix;
          }
        }

        requestAnimationFrame(updateCount);
        countObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => countObserver.observe(el));

  // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = targetEl.offsetTop - navHeight - 10;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ---------- DYNAMIC GOOGLE MAPS REVIEWS ----------
  // To add new reviews, simply append them to this array.
  // The website will automatically display them (up to 6 reviews, showing those with 3+ stars).
  const reviewsData = [
    {
      name: "durgaprasad jena",
      avatar: "DJ",
      location: "Odisha",
      rating: 5,
      text: "Best astrologer in odisha........"
    },
    {
      name: "DILLIP KUMAR DASH",
      avatar: "DD",
      location: "Odisha",
      rating: 5,
      text: "Good Astrologer"
    },
    {
      name: "RAMSHANKAR BARIK",
      avatar: "RB",
      location: "Odisha",
      rating: 5,
      text: "Good"
    },
    {
      name: "Nigam",
      avatar: "N",
      location: "Odisha",
      rating: 5,
      text: "Good"
    }
  ];

  const testimonialsContainer = document.getElementById('testimonials-container');
  if (testimonialsContainer) {
    // Filter out low rated reviews (under 3 stars)
    const goodReviews = reviewsData.filter(review => review.rating >= 3);

    // Limit display to at most 6 reviews
    const displayedReviews = goodReviews.slice(0, 6);

    // Render dynamically
    testimonialsContainer.innerHTML = displayedReviews.map(review => {
      const starsHTML = Array(review.rating).fill('<i class="fa-solid fa-star"></i>').join('');
      return `
        <div class="testimonial-card fade-in">
          <div class="testimonial-stars">
            ${starsHTML}
          </div>
          <p class="testimonial-text">"${review.text}"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">${review.avatar}</div>
            <div>
              <div class="testimonial-name">${review.name}</div>
              <div class="testimonial-location">${review.location}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Observe newly added testimonial cards for fade-in scroll animation
    testimonialsContainer.querySelectorAll('.fade-in').forEach(el => {
      if (typeof fadeObserver !== 'undefined') {
        fadeObserver.observe(el);
      }
    });
  }

  // ---------- CURRENT YEAR IN FOOTER ----------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
