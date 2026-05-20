export const SUREBET_EXCEL_FAQS = [
  {
    question: 'Como fazer uma calculadora surebet no Excel?',
    answer: 'Monte uma planilha com as odds de cada resultado em células separadas. Use a fórmula =1/odd_A+1/odd_B para somar as probabilidades implícitas. Se o resultado for menor que 1 (ou 100%), há arbitragem matemática. Para distribuir stakes, use: Stake = banca_total * (1/odd_do_resultado) / soma. A Calculadora de Arbitragem do CalculaBet realiza todos esses cálculos automaticamente, sem necessidade de montar fórmulas manualmente.',
  },
  {
    question: 'Qual é a fórmula da surebet?',
    answer: 'Para dois resultados, a fórmula básica é: Soma = 1/odd_A + 1/odd_B. Se essa soma for menor que 1, há arbitragem matemática. Para três resultados (como futebol 1X2), some o inverso das três odds: Soma = 1/odd_1 + 1/odd_X + 1/odd_2. Quanto menor a soma, maior a margem teórica. A stake de cada resultado é calculada como: Stake = banca_total * (1/odd) / soma_total.',
  },
  {
    question: 'Como saber se existe surebet?',
    answer: 'Some as probabilidades implícitas de todos os resultados do mercado: divida 1 por cada odd e some os resultados. Se a soma for menor que 1 (menos de 100%), existe arbitragem matemática com as odds informadas. Isso significa que, em tese, é possível distribuir stakes para que qualquer resultado gere retorno maior que o total apostado. Mas atenção: riscos operacionais podem inviabilizar a execução.',
  },
  {
    question: 'Como calcular surebet com 2 resultados?',
    answer: 'Some 1/odd_A e 1/odd_B. Se o resultado for menor que 1, há surebet matemática. Para calcular as stakes com banca de R$100: Stake_A = 100 * (1/odd_A) / soma e Stake_B = 100 * (1/odd_B) / soma. Exemplo: odds 2.10 e 2.10, soma = 0,9524. Stake_A = 100 * 0,4762 / 0,9524 = R$50. Stake_B = R$50. Retorno em qualquer resultado: R$50 * 2.10 = R$105.',
  },
  {
    question: 'Como calcular surebet com 3 resultados?',
    answer: 'Para um mercado como futebol 1X2, some 1/odd_casa + 1/odd_empate + 1/odd_fora. Se a soma for menor que 1, há arbitragem matemática. A stake de cada resultado é calculada como: Stake = banca_total * (1/odd_do_resultado) / soma. Quanto mais baixa a soma, maior a margem teórica antes de custos e riscos operacionais. A Calculadora de Arbitragem do CalculaBet suporta múltiplos resultados.',
  },
  {
    question: 'Como dividir stakes em uma surebet?',
    answer: 'A fórmula é: Stake_resultado = banca_total * (1/odd_resultado) / soma_total. Essa divisão distribui a banca de forma que o retorno bruto de qualquer resultado seja semelhante. Seleções com odds menores recebem stake maior; seleções com odds maiores recebem stake menor. Pequenos arredondamentos podem gerar diferença mínima entre retornos, mas não afetam o resultado de forma significativa.',
  },
  {
    question: 'Excel é melhor que calculadora online de surebet?',
    answer: 'Depende do objetivo. O Excel ajuda a entender a matemática, permite personalização e pode servir como estudo. Mas exige cuidado com erros manuais, fórmulas incorretas, arredondamentos e configuração regional (vírgula vs ponto decimal). Uma calculadora online como a do CalculaBet é mais rápida, reduz o risco de erro de fórmula e permite simular rapidamente sem montar planilha do zero.',
  },
  {
    question: 'Calculadora surebet no Excel garante lucro?',
    answer: 'Não. A planilha apenas mostra se existe arbitragem matemática com as odds informadas no momento do cálculo. Odds mudam rapidamente, limites de aposta podem impedir a execução completa, apostas podem ser anuladas e regras podem variar entre plataformas. O cálculo é uma estimativa matemática, não uma garantia de resultado financeiro.',
  },
  {
    question: 'O que significa soma menor que 100%?',
    answer: 'Uma soma de probabilidades implícitas menor que 100% indica que as odds combinadas representam mais de 100% de retorno teórico por cada real apostado. Isso é o critério matemático da arbitragem. Mas significa apenas uma oportunidade no papel — a execução real depende de as apostas serem aceitas nas odds calculadas, dos limites de stake e das regras das casas envolvidas.',
  },
  {
    question: 'Quais são os riscos de calcular surebet em planilha?',
    answer: 'Odds podem mudar entre o cálculo e a execução. Erro de digitação pode invalidar o cálculo. Arredondamento de stake pode alterar o retorno esperado. Limites de aposta podem impedir colocar a stake calculada. Uma aposta pode ser cancelada por regras específicas. Contas podem ter restrições. A planilha não acessa dados em tempo real e não prevê esses cenários.',
  },
  {
    question: 'Posso usar surebet em futebol 1X2?',
    answer: 'Sim, mercados de futebol com três resultados (vitória da casa, empate, vitória do visitante) são um dos mais estudados para arbitragem. A fórmula usa três odds: soma = 1/odd_1 + 1/odd_X + 1/odd_2. Se a soma for menor que 1, há margem matemática. Mas riscos operacionais existem em qualquer mercado: odds mudam, apostas podem ser canceladas e regras podem variar.',
  },
  {
    question: 'A calculadora do CalculaBet substitui uma planilha?',
    answer: 'Para simulações e cálculos rápidos, a Calculadora de Arbitragem do CalculaBet realiza as mesmas operações sem necessidade de montar fórmulas. Ela calcula soma das probabilidades, divisão de stakes e retorno potencial. Para estudar a matemática em profundidade ou criar automações personalizadas, o Excel ainda pode ser útil. As duas ferramentas se complementam.',
  },
  {
    question: 'O que pode dar errado em uma surebet?',
    answer: 'Odds podem mudar antes de concluir todas as apostas. Uma casa pode recusar a aposta ou limitar a stake. Uma seleção pode ser anulada por motivos como adiamento ou não realização do evento. Regras diferentes entre casas podem afetar o resultado. Erros de digitação podem gerar cálculo incorreto. Contas podem receber restrições. Saque e verificação de identidade podem ter regras próprias.',
  },
  {
    question: 'Surebet é recomendada para iniciantes?',
    answer: 'Não é recomendada para quem ainda está aprendendo apostas esportivas. Arbitragem exige entender odds, probabilidade implícita, gestão de banca, execução rápida e atenção aos termos das plataformas. Iniciantes devem primeiro estudar os conceitos básicos. A calculadora pode ser usada para aprender a matemática, mas a aplicação real exige conhecimento e cuidado.',
  },
];
