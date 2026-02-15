// ========== Mobile menu toggle ==========
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileBtn && navMenu) {
  mobileBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    mobileBtn.classList.toggle('open');
  });

  // Close menu when a nav link is clicked (mobile UX)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileBtn.classList.remove('open');
    });
  });
}

// ========== Active nav link while scrolling ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const setActiveLink = (id) => {
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
  });
};

if (sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  }, { threshold: 0.6 });

  sections.forEach(sec => observer.observe(sec));
}

// ========== Contact form -> WhatsApp ==========
const contactForm = document.getElementById('contactForm');

// PUT YOUR WHATSAPP NUMBER HERE (with country code, no +, no spaces)
// Example India: 919876543210
const WHATSAPP_NUMBER = "919876543210";

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const service = document.getElementById('service')?.value;
    const message = document.getElementById('message')?.value.trim();

if (name.trim() === "" || email.trim() === "" || phone.trim() === "" || service === "" || message.trim() === "") {
    alert("Please fill all fields properly.");
    return;
}

    // Basic validation
    if (!name || !email || !phone || !service || !message) {
      alert("Please fill all fields.");
      return;
    }

    // Optional: make service label nicer
    const serviceLabelMap = {
      "general": "General Dentistry",
      "cosmetic": "Cosmetic Dentistry",
      "root-canal": "Root Canal Treatment",
      "orthodontics": "Orthodontics",
      "implants": "Dental Implants",
      "pediatric": "Pediatric Dentistry",
      "surgery": "Oral Surgery",
      "emergency": "Emergency Care"
    };

    const serviceNice = serviceLabelMap[service] || service;

    const text =
`New Appointment Request - Ekdanta Clinic
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${serviceNice}
Message: ${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp with prefilled message
    window.open(url, "_blank", "noopener,noreferrer");

    // Optional: reset form after opening WhatsApp
    contactForm.reset();
  });
}


// ==================== 
// Smooth Scrolling for Navigation Links
// ==================== 
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 
// Contact Form Submission
// ==================== 
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your appointment request! We will contact you shortly.');
    
    // Reset form
    contactForm.reset();
});

// ==================== 
// Scroll to Top Button (Optional Enhancement)
// ==================== 
// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color, #0d9488);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 1.2rem;
`;
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top when button clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll to top button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.background = 'var(--secondary-color, #14b8a6)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.background = 'var(--primary-color, #0d9488)';
});

// ==================== 
// Intersection Observer for Animation on Scroll
// ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .team-card, .testimonial-card, .stat-card, .feature-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ==================== 
// Add loading state to page
// ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
