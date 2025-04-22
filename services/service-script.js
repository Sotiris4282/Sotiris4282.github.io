document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });
  }

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("active");
      } else {
        backToTopBtn.classList.remove("active");
      }
    });

    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });

          // Close mobile menu if open
          if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
          }
        }
      }
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active");
      });

      // Toggle active class for clicked item
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Contact form submission
  const contactForm = document.getElementById("serviceRequestForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const service = document.getElementById("service").value;

      // Simple validation
      if (!name || !email || !phone || !service) {
        showFormMessage(
          "Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία.",
          "error",
        );
        return;
      }

      // Simulate form submission
      showFormMessage("Επεξεργασία...", "info");

      // Simulate API call with timeout
      setTimeout(() => {
        showFormMessage(
          "Το αίτημά σας υποβλήθηκε με επιτυχία! Θα επικοινωνήσουμε μαζί σας σύντομα.",
          "success",
        );
        contactForm.reset();
      }, 1500);
    });
  }

  function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement("div");
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    // Add to DOM
    contactForm.appendChild(messageElement);

    // Auto remove success/info messages after 5 seconds
    if (type === "success" || type === "info") {
      setTimeout(() => {
        messageElement.classList.add("fade-out");
        setTimeout(() => {
          messageElement.remove();
        }, 500);
      }, 5000);
    }
  }
});
