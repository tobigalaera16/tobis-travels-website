// Burger / Drawer
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

// Float CTA
const floatCta = document.getElementById('floatCta');
window.addEventListener('scroll', () => {
  floatCta.classList.toggle('show', window.scrollY > 400);
});

// Filter
const filterBtns = document.querySelectorAll('.intl-filter-btn');
const cards = document.querySelectorAll('.intl-card[data-cat]');

function applyFilter(cat) {
  cards.forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;
    card.style.display = match ? '' : 'none';
    if (match) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 20);
      card.style.transition = 'opacity .35s ease, transform .35s ease';
    }
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.cat);
  });
});

applyFilter('all');

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; io.unobserve(e.target); }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.intl-card, .reason').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = `opacity .4s ease ${i * 0.04}s, transform .4s ease ${i * 0.04}s`;
  io.observe(el);
});
