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

import { mostrarMenu, getRanking, getVisibleRankingState } from '../script.js';

function initHero() {
  if (window.__heroInitDone) return;
  window.__heroInitDone = true;
  const primary = document.getElementById('hero-cta-start');
  const secondary = document.getElementById('hero-cta-how');
  const difficultySection = document.getElementById('setup') || document.getElementById('menu-dificuldade');
  const nameInput = document.getElementById('nome');

  if (primary) {
    primary.addEventListener('click', (e) => {
      e.preventDefault();
      if (mostrarMenu) { mostrarMenu(difficultySection); }
      smoothScrollTo(difficultySection);
      if (nameInput) setTimeout(() => { nameInput.focus(); }, 60);
    });
  }

  if (secondary) {
    secondary.addEventListener('click', (e) => {
      e.preventDefault();
      const elementos = window.elementos || {};
      const howMenu = elementos.menuComoFunciona || document.getElementById('como-funciona');
      if (mostrarMenu) { mostrarMenu(howMenu); }
      smoothScrollTo(howMenu);
    });
  }

  
  function updateHeroRankingPreview() {
    const list = document.querySelector('.preview-ranking-list');
    const headerSpan = document.querySelector('.preview-header span');
    if (!list) return;
    const state = (typeof getVisibleRankingState === 'function') ? getVisibleRankingState() : { conteudo: 'conjuntos', dificuldade: 'Easy' };
    const cont = state.conteudo;
    const diff = state.dificuldade;
    if (typeof getRanking !== 'function') return;
    const ranking = getRanking(cont, diff);
    list.innerHTML = '';
    if (!ranking.length) {
      const li = document.createElement('li');
      li.className = 'preview-ranking-empty';
      li.textContent = 'Sem pontuações ainda.';
      list.appendChild(li);
    } else {
      ranking.slice(0,5).forEach((item,i)=>{
        const li = document.createElement('li');
        li.className = 'preview-ranking-item';
        li.textContent = (i+1) + 'º ' + item.nome + ' - ' + item.pontos + ' pts';
        list.appendChild(li);
      });
    }
    if (headerSpan) {
      const label = (cont==='logica')?'Lógica':(cont==='conjuntos')?'Conjuntos':'Relação';
      headerSpan.textContent = 'Ranking — ' + label + ' (' + String(diff).toLowerCase() + ')';
    }
  }
  updateHeroRankingPreview();
  document.addEventListener('ranking-updated', updateHeroRankingPreview);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHero);
} else {
  initHero();
}
