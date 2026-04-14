/* ================================================
   JESUS MORILLO — PORTFOLIO SCRIPT v2
   ================================================ */

// ── CURSOR GLOW ──
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animateCursor() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (cursorGlow) { cursorGlow.style.left = glowX + 'px'; cursorGlow.style.top = glowY + 'px'; }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// ── SCROLL PROGRESS ──
const scrollBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const pct = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollBar) scrollBar.style.width = pct + '%';
});

// ── NAVBAR ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE MENU ──
let menuVisible = false;
function mostrarOcultarMenu() {
    menuVisible = !menuVisible;
    document.getElementById('nav').classList.toggle('responsive', menuVisible);
    document.getElementById('navToggle').classList.toggle('open', menuVisible);
}
function seleccionar() {
    document.getElementById('nav').classList.remove('responsive');
    document.getElementById('navToggle').classList.remove('open');
    menuVisible = false;
}

// ── TYPEWRITER ──
const roles = ['Geógrafo & Cartógrafo', 'Python Developer', 'Analista SIG / GIS', 'Fullstack Dev', 'Consultor Geoespacial', 'Android Developer'];
let rIdx = 0, cIdx = 0, isDel = false, tDelay = 120;
function typeWrite() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const cur = roles[rIdx];
    if (!isDel) {
        el.textContent = cur.substring(0, cIdx + 1);
        cIdx++;
        if (cIdx === cur.length) { isDel = true; tDelay = 2200; }
        else { tDelay = 85 + Math.random() * 60; }
    } else {
        el.textContent = cur.substring(0, cIdx - 1);
        cIdx--;
        tDelay = 45;
        if (cIdx === 0) { isDel = false; rIdx = (rIdx + 1) % roles.length; tDelay = 350; }
    }
    setTimeout(typeWrite, tDelay);
}
setTimeout(typeWrite, 1400);

// ── INTERSECTION OBSERVER (section animations) ──
const animEls = document.querySelectorAll('.anim-up, .anim-left, .anim-right');
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
animEls.forEach(el => io.observe(el));

// ── SKILL BARS ──
const skillBars = document.querySelectorAll('.skill-fill');
const barIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.width = e.target.getAttribute('data-width') + '%';
            e.target.classList.add('animated');
            barIO.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
skillBars.forEach(b => barIO.observe(b));

// ── COUNTER ──
function animCounter(el, target, dur = 1600) {
    let v = 0;
    const step = target / (dur / 16);
    const t = setInterval(() => {
        v += step;
        if (v >= target) { el.textContent = target; clearInterval(t); }
        else { el.textContent = Math.floor(v); }
    }, 16);
}
const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animCounter(e.target, parseInt(e.target.getAttribute('data-target')));
            counterIO.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(c => counterIO.observe(c));

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav ul li a');
window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 90 && window.scrollY < s.offsetTop - 90 + s.offsetHeight) cur = s.id;
    });
    navLinks.forEach(l => {
        l.style.color = '';
        if (l.getAttribute('href') === '#' + cur) l.style.color = 'var(--lime)';
    });
});

// ── CARD 3D TILT ──
function addTilt(selector) {
    document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const rotX = (((e.clientY - r.top) / r.height) - 0.5) * -10;
            const rotY = (((e.clientX - r.left) / r.width) - 0.5) * 10;
            card.style.transition = 'transform 0.1s ease';
            card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = '';
        });
    });
}
addTilt('.pcard');
addTilt('.sig-card');

// ── STAGGERED TIMELINE ──
const tlItems = document.querySelectorAll('.tl-item');
const tlIO = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => { e.target.style.opacity = '1'; e.target.style.transform = 'translateX(0)'; }, i * 100);
            tlIO.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
tlItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    tlIO.observe(item);
});

// ── INTEREST CHIPS STAGGER ──
const chips = document.querySelectorAll('.interest-chip');
const chipIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            chips.forEach((c, i) => setTimeout(() => { c.style.opacity = '1'; c.style.transform = 'translateY(0) scale(1)'; }, i * 55));
            chipIO.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
if (chips.length) {
    chips.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(15px) scale(0.9)'; c.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; });
    chipIO.observe(chips[0]);
}

// ── HERO TAGS STAGGER ──
window.addEventListener('load', () => {
    document.querySelectorAll('.htag').forEach((tag, i) => {
        tag.style.opacity = '0'; tag.style.transform = 'translateY(10px)';
        tag.style.transition = `opacity 0.4s ease ${0.8 + i * 0.07}s, transform 0.4s ease ${0.8 + i * 0.07}s`;
        setTimeout(() => { tag.style.opacity = '1'; tag.style.transform = 'translateY(0)'; }, (0.8 + i * 0.07) * 1000);
    });
});

// ── SIG IMAGE SMOOTH LOAD ──
// Fade images in as they load — avoids layout pop and keeps section appearing instantly
document.querySelectorAll('.sig-img-wrap img').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';
    if (img.complete && img.naturalWidth > 0) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
        img.addEventListener('error', () => { img.style.opacity = '1'; }, { once: true });
    }
});

// ── SIG ZOOM BUTTON click-through to lightbox ──
document.querySelectorAll('.sig-img-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
        const img   = wrap.getAttribute('data-img');
        const title = wrap.getAttribute('data-title');
        const type  = wrap.getAttribute('data-type');
        // find index
        const all = [...document.querySelectorAll('.sig-img-wrap')];
        const idx = all.indexOf(wrap);
        openLightbox(img, title + ' — ' + type, type, idx);
    });
});

// ── LIGHTBOX ──
const sigImages = [];
document.querySelectorAll('.sig-img-wrap').forEach(w => {
    sigImages.push({ img: w.getAttribute('data-img'), title: w.getAttribute('data-title'), type: w.getAttribute('data-type') });
});

let lbCurrent = 0;

function openLightbox(img, title, type, idx) {
    lbCurrent = idx;
    document.getElementById('lbImg').src   = img;
    document.getElementById('lbTitle').textContent = title;
    document.getElementById('lbType').textContent  = type;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function lbNavigate(dir) {
    lbCurrent = (lbCurrent + dir + sigImages.length) % sigImages.length;
    const item = sigImages[lbCurrent];
    const lbImg = document.getElementById('lbImg');
    lbImg.style.opacity = '0';
    setTimeout(() => {
        lbImg.src = item.img;
        document.getElementById('lbTitle').textContent = item.title + ' — ' + item.type;
        document.getElementById('lbType').textContent  = item.type;
        lbImg.style.opacity = '1';
    }, 200);
    lbImg.style.transition = 'opacity 0.2s ease';
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => lbNavigate(-1));
document.getElementById('lbNext').addEventListener('click', () => lbNavigate(1));
document.getElementById('lightbox').addEventListener('click', e => { if (e.target === document.getElementById('lightbox')) closeLightbox(); });
document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   lbNavigate(-1);
    if (e.key === 'ArrowRight')  lbNavigate(1);
});


// ── 3D TOGGLE for SIG cards ──
function toggleView3D(btn, e) {
    e.stopPropagation(); // don't trigger the wrap click / lightbox
    const wrap = btn.closest('.sig-img-wrap');
    const img  = wrap.querySelector('img');
    const is3D = btn.classList.contains('active');

    const flatSrc = wrap.getAttribute('data-flat');
    const src3D   = wrap.getAttribute('data-3d');
    const newSrc  = is3D ? flatSrc : src3D;
    const mapType = wrap.querySelector('.sig-map-type');

    // Fade out → swap → fade in
    img.classList.add('switching');
    setTimeout(() => {
        img.src = newSrc;
        // Update data-img so lightbox opens the current view
        wrap.setAttribute('data-img', newSrc);
        // Update the lightbox sigImages array for navigation
        const all = [...document.querySelectorAll('.sig-img-wrap')];
        const idx = all.indexOf(wrap);
        if (sigImages[idx]) sigImages[idx].img = newSrc;
        img.classList.remove('switching');
    }, 280);

    btn.classList.toggle('active');
    if (mapType) {
        mapType.textContent = is3D
            ? wrap.getAttribute('data-type').split('·')[0].trim()
            : 'Vista 3D';
    }
}
