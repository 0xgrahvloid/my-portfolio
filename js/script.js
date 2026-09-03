
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(isHidden));
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => {
    if (!el.classList.contains('show')) revealObserver.observe(el);
  });

  const focusWords = ['Graphic Design', 'Video Editing', 'Social Media', 'UI Design', 'Creative Technology'];
  const focusEl = document.getElementById('heroFocusText');
  if (focusEl) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % focusWords.length;
      focusEl.classList.add('is-swapping');
      setTimeout(() => {
        focusEl.textContent = focusWords[idx];
        focusEl.classList.remove('is-swapping');
      }, 180);
    }, 2300);
  }

  document.querySelectorAll('.skill-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.remove('is-bouncing');
      void chip.offsetWidth;
      chip.classList.add('is-bouncing');
      setTimeout(() => chip.classList.remove('is-bouncing'), 420);
    });
  });

  const cvModal = document.getElementById('cvModal');
  const closeCvModal = document.getElementById('closeCvModal');
  const viewCvButtons = document.querySelectorAll('[data-view-cv]');
  const downloadCvButtons = document.querySelectorAll('[data-download-cv]');
  const cvPath = 'assets/cv/Anugrah-Pratama-CV-2026.pdf';

  const openCvModal = () => {
    if (!cvModal) return;
    cvModal.classList.remove('hidden');
    cvModal.classList.add('flex');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    if (!cvModal) return;
    cvModal.classList.add('hidden');
    cvModal.classList.remove('flex');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  viewCvButtons.forEach((btn) => btn.addEventListener('click', openCvModal));
  if (closeCvModal) closeCvModal.addEventListener('click', closeModal);
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  downloadCvButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = cvPath;
      link.download = 'Anugrah-Pratama-CV-2026.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  });
});
