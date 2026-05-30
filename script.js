document.addEventListener('DOMContentLoaded', () => {
    
    // --- Apple Scroll Effect Mimicry (Smooth Momentum Inbound Handling) ---
    // Smooths programmatic anchor changes and ensures performance overhead is minimal
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScrollAnimations();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });


    // --- Intersection Observer Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once element is shown to maintain smooth memory allocation
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    function handleScrollAnimations() {
        // Fallback checks for older mobile browser engines
        const scrollTop = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg img');
        if (heroBg && scrollTop < window.innerHeight) {
            heroBg.style.transform = `scale(${1.05 + (scrollTop * 0.00015)}) translateY(${scrollTop * 0.2}px)`;
        }
    }


    // --- Lightbox Image Viewer System (Prevents Mobile Image Crop Overflows) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            const imgAlt = item.querySelector('img').getAttribute('alt');
            
            lightboxImg.setAttribute('src', imgSrc);
            lightboxImg.setAttribute('alt', imgAlt);
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Stop background jump scroll on mobile
        });
    });

    const exitLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    };

    closeLightbox.addEventListener('click', exitLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            exitLightbox();
        }
    });

    // Handle Escape Key to exit lightbox safely
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            exitLightbox();
        }
    });
});
