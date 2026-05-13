export const ODDS_FORMATS_FAQS = [
  {
    question: 'O que são odds decimais?',
    answer: 'Odds decimais são cotações exibidas em números como 1.50, 2.00 ou 3.25. Elas mostram o retorno total potencial: basta multiplicar o valor apostado pela odd decimal.',
  },
  {
    question: 'O que são odds americanas?',
    answer: 'Odds americanas são cotações com sinal positivo ou negativo, como +150 e -200. O sinal positivo indica lucro potencial a cada 100 unidades apostadas; o negativo indica quanto seria preciso apostar para buscar 100 unidades de lucro.',
  },
  {
    question: 'O que são odds fracionárias?',
    answer: 'Odds fracionárias são cotações em formato de fração, como 1/2, 2/1 e 5/2. Elas mostram o lucro potencial em relação ao valor apostado, não o retorno total.',
  },
  {
    question: 'Qual formato de odds é mais usado no Brasil?',
    answer: 'No Brasil, o formato decimal costuma ser o mais comum porque permite calcular retorno total de forma direta: valor apostado multiplicado pela odd.',
  },
  {
    question: 'Como funcionam odds americanas positivas?',
    answer: 'Odds americanas positivas mostram quanto lucro uma aposta de 100 unidades pode gerar. Em +150, uma aposta de R$100 teria lucro potencial de R$150 e retorno total de R$250.',
  },
  {
    question: 'Como funcionam odds americanas negativas?',
    answer: 'Odds americanas negativas mostram quanto é preciso apostar para buscar 100 unidades de lucro. Em -200, seria necessário apostar R$200 para lucro potencial de R$100 e retorno total de R$300.',
  },
  {
    question: 'Como converter odds americanas para decimais?',
    answer: 'Se a odd americana for positiva, divida por 100 e some 1. Se for negativa, divida 100 pelo valor absoluto da odd e some 1. Exemplo: +150 vira 2.50; -200 vira 1.50.',
  },
  {
    question: 'Como converter odds decimais para americanas?',
    answer: 'Se a odd decimal for 2.00 ou maior, use (decimal - 1) × 100. Se for menor que 2.00, use -100 / (decimal - 1). Arredondamentos podem ocorrer.',
  },
  {
    question: 'Como converter odds fracionárias para decimais?',
    answer: 'Divida o numerador pelo denominador e some 1. Por exemplo, 5/2 vira 3.50 porque 5 dividido por 2 é 2.5, e 2.5 + 1 = 3.5.',
  },
  {
    question: 'O que é um conversor de odds?',
    answer: 'Um conversor de odds é uma ferramenta que transforma uma cotação entre formatos decimal, americano e fracionário, geralmente exibindo também probabilidade implícita para reduzir erros manuais.',
  },
  {
    question: 'Odds decimais são melhores que americanas?',
    answer: 'Não necessariamente. Odds decimais costumam ser mais simples para usuários no Brasil, mas odds americanas e fracionárias mostram a mesma informação matemática em outro formato.',
  },
  {
    question: 'Odd alta significa maior chance de ganhar?',
    answer: 'Não. Em geral, odd alta indica maior retorno potencial, mas menor probabilidade implícita. Odd alta não é sinal de aposta melhor nem garantia de resultado.',
  },
  {
    question: 'Como calcular probabilidade implícita pelas odds?',
    answer: 'Com odds decimais, use 1 dividido pela odd e multiplique por 100. Exemplo: odd 2.50 representa probabilidade implícita aproximada de 40%.',
  },
  {
    question: 'Odds garantem o resultado de uma aposta?',
    answer: 'Não. Odds mostram retorno potencial e probabilidade implícita, mas não preveem resultados. Eventos esportivos têm incerteza, variância e risco financeiro.',
  },
];
