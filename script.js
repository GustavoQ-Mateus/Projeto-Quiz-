console.log("Script carregado!");
// Elementos dos menus
const menuDificuldade = document.getElementById('menu-dificuldade');
const menuQuiz = document.getElementById('menu-quiz');
const menuRanking = document.getElementById('menu-ranking');

// Elementos da caixa de nome
const inputNome = document.getElementById('nome');
const btnNome = document.getElementById('btn-email');
let nomeJogador = '';

// Elementos dos radios de conteúdo
const radioLogica = document.getElementById('radio-logica');
const radioRelacao = document.getElementById('radio-relacao');
const radioConjuntos = document.getElementById('radio-conjuntos');
const labelNomeUsuario = document.getElementById('label-nome-usuario');

// Exibe nome salvo no painel-extra
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

// Elementos de controle
const selectDificuldade = document.getElementById('dificuldade');
const btnIniciar = document.getElementById('btn-iniciar');
const btnSim = document.getElementById('btn-sim');
const btnNao = document.getElementById('btn-nao');
const btnCancelar = document.getElementById('btn-cancelar');
const btnNovoQuiz = document.getElementById('btn-novo-quiz');

// Painéis do quiz
const painelPontuacao = document.getElementById('pontuacao');
const painelTempo = document.getElementById('tempo');
const painelFaltam = document.getElementById('faltam');
const barraProgresso = document.getElementById('barra-progresso');

// Ranking
const listaRanking = document.getElementById('lista-ranking');
// Ranking dinâmico
function getRanking(dificuldade = null) {
    const key = dificuldade ? `quizRanking_${dificuldade}` : `quizRanking_${dificuldadeAtual}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
}
function setRanking(ranking, dificuldade = null) {
    const key = dificuldade ? `quizRanking_${dificuldade}` : `quizRanking_${dificuldadeAtual}`;
    localStorage.setItem(key, JSON.stringify(ranking));
}

// Configurações de tempo por dificuldade
const temposPorDificuldade = {
    Easy: 18,
    Basic: 15,
    Medium: 10,
    Hard: 8
};



// Estado do quiz
let dificuldadeAtual = 'Easy';
let tempoPergunta = temposPorDificuldade[dificuldadeAtual];
let pontuacao = 0;
let perguntasTotais = 10;
let perguntasRestantes = perguntasTotais;
let timer = null;
let tempoRestante = tempoPergunta;
let tempoInicioPergunta = null;

// Perguntas do quiz
let perguntasSelecionadas = [];
let perguntaAtualIndex = 0;

// Elemento para exibir pergunta e pares
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

// Função para alternar menus
function mostrarMenu(menu) {
    menuDificuldade.classList.remove('active');
    menuQuiz.classList.remove('active');
    menuRanking.classList.remove('active');
    menu.classList.add('active');
}

// Mensagem de erro/feedback para nome
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

// Inicia o quiz
// Função para embaralhar array (Fisher-Yates)
function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Função para iniciar próxima pergunta
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
    atualizarBarraProgresso(1); // 100% no início
    exibirPerguntaAtual();
    iniciarTimer();
}

function exibirPerguntaAtual() {
    criarPainelPergunta();
    const perguntaObj = perguntasSelecionadas[perguntaAtualIndex];
    if (!perguntaObj) return;
    // Monta visual dos pares
    let paresHTML = '<div class="pergunta-pares"><strong>Pares:</strong> ' + perguntaObj.pares.map(p => `(${p[0]},${p[1]})`).join(', ') + '</div>';
    let perguntaHTML = '<div class="painel-pergunta-texto"><strong>Pergunta:</strong> ' + perguntaObj.pergunta + '</div>';
    painelPergunta.innerHTML = `${paresHTML}${perguntaHTML}`;
}

// Timer da pergunta
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
// Atualiza visualmente a barra de progresso
function atualizarBarraProgresso(percent) {
    if (barraProgresso) {
        barraProgresso.style.width = Math.max(0, percent * 100) + '%';
    }
}

// Resposta do usuário
function responderQuiz(respostaUsuario, tempoEsgotado = false) {
    clearInterval(timer);
    const perguntaObj = perguntasSelecionadas[perguntaAtualIndex];
    let correta = perguntaObj ? (respostaUsuario === perguntaObj.resposta) : false;
    if (correta && !tempoEsgotado) {
        // Pontuação base
        let pontos = 100;
        // Bônus de rapidez
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

// Cancelar quiz
btnCancelar.addEventListener('click', () => {
    clearInterval(timer);
    mostrarRanking();
});

// Finaliza quiz
function finalizarQuiz() {
    // Adiciona ao ranking da dificuldade atual
    nomeJogador = localStorage.getItem('quizNome') || nomeJogador || 'Você';
    let ranking = getRanking(dificuldadeAtual);
    ranking.push({ nome: nomeJogador, pontos: pontuacao });
    ranking.sort((a, b) => b.pontos - a.pontos);
    setRanking(ranking, dificuldadeAtual);
    mostrarRanking(true);
}

// Exibe ranking simulado
function mostrarRanking(adicionado = false) {
    // Mostra ranking da dificuldade selecionada
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

// Iniciar novo quiz
btnNovoQuiz.addEventListener('click', () => {
    mostrarMenu(menuDificuldade);
});

// Botão de resetar ranking
const btnResetRanking = document.getElementById('btn-reset-ranking');
if (btnResetRanking) {
    btnResetRanking.addEventListener('click', () => {
        setRanking([], dificuldadeAtual);
        mostrarRanking();
        // Mensagem no menu de ranking
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

// --- QUIZ DE LÓGICA: fluxo separado ---
// Variáveis exclusivas para o quiz de lógica
let logicaPerguntasSelecionadas = [];
let logicaPerguntaAtualIndex = 0;
let logicaPontuacao = 0;
let logicaTimer = null;
let logicaTempoRestante = 0;
let logicaTempoInicioPergunta = null;
let logicaDificuldadeAtual = 'Easy';
let logicaPerguntasTotais = 0;
let logicaPerguntasRestantes = 0;

// Função para iniciar quiz de lógica
function iniciarQuizLogica(dificuldade) {
    logicaDificuldadeAtual = dificuldade;
    logicaPontuacao = 0;
    // Filtra perguntas pela dificuldade
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

// Função para próxima pergunta de lógica
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

// Exibe pergunta e alternativas
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

// Timer para lógica
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

// Responde e feedback visual
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
    // Pontuação igual ao quiz de relação
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

// Finaliza quiz de lógica e ranking
function finalizarQuizLogica() {
    nomeJogador = localStorage.getItem('quizNome') || nomeJogador || 'Você';
    let ranking = getRanking(logicaDificuldadeAtual);
    ranking.push({ nome: nomeJogador, pontos: logicaPontuacao });
    ranking.sort((a, b) => b.pontos - a.pontos);
    setRanking(ranking, logicaDificuldadeAtual);
    mostrarRanking(true);
}

// --- INTEGRAÇÃO: Detecta início do quiz de lógica ---
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
            // Esconde os botões Sim/Não e mostra alternativas
            document.querySelector('.botoes-resposta').style.display = 'none';
            return; // Impede execução do fluxo padrão
        } else {
            // Mostra os botões Sim/Não para outros conteúdos
            document.querySelector('.botoes-resposta').style.display = '';
            // O fluxo padrão segue normalmente
        }
    });
}
// --- FIM QUIZ DE LÓGICA ---
