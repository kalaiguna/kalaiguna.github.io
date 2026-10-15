"use strict";

// ==================== NAV SCROLL ====================
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// ==================== HAMBURGER ====================
const hamburger  = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", open);
  const spans = hamburger.querySelectorAll("span");
  if (open) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity   = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans.forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  }
});
mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  hamburger.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
}));

// ==================== TYPEWRITER ====================
(function typewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;
  const words = [
    "cloud transformations",
    "AI-augmented pipelines",
    "secure DevOps platforms",
    "Azure-native solutions",
    "production AI products",
    "IaC at enterprise scale",
  ];
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; return setTimeout(tick, 2400); }
      setTimeout(tick, 65);
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; return setTimeout(tick, 450); }
      setTimeout(tick, 35);
    }
  }
  setTimeout(tick, 900);
})();

// ==================== COUNTER ANIMATION ====================
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const steps = duration / 16;
  const step = target / steps;
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

// ==================== INTERSECTION OBSERVER ====================
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;

    // Stat cards
    if (el.classList.contains("stat-card")) el.classList.add("visible");

    // Stat number counters
    if (el.classList.contains("stat-number")) animateCounter(el);

    // Architecture layers with stagger
    if (el.classList.contains("arch-layer")) {
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add("visible"), delay);
    }

    // Project cards with stagger
    if (el.classList.contains("project-card")) {
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add("visible"), delay);
    }

    // Timeline items
    if (el.classList.contains("timeline-item")) el.classList.add("visible");

    // Cert cards with stagger
    if (el.classList.contains("cert-card")) {
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add("visible"), delay);
    }

    io.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  ".stat-card, .stat-number, .arch-layer, .project-card, .timeline-item, .cert-card"
).forEach(el => io.observe(el));

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a, .mobile-menu a");

const sectionIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => sectionIO.observe(s));
