// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-menu a');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

// Language state — declared early to prevent hoisting issues
let currentLanguage = 'en';

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
            navbar.classList.add('nav-hidden');
        } else {
            // Scrolling up - show navbar
            navbar.classList.remove('nav-hidden');
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

// Service Details Toggle Functionality
function toggleServiceDetails(button) {
    const serviceCard = button.closest('.service-card');
    const serviceDetails = serviceCard.querySelector('.service-details');

    if (serviceDetails) {
        if (serviceDetails.classList.contains('show')) {
            serviceDetails.classList.remove('show');
            button.textContent = currentLanguage === 'hi' ? 'और पढ़ें' : 'Read More';
        } else {
            serviceDetails.classList.add('show');
            button.textContent = currentLanguage === 'hi' ? 'कम पढ़ें' : 'Read Less';
        }
    }
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
        'images/gallery/pandit-ji.png',
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

// (currentLanguage already declared at top of file)

// Content Translation Mapping for detailed service descriptions
const contentTranslations = {
    'वैदिक प्रमाण:': 'Vedic Evidence:',
    'और पढ़ें': 'Read More',
    'कम पढ़ें': 'Read Less',
    'संपर्क करें': 'Contact Us',
    'लाभ:': 'Benefits:',
    
    // Common links and buttons
    'मुख्य': 'Home',
    'परिचय': 'About',
    'सेवाएं': 'Services',
    'गैलरी': 'Gallery',
    'संपर्क': 'Contact',
    
    // Hero section
    'वैदिक': 'Vedic',
    'आधुनिक': 'Modern',
    'आचार्य महेश पंडित जी': 'Acharya Mahesh Pandit Ji',
    'सर्वश्रेष्ठ हिंदी पंडित • 17+ साल का अनुभव • वैदिक पूजा सेवाएं': 'Best Hindi Pandit • 17+ Years Experience • Vedic Pooja Services',
    'शास्त्री आचार्य': 'Shastri Acharya',
    'वैदिक पंडित': 'Vedic Pandit',
    'हिंदू पुजारी': 'Hindu Priest',
    
    // About section
    'आचार्य महेश पंडित जी': 'Acharya Mahesh Pandit Ji',
    'जन्म स्थान:': 'Birthplace:',
    'अयोध्या': 'Ayodhya',
    'शिक्षा:': 'Education:',
    'वृंदावन शिक्षा तुलसी गुरुकुल विद्यापीठ': 'Vrindavan Shiksha Tulsi Gurukul Vidhyapeeth',
    'उच्च शिक्षा:': 'Higher Education:',
    'शास्त्री आचार्य, सम्पूर्णानंद विश्वविद्यालय, वाराणसी': 'Shastri Acharya, Sampurnanand University, Varanasi',
    'प्रमाणपत्र:': 'Certificate:',
    'कर्मकांड डिप्लोमा, एमएमवायवीवी, करोंदी कटनी एम.पी.': 'Karma Kanda Diploma, MMVV, Karondi Katni M.P.',
    'विशेषज्ञता:': 'Expertise:',
    'कर्मकांड एवं कथा वाचन': 'Karma Kanda & Katha Vachan',
    'अनुभव:': 'Experience:',
    '17+ वर्ष': '17+ Years',
    
    // Services section header
    'हमारी सेवाएं': 'Our Services',
    'सभी वैदिक पूजा सेवाएं - गणेश पूजन, विवाह संस्कार, गृह प्रवेश, वास्तु शांति, कथा वाचन': 'All Vedic Pooja Services - Ganesh Poojan, Marriage Ceremony, Grih Pravesh, Vastu Shanti, Katha Vachan',
    
    // Ganesh Poojan
    'गणेश जी का महत्व:': 'Lord Ganesha\' Importance:',
    'विस्तृत पूजा विधि:': 'Detailed Pooja Procedure:',
    'आह्वान और स्नान:': 'Invocation and Bath:',
    'गणेश जी का स्वागत, प्रणाम': 'Welcome and Salutation to Lord Ganesha',
    'षोडश उपचार:': '16 Ritual Offerings:',
    'आसन, पाद्य, अर्घ्य, आचमन, पवित्रीकरण, वस्त्र, यज्ञोपवीत, गंध, पुष्प, धूप, दीप, नैवेद्य': 'Seat, foot washing, offerings, purification, clothes, sacred thread, fragrance, flowers, incense, lamps, food offerings',
    'मोदक और लड्डू:': 'Modak and Sweets:',
    'गणेश जी का प्रिय भोग, परिवार के साथ वितरण': 'Lord Ganesha\' favorite offering, distributed among family',
    'आरती और मंत्र:': 'Aarti and Mantras:',
    'पूर्ण आरती, शांति मंत्र का पाठ': 'Complete aarti, chanting of peace mantras',
    'प्रसाद वितरण:': 'Blessing Distribution:',
    'परिवार के सभी सदस्यों को प्रसाद': 'Blessing distributed to all family members',
    'आवश्यक सामग्री:': 'Required Materials:',
    'फूल (गुलाब, गेंदा), दही, शहद, मोदक, नारियल, तिल, दूध, घी, धूप, दीप, गेहूं।': 'Flowers (roses, marigolds), yogurt, honey, modak, coconut, sesame, milk, ghee, incense, lamps, wheat.',
    'अनुभव:': 'Experience:',
    '17+ साल में Whitefield, Koramangala, Electronic City समेत सभी क्षेत्रों में गणेश पूजन व्यक्तिगत घरों, व्यापार स्थलों व कार्यालयों में संपन्न किए।': '17+ years of experience conducting Ganesh Poojan in personal homes, businesses and offices across Whitefield, Koramangala, Electronic City and all areas.',
    'समय अवधि:': 'Duration:',
    'पूरी पूजा 1-2 घंटे में संपन्न होती है। व्यवस्था सहित 2-3 घंटे का है।': 'Complete poojan takes 1-2 hours. With arrangements, it takes 2-3 hours.',
    'उपयुक्त अवसर:': 'Suitable Occasions:',
    'किसी भी नए कार्य की शुरुआत, व्यापार खोलना, होम टेक ओवर, शिक्षा शुरू करना।': 'Beginning any new work, opening a business, home takeover, starting education.',
    'कार्यों में सफलता': 'Success in tasks',
    'बुद्धि और ज्ञान की प्राप्ति': 'Gaining wisdom and knowledge',
    'विघ्नों का निवारण': 'Removal of obstacles',
    'समृद्धि और धनलाभ': 'Prosperity and financial gain',
    
    // Lakshmi Poojan
    'लक्ष्मी जी का महत्व:': 'Goddess Lakshmi\' Importance:',
    'धन, समृद्धि और वैभव की देवी। वैदिक ग्रंथों में उनका उल्लेख सर्वश्रेष्ठ देवी के रूप में है।': 'Goddess of wealth, prosperity and splendor. Mentioned as the supreme goddess in Vedic scriptures.',
    'भूमि पूजन:': 'Earth Worship:',
    'घर/कार्यालय की चारों दिशा की शुद्धि, भूमि देवी को नमस्कार': 'Purification of all four directions of home/office, salutation to Earth Goddess',
    'लक्ष्मी आह्वान:': 'Lakshmi Invocation:',
    'श्रीसूक्त मंत्र पाठ, देवी को आमंत्रण': 'Recitation of Sri Sukta mantras, invitation to the Goddess',
    'षोडश उपचार:': 'Sixteen Offerings:',
    '16 पारंपरिक पूजन विधि पूर्ण करना': 'Completion of 16 traditional puja methods',
    'हवन:': 'Fire Ritual:',
    'घी, अनाज, फल से हवन, समृद्धि की कामना': 'Havan with ghee, grains, fruits, wishing for prosperity',
    'रंगोली:': 'Rangoli:',
    'लक्ष्मी चिन्ह बनाना, फूलों से सजावट': 'Creating Lakshmi symbols, decoration with flowers',
    'दीप प्रज्वलन:': 'Lamp Lighting:',
    'घर में सौभाग्य का प्रतीक': 'Symbol of good fortune in the home',
    'विशेष लाभ:': 'Special Benefits:',
    'व्यक्तिगत घरों में परिवार की खुशहाली, दुकानों में व्यापार वृद्धि, कार्यालयों में कर्मचारी संतुष्टि, संस्थानों में आय में वृद्धि।': 'Family happiness in personal homes, business growth in shops, employee satisfaction in offices, increased income in institutions.',
    'सर्वश्रेष्ठ समय:': 'Best Time:',
    'दिवाली के समय सबसे प्रभावी, या किसी भी समय व्यापार वृद्धि के लिए।': 'Most effective during Diwali, or anytime for business growth.',
    'धन और समृद्धि की प्राप्ति': 'Gain of wealth and prosperity',
    'सुख-समृद्धि का आशीर्वाद': 'Blessing of happiness and prosperity',
    'परिवार में सौहार्द': 'Harmony in family',
    'व्यापार में सफलता': 'Success in business',
    
    // Satyanarayan Poojan
    'सत्यनारायण जी का महत्व:': 'Lord Satyanarayan\' Importance:',
    'सच्चाई और धर्म के रक्षक। उनकी कथा सुनने से घर में सुख-समृद्धि आती है और मनोकामनाएं पूर्ण होती हैं।': 'Protector of truth and dharma. Listening to his story brings happiness and prosperity to the home and fulfills desires.',
    'विस्तृत पूजा विधि (3-4 घंटे की अवधि):': 'Detailed Puja Procedure (3-4 hours duration):',
    'चरण 1 - भूमि शोधन:': 'Step 1 - Earth Purification:',
    'पूजा स्थान को गंगाजल से शुद्ध करना, फूलों से सजाना': 'Purifying the worship place with Ganges water, decorating with flowers',
    'चरण 2 - देवताओं का आह्वान:': 'Step 2 - Invocation of Deities:',
    'गणेश, सरस्वती, महालक्ष्मी, नवग्रह की स्थापना': 'Installation of Ganesha, Saraswati, Mahalakshmi, nine planets',
    'चरण 3 - विष्णु पूजन:': 'Step 3 - Vishnu Worship:',
    'भगवान विष्णु को 16 उपचारों से पूजना': 'Worshipping Lord Vishnu with 16 ritual offerings',
    'चरण 4 - संपूर्ण कथा पाठ:': 'Step 4 - Complete Story Recitation:',
    '2-3 घंटे की पूरी पारंपरिक कथा वाचन': 'Complete traditional story recitation lasting 2-3 hours',
    'चरण 5 - प्रसाद बनाना:': 'Step 5 - Making Blessed Food:',
    'पारंपरिक हलवा-पूरी-चना का भोग तैयार करना': 'Preparing traditional halwa-puri-chickpea offering',
    'चरण 6 - आरती:': 'Step 6 - Aarti:',
    'सभी को दीप से आरती, मंत्रों का पाठ': 'Aarti for all with lamps, chanting of mantras',
    'चरण 7 - प्रसाद वितरण:': 'Step 7 - Blessing Distribution:',
    'सभी परिवार सदस्यों को प्रसाद वितरण': 'Distributing blessings to all family members',
    'मैदा, चना, गुड़, घी, दही, शहद, चावल, नारियल, फूल, घंटी, दीप, धूप, फल।': 'Flour, chickpea, jaggery, ghee, yogurt, honey, rice, coconut, flowers, bells, lamps, incense, fruits.',
    'वास्तविक लाभ:': 'Real Benefits:',
    'नई नौकरी प्राप्ति, व्यापार समृद्धि, विवाह योग्य बेटी के लिए योग्य दूल्हा, रोग निवारण, परिवार में सुख-शांति।': 'Getting new job, business prosperity, suitable groom for marriageable daughter, curing diseases, peace in family.',
    'विशेष नियम:': 'Special Rules:',
    'कथा के दिन व्रत रखना वैकल्पिक, पूरी पारंपरिक विधि के अनुसार प्रसाद वितरण आवश्यक।': 'Fasting on story day is optional, but blessing distribution as per complete traditional procedure is essential.',
    'मनोकामना की पूर्ति': 'Fulfillment of wishes',
    'सुख और समृद्धि': 'Happiness and prosperity',
    'परिवार की रक्षा': 'Family protection',
    'सभी प्रकार की सिद्धि': 'All kinds of blessings',
    
    // Vastu Poojan
    'वास्तु पूजा का महत्व:': 'Vastu Puja\' Importance:',
    'घर और कार्यालय की शुभता के लिए अनिवार्य। वास्तु दोषों से मुक्ति और सकारात्मक ऊर्जा का प्रवाह सुनिश्चित करता है।': 'Essential for auspiciousness of home and office. Ensures freedom from Vastu defects and positive energy flow.',
    'विस्तृत वास्तु पूजा विधि (2.5-3 घंटे):': 'Detailed Vastu Puja Procedure (2.5-3 hours):',
    'भूमि शोधन:': 'Earth Purification:',
    'पूजा स्थान की गंगाजल से शुद्धि, नमक का छिड़काव': 'Purifying worship place with Ganges water, sprinkling salt',
    'वास्तु मंडल:': 'Vastu Mandala:',
    'भूमि पर 64 वर्गाकार पुरुष (वास्तु पुरुष) का चित्र बनाना': 'Drawing 64 square Vastu Purush symbols on the ground',
    'पंचदिक पूजन:': 'Five Direction Worship:',
    'पूरब, पश्चिम, उत्तर, दक्षिण, केंद्र की पूजा अलग-अलग देवताओं के साथ': 'Worshipping East, West, North, South, Center with different deities',
    'वास्तु बीज मंत्र से हवन (आमिस - घी, अनाज, तिल)': 'Havan with Vastu seed mantras (offerings - ghee, grains, sesame)',
    'घर की परिक्रमा:': 'House Circumambulation:',
    'घर के चारों कोनों में पूजा, प्रत्येक कोने में फूल व दीप': 'Worshipping all four corners of the house, flowers and lamps at each corner',
    'शांति मंत्र:': 'Peace Mantras:',
    'सभी नकारात्मक शक्तियों के निवारण के लिए': 'To remove all negative forces',
    'आशीर्वाद:': 'Blessings:',
    'घर की खुशहाली के लिए आशीर्वाद वचन': 'Blessing words for home happiness',
    'आवश्यक सामान:': 'Required Items:',
    'गंगाजल, नमक, नई बाल्टी, तिल, चावल, गेहूं, जौ, मसूर, उड़द, धान, नारियल, आम के पत्ते, फूल, दीप।': 'Ganges water, salt, new bucket, sesame, rice, wheat, barley, lentils, black gram, rice plant, coconut, mango leaves, flowers, lamps.',
    'वास्तु दोष निवारण:': 'Vastu Defect Remedies:',
    'उत्तर-दक्षिण की असमानता, दरवाजे की गलत दिशा, रसोई की स्थिति, तालाब पास होना - सभी समस्याओं से सुरक्षा।': 'North-South imbalance, wrong door direction, kitchen location, nearby water body - protection from all problems.',
    'भौतिक परिणाम:': 'Physical Results:',
    'घर में शांति व सकारात्मक वातावरण, परिवार में रोग व कलह में कमी, व्यापार में वृद्धि।': 'Peace and positive atmosphere at home, reduced illness and conflict in family, business growth.',
    'घर में सुख-शांति': 'Peace and happiness at home',
    'वास्तु दोषों का निवारण': 'Removal of Vastu defects',
    'परिवार की समृद्धि': 'Family prosperity',
    'कार्यालय में सफलता': 'Success in office',
    
    // Office Opening
    'कार्यालय उद्घाटन का महत्व:': 'Office Opening Importance:',
    'व्यापार की सफलता के लिए अनिवार्य। कार्यालय को शुभ बनाता है और सकारात्मक ऊर्जा लाता है।': 'Essential for business success. Makes office auspicious and brings positive energy.',
    'पूजा विधि:': 'Puja Procedure:',
    'गणेश पूजा, वास्तु पूजा, हवन, मंगल कलश स्थापना।': 'Ganesha puja, Vastu puja, havan, auspicious pot installation.',
    'IT कंपनियों, स्टार्टअप्स, और कॉर्पोरेट ऑफिस के लिए विशेष पूजा संपन्न किए।': 'Conducted special pujas for IT companies, startups, and corporate offices.',
    'नए ऑफिस में सकारात्मक माहौल और व्यापारिक सफलता सुनिश्चित करता है।': 'Ensures positive atmosphere in new office and business success.',
    'व्यापार में सफलता': 'Success in business',
    'कर्मचारियों की समृद्धि': 'Employee prosperity',
    'कार्यालय में सकारात्मक वातावरण': 'Positive atmosphere in office',
    'लाभ और प्रतिष्ठा': 'Profit and reputation',
    
    // Marriage Ceremony
    'विवाह संस्कार का महत्व:': 'Marriage Ceremony Importance:',
    'जीवन का सबसे पवित्र संस्कार। वैदिक रीति की परंपरा में किया जाता है, दो आत्माओं को एक करता है।': 'Most sacred sacrament of life. Performed in Vedic tradition, unites two souls.',
    'विस्तृत विवाह विधि (1.5-2 घंटे):': 'Detailed Marriage Procedure (1.5-2 hours):',
    'पूर्व तैयारी:': 'Pre-ceremony Preparation:',
    'दूल्हा-दुल्हन का पूजन, माता-पिता का आशीर्वाद': 'Worship of bride and groom, parents blessing',
    'विवाह अग्नि स्थापना:': 'Marriage Fire Establishment:',
    'विवाह कुंड में अग्नि जलाना, साक्षी के रूप में अग्नि देव': 'Lighting fire in marriage pit, fire god as witness',
    'कन्यादान:': 'Bride Gift Ceremony:',
    'दुल्हन को दूल्हे को देना (पिता की ओर से/मां की ओर से)': 'Presenting bride to groom (from father/mother)',
    'हस्तग्रहण:': 'Hand Holding:',
    'दूल्हे द्वारा दुल्हन का हाथ पकड़ना, संकल्प': 'Groom holding bride\'s hand, taking oath',
    'सप्तपदी:': 'Seven Steps:',
    'सात कदम दूल्हे के साथ चलना - अन्न, शक्ति, पयस, स्वास्थ्य, पशु, ऋतु, स्वास्थ्य के लिए': 'Seven steps with groom - for food, strength, health, cattle, seasons, wellness',
    'मंगलसूत्र बंधन:': 'Sacred Thread Binding:',
    'दूल्हे द्वारा दुल्हन को मंगलसूत्र पहनाना': 'Groom puts sacred thread on bride',
    'सिंदूर दान:': 'Vermillion Application:',
    'सिंदूर लगाना (विवाहित स्त्री का प्रतीक)': 'Applying vermillion (symbol of married woman)',
    'होम:': 'Fire Ritual:',
    'नई दाम्पत्य जीवन की खुशहाली के लिए हवन': 'Fire ritual for happiness of new married life',
    'सभी रिश्तेदारों का आशीर्वाद वचन': 'Blessing words from all relatives',
    'विवाह स्थल:': 'Wedding Venue:',
    'मंदिर, होटल, विवाह हॉल, बगीचे, घर - सभी स्थानों पर संपन्न किए जा सकते हैं।': 'Temple, hotel, wedding hall, garden, home - can be conducted at all venues.',
    'वर-वधु का जन्म नक्षत्र अच्छा होना चाहिए (ज्योतिष परामर्श से), विवाह तिथि शुभ मुहूर्त में करें, सभी संस्कार पूरी परंपरा के अनुसार करें।': 'Bride and groom birth star should be favorable (astrological consultation), marriage date in auspicious time, all rituals as per tradition.',
    'जीवनसाथी का मिलना': 'Finding life partner',
    'परिवार की स्थिरता': 'Family stability',
    'संतान सुख': 'Children\'s happiness',
    'आध्यात्मिक उन्नति': 'Spiritual progress',
    
    // Baby Naming
    'नामकरण संस्कार का महत्व:': 'Baby Naming Ceremony Importance:',
    'बच्चे के जीवन की दिशा तय करने वाला संस्कार। शास्त्रों में नाम का बहुत महत्व बताया गया है - नाम में ही बालक के भविष्य की परछाई होती है।': 'Ceremony determining child\'s life direction. Name has great importance in scriptures - child\'s future is reflected in the name.',
    'विस्तृत नामकरण विधि (1.5-2 घंटे):': 'Detailed Naming Ceremony Procedure (1.5-2 hours):',
    'ज्योतिष विश्लेषण:': 'Astrological Analysis:',
    'बच्चे का जन्म नक्षत्र, राशि, वर्ण के अनुसार नाम': 'Name according to child\'s birth star, zodiac, and letter',
    'ब्रह्मा पूजन:': 'Brahma Worship:',
    'ज्ञान और बुद्धि के देवता को नमस्कार': 'Salutation to God of knowledge and wisdom',
    'हवन:': 'Fire Ritual:',
    'बच्चे के नाम का घोषणा, अग्नि को साक्षी मानकर': 'Announcing child\'s name, taking fire as witness',
    'मंत्र पाठ:': 'Mantra Recitation:',
    'बच्चे के दीर्घायु और सुस्वास्थ्य के लिए मंत्र': 'Mantras for child\'s long life and good health',
    'नाम घोषणा:': 'Name Announcement:',
    'पंडित द्वारा उचित नाम का निर्धारण और घोषणा': 'Priest determines and announces appropriate name',
    'नवजात शिशु की आरती, परिवार का आशीर्वाद': 'Aarti for newborn, family blessings',
    'जन्म नक्षत्र के अक्षर अनुसार, ग्रहों की शुभता देखकर, धार्मिक/शास्त्रीय पुरुष/स्त्री के नाम पर।': 'According to birth star letters, planet auspiciousness, named after religious/scriptural figures.',
    'बेंगलुरु में घर, अपार्टमेंट, अस्पतालों में सैकड़ों नामकरण समारोह संपन्न किए - सभी धर्मों और परिवारों के साथ।': 'Conducted hundreds of naming ceremonies in homes, apartments, hospitals - with all religions and families.',
    'जन्म का सही समय जानना आवश्यक है (घंटा-मिनट), माता-पिता की जन्मतारीख और नक्षत्र।': 'Knowing exact birth time (hour-minute) is necessary, parents\' birth date and star.',
    'बच्चे का दीर्घायु होना': 'Child\'s longevity',
    'सकारात्मक गुणों का विकास': 'Development of positive qualities',
    'परिवार की खुशी': 'Family happiness',
    'आध्यात्मिक संरक्षण': 'Spiritual protection',
    
    // Annaprasan
    'अन्नप्राशन संस्कार का महत्व:': 'First Feeding Ceremony Importance:',
    'बच्चे को सुबुद्धि, बल और स्वास्थ्य प्रदान करता है।': 'Provides child with wisdom, strength and health.',
    'देवताओं को प्रणाम, चावल-दही-शहद का पहला भोजन, हवन और आरती, परिवार का आशीर्वाद।': 'Salutation to deities, first feeding with rice-yogurt-honey, fire ritual and aarti, family blessings.',
    'बेंगलुरु के विभिन्न क्षेत्रों में घर, अपार्टमेंट और कम्युनिटी हॉल में अन्नप्राशन संपन्न किए।': 'Conducted first feeding ceremonies in homes, apartments and community halls across Bangalore.',
    'संपूर्ण अन्नप्राशन संस्कार 1-1.5 घंटे में पूरा होता है।': 'Complete first feeding ceremony takes 1-1.5 hours.',
    'बच्चे का स्वस्थ विकास': 'Child\'s healthy development',
    'ज्ञान और बुद्धि की प्राप्ति': 'Gaining knowledge and wisdom',
    'दीर्घायु और समृद्धि': 'Longevity and prosperity',
    
    // Katha Vachan Services
    'सुंदरकांड का महत्व:': 'Sundarkand Importance:',
    'रामायण का सबसे शक्तिशाली कांड। सभी प्रकार की समस्याओं का समाधान करता है।': 'Most powerful section of Ramayana. Solves all kinds of problems.',
    'हनुमान जी की पूजा, संपूर्ण सुंदरकांड पाठ, आरती और प्रसाद वितरण।': 'Worship of Hanuman, complete Sundarkand recitation, aarti and blessing distribution.',
    'बेंगलुरु के सभी प्रमुख क्षेत्रों में Whitefield, Koramangala, Electronic City, Indiranagar सहित घर, मंदिर और कम्युनिटी हॉल में सुंदरकांड पाठ संपन्न किए। परिवार को शक्ति, साहस और सभी समस्याओं से मुक्ति का आशीर्वाद मिलता है।': 'Conducted Sundarkand recitation in homes, temples and community halls including Whitefield, Koramangala, Electronic City, Indiranagar. Family receives blessing of strength, courage and freedom from all problems.',
    'संपूर्ण सुंदरकांड पाठ 3-4 घंटे में पूरा होता है, जिसमें हनुमान जी की सभी महिमा और शक्तिशाली अध्याय शामिल होते हैं।': 'Complete Sundarkand recitation takes 3-4 hours, including all glories of Hanuman and powerful chapters.',
    'सभी प्रकार की समस्याओं से मुक्ति': 'Freedom from all kinds of problems',
    'शक्ति और साहस की प्राप्ति': 'Gaining strength and courage',
    'रोगों से रक्षा': 'Protection from diseases',
    'मनोकामना की पूर्ति': 'Fulfillment of wishes',
    
    // Ramcharit Manas
    'रामचरित मानस का महत्व:': 'Ramcharit Manas Importance:',
    'भक्ति का सर्वोच्च ग्रंथ। राम जी के जीवन से सीखने वाला पाठ।': 'Supreme scripture of devotion. Lessons from Lord Ram\'s life.',
    'राम जी की पूजा, रामचरित मानस का संपूर्ण पाठ, भजन, आरती और प्रसाद।': 'Worship of Lord Ram, complete Ramcharit Manas recitation, hymns, aarti and blessings.',
    'बेंगलुरु के सभी क्षेत्रों में परिवार, मंदिर, कम्युनिटी हॉल और सामुदायिक सभाओं में रामचरित मानस पाठ संपन्न किए। भक्ति, ज्ञान और आध्यात्मिक आशीर्वाद सभी को मिलता है।': 'Conducted Ramcharit Manas recitation in families, temples, community halls across Bangalore. All receive devotion, knowledge and spiritual blessings.',
    'संपूर्ण रामचरित मानस को 7 दिन के संक्षिप्त पाठ के रूप में या सांध्य पाठ के 19-21 दिन के पूरे पाठ के रूप में संपन्न किया जा सकता है। प्रत्येक दिन 2-3 घंटे का समय लगता है।': 'Can be completed as 7-day brief recitation or 19-21 day complete evening recitation. Takes 2-3 hours daily.',
    'भक्ति और ज्ञान की प्राप्ति': 'Gaining devotion and knowledge',
    'सद्गुणों का विकास': 'Development of virtues',
    'मोक्ष की प्राप्ति': 'Attainment of salvation',
    
    // Chandi Path
    'चंडी पाठ का महत्व:': 'Chandi Path Importance:',
    'देवी की शक्ति का सबसे बड़ा स्तोत्र। सभी प्रकार के शत्रुओं से रक्षा करता है।': 'Greatest hymn of Goddess power. Protects from all enemies.',
    'देवी पूजा, पाठ, हवन, आरती।': 'Goddess worship, recitation, fire ritual, aarti.',
    'शत्रुओं से रक्षा': 'Protection from enemies',
    'साहस और शक्ति की प्राप्ति': 'Gaining courage and strength',
    'रोगों से मुक्ति': 'Freedom from diseases',
    'सभी प्रकार की सिद्धि': 'All kinds of blessings',
    
    // Kundli Milan
    'कुंडली मिलान का महत्व:': 'Kundli Milan Importance:',
    'विवाह पूर्व अनिवार्य। दोनों परिवारों की compatability check।': 'Essential before marriage. Compatibility check of both families.',
    'कुंडली विश्लेषण, मिलान, परामर्श।': 'Horoscope analysis, matching, consultation.',
    'सुखी वैवाहिक जीवन': 'Happy married life',
    'संतान सुख': 'Children happiness',
    'दोनों परिवारों की खुशी': 'Happiness of both families',
    
    // Panchang Paramarsh
    'पंचांग परामर्श का महत्व:': 'Panchang Consultation Importance:',
    'शुभ कार्यों के लिए सही समय का निर्धारण। जीवन में सफलता का आधार।': 'Determining right time for auspicious works. Foundation of life success.',
    'पंचांग विश्लेषण, मुहूर्त निर्धारण, परामर्श।': 'Panchang analysis, muhurat determination, consultation.',
    'विघ्नों का निवारण': 'Removal of obstacles',
    'सकारात्मक परिणाम': 'Positive results',
    'जीवन में संतुलन': 'Balance in life',
    
    // Bhagwat Katha
    'भागवत कथा का महत्व:': 'Bhagwat Katha Importance:',
    'भक्ति का सर्वोच्च ग्रंथ। कृष्ण जी के जीवन से सीखने वाला पाठ।': 'Supreme scripture of devotion. Lessons from Lord Krishna\'s life.',
    'कृष्ण पूजा, कथा पाठ, भजन, आरती।': 'Krishna worship, story recitation, hymns, aarti.',
    
    // Gallery
    'हमारे कार्य': 'Our Work',
    'हमारे वैदिक पूजा और कथा वाचन कार्यक्रमों के फोटो': 'Photos of our Vedic pooja and katha vachan programs',
    'गृह प्रवेश पूजा': 'Grih Pravesh',
    'रुद्राभिषेक': 'Rudraabhishek',
    'वास्तु शांति पूजा': 'Vastu Shanti',
    'देव नमस्कार': 'Dev Namaskar',
    'अनुष्ठान': 'Anushthan',
    'शिवार्चन': 'Shivarchan',
    
    // Contact section
    'संपर्क करें': 'Contact Us',
    'वैदिक पंडित से संपर्क करें - सभी हिंदू धार्मिक सेवाएं': 'Contact our Vedic Pandit - All Hindu religious services',
    'WhatsApp': 'WhatsApp',
    'विशेषज्ञता': 'Specialization',
    'कर्मकांड • कथा वाचन • ज्योतिष • वास्तु': 'Karma Kanda • Katha Vachan • Jyotish • Vastu',
    'पता': 'Address',
    'अभी संपर्क करें': 'Contact Now',
    'आपके धार्मिक कार्यों को सुचारू रूप से संपन्न करवाने के लिए': 'For smooth completion of your religious works',
    
    // Footer
    '© 2025 आचार्य महेश पंडित जी. सर्वाधिकार सुरक्षित।': '© 2025 Acharya Mahesh Pandit Ji. All rights reserved.',
    'वैदिक परंपरा का सम्मान करते हुए': 'Respecting Vedic traditions',
    
    // Grih Pravesh
    'गृह प्रवेश का महत्व:': 'House Warming\' Importance:',
    'नए घर में प्रवेश से पहले वैदिक पूजा अनिवार्य है। यह घर को पवित्र बनाता है और नकारात्मक ऊर्जा को दूर करता है।': 'Vedic puja is essential before entering a new home. It purifies the house and removes negative energy.',
    'विस्तृत गृह प्रवेश विधि (2.5-3 घंटे):': 'Detailed House Warming Procedure (2.5-3 hours):',
    'चरण 1 - भूमि शोधन:': 'Step 1 - Earth Purification:',
    'घर का गंगाजल से पूरी तरह झाड़ना-पोंछना': 'Complete washing of home with Ganges water',
    'चरण 2 - द्वार पूजन:': 'Step 2 - Door Worship:',
    'मुख्य द्वार पर गणेश, लक्ष्मी का आह्वान': 'Invocation of Ganesha and Lakshmi at the main door',
    'चरण 3 - कलश स्थापना:': 'Step 3 - Pot Installation:',
    'मिट्टी के कलश में आम के पत्तों व नारियल रखकर स्थापन': 'Installing clay pot with mango leaves and coconut',
    'चरण 4 - चार दिशाओं में हवन:': 'Step 4 - Four Direction Fire Rituals:',
    'पूरब, पश्चिम, उत्तर, दक्षिण में अलग-अलग मंत्रों से हवन': 'Fire rituals in East, West, North, South with different mantras',
    'चरण 5 - घर की परिक्रमा:': 'Step 5 - House Circumambulation:',
    'सभी कमरों का दीप से आरती, प्रत्येक कोने में फूल': 'Aarti of all rooms with lamps, flowers in each corner',
    'चरण 6 - रसोई पूजन:': 'Step 6 - Kitchen Worship:',
    'रसोई में अग्नि देव को नमस्कार, घर की पाकशाली का विशेष पूजन': 'Salutation to Fire God in kitchen, special worship of the kitchen',
    'चरण 7 - शांति मंत्र:': 'Step 7 - Peace Mantras:',
    'पूरे घर में सुख-शांति के लिए मंत्र पाठ': 'Chanting mantras for peace and happiness throughout the house',
    'चरण 8 - आरती व दीप:': 'Step 8 - Aarti and Lamps:',
    'सभी को प्रसाद, घर में दीप प्रज्वलन': 'Blessing for all, lighting lamps in the house',
    'गंगाजल, नई मिट्टी का कलश, नारियल, आम के पत्ते, नई बाल्टी, तिल, चावल, नमक, गेहूं, दही, शहद, घी, फूल (गुलाब, गेंदा), दीप, घंटी।': 'Ganges water, new clay pot, coconut, mango leaves, new bucket, sesame, rice, salt, wheat, yogurt, honey, ghee, flowers (roses, marigolds), lamps, bells.',
    'सावधानियां:': 'Precautions:',
    'घर प्रवेश के पहले दिन भूमि में आसन लगाकर सो न सोएं। पहली रात परिवार के साथ घर में रहें। गृह प्रवेश के 1-2 सप्ताह पहले या बाद में नहीं करें।': 'Do not sleep sitting on the ground on the first day of entry. Spend the first night in the house with family. Should not be done 1-2 weeks before or after.',
    'क्षेत्र विशेष अनुभव:': 'Area-Specific Experience:',
    'Whitefield, Electronic City, Koramangala, Jayanagar, Indiranagar - सभी कॉलोनियों में 250+ नए घरों में पूजा संपन्न किए।': 'Conducted pujas in 250+ new homes across Whitefield, Electronic City, Koramangala, Jayanagar, Indiranagar.',
    'परिणाम:': 'Results:',
    'पहली रात ही घर की ऊर्जा बदल जाती है, परिवार को शांति और खुशहाली मिलती है, सदस्यों का स्वास्थ्य अच्छा रहता है।': 'House energy changes from the first night, family gets peace and happiness, members stay healthy.',
    'घर में सुख-समृद्धि': 'Happiness and prosperity at home',
    'परिवार की रक्षा': 'Family protection',
    'नकारात्मक ऊर्जा का निवारण': 'Removal of negative energy',
    'दीर्घायु और स्वास्थ्य': 'Longevity and health',
};


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
    document.documentElement.dir = 'ltr';

    // Universal translator for all elements with data-hi and data-en attributes
    translateAllElements();
    
    // Translate detailed service content
    translateServiceDetails();
}

function translateAllElements() {
    // Get the language key to use (hi or en)
    const langKey = 'data-' + currentLanguage;
    
    // Find all elements with language data attributes
    const allElements = document.querySelectorAll('[data-hi], [data-en]');
    
    allElements.forEach(el => {
        const translation = el.getAttribute(langKey);
        if (translation) {
            // For elements with only text content (no child elements), use textContent
            // For elements with HTML content, we need to be more careful
            if (el.children.length === 0) {
                // Simple text element
                el.textContent = translation;
            } else {
                // Element has children - check if it's a leaf element or has mixed content
                const hasOnlyTextNodes = Array.from(el.childNodes).every(node => node.nodeType === Node.TEXT_NODE || node.nodeType === Node.COMMENT_NODE);
                if (hasOnlyTextNodes) {
                    el.textContent = translation;
                }
                // Otherwise, don't replace to preserve child elements
            }
        }
    });
    
    // Special handling for hero title spans
    const vedicSpan = document.querySelector('.vedic-text');
    const modernSpan = document.querySelector('.modern-text');
    
    if (vedicSpan && vedicSpan.hasAttribute(langKey)) {
        vedicSpan.textContent = vedicSpan.getAttribute(langKey);
    }
    if (modernSpan && modernSpan.hasAttribute(langKey)) {
        modernSpan.textContent = modernSpan.getAttribute(langKey);
    }
    
    // Translate all "और पढ़ें" / "Read More" buttons
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(btn => {
        btn.textContent = currentLanguage === 'hi' ? 'और पढ़ें' : 'Read More';
    });
    
    // Translate all service contact buttons
    const serviceContactButtons = document.querySelectorAll('.service-contact-btn');
    serviceContactButtons.forEach(btn => {
        btn.textContent = currentLanguage === 'hi' ? 'संपर्क करें' : 'Contact Us';
    });
    
    // Translate CTA buttons with icons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        if (btn.hasAttribute('data-hi')) {
            const text = btn.getAttribute(langKey);
            const iconMatch = btn.innerHTML.match(/<span>.*?<\/span>/);
            if (iconMatch) {
                btn.innerHTML = iconMatch[0] + ' ' + text;
            } else {
                btn.textContent = text;
            }
        }
    });
    
    // Update title and logo elements specifically
    const navLogoTitle = document.querySelector('.nav-logo .nav-title');
    if (navLogoTitle && navLogoTitle.hasAttribute(langKey)) {
        navLogoTitle.textContent = navLogoTitle.getAttribute(langKey);
    }
    
    const footerLogoTitle = document.querySelector('.footer-logo .footer-title');
    if (footerLogoTitle && footerLogoTitle.hasAttribute(langKey)) {
        footerLogoTitle.textContent = footerLogoTitle.getAttribute(langKey);
    }
}

function translateServiceDetails() {
    // Translate the detailed service card content
    const serviceDetails = document.querySelectorAll('.service-details');
    
    serviceDetails.forEach(detail => {
        // Translate all text nodes recursively
        walkAndTranslateNodes(detail);
    });
}

function walkAndTranslateNodes(node) {
    // Process text nodes
    Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            // Translate text for this node
            child.textContent = translateText(child.textContent);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            // For element nodes, process recursively
            walkAndTranslateNodes(child);
        }
    });
}

function translateText(text) {
    if (!text) return text;
    
    let translatedText = text;
    
    if (currentLanguage === 'en') {
        // Translate from Hindi to English
        Object.entries(contentTranslations).forEach(([hindi, english]) => {
            const regex = new RegExp('\\b' + hindi.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
            translatedText = translatedText.replace(regex, english);
        });
    } else {
        // Translate from English to Hindi (reverse mapping)
        Object.entries(contentTranslations).forEach(([hindi, english]) => {
            const regex = new RegExp('\\b' + english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
            translatedText = translatedText.replace(regex, hindi);
        });
    }
    
    return translatedText;
}

function updateLanguageButton() {
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        const flag = currentLanguage === 'hi' ? '🇮🇳' : '🇺🇸';
        const text = currentLanguage === 'hi' ? 'EN' : 'HI';
        languageToggle.innerHTML = '<span>' + flag + '</span> ' + text;
    }
}

// Initialize language system
function initializeLanguageSystem() {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'hi' || savedLanguage === 'en')) {
        currentLanguage = savedLanguage;
    } else {
        // Default to English
        currentLanguage = 'en';
        localStorage.setItem('preferredLanguage', 'en');
    }

    initializeLanguageToggle();
    updateLanguage();
}

// Call language initialization at page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language system immediately when DOM is content loaded
    initializeLanguageSystem();
});

// Console welcome message
console.log(`
🕉️ आचार्य महेश पंडित जी का Portfolio Website
✨ Modern Vedic Design with Ancient Wisdom
📱 WhatsApp: +91 7676457013 | +91 7464923758
🌐 Built with HTML, CSS, JavaScript
🌍 Multi-language Support: Hindi & English
`);
