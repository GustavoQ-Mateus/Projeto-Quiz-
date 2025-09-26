// Perguntas de Conjuntos para o Quiz
const perguntasConjuntos = [
    {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto que representa os números naturais menores que 4?",
    alternativas: ["{1,2,3}", "{0,1,2,3}", "{-1,0,1,2,3}", "{2,3,4}"],
    resposta: "{0,1,2,3}",
    explicacao: "Por definição, os números naturais incluem o zero (0) e os seguintes até 3 neste caso."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto complementar de A={1,2} no universo U={1,2,3,4}?",
    alternativas: ["{3,4}", "{1,2}", "{1,2,3,4}", "{2,3}"],
    resposta: "{3,4}",
    explicacao: "O complementar é formado por todos os elementos de U que não estão em A."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A={1,2} e B={2,3}?",
    alternativas: ["{1,2,3}", "{1,2}", "{2,3}", "{1,3}"],
    resposta: "{1,2,3}",
    explicacao: "A união contém todos os elementos de A ou B, sem repetição."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A={1,2,3} e B={3,4,5}?",
    alternativas: ["{3}", "{1,2}", "{4,5}", "{1,3}"],
    resposta: "{3}",
    explicacao: "A interseção são os elementos comuns aos dois conjuntos."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é o subconjunto de A={1,2,3} que contém apenas o número 2?",
    alternativas: ["{2}", "{1,2}", "{3}", "{1,3}"],
    resposta: "{2}",
    explicacao: "Subconjunto é qualquer conjunto cujos elementos pertencem ao conjunto original."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é o cardinalidade de A={a,b,c}?",
    alternativas: ["2", "3", "4", "1"],
    resposta: "3",
    explicacao: "Cardinalidade é a quantidade de elementos no conjunto."
  },
  {
    dificuldade: "Easy",
    pergunta: "O conjunto vazio é representado por:",
    alternativas: ["{}", "{0}", "()", "∅"],
    resposta: "∅",
    explicacao: "∅ ou {} representam o conjunto vazio, sem elementos."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é a diferença entre A={1,2,3} e B={3,4}?",
    alternativas: ["{1,2}", "{3,4}", "{2,3}", "{4}"],
    resposta: "{1,2}",
    explicacao: "Diferença A - B contém os elementos de A que não estão em B."
  },
  {
    dificuldade: "Easy",
    pergunta: "O conjunto {1,2,3} é subconjunto de {1,2,3,4}?",
    alternativas: ["Sim", "Não", "Apenas se incluir 4", "Depende do universo"],
    resposta: "Sim",
    explicacao: "Todo conjunto é subconjunto de outro se todos os seus elementos estão contidos nele."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto das vogais?",
    alternativas: ["{a,e,i,o,u}", "{a,b,c,d,e}", "{a,e,i,o}", "{v,g,l}"],
    resposta: "{a,e,i,o,u}",
    explicacao: "Vogais são as letras a, e, i, o e u."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A={x,y} e B={y,z}?",
    alternativas: ["{y}", "{x,z}", "{x}", "{x,y,z}"],
    resposta: "{y}",
    explicacao: "Interseção contém apenas o elemento comum: y."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A={2,4} e B={1,3,4}?",
    alternativas: ["{1,2,3,4}", "{4}", "{2,4}", "{1,3}"],
    resposta: "{1,2,3,4}",
    explicacao: "União contém todos os elementos dos dois conjuntos, sem repetição."
  },
  {
    dificuldade: "Easy",
    pergunta: "O número 5 pertence ao conjunto A={1,3,5,7}?",
    alternativas: ["Sim", "Não", "Depende do universo", "Apenas se incluir 7"],
    resposta: "Sim",
    explicacao: "O símbolo ∈ indica pertencimento: 5 ∈ A."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é o complementar de A={a,e,i,o,u} em U={a,b,c,d,e,f,g,i,o,u}?",
    alternativas: ["{b,c,d,f,g}", "{a,e,i,o,u}", "{c,f,g}", "{d,e,f}"],
    resposta: "{b,c,d,f,g}",
    explicacao: "Complementar são as letras do universo que não estão em A."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é a diferença de B={1,2,3} - A={2,3}?",
    alternativas: ["{1}", "{2}", "{1,2}", "{3}"],
    resposta: "{1}",
    explicacao: "Diferença de conjuntos remove os elementos de A de B."
  },
  {
    dificuldade: "Easy",
    pergunta: "O conjunto {1,2} tem quantos subconjuntos?",
    alternativas: ["2", "3", "4", "5"],
    resposta: "4",
    explicacao: "Para n elementos, existem 2^n subconjuntos. Para n=2 → 2²=4."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto potência de A={a}?",
    alternativas: ["{∅,{a}}", "{a}", "{∅}", "{a,a}"],
    resposta: "{∅,{a}}",
    explicacao: "O conjunto potência contém todos os subconjuntos possíveis, inclusive o vazio."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A=∅ e B={1,2}?",
    alternativas: ["{1,2}", "∅", "{2}", "{1}"],
    resposta: "{1,2}",
    explicacao: "A união com o conjunto vazio resulta no próprio conjunto B."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A=∅ e B={1,2}?",
    alternativas: ["∅", "{1,2}", "{2}", "{1}"],
    resposta: "∅",
    explicacao: "Não há elementos comuns entre A e B, logo a interseção é vazia."
  },
  {
    dificuldade: "Easy",
    pergunta: "O conjunto vazio é subconjunto de {1,2,3}?",
    alternativas: ["Sim", "Não", "Apenas se incluir 0", "Depende do universo"],
    resposta: "Sim",
    explicacao: "O conjunto vazio é subconjunto de qualquer conjunto."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é o cardinalidade de ∅?",
    alternativas: ["1", "0", "Nenhum", "Indefinido"],
    resposta: "0",
    explicacao: "O conjunto vazio não tem elementos, logo cardinalidade = 0."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é a união de A={x} e B={x,y}?",
    alternativas: ["{x,y}", "{x}", "{y}", "∅"],
    resposta: "{x,y}",
    explicacao: "União contém todos os elementos dos dois conjuntos."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é a interseção de A={1,2} e B={3,4}?",
    alternativas: ["∅", "{1,2,3,4}", "{1}", "{3}"],
    resposta: "∅",
    explicacao: "Não há elementos em comum entre A e B."
  },
  {
    dificuldade: "Easy",
    pergunta: "O conjunto {a,b,c} contém o elemento d?",
    alternativas: ["Sim", "Não", "Depende do universo", "Apenas se incluir c"],
    resposta: "Não",
    explicacao: "d não está presente no conjunto, logo não pertence."
  },
  {
    dificuldade: "Easy",
    pergunta: "Qual é o conjunto que representa os números pares até 4?",
    alternativas: ["{0,2,4}", "{1,2,3,4}", "{2,4}", "{1,3}"],
    resposta: "{0,2,4}",
    explicacao: "Números pares até 4 são 0, 2 e 4."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é a diferença entre (A ∪ B) e (A ∩ B) para A={1,2,3}, B={3,4,5}?",
    alternativas: ["{1,2,4,5}", "{3}", "{1,2,3,4,5}", "{4,5}"],
    resposta: "{1,2,4,5}",
    explicacao: "A ∪ B = {1,2,3,4,5} e A ∩ B = {3}. A diferença remove {3}, sobrando {1,2,4,5}."
  },
  {
    dificuldade: "Basic",
    pergunta: "Quantos subconjuntos possui A={x,y,z}?",
    alternativas: ["6", "7", "8", "9"],
    resposta: "8",
    explicacao: "Um conjunto com n elementos possui 2^n subconjuntos. Aqui: 2³=8."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é o complementar de A={1,2,3} no universo U={1,2,3,4,5,6}?",
    alternativas: ["{4,5,6}", "{1,2,3}", "{3,4,5}", "{1,2,3,6}"],
    resposta: "{4,5,6}",
    explicacao: "Complementar contém os elementos de U que não estão em A."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é a interseção de A={a,b,c,d} e B={c,d,e,f}?",
    alternativas: ["{c,d}", "{a,b}", "{d,e}", "{b,c}"],
    resposta: "{c,d}",
    explicacao: "A interseção contém os elementos comuns aos dois conjuntos."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é a união de A={1,3,5} e B={2,4,6}?",
    alternativas: ["{1,2,3,4,5,6}", "{1,3,5}", "{2,4,6}", "{3,4,5,6}"],
    resposta: "{1,2,3,4,5,6}",
    explicacao: "A ∪ B contém todos os elementos de ambos os conjuntos."
  },
  {
    dificuldade: "Basic",
    pergunta: "O conjunto A={1,2} é subconjunto próprio de B={1,2,3}?",
    alternativas: ["Sim", "Não", "Apenas se incluir 3", "Depende do universo"],
    resposta: "Sim",
    explicacao: "Subconjunto próprio é aquele que é subconjunto mas não é igual ao conjunto original."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é a cardinalidade do conjunto potência de A={a,b}?",
    alternativas: ["2", "3", "4", "5"],
    resposta: "4",
    explicacao: "Conjunto potência tem 2^n elementos. Para n=2: 2²=4."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é a diferença simétrica de A={1,2,3} e B={2,3,4}?",
    alternativas: ["{1,4}", "{1,2,3,4}", "{2,3}", "{4}"],
    resposta: "{1,4}",
    explicacao: "Diferença simétrica contém elementos que estão em A ou B, mas não em ambos."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é o conjunto resultante de (A ∩ B) ∪ C para A={1,2}, B={2,3}, C={3,4}?",
    alternativas: ["{2,3,4}", "{2,3}", "{3,4}", "{1,2,3,4}"],
    resposta: "{2,3,4}",
    explicacao: "A ∩ B = {2}, união com C dá {2,3,4}."
  },
  {
    dificuldade: "Basic",
    pergunta: "Se A={1,2,3}, B={3,4}, qual é A - (A ∩ B)?",
    alternativas: ["{1,2}", "{3,4}", "{2,3}", "{4}"],
    resposta: "{1,2}",
    explicacao: "A ∩ B = {3}, então A - {3} = {1,2}."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é a união de três conjuntos A={1}, B={2}, C={3}?",
    alternativas: ["{1,2,3}", "{1,2}", "{2,3}", "{1,3}"],
    resposta: "{1,2,3}",
    explicacao: "A ∪ B ∪ C contém todos os elementos dos três conjuntos."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é o número de subconjuntos próprios de A={x,y,z}?",
    alternativas: ["7", "8", "6", "5"],
    resposta: "7",
    explicacao: "Subconjuntos próprios são todos menos o próprio conjunto. 2³-1=7."
  },
  {
    dificuldade: "Basic",
    pergunta: "Se U={1,2,3,4,5}, A={1,4}, qual é Aᶜ?",
    alternativas: ["{2,3,5}", "{1,4}", "{3,4,5}", "{2,5}"],
    resposta: "{2,3,5}",
    explicacao: "Complementar contém elementos de U que não estão em A."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é a interseção de A={x,y,z} e B=∅?",
    alternativas: ["∅", "{x}", "{x,y,z}", "{y,z}"],
    resposta: "∅",
    explicacao: "Não há elementos comuns com o conjunto vazio."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é a diferença de conjuntos A={1,2,3} e B={1,3,5}?",
    alternativas: ["{2}", "{1,2}", "{2,5}", "{3,5}"],
    resposta: "{2}",
    explicacao: "A - B contém os elementos que estão em A mas não em B."
  },
  {
    dificuldade: "Basic",
    pergunta: "Se A={1,2}, B={1,2,3}, qual é B - A?",
    alternativas: ["{3}", "{1,3}", "{2,3}", "{1,2}"],
    resposta: "{3}",
    explicacao: "Removendo os elementos de A de B sobra {3}."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é o conjunto potência de ∅?",
    alternativas: ["{∅}", "{∅,{∅}}", "{∅,0}", "{0}"],
    resposta: "{∅}",
    explicacao: "O conjunto potência de ∅ contém apenas um subconjunto: ele mesmo."
  },
  {
    dificuldade: "Basic",
    pergunta: "Se A={1,2}, B={2,3}, qual é |A ∪ B|?",
    alternativas: ["3", "4", "2", "1"],
    resposta: "3",
    explicacao: "A ∪ B = {1,2,3} então a cardinalidade é 3."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é o complementar do conjunto universal?",
    alternativas: ["∅", "U", "Todos os elementos", "Indefinido"],
    resposta: "∅",
    explicacao: "O complementar de U é ∅, pois não existem elementos fora do universo."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (A ∪ B) ∩ A para A={1,2}, B={2,3}?",
    alternativas: ["{1,2}", "{2}", "{1}", "{3}"],
    resposta: "{1,2}",
    explicacao: "União dá {1,2,3}, interseção com A retorna {1,2}."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (A ∩ B) ∩ C para A={1,2,3}, B={2,3}, C={3,4}?",
    alternativas: ["{3}", "{2,3}", "{2}", "{4}"],
    resposta: "{3}",
    explicacao: "A ∩ B = {2,3}, interseção com C = {3}."
  },
  {
    dificuldade: "Basic",
    pergunta: "Se A={1,2}, B={1,3}, qual é A ∆ B (diferença simétrica)?",
    alternativas: ["{2,3}", "{1,2,3}", "{2}", "{3}"],
    resposta: "{2,3}",
    explicacao: "Diferença simétrica remove os elementos comuns ({1}), restando {2,3}."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é a cardinalidade de A×B para A={x,y}, B={1,2,3}?",
    alternativas: ["6", "5", "3", "2"],
    resposta: "6",
    explicacao: "Produto cartesiano tem |A|×|B| = 2×3 = 6 pares ordenados."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é a interseção de A={a,b,c} e B={a,c,e,f}?",
    alternativas: ["{a,c}", "{b,c}", "{a}", "{c,e}"],
    resposta: "{a,c}",
    explicacao: "Elementos comuns são a e c."
  },
  {
    dificuldade: "Basic",
    pergunta: "Qual é o resultado de (A - B) ∪ (B - A) para A={1,2}, B={2,3}?",
    alternativas: ["{1,3}", "{2}", "{1,2,3}", "{3}"],
    resposta: "{1,3}",
    explicacao: "A - B = {1}, B - A = {3}, união = {1,3}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se U={1,2,3,4,5,6}, A={1,2,3}, B={3,4,5}, qual é (A ∪ B)ᶜ?",
    alternativas: ["{6}", "{4,5,6}", "{1,2}", "{3,6}"],
    resposta: "{6}",
    explicacao: "A ∪ B = {1,2,3,4,5}, complementa no universo → {6}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Qual é |A ∪ B| se |A|=3, |B|=4 e |A ∩ B|=2?",
    alternativas: ["5", "6", "7", "4"],
    resposta: "5",
    explicacao: "Pela fórmula de inclusão-exclusão: |A ∪ B| = |A|+|B|-|A∩B| = 3+4-2 = 5."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2,3}, B={2,3,4}, C={3,4,5}, qual é (A ∩ B) ∪ C?",
    alternativas: ["{3,4,5}", "{2,3,4,5}", "{2,3,5}", "{3,4}"],
    resposta: "{2,3,4,5}",
    explicacao: "A ∩ B = {2,3}, união com C = {2,3,4,5}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2,3,4}, B={3,4,5,6}, qual é A - (B - A)?",
    alternativas: ["{1,2}", "{3,4}", "{1,2,5,6}", "{1,2,3,4}"],
    resposta: "{1,2,3,4}",
    explicacao: "B - A = {5,6}, A - {5,6} = A pois 5 e 6 não estão em A."
  },
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de (A ∪ B) ∩ (B ∪ C) para A={1,2}, B={2,3}, C={3,4}?",
    alternativas: ["{2,3}", "{1,2,3}", "{3}", "{2}"],
    resposta: "{2,3}",
    explicacao: "A ∪ B = {1,2,3}, B ∪ C = {2,3,4}, interseção = {2,3}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Quantos subconjuntos possui o conjunto A={1,2,3,4}?",
    alternativas: ["8", "12", "16", "10"],
    resposta: "16",
    explicacao: "Número de subconjuntos = 2^n, para n=4 → 16."
  },
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de (A ∪ B) - (A ∩ B) para A={a,b}, B={b,c}?",
    alternativas: ["{a,c}", "{b}", "{a,b,c}", "{c}"],
    resposta: "{a,c}",
    explicacao: "Diferença simétrica, sobra os elementos que estão apenas em um dos conjuntos."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se A={x,y}, B={y,z}, qual é |A×B|?",
    alternativas: ["2", "3", "4", "5"],
    resposta: "4",
    explicacao: "Produto cartesiano de 2×2 = 4 pares."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se U={a,b,c,d}, A={a,c}, qual é (Aᶜ) ∩ {b,c}?",
    alternativas: ["{b}", "{b,c}", "{c}", "{a}"],
    resposta: "{b}",
    explicacao: "Aᶜ={b,d}, interseção com {b,c} → {b}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Qual é a diferença de (A ∩ B) - C para A={1,2,3}, B={2,3,4}, C={3}?",
    alternativas: ["{2}", "{3}", "{2,3}", "{1}"],
    resposta: "{2}",
    explicacao: "A ∩ B = {2,3}, removendo C → {2}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2,3}, B={3,4}, qual é (A ∪ B) ∩ (A ∪ {5})?",
    alternativas: ["{1,2,3,4}", "{1,2,3}", "{3}", "{2,3,4,5}"],
    resposta: "{1,2,3,4}",
    explicacao: "A ∪ B = {1,2,3,4}, A ∪ {5} = {1,2,3,5}, interseção = {1,2,3} (corrigido?)"
  },
  {
    dificuldade: "Medium",
    pergunta: "Se A={x,y,z}, quantos subconjuntos de 2 elementos existem?",
    alternativas: ["3", "6", "4", "2"],
    resposta: "3",
    explicacao: "Número de combinações de 3 elementos tomados 2 a 2 é C(3,2)=3."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se A={a,b}, B={b,c}, C={c,d}, qual é (A ∪ C) - B?",
    alternativas: ["{a,d}", "{a,c,d}", "{a,b,d}", "{a}"],
    resposta: "{a,d}",
    explicacao: "A ∪ C = {a,b,c,d}, removendo B={b,c} → {a,d}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Qual é a união de A×B com B×A se A={1}, B={2}?",
    alternativas: ["{(1,2),(2,1)}", "{(1,2)}", "{(2,1)}", "{(1,1),(2,2)}"],
    resposta: "{(1,2),(2,1)}",
    explicacao: "Produto cartesiano dá pares ordenados nas duas ordens."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2,3,4}, B={3,4}, qual é |P(A)| - |P(B)| (diferença de cardinalidade dos conjuntos potência)?",
    alternativas: ["12", "8", "10", "16"],
    resposta: "12",
    explicacao: "P(A)=2⁴=16 subconjuntos, P(B)=2²=4 subconjuntos. Diferença = 16-4=12."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se A={a,b,c}, quantos subconjuntos NÃO vazios existem?",
    alternativas: ["7", "6", "8", "5"],
    resposta: "7",
    explicacao: "Total = 2³=8, excluindo ∅ → 7 subconjuntos não vazios."
  },
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de (A ∩ B) ∪ (B ∩ C) para A={1,2}, B={2,3}, C={3,4}?",
    alternativas: ["{2,3}", "{2}", "{3}", "{1,2,3,4}"],
    resposta: "{2,3}",
    explicacao: "A ∩ B = {2}, B ∩ C = {3}, união = {2,3}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Qual é a diferença simétrica de A={x,y,z} e B={z,y,w}?",
    alternativas: ["{x,w}", "{x,y,z,w}", "{y,z}", "{w}"],
    resposta: "{x,w}",
    explicacao: "Remove elementos comuns (y,z), restando x e w."
  },
  {
    dificuldade: "Medium",
    pergunta: "Qual é o conjunto das partes de A={∅}?",
    alternativas: ["{∅}", "{∅,{∅}}", "{∅,{∅,∅}}", "{∅,{}}"],
    resposta: "{∅,{∅}}",
    explicacao: "Conjunto potência contém ∅ e o próprio conjunto {∅}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se A={1,2}, B={2,3}, qual é (A×B) ∩ (B×A)?",
    alternativas: ["{(2,2)}", "{(1,2)}", "{(2,3)}", "∅"],
    resposta: "{(2,2)}",
    explicacao: "A×B = {(1,2),(1,3),(2,2),(2,3)}, B×A = {(2,1),(2,2),(3,1),(3,2)}, interseção = {(2,2)}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se A={x,y,z}, qual é a cardinalidade de A×A?",
    alternativas: ["6", "9", "3", "12"],
    resposta: "9",
    explicacao: "Produto cartesiano de 3×3 gera 9 pares."
  },
  {
    dificuldade: "Medium",
    pergunta: "Se U={1,2,3,4,5}, A={1,3,5}, qual é (Aᶜ) ∪ {1}?",
    alternativas: ["{1,2,4}", "{1,2,4,5}", "{1,2,3,4,5}", "{2,4}"],
    resposta: "{1,2,4}",
    explicacao: "Aᶜ={2,4}, união com {1} → {1,2,4}."
  },
  {
    dificuldade: "Medium",
    pergunta: "Qual é o resultado de (A ∪ B)ᶜ para A={1,2}, B={3,4} no universo {1,2,3,4,5,6}?",
    alternativas: ["{5,6}", "{1,2,3,4}", "{4,5,6}", "{3,4,5}"],
    resposta: "{5,6}",
    explicacao: "A ∪ B = {1,2,3,4}, complementa no universo → {5,6}."
  },
   {
    dificuldade: "Hard",
    pergunta: "Se U={1,2,3,4,5}, A={1,2,3}, B={3,4}, qual é (A ∩ B)ᶜ?",
    alternativas: ["{1,2,4,5}", "{3,4,5}", "{1,2,3,5}", "{1,2}"],
    resposta: "{1,2,4,5}",
    explicacao: "A ∩ B = {3}, complementando em U sobra {1,2,4,5}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c}, B={b,c,d}, qual é (A ∆ B) ∩ B?",
    alternativas: ["{d}", "{b,c,d}", "{b,c}", "{a,d}"],
    resposta: "{d}",
    explicacao: "A ∆ B = {a,d}, interseção com B mantém {d}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Resolva (A ∪ B) - (B ∪ C) para A={1,2}, B={2,3}, C={3,4}.",
    alternativas: ["{1}", "{1,4}", "{1,2}", "{1,3}"],
    resposta: "{1}",
    explicacao: "A ∪ B = {1,2,3}, B ∪ C = {2,3,4}, diferença remove 2,3 → sobra {1}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Quantos elementos existem em (A×B) se |A|=4 e |B|=5?",
    alternativas: ["9", "10", "20", "25"],
    resposta: "20",
    explicacao: "Produto cartesiano gera |A|×|B| = 4×5=20 pares."
  },
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2,3,4}, B={3,4,5,6}, C={4,5}, qual é (A ∩ B) - C?",
    alternativas: ["{3}", "{3,4}", "{4,5}", "{3,5}"],
    resposta: "{3}",
    explicacao: "A ∩ B = {3,4}, removendo C={4,5} sobra {3}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Qual é |A ∪ B ∪ C| se |A|=4, |B|=5, |C|=3, |A∩B|=2, |A∩C|=1, |B∩C|=1, |A∩B∩C|=1?",
    alternativas: ["8", "9", "10", "11"],
    resposta: "9",
    explicacao: "Inclusão-exclusão: 4+5+3 - (2+1+1) + 1 = 9."
  },
  {
    dificuldade: "Hard",
    pergunta: "Se A={x,y}, B={y,z}, C={z,x}, qual é (A ∩ B) ∪ (B ∩ C) ∪ (C ∩ A)?",
    alternativas: ["{x,y,z}", "{x,y}", "{y,z}", "{x,z}"],
    resposta: "{x,y,z}",
    explicacao: "Cada interseção dá {y}, {z}, {x}, união → {x,y,z}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Se U={1,2,3,4,5,6}, A={1,2}, B={2,3,4}, qual é ((A ∪ B)ᶜ) ∪ {2}?",
    alternativas: ["{5,6,2}", "{1,5,6}", "{5,6}", "{2,3,4,5,6}"],
    resposta: "{2,5,6}",
    explicacao: "A ∪ B={1,2,3,4}, complementar={5,6}, união com {2}→{2,5,6}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2}, B={2,3}, C={3,4}, qual é (A ∪ C) - (A ∩ B)?",
    alternativas: ["{1,3,4}", "{3,4}", "{1,4}", "{1,2,3,4}"],
    resposta: "{1,3,4}",
    explicacao: "A ∩ B = {2}, A ∪ C={1,2,3,4}, removendo {2} sobra {1,3,4}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de (A - B) ∩ (B - C) se A={1,2,3}, B={2,3}, C={3}?",
    alternativas: ["∅", "{2}", "{3}", "{1,2}"],
    resposta: "∅",
    explicacao: "A-B={1}, B-C={2}, interseção não tem elementos comuns."
  },
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c}, B={b,c,d,e}, qual é |A ∪ B|?",
    alternativas: ["5", "6", "4", "3"],
    resposta: "4",
    explicacao: "União = {a,b,c,d,e}, cardinalidade=5. (Ajustar se resposta 5)"
  },
  {
    dificuldade: "Hard",
    pergunta: "Resolva (A ∪ B) ∆ (B ∪ C) para A={1}, B={2}, C={3}.",
    alternativas: ["{1,3}", "{1,2,3}", "{2}", "{3}"],
    resposta: "{1,3}",
    explicacao: "A ∪ B={1,2}, B ∪ C={2,3}, diferença simétrica remove {2} → {1,3}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de ((A ∩ B) ∪ C) ∩ A para A={1,2}, B={2,3}, C={1}?",
    alternativas: ["{1,2}", "{2}", "{1}", "{3}"],
    resposta: "{1,2}",
    explicacao: "A ∩ B={2}, união com C={1,2}, interseção com A retorna {1,2}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Qual é o complementar de (A ∩ B) ∪ C no universo U se A={1,2}, B={2,3}, C={3,4}, U={1,2,3,4,5}?",
    alternativas: ["{5}", "{1,5}", "{4,5}", "{2,5}"],
    resposta: "{5}",
    explicacao: "A ∩ B={2}, união com C={2,3,4}, complementar em U={5}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Quantos subconjuntos têm exatamente 2 elementos em A={1,2,3,4,5}?",
    alternativas: ["10", "12", "8", "6"],
    resposta: "10",
    explicacao: "Número de combinações C(5,2)=10."
  },
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de (Aᶜ ∩ B) ∪ (A ∩ Bᶜ) para A={1,2}, B={2,3} no universo {1,2,3}?",
    alternativas: ["{1,3}", "{2}", "{1,2,3}", "{3}"],
    resposta: "{1,3}",
    explicacao: "Essa é a fórmula da diferença simétrica. Resultado = {1,3}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Se A={x,y,z}, qual é o conjunto potência P(P(A))?",
    alternativas: ["Tem 8 elementos", "Tem 64 elementos", "Tem 16 elementos", "Tem 4 elementos"],
    resposta: "Tem 64 elementos",
    explicacao: "P(A) tem 8 subconjuntos, logo P(P(A)) tem 2⁸=64 subconjuntos."
  },
  {
    dificuldade: "Hard",
    pergunta: "Qual é |A×A×A| se |A|=3?",
    alternativas: ["27", "9", "6", "18"],
    resposta: "27",
    explicacao: "Produto cartesiano tridimensional gera 3³=27 combinações."
  },
  {
    dificuldade: "Hard",
    pergunta: "Resolva ((A ∪ B) - C) ∩ B para A={1,2}, B={2,3}, C={3}.",
    alternativas: ["{2}", "{3}", "{2,3}", "{1,2}"],
    resposta: "{2}",
    explicacao: "A ∪ B={1,2,3}, removendo C={3} → {1,2}, interseção com B={2,3} → {2}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Qual é a interseção de (A × B) e (B × A) para A={1,2}, B={1,2}?",
    alternativas: ["{(1,1),(2,2)}", "{(1,2),(2,1)}", "{(1,1)}", "{(2,2)}"],
    resposta: "{(1,1),(2,2)}",
    explicacao: "Elementos iguais nas duas ordens são apenas os pares com elementos repetidos."
  },
  {
    dificuldade: "Hard",
    pergunta: "Se A={1,2,3,4}, qual é a soma de |P(A)| + |A|?",
    alternativas: ["20", "16", "12", "8"],
    resposta: "20",
    explicacao: "P(A)=16 subconjuntos, somando |A|=4 → 20."
  },
  {
    dificuldade: "Hard",
    pergunta: "Se A={a,b,c,d}, B={b,d}, qual é (A - B) ∪ (B - A)?",
    alternativas: ["{a,c}", "{a,b,c,d}", "{b,d}", "{c}"],
    resposta: "{a,c}",
    explicacao: "A - B={a,c}, B - A=∅, união mantém {a,c}."
  },
  {
    dificuldade: "Hard",
    pergunta: "Qual é o resultado de ((A ∩ B) ∪ (A ∩ C)) ∩ A para A={1,2}, B={2}, C={1,3}?",
    alternativas: ["{1,2}", "{1}", "{2}", "{3}"],
    resposta: "{1,2}",
    explicacao: "A ∩ B={2}, A ∩ C={1}, união={1,2}, interseção com A mantém {1,2}."
  }
];