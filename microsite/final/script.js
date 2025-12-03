document.addEventListener('DOMContentLoaded', () => {
  const heroBg = document.querySelector('.hero-bg');
  const heroImage = document.querySelector('.hero-image');
  const hotspots = document.querySelectorAll('.hotspot');

  if (heroBg && heroImage && hotspots.length > 0) {
    const defaultSrc = heroBg.getAttribute('src');

    hotspots.forEach(hotspot => {
      const bigImg = hotspot.dataset.img;

      if (!bigImg) return;

      hotspot.addEventListener('mouseenter', () => {
        heroBg.src = bigImg;
      });
    });

    heroImage.addEventListener('mouseleave', () => {
      heroBg.src = defaultSrc;
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const chosen = document.querySelector('.nav .chosen_header');
  if (!chosen) return;

  const text = chosen.textContent.toLowerCase();

  if (!text.includes('procedure')) return;

  const layer = document.createElement('div');
  layer.className = 'blob-layer';
  document.body.appendChild(layer);

  layer.innerHTML = `
    <div class="blob blob--left"></div>
    <div class="blob blob--center"></div>
    <div class="blob blob--right"></div>
  `;
});

(function() {
  function initMobileFixedTooltip() {

    if (window.matchMedia && !window.matchMedia('(max-width: 768px)').matches) return;

    const chosen = document.querySelector('.nav .chosen_header');
    if (!chosen) return;
    const text = chosen.textContent.toLowerCase();
    if (!text.includes('home')) return;

    if (document.getElementById('fixed-tooltip')) return;

    const fixed = document.createElement('div');
    fixed.id = 'fixed-tooltip';
    fixed.innerHTML = `
      <div class="ft-content" aria-live="polite"></div>
      <button class="ft-close" aria-label="Close">Close</button>
    `;
    document.body.appendChild(fixed);

    const contentEl = fixed.querySelector('.ft-content');
    const closeBtn = fixed.querySelector('.ft-close');

    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(hot => {
      const inner = hot.querySelector('.tooltip');
      if (!inner) return;

      hot.addEventListener('click', function(ev) {
        ev.stopPropagation();
        contentEl.innerHTML = inner.innerHTML;
        fixed.classList.add('visible');
      });

      hot.addEventListener('touchstart', function(ev) {
        ev.stopPropagation();
        contentEl.innerHTML = inner.innerHTML;
        fixed.classList.add('visible');
      });
    });

    closeBtn.addEventListener('click', () => fixed.classList.remove('visible'));

    document.addEventListener('click', function(ev) {
      const isInside = ev.target.closest('#fixed-tooltip') || ev.target.closest('.hotspot');
      if (!isInside) fixed.classList.remove('visible');
    }, { passive: true });

    document.addEventListener('touchstart', function(ev) {
      const isInside = ev.target.closest('#fixed-tooltip') || ev.target.closest('.hotspot');
      if (!isInside) fixed.classList.remove('visible');
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileFixedTooltip);
  } else {
    initMobileFixedTooltip();
  }
})();

