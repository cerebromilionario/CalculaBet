export const PLANILHA_GESTAO_BANCA_FAQS = [
  {
    question: 'Para que serve uma planilha de gestão de banca?',
    answer: 'Uma planilha de gestão de banca serve para organizar o histórico de apostas, acompanhar a evolução da banca, medir lucro e prejuízo, calcular ROI, controlar stake e unidade, e evitar decisões baseadas apenas em memória ou emoção. Ela não garante lucro nem melhora as probabilidades dos eventos — mas ajuda a enxergar padrões e tomar decisões mais informadas.',
  },
  {
    question: 'O que registrar em uma planilha de apostas?',
    answer: 'Os dados essenciais são: data, esporte, evento, mercado, seleção, casa de apostas, odd, stake em reais, stake em unidades, resultado (green/red/push/void), retorno recebido, lucro ou prejuízo, banca antes e depois da aposta. Adicionar observações sobre o motivo da aposta também ajuda na revisão posterior. Quanto mais completo e consistente o registro, mais útil será a análise.',
  },
  {
    question: 'Como calcular lucro ou prejuízo na planilha?',
    answer: 'Se a aposta vencer: Lucro = Stake x (Odd - 1). Se a aposta perder: Prejuízo = -Stake. Se for anulada ou void: Lucro/Prejuízo = 0, salvo regras específicas da plataforma. Exemplo: stake de R$50 na odd 2.20. Se vencer: lucro = R$50 x 1.20 = R$60. Se perder: -R$50. Use a Calculadora de Odds do CalculaBet para conferir esses valores rapidamente.',
  },
  {
    question: 'Como calcular ROI em uma planilha de apostas?',
    answer: 'A fórmula é: ROI = (Lucro líquido / Total apostado) x 100. Exemplo: total apostado R$1.000, lucro líquido R$80, ROI = 8%. ROI positivo em poucas apostas pode ser variância — amostras maiores são mais representativas. Use a Calculadora de ROI do CalculaBet para calcular esse indicador automaticamente.',
  },
  {
    question: 'Como registrar stake em unidades?',
    answer: 'Uma unidade é um valor padronizado baseado na banca. Por exemplo, se 1 unidade = 1% da banca de R$1.000, então 1 unidade = R$10. Registrar stake em unidades permite comparar apostas de diferentes momentos, mesmo que o valor absoluto em reais tenha mudado. Isso facilita a análise de consistência independentemente do tamanho da banca.',
  },
  {
    question: 'Como registrar cashout na planilha?',
    answer: 'Registre o valor apostado original, o valor recebido no cashout, a diferença (que pode ser positiva ou negativa em relação ao valor apostado), o motivo do cashout e se foi parcial ou total. Marque o resultado como cashout ou encerramento antecipado para diferenciar de uma aposta que aguardou o resultado final. A Calculadora de Cashout Justo do CalculaBet pode ajudar a comparar se a oferta foi justa.',
  },
  {
    question: 'Como registrar aposta múltipla?',
    answer: 'Registre a odd combinada da múltipla, o número de seleções, a stake total, o resultado final (green ou red) e, se possível, anote quais seleções venceram e qual eventual seleção foi perdida ou anulada. Para cada múltipla, a Calculadora de Aposta Múltipla do CalculaBet pode calcular a odd combinada, retorno e lucro potencial antes de registrar.',
  },
  {
    question: 'O que é green, red, push e void?',
    answer: 'Green significa aposta vencedora. Red significa aposta perdida. Push significa que a aposta foi empatada e o valor apostado foi devolvido, sem lucro nem prejuízo. Void significa que a aposta foi anulada, geralmente por cancelamento do evento ou regra específica do mercado. Cashout é o encerramento antecipado da aposta por um valor oferecido pela casa. Cada plataforma pode usar nomes diferentes — o importante é manter consistência no seu registro.',
  },
  {
    question: 'Planilha de gestão de banca garante lucro?',
    answer: 'Não. A planilha apenas organiza informações e cálculos. Ela não melhora a probabilidade das apostas, não prevê resultados e não elimina o risco financeiro. Apostas esportivas envolvem incerteza e variância. O registro ajuda a reduzir confusão, identificar padrões e tomar decisões mais conscientes — mas não transforma apostas em garantia de ganho.',
  },
  {
    question: 'É melhor usar planilha ou calculadora online?',
    answer: 'As duas ferramentas se complementam. A planilha é melhor para histórico contínuo, análise de longos períodos e personalização. Calculadoras online como as do CalculaBet são melhores para cálculos rápidos de odds, ROI, stake e gestão antes de registrar cada aposta. Usar as duas juntas reduz erros e torna o controle mais completo.',
  },
  {
    question: 'Como controlar banca com planilha?',
    answer: 'Registre a banca antes e depois de cada aposta. Isso mostra o impacto real de cada resultado na banca total. Defina limites de stake por aposta (como 1% ou 2% da banca) e revise periodicamente se esses limites ainda fazem sentido. A Calculadora de Gestão de Banca e a Calculadora de Unidade do CalculaBet ajudam a definir e calcular esses valores.',
  },
  {
    question: 'O que é stake média?',
    answer: 'Stake média é a média dos valores apostados em um período. É calculada somando todas as stakes e dividindo pelo número de apostas. Ela ajuda a identificar se o tamanho das apostas está aumentando ou diminuindo ao longo do tempo — o que pode indicar comportamento impulsivo ou ajuste consciente de estratégia.',
  },
  {
    question: 'O que é odd média?',
    answer: 'Odd média é a média das odds de todas as apostas registradas. Ela dá uma visão geral do perfil de risco das apostas. Odds médias baixas indicam apostas em favoritos; odds médias altas indicam maior risco por aposta. Comparar odd média com taxa de acerto ajuda a avaliar se as escolhas têm lógica consistente.',
  },
  {
    question: 'Como evitar erros na planilha de apostas?',
    answer: 'Registre todas as apostas — especialmente as perdas. Não apague histórico ruim. Use fórmulas travadas para evitar erros de referência. Revise os dados periodicamente. Não use a planilha como justificativa para apostar mais — use-a como ferramenta de análise. Defina limites antes e os mantenha independentemente dos resultados recentes.',
  },
];
