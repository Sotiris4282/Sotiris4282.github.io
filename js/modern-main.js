// Modern Main JavaScript
;(($) => {
  // Preloader
  $(window).on("load", () => {
    $("#preloader").fadeOut(1000)
  })

  // Sticky Navbar
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("sticky")
      $(".back-to-top").addClass("active")
    } else {
      $(".navbar").removeClass("sticky")
      $(".back-to-top").removeClass("active")
    }
  })

  // Mobile Menu
  $(".navbar-toggler").on("click", function () {
    $(this).toggleClass("active")
  })

  // Close mobile menu when clicking outside
  $(document).on("click", (e) => {
    var container = $(".navbar-collapse")
    if (!container.is(e.target) && container.has(e.target).length === 0 && container.hasClass("show")) {
      $(".navbar-toggler").click()
    }
  })

  // Smooth scrolling for anchor links
  $("a.nav-link, a.btn-scroll").on("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault()
      const hash = this.hash
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 70,
        },
        800,
      )
    }
  })

  // Testimonials Carousel
  $(".testimonials-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
    navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
  })

  // Partners Carousel
  $(".partners-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
    },
  })

  // Animation on scroll
  $(window).on("scroll", () => {
    $(".fade-up, .fade-right, .fade-left").each(function () {
      const elementTop = $(this).offset().top
      const elementHeight = $(this).outerHeight()
      const windowHeight = $(window).height()
      const scrollY = $(window).scrollTop()

      if (scrollY > elementTop - windowHeight + elementHeight / 4) {
        $(this).addClass("show")
      }
    })
  })

  // Initialize animations on load
  setTimeout(() => {
    $(window).trigger("scroll")
  }, 100)

  // Back to top button
  $(".back-to-top").on("click", () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800,
    )
    return false
  })

  // Form validation
  $(".contact-form").on("submit", function (e) {
    e.preventDefault()

    let isValid = true
    const form = $(this)

    form.find("[required]").each(function () {
      if (!$(this).val().trim()) {
        isValid = false
        $(this).addClass("is-invalid")
      } else {
        $(this).removeClass("is-invalid")
      }
    })

    if (isValid) {
      // Show success message
      const successMessage = $(
        '<div class="alert alert-success mt-3">Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.</div>',
      )
      form.append(successMessage)

      // Reset form
      form[0].reset()

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.fadeOut(function () {
          $(this).remove()
        })
      }, 5000)
    }
  })

  // Counter animation
  $(".counter").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 3000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now))
          },
        },
      )
  })
})(jQuery)
