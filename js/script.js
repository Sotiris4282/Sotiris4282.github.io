// Geoponia Website - Main JavaScript File

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('hide');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // Sticky Header
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Toggle hamburger animation
    if (menuToggle.classList.contains('active')) {
      menuToggle.children[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      menuToggle.children[1].style.opacity = '0';
      menuToggle.children[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      menuToggle.children[0].style.transform = 'none';
      menuToggle.children[1].style.opacity = '1';
      menuToggle.children[2].style.transform = 'none';
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu-toggle') && !e.target.closest('.nav-links')) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      
      menuToggle.children[0].style.transform = 'none';
      menuToggle.children[1].style.opacity = '1';
      menuToggle.children[2].style.transform = 'none';
    }
  });

  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-controls .dot');
  const prevBtn = document.querySelector('.slider-controls .prev');
  const nextBtn = document.querySelector('.slider-controls .next');
  let currentSlide = 0;
  let slideInterval;

  // Function to change slide
  function changeSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  // Initialize slider controls
  prevBtn.addEventListener('click', () => {
    changeSlide(currentSlide - 1);
    resetSlideInterval();
  });
  
  nextBtn.addEventListener('click', () => {
    changeSlide(currentSlide + 1);
    resetSlideInterval();
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      changeSlide(index);
      resetSlideInterval();
    });
  });

  // Auto slide
  function startSlideInterval() {
    slideInterval = setInterval(() => {
      changeSlide(currentSlide + 1);
    }, 5000);
  }

  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
  }

  startSlideInterval();

  // Blog Slider
  const blogDots = document.querySelectorAll('.slider-dots .dot');
  const blogSlider = document.querySelector('.blog-slider');
  
  blogDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      blogDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      
      // Scroll to show the selected blog card on mobile
      if (window.innerWidth < 768) {
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  const testimonialPrev = document.querySelector('.testimonial-nav .prev');
  const testimonialNext = document.querySelector('.testimonial-nav .next');
  let currentTestimonial = 0;

  function changeTestimonial(n) {
    testimonials[currentTestimonial].classList.remove('active');
    testimonialDots[currentTestimonial].classList.remove('active');
    
    currentTestimonial = (n + testimonials.length) % testimonials.length;
    
    testimonials[currentTestimonial].classList.add('active');
    testimonialDots[currentTestimonial].classList.add('active');
  }

  testimonialPrev.addEventListener('click', () => {
    changeTestimonial(currentTestimonial - 1);
  });
  
  testimonialNext.addEventListener('click', () => {
    changeTestimonial(currentTestimonial + 1);
  });
  
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      changeTestimonial(index);
    });
  });

  // Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Smooth scrolling for navigation links
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu after clicking
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        
        menuToggle.children[0].style.transform = 'none';
        menuToggle.children[1].style.opacity = '1';
        menuToggle.children[2].style.transform = 'none';
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;
      
      // Simple form validation
      if (!name || !email || !phone || !service || !message) {
        alert('Παρακαλώ συμπληρώστε όλα τα πεδία της φόρμας.');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For demo purposes, we'll just show a success message
      alert('Ευχαριστούμε για το μήνυμά σας! Θα επικοινωνήσουμε μαζί σας σύντομα.');
      contactForm.reset();
    });
  }

  // Animate elements on scroll
  const animateElements = document.querySelectorAll('[data-aos]');
  
  function checkScroll() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8) {
        const delay = element.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          element.classList.add('animated');
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, delay);
      }
    });
  }
  
  // Initialize animation styles
  animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  window.addEventListener('scroll', checkScroll);
  window.addEventListener('load', checkScroll);
  
  // Set active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  
  function setActiveNavLink() {
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector('.nav-links a[href="#' + sectionId + '"]')?.classList.add('active');
      } else {
        document.querySelector('.nav-links a[href="#' + sectionId + '"]')?.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', setActiveNavLink);
  window.addEventListener('load', setActiveNavLink);
});
