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

// ── ROOMIE GALLERY LIGHTBOX ──
const roomieImages = [
    { src: 'img/roomie/roomie_splash.jpg',        label: '' },
    { src: 'img/roomie/roomie_home1.jpg',         label: '' },
    { src: 'img/roomie/roomie_home2.jpg',         label: '' },
    { src: 'img/roomie/roomie_home3.jpg',         label: '' },
    { src: 'img/roomie/roomie_map.jpg',           label: '' },
    { src: 'img/roomie/roomie_room_detail.jpg',   label: '' },
    { src: 'img/roomie/roomie_search.jpg',        label: '' },
    { src: 'img/roomie/roomie_profile.jpg',       label: '' },
    { src: 'img/roomie/roomie_notifications.jpg', label: '' },
    { src: 'img/roomie/roomie_messages.jpg',      label: '' },
    { src: 'img/roomie/roomie_chat.jpg',          label: '' },
    { src: 'img/roomie/roomie_detail.jpg',        label: '' },
    { src: 'img/roomie/roomie_home4.jpg',         label: '' },
];

let rlbCurrent = 0;

function openRoomieGallery(idx = 0) {
    rlbCurrent = idx;
    const lb = document.getElementById('roomie-lightbox');
    const img = document.getElementById('rlbImg');
    const lbl = document.getElementById('rlbType');
    img.src = roomieImages[rlbCurrent].src;
    lbl.textContent = roomieImages[rlbCurrent].label;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRoomieGallery() {
    document.getElementById('roomie-lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function rlbNavigate(dir) {
    rlbCurrent = (rlbCurrent + dir + roomieImages.length) % roomieImages.length;
    const img = document.getElementById('rlbImg');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = roomieImages[rlbCurrent].src;
        document.getElementById('rlbType').textContent = roomieImages[rlbCurrent].label;
        img.style.opacity = '1';
    }, 200);
    img.style.transition = 'opacity 0.2s ease';
}

document.getElementById('rlbClose').addEventListener('click', closeRoomieGallery);
document.getElementById('rlbPrev').addEventListener('click', () => rlbNavigate(-1));
document.getElementById('rlbNext').addEventListener('click', () => rlbNavigate(1));
document.getElementById('roomie-lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('roomie-lightbox')) closeRoomieGallery();
});
document.addEventListener('keydown', e => {
    if (!document.getElementById('roomie-lightbox').classList.contains('active')) return;
    if (e.key === 'Escape')     closeRoomieGallery();
    if (e.key === 'ArrowLeft')  rlbNavigate(-1);
    if (e.key === 'ArrowRight') rlbNavigate(1);
});

/* ================================================
   NUEVAS FUNCIONALIDADES — v3
   Preloader · Tema · Partículas · Formulario
   ================================================ */

// ── PRELOADER ──
(function () {
    const preloader = document.getElementById('preloader');
    const plBar = document.getElementById('plBar');
    if (!preloader) return;

    let progress = 0;
    const tick = setInterval(() => {
        progress += Math.random() * 14 + 4;
        if (progress >= 90) { progress = 90; clearInterval(tick); }
        if (plBar) plBar.style.width = progress + '%';
    }, 110);

    function hideLoader() {
        if (plBar) plBar.style.width = '100%';
        clearInterval(tick);
        setTimeout(() => preloader.classList.add('hidden'), 550);
    }

    window.addEventListener('load', hideLoader);
    // Fallback — never block for more than 4 s
    setTimeout(hideLoader, 4000);
})();

// ── THEME TOGGLE ──
(function () {
    const btn  = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    if (!btn) return;

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            icon.className = 'fa-solid fa-sun';
        } else {
            document.body.classList.remove('light-mode');
            icon.className = 'fa-solid fa-moon';
        }
    }

    // Apply saved preference immediately (before paint)
    applyTheme(localStorage.getItem('jm-theme') || 'dark');

    btn.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-mode');
        const next = isLight ? 'dark' : 'light';
        localStorage.setItem('jm-theme', next);
        applyTheme(next);
    });
})();

// ── HERO CANVAS PARTICLES ──
(function () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const snippets = [
        'import geopandas as gpd', 'def process_raster():', 'lat: 10.4869°N',
        'lon: 66.8792°W', 'SELECT ST_Area(geom)', 'map.addLayer(tiles)',
        'EPSG:4326', '<Polygon>', 'python geo_analysis.py',
        'const map = L.map("id")', 'DEM · SRTM', 'raster.clip(mask)',
        'UTM Zone 20N', '{ "type": "Feature" }', 'import numpy as np',
        'WGS84 · GRS80', 'NDVI=(NIR−R)/(NIR+R)', 'db.postgis.query()',
        'await supabase.from()', 'CartoDB Positron', 'DATUM: WGS84',
        'ArcGIS.Rest.Layer()', 'ESCALA 1:25.000', 'git push origin main',
        'PROYECCIÓN MERCATOR', '.shp · .geojson · .tif',
    ];

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width  = rect.width  || window.innerWidth;
        canvas.height = rect.height || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = window.innerWidth < 600 ? 14 : 26;
    const particles = Array.from({ length: count }, () => makeParticle(true));

    function makeParticle(randomY) {
        return {
            x:      Math.random() * canvas.width,
            y:      randomY ? Math.random() * canvas.height : canvas.height + 20,
            text:   snippets[Math.floor(Math.random() * snippets.length)],
            vx:     (Math.random() - 0.5) * 0.22,
            vy:     -(Math.random() * 0.18 + 0.06),
            opacity:     0,
            targetOpacity: Math.random() * 0.15 + 0.04,
            fadeSpeed: Math.random() * 0.0025 + 0.001,
            fadingIn:  true,
            life: 0,
            maxLife: Math.random() * 500 + 250,
        };
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "400 10.5px 'JetBrains Mono', monospace";

        particles.forEach((p, i) => {
            p.life++;
            p.x += p.vx;
            p.y += p.vy;

            if (p.fadingIn) {
                p.opacity = Math.min(p.opacity + p.fadeSpeed, p.targetOpacity);
                if (p.opacity >= p.targetOpacity) p.fadingIn = false;
            } else if (p.life > p.maxLife * 0.65) {
                p.opacity = Math.max(p.opacity - p.fadeSpeed * 0.8, 0);
            }

            if (p.life > p.maxLife || (p.opacity <= 0 && !p.fadingIn)) {
                particles[i] = makeParticle(false);
                return;
            }

            // Wrap horizontally
            if (p.x < -200) p.x = canvas.width + 100;
            if (p.x > canvas.width + 200) p.x = -100;

            const isLight = document.body.classList.contains('light-mode');
            ctx.fillStyle = isLight ? `rgba(0,127,68,1)` : `rgba(0,230,138,1)`;
            ctx.globalAlpha = p.opacity;
            ctx.fillText(p.text, p.x, p.y);
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }

    draw();
})();

// ── CONTACT FORM ──
(function () {
    const form      = document.getElementById('contactForm');
    if (!form) return;
    const btn       = document.getElementById('cfSubmit');
    const btnText   = document.getElementById('cfBtnText');
    const btnLoad   = document.getElementById('cfBtnLoading');
    const status    = document.getElementById('cfStatus');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Guard: remind user to set real Formspree endpoint
        if (form.action.includes('YOUR_FORM_ID')) {
            status.textContent = '⚠ Configura tu endpoint Formspree en el atributo action del form.';
            status.className = 'cf-status error';
            return;
        }

        btn.disabled = true;
        btnText.style.display = 'none';
        btnLoad.style.display  = 'inline-flex';
        status.textContent = '';
        status.className   = 'cf-status';

        try {
            const res = await fetch(form.action, {
                method:  'POST',
                body:    new FormData(form),
                headers: { 'Accept': 'application/json' },
            });

            if (res.ok) {
                status.innerHTML = '<i class="fa-solid fa-circle-check"></i> ¡Mensaje enviado! Te respondo pronto.';
                status.className = 'cf-status success';
                form.reset();
            } else {
                const data = await res.json();
                throw new Error(data?.errors?.[0]?.message || 'Error del servidor');
            }
        } catch (err) {
            status.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error al enviar. Escríbeme a <a href="mailto:jesusmorillo507@gmail.com" style="color:inherit;text-decoration:underline">jesusmorillo507@gmail.com</a>';
            status.className = 'cf-status error';
        } finally {
            btn.disabled = false;
            btnText.style.display  = 'inline-flex';
            btnLoad.style.display  = 'none';
        }
    });
})();
// ── AÑO DINÁMICO ──
(function(){ const e=document.getElementById('footerYear'); if(e) e.textContent=new Date().getFullYear(); })();

// ── COPIAR AL PORTAPAPELES ──
document.querySelectorAll('.ci-copy-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
        e.stopPropagation();
        const text = btn.closest('.ci-copyable')?.getAttribute('data-copy');
        if (!text) return;
        try { await navigator.clipboard.writeText(text); }
        catch { const t=document.createElement('textarea'); t.value=text; t.style='position:fixed;opacity:0'; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
        const icon=btn.querySelector('i'), prev=icon.className;
        icon.className='fa-solid fa-check'; btn.classList.add('copied');
        setTimeout(()=>{ icon.className=prev; btn.classList.remove('copied'); }, 2000);
    });
});
