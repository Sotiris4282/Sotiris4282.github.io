document.addEventListener("DOMContentLoaded", function () {
  // Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block";
        } else {
          const categories = card.getAttribute("data-category").split(" ");
          if (categories.includes(filter)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });

  // Smooth scroll for CTA button
  const ctaButton = document.querySelector('a[href="#contact-form"]');
  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      e.preventDefault();
      const contactForm = document.getElementById("contact-form");
      contactForm.scrollIntoView({ behavior: "smooth" });
    });
  }
});
