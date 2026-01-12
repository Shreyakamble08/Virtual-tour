///////////////////////BANNER SLIDESHOW WITH VIRTUAL TOURS INTEGRATION///////////////////////
// Enhanced Slideshow with Virtual Tour Integration
document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.getElementById("slidesContainer");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".nav-dot");

  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval;

  // Initialize first slide
  updateSlide(0);
  startAutoSlide();

  // Navigation dots
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      goToSlide(slideIndex);
    });
  });

  // Start auto slide
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 8000); // Longer interval for tours
  }

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    updateSlide(index);
    resetInterval();
  }

  function updateSlide(index) {
    currentSlide = index;

    // Move slides container
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active-dot", i === currentSlide);
    });

    // Update slide states
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Enhanced drag functionality for tours
  function enhanceTourDrag() {
    const iframes = document.querySelectorAll("iframe");

    iframes.forEach((iframe) => {
      // Add cursor feedback
      iframe.addEventListener("mouseenter", () => {
        iframe.style.cursor = "grab";
      });

      iframe.addEventListener("mousedown", () => {
        iframe.style.cursor = "grabbing";
      });

      iframe.addEventListener("mouseup", () => {
        iframe.style.cursor = "grab";
      });

      iframe.addEventListener("mouseleave", () => {
        iframe.style.cursor = "default";
      });
    });
  }

  // Device motion for mobile VR experience
  function setupDeviceMotion() {
    const pano_iframe_names = ["tour-anandmala", "tour-hortipro", "tour-dlrc"];

    window.addEventListener("devicemotion", function (e) {
      pano_iframe_names.forEach((name) => {
        var iframe = document.getElementById(name);
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: "devicemotion",
              deviceMotionEvent: {
                acceleration: {
                  x: e.acceleration.x,
                  y: e.acceleration.y,
                  z: e.acceleration.z,
                },
                accelerationIncludingGravity: {
                  x: e.accelerationIncludingGravity.x,
                  y: e.accelerationIncludingGravity.y,
                  z: e.accelerationIncludingGravity.z,
                },
                rotationRate: {
                  alpha: e.rotationRate.alpha,
                  beta: e.rotationRate.beta,
                  gamma: e.rotationRate.gamma,
                },
                interval: e.interval,
                timeStamp: e.timeStamp,
              },
            },
            "*"
          );
        }
      });
    });
  }

  // Pause slideshow on tour interaction
  slidesContainer.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  slidesContainer.addEventListener("mouseleave", () => {
    resetInterval();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goToSlide(currentSlide - 1);
    if (e.key === "ArrowRight") goToSlide(currentSlide + 1);
  });

  // Initialize tour enhancements
  setTimeout(() => {
    enhanceTourDrag();
    setupDeviceMotion();
  }, 1000);

  // Touch/swipe for mobile navigation
  let touchStartX = 0;
  let touchEndX = 0;

  slidesContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(slideInterval); // Pause auto-slide on touch
  });

  slidesContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resetInterval(); // Resume auto-slide
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1);
      }
    }
  }

  // Adjust iframe IDs to prevent conflicts
  document.querySelectorAll("iframe").forEach((iframe, index) => {
    iframe.id = `tour-${index}`;
  });

  // Adjust overlay positioning on resize
  window.addEventListener("resize", function () {
    // This ensures overlays stay properly positioned
    const overlays = document.querySelectorAll(".glass-tag");
    overlays.forEach((overlay) => {
      overlay.style.position = "absolute";
    });
  });
});

////service section
 // Adjust marquee speed on resize
  document.addEventListener('DOMContentLoaded', function() {
    const marqueeWrapper = document.querySelector('.marquee-wrapper');
    
    function adjustMarqueeSpeed() {
      const width = window.innerWidth;
      if (width < 768) {
        marqueeWrapper.style.animationDuration = '28s';
      } else {
        marqueeWrapper.style.animationDuration = '32s';
      }
    }
    
    adjustMarqueeSpeed();
    window.addEventListener('resize', adjustMarqueeSpeed);
  });

//virtual tour animations 
// iOS motion permission handler
  function requestMotionPermission() {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission()
        .then(response => {
          if (response === "granted") {
            window.addEventListener("devicemotion", sendDeviceMotion);
          }
        })
        .catch(console.error);
    }
  }

  // Trigger permission on first user interaction (tap/click)
  document.addEventListener("click", requestMotionPermission, { once: true });
  document.addEventListener("touchstart", requestMotionPermission, { once: true });


  //potfolio section script
  
        // Staggered reveal on scroll
        document.addEventListener("DOMContentLoaded", () => {
          const cards = document.querySelectorAll(".grid > div");

          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                  setTimeout(() => {
                    entry.target.classList.add("visible");
                  }, index * 180);
                }
              });
            },
            { threshold: 0.18 }
          );

          cards.forEach((card) => observer.observe(card));
        });

        // Device motion support for all iframes (improved version)
        function sendDeviceMotion(e) {
          const iframes = document.querySelectorAll('iframe[id^="tour-"]');
          iframes.forEach((iframe) => {
            if (iframe.contentWindow) {
              iframe.contentWindow.postMessage(
                {
                  type: "devicemotion",
                  deviceMotionEvent: {
                    acceleration: {
                      x: e.acceleration?.x,
                      y: e.acceleration?.y,
                      z: e.acceleration?.z,
                    },
                    accelerationIncludingGravity: {
                      x: e.accelerationIncludingGravity?.x,
                      y: e.accelerationIncludingGravity?.y,
                      z: e.accelerationIncludingGravity?.z,
                    },
                    rotationRate: {
                      alpha: e.rotationRate?.alpha,
                      beta: e.rotationRate?.beta,
                      gamma: e.rotationRate?.gamma,
                    },
                    interval: e.interval,
                    timeStamp: e.timeStamp,
                  },
                },
                "*"
              );
            }
          });
        }

        if (window.DeviceMotionEvent) {
          window.addEventListener("devicemotion", sendDeviceMotion);
        }

        //footer scripts
       
      // Terms & Conditions Modal
      function openTermsModal() {
        const modal = document.getElementById("termsModal");
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.style.overflow = "hidden";
      }

      function closeTermsModal() {
        const modal = document.getElementById("termsModal");
        modal.classList.remove("flex");
        modal.classList.add("hidden");
        document.body.style.overflow = "";
      }

      // Close modal on ESC key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          closeTermsModal();
        }
      });

      // Close modal when clicking outside
      document.getElementById("termsModal")?.addEventListener("click", (e) => {
        if (e.target === document.getElementById("termsModal")) {
          closeTermsModal();
        }
      });
  

   