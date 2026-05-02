document.addEventListener('DOMContentLoaded', () => {
  // ===== WATER BUBBLE CURSOR =====
  const bubbleCursor = document.querySelector('.bubble-cursor');
  const bubbleTrail = document.querySelector('.bubble-trail');

  if (!bubbleCursor) return;

  let mouseX = 0;
  let mouseY = 0;
  let bubbleX = 0;
  let bubbleY = 0;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create trail particles
    if (Math.random() > 0.85) {
      createTrailParticle(mouseX, mouseY);
    }

    // Update bubble position
    updateBubble();
  });

  function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('bubble-trail');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.pointerEvents = 'none';
    document.body.appendChild(particle);

    let opacity = 1;
    let life = 0;
    const maxLife = 40;
    const randomAngle = Math.random() * Math.PI * 2;
    const randomVel = 0.5 + Math.random() * 1.5;
    let vx = Math.cos(randomAngle) * randomVel;
    let vy = Math.sin(randomAngle) * randomVel;
    let px = x;
    let py = y;

    const animate = () => {
      life++;
      opacity = 1 - life / maxLife;
      px += vx;
      py += vy;
      vy += 0.2; // gravity

      particle.style.transform = `translate(${px}px, ${py}px)`;
      particle.style.opacity = opacity;

      if (life < maxLife) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };

    animate();
  }

  let bubbleAnimationId;

  function updateBubble() {
    if (bubbleAnimationId) {
      cancelAnimationFrame(bubbleAnimationId);
    }

    const animate = () => {
      const dx = mouseX - bubbleX;
      const dy = mouseY - bubbleY;

      // Smooth easing
      bubbleX += dx * 0.25;
      bubbleY += dy * 0.25;

      bubbleCursor.style.setProperty('--bubble-x', bubbleX + 'px');
      bubbleCursor.style.setProperty('--bubble-y', bubbleY + 'px');
      bubbleCursor.style.transform = `translate(${bubbleX}px, ${bubbleY}px) scale(var(--bubble-scale))`;

      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        bubbleAnimationId = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea');

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      bubbleCursor.style.setProperty('--bubble-scale', '1.3');
      bubbleCursor.style.setProperty('--bubble-opacity', '0.8');
    });

    el.addEventListener('mouseleave', () => {
      bubbleCursor.style.setProperty('--bubble-scale', '1');
      bubbleCursor.style.setProperty('--bubble-opacity', '1');
    });
  });

  // Hide cursor on mobile
  if (window.innerWidth <= 768) {
    bubbleCursor.style.display = 'none';
  }

  // ===== SMOOTH SCROLL & INTERACTIONS =====

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks for reaching out! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // Intersection Observer for animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe work items and process steps
  document.querySelectorAll('.work-item, .process-step').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
/* ===== WATER BUBBLE CURSOR ===== */

document.addEventListener('DOMContentLoaded', () => {
  const bubbleCursor = document.querySelector('.bubble-cursor');
  const bubbleTrail = document.querySelector('.bubble-trail');

  if (!bubbleCursor || !bubbleTrail) return;

  let mouseX = 0;
  let mouseY = 0;
  let bubbleX = 0;
  let bubbleY = 0;
  let isAnimating = false;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create trail particles
    if (Math.random() > 0.85) {
      createTrailParticle(mouseX, mouseY);
    }

    // Start animation if not already running
    if (!isAnimating) {
      isAnimating = true;
      animateBubble();
    }
  });

  function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('bubble-trail');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.pointerEvents = 'none';
    document.body.appendChild(particle);

    let opacity = 1;
    let life = 0;
    const maxLife = 40;
    const randomAngle = Math.random() * Math.PI * 2;
    const randomVel = 0.5 + Math.random() * 1.5;
    let vx = Math.cos(randomAngle) * randomVel;
    let vy = Math.sin(randomAngle) * randomVel;
    let px = x;
    let py = y;

    const animate = () => {
      life++;
      opacity = 1 - life / maxLife;
      px += vx;
      py += vy;
      vy += 0.2; // gravity

      particle.style.transform = `translate(${px}px, ${py}px)`;
      particle.style.opacity = opacity;

      if (life < maxLife) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    };

    animate();
  }

  // Animate bubble cursor with easing
  const animateBubble = () => {
    const dx = mouseX - bubbleX;
    const dy = mouseY - bubbleY;

    // Only continue animating if cursor is moving
    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
      isAnimating = false;
      return;
    }

    // Smooth easing
    bubbleX += dx * 0.25;
    bubbleY += dy * 0.25;

    bubbleCursor.style.transform = `translate(${bubbleX}px, ${bubbleY}px)`;

    requestAnimationFrame(animateBubble);
  };

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea');

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      bubbleCursor.style.setProperty('--bubble-scale', '1.3');
      bubbleCursor.style.setProperty('--bubble-opacity', '0.8');
    });

    el.addEventListener('mouseleave', () => {
      bubbleCursor.style.setProperty('--bubble-scale', '1');
      bubbleCursor.style.setProperty('--bubble-opacity', '1');
    });
  });

/* ===== SMOOTH SCROLL & INTERACTIONS ===== */

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks for reaching out! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // Intersection Observer for animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe work items and process steps
  document.querySelectorAll('.work-item, .process-step').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

/* ===== SMOOTH SCROLL & INTERACTIONS ===== */

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for reaching out! I will get back to you soon.');
    contactForm.reset();
  });
}

// Intersection Observer for animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe work items and process steps
document.querySelectorAll('.work-item, .process-step').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
    });
  });
}

const revealTargets = document.querySelectorAll(
  ".work-card, .step, .about-panel, .testimonial, .contact-card"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealTargets.forEach((target, index) => {
  target.style.opacity = "0";
  target.style.transform = "translateY(20px)";
  target.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${
    index * 0.08
  }s`;
  observer.observe(target);
});

const style = document.createElement("style");
style.textContent = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);
