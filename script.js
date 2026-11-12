// 1. КОНФИГУРАЦИЯ СТАТИСТИКИ (ЗАМЕНИТЕ НА РЕАЛЬНЫЕ ДАННЫЕ ПРИ НЕОБХОДИМОСТИ)
const BURGER_VPN_STATS = {
  users:   { value: 48500, suffix: '+',       decimals: 0 },
  servers: { value: 64,    suffix: '',        decimals: 0 },
  speed:   { value: 10,    suffix: ' Гбит/с', decimals: 0 },
  uptime:  { value: 99.9,  suffix: '%',       decimals: 1 }
};

// 2. СКРЫТИЕ ПРЕЛОАДЕРА ПРИ ЗАГРУЗКЕ
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 900);
});

// 3. НАВБАР ПРИ ПРОКРУТКЕ И МОБИЛЬНОЕ МЕНЮ
const navbar = document.getElementById('navbar');
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// 4. ГЕНЕРАЦИЯ ЛЕВИТИРУЮЩИХ 3D-БУРГЕРОВ НА ФОНЕ
(function createFloatingBurgers() {
  const container = document.getElementById('burgers-layer');
  if (!container) return;

  const configs = [
    { x: '6%',  y: '14%', size: 88,  depth: 0.04, blur: 0,   opacity: 0.72, floatDur: '10s', spinDur: '28s' },
    { x: '84%', y: '18%', size: 115, depth: 0.06, blur: 0.5, opacity: 0.78, floatDur: '12s', spinDur: '34s' },
    { x: '12%', y: '62%', size: 64,  depth: 0.02, blur: 2,   opacity: 0.45, floatDur: '9s',  spinDur: '24s' },
    { x: '88%', y: '68%', size: 96,  depth: 0.05, blur: 1,   opacity: 0.65, floatDur: '11s', spinDur: '30s' },
    { x: '48%', y: '82%', size: 72,  depth: 0.03, blur: 1.5, opacity: 0.5,  floatDur: '13s', spinDur: '26s' },
    { x: '74%', y: '44%', size: 54,  depth: 0.02, blur: 2.5, opacity: 0.38, floatDur: '8s',  spinDur: '20s' }
  ];

  configs.forEach((cfg, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'floating-burger-wrapper';
    wrapper.style.left = cfg.x;
    wrapper.style.top = cfg.y;
    wrapper.style.opacity = cfg.opacity;
    wrapper.style.filter = cfg.blur ? `blur(${cfg.blur}px)` : 'none';
    wrapper.dataset.depth = cfg.depth;

    const burger = document.createElement('div');
    burger.className = 'floating-burger';
    burger.style.width = `${cfg.size}px`;
    burger.style.height = `${cfg.size}px`;
    burger.style.setProperty('--float-dur', cfg.floatDur);
    burger.style.setProperty('--spin-dur', cfg.spinDur);
    burger.style.setProperty('--drift-x', `${(idx % 2 === 0 ? 1 : -1) * 28}px`);
    burger.style.setProperty('--drift-y', `${-35 - idx * 4}px`);

    burger.innerHTML = `
      <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bunTop_${idx}" cx="38%" cy="28%" r="70%">
            <stop offset="0%" stop-color="#FFC266"/>
            <stop offset="45%" stop-color="#FF7B00"/>
            <stop offset="100%" stop-color="#9E2A00"/>
          </radialGradient>
          <linearGradient id="pattyGrad_${idx}" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#3B180C"/>
            <stop offset="50%" stop-color="#6E2C12"/>
            <stop offset="100%" stop-color="#290F06"/>
          </linearGradient>
          <linearGradient id="cheeseGrad_${idx}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFD000"/>
            <stop offset="100%" stop-color="#FF8800"/>
          </linearGradient>
        </defs>
        <path d="M22 52C22 30 39 18 60 18C81 18 98 30 98 52H22Z" fill="url(#bunTop_${idx})"/>
        <ellipse cx="45" cy="31" rx="3" ry="1.6" transform="rotate(-18 45 31)" fill="#FFF4D9" fill-opacity="0.9"/>
        <ellipse cx="60" cy="27" rx="3.2" ry="1.6" transform="rotate(10 60 27)" fill="#FFF4D9" fill-opacity="0.9"/>
        <ellipse cx="75" cy="32" rx="3" ry="1.6" transform="rotate(24 75 32)" fill="#FFF4D9" fill-opacity="0.9"/>
        <ellipse cx="52" cy="40" rx="2.6" ry="1.4" transform="rotate(-8 52 40)" fill="#FFF4D9" fill-opacity="0.8"/>
        <ellipse cx="68" cy="41" rx="2.6" ry="1.4" transform="rotate(15 68 41)" fill="#FFF4D9" fill-opacity="0.8"/>
        <path d="M17 57C25 52 33 62 41 57C49 52 57 62 65 57C73 52 81 62 89 57C95 53 100 58 103 57" stroke="#22C55E" stroke-width="6" stroke-linecap="round"/>
        <path d="M21 63H99L86 74L73 65L60 76L46 65L32 73L21 63Z" fill="url(#cheeseGrad_${idx})"/>
        <rect x="18" y="69" width="84" height="14" rx="7" fill="url(#pattyGrad_${idx})"/>
        <path d="M23 86H97V92C97 98.5 91.5 103 85 103H35C28.5 103 23 98.5 23 92V86Z" fill="url(#bunTop_${idx})"/>
      </svg>
    `;

    wrapper.appendChild(burger);
    container.appendChild(wrapper);
  });

  window.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    document.querySelectorAll('.floating-burger-wrapper').forEach(el => {
      const depth = parseFloat(el.dataset.depth || '0.03');
      const moveX = cx * depth * 750;
      const moveY = cy * depth * 750;
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  });
})();

// 5. АНИМИРОВАННЫЕ ОРАНЖЕВЫЕ ЧАСТИЦЫ (CANVAS)
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, particles;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(55, Math.floor(width / 26));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.55 - 0.15,
      alpha: Math.random() * 0.65 + 0.2
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 123, 0, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff6b00';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize();
  createParticles();
  animate();
})();

// 6. ПОДСВЕТКА GLASS-КАРТОЧЕК ПРИ НАВЕДЕНИИ КУРСОРА
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

// 7. ИНТЕРАКТИВНЫЙ 3D-ВИДЖЕТ НА ГЛАВНОМ ЭКРАНЕ
const widget = document.getElementById('vpn-widget');
const powerBtn = document.getElementById('power-toggle');
const powerStatus = document.getElementById('power-status');
const metricDown = document.getElementById('metric-down');
const widgetPing = document.getElementById('widget-ping');

if (widget) {
  widget.addEventListener('mousemove', (e) => {
    const rect = widget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    widget.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  });
  widget.addEventListener('mouseleave', () => {
    widget.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

let isConnected = true;
if (powerBtn) {
  powerBtn.addEventListener('click', () => {
    isConnected = !isConnected;
    powerBtn.classList.toggle('connected', isConnected);
    if (isConnected) {
      powerStatus.textContent = 'ЗАЩИЩЕНО • 10 ГБИТ/С';
      powerStatus.style.color = '#ff9933';
      metricDown.textContent = '948.4 Мбит/с';
      widgetPing.textContent = '14 ms';
      widgetPing.style.color = '#22c55e';
    } else {
      powerStatus.textContent = 'ОТКЛЮЧЕНО • НАЖМИТЕ';
      powerStatus.style.color = '#a39e99';
      metricDown.textContent = '0.0 Мбит/с';
      widgetPing.textContent = '—';
      widgetPing.style.color = '#a39e99';
    }
  });
}

// 8. ПЛАВНОЕ ПОЯВЛЕНИЕ БЛОКОВ И АНИМАЦИЯ СЧЁТЧИКОВ
let statsAnimated = false;

function animateCounters() {
  if (statsAnimated) return;
  statsAnimated = true;

  document.querySelectorAll('[data-stat]').forEach(el => {
    const key = el.dataset.stat;
    const cfg = BURGER_VPN_STATS[key];
    if (!cfg) return;

    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = cfg.value * ease;
      const formatted = cfg.decimals > 0
        ? current.toFixed(cfg.decimals)
        : Math.floor(current).toLocaleString('ru-RU');
      el.textContent = `${formatted}${cfg.suffix}`;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.closest('#stats')) {
        animateCounters();
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
