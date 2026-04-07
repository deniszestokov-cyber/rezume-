// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 200;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Create space canvas with particles
function createSpaceCanvas() {
    const canvas = document.getElementById('space-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random()})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Scroll animations
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 1s ease-out';
        observer.observe(section);
    });
}

// Animate achievement numbers
function animateNumbers() {
    const numbers = document.querySelectorAll('.achievement-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 30);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    numbers.forEach(number => {
        observer.observe(number);
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Parallax effect
function handleParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content, .robot-text, .airplane-text');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Glitch effect for hero text
function createGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    
    setInterval(() => {
        glitchText.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff88,
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #8b5cf6,
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff6b35
        `;
        
        setTimeout(() => {
            glitchText.style.textShadow = 'none';
        }, 50);
    }, 3000);
}

// Animate robot welcome
function animateRobotWelcome() {
    const robotContainer = document.getElementById('robot-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Create simple robot SVG
                robotContainer.innerHTML = `
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
                        <defs>
                            <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#00ff88;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        
                        <!-- Head -->
                        <rect x="60" y="40" width="80" height="60" rx="10" fill="url(#robotGradient)" opacity="0.8"/>
                        
                        <!-- Eyes -->
                        <circle cx="80" cy="60" r="8" fill="#00ff88">
                            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="120" cy="60" r="8" fill="#00ff88">
                            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        
                        <!-- Antenna -->
                        <line x1="100" y1="40" x2="100" y2="20" stroke="#00ff88" stroke-width="3"/>
                        <circle cx="100" cy="20" r="5" fill="#ff6b35">
                            <animate attributeName="r" values="5;8;5" dur="1s" repeatCount="indefinite"/>
                        </circle>
                        
                        <!-- Body -->
                        <rect x="70" y="100" width="60" height="70" rx="5" fill="url(#robotGradient)" opacity="0.6"/>
                        
                        <!-- Arms -->
                        <rect x="40" y="110" width="30" height="15" rx="5" fill="#8b5cf6" opacity="0.8">
                            <animateTransform attributeName="transform" type="rotate" from="0 55 117" to="20 55 117" dur="2s" repeatCount="indefinite"/>
                        </rect>
                        <rect x="130" y="110" width="30" height="15" rx="5" fill="#8b5cf6" opacity="0.8">
                            <animateTransform attributeName="transform" type="rotate" from="0 145 117" to="-20 145 117" dur="2s" repeatCount="indefinite"/>
                        </rect>
                        
                        <!-- Legs -->
                        <rect x="75" y="170" width="20" height="25" rx="3" fill="#00ff88" opacity="0.7"/>
                        <rect x="105" y="170" width="20" height="25" rx="3" fill="#00ff88" opacity="0.7"/>
                    </svg>
                `;
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(robotContainer);
}

// Animate airplane
function animateAirplane() {
    const airplane = document.querySelector('.airplane');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                airplane.style.animation = 'fly 3s ease-in-out';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    if (airplane) {
        observer.observe(airplane);
    }
}

// Create data stream effect
function createDataStream() {
    const dataLines = document.querySelector('.data-lines');
    
    if (dataLines) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    dataLines.style.opacity = '0.1';
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(dataLines);
    }
}

// Initialize all animations
function init() {
    createStars();
    createSpaceCanvas();
    handleScrollAnimations();
    animateNumbers();
    handleParallax();
    createGlitchEffect();
    animateRobotWelcome();
    animateAirplane();
    createDataStream();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Expose scrollToSection globally
window.scrollToSection = scrollToSection;
