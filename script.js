// ===== Settings =====
// Contact form messages are delivered to this inbox by FormSubmit (formsubmit.co).
// The very first message sends an activation email to this address. Click
// "Activate Form" in that email once, and every message after that arrives normally.
const CONTACT_EMAIL = 'sanjitashakya1@gmail.com';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

// Safe wrappers: localStorage can throw in private mode or some browsers.
const storage = {
    get(key) {
        try { return localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
        try { localStorage.setItem(key, value); } catch { /* ignore */ }
    }
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== Light / dark theme =====
class ThemeManager {
    constructor() {
        // Always open in dark mode. Light mode is only used while the
        // visitor has switched to it; it is not remembered for next time.
        this.theme = 'dark';
        this.icon = document.getElementById('themeIcon');
        this.setTheme(this.theme);
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
        });
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        this.icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ===== Animated particle background in the hero =====
// Colours are picked per theme so the network glows on dark backgrounds
// and stays soft on light ones. Particles also react to the mouse.
const PARTICLE_THEMES = {
    light: {
        colors: ['#6366f1', '#8b5cf6', '#7c3aed'],
        line: '99, 102, 241',
        lineAlpha: 0.32,
        glow: 0,
        sizeScale: 1.3,
        opacityBoost: 0.12
    },
    dark: {
        colors: ['#a5b4fc', '#c4b5fd', '#67e8f9'],
        line: '165, 180, 252',
        lineAlpha: 0.28,
        glow: 8,
        sizeScale: 1,
        opacityBoost: 0
    }
};

class CanvasAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.mouse = { x: null, y: null };
        this.linkDistance = 130;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // The canvas is fixed behind the page, so mouse position = window position
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        }, { passive: true });
        document.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        this.start();
    }

    get theme() {
        return PARTICLE_THEMES[document.documentElement.getAttribute('data-theme')] || PARTICLE_THEMES.light;
    }

    resize() {
        // Draw at the screen's real pixel density so dots stay crisp
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const oldWidth = this.width;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // Only re-scatter the dots when the width changes (phones change
        // height while scrolling as the address bar hides and shows)
        if (this.width !== oldWidth || this.particles.length === 0) this.createParticles();
        if (!this.animationId) this.draw();
    }

    createParticles() {
        const count = Math.min(80, Math.max(30, Math.floor((this.width * this.height) / 16000)));
        this.particles = Array.from({ length: count }, () => ({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.4,
            colorIndex: Math.floor(Math.random() * 3)
        }));
    }

    update() {
        for (const p of this.particles) {
            // Gently push particles away from the cursor
            if (this.mouse.x !== null) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 120 && dist > 0) {
                    const force = (120 - dist) / 120 * 0.6;
                    p.x += (dx / dist) * force;
                    p.y += (dy / dist) * force;
                }
            }
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > this.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.height) p.vy *= -1;
            p.x = Math.max(0, Math.min(this.width, p.x));
            p.y = Math.max(0, Math.min(this.height, p.y));
        }
    }

    draw() {
        const { ctx } = this;
        const theme = this.theme;
        const max = this.linkDistance;
        ctx.clearRect(0, 0, this.width, this.height);

        // Lines: stronger when particles are closer
        ctx.lineWidth = 1;
        for (let i = 0; i < this.particles.length; i++) {
            const a = this.particles[i];
            for (let j = i + 1; j < this.particles.length; j++) {
                const b = this.particles[j];
                const dist = Math.hypot(a.x - b.x, a.y - b.y);
                if (dist < max) {
                    ctx.strokeStyle = `rgba(${theme.line}, ${(1 - dist / max) * theme.lineAlpha})`;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
            // Link to the cursor
            if (this.mouse.x !== null) {
                const dist = Math.hypot(a.x - this.mouse.x, a.y - this.mouse.y);
                if (dist < 180) {
                    ctx.strokeStyle = `rgba(${theme.line}, ${(1 - dist / 180) * theme.lineAlpha * 2})`;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(this.mouse.x, this.mouse.y);
                    ctx.stroke();
                }
            }
        }

        // Dots, with a soft glow in dark mode
        ctx.shadowBlur = theme.glow;
        for (const p of this.particles) {
            const color = theme.colors[p.colorIndex];
            ctx.shadowColor = color;
            ctx.fillStyle = color;
            ctx.globalAlpha = Math.min(1, p.opacity + theme.opacityBoost);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * theme.sizeScale, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }

    loop() {
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.loop());
    }

    start() {
        if (prefersReducedMotion) {
            this.draw(); // still picture, no movement
            return;
        }
        if (!this.animationId) this.loop();
    }

    stop() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.animationId = null;
    }
}

// ===== Fade-in on scroll =====
class ScrollAnimations {
    constructor() {
        const targets = document.querySelectorAll('.fade-in');

        if (!('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        targets.forEach(el => observer.observe(el));
    }
}

// ===== Header, mobile menu, active link =====
class Navigation {
    constructor() {
        this.header = document.getElementById('header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.menu = document.getElementById('navLinks');
        this.sections = document.querySelectorAll('main section[id]');

        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        this.onScroll();

        this.menuBtn.addEventListener('click', () => {
            this.setMenu(!this.menu.classList.contains('active'));
        });

        // Close the mobile menu after picking a link
        this.menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.setMenu(false));
        });

        // Close the mobile menu with Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.setMenu(false);
        });
    }

    setMenu(open) {
        this.menu.classList.toggle('active', open);
        this.header.classList.toggle('menu-open', open);
        this.menuBtn.setAttribute('aria-expanded', String(open));
        this.menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        this.menuBtn.textContent = open ? '✕' : '☰';
    }

    onScroll() {
        this.header.classList.toggle('scrolled', window.scrollY > 50);

        const position = window.scrollY + 200;
        let currentId = 'hero';
        this.sections.forEach(section => {
            if (position >= section.offsetTop) currentId = section.id;
        });
        // At the very bottom, highlight the last section
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
            currentId = this.sections[this.sections.length - 1].id;
        }

        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }
}

// ===== Contact form: really sends the message =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.messageEl = document.getElementById('formMessage');
        this.button = this.form.querySelector('button[type="submit"]');
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    validate() {
        const { name, email, subject, message } = this.form.elements;
        if (!name.value.trim()) return 'Please enter your name.';
        if (!email.value.trim() || !email.checkValidity()) return 'Please enter a valid email address.';
        if (!subject.value.trim()) return 'Please add a subject.';
        if (message.value.trim().length < 10) return 'Please write a message (at least 10 characters).';
        return null;
    }

    async handleSubmit() {
        const error = this.validate();
        if (error) {
            this.showMessage(error, 'error');
            return;
        }

        const data = Object.fromEntries(new FormData(this.form));
        if (data._honey) return; // a bot filled the hidden field

        const payload = {
            name: data.name.trim(),
            email: data.email.trim(),
            message: data.message.trim(),
            _subject: `Portfolio: ${data.subject.trim()}`,
            _replyto: data.email.trim(),
            _template: 'table',
            _captcha: 'false'
        };

        const originalText = this.button.textContent;
        this.button.textContent = 'Sending...';
        this.button.disabled = true;
        this.showMessage('', null);

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json().catch(() => ({}));

            if (!response.ok || String(result.success) === 'false') {
                throw new Error(result.message || 'Request failed');
            }

            this.showMessage("Thank you! Your message has been sent. I'll get back to you soon.", 'success');
            this.form.reset();
        } catch (err) {
            console.error('Contact form error:', err);
            this.showMessage(
                `Sorry, the message couldn't be sent. Please email me directly at ${CONTACT_EMAIL}.`,
                'error'
            );
        } finally {
            this.button.textContent = originalText;
            this.button.disabled = false;
        }
    }

    showMessage(text, type) {
        this.messageEl.textContent = text;
        this.messageEl.className = type ? `form-message ${type}` : 'form-message';
    }
}

// ===== Project filter buttons =====
class ProjectFilter {
    constructor() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.cards = document.querySelectorAll('.project-card');
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => this.apply(btn));
        });
    }

    apply(activeBtn) {
        const filter = activeBtn.dataset.filter;
        this.buttons.forEach(btn => {
            btn.classList.toggle('active', btn === activeBtn);
            btn.setAttribute('aria-pressed', String(btn === activeBtn));
        });
        this.cards.forEach(card => {
            const show = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hide', !show);
        });
    }
}

// ===== Back-to-top button =====
class BackToTop {
    constructor() {
        const btn = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            btn.classList.toggle('show', window.scrollY > 600);
        }, { passive: true });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }
}

// ===== Loading screen =====
class LoadingScreen {
    constructor() {
        const el = document.getElementById('loading');
        const hide = () => el.classList.add('hidden');
        if (document.readyState === 'complete') {
            setTimeout(hide, 200);
        } else {
            window.addEventListener('load', () => setTimeout(hide, 200));
        }
        // Never leave visitors stuck behind the spinner
        setTimeout(hide, 3000);
    }
}

// ===== Start everything =====
new LoadingScreen();
new ThemeManager();
new Navigation();
new ScrollAnimations();
new ContactForm();
new ProjectFilter();
new BackToTop();

document.getElementById('year').textContent = new Date().getFullYear();

const bgCanvas = document.getElementById('bgCanvas');
const canvasAnimation = bgCanvas ? new CanvasAnimation(bgCanvas) : null;

// Redraw the particles in the new theme's colours (needed when motion is reduced)
document.getElementById('themeToggle').addEventListener('click', () => {
    if (canvasAnimation && !canvasAnimation.animationId) canvasAnimation.draw();
});

// Pause the animation while the tab is hidden, resume when visible again
document.addEventListener('visibilitychange', () => {
    if (!canvasAnimation) return;
    if (document.hidden) canvasAnimation.stop();
    else canvasAnimation.start();
});
