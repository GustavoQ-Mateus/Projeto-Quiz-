// Proto inicial da lógica do quiz
// Nada de arquitetura perfeita; somente o necessário.

(function(){
  // Estado principal (agora via backend)
  let idPartida = null;
  let pontuacao = 0;
  let nomeJogador = '';
  let nivelAtual = '';
  let tempoLimite = 0; // segundos por pergunta
  let momentoInicioPergunta = 0;
  let rodadaEncerrada = false;
  let numeroAtual = 0;
  let totalPerguntas = 0;

  // Pega elementos do DOM de forma direta
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

  // Embaralhar meio tosco (suficiente aqui)
  // Não precisa mais das perguntas locais, tudo virá do backend.

  function mostraStatus(){
    infoJog.textContent = 'Jogador: ' + nomeJogador;
    infoNivel.textContent = 'Nível: ' + nivelAtual;
    infoTempo.textContent = 'Tempo: ' + tempoLimite + 's';
    infoPontuacao.textContent = 'Pontuação: ' + pontuacao;
    infoProgresso.textContent = 'Pergunta ' + numeroAtual + '/' + totalPerguntas;
  }

  // Bônus e pontuação agora calculados no servidor; aqui só cronômetro para envio do tempo.

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
    // desabilita imediatamente
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
          // guarda próxima para quando clicar
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
          enviaResposta(-1); // estourou tempo => errado
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
    // Busca confirmação final e ranking
    fetch('/final/' + idPartida)
      .then(r=>r.json())
      .then(fin=>{
        resumoFinal.style.display = 'block';
        textoResumo.textContent = 'Pontuação final de ' + fin.nome + ': ' + fin.pontos + ' em ' + fin.totalPerguntas + ' perguntas.';
        // Depois ranking
        return fetch('/ranking');
      })
      .then(r=> r.ok ? r.json() : [])
      .then(list => {
        const listaRanking = document.getElementById('listaRanking');
        if(listaRanking){
          listaRanking.innerHTML = '';
          list.forEach((item,i)=>{
            const li = document.createElement('li');
            li.textContent = (i+1) + '. ' + item.nome + ' - ' + item.pontos + ' pts (' + item.nivel + ', ' + item.tempoLimite + 's)';
            listaRanking.appendChild(li);
          });
          if(list.length === 0){
            const li = document.createElement('li');
            li.textContent = 'Sem dados ainda';
            listaRanking.appendChild(li);
          }
        }
      })
      .catch(()=>{
        resumoFinal.style.display = 'block';
        textoResumo.textContent += ' (Falhou carregar ranking)';
      });
  }

  // reinício simples
  btnReiniciar.addEventListener('click', () => {
    painelStatus.style.display = 'none';
    resumoFinal.style.display = 'none';
    blocoPergunta.style.display = 'none';
    formInicio.reset();
  });

  formInicio.addEventListener('submit', function(ev){
    ev.preventDefault();
    iniciar();
  });

  btnProx.addEventListener('click', mostraProxima);

  // loop de cronômetro
  requestAnimationFrame(loopCronometro);

  // Exposição mínima se quiser inspecionar
  window.__quizProto = { iniciar };
})();