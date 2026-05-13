/* eslint-disable react-refresh/only-export-components */
import { Link } from 'react-router-dom';

const A = ({ to, children }) => (
  <Link to={to} className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-80" style={{ color: '#67e8f9' }}>
    {children}
  </Link>
);

export const SEO_FAQS = [
  {
    id: 'formula-odds',
    category: 'Odds',
    pages: ['global', 'odds', 'como-calcular-odds'],
    question: 'Qual é a fórmula para calcular odds?',
    answerText: 'Em odds decimais, as fórmulas principais são: retorno total = valor apostado × odd; lucro líquido = valor apostado × (odd - 1); probabilidade implícita = 1 / odd × 100. Por exemplo, uma aposta de R$50 em odd 2.40 teria retorno potencial de R$120 e lucro potencial de R$70. A probabilidade implícita dessa odd seria 41,67%. Essas contas ajudam a entender o cenário matemático antes de decidir, mas não indicam que o evento vai acontecer. A calculadora de odds do CalculaBet automatiza retorno, lucro, ROI e probabilidade implícita para reduzir erro manual.',
    answer: <><p>Em odds decimais, as fórmulas principais são: <strong>retorno total = valor apostado × odd</strong>; <strong>lucro líquido = valor apostado × (odd - 1)</strong>; e <strong>probabilidade implícita = 1 / odd × 100</strong>. Por exemplo, uma aposta de R$50 em odd 2.40 teria retorno potencial de R$120 e lucro potencial de R$70.</p><p>A probabilidade implícita dessa odd seria 41,67%. Essas contas ajudam a entender o cenário matemático antes de decidir, mas não indicam que o evento vai acontecer. Use a <A to="/ferramentas/odds">calculadora de odds</A> para automatizar retorno, lucro, ROI e probabilidade implícita.</p></>,
  },
  {
    id: 'probabilidade-implicita',
    category: 'Odds',
    pages: ['global', 'odds', 'probabilidade-implicita-odds'],
    question: 'O que é probabilidade implícita nas odds e como calcular?',
    answerText: 'Probabilidade implícita é a probabilidade sugerida pela odd. Em odds decimais, calcule com 1 / odd × 100. Uma odd 2.00 equivale a 50%, odd 1.50 equivale a 66,67% e odd 3.00 equivale a 33,33%. Ela não é garantia de resultado, porque a casa inclui margem, o mercado muda e eventos esportivos têm incerteza. A métrica serve para comparar a cotação com sua própria estimativa de chance e entender se existe possível edge. A calculadora de odds e o conversor de odds ajudam a fazer essa leitura com menos erro.',
    answer: <><p>Probabilidade implícita é a chance sugerida pela cotação. Em odds decimais, calcule com <strong>1 / odd × 100</strong>. Uma odd 2.00 equivale a 50%, odd 1.50 equivale a 66,67% e odd 3.00 equivale a 33,33%.</p><p>Ela não é garantia de resultado, porque a casa inclui margem, o mercado muda e eventos esportivos têm incerteza. A métrica serve para comparar a cotação com sua própria estimativa de chance. Veja isso na <A to="/ferramentas/odds">calculadora de odds</A> ou converta formatos no <A to="/ferramentas/conversor">conversor de odds</A>.</p></>,
  },
  {
    id: 'casas-calculam-odds',
    category: 'Odds',
    pages: ['global', 'como-calcular-odds', 'probabilidade-implicita-odds'],
    question: 'Como as casas de apostas calculam as odds?',
    answerText: 'Casas de apostas partem de estimativas de probabilidade para cada resultado e transformam essas chances em odds. Depois ajustam as cotações conforme margem da casa, liquidez do mercado, exposição ao risco, notícias, comportamento dos apostadores e movimentação de outras casas. Por isso as odds podem subir ou cair antes e durante um evento. Também existe o overround: a soma das probabilidades implícitas normalmente passa de 100%, formando margem para a casa. A odd não é previsão garantida; é preço de mercado com margem e risco embutidos. Calcular probabilidade implícita ajuda a entender esse preço.',
    answer: <><p>Casas de apostas partem de estimativas de probabilidade para cada resultado e transformam essas chances em odds. Depois ajustam as cotações conforme margem da casa, liquidez, exposição ao risco, notícias, comportamento dos apostadores e movimentação de outras casas.</p><p>Por isso as odds podem subir ou cair antes e durante um evento. Também existe o <em>overround</em>: a soma das probabilidades implícitas normalmente passa de 100%, formando margem para a casa. A odd não é previsão garantida; é preço de mercado. Use a <A to="/ferramentas/odds">calculadora de odds</A> para visualizar a probabilidade implícita.</p></>,
  },
  {
    id: 'stake-banca',
    category: 'Gestão de banca',
    pages: ['global', 'gestao-de-banca', 'o-que-e-gestao-de-banca'],
    question: 'Quanto devo apostar em cada jogo para proteger minha banca?',
    answerText: 'Não existe valor universal. Uma referência conservadora comum é limitar cada stake a 1% ou 2% da banca, especialmente em fase de aprendizado ou quando a estimativa de probabilidade é incerta. Percentuais maiores aumentam o impacto de sequências negativas e podem acelerar perdas. A stake deve considerar perfil de risco, tamanho da banca, tipo de mercado, odds médias, histórico registrado e limites pessoais. Gestão de banca não garante lucro; ela apenas organiza exposição e reduz decisões impulsivas. Use a calculadora de gestão de banca e revise a página de jogo responsável antes de apostar valores reais.',
    answer: <><p>Não existe valor universal. Uma referência conservadora comum é limitar cada stake a <strong>1% ou 2% da banca</strong>, especialmente em fase de aprendizado ou quando a estimativa de probabilidade é incerta. Percentuais maiores aumentam o impacto de sequências negativas.</p><p>A stake deve considerar perfil de risco, tamanho da banca, mercado, odds médias, histórico registrado e limites pessoais. Gestão de banca não garante lucro; ela organiza exposição. Simule na <A to="/ferramentas/gestao-de-banca">calculadora de gestão de banca</A> e revise orientações de <A to="/jogo-responsavel">jogo responsável</A>.</p></>,
  },
  {
    id: 'bom-roi',
    category: 'ROI',
    pages: ['global', 'roi', 'roi-apostas'],
    question: 'O que é um bom ROI em apostas esportivas?',
    answerText: 'Um bom ROI depende de amostra, volume, risco, odds médias e mercados analisados. ROI positivo em poucas apostas pode ser apenas variância: uma vitória grande pode distorcer o percentual, assim como uma sequência ruim curta pode derrubar a métrica. Quanto maior e mais bem registrado for o histórico, mais útil o ROI se torna para avaliar consistência. Ainda assim, ROI passado não garante resultado futuro. O ideal é interpretar ROI junto com número de apostas, stake média, drawdown, estratégia e gestão de banca. A calculadora de ROI ajuda a padronizar a conta.',
    answer: <><p>Um bom ROI depende de amostra, volume, risco, odds médias e mercados analisados. ROI positivo em poucas apostas pode ser apenas variância: uma vitória grande pode distorcer o percentual, assim como uma sequência ruim curta pode derrubar a métrica.</p><p>Quanto maior e mais bem registrado for o histórico, mais útil o ROI se torna para avaliar consistência. Ainda assim, ROI passado não garante resultado futuro. Interprete junto com número de apostas, stake média, drawdown e gestão de banca. Use a <A to="/ferramentas/roi">calculadora de ROI</A> para padronizar a conta.</p></>,
  },
  {
    id: 'cashout-vale',
    category: 'Cash out',
    pages: ['global', 'cashout', 'cashout-apostas'],
    question: 'Cash out vale a pena? Como saber se devo aceitar?',
    answerText: 'Cash out pode valer a pena ou não dependendo do valor oferecido, retorno potencial, probabilidade atual estimada e objetivo de risco. Uma forma educativa é comparar o cash out com um valor esperado aproximado: probabilidade atual estimada × retorno potencial. Se a oferta estiver muito abaixo desse valor, pode haver desconto relevante. O cash out frequentemente inclui margem da casa e muda com odds ao vivo, tempo, placar e liquidez. Decidir apenas por medo pode ser ruim, assim como recusar sem considerar risco. A calculadora de cashout ajuda a comparar cenários.',
    answer: <><p>Cash out pode valer a pena ou não dependendo do valor oferecido, retorno potencial, probabilidade atual estimada e objetivo de risco. Uma forma educativa é comparar a oferta com um valor esperado aproximado: <strong>probabilidade atual estimada × retorno potencial</strong>.</p><p>Se a oferta estiver muito abaixo desse valor, pode haver desconto relevante. Cash out frequentemente inclui margem da casa e muda com odds ao vivo, tempo, placar e liquidez. Evite decidir apenas por medo. Compare cenários na <A to="/ferramentas/cashout">calculadora de cashout</A>.</p></>,
  },
  {
    id: 'surebet-crime',
    category: 'Arbitragem',
    pages: ['global', 'arbitragem', 'o-que-e-surebet'],
    question: 'Surebet é crime no Brasil?',
    answerText: 'Essa pergunta envolve interpretação legal, regras das plataformas e legislação vigente. Em termos matemáticos, arbitragem ou surebet é uma estratégia de cálculo que compara odds e distribui stakes entre resultados. Isso não significa que todas as práticas associadas sejam aceitas por casas de apostas ou isentas de risco regulatório. Plataformas podem ter termos próprios, limitar contas, anular apostas em certos casos ou restringir comportamentos. Leis e regulações também podem mudar. Este conteúdo é educativo e não é aconselhamento jurídico. Verifique a legislação atual, termos das casas e orientação profissional se necessário.',
    answer: <><p>Essa pergunta envolve interpretação legal, regras das plataformas e legislação vigente. Em termos matemáticos, arbitragem ou surebet é uma estratégia de cálculo que compara odds e distribui stakes entre resultados. Isso não significa que todas as práticas associadas sejam aceitas por casas ou isentas de risco regulatório.</p><p>Plataformas podem ter termos próprios, limitar contas, anular apostas em certos casos ou restringir comportamentos. Leis e regulações também podem mudar. Este conteúdo é educativo e <strong>não é aconselhamento jurídico</strong>. Verifique legislação atual, termos das casas e, se necessário, orientação profissional. Veja também <A to="/ferramentas/arbitragem">arbitragem</A> e <A to="/jogo-responsavel">jogo responsável</A>.</p></>,
  },
  {
    id: 'multipla-acertar-tudo',
    category: 'Múltiplas',
    pages: ['global', 'multipla', 'o-que-e-aposta-multipla'],
    question: 'Aposta múltipla tem que acertar tudo?',
    answerText: 'Em geral, sim. Na aposta múltipla tradicional, todas as seleções do bilhete precisam ser vencedoras para existir retorno. Se uma seleção perder, normalmente a múltipla inteira perde. Seleções anuladas, eventos adiados ou mercados cancelados podem ter regras específicas: muitas casas tratam a seleção anulada como odd 1.00, mas isso depende do regulamento e do mercado. Como as odds são multiplicadas, a múltipla aumenta o retorno potencial, mas também aumenta o risco, porque cada nova seleção adiciona mais uma condição de acerto. A calculadora de múltipla ajuda a simular a odd combinada.',
    answer: <><p>Em geral, sim. Na aposta múltipla tradicional, todas as seleções do bilhete precisam ser vencedoras para existir retorno. Se uma seleção perder, normalmente a múltipla inteira perde.</p><p>Seleções anuladas, eventos adiados ou mercados cancelados podem ter regras específicas: muitas casas tratam a seleção anulada como odd 1.00, mas isso depende do regulamento. Como as odds são multiplicadas, o retorno potencial cresce junto com o risco. Simule a odd combinada na <A to="/ferramentas/multipla">calculadora de aposta múltipla</A>.</p></>,
  },
  {
    id: 'edge',
    category: 'Odds',
    pages: ['global', 'odds', 'probabilidade-implicita-odds'],
    question: 'O que é edge em apostas esportivas?',
    answerText: 'Edge é uma possível vantagem matemática percebida pelo apostador quando sua estimativa de probabilidade é maior do que a probabilidade implícita da odd. Exemplo: se uma odd implica 40% de chance, mas sua análise estima 48%, existe um possível edge de 8 pontos percentuais. Isso não garante acerto na aposta nem lucro futuro, porque estimativas podem estar erradas e há variância. Edge exige método, histórico, controle de banca e revisão constante. A calculadora de odds ajuda a comparar probabilidade implícita e estimada, enquanto a calculadora de ROI acompanha resultados passados.',
    answer: <><p>Edge é uma possível vantagem matemática percebida quando sua estimativa de probabilidade é maior do que a probabilidade implícita da odd. Exemplo: se uma odd implica 40% de chance, mas sua análise estima 48%, existe um possível edge de 8 pontos percentuais.</p><p>Isso não garante acerto nem lucro futuro, porque estimativas podem estar erradas e há variância. Edge exige método, amostra, controle de banca e revisão constante. Compare probabilidades na <A to="/ferramentas/odds">calculadora de odds</A> e acompanhe resultados na <A to="/ferramentas/roi">calculadora de ROI</A>.</p></>,
  },
  {
    id: 'arbitragem-dutching',
    category: 'Arbitragem',
    pages: ['global', 'arbitragem', 'dutching', 'o-que-e-surebet', 'o-que-e-dutching'],
    question: 'Qual a diferença entre arbitragem e dutching?',
    answerText: 'Arbitragem ou surebet busca uma margem matemática entre odds de diferentes resultados, muitas vezes em casas diferentes, tentando cobrir todos os desfechos de um mercado com retorno positivo teórico. Dutching distribui a stake entre múltiplos resultados escolhidos para equilibrar retorno ou exposição, geralmente dentro de um mesmo mercado. As duas técnicas dependem de cálculo preciso, odds corretas e execução cuidadosa. Nenhuma elimina riscos operacionais: odds podem mudar, apostas podem ser limitadas, mercados podem ser anulados e regras podem variar. Use as calculadoras de arbitragem e dutching para simular antes de tomar decisões.',
    answer: <><p>Arbitragem, ou surebet, busca uma margem matemática entre odds de diferentes resultados — muitas vezes em casas diferentes — tentando cobrir todos os desfechos de um mercado com retorno positivo teórico. Dutching distribui a stake entre múltiplos resultados escolhidos para equilibrar retorno ou exposição, geralmente dentro de um mesmo mercado.</p><p>As duas técnicas dependem de cálculo preciso, odds corretas e execução cuidadosa. Nenhuma elimina riscos operacionais: odds podem mudar, apostas podem ser limitadas e regras podem variar. Simule na <A to="/ferramentas/arbitragem">calculadora de arbitragem</A> e na <A to="/ferramentas/dutching">calculadora de dutching</A>.</p></>,
  },
];

export const getSeoFaqsForPage = (page) => SEO_FAQS.filter(item => item.pages.includes(page));

export const toFaqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(item => ({
    '@type': 'Question',
    name: item.question || item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.answerText || item.answer || item.a },
  })),
});

export const toLegacyFaq = (item) => ({
  q: item.question,
  a: item.answer,
  answerText: item.answerText,
  category: item.category,
});
