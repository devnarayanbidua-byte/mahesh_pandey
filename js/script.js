// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-menu a');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeGallery();
    initializeScrollEffects();
    initializeLoadingAnimation();
});

// Navigation Functions
function initializeNavigation() {
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Gallery Functions
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });
}

function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxCaption.textContent = alt;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class to navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Loading Animation
function initializeLoadingAnimation() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Service Card Hover Effects
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// WhatsApp Integration
function initializeWhatsApp() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track WhatsApp clicks (optional analytics)
            console.log('WhatsApp contact initiated');
        });
    });
}

// Form Validation (if needed in future)
function initializeFormValidation() {
    // Add form validation logic here if contact forms are added
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize additional features
function initializeAdditionalFeatures() {
    initializeServiceCards();
    initializeWhatsApp();
    optimizePerformance();
}

// Call additional features after main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for main initialization
    setTimeout(initializeAdditionalFeatures, 100);
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttled scroll handler for better performance
const throttledScrollHandler = debounce(function() {
    updateActiveNavLink();
}, 100);

// Replace the scroll event listener with throttled version
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', throttledScrollHandler);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'images/gallery/pandit ji.jpeg',
        'images/gallery/aacharya certificate.jpeg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload images on load
window.addEventListener('load', preloadImages);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for PWA capabilities - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker for offline capabilities
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Accessibility improvements
function initializeAccessibility() {
    // Add focus management for lightbox
    lightboxClose.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            closeLightbox();
        }
    });

    // Add ARIA labels where needed
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `View ${img.alt} in full size`);
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Analytics (optional)
function trackEvent(eventName, eventData) {
    // Add analytics tracking here if needed
    console.log('Event tracked:', eventName, eventData);
}

// Track page views
trackEvent('page_view', { page: window.location.pathname });

// Track WhatsApp clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href*="wa.me"]')) {
        trackEvent('whatsapp_click', { source: e.target.textContent.trim() });
    }
});

// Language Translation System
const translations = {
    hi: {
        // Navigation
        home: "मुख्य",
        about: "परिचय",
        services: "सेवाएं",
        gallery: "गैलरी",
        contact: "संपर्क",

        // Hero Section
        vedic: "वैदिक",
        modern: "आधुनिक",
        heroSubtitle: "17+ वर्षों का अनुभव • कर्मकांड विशेषज्ञ • कथा वाचन विद्वान",
        shastriAcharya: "शास्त्री आचार्य",
        karmaKandaCertificate: "कर्मकांड प्रमाणपत्र",
        vastuExpert: "वास्तु विशेषज्ञ",
        contactUs: "संपर्क करें",

        // About Section
        introduction: "परिचय",
        acharyaMaheshPanditJi: "आचार्य महेश पंडित जी",
        birthplace: "जन्म स्थान:",
        ayodhya: "अयोध्या",
        education: "शिक्षा:",
        vrindavanGurukul: "वृंदावन शिक्षा तुलसी गुरुकुल विद्यापीठ",
        higherEducation: "उच्च शिक्षा:",
        sampurnanandUniversity: "शास्त्री आचार्य, सम्पूर्णानंद विश्वविद्यालय, वाराणसी",
        certificate: "प्रमाणपत्र:",
        karmaKandaDiploma: "कर्मकांड डिप्लोमा, एमएमवायवीवी, करोंदी कटनी एम.पी.",
        expertise: "विशेषज्ञता:",
        karmaKandaKathaVachan: "कर्मकांड एवं कथा वाचन",
        experience: "अनुभव:",
        seventeenYears: "17+ वर्ष",

        // Services Section
        ourServices: "हमारी सेवाएं",
        allReligiousWorks: "वैदिक परंपरा के अनुसार सभी धार्मिक कार्य",

        // Pooja Services
        ganeshPoojan: "गणेश पूजन",
        ganeshDescription: "सिद्धि और समृद्धि के लिए गणेश जी की आराधना",
        lakshmiPoojan: "लक्ष्मी पूजन",
        lakshmiDescription: "धन और समृद्धि की देवी की पूजा",
        satyanarayanPoojan: "सत्यनारायण पूजन",
        satyanarayanDescription: "सुख-समृद्धि के लिए भगवान विष्णु की कथा",
        vastuPoojan: "वास्तु पूजन",
        vastuDescription: "घर और कार्यालय की शुभ शुरुआत",
        grihPravesh: "गृह प्रवेश",
        grihPraveshDescription: "नए घर में प्रवेश की शुभ पूजा",
        officeOpening: "कार्यालय उद्घाटन",
        officeOpeningDescription: "व्यापार की शुभ शुरुआत",

        // Sanskar Services
        vivahSanskar: "विवाह संस्कार",
        vivahDescription: "पवित्र वैवाहिक समारोह",
        namakaranSanskar: "नामकरण संस्कार",
        namakaranDescription: "बच्चे का नामकरण संस्कार",
        annaprasanSanskar: "अन्नप्राशन संस्कार",
        annaprasanDescription: "बच्चे का पहला अन्नप्राशन",

        // Path Services
        sundarkandPath: "सुंदरकांड पाठ",
        sundarkandDescription: "हनुमान जी की महिमा का पाठ",
        shreeramcharitManas: "श्रीरामचरित मानस",
        shreeramcharitDescription: "तुलसीदास जी की अमर रचना",
        chandiPath: "चंडी पाठ",
        chandiDescription: "देवी महात्म्य का पाठ",

        // Other Services
        rudraabhishek: "रुद्राभिषेक",
        rudraabhishekDescription: "शिव जी का विशेष अभिषेक",
        bhumiPoojan: "भूमि पूजन",
        bhumiDescription: "निर्माण कार्य की शुभ शुरुआत",
        navgrahShanti: "नवग्रह शांति",
        navgrahDescription: "ग्रह दोषों से मुक्ति",

        // Jyotish Services
        kundliMilan: "कुंडली मिलान",
        kundliDescription: "विवाह के लिए कुंडली मिलान",
        panchangParamarsh: "पंचांग परामर्श",
        panchangDescription: "शुभ मुहूर्त और दिनांक",
        bhagwatMahapuran: "श्रीमद् भागवत महापुराण कथा",
        bhagwatDescription: "कृष्ण भक्ति की दिव्य कथा",

        // Gallery Section
        photoGallery: "फोटो गैलरी",
        religiousWorks: "हमारे धार्मिक कार्यों के कुछ दृश्य",

        // Contact Section
        contactUsTitle: "संपर्क करें",
        connectWithUs: "हमसे जुड़ें और अपनी धार्मिक आवश्यकताओं के लिए संपर्क करें",
        whatsapp: "WhatsApp",
        specialization: "विशेषज्ञता",
        address: "पता",
        contactNow: "अभी संपर्क करें",
        smoothCompletion: "आपके धार्मिक कार्यों को सुचारू रूप से संपन्न करवाने के लिए",
        sendMessage: "WhatsApp पर संदेश भेजें",

        // Footer
        copyright: "© 2025 आचार्य महेश पंडित जी. सर्वाधिकार सुरक्षित।",
        vedicRespect: "वैदिक परंपरा का सम्मान करते हुए"
    },
    en: {
        // Navigation
        home: "Home",
        about: "About",
        services: "Services",
        gallery: "Gallery",
        contact: "Contact",

        // Hero Section
        vedic: "Vedic",
        modern: "Modern",
        heroSubtitle: "17+ Years Experience • Karma Kanda Expert • Katha Vachan Scholar",
        shastriAcharya: "Shastri Acharya",
        karmaKandaCertificate: "Karma Kanda Certificate",
        vastuExpert: "Vastu Expert",
        contactUs: "Contact Us",

        // About Section
        introduction: "Introduction",
        acharyaMaheshPanditJi: "Acharya Mahesh Pandit Ji",
        birthplace: "Birthplace:",
        ayodhya: "Ayodhya",
        education: "Education:",
        vrindavanGurukul: "Vrindavan Shiksha Tulsi Gurukul Vidhyapeeth",
        higherEducation: "Higher Education:",
        sampurnanandUniversity: "Shastri Acharya, Sampurnanand University, Varanasi",
        certificate: "Certificate:",
        karmaKandaDiploma: "Karma Kanda Diploma, MMVV, Karondi Katni M.P.",
        expertise: "Expertise:",
        karmaKandaKathaVachan: "Karma Kanda & Katha Vachan",
        experience: "Experience:",
        seventeenYears: "17+ Years",

        // Services Section
        ourServices: "Our Services",
        allReligiousWorks: "All religious works according to Vedic traditions",

        // Pooja Services
        ganeshPoojan: "Ganesh Poojan",
        ganeshDescription: "Worship of Lord Ganesha for success and prosperity",
        lakshmiPoojan: "Lakshmi Poojan",
        lakshmiDescription: "Worship of Goddess Lakshmi for wealth and prosperity",
        satyanarayanPoojan: "Satyanarayan Poojan",
        satyanarayanDescription: "Story of Lord Vishnu for happiness and prosperity",
        vastuPoojan: "Vastu Poojan",
        vastuDescription: "Auspicious beginning for home and office",
        grihPravesh: "Grih Pravesh",
        grihPraveshDescription: "Auspicious pooja for entering new home",
        officeOpening: "Office Opening",
        officeOpeningDescription: "Auspicious beginning for business",

        // Sanskar Services
        vivahSanskar: "Vivah Sanskar",
        vivahDescription: "Sacred marriage ceremony",
        namakaranSanskar: "Namakaran Sanskar",
        namakaranDescription: "Child's naming ceremony",
        annaprasanSanskar: "Annaprasan Sanskar",
        annaprasanDescription: "Child's first feeding ceremony",

        // Path Services
        sundarkandPath: "Sundarkand Path",
        sundarkandDescription: "Recitation of Hanuman Ji's glory",
        shreeramcharitManas: "Shreeramcharit Manas",
        shreeramcharitDescription: "Tulsidas Ji's immortal composition",
        chandiPath: "Chandi Path",
        chandiDescription: "Recitation of Devi Mahatmya",

        // Other Services
        rudraabhishek: "Rudraabhishek",
        rudraabhishekDescription: "Special abhishek of Lord Shiva",
        bhumiPoojan: "Bhumi Poojan",
        bhumiDescription: "Auspicious beginning for construction work",
        navgrahShanti: "Navgrah Shanti",
        navgrahDescription: "Freedom from planetary defects",

        // Jyotish Services
        kundliMilan: "Kundli Milan",
        kundliDescription: "Horoscope matching for marriage",
        panchangParamarsh: "Panchang Paramarsh",
        panchangDescription: "Auspicious muhurat and dates",
        bhagwatMahapuran: "Shreemad Bhagwat Mahapuran Katha",
        bhagwatDescription: "Divine story of Krishna devotion",

        // Gallery Section
        photoGallery: "Photo Gallery",
        religiousWorks: "Some glimpses of our religious works",

        // Contact Section
        contactUsTitle: "Contact Us",
        connectWithUs: "Connect with us for your religious requirements",
        whatsapp: "WhatsApp",
        specialization: "Specialization",
        address: "Address",
        contactNow: "Contact Now",
        smoothCompletion: "For smooth completion of your religious works",
        sendMessage: "Send Message on WhatsApp",

        // Footer
        copyright: "© 2025 Acharya Mahesh Pandit Ji. All rights reserved.",
        vedicRespect: "Respecting Vedic traditions"
    }
};

let currentLanguage = 'hi';

// Language Toggle Functionality
function initializeLanguageToggle() {
    const languageToggle = document.getElementById('language-toggle');

    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
        updateLanguageButton();
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'hi' ? 'en' : 'hi';
    updateLanguage();
    updateLanguageButton();
    localStorage.setItem('preferredLanguage', currentLanguage);
}

function updateLanguage() {
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;

    // Update navigation
    updateNavigation();

    // Update hero section
    updateHeroSection();

    // Update about section
    updateAboutSection();

    // Update services section
    updateServicesSection();

    // Update gallery section
    updateGallerySection();

    // Update contact section
    updateContactSection();

    // Update footer
    updateFooter();
}

function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const key = href.substring(1); // Remove the #
        if (translations[currentLanguage][key]) {
            link.textContent = translations[currentLanguage][key];
        }
    });
}

function updateHeroSection() {
    // Update hero title spans
    const vedicText = document.querySelector('.vedic-text');
    const modernText = document.querySelector('.modern-text');
    if (vedicText) vedicText.textContent = translations[currentLanguage].vedic;
    if (modernText) modernText.textContent = translations[currentLanguage].modern;

    // Update hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = translations[currentLanguage].heroSubtitle;

    // Update hero badges
    const badges = document.querySelectorAll('.hero-badges .badge');
    if (badges.length >= 3) {
        badges[0].textContent = translations[currentLanguage].shastriAcharya;
        badges[1].textContent = translations[currentLanguage].karmaKandaCertificate;
        badges[2].textContent = translations[currentLanguage].vastuExpert;
    }

    // Update contact button
    const contactBtn = document.querySelector('.hero .cta-btn.primary');
    if (contactBtn) contactBtn.textContent = translations[currentLanguage].contactUs;
}

function updateAboutSection() {
    // Update section title
    const aboutTitle = document.querySelector('#about .section-title');
    if (aboutTitle) aboutTitle.textContent = translations[currentLanguage].introduction;

    // Update about content
    const aboutName = document.querySelector('.about-text h3');
    if (aboutName) aboutName.textContent = translations[currentLanguage].acharyaMaheshPanditJi;

    // Update about details
    const detailItems = document.querySelectorAll('.about-details .detail-content');
    if (detailItems.length >= 7) {
        detailItems[0].querySelector('strong').textContent = translations[currentLanguage].birthplace;
        detailItems[0].querySelector('div').lastChild.textContent = translations[currentLanguage].ayodhya;
        detailItems[1].querySelector('strong').textContent = translations[currentLanguage].education;
        detailItems[1].querySelector('div').lastChild.textContent = translations[currentLanguage].vrindavanGurukul;
        detailItems[2].querySelector('strong').textContent = translations[currentLanguage].higherEducation;
        detailItems[2].querySelector('div').lastChild.textContent = translations[currentLanguage].sampurnanandUniversity;
        detailItems[3].querySelector('strong').textContent = translations[currentLanguage].certificate;
        detailItems[3].querySelector('div').lastChild.textContent = translations[currentLanguage].karmaKandaDiploma;
        detailItems[4].querySelector('strong').textContent = translations[currentLanguage].expertise;
        detailItems[4].querySelector('div').lastChild.textContent = translations[currentLanguage].karmaKandaKathaVachan;
        detailItems[5].querySelector('strong').textContent = translations[currentLanguage].experience;
        detailItems[5].querySelector('div').lastChild.textContent = translations[currentLanguage].seventeenYears;
    }
}

function updateServicesSection() {
    // Update section title and subtitle
    const servicesTitle = document.querySelector('#services .section-title');
    const servicesSubtitle = document.querySelector('#services .section-subtitle');
    if (servicesTitle) servicesTitle.textContent = translations[currentLanguage].ourServices;
    if (servicesSubtitle) servicesSubtitle.textContent = translations[currentLanguage].allReligiousWorks;

    // Update service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const title = card.querySelector('h3');
        const description = card.querySelector('p');

        if (title && description) {
            const titleText = title.textContent.trim();
            const descText = description.textContent.trim();

            // Map Hindi titles to English keys
            const titleMappings = {
                'गणेश पूजन': 'ganeshPoojan',
                'लक्ष्मी पूजन': 'lakshmiPoojan',
                'सत्यनारायण पूजन': 'satyanarayanPoojan',
                'वास्तु पूजन': 'vastuPoojan',
                'गृह प्रवेश': 'grihPravesh',
                'कार्यालय उद्घाटन': 'officeOpening',
                'विवाह संस्कार': 'vivahSanskar',
                'नामकरण संस्कार': 'namakaranSanskar',
                'अन्नप्राशन संस्कार': 'annaprasanSanskar',
                'सुंदरकांड पाठ': 'sundarkandPath',
                'श्रीरामचरित मानस': 'shreeramcharitManas',
                'चंडी पाठ': 'chandiPath',
                'रुद्राभिषेक': 'rudraabhishek',
                'भूमि पूजन': 'bhumiPoojan',
                'नवग्रह शांति': 'navgrahShanti',
                'कुंडली मिलान': 'kundliMilan',
                'पंचांग परामर्श': 'panchangParamarsh',
                'श्रीमद् भागवत महापुराण कथा': 'bhagwatMahapuran'
            };

            const descMappings = {
                'सिद्धि और समृद्धि के लिए गणेश जी की आराधना': 'ganeshDescription',
                'धन और समृद्धि की देवी की पूजा': 'lakshmiDescription',
                'सुख-समृद्धि के लिए भगवान विष्णु की कथा': 'satyanarayanDescription',
                'घर और कार्यालय की शुभ शुरुआत': 'vastuDescription',
                'नए घर में प्रवेश की शुभ पूजा': 'grihPraveshDescription',
                'व्यापार की शुभ शुरुआत': 'officeOpeningDescription',
                'पवित्र वैवाहिक समारोह': 'vivahDescription',
                'बच्चे का नामकरण संस्कार': 'namakaranDescription',
                'बच्चे का पहला अन्नप्राशन': 'annaprasanDescription',
                'हनुमान जी की महिमा का पाठ': 'sundarkandDescription',
                'तुलसीदास जी की अमर रचना': 'shreeramcharitDescription',
                'देवी महात्म्य का पाठ': 'chandiDescription',
                'शिव जी का विशेष अभिषेक': 'rudraabhishekDescription',
                'निर्माण कार्य की शुभ शुरुआत': 'bhumiDescription',
                'ग्रह दोषों से मुक्ति': 'navgrahDescription',
                'विवाह के लिए कुंडली मिलान': 'kundliDescription',
                'शुभ मुहूर्त और दिनांक': 'panchangDescription',
                'कृष्ण भक्ति की दिव्य कथा': 'bhagwatDescription'
            };

            if (titleMappings[titleText]) {
                title.textContent = translations[currentLanguage][titleMappings[titleText]];
            }
            if (descMappings[descText]) {
                description.textContent = translations[currentLanguage][descMappings[descText]];
            }
        }
    });
}

function updateGallerySection() {
    const galleryTitle = document.querySelector('#gallery .section-title');
    const gallerySubtitle = document.querySelector('#gallery .section-subtitle');
    if (galleryTitle) galleryTitle.textContent = translations[currentLanguage].photoGallery;
    if (gallerySubtitle) gallerySubtitle.textContent = translations[currentLanguage].religiousWorks;
}

function updateContactSection() {
    const contactTitle = document.querySelector('#contact .section-title');
    const contactSubtitle = document.querySelector('#contact .section-subtitle');
    if (contactTitle) contactTitle.textContent = translations[currentLanguage].contactUsTitle;
    if (contactSubtitle) contactSubtitle.textContent = translations[currentLanguage].connectWithUs;

    // Update contact items
    const contactItems = document.querySelectorAll('.contact-item h3');
    contactItems.forEach(item => {
        const text = item.textContent.trim();
        if (text === 'WhatsApp') item.textContent = translations[currentLanguage].whatsapp;
        if (text === 'विशेषज्ञता') item.textContent = translations[currentLanguage].specialization;
        if (text === 'पता') item.textContent = translations[currentLanguage].address;
    });

    // Update CTA section
    const ctaTitle = document.querySelector('.contact-cta h3');
    const ctaDesc = document.querySelector('.contact-cta p');
    const ctaBtn = document.querySelector('.contact-cta .cta-btn');
    if (ctaTitle) ctaTitle.textContent = translations[currentLanguage].contactNow;
    if (ctaDesc) ctaDesc.textContent = translations[currentLanguage].smoothCompletion;
    if (ctaBtn) ctaBtn.innerHTML = `<span>📱</span> ${translations[currentLanguage].sendMessage}`;
}

function updateFooter() {
    const footerCopyright = document.querySelector('.footer-bottom p:first-child');
    const footerRespect = document.querySelector('.footer-bottom p:last-child');
    if (footerCopyright) footerCopyright.textContent = translations[currentLanguage].copyright;
    if (footerRespect) footerRespect.textContent = translations[currentLanguage].vedicRespect;
}

function updateLanguageButton() {
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        const flag = currentLanguage === 'hi' ? '🇮🇳' : '🇺🇸';
        const text = currentLanguage === 'hi' ? 'EN' : 'HI';
        languageToggle.innerHTML = `<span>${flag}</span> ${text}`;
    }
}

// Initialize language system
function initializeLanguageSystem() {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'hi' || savedLanguage === 'en')) {
        currentLanguage = savedLanguage;
    }

    initializeLanguageToggle();
    updateLanguage();
}

// Call language initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language system after other initializations
    setTimeout(initializeLanguageSystem, 200);
});

// Console welcome message
console.log(`
🕉️ आचार्य महेश पंडित जी का Portfolio Website
✨ Modern Vedic Design with Ancient Wisdom
📱 WhatsApp: +91 74649 23758
🌐 Built with HTML, CSS, JavaScript
🌍 Multi-language Support: Hindi & English
`);
