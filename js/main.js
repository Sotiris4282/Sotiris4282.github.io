document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none"
  }, 1000)

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-menu") && !e.target.closest(".menu-toggle") && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active")
      menuToggle.classList.remove("active")
    }
  })

  // Close mobile menu when clicking on a menu item
  document.querySelectorAll(".nav-menu a").forEach((item) => {
    item.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        menuToggle.classList.remove("active")
      }
    })
  })

  // Add overlay for mobile menu
  const createOverlay = () => {
    const overlay = document.createElement("div")
    overlay.className = "menu-overlay"
    document.body.appendChild(overlay)

    overlay.addEventListener("click", () => {
      navMenu.classList.remove("active")
      menuToggle.classList.remove("active")
      document.body.removeChild(overlay)
    })
  }

  // Update menu toggle to create/remove overlay
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (!navMenu.classList.contains("active")) {
        createOverlay()
      } else {
        const overlay = document.querySelector(".menu-overlay")
        if (overlay) {
          document.body.removeChild(overlay)
        }
      }
    })
  }

  // Toggle body scroll when menu is open
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.body.classList.toggle("menu-open")
    })
  }

  // Remove menu-open class when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-menu") && !e.target.closest(".menu-toggle") && navMenu.classList.contains("active")) {
      document.body.classList.remove("menu-open")
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          // Close mobile menu if open
          if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active")
            menuToggle.classList.remove("active")
          }

          // Scroll to the target element
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header")
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Hero Slider
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelector(".dots")
  const prevBtn = document.querySelector(".slider-controls .prev")
  const nextBtn = document.querySelector(".slider-controls .next")
  let currentSlide = 0
  let slideInterval

  // Create dots
  if (dots) {
    slides.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => goToSlide(index))
      dots.appendChild(dot)
    })
  }

  // Initialize slider
  function initSlider() {
    if (slides.length > 0) {
      slides[0].classList.add("active")
      startSlideInterval()
    }
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index < 0) index = slides.length - 1
    if (index >= slides.length) index = 0

    slides.forEach((slide) => slide.classList.remove("active"))
    slides[index].classList.add("active")

    // Update dots
    const allDots = document.querySelectorAll(".dot")
    allDots.forEach((dot) => dot.classList.remove("active"))
    if (allDots[index]) allDots[index].classList.add("active")

    currentSlide = index
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1)
  }

  // Start automatic slide interval
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000)
  }

  // Reset interval when manually changing slides
  function resetInterval() {
    clearInterval(slideInterval)
    startSlideInterval()
  }

  // Add event listeners for slider controls
  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      prevSlide()
      resetInterval()
    })

  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      nextSlide()
      resetInterval()
    })

  // Initialize slider
  initSlider()

  // Testimonials Slider
  const testimonials = document.querySelectorAll(".testimonial-card")
  const testimonialDots = document.querySelector(".testimonial-controls .dots")
  const testimonialPrevBtn = document.querySelector(".testimonial-controls .prev")
  const testimonialNextBtn = document.querySelector(".testimonial-controls .next")
  let currentTestimonial = 0

  // Create dots for testimonials
  if (testimonialDots) {
    testimonials.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => goToTestimonial(index))
      testimonialDots.appendChild(dot)
    })
  }

  // Go to specific testimonial
  function goToTestimonial(index) {
    if (index < 0) index = testimonials.length - 1
    if (index >= testimonials.length) index = 0

    testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
    testimonials[index].classList.add("active")

    // Update dots
    const allDots = testimonialDots.querySelectorAll(".dot")
    allDots.forEach((dot) => dot.classList.remove("active"))
    if (allDots[index]) allDots[index].classList.add("active")

    currentTestimonial = index
  }

  // Next testimonial
  function nextTestimonial() {
    goToTestimonial(currentTestimonial + 1)
  }

  // Previous testimonial
  function prevTestimonial() {
    goToTestimonial(currentTestimonial - 1)
  }

  // Add event listeners for testimonial controls
  if (testimonialPrevBtn) testimonialPrevBtn.addEventListener("click", prevTestimonial)
  if (testimonialNextBtn) testimonialNextBtn.addEventListener("click", nextTestimonial)

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic validation
      let isValid = true
      const formElements = contactForm.querySelectorAll("input, select, textarea")

      formElements.forEach((element) => {
        if (element.hasAttribute("required") && !element.value.trim()) {
          isValid = false
          element.classList.add("error")
        } else {
          element.classList.remove("error")
        }
      })

      if (isValid) {
        // Show success message
        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.'

        contactForm.appendChild(successMessage)
        contactForm.reset()

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove()
        }, 5000)
      }
    })
  }

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top")
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.opacity = "1"
      } else {
        backToTopBtn.style.opacity = "0"
      }
    })

    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Adjust hero height on mobile
  const adjustHeroHeight = () => {
    const hero = document.querySelector(".hero")
    if (hero) {
      if (window.innerWidth <= 576) {
        hero.style.height = "70vh"
      } else if (window.innerWidth <= 768) {
        hero.style.height = "80vh"
      } else {
        hero.style.height = "100vh"
      }
    }
  }

  // Call on load and resize
  adjustHeroHeight()
  window.addEventListener("resize", adjustHeroHeight)
})
