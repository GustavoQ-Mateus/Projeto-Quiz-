window.elementos = {
    menuDificuldade: document.getElementById('menu-dificuldade'),
    menuQuiz: document.getElementById('menu-quiz'),
    menuRanking: document.getElementById('menu-ranking'),
    inputNome: document.getElementById('nome'),
    btnNome: document.getElementById('btn-email'),
    radioLogica: document.getElementById('radio-logica'),
    radioRelacao: document.getElementById('radio-relacao'),
    radioConjuntos: document.getElementById('radio-conjuntos'),
    labelNomeUsuario: document.getElementById('label-nome-usuario'),
    selectDificuldade: document.getElementById('dificuldade'),
    btnIniciar: document.getElementById('btn-iniciar'),
    btnSim: document.getElementById('btn-sim'),
    btnNao: document.getElementById('btn-nao'),
    btnCancelar: document.getElementById('btn-cancelar'),
    btnNovoQuiz: document.getElementById('btn-novo-quiz'),
    painelPontuacao: document.getElementById('pontuacao'),
    painelTempo: document.getElementById('tempo'),
    painelFaltam: document.getElementById('faltam'),
    barraProgresso: document.getElementById('barra-progresso'),
    listaRanking: document.getElementById('lista-ranking'),
    btnResetRanking: document.getElementById('btn-reset-ranking'),
    painelPergunta: document.getElementById('painel-pergunta'),
    perguntaPares: document.querySelector('.pergunta-pares'),
    painelPerguntaTexto: document.querySelector('.painel-pergunta-texto'),
    cardAlternativasLogica: document.querySelector('.card-alternativas-logica'),
    alternativasLogica: document.querySelector('.alternativas-logica'),
    msgNome: document.getElementById('msg-nome'),
    msgRanking: document.getElementById('msg-ranking'),
    cardQuiz: document.querySelector('.card-quiz'),
    cardMenu: document.querySelector('.card-menu'),
    labelDificuldade: document.querySelector('.label-dificuldade'),
    botoesResposta: document.querySelector('.botoes-resposta'),
    cardRanking: document.querySelector('.card-ranking')
};

for (let key in window.elementos) {
    if (!window.elementos[key]) {
        console.warn('Elemento "' + key + '" não encontrado no DOM. Verifique o HTML.');
    }
}