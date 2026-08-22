/**
 * Main JavaScript File for Umar Zulfqar Portfolio
 * SEO Specialist | Data-Driven Growth Strategist | WordPress & Web Developer
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Umar Zulfqar Portfolio Initialized.');
  document.documentElement.classList.add('js-ready');

  // Initialize all interactive modules
  initThemeToggle();
  initScrollNavbar();
  initMobileMenu();
  initScrollSpy();
  initScrollReveal();
  initProgressBars();
  initCounters();
  initProjectFiltering();
  initClientShowcaseFiltering();
  initProjectModals();
  initSeoDashboard();
  initTestimonials();
  initContactForm();
  setCurrentYear();
});

/* ==========================================================================
   0. LIGHT & DARK MODE THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const htmlEl = document.documentElement;

  // Retrieve saved preference or default to light theme
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    htmlEl.classList.add('dark');
  } else if (savedTheme === 'light') {
    htmlEl.classList.remove('dark');
  } else {
    // Default to clean light theme
    htmlEl.classList.remove('dark');
  }

  const toggleTheme = () => {
    if (htmlEl.classList.contains('dark')) {
      htmlEl.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      htmlEl.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
}

/* ==========================================================================
   1. STICKY NAVBAR ON SCROLL
   ========================================================================== */
function initScrollNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* ==========================================================================
   2. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileMenu || !mobileMenuBtn) return;

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    document.body.style.overflow = '';
  };

  mobileMenuBtn.addEventListener('click', openMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. SCROLLSPY ACTIVE NAVBAR LINKS
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   4. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible', 'is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('is-visible', 'is-revealed');
    } else {
      observer.observe(el);
    }
  });
}

/* ==========================================================================
   5. SKILL PROGRESS BARS ANIMATION
   ========================================================================== */
function initProgressBars() {
  const progressFills = document.querySelectorAll('.progress-bar-fill');
  if (!progressFills.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-percentage') || '85%';
        entry.target.style.width = targetWidth;
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  progressFills.forEach((fill) => observer.observe(fill));
}

/* ==========================================================================
   6. STATS COUNTER ANIMATION
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetNum = parseInt(counter.getAttribute('data-target'), 10) || 0;
        const suffix = counter.getAttribute('data-suffix') || '';
        let currentNum = 0;
        const duration = 1500;
        const stepTime = Math.max(Math.floor(duration / (targetNum || 1)), 20);

        const timer = setInterval(() => {
          currentNum += 1;
          counter.textContent = currentNum + suffix;
          if (currentNum >= targetNum) {
            counter.textContent = targetNum + suffix;
            clearInterval(timer);
          }
        }, stepTime);

        obs.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((c) => observer.observe(c));
}

/* ==========================================================================
   7. PROJECT CATEGORY FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update Active Button Styling
      filterBtns.forEach((b) => {
        b.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40', 'shadow-lg', 'shadow-emerald-500/10');
        b.classList.add('bg-slate-800/60', 'text-slate-400', 'border-white/5');
      });

      btn.classList.remove('bg-slate-800/60', 'text-slate-400', 'border-white/5');
      btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40', 'shadow-lg', 'shadow-emerald-500/10');

      // Filter Cards smoothly
      projectCards.forEach((card) => {
        const cardMarket = card.getAttribute('data-market');
        if (filterValue === 'all' || cardMarket === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   7.1 DEDICATED CLIENTS SHOWCASE CATEGORY FILTERING & LIVE SEARCH
   ========================================================================== */
function initClientShowcaseFiltering() {
  const categoryBtns = document.querySelectorAll('.category-filter-btn');
  const clientCards = document.querySelectorAll('.client-card');
  const searchInput = document.getElementById('client-search-input');

  if (!categoryBtns.length || !clientCards.length) return;

  let currentCategory = 'all';
  let searchQuery = '';

  const filterCards = () => {
    clientCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      const cardName = (card.getAttribute('data-name') || '').toLowerCase();
      const cardDomain = (card.getAttribute('data-domain') || '').toLowerCase();

      const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
      const matchesSearch = !searchQuery || cardName.includes(searchQuery) || cardDomain.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  };

  categoryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentCategory = btn.getAttribute('data-category');

      categoryBtns.forEach((b) => {
        b.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40', 'shadow-lg', 'shadow-emerald-500/10');
        b.classList.add('bg-slate-800/60', 'text-slate-400', 'border-white/5');
      });

      btn.classList.remove('bg-slate-800/60', 'text-slate-400', 'border-white/5');
      btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40', 'shadow-lg', 'shadow-emerald-500/10');

      filterCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterCards();
    });
  }
}

/* ==========================================================================
   8. PROJECT CASE STUDY MODAL OVERLAY
   ========================================================================== */
const projectData = {
  "binod": {
    title: "Binod Group",
    url: "https://binodgroup.com/",
    industry: "Automotive / Dealership",
    location: "Assam, India",
    market: "Domestic SEO (India)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "A long-established automotive group serving Northeast India through vehicle sales, servicing, spare parts and authorized automotive partnerships.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "booktutor": {
    title: "BookTutor",
    url: "https://booktutor.in/",
    industry: "EdTech / Tutor Booking",
    location: "India",
    market: "Domestic SEO (India)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "A leading educational platform in India connecting students with verified home and online tutors across academic subjects.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "sahinternational": {
    title: "SAH International",
    url: "https://sahinternational.org/",
    industry: "Educational & Social NGO",
    location: "India & Global",
    market: "Domestic SEO (India)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "International educational and social foundation working towards accessible education, skill development, and community welfare.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "dispur": {
    title: "Dispur Polyclinic & Hospitals",
    url: "https://dispurpolyclinichospitals.com/",
    industry: "Healthcare / Hospital",
    location: "Assam, India",
    market: "Domestic SEO (India)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "An established healthcare and hospital website serving patients in Guwahati, with a strong focus on improving online visibility.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "duha": {
    title: "DUHA Industries",
    url: "https://duhaindustries.com/",
    industry: "Plastic Products / Manufacturing",
    location: "Assam, India",
    market: "Domestic SEO (India)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "A product-focused manufacturing website offering plastic furniture and household products under the DUHA brand.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "prabha": {
    title: "Prabha Power",
    url: "https://prabhapower.com/",
    industry: "Power Infrastructure",
    location: "Assam, India",
    market: "Domestic SEO (India)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "An electrical solutions and products business serving transmission and distribution projects, utilities, and railways.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "uncodemy": {
    title: "Uncodemy",
    url: "https://uncodemy.com/",
    industry: "Education / IT Training",
    location: "Noida, India",
    market: "Domestic SEO (India)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "An education and technology training project focused on improving search visibility for IT courses and programming training.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "krishnaurja": {
    title: "Krishna Urja Constructions",
    url: "https://krishnaurja.in/",
    industry: "EPC / Power Transmission",
    location: "Assam, India",
    market: "Domestic SEO (India)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "A specialized EPC company focused on high-voltage and extra-high-voltage transmission infrastructure in Northeast India.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "egresswindow": {
    title: "Egress Window Coverings",
    url: "http://egresswindowcoverings.com",
    industry: "Home & Window Solutions",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Custom egress window cover manufacturing and residential window protection solutions.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "joyfulcreations": {
    title: "Joyful Creations Studio",
    url: "http://joyfulcreationsstudio.com",
    industry: "Creative Design Studio",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Artisan craft studio specializing in custom artwork, creative workshops, and handmade design.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "vinylwindow": {
    title: "Vinyl Window Solutions AL",
    url: "http://vinylwindowsolutionsal.com",
    industry: "Window Contracting & Replacement",
    location: "Alabama, USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Residential vinyl window installation, energy-efficient replacements, and local contracting.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "convergenceprop": {
    title: "Convergence Properties",
    url: "https://convergenceproperties.net/",
    industry: "Real Estate & Property Management",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Commercial and residential real estate investment, leasing, and property asset management.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "better2gether": {
    title: "Better 2Gether",
    url: "http://better2gether.org",
    industry: "Non-Profit & Community Foundation",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Non-profit organization dedicated to supporting families and children with complex medical needs.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "thorneridge": {
    title: "Thorne Ridge",
    url: "http://thorneridge.com",
    industry: "Hospitality & Event Venue",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Scenic event estate, wedding venue hosting, and luxury lodging accommodations.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "neustart": {
    title: "Neustart Psychiatry",
    url: "https://neustartpsychiatry.com/",
    industry: "Psychiatry & Behavioral Health",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Comprehensive psychiatric evaluation, medication management, and mental wellness care.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "restrooms505": {
    title: "505 Restrooms",
    url: "http://www.505restrooms.com",
    industry: "Commercial Sanitation & Facilities",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Portable restroom rentals, luxury restroom trailers, and commercial event sanitation.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "paulwiener": {
    title: "Paul Wiener Physical Therapy",
    url: "https://paulwienerphysicaltherapy.com/",
    industry: "Physical Therapy & Rehab",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Outpatient physical therapy clinic specializing in orthopedic rehabilitation and sports medicine.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "sweetpea": {
    title: "Sweetpea Midwifery",
    url: "https://sweetpeamidwifery.com/",
    industry: "Midwifery & Maternal Care",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Personalized midwifery, prenatal care, home birth support, and postpartum wellness.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "cardioloft": {
    title: "Cardioloft",
    url: "https://www.cardioloft.com/en/",
    industry: "Cardiology & Cardiovascular Care",
    location: "Global",
    market: "International SEO (Global)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Advanced cardiovascular diagnostic clinic and preventative heart care center.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "scales247": {
    title: "24/7 Scales",
    url: "https://www.247scales.com/",
    industry: "Industrial Scale Systems",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Commercial weighing equipment, heavy-duty truck scales, calibration, and 24/7 technical repair.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "brookside": {
    title: "Brookside Counseling",
    url: "https://www.brooksidecounseling.com/",
    industry: "Mental Health & Counseling",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Licensed therapy practice providing individual counseling, family therapy, and stress management.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "heartconnect": {
    title: "HeartConnect Coaching",
    url: "http://heartconnectcoaching.com/",
    industry: "Life & Executive Coaching",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Transformational relationship coaching, executive performance guidance, and mindfulness.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "houstongolf": {
    title: "Houston Golf Lesson",
    url: "https://houstongolflesson.com/",
    industry: "Sports & Golf Instruction",
    location: "Texas, USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Professional golf coaching, swing video analysis, and junior golf academy in Houston.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "adrclaims": {
    title: "ADR Claims",
    url: "https://adr-claims.com/",
    industry: "Insurance & Legal Claim Resolution",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Public insurance adjusters and dispute resolution specialists for property damage claims.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "sistaffing": {
    title: "SI Staffing",
    url: "http://www.sistaffing.com",
    industry: "Staffing & Recruitment Agency",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Light industrial, commercial, medical, and administrative temporary staffing solutions.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "riverrose": {
    title: "River Rose Medical Services",
    url: "http://riverrosems.com",
    industry: "Medical & Clinical Services",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Specialized clinical healthcare consulting, diagnostic support, and patient care management.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "generalnet": {
    title: "General Network",
    url: "http://mygeneralnetwork.com",
    industry: "IT & Network Infrastructure",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Managed IT services, structured cabling, cybersecurity, and enterprise cloud networking.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "stardesignes": {
    title: "Star Designes",
    url: "http://stardesignes.com",
    industry: "Graphic & Digital Design",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Custom branding, web graphics, digital marketing artwork, and promotional design.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "touchofparadise": {
    title: "Touch of Paradise",
    url: "http://touch-of-paradise.com",
    industry: "Landscaping & Outdoor Living",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Custom landscape design, hardscaping, outdoor lighting, and lawn maintenance.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "poolandspa": {
    title: "Pool and Spa Florida",
    url: "http://poolandspaflorida.com",
    industry: "Pool Construction & Maintenance",
    location: "Florida, USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Custom swimming pool building, spa installations, equipment upgrades, and weekly service.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "maidomatic": {
    title: "Maid-O-Matic",
    url: "https://maid-o-matic.com/",
    industry: "Residential & Office Cleaning",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Professional house cleaning, deep maid services, and commercial janitorial maintenance.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "setcolor24": {
    title: "SetColor24",
    url: "https://www.setcolor24.com/",
    industry: "Printing & Color Graphics",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "High-volume commercial printing, wide-format banners, and custom color signage.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "sourcemomentum": {
    title: "Source Momentum Healthcare",
    url: "http://sourcemomentumhealthcare.com",
    industry: "Healthcare & Nurse Staffing",
    location: "Canada & USA",
    market: "International SEO",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Nursing agency, home healthcare assistance, and medical staffing solutions.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "cracovia": {
    title: "Cracovia",
    url: "http://cracovia.com",
    industry: "Culinary & Hospitality Venue",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Traditional Polish restaurant, banquet event hosting, and European catering.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "edenpress": {
    title: "Eden Press",
    url: "http://www.edenpress.com",
    industry: "Publishing & Specialty Printing",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Independent book publishing, custom print fulfillment, and specialized literature.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "setmotorsports": {
    title: "SET Motorsports",
    url: "http://setmotorsports.com",
    industry: "Automotive & Motorsports",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Performance automotive tuning, race car preparation, and aftermarket performance parts.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "nativemodular": {
    title: "Native Modular",
    url: "http://nativemodular.com",
    industry: "Modular Construction & Architecture",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Prefabricated modular home construction, sustainable architectural design, and building.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "waypointmro": {
    title: "Waypoint MRO",
    url: "http://waypointmro.com",
    industry: "Aviation Maintenance & MRO",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Aircraft maintenance, repair, overhaul, avionics inspections, and aviation logistics.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "uffer": {
    title: "UFFER Foundation",
    url: "http://uffer.org",
    industry: "Social Welfare & Non-Profit",
    location: "Global",
    market: "International SEO (Global)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Humanitarian relief foundation promoting community development and educational aid.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "ssapdr": {
    title: "SSA Dent Repair",
    url: "http://ssapdr.com",
    industry: "Paintless Dent Repair & Auto Body",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Mobile paintless dent removal, hail damage repair, and automotive finish restoration.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "sailaweigh": {
    title: "Sail Aweigh",
    url: "http://sailaweigh.org",
    industry: "Marine & Boating Non-Profit",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Nautical education foundation providing therapeutic sailing programs and marine awareness.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "richardpitts": {
    title: "Richard Pitts Consulting",
    url: "http://richardpitts.com",
    industry: "Professional Consulting",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Executive advisory, business strategy consulting, and professional leadership mentoring.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "ritakumari": {
    title: "Rita Kumari Interior Design",
    url: "http://ritakumariinteriordesign.com",
    industry: "Interior Design & Architecture",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Luxury residential interior design, spatial planning, furniture selection, and styling.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "ottostrophies": {
    title: "Ottos Trophies",
    url: "http://ottostrophies.com",
    industry: "Custom Awards & Trophies",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Custom laser-engraved trophies, athletic awards, corporate plaques, and recognition gifts.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "odinsorganics": {
    title: "Odins Organics",
    url: "http://odinsorganics.com",
    industry: "Organic Products & Wellness",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "All-natural organic wellness formulas, herbal supplements, and eco-friendly products.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "harlandhomes": {
    title: "Harland Homes Design",
    url: "http://harlandhomesdesign.com",
    industry: "Residential Architecture & Build",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Custom home design blueprints, residential remodeling plans, and architectural drafting.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "gonecoastal": {
    title: "Gone Coastal Beach Rentals",
    url: "http://gonecoastalbeachrentals.com",
    industry: "Vacation Property Rentals",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Luxury beachfront vacation home rentals, coastal resort bookings, and property management.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "fitexc": {
    title: "FitExc Performance",
    url: "http://fitexc.com",
    industry: "Fitness & Athletic Training",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Personalized fitness coaching, athletic conditioning, body transformation, and nutrition.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "eastcoastjeeps": {
    title: "East Coast Jeeps UK",
    url: "http://eastcoastjeepsuk.com",
    industry: "Automotive Parts & Accessories",
    location: "UK",
    market: "International SEO (UK)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Jeep restoration, 4x4 off-road parts, custom modification, and UK vehicle accessories.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "brevardfootdoc": {
    title: "Brevard Foot Doctor",
    url: "http://www.brevardfootdoctor.com",
    industry: "Podiatry & Foot Surgery",
    location: "Florida, USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Specialist podiatry clinic for bunion care, diabetic foot management, and heel pain surgery.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "brevardfootclinic": {
    title: "Brevard Foot Clinic",
    url: "http://www.brevardfootclinic.com",
    industry: "Podiatric Medical Center",
    location: "Florida, USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Comprehensive foot and ankle care clinic providing laser therapy and podiatric rehab.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "aodesigntool": {
    title: "AO Design Tool",
    url: "http://aodesigntool.com",
    industry: "Web Design & Software Utilities",
    location: "Global",
    market: "International SEO (Global)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Interactive digital design tools, web utilities, and automated layout generators.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "ambassadorfacility": {
    title: "Ambassador Facility Services",
    url: "http://www.ambassadorfacilityservices.com",
    industry: "Facility Management",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Commercial building maintenance, custodial services, floor care, and property upkeep.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "aguadrone": {
    title: "AguaDrone",
    url: "http://www.aguadrone.com",
    industry: "Marine Drone Technology",
    location: "USA",
    market: "International SEO (USA)",
    focus: "Technical SEO | On-Page Optimization | Search Intent | Keyword Architecture",
    summary: "Waterproof drone technology engineered for marine research, fishing, and sonar imaging.",
    activities: [
      "Targeted industry keyword research & clustering",
      "Technical website indexing & Core Web Vitals audit",
      "On-page metadata & structured Schema deployment",
      "Local search visibility & search-intent mapping"
    ],
    approach: "Delivered data-driven SEO strategy, technical audit fixes, high-intent keyword alignment, and organic search ranking growth.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  },
  "mukhtalif": {
    title: "Mukhtalif Shop",
    url: "https://www.mukhtalif.shop/",
    industry: "E-Commerce / Fashion & Retail",
    location: "UAE & Middle East",
    market: "International SEO (E-Commerce)",
    focus: "E-Commerce SEO | Category Keyword Indexing | Product Schema | Technical SEO",
    summary: "Online e-commerce fashion and retail store offering custom apparel, lifestyle merchandise, and regional retail products.",
    activities: [
      "E-commerce product & category keyword research",
      "Technical indexing & Core Web Vitals audit",
      "Product Schema & Merchant Center SEO alignment",
      "High-conversion search intent optimization"
    ],
    approach: "E-commerce SEO strategy targeting product categories, structured product data deployment, and organic search shopping visibility.",
    tools: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog"]
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modal) return;

  const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-industry').textContent = data.industry;
    document.getElementById('modal-market').textContent = data.market;
    document.getElementById('modal-location').textContent = data.location;
    document.getElementById('modal-focus').textContent = data.focus;
    document.getElementById('modal-summary').textContent = data.summary;
    document.getElementById('modal-approach').textContent = data.approach;

    const visitLink = document.getElementById('modal-visit-link');
    if (visitLink) {
      visitLink.href = data.url;
      visitLink.target = '_blank';
      visitLink.rel = 'noopener noreferrer';
    }

    // Key SEO Work List
    const strategyList = document.getElementById('modal-strategy');
    strategyList.innerHTML = data.activities.map((item) => `<li class="flex items-start gap-2 text-slate-300"><span class="text-emerald-400 mt-1">•</span><span>${item}</span></li>`).join('');

    // Tools Badges
    const toolsContainer = document.getElementById('modal-tools');
    toolsContainer.innerHTML = data.tools.map((t) => `<span class="px-2.5 py-1 text-xs rounded-full bg-slate-800 text-emerald-400 border border-slate-700">${t}</span>`).join('');

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE SEO DASHBOARD CHART CONTROLS
   ========================================================================== */
function initSeoDashboard() {
  const chartBtns = document.querySelectorAll('.dash-time-btn');
  const metricVal = document.getElementById('dash-metric-val');
  const metricGrowth = document.getElementById('dash-metric-growth');

  if (!chartBtns.length) return;

  const metricData = {
    '7d': { val: '14.2K', growth: '+18.4% vs prev week' },
    '30d': { val: '58.4K', growth: '+42.8% vs prev month' },
    '90d': { val: '184.9K', growth: '+124.5% vs prev quarter' }
  };

  chartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      chartBtns.forEach((b) => {
        b.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');
        b.classList.add('text-slate-400', 'border-transparent');
      });
      btn.classList.remove('text-slate-400', 'border-transparent');
      btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/30');

      const period = btn.getAttribute('data-period');
      if (metricData[period]) {
        if (metricVal) metricVal.textContent = metricData[period].val;
        if (metricGrowth) metricGrowth.textContent = metricData[period].growth;
      }
    });
  });
}

/* ==========================================================================
   10. TESTIMONIALS CAROUSEL
   ========================================================================== */
function initTestimonials() {
  const prevBtn = document.getElementById('testi-prev');
  const nextBtn = document.getElementById('testi-next');
  const cards = document.querySelectorAll('.testimonial-card');

  if (!cards.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  const showTestimonial = (index) => {
    cards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.remove('hidden');
        card.classList.add('block');
      } else {
        card.classList.add('hidden');
        card.classList.remove('block');
      }
    });
  };

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showTestimonial(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showTestimonial(currentIndex);
  });
}

/* ==========================================================================
   11. CONTACT FORM VALIDATION & TOAST NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusDiv = document.getElementById('form-status');

  if (!form) return;

  const showError = (fieldId, msg) => {
    const errorEl = document.getElementById(`${fieldId}-error`);
    const inputEl = document.getElementById(fieldId);
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }
    if (inputEl) {
      inputEl.classList.add('border-red-500');
    }
  };

  const clearErrors = () => {
    const errorMsgs = form.querySelectorAll('.error-msg');
    const inputs = form.querySelectorAll('input, select, textarea');
    errorMsgs.forEach((el) => {
      el.textContent = '';
      el.classList.add('hidden');
    });
    inputs.forEach((el) => {
      el.classList.remove('border-red-500');
    });
    if (statusDiv) {
      statusDiv.className = 'hidden text-center p-3.5 rounded-xl text-xs font-bold transition-all';
      statusDiv.textContent = '';
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const messageInput = form.querySelector('[name="message"]');

    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const message = messageInput?.value.trim();

    let isValid = true;

    if (!name) {
      showError('name', 'Please enter your name.');
      isValid = false;
    }

    if (!email) {
      showError('email', 'Please enter your email address.');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!message) {
      showError('message', 'Please enter your inquiry message.');
      isValid = false;
    }

    if (!isValid) return;

    // Show loading UI on button
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Inquiry...</span>';
    }

    try {
      const formData = new FormData(form);
      const website = form.querySelector('[name="website"]')?.value.trim() || 'N/A';
      const service = form.querySelector('[name="service"]')?.value || 'General Inquiry';

      const response = await fetch('https://formsubmit.co/ajax/zulfiqarumar05@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        if (statusDiv) {
          statusDiv.className = 'block text-center p-4 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xl space-y-1';
          statusDiv.innerHTML = `
            <div>✅ Inquiry Sent Successfully!</div>
            <div class="text-[11px] font-normal text-slate-300">Umar has received your details and will get back to <strong>${email}</strong> shortly.</div>
          `;
        }
        form.reset();
      } else {
        throw new Error('FormSubmit AJAX returned non-200');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX failed, opening WhatsApp fallback:', err);
      
      const website = form.querySelector('[name="website"]')?.value.trim() || 'N/A';
      const service = form.querySelector('[name="service"]')?.value || 'General Inquiry';

      // Fallback: Open pre-filled WhatsApp message
      const waText = encodeURIComponent(`Hi Umar,\n\nName: ${name}\nEmail: ${email}\nWebsite: ${website}\nService: ${service}\nMessage: ${message}`);
      window.open(`https://wa.me/916393318401?text=${waText}`, '_blank');

      if (statusDiv) {
        statusDiv.className = 'block text-center p-4 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xl space-y-1';
        statusDiv.innerHTML = '<div>✅ Opening WhatsApp to send your inquiry directly to Umar!</div>';
      }
      form.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}

/* ==========================================================================
   12. SET CURRENT YEAR IN FOOTER
   ========================================================================== */
function setCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}



