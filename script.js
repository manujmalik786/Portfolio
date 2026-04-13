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
