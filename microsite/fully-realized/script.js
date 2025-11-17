// script.js

document.addEventListener('DOMContentLoaded', () => {
  // ---- 年份 ----
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ---- 只在有 modal 的页面才执行下面这部分 ----
  const modalOverlay = document.getElementById('equipmentModal');
  if (!modalOverlay) {
    // 比如在 Home / About 页面，没有这个 modal，直接结束就好
    return;
  }

  const modalImg = document.getElementById('modalImg');
  const modalTitleEn = document.getElementById('modalTitleEn');
  const modalTitleJp = document.getElementById('modalTitleJp');
  const modalTitlePinyin = document.getElementById('modalTitlePinyin');
  const modalDesc = document.getElementById('modalDesc');
  const closeBtn = modalOverlay.querySelector('.modal-close');

  // 只针对有 data-en 的卡片（你的茶道具卡片）
  const cards = document.querySelectorAll('.card[data-en]');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // 从 data- 属性里拿内容
      const en = card.dataset.en || card.querySelector('.en')?.textContent || '';
      const jp = card.dataset.jp || card.querySelector('.jp')?.textContent || '';
      const pinyin = card.dataset.pinyin || card.querySelector('.pinyin')?.textContent || '';
      const desc = card.dataset.desc || '';
      const imgSrc = card.dataset.img || card.querySelector('img')?.src || '';
      const alt = card.querySelector('img')?.alt || en;

      if (modalImg) {
        modalImg.src = imgSrc;
        modalImg.alt = alt;
      }
      if (modalTitleEn) modalTitleEn.textContent = en;
      if (modalTitleJp) modalTitleJp.textContent = jp;
      if (modalTitlePinyin) modalTitlePinyin.textContent = pinyin;
      if (modalDesc) modalDesc.textContent = desc;

      modalOverlay.classList.add('is-visible');
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('is-visible');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
