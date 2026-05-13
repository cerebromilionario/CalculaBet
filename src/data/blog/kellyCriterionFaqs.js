export const KELLY_CRITERION_FAQS = [
  {
    question: 'O que é o Critério de Kelly em apostas?',
    answer: 'O Critério de Kelly em apostas é uma fórmula matemática usada para estimar qual fração da banca poderia ser exposta em uma aposta, combinando odd decimal e probabilidade estimada pelo usuário. Ele é uma ferramenta de stake, não uma previsão de resultado.',
  },
  {
    question: 'Qual é a fórmula do Critério de Kelly?',
    answer: 'A fórmula do Critério de Kelly é f = (bp - q) / b. Nela, f é a fração da banca, b é a odd decimal menos 1, p é a probabilidade estimada de vitória e q é a probabilidade de perda, ou 1 - p.',
  },
  {
    question: 'Como calcular Kelly em apostas esportivas?',
    answer: 'Para calcular Kelly em apostas esportivas, transforme sua probabilidade estimada em decimal, calcule b como odd - 1, calcule q como 1 - p e aplique f = (bp - q) / b. Depois multiplique f pela banca para estimar a stake. Se f for zero ou negativo, o cálculo sugere não apostar.',
  },
  {
    question: 'O que significa Meio Kelly?',
    answer: 'Meio Kelly significa usar metade da fração sugerida pelo Kelly completo. Se o Kelly completo indicar 10% da banca, Meio Kelly indicaria 5%. É uma adaptação mais conservadora, mas ainda envolve risco.',
  },
  {
    question: 'O que é Kelly fracionado?',
    answer: 'Kelly fracionado é o uso de uma parte do Kelly completo, como 1/2 Kelly, 1/4 Kelly ou outro percentual. A ideia é reduzir volatilidade e diminuir o impacto de estimativas de probabilidade imprecisas.',
  },
  {
    question: 'Critério de Kelly garante lucro?',
    answer: 'Não. O Critério de Kelly não garante lucro. Ele depende da qualidade da probabilidade estimada, da amostra, da variância e da disciplina de gestão de banca. Mesmo com cálculo correto, perdas podem acontecer.',
  },
  {
    question: 'Kelly completo é arriscado?',
    answer: 'Sim, Kelly completo pode ser agressivo porque pode sugerir percentuais altos da banca quando a vantagem estimada parece grande. Muitos usuários preferem Meio Kelly ou Kelly fracionado para reduzir volatilidade.',
  },
  {
    question: 'Qual a diferença entre Kelly e stake fixa?',
    answer: 'Stake fixa usa o mesmo valor em várias apostas, independentemente da odd e da probabilidade estimada. Kelly varia a stake conforme banca, odd e probabilidade estimada, aumentando ou reduzindo exposição de acordo com a vantagem percebida.',
  },
  {
    question: 'Como estimar probabilidade para usar Kelly?',
    answer: 'A estimativa deve ser realista e baseada em análise, dados, contexto do mercado e comparação com a probabilidade implícita da odd. A parte mais difícil do Kelly é justamente estimar p; se p for superestimado, a stake sugerida pode ficar alta demais.',
  },
  {
    question: 'Quando o Critério de Kelly sugere não apostar?',
    answer: 'Quando o resultado da fórmula é zero ou negativo, o Critério de Kelly sugere não apostar. Isso indica que, com a odd e a probabilidade informadas, não existe vantagem matemática estimada.',
  },
  {
    question: 'Posso usar Kelly com banca pequena?',
    answer: 'É possível simular Kelly com banca pequena, mas o usuário deve ter cuidado porque percentuais altos podem representar exposição excessiva. Para iniciantes, stake fixa baixa, Meio Kelly ou simulação sem dinheiro real podem ser alternativas mais prudentes.',
  },
  {
    question: 'Critério de Kelly funciona para apostas múltiplas?',
    answer: 'O Kelly pode ser aplicado matematicamente a uma odd combinada, mas apostas múltiplas têm maior variância e exigem estimativas conjuntas mais difíceis. O risco de superestimar a probabilidade é maior, então é necessário cuidado adicional.',
  },
  {
    question: 'O que fazer se Kelly sugerir uma stake muito alta?',
    answer: 'Se Kelly sugerir uma stake muito alta, revise a probabilidade estimada, considere Meio Kelly ou Kelly fracionado, respeite limites pessoais e evite seguir a fórmula cegamente. A calculadora é apoio educativo, não ordem para apostar.',
  },
  {
    question: 'Como usar uma calculadora de Kelly?',
    answer: 'Em uma calculadora de Kelly, insira sua banca, a odd decimal e sua probabilidade estimada. A ferramenta calcula a fração sugerida da banca, a stake aproximada e permite comparar Kelly completo com Meio Kelly antes de qualquer decisão.',
  },
];
