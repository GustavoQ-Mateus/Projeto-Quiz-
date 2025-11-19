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

let conjuntosPerguntasSelecionadas = [];
let conjuntosPerguntaAtualIndex = 0;
let conjuntosPontuacao = 0;
let conjuntosTimer = null;
let conjuntosTempoRestante = 0;
let conjuntosTempoInicioPergunta = null;
let conjuntosDificuldadeAtual = CONFIG.DIFICULDADE_PADRAO;
let conjuntosPerguntasTotais = 0;
let conjuntosPerguntasRestantes = 0;

let conteudoAtual = 'relacao';
let rankingDificuldadeVisivel = dificuldadeAtual;
let rankingConteudoVisivel = conteudoAtual;

function atualizarNomeUsuarioPainel() {
    const nomeSalvo = localStorage.getItem('quizNome') || '';
    elementos.labelNomeUsuario.textContent = nomeSalvo ? 'Usuário: ' + nomeSalvo : '';
    elementos.labelNomeUsuario.className = 'label-nome-usuario';
}

window.addEventListener('DOMContentLoaded', function () {
    atualizarNomeUsuarioPainel();
    try {
        var savedTheme = localStorage.getItem('quizTheme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    } catch (_) {}
    var btnConfig = document.getElementById('btn-config');
    var settingsPanel = document.getElementById('settings-panel');
    var toggleDark = document.getElementById('toggle-dark');
    if (btnConfig && settingsPanel) {
        btnConfig.addEventListener('click', function () {
            var isOpen = settingsPanel.classList.contains('open');
            settingsPanel.classList.toggle('open', !isOpen);
            settingsPanel.setAttribute('aria-hidden', String(isOpen));
        });
        document.addEventListener('click', function (ev) {
            if (!settingsPanel.classList.contains('open')) return;
            var target = ev.target;
            var inside = settingsPanel.contains(target) || (btnConfig && btnConfig.contains(target));
            if (!inside) {
                settingsPanel.classList.remove('open');
                settingsPanel.setAttribute('aria-hidden', 'true');
            }
        });
    }
    if (toggleDark) {
        var current = document.documentElement.getAttribute('data-theme');
        toggleDark.checked = current === 'dark';
        toggleDark.addEventListener('change', function () {
            var theme = toggleDark.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            try { localStorage.setItem('quizTheme', theme); } catch (_) {}
        });
    }
    elementos.inputNome.addEventListener('input', function () {
        elementos.msgNome.style.opacity = '0';
    });
    try {
        if (elementos.radioConjuntos) elementos.radioConjuntos.checked = true;
        if (elementos.radioLogica) elementos.radioLogica.disabled = true;
        if (elementos.radioRelacao) elementos.radioRelacao.disabled = true;
    } catch (_) {}
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
        atualizarNomeUsuarioPainel();
    });
    try {
        const savedCont = localStorage.getItem('quizLastRankingConteudo');
        const savedDiff = localStorage.getItem('quizLastRankingDificuldade');
        if (savedCont) rankingConteudoVisivel = savedCont;
        if (savedDiff) rankingDificuldadeVisivel = savedDiff;
    } catch (_) {}
});

function rankingKey(conteudo, dificuldade) {
    const c = conteudo || conteudoAtual;
    const d = dificuldade || dificuldadeAtual;
    return 'quizRanking_' + c + '_' + d;
}
function getRanking(conteudo, dificuldade) {
    const key = rankingKey(conteudo, dificuldade);
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}
function setRanking(ranking, conteudo, dificuldade) {
    const key = rankingKey(conteudo, dificuldade);
    localStorage.setItem(key, JSON.stringify(ranking));
}

function mostrarMenu(menu) {
    const menus = [elementos.menuDificuldade, elementos.menuQuiz, elementos.menuRanking, elementos.menuComoFunciona, elementos.menuFaq];
    menus.forEach(m => {
        if (!m) return;
        if (m !== menu && m.classList.contains('active')) {
            m.classList.add('closing');
            const handler = () => {
                m.removeEventListener('transitionend', handler);
                m.classList.remove('active', 'closing', 'reflow');
                m.style.display = 'none';
                deactivateFocusTrap(m);
            };
            m.addEventListener('transitionend', handler);
        }
    });
    if (menu) {
        menu.classList.remove('closing');
        menu.style.display = 'flex';
        menu.classList.add('active');
        activateFocusTrap(menu);
    }
    if (menu && menu.classList.contains('active')) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
    if (menu && menu.classList.contains('active')) {
        const heading = menu.querySelector('h2[tabindex="-1"], .titulo[tabindex="-1"]');
        const closeBtn = menu.querySelector('.card-close-btn');
        const target = heading || closeBtn;
        if (target) {
            setTimeout(() => { try { target.focus(); } catch(_){} }, 50);
        }
    }
}
window.mostrarMenu = mostrarMenu;
function voltarParaSetup() {
    const allMenus = [elementos.menuDificuldade, elementos.menuQuiz, elementos.menuRanking, elementos.menuComoFunciona, elementos.menuFaq];
    allMenus.forEach(m => { if (m) { m.classList.remove('active','reflow'); m.style.display='none'; } });
    if (elementos.menuDificuldade) {
        mostrarMenu(elementos.menuDificuldade);
        const titulo = document.getElementById('setup-titulo');
        if (titulo) titulo.focus(); else if (elementos.inputNome) elementos.inputNome.focus();
    }
}

function voltarParaHero() {
    const allMenus = [elementos.menuDificuldade, elementos.menuQuiz, elementos.menuRanking, elementos.menuComoFunciona, elementos.menuFaq];
    allMenus.forEach(m => {
        if (!m) return;
        if (m.classList.contains('active')) {
            m.classList.add('closing');
            const handler = () => {
                m.removeEventListener('transitionend', handler);
                m.classList.remove('active','closing','reflow');
                m.style.display='none';
                deactivateFocusTrap(m);
            };
            m.addEventListener('transitionend', handler);
        } else {
            m.classList.remove('closing');
            m.style.display='none';
        }
    });
    document.body.classList.remove('menu-open');
    const hero = document.getElementById('hero');
    if (hero) hero.style.filter = '';
}
if (elementos.btnCloseQuiz) {
    elementos.btnCloseQuiz.setAttribute('aria-label','Fechar quiz e voltar ao início');
    elementos.btnCloseQuiz.addEventListener('click', voltarParaHero);
}
if (elementos.btnCloseFaq) {
    elementos.btnCloseFaq.addEventListener('click', voltarParaHero);
}
if (elementos.btnCloseComo) {
    elementos.btnCloseComo.addEventListener('click', voltarParaHero);
}
if (elementos.btnCloseSetup) {
    elementos.btnCloseSetup.addEventListener('click', voltarParaHero);
}
if (elementos.btnCloseRanking) {
    elementos.btnCloseRanking.addEventListener('click', voltarParaHero);
}

function activateFocusTrap(container){
    if(!container) return;
    const selectors = 'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const nodes = Array.from(container.querySelectorAll(selectors)).filter(el => el.offsetParent !== null);
    if(nodes.length === 0){ return; }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const trapHandler = (e) => {
        if(e.key === 'Tab'){
            if(e.shiftKey){
                if(document.activeElement === first){ e.preventDefault(); last.focus(); }
            } else {
                if(document.activeElement === last){ e.preventDefault(); first.focus(); }
            }
        }
    };
    container.__focusTrapHandler = trapHandler;
    container.addEventListener('keydown', trapHandler);
}
function deactivateFocusTrap(container){
    if(container && container.__focusTrapHandler){
        container.removeEventListener('keydown', container.__focusTrapHandler);
        delete container.__focusTrapHandler;
    }
}

function ensureCloseFallback(btn){
    if(!btn) return;
    const icon = btn.querySelector('.icon');
    if (icon) {
        try {
            const beforeContent = getComputedStyle(icon, '::before').getPropertyValue('content');
            if (beforeContent && beforeContent !== 'none' && beforeContent !== 'normal' && beforeContent !== '""') {
                return;
            }
        } catch (_) {}
    }
    if (!btn.querySelector('.close-fallback')) {
        const span = document.createElement('span');
        span.className = 'close-fallback';
        span.textContent = 'X';
        btn.appendChild(span);
    }
}
['btnCloseQuiz','btnCloseFaq','btnCloseComo','btnCloseSetup','btnCloseRanking'].forEach(key => ensureCloseFallback(elementos[key]));
function syncAnswerButtonsWidthWithHeroCTA(){
    const cta = document.getElementById('hero-cta-start');
    if(!cta){
        document.documentElement.style.setProperty('--cta-width-px','300px');
        return;
    }
    const rect = cta.getBoundingClientRect();
    const width = Math.max(200, Math.round(rect.width));
    document.documentElement.style.setProperty('--cta-width-px', width + 'px');
}
window.addEventListener('resize', () => { try { syncAnswerButtonsWidthWithHeroCTA(); } catch(_){} });
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { try { syncAnswerButtonsWidthWithHeroCTA(); } catch(_){} });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        if (elementos.menuQuiz && elementos.menuQuiz.classList.contains('active')) {
            voltarParaSetup();
        } else if (elementos.menuDificuldade && elementos.menuDificuldade.classList.contains('active')) {
            voltarParaHero();
        } else {
            voltarParaHero();
        }
    }
});
window.addEventListener('DOMContentLoaded', () => {
    voltarParaHero();
    try { syncAnswerButtonsWidthWithHeroCTA(); } catch(_){}
});

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

elementos.btnIniciar.addEventListener('click', function (e) {
    nomeJogador = localStorage.getItem('quizNome') || '';
    if (!nomeJogador) {
        mostrarMensagemNome('Por favor, digite seu nome para começar', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        elementos.inputNome.focus();
        return;
    }
    clearInterval(timer);
    clearInterval(logicaTimer);
    clearInterval(conjuntosTimer);
    if (elementos.radioLogica && elementos.radioLogica.checked) {
        e.preventDefault();
        mostrarMensagemNome('O conteúdo de Lógica está temporariamente indisponível.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        return;
    }
    if (elementos.radioConjuntos && elementos.radioConjuntos.checked) {
        e.preventDefault();
        conteudoAtual = 'conjuntos';
        conjuntosDificuldadeAtual = elementos.selectDificuldade.value;
        tempoPergunta = temposPorDificuldade[conjuntosDificuldadeAtual];
        if (!tempoPergunta) {
            mostrarMensagemNome('Erro: Dificuldade inválida para o quiz de Conjuntos.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
            return;
        }
        iniciarQuizConjuntos(conjuntosDificuldadeAtual);
        elementos.botoesResposta.style.display = 'none';
        return;
    }
    if (elementos.radioRelacao && elementos.radioRelacao.checked) {
        e.preventDefault();
        mostrarMensagemNome('O conteúdo de Relação está temporariamente indisponível.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        return;
    }
    if (elementos.radioConjuntos) {
        elementos.radioConjuntos.checked = true;
        elementos.btnIniciar.click();
    } else {
        mostrarMensagemNome('Conteúdo temporariamente indisponível.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
    }
});

if (elementos.setupForm) {
    elementos.setupForm.addEventListener('submit', function(e){
        e.preventDefault();
        if (elementos.btnIniciar) elementos.btnIniciar.click();
    });
}

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
    elementos.perguntaPares.innerHTML = perguntaObj.pares
        ? '<strong>Pares:</strong> ' + perguntaObj.pares.map(p => '(' + p[0] + ',' + p[1] + ')').join(', ')
        : '';
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
            responderQuiz(null, true);
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

if (elementos.btnSim) elementos.btnSim.addEventListener('click', function () { responderQuiz(true); });
if (elementos.btnNao) elementos.btnNao.addEventListener('click', function () { responderQuiz(false); });
if (elementos.btnCancelar) elementos.btnCancelar.addEventListener('click', function () {
    clearInterval(timer);
    clearInterval(logicaTimer);
    clearInterval(conjuntosTimer);
    const conteudoForRanking = (elementos.radioLogica && elementos.radioLogica.checked) ? 'logica'
        : (elementos.radioConjuntos && elementos.radioConjuntos.checked) ? 'conjuntos'
        : 'relacao';
    const diffForRanking = (conteudoForRanking === 'logica') ? logicaDificuldadeAtual
        : (conteudoForRanking === 'conjuntos') ? conjuntosDificuldadeAtual
        : dificuldadeAtual;
    mostrarRanking(false, conteudoForRanking, diffForRanking);
});

function finalizarQuiz() {
    clearInterval(timer);
    clearInterval(logicaTimer);
    clearInterval(conjuntosTimer);
    nomeJogador = localStorage.getItem('quizNome') || nomeJogador || 'Você';
    const ranking = getRanking('relacao', dificuldadeAtual);
    ranking.push({ nome: nomeJogador, pontos: pontuacao });
    ranking.sort(function (a, b) { return b.pontos - a.pontos; });
    setRanking(ranking, 'relacao', dificuldadeAtual);
    mostrarRanking(true, 'relacao', dificuldadeAtual);
}

function labelConteudo(conteudo) {
    if (conteudo === 'logica') return 'Lógica';
    if (conteudo === 'conjuntos') return 'Conjuntos';
    return 'Relação';
}
function mostrarRanking(adicionado, conteudoParam, dificuldadeParam) {
    const cont = conteudoParam || conteudoAtual;
    const diff = dificuldadeParam || dificuldadeAtual;
    rankingConteudoVisivel = cont;
    rankingDificuldadeVisivel = diff;

    try {
        localStorage.setItem('quizLastRankingConteudo', cont);
        localStorage.setItem('quizLastRankingDificuldade', diff);
    } catch (_) {}

    const ranking = getRanking(cont, diff);
    elementos.listaRanking.innerHTML = '';
    ranking.forEach(function (item, idx) {
        const li = document.createElement('li');
        if (idx < 3) {
            const medalBadge = document.createElement('span');
            medalBadge.className = 'ranking-medal-badge';
            medalBadge.setAttribute('aria-hidden', 'true');
            medalBadge.textContent = (idx + 1);
            li.appendChild(medalBadge);
        }
        li.appendChild(document.createTextNode((idx + 1) + 'º - ' + item.nome + ': ' + item.pontos + ' pontos'));
        elementos.listaRanking.appendChild(li);
    });
    if (elementos.cardRanking) {
        const titulo = elementos.cardRanking.querySelector('.titulo');
        if (titulo) titulo.textContent = 'Ranking de Pontuações — ' + labelConteudo(cont) + ' (' + diff + ')';
    }
    mostrarMenu(elementos.menuRanking);
    if (adicionado) {
        elementos.msgRanking.textContent = 'Você foi adicionado ao ranking!';
        elementos.msgRanking.style.opacity = '1';
        setTimeout(function () { elementos.msgRanking.style.opacity = '0'; }, CONFIG.RANKING_MENSAGEM_TEMPO);
    }
}

if (elementos.btnNovoQuiz) elementos.btnNovoQuiz.addEventListener('click', function () {
    clearInterval(timer);
    clearInterval(logicaTimer);
    clearInterval(conjuntosTimer);
    mostrarMenu(elementos.menuDificuldade);
});

if (elementos.btnResetRanking) {
    elementos.btnResetRanking.addEventListener('click', function () {
        setRanking([], rankingConteudoVisivel, rankingDificuldadeVisivel);
        mostrarRanking(false, rankingConteudoVisivel, rankingDificuldadeVisivel);
        elementos.msgRanking.textContent = 'Ranking resetado!';
        elementos.msgRanking.style.color = CONFIG.CORES.ERRO;
        elementos.msgRanking.style.opacity = '1';
        setTimeout(function () { elementos.msgRanking.style.opacity = '0'; }, CONFIG.RANKING_MENSAGEM_TEMPO);
    });
}

function iniciarQuizConjuntos(dificuldade) {
    conjuntosDificuldadeAtual = dificuldade;
    conjuntosPontuacao = 0;
    const perguntasNivel = perguntasConjuntos.filter(function (q) { return q.dificuldade === dificuldade; });
    if (perguntasNivel.length === 0) {
        mostrarMensagemNome('Erro: Nenhuma pergunta disponível para a dificuldade selecionada.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        return;
    }
    conjuntosPerguntasSelecionadas = shuffleArray(perguntasNivel).slice(0, 6).map(embaralharAlternativas);
    conjuntosPerguntasTotais = conjuntosPerguntasSelecionadas.length;
    conjuntosPerguntasRestantes = conjuntosPerguntasTotais;
    conjuntosPerguntaAtualIndex = 0;
    elementos.painelPontuacao.textContent = conjuntosPontuacao;
    elementos.painelFaltam.textContent = conjuntosPerguntasRestantes;
    mostrarMenu(elementos.menuQuiz);
    proximaPerguntaConjuntos();
}

function proximaPerguntaConjuntos() {
    if (conjuntosPerguntasRestantes <= 0 || conjuntosPerguntaAtualIndex >= conjuntosPerguntasSelecionadas.length) {
        finalizarQuizConjuntos();
        return;
    }
    conjuntosTempoRestante = tempoPergunta;
    elementos.painelTempo.textContent = conjuntosTempoRestante;
    conjuntosTempoInicioPergunta = Date.now();
    conjuntosPerguntasRestantes--;
    elementos.painelFaltam.textContent = conjuntosPerguntasRestantes;
    atualizarBarraProgresso(1);
    exibirPerguntaConjuntos();
    iniciarTimerConjuntos();
}

function exibirPerguntaConjuntos() {
    const perguntaObj = conjuntosPerguntasSelecionadas[conjuntosPerguntaAtualIndex];
    if (!perguntaObj) { finalizarQuizConjuntos(); return; }
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
        botoes[i].onclick = function () { responderConjuntosQuiz(parseInt(this.getAttribute('data-idx'))); };
    }
}

function iniciarTimerConjuntos() {
    clearInterval(conjuntosTimer);
    conjuntosTimer = setInterval(function () {
        conjuntosTempoRestante--;
        elementos.painelTempo.textContent = conjuntosTempoRestante;
        atualizarBarraProgresso(conjuntosTempoRestante / tempoPergunta);
        if (conjuntosTempoRestante <= 0) {
            clearInterval(conjuntosTimer);
            atualizarBarraProgresso(0);
            responderConjuntosQuiz(null, true);
        }
    }, 1000);
}

function responderConjuntosQuiz(idx, tempoEsgotado) {
    clearInterval(conjuntosTimer);
    const perguntaObj = conjuntosPerguntasSelecionadas[conjuntosPerguntaAtualIndex];
    const correta = perguntaObj && idx === perguntaObj.respostaCorreta;
    const botoes = elementos.cardAlternativasLogica.querySelectorAll('.btn-alternativa-logica');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].disabled = true;
        if (i === perguntaObj.respostaCorreta) { botoes[i].style.background = CONFIG.CORES.SUCESSO; botoes[i].style.color = '#fff'; }
        if (idx === i && !correta) { botoes[i].style.background = CONFIG.CORES.ERRO; botoes[i].style.color = '#fff'; }
    }
    if (correta && !tempoEsgotado) {
        const pontos = 100;
        const tempoGasto = (Date.now() - conjuntosTempoInicioPergunta) / 1000;
        const bonus = Math.max(0, Math.round((tempoPergunta - tempoGasto) * 5));
        conjuntosPontuacao += pontos + bonus;
    }
    elementos.painelPontuacao.textContent = conjuntosPontuacao;
    setTimeout(function () {
        conjuntosPerguntaAtualIndex++;
        proximaPerguntaConjuntos();
    }, CONFIG.LOGICA_FEEDBACK_TEMPO);
}

function finalizarQuizConjuntos() {
    clearInterval(conjuntosTimer);
    clearInterval(timer);
    nomeJogador = localStorage.getItem('quizNome') || nomeJogador || 'Você';
    const ranking = getRanking('conjuntos', conjuntosDificuldadeAtual);
    ranking.push({ nome: nomeJogador, pontos: conjuntosPontuacao });
    ranking.sort(function (a, b) { return b.pontos - a.pontos; });
    setRanking(ranking, 'conjuntos', conjuntosDificuldadeAtual);
    mostrarRanking(true, 'conjuntos', conjuntosDificuldadeAtual);
}

function iniciarQuizLogica(dificuldade) {
    logicaDificuldadeAtual = dificuldade;
    logicaPontuacao = 0;
    const perguntasNivel = perguntasLogica.filter(function (q) { return q.dificuldade === dificuldade; });
    if (perguntasNivel.length === 0) {
        mostrarMensagemNome('Erro: Nenhuma pergunta disponível para a dificuldade selecionada.', CONFIG.CORES.ERRO, CONFIG.MENSAGEM_TEMPO_PADRAO);
        return;
    }
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
    if (!perguntaObj) { finalizarQuizLogica(); return; }
    elementos.perguntaPares.innerHTML = '';
    elementos.painelPerguntaTexto.innerHTML = '<strong>Pergunta:</strong> ' + perguntaObj.pergunta;
    elementos.cardAlternativasLogica.style.display = 'block';
    let alternativasHTML = '';
    for (let i = 0; i < perguntaObj.alternativas.length; i++) {
        alternativasHTML += '<button class="btn btn-roxo btn-alternativa-logica" data-idx="' + i + '">' + perguntaObj.alternativas[i] + '</button>'; }
    elementos.alternativasLogica.innerHTML = alternativasHTML;
    const botoes = elementos.cardAlternativasLogica.querySelectorAll('.btn-alternativa-logica');
    for (let i = 0; i < botoes.length; i++) { botoes[i].onclick = function () { responderLogicaQuiz(parseInt(this.getAttribute('data-idx'))); }; }
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
        if (i === perguntaObj.respostaCorreta) { botoes[i].style.background = CONFIG.CORES.SUCESSO; botoes[i].style.color = '#fff'; }
        if (idx === i && !correta) { botoes[i].style.background = CONFIG.CORES.ERRO; botoes[i].style.color = '#fff'; }
    }
    if (correta && !tempoEsgotado) {
        const pontos = 100;
        const tempoGasto = (Date.now() - logicaTempoInicioPergunta) / 1000;
        const bonus = Math.max(0, Math.round((tempoPergunta - tempoGasto) * 5));
        logicaPontuacao += pontos + bonus;
    }
    elementos.painelPontuacao.textContent = logicaPontuacao;
    setTimeout(function () { logicaPerguntaAtualIndex++; proximaPerguntaLogica(); }, CONFIG.LOGICA_FEEDBACK_TEMPO);
}

function finalizarQuizLogica() {
    clearInterval(logicaTimer);
    clearInterval(timer);
    nomeJogador = localStorage.getItem('quizNome') || nomeJogador || 'Você';
    const ranking = getRanking('logica', logicaDificuldadeAtual);
    ranking.push({ nome: nomeJogador, pontos: logicaPontuacao });
    ranking.sort(function (a, b) { return b.pontos - a.pontos; });
    setRanking(ranking, 'logica', logicaDificuldadeAtual);
    mostrarRanking(true, 'logica', logicaDificuldadeAtual);
}
