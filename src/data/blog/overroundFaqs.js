export const OVERROUND_FAQS = [
  {
    question: 'O que é overround nas apostas?',
    answer: 'Overround é a soma das probabilidades implícitas de todos os resultados possíveis de um mercado de apostas. Em um mercado sem margem, essa soma seria próxima de 100%. Quando ultrapassa 100%, o excedente representa a margem embutida pelas plataformas nas odds. Por exemplo, odds 1.90 e 1.90 geram 52,63% + 52,63% = 105,26%; o overround é 105,26% e a margem é 5,26%.',
  },
  {
    question: 'O que é margem da casa em apostas?',
    answer: 'A margem da casa é a vantagem matemática embutida diretamente nas odds publicadas. Ela não aparece como uma taxa separada — está incorporada nas cotações de todos os resultados do mercado. Quanto maior a margem, menor tende a ser o payout teórico. A margem ajuda a entender o preço das odds, mas não prevê resultados.',
  },
  {
    question: 'Como calcular overround?',
    answer: 'Divida 1 pela odd de cada resultado para obter a probabilidade implícita de cada um. Some todos os valores. O total é o overround. Se a soma for 105,26%, o overround é 105,26% e a margem da casa é 5,26%. A fórmula é: overround = (1 ÷ odd₁) + (1 ÷ odd₂) + ... + (1 ÷ oddₙ), expresso em percentual.',
  },
  {
    question: 'Como calcular a margem da casa pelas odds?',
    answer: 'Some as probabilidades implícitas de todos os resultados do mercado (1 ÷ cada odd × 100) e subtraia 100%. O resultado é a margem aproximada. Exemplo: odds 2.10, 3.40 e 3.60 geram 47,62% + 29,41% + 27,78% = 104,81%. Margem = 4,81%.',
  },
  {
    question: 'Qual é a fórmula do overround?',
    answer: 'Overround (%) = [(1 ÷ odd₁) + (1 ÷ odd₂) + ... + (1 ÷ oddₙ)] × 100. A margem da casa é o overround menos 100%. O payout teórico é 100% dividido pelo overround expresso como decimal.',
  },
  {
    question: 'O que é payout teórico?',
    answer: 'Payout teórico é a proporção estimada do volume apostado que seria devolvida ao conjunto de apostadores com base nas odds publicadas. É calculado como 1 dividido pelo overround em decimal. Se o overround for 105,26%, o payout é 1 ÷ 1,0526 ≈ 94,99%. É uma estimativa matemática — não representa o retorno de uma aposta individual.',
  },
  {
    question: 'O que são odds justas?',
    answer: 'Odds justas são cotações aproximadas sem a margem da casa embutida. Para calculá-las, normaliza-se a probabilidade implícita de cada resultado dividindo-a pela soma total das probabilidades. Em seguida, inverte-se o valor. Elas são referências teóricas úteis para análise, mas não indicam automaticamente que uma aposta tem valor.',
  },
  {
    question: 'Margem menor significa aposta melhor?',
    answer: 'Não necessariamente. Margem menor pode indicar odds mais competitivas e precificação mais próxima do valor justo. Mas uma aposta ainda pode não ter valor se a probabilidade real do evento for menor que a probabilidade implícita da odd. Margem é uma métrica do mercado como um todo, não de uma seleção específica.',
  },
  {
    question: 'Overround garante que uma aposta vai perder?',
    answer: 'Não. O overround é uma característica estrutural do mercado, não uma previsão de resultado. Ele indica que as odds foram ajustadas para incluir margem, mas apostas individuais podem resultar em lucro ou prejuízo independentemente do overround. Resultados dependem de muitos fatores além da margem.',
  },
  {
    question: 'Como calcular overround em futebol 1X2?',
    answer: 'Some as probabilidades implícitas dos três resultados: vitória do mandante, empate e vitória do visitante. Exemplo com odds 2.20, 3.30 e 3.20: 45,45% + 30,30% + 31,25% = 107,00%. Margem: 7,00%. É essencial incluir o empate — esquecê-lo invalida o cálculo e subestima a margem real.',
  },
  {
    question: 'Como calcular margem em mercado de 2 resultados?',
    answer: 'Some as probabilidades implícitas dos dois resultados. Exemplo com odds 1.85 e 2.05: (1 ÷ 1.85) × 100 = 54,05%; (1 ÷ 2.05) × 100 = 48,78%; soma = 102,83%; margem = 2,83%. O payout teórico seria 1 ÷ 1,0283 ≈ 97,25%.',
  },
  {
    question: 'Qual a relação entre overround e probabilidade implícita?',
    answer: 'A probabilidade implícita de cada odd é o inverso da cotação em percentual (1 ÷ odd × 100). O overround é a soma de todas essas probabilidades implícitas do mercado. Em um mercado sem margem, essa soma seria 100%. Cada ponto percentual acima de 100% representa margem embutida pela plataforma.',
  },
  {
    question: 'Qual a diferença entre overround e value bet?',
    answer: 'Overround é uma característica do mercado como um todo — mede quanto a soma das odds foi ajustada acima do valor justo. Value bet é uma característica de uma aposta individual: ocorre quando a probabilidade real estimada de um resultado específico supera a probabilidade implícita da odd. Um mercado com overround baixo pode facilitar encontrar value bets, mas não garante sua existência.',
  },
  {
    question: 'Posso usar overround para comparar casas de apostas?',
    answer: 'Sim. Ao calcular o overround do mesmo mercado em plataformas diferentes, é possível comparar qual está precificando com menor margem para aquele evento específico. Para a comparação ser válida, é preciso usar exatamente o mesmo mercado, com as mesmas regras e odds coletadas no mesmo momento, pois as cotações mudam constantemente.',
  },
  {
    question: 'A calculadora de margem da casa garante lucro?',
    answer: 'Não. A calculadora apresenta informações matemáticas baseadas nas odds inseridas. Ela não prevê resultados, não recomenda apostas e não garante qualquer retorno financeiro. O objetivo é educativo: entender como as odds são precificadas e como comparar mercados matematicamente.',
  },
  {
    question: 'Overround é a mesma coisa que taxa?',
    answer: 'São conceitos próximos, mas não idênticos. O overround é uma estimativa calculada pelas odds publicadas — indica a margem matemática teórica do mercado. A taxa efetiva da casa pode variar conforme o volume de apostas em cada resultado e outros fatores operacionais. O overround é uma proxy útil para comparação, não uma medida exata da margem real.',
  },
];
