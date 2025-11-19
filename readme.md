# Projeto Quiz Lógico

Um quiz de lógica/relacionamentos e conjuntos feito em HTML, CSS e JavaScript puro, com ranking persistente por conteúdo e dificuldade, progressão com tempo, e suporte a tema claro/escuro. Agora com landing em estilo Hero Playful/Flat 2.0, tokens de design e melhorias de acessibilidade e desempenho.

## Recursos principais

- Três conteúdos/jogos:
	- Relação (Sim/Não)
	- Lógica (múltipla escolha)
	- Conjuntos (múltipla escolha)
- Dificuldades: Easy, Basic, Medium, Hard (configuráveis no menu inicial)
- Temporizador por pergunta baseado na dificuldade
- Pontuação com bônus por tempo restante
- Barra de progresso dinâmica por pergunta
- Ranking com persistência local (localStorage) separado por conteúdo e dificuldade
	- Medalhas para os 3 primeiros (ouro, prata e bronze via SVG)
	- Botão para limpar o ranking atual
- Tema claro/escuro com variáveis CSS (tokens), com alternância manual via painel de configurações (preferência salva)
- Responsivo e com melhorias de a11y (skip link, foco visível, motion respeita Prefer-Reduced-Motion)

### Novidades na landing (Hero)
- Hero em estilo Playful/Flat 2.0 com tokens de design.
- CTA “Começar agora” abre o menu de dificuldade no fluxo (reflow) e foca no campo de nome.
- Prévia do quiz mostra perguntas reais de Relação, Lógica e Conjuntos, alternando a cada 10s; pausa quando a aba fica oculta.
- Mini FAQ acessível.

## Estrutura do projeto

```
conteudoConjuntos.js         # Banco de questões de Conjuntos
conteudoLogica.js            # Banco de questões de Lógica
conteudoRelacao.js           # Banco de questões de Relação
dom.js                       # Mapeamento central de elementos do DOM
index.html                   # Estrutura da aplicação e hero
script.js                    # Lógica do quiz, timers, ranking, tema manual
style.css                    # Estilos do app e padronizações legado
styles/tokens.css            # Tokens de design (cores, espaçamentos, raios, sombras)
styles/hero.css              # Estilos da landing Hero e padronização global
scripts/hero.js              # Comportamento do Hero (CTAs, rolagem, prévia de perguntas)
readme.md                    # Este arquivo
```

## Como executar

1. Baixe/clonagem do repositório.
2. Abra o arquivo `index.html` no navegador (duplo clique ou “Open with Live Server” no VS Code, se preferir recarregamento automático).

Não há dependências externas obrigatórias além do próprio navegador. Ícones e fontes são carregados via CDN no `index.html`.

## Como jogar

1. Informe seu nome no painel inicial e escolha a dificuldade.
2. Escolha o conteúdo (Relação, Lógica ou Conjuntos) e clique em “Iniciar Quiz”.
3. Responda dentro do tempo. Cada acerto soma pontos; sobra de tempo concede bônus.
4. Ao finalizar, sua pontuação entra no ranking do conteúdo + dificuldade.
5. Acesse o ranking pelo card “Ranking”; use o botão “Limpar Ranking” para zerar apenas o ranking atual (conteúdo/dificuldade selecionado).

## Tema claro/escuro (manual)

- No cabeçalho, clique no botão de engrenagem para abrir o painel de configurações.
- Altere o switch “Tema escuro” para ligar/desligar.
- A escolha é salva em `localStorage` com a chave `quizTheme` e aplicada no carregamento.

Detalhes técnicos:
- O tema é aplicado via atributo `data-theme` no elemento raiz (`<html>`): `light` ou `dark`.
- Os estilos usam variáveis CSS em `:root` e blocos `[data-theme="light"]`/`[data-theme="dark"]` para sobrescritas previsíveis.
- Tokens centrais ficam em `styles/tokens.css`; evite cores fixas no restante do CSS.

## Persistência e ranking

- O nome do usuário é salvo em `localStorage` (`quizNome`).
- Rankings são salvos por chave composta de conteúdo e dificuldade: `quizRanking_<conteudo>_<dificuldade>`.
- O projeto também persiste a última aba de ranking acessada (`quizLastRankingConteudo` e `quizLastRankingDificuldade`).

## Pontos de atenção / limites

- O ranking é local ao navegador (não há backend). Limpar cache do navegador remove os dados.
- O tempo por dificuldade e quantidades de questões podem ser ajustados em `script.js`.
- Os bancos de questões ficam nos arquivos `conteudo*.js`; adicionar perguntas segue o mesmo formato.

## Personalização rápida

- Cores/raios/sombras: ajuste em `styles/tokens.css` (e se necessário nos blocos `[data-theme="light"/"dark"]` em `style.css`).
- Durações do quiz: `CONFIG` em `script.js` controla tempos de mensagens, feedback e cálculo de bônus.
- Quantidade de questões: altere os slices (`.slice(0, 6)`) em `script.js` para aumentar/diminuir por rodada.
- Prévia do Hero: o intervalo de troca está em `scripts/hero.js` na constante `PREVIEW_INTERVAL_MS` (padrão 10000ms). 
## Interface
---
### Tema Claro
<img width="1317" height="637" alt="{0FDAD276-1476-46B1-8A4A-F8F19A90763E}" src="https://github.com/user-attachments/assets/5715c04d-5be8-423a-b9cb-1ee9edc7a86c" />
<img width="1314" height="637" alt="image" src="https://github.com/user-attachments/assets/b266dad8-9d1a-46be-aca8-18e1646b5f87" />
<img width="1315" height="639" alt="{5CBBA35C-A292-455D-B949-372F22A2F7F4}" src="https://github.com/user-attachments/assets/124299b1-0952-4536-9900-f72c4abfe536" />

### Tema Escuro
<img width="1311" height="639" alt="{5D131614-D267-4D29-AB01-76FD5C0CC1DD}" src="https://github.com/user-attachments/assets/eea5d93a-d6b9-4def-a86c-21a017174b6a" />
<img width="1315" height="636" alt="image" src="https://github.com/user-attachments/assets/2966f7c9-bb15-4ccb-9bea-237762309af3" />
<img width="1312" height="635" alt="image" src="https://github.com/user-attachments/assets/fbcc4343-dc19-4328-9003-7e4d2c345c4a" />

## Autor

[GustavoQ-Mateus](https://github.com/GustavoQ-Mateus)

---

Projeto desenvolvido para aprendizado e prática em desenvolvimento web.
Este projeto é fornecido tal como está, sem garantias. Adapte livremente conforme sua necessidade.
