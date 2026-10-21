const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

function setMenuOpen(open) {
  nav.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(!nav.classList.contains("active"));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("active")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const mobileMenuQuery = window.matchMedia("(max-width: 991.98px)");

mobileMenuQuery.addEventListener("change", () => {
  setMenuOpen(false);
});

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealOnScroll.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 },
);

revealElements.forEach((element) => {
  revealOnScroll.observe(element);
});

const filterButtons = document.querySelectorAll(".tabs button");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    const filter = button.dataset.filter;

    menuItems.forEach((item) => {
      const match = filter === "all" || item.dataset.category === filter;
      item.hidden = !match;
    });
  });
});
