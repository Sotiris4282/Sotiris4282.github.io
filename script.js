document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      navMenu &&
      navMenu.classList.contains("active") &&
      !e.target.closest(".navbar") &&
      !e.target.closest(".menu-toggle")
    ) {
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Hero Slider
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dots .dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentSlide = 0;

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Show the current slide
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  // Initialize slider
  if (slides.length > 0) {
    showSlide(0);

    // Auto slide
    let slideInterval = setInterval(() => {
      let nextIndex = (currentSlide + 1) % slides.length;
      showSlide(nextIndex);
    }, 5000);

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        clearInterval(slideInterval);
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        clearInterval(slideInterval);
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
      });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(slideInterval);
        showSlide(index);
      });
    });
  }

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial) =>
      testimonial.classList.remove("active"),
    );
    testimonialDots.forEach((dot) => dot.classList.remove("active"));

    // Show the current testimonial
    if (testimonials[index]) {
      testimonials[index].classList.add("active");
      testimonialDots[index].classList.add("active");
      currentTestimonial = index;
    }
  }

  // Initialize testimonial slider
  if (testimonials.length > 0) {
    showTestimonial(0);

    // Auto slide
    let testimonialInterval = setInterval(() => {
      let nextIndex = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(nextIndex);
    }, 6000);

    // Dot navigation
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(testimonialInterval);
        showTestimonial(index);
      });
    });
  }

  // Mobile Carousels Setup
  function setupMobileCarousel(gridSelector, controlsSelector, dotsSelector) {
    const grid = document.querySelector(gridSelector);
    const controls = document.querySelector(controlsSelector);
    const dotsContainer = document.querySelector(dotsSelector);

    if (!grid || !controls || !dotsContainer) return;

    const items = grid.children;
    const itemCount = items.length;

    // Create dots
    dotsContainer.innerHTML = ""; // Clear existing dots
    for (let i = 0; i < itemCount; i++) {
      const dot = document.createElement("button");
      dot.className = i === 0 ? "carousel-dot active" : "carousel-dot";
      dot.setAttribute("aria-label", `Item ${i + 1}`);
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    const prevBtn = controls.querySelector(".carousel-prev");
    const nextBtn = controls.querySelector(".carousel-next");

    let currentItem = 0;

    function scrollToItem(index) {
      if (items[index]) {
        // Update dots
        dots.forEach((dot) => dot.classList.remove("active"));
        if (dots[index]) dots[index].classList.add("active");

        // Scroll to the item - center it properly
        const itemWidth = items[index].offsetWidth;
        const gridWidth = grid.offsetWidth;
        const scrollLeft =
          items[index].offsetLeft - (gridWidth - itemWidth) / 2;

        grid.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });

        currentItem = index;
      }
    }

    // Initialize - scroll to first item with a slight delay to ensure proper positioning
    setTimeout(() => {
      scrollToItem(0);
    }, 100);

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        let prevIndex = (currentItem - 1 + itemCount) % itemCount;
        scrollToItem(prevIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        let nextIndex = (currentItem + 1) % itemCount;
        scrollToItem(nextIndex);
      });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        scrollToItem(index);
      });
    });

    // Update active dot on scroll
    grid.addEventListener("scroll", () => {
      // Debounce the scroll event
      clearTimeout(grid.scrollTimer);
      grid.scrollTimer = setTimeout(() => {
        // Find the item closest to the center of the viewport
        const gridRect = grid.getBoundingClientRect();
        const gridCenter = gridRect.left + gridRect.width / 2;

        let closestItem = 0;
        let minDistance = Infinity;

        Array.from(items).forEach((item, index) => {
          const itemRect = item.getBoundingClientRect();
          const itemCenter = itemRect.left + itemRect.width / 2;
          const distance = Math.abs(gridCenter - itemCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestItem = index;
          }
        });

        // Update dots
        dots.forEach((dot) => dot.classList.remove("active"));
        if (dots[closestItem]) dots[closestItem].classList.add("active");
        currentItem = closestItem;
      }, 100);
    });
  }

  // Setup mobile carousels if on mobile
  function initMobileCarousels() {
    if (window.innerWidth <= 768) {
      setupMobileCarousel(
        ".services-grid",
        ".services-controls",
        ".services-dots",
      );
      setupMobileCarousel(
        ".projects-grid",
        ".projects-controls",
        ".projects-dots",
      );
      setupMobileCarousel(
        ".partners-grid",
        ".partners-controls",
        ".partners-dots",
      );
    }
  }

  // Initialize carousels with a slight delay to ensure DOM is fully loaded
  setTimeout(initMobileCarousels, 200);

  // Back to Top Button
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
          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
          }

          // Scroll to the target
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Active menu item based on scroll position - Fixed to prevent "Η Εταιρία μας" always being selected
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  function highlightNavItem() {
    const scrollPosition = window.scrollY + 100;

    // Default to no active link
    let currentSection = null;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    // Remove active class from all links
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to current section link
    if (currentSection) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    } else if (scrollPosition < 100) {
      // If at the top of the page, highlight the first link (home)
      if (navLinks.length > 0) {
        navLinks[0].classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", highlightNavItem);
  highlightNavItem(); // Call once on page load

  // Handle window resize for mobile carousels
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
      // Only setup if not already setup
      if (!document.querySelector(".services-dots .carousel-dot")) {
        initMobileCarousels();
      }
    }
  });

  // Touch events for mobile carousels
  const carousels = document.querySelectorAll(
    ".services-grid, .projects-grid, .partners-grid",
  );

  carousels.forEach((carousel) => {
    let startX, endX;

    carousel.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
      },
      { passive: true },
    );

    carousel.addEventListener(
      "touchend",
      (e) => {
        endX = e.changedTouches[0].clientX;

        // Calculate swipe distance
        const diffX = startX - endX;

        // If the swipe is significant enough
        if (Math.abs(diffX) > 50) {
          // Find the current active dot
          const dotsContainer = carousel
            .closest("section")
            .querySelector(".carousel-dots");
          if (!dotsContainer) return;

          const dots = dotsContainer.querySelectorAll(".carousel-dot");
          let currentIndex = Array.from(dots).findIndex((dot) =>
            dot.classList.contains("active"),
          );

          if (currentIndex === -1) currentIndex = 0;

          // Swipe left (next)
          if (diffX > 0) {
            const nextIndex = (currentIndex + 1) % dots.length;
            dots[nextIndex].click();
          }
          // Swipe right (previous)
          else {
            const prevIndex = (currentIndex - 1 + dots.length) % dots.length;
            dots[prevIndex].click();
          }
        }
      },
      { passive: true },
    );
  });
});

function redirectToMaps(address) {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  const isAndroid = /android/i.test(userAgent);

  const encodedAddress = encodeURIComponent(address);
  let url;

  if (isIOS) {
    // Apple Maps
    url = `https://maps.apple.com/?q=${encodedAddress}`;
  } else if (isAndroid) {
    // Google Maps app via geo: URI
    url = `geo:0,0?q=${encodedAddress}`;
  } else {
    // Fallback to Google Maps in browser
    url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }

  window.open(url, "_blank");
}
