// Quiz de lógica desativado. Usar perguntasLogica (array vazio) como stub.
const perguntasLogica = [];
/* REMOVIDO: dataset original inativo
const perguntasLogica_inativo = [
  // Arquivo de conteúdo de Lógica removido (quiz de lógica desativado).
  // Mantido vazio para evitar erros de carregamento caso o script seja referenciado futuramente.
  const perguntasLogica = [];
    pergunta: "Qual é o resultado de ¬(V)?",
    alternativas: ["V", "F", "Não muda", "Indeterminado"],
    respostaCorreta: 1,
    explicacao: "A negação de verdadeiro é falso."
  },
  // Pergunta Easy 14
  {
    dificuldade: "Easy",
    pergunta: "Se P é verdadeiro e Q é verdadeiro, qual é o resultado de (P ↔ Q)?",
    alternativas: ["V", "F", "Depende", "Indeterminado"],
    respostaCorreta: 0,
    explicacao: "Equivalência é verdadeira quando P e Q têm o mesmo valor de verdade."
  },
  // Pergunta Easy 15
  {
    dificuldade: "Easy",
    pergunta: "Qual é o valor de (V ∧ F) ∨ V?",
    alternativas: ["V", "F", "Depende", "Indeterminado"],
    respostaCorreta: 0,
    explicacao: "Primeiro resolve (V ∧ F) = F, depois F ∨ V = V."
  },
  // Pergunta Easy 16
  {
    dificuldade: "Easy",
    pergunta: "O que significa uma tautologia?",
    alternativas: ["Sempre falso", "Sempre verdadeiro", "Depende das variáveis", "Sem valor definido"],
    respostaCorreta: 1,
    explicacao: "Uma tautologia é uma fórmula sempre verdadeira independentemente dos valores de suas variáveis."
  },
  // Pergunta Easy 17
  {
    dificuldade: "Easy",
    pergunta: "O que significa uma contradição?",
    alternativas: ["Sempre falso", "Sempre verdadeiro", "Depende das variáveis", "Sem valor definido"],
    respostaCorreta: 0,
    explicacao: "Uma contradição é uma fórmula sempre falsa, qualquer que seja a valoração."
  },
  // Pergunta Easy 18
  {
    dificuldade: "Easy",
    pergunta: "Qual é o valor de verdade de (F → V)?",
    alternativas: ["V", "F", "Depende", "Indeterminado"],
    respostaCorreta: 0,
    explicacao: "Uma implicação com antecedente falso é sempre verdadeira."
  },
  // Pergunta Easy 19
  {
    dificuldade: "Easy",
    pergunta: "Se P é falso e Q é falso, qual o resultado de (P ↔ Q)?",
    alternativas: ["V", "F", "Depende", "Não existe"],
    respostaCorreta: 0,
    explicacao: "Equivalência é verdadeira se ambos têm o mesmo valor, mesmo que sejam ambos falsos."
  },
  // Pergunta Easy 20
  {
    dificuldade: "Easy",
    pergunta: "O que significa a disjunção exclusiva (XOR)?",
    alternativas: ["Verdadeira se ambos forem verdadeiros", "Verdadeira se ambos forem falsos", "Verdadeira se exatamente um for verdadeiro", "Sempre falsa"],
    respostaCorreta: 2,
    explicacao: "O 'ou exclusivo' é verdadeiro apenas quando uma das proposições é verdadeira, mas não ambas."
  },
  // Pergunta Easy 21
  {
    dificuldade: "Easy",
    pergunta: "Qual é o valor de verdade de (V ∨ V)?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "Basta um V para que a disjunção seja verdadeira — aqui os dois são verdadeiros."
  },
  // Pergunta Easy 22
  {
    dificuldade: "Easy",
    pergunta: "Qual é a forma equivalente de ¬(P ∨ Q)?",
    alternativas: ["¬P ∧ ¬Q", "¬P ∨ ¬Q", "P ∧ Q", "P ∨ Q"],
    respostaCorreta: 0,
    explicacao: "Pelo De Morgan: ¬(P ∨ Q) = ¬P ∧ ¬Q."
  },
  // Pergunta Easy 23
  {
    dificuldade: "Easy",
    pergunta: "Qual é a forma equivalente de ¬(P ∧ Q)?",
    alternativas: ["¬P ∨ ¬Q", "¬P ∧ ¬Q", "P ∨ Q", "P ∧ Q"],
    respostaCorreta: 0,
    explicacao: "Pelo De Morgan: ¬(P ∧ Q) = ¬P ∨ ¬Q."
  },
  // Pergunta Easy 24
  {
    dificuldade: "Easy",
    pergunta: "Se P for verdadeiro, qual é o valor de (P ∧ P)?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "Uma proposição 'e' ela mesma é sempre igual ao valor original, então dá verdadeiro."
  },
  // Pergunta Easy 25
  {
    dificuldade: "Easy",
    pergunta: "Se P for falso, qual é o valor de (P ∨ P)?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 1,
    explicacao: "Uma proposição 'ou' ela mesma é igual ao valor original. Como P é falso, o resultado é falso."
  },
    // Pergunta Basic 1
  {
    dificuldade: "Basic",
    pergunta: "Qual é o valor de (P ∧ Q) quando P=V e Q=F?",
    alternativas: ["V", "F", "Depende", "Não é definido"],
    respostaCorreta: 1,
    explicacao: "Conjunção só é verdadeira quando P e Q são ambos verdadeiros. Aqui Q é falso, então o resultado é F."
  },
  // Pergunta Basic 2
  {
    dificuldade: "Basic",
    pergunta: "Qual é o valor de (P ∨ Q) quando P=F e Q=F?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 1,
    explicacao: "A disjunção é falsa apenas quando ambas as proposições são falsas."
  },
  // Pergunta Basic 3
  {
    dificuldade: "Basic",
    pergunta: "Qual é a negação correta de 'P → Q'?",
    alternativas: ["¬P → ¬Q", "P ∧ ¬Q", "¬P ∧ Q", "Q → P"],
    respostaCorreta: 1,
    explicacao: "A negação de P → Q é P ∧ ¬Q (P verdadeiro e Q falso ao mesmo tempo)."
  },
  // Pergunta Basic 4
  {
    dificuldade: "Basic",
    pergunta: "Se P é verdadeiro e Q é falso, qual é o resultado de (P ↔ Q)?",
    alternativas: ["V", "F", "Depende", "Não é definido"],
    respostaCorreta: 1,
    explicacao: "Bicondicional só é verdadeiro quando P e Q têm o mesmo valor. Aqui são diferentes, então é falso."
  },
  // Pergunta Basic 5
  {
    dificuldade: "Basic",
    pergunta: "Qual das expressões é uma tautologia?",
    alternativas: ["P ∨ ¬P", "P ∧ ¬P", "¬P ∧ P", "P → ¬P"],
    respostaCorreta: 0,
    explicacao: "P ∨ ¬P é sempre verdadeira, independentemente do valor de P (Lei do Terceiro Excluído)."
  },
  // Pergunta Basic 6
  {
    dificuldade: "Basic",
    pergunta: "Qual das expressões é uma contradição?",
    alternativas: ["P ∨ ¬P", "P ∧ ¬P", "P → P", "¬P ∨ P"],
    respostaCorreta: 1,
    explicacao: "P ∧ ¬P é sempre falsa, independente do valor de P (princípio da não-contradição)."
  },
  // Pergunta Basic 7
  {
    dificuldade: "Basic",
    pergunta: "Qual é o valor de ¬(P ∧ Q) quando P=V e Q=V?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 1,
    explicacao: "P ∧ Q é verdadeiro, sua negação resulta em falso."
  },
  // Pergunta Basic 8
  {
    dificuldade: "Basic",
    pergunta: "Qual é o valor de ¬(P ∨ Q) quando P=F e Q=F?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 0,
    explicacao: "P ∨ Q é falso, sua negação resulta em verdadeiro."
  },
  // Pergunta Basic 9
  {
    dificuldade: "Basic",
    pergunta: "Qual é a forma equivalente de P → Q?",
    alternativas: ["¬P ∧ Q", "¬P ∨ Q", "P ∨ Q", "Q → P"],
    respostaCorreta: 1,
    explicacao: "Por equivalência lógica, P → Q é equivalente a ¬P ∨ Q."
  },
  // Pergunta Basic 10
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (P ∧ ¬P) ∨ Q se Q é verdadeiro?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "(P ∧ ¬P) é sempre falso, então o resultado depende apenas de Q. Como Q=V, o resultado é V."
  },
  // Pergunta Basic 11
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (P ∨ Q) ∧ ¬Q se P=F e Q=V?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 1,
    explicacao: "P ∨ Q = V, mas ¬Q = F, logo (V ∧ F) = F."
  },
  // Pergunta Basic 12
  {
    dificuldade: "Basic",
    pergunta: "Se P e Q são falsos, qual é o valor de (P → Q)?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "Implicação com antecedente falso é sempre verdadeira."
  },
  // Pergunta Basic 13
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (P ∨ ¬P) ∧ (Q ∨ ¬Q)?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Depende de P e Q", "Não é definido"],
    respostaCorreta: 0,
    explicacao: "Ambas as expressões são tautologias, e a conjunção de duas tautologias também é uma tautologia."
  },
  // Pergunta Basic 14
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de ¬(¬P)?",
    alternativas: ["P", "¬P", "Depende", "Sempre falso"],
    respostaCorreta: 0,
    explicacao: "Negação da negação retorna o valor original."
  },
  // Pergunta Basic 15
  {
    dificuldade: "Basic",
    pergunta: "Se P=V e Q=F, qual é o resultado de ¬P ∨ Q?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 1,
    explicacao: "¬P = F, Q = F, então F ∨ F = F."
  },
  // Pergunta Basic 16
  {
    dificuldade: "Basic",
    pergunta: "Se P=F e Q=V, qual é o resultado de ¬P → Q?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "¬P = V, então temos V → V que é verdadeiro."
  },
  // Pergunta Basic 17
  {
    dificuldade: "Basic",
    pergunta: "Qual é o valor de (P ↔ P)?",
    alternativas: ["Sempre V", "Sempre F", "Depende de P", "Não definido"],
    respostaCorreta: 0,
    explicacao: "Uma proposição é sempre logicamente equivalente a ela mesma."
  },
  // Pergunta Basic 18
  {
    dificuldade: "Basic",
    pergunta: "Qual expressão representa a lei de De Morgan para ¬(P ∧ Q)?",
    alternativas: ["¬P ∧ ¬Q", "¬P ∨ ¬Q", "P ∨ Q", "P → Q"],
    respostaCorreta: 1,
    explicacao: "Lei de De Morgan: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q."
  },
  // Pergunta Basic 19
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (P ∧ Q) → P?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "Se P ∧ Q é verdadeiro, P é verdadeiro. Se P ∧ Q é falso, a implicação é verdadeira por vacuidade."
  },
  // Pergunta Basic 20
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (P ∨ Q) → (Q ∨ P)?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Depende de P e Q", "Não definido"],
    respostaCorreta: 0,
    explicacao: "P ∨ Q e Q ∨ P são logicamente equivalentes, logo a implicação é sempre verdadeira."
  },
  // Pergunta Basic 21
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (P → Q) ∧ P se P=V e Q=F?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 1,
    explicacao: "P → Q é falso se P=V e Q=F, então (F ∧ V) = F."
  },
  // Pergunta Basic 22
  {
    dificuldade: "Basic",
    pergunta: "Qual é a forma simplificada de (P ∨ P)?",
    alternativas: ["P", "¬P", "P ∧ P", "V"],
    respostaCorreta: 0,
    explicacao: "Por idempotência da disjunção: P ∨ P ≡ P."
  },
  // Pergunta Basic 23
  {
    dificuldade: "Basic",
    pergunta: "Qual é a forma simplificada de (P ∧ P)?",
    alternativas: ["P", "¬P", "P ∨ P", "F"],
    respostaCorreta: 0,
    explicacao: "Por idempotência da conjunção: P ∧ P ≡ P."
  },
  // Pergunta Basic 24
  {
    dificuldade: "Basic",
    pergunta: "Se P=V, qual é o resultado de (P ∨ F)?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "Disjunção com F é verdadeira se P for verdadeiro."
  },
  // Pergunta Basic 25
  {
    dificuldade: "Basic",
    pergunta: "Se P=F, qual é o resultado de (P ∧ V)?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 1,
    explicacao: "Conjunção com F é sempre falsa."
  },
  // Pergunta Medium 1
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de ((P → Q) ∧ (Q → R)) → (P → R) para todos os valores de P, Q, R?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Depende dos valores", "Não definido"],
    respostaCorreta: 0,
    explicacao: "Isto é a propriedade de transitividade da implicação, que é uma tautologia."
  },
  // Pergunta Medium 2
  {
    dificuldade: "Medium",
    pergunta: "Qual é a forma equivalente de ¬(P ∨ Q) ∨ (Q ∧ P)?",
    alternativas: ["P ∧ ¬Q", "¬P ∧ ¬Q ∨ (Q ∧ P)", "¬P ∧ ¬Q ∨ P ∧ Q", "Nenhuma das anteriores"],
    respostaCorreta: 2,
    explicacao: "Pelos teoremas de De Morgan, ¬(P ∨ Q) = ¬P ∧ ¬Q, logo a expressão se torna (¬P ∧ ¬Q) ∨ (P ∧ Q)."
  },
  // Pergunta Medium 3
  {
    dificuldade: "Medium",
    pergunta: "Qual das fórmulas é uma equivalência lógica válida?",
    alternativas: ["P → Q ≡ Q → P", "P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)", "¬(P ∨ Q) ≡ ¬P ∨ ¬Q", "P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R) ∨ R"],
    respostaCorreta: 1,
    explicacao: "A distributividade da disjunção sobre a conjunção é uma equivalência lógica: P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)."
  },
  // Pergunta Medium 4
  {
    dificuldade: "Medium",
    pergunta: "Se P=V, Q=F e R=V, qual é o resultado de (P ∧ R) → Q?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 1,
    explicacao: "P ∧ R = V ∧ V = V, então temos V → F que é falso."
  },
  // Pergunta Medium 5
  {
    dificuldade: "Medium",
    pergunta: "Se P=F, Q=V e R=V, qual é o resultado de (P ∨ Q) ∧ (Q → R)?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 0,
    explicacao: "P ∨ Q = V e Q → R = V, logo o resultado é V ∧ V = V."
  },
  // Pergunta Medium 6
  {
    dificuldade: "Medium",
    pergunta: "Qual é o valor de (P ↔ Q) ∨ (Q ↔ R) quando P=Q≠R?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "Se P=Q, então P↔Q=V. Como é uma disjunção, o resultado é V."
  },
  // Pergunta Medium 7
  {
    dificuldade: "Medium",
    pergunta: "Se P=V, Q=F, qual é o resultado de (¬Q → P) ∧ (P → ¬Q)?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "¬Q=V, então ¬Q → P = V → V = V, e P → ¬Q = V → V = V, então o resultado é V ∧ V = V."
  },
  // Pergunta Medium 8
  {
    dificuldade: "Medium",
    pergunta: "Qual das seguintes fórmulas representa uma tautologia?",
    alternativas: ["(P → Q) ∨ P", "(P ∧ ¬P) ∨ Q", "P → (Q ∨ ¬Q)", "(P ∨ Q) ∧ ¬P"],
    respostaCorreta: 2,
    explicacao: "Q ∨ ¬Q é sempre verdadeiro, então P → verdadeiro é uma tautologia."
  },
  // Pergunta Medium 9
  {
    dificuldade: "Medium",
    pergunta: "Qual é o valor de ((P ∨ Q) ∧ ¬Q) ∨ R se P=F, Q=V e R=F?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 1,
    explicacao: "P ∨ Q = V, então (V ∧ ¬Q) = (V ∧ F) = F. F ∨ R = F ∨ F = F."
  },
  // Pergunta Medium 10
  {
    dificuldade: "Medium",
    pergunta: "Qual é a forma simplificada de ¬(P → Q)?",
    alternativas: ["P ∧ ¬Q", "¬P ∧ Q", "¬P ∨ Q", "P ∨ ¬Q"],
    respostaCorreta: 0,
    explicacao: "A negação de uma implicação é equivalente a P ∧ ¬Q."
  },
  // Pergunta Medium 11
  {
    dificuldade: "Medium",
    pergunta: "Qual é a forma equivalente de (P → Q) ∧ ¬Q?",
    alternativas: ["¬P", "¬P ∧ Q", "¬P ∨ Q", "Q ∧ ¬P"],
    respostaCorreta: 0,
    explicacao: "P → Q ≡ ¬P ∨ Q. Com ¬Q, temos (¬P ∨ Q) ∧ ¬Q = ¬P ∧ ¬Q. Simplificando, resulta em ¬P."
  },
  // Pergunta Medium 12
  {
    dificuldade: "Medium",
    pergunta: "Qual é o valor de (P ⊕ Q) quando P=V e Q=V?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 1,
    explicacao: "XOR é verdadeiro apenas quando os valores são diferentes. Como são iguais, o resultado é falso."
  },
  // Pergunta Medium 13
  {
    dificuldade: "Medium",
    pergunta: "Se P=V, Q=V, R=F, qual é o resultado de (P ∧ Q) ∨ R?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 0,
    explicacao: "P ∧ Q = V, então V ∨ R = V."
  },
  // Pergunta Medium 14
  {
    dificuldade: "Medium",
    pergunta: "Se P=F, Q=F, R=V, qual é o resultado de (P ∨ Q) → R?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 0,
    explicacao: "P ∨ Q = F, então F → R é verdadeiro (implicação vacuamente verdadeira)."
  },
  // Pergunta Medium 15
  {
    dificuldade: "Medium",
    pergunta: "Qual é o valor de ¬(P ↔ Q) quando P≠Q?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "P ↔ Q é falso se P ≠ Q, logo sua negação é verdadeira."
  },
  // Pergunta Medium 16
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de (P ∧ (Q ∨ R)) se P=F?",
    alternativas: ["V", "F", "Depende de Q e R", "Não definido"],
    respostaCorreta: 1,
    explicacao: "Como P é falso, P ∧ qualquer coisa será falso."
  },
  // Pergunta Medium 17
  {
    dificuldade: "Medium",
    pergunta: "Qual é o valor de ((¬P ∨ Q) ∧ (P ∨ ¬Q)) quando P=V e Q=F?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 1,
    explicacao: "Substituindo: (¬V ∨ F) ∧ (V ∨ ¬F) = (F ∨ F) ∧ (V ∨ V) = F ∧ V = F."
  },
  // Pergunta Medium 18
  {
    dificuldade: "Medium",
    pergunta: "Qual das seguintes proposições é equivalente a ¬(P ∨ ¬Q)?",
    alternativas: ["¬P ∧ Q", "P ∧ Q", "¬P ∨ Q", "P → Q"],
    respostaCorreta: 0,
    explicacao: "Pelos teoremas de De Morgan: ¬(P ∨ ¬Q) ≡ ¬P ∧ Q."
  },
  // Pergunta Medium 19
  {
    dificuldade: "Medium",
    pergunta: "Se P=V, Q=F, qual é o resultado de (P → Q) ∨ Q?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 1,
    explicacao: "P → Q é falso e Q é falso, logo F ∨ F = F."
  },
  // Pergunta Medium 20
  {
    dificuldade: "Medium",
    pergunta: "Qual é o valor de (P ⊕ Q) ⊕ Q quando P=V?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "XOR com Q duas vezes cancela Q, então o resultado é P, que é V."
  },
  // Pergunta Medium 21
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de ((P ∧ Q) ∨ ¬P) se P=F?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 0,
    explicacao: "¬P = V, logo o resultado é V ∨ qualquer coisa = V."
  },
  // Pergunta Medium 22
  {
    dificuldade: "Medium",
    pergunta: "Qual é a forma simplificada de (P ∨ (¬P ∧ Q))?",
    alternativas: ["P ∨ Q", "P ∧ Q", "P", "Q"],
    respostaCorreta: 0,
    explicacao: "Distribuição: P ∨ (¬P ∧ Q) ≡ (P ∨ ¬P) ∧ (P ∨ Q) ≡ V ∧ (P ∨ Q) ≡ P ∨ Q."
  },
  // Pergunta Medium 23
  {
    dificuldade: "Medium",
    pergunta: "Qual é o valor de (P ↔ Q) ↔ ¬(P ⊕ Q)?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Depende de P e Q", "Não definido"],
    respostaCorreta: 0,
    explicacao: "Por definição, P ↔ Q é equivalente a ¬(P ⊕ Q), logo a bicondicional entre eles é sempre verdadeira."
  },
  // Pergunta Medium 24
  {
  dificuldade: "Medium",
  pergunta: "Qual é o resultado de (P ∧ Q) ∧ (¬P ∨ ¬Q) quando P=V e Q=V?",
  alternativas: ["V", "F", "Depende", "Indefinido"],
  respostaCorreta: 1,
  explicacao: "Para P=V e Q=V, temos P ∧ Q = V ∧ V = V, ¬P = F, ¬Q = F, ¬P ∨ ¬Q = F ∨ F = F, então (P ∧ Q) ∧ (¬P ∨ ¬Q) = V ∧ F = F."
  },
  // Pergunta Medium 25
  {
    dificuldade: "Medium",
    pergunta: "Qual é a forma equivalente de (P ∧ ¬Q) ∨ (¬P ∧ Q)?",
    alternativas: ["P ⊕ Q", "P ↔ Q", "P ∨ Q", "P ∧ Q"],
    respostaCorreta: 0,
    explicacao: "A expressão representa a disjunção exclusiva, pois é verdadeira quando P e Q têm valores diferentes."
  },
  // Pergunta Hard 1
  {
    dificuldade: "Hard",
    pergunta: "Qual é o valor de ((P → Q) ∧ (Q → R) ∧ P) → R para todos os valores?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Depende dos valores", "Não definido"],
    respostaCorreta: 0,
    explicacao: "P, Q, R satisfazem a transitividade da implicação. Se P é verdadeiro, Q será verdadeiro e R também. Logo, é uma tautologia."
  },
  // Pergunta Hard 2
  {
    dificuldade: "Hard",
    pergunta: "Qual é a forma simplificada de (P → Q) ∧ (P → ¬Q)?",
    alternativas: ["¬P", "P ∧ Q", "¬Q", "Contradição"],
    respostaCorreta: 0,
    explicacao: "P → Q ≡ ¬P ∨ Q, P → ¬Q ≡ ¬P ∨ ¬Q. A conjunção (¬P ∨ Q) ∧ (¬P ∨ ¬Q) = ¬P ∧ (Q ∨ ¬Q) = ¬P."
  },
  // Pergunta Hard 3
  {
    dificuldade: "Hard",
    pergunta: "A expressão ((P ∨ Q) ∧ ¬P) → Q é:",
    alternativas: ["Tautologia", "Contradição", "Contingência", "Nenhuma das anteriores"],
    respostaCorreta: 0,
    explicacao: "(P ∨ Q) ∧ ¬P simplifica para Q ∧ ¬P. A implicação (Q ∧ ¬P) → Q é sempre verdadeira, pois se o antecedente é verdadeiro, Q é verdadeiro."
  },
  // Pergunta Hard 4
  {
    dificuldade: "Hard",
    pergunta: "Qual é a forma equivalente de (P ↔ Q) ∧ (Q ↔ R)?",
    alternativas: ["P ↔ R", "(P ∧ Q ∧ R) ∨ (¬P ∧ ¬Q ∧ ¬R)", "(P ⊕ Q) ⊕ R", "Nenhuma das anteriores"],
    respostaCorreta: 1,
    explicacao: "As bicondicionais forçam P, Q, R a serem todos verdadeiros ou todos falsos, resultando em (P ∧ Q ∧ R) ∨ (¬P ∧ ¬Q ∧ ¬R)."
  },
  // Pergunta Hard 5
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de ¬((P ∧ Q) ∨ (¬P ∧ ¬Q))?",
    alternativas: ["P ⊕ Q", "P ↔ Q", "¬P ∨ Q", "Q → P"],
    respostaCorreta: 0,
    explicacao: "(P ∧ Q) ∨ (¬P ∧ ¬Q) é P ↔ Q. Sua negação é ¬(P ↔ Q) = P ⊕ Q (disjunção exclusiva)."
  },
  // Pergunta Hard 6
  {
    dificuldade: "Hard",
    pergunta: "Se P=V, Q=F, R=F, qual é o valor de ((P ∨ Q) ∧ (¬Q ∨ R)) ∨ (¬P)?",
    alternativas: ["V", "F", "Depende", "Indefinido"],
    respostaCorreta: 0,
    explicacao: "P ∨ Q = V, ¬Q ∨ R = V ∨ F = V, (V ∧ V) = V, ¬P = F, então V ∨ F = V."
  },
  // Pergunta Hard 7
  {
    dificuldade: "Hard",
    pergunta: "Qual é o valor de ((P → Q) ∨ (Q → P)) para todos os P, Q?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Depende", "Verdadeiro apenas quando P ≠ Q"],
    respostaCorreta: 0,
    explicacao: "Para quaisquer valores de P e Q, pelo menos uma das implicações é verdadeira, tornando a expressão uma tautologia."
  },
  // Pergunta Hard 8
  {
    dificuldade: "Hard",
    pergunta: "A expressão ¬P ∨ (P ∧ Q) é equivalente a:",
    alternativas: ["P → Q", "Q → P", "P ⊕ Q", "¬Q → P"],
    respostaCorreta: 0,
    explicacao: "¬P ∨ (P ∧ Q) = (¬P ∨ P) ∧ (¬P ∨ Q) = V ∧ (¬P ∨ Q) = ¬P ∨ Q, que é equivalente a P → Q."
  },
  // Pergunta Hard 9
  {
    dificuldade: "Hard",
    pergunta: "Qual é o valor de (P ⊕ Q) ⊕ (Q ⊕ R) quando P=R?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Depende de Q", "Depende de P"],
    respostaCorreta: 2,
    explicacao: "Se P=R, (P ⊕ Q) = (R ⊕ Q). Então (P ⊕ Q) ⊕ (Q ⊕ R) = (P ⊕ Q) ⊕ (P ⊕ Q) = F, mas depende de Q."
  },
  // Pergunta Hard 10
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de ((P → Q) ∧ (Q → R)) ∨ ((R → P) ∧ (P → R))?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Contingência", "Depende do valor de P"],
    respostaCorreta: 2,
    explicacao: "A expressão não é tautologia nem contradição, pois depende dos valores de P, Q, R (contingência)."
  },
  // Pergunta Hard 11
  {
    dificuldade: "Hard",
    pergunta: "Qual é a forma simplificada de (¬P ∧ Q) ∨ (P ∧ Q)?",
    alternativas: ["Q", "P ↔ Q", "Q → P", "P ∧ Q"],
    respostaCorreta: 0,
    explicacao: "Fatorando Q: (¬P ∧ Q) ∨ (P ∧ Q) = Q ∧ (¬P ∨ P) = Q ∧ V = Q."
  },
  // Pergunta Hard 12
  {
    dificuldade: "Hard",
    pergunta: "Qual das seguintes expressões é contraditória?",
    alternativas: ["P ∧ ¬P", "(P ∨ Q) ∧ ¬P", "P → ¬P", "¬(P ∨ Q)"],
    respostaCorreta: 0,
    explicacao: "P ∧ ¬P é sempre falso, independentemente de P, sendo uma contradição."
  },
  // Pergunta Hard 13
  {
    dificuldade: "Hard",
    pergunta: "Qual é o valor de ((P ∨ Q) ∧ (¬P ∨ ¬Q)) quando P=Q?",
    alternativas: ["V", "F", "Depende", "Verdadeiro apenas quando P=V"],
    respostaCorreta: 1,
    explicacao: "Se P=Q=V, (V ∨ V) ∧ (¬V ∨ ¬V) = V ∧ F = F. Se P=Q=F, (F ∨ F) ∧ (¬F ∨ ¬F) = F ∧ V = F. Sempre falso."
  },
  // Pergunta Hard 14
  {
    dificuldade: "Hard",
    pergunta: "A expressão (P ∨ (Q ∧ R)) ∧ (¬P ∨ ¬Q) pode ser verdadeira?",
    alternativas: ["Sim, quando Q=F", "Não, nunca é verdadeira", "Sim, quando P=V e R=V", "Apenas quando R=F"],
    respostaCorreta: 0,
    explicacao: "Se Q=F, (P ∨ (F ∧ R)) = P, e (¬P ∨ ¬F) = ¬P ∨ V = V. Logo, P ∧ V = P, que pode ser verdadeiro."
  },
  // Pergunta Hard 15
  {
    dificuldade: "Hard",
    pergunta: "Qual é o valor de ((P → Q) ∧ (Q → R) ∧ (R → P))?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Depende dos valores", "Verdadeiro apenas quando todos são iguais"],
    respostaCorreta: 3,
    explicacao: "As implicações forçam P=Q=R (todos verdadeiros ou todos falsos), caso contrário, a conjunção é falsa."
  },
  // Pergunta Hard 16
  {
    dificuldade: "Hard",
    pergunta: "Qual é a simplificação de ¬(P ↔ Q)?",
    alternativas: ["P ⊕ Q", "P → Q", "¬P ∧ Q", "¬Q → P"],
    respostaCorreta: 0,
    explicacao: "Por definição, ¬(P ↔ Q) = P ⊕ Q, pois a negação da equivalência é a disjunção exclusiva."
  },
  // Pergunta Hard 17
  {
    dificuldade: "Hard",
    pergunta: "Qual é o valor de (P ∧ Q) ∨ (¬P ∧ ¬Q)?",
    alternativas: ["P ↔ Q", "P ⊕ Q", "P → Q", "Sempre falso"],
    respostaCorreta: 0,
    explicacao: "A expressão (P ∧ Q) ∨ (¬P ∧ ¬Q) é verdadeira quando P=Q, equivalente a P ↔ Q."
  },
  // Pergunta Hard 18
  {
    dificuldade: "Hard",
    pergunta: "Qual é o valor de ((P ∧ Q) → R) quando P=Q=V e R=F?",
    alternativas: ["V", "F", "Depende", "Não definido"],
    respostaCorreta: 1,
    explicacao: "P ∧ Q = V, então V → F = F, pois a implicação é falsa quando o antecedente é verdadeiro e o consequente é falso."
  },
  // Pergunta Hard 19
  {
    dificuldade: "Hard",
    pergunta: "A expressão (P ∧ (Q ∨ R)) ∨ (¬P ∧ R) pode ser simplificada para:",
    alternativas: ["R ∨ (P ∧ Q)", "(P ∧ Q) ∨ (P ∧ R)", "Q ∨ R", "P ∨ R"],
    respostaCorreta: 0,
    explicacao: "Distribuindo: (P ∧ Q) ∨ (P ∧ R) ∨ (¬P ∧ R) = (P ∧ Q) ∨ R ∧ (P ∨ ¬P) = (P ∧ Q) ∨ R."
  },
  // Pergunta Hard 20
  {
    dificuldade: "Hard",
    pergunta: "Qual é o valor de ((P ⊕ Q) ∨ (Q ⊕ R)) quando P=R?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Depende de Q", "Depende de P"],
    respostaCorreta: 2,
    explicacao: "Se P=R, (P ⊕ Q) = (R ⊕ Q), então (P ⊕ Q) ∨ (Q ⊕ R) depende de Q, sendo verdadeiro se Q ≠ P."
  },
  // Pergunta Hard 21
  {
    dificuldade: "Hard",
    pergunta: "Qual é o valor de ((P ∧ R) ∨ (Q ∧ ¬R)) quando R=F?",
    alternativas: ["Q", "¬Q", "P", "Sempre falso"],
    respostaCorreta: 0,
    explicacao: "Se R=F, P ∧ R = F, Q ∧ ¬R = Q ∧ V = Q, então o resultado é Q."
  },
  // Pergunta Hard 22
  {
    dificuldade: "Hard",
    pergunta: "Qual é a simplificação de ¬(¬P ∧ ¬Q)?",
    alternativas: ["P ∨ Q", "P ∧ Q", "P ⊕ Q", "P → Q"],
    respostaCorreta: 0,
    explicacao: "Pelo teorema de De Morgan: ¬(¬P ∧ ¬Q) = P ∨ Q."
  },
  // Pergunta Hard 23
  {
    dificuldade: "Hard",
    pergunta: "Qual é o valor de ((P ∨ Q) ∧ (P ∨ ¬Q))?",
    alternativas: ["P", "Q", "¬Q", "P ∨ Q"],
    respostaCorreta: 0,
    explicacao: "(P ∨ Q) ∧ (P ∨ ¬Q) = P ∨ (Q ∧ ¬Q) = P ∨ F = P."
  },
  // Pergunta Hard 24
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de ((P → Q) ∧ (Q → R) ∧ (¬R)) → ¬P?",
    alternativas: ["Sempre verdadeiro", "Sempre falso", "Contingência", "Depende de P"],
    respostaCorreta: 0,
    explicacao: "Se ¬R é verdadeiro, para (P → Q) ∧ (Q → R) ser verdadeiro, P deve ser falso, tornando ¬P verdadeiro. É uma tautologia."
  },
  // Pergunta Hard 25
  {
    dificuldade: "Hard",
    pergunta: "Qual é a forma simplificada de (P ∧ Q) ∨ (P ∧ ¬Q) ∨ (¬P ∧ Q)?",
    alternativas: ["P ∨ Q", "P ∧ Q", "P ⊕ Q", "Q → P"],
    respostaCorreta: 0,
    explicacao: "Fatorando: (P ∧ Q) ∨ (P ∧ ¬Q) = P ∧ (Q ∨ ¬Q) = P. Então P ∨ (¬P ∧ Q) = (P ∨ ¬P) ∧ (P ∨ Q) = P ∨ Q."
  }
];*/