console.log("Script carregado!");
const menuDificuldade = document.getElementById('menu-dificuldade');
const menuQuiz = document.getElementById('menu-quiz');
const menuRanking = document.getElementById('menu-ranking');

const inputNome = document.getElementById('nome');
const btnNome = document.getElementById('btn-email');
let nomeJogador = '';

const radioLogica = document.getElementById('radio-logica');
const radioRelacao = document.getElementById('radio-relacao');
const radioConjuntos = document.getElementById('radio-conjuntos');
const labelNomeUsuario = document.getElementById('label-nome-usuario');

function atualizarNomeUsuarioPainel() {
    const nomeSalvo = localStorage.getItem('quizNome') || '';
    labelNomeUsuario.textContent = nomeSalvo ? `Usuário: ${nomeSalvo}` : '';
    labelNomeUsuario.className = 'label-nome-usuario';
}

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado!");
    console.log("perguntasRelacao:", typeof perguntasRelacao, perguntasRelacao && perguntasRelacao.length);
    console.log("perguntasLogica:", typeof perguntasLogica, perguntasLogica && perguntasLogica.length);
    console.log("perguntasConjuntos:", typeof perguntasConjuntos, perguntasConjuntos && perguntasConjuntos.length);
    atualizarNomeUsuarioPainel();
    inputNome.addEventListener('input', atualizarNomeUsuarioPainel);
    btnNome.addEventListener('click', atualizarNomeUsuarioPainel);
});

const selectDificuldade = document.getElementById('dificuldade');
const btnIniciar = document.getElementById('btn-iniciar');
const btnSim = document.getElementById('btn-sim');
const btnNao = document.getElementById('btn-nao');
const btnCancelar = document.getElementById('btn-cancelar');
const btnNovoQuiz = document.getElementById('btn-novo-quiz');

const painelPontuacao = document.getElementById('pontuacao');
const painelTempo = document.getElementById('tempo');
const painelFaltam = document.getElementById('faltam');
const barraProgresso = document.getElementById('barra-progresso');

const listaRanking = document.getElementById('lista-ranking');
function getRanking(dificuldade = null) {
    const key = dificuldade ? `quizRanking_${dificuldade}` : `quizRanking_${dificuldadeAtual}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
}
function setRanking(ranking, dificuldade = null) {
    const key = dificuldade ? `quizRanking_${dificuldade}` : `quizRanking_${dificuldadeAtual}`;
    localStorage.setItem(key, JSON.stringify(ranking));
}

const temposPorDificuldade = {
    Easy: 18,
    Basic: 15,
    Medium: 10,
    Hard: 8
};

let dificuldadeAtual = 'Easy';
let tempoPergunta = temposPorDificuldade[dificuldadeAtual];
let pontuacao = 0;
let perguntasTotais = 10;
let perguntasRestantes = perguntasTotais;
let timer = null;
let tempoRestante = tempoPergunta;
let tempoInicioPergunta = null;

let perguntasSelecionadas = [];
let perguntaAtualIndex = 0;

let painelPergunta = null;
function criarPainelPergunta() {
    const cardQuiz = document.querySelector('.card-quiz');
    painelPergunta = document.getElementById('painel-pergunta');
    if (!painelPergunta && cardQuiz) {
        painelPergunta = document.createElement('div');
        painelPergunta.id = 'painel-pergunta';
        painelPergunta.className = 'painel-pergunta';
        cardQuiz.insertBefore(painelPergunta, cardQuiz.querySelector('.painel-quiz-grid').nextSibling);
    }
}

function mostrarMenu(menu) {
    menuDificuldade.classList.remove('active');
    menuQuiz.classList.remove('active');
    menuRanking.classList.remove('active');
    menu.classList.add('active');
}

function mostrarMensagemNome(msg, cor = 'red', tempo = 2500) {
    let msgDiv = document.getElementById('msg-nome');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'msg-nome';
        document.querySelector('.card-menu').insertBefore(msgDiv, document.querySelector('.label-dificuldade'));
    }
    msgDiv.textContent = msg;
    msgDiv.classList.remove('msg-nome-red', 'msg-nome-green');
    if (cor === 'green') {
        msgDiv.classList.add('msg-nome-green');
    } else {
        msgDiv.classList.add('msg-nome-red');
    }
    msgDiv.style.opacity = '1';
    if (tempo > 0) {
        setTimeout(() => {
            msgDiv.style.opacity = '0';
        }, tempo);
    }
}

inputNome.addEventListener('input', () => {
    let msgDiv = document.getElementById('msg-nome');
    if (msgDiv) msgDiv.style.opacity = '0';
});

btnNome.addEventListener('click', (e) => {
    e.preventDefault();
    const nome = inputNome.value.trim();
    if (!nome) {
        mostrarMensagemNome('Por favor, digite seu nome para começar', 'red', 2500);
        return;
    }
    nomeJogador = nome;
    localStorage.setItem('quizNome', nomeJogador);
    mostrarMensagemNome('Nome salvo!', 'green', 1500);
});

btnIniciar.addEventListener('click', () => {
    nomeJogador = localStorage.getItem('quizNome') || '';
    if (!nomeJogador) {
        mostrarMensagemNome('Por favor, digite seu nome para começar', 'red', 2500);
        inputNome.focus();
        return;
    }
    dificuldadeAtual = selectDificuldade.value;
    tempoPergunta = temposPorDificuldade[dificuldadeAtual];
    pontuacao = 0;
    let perguntasConteudo = [];
    if (radioLogica.checked) {
        if (typeof perguntasLogica !== 'undefined') perguntasConteudo = perguntasConteudo.concat(perguntasLogica);
    } else if (radioRelacao.checked) {
        if (typeof perguntasRelacao !== 'undefined') perguntasConteudo = perguntasConteudo.concat(perguntasRelacao);
    } else if (radioConjuntos.checked) {
        if (typeof perguntasConjuntos !== 'undefined') perguntasConteudo = perguntasConteudo.concat(perguntasConjuntos);
    }
    if (perguntasConteudo.length === 0) {
        mostrarMensagemNome('Selecione um conteúdo!', 'red', 2500);
        return;
    }
    const perguntasNivel = perguntasConteudo.filter(q => q.dificuldade === dificuldadeAtual);
    perguntasSelecionadas = shuffleArray(perguntasNivel).slice(0, 6);
function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
    perguntasTotais = perguntasSelecionadas.length;
    perguntasRestantes = perguntasTotais;
    perguntaAtualIndex = 0;
    painelPontuacao.textContent = pontuacao;
    painelFaltam.textContent = perguntasRestantes;
    mostrarMenu(menuQuiz);
    criarPainelPergunta();
    proximaPergunta();
});

function proximaPergunta() {
    if (perguntasRestantes <= 0 || perguntaAtualIndex >= perguntasSelecionadas.length) {
        finalizarQuiz();
        return;
    }
    tempoRestante = tempoPergunta;
    painelTempo.textContent = tempoRestante;
    tempoInicioPergunta = Date.now();
    perguntasRestantes--;
    painelFaltam.textContent = perguntasRestantes;
    atualizarBarraProgresso(1);
    exibirPerguntaAtual();
    iniciarTimer();
}

function exibirPerguntaAtual() {
    criarPainelPergunta();
    const perguntaObj = perguntasSelecionadas[perguntaAtualIndex];
    if (!perguntaObj) return;
    let paresHTML = '<div class="pergunta-pares"><strong>Pares:</strong> ' + perguntaObj.pares.map(p => `(${p[0]},${p[1]})`).join(', ') + '</div>';
    let perguntaHTML = '<div class="painel-pergunta-texto"><strong>Pergunta:</strong> ' + perguntaObj.pergunta + '</div>';
    painelPergunta.innerHTML = `${paresHTML}${perguntaHTML}`;
}

function iniciarTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        tempoRestante--;
        painelTempo.textContent = tempoRestante;
        atualizarBarraProgresso(tempoRestante / tempoPergunta);
        if (tempoRestante <= 0) {
            clearInterval(timer);
            atualizarBarraProgresso(0);
            responderQuiz(false, true);
        }
    }, 1000);
}

function atualizarBarraProgresso(percent) {
    if (barraProgresso) {
        barraProgresso.style.width = Math.max(0, percent * 100) + '%';
    }
}

function responderQuiz(respostaUsuario, tempoEsgotado = false) {
    clearInterval(timer);
    const perguntaObj = perguntasSelecionadas[perguntaAtualIndex];
    let correta = perguntaObj ? (respostaUsuario === perguntaObj.resposta) : false;
    if (correta && !tempoEsgotado) {
        let pontos = 100;
        let tempoGasto = (Date.now() - tempoInicioPergunta) / 1000;
        let bonus = Math.max(0, Math.round((tempoPergunta - tempoGasto) * 5));
        pontuacao += pontos + bonus;
    }
    painelPontuacao.textContent = pontuacao;
    perguntaAtualIndex++;
    proximaPergunta();
}

btnSim.addEventListener('click', () => {
    responderQuiz(true);
});
btnNao.addEventListener('click', () => {
    responderQuiz(false);
});

btnCancelar.addEventListener('click', () => {
    clearInterval(timer);
    mostrarRanking();
});

function finalizarQuiz() {
    nomeJogador = localStorage.getItem('quizNome') || nomeJogador || 'Você';
    let ranking = getRanking(dificuldadeAtual);
    ranking.push({ nome: nomeJogador, pontos: pontuacao });
    ranking.sort((a, b) => b.pontos - a.pontos);
    setRanking(ranking, dificuldadeAtual);
    mostrarRanking(true);
}

function mostrarRanking(adicionado = false) {
    let ranking = getRanking(dificuldadeAtual);
    listaRanking.innerHTML = '';
    ranking.forEach((item, idx) => {
        const li = document.createElement('li');
        li.textContent = `${idx + 1}º - ${item.nome}: ${item.pontos} pontos`;
        listaRanking.appendChild(li);
    });
    mostrarMenu(menuRanking);
    if (adicionado) {
        let msg = document.createElement('div');
        msg.textContent = 'Você foi adicionado ao ranking!';
        msg.style.color = '#22c55e';
        msg.style.textAlign = 'center';
        msg.style.fontWeight = '600';
        msg.style.margin = '12px 0 0 0';
        msg.style.fontSize = '1.1rem';
        listaRanking.parentNode.insertBefore(msg, listaRanking.nextSibling);
        setTimeout(() => { msg.remove(); }, 2500);
    }
}

btnNovoQuiz.addEventListener('click', () => {
    mostrarMenu(menuDificuldade);
});

const btnResetRanking = document.getElementById('btn-reset-ranking');
if (btnResetRanking) {
    btnResetRanking.addEventListener('click', () => {
        setRanking([], dificuldadeAtual);
        mostrarRanking();
        let msg = document.createElement('div');
        msg.textContent = 'Ranking resetado!';
        msg.style.color = '#ef4444';
        msg.style.textAlign = 'center';
        msg.style.fontWeight = '600';
        msg.style.margin = '12px 0 0 0';
        msg.style.fontSize = '1.1rem';
        const rankingCard = document.querySelector('.card-ranking');
        if (rankingCard) rankingCard.insertBefore(msg, rankingCard.querySelector('#lista-ranking').nextSibling);
        setTimeout(() => { msg.remove(); }, 2000);
    });
}

let logicaPerguntasSelecionadas = [];
let logicaPerguntaAtualIndex = 0;
let logicaPontuacao = 0;
let logicaTimer = null;
let logicaTempoRestante = 0;
let logicaTempoInicioPergunta = null;
let logicaDificuldadeAtual = 'Easy';
let logicaPerguntasTotais = 0;
let logicaPerguntasRestantes = 0;

function iniciarQuizLogica(dificuldade) {
    logicaDificuldadeAtual = dificuldade;
    logicaPontuacao = 0;
    const perguntasNivel = perguntasLogica.filter(q => q.dificuldade === dificuldade);
    logicaPerguntasSelecionadas = shuffleArray(perguntasNivel).slice(0, 6);
    logicaPerguntasTotais = logicaPerguntasSelecionadas.length;
    logicaPerguntasRestantes = logicaPerguntasTotais;
    logicaPerguntaAtualIndex = 0;
    painelPontuacao.textContent = logicaPontuacao;
    painelFaltam.textContent = logicaPerguntasRestantes;
    mostrarMenu(menuQuiz);
    criarPainelPergunta();
    proximaPerguntaLogica();
}

function proximaPerguntaLogica() {
    if (logicaPerguntasRestantes <= 0 || logicaPerguntaAtualIndex >= logicaPerguntasSelecionadas.length) {
        finalizarQuizLogica();
        return;
    }
    logicaTempoRestante = tempoPergunta;
    painelTempo.textContent = logicaTempoRestante;
    logicaTempoInicioPergunta = Date.now();
    logicaPerguntasRestantes--;
    painelFaltam.textContent = logicaPerguntasRestantes;
    atualizarBarraProgresso(1);
    exibirPerguntaLogica();
    iniciarTimerLogica();
}

function exibirPerguntaLogica() {
    criarPainelPergunta();
    const perguntaObj = logicaPerguntasSelecionadas[logicaPerguntaAtualIndex];
    if (!perguntaObj) return;
    let perguntaHTML = `<div class="painel-pergunta-texto"><strong>Pergunta:</strong> ${perguntaObj.pergunta}</div>`;
    let alternativasHTML = `
      <div class="card card-alternativas-logica">
        <div class="alternativas-logica">
    `;
    perguntaObj.alternativas.forEach((alt, idx) => {
        alternativasHTML += `<button class="btn btn-roxo btn-alternativa-logica" data-idx="${idx}">${alt}</button>`;
    });
    alternativasHTML += '</div></div>';
    painelPergunta.innerHTML = perguntaHTML + alternativasHTML;
    painelPergunta.querySelectorAll('.btn-alternativa-logica').forEach(btn => {
        btn.onclick = (e) => responderLogicaQuiz(parseInt(btn.dataset.idx));
    });
}

function iniciarTimerLogica() {
    clearInterval(logicaTimer);
    logicaTimer = setInterval(() => {
        logicaTempoRestante--;
        painelTempo.textContent = logicaTempoRestante;
        atualizarBarraProgresso(logicaTempoRestante / tempoPergunta);
        if (logicaTempoRestante <= 0) {
            clearInterval(logicaTimer);
            atualizarBarraProgresso(0);
            responderLogicaQuiz(null, true);
        }
    }, 1000);
}

function responderLogicaQuiz(idx, tempoEsgotado = false) {
    clearInterval(logicaTimer);
    const perguntaObj = logicaPerguntasSelecionadas[logicaPerguntaAtualIndex];
    const correta = perguntaObj && idx === perguntaObj.respostaCorreta;
    painelPergunta.querySelectorAll('.btn-alternativa-logica').forEach((btn, i) => {
        btn.disabled = true;
        if (i === perguntaObj.respostaCorreta) {
            btn.style.background = '#22c55e';
            btn.style.color = '#fff';
        }
        if (idx === i && !correta) {
            btn.style.background = '#ef4444';
            btn.style.color = '#fff';
        }
    });
    if (correta && !tempoEsgotado) {
        let pontos = 100;
        let tempoGasto = (Date.now() - logicaTempoInicioPergunta) / 1000;
        let bonus = Math.max(0, Math.round((tempoPergunta - tempoGasto) * 5));
        logicaPontuacao += pontos + bonus;
    }
    painelPontuacao.textContent = logicaPontuacao;
    setTimeout(() => {
        logicaPerguntaAtualIndex++;
        proximaPerguntaLogica();
    }, 1200);
}

function finalizarQuizLogica() {
    nomeJogador = localStorage.getItem('quizNome') || nomeJogador || 'Você';
    let ranking = getRanking(logicaDificuldadeAtual);
    ranking.push({ nome: nomeJogador, pontos: logicaPontuacao });
    ranking.sort((a, b) => b.pontos - a.pontos);
    setRanking(ranking, logicaDificuldadeAtual);
    mostrarRanking(true);
}

if (btnIniciar) {
    btnIniciar.addEventListener('click', (e) => {
        if (radioLogica && radioLogica.checked) {
            e.preventDefault();
            nomeJogador = localStorage.getItem('quizNome') || '';
            if (!nomeJogador) {
                mostrarMensagemNome('Por favor, digite seu nome para começar', 'red', 2500);
                inputNome.focus();
                return;
            }
            logicaDificuldadeAtual = selectDificuldade.value;
            tempoPergunta = temposPorDificuldade[logicaDificuldadeAtual];
            iniciarQuizLogica(logicaDificuldadeAtual);
            document.querySelector('.botoes-resposta').style.display = 'none';
            return;
        } else {
            document.querySelector('.botoes-resposta').style.display = '';
        }
    });
}