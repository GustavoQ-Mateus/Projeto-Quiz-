 (function(){
  let idPartida = null;
  let pontuacao = 0;
  let nomeJogador = '';
  let nivelAtual = '';
  let tempoLimite = 0;
  let momentoInicioPergunta = 0;
  let rodadaEncerrada = false;
  let numeroAtual = 0;
  let totalPerguntas = 0;

  const formInicio = document.getElementById('formInicio');
  const painelStatus = document.getElementById('painelStatus');
  const infoJog = document.getElementById('infoJog');
  const infoNivel = document.getElementById('infoNivel');
  const infoTempo = document.getElementById('infoTempo');
  const infoPontuacao = document.getElementById('infoPontuacao');
  const infoProgresso = document.getElementById('infoProgresso');

  const blocoPergunta = document.getElementById('blocoPergunta');
  const textoPergunta = document.getElementById('textoPergunta');
  const caixaRespostas = document.getElementById('caixaRespostas');
  const cronometro = document.getElementById('cronometro');
  const explicacao = document.getElementById('explicacao');
  const btnProx = document.getElementById('btnProx');

  const resumoFinal = document.getElementById('resumoFinal');
  const textoResumo = document.getElementById('textoResumo');
  const btnReiniciar = document.getElementById('btnReiniciar');
  const btnDetalhes = document.getElementById('btnDetalhes');
  const painelDetalhes = document.getElementById('painelDetalhes');

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
        li.textContent = (i+1) + '. ' + item.nome + ' - ' + item.pontos + ' pts (' + item.tempoLimite + 's / ' + item.mediaTempo.toFixed(2) + 's médio)';
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
    caixaRespostas.innerHTML = '';
    explicacao.textContent = '';
    btnProx.style.display = 'none';
    rodadaEncerrada = false;
    momentoInicioPergunta = performance.now();
    bloco.alternativas.forEach((alt,i)=>{
      const b = document.createElement('button');
      b.textContent = alt;
      b.style.display = 'block';
      b.style.margin = '4px 0';
      b.addEventListener('click', ()=> enviaResposta(i));
      caixaRespostas.appendChild(b);
    });
    mostraStatus();
  }

  async function enviaResposta(indiceResposta){
    if(rodadaEncerrada) return;
    rodadaEncerrada = true;
    const tempoGasto = (performance.now() - momentoInicioPergunta)/1000;
    Array.from(caixaRespostas.children).forEach(b => b.disabled = true);
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
          explicacao.textContent = '✔ Correta. +' + json.ganho + '. ' + (json.explicacao || '');
        } else {
          explicacao.textContent = '✖ Errada. Correta: ' + json.corretaTexto + '. ' + (json.explicacao || '');
        }
        mostraStatus();
        if(json.fim){
          finalizarRodada();
        } else {
          btnProx.style.display = 'inline-block';
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
      if(blocoPergunta.style.display !== 'none' && !rodadaEncerrada){
        const decorrido = (performance.now() - momentoInicioPergunta)/1000;
        const restante = Math.max(0, tempoLimite - decorrido);
        cronometro.textContent = 'Tempo restante: ' + restante.toFixed(1) + 's';
        if(restante <= 0){
          enviaResposta(-1);
        }
      }
    requestAnimationFrame(loopCronometro);
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
      painelStatus.style.display = 'block';
      blocoPergunta.style.display = 'block';
      resumoFinal.style.display = 'none';
      renderPergunta(json.pergunta);
    } catch(e){
      alert('Erro rede ao iniciar');
    }
  }

  function finalizarRodada(){
    blocoPergunta.style.display = 'none';
    fetch('/final/' + idPartida)
      .then(r=>r.json())
      .then(fin=>{
        resumoFinal.style.display = 'block';
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
            li.textContent = (i+1) + '. ' + item.nome + ' - ' + item.pontos + ' pts (' + item.tempoLimite + 's / ' + item.mediaTempo.toFixed(2) + 's médio)';
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
            const div = document.createElement('div');
            const prefixo = r.certa ? '✔' : '✖';
            div.style.marginBottom = '6px';
            div.textContent = (i+1) + ') ' + prefixo + ' ' + r.pergunta + ' | Escolhida: ' + (r.escolhida>=0? r.alternativas[r.escolhida] : '—') + ' | Correta: ' + r.corretaTexto + ' | Tempo ' + r.tempo.toFixed(2) + 's';
            const exp = document.createElement('div');
            exp.style.marginLeft = '14px';
            exp.style.color = '#444';
            exp.textContent = 'Explicação: ' + r.explicacao;
            listaDetalhes.appendChild(div);
            listaDetalhes.appendChild(exp);
          });
        }
      })
      .catch(()=>{
        resumoFinal.style.display = 'block';
        textoResumo.textContent += ' (Falhou carregar ranking/histórico)';
      });
  }

  btnReiniciar.addEventListener('click', () => {
    painelStatus.style.display = 'none';
    resumoFinal.style.display = 'none';
    blocoPergunta.style.display = 'none';
    formInicio.reset();
  });

  if(btnDetalhes){
    btnDetalhes.addEventListener('click', ()=>{
      if(!painelDetalhes) return;
      painelDetalhes.style.display = painelDetalhes.style.display === 'none' ? 'block' : 'none';
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
