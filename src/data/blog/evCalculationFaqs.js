export const EV_CALCULATION_FAQS = [
  {
    question: 'O que é EV em apostas?',
    answer: 'EV significa Expected Value, ou valor esperado em português. Em apostas esportivas, é uma medida matemática que estima o resultado médio esperado de uma aposta com base na probabilidade estimada e no retorno potencial. EV pode ser positivo, neutro ou negativo. EV positivo indica expectativa matemática favorável — não garante vitória em nenhuma aposta individual.',
  },
  {
    question: 'O que é valor esperado em apostas esportivas?',
    answer: 'Valor esperado, ou EV, é a estimativa do ganho ou perda médio por aposta se ela fosse repetida infinitas vezes nas mesmas condições. Ele combina a probabilidade estimada de vitória com o lucro potencial e a probabilidade de perda com o valor apostado. Não é uma previsão de resultado — é uma medida de expectativa matemática baseada nos dados inseridos.',
  },
  {
    question: 'Como calcular EV nas apostas?',
    answer: 'A fórmula é: EV = (Probabilidade de vitória × Lucro potencial) − (Probabilidade de perda × Valor apostado). Onde o lucro potencial é Stake × (Odd − 1) e a probabilidade de perda é 1 menos a probabilidade estimada. Por exemplo: R$100 apostados na odd 2.20 com 50% de probabilidade estimada geram EV = (0,50 × 120) − (0,50 × 100) = R$10. Use a Calculadora de Value Bet / EV do CalculaBet para automatizar o cálculo.',
  },
  {
    question: 'Qual é a fórmula do EV?',
    answer: 'EV = (P × Lucro) − ((1 − P) × Stake). Onde P é a probabilidade estimada de vitória em decimal (ex: 0,50 para 50%), Lucro é o lucro potencial em caso de vitória (Stake × (Odd − 1)), e Stake é o valor apostado. O EV percentual é calculado como (EV / Stake) × 100.',
  },
  {
    question: 'Como calcular EV positivo?',
    answer: 'O EV é positivo quando o cálculo (Probabilidade estimada × Lucro potencial) supera (Probabilidade de perda × Stake). Para isso, a probabilidade estimada precisa ser maior que a probabilidade implícita da odd. Exemplo: odd 2.20 implica 45,45%; se você estima 50%, o EV é positivo. Esse cálculo depende totalmente da precisão da sua estimativa de probabilidade.',
  },
  {
    question: 'EV positivo garante lucro?',
    answer: 'Não. EV positivo é uma estimativa matemática de expectativa favorável com base nas probabilidades inseridas. Uma aposta com EV positivo pode perder, assim como uma com EV negativo pode vencer. O EV se manifesta como tendência em um grande volume de apostas — e apenas se as estimativas de probabilidade forem precisas. Apostas individuais sempre envolvem incerteza e risco financeiro.',
  },
  {
    question: 'O que é EV negativo?',
    answer: 'EV negativo ocorre quando o cálculo indica que a perda esperada supera o ganho esperado com base nas probabilidades usadas. Isso acontece quando a probabilidade implícita da odd é maior que sua probabilidade estimada. Matematicamente, a aposta não teria valor com essas premissas — mas ainda pode vencer em um resultado individual, pois cada aposta é incerta.',
  },
  {
    question: 'O que é EV percentual?',
    answer: 'EV percentual é o valor esperado expresso como proporção da stake. Fórmula: EV% = (EV / Stake) × 100. Serve para comparar apostas de valores diferentes. Um EV de R$5 em stake de R$50 equivale a 10%, igual a um EV de R$20 em stake de R$200. EV% não garante resultado — é uma medida de expectativa relativa ao valor apostado.',
  },
  {
    question: 'Qual a diferença entre EV e ROI?',
    answer: 'EV é calculado antes de uma aposta, com base em probabilidade estimada e odd. É uma estimativa de expectativa matemática futura. ROI é calculado depois das apostas: mede o retorno real obtido em relação ao total apostado em um período. EV é análise prospectiva; ROI é análise retrospectiva. Os dois se complementam no acompanhamento de desempenho.',
  },
  {
    question: 'Qual a diferença entre EV e value bet?',
    answer: 'Value bet é uma aposta que aparenta ter valor esperado positivo — ou seja, a probabilidade estimada é maior que a probabilidade implícita da odd. EV é o cálculo que quantifica esse valor. Na prática, os conceitos estão diretamente ligados: encontrar um value bet é identificar uma situação onde o EV calculado é positivo. Tudo depende da qualidade da estimativa de probabilidade.',
  },
  {
    question: 'O que é edge em apostas?',
    answer: 'Edge é a diferença em pontos percentuais entre a probabilidade estimada pelo apostador e a probabilidade implícita da odd. Fórmula: Edge = Probabilidade estimada (%) − Probabilidade implícita (%). Edge positivo indica que sua estimativa supera a probabilidade da odd, sugerindo possível valor. Edge não garante acerto — depende da qualidade da estimativa.',
  },
  {
    question: 'Como calcular edge?',
    answer: 'Calcule a probabilidade implícita da odd: (1 ÷ Odd) × 100. Em seguida, subtraia esse valor da sua probabilidade estimada. Exemplo: odd 2.20 gera probabilidade implícita de 45,45%. Se você estima 50%, o edge é 50% − 45,45% = 4,55 pontos percentuais. A Calculadora de Value Bet / EV do CalculaBet calcula o edge automaticamente.',
  },
  {
    question: 'O que é probabilidade implícita?',
    answer: 'Probabilidade implícita é a probabilidade de vitória embutida na odd. Calcula-se como (1 ÷ Odd) × 100. Odd 2.00 implica 50%; odd 1.50 implica 66,67%; odd 3.00 implica 33,33%. Ela inclui a margem da casa, então está ligeiramente abaixo do valor justo. Para que haja possível edge, sua estimativa precisa ser maior que a probabilidade implícita.',
  },
  {
    question: 'Odd alta significa EV positivo?',
    answer: 'Não. Odd alta indica retorno potencial maior e probabilidade implícita menor, mas não garante EV positivo. Uma odd de 10.00 tem EV negativo se a probabilidade real for menor que 10%. Uma odd de 1.50 pode ter EV positivo se a probabilidade real for maior que 66,67%. O que determina o EV é a relação entre a odd e a probabilidade estimada — não a cotação isolada.',
  },
  {
    question: 'Como usar uma calculadora de EV?',
    answer: 'Informe o valor da aposta (stake), a odd decimal e sua estimativa de probabilidade. A calculadora calcula automaticamente o retorno potencial, lucro potencial, probabilidade implícita, edge em pontos percentuais, EV em reais e EV percentual. Use a Calculadora de Value Bet / EV do CalculaBet e analise o resultado como apoio matemático — não como garantia de lucro.',
  },
  {
    question: 'EV funciona em apostas múltiplas?',
    answer: 'Matematicamente, o EV de uma múltipla é o produto dos EVs individuais de cada seleção. Se todas tiverem EV positivo individualmente, a múltipla pode ter EV positivo — mas a variância aumenta significativamente. Na prática, a análise fica mais complexa, pois cada seleção acumula incerteza. Para múltiplas, é ainda mais importante controlar stake e banca.',
  },
  {
    question: 'Por que uma aposta com EV positivo pode perder?',
    answer: 'Porque EV é uma expectativa matemática de longo prazo, não uma previsão individual. Uma aposta com EV positivo de 10% pode perder na primeira tentativa, na décima ou na centésima. A variância natural dos eventos esportivos garante que resultados individuais sejam sempre incertos. O EV se manifesta como tendência apenas em um grande volume de apostas com estimativas precisas.',
  },
];
