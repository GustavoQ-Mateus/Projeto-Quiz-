;(function(){
  // Estado interno
  let idPartida = null;
  let pontuacao = 0;
  let nomeJogador = '';
  let nivelAtual = '';
  let tempoLimite = 0;
  let momentoInicioPergunta = 0;
  let rodadaEncerrada = false;
  let numeroAtual = 0;
  let totalPerguntas = 0;

  // Elementos principais
  const formInicio = document.getElementById('formInicio');
  const infoJog = document.getElementById('infoJog');
  const infoNivel = document.getElementById('infoNivel');
  const infoTempo = document.getElementById('infoTempo');
  const infoPontuacao = document.getElementById('infoPontuacao');
  const infoProgresso = document.getElementById('infoProgresso');
  const textoPergunta = document.getElementById('textoPergunta');
  const listaAlternativas = document.getElementById('listaAlternativas');
  const cronometro = document.getElementById('cronometro');
  const explicacao = document.getElementById('explicacao');
  const btnProx = document.getElementById('btnProx');
  const textoResumo = document.getElementById('textoResumo');
  const btnReiniciar = document.getElementById('btnReiniciar');
  const btnDetalhes = document.getElementById('btnDetalhes');
  const painelDetalhes = document.getElementById('painelDetalhes');
  const timerBarFill = document.getElementById('timerBarFill');

  function setState(st){ document.body.dataset.state = st; }

  try {
    const antigoNome = localStorage.getItem('quizNome');
    if(antigoNome){
      const nomeInput = document.getElementById('nomeJog');
      if(nomeInput && !nomeInput.value) nomeInput.value = antigoNome;
    }
  } catch(e){}

  mostraRankingCacheInicial();

  function mostraRankingCacheInicial(){
    try {
      const nivelSel = document.getElementById('nivelSel');
      const nivelVal = nivelSel ? nivelSel.value : '';
      if(!nivelVal) return;
      const cacheStr = localStorage.getItem('rank_' + nivelVal);
      if(!cacheStr) return;
      const listaRanking = document.getElementById('listaRanking');
      if(!listaRanking) return;
      listaRanking.innerHTML = '';
      const arr = JSON.parse(cacheStr);
      arr.forEach((item,i)=>{
        const li = document.createElement('li');
        // <ol> já fornece a numeração; remover prefixo manual
        li.textContent = item.nome + ' - ' + item.pontos + ' pts (' + item.tempoLimite + 's / ' + item.mediaTempo.toFixed(2) + 's médio)';
        listaRanking.appendChild(li);
      });
    } catch(e){}
  }

  function salvaRankingCache(nivel, lista){
    try {
      localStorage.setItem('rank_' + nivel, JSON.stringify(lista));
    } catch(e){}
  }

  function mostraStatus(){
    infoJog.textContent = 'Jogador: ' + nomeJogador;
    infoNivel.textContent = 'Nível: ' + nivelAtual;
    infoTempo.textContent = 'Tempo: ' + tempoLimite + 's';
    infoPontuacao.textContent = 'Pontuação: ' + pontuacao;
    infoProgresso.textContent = 'Pergunta ' + numeroAtual + '/' + totalPerguntas;
  }

  function renderPergunta(bloco){
    if(!bloco){ finalizarRodada(); return; }
    numeroAtual = bloco.numero;
    totalPerguntas = bloco.total;
    textoPergunta.textContent = bloco.texto;
    listaAlternativas.innerHTML = '';
    explicacao.textContent = '';
    btnProx.hidden = true;
    rodadaEncerrada = false;
    momentoInicioPergunta = performance.now();
    bloco.alternativas.forEach((alt,i)=>{
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = alt;
      b.className = 'btn answer-btn';
      b.addEventListener('click', ()=> enviaResposta(i));
      li.appendChild(b);
      listaAlternativas.appendChild(li);
    });
    // Foco primeira alternativa
    const primeiro = listaAlternativas.querySelector('button');
    if(primeiro) primeiro.focus();
    atualizaTimerBar(1); // cheio no início
    mostraStatus();
  }

  async function enviaResposta(indiceResposta){
    if(rodadaEncerrada) return;
    rodadaEncerrada = true;
    const tempoGasto = (performance.now() - momentoInicioPergunta)/1000;
    const botoes = Array.from(listaAlternativas.querySelectorAll('button'));
    botoes.forEach(b => b.disabled = true);
    try {
      const r = await fetch('/resposta', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ id: idPartida, indiceResposta, tempoGasto })
      });
      const json = await r.json();
      if(r.ok){
        pontuacao = json.pontos;
        if(json.certo){
          explicacao.textContent = 'Correta. +' + json.ganho + '. ' + (json.explicacao || '');
          if(indiceResposta >= 0){
            const escolhido = botoes[indiceResposta];
            if(escolhido) escolhido.classList.add('answer-btn--certa');
          }
        } else {
          
          explicacao.textContent = 'Errada. Explicação: ' + json.corretaTexto + '. ' + (json.explicacao || '');
          botoes.forEach(b => {
            if(b.textContent === json.corretaTexto){
              b.classList.add('answer-btn--certa');
            }
          });
          if(indiceResposta >= 0){
            const escolhido = botoes[indiceResposta];
            if(escolhido) escolhido.classList.add('answer-btn--errada');
          }
        }
        mostraStatus();
        if(json.fim){
          finalizarRodada();
        } else {
          btnProx.hidden = false;
          btnProx.dataset.proxima = JSON.stringify(json.proxima);
        }
      } else {
        explicacao.textContent = 'Falha na resposta.';
      }
    } catch(e){
      explicacao.textContent = 'Erro rede.';
    }
  }

  function mostraProxima(){
    const blob = btnProx.dataset.proxima;
    if(blob){
      const obj = JSON.parse(blob);
      renderPergunta(obj);
      btnProx.dataset.proxima = '';
    }
  }

  function loopCronometro(){
    if(document.body.dataset.state === 'jogo' && !rodadaEncerrada){
      const decorrido = (performance.now() - momentoInicioPergunta)/1000;
      const restante = Math.max(0, tempoLimite - decorrido);
      cronometro.textContent = 'Tempo restante: ' + restante.toFixed(1) + 's';
      const ratio = tempoLimite ? (restante / tempoLimite) : 0;
      atualizaTimerBar(ratio);
      if(restante <= 0){
        enviaResposta(-1);
      }
    }
    requestAnimationFrame(loopCronometro);
  }

  function atualizaTimerBar(ratio){
    if(!timerBarFill) return;
    const pct = Math.max(0, Math.min(1, ratio))*100;
    timerBarFill.style.width = pct + '%';
  }

  async function iniciar(){
    const nome = document.getElementById('nomeJog').value.trim();
    const nivel = document.getElementById('nivelSel').value;
    const tempo = document.getElementById('tempoSel').value;
    if(!nome){ alert('Nome obrigatório.'); return; }
    if(!nivel){ alert('Escolhe o nível.'); return; }
    if(!tempo){ alert('Escolhe o tempo.'); return; }
    nomeJogador = nome;
    nivelAtual = nivel;
    tempoLimite = parseInt(tempo,10);
    pontuacao = 0;
    numeroAtual = 0;
    totalPerguntas = 0;
    try {
      const r = await fetch('/partida', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ nome: nomeJogador, nivel: nivelAtual, tempoLimite })
      });
      const json = await r.json();
      if(!r.ok){ alert('Falhou iniciar'); return; }
      idPartida = json.id;
      try { localStorage.setItem('quizNome', nomeJogador); } catch(e){}
      setState('jogo');
      renderPergunta(json.pergunta);
    } catch(e){
      alert('Erro rede ao iniciar');
    }
  }

  function finalizarRodada(){
    setState('final');
    fetch('/final/' + idPartida)
      .then(r=>r.json())
      .then(fin=>{
        textoResumo.textContent = 'Pontuação final de ' + fin.nome + ': ' + fin.pontos + ' em ' + fin.totalPerguntas + ' perguntas. Tempo total ' + fin.tempoTotal.toFixed(2) + 's (média ' + fin.mediaTempo.toFixed(2) + 's).';
        return Promise.all([
          fetch('/ranking?nivel=' + encodeURIComponent(nivelAtual)),
          fetch('/historico/' + idPartida)
        ]);
      })
      .then(resps => Promise.all(resps.map(r => r.ok ? r.json() : Promise.resolve([]))))
      .then(([rankList, historico]) => {
        const listaRanking = document.getElementById('listaRanking');
        if(listaRanking){
          listaRanking.innerHTML = '';
          (rankList || []).forEach((item,i)=>{
            const li = document.createElement('li');
            li.textContent = item.nome + ' - ' + item.pontos + ' pts (' + item.tempoLimite + 's / ' + item.mediaTempo.toFixed(2) + 's médio)';
            listaRanking.appendChild(li);
          });
          if(!rankList || rankList.length === 0){
            const li = document.createElement('li');
            li.textContent = 'Sem dados ainda';
            listaRanking.appendChild(li);
          }
          salvaRankingCache(nivelAtual, rankList || []);
        }
        const listaDetalhes = document.getElementById('listaDetalhes');
        if(listaDetalhes && historico && historico.respostas){
          listaDetalhes.innerHTML = '';
          historico.respostas.forEach((r,i)=>{
            const item = document.createElement('div');
            item.className = 'item-hist';
            const cab = document.createElement('div');
            const badge = document.createElement('span');
            badge.className = 'badge ' + (r.certa ? 'badge--ok' : 'badge--fail');
            badge.textContent = r.certa ? 'ACERTO' : 'ERRO';
            const titulo = document.createElement('span');
            titulo.textContent = (i+1) + ') ' + r.pergunta;
            cab.appendChild(badge);
            cab.appendChild(document.createTextNode(' '));
            cab.appendChild(titulo);
            const meta = document.createElement('div');
            meta.textContent = 'Escolhida: ' + (r.escolhida>=0? r.alternativas[r.escolhida] : '—') + ' | Correta: ' + r.corretaTexto + ' | Tempo ' + r.tempo.toFixed(2) + 's';
            const exp = document.createElement('div');
            exp.textContent = 'Explicação: ' + r.explicacao;
            item.appendChild(cab);
            item.appendChild(meta);
            item.appendChild(exp);
            listaDetalhes.appendChild(item);
          });
        }
      })
      .catch(()=>{
        textoResumo.textContent += ' (Falhou carregar ranking/histórico)';
      });
  }

  btnReiniciar.addEventListener('click', () => {
    formInicio.reset();
    setState('inicio');
  });

  if(btnDetalhes){
    btnDetalhes.addEventListener('click', ()=>{
      if(!painelDetalhes) return;
      painelDetalhes.classList.toggle('is-hidden');
      const aberto = !painelDetalhes.classList.contains('is-hidden');
      btnDetalhes.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }

  formInicio.addEventListener('submit', function(ev){
    ev.preventDefault();
    iniciar();
  });

  btnProx.addEventListener('click', mostraProxima);

  requestAnimationFrame(loopCronometro);

  window.__quizProto = { iniciar };
})();
