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
