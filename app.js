const cards = document.querySelectorAll('.depoimento-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let index = 0;
let timer = null;

function mostrarCard(n) {
  if (!cards.length) return;

  cards.forEach(card => card.classList.remove('active'));

  index = (n + cards.length) % cards.length;

  cards[index].classList.add('active');
}

function stopAutoPlay() {
  if (timer) clearInterval(timer);
  timer = null;
}

function startAutoPlay() {
  stopAutoPlay();
  timer = setInterval(() => mostrarCard(index + 1), 7000);
}

nextBtn?.addEventListener('click', () => {
  mostrarCard(index + 1);
  startAutoPlay();
});

prevBtn?.addEventListener('click', () => {
  mostrarCard(index - 1);
  startAutoPlay();
});

const track = document.querySelector('.carrossel-track');
track?.addEventListener('mouseenter', stopAutoPlay);
track?.addEventListener('mouseleave', startAutoPlay);

mostrarCard(0);
startAutoPlay();

const ctaTopo = document.querySelector('.cta-topo');

function ajustarCtaTopo() {
  if (!ctaTopo) return;

  const deveRecolher = window.scrollY > 40 || window.innerWidth <= 380;

  ctaTopo.classList.toggle('is-collapsed', deveRecolher);
}

window.addEventListener('scroll', ajustarCtaTopo, { passive: true });
window.addEventListener('resize', ajustarCtaTopo);

ajustarCtaTopo();

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    window.scrollTo(window.scrollX, window.scrollY);
  }, 50);
});

function fixIOSRotation() {
  setTimeout(() => {
    document.documentElement.style.display = 'none';
    document.documentElement.offsetHeight;
    document.documentElement.style.display = '';
  }, 60);
}

window.addEventListener('orientationchange', fixIOSRotation);
