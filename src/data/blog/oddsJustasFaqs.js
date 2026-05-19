export const ODDS_JUSTAS_FAQS = [
  {
    question: 'O que são odds justas?',
    answer: 'Odds justas são uma estimativa matemática das odds que um mercado teria sem a margem embutida pela casa de apostas. Elas são calculadas normalizando as probabilidades implícitas de todos os resultados do mercado para que somem 100%, e depois convertendo de volta para formato decimal. Não representam uma previsão de resultado nem garantem lucro.',
  },
  {
    question: 'Como calcular odds justas?',
    answer: 'Para calcular odds justas, siga estas etapas: 1) colete todas as odds do mesmo mercado; 2) calcule a probabilidade implícita de cada odd usando 1 / odd; 3) some todas as probabilidades implícitas; 4) normalize cada probabilidade dividindo-a pela soma total; 5) converta a probabilidade normalizada em odd justa usando 1 / probabilidade normalizada. O resultado é a estimativa de odd sem margem.',
  },
  {
    question: 'Qual é a fórmula da odd justa?',
    answer: 'A fórmula completa é: Odd justa = 1 / (probabilidade implícita / soma das probabilidades implícitas). Equivalentemente: Odd justa = soma das probabilidades implícitas / probabilidade implícita. Onde probabilidade implícita de cada resultado = 1 / odd oferecida.',
  },
  {
    question: 'O que é odd sem margem da casa?',
    answer: 'Odd sem margem da casa é sinônimo de odd justa: uma estimativa da cotação que existiria se a casa não adicionasse sua margem operacional. Na prática, as odds oferecidas costumam ser menores que as odds justas porque a casa reduz o retorno potencial para garantir sua margem independentemente do resultado.',
  },
  {
    question: 'Qual a diferença entre odd oferecida e odd justa?',
    answer: 'A odd oferecida é a cotação exibida pela casa, que já incorpora a margem operacional. A odd justa é uma estimativa matemática de quanto seria a cotação sem essa margem. Em geral, a odd justa é maior que a odd oferecida — a diferença representa a parte da margem alocada proporcionalmente àquele resultado.',
  },
  {
    question: 'Odds justas removem o overround?',
    answer: 'Sim, o cálculo de odds justas é baseado exatamente em remover o overround. O overround é a soma das probabilidades implícitas de todos os resultados, que costuma ultrapassar 100%. Ao normalizar essas probabilidades para que somem 100%, as odds resultantes são estimativas sem margem — o que é equivalente a remover o overround.',
  },
  {
    question: 'Odds justas garantem lucro?',
    answer: 'Não. Odds justas são uma ferramenta matemática de análise, não uma previsão de resultado. Elas mostram uma estimativa de precificação sem margem, mas não indicam qual resultado vai acontecer, não eliminam o risco financeiro das apostas e não transformam nenhuma aposta em oportunidade lucrativa garantida.',
  },
  {
    question: 'Odd justa é a mesma coisa que probabilidade real?',
    answer: 'Não. A odd justa é uma estimativa baseada nas odds disponíveis no mercado, não em análise esportiva independente. Ela representa o que o mercado precifica sem a margem, mas o mercado pode estar errado, desatualizado ou influenciado por fatores externos. A probabilidade real de um evento nunca é perfeitamente conhecida.',
  },
  {
    question: 'Como calcular odds justas em futebol 1X2?',
    answer: 'Em um mercado 1X2 de futebol, calcule a probabilidade implícita de cada um dos três resultados (Casa, Empate, Fora) usando 1 / odd. Some as três probabilidades para encontrar o overround. Normalize cada probabilidade dividindo pelo overround. Converta cada probabilidade normalizada em odd justa usando 1 / probabilidade normalizada. Nunca esqueça de incluir o empate no cálculo — ele é um resultado válido e obrigatório no mercado 1X2.',
  },
  {
    question: 'Como calcular odds justas em mercado de 2 resultados?',
    answer: 'Em um mercado de dois resultados, como handicap asiático ou sets de tênis, calcule 1 / odd para cada resultado, some os dois valores, normalize dividindo cada um pela soma e converta em odd justa com 1 / probabilidade normalizada. Exemplo: odds 1.90 / 1.90 → probabilidades 52,63% cada → soma 105,26% → probabilidades justas 50% cada → odds justas 2.00 / 2.00.',
  },
  {
    question: 'Preciso inserir todos os resultados do mercado?',
    answer: 'Sim. O cálculo de odds justas exige todos os resultados possíveis do mercado analisado. Se você omitir um resultado, a soma das probabilidades implícitas ficará incorreta, a normalização será imprecisa e as odds justas calculadas não corresponderão à realidade do mercado. No futebol 1X2, isso significa incluir sempre Casa, Empate e Fora.',
  },
  {
    question: 'Qual a relação entre odds justas e value bet?',
    answer: 'Odds justas ajudam a entender a precificação do mercado sem margem, mas não revelam automaticamente value bets. Um value bet acontece quando sua estimativa de probabilidade para um resultado é maior que a probabilidade implícita da odd oferecida. Odd oferecida acima da odd justa pode chamar atenção, mas isso depende do mercado e não é garantia de valor.',
  },
  {
    question: 'Qual a relação entre odds justas e probabilidade implícita?',
    answer: 'Probabilidade implícita é o passo intermediário no cálculo de odds justas. Primeiro, você converte cada odd em probabilidade implícita (1 / odd). Depois normaliza essas probabilidades para remover a margem. As odds justas são simplesmente o inverso dessas probabilidades normalizadas. Sem entender probabilidade implícita, não é possível calcular odds justas corretamente.',
  },
  {
    question: 'Qual a relação entre odds justas e margem da casa?',
    answer: 'A margem da casa — também chamada de overround — é exatamente o que o cálculo de odds justas tenta remover. A margem é visível na soma das probabilidades implícitas que ultrapassa 100%. Ao normalizar essas probabilidades para que somem exatamente 100%, as odds resultantes são estimativas sem essa margem embutida.',
  },
  {
    question: 'Posso usar odds justas para comparar casas de apostas?',
    answer: 'Sim, calcular odds justas para o mesmo mercado em casas diferentes ajuda a comparar qual casa oferece odds mais próximas das odds justas estimadas. Casas com odds mais altas têm marginalmente menos margem embutida naquele mercado, o que pode ser relevante ao analisar opções. Essa comparação não substitui análise esportiva nem elimina risco.',
  },
  {
    question: 'A calculadora de odds justas prevê resultados?',
    answer: 'Não. A Calculadora de Odds Justas do CalculaBet realiza cálculos matemáticos a partir das odds inseridas. Ela não tem acesso a informações de escalações, contexto esportivo, histórico de equipes nem qualquer dado externo. Ela ajuda a entender a precificação do mercado sem margem, mas não prevê resultados e não deve ser usada como base para decisões automáticas de aposta.',
  },
];
