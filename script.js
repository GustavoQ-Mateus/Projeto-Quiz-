// script.js - Lógica principal do Quiz Lógico

// Elementos dos menus
const menuDificuldade = document.getElementById('menu-dificuldade');
const menuQuiz = document.getElementById('menu-quiz');
const menuRanking = document.getElementById('menu-ranking');

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
// Simulação de ranking
const rankingSimulado = [
    { nome: 'Teste3', pontos: 1200 },
    { nome: 'Teste2', pontos: 1100 },
    { nome: 'Teste1', pontos: 950 },
    { nome: 'Você', pontos: 0 }
];

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

// Inicia o quiz
btnIniciar.addEventListener('click', () => {
    dificuldadeAtual = selectDificuldade.value;
    tempoPergunta = temposPorDificuldade[dificuldadeAtual];
    pontuacao = 0;
    perguntasSelecionadas = typeof perguntasGeradas !== 'undefined' ? perguntasGeradas.filter(q => q.dificuldade === dificuldadeAtual) : [];
    perguntasTotais = perguntasSelecionadas.length;
    perguntasRestantes = perguntasTotais;
    perguntaAtualIndex = 0;
    painelPontuacao.textContent = pontuacao;
    painelFaltam.textContent = perguntasRestantes;
    mostrarMenu(menuQuiz);
    criarPainelPergunta();
    proximaPergunta();
});

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
    painelPergunta.innerHTML = `${paresHTML}<div class="pergunta-texto">${perguntaObj.pergunta}</div>`;
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
    mostrarRanking();
}

// Exibe ranking simulado
function mostrarRanking() {
    // Atualiza pontuação do usuário
    rankingSimulado[3].pontos = pontuacao;
    // Ordena ranking
    const rankingOrdenado = [...rankingSimulado].sort((a, b) => b.pontos - a.pontos);
    listaRanking.innerHTML = '';
    rankingOrdenado.forEach((item, idx) => {
        const li = document.createElement('li');
        li.textContent = `${idx + 1}º - ${item.nome}: ${item.pontos} pontos`;
        listaRanking.appendChild(li);
    });
    mostrarMenu(menuRanking);
}

// Iniciar novo quiz
btnNovoQuiz.addEventListener('click', () => {
    mostrarMenu(menuDificuldade);
});

// Inicialização: mostra menu de dificuldade
mostrarMenu(menuDificuldade);
