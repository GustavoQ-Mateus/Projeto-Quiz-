function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (_) {
    return false;
  }
}

function smoothScrollTo(el) {
  if (!el) return;
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
  el.scrollIntoView({ behavior, block: 'start' });
}

function initHero() {
  if (window.__heroInitDone) return;
  window.__heroInitDone = true;
  const PREVIEW_INTERVAL_MS = 10000;
  const primary = document.getElementById('hero-cta-start');
  const secondary = document.getElementById('hero-cta-how');
  const faqCta = document.getElementById('hero-cta-faq');
  const difficultySection = document.getElementById('setup') || document.getElementById('menu-dificuldade');
  const nameInput = document.getElementById('nome');
  const previewQuestion = document.querySelector('#hero .preview-question');
  const previewOptions = document.querySelector('#hero .preview-options');

  if (primary) {
    primary.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.mostrarMenu === 'function') {
        window.mostrarMenu(difficultySection);
      } else {
        const menus = document.querySelectorAll('.menu');
        menus.forEach(m => m.classList.remove('active','reflow'));
        if (difficultySection) difficultySection.classList.add('active');
      }
      smoothScrollTo(difficultySection);
      if (nameInput) setTimeout(() => { nameInput.focus(); }, 60);
    });
  }

  if (secondary) {
    secondary.addEventListener('click', (e) => {
      e.preventDefault();
      const elementos = window.elementos || {};
      const howMenu = elementos.menuComoFunciona || document.getElementById('como-funciona');
      if (typeof window.mostrarMenu === 'function') {
        window.mostrarMenu(howMenu);
      } else {
        const menus = document.querySelectorAll('.menu');
        menus.forEach(m => m.classList.remove('active','reflow'));
        if (howMenu) howMenu.classList.add('active');
      }
      smoothScrollTo(howMenu);
    });
  }

  if (faqCta) {
    faqCta.addEventListener('click', (e) => {
      e.preventDefault();
      const elementos = window.elementos || {};
      const faqMenu = elementos.menuFaq || document.getElementById('faq');
      if (typeof window.mostrarMenu === 'function') {
        window.mostrarMenu(faqMenu);
      } else {
        const menus = document.querySelectorAll('.menu');
        menus.forEach(m => m.classList.remove('active','reflow'));
        if (faqMenu) faqMenu.classList.add('active');
      }
      smoothScrollTo(faqMenu);
    });
  }

  
  
  function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function setPreviewFromQuestion(q) {
    if (!q || !previewQuestion || !previewOptions) return;
    previewQuestion.textContent = q.pergunta || '';
    previewOptions.innerHTML = '';
    previewOptions.style.display = 'none';
  }
  function resolvePerguntas() {
    const conj = (typeof perguntasConjuntos !== 'undefined' && Array.isArray(perguntasConjuntos))
      ? perguntasConjuntos
      : (Array.isArray(globalThis.perguntasConjuntos) ? globalThis.perguntasConjuntos : []);
    return { conj };
  }

  function refreshPreview() {
    try {
      const { conj } = resolvePerguntas();
      const fontes = [];
      if (conj && conj.length) fontes.push(conj);
      if (!fontes.length) return;
      const todas = fontes.flat();
      const easy = todas.filter(q => q && q.dificuldade === 'Easy');
      const base = easy.length ? easy : todas;
      const q = pickRandom(base);
      setPreviewFromQuestion(q);
    } catch (_) { }
  }
  
  refreshPreview();
  let previewTimer = setInterval(refreshPreview, PREVIEW_INTERVAL_MS);
  
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(previewTimer);
    } else {
      refreshPreview();
      previewTimer = setInterval(refreshPreview, PREVIEW_INTERVAL_MS);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHero);
} else {
  initHero();
}
