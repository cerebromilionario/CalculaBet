export const DUTCHING_OU_SUREBET_FAQS = [
  {
    question: 'Qual a diferenca entre Dutching e Surebet?',
    answer: 'Dutching e uma tecnica de distribuicao de stake entre dois ou mais resultados, com o objetivo de equilibrar retorno ou lucro em cada cenario coberto. Surebet e uma condicao de arbitragem matematica em que as odds permitem cobrir todos os resultados com retorno positivo. Dutching pode ser usado sem existir surebet. Toda surebet envolve distribuicao de stakes, mas nem todo dutching e uma surebet.',
  },
  {
    question: 'Dutching garante lucro?',
    answer: 'Nao. Dutching e uma tecnica de distribuicao de stake que pode equilibrar retorno em resultados cobertos, mas nao garante lucro. Se o resultado nao coberto acontecer, a aposta perde. Se as odds nao forem suficientes, pode haver prejuizo mesmo cobrindo varios resultados. Cuidado com gestao de banca e analise das odds e essencial antes de usar a tecnica.',
  },
  {
    question: 'Surebet garante lucro?',
    answer: 'Surebet indica uma oportunidade de arbitragem matematica, mas nao garante lucro na pratica. Riscos operacionais como mudanca de odds, limites de aposta, apostas nao aceitas, regras de void, cancelamento de eventos e verificacao de conta podem impedir a realizacao do retorno calculado. O calculo matematico e necessario, mas nao suficiente para garantir resultado.',
  },
  {
    question: 'Dutching e o mesmo que arbitragem?',
    answer: 'Nao necessariamente. Dutching e uma tecnica de distribuicao de stake. Arbitragem e uma condicao matematica em que e possivel cobrir todos os resultados com retorno positivo. E possivel usar dutching sem existir arbitragem, por exemplo para equilibrar retorno em dois de tres resultados possiveis. Nesse caso, ha cobertura parcial, mas nao arbitragem.',
  },
  {
    question: 'Quando usar Dutching?',
    answer: 'Dutching faz sentido quando o apostador quer distribuir a stake entre dois ou mais resultados de um mercado, seja para equilibrar retorno, reduzir exposicao a um unico resultado ou simular cenarios. A Calculadora de Dutching do CalculaBet em /calculadoras/dutching ajuda a calcular a divisao automaticamente e a visualizar o risco de cada cenario.',
  },
  {
    question: 'Quando usar Surebet?',
    answer: 'Surebet faz sentido quando a soma das probabilidades implicitas das odds fica abaixo de 100%, indicando possivel arbitragem matematica. Antes de executar, e importante verificar limites, confirmar as odds nas plataformas e avaliar os riscos operacionais. A Calculadora de Arbitragem do CalculaBet em /calculadoras/arbitragem ajuda a calcular a margem e a divisao de stakes.',
  },
  {
    question: 'Como calcular Dutching?',
    answer: 'Para calcular dutching, o apostador define a stake total e as odds dos resultados que deseja cobrir. A stake de cada selecao e calculada de forma proporcional para equilibrar o retorno. A formula basica para a stake em cada selecao e: Stake A = (Stake total / Soma dos pesos), onde o peso de cada selecao e 1/odd. A Calculadora de Dutching do CalculaBet realiza esse calculo automaticamente.',
  },
  {
    question: 'Como calcular Surebet?',
    answer: 'Para verificar se ha surebet, calcule a soma das probabilidades implicitas: some 1/odd de cada resultado. Se a soma for menor que 1 (ou menor que 100%), pode haver arbitragem. Em seguida, calcule a stake de cada selecao proporcional a essa probabilidade. A Calculadora de Arbitragem do CalculaBet em /calculadoras/arbitragem realiza esse calculo automaticamente.',
  },
  {
    question: 'Toda Surebet usa Dutching?',
    answer: 'Sim. O calculo de surebet envolve distribuir stakes entre os resultados do mercado, o que tecnicamente e uma forma de dutching. A diferenca e que na surebet a soma das probabilidades implicitas e menor que 100%, criando uma margem matematica positiva. Portanto, toda surebet usa a logica de distribuicao de stakes do dutching, mas o contexto e especifico: arbitragem matematica.',
  },
  {
    question: 'Todo Dutching e Surebet?',
    answer: 'Nao. Dutching e uma tecnica de distribuicao de stake que pode ser usada em qualquer mercado, independentemente de existir arbitragem. Se a soma das probabilidades implicitas for maior ou igual a 100%, o dutching pode equilibrar retorno em cenarios cobertos, mas nao garante lucro matematico. Surebet so existe quando a soma fica abaixo de 100%.',
  },
  {
    question: 'Quais sao os riscos do Dutching?',
    answer: 'Os principais riscos sao: resultado nao coberto acontecer, odds insuficientes para cobrir a stake com retorno positivo, erro na divisao das stakes, excesso de confianca na cobertura parcial, mercados com muitos resultados possiveis, confundir cobertura com garantia e falta de gestao de banca adequada. Dutching reduz exposicao a um unico resultado, mas nao elimina o risco financeiro.',
  },
  {
    question: 'Quais sao os riscos da Surebet?',
    answer: 'Os principais riscos operacionais sao: odds mudarem antes da execucao, limite de aposta atingido, aposta nao aceita pela plataforma, erro de calculo, regras de void ou cancelamento do evento, verificacao de conta com restricoes e possibilidade de limitacao de conta por algumas plataformas. O calculo matematico e necessario, mas a execucao envolve riscos reais que podem impedir o resultado esperado.',
  },
  {
    question: 'Qual calculadora devo usar para Dutching?',
    answer: 'Use a Calculadora de Dutching do CalculaBet em /calculadoras/dutching. Ela permite inserir as odds dos resultados que deseja cobrir, a stake total e calcula automaticamente a divisao proporcional das stakes, o retorno em cada cenario e a exposicao ao risco dos resultados nao cobertos.',
  },
  {
    question: 'Qual calculadora devo usar para Surebet?',
    answer: 'Use a Calculadora de Arbitragem do CalculaBet em /calculadoras/arbitragem. Ela verifica se a soma das probabilidades implicitas e menor que 100%, calcula a margem de arbitragem, sugere a divisao de stakes e estima o retorno potencial em cada cenario. Isso evita erros de calculo manual e facilita a analise rapida de oportunidades.',
  },
  {
    question: 'Dutching ou Surebet e melhor para iniciantes?',
    answer: 'Nenhuma das duas estrategias e indicada como ponto de partida para iniciantes sem entender antes os conceitos de odds, probabilidade implicita, stake e gestao de banca. Dutching pode parecer simples, mas exige entender quais resultados nao estao cobertos. Surebet parece matematica, mas tem riscos operacionais que iniciantes tendem a subestimar. O recomendado e simular com a Calculadora de Dutching e a Calculadora de Arbitragem antes de apostar dinheiro real.',
  },
];
