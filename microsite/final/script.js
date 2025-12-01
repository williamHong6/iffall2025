document.addEventListener('DOMContentLoaded', () => {
  const heroBg = document.querySelector('.hero-bg');
  const heroImage = document.querySelector('.hero-image');
  const hotspots = document.querySelectorAll('.hotspot');

  if (heroBg && heroImage && hotspots.length > 0) {
    const defaultSrc = heroBg.getAttribute('src'); // 首页默认那张

    hotspots.forEach(hotspot => {
      const bigImg = hotspot.dataset.img; // 读 data-img

      if (!bigImg) return;

      hotspot.addEventListener('mouseenter', () => {
        heroBg.src = bigImg;
      });
    });

    // 鼠标离开整个 hero 区域时，换回默认图
    heroImage.addEventListener('mouseleave', () => {
      heroBg.src = defaultSrc;
    });
  }
});

// About / Procedure 页面：不规则色块缓慢漂浮背景
document.addEventListener('DOMContentLoaded', () => {
  const chosen = document.querySelector('.nav .chosen_header');
  if (!chosen) return;

  const text = chosen.textContent.toLowerCase();

  // 只在 About 和 Procedure 页启用
  if (!text.includes('about') && !text.includes('procedure')) return;

  const layer = document.createElement('div');
  layer.className = 'blob-layer';
  document.body.appendChild(layer);

  layer.innerHTML = `
    <div class="blob blob--left"></div>
    <div class="blob blob--center"></div>
    <div class="blob blob--right"></div>
  `;
});
