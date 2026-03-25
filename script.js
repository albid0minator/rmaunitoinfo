if (typeof lucide !== "undefined") lucide.createIcons();

const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
const backTop = document.getElementById("back-top");
const copyLinkBtn = document.getElementById("copy-link-btn");

if (menuToggle && menuLinks) {
    menuToggle.addEventListener("click", () => {
        const open = menuLinks.classList.toggle("is-open");
        // Simple toggle for mobile menu
        if (open) {
            menuLinks.style.display = "flex";
            menuLinks.style.flexDirection = "column";
            menuLinks.style.position = "absolute";
            menuLinks.style.top = "100%";
            menuLinks.style.left = "0";
            menuLinks.style.right = "0";
            menuLinks.style.background = "#161b22";
            menuLinks.style.padding = "1rem";
            menuLinks.style.borderBottom = "1px solid #30363d";
        } else {
            menuLinks.style.display = "none";
        }
        menuToggle.setAttribute("aria-expanded", String(open));
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 860) {
            menuLinks.classList.remove("is-open");
            menuLinks.style.display = "flex";
            menuLinks.style.flexDirection = "";
            menuLinks.style.position = "";
            menuLinks.style.top = "";
            menuLinks.style.left = "";
            menuLinks.style.right = "";
            menuLinks.style.background = "";
            menuLinks.style.padding = "";
            menuLinks.style.borderBottom = "";
            menuToggle.setAttribute("aria-expanded", "false");
        } else if (!menuLinks.classList.contains("is-open")) {
            menuLinks.style.display = "none";
        }
    });
}

if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", async () => {
        const pageUrl = window.location.href;
        try {
            await navigator.clipboard.writeText(pageUrl);
            copyLinkBtn.textContent = "Link copiato";
        } catch (error) {
            copyLinkBtn.textContent = "Errore";
        }
        window.setTimeout(() => {
            copyLinkBtn.textContent = "Condividi questa pagina";
        }, 1600);
    });
}

// --- DecryptedText ---
class DecryptedText {
    constructor(el, options = {}) {
        this.el = el;
        this.text = el.textContent;
        this.speed = options.speed ?? 35;
        this.sequential = options.sequential ?? true;
        this.revealDirection = options.revealDirection ?? 'start';
        this.characters = (options.characters ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>[]{}').split('');
        this.hasAnimated = false;
        this.isAnimating = false;
        this._init();
    }

    _rand() {
        return this.characters[Math.floor(Math.random() * this.characters.length)];
    }

    _getNextIndex(revealed) {
        const len = this.text.length;
        if (this.revealDirection === 'end') return len - 1 - revealed.size;
        if (this.revealDirection === 'center') {
            const mid = Math.floor(len / 2);
            const off = Math.floor(revealed.size / 2);
            const idx = revealed.size % 2 === 0 ? mid + off : mid - off - 1;
            if (idx >= 0 && idx < len && !revealed.has(idx)) return idx;
            for (let i = 0; i < len; i++) if (!revealed.has(i)) return i;
        }
        return revealed.size; // 'start' default
    }

    _render(revealed) {
        this.el.innerHTML = this.text
            .split('')
            .map((char, i) => {
                if (char === ' ') return '<span> </span>';
                const isRevealed = revealed.has(i);
                return `<span class="${isRevealed ? 'dt-char' : 'dt-enc'}">${isRevealed ? char : this._rand()}</span>`;
            })
            .join('');
    }

    animate() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        const revealed = new Set();
        this._render(revealed);

        const tick = setInterval(() => {
            if (revealed.size >= this.text.length) {
                clearInterval(tick);
                this.isAnimating = false;
                this.el.textContent = this.text;
                return;
            }
            revealed.add(this._getNextIndex(revealed));
            this._render(revealed);
        }, this.speed);
    }

    _init() {
        if (!('IntersectionObserver' in window)) { return; }
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animate();
                    obs.unobserve(this.el);
                }
            });
        }, { threshold: 0.2 });
        obs.observe(this.el);
    }
}

const heroEyebrow = document.querySelector('.hero .eyebrow');
const heroH1 = document.querySelector('h1');
if (heroEyebrow) new DecryptedText(heroEyebrow, { speed: 30, revealDirection: 'start' });
if (heroH1) new DecryptedText(heroH1, { speed: 28, revealDirection: 'start' });

// Reveal Observer
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-inview");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
}

const carouselTrack = document.getElementById("sede-carousel-track");
if (carouselTrack) {
    const slides = Array.from(carouselTrack.querySelectorAll(".sede-slide"));
    const carousel = carouselTrack.closest(".sede-carousel");
    const prevBtn = carousel?.querySelector(".carousel-prev");
    const nextBtn = carousel?.querySelector(".carousel-next");
    const dots = Array.from(carousel?.querySelectorAll(".carousel-dot") ?? []);
    let activeIndex = 0;
    let touchStartX = null;

    const updateCarousel = (index) => {
        if (slides.length === 0) return;
        const boundedIndex = (index + slides.length) % slides.length;
        activeIndex = boundedIndex;
        carouselTrack.style.transform = `translateX(-${boundedIndex * 100}%)`;
        carouselTrack.style.transition = "transform 0.35s ease";

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("is-active", slideIndex === boundedIndex);
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("is-active", dotIndex === boundedIndex);
        });
    };

    prevBtn?.addEventListener("click", () => updateCarousel(activeIndex - 1));
    nextBtn?.addEventListener("click", () => updateCarousel(activeIndex + 1));

    dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => updateCarousel(dotIndex));
    });

    carouselTrack.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0]?.clientX ?? null;
    }, { passive: true });

    carouselTrack.addEventListener("touchend", (event) => {
        if (touchStartX === null) return;
        const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > 40) {
            if (deltaX < 0) updateCarousel(activeIndex + 1);
            else updateCarousel(activeIndex - 1);
        }
        touchStartX = null;
    }, { passive: true });

    updateCarousel(0);
}
