document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const buttons = document.querySelectorAll('[data-goto]');

  function goTo(id) {
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // pause video when leaving page3
      const vid = document.querySelector('#page3 video');
      if (vid && id !== 'page3') {
        vid.pause();
      }
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const dest = btn.getAttribute('data-goto');
      goTo(dest);
    });
  });

  // ---------- Floating hearts background ----------
  const heartLayer = document.getElementById('floatingHearts');
  const heartSVG = `<svg viewBox="0 0 32 29"><path d="M16 27C7 20.5 1 14 1 8.5 1 3.8 4.6 1 8.6 1c2.6 0 5 1.4 7.4 4.6C18.4 2.4 20.8 1 23.4 1 27.4 1 31 3.8 31 8.5 31 14 25 20.5 16 27Z" fill="currentColor"/></svg>`;

  function spawnFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = heartSVG;

    const size = 14 + Math.random() * 26;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 7;
    const drift = (Math.random() * 120 - 60) + 'px';
    const rot = (Math.random() * 40 - 20) + 'deg';
    const hue = Math.random() > 0.5 ? 'rgba(255,255,255,0.4)' : 'rgba(255, 182, 213, 0.8)';

    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.left = left + '%';
    heart.style.color = hue;
    heart.style.setProperty('--drift', drift);
    heart.style.setProperty('--rot', rot);
    heart.style.animationDuration = duration + 's';

    heartLayer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 200);
  }

  // seed a few immediately so it doesn't feel empty on load
  for (let i = 0; i < 8; i++) {
    setTimeout(spawnFloatingHeart, i * 400);
  }
  setInterval(spawnFloatingHeart, 900);

  // ---------- Interactive heart on page 9 ----------
  const bigHeart = document.getElementById('bigHeart');
  if (bigHeart) {
    const triggerHeart = (e) => {
      bigHeart.classList.remove('tapped');
      void bigHeart.offsetWidth; // restart animation
      bigHeart.classList.add('tapped');
      burstMiniHearts(bigHeart);
    };
    bigHeart.addEventListener('click', triggerHeart);
    bigHeart.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerHeart(e);
      }
    });
  }

  function burstMiniHearts(originEl) {
    const rect = originEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const count = 10;

    for (let i = 0; i < count; i++) {
      const mini = document.createElement('div');
      mini.className = 'mini-heart';
      mini.textContent = '❤';

      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const distance = 50 + Math.random() * 60;
      const mx = Math.cos(angle) * distance + 'px';
      const my = Math.sin(angle) * distance - 30 + 'px';
      const mr = (Math.random() * 180 - 90) + 'deg';

      mini.style.left = originX + 'px';
      mini.style.top = originY + 'px';
      mini.style.setProperty('--mx', mx);
      mini.style.setProperty('--my', my);
      mini.style.setProperty('--mr', mr);
      mini.style.fontSize = (12 + Math.random() * 14) + 'px';

      document.body.appendChild(mini);
      setTimeout(() => mini.remove(), 950);
    }
  }
});
