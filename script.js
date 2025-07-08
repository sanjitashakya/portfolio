if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('data:text/javascript;base64,c2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgKGUpID0+IHsgY29uc29sZS5sb2coJ1NlcnZpY2UgV29ya2VyIGluc3RhbGxlZCcpOyB9KTsgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdmZXRjaCcsIChlKSA9PiB7IGUucmVzcG9uZFdpdGgoZmV0Y2goZS5yZXF1ZXN0KS5jYXRjaCgoKSA9PiBuZXcgUmVzcG9uc2UoJ09mZmxpbmUnKSkpOyB9KTs=')
            .then(() => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const icon = document.getElementById('themeIcon');
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    toggleTheme() {
        this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
    }
}


class CanvasAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.worker = null;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.setupWorker();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        const particleCount = Math.min(100, Math.floor(this.canvas.width / 10));
        this.particles = [];

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    setupWorker() {
        const workerCode = `
                    self.onmessage = function(e) {
                        const { particles, width, height } = e.data;
                        
                        const updatedParticles = particles.map(particle => {
                            particle.x += particle.vx;
                            particle.y += particle.vy;
                            
                            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
                            if (particle.y < 0 || particle.y > height) particle.vy *= -1;
                            
                            particle.x = Math.max(0, Math.min(width, particle.x));
                            particle.y = Math.max(0, Math.min(height, particle.y));
                            
                            return particle;
                        });
                        
                        self.postMessage(updatedParticles);
                    };
                `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        this.worker = new Worker(URL.createObjectURL(blob));

        this.worker.onmessage = (e) => {
            this.particles = e.data;
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.worker) {
            this.worker.postMessage({
                particles: this.particles,
                width: this.canvas.width,
                height: this.canvas.height
            });
        }
        this.ctx.fillStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color');

        this.particles.forEach(particle => {
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 0.1;
        this.ctx.strokeStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color');

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        this.ctx.globalAlpha = 1;
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.worker) {
            this.worker.terminate();
        }
    }
}
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            this.observer.observe(el);
        });

        document.querySelectorAll('.skill-category').forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            this.observer.observe(el);
        });

        document.querySelectorAll('.project-card').forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.2}s`;
            this.observer.observe(el);
        });
    }
}

class Navigation {
    constructor() {
        this.header = document.getElementById('header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinksContainer = document.getElementById('navLinks');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });

        window.addEventListener('scroll', () => {
            this.updateActiveLink();
        });

        this.mobileMenuBtn.addEventListener('click', () => {
            this.navLinksContainer.classList.toggle('active');
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navLinksContainer.classList.remove('active');
            });
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerHeight = this.header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

class LocationService {
    constructor() {
        this.init();
    }

    init() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => this.handleLocationSuccess(position),
                (error) => this.handleLocationError(error),
                {
                    timeout: 10000,
                    enableHighAccuracy: false
                }
            );
        } else {
            this.handleLocationError(new Error('Geolocation not supported'));
        }
    }

    async handleLocationSuccess(position) {
        const { latitude, longitude } = position.coords;

        try {
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );

            if (response.ok) {
                const data = await response.json();
                const location = `${data.city || data.locality || 'Unknown'}, ${data.countryName || 'Unknown'}`;
                document.getElementById('locationText').textContent = location;
            } else {
                throw new Error('Geocoding failed');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            document.getElementById('locationText').textContent = 'Location unavailable';
        }
    }

    handleLocationError(error) {
        console.error('Geolocation error:', error);
        document.getElementById('locationText').textContent = 'Kathmandu , Nepal';
    }
}

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
    
            await new Promise(resolve => setTimeout(resolve, 2000));

            this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
                    padding: 1rem;
                    margin-top: 1rem;
                    border-radius: 8px;
                    font-weight: 500;
                    background: ${type === 'success' ? '#d1fae5' : '#fee2e2'};
                    color: ${type === 'success' ? '#065f46' : '#991b1b'};
                    border: 1px solid ${type === 'success' ? '#a7f3d0' : '#fecaca'};
                `;

        this.form.appendChild(messageEl);

        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

class LoadingScreen {
    constructor() {
        this.loadingEl = document.getElementById('loading');
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loadingEl.classList.add('hidden');
            }, 1000);
        });
    }
}

class ContainerQueries {
    constructor() {
        this.init();
    }

    init() {
        if (!CSS.supports('container-type: inline-size')) {
            this.polyfill();
        }
    }

    polyfill() {
        const containers = document.querySelectorAll('.projects-grid');

        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const width = entry.contentRect.width;
                if (width < 600) {
                    entry.target.style.gridTemplateColumns = '1fr';
                } else {
                    entry.target.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
                }
            });
        });

        containers.forEach(container => {
            observer.observe(container);
        });
    }
}

class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                }, 0);
            });
        }
    }
}

class App {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        this.components.push(new LoadingScreen());
        this.components.push(new ThemeManager());
        this.components.push(new Navigation());
        this.components.push(new ScrollAnimations());
        this.components.push(new LocationService());
        this.components.push(new ContactForm());
        this.components.push(new ContainerQueries());
        this.components.push(new PerformanceMonitor());

        const heroCanvas = document.getElementById('heroCanvas');
        if (heroCanvas) {
            this.canvasAnimation = new CanvasAnimation(heroCanvas);
        }
    }

    destroy() {
        if (this.canvasAnimation) {
            this.canvasAnimation.destroy();
        }
    }
}

const app = new App();

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (app.canvasAnimation) {
            app.canvasAnimation.destroy();
        }
    } else {
        const heroCanvas = document.getElementById('heroCanvas');
        if (heroCanvas && !app.canvasAnimation) {
            app.canvasAnimation = new CanvasAnimation(heroCanvas);
        }
    }
});