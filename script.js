document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    animateElements.forEach(el => observer.observe(el));

    // 3. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Robust WhatsApp Form Submission
    document.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        
        const formData = new FormData(form);
        let message = `New Inquiry from H2R Developers Website:\n\n`;
        
        formData.forEach((value, key) => {
            if (value && value.trim() !== "") {
                message += `*${key}*: ${value}\n`;
            }
        });
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = "919310548694";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        alert('Opening WhatsApp to send your inquiry...');
        form.reset();
    });

    // 5. Mobile Nav Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    // 6. Promotional Slider Logic
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slidesContainer && slides.length > 0) {
        let currentIndex = 0;
        
        function updateSlider() {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            });
        }
        
        // Auto-slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 5000);
    }
});

// Add keyframes for mobile menu via JS
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0px); }
    }
    .toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
    .toggle .line2 { opacity: 0; }
    .toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }
    
    #navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        padding: 5px 0;
    }
`;
document.head.appendChild(style);
