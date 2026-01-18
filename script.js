// Initialize config-based content
function initConfig() {
    // Personal info
    const heroEyebrow = document.getElementById('heroEyebrow');
    const heroDescription = document.getElementById('heroDescription');
    const contactEmail = document.getElementById('contactEmail');

    if (config.personalInfo) {
        if (heroEyebrow) heroEyebrow.textContent = config.personalInfo.name;
        if (heroDescription) heroDescription.textContent = config.personalInfo.description;
        if (contactEmail) {
            contactEmail.textContent = config.personalInfo.email;
            contactEmail.href = 'mailto:' + config.personalInfo.email;
        }
    }

    // Social links
    const contactSocial = document.getElementById('contactSocial');
    if (contactSocial && config.socialLinks) {
        Object.keys(config.socialLinks).forEach(key => {
            const social = config.socialLinks[key];
            const isClickable = social.url && !social.qrCode;
            const element = isClickable ? 'a' : 'span';
            const link = document.createElement(element);
            if (isClickable) {
                link.href = social.url;
            }
            link.className = 'social-link';
            link.innerHTML = `
                <span>${social.name}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
            `;
            contactSocial.appendChild(link);

            // Add QR popup for social links with qrCode
            if (social.qrCode) {
                const wrapper = document.createElement('div');
                wrapper.className = 'social-link-wrapper';
                link.parentNode.insertBefore(wrapper, link);
                wrapper.appendChild(link);

                const popup = document.createElement('div');
                popup.className = 'social-qr-popup';
                popup.innerHTML = `
                    <img src="${social.qrCode}" alt="${social.name}二维码">
                `;
                wrapper.appendChild(popup);

                link.addEventListener('mouseenter', () => {
                    popup.classList.add('show');
                });

                link.addEventListener('mouseleave', () => {
                    popup.classList.remove('show');
                });
            }
        });
    }
}

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.left = cursorX - 4 + 'px';
    cursor.style.top = cursorY - 4 + 'px';
    cursorFollower.style.left = followerX - 20 + 'px';
    cursorFollower.style.top = followerY - 20 + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .work-card, input, textarea');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
});

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-content a');

navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    navToggle.classList.toggle('active');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Reveal Animation
const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars
            if (entry.target.querySelector('.skill-progress')) {
                entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                    const width = bar.dataset.width;
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                });
            }
        }
    });
}, revealOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    revealObserver.observe(el);
});

// Works Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        workCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 * Array.from(workCards).indexOf(card) % 4);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        // Animate button
        const btn = this.querySelector('.submit-btn');
        btn.innerHTML = '<span class="btn-text">发送中...</span>';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.innerHTML = '<span class="btn-text">已发送</span><span class="btn-icon">✓</span>';
            btn.style.background = '#22c55e';
            btn.style.color = '#fff';
            this.reset();

            setTimeout(() => {
                btn.innerHTML = '<span class="btn-text">发送消息</span><span class="btn-icon">→</span>';
                btn.style.background = '';
                btn.style.color = '';
                btn.style.opacity = '1';
            }, 2000);
        }, 1500);
    });
}

// Parallax Effect on Hero Circle
window.addEventListener('mousemove', (e) => {
    const circle = document.querySelector('.hero-circle');
    const x = (e.clientX - window.innerWidth / 2) / 50;
    const y = (e.clientY - window.innerHeight / 2) / 50;

    circle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
});

// Magnetic Effect on Buttons
const magneticBtns = document.querySelectorAll('.btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Initialize on load
window.addEventListener('load', () => {
    initConfig();
    document.body.style.opacity = '1';
});
