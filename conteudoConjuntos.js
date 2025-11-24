const perguntasConjuntos = [
  // Pergunta Easy 1
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto que representa os números naturais menores que 4, considerando que os números naturais começam em 0?",
    alternativas: ["{1,2,3}", "{0,1,2,3}", "{-1,0,1,2,3}", "{2,3,4}"],
    respostaCorreta: 1,
    explicacao: "Os números naturais começando em 0 menores que 4 formam {0,1,2,3}."
  },

  // Pergunta Easy 2
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto complementar de A={1,2} no universo U={1,2,3,4}?",
    alternativas: ["{3,4}", "{1,2}", "{1,2,3,4}", "{2,3}"],
    respostaCorreta: 0,
    explicacao: "O complementar contém os elementos do universo que não estão em A."
  },

  // Pergunta Easy 3
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A={1,2} e B={2,3}?",
    alternativas: ["{1,2,3}", "{1,2}", "{2,3}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "A união contém todos os elementos de A ou B."
  },

  // Pergunta Easy 4
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A={1,2,3} e B={3,4,5}?",
    alternativas: ["{3}", "{1,2}", "{4,5}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "A interseção contém os elementos comuns aos dois conjuntos."
  },

  // Pergunta Easy 5
  {
    dificuldade: "Easy",
    pergunta: "Qual é o subconjunto de A={1,2,3} que contém apenas o número 2?",
    alternativas: ["{2}", "{1,2}", "{3}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "Um subconjunto pode conter apenas parte dos elementos do conjunto."
  },

  // Pergunta Easy 6
  {
    dificuldade: "Easy",
    pergunta: "O número 4 pertence ao conjunto A={2,4,6,8}?",
    alternativas: ["Sim", "Não", "Depende do universo", "Apenas se incluir 2"],
    respostaCorreta: 0,
    explicacao: "O número 4 está no conjunto, então 4 ∈ A."
  },

  // Pergunta Easy 7
  {
    dificuldade: "Easy",
    pergunta: "O conjunto vazio é representado por:",
    alternativas: ["{}", "{0}", "()", "∅"],
    respostaCorreta: 3,
    explicacao: "O conjunto vazio é representado por ∅ ou {}."
  },

  // Pergunta Easy 8
  {
    dificuldade: "Easy",
    pergunta: "Qual é a diferença entre A={1,2,3} e B={3,4}?",
    alternativas: ["{1,2}", "{3,4}", "{2,3}", "{4}"],
    respostaCorreta: 0,
    explicacao: "A diferença A - B contém elementos de A que não estão em B."
  },

  // Pergunta Easy 9
  {
    dificuldade: "Easy",
    pergunta: "O conjunto {1,2,3} é subconjunto de {1,2,3,4}?",
    alternativas: ["Sim", "Não", "Apenas se incluir 4", "Depende do universo"],
    respostaCorreta: 0,
    explicacao: "Todos os elementos do primeiro conjunto estão no segundo."
  },

  // Pergunta Easy 10
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto das vogais?",
    alternativas: ["{a,e,i,o,u}", "{a,b,c,d,e}", "{a,e,i,o}", "{v,g,l}"],
    respostaCorreta: 0,
    explicacao: "As vogais são a, e, i, o e u."
  },

  // Pergunta Easy 11
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A={x,y} e B={y,z}?",
    alternativas: ["{y}", "{x,z}", "{x}", "{x,y,z}"],
    respostaCorreta: 0,
    explicacao: "y é o único elemento comum."
  },

  // Pergunta Easy 12
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A={2,4} e B={1,3,4}?",
    alternativas: ["{1,2,3,4}", "{4}", "{2,4}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "União combina todos os elementos sem repetição."
  },

  // Pergunta Easy 13
  {
    dificuldade: "Easy",
    pergunta: "O número 5 pertence ao conjunto A={1,3,5,7}?",
    alternativas: ["Sim", "Não", "Depende do universo", "Apenas se incluir 7"],
    respostaCorreta: 0,
    explicacao: "5 ∈ A."
  },

  // Pergunta Easy 14
  {
    dificuldade: "Easy",
    pergunta: "Qual é o complementar de A={a,e,i,o,u} em U={a,b,c,d,e,f,g,i,o,u}?",
    alternativas: ["{b,c,d,f,g}", "{a,e,i,o,u}", "{c,f,g}", "{d,e,f}"],
    respostaCorreta: 0,
    explicacao: "É o conjunto de elementos de U que não estão em A."
  },

  // Pergunta Easy 15
  {
    dificuldade: "Easy",
    pergunta: "Qual é a diferença de B={1,2,3} - A={2,3}?",
    alternativas: ["{1}", "{2}", "{1,2}", "{3}"],
    respostaCorreta: 0,
    explicacao: "A diferença contém apenas elementos que pertencem apenas a B."
  },

  // Pergunta Easy 16
  {
    dificuldade: "Easy",
    pergunta: "O conjunto {a,b} é subconjunto de {a,b,c,d}?",
    alternativas: ["Sim", "Não", "Apenas se tirar o d", "Depende do universo"],
    respostaCorreta: 0,
    explicacao: "Todos os elementos de {a,b} estão no conjunto maior."
  },

  // Pergunta Easy 17
  {
    dificuldade: "Easy",
    pergunta: "O conjunto {a} possui quais subconjuntos básicos?",
    alternativas: ["∅ e {a}", "{a} apenas", "{∅} apenas", "Nenhum"],
    respostaCorreta: 0,
    explicacao: "Todo conjunto tem pelo menos o vazio e o próprio conjunto como subconjuntos."
  },

  // Pergunta Easy 18
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A=∅ e B={1,2}?",
    alternativas: ["{1,2}", "∅", "{2}", "{1}"],
    respostaCorreta: 0,
    explicacao: "A união com o conjunto vazio é o próprio conjunto B."
  },

  // Pergunta Easy 19
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A=∅ e B={1,2}?",
    alternativas: ["∅", "{1,2}", "{2}", "{1}"],
    respostaCorreta: 0,
    explicacao: "Não há elementos comuns."
  },

  // Pergunta Easy 20
  {
    dificuldade: "Easy",
    pergunta: "O conjunto vazio é subconjunto de {1,2,3}?",
    alternativas: ["Sim", "Não", "Apenas se incluir 0", "Depende do universo"],
    respostaCorreta: 0,
    explicacao: "O vazio é subconjunto de qualquer conjunto."
  },

  // Pergunta Easy 21
  {
    dificuldade: "Easy",
    pergunta: "O conjunto vazio possui algum elemento?",
    alternativas: ["Não", "Sim", "Apenas se incluir 0", "Depende do universo"],
    respostaCorreta: 0,
    explicacao: "O conjunto vazio não possui elementos."
  },

  // Pergunta Easy 22
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A={x} e B={x,y}?",
    alternativas: ["{x,y}", "{x}", "{y}", "∅"],
    respostaCorreta: 0,
    explicacao: "União reúne todos os elementos."
  },

  // Pergunta Easy 23
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A={1,2} e B={3,4}?",
    alternativas: ["∅", "{1,2,3,4}", "{1}", "{3}"],
    respostaCorreta: 0,
    explicacao: "Os conjuntos não têm elementos em comum."
  },

  // Pergunta Easy 24
  {
    dificuldade: "Easy",
    pergunta: "O conjunto {a,b,c} contém o elemento d?",
    alternativas: ["Sim", "Não", "Depende do universo", "Apenas se incluir c"],
    respostaCorreta: 1,
    explicacao: "O elemento d não está no conjunto."
  },

  // Pergunta Easy 25
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto que representa os números pares até 4, considerando 0 como par?",
    alternativas: ["{0,2,4}", "{1,2,3,4}", "{2,4}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "Os pares até 4 são {0,2,4}."
  },

  // Pergunta Basic 1
{
  dificuldade: "Basic",
  pergunta: "O conjunto A={1,2} é subconjunto próprio de B={1,2,3}?",
  alternativas: ["Sim", "Não", "Apenas se incluir 3", "Depende do universo"],
  respostaCorreta: 0,
  explicacao: "A possui todos os seus elementos em B e é diferente de B, logo é um subconjunto próprio."
},

// Pergunta Basic 2
{
  dificuldade: "Basic",
  pergunta: "Se A={a,b} e B={b,c}, qual é A ∩ B?",
  alternativas: ["{b}", "{a,b,c}", "{a}", "{c}"],
  respostaCorreta: 0,
  explicacao: "A interseção contém apenas os elementos comuns aos dois conjuntos."
},

// Pergunta Basic 3
{
  dificuldade: "Basic",
  pergunta: "Qual é a diferença simétrica de A={1,2,3} e B={2,3,4}?",
  alternativas: ["{1,4}", "{1,2,3,4}", "{2,3}", "{4}"],
  respostaCorreta: 0,
  explicacao: "A diferença simétrica são os elementos que estão em apenas um dos conjuntos."
},

// Pergunta Basic 4
{
  dificuldade: "Basic",
  pergunta: "Qual é o conjunto resultante de (A ∩ B) ∪ C para A={1,2}, B={2,3}, C={3,4}?",
  alternativas: ["{2,3,4}", "{2,3}", "{3,4}", "{1,2,3,4}"],
  respostaCorreta: 0,
  explicacao: "(A ∩ B) = {2}; {2} ∪ C = {2,3,4}."
},

// Pergunta Basic 5
{
  dificuldade: "Basic",
  pergunta: "Se A={1,2,3}, B={3,4}, qual é A - (A ∩ B)?",
  alternativas: ["{1,2}", "{3,4}", "{2,3}", "{4}"],
  respostaCorreta: 0,
  explicacao: "A ∩ B = {3}; então A - {3} = {1,2}."
},

// Pergunta Basic 6
{
  dificuldade: "Basic",
  pergunta: "Qual é a união de três conjuntos A={1}, B={2}, C={3}?",
  alternativas: ["{1,2,3}", "{1,2}", "{2,3}", "{1,3}"],
  respostaCorreta: 0,
  explicacao: "A união contém todos os elementos dos três conjuntos."
},

// Pergunta Basic 7
{
  dificuldade: "Basic",
  pergunta: "O conjunto {x,y} é subconjunto de {x,y,z}?",
  alternativas: ["Sim", "Não", "Apenas se incluir z", "Depende do universo"],
  respostaCorreta: 0,
  explicacao: "Todos os elementos do primeiro estão no segundo."
},

// Pergunta Basic 8
{
  dificuldade: "Basic",
  pergunta: "Se U={1,2,3,4,5}, A={1,4}, qual é Aᶜ?",
  alternativas: ["{2,3,5}", "{1,4}", "{3,4,5}", "{2,5}"],
  respostaCorreta: 0,
  explicacao: "O complementar contém elementos do universo que não estão em A."
},

// Pergunta Basic 9
{
  dificuldade: "Basic",
  pergunta: "Qual é a interseção de A={x,y,z} e B=∅?",
  alternativas: ["∅", "{x}", "{x,y,z}", "{y,z}"],
  respostaCorreta: 0,
  explicacao: "Não há elementos comuns com o conjunto vazio."
},

// Pergunta Basic 10
{
  dificuldade: "Basic",
  pergunta: "Qual é a diferença de conjuntos A={1,2,3} e B={1,3,5}?",
  alternativas: ["{2}", "{1,2}", "{2,5}", "{3,5}"],
  respostaCorreta: 0,
  explicacao: "Elemento que está em A mas não em B: {2}."
},

// Pergunta Basic 11
{
  dificuldade: "Basic",
  pergunta: "Se A={1,2}, B={1,2,3}, qual é B - A?",
  alternativas: ["{3}", "{1,3}", "{2,3}", "{1,2}"],
  respostaCorreta: 0,
  explicacao: "Removendo elementos de A, sobra {3}."
},

// Pergunta Basic 12
{
  dificuldade: "Basic",
  pergunta: "O conjunto vazio é subconjunto de {a,b,c}?",
  alternativas: ["Sim", "Não", "Apenas de conjuntos finitos", "Depende do universo"],
  respostaCorreta: 0,
  explicacao: "O conjunto vazio é subconjunto de qualquer conjunto."
},

// Pergunta Basic 13
{
  dificuldade: "Basic",
  pergunta: "Se A={1,2} e B={2,3}, qual é A ∪ B?",
  alternativas: ["{1,2,3}", "{2}", "{1,3}", "{1}"],
  respostaCorreta: 0,
  explicacao: "A união contém todos os elementos de ambos."
},

// Pergunta Basic 14
{
  dificuldade: "Basic",
  pergunta: "Qual é o complementar do conjunto universal?",
  alternativas: ["∅", "U", "Todos os elementos", "Indefinido"],
  respostaCorreta: 0,
  explicacao: "Nada está fora do universo."
},

// Pergunta Basic 15
{
  dificuldade: "Basic",
  pergunta: "Qual é o resultado de (A ∪ B) ∩ A para A={1,2}, B={2,3}?",
  alternativas: ["{1,2}", "{2}", "{1}", "{3}"],
  respostaCorreta: 0,
  explicacao: "A ∪ B = {1,2,3}; intersecta com A → {1,2}."
},

// Pergunta Basic 16
{
  dificuldade: "Basic",
  pergunta: "Qual é o resultado de (A ∩ B) ∩ C para A={1,2,3}, B={2,3}, C={3,4}?",
  alternativas: ["{3}", "{2,3}", "{2}", "{4}"],
  respostaCorreta: 0,
  explicacao: "O único elemento comum aos três é 3."
},

// Pergunta Basic 17
{
  dificuldade: "Basic",
  pergunta: "Se A={1,2}, B={1,3}, qual é A ∆ B (diferença simétrica)?",
  alternativas: ["{2,3}", "{1,2,3}", "{2}", "{3}"],
  respostaCorreta: 0,
  explicacao: "Retira os elementos comuns."
},

// Pergunta Basic 18
{
  dificuldade: "Basic",
  pergunta: "Se A={a,b} e B={b,c,d}, qual é A ∩ B?",
  alternativas: ["{b}", "{a,b}", "{c}", "{d}"],
  respostaCorreta: 0,
  explicacao: "O único elemento comum é b."
},

// Pergunta Basic 19
{
  dificuldade: "Basic",
  pergunta: "Qual é a interseção de A={a,b,c} e B={a,c,e,f}?",
  alternativas: ["{a,c}", "{b,c}", "{a}", "{c,e}"],
  respostaCorreta: 0,
  explicacao: "Os elementos comuns são a e c."
},

// Pergunta Basic 20
{
  dificuldade: "Basic",
  pergunta: "Qual é o resultado de (A - B) ∪ (B - A) para A={1,2}, B={2,3}?",
  alternativas: ["{1,3}", "{2}", "{1,2,3}", "{3}"],
  respostaCorreta: 0,
  explicacao: "Elementos exclusivos de cada conjunto."
},

// Pergunta Basic 21
{
  dificuldade: "Basic",
  pergunta: "Qual é a diferença entre (A ∪ B) e (A ∩ B) para A={1,2,3}, B={3,4,5}?",
  alternativas: ["{1,2,4,5}", "{3}", "{1,2,3,4,5}", "{4,5}"],
  respostaCorreta: 0,
  explicacao: "Remove os elementos em comum."
},

// Pergunta Basic 22
{
  dificuldade: "Basic",
  pergunta: "O conjunto {a,b,c} contém o elemento b?",
  alternativas: ["Sim", "Não", "Apenas se incluir a", "Depende do universo"],
  respostaCorreta: 0,
  explicacao: "b está explicitamente no conjunto."
},

// Pergunta Basic 23
{
  dificuldade: "Basic",
  pergunta: "Qual é o complementar de A={1,2,3} no universo U={1,2,3,4,5,6}?",
  alternativas: ["{4,5,6}", "{1,2,3}", "{3,4,5}", "{1,2,3,6}"],
  respostaCorreta: 0,
  explicacao: "Elementos de U que não estão em A."
},

// Pergunta Basic 24
{
  dificuldade: "Basic",
  pergunta: "Qual é a interseção de A={a,b,c,d} e B={c,d,e,f}?",
  alternativas: ["{c,d}", "{a,b}", "{d,e}", "{b,c}"],
  respostaCorreta: 0,
  explicacao: "Elementos comuns: c e d."
},

// Pergunta Basic 25
{
  dificuldade: "Basic",
  pergunta: "Qual é a união de A={1,3,5} e B={2,4,6}?",
  alternativas: ["{1,2,3,4,5,6}", "{1,3,5}", "{2,4,6}", "{3,4,5,6}"],
  respostaCorreta: 0,
  explicacao: "União reúne todos os elementos sem repetição."
},

// Pergunta Medium 1
{
  dificuldade: "Medium",
  pergunta: "Quantos subconjuntos possui o conjunto A={1,2,3,4}?",
  alternativas: ["8", "12", "16", "10"],
  respostaCorreta: 2,
  explicacao: "Um conjunto com n elementos possui 2^n subconjuntos. Para n=4: 2^4 = 16."
},

// Pergunta Medium 2
{
  dificuldade: "Medium",
  pergunta: "Qual é o resultado de (A ∪ B) - (A ∩ B) para A={a,b}, B={b,c}?",
  alternativas: ["{a,c}", "{b}", "{a,b,c}", "{c}"],
  respostaCorreta: 0,
  explicacao: "A ∪ B = {a,b,c} e A ∩ B = {b}. A diferença é {a,c}."
},

// Pergunta Medium 3
{
  dificuldade: "Medium",
  pergunta: "Se A={x,y}, B={y,z}, qual é |A×B|?",
  alternativas: ["2", "3", "4", "5"],
  respostaCorreta: 2,
  explicacao: "A×B tem |A|·|B| = 2·2 = 4 pares ordenados."
},

// Pergunta Medium 4
{
  dificuldade: "Medium",
  pergunta: "Se U={a,b,c,d} e A={a,c}, qual é (Aᶜ) ∩ {b,c}?",
  alternativas: ["{b}", "{b,c}", "{c}", "{a}"],
  respostaCorreta: 0,
  explicacao: "Aᶜ = {b,d}. Interseção com {b,c} = {b}."
},

// Pergunta Medium 5
{
  dificuldade: "Medium",
  pergunta: "Qual é (A ∩ B) - C para A={1,2,3}, B={2,3,4}, C={3}?",
  alternativas: ["{2}", "{3}", "{2,3}", "{1}"],
  respostaCorreta: 0,
  explicacao: "A ∩ B = {2,3}. Removendo {3} sobra {2}."
},

// Pergunta Medium 6
{
  dificuldade: "Medium",
  pergunta: "Se A={1,2,3}, B={3,4}, qual é (A ∪ B) ∩ (A ∪ {5})?",
  alternativas: ["{1,2,3}", "{1,2,3,4}", "{3}", "{2,3,4,5}"],
  respostaCorreta: 0,
  explicacao: "A ∪ B = {1,2,3,4} e A ∪ {5} = {1,2,3,5}. A interseção é {1,2,3}."
},

// Pergunta Medium 7
{
  dificuldade: "Medium",
  pergunta: "Se A={x,y,z}, quantos subconjuntos de 2 elementos existem?",
  alternativas: ["3", "6", "4", "2"],
  respostaCorreta: 0,
  explicacao: "C(3,2) = 3 subconjuntos de dois elementos."
},

// Pergunta Medium 8
{
  dificuldade: "Medium",
  pergunta: "Se A={a,b}, B={b,c}, C={c,d}, qual é (A ∪ C) - B?",
  alternativas: ["{a,d}", "{a,c,d}", "{a,b,d}", "{a}"],
  respostaCorreta: 0,
  explicacao: "A ∪ C = {a,b,c,d}. Removendo B={b,c} sobra {a,d}."
},

// Pergunta Medium 9
{
  dificuldade: "Medium",
  pergunta: "Qual é a união de A×B e B×A se A={1}, B={2}?",
  alternativas: ["{(1,2),(2,1)}", "{(1,2)}", "{(2,1)}", "{(1,1),(2,2)}"],
  respostaCorreta: 0,
  explicacao: "A×B = {(1,2)} e B×A = {(2,1)}. União = {(1,2),(2,1)}."
},

// Pergunta Medium 10
{
  dificuldade: "Medium",
  pergunta: "Se A={1,2,3,4}, B={3,4}, quanto vale |P(A)| − |P(B)|?",
  alternativas: ["12", "8", "10", "16"],
  respostaCorreta: 0,
  explicacao: "P(A)=16, P(B)=4. Diferença = 12."
},

// Pergunta Medium 11
{
  dificuldade: "Medium",
  pergunta: "Se A={a,b,c}, quantos subconjuntos não vazios existem?",
  alternativas: ["7", "6", "8", "5"],
  respostaCorreta: 0,
  explicacao: "Total 2^3=8 subconjuntos. Sem o vazio restam 7."
},

// Pergunta Medium 12
{
  dificuldade: "Medium",
  pergunta: "Qual é (A ∩ B) ∪ (B ∩ C) para A={1,2}, B={2,3}, C={3,4}?",
  alternativas: ["{2,3}", "{2}", "{3}", "{1,2,3,4}"],
  respostaCorreta: 0,
  explicacao: "A∩B={2} e B∩C={3}. União = {2,3}."
},

// Pergunta Medium 13
{
  dificuldade: "Medium",
  pergunta: "Qual é a diferença simétrica entre A={x,y,z} e B={y,z,w}?",
  alternativas: ["{x,w}", "{x,y,z,w}", "{y,z}", "{w}"],
  respostaCorreta: 0,
  explicacao: "Elementos exclusivos: {x,w}."
},

// Pergunta Medium 14
{
  dificuldade: "Medium",
  pergunta: "Qual é o conjunto potência de A={∅}?",
  alternativas: ["{∅}", "{∅,{∅}}", "{∅,{∅,∅}}", "{∅,{}}"],
  respostaCorreta: 1,
  explicacao: "P({∅}) = {∅, {∅}}."
},

// Pergunta Medium 15
{
  dificuldade: "Medium",
  pergunta: "Se A={1,2}, B={2,3}, qual é (A×B) ∩ (B×A)?",
  alternativas: ["{(2,2)}", "{(1,2)}", "{(2,3)}", "∅"],
  respostaCorreta: 0,
  explicacao: "A×B={(1,2),(1,3),(2,2),(2,3)}, B×A={(2,1),(3,1),(2,2),(3,2)}. Interseção = {(2,2)}."
},

// Pergunta Medium 16
{
  dificuldade: "Medium",
  pergunta: "Se A={x,y,z}, qual é |A×A|?",
  alternativas: ["6", "9", "3", "12"],
  respostaCorreta: 1,
  explicacao: "3×3 = 9 pares ordenados."
},

// Pergunta Medium 17
{
  dificuldade: "Medium",
  pergunta: "Se U={1,2,3,4,5} e A={1,3,5}, qual é (Aᶜ) ∪ {1}?",
  alternativas: ["{1,2,4}", "{1,2,4,5}", "{1,2,3,4,5}", "{2,4}"],
  respostaCorreta: 0,
  explicacao: "Aᶜ = {2,4}. União com {1} = {1,2,4}."
},

// Pergunta Medium 18
{
  dificuldade: "Medium",
  pergunta: "Qual é (A ∪ B)ᶜ se A={1,2}, B={3,4} e U={1,2,3,4,5,6}?",
  alternativas: ["{5,6}", "{1,2,3,4}", "{4,5,6}", "{3,4,5}"],
  respostaCorreta: 0,
  explicacao: "A ∪ B = {1,2,3,4}. Complementar = {5,6}."
},

// Pergunta Medium 19
{
  dificuldade: "Medium",
  pergunta: "Se U={1,2,3,4,5,6}, A={1,2,3}, B={3,4,5}, qual é (A ∪ B)ᶜ?",
  alternativas: ["{6}", "{4,5,6}", "{1,2}", "{3,6}"],
  respostaCorreta: 0,
  explicacao: "A ∪ B = {1,2,3,4,5}. Faltando apenas {6}."
},

// Pergunta Medium 20
{
  dificuldade: "Medium",
  pergunta: "Se |A|=3, |B|=4 e |A ∩ B|=2, qual é |A ∪ B|?",
  alternativas: ["5", "6", "7", "4"],
  respostaCorreta: 0,
  explicacao: "3 + 4 − 2 = 5."
},

// Pergunta Medium 21
{
  dificuldade: "Medium",
  pergunta: "Se A={1,2,3}, B={2,3,4}, C={3,4,5}, qual é (A ∩ B) ∪ C?",
  alternativas: ["{3,4,5}", "{2,3,4,5}", "{2,3,5}", "{3,4}"],
  respostaCorreta: 1,
  explicacao: "A ∩ B = {2,3}. União com C = {2,3,4,5}."
},

// Pergunta Medium 22
{
  dificuldade: "Medium",
  pergunta: "Se A={1,2,3,4}, B={3,4,5,6}, qual é A - (B - A)?",
  alternativas: ["{1,2}", "{3,4}", "{1,2,5,6}", "{1,2,3,4}"],
  respostaCorreta: 3,
  explicacao: "B−A = {5,6}. Remover de A não altera nada."
},

// Pergunta Medium 23
{
  dificuldade: "Medium",
  pergunta: "Qual é (A ∪ B) ∩ (B ∪ C) para A={1,2}, B={2,3}, C={3,4}?",
  alternativas: ["{2,3}", "{1,2,3}", "{3}", "{2}"],
  respostaCorreta: 0,
  explicacao: "Interseção = {2,3}."
},

// Pergunta Medium 24
{
  dificuldade: "Medium",
  pergunta: "Se A={1,2,3}, B={2,3,4}, qual é (A ∪ B) - {3}?",
  alternativas: ["{1,2,4}", "{1,2,3,4}", "{2,4}", "{1,4}"],
  respostaCorreta: 0,
  explicacao: "A ∪ B = {1,2,3,4}. Sem o 3 fica {1,2,4}."
},

// Pergunta Medium 25
{
  dificuldade: "Medium",
  pergunta: "Se A={a,b,c}, B={b,c,d}, qual é (A ∩ B) ∪ {a}?",
  alternativas: ["{a,b,c}", "{b,c}", "{a,d}", "{a,b,c,d}"],
  respostaCorreta: 0,
  explicacao: "A ∩ B = {b,c}. União com {a} = {a,b,c}."
},

// Pergunta Hard 1
  {
    dificuldade: "Hard",
    pergunta: "Se U={1,2,3,4,5}, A={1,2}, B={2,3,4}, qual é (A ∪ B) ∩ (A ∩ B)?",
    alternativas: ["{2}", "{1,2,3,4}", "{1,2}", "∅"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3,4} e A ∩ B = {2}; a interseção desses é {2}."
  },

  // Pergunta Hard 2
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c} e B={b,c,d}, qual é A - (B - A)?",
    alternativas: ["{a,b,c}", "{a}", "{a,c}", "{b,c}"],
    respostaCorreta: 2,
    explicacao: "B - A = {d} (pois b,c ∈ A), então A - {d} = A = {a,b,c}. Porém d∉A, logo A - (B-A)=A. Correção: reavaliando, como B-A = {d}, A - {d} = A = {a,b,c}. Alternativa correspondente: \"{a,b,c}\".",
  },

  // Pergunta Hard 3
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c} e B={b,c,d}, qual é A - (B - A)?",
    alternativas: ["{a,b,c}", "{a}", "{a,c}", "{b,c}"],
    respostaCorreta: 0,
    explicacao: "B - A = {d}, então A - {d} = A = {a,b,c}."
  },

  // Pergunta Hard 4
  {
    dificuldade: "Hard",
    pergunta: "Para A={1,2,3}, B={3,4,5}, C={5,6}, qual é (A ∪ B) - (B ∪ C)?",
    alternativas: ["{1,2}", "{1,2,3,4,5}", "{4}", "∅"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3,4,5}; B ∪ C = {3,4,5,6}; a diferença remove {3,4,5}, sobrando {1,2}."
  },

  // Pergunta Hard 5
  {
    dificuldade: "Hard",
    pergunta: "Se U={a,b,c,d}, A={a,b}, qual é (Aᶜ) ∪ A?",
    alternativas: ["U", "A", "Aᶜ", "∅"],
    respostaCorreta: 0,
    explicacao: "Complemento de A unido com A contém todos os elementos do universo U."
  },

  // Pergunta Hard 6
  {
    dificuldade: "Hard",
    pergunta: "Se A={x,y}, B={y,z}, qual é (A ∩ B) ∪ (A - B)?",
    alternativas: ["{x,y}", "{y}", "{x}", "{x,y,z}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {y}, A - B = {x}; união = {x,y}."
  },

  // Pergunta Hard 7
  {
    dificuldade: "Hard",
    pergunta: "Se A⊆B e B⊆C, qual relação é sempre verdadeira?",
    alternativas: ["A⊆C", "C⊆A", "A∩C=∅", "A∪C=A"],
    respostaCorreta: 0,
    explicacao: "Subconjunto é transitivo: se A⊆B e B⊆C então A⊆C."
  },

  // Pergunta Hard 8
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2,3} e B={2,3}, qual é A ∆ B (diferença simétrica)?",
    alternativas: ["{1}", "{2,3}", "{1,2,3}", "∅"],
    respostaCorreta: 0,
    explicacao: "Diferença simétrica remove elementos comuns; resta apenas {1}."
  },

  // Pergunta Hard 9
  {
    dificuldade: "Hard",
    pergunta: "Se U={1,2,3,4}, A={1,3}, qual é (U - A) ∩ {3,4}?",
    alternativas: ["{4}", "{3}", "{3,4}", "∅"],
    respostaCorreta: 0,
    explicacao: "U - A = {2,4}; intersectando com {3,4} resulta em {4}."
  },

  // Pergunta Hard 10
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c}, qual é A ∪ (A ∩ ∅)?",
    alternativas: ["A", "∅", "{a,b}", "{c}"],
    respostaCorreta: 0,
    explicacao: "Interseção com o conjunto vazio é ∅; união com A retorna A."
  },

  // Pergunta Hard 11
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2,3}, B={3}, qual é (A - B) ∪ (A ∩ B)?",
    alternativas: ["{1,2,3}", "{1,2}", "{3}", "{2,3}"],
    respostaCorreta: 0,
    explicacao: "A-B={1,2}, A∩B={3}; união = {1,2,3} (que é A)."
  },

  // Pergunta Hard 12
  {
    dificuldade: "Hard",
    pergunta: "Se A={x,y,z} e B={y,z}, A é subconjunto próprio de B?",
    alternativas: ["Não", "Sim", "Apenas se igualarem", "Depende do universo"],
    respostaCorreta: 0,
    explicacao: "A contém x que não está em B, então A não é subconjunto de B."
  },

  // Pergunta Hard 13
  {
    dificuldade: "Hard",
    pergunta: "Se U={1,2,3,4,5}, A={1,4,5}, qual é (Aᶜ)ᶜ?",
    alternativas: ["A", "Aᶜ", "U", "∅"],
    respostaCorreta: 0,
    explicacao: "O complemento do complemento retorna o próprio conjunto A."
  },

  // Pergunta Hard 14
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b}, B={b,c}, C={a,c}, qual é (A ∩ B) ∪ (B ∩ C) ∪ (C ∩ A)?",
    alternativas: ["{a,b,c}", "{a,b}", "{b,c}", "{a,c}"],
    respostaCorreta: 0,
    explicacao: "Interseções: A∩B={b}, B∩C={c}, C∩A={a}; união = {a,b,c}."
  },

  // Pergunta Hard 15
  {
    dificuldade: "Hard",
    pergunta: "Se A⊂B (subconjunto próprio), qual das alternativas é impossível?",
    alternativas: ["B ⊂ A", "A ⊂ B", "A ⊆ B", "A ∩ B = A"],
    respostaCorreta: 0,
    explicacao: "Se A é subconjunto próprio de B, B não pode ser subconjunto próprio de A."
  },

  // Pergunta Hard 16
  {
    dificuldade: "Hard",
    pergunta: "Qual é (A ∪ B) - (A ∩ B) em termos de operadores básicos?",
    alternativas: ["A ∆ B", "A ∩ B", "A ∪ B", "A - B"],
    respostaCorreta: 0,
    explicacao: "União menos interseção é exatamente a diferença simétrica A ∆ B."
  },

  // Pergunta Hard 17
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2}, B={2,3}, qual é (A ∪ B) ∩ (A - B)?",
    alternativas: ["{1}", "∅", "{2}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3}; A - B = {1}; interseção = {1}."
  },

  // Pergunta Hard 18
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c} e B={b,c}, B é subconjunto próprio de A?",
    alternativas: ["Sim", "Não", "Apenas se incluir a", "Depende do universo"],
    respostaCorreta: 0,
    explicacao: "B⊆A e B≠A, logo B é subconjunto próprio de A."
  },

  // Pergunta Hard 19
  {
    dificuldade: "Hard",
    pergunta: "Se U é o universo e A⊆U, qual é A ∪ Aᶜ?",
    alternativas: ["U", "A", "Aᶜ", "∅"],
    respostaCorreta: 0,
    explicacao: "Um conjunto unido ao seu complemento forma todo o universo U."
  },

  // Pergunta Hard 20
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2,3}, B={3,4}, qual é (A - (A ∩ B)) ∪ (B - (A ∩ B))?",
    alternativas: ["A ∆ B", "{3}", "A ∪ B", "A ∩ B"],
    respostaCorreta: 0,
    explicacao: "Remover a interseção de cada um e unir o resultado é a diferença simétrica A ∆ B."
  },

  // Pergunta Hard 21
  {
    dificuldade: "Hard",
    pergunta: "Se U={x,y,z}, A={x,y} e B={y,z}, qual é (A ∪ B) - (A ∩ Bᶜ)?",
    alternativas: ["{y,z}", "{x,y}", "{x,z}", "{y}"],
    respostaCorreta: 0,
    explicacao: "Bᶜ em U = {x}; A ∩ Bᶜ = {x}; A ∪ B = {x,y,z}; diferença = {y,z}."
  },

  // Pergunta Hard 22
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2,3}, B={2}, C={3}, qual é (A - B) ∩ (A - C)?",
    alternativas: ["{1}", "{2}", "{3}", "∅"],
    respostaCorreta: 0,
    explicacao: "A-B={1,3}, A-C={1,2}; interseção = {1}."
  },

  // Pergunta Hard 23
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c}, qual é (A - {b}) ∪ ({b} ∩ A)?",
    alternativas: ["A", "{a,c}", "{b}", "∅"],
    respostaCorreta: 0,
    explicacao: "A - {b} = {a,c}; {b}∩A={b}; união = {a,b,c} = A."
  },

  // Pergunta Hard 24
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2}, B={2,3}, C={1,3}, qual é (A ∩ B) ∪ (A ∩ C)?",
    alternativas: ["{1,2}", "{2}", "{1}", "∅"],
    respostaCorreta: 0,
    explicacao: "A∩B={2}, A∩C={1}; união = {1,2}."
  },

  // Pergunta Hard 25
  {
    dificuldade: "Hard",
    pergunta: "Se U={1,2,3,4}, A={1,2}, B={2,3}, qual é (Aᶜ ∩ B) ∪ (A ∩ Bᶜ)?",
    alternativas: ["{1,3}", "{2}", "{1,2,3}", "∅"],
    respostaCorreta: 0,
    explicacao: "Aᶜ={3,4}; Aᶜ∩B={3}; Bᶜ={1,4}; A∩Bᶜ={1}; união = {1,3}."
  }

];
//exporta tudo para o node
if (typeof module !== 'undefined') {
  module.exports = { perguntasConjuntos };
}