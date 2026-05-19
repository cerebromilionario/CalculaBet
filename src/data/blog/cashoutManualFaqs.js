export const CASHOUT_MANUAL_FAQS = [
  {
    question: 'O que é cashout manual?',
    answer: 'Cashout manual é uma forma de estimar por conta própria se uma oferta de cashout parece financeiramente justa. Em vez de apenas aceitar ou recusar a oferta da casa por intuição, o usuário compara o valor oferecido com uma estimativa calculada com base no retorno potencial original e na probabilidade atual de a aposta ser vencedora. Não se trata de prever resultado, mas de comparar dois números: o cashout oferecido e o cashout justo estimado.',
  },
  {
    question: 'O que é cashout justo?',
    answer: 'Cashout justo é uma estimativa matemática do valor que faria sentido para encerrar a aposta com base na probabilidade atual de vitória. A fórmula é: Cashout justo = Retorno potencial × Probabilidade atual estimada. Por exemplo, retorno potencial de R$250 e probabilidade estimada de 70% resultam em cashout justo de R$175. Essa estimativa depende completamente da qualidade da probabilidade informada pelo usuário e não representa garantia de nenhum resultado.',
  },
  {
    question: 'Como calcular cashout justo?',
    answer: 'Use a fórmula: Cashout justo = Retorno potencial × Probabilidade atual estimada. O retorno potencial é calculado como Valor apostado × Odd original. Exemplo: R$100 apostados na odd 2.50 resultam em retorno potencial de R$250. Com probabilidade estimada de 70%, o cashout justo é R$250 × 0,70 = R$175. A Calculadora de Cashout Justo / Manual do CalculaBet realiza esses cálculos automaticamente.',
  },
  {
    question: 'Qual é a fórmula do cashout justo?',
    answer: 'A fórmula principal é: Cashout justo = Retorno potencial × Probabilidade atual estimada. Onde Retorno potencial = Valor apostado × Odd original e Lucro potencial = Valor apostado × (Odd original - 1). A diferença entre o cashout oferecido e o cashout justo indica se a oferta está acima, próxima ou abaixo da estimativa matemática com base nos dados inseridos.',
  },
  {
    question: 'Cashout vale a pena?',
    answer: 'Depende do valor oferecido, da probabilidade atual estimada, da estratégia e do perfil de risco. Não existe resposta universal. Se a oferta estiver próxima ou acima do cashout justo estimado, pode fazer sentido aceitar dependendo do contexto. Se estiver muito abaixo, pode indicar desconto grande da casa. A decisão também depende de banca, tolerância ao risco, prazo e objetivos pessoais.',
  },
  {
    question: 'Como comparar cashout oferecido e valor justo?',
    answer: 'Calcule o cashout justo com a fórmula Retorno potencial × Probabilidade estimada e compare com o valor que a casa está oferecendo. A diferença em reais indica o quanto a oferta está acima ou abaixo da estimativa. O desconto percentual mostra essa diferença em proporção ao cashout justo. A Calculadora de Cashout Justo / Manual do CalculaBet calcula essa comparação automaticamente.',
  },
  {
    question: 'O que significa cashout abaixo do valor justo?',
    answer: 'Significa que, com base na probabilidade estimada pelo usuário, o valor oferecido pela casa está abaixo do que a fórmula sugere como justo. Isso pode refletir margem da casa, risco, liquidez ou critérios internos. Não significa necessariamente que recusar seja sempre a melhor decisão: o resultado real depende da probabilidade verdadeira e do risco aceito pelo usuário.',
  },
  {
    question: 'O que significa cashout acima do valor justo?',
    answer: 'Significa que o valor oferecido está acima do cashout justo estimado com base na probabilidade informada. Com essas premissas, a oferta parece favorável matematicamente. Ainda assim, a probabilidade estimada pode estar errada, o resultado continua incerto e aceitar ou recusar continua sendo uma decisão pessoal com riscos.',
  },
  {
    question: 'Como estimar a probabilidade atual?',
    answer: 'Essa é a parte mais difícil do cálculo. A estimativa pode considerar placar atual, tempo restante, desempenho durante o evento, contexto esportivo e análise pessoal. Superestimar a probabilidade torna o cashout justo otimista demais; subestimar pode fazer a oferta parecer melhor do que é. Não existe método perfeito: a qualidade do cálculo depende diretamente da qualidade da estimativa.',
  },
  {
    question: 'Cashout justo garante a melhor decisão?',
    answer: 'Não. A calculadora realiza uma comparação matemática com base nos dados inseridos. A probabilidade atual é uma estimativa subjetiva do usuário, não um valor exato. O resultado esportivo continua incerto. A casa pode usar critérios próprios para definir o cashout. A ferramenta não recomenda aceitar ou recusar e não prevê resultados.',
  },
  {
    question: 'Cashout em múltipla funciona igual?',
    answer: 'O cashout em aposta múltipla é mais complexo porque várias seleções afetam a probabilidade combinada. O retorno potencial da múltipla é mais alto por causa das odds combinadas, e uma seleção restante pode mudar muito o valor. O cálculo de cashout justo pode ser aplicado, mas a estimativa de probabilidade para múltiplas exige considerar todas as seleções restantes.',
  },
  {
    question: 'Qual a diferença entre cashout e hedge?',
    answer: 'Cashout é uma oferta da própria casa para encerrar a aposta por um valor definido pela plataforma. Hedge é uma cobertura feita manualmente em outro mercado ou seleção, apostando em direção contrária para ajustar a exposição. O cashout é mais simples, mas pode incluir margem da casa no valor oferecido. O hedge pode dar mais controle, mas exige nova aposta, cálculo detalhado e odds disponíveis.',
  },
  {
    question: 'A casa pode oferecer cashout abaixo do valor justo?',
    answer: 'Sim. O valor de cashout pode incorporar margem, desconto ou critérios internos da plataforma. Por isso, o cashout oferecido frequentemente fica abaixo do cashout justo estimado, especialmente em mercados voláteis ou com pouca liquidez. Isso não significa que o cashout esteja errado — significa que a casa inclui sua margem no valor, assim como inclui nas odds originais.',
  },
  {
    question: 'A calculadora de cashout justo prevê resultados?',
    answer: 'Não. A Calculadora de Cashout Justo / Manual do CalculaBet realiza cálculos matemáticos com base nos dados inseridos pelo usuário. Ela compara o cashout oferecido com uma estimativa de valor justo, mas não acessa odds ao vivo, não conhece o estado atual do evento e não prevê o resultado da aposta. A probabilidade informada é uma estimativa do usuário, não um dado garantido.',
  },
  {
    question: 'Quando devo ter cuidado com cashout?',
    answer: 'Tenha cuidado ao aceitar cashout apenas por medo de perder, sem comparar números. Evite recusar cashout apenas por ganância ou excesso de confiança. Não use cashout para tentar recuperar perdas. Avalie o contexto, o risco restante e a estimativa de probabilidade antes de decidir. Cashout não elimina o risco — apenas transforma a incerteza em um valor definido naquele momento.',
  },
  {
    question: 'Cashout ajuda a proteger a banca?',
    answer: 'Cashout pode ajudar a reduzir exposição em alguns cenários, especialmente quando o cenário mudou e o risco percebido aumentou. No entanto, também pode estimular decisões impulsivas e frequentes que comprometem a banca no longo prazo. A proteção real da banca vem de limites definidos antes da aposta, gestão de stake e controle emocional.',
  },
];
