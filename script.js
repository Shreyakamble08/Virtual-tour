
  // Wait for DOM to be fully loaded before running any code
  document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU FUNCTIONALITY ==========
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const body = document.body;
    let isMenuOpen = false;

    // Only run if both elements exist
    if (mobileMenuBtn && mobileOverlay) {
      
      // Toggle mobile menu function
      function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenuBtn.classList.toggle("active");
        mobileOverlay.classList.toggle("hidden");

        if (isMenuOpen) {
          body.style.overflow = "hidden";
          mobileOverlay.classList.add("slide-in");
          
          // Animate stagger items
          const staggerItems = document.querySelectorAll(".stagger-item");
          staggerItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            }, index * 100);
          });
        } else {
          body.style.overflow = "auto";
          
          // Reset stagger items
          const staggerItems = document.querySelectorAll(".stagger-item");
          staggerItems.forEach((item) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(10px)";
          });
        }
      }

      // Event listener for hamburger button
      mobileMenuBtn.addEventListener("click", toggleMobileMenu);

      // Close menu when clicking mobile links
      document.querySelectorAll(".mobile-link-modern").forEach((link) => {
        link.addEventListener("click", () => {
          if (isMenuOpen) {
            toggleMobileMenu();
          }
        });
      });

      // Close menu when clicking overlay background
      mobileOverlay.addEventListener("click", (e) => {
        if (e.target === mobileOverlay) {
          if (isMenuOpen) {
            toggleMobileMenu();
          }
        }
      });

      // Close menu on escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isMenuOpen) {
          toggleMobileMenu();
        }
      });

      // Initialize stagger items
      document.querySelectorAll(".stagger-item").forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(10px)";
        item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      });
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById("navbar");
    if (navbar) {
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
          navbar.style.background = "rgba(15, 15, 20, 0.85)";
          navbar.style.backdropFilter = "blur(20px) saturate(200%)";
          navbar.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
        } else {
          navbar.style.background = "rgba(15, 15, 20, 0.65)";
          navbar.style.backdropFilter = "blur(16px) saturate(180%)";
          navbar.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
        }
      });
    }

    // ========== SCROLL ARROW FUNCTIONALITY ==========
    const scrollArrow = document.getElementById('scrollArrow');
    
    if (scrollArrow) {
      // Add click handler to the arrow container
      scrollArrow.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.getElementById('servicesSection');
        if (targetSection) {
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
      
      // Also handle clicks on inner elements
      const arrowDiv = scrollArrow.querySelector('div');
      if (arrowDiv) {
        arrowDiv.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          const targetSection = document.getElementById('servicesSection');
          if (targetSection) {
            targetSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      }
    }

    // ========== MODAL FUNCTIONS ==========
    window.openTermsModal = function () {
      const modal = document.getElementById('termsModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    };
    
    window.closeTermsModal = function () {
      const modal = document.getElementById('termsModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };

  }); // End DOMContentLoaded
