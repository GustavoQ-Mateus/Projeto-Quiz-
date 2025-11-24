// Backend bem direto só para registrar pontuação opcional
// Não está "perfeito". Guarda partidas em memória. Se reiniciar, perde.

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Armazena as partidas em memória (é só um proto, some ao reiniciar)
// partidas[id] = { nome, nivel, tempoLimite, perguntas:[...], atual, pontos }
const partidas = {};
let seq = 1;

// Ranking em memória
// Cada entrada: { nome, pontos, nivel, tempoLimite, dataISO }
const ranking = [];

// Carrega perguntas do arquivo local (node usa require)
const perguntasArquivo = require('./conteudoConjuntos.js'); // vai pegar o array exportado (ajuste se não estiver module.exports)
// Se o arquivo não exportar, adaptar manualmente abaixo
const fontePerguntas = perguntasArquivo.perguntasConjuntos || perguntasArquivo || global.perguntasConjuntos;

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

const limitePorNivel = { Easy:5, Basic:10, Medium:15, Hard:20 };

function sorteia(dif){
  const todas = fontePerguntas.filter(p => p.dificuldade === dif);
  shuffle(todas);
  const limite = limitePorNivel[dif] || 5;
  const escolhidas = todas.slice(0, limite);
  // Para cada pergunta, embaralhar alternativas e recalcular índice correto
  return escolhidas.map(orig => {
    const indices = orig.alternativas.map((_,i)=>i);
    shuffle(indices);
    const alternativasMix = indices.map(i => orig.alternativas[i]);
    const novoCorreto = indices.indexOf(orig.respostaCorreta);
    return {
      dificuldade: orig.dificuldade,
      pergunta: orig.pergunta,
      alternativas: alternativasMix,
      respostaCorreta: novoCorreto,
      explicacao: orig.explicacao
    };
  });
}

const bonusPorTempo = {20:0.05,30:0.04,40:0.03,50:0.015,60:0};

function registraNoRanking(partida){
  // Evita duplicar mesma partida (checa se já existe combinação nome+nivel+pontos+tempoLimite+atual==total)
  const ja = ranking.find(r => r.nome===partida.nome && r.pontos===partida.pontos && r.nivel===partida.nivel && r.tempoLimite===partida.tempoLimite);
  if(ja) return; // simples
  ranking.push({
    nome: partida.nome,
    pontos: partida.pontos,
    nivel: partida.nivel,
    tempoLimite: partida.tempoLimite,
    dataISO: new Date().toISOString()
  });
  // Mantém só últimos 100 para não crescer infinito
  if(ranking.length > 100){
    ranking.splice(0, ranking.length - 100);
  }
}

app.post('/partida', (req,res) => {
  const { nome, nivel, tempoLimite } = req.body || {};
  if(!nome || !nivel || !tempoLimite) return res.status(400).json({ erro: 'faltou dado' });
  const id = String(seq++);
  partidas[id] = {
    nome,
    nivel,
    tempoLimite: parseInt(tempoLimite,10),
    perguntas: sorteia(nivel),
    atual: 0,
    pontos: 0
  };
  const primeira = partidas[id].perguntas[0];
  res.json({ id, pergunta: { texto: primeira.pergunta, alternativas: primeira.alternativas, numero: 1, total: partidas[id].perguntas.length } });
});

app.post('/resposta', (req,res) => {
  const { id, indiceResposta, tempoGasto } = req.body || {};
  const partida = partidas[id];
  if(!partida) return res.status(404).json({ erro: 'partida não achada' });
  if(partida.atual >= partida.perguntas.length) return res.status(400).json({ erro: 'já acabou' });

  const perg = partida.perguntas[partida.atual];
  let ganho = 0;
  let certa = false;
  if(indiceResposta === perg.respostaCorreta){
    certa = true;
    const maxB = bonusPorTempo[partida.tempoLimite] || 0;
    const sobra = Math.max(0, partida.tempoLimite - tempoGasto);
    const pct = maxB * (sobra / partida.tempoLimite);
    ganho = Math.round(100 * (1 + pct));
    partida.pontos += ganho;
  }
  partida.atual++;
  const fim = partida.atual >= partida.perguntas.length;
  let proxima = null;
  if(!fim){
    const np = partida.perguntas[partida.atual];
    proxima = { texto: np.pergunta, alternativas: np.alternativas, numero: partida.atual+1, total: partida.perguntas.length };
  } else {
    // Finalizou aqui (sem chamar /final ainda). Deixa registro quando o cliente chamar /final
  }
  res.json({ certo: certa, ganho, pontos: partida.pontos, fim, proxima, explicacao: perg.explicacao, corretaTexto: perg.alternativas[perg.respostaCorreta] });
});

app.get('/final/:id', (req,res)=>{
  const partida = partidas[req.params.id];
  if(!partida) return res.status(404).json({ erro: 'id inválido' });
  // Garante que chegou ao fim antes de registrar
  if(partida.atual >= partida.perguntas.length){
    registraNoRanking(partida);
  }
  res.json({ nome: partida.nome, pontos: partida.pontos, totalPerguntas: partida.perguntas.length });
});

// Endpoint para ver estado rápido (debug) - não para produção
app.get('/estado/:id', (req,res)=>{
  const partida = partidas[req.params.id];
  if(!partida) return res.status(404).json({ erro: 'id inválido' });
  res.json({ atual: partida.atual, pontos: partida.pontos });
});

// Endpoint ranking: top 10 ordenado por pontos desc; empate por data mais antiga primeiro
app.get('/ranking', (req,res) => {
  const ordenado = ranking.slice().sort((a,b)=>{
    if(b.pontos !== a.pontos) return b.pontos - a.pontos;
    return new Date(a.dataISO) - new Date(b.dataISO);
  }).slice(0,10);
  res.json(ordenado);
});

// Servir front (direto)
app.use('/', express.static(path.join(__dirname)));

const porta = process.env.PORT || 3000;
app.listen(porta, ()=> console.log('Servidor quiz cru na porta', porta));
