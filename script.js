/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initCounter();
    initParallax();
    initUniverseHover();
    initNavbar();
    initHeroTitle();
    initProgressBar();
    initQuoteHighlight();
    initCursor();
    initSmoothScroll();
});


/* =========================
   REVEAL ON SCROLL
========================= */
function initReveal() {
    const targets = document.querySelectorAll(
        ".reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(t => observer.observe(t));

    // Growth bars need separate handling
    const growthItems = document.querySelectorAll(".growth-item");
    const growthObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                growthObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    growthItems.forEach(item => growthObs.observe(item));
}


/* =========================
   COUNT UP
========================= */
function initCounter() {
    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);

            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || "";
            const duration = 2200; // 더 충분한 시간
            const steps = 150; // 더 부드러운 스텝
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                // Ease in-out: 자연스러운 곡선 (시작 느림 → 중간 빠름 → 끝 느림)
                const progress = step / steps;
                const eased = progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;
                
                current = Math.round(eased * target);
                el.textContent = current + suffix;
                
                // 카운터에 애니메이션 클래스 추가
                el.classList.add("counting");

                if (step >= steps) {
                    el.textContent = target + suffix;
                    el.classList.remove("counting");
                    clearInterval(timer);
                }
            }, duration / steps);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}


/* =========================
   HERO PARALLAX
========================= */
function initParallax() {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scroll = window.pageYOffset;
                hero.style.backgroundPositionY = `calc(50% + ${scroll * 0.4}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}


/* =========================
   UNIVERSE CARD HOVER GLOW
========================= */
function initUniverseHover() {
    const cards = document.querySelectorAll(".universe-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty("--mx", x + "%");
            card.style.setProperty("--my", y + "%");
        });
    });
}


/* =========================
   NAVBAR SCROLL EFFECT
========================= */
function initNavbar() {
    const navbar = document.querySelector("#navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }, { passive: true });
}


/* =========================
   HERO TITLE LETTER ANIMATION
========================= */
function initHeroTitle() {
    const heroTitle = document.querySelector("#heroTitle");
    if (!heroTitle) return;

    const text = heroTitle.textContent.trim();
    heroTitle.textContent = "";

    [...text].forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        heroTitle.appendChild(span);

        setTimeout(() => {
            span.style.transition = `opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)`;
            span.style.opacity = "1";
            span.style.transform = "translateY(0)";
        }, 600 + index * 100);
    });
}


/* =========================
   SCROLL PROGRESS BAR
========================= */
function initProgressBar() {
    const bar = document.getElementById("progressBar");
    if (!bar) return;

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.width = (scrollTop / scrollHeight * 100) + "%";
    }, { passive: true });
}


/* =========================
   QUOTE RANDOM HIGHLIGHT
========================= */
function initQuoteHighlight() {
    const quotes = document.querySelectorAll(".quote-item");
    if (!quotes.length) return;

    let currentIdx = -1;

    setInterval(() => {
        if (currentIdx >= 0) quotes[currentIdx].classList.remove("active-quote");
        const next = Math.floor(Math.random() * quotes.length);
        currentIdx = next;
        quotes[currentIdx].classList.add("active-quote");
    }, 2200);
}


/* =========================
   CUSTOM CURSOR
========================= */
function initCursor() {
    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursorFollower");
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + "px";
        follower.style.top = followerY + "px";
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll(
        "a, button, .card, .universe-card, .person, .logo-item, .quote-item, .brand-center"
    );

    hoverTargets.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
            follower.style.transform = "translate(-50%,-50%) scale(0.5)";
            follower.style.opacity = "0.3";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.transform = "translate(-50%,-50%) scale(1)";
            follower.style.transform = "translate(-50%,-50%) scale(1)";
            follower.style.opacity = "0.6";
        });
    });
}


/* =========================
   SMOOTH SCROLL
========================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            const href = a.getAttribute("href");
            if (href === "#") return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth" });
        });
    });
}