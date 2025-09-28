const perguntasConjuntos = [
  // Pergunta Easy 1
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto que representa os números naturais menores que 4, considerando que os números naturais começam em 0?",
    alternativas: ["{1,2,3}", "{0,1,2,3}", "{-1,0,1,2,3}", "{2,3,4}"],
    respostaCorreta: 1,
    explicacao: "Os números naturais, incluindo o zero, são {0,1,2,3,...}. Menores que 4 são {0,1,2,3}."
  },
  // Pergunta Easy 2
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto complementar de A={1,2} no universo U={1,2,3,4}?",
    alternativas: ["{3,4}", "{1,2}", "{1,2,3,4}", "{2,3}"],
    respostaCorreta: 0,
    explicacao: "O complementar contém todos os elementos de U que não estão em A, ou seja, {3,4}."
  },
  // Pergunta Easy 3
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A={1,2} e B={2,3}?",
    alternativas: ["{1,2,3}", "{1,2}", "{2,3}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "A união contém todos os elementos de A ou B, sem repetição, resultando em {1,2,3}."
  },
  // Pergunta Easy 4
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A={1,2,3} e B={3,4,5}?",
    alternativas: ["{3}", "{1,2}", "{4,5}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "A interseção contém os elementos comuns aos dois conjuntos, neste caso, apenas {3}."
  },
  // Pergunta Easy 5
  {
    dificuldade: "Easy",
    pergunta: "Qual é o subconjunto de A={1,2,3} que contém apenas o número 2?",
    alternativas: ["{2}", "{1,2}", "{3}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "Um subconjunto contém elementos do conjunto original, e {2} é um subconjunto de A."
  },
  // Pergunta Easy 6
  {
    dificuldade: "Easy",
    pergunta: "Qual é a cardinalidade de A={a,b,c}?",
    alternativas: ["2", "3", "4", "1"],
    respostaCorreta: 1,
    explicacao: "A cardinalidade é o número de elementos no conjunto, que é 3."
  },
  // Pergunta Easy 7
  {
    dificuldade: "Easy",
    pergunta: "O conjunto vazio é representado por:",
    alternativas: ["{}", "{0}", "()", "∅"],
    respostaCorreta: 3,
    explicacao: "O conjunto vazio, sem elementos, é representado por ∅ ou {}."
  },
  // Pergunta Easy 8
  {
    dificuldade: "Easy",
    pergunta: "Qual é a diferença entre A={1,2,3} e B={3,4}?",
    alternativas: ["{1,2}", "{3,4}", "{2,3}", "{4}"],
    respostaCorreta: 0,
    explicacao: "A diferença A - B contém os elementos de A que não estão em B, ou seja, {1,2}."
  },
  // Pergunta Easy 9
  {
    dificuldade: "Easy",
    pergunta: "O conjunto {1,2,3} é subconjunto de {1,2,3,4}?",
    alternativas: ["Sim", "Não", "Apenas se incluir 4", "Depende do universo"],
    respostaCorreta: 0,
    explicacao: "Um conjunto é subconjunto de outro se todos os seus elementos estão contidos nele."
  },
  // Pergunta Easy 10
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto das vogais?",
    alternativas: ["{a,e,i,o,u}", "{a,b,c,d,e}", "{a,e,i,o}", "{v,g,l}"],
    respostaCorreta: 0,
    explicacao: "As vogais do alfabeto são a, e, i, o e u."
  },
  // Pergunta Easy 11
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A={x,y} e B={y,z}?",
    alternativas: ["{y}", "{x,z}", "{x}", "{x,y,z}"],
    respostaCorreta: 0,
    explicacao: "A interseção contém apenas o elemento comum aos dois conjuntos: y."
  },
  // Pergunta Easy 12
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A={2,4} e B={1,3,4}?",
    alternativas: ["{1,2,3,4}", "{4}", "{2,4}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "A união contém todos os elementos dos dois conjuntos, sem repetição."
  },
  // Pergunta Easy 13
  {
    dificuldade: "Easy",
    pergunta: "O número 5 pertence ao conjunto A={1,3,5,7}?",
    alternativas: ["Sim", "Não", "Depende do universo", "Apenas se incluir 7"],
    respostaCorreta: 0,
    explicacao: "O número 5 está no conjunto A, pois 5 ∈ {1,3,5,7}."
  },
  // Pergunta Easy 14
  {
    dificuldade: "Easy",
    pergunta: "Qual é o complementar de A={a,e,i,o,u} em U={a,b,c,d,e,f,g,i,o,u}?",
    alternativas: ["{b,c,d,f,g}", "{a,e,i,o,u}", "{c,f,g}", "{d,e,f}"],
    respostaCorreta: 0,
    explicacao: "O complementar contém os elementos de U que não estão em A."
  },
  // Pergunta Easy 15
  {
    dificuldade: "Easy",
    pergunta: "Qual é a diferença de B={1,2,3} - A={2,3}?",
    alternativas: ["{1}", "{2}", "{1,2}", "{3}"],
    respostaCorreta: 0,
    explicacao: "A diferença B - A contém os elementos de B que não estão em A."
  },
  // Pergunta Easy 16
  {
    dificuldade: "Easy",
    pergunta: "O conjunto {1,2} tem quantos subconjuntos?",
    alternativas: ["2", "3", "4", "5"],
    respostaCorreta: 2,
    explicacao: "Um conjunto com n elementos tem 2^n subconjuntos. Para n=2, 2²=4."
  },
  // Pergunta Easy 17
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto potência de A={a}?",
    alternativas: ["{∅,{a}}", "{a}", "{∅}", "{a,a}"],
    respostaCorreta: 0,
    explicacao: "O conjunto potência contém todos os subconjuntos de A, incluindo ∅ e {a}."
  },
  // Pergunta Easy 18
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A=∅ e B={1,2}?",
    alternativas: ["{1,2}", "∅", "{2}", "{1}"],
    respostaCorreta: 0,
    explicacao: "A união com o conjunto vazio resulta no próprio conjunto B."
  },
  // Pergunta Easy 19
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A=∅ e B={1,2}?",
    alternativas: ["∅", "{1,2}", "{2}", "{1}"],
    respostaCorreta: 0,
    explicacao: "Não há elementos comuns entre o conjunto vazio e B."
  },
  // Pergunta Easy 20
  {
    dificuldade: "Easy",
    pergunta: "O conjunto vazio é subconjunto de {1,2,3}?",
    alternativas: ["Sim", "Não", "Apenas se incluir 0", "Depende do universo"],
    respostaCorreta: 0,
    explicacao: "O conjunto vazio é subconjunto de qualquer conjunto."
  },
  // Pergunta Easy 21
  {
    dificuldade: "Easy",
    pergunta: "Qual é a cardinalidade de ∅?",
    alternativas: ["1", "0", "Nenhum", "Indefinido"],
    respostaCorreta: 1,
    explicacao: "O conjunto vazio não tem elementos, logo sua cardinalidade é 0."
  },
  // Pergunta Easy 22
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A={x} e B={x,y}?",
    alternativas: ["{x,y}", "{x}", "{y}", "∅"],
    respostaCorreta: 0,
    explicacao: "A união contém todos os elementos dos dois conjuntos, sem repetição."
  },
  // Pergunta Easy 23
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A={1,2} e B={3,4}?",
    alternativas: ["∅", "{1,2,3,4}", "{1}", "{3}"],
    respostaCorreta: 0,
    explicacao: "Não há elementos comuns entre A e B, logo a interseção é vazia."
  },
  // Pergunta Easy 24
  {
    dificuldade: "Easy",
    pergunta: "O conjunto {a,b,c} contém o elemento d?",
    alternativas: ["Sim", "Não", "Depende do universo", "Apenas se incluir c"],
    respostaCorreta: 1,
    explicacao: "O elemento d não está presente no conjunto {a,b,c}."
  },
  // Pergunta Easy 25
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto que representa os números pares até 4, considerando 0 como par?",
    alternativas: ["{0,2,4}", "{1,2,3,4}", "{2,4}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "Os números pares até 4, incluindo 0, são {0,2,4}."
  },
  // Pergunta Basic 1
  {
    dificuldade: "Basic",
    pergunta: "O conjunto A={1,2} é subconjunto próprio de B={1,2,3}?",
    alternativas: ["Sim", "Não", "Apenas se incluir 3", "Depende do universo"],
    respostaCorreta: 0,
    explicacao: "Um subconjunto próprio é subconjunto mas não igual ao conjunto original, o que é verdade para A em relação a B."
  },
  // Pergunta Basic 2
  {
    dificuldade: "Basic",
    pergunta: "Qual é a cardinalidade do conjunto potência de A={a,b}?",
    alternativas: ["2", "3", "4", "5"],
    respostaCorreta: 2,
    explicacao: "O conjunto potência tem 2^n elementos, onde n é o número de elementos de A. Para n=2, 2²=4."
  },
  // Pergunta Basic 3
  {
    dificuldade: "Basic",
    pergunta: "Qual é a diferença simétrica de A={1,2,3} e B={2,3,4}?",
    alternativas: ["{1,4}", "{1,2,3,4}", "{2,3}", "{4}"],
    respostaCorreta: 0,
    explicacao: "A diferença simétrica contém elementos que estão em A ou B, mas não em ambos, resultando em {1,4}."
  },
  // Pergunta Basic 4
  {
    dificuldade: "Basic",
    pergunta: "Qual é o conjunto resultante de (A ∩ B) ∪ C para A={1,2}, B={2,3}, C={3,4}?",
    alternativas: ["{2,3,4}", "{2,3}", "{3,4}", "{1,2,3,4}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {2}, união com C = {2,3,4}."
  },
  // Pergunta Basic 5
  {
    dificuldade: "Basic",
    pergunta: "Se A={1,2,3}, B={3,4}, qual é A - (A ∩ B)?",
    alternativas: ["{1,2}", "{3,4}", "{2,3}", "{4}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {3}, então A - {3} = {1,2}."
  },
  // Pergunta Basic 6
  {
    dificuldade: "Basic",
    pergunta: "Qual é a união de três conjuntos A={1}, B={2}, C={3}?",
    alternativas: ["{1,2,3}", "{1,2}", "{2,3}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B ∪ C contém todos os elementos dos três conjuntos, resultando em {1,2,3}."
  },
  // Pergunta Basic 7
  {
    dificuldade: "Basic",
    pergunta: "Qual é o número de subconjuntos próprios de A={x,y,z}?",
    alternativas: ["7", "8", "6", "5"],
    respostaCorreta: 0,
    explicacao: "Subconjuntos próprios são todos menos o próprio conjunto. Para n=3, 2³-1=7."
  },
  // Pergunta Basic 8
  {
    dificuldade: "Basic",
    pergunta: "Se U={1,2,3,4,5}, A={1,4}, qual é Aᶜ?",
    alternativas: ["{2,3,5}", "{1,4}", "{3,4,5}", "{2,5}"],
    respostaCorreta: 0,
    explicacao: "O complementar contém os elementos de U que não estão em A, ou seja, {2,3,5}."
  },
  // Pergunta Basic 9
  {
    dificuldade: "Basic",
    pergunta: "Qual é a interseção de A={x,y,z} e B=∅?",
    alternativas: ["∅", "{x}", "{x,y,z}", "{y,z}"],
    respostaCorreta: 0,
    explicacao: "Não há elementos comuns com o conjunto vazio, logo a interseção é ∅."
  },
  // Pergunta Basic 10
  {
    dificuldade: "Basic",
    pergunta: "Qual é a diferença de conjuntos A={1,2,3} e B={1,3,5}?",
    alternativas: ["{2}", "{1,2}", "{2,5}", "{3,5}"],
    respostaCorreta: 0,
    explicacao: "A - B contém os elementos que estão em A mas não em B, resultando em {2}."
  },
  // Pergunta Basic 11
  {
    dificuldade: "Basic",
    pergunta: "Se A={1,2}, B={1,2,3}, qual é B - A?",
    alternativas: ["{3}", "{1,3}", "{2,3}", "{1,2}"],
    respostaCorreta: 0,
    explicacao: "Removendo os elementos de A de B, sobra apenas {3}."
  },
  // Pergunta Basic 12
  {
    dificuldade: "Basic",
    pergunta: "Qual é o conjunto potência de ∅?",
    alternativas: ["{∅}", "{∅,{∅}}", "{∅,0}", "{0}"],
    respostaCorreta: 0,
    explicacao: "O conjunto potência de ∅ contém apenas um subconjunto: ele mesmo, {∅}."
  },
  // Pergunta Basic 13
  {
    dificuldade: "Basic",
    pergunta: "Se A={1,2}, B={2,3}, qual é |A ∪ B|?",
    alternativas: ["3", "4", "2", "1"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3}, logo a cardinalidade é 3."
  },
  // Pergunta Basic 14
  {
    dificuldade: "Basic",
    pergunta: "Qual é o complementar do conjunto universal?",
    alternativas: ["∅", "U", "Todos os elementos", "Indefinido"],
    respostaCorreta: 0,
    explicacao: "O complementar de U é ∅, pois não há elementos fora do universo."
  },
  // Pergunta Basic 15
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (A ∪ B) ∩ A para A={1,2}, B={2,3}?",
    alternativas: ["{1,2}", "{2}", "{1}", "{3}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3}, interseção com A retorna {1,2}."
  },
  // Pergunta Basic 16
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (A ∩ B) ∩ C para A={1,2,3}, B={2,3}, C={3,4}?",
    alternativas: ["{3}", "{2,3}", "{2}", "{4}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {2,3}, interseção com C = {3}."
  },
  // Pergunta Basic 17
  {
    dificuldade: "Basic",
    pergunta: "Se A={1,2}, B={1,3}, qual é A ∆ B (diferença simétrica)?",
    alternativas: ["{2,3}", "{1,2,3}", "{2}", "{3}"],
    respostaCorreta: 0,
    explicacao: "A diferença simétrica remove os elementos comuns ({1}), restando {2,3}."
  },
  // Pergunta Basic 18
  {
    dificuldade: "Basic",
    pergunta: "Qual é a cardinalidade de A×B para A={x,y}, B={1,2,3}?",
    alternativas: ["6", "5", "3", "2"],
    respostaCorreta: 0,
    explicacao: "O produto cartesiano tem |A|×|B| = 2×3 = 6 pares ordenados."
  },
  // Pergunta Basic 19
  {
    dificuldade: "Basic",
    pergunta: "Qual é a interseção de A={a,b,c} e B={a,c,e,f}?",
    alternativas: ["{a,c}", "{b,c}", "{a}", "{c,e}"],
    respostaCorreta: 0,
    explicacao: "Os elementos comuns entre A e B são a e c."
  },
  // Pergunta Basic 20
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (A - B) ∪ (B - A) para A={1,2}, B={2,3}?",
    alternativas: ["{1,3}", "{2}", "{1,2,3}", "{3}"],
    respostaCorreta: 0,
    explicacao: "A - B = {1}, B - A = {3}, a união resulta em {1,3}."
  },
  // Pergunta Basic 21
  {
    dificuldade: "Basic",
    pergunta: "Qual é a diferença entre (A ∪ B) e (A ∩ B) para A={1,2,3}, B={3,4,5}?",
    alternativas: ["{1,2,4,5}", "{3}", "{1,2,3,4,5}", "{4,5}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3,4,5}, A ∩ B = {3}, a diferença remove {3}, sobrando {1,2,4,5}."
  },
  // Pergunta Basic 22
  {
    dificuldade: "Basic",
    pergunta: "Quantos subconjuntos possui A={x,y,z}?",
    alternativas: ["6", "7", "8", "9"],
    respostaCorreta: 2,
    explicacao: "Um conjunto com n elementos possui 2^n subconjuntos. Para n=3, 2³=8."
  },
  // Pergunta Basic 23
  {
    dificuldade: "Basic",
    pergunta: "Qual é o complementar de A={1,2,3} no universo U={1,2,3,4,5,6}?",
    alternativas: ["{4,5,6}", "{1,2,3}", "{3,4,5}", "{1,2,3,6}"],
    respostaCorreta: 0,
    explicacao: "O complementar contém os elementos de U que não estão em A, ou seja, {4,5,6}."
  },
  // Pergunta Basic 24
  {
    dificuldade: "Basic",
    pergunta: "Qual é a interseção de A={a,b,c,d} e B={c,d,e,f}?",
    alternativas: ["{c,d}", "{a,b}", "{d,e}", "{b,c}"],
    respostaCorreta: 0,
    explicacao: "A interseção contém os elementos comuns aos dois conjuntos, que são c e d."
  },
  // Pergunta Basic 25
  {
    dificuldade: "Basic",
    pergunta: "Qual é a união de A={1,3,5} e B={2,4,6}?",
    alternativas: ["{1,2,3,4,5,6}", "{1,3,5}", "{2,4,6}", "{3,4,5,6}"],
    respostaCorreta: 0,
    explicacao: "A união contém todos os elementos de ambos os conjuntos, sem repetição."
  },
  // Pergunta Medium 1
  {
    dificuldade: "Medium",
    pergunta: "Quantos subconjuntos possui o conjunto A={1,2,3,4}?",
    alternativas: ["8", "12", "16", "10"],
    respostaCorreta: 2,
    explicacao: "O número de subconjuntos de um conjunto com n elementos é 2^n. Para n=4, 2^4=16."
  },
  // Pergunta Medium 2
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de (A ∪ B) - (A ∩ B) para A={a,b}, B={b,c}?",
    alternativas: ["{a,c}", "{b}", "{a,b,c}", "{c}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {a,b,c}, A ∩ B = {b}, a diferença resulta em {a,c}, equivalente à diferença simétrica."
  },
  // Pergunta Medium 3
  {
    dificuldade: "Medium",
    pergunta: "Se A={x,y}, B={y,z}, qual é |A×B|?",
    alternativas: ["2", "3", "4", "5"],
    respostaCorreta: 2,
    explicacao: "O produto cartesiano A×B tem |A|×|B| = 2×2 = 4 pares ordenados."
  },
  // Pergunta Medium 4
  {
    dificuldade: "Medium",
    pergunta: "Se U={a,b,c,d}, A={a,c}, qual é (Aᶜ) ∩ {b,c}?",
    alternativas: ["{b}", "{b,c}", "{c}", "{a}"],
    respostaCorreta: 0,
    explicacao: "Aᶜ = {b,d}, a interseção com {b,c} resulta em {b}."
  },
  // Pergunta Medium 5
  {
    dificuldade: "Medium",
    pergunta: "Qual é a diferença de (A ∩ B) - C para A={1,2,3}, B={2,3,4}, C={3}?",
    alternativas: ["{2}", "{3}", "{2,3}", "{1}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {2,3}, removendo C = {3}, sobra {2}."
  },
  // Pergunta Medium 6
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2,3}, B={3,4}, qual é (A ∪ B) ∩ (A ∪ {5})?",
    alternativas: ["{1,2,3}", "{1,2,3,4}", "{3}", "{2,3,4,5}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3,4}, A ∪ {5} = {1,2,3,5}, a interseção resulta em {1,2,3}."
  },
  // Pergunta Medium 7
  {
    dificuldade: "Medium",
    pergunta: "Se A={x,y,z}, quantos subconjuntos de 2 elementos existem?",
    alternativas: ["3", "6", "4", "2"],
    respostaCorreta: 0,
    explicacao: "O número de subconjuntos de 2 elementos é dado por C(3,2) = 3."
  },
  // Pergunta Medium 8
  {
    dificuldade: "Medium",
    pergunta: "Se A={a,b}, B={b,c}, C={c,d}, qual é (A ∪ C) - B?",
    alternativas: ["{a,d}", "{a,c,d}", "{a,b,d}", "{a}"],
    respostaCorreta: 0,
    explicacao: "A ∪ C = {a,b,c,d}, removendo B = {b,c}, sobra {a,d}."
  },
  // Pergunta Medium 9
  {
    dificuldade: "Medium",
    pergunta: "Qual é a união de A×B com B×A se A={1}, B={2}?",
    alternativas: ["{(1,2),(2,1)}", "{(1,2)}", "{(2,1)}", "{(1,1),(2,2)}"],
    respostaCorreta: 0,
    explicacao: "A×B = {(1,2)}, B×A = {(2,1)}, a união resulta em {(1,2),(2,1)}."
  },
  // Pergunta Medium 10
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2,3,4}, B={3,4}, qual é |P(A)| - |P(B)|?",
    alternativas: ["12", "8", "10", "16"],
    respostaCorreta: 0,
    explicacao: "P(A) = 2^4 = 16 subconjuntos, P(B) = 2^2 = 4 subconjuntos, 16-4=12."
  },
  // Pergunta Medium 11
  {
    dificuldade: "Medium",
    pergunta: "Se A={a,b,c}, quantos subconjuntos não vazios existem?",
    alternativas: ["7", "6", "8", "5"],
    respostaCorreta: 0,
    explicacao: "Total de subconjuntos = 2^3 = 8, excluindo o vazio, sobram 7."
  },
  // Pergunta Medium 12
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de (A ∩ B) ∪ (B ∩ C) para A={1,2}, B={2,3}, C={3,4}?",
    alternativas: ["{2,3}", "{2}", "{3}", "{1,2,3,4}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {2}, B ∩ C = {3}, a união resulta em {2,3}."
  },
  // Pergunta Medium 13
  {
    dificuldade: "Medium",
    pergunta: "Qual é a diferença simétrica de A={x,y,z} e B={z,y,w}?",
    alternativas: ["{x,w}", "{x,y,z,w}", "{y,z}", "{w}"],
    respostaCorreta: 0,
    explicacao: "Remove os elementos comuns (y,z), restando {x,w}."
  },
  // Pergunta Medium 14
  {
    dificuldade: "Medium",
    pergunta: "Qual é o conjunto das partes de A={∅}?",
    alternativas: ["{∅}", "{∅,{∅}}", "{∅,{∅,∅}}", "{∅,{}}"],
    respostaCorreta: 1,
    explicacao: "O conjunto potência de {∅} contém ∅ e {∅}, resultando em {∅,{∅}}."
  },
  // Pergunta Medium 15
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2}, B={2,3}, qual é (A×B) ∩ (B×A)?",
    alternativas: ["{(2,2)}", "{(1,2)}", "{(2,3)}", "∅"],
    respostaCorreta: 0,
    explicacao: "A×B = {(1,2),(1,3),(2,2),(2,3)}, B×A = {(2,1),(2,2),(3,1),(3,2)}, interseção = {(2,2)}."
  },
  // Pergunta Medium 16
  {
    dificuldade: "Medium",
    pergunta: "Se A={x,y,z}, qual é a cardinalidade de A×A?",
    alternativas: ["6", "9", "3", "12"],
    respostaCorreta: 1,
    explicacao: "O produto cartesiano A×A tem |A|×|A| = 3×3 = 9 pares."
  },
  // Pergunta Medium 17
  {
    dificuldade: "Medium",
    pergunta: "Se U={1,2,3,4,5}, A={1,3,5}, qual é (Aᶜ) ∪ {1}?",
    alternativas: ["{1,2,4}", "{1,2,4,5}", "{1,2,3,4,5}", "{2,4}"],
    respostaCorreta: 0,
    explicacao: "Aᶜ = {2,4}, união com {1} resulta em {1,2,4}."
  },
  // Pergunta Medium 18
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de (A ∪ B)ᶜ para A={1,2}, B={3,4} no universo {1,2,3,4,5,6}?",
    alternativas: ["{5,6}", "{1,2,3,4}", "{4,5,6}", "{3,4,5}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3,4}, o complementar no universo é {5,6}."
  },
  // Pergunta Medium 19
  {
    dificuldade: "Medium",
    pergunta: "Se U={1,2,3,4,5,6}, A={1,2,3}, B={3,4,5}, qual é (A ∪ B)ᶜ?",
    alternativas: ["{6}", "{4,5,6}", "{1,2}", "{3,6}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3,4,5}, o complementar no universo é {6}."
  },
  // Pergunta Medium 20
  {
    dificuldade: "Medium",
    pergunta: "Qual é |A ∪ B| se |A|=3, |B|=4 e |A ∩ B|=2?",
    alternativas: ["5", "6", "7", "4"],
    respostaCorreta: 0,
    explicacao: "Pela fórmula de inclusão-exclusão: |A ∪ B| = |A| + |B| - |A ∩ B| = 3 + 4 - 2 = 5."
  },
  // Pergunta Medium 21
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2,3}, B={2,3,4}, C={3,4,5}, qual é (A ∩ B) ∪ C?",
    alternativas: ["{3,4,5}", "{2,3,4,5}", "{2,3,5}", "{3,4}"],
    respostaCorreta: 1,
    explicacao: "A ∩ B = {2,3}, união com C = {2,3,4,5}."
  },
  // Pergunta Medium 22
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2,3,4}, B={3,4,5,6}, qual é A - (B - A)?",
    alternativas: ["{1,2}", "{3,4}", "{1,2,5,6}", "{1,2,3,4}"],
    respostaCorreta: 3,
    explicacao: "B - A = {5,6}, A - {5,6} = A, pois 5 e 6 não estão em A, resultando em {1,2,3,4}."
  },
  // Pergunta Medium 23
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de (A ∪ B) ∩ (B ∪ C) para A={1,2}, B={2,3}, C={3,4}?",
    alternativas: ["{2,3}", "{1,2,3}", "{3}", "{2}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3}, B ∪ C = {2,3,4}, a interseção resulta em {2,3}."
  },
  // Pergunta Medium 24
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2,3}, B={2,3,4}, qual é (A ∪ B) - {3}?",
    alternativas: ["{1,2,4}", "{1,2,3,4}", "{2,4}", "{1,4}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3,4}, removendo {3} resulta em {1,2,4}."
  },
  // Pergunta Medium 25
  {
    dificuldade: "Medium",
    pergunta: "Se A={a,b,c}, B={b,c,d}, qual é (A ∩ B) ∪ {a}?",
    alternativas: ["{a,b,c}", "{b,c}", "{a,d}", "{a,b,c,d}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {b,c}, união com {a} resulta em {a,b,c}."
  },
    // Pergunta Hard 1
  {
    dificuldade: "Hard",
    pergunta: "Quantos elementos existem em (A×B) se |A|=4 e |B|=5?",
    alternativas: ["9", "10", "20", "25"],
    respostaCorreta: 2,
    explicacao: "O produto cartesiano gera |A|×|B| = 4×5 = 20 pares ordenados."
  },
  // Pergunta Hard 2
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2,3,4}, B={3,4,5,6}, C={4,5}, qual é (A ∩ B) - C?",
    alternativas: ["{3}", "{3,4}", "{4,5}", "{3,5}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {3,4}, removendo C={4,5} sobra {3}."
  },
  // Pergunta Hard 3
  {
    dificuldade: "Hard",
    pergunta: "Qual é |A ∪ B ∪ C| se |A|=4, |B|=5, |C|=3, |A∩B|=2, |A∩C|=1, |B∩C|=1, |A∩B∩C|=1?",
    alternativas: ["8", "9", "10", "11"],
    respostaCorreta: 1,
    explicacao: "Pela fórmula de inclusão-exclusão: |A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C| = 4+5+3-2-1-1+1 = 9."
  },
  // Pergunta Hard 4
  {
    dificuldade: "Hard",
    pergunta: "Se A={x,y}, B={y,z}, C={z,x}, qual é (A ∩ B) ∪ (B ∩ C) ∪ (C ∩ A)?",
    alternativas: ["{x,y,z}", "{x,y}", "{y,z}", "{x,z}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {y}, B ∩ C = {z}, C ∩ A = {x}, a união resulta em {x,y,z}."
  },
  // Pergunta Hard 5
  {
    dificuldade: "Hard",
    pergunta: "Se U={1,2,3,4,5,6}, A={1,2}, B={2,3,4}, qual é ((A ∪ B)ᶜ) ∪ {2}?",
    alternativas: ["{5,6,2}", "{1,5,6}", "{5,6}", "{2,3,4,5,6}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3,4}, complementar = {5,6}, união com {2} resulta em {2,5,6}."
  },
  // Pergunta Hard 6
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2}, B={2,3}, C={3,4}, qual é (A ∪ C) - (A ∩ B)?",
    alternativas: ["{1,3,4}", "{3,4}", "{1,4}", "{1,2,3,4}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {2}, A ∪ C = {1,2,3,4}, removendo {2} sobra {1,3,4}."
  },
  // Pergunta Hard 7
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de (A - B) ∩ (B - C) se A={1,2,3}, B={2,3}, C={3}?",
    alternativas: ["∅", "{2}", "{3}", "{1,2}"],
    respostaCorreta: 0,
    explicacao: "A - B = {1}, B - C = {2}, a interseção não tem elementos comuns, resultando em ∅."
  },
  // Pergunta Hard 8
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c}, B={b,c,d,e}, qual é |A ∪ B|?",
    alternativas: ["5", "6", "4", "3"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {a,b,c,d,e}, a cardinalidade é 5."
  },
  // Pergunta Hard 9
  {
    dificuldade: "Hard",
    pergunta: "Resolva (A ∪ B) ∆ (B ∪ C) para A={1}, B={2}, C={3}.",
    alternativas: ["{1,3}", "{1,2,3}", "{2}", "{3}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2}, B ∪ C = {2,3}, a diferença simétrica remove {2}, resultando em {1,3}."
  },
  // Pergunta Hard 10
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de ((A ∩ B) ∪ C) ∩ A para A={1,2}, B={2,3}, C={1}?",
    alternativas: ["{1,2}", "{2}", "{1}", "{3}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {2}, união com C = {1,2}, interseção com A mantém {1,2}."
  },
  // Pergunta Hard 11
  {
  dificuldade: "Hard",
  pergunta: "Qual é o complementar de (A ∩ B) ∪ C no universo U se A={1,2}, B={2,3}, C={3,4}, U={1,2,3,4,5}?",
  alternativas: ["{5}", "{1,5}", "{4,5}", "{2,5}"],
  respostaCorreta: 1,
  explicacao: "A ∩ B = {2}, união com C = {2,3,4}, complementar em U = {1,2,3,4,5} - {2,3,4} = {1,5}."
  },
  // Pergunta Hard 12
  {
    dificuldade: "Hard",
    pergunta: "Quantos subconjuntos têm exatamente 2 elementos em A={1,2,3,4,5}?",
    alternativas: ["10", "12", "8", "6"],
    respostaCorreta: 0,
    explicacao: "O número de subconjuntos de 2 elementos é dado por C(5,2) = 10."
  },
  // Pergunta Hard 13
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de (Aᶜ ∩ B) ∪ (A ∩ Bᶜ) para A={1,2}, B={2,3} no universo {1,2,3}?",
    alternativas: ["{1,3}", "{2}", "{1,2,3}", "{3}"],
    respostaCorreta: 0,
    explicacao: "Aᶜ = {3}, Aᶜ ∩ B = {3}, A ∩ Bᶜ = {1}, a união resulta em {1,3}, equivalente à diferença simétrica."
  },
  // Pergunta Hard 14
  {
    dificuldade: "Hard",
    pergunta: "Se A={x,y,z}, qual é a cardinalidade de P(P(A))?",
    alternativas: ["8", "64", "16", "4"],
    respostaCorreta: 1,
    explicacao: "P(A) tem 2^3 = 8 subconjuntos, P(P(A)) tem 2^8 = 64 subconjuntos."
  },
  // Pergunta Hard 15
  {
    dificuldade: "Hard",
    pergunta: "Qual é |A×A×A| se |A|=3?",
    alternativas: ["27", "9", "6", "18"],
    respostaCorreta: 0,
    explicacao: "O produto cartesiano tridimensional gera |A|^3 = 3^3 = 27 combinações."
  },
  // Pergunta Hard 16
  {
    dificuldade: "Hard",
    pergunta: "Resolva ((A ∪ B) - C) ∩ B para A={1,2}, B={2,3}, C={3}.",
    alternativas: ["{2}", "{3}", "{2,3}", "{1,2}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3}, removendo C = {3} resulta em {1,2}, interseção com B = {2,3} dá {2}."
  },
  // Pergunta Hard 17
  {
    dificuldade: "Hard",
    pergunta: "Qual é a interseção de (A × B) e (B × A) para A={1,2}, B={1,2}?",
    alternativas: ["{(1,1),(2,2)}", "{(1,2),(2,1)}", "{(1,1)}", "{(2,2)}"],
    respostaCorreta: 0,
    explicacao: "Os pares comuns em A×B e B×A são aqueles com elementos iguais, {(1,1),(2,2)}."
  },
  // Pergunta Hard 18
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2,3,4}, qual é a soma de |P(A)| + |A|?",
    alternativas: ["20", "16", "12", "8"],
    respostaCorreta: 0,
    explicacao: "P(A) = 2^4 = 16 subconjuntos, |A| = 4, soma = 16 + 4 = 20."
  },
  // Pergunta Hard 19
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c,d}, B={b,d}, qual é (A - B) ∪ (B - A)?",
    alternativas: ["{a,c}", "{a,b,c,d}", "{b,d}", "{c}"],
    respostaCorreta: 0,
    explicacao: "A - B = {a,c}, B - A = ∅, a união resulta em {a,c}."
  },
  // Pergunta Hard 20
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de ((A ∩ B) ∪ (A ∩ C)) ∩ A para A={1,2}, B={2}, C={1,3}?",
    alternativas: ["{1,2}", "{1}", "{2}", "{3}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {2}, A ∩ C = {1}, união = {1,2}, interseção com A mantém {1,2}."
  },
  // Pergunta Hard 21
  {
    dificuldade: "Hard",
    pergunta: "Se U={1,2,3,4,5}, A={1,2,3}, B={3,4}, qual é (A ∩ B)ᶜ?",
    alternativas: ["{1,2,4,5}", "{3,4,5}", "{1,2,3,5}", "{1,2}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {3}, o complementar em U é {1,2,4,5}."
  },
  // Pergunta Hard 22
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c}, B={b,c,d}, qual é (A ∆ B) ∩ B?",
    alternativas: ["{d}", "{b,c,d}", "{b,c}", "{a,d}"],
    respostaCorreta: 0,
    explicacao: "A ∆ B = {a,d}, interseção com B = {b,c,d} resulta em {d}."
  },
  // Pergunta Hard 23
  {
    dificuldade: "Hard",
    pergunta: "Resolva (A ∪ B) - (B ∪ C) para A={1,2}, B={2,3}, C={3,4}.",
    alternativas: ["{1}", "{1,4}", "{1,2}", "{1,3}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3}, B ∪ C = {2,3,4}, a diferença remove {2,3}, sobrando {1}."
  },
  // Pergunta Hard 24
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2,3}, B={2,3,4}, C={1,4}, qual é (A ∩ B) ∆ C?",
    alternativas: ["{1,2,3,4}", "{1,4}", "{2,3}", "{1}"],
    respostaCorreta: 0,
    explicacao: "A ∩ B = {2,3}, diferença simétrica com C = {1,4} resulta em {1,2,3,4}."
  },
  // Pergunta Hard 25
  {
    dificuldade: "Hard",
    pergunta: "Se U={1,2,3,4,5,6}, A={1,2,3}, B={2,3,4}, C={3,4,5}, qual é (A ∪ B) ∩ (B ∪ C)ᶜ?",
    alternativas: ["{1}", "{2}", "{1,2}", "{3}"],
    respostaCorreta: 0,
    explicacao: "A ∪ B = {1,2,3,4}, B ∪ C = {2,3,4,5}, complementar = {1,6}, interseção com A ∪ B = {1}."
  }
];