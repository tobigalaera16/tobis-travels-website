// NAV
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 60);
  document.getElementById('floatCta').classList.toggle('show', window.scrollY > 400);
});

// BURGER / DRAWER
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() { drawer.classList.add('open'); overlay.classList.add('show'); }
function closeDrawer() { drawer.classList.remove('open'); overlay.classList.remove('show'); }

burger.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

// HERO SLIDESHOW
const slides = document.querySelectorAll('.hero-slide');
let cur = 0;
setInterval(() => {
  slides[cur].classList.remove('active');
  cur = (cur + 1) % slides.length;
  slides[cur].classList.add('active');
}, 5000);

// SCROLL REVEAL
const reveal = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.vibe-card, .tour-card, .review, .step, .reason').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  reveal.observe(el);
});

// BOOKING FORM
document.getElementById('bookForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.innerHTML = '✅ Sent! We\'ll be in touch soon.';
  btn.style.background = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = 'Send my inquiry <span>→</span>';
    btn.style.background = '';
    btn.disabled = false;
    this.reset();
  }, 4000);
});
