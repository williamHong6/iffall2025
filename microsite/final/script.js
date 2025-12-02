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

  // 只在 Procedure 页启用（About 页不再启用）
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

// ---------- Mobile: 集中式固定 tooltip 逻辑 ----------
(function() {
  function initMobileFixedTooltip() {
    // 只在移动宽度下启用（防止桌面重复行为）
    if (window.matchMedia && !window.matchMedia('(max-width: 768px)').matches) return;

    // 如果已经存在就不要重复创建
    if (document.getElementById('fixed-tooltip')) return;

    // 创建固定 tooltip 容器并添加到 body
    const fixed = document.createElement('div');
    fixed.id = 'fixed-tooltip';
    fixed.innerHTML = '<div class="ft-content" aria-live="polite"></div><button class="ft-close" aria-label="Close">Close</button>';
    document.body.appendChild(fixed);

    const contentEl = fixed.querySelector('.ft-content');
    const closeBtn = fixed.querySelector('.ft-close');

    // 给每个 hotspot 添加触发器：click / touch
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(hot => {
      // 找到内部的 tooltip 内容（如果没有就跳过）
      const inner = hot.querySelector('.tooltip');
      if (!inner) return;

      // 点击 / 触摸时显示固定 tooltip（移动端友好）
      hot.addEventListener('click', function (ev) {
        ev.stopPropagation();
        // 取 tooltip 的 innerHTML（你可以只取文本）
        contentEl.innerHTML = inner.innerHTML;
        fixed.classList.add('visible');

        // Optional: 把网页滚动到底部一点，确保 tooltip 可见（只在很短页面时有用）
        // window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      });

      // 也绑定 touchstart，增强移动设备响应
      hot.addEventListener('touchstart', function (ev) {
        ev.stopPropagation();
        contentEl.innerHTML = inner.innerHTML;
        fixed.classList.add('visible');
      });
    });

    // 关闭按钮
    closeBtn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      fixed.classList.remove('visible');
    });

    // 点页面任意空白处关闭 tooltip
    document.addEventListener('click', function (ev) {
      const isInside = ev.target.closest('#fixed-tooltip') || ev.target.closest('.hotspot');
      if (!isInside) fixed.classList.remove('visible');
    }, { passive: true });

    // 在触摸设备上，点空白也关闭
    document.addEventListener('touchstart', function (ev) {
      const isInside = ev.target.closest('#fixed-tooltip') || ev.target.closest('.hotspot');
      if (!isInside) fixed.classList.remove('visible');
    }, { passive: true });

    // 可选：当窗口从窄变宽时，隐藏 fixed tooltip
    window.addEventListener('resize', () => {
      if (!(window.matchMedia && window.matchMedia('(max-width: 768px)').matches)) {
        const ft = document.getElementById('fixed-tooltip');
        if (ft) ft.classList.remove('visible');
      }
    });
  }

  // 初始化（如果 DOMContentLoaded 已经发生，这里也会执行）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileFixedTooltip);
  } else {
    initMobileFixedTooltip();
  }
})();
