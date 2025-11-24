const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.json());

const partidas = {};
let seq = 1;

const rankingPath = path.join(__dirname, 'ranking.json');
let rankingNivel = { Easy: [], Basic: [], Medium: [], Hard: [] };

function carregaRanking(){
  try {
    if(fs.existsSync(rankingPath)){
      const raw = fs.readFileSync(rankingPath,'utf8');
      const obj = JSON.parse(raw);
      if(obj && typeof obj === 'object'){
        rankingNivel = { Easy:[], Basic:[], Medium:[], Hard:[], ...obj };
      }
    }
  } catch(e){
    console.warn('Falha carregar ranking.json', e.message);
  }
}

function salvaRanking(){
  try {
    fs.writeFile(rankingPath, JSON.stringify(rankingNivel, null, 2), err => {
      if(err) console.warn('Falha salvar ranking.json', err.message);
    });
  } catch(e){
    console.warn('Erro sync salvar ranking', e.message);
  }
}

carregaRanking();

const perguntasArquivo = require('./conteudoConjuntos.js');
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
  const arr = rankingNivel[partida.nivel] || (rankingNivel[partida.nivel] = []);
  const ja = arr.find(r => r.nome===partida.nome && r.pontos===partida.pontos && r.tempoLimite===partida.tempoLimite && r.tempoTotal===partida.tempoTotal);
  if(ja) return;
  arr.push({
    nome: partida.nome,
    pontos: partida.pontos,
    nivel: partida.nivel,
    tempoLimite: partida.tempoLimite,
    tempoTotal: partida.tempoTotal,
    mediaTempo: partida.mediaTempo,
    dataISO: new Date().toISOString()
  });
  if(arr.length > 100){
    arr.splice(0, arr.length - 100);
  }
  salvaRanking();
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
    pontos: 0,
    tempoTotal: 0,
    respostas: []
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
  partida.tempoTotal += tempoGasto;
  partida.respostas.push({
    pergunta: perg.pergunta,
    alternativas: perg.alternativas,
    escolhida: indiceResposta,
    corretaIndex: perg.respostaCorreta,
    corretaTexto: perg.alternativas[perg.respostaCorreta],
    certa,
    explicacao: perg.explicacao,
    tempo: tempoGasto
  });
  partida.atual++;
  const fim = partida.atual >= partida.perguntas.length;
  let proxima = null;
  if(!fim){
    const np = partida.perguntas[partida.atual];
    proxima = { texto: np.pergunta, alternativas: np.alternativas, numero: partida.atual+1, total: partida.perguntas.length };
  } else {
  }
  res.json({ certo: certa, ganho, pontos: partida.pontos, fim, proxima, explicacao: perg.explicacao, corretaTexto: perg.alternativas[perg.respostaCorreta] });
});

app.get('/final/:id', (req,res)=>{
  const partida = partidas[req.params.id];
  if(!partida) return res.status(404).json({ erro: 'id inválido' });
  if(partida.atual >= partida.perguntas.length){
    partida.mediaTempo = partida.perguntas.length ? (partida.tempoTotal / partida.perguntas.length) : 0;
    registraNoRanking(partida);
  }
  res.json({ nome: partida.nome, pontos: partida.pontos, totalPerguntas: partida.perguntas.length, tempoTotal: partida.tempoTotal, mediaTempo: partida.mediaTempo });
});

app.get('/estado/:id', (req,res)=>{
  const partida = partidas[req.params.id];
  if(!partida) return res.status(404).json({ erro: 'id inválido' });
  res.json({ atual: partida.atual, pontos: partida.pontos });
});

app.get('/ranking', (req,res) => {
  const nivel = req.query.nivel;
  if(!nivel){
    const pack = {};
    Object.keys(rankingNivel).forEach(n => {
      pack[n] = rankingNivel[n].slice().sort((a,b)=>{
        if(b.pontos !== a.pontos) return b.pontos - a.pontos;
        return new Date(a.dataISO) - new Date(b.dataISO);
      }).slice(0,10);
    });
    return res.json(pack);
  }
  const arr = rankingNivel[nivel] || [];
  const ordenado = arr.slice().sort((a,b)=>{
    if(b.pontos !== a.pontos) return b.pontos - a.pontos;
    return new Date(a.dataISO) - new Date(b.dataISO);
  }).slice(0,10);
  res.json(ordenado);
});

app.get('/historico/:id', (req,res) => {
  const partida = partidas[req.params.id];
  if(!partida) return res.status(404).json({ erro: 'id inválido' });
  if(partida.atual < partida.perguntas.length) return res.status(400).json({ erro: 'partida não finalizada' });
  res.json({ respostas: partida.respostas });
});

app.use('/', express.static(path.join(__dirname)));

const porta = process.env.PORT || 3000;
app.listen(porta, ()=> console.log('Servidor quiz cru na porta', porta));
