export const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

export const casas = [
  {
    id: '1xbit',
    nome: '1XBIT',
    name: '1XBIT',
    logo: null,
    description: 'Apostas esportivas e cassino online com bônus de boas-vindas, incluindo opções de aposta em cripto.',
    desc: 'Apostas esportivas e cassino online com bônus de boas-vindas, incluindo opções de aposta em cripto.',
    bonus: 'Bônus de boas-vindas disponível conforme termos da plataforma',
    cta: 'Abrir conta',
    affiliateUrl: 'https://track.afiliapub.com/click?o=68&a=550220524&creative_id=161&tsource=1004',
    link: 'https://track.afiliapub.com/click?o=68&a=550220524&creative_id=161&tsource=1004',
    cor: '#22d3ee',
    licencaInfo: 'Verifique licença, termos e disponibilidade diretamente na plataforma.',
    destaque: 'Parceiro aprovado',
    complianceNote: '+18 · Publicidade · Link de afiliado',
    transparency: 'O CalculaBet pode receber comissão caso você se cadastre por links de parceiros. Verifique termos, bônus, regras e disponibilidade diretamente na plataforma. Aposte com responsabilidade.',
    banners: {
      '320x50': {
        href: 'https://track.afiliapub.com/click?o=68&a=550220524&creative_id=160',
        img: 'https://track.afiliapub.com/impression?creative_id=160&affiliate_id=550220524',
        width: 320,
        height: 50,
      },
      '300x250': {
        href: 'https://track.afiliapub.com/click?o=68&a=550220524&creative_id=159',
        img: 'https://track.afiliapub.com/impression?creative_id=159&affiliate_id=550220524',
        width: 300,
        height: 250,
      },
      '300x600': {
        href: 'https://track.afiliapub.com/click?o=68&a=550220524&creative_id=158',
        img: 'https://track.afiliapub.com/impression?creative_id=158&affiliate_id=550220524',
        width: 300,
        height: 600,
      },
    },
  },
];

export const parceiroDestaque = casas[0];

export const calculadoras = [
  { slug: 'odds',           nome: 'Calculadora de Odds',  icon: 'odds',           categoria: 'odds',       desc: 'Calcule retorno, lucro e probabilidade implícita de qualquer aposta em tempo real.' },
  { slug: 'aposta-simples', nome: 'Aposta Simples',        icon: 'aposta-simples', categoria: 'odds',       desc: 'Simule ganho, lucro, ROI e percentual de banca de apostas individuais.' },
  { slug: 'multipla-parlay',nome: 'Múltipla / Parlay',     icon: 'multipla-parlay',categoria: 'odds',       desc: 'Combine odds de múltiplas seleções e calcule retorno e risco da aposta.' },
  { slug: 'arbitragem',     nome: 'Arbitragem',            icon: 'arbitragem',     categoria: 'arbitragem', desc: 'Identifique e distribua stakes para lucro garantido em qualquer resultado.' },
  { slug: 'dutching',       nome: 'Dutching',              icon: 'dutching',       categoria: 'arbitragem', desc: 'Distribua stakes entre vários resultados mantendo lucro igual em todos.' },
  { slug: 'cashout',        nome: 'Cashout',               icon: 'cashout',        categoria: 'arbitragem', desc: 'Calcule o valor justo do cashout e compare com manter a aposta até o fim.' },
  { slug: 'hedge',          nome: 'Hedge',                 icon: 'hedge',          categoria: 'arbitragem', desc: 'Proteja seu lucro ou minimize prejuízo com apostas opostas estratégicas.' },
  { slug: 'gestao-banca',   nome: 'Gestão de Banca',       icon: 'gestao-banca',   categoria: 'gestao',     desc: 'Aplique Kelly Criterion, flat betting ou percentual fixo para crescer sua banca.' },
  { slug: 'martingale',     nome: 'Martingale',            icon: 'martingale',     categoria: 'gestao',     desc: 'Simule a estratégia de dobrar stakes e visualize o risco matemático real.' },
  { slug: 'conversor-odds', nome: 'Conversor de Odds',     icon: 'conversor-odds', categoria: 'conversao',  desc: 'Converta instantaneamente entre decimal, americana, fracionária e probabilidade.' },
  { slug: 'roi',            nome: 'ROI em Apostas',        icon: 'roi',            categoria: 'roi',        desc: 'Calcule o retorno sobre investimento e analise sua performance acumulada.' },
  { slug: 'simulador-lucro',nome: 'Simulador de Lucro',    icon: 'simulador-lucro',categoria: 'simulacao',  desc: 'Projete o crescimento da banca com simulação Monte Carlo e análise de variância.' },
];
