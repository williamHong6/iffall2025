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
