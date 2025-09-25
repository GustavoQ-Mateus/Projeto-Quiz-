// script.js
import { elementos } from './dom.js';

const CONFIG = {
    DIFICULDADE_PADRAO: 'Easy',
    PERGUNTAS_TOTAIS: 10,
    MENSAGEM_TEMPO_PADRAO: 2500,
    MENSAGEM_TEMPO_SUCESSO: 1500,
    RANKING_MENSAGEM_TEMPO: 2000,
    LOGICA_FEEDBACK_TEMPO: 1200,
    CORES: {
        SUCESSO: '#22c55e',
        ERRO: '#ef4444'
    }
};

let nomeJogador = '';
const temposPorDificuldade = {
    Easy: 18,
    Basic: 15,
    Medium: 10,
    Hard: 8
};

let dificuldadeAtual = CONFIG.DIFICULDADE_PADRAO;
let tempoPergunta = temposPorDificuldade[dificuldadeAtual];
let pontuacao = 0;
let perguntasTotais = CONFIG.PERGUNTAS_TOTAIS;
let perguntasRestantes = perguntasTotais;
let timer = null;
let tempoRestante = tempoPergunta;
let tempoInicioPergunta = null;
let perguntasSelecionadas = [];
let perguntaAtualIndex = 0;

let logicaPerguntasSelecionadas = [];
let logicaPerguntaAtualIndex = 0;
let logicaPontuacao = 0;
let logicaTimer = null;
let logicaTempoRestante = 0;
let logicaTempoInicioPergunta = null;
let logicaDificuldadeAtual = CONFIG.DIFICULDADE_PADRAO;
let logicaPerguntasTotais = 0;
let logicaPerguntasRestantes = 0;

function atualizarNomeUsuarioPainel() {
    const nomeSalvo = localStorage.getItem('quizNome') || '';
    elementos.labelNomeUsuario.textContent = nomeSalvo ? `Usuário: ${nomeSalvo}` : '';
    elementos.labelNomeUsuario.className = 'label-nome-usuario';
}

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado!");
    console.log("perguntasRelacao:", typeof perguntasRelacao, perguntasRelacao && perguntasRelacao.length);
    console.log("perguntasLogica:", typeof perguntasLogica, perguntasLogica && perguntasLogica.length);
    console.log("perguntasConjuntos:", typeof perguntasConjuntos, perguntasConjuntos && perguntasConjuntos.length);
    atualizarNomeUsuarioPainel();
    elementos.inputNome.addEventListener('input', () => {
        elementos.msgNome.style.opacity = '0';
    });
    elementos.btnNome.addEventListener('click', (e) => {
        e.preventDefault();
        const nome = elementos.inputNome.value.trim();
        if (!nome) {
            mostrarMensagemNome('Por favor, digite seu nome para começar', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
            return;
        }
        nomeJogador = nome;
        localStorage.setItem('quizNome', nomeJogador);
        mostrarMensagemNome('Nome salvo!', CONFIG.CORES.SUCESSO, CONFIG.MENSAGEM_TEMPO_SUCESSO);
    });
});

function getRanking(dificuldade = null) {
    const key = dificuldade ? `quizRanking_${dificuldade}` : `quizRanking_${dificuldadeAtual}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function setRanking(ranking, dificuldade = null) {
    const key = dificuldade ? `quizRanking_${dificuldade}` : `quizRanking_${dificuldadeAtual}`;
    localStorage.setItem(key, JSON.stringify(ranking));
}

function mostrarMenu(menu) {
    [elementos.menuDificuldade, elementos.menuQuiz, elementos.menuRanking].forEach(m => 
        m.classList.toggle('active', m === menu)
    );
}

function mostrarMensagemNome(msg, cor = CONFIG.CORES.ERRO, tempo = CONFIG.MENSAGEM_TEMPO_PADRAO) {
    elementos.msgNome.textContent = msg;
    elementos.msgNome.classList.remove('msg-nome-red', 'msg-nome-green');
    elementos.msgNome.classList.add(cor === CONFIG.CORES.SUCESSO ? 'msg-nome-green' : 'msg-nome-red');
    elementos.msgNome.style.opacity = '1';
    if (tempo > 0) {
        setTimeout(() => {
            elementos.msgNome.style.opacity = '0';
        }, tempo);
    }
}

elementos.btnIniciar.addEventListener('click', (e) => {
    nomeJogador = localStorage.getItem('quizNome') || '';
    if (!nomeJogador) {
        mostrarMensagemNome('Por favor, digite seu nome para começar', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        elementos.inputNome.focus();
        return;
    }
    if (elementos.radioLogica.checked) {
        e.preventDefault();
        logicaDificuldadeAtual = elementos.selectDificuldade.value;
        tempoPergunta = temposPorDificuldade[logicaDificuldadeAtual];
        iniciarQuizLogica(logicaDificuldadeAtual);
        elementos.botoesResposta.style.display = 'none';
        return;
    } else {
        elementos.botoesResposta.style.display = '';
        dificuldadeAtual = elementos.selectDificuldade.value;
        tempoPergunta = temposPorDificuldade[dificuldadeAtual];
        pontuacao = 0;
        let perguntasConteudo = [];
        if (elementos.radioLogica.checked && typeof perguntasLogica !== 'undefined') {
            perguntasConteudo = perguntasConteudo.concat(perguntasLogica);
        } else if (elementos.radioRelacao.checked && typeof perguntasRelacao !== 'undefined') {
            perguntasConteudo = perguntasConteudo.concat(perguntasRelacao);
        } else if (elementos.radioConjuntos.checked && typeof perguntasConjuntos !== 'undefined') {
            perguntasConteudo = perguntasConteudo.concat(perguntasConjuntos);
        }
        if (perguntasConteudo.length === 0) {
            mostrarMensagemNome('Selecione um conteúdo!', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
            return;
        }
        const perguntasNivel = perguntasConteudo.filter(q => q.dificuldade === dificuldadeAtual);
        perguntasSelecionadas = shuffleArray(perguntasNivel).slice(0, 6);
        perguntasTotais = perguntasSelecionadas.length;
        perguntasRestantes = perguntasTotais;
        perguntaAtualIndex = 0;
        elementos.painelPontuacao.textContent = pontuacao;
        elementos.painelFaltam.textContent = perguntasRestantes;
        mostrarMenu(elementos.menuQuiz);
        proximaPergunta();
    }
});

function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function proximaPergunta() {
    if (perguntasRestantes <= 0 || perguntaAtualIndex >= perguntasSelecionadas.length) {
        finalizarQuiz();
        return;
    }
    tempoRestante = tempoPergunta;
    elementos.painelTempo.textContent = tempoRestante;
    tempoInicioPergunta = Date.now();
    perguntasRestantes--;
    elementos.painelFaltam.textContent = perguntasRestantes;
    atualizarBarraProgresso(1);
    exibirPerguntaAtual();
    iniciarTimer();
}

function exibirPerguntaAtual() {
    const perguntaObj = perguntasSelecionadas[perguntaAtualIndex];
    if (!perguntaObj) return;
    elementos.perguntaPares.innerHTML = `<strong>Pares:</strong> ${perguntaObj.pares.map(p => `(${p[0]},${p[1]})`).join(', ')}`;
    elementos.painelPerguntaTexto.innerHTML = `<strong>Pergunta:</strong> ${perguntaObj.pergunta}`;
    elementos.cardAlternativasLogica.style.display = 'none';
}

function iniciarTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        tempoRestante--;
        elementos.painelTempo.textContent = tempoRestante;
        atualizarBarraProgresso(tempoRestante / tempoPergunta);
        if (tempoRestante <= 0) {
            clearInterval(timer);
            atualizarBarraProgresso(0);
            responderQuiz(false, true);
        }
    }, 1000);
}

function atualizarBarraProgresso(percent) {
    if (elementos.barraProgresso) {
        elementos.barraProgresso.style.width = Math.max(0, percent * 100) + '%';
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
    elementos.painelPontuacao.textContent = pontuacao;
    perguntaAtualIndex++;
    proximaPergunta();
}

elementos.btnSim.addEventListener('click', () => {
    responderQuiz(true);
});

elementos.btnNao.addEventListener('click', () => {
    responderQuiz(false);
});

elementos.btnCancelar.addEventListener('click', () => {
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
    elementos.listaRanking.innerHTML = '';
    ranking.forEach((item, idx) => {
        const li = document.createElement('li');
        li.textContent = `${idx + 1}º - ${item.nome}: ${item.pontos} pontos`;
        elementos.listaRanking.appendChild(li);
    });
    mostrarMenu(elementos.menuRanking);
    if (adicionado) {
        elementos.msgRanking.textContent = 'Você foi adicionado ao ranking!';
        elementos.msgRanking.style.opacity = '1';
        setTimeout(() => { elementos.msgRanking.style.opacity = '0'; }, CONFIG.RANKING_MENSAGEM_TEMPO);
    }
}

elementos.btnNovoQuiz.addEventListener('click', () => {
    mostrarMenu(elementos.menuDificuldade);
});

if (elementos.btnResetRanking) {
    elementos.btnResetRanking.addEventListener('click', () => {
        setRanking([], dificuldadeAtual);
        mostrarRanking();
        elementos.msgRanking.textContent = 'Ranking resetado!';
        elementos.msgRanking.style.color = CONFIG.CORES.ERRO;
        elementos.msgRanking.style.opacity = '1';
        setTimeout(() => { elementos.msgRanking.style.opacity = '0'; }, CONFIG.RANKING_MENSAGEM_TEMPO);
    });
}

function iniciarQuizLogica(dificuldade) {
    logicaDificuldadeAtual = dificuldade;
    logicaPontuacao = 0;
    const perguntasNivel = perguntasLogica.filter(q => q.dificuldade === dificuldade);
    logicaPerguntasSelecionadas = shuffleArray(perguntasNivel).slice(0, 6);
    logicaPerguntasTotais = logicaPerguntasSelecionadas.length;
    logicaPerguntasRestantes = logicaPerguntasTotais;
    logicaPerguntaAtualIndex = 0;
    elementos.painelPontuacao.textContent = logicaPontuacao;
    elementos.painelFaltam.textContent = logicaPerguntasRestantes;
    mostrarMenu(elementos.menuQuiz);
    proximaPerguntaLogica();
}

function proximaPerguntaLogica() {
    if (logicaPerguntasRestantes <= 0 || logicaPerguntaAtualIndex >= logicaPerguntasSelecionadas.length) {
        finalizarQuizLogica();
        return;
    }
    logicaTempoRestante = tempoPergunta;
    elementos.painelTempo.textContent = logicaTempoRestante;
    logicaTempoInicioPergunta = Date.now();
    logicaPerguntasRestantes--;
    elementos.painelFaltam.textContent = logicaPerguntasRestantes;
    atualizarBarraProgresso(1);
    exibirPerguntaLogica();
    iniciarTimerLogica();
}

function exibirPerguntaLogica() {
    const perguntaObj = logicaPerguntasSelecionadas[logicaPerguntaAtualIndex];
    if (!perguntaObj) return;
    elementos.perguntaPares.innerHTML = '';
    elementos.painelPerguntaTexto.innerHTML = `<strong>Pergunta:</strong> ${perguntaObj.pergunta}`;
    elementos.cardAlternativasLogica.style.display = 'block';
    let alternativasHTML = '';
    perguntaObj.alternativas.forEach((alt, idx) => {
        alternativasHTML += `<button class="btn btn-roxo btn-alternativa-logica" data-idx="${idx}">${alt}</button>`;
    });
    elementos.alternativasLogica.innerHTML = alternativasHTML;
    elementos.painelPergunta.querySelectorAll('.btn-alternativa-logica').forEach(btn => {
        btn.onclick = (e) => responderLogicaQuiz(parseInt(btn.dataset.idx));
    });
}

function iniciarTimerLogica() {
    clearInterval(logicaTimer);
    logicaTimer = setInterval(() => {
        logicaTempoRestante--;
        elementos.painelTempo.textContent = logicaTempoRestante;
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
    elementos.painelPergunta.querySelectorAll('.btn-alternativa-logica').forEach((btn, i) => {
        btn.disabled = true;
        if (i === perguntaObj.respostaCorreta) {
            btn.style.background = CONFIG.CORES.SUCESSO;
            btn.style.color = '#fff';
        }
        if (idx === i && !correta) {
            btn.style.background = CONFIG.CORES.ERRO;
            btn.style.color = '#fff';
        }
    });
    if (correta && !tempoEsgotado) {
        let pontos = 100;
        let tempoGasto = (Date.now() - logicaTempoInicioPergunta) / 1000;
        let bonus = Math.max(0, Math.round((tempoPergunta - tempoGasto) * 5));
        logicaPontuacao += pontos + bonus;
    }
    elementos.painelPontuacao.textContent = logicaPontuacao;
    setTimeout(() => {
        logicaPerguntaAtualIndex++;
        proximaPerguntaLogica();
    }, CONFIG.LOGICA_FEEDBACK_TEMPO);
}

function finalizarQuizLogica() {
    nomeJogador = localStorage.getItem('quizNome') || nomeJogador || 'Você';
    let ranking = getRanking(logicaDificuldadeAtual);
    ranking.push({ nome: nomeJogador, pontos: logicaPontuacao });
    ranking.sort((a, b) => b.pontos - a.pontos);
    setRanking(ranking, logicaDificuldadeAtual);
    mostrarRanking(true);
}