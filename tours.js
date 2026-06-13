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

// Filter logic
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.mini-card:not(.mini-card-ask)');
const resultsCount = document.getElementById('resultsCount');

function applyFilter(filter) {
  let visible = 0;
  cards.forEach(card => {
    const cats = card.dataset.cat || '';
    if (filter === 'all' || cats.includes(filter)) {
      card.classList.remove('hidden');
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      requestAnimationFrame(() => {
        card.style.transition = 'opacity .35s ease, transform .35s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });
  const label = filter === 'all' ? 'all destinations' : filter + ' tours';
  resultsCount.textContent = `Showing ${visible} ${label}`;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  });
});

// Check URL param for preselected filter
const params = new URLSearchParams(window.location.search);
const preFilter = params.get('filter');
if (preFilter) {
  const target = document.querySelector(`[data-filter="${preFilter}"]`);
  if (target) { target.click(); }
} else {
  applyFilter('all');
}

// Scroll reveal for cards
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });

cards.forEach((c, i) => {
  c.style.opacity = '0';
  c.style.transform = 'translateY(20px)';
  c.style.transition = `opacity .4s ease ${i * 0.04}s, transform .4s ease ${i * 0.04}s`;
  io.observe(c);
});
