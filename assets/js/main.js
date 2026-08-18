/**
 * Main JavaScript File for Umar Zulfqar Portfolio
 * SEO Specialist | Data-Driven Growth Strategist | WordPress & Web Developer
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Umar Zulfqar Portfolio Initialized.');

  // Initialize all interactive modules
  initThemeToggle();
  initScrollNavbar();
  initMobileMenu();
  initScrollSpy();
  initScrollReveal();
  initProgressBars();
  initCounters();
  initProjectFiltering();
  initProjectModals();
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

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    htmlEl.classList.remove('dark');
  } else if (savedTheme === 'dark') {
    htmlEl.classList.add('dark');
  } else {
    // Check system preference if available
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      htmlEl.classList.remove('dark');
    } else {
      htmlEl.classList.add('dark');
    }
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
    // If element is already in initial viewport, reveal immediately
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
   7. DOMESTIC & INTERNATIONAL PROJECT CATEGORY FILTERING
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
   8. PROJECT CASE STUDY MODAL OVERLAY DATA & CONTROLS
   ========================================================================== */
const projectData = {
  // INTERNATIONAL PROJECTS (DUBAI, UAE & GLOBAL)
  hassanseif: {
    title: 'Dr. Hassan Seif',
    url: 'https://drhassanseif.com/',
    industry: 'Specialist Plastic & Reconstructive Surgery',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Medical SEO | Local Dubai SEO | Content Strategy | WordPress Dev',
    summary: 'A Dubai-based specialist plastic and reconstructive surgery website focused on high-intent aesthetic and reconstructive patient searches.',
    activities: [
      'Specialist surgical keyword targeting & clustering',
      'WordPress speed and mobile optimization',
      'Local Dubai medical search map ranking',
      'High-authority medical Schema markup implementation'
    ],
    approach: 'Focused on surgical service page optimization, local map pack authority, fast WordPress load times, and patient intent alignment.',
    tools: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'Google Business Profile', 'WordPress']
  },
  riammalik: {
    title: 'Dr. Riam Malik',
    url: 'https://www.docriamalik.com',
    industry: 'Aesthetic & Regenerative Medicine',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Aesthetic Medicine SEO | Local SEO | Content Strategy',
    summary: 'Specialist medical practice website providing aesthetic dermatology and regenerative medical care for Dubai clients.',
    activities: [
      'Aesthetic medicine keyword research & SERP intent mapping',
      'Local GMB profile optimization & patient trust signals',
      'On-page content refinement & Schema structured data'
    ],
    approach: 'Optimized service pages for high-value aesthetic search queries in Dubai with strict local SEO citation building.',
    tools: ['Google Search Console', 'Google Business Profile', 'SEMrush', 'GA4']
  },
  rawan: {
    title: 'Dr. Rawan Al-Najjar (American Hospital Dubai)',
    url: 'https://www.ahdubai.com/doctors-profile/rawan-al-najjar',
    industry: 'Specialist Healthcare / Hospital',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Healthcare SEO | Doctor Profile Optimization | Local Visibility',
    summary: 'Specialist physician profile at American Hospital Dubai, focused on patient discovery and high-authority search visibility.',
    activities: [
      'Doctor profile keyword mapping & internal linking',
      'Structured medical Schema & E-E-A-T signals',
      'Local search reputation alignment'
    ],
    approach: 'Enhanced organic discoverability for specialist medical queries associated with American Hospital Dubai.',
    tools: ['Google Search Console', 'Ahrefs', 'Google Analytics 4']
  },
  ritanawar: {
    title: 'Dr. Rita Nawar (AACSH Dubai)',
    url: 'https://www.aacsh.com/doctors/dr-rita-nawar/',
    industry: 'Cosmetic Surgery & Endocrinology',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Cosmetic & Endocrinology SEO | Local Dubai Search',
    summary: 'Doctor profile at American Academy of Cosmetic Surgery Hospital (AACSH) Dubai, delivering targeted healthcare search rankings.',
    activities: [
      'Endocrinology & cosmetic health keyword research',
      'On-page metadata & structured data deployment',
      'Local search map alignment'
    ],
    approach: 'Structured specialist service keywords and high-conversion patient landing pages.',
    tools: ['Google Search Console', 'SEMrush', 'Google Business Profile']
  },
  daliasiddig: {
    title: 'Dr. Dalia Siddig Medical Center',
    url: 'https://www.drdaliasiddigmedicalcenter.com/',
    industry: 'Specialist Medical Center',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Clinic SEO | Local Map Pack | Technical SEO | WordPress',
    summary: 'Multi-specialty medical center in Dubai requiring local map dominance, service page optimization, and WordPress performance tuning.',
    activities: [
      'Clinic Google Business Profile optimization',
      'WordPress site speed & mobile Core Web Vitals fixes',
      'Localized medical service content optimization'
    ],
    approach: 'Combined local GMB optimization with technical WordPress speed enhancements.',
    tools: ['Google Business Profile', 'Google Search Console', 'WordPress', 'GA4']
  },
  juvina: {
    title: 'Juvina Bioscience',
    url: 'https://juvina-bioscience.com/',
    industry: 'Bioscience & Skincare Technology',
    location: 'International',
    market: 'International SEO',
    focus: 'Product SEO | E-commerce | Technical SEO | WordPress',
    summary: 'Innovative bioscience and dermatological skincare brand focused on global search discoverability and product indexing.',
    activities: [
      'Product & category page SEO optimization',
      'Technical E-commerce indexing & canonical fixes',
      'WordPress & WooCommerce performance tuning'
    ],
    approach: 'Optimized product search intent, structured product schema, and international brand search presence.',
    tools: ['Google Search Console', 'Ahrefs', 'WordPress', 'Screaming Frog']
  },
  dentistree: {
    title: 'Dentistree Dental Clinic',
    url: 'https://dentistree.ae/',
    industry: 'Cosmetic Dentistry & Dental Healthcare',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Dental SEO | Local GMB Map Pack | Patient Lead Gen',
    summary: 'Premier dental and cosmetic dentistry practice in Dubai seeking local map pack rankings and high-intent dental lead generation.',
    activities: [
      'Dental procedure keyword targeting (veneers, implants, aligners)',
      'Google My Business local map pack optimization',
      'On-page dental service page content refinement'
    ],
    approach: 'Targeted high-value commercial dental search terms in Dubai with strong GMB map pack presence.',
    tools: ['Google Business Profile', 'Google Search Console', 'Ahrefs', 'GA4']
  },
  jeromeparis: {
    title: 'Dr. Jerome Paris',
    url: 'https://drjeromeparis.ae/',
    industry: 'Facial Plastic & Reconstructive Surgery',
    location: 'Dubai & Paris',
    market: 'International SEO',
    focus: 'Plastic Surgery SEO | High-Intent Keywords | International SEO',
    summary: 'International facial plastic surgeon website catering to patients in Dubai and Europe.',
    activities: [
      'Facial plastic surgery keyword research & intent mapping',
      'International hreflang & multi-region search optimization',
      'WordPress speed & aesthetic UI optimization'
    ],
    approach: 'Built high-converting surgical landing pages targeting affluent international patient demographics.',
    tools: ['Google Search Console', 'SEMrush', 'WordPress', 'Screaming Frog']
  },
  mayurskin: {
    title: 'Dr. Mayur Skin Clinic',
    url: 'https://drmayurskinclinic.com/',
    industry: 'Dermatology & Skin Care',
    location: 'India & International',
    market: 'Domestic & International SEO',
    focus: 'Dermatology SEO | Local SEO | Content Strategy',
    summary: 'Specialist skin and laser clinic focused on dermatology services, acne treatment, and laser therapies.',
    activities: [
      'Skin care & laser treatment keyword targeting',
      'Local map pack & citation building',
      'Patient consultation landing page optimization'
    ],
    approach: 'Optimized dermatological treatment pages for location-based search queries.',
    tools: ['Google Search Console', 'Google Business Profile', 'Ahrefs']
  },
  dishadinakar: {
    title: 'Dr. Disha Dinakar',
    url: 'https://drdishadinakar.com/',
    industry: 'Aesthetic Medicine & Wellness',
    location: 'India & International',
    market: 'Domestic & International SEO',
    focus: 'Aesthetic SEO | Personal Branding | Content & WordPress',
    summary: 'Personal brand and medical practice website for aesthetic medicine, wellness, and anti-aging treatments.',
    activities: [
      'Personal branding SEO & entity building',
      'Aesthetic wellness service page optimization',
      'WordPress layout tuning & mobile speed fixes'
    ],
    approach: 'Built personal brand search authority alongside local treatment keyword rankings.',
    tools: ['Google Search Console', 'WordPress', 'SEMrush']
  },
  drminal: {
    title: 'Dr. Minal Medical Clinic',
    url: 'https://www.drminal.com/',
    industry: 'Specialist Dermatology & Aesthetics',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Dermatology SEO | Local Dubai GMB | Patient Conversion',
    summary: 'Renowned Dubai dermatology and aesthetic medical practice focused on premium patient care.',
    activities: [
      'Specialist dermatology keyword research',
      'Google My Business local map optimization',
      'Medical Schema markup & Core Web Vitals audit'
    ],
    approach: 'Targeted competitive Dubai dermatology search queries through GMB map rankings and structured content.',
    tools: ['Google Search Console', 'Google Business Profile', 'Screaming Frog', 'GA4']
  },
  katre: {
    title: 'Dr. Mahesh Katre',
    url: 'https://drmaheshkatre.com/',
    industry: 'Pediatric Healthcare & Allergy',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Medical SEO | Pediatric Allergy | Local Dubai SEO',
    summary: 'A Dubai-based pediatric healthcare website focused on children health and pediatric allergy services.',
    activities: [
      'Pediatric allergy medical keyword targeting',
      'Service-page & healthcare content optimization',
      'Local Dubai medical SEO & blog strategy'
    ],
    approach: 'Pediatric allergy medical keyword targeting, service-page optimization, and local Dubai medical SEO.',
    tools: ['Google Search Console', 'Google Business Profile', 'Ahrefs', 'GA4']
  },
  galletly: {
    title: 'Dr. Neil Galletly',
    url: 'https://drneilgalletly.com/',
    industry: 'Gastroenterology & Endoscopy',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Gastroenterology SEO | Endoscopy Keywords | Local SEO',
    summary: 'Specialist healthcare website focused on gastroenterology, hepatology and gastrointestinal endoscopy services in Dubai.',
    activities: [
      'Gastroenterology & endoscopy keyword research',
      'Medical service page & patient resource SEO',
      'Search-intent optimization & internal linking'
    ],
    approach: 'Gastroenterology and endoscopy keyword targeting, medical content structure and patient resources.',
    tools: ['Google Search Console', 'SEMrush', 'Google Business Profile']
  },
  eatpray: {
    title: 'Eat Pray Endoscopy',
    url: 'https://www.eatprayendoscopy.com/',
    industry: 'Digestive Health & Endoscopy',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Endoscopy SEO | Digestive Care | Local Search',
    summary: 'Healthcare-focused digital project centered around digestive health and endoscopy-related services.',
    activities: [
      'Endoscopy & gastroenterology keyword research',
      'Service-page & medical content optimization',
      'Technical SEO & local search optimization'
    ],
    approach: 'Focused on endoscopy procedures, gastrointestinal conditions and search visibility.',
    tools: ['Google Search Console', 'Ahrefs', 'Screaming Frog']
  },
  marouane: {
    title: 'Dr. Marouane Bouloudhnine',
    url: 'https://drmarouane.com/',
    industry: 'Orthopedic & Hand Surgery',
    location: 'Dubai, UAE',
    market: 'International SEO (Dubai, UAE)',
    focus: 'Orthopedic SEO | Hand Surgery | Local Dubai SEO',
    summary: 'Dubai-based orthopedic surgery website focused on hand, wrist, elbow, forearm, upper-arm and shoulder procedures.',
    activities: [
      'Orthopedic & hand surgery keyword research',
      'Medical service-page & local Dubai SEO',
      'Technical SEO & upper-limb content strategy'
    ],
    approach: 'Orthopedic and hand surgery keyword strategy, service-page optimization and technical search health.',
    tools: ['Google Search Console', 'Google Business Profile', 'GA4']
  },

  // DOMESTIC PROJECTS (INDIA)
  binod: {
    title: 'Binod Group',
    url: 'https://binodgroup.com/',
    industry: 'Automotive / Automobile',
    location: 'Guwahati, Assam, India',
    market: 'Domestic SEO (India)',
    focus: 'Automotive SEO | Local SEO | Commercial Keyword Targeting | Content SEO',
    summary: 'A long-established automotive group serving Northeast India through vehicle sales, servicing, spare parts and authorized automotive partnerships.',
    activities: [
      'Automotive keyword research',
      'Location-based targeting',
      'Service-page optimization',
      'Dealership SEO support',
      'Content optimization',
      'Local search strategy'
    ],
    approach: 'Targeted location-based automotive search queries, brand search visibility, dealership service pages and local search relevance.',
    tools: ['Google Search Console', 'Google Business Profile', 'Ahrefs', 'GA4']
  },
  booktutor: {
    title: 'BookTutor',
    url: 'https://booktutor.in/',
    industry: 'EdTech / Home & Online Tutor Booking',
    location: 'India',
    market: 'Domestic SEO (India)',
    focus: 'EdTech SEO | Tutor Booking Keywords | Technical SEO | WordPress',
    summary: 'A leading educational platform in India connecting students with verified home and online tutors across academic subjects.',
    activities: [
      'EdTech & subject-wise tutor keyword clustering',
      'Local city-based tutor landing page SEO',
      'WordPress speed optimization & FAQ Schema'
    ],
    approach: 'Targeted high-intent searches for home tutors in Indian cities with structured landing pages.',
    tools: ['Google Search Console', 'WordPress', 'SEMrush', 'GA4']
  },
  sahinternational: {
    title: 'SAH International',
    url: 'https://sahinternational.org/',
    industry: 'NGO / Educational & Social Foundation',
    location: 'India',
    market: 'Domestic SEO (India)',
    focus: 'Non-Profit SEO | Educational Outreach | WordPress Development',
    summary: 'International educational and social foundation working towards accessible education, skill development, and community welfare.',
    activities: [
      'NGO brand visibility & cause-based keyword research',
      'WordPress portal development & mobile usability',
      'Content architecture & non-profit Schema'
    ],
    approach: 'Optimized brand search authority, program pages, and community impact content.',
    tools: ['Google Search Console', 'WordPress', 'Ahrefs']
  },
  dispur: {
    title: 'Dispur Polyclinic & Hospitals',
    url: 'https://dispurpolyclinichospitals.com/',
    industry: 'Healthcare / Hospital',
    location: 'Guwahati, Assam, India',
    market: 'Domestic SEO (India)',
    focus: 'Healthcare SEO | Local SEO | Content Optimization | Technical SEO',
    summary: 'An established healthcare and hospital website serving patients in Guwahati, with a strong focus on improving online visibility for hospital services.',
    activities: [
      'Healthcare keyword research',
      'Local SEO optimization',
      'Service-page optimization',
      'On-page SEO & content structure'
    ],
    approach: 'Focused on technical website health, keyword targeting, service-page visibility and local search relevance.',
    tools: ['Google Search Console', 'Google Business Profile', 'Screaming Frog', 'GA4']
  },
  duha: {
    title: 'DUHA Industries',
    url: 'https://duhaindustries.com/',
    industry: 'Plastic Products / Manufacturing',
    location: 'Guwahati, Assam, India',
    market: 'Domestic SEO (India)',
    focus: 'Product SEO | E-commerce SEO | Search-Intent | On-Page Optimization',
    summary: 'A product-focused manufacturing website offering plastic furniture and household products under the DUHA brand.',
    activities: [
      'Product-focused keyword research',
      'Category page optimization',
      'E-commerce indexing optimization',
      'Internal link structure'
    ],
    approach: 'Product and category page optimization, technical indexing control, internal link structure and search-intent alignment.',
    tools: ['Google Search Console', 'Ahrefs', 'Screaming Frog']
  },
  prabha: {
    title: 'Prabha Power',
    url: 'https://prabhapower.com/',
    industry: 'Electrical / Power Infrastructure',
    location: 'Guwahati, Assam, India',
    market: 'Domestic SEO (India)',
    focus: 'B2B SEO | Industrial Product SEO | Technical Content Optimization',
    summary: 'An electrical solutions and products business serving transmission and distribution projects, utilities, railways and public infrastructure.',
    activities: [
      'Industrial product keyword research',
      'B2B search-intent mapping',
      'Product & service page SEO',
      'Technical content structure'
    ],
    approach: 'Industrial product keyword research, B2B search-intent mapping, product/service page optimization and technical content structure.',
    tools: ['Google Search Console', 'SEMrush', 'GA4']
  },
  uncodemy: {
    title: 'Uncodemy',
    url: 'https://uncodemy.com/',
    industry: 'Education / IT Training',
    location: 'Noida & India',
    market: 'Domestic SEO (India)',
    focus: 'Education SEO | Course Landing Pages | Competitor Benchmarking',
    summary: 'An education and technology training project focused on improving search visibility for IT courses, programming training and education searches.',
    activities: [
      'Education keyword research',
      'Course-page SEO',
      'Local SEO support',
      'Competitor gap analysis'
    ],
    approach: 'Education keyword research, course page optimization, local SEO support, competitor gap analysis and internal linking.',
    tools: ['Google Search Console', 'Ahrefs', 'SEMrush', 'GA4']
  },
  krishnaurja: {
    title: 'Krishna Urja Constructions',
    url: 'https://krishnaurja.in/',
    industry: 'EPC / Power Transmission',
    location: 'Guwahati, Assam, India',
    market: 'Domestic SEO (India)',
    focus: 'EHV Transmission | B2B EPC SEO | Technical Content Strategy',
    summary: 'A specialized EPC company focused on high-voltage and extra-high-voltage transmission infrastructure in Northeast India.',
    activities: [
      'Industrial & EHV transmission keyword research',
      'Service-page & technical content optimization',
      'Location-based EPC B2B keyword strategy'
    ],
    approach: 'Industrial keyword research, technical service page optimization, local B2B keyword targeting and structural content alignment.',
    tools: ['Google Search Console', 'GA4', 'Screaming Frog']
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
   9. CONTACT FORM VALIDATION & TOAST NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('contact-toast');

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
    const errorMsgs = document.querySelectorAll('.error-msg');
    const inputs = form.querySelectorAll('input, textarea');
    errorMsgs.forEach((el) => {
      el.textContent = '';
      el.classList.add('hidden');
    });
    inputs.forEach((el) => {
      el.classList.remove('border-red-500');
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

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

    if (isValid) {
      if (toast) {
        toast.classList.remove('hidden');
        toast.classList.add('flex');
        setTimeout(() => {
          toast.classList.add('hidden');
          toast.classList.remove('flex');
        }, 6000);
      }
      form.reset();
    }
  });
}

/* ==========================================================================
   10. SET CURRENT YEAR IN FOOTER
   ========================================================================== */
function setCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
