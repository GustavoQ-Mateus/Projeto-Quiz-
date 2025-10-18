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
  const primary = document.getElementById('hero-cta-start');
  const secondary = document.getElementById('hero-cta-how');
  const difficultySection = document.getElementById('menu-dificuldade');
  const nameInput = document.getElementById('nome');
  const social = document.getElementById('hero-social-count');
  const previewQuestion = document.querySelector('#hero .preview-question');
  const previewOptions = document.querySelector('#hero .preview-options');
  const highlightLabel = document.getElementById('hero-highlight-label');

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

  // Prova social simples (valor estático com incremento sutil)
  if (social) {
    // Texto fixo solicitado
    social.textContent = '+12.021 participantes';
  }

  // Prévia aleatória dos 3 conteúdos (Relação, Lógica, Conjuntos)
  // Utilitário de aleatoriedade (ainda usado para escolher a pergunta dentro do conjunto)
  function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function setPreviewFromQuestion(q, tipo) {
    if (!q || !previewQuestion || !previewOptions) return;
    previewQuestion.textContent = q.pergunta || '';
    previewOptions.innerHTML = '';
    const alts = q.alternativas || (typeof q.resposta === 'boolean' ? ['Sim', 'Não'] : []);
    (alts || []).slice(0, 3).forEach((alt) => {
      const div = document.createElement('div');
      div.className = 'preview-option';
      div.textContent = String(alt);
      previewOptions.appendChild(div);
    });
    if (highlightLabel) highlightLabel.textContent = tipo;
  }

  // Rotação determinística: Relação -> Lógica -> Conjuntos
  let rotateIdx = 0;
  const orderTipos = ['Relação', 'Lógica', 'Conjuntos'];
  function getFonteByTipo(tipo) {
    if (tipo === 'Relação') return { tipo, arr: window.perguntasRelacao };
    if (tipo === 'Lógica') return { tipo, arr: window.perguntasLogica };
    if (tipo === 'Conjuntos') return { tipo, arr: window.perguntasConjuntos };
    return { tipo, arr: undefined };
  }

  function refreshPreview() {
    try {
      const len = orderTipos.length;
      let chosen = null;
      let chosenIdx = rotateIdx;
      for (let step = 0; step < len; step++) {
        const idx = (rotateIdx + step) % len;
        const fonte = getFonteByTipo(orderTipos[idx]);
        if (Array.isArray(fonte.arr) && fonte.arr.length) {
          chosen = fonte;
          chosenIdx = idx;
          break;
        }
      }
      if (!chosen) return; // nenhuma fonte disponível
      const easy = (chosen.arr || []).filter(q => q && q.dificuldade === 'Easy');
      const base = easy.length ? easy : chosen.arr;
      if (!base || !base.length) return;
      const q = pickRandom(base);
      setPreviewFromQuestion(q, chosen.tipo);
      rotateIdx = (chosenIdx + 1) % len;
    } catch (_) { /* ignora erros de amostragem */ }
  }

  // Rotacionar destaque dos conteúdos e atualizar preview a cada 4s
  refreshPreview();
  let previewTimer = setInterval(refreshPreview, 4000);

  // Pausa quando a aba fica oculta para economizar recursos
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(previewTimer);
    } else {
      refreshPreview();
      previewTimer = setInterval(refreshPreview, 4000);
    }
  });
}

// Inicia ao carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHero);
} else {
  initHero();
}
