document.addEventListener('DOMContentLoaded', () => {
    
    // --- Performance-Optimized Parallax Tick Engine ---
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                execParallax();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    function execParallax() {
        const scrollTop = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg img');
        // Runs calculations only while hero segment is physically occupying viewport frames
        if (heroBg && scrollTop < window.innerHeight) {
            heroBg.style.transform = `scale(${1.05 + (scrollTop * 0.00012)}) translateY(${scrollTop * 0.18}px)`;
        }
    }

    // --- Intersection Observer Core Architecture (Scroll Reveals) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Cleans up overhead memory channels
            }
        });
    }, {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Lightbox Core Logic System (Responsive Asset Inspection) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetImg = item.querySelector('img');
            if (!targetImg) return;

            const imgSrc = targetImg.getAttribute('src');
            const imgAlt = targetImg.getAttribute('alt');
            
            lightboxImg.setAttribute('src', imgSrc);
            lightboxImg.setAttribute('alt', imgAlt);
            lightbox.style.display = 'flex'; // Flexbox matches perfectly centered viewport profiles
            document.body.style.overflow = 'hidden'; // Completely eliminates trace scroll jumping bugs
        });
    });

    const dropLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        lightboxImg.setAttribute('src', ''); // Flushes browser layout paint memory profiles safely
    };

    closeLightbox.addEventListener('click', dropLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            dropLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            dropLightbox();
        }
    });
});
