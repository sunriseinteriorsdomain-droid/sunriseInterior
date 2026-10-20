window.addEventListener('scroll', () => {
    const header = document.getElementById('global-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg', 'scrolled');
        } else {
            header.classList.remove('shadow-lg', 'scrolled');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const desktopNav = document.querySelector('#global-header nav');
    const mobileMenu = document.getElementById('mobile-menu');
    const reviewTrack = document.querySelector('.review-marquee-track');
    const reviewGroup = reviewTrack && reviewTrack.querySelector('.client-review-group');

    if (reviewTrack && reviewGroup && !reviewTrack.querySelector(':scope > .client-review-group[aria-hidden="true"]')) {
        const duplicateReviewGroup = reviewGroup.cloneNode(true);
        duplicateReviewGroup.setAttribute('aria-hidden', 'true');
        reviewTrack.appendChild(duplicateReviewGroup);
    }

    function bindDropdown(wrapper) {
        const trigger = wrapper.querySelector('.gallery-menu-trigger');

        function setOpen(isOpen, dismissed = false) {
            wrapper.classList.toggle('is-open', isOpen);
            wrapper.classList.toggle('is-collapsed', dismissed);
            trigger.setAttribute('aria-expanded', String(isOpen));
        }

        trigger.addEventListener('click', () => {
            const isFinePointerHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
                && wrapper.matches(':hover');
            const shouldOpen = isFinePointerHover || !wrapper.classList.contains('is-open');
            setOpen(shouldOpen, !shouldOpen);
        });

        trigger.addEventListener('focus', () => {
            if (!wrapper.classList.contains('is-collapsed')) setOpen(true);
        });
        wrapper.addEventListener('pointerenter', (event) => {
            if (event.pointerType === 'mouse') setOpen(true);
        });
        wrapper.addEventListener('pointerleave', () => {
            if (!wrapper.contains(document.activeElement)) setOpen(false);
        });
        wrapper.addEventListener('focusin', () => {
            if (!wrapper.classList.contains('is-collapsed')) setOpen(true);
        });
        wrapper.addEventListener('focusout', (event) => {
            if (!wrapper.contains(event.relatedTarget) && !wrapper.matches(':hover')) {
                wrapper.classList.remove('is-collapsed');
                setOpen(false);
            }
        });
        wrapper.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape' || !wrapper.classList.contains('is-open')) return;
            event.preventDefault();
            setOpen(false, true);
            trigger.focus();
        });
    }

    function createGalleryMenu() {
        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-menu';
        wrapper.innerHTML = `<button type="button" class="gallery-menu-trigger font-button text-button uppercase text-warm-ivory/80 hover:text-warm-ivory transition-colors" aria-expanded="false" aria-haspopup="true" aria-controls="gallery-menu-panel">Gallery <span class="material-symbols-outlined">expand_more</span></button><div id="gallery-menu-panel" class="gallery-menu-panel"><a href="image-gallery.html">Image Gallery</a><a href="video-gallery.html">Video Gallery</a></div>`;
        const trigger = wrapper.querySelector('.gallery-menu-trigger');
        if (window.location.pathname.includes('image-gallery') || window.location.pathname.includes('video-gallery')) {
            trigger.classList.add('gallery-active');
        }
        bindDropdown(wrapper);
        return wrapper;
    }

    function createServicesMenu() {
        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-menu services-menu';
        const servicePages = [
            'modular-kitchen-bangalore',
            'modular-wardrobe-bangalore',
            'living-and-dining-bangalore',
            'home-interiors-bangalore',
            'services'
        ];
        const isServicePage = servicePages.some((p) => window.location.pathname.includes(p));
        wrapper.innerHTML = `<button type="button" class="gallery-menu-trigger font-button text-button uppercase text-warm-ivory/80 hover:text-warm-ivory transition-colors${isServicePage ? ' gallery-active' : ''}" aria-expanded="false" aria-haspopup="true" aria-controls="services-menu-panel">Services <span class="material-symbols-outlined">expand_more</span></button><div id="services-menu-panel" class="gallery-menu-panel services-menu-panel"><div class="services-menu-heading"><span></span>Services<span></span></div><a href="modular-kitchen-bangalore.html">Modular Kitchen</a><a href="modular-wardrobe-bangalore.html">Modular Wardrobe</a><a href="living-and-dining-bangalore.html">Living And Dining</a><a href="home-interiors-bangalore.html">Home Interiors</a></div>`;
        bindDropdown(wrapper);
        return wrapper;
    }

    if (desktopNav && !desktopNav.querySelector('.services-menu')) {
        const servicesLink = desktopNav.querySelector('[data-path="services"]');
        if (servicesLink) {
            desktopNav.insertBefore(createServicesMenu(), servicesLink);
            servicesLink.remove();
        }
    }

    if (desktopNav && !desktopNav.querySelector('.gallery-menu:not(.services-menu)')) {
        desktopNav.insertBefore(createGalleryMenu(), desktopNav.querySelector('[data-path="contact"]'));
    }

    if (mobileMenu && !mobileMenu.querySelector('.mobile-services-links')) {
        const serviceLinks = document.createElement('div');
        serviceLinks.className = 'mobile-services-links flex flex-col items-center gap-4';
        serviceLinks.innerHTML = '<span class="font-label-caps text-label-caps uppercase text-dream-amber">Services</span><a href="modular-kitchen-bangalore.html" class="font-button text-xl uppercase text-warm-ivory hover:text-dream-amber transition-colors">Modular Kitchen</a><a href="modular-wardrobe-bangalore.html" class="font-button text-xl uppercase text-warm-ivory hover:text-dream-amber transition-colors">Modular Wardrobe</a><a href="living-and-dining-bangalore.html" class="font-button text-xl uppercase text-warm-ivory hover:text-dream-amber transition-colors">Living And Dining</a><a href="home-interiors-bangalore.html" class="font-button text-xl uppercase text-warm-ivory hover:text-dream-amber transition-colors">Home Interiors</a><a href="services.html" class="font-button text-lg uppercase text-warm-ivory/70 hover:text-dream-amber transition-colors">All Services</a>';
        const aboutLink = mobileMenu.querySelector('a[href="about.html"]');
        const servicesMobile = mobileMenu.querySelector('a[href="services.html"]');
        if (servicesMobile) servicesMobile.remove();
        mobileMenu.insertBefore(serviceLinks, aboutLink || mobileMenu.querySelector('a[href="book_a_quote.html"]'));
    }

    if (mobileMenu && !mobileMenu.querySelector('.mobile-gallery-links')) {
        const links = document.createElement('div');
        links.className = 'mobile-gallery-links flex flex-col items-center gap-4';
        links.innerHTML = '<span class="font-label-caps text-label-caps uppercase text-dream-amber">Gallery</span><a href="image-gallery.html" class="font-button text-xl uppercase text-warm-ivory hover:text-dream-amber transition-colors">Image Gallery</a><a href="video-gallery.html" class="font-button text-xl uppercase text-warm-ivory hover:text-dream-amber transition-colors">Video Gallery</a>';
        mobileMenu.insertBefore(links, mobileMenu.querySelector('a[href="book_a_quote.html"]'));
    }

    const heroSlides = document.querySelectorAll('.hero-slide');

    if (heroSlides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let activeSlide = 0;

        setInterval(() => {
            heroSlides[activeSlide].classList.remove('is-active');
            activeSlide = (activeSlide + 1) % heroSlides.length;
            heroSlides[activeSlide].classList.add('is-active');
        }, 5000);
    }

    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (statNumbers.length && 'IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const number = entry.target;
                const target = Number(number.dataset.target);
                const suffix = number.dataset.suffix || (target >= 1000 ? '+' : '');
                const start = performance.now();

                function render(now) {
                    const progress = Math.min((now - start) / 800, 1);
                    const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
                    number.textContent = `${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}${suffix}`;
                    if (progress < 1) requestAnimationFrame(render);
                }

                requestAnimationFrame(render);
                observer.unobserve(number);
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(number => statObserver.observe(number));
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuBtn && mobileMenuClose && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.remove('translate-x-full');
            }, 10);
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 500);
            document.body.style.overflow = '';
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const openBtns = document.querySelectorAll('#open-enquiry-modal, .open-enquiry-modal, [data-open-enquiry-modal]');
    const closeBtn = document.getElementById('close-enquiry-modal');
    const backdrop = document.getElementById('enquiry-modal-backdrop');
    const modal = document.getElementById('enquiry-modal');
    const modalContent = document.getElementById('enquiry-modal-content');
    const form = document.getElementById('enquiry-form');
    const successMsg = document.getElementById('enquiry-success');
    const submitBtn = document.getElementById('enquiry-submit-btn');

    // Multi-step elements
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const nextBtn = document.getElementById('next-step-btn');
    const prevBtn = document.getElementById('prev-step-btn');
    const stepIndicator = document.getElementById('step-indicator');
    const progressCircle = document.getElementById('progress-circle');

    // Form inputs step 1
    const nameInput = document.getElementById('enq-name');
    const mobileInput = document.getElementById('enq-mobile');
    const emailInput = document.getElementById('enq-email');
    const typeInput = document.getElementById('enq-type');

    if (mobileInput) {
        mobileInput.setAttribute('pattern', '[0-9]{10}');
        mobileInput.setAttribute('maxlength', '10');
        mobileInput.setAttribute('title', 'Please enter exactly 10 digits');
        mobileInput.setAttribute('inputmode', 'numeric');
    }
    if (nameInput) {
        nameInput.setAttribute('minlength', '2');
    }

    let enquirySubmitting = false;

    function resetModal() {
        if (step1 && step2) {
            step1.classList.remove('hidden', 'opacity-0', '-translate-x-8');
            step1.classList.add('flex');

            step2.classList.add('hidden', 'opacity-0', 'translate-x-8');
            step2.classList.remove('flex');

            if (stepIndicator) stepIndicator.innerText = '1/2';
            if (progressCircle) progressCircle.setAttribute('stroke-dasharray', '50, 100');
        }
        if (form) {
            form.reset();
            enquirySubmitting = false;
            if (successMsg) {
                successMsg.classList.add('hidden');
                successMsg.classList.remove('flex');
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('hidden');
            }
        }
    }

    function openModal(e) {
        if (e) e.preventDefault();
        if (!modal) return;
        resetModal();
        modal.classList.remove('hidden', 'is-closing');
        modal.classList.add('flex');
        modalContent.classList.remove('is-closing');

        // Force reflow
        void modal.offsetWidth;

        modal.classList.add('is-open');
        modalContent.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        modalContent.classList.remove('is-open');

        modal.classList.add('is-closing');
        modalContent.classList.add('is-closing');

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex', 'is-closing');
            modalContent.classList.remove('is-closing');
            document.body.style.overflow = '';
        }, 450); // match duration of closing animation
    }

    // Handle Next Button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Validate step 1 fields
            let isValid = true;
            [nameInput, mobileInput, emailInput, typeInput].forEach(input => {
                if (input && !input.checkValidity()) {
                    input.reportValidity();
                    isValid = false;
                }
            });

            if (isValid) {
                // Transition to Step 2
                step1.classList.add('opacity-0', '-translate-x-8');
                setTimeout(() => {
                    step1.classList.add('hidden');
                    step1.classList.remove('flex');

                    step2.classList.remove('hidden');
                    step2.classList.add('flex');
                    void step2.offsetWidth;
                    step2.classList.remove('opacity-0', 'translate-x-8');

                    if (stepIndicator) stepIndicator.innerText = '2/2';
                    if (progressCircle) progressCircle.setAttribute('stroke-dasharray', '100, 100');
                }, 300);
            }
        });
    }

    // Handle Prev Button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            step2.classList.add('opacity-0', 'translate-x-8');
            setTimeout(() => {
                step2.classList.add('hidden');
                step2.classList.remove('flex');

                step1.classList.remove('hidden');
                step1.classList.add('flex');
                void step1.offsetWidth;
                step1.classList.remove('opacity-0', '-translate-x-8');

                if (stepIndicator) stepIndicator.innerText = '1/2';
                if (progressCircle) progressCircle.setAttribute('stroke-dasharray', '50, 100');
            }, 300);
        });
    }


    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    if (openBtns.length > 0) {
        openBtns.forEach(btn => btn.addEventListener('click', openModal));
    }
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (enquirySubmitting) return;

            const name = document.getElementById('enq-name').value.trim();
            const mobile = document.getElementById('enq-mobile').value.trim();
            const email = document.getElementById('enq-email').value.trim();
            const type = document.getElementById('enq-type').value;
            const budget = document.getElementById('enq-budget').value;
            const loc = document.getElementById('enq-location').value;
            const msg = document.getElementById('enq-message').value.trim();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            enquirySubmitting = true;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('hidden');
            }
            successMsg.classList.remove('hidden');
            successMsg.classList.add('flex');

            try {
                let waNumber = '919880522277';

                const textTemplate = `*New Design Enquiry*\n\n*Name:* ${name}\n*Mobile:* ${mobile}\n*Email:* ${email}\n*Project Type:* ${type}\n*Location:* ${loc}\n*Budget:* ${budget}\n*Requirements:* ${msg ? msg : 'N/A'}`;

                const encodedText = encodeURIComponent(textTemplate);
                const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

                setTimeout(() => {
                    window.open(waUrl, '_blank');
                    setTimeout(() => closeModal(), 2000);
                }, 1000);
            } catch (err) {
                console.error("Failed to open WhatsApp", err);
                enquirySubmitting = false;
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('hidden');
                }
                successMsg.classList.add('hidden');
                successMsg.classList.remove('flex');
                const fallbackUrl = `https://wa.me/919880522277?text=${encodeURIComponent('New Enquiry: ' + name)}`;
                window.open(fallbackUrl, '_blank');
            }
        });
    }

    // Auto-open logic
    setTimeout(() => {
        const navEntry = performance.getEntriesByType("navigation")[0];
        const isReload = navEntry && navEntry.type === 'reload';
        const hasOpened = sessionStorage.getItem('popupAutoOpened');

        // Open if it's a reload OR if it hasn't been opened yet in this session
        if (isReload || !hasOpened) {
            openModal();
            sessionStorage.setItem('popupAutoOpened', 'true');
        }
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {

    // Floating WhatsApp logic
    const waFloatingBtns = document.querySelectorAll('.whatsapp-floating-btn');
    waFloatingBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                let waNumber = '919880522277';
                const waUrl = `https://wa.me/${waNumber}?text=Hi`;
                window.open(waUrl, '_blank');
            } catch (err) {
                window.open('https://wa.me/919880522277?text=Hi', '_blank');
            }
        });
    });

    // Deferred background videos — load after first paint when visible
    const deferredVideos = document.querySelectorAll('video.deferred-bg-video[data-src]');
    if (deferredVideos.length) {
        const loadVideo = (video) => {
            if (video.dataset.loaded === '1') return;
            const src = video.dataset.src;
            if (!src) return;
            video.dataset.loaded = '1';
            const source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';
            video.appendChild(source);
            video.load();
            const play = () => video.play().catch(() => {});
            if (video.readyState >= 2) play();
            else video.addEventListener('loadeddata', play, { once: true });
        };

        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadVideo(entry.target);
                        io.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '120px' });
            deferredVideos.forEach((v) => io.observe(v));
        } else {
            deferredVideos.forEach(loadVideo);
        }
    }

});
