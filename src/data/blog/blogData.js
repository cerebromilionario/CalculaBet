export const BLOG_CATEGORIES = [
  {
    id: 'arbitragem',
    name: 'Arbitragem',
    description: 'Guias sobre surebet, arbitragem esportiva, odds diferentes e riscos operacionais.',
    icon: 'split',
    color: '#34d399',
  },
];

export const BLOG_POSTS = [
  {
    slug: 'o-que-e-surebet',
    title: 'O que é Surebet? Guia Completo de Arbitragem Esportiva',
    excerpt: 'Entenda o que é surebet, como funciona a arbitragem em apostas esportivas, quais são os riscos, exemplos práticos e como usar uma calculadora de surebet.',
    category: 'arbitragem',
    tags: ['o que é surebet', 'surebet', 'arbitragem esportiva', 'calculadora surebet', 'calculadora de arbitragem'],
    readingTime: '14 min',
    date: '2026-05-13',
    updatedAt: '2026-05-13',
    author: 'Equipe CalculaBet',
    relatedTool: { label: 'Calculadora de Arbitragem', href: '/ferramentas/arbitragem' },
    popularity: 100,
  },
];

export const BLOG_FAQS = [
  {
    question: 'O que vou encontrar no blog do CalculaBet?',
    answer: 'Você encontrará guias educativos sobre odds, probabilidades, gestão de banca, calculadoras, arbitragem, cashout, hedge e uso responsável de ferramentas. O objetivo é explicar conceitos e cálculos de forma clara, sem vender apostas como solução financeira.',
  },
  {
    question: 'O blog ensina a ganhar dinheiro com apostas?',
    answer: 'Não. O blog não promete lucro, renda ou resultados. Os conteúdos ajudam a entender matemática, riscos e boas práticas para tomar decisões mais informadas e responsáveis.',
  },
  {
    question: 'Como calcular odds em apostas esportivas?',
    answer: 'Em odds decimais, o retorno potencial é calculado multiplicando a stake pela odd. O lucro líquido é o retorno menos a stake. Você também pode usar a Calculadora de Odds para visualizar retorno e probabilidade implícita.',
  },
  {
    question: 'O que é gestão de banca?',
    answer: 'Gestão de banca é o processo de definir orçamento, limites de exposição e tamanho de stake antes de apostar. Ela ajuda a controlar risco financeiro, mas não elimina a possibilidade de perdas.',
  },
  {
    question: 'Como usar calculadoras de apostas?',
    answer: 'Insira valores como stake, odds e número de seleções para simular cenários. Use os resultados para compreender cálculos e riscos, não como recomendação automática de aposta.',
  },
  {
    question: 'O que é uma aposta múltipla?',
    answer: 'Aposta múltipla combina dois ou mais eventos no mesmo bilhete. As odds são multiplicadas, mas todas as seleções precisam ser vencedoras para o bilhete retornar, aumentando a variância.',
  },
  {
    question: 'O que é arbitragem em apostas?',
    answer: 'Arbitragem é a tentativa de distribuir stakes entre resultados diferentes quando as odds combinadas indicam uma margem favorável. Na prática, limites, mudanças de odds e regras das casas podem afetar o resultado.',
  },
  {
    question: 'O que é cashout?',
    answer: 'Cashout é a possibilidade de encerrar uma aposta antes do fim por um valor oferecido. Comparar esse valor com um cálculo justo ajuda a entender o trade-off entre reduzir risco e manter exposição.',
  },
  {
    question: 'Apostas esportivas são investimento?',
    answer: 'Não devem ser tratadas como investimento ou renda garantida. Apostas envolvem risco financeiro, variância e possibilidade real de perda. O CalculaBet mantém foco educativo e recomenda limites responsáveis.',
  },
  {
    question: 'Como apostar com mais responsabilidade?',
    answer: 'Defina limites de dinheiro e tempo, evite tentar recuperar perdas, não aposte sob pressão emocional e procure ajuda se perder o controle. Consulte a página de Jogo Responsável para orientações adicionais.',
  },
];

export function getCategoryById(id) {
  return BLOG_CATEGORIES.find(category => category.id === id);
}

export function getPostBySlug(slug) {
  return BLOG_POSTS.find(post => post.slug === slug);
}

export function getRelatedPosts(post, limit = 3) {
  return BLOG_POSTS
    .filter(item => item.slug !== post.slug && (item.category === post.category || item.tags.some(tag => post.tags.includes(tag))))
    .slice(0, limit);
}
