// scripts/hero.js - comportamento do hero (CTAs, rolagem, prova social)

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
  if (window.__heroInitDone) return; // evita inicialização dupla
  window.__heroInitDone = true;
  const PREVIEW_INTERVAL_MS = 10000; // 10s entre trocas de pergunta
  const primary = document.getElementById('hero-cta-start');
  const secondary = document.getElementById('hero-cta-how');
  const difficultySection = document.getElementById('menu-dificuldade');
  const nameInput = document.getElementById('nome');
  // social count removed
  const previewQuestion = document.querySelector('#hero .preview-question');
  const previewOptions = document.querySelector('#hero .preview-options');
  // highlight label removed

  if (primary) {
    primary.addEventListener('click', (e) => {
      e.preventDefault();
      // Ativa o menu de dificuldade e desativa os demais
  const menus = document.querySelectorAll('.menu');
  menus.forEach(m => m.classList.remove('active', 'reflow'));
  if (difficultySection) difficultySection.classList.add('reflow');
      // Rola até a seção agora visível
      smoothScrollTo(difficultySection);
      if (nameInput) {
        // Dar um pequeno delay para evitar conflito com scroll
        setTimeout(() => { nameInput.focus(); }, 60);
      }
    });
  }

  if (secondary) {
    secondary.addEventListener('click', (e) => {
      e.preventDefault();
      const how = document.getElementById('como-funciona');
      smoothScrollTo(how || difficultySection);
    });
  }

  // Prova social removida

  // Prévia aleatória dos 3 conteúdos (Relação, Lógica, Conjuntos)
  // Utilitário de aleatoriedade (ainda usado para escolher a pergunta dentro do conjunto)
  function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function setPreviewFromQuestion(q) {
    if (!q || !previewQuestion || !previewOptions) return;
    previewQuestion.textContent = q.pergunta || '';
    // Para evitar confusão visual, não exibimos alternativas na prévia
    previewOptions.innerHTML = '';
    previewOptions.style.display = 'none';
  }
  // Aggregated random preview from all available content arrays
  function resolvePerguntas() {
    const rel = (typeof perguntasRelacao !== 'undefined' && Array.isArray(perguntasRelacao))
      ? perguntasRelacao
      : (Array.isArray(globalThis.perguntasRelacao) ? globalThis.perguntasRelacao : []);
    const log = (typeof perguntasLogica !== 'undefined' && Array.isArray(perguntasLogica))
      ? perguntasLogica
      : (Array.isArray(globalThis.perguntasLogica) ? globalThis.perguntasLogica : []);
    const conj = (typeof perguntasConjuntos !== 'undefined' && Array.isArray(perguntasConjuntos))
      ? perguntasConjuntos
      : (Array.isArray(globalThis.perguntasConjuntos) ? globalThis.perguntasConjuntos : []);
    return { rel, log, conj };
  }

  function refreshPreview() {
    try {
      const { rel, log, conj } = resolvePerguntas();
      const fontes = [];
      if (rel && rel.length) fontes.push(rel);
      if (log && log.length) fontes.push(log);
      if (conj && conj.length) fontes.push(conj);
      if (!fontes.length) return;
      // Preferir perguntas Easy quando houver, caindo para qualquer dificuldade
      const todas = fontes.flat();
      const easy = todas.filter(q => q && q.dificuldade === 'Easy');
      const base = easy.length ? easy : todas;
      const q = pickRandom(base);
      setPreviewFromQuestion(q);
    } catch (_) { /* ignora erros de amostragem */ }
  }

  // Rotacionar destaque dos conteúdos e atualizar preview a cada 10s
  refreshPreview();
  let previewTimer = setInterval(refreshPreview, PREVIEW_INTERVAL_MS);

  // Pausa quando a aba fica oculta para economizar recursos
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(previewTimer);
    } else {
      refreshPreview();
      previewTimer = setInterval(refreshPreview, PREVIEW_INTERVAL_MS);
    }
  });
}

// Inicia ao carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHero);
} else {
  initHero();
}
