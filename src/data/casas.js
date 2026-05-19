export const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer';

export const AFFILIATE_DISCLOSURE_SHORT = 'Publicidade • Link de afiliado • +18';

export const AFFILIATE_DISCLOSURE_FULL =
  'O CalculaBet pode receber comissão caso você se cadastre por links de parceiros. As ofertas, bônus e condições podem mudar. Verifique sempre os termos, regras, licença, disponibilidade regional e requisitos diretamente na plataforma parceira. Aposte com responsabilidade.';

const defaultDisclaimer =
  'Verifique termos, bônus, regras, licença, disponibilidade regional e requisitos diretamente na plataforma parceira. Aposte com responsabilidade.';

export const casas = [
  {
    id: '1xbit',
    name: '1XBIT',
    nome: '1XBIT',
    initials: '1X',
    logo: { src: '/logos/partners/1xbit-logo.svg', alt: 'Logo 1XBIT' },
    category: 'Apostas esportivas e cripto',
    description: 'Apostas esportivas e cassino online com bônus de boas-vindas e opções de aposta em cripto.',
    desc: 'Apostas esportivas e cassino online com bônus de boas-vindas e opções de aposta em cripto.',
    bonus: 'Oferta de boas-vindas disponível conforme termos da plataforma',
    cta: 'Abrir conta',
    affiliateUrl: 'https://track.afiliapub.com/click?o=68&a=550220524&creative_id=161&tsource=1004',
    link: 'https://track.afiliapub.com/click?o=68&a=550220524&creative_id=161&tsource=1004',
    disclaimer: defaultDisclaimer,
    cor: '#22d3ee',
    licencaInfo: 'Verifique licença, termos e disponibilidade diretamente na plataforma.',
    destaque: 'Parceiro aprovado',
    complianceNote: '+18 · Publicidade · Link de afiliado',
    transparency: AFFILIATE_DISCLOSURE_FULL,
    featured: true,
    active: true,
    priority: 10,
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
  {
    id: 'blaze',
    name: 'Blaze',
    nome: 'Blaze',
    initials: 'BZ',
    logo: { src: '/logos/partners/blaze-logo.svg', alt: 'Logo Blaze' },
    category: 'Apostas esportivas e cassino online',
    description: 'Plataforma de apostas esportivas e jogos online com oferta de boas-vindas para novos usuários.',
    desc: 'Plataforma de apostas esportivas e jogos online com oferta de boas-vindas para novos usuários.',
    bonus: 'Oferta de boas-vindas para novos usuários conforme termos da plataforma',
    cta: 'Abrir conta',
    affiliateUrl: 'https://blaze.cxclick.com/visit/?bta=53199&nci=5484',
    link: 'https://blaze.cxclick.com/visit/?bta=53199&nci=5484',
    disclaimer: defaultDisclaimer,
    cor: '#f97316',
    licencaInfo: 'Verifique licença, termos e disponibilidade diretamente na plataforma.',
    destaque: 'Parceiro aprovado',
    complianceNote: '+18 · Publicidade · Link de afiliado',
    transparency: AFFILIATE_DISCLOSURE_FULL,
    featured: true,
    active: true,
    priority: 20,
    affiliateEnabled: true,
    bannersEnabled: true,
    banners: {
      large: {
        href: 'https://blaze.cxclick.com/visit/?bta=53199&nci=5459',
        img: 'https://blazepartners.ck-cdn.com/tn/serve/?cid=858708',
      },
      '320x50': {
        href: 'https://blaze.cxclick.com/visit/?bta=53199&nci=5461',
        img: 'https://blazepartners.ck-cdn.com/tn/serve/?cid=858717',
        width: 320,
        height: 50,
      },
    },
  },
  {
    id: 'superbet',
    name: 'Superbet',
    nome: 'Superbet',
    initials: 'SB',
    logo: { src: '/logos/partners/superbet-logo.svg', alt: 'Logo Superbet' },
    category: 'Apostas esportivas',
    description: 'Casa de apostas esportivas com mercados populares e campanhas promocionais para usuários brasileiros.',
    desc: 'Casa de apostas esportivas com mercados populares e campanhas promocionais para usuários brasileiros.',
    bonus: 'Campanhas promocionais para usuários brasileiros conforme termos da plataforma',
    cta: 'Abrir conta',
    affiliateUrl: 'https://track.afiliapub.com/click?o=11&a=550220524&tsource=1004',
    link: 'https://track.afiliapub.com/click?o=11&a=550220524&tsource=1004',
    disclaimer: defaultDisclaimer,
    cor: '#ef4444',
    licencaInfo: 'Verifique licença, termos e disponibilidade diretamente na plataforma.',
    destaque: 'Parceiro aprovado',
    complianceNote: '+18 · Publicidade · Link de afiliado',
    transparency: AFFILIATE_DISCLOSURE_FULL,
    featured: true,
    active: true,
    affiliateEnabled: true,
    bannersEnabled: true,
    priority: 30,
    banners: {
      '160x600': {
        href: 'https://track.afiliapub.com/click?o=11&a=550220524&creative_id=246',
        img: 'https://track.afiliapub.com/impression?creative_id=246&affiliate_id=550220524',
        width: 160,
        height: 600,
      },
      '1920x1080': {
        href: 'https://track.afiliapub.com/click?o=11&a=550220524&creative_id=245',
        img: 'https://track.afiliapub.com/impression?creative_id=245&affiliate_id=550220524',
        width: 1920,
        height: 1080,
      },
      '728x90': {
        href: 'https://track.afiliapub.com/click?o=11&a=550220524&creative_id=12',
        img: 'https://track.afiliapub.com/impression?creative_id=12&affiliate_id=550220524',
        width: 728,
        height: 90,
      },
    },
  },
  {
    id: 'melbet',
    name: 'Melbet',
    nome: 'Melbet',
    initials: 'MB',
    logo: { src: '/logos/partners/melbet-logo.svg', alt: 'Logo Melbet' },
    category: 'Apostas esportivas',
    description: 'Plataforma de apostas esportivas com campanhas para o mercado brasileiro e diferentes formatos promocionais.',
    desc: 'Plataforma de apostas esportivas com campanhas para o mercado brasileiro e diferentes formatos promocionais.',
    bonus: 'Campanhas para o mercado brasileiro conforme termos da plataforma',
    cta: 'Abrir conta',
    affiliateUrl: null,
    link: null,
    disclaimer: defaultDisclaimer,
    cor: '#facc15',
    licencaInfo: 'Verifique licença, termos e disponibilidade diretamente na plataforma.',
    destaque: 'Parceiro aprovado',
    complianceNote: '+18 · Publicidade · Link de afiliado',
    transparency: AFFILIATE_DISCLOSURE_FULL,
    featured: true,
    active: true,
    affiliateEnabled: false,
    bannersEnabled: false,
    status: 'link_updating',
    priority: 40,
    banners: {},
  },
  {
    id: 'stake',
    name: 'Stake',
    nome: 'Stake',
    initials: 'ST',
    logo: { src: '/logos/partners/stake-logo.svg', alt: 'Logo Stake' },
    category: 'Apostas esportivas e cripto',
    description: 'Plataforma internacional de apostas e jogos online com foco em experiência digital e opções relacionadas a cripto.',
    desc: 'Plataforma internacional de apostas e jogos online com foco em experiência digital e opções relacionadas a cripto.',
    bonus: 'Conta disponível pelo parceiro; confira condições diretamente na plataforma',
    cta: 'Abrir conta',
    affiliateUrl: 'https://track.afiliapub.com/click?o=82&a=550220524&link_id=463',
    signupUrl: 'https://track.afiliapub.com/click?o=82&a=550220524&link_id=463',
    link: 'https://track.afiliapub.com/click?o=82&a=550220524',
    disclaimer: defaultDisclaimer,
    cor: '#10b981',
    licencaInfo: 'Verifique licença, termos e disponibilidade diretamente na plataforma.',
    destaque: 'Parceiro aprovado',
    complianceNote: '+18 · Publicidade · Link de afiliado',
    transparency: AFFILIATE_DISCLOSURE_FULL,
    featured: true,
    active: true,
    priority: 50,
    banners: {},
  },
  {
    id: 'winhugo',
    name: 'Winhugo',
    nome: 'Winhugo',
    initials: 'WH',
    logo: { src: '/logos/partners/winhugo-logo.svg', alt: 'Logo Winhugo' },
    category: 'Apostas esportivas',
    description: 'Casa de apostas online com mercados esportivos e campanhas promocionais para usuários.',
    desc: 'Casa de apostas online com mercados esportivos e campanhas promocionais para usuários.',
    bonus: 'Campanhas promocionais para usuários conforme termos da plataforma',
    cta: 'Abrir conta',
    affiliateUrl: 'https://www.gambling-affiliation.com/cpc/v=1XkPG9tiPZRMnubCdwoygh.VYCZuOEPBOXCFfGNegTI_GA7331V2&aff_var_1=',
    link: 'https://www.gambling-affiliation.com/cpc/v=1XkPG9tiPZRMnubCdwoygh.VYCZuOEPBOXCFfGNegTI_GA7331V2&aff_var_1=',
    disclaimer: defaultDisclaimer,
    cor: '#38bdf8',
    licencaInfo: 'Verifique termos, regras, bônus, licença, disponibilidade regional e requisitos diretamente na plataforma.',
    destaque: 'Parceiro aprovado',
    complianceNote: '+18 · Publicidade · Link de afiliado',
    transparency: AFFILIATE_DISCLOSURE_FULL,
    featured: false,
    active: true,
    affiliateEnabled: true,
    bannersEnabled: false,
    rotationEnabled: false,
    priority: 55,
    banners: {},
  },
  {
    id: 'betsson-br',
    name: 'Betsson BR',
    nome: 'Betsson BR',
    initials: 'BS',
    category: 'Apostas esportivas e cassino online',
    description: 'Casa de apostas e jogos online com atuação no Brasil e campanhas promocionais para usuários.',
    desc: 'Casa de apostas e jogos online com atuação no Brasil e campanhas promocionais para usuários.',
    bonus: 'Campanhas promocionais para usuários conforme termos da plataforma',
    cta: 'Abrir conta',
    affiliateUrl: 'https://record.betsson.bet.br/_qzwz9Em4P0nP6q2yKP81ZmNd7ZgqdRLk/1/',
    link: 'https://record.betsson.bet.br/_qzwz9Em4P0nP6q2yKP81ZmNd7ZgqdRLk/1/',
    disclaimer: defaultDisclaimer,
    cor: '#1565c0',
    licencaInfo: 'Verifique licença, termos e disponibilidade diretamente na plataforma.',
    destaque: 'Parceiro aprovado',
    complianceNote: '+18 · Publicidade · Link de afiliado',
    transparency: AFFILIATE_DISCLOSURE_FULL,
    featured: false,
    active: true,
    affiliateEnabled: true,
    bannersEnabled: false,
    rotationEnabled: false,
    priority: 62,
    banners: {},
  },
  {
    id: 'brazino777',
    name: 'BRAZINO 777',
    nome: 'BRAZINO 777',
    initials: 'B7',
    logo: { src: '/logos/partners/brazino777-logo.svg', alt: 'Logo BRAZINO 777' },
    category: 'Apostas esportivas e cassino online',
    description: 'Plataforma de apostas e jogos online com campanhas promocionais para usuários.',
    desc: 'Plataforma de apostas e jogos online com campanhas promocionais para usuários.',
    bonus: 'Campanhas promocionais para usuários conforme termos da plataforma',
    cta: 'Abrir conta',
    affiliateUrl: 'https://track.afiliapub.com/click?o=70&a=550220524',
    link: 'https://track.afiliapub.com/click?o=70&a=550220524',
    disclaimer: defaultDisclaimer,
    cor: '#2d7d32',
    licencaInfo: 'Verifique licença, termos e disponibilidade diretamente na plataforma.',
    destaque: 'Parceiro aprovado',
    complianceNote: '+18 · Publicidade · Link de afiliado',
    transparency: AFFILIATE_DISCLOSURE_FULL,
    featured: false,
    active: true,
    affiliateEnabled: true,
    bannersEnabled: false,
    rotationEnabled: false,
    priority: 65,
    banners: {},
  },
  {
    id: 'betobet',
    name: 'BETOBET',
    nome: 'BETOBET',
    initials: 'BO',
    logo: { src: '/logos/partners/betobet-logo.svg', alt: 'Logo BETOBET' },
    category: 'Apostas esportivas',
    description: 'Plataforma de apostas esportivas com campanhas promocionais e experiência voltada para usuários brasileiros.',
    desc: 'Plataforma de apostas esportivas com campanhas promocionais e experiência voltada para usuários brasileiros.',
    bonus: 'Campanhas promocionais para usuários brasileiros conforme termos da plataforma',
    cta: 'Abrir conta',
    affiliateUrl: null,
    link: null,
    disclaimer: defaultDisclaimer,
    cor: '#a855f7',
    licencaInfo: 'Verifique licença, termos e disponibilidade diretamente na plataforma.',
    destaque: 'Parceiro aprovado',
    complianceNote: '+18 · Publicidade · Link de afiliado',
    transparency: AFFILIATE_DISCLOSURE_FULL,
    featured: true,
    active: true,
    affiliateEnabled: false,
    bannersEnabled: false,
    status: 'link_updating',
    priority: 60,
    banners: {},
  },
];

// Trading/forex partners intentionally excluded from CalculaBet betting partner list to preserve niche focus.
export const activePartners = casas
  .filter(partner => partner.active)
  .sort((a, b) => a.priority - b.priority);

export const parceiroDestaque = activePartners[0];

export function getPartnerById(id) {
  return activePartners.find(partner => partner.id === id);
}

export function stablePartnerIndex(seed = '') {
  return String(seed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % activePartners.length;
}

function selectPartnersFromPool(pool, seed = 'default', count = 2) {
  if (pool.length <= count) return pool;

  const start = String(seed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % pool.length;
  const partners = [];

  for (let offset = 0; partners.length < count && offset < pool.length; offset += 1) {
    const partner = pool[(start + offset) % pool.length];
    if (!partners.some(item => item.id === partner.id)) partners.push(partner);
  }

  return partners;
}

export function getPartnersForPlacement(seed = 'default', count = 2) {
  const placementPartners = activePartners.filter(partner => partner.rotationEnabled !== false);

  return selectPartnersFromPool(placementPartners, seed, count);
}

const TOOL_PARTNER_IDS = new Set(['1xbit', 'superbet', 'blaze', 'stake']);

export function getToolPartnersForPlacement(seed = 'default', count = 2) {
  const toolPartners = activePartners.filter(partner => TOOL_PARTNER_IDS.has(partner.id) && isAffiliateEnabled(partner));

  return selectPartnersFromPool(toolPartners, seed, count);
}

export function isAffiliateEnabled(partner) {
  return Boolean(partner?.affiliateUrl) && partner.affiliateEnabled !== false;
}

function isValidBannerEntry(banner) {
  return Boolean(
    banner &&
    typeof banner.href === 'string' &&
    banner.href.trim() &&
    typeof banner.img === 'string' &&
    banner.img.trim(),
  );
}

export function isBannerEnabled(partner) {
  if (!partner || partner.affiliateEnabled === false || partner.bannersEnabled === false) return false;
  return Object.values(partner.banners || {}).some(isValidBannerEntry);
}

export const bannerFallbackPartners = activePartners.filter(partner => (
  ['blaze', 'superbet'].includes(partner.id) && isBannerEnabled(partner)
));

export const bannerPartners = activePartners.filter(isBannerEnabled);

export function getPreferredBanner(partner, preferredSizes = []) {
  if (!isBannerEnabled(partner)) return null;

  const banners = partner.banners || {};
  const preferred = preferredSizes.find(size => isValidBannerEntry(banners[size]));
  if (preferred) return { ...banners[preferred], size: preferred };

  const fallbackSize = Object.keys(banners).find(size => isValidBannerEntry(banners[size]));
  return fallbackSize ? { ...banners[fallbackSize], size: fallbackSize } : null;
}

export function getBannerPartner(partner, preferredSizes = [], excludedPartnerIds = []) {
  if (getPreferredBanner(partner, preferredSizes)) return partner;

  const excluded = new Set([partner?.id, ...excludedPartnerIds].filter(Boolean));
  return (
    bannerFallbackPartners.find(fallback => !excluded.has(fallback.id) && getPreferredBanner(fallback, preferredSizes)) ||
    bannerFallbackPartners.find(fallback => getPreferredBanner(fallback, preferredSizes)) ||
    bannerPartners.find(fallback => !excluded.has(fallback.id) && getPreferredBanner(fallback, preferredSizes)) ||
    bannerPartners.find(fallback => getPreferredBanner(fallback, preferredSizes)) ||
    null
  );
}

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
  { slug: 'overround',      nome: 'Margem da Casa',        icon: 'overround',      categoria: 'odds',       desc: 'Calcule o overround, payout teórico e odds justas de qualquer mercado de apostas.' },
];
