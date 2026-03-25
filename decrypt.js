class DecryptedText {
    constructor(el, options = {}) {
        this.el = el;
        this.text = el.textContent;
        this.speed = options.speed ?? 35;
        this.revealDirection = options.revealDirection ?? 'start';
        this.characters = (options.characters ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789').split('');
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
        return revealed.size;
    }

    _renderTo(container, revealed) {
        container.innerHTML = this.text
            .split('')
            .map((char, i) => {
                if (char === ' ') return ' ';
                const done = revealed.has(i);
                return `<span class="${done ? 'dt-char' : 'dt-enc'}">${done ? char : this._rand()}</span>`;
            })
            .join('');
    }

    animate() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Placeholder invisibile: mantiene l'altezza originale dell'elemento intatta
        this.el.innerHTML =
            `<span class="dt-placeholder" aria-hidden="true">${this.text}</span>`;

        // Overlay assoluto: ci anima sopra senza toccare il layout
        const overlay = document.createElement('span');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.className = 'dt-overlay';
        this.el.style.position = 'relative';
        this.el.appendChild(overlay);

        const revealed = new Set();
        this._renderTo(overlay, revealed);

        const tick = setInterval(() => {
            if (revealed.size >= this.text.length) {
                clearInterval(tick);
                this.isAnimating = false;
                this.el.style.position = '';
                this.el.textContent = this.text;
                return;
            }
            revealed.add(this._getNextIndex(revealed));
            this._renderTo(overlay, revealed);
        }, this.speed);
    }

    _init() {
        if (!('IntersectionObserver' in window)) return;
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
