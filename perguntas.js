
const perguntasGeradas = [
  // Easy
  {
    dificuldade: "Easy",
    pares: [[1, 1], [2, 2], [3, 3]],
    pergunta: "A relação é reflexiva?",
    resposta: true,
    explicacao: "É reflexiva porque contém todos os pares (a,a) para os elementos: (1,1), (2,2) e (3,3)."
  },
  {
    dificuldade: "Easy",
    pares: [[1, 2], [2, 1], [3, 3]],
    pergunta: "A relação é simétrica?",
    resposta: true,
    explicacao: "É simétrica porque para todo par (a,b), existe o par (b,a). Temos (1,2) ↔ (2,1) e (3,3) é simétrico por natureza."
  },
  {
    dificuldade: "Easy",
    pares: [[1, 2], [2, 3], [1, 3]],
    pergunta: "A relação é transitiva?",
    resposta: true,
    explicacao: "É transitiva porque sempre que (a,b) e (b,c) existem, (a,c) também existe. Aqui (1,2)+(2,3) implica (1,3), que está presente."
  },
  {
    dificuldade: "Easy",
    pares: [[1, 2], [2, 3], [3, 4]],
    pergunta: "A relação é reflexiva?",
    resposta: false,
    explicacao: "Não é reflexiva porque faltam os pares (1,1), (2,2), (3,3) e (4,4). Relação reflexiva requer (a,a) para todo elemento."
  },
  {
    dificuldade: "Easy",
    pares: [[1, 2], [2, 1], [2, 3]],
    pergunta: "A relação é simétrica?",
    resposta: false,
    explicacao: "Não é simétrica porque o par (2,3) não tem seu correspondente (3,2). Para ser simétrica, todo par (a,b) deve ter (b,a)."
  },
  {
    dificuldade: "Easy",
    pares: [[3, 3], [2, 2], [1, 1]],
    pergunta: "A relação é reflexiva?",
    resposta: true,
    explicacao: "É reflexiva porque contém todos os pares (a,a) para os elementos {1,2,3}. A ordem dos pares não importa."
  },
  {
    dificuldade: "Easy",
    pares: [[1, 2], [2, 3], [1, 3]],
    pergunta: "A relação é simétrica?",
    resposta: false,
    explicacao: "Não é simétrica porque (1,2) não tem (2,1), e (2,3) não tem (3,2). Apenas (1,3) ↔ (3,1) estaria completo."
  },
  {
    dificuldade: "Easy",
    pares: [[1, 2], [2, 1]],
    pergunta: "A relação é simétrica?",
    resposta: true,
    explicacao: "É simétrica porque temos ambos (1,2) e (2,1). Relações simétricas requerem que todos os pares tenham seus inversos."
  },
  {
    dificuldade: "Easy",
    pares: [[1, 1], [2, 2]],
    pergunta: "A relação é reflexiva?",
    resposta: true,
    explicacao: "É reflexiva para os elementos {1,2}. Se o universo fosse {1,2,3}, faltaria (3,3), mas como só há esses pares, assume-se reflexiva para os elementos presentes."
  },
  {
    dificuldade: "Easy",
    pares: [[1, 2], [2, 3]],
    pergunta: "A relação é transitiva?",
    resposta: false,
    explicacao: "Não é transitiva porque temos (1,2) e (2,3), mas falta (1,3). Transitividade exige que (a,b)+(b,c) implique (a,c)."
  },

  // Basic (10)
  {
    dificuldade: "Basic",
    pares: [[1, 2], [2, 1], [1, 1], [2, 2]],
    pergunta: "A relação é de equivalência?",
    resposta: true,
    explicacao: "É de equivalência porque é: Reflexiva: contém (1,1) e (2,2); Simétrica: (1,2) ↔ (2,1) e Transitiva: não há cadeias que exijam novos pares"
  },
  {
    dificuldade: "Basic",
    pares: [[1, 2], [2, 3], [1, 3], [3, 4]],
    pergunta: "A relação é transitiva?",
    resposta: false,
    explicacao: "Não é transitiva porque temos (2,3) e (3,4), mas falta (2,4). Transitividade exige completar todas as cadeias."
  },
  {
    dificuldade: "Basic",
    pares: [[1, 2], [2, 1], [3, 3]],
    pergunta: "A relação é reflexiva?",
    resposta: false,
    explicacao: "Não é reflexiva porque se o universo inclui {1,2,3}, faltam (1,1) e (2,2). Apenas (3,3) está presente."
  },
  
  {
    dificuldade: "Basic",
    pares: [[1, 2], [2, 3], [3, 4], [1, 4]],
    pergunta: "A relação é transitiva?",
    resposta: false,
    explicacao: "Não é transitiva, pois faltam pares como (1,3) e (2,4), que deveriam existir se a relação fosse transitiva (por exemplo, (1,2) e (2,3) → (1,3))."
  },

  {
    dificuldade: "Basic",
    pares: [[1, 2], [2, 3], [3, 1]],
    pergunta: "A relação é simétrica?",
    resposta: false,
    explicacao: "Não é simétrica porque nenhum par tem seu inverso: faltam (2,1), (3,2) e (1,3). Simetria requer todos os inversos."
  },
  {
    dificuldade: "Basic",
    pares: [[1, 2], [2, 1], [3, 4]],
    pergunta: "A relação é simétrica?",
    resposta: false,
    explicacao: "Não é simétrica porque (3,4) não tem seu correspondente (4,3). Apenas os pares com 1 e 2 são simétricos."
  },
  {
    dificuldade: "Basic",
    pares: [[1, 2], [2, 3], [1, 3]],
    pergunta: "A relação é de equivalência?",
    resposta: false,
    explicacao: "Não é de equivalência porque: Não é reflexiva (faltam (1,1), (2,2), (3,3)) e não é simétrica (faltam inversos) embora seja transitiva."
  },
  {
    dificuldade: "Basic",
    pares: [[1, 1], [2, 2], [3, 3]],
    pergunta: "A relação é de equivalência?",
    resposta: true,
    explicacao: "É de equivalência (é a igualdade): Reflexiva: todos (a,a) presentes; Simétrica: trivialmente; Transitiva: trivialmente"
  },
  {
    dificuldade: "Basic",
    pares: [[1, 1], [1, 2], [2, 1]],
    pergunta: "A relação é reflexiva?",
    resposta: false,
    explicacao: "Não é reflexiva porque se o universo inclui {1,2}, falta (2,2). Apenas (1,1) está presente."
  },
  {
    dificuldade: "Basic",
    pares: [[1, 1], [2, 2], [3, 3], [1, 2], [2, 1]],
    pergunta: "A relação é de equivalência?",
    resposta: true,
    explicacao: "É de equivalência porque: Reflexiva: todos (a,a) presentes; Simétrica: (1,2) ↔ (2,1) e Transitiva: não há cadeias que exijam novos pares"
  },
// Medium
  {
    dificuldade: "Medium",
    pares: [[1, 1], [2, 2], [1, 2], [2, 1], [3, 3]],
    pergunta: "A relação é de equivalência?",
    resposta: true,
    explicacao: "É de equivalência porque: Reflexiva (tem (a,a) para 1,2,3); Simétrica (cada (a,b) tem (b,a)); Transitiva (todas as combinações como (1,2)+(2,1) → (1,1) já estão ou são triviais)."
  },
  {
    dificuldade: "Medium",
    pares: [[1, 2], [2, 3], [3, 4], [4, 5]],
    pergunta: "A relação é transitiva?",
    resposta: false,
    explicacao: "Não é transitiva porque, por exemplo, (1,2) e (2,3) exigiriam (1,3), que está ausente."
  },
  {
    dificuldade: "Medium",
    pares: [[1, 2], [2, 1], [1, 3], [3, 1]],
    pergunta: "A relação é simétrica?",
    resposta: true,
    explicacao: "É simétrica porque todos os pares possuem seus inversos: (1,2) ↔ (2,1), (1,3) ↔ (3,1)."
  },
  {
    dificuldade: "Medium",
    pares: [[1, 1], [2, 2], [3, 3], [4, 4]],
    pergunta: "A relação é de equivalência?",
    resposta: false,
    explicacao: "Não é de equivalência porque, apesar de reflexiva e simétrica, falta a transitividade — não há pares (a,b) com (b,c) implicando (a,c)."
  },

  {
    dificuldade: "Medium",
    pares: [[1, 2], [2, 3], [3, 1]],
    pergunta: "A relação é transitiva?",
    resposta: false,
    explicacao: "Não é transitiva, pois a composição (1,2) e (2,3) deveria gerar (1,3), mas esse par não está presente na relação."
  },
///
  {
    dificuldade: "Medium",
    pares: [[1, 1], [2, 2], [3, 3], [1, 2]],
    pergunta: "A relação é reflexiva?",
    resposta: true,
    explicacao: "É reflexiva para os elementos {1,2,3}, pois contém (1,1), (2,2), (3,3). O par (1,2) não interfere na reflexividade."
  },
  {
    dificuldade: "Medium",
    pares: [[1, 2], [2, 3], [1, 3], [3, 1]],
    pergunta: "A relação é de equivalência?",
    resposta: false,
    explicacao: "Não é de equivalência porque não é reflexiva (faltam (2,2), (3,3)), e nem totalmente simétrica (falta (3,2) para (2,3))."
  },
  {
    dificuldade: "Medium",
    pares: [[1, 2], [2, 1], [3, 3], [2, 3]],
    pergunta: "A relação é simétrica?",
    resposta: false,
    explicacao: "Não é simétrica porque (2,3) não tem seu par simétrico (3,2). Os demais pares estão corretos."
  },
  {
    dificuldade: "Medium",
    pares: [[1, 1], [2, 2], [1, 2], [2, 1]],
    pergunta: "A relação é reflexiva?",
    resposta: false,
    explicacao: "Não é reflexiva se considerarmos o universo {1,2,3}, pois falta (3,3). Reflexividade exige (a,a) para todos os elementos."
  },
  {
    dificuldade: "Medium",
    pares: [[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]],
    pergunta: "A relação é transitiva?",
    resposta: true,
    explicacao: "É transitiva porque todas as composições possíveis, como (1,2)+(2,3)+(3,4)+(4,5) implicam (1,5), que está presente."
  },

  // Hard 
  {
    dificuldade: "Hard",
    pares: [[1, 1], [2, 2], [3, 3], [1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2]],
    pergunta: "A relação é de equivalência?",
    resposta: true,
    explicacao: "É de equivalência: Reflexiva (todos os (a,a)); Simétrica (todos os pares têm os inversos); Transitiva (qualquer cadeia de 2 pares leva a um 3º já incluso)."
  },
  {
    dificuldade: "Hard",
    pares: [[1, 2], [2, 3], [3, 4], [1, 4]],
    pergunta: "A relação é transitiva?",
    resposta: true,
    explicacao: "É transitiva porque (1,2)+(2,3)+(3,4) implicam (1,4), que está presente. As composições estão todas satisfeitas."
  },
  {
    dificuldade: "Hard",
    pares: [[1, 2], [2, 1], [3, 4], [4, 3]],
    pergunta: "A relação é simétrica?",
    resposta: true,
    explicacao: "É simétrica porque cada par tem seu correspondente: (1,2) ↔ (2,1) e (3,4) ↔ (4,3)."
  },
  {
    dificuldade: "Hard",
    pares: [[1, 1], [2, 2], [3, 3], [4, 4], [1, 2]],
    pergunta: "A relação é de equivalência?",
    resposta: false,
    explicacao: "Não é de equivalência pois não é simétrica (falta (2,1) para (1,2)), nem transitiva (não há composições suficientes)."
  },
  {
    dificuldade: "Hard",
    pares: [[1, 2], [2, 1], [2, 3], [3, 2], [1, 3], [3, 1]],
    pergunta: "A relação é simétrica?",
    resposta: true,
    explicacao: "É simétrica porque todos os pares possuem seus respectivos inversos."
  },
  {
    dificuldade: "Hard",
    pares: [[1, 2], [2, 3], [3, 4], [1, 4]],
    pergunta: "A relação é reflexiva?",
    resposta: false,
    explicacao: "Não é reflexiva porque não há nenhum par do tipo (a,a). Reflexividade exige (1,1), (2,2), etc."
  },
  {
    dificuldade: "Hard",
    pares: [[1, 1], [2, 2], [3, 3], [4, 4], [1, 2], [2, 1]],
    pergunta: "A relação é de equivalência?",
    resposta: true,
    explicacao: "É de equivalência: Reflexiva (todos os (a,a) para 1–4); Simétrica (1,2) ↔ (2,1); Transitiva (não há cadeia exigindo novos pares)."
  },
  {
    dificuldade: "Hard",
    pares: [[1, 2], [2, 3], [3, 1]],
    pergunta: "A relação é de equivalência?",
    resposta: false,
    explicacao: "Não é de equivalência: falta reflexividade ((1,1), etc.) e simetria ((2,1), etc.); embora seja transitiva por fechamento implícito."
  },
  {
    dificuldade: "Hard",
    pares: [[1, 1], [1, 2], [2, 1], [2, 2]],
    pergunta: "A relação é reflexiva?",
    resposta: true,
    explicacao: "É reflexiva para os elementos 1 e 2, pois (1,1) e (2,2) estão presentes. Reflexividade se refere aos elementos envolvidos nos pares."
  },
  {
    dificuldade: "Hard",
    pares: [[1, 2], [2, 3], [1, 3], [3, 4], [1, 4]],
    pergunta: "A relação é transitiva?",
    resposta: true,
    explicacao: "É transitiva porque (1,2)+(2,3) → (1,3), (1,3)+(3,4) → (1,4), e todos os pares necessários estão presentes."
  }

]