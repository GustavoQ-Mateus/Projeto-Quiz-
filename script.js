// scriptEmbaralhado.js
// Este arquivo é uma cópia de script.js com embaralhamento das alternativas das perguntas de lógica e conjuntos.

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

const elementos = window.elementos;

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
    elementos.labelNomeUsuario.textContent = nomeSalvo ? 'Usuário: ' + nomeSalvo : '';
    elementos.labelNomeUsuario.className = 'label-nome-usuario';
}

window.addEventListener('DOMContentLoaded', function () {
    atualizarNomeUsuarioPainel();
    elementos.inputNome.addEventListener('input', function () {
        elementos.msgNome.style.opacity = '0';
    });
    elementos.btnNome.addEventListener('click', function (e) {
        e.preventDefault();
        const nome = elementos.inputNome.value.trim();
        if (!nome) {
            mostrarMensagemNome('Por favor, digite seu nome para começar', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
            return;
        }
        nomeJogador = nome;
        localStorage.setItem('quizNome', nomeJogador);
        mostrarMensagemNome('Nome salvo!', CONFIG.CORES.SUCESSO, CONFIG.MENSAGEM_TEMPO_SUCESSO);
            atualizarNomeUsuarioPainel(); // Atualiza o painel imediatamente
    });
});

function getRanking(dificuldade) {
    const key = dificuldade ? 'quizRanking_' + dificuldade : 'quizRanking_' + dificuldadeAtual;
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

function setRanking(ranking, dificuldade) {
    const key = dificuldade ? 'quizRanking_' + dificuldade : 'quizRanking_' + dificuldadeAtual;
    localStorage.setItem(key, JSON.stringify(ranking));
}

function mostrarMenu(menu) {
    const menus = [elementos.menuDificuldade, elementos.menuQuiz, elementos.menuRanking];
    for (let i = 0; i < menus.length; i++) {
        menus[i].classList.toggle('active', menus[i] === menu);
    }
}

function mostrarMensagemNome(msg, cor, tempo) {
    elementos.msgNome.textContent = msg;
    elementos.msgNome.classList.remove('msg-nome-red', 'msg-nome-green');
    elementos.msgNome.classList.add(cor === CONFIG.CORES.SUCESSO ? 'msg-nome-green' : 'msg-nome-red');
    elementos.msgNome.style.opacity = '1';
    if (tempo > 0) {
        setTimeout(function () {
            elementos.msgNome.style.opacity = '0';
        }, tempo);
    }
}

// Função para embaralhar alternativas e atualizar respostaCorreta
function embaralharAlternativas(pergunta) {
    if (!pergunta.alternativas || typeof pergunta.respostaCorreta !== 'number') return pergunta;
    const alternativas = pergunta.alternativas.map((alt, idx) => ({ texto: alt, originalIndex: idx }));
    for (let i = alternativas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [alternativas[i], alternativas[j]] = [alternativas[j], alternativas[i]];
    }
    const novaRespostaCorreta = alternativas.findIndex(alt => alt.originalIndex === pergunta.respostaCorreta);
    return {
        ...pergunta,
        alternativas: alternativas.map(alt => alt.texto),
        respostaCorreta: novaRespostaCorreta
    };
}

function shuffleArray(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// --- ALTERAÇÃO: embaralhar alternativas ao selecionar perguntas ---
elementos.btnIniciar.addEventListener('click', function (e) {
    nomeJogador = localStorage.getItem('quizNome') || '';
    if (!nomeJogador) {
        mostrarMensagemNome('Por favor, digite seu nome para começar', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        elementos.inputNome.focus();
        return;
    }
    clearInterval(timer);
    clearInterval(logicaTimer);
    if (elementos.radioLogica.checked) {
        e.preventDefault();
        logicaDificuldadeAtual = elementos.selectDificuldade.value;
        tempoPergunta = temposPorDificuldade[logicaDificuldadeAtual];
        if (!tempoPergunta) {
            mostrarMensagemNome('Erro: Dificuldade inválida para o quiz de Lógica.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
            return;
        }
        iniciarQuizLogica(logicaDificuldadeAtual);
        elementos.botoesResposta.style.display = 'none';
        return;
    }
    elementos.botoesResposta.style.display = '';
    dificuldadeAtual = elementos.selectDificuldade.value;
    tempoPergunta = temposPorDificuldade[dificuldadeAtual];
    if (!tempoPergunta) {
        mostrarMensagemNome('Erro: Dificuldade inválida.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        return;
    }
    pontuacao = 0;
    const perguntasConteudo = [];
    if (elementos.radioRelacao.checked && typeof perguntasRelacao !== 'undefined') {
        perguntasConteudo.push(...perguntasRelacao);
    } else if (elementos.radioConjuntos.checked && typeof perguntasConjuntos !== 'undefined') {
        perguntasConteudo.push(...perguntasConjuntos);
    } else {
        mostrarMensagemNome('Selecione um conteúdo válido!', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        return;
    }
    if (perguntasConteudo.length === 0) {
        mostrarMensagemNome('Erro: Nenhum conteúdo disponível. Verifique os arquivos de perguntas.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        return;
    }
    const perguntasNivel = perguntasConteudo.filter(q => q.dificuldade === dificuldadeAtual);
    if (perguntasNivel.length === 0) {
        mostrarMensagemNome('Erro: Nenhuma pergunta disponível para a dificuldade selecionada.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        return;
    }
    // Embaralha alternativas de cada pergunta
    perguntasSelecionadas = shuffleArray(perguntasNivel).slice(0, 6).map(embaralharAlternativas);
    perguntasTotais = perguntasSelecionadas.length;
    perguntasRestantes = perguntasTotais;
    perguntaAtualIndex = 0;
    elementos.painelPontuacao.textContent = pontuacao;
    elementos.painelFaltam.textContent = perguntasRestantes;
    mostrarMenu(elementos.menuQuiz);
    proximaPergunta();
});

function proximaPergunta() {
    if (perguntasRestantes <= 0 || perguntaAtualIndex >= perguntasSelecionadas.length) {
        finalizarQuiz();
        return;
    }
    clearInterval(timer);
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
    if (!perguntaObj) {
        finalizarQuiz();
        return;
    }
    elementos.perguntaPares.innerHTML = '<strong>Pares:</strong> ' + perguntaObj.pares.map(p => '(' + p[0] + ',' + p[1] + ')').join(', ');
    elementos.painelPerguntaTexto.innerHTML = '<strong>Pergunta:</strong> ' + perguntaObj.pergunta;
    elementos.cardAlternativasLogica.style.display = 'none';
}

function iniciarTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
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

function responderQuiz(respostaUsuario, tempoEsgotado) {
    clearInterval(timer);
    const perguntaObj = perguntasSelecionadas[perguntaAtualIndex];
    const correta = perguntaObj ? (respostaUsuario === perguntaObj.resposta) : false;
    if (correta && !tempoEsgotado) {
        const pontos = 100;
        const tempoGasto = (Date.now() - tempoInicioPergunta) / 1000;
        const bonus = Math.max(0, Math.round((tempoPergunta - tempoGasto) * 5));
        pontuacao += pontos + bonus;
    }
    elementos.painelPontuacao.textContent = pontuacao;
    perguntaAtualIndex++;
    proximaPergunta();
}

elementos.btnSim.addEventListener('click', function () {
    responderQuiz(true);
});
elementos.btnNao.addEventListener('click', function () {
    responderQuiz(false);
});
elementos.btnCancelar.addEventListener('click', function () {
    clearInterval(timer);
    clearInterval(logicaTimer);
    mostrarRanking();
});

function finalizarQuiz() {
    clearInterval(timer);
    clearInterval(logicaTimer);
    nomeJogador = localStorage.getItem('quizNome') || nomeJogador || 'Você';
    const ranking = getRanking(dificuldadeAtual);
    ranking.push({ nome: nomeJogador, pontos: pontuacao });
    ranking.sort(function (a, b) { return b.pontos - a.pontos; });
    setRanking(ranking, dificuldadeAtual);
    mostrarRanking(true);
}

function mostrarRanking(adicionado) {
    const ranking = getRanking(dificuldadeAtual);
    elementos.listaRanking.innerHTML = '';
    ranking.forEach(function (item, idx) {
        const li = document.createElement('li');
        li.textContent = (idx + 1) + 'º - ' + item.nome + ': ' + item.pontos + ' pontos';
        elementos.listaRanking.appendChild(li);
    });
    mostrarMenu(elementos.menuRanking);
    if (adicionado) {
        elementos.msgRanking.textContent = 'Você foi adicionado ao ranking!';
        elementos.msgRanking.style.opacity = '1';
        setTimeout(function () {
            elementos.msgRanking.style.opacity = '0';
        }, CONFIG.RANKING_MENSAGEM_TEMPO);
    }
}

elementos.btnNovoQuiz.addEventListener('click', function () {
    clearInterval(timer);
    clearInterval(logicaTimer);
    mostrarMenu(elementos.menuDificuldade);
});

if (elementos.btnResetRanking) {
    elementos.btnResetRanking.addEventListener('click', function () {
        setRanking([], dificuldadeAtual);
        mostrarRanking();
        elementos.msgRanking.textContent = 'Ranking resetado!';
        elementos.msgRanking.style.color = CONFIG.CORES.ERRO;
        elementos.msgRanking.style.opacity = '1';
        setTimeout(function () {
            elementos.msgRanking.style.opacity = '0';
        }, CONFIG.RANKING_MENSAGEM_TEMPO);
    });
}

// ---- LÓGICA ----
function iniciarQuizLogica(dificuldade) {
    logicaDificuldadeAtual = dificuldade;
    logicaPontuacao = 0;
    const perguntasNivel = perguntasLogica.filter(function (q) { return q.dificuldade === dificuldade; });
    if (perguntasNivel.length === 0) {
        mostrarMensagemNome('Erro: Nenhuma pergunta disponível para a dificuldade selecionada.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        return;
    }
    // Embaralha alternativas de cada pergunta de lógica
    logicaPerguntasSelecionadas = shuffleArray(perguntasNivel).slice(0, 6).map(embaralharAlternativas);
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
    if (!perguntaObj) {
        finalizarQuizLogica();
        return;
    }
    elementos.perguntaPares.innerHTML = '';
    elementos.painelPerguntaTexto.innerHTML = '<strong>Pergunta:</strong> ' + perguntaObj.pergunta;
    elementos.cardAlternativasLogica.style.display = 'block';
    let alternativasHTML = '';
    for (let i = 0; i < perguntaObj.alternativas.length; i++) {
        alternativasHTML += '<button class="btn btn-roxo btn-alternativa-logica" data-idx="' + i + '">' + perguntaObj.alternativas[i] + '</button>';
    }
    elementos.alternativasLogica.innerHTML = alternativasHTML;
    const botoes = elementos.cardAlternativasLogica.querySelectorAll('.btn-alternativa-logica');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            responderLogicaQuiz(parseInt(this.getAttribute('data-idx')));
        };
    }
}

function iniciarTimerLogica() {
    clearInterval(logicaTimer);
    logicaTimer = setInterval(function () {
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

function responderLogicaQuiz(idx, tempoEsgotado) {
    clearInterval(logicaTimer);
    const perguntaObj = logicaPerguntasSelecionadas[logicaPerguntaAtualIndex];
    const correta = perguntaObj && idx === perguntaObj.respostaCorreta;
    const botoes = elementos.cardAlternativasLogica.querySelectorAll('.btn-alternativa-logica');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].disabled = true;
        if (i === perguntaObj.respostaCorreta) {
            botoes[i].style.background = CONFIG.CORES.SUCESSO;
            botoes[i].style.color = '#fff';
        }
        if (idx === i && !correta) {
            botoes[i].style.background = CONFIG.CORES.ERRO;
            botoes[i].style.color = '#fff';
        }
    }
    if (correta && !tempoEsgotado) {
        const pontos = 100;
        const tempoGasto = (Date.now() - logicaTempoInicioPergunta) / 1000;
        const bonus = Math.max(0, Math.round((tempoPergunta - tempoGasto) * 5));
        logicaPontuacao += pontos + bonus;
    }
    elementos.painelPontuacao.textContent = logicaPontuacao;
    setTimeout(function () {
        logicaPerguntaAtualIndex++;
        proximaPerguntaLogica();
    }, CONFIG.LOGICA_FEEDBACK_TEMPO);
}

function finalizarQuizLogica() {
    clearInterval(logicaTimer);
    clearInterval(timer);
    nomeJogador = localStorage.getItem('quizNome') || nomeJogador || 'Você';
    const ranking = getRanking(logicaDificuldadeAtual);
    ranking.push({ nome: nomeJogador, pontos: logicaPontuacao });
    ranking.sort(function (a, b) { return b.pontos - a.pontos; });
    setRanking(ranking, logicaDificuldadeAtual);
    mostrarRanking(true);
}
