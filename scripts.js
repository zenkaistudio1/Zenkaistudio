// Enhanced Zenkai Studio JavaScript with Strategic Hero and Visual Proof
class ZenkaiStudio {
  constructor() {
    this.isLoaded = false
    this.scrollElements = []
    this.magneticElements = []
    this.particles = []
    this.cursorPos = { x: 0, y: 0 }
    this.cursorFollower = { x: 0, y: 0 }
    this.testimonialCarousel = null // Initialize carousel instance

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init())
    } else {
      this.init()
    }
  }

  init() {
    this.setupLoader()
    this.setupCursor()
    this.setupNavigation()
    this.setupScrollAnimations()
    this.setupMagneticElements()
    this.setupPortfolioFilter()
    this.setupAdvancedEffects()
    this.setupCounters()
    this.setupTestimonialCarousel() // Call the new carousel setup
    this.bindEvents()
  }

  // Safe element selector with error checking
  $(selector) {
    try {
      return document.querySelector(selector)
    } catch (error) {
      console.warn(`Element not found: ${selector}`)
      return null
    }
  }

  $$(selector) {
    try {
      return document.querySelectorAll(selector)
    } catch (error) {
      console.warn(`Elements not found: ${selector}`)
      return []
    }
  }

  // Enhanced Page Loader with Progress Animation
  setupLoader() {
    const loader = this.$(".page-loader")
    const loaderBar = this.$(".loader-bar")
    const loaderPercentage = this.$(".loader-percentage")
    const loaderMessage = this.$(".loader-message")

    if (!loader || !loaderBar || !loaderPercentage) return

    // Hide body overflow during loading
    document.body.style.overflow = "hidden"

    let progress = 0
    const messages = [
      "Loading Experience...",
      "Preparing Interface...",
      "Initializing Components...",
      "Almost Ready...",
      "Welcome to Zenkai Studio!",
    ]

    const loadingInterval = setInterval(() => {
      // Simulate realistic loading progress
      const increment = Math.random() * 15 + 5
      progress = Math.min(progress + increment, 100)

      // Update progress bar and percentage
      loaderBar.style.width = `${progress}%`
      loaderPercentage.textContent = `${Math.floor(progress)}%`

      // Update loading message based on progress
      if (progress < 25 && loaderMessage) {
        loaderMessage.textContent = messages[0]
      } else if (progress < 50 && loaderMessage) {
        loaderMessage.textContent = messages[1]
      } else if (progress < 75 && loaderMessage) {
        loaderMessage.textContent = messages[2]
      } else if (progress < 95 && loaderMessage) {
        loaderMessage.textContent = messages[3]
      } else if (loaderMessage) {
        loaderMessage.textContent = messages[4]
      }

      if (progress >= 100) {
        clearInterval(loadingInterval)

        // Final animation sequence
        setTimeout(() => {
          loader.style.transform = "scale(1.1)"
          loader.style.opacity = "0"

          setTimeout(() => {
            loader.classList.add("loaded")
            document.body.style.overflow = ""
            this.triggerInitialAnimations()
            this.isLoaded = true
          }, 600)
        }, 500)
      }
    }, 100)
  }

  // Enhanced Cursor with Magnetic Effects
  setupCursor() {
    if (!window.matchMedia("(hover: hover)").matches) return

    const cursor = this.$(".cursor")
    const cursorFollower = this.$(".cursor-follower")

    if (!cursor || !cursorFollower) return

    let isHovering = false

    document.addEventListener("mousemove", (e) => {
      this.cursorPos.x = e.clientX
      this.cursorPos.y = e.clientY
    })

    const animateCursor = () => {
      // Smooth cursor movement with easing
      this.cursorFollower.x += (this.cursorPos.x - this.cursorFollower.x) * 0.08
      this.cursorFollower.y += (this.cursorPos.y - this.cursorFollower.y) * 0.08

      cursor.style.left = this.cursorPos.x + "px"
      cursor.style.top = this.cursorPos.y + "px"

      cursorFollower.style.left = this.cursorFollower.x + "px"
      cursorFollower.style.top = this.cursorFollower.y + "px"

      requestAnimationFrame(animateCursor)
    }

    animateCursor()

    // Enhanced cursor interactions
    const interactiveElements = this.$$(
      "a, button, [data-magnetic], .project-card, .service-card, .proof-card, .testimonial-card",
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        isHovering = true
        cursor.style.transform = "translate(-50%, -50%) scale(2)"
        cursor.style.mixBlendMode = "difference"

        cursorFollower.style.width = "80px"
        cursorFollower.style.height = "80px"
        cursorFollower.style.borderColor = "rgba(67, 97, 238, 0.8)"
        cursorFollower.style.borderWidth = "2px"
      })

      el.addEventListener("mouseleave", () => {
        isHovering = false
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursor.style.mixBlendMode = "difference"

        cursorFollower.style.width = "40px"
        cursorFollower.style.height = "40px"
        cursorFollower.style.borderColor = "rgba(67, 97, 238, 0.3)"
        cursorFollower.style.borderWidth = "1px"
      })
    })

    // Cursor click effect
    document.addEventListener("click", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
      setTimeout(() => {
        cursor.style.transform = isHovering ? "translate(-50%, -50%) scale(2)" : "translate(-50%, -50%) scale(1)"
      }, 150)
    })
  }

  // Advanced Navigation with Smooth Transitions
  setupNavigation() {
    const header = this.$(".header")
    const mobileToggle = this.$(".menu-toggle")
    const mobileMenu = this.$(".mobile-menu")
    const mobileNavLinks = this.$$(".menu-link")

    if (!header) return

    let lastScrollY = window.scrollY
    let ticking = false

    const updateHeader = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = Math.abs(currentScrollY - lastScrollY)

      if (currentScrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }

      // Advanced header hide/show with momentum
      if (scrollDifference > 5) {
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
          header.style.transform = "translateY(-120%)"
          header.style.opacity = "0.8"
        } else {
          header.style.transform = "translateY(0)"
          header.style.opacity = "1"
        }
      }

      lastScrollY = currentScrollY
      ticking = false
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateHeader)
          ticking = true
        }
      },
      { passive: true },
    )

    // Enhanced mobile menu
    if (mobileToggle && mobileMenu) {
      const hamburger = mobileToggle.querySelector(".hamburger")

      mobileToggle.addEventListener("click", () => {
        const isActive = mobileToggle.classList.contains("active")

        mobileToggle.classList.toggle("active")
        mobileMenu.classList.toggle("active")
        if (hamburger) hamburger.classList.toggle("active")

        // Advanced mobile menu animation
        if (!isActive) {
          document.body.style.overflow = "hidden"
          mobileMenu.style.clipPath = "circle(0% at 100% 0%)"

          setTimeout(() => {
            mobileMenu.style.clipPath = "circle(150% at 100% 0%)"
          }, 50)
        } else {
          mobileMenu.style.clipPath = "circle(0% at 100% 0%)"

          setTimeout(() => {
            document.body.style.overflow = ""
          }, 600)
        }
      })
    }

    // Close mobile menu with stagger animation
    mobileNavLinks.forEach((link, index) => {
      link.addEventListener("click", () => {
        setTimeout(() => {
          if (mobileToggle && mobileMenu) {
            const hamburger = mobileToggle.querySelector(".hamburger")
            mobileToggle.classList.remove("active")
            mobileMenu.classList.remove("active")
            if (hamburger) hamburger.classList.remove("active")
            mobileMenu.style.clipPath = "circle(0% at 100% 0%)"

            setTimeout(() => {
              document.body.style.overflow = ""
            }, 600)
          }
        }, index * 100)
      })
    })

    // Ultra-smooth scrolling
    const anchorLinks = this.$$('a[href^="#"]')
    anchorLinks.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = anchor.getAttribute("href")
        const target = this.$(targetId)

        if (target) {
          const targetPos = target.offsetTop - 100
          this.smoothScrollTo(targetPos, 1200)
        }
      })
    })
  }

  // Custom smooth scroll with easing
  smoothScrollTo(targetY, duration) {
    const startY = window.scrollY
    const distance = targetY - startY
    const startTime = performance.now()

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = easeInOutCubic(progress)

      window.scrollTo(0, startY + distance * ease)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  // Optimized Scroll Animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: [0, 0.1],
      rootMargin: "0px 0px -10% 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target
          const delay = Number.parseInt(element.dataset.delay) || 0

          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            setTimeout(() => {
              element.classList.add("visible")
            }, delay)
          })

          // Unobserve immediately after animation to improve performance
          observer.unobserve(element)
        }
      })
    }, observerOptions)

    // Observe all scroll elements
    const scrollElements = this.$$("[data-scroll-element]")
    scrollElements.forEach((el) => {
      observer.observe(el)
    })

    // Optimized scroll effects with better throttling
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollEffects()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
  }

  // Magnetic Elements with Advanced Physics
  setupMagneticElements() {
    const magneticElements = this.$$("[data-magnetic]")

    magneticElements.forEach((element) => {
      let isHovering = false
      let mouseX = 0
      let mouseY = 0
      let elementX = 0
      let elementY = 0

      const animate = () => {
        if (isHovering) {
          elementX += (mouseX - elementX) * 0.1
          elementY += (mouseY - elementY) * 0.1

          element.style.transform = `translate(${elementX}px, ${elementY}px)`
        }

        requestAnimationFrame(animate)
      }

      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        mouseX = (e.clientX - centerX) * 0.3
        mouseY = (e.clientY - centerY) * 0.3
      })

      element.addEventListener("mouseenter", () => {
        isHovering = true
        element.style.transition = "none"
      })

      element.addEventListener("mouseleave", () => {
        isHovering = false
        mouseX = 0
        mouseY = 0
        element.style.transition = "transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)"
        element.style.transform = "translate(0, 0)"
      })

      animate()
      this.magneticElements.push(element)
    })
  }

  // Enhanced Portfolio Filter
  setupPortfolioFilter() {
    const filterTabs = this.$$(".filter-tab")
    const projectCards = this.$$(".project-card")

    if (filterTabs.length === 0 || projectCards.length === 0) return

    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.dataset.filter

        filterTabs.forEach((t) => {
          t.classList.remove("active")
          t.style.transform = "scale(1)"
        })

        tab.classList.add("active")
        tab.style.transform = "scale(1.05)"

        projectCards.forEach((card, index) => {
          const category = card.dataset.category
          const shouldShow = filter === "all" || category === filter

          if (shouldShow) {
            card.style.display = "block"

            setTimeout(() => {
              card.classList.remove("hidden")
              card.style.transform = "scale(1) translateY(0)"
              card.style.opacity = "1"
            }, index * 100)
          } else {
            card.style.transform = "scale(0.8) translateY(20px)"
            card.style.opacity = "0"

            setTimeout(() => {
              card.classList.add("hidden")
              card.style.display = "none"
            }, 300)
          }
        })
      })
    })
  }

  // Counter Animations with Easing
  setupCounters() {
    const counters = this.$$("[data-count]")

    const animateCounter = (counter) => {
      const target = Number.parseInt(counter.dataset.count)
      const duration = 2500
      const start = performance.now()
      const startValue = 0

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - start
        const progress = Math.min(elapsed / duration, 1)

        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        const current = Math.floor(startValue + (target - startValue) * easeOutExpo)

        counter.textContent = current

        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target
        }
      }

      requestAnimationFrame(updateCounter)
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          counterObserver.unobserve(entry.target)
        }
      })
    })

    counters.forEach((counter) => {
      counterObserver.observe(counter)
    })
  }

  // Simplified scroll effects update
  updateScrollEffects() {
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)

    // Update scroll progress bar only
    const scrollIndicator = this.$(".scroll-progress")
    if (scrollIndicator) {
      scrollIndicator.style.transform = `scaleX(${scrollProgress})`
    }
  }

  // Advanced Effects
  setupAdvancedEffects() {
    this.setupScrollProgress()
    this.setupButtonEffects()
    this.setupHeroAnimations()
    this.setupCTAAnimations()
  }

  setupScrollProgress() {
    const progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #4361ee, #3a0ca3);
      transform: scaleX(0);
      transform-origin: left;
      z-index: 10000;
      transition: transform 0.1s ease;
    `

    document.body.appendChild(progressBar)
  }

  setupButtonEffects() {
    const buttons = this.$$(".btn-primary, .btn-outline")

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const ripple = document.createElement("span")
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `

        button.appendChild(ripple)

        setTimeout(() => {
          ripple.remove()
        }, 600)
      })
    })
  }

  setupHeroAnimations() {
    // Animate browser mockup content
    const contentElements = this.$$(".content-header, .text-line, .content-button, .grid-item")

    contentElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`
    })

    // Animate floating code snippets
    const codeSnippets = this.$$(".code-snippet")

    codeSnippets.forEach((snippet, index) => {
      setTimeout(
        () => {
          snippet.style.animationPlayState = "running"
        },
        1000 + index * 200,
      )
    })
  }

  setupCTAAnimations() {
    // Animate audit preview metrics
    const metricFills = this.$$(".metric-fill")

    const animateMetrics = () => {
      metricFills.forEach((fill, index) => {
        const width = fill.style.width
        fill.style.width = "0%"

        setTimeout(() => {
          fill.style.width = width
        }, index * 200)
      })
    }

    // Trigger animation when CTA section comes into view
    const ctaSection = this.$(".cta-section")
    if (ctaSection) {
      const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateMetrics()
            ctaObserver.unobserve(entry.target)
          }
        })
      })

      ctaObserver.observe(ctaSection)
    }
  }

  // New: Testimonial Carousel Setup
  setupTestimonialCarousel() {
    const carouselContainer = this.$(".testimonial-carousel-container")
    const testimonialsGrid = this.$(".testimonials-grid")
    const testimonialCards = this.$$(".testimonial-card[data-carousel-item]")
    const prevButton = this.$(".carousel-button.prev-button")
    const nextButton = this.$(".carousel-button.next-button")
    const dotsContainer = this.$(".carousel-dots")
    const dots = this.$$(".carousel-dots .dot")

    if (
      !carouselContainer ||
      !testimonialsGrid ||
      testimonialCards.length === 0 ||
      !prevButton ||
      !nextButton ||
      !dotsContainer ||
      dots.length === 0
    ) {
      return
    }

    let currentIndex = 0
    let isMobile = window.innerWidth <= 768

    const smoothScrollHorizontal = (element, targetScrollLeft, duration) => {
      const startScrollLeft = element.scrollLeft
      const distance = targetScrollLeft - startScrollLeft
      const startTime = performance.now()

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = easeInOutCubic(progress)

        element.scrollLeft = startScrollLeft + distance * ease

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    }

    const updateCarousel = () => {
      isMobile = window.innerWidth <= 768 // Re-check mobile status on update

      if (!isMobile) {
        // Disable carousel functionality on desktop
        testimonialsGrid.style.transform = "translateX(0)" // Ensure no transform
        testimonialsGrid.scrollLeft = 0 // Reset scroll position
        prevButton.style.display = "none"
        nextButton.style.display = "none"
        dotsContainer.style.display = "none"
        return
      }

      // Enable carousel functionality on mobile
      prevButton.style.display = "flex"
      nextButton.style.display = "flex"
      dotsContainer.style.display = "flex"

      const cardWidth = testimonialCards[0].offsetWidth + Number.parseInt(getComputedStyle(testimonialsGrid).gap)
      const targetScrollLeft = currentIndex * cardWidth

      smoothScrollHorizontal(testimonialsGrid, targetScrollLeft, 500) // Smooth scroll over 500ms

      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add("active")
        } else {
          dot.classList.remove("active")
        }
      })

      prevButton.disabled = currentIndex === 0
      nextButton.disabled = currentIndex === testimonialCards.length - 1
    }

    const goToSlide = (index) => {
      currentIndex = Math.max(0, Math.min(index, testimonialCards.length - 1))
      updateCarousel()
    }

    prevButton.addEventListener("click", () => {
      goToSlide(currentIndex - 1)
    })

    nextButton.addEventListener("click", () => {
      goToSlide(currentIndex + 1)
    })

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        goToSlide(Number.parseInt(e.target.dataset.slide))
      })
    })

    // Update carousel on scroll (for manual scrolling)
    let scrollTimeout
    testimonialsGrid.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        if (isMobile) {
          const scrollPos = testimonialsGrid.scrollLeft
          const cardWidth = testimonialCards[0].offsetWidth + Number.parseInt(getComputedStyle(testimonialsGrid).gap)
          currentIndex = Math.round(scrollPos / cardWidth)
          updateCarousel()
        }
      }, 100) // Debounce scroll updates
    })

    // Handle resize to enable/disable carousel
    window.addEventListener(
      "resize",
      this.debounce(() => {
        const wasMobile = isMobile
        isMobile = window.innerWidth <= 768
        if (wasMobile !== isMobile) {
          updateCarousel()
        }
        // Always update carousel on resize to adjust scroll position if cards resize
        updateCarousel()
      }, 250),
    )

    // Initial update
    updateCarousel()
  }

  // Optimized Event Binding
  bindEvents() {
    // Use passive listeners for better performance
    window.addEventListener(
      "resize",
      this.debounce(() => {
        this.handleResize()
      }, 250),
      { passive: true },
    )

    document.addEventListener("keydown", (e) => {
      this.handleKeyboard(e)
    })
  }

  handleResize() {
    this.magneticElements.forEach((element) => {
      element.style.transform = "translate(0, 0)"
    })
  }

  handleKeyboard(e) {
    if (e.key === "Escape") {
      const mobileMenu = this.$(".mobile-menu")
      const mobileToggle = this.$(".menu-toggle")

      if (mobileMenu && mobileMenu.classList.contains("active")) {
        const hamburger = mobileToggle.querySelector(".hamburger")
        mobileToggle.classList.remove("active")
        mobileMenu.classList.remove("active")
        if (hamburger) hamburger.classList.remove("active")
        document.body.style.overflow = ""
      }
    }
  }

  // Initial animations trigger
  triggerInitialAnimations() {
    const heroContent = this.$(".hero-content")
    if (heroContent) {
      heroContent.classList.add("visible")
    }

    const heroElements = this.$$("[data-delay]")
    heroElements.forEach((element, index) => {
      const delay = Number.parseInt(element.dataset.delay) || index * 200

      setTimeout(() => {
        element.classList.add("visible")
      }, delay)
    })
  }

  // Utility functions
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
}

// Initialize the application
const zenkaiStudio = new ZenkaiStudio()

// Add CSS animations via JavaScript
const style = document.createElement("style")
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  .shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
    background-size: 200px 100%;
    animation: shimmer 2s infinite;
  }
`

document.head.appendChild(style)

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
})

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log("Page Load Time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
    }, 0)
  })
}
 document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".testimonials-grid");
    const dots = document.querySelectorAll(".testimonial-dots .dot");

    if (grid && window.innerWidth <= 768) {
      grid.addEventListener("scroll", () => {
        const scrollLeft = grid.scrollLeft;
        const cardWidth = grid.querySelector(".testimonial-card").offsetWidth;
        const index = Math.round(scrollLeft / (cardWidth + 16)); // 16px gap

        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      });
    }
  });
