# Quiz Lógico

Aplicação web de quiz focada em lógica e conjuntos, com níveis de dificuldade, controle de tempo por pergunta, bônus de pontuação baseado em rapidez e ranking persistente. Interface minimalista em tema escuro com destaque roxo.

## Principais Recursos
- Níveis: Easy, Basic, Medium, Hard (quantidade de perguntas cresce conforme nível).
- Tempo configurável por pergunta (20s a 60s) com bônus proporcional ao tempo restante.
- Feedback imediato: indicação correta/errada + explicação e realce visual (verde para acerto, vermelho para erro).
- Barra de progresso do tempo (depleção visual).
- Ranking persistente por nível (arquivo `ranking.json`).
- Histórico detalhado de cada rodada (pergunta, escolhida, correta, tempo, explicação).
- Cache local de ranking por nível e nome do jogador em `localStorage`.
- Layout responsivo (mobile, tablet e desktop grande).

## Tecnologias
- Backend: Node.js + Express.
- Front-end: HTML, CSS (custom properties, layout flex), JavaScript vanilla.
- Persistência simples: arquivo JSON de ranking (não versionado/ignorado).

## Estrutura de Pastas (resumo)
```
index.html
quiz.js
server.js
styles/ui.css
conteudoConjuntos.js
conteudoLogica.js (exemplo de fonte adicional)
ranking.json (gerado em tempo de execução)
```

## Fluxo de Uso
1. Preencha nome, nível e tempo por pergunta; clique em "Começar".
2. Responda cada pergunta dentro do tempo. Bônus é calculado: pontuação base 100 multiplicada por (1 + percentual restante * bônus máximo).
3. Ao final: tela de resultado + ranking Top 10 + botão para histórico detalhado.
4. Reinicie para jogar novamente em outro nível ou tempo.

## Endpoints da API
Base: `http://localhost:3000`

### POST /partida
Inicia nova partida.
Body JSON: `{ "nome": "Alice", "nivel": "Easy", "tempoLimite": 30 }`
Retorno: `{ id, pergunta: { texto, alternativas[], numero, total } }`

### POST /resposta
Envia resposta da pergunta atual.
Body: `{ id, indiceResposta, tempoGasto }`
Retorno: `{ certo, ganho, pontos, fim, proxima, explicacao, corretaTexto }`
Se `fim` for true, não há `proxima`.

### GET /final/:id
Resumo final após concluir todas as perguntas.
Retorno: `{ nome, pontos, totalPerguntas, tempoTotal, mediaTempo }`

### GET /estado/:id
Estado parcial da partida (progresso e pontos).
Retorno: `{ atual, pontos }`

### GET /ranking?nivel=Nivel
Top 10 do nível. Sem parâmetro retorna pacote de todos os níveis.
Retorno: array de objetos `{ nome, pontos, nivel, tempoLimite, tempoTotal, mediaTempo, dataISO }`

### GET /historico/:id
Histórico completo (apenas depois de finalizar a partida).
Retorno: `{ respostas: [ { pergunta, alternativas[], escolhida, corretaIndex, corretaTexto, certa, explicacao, tempo } ] }`

## Lógica de Pontuação
- Acerto: base 100.
- Bônus: definido por tempo limite escolhido (ex.: 20s => até 5%).
- Fórmula simplificada: `ganho = round(100 * (1 + (maxBonus * (tempoRestante / tempoLimite))))`.
- Erro ou não responder a tempo: 0 pontos, ainda registra tempo gasto.

## Bônus por Tempo (tabela)
| Tempo Limite | Máx Bônus |
|--------------|-----------|
| 20s          | 5%        |
| 30s          | 4%        |
| 40s          | 3%        |
| 50s          | 1.5%      |
| 60s          | 0%        |

## Execução Local
Pré-requisitos: Node.js >= 16.

Instale dependências (se necessário) e execute:
```powershell
npm install
npm start
```
Caso não exista script `start` no `package.json`, use:
```powershell
node server.js
```
Abra `http://localhost:3000` no navegador.

## Personalização Rápida
- Alterar perguntas: editar `conteudoConjuntos.js` (e arquivos adicionais similares) mantendo campos `pergunta`, `alternativas[]`, `respostaCorreta`, `explicacao`, `dificuldade`.
- Ajustar quantidades por nível: modificar objeto `limitePorNivel` em `server.js`.
- Mudar esquema de cores: editar variáveis no início de `styles/ui.css`.
- Ajustar bônus: objeto `bonusPorTempo` em `server.js`.

## Acessibilidade (Status)
Em progresso: foco inicial na primeira alternativa cada pergunta; feedback textual; próximos passos incluem refinamento de `aria-live` e roles semânticos nas listas.

## Possíveis Melhorias Futuras
- Destacar alternativa correta também ao estourar tempo (já mostra verde, pode incluir efeito pulsante).
- Paginação/scroll suave automático para explicação.
- Exportar histórico em JSON/CSV.
- Modo prática infinita / embaralhar após terminar.
- Internacionalização (i18n).

## Segurança & Limitações
- Armazenamento em memória; não adequado para produção (sem autenticação / rate-limit).
- `ranking.json` não contém verificação de integridade ou prevenção de spam.

## Contribuição
Fork, crie branch e envie PR com descrição clara. Manter estilo minimalista e consistência sem frameworks adicionais.

## Autor
GustavoQ-Mateus

Projeto desenvolvido para aprendizado e prática em desenvolvimento web. Este projeto é fornecido tal como está, sem garantias. Adapte livremente conforme sua necessidade.

