// painel-teste.js
// Exibe apenas o menu do quiz para testar o tamanho dos painéis
window.addEventListener('DOMContentLoaded', function() {
    // Esconde todos os menus
    document.querySelectorAll('.menu').forEach(menu => menu.style.display = 'none');
    // Mostra apenas o menu do quiz
    const quizMenu = document.getElementById('menu-quiz');
    if (quizMenu) {
        quizMenu.style.display = 'flex';
        quizMenu.classList.add('active');
    }
    // Mostra a pergunta Hard 1
    const painelPergunta = document.getElementById('painel-pergunta');
    if (painelPergunta) {
        // Pergunta Hard 1 do perguntas.js
        const perguntaObj = {
            pares: [[1,1],[2,2],[3,3],[4,4],[5,5],[1,2],[2,3],[3,4],[4,5]],
            pergunta: "A relação é transitiva?"
        };
        let paresHTML = '<div class="pergunta-pares"><strong>Pares:</strong> ' + perguntaObj.pares.map(p => `(${p[0]},${p[1]})`).join(', ') + '</div>';
        let perguntaHTML = '<div class="painel-pergunta-texto"><strong>Pergunta:</strong> ' + perguntaObj.pergunta + '</div>';
        painelPergunta.innerHTML = `${paresHTML}${perguntaHTML}`;
    }
});
