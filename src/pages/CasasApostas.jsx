import { Link } from 'react-router-dom';
import SEOHead from '../components/ui/SEOHead';
import CasaCard from '../components/ui/CasaCard';
import AffiliateBanner from '../components/ui/AffiliateBanner';
import AffiliateDisclosure from '../components/ui/AffiliateDisclosure';
import FAQSection from '../components/ui/FAQSection';
import { AFFILIATE_DISCLOSURE_FULL, casas } from '../data/casas';
import { BLOG_POSTS } from '../data/blog/blogData';
import AdNativeBanner from '../components/ads/AdNativeBanner';

const canonicalUrl = 'https://calculabet.site/casas-apostas';

const existingBlogSlugs = new Set(BLOG_POSTS.map(post => post.slug));
const blogLinks = [
  { slug: 'apostas-esportivas-para-iniciantes', title: 'Apostas esportivas para iniciantes', desc: 'Conceitos básicos, riscos, odds, banca e primeiros cuidados antes de apostar.' },
  { slug: 'como-calcular-retorno-de-aposta', title: 'Como calcular retorno de aposta', desc: 'Aprenda a estimar retorno potencial, lucro líquido e stake com exemplos.' },
  { slug: 'como-calcular-odds', title: 'Como calcular odds', desc: 'Entenda odds decimais, probabilidade implícita e leitura das cotações.' },
  { slug: 'odds-decimais-americanas-fracionarias', title: 'Odds decimais, americanas e fracionárias', desc: 'Compare formatos de odds e veja como converter cada modelo.' },
  { slug: 'probabilidade-implicita-odds', title: 'Probabilidade implícita nas odds', desc: 'Veja como transformar odds em probabilidade estimada e interpretar margem.' },
  { slug: 'o-que-e-gestao-de-banca', title: 'O que é gestão de banca', desc: 'Guia sobre banca, stake, limites e controle de risco em apostas.' },
  { slug: 'o-que-e-aposta-multipla', title: 'O que é aposta múltipla', desc: 'Entenda odds combinadas, retorno potencial e riscos de múltiplas.' },
  { slug: 'roi-apostas', title: 'ROI em apostas', desc: 'Aprenda a calcular retorno sobre investimento e registrar resultados.' },
  { slug: 'cashout-apostas', title: 'Cashout em apostas', desc: 'Entenda quando o encerramento antecipado altera retorno e risco.' },
  { slug: 'value-bet-o-que-e', title: 'Value bet: o que é', desc: 'Conteúdo educativo sobre valor esperado, preço e análise probabilística.' },
].filter(item => existingBlogSlugs.has(item.slug));

const toolCards = [
  { title: 'Calculadora de Odds', href: '/ferramentas/odds', desc: 'Calcule retorno potencial, lucro líquido e probabilidade implícita a partir das odds.' },
  { title: 'Conversor de Odds', href: '/ferramentas/conversor', desc: 'Converta odds decimais, americanas e fracionárias sem fazer contas manuais.' },
  { title: 'Calculadora de Aposta Múltipla', href: '/ferramentas/multipla', desc: 'Combine seleções, entenda odds acumuladas e veja o risco de múltiplas.' },
  { title: 'Gestão de Banca', href: '/ferramentas/gestao-de-banca', desc: 'Planeje stake, limites e exposição antes de usar sites de apostas esportivas.' },
  { title: 'Calculadora de ROI', href: '/ferramentas/roi', desc: 'Acompanhe retorno sobre investimento, lucro líquido e performance de forma educativa.' },
  { title: 'Calculadora de Cashout', href: '/ferramentas/cashout', desc: 'Compare oferta de cashout com retorno potencial e cenário de hedge.' },
  { title: 'Calculadora de Arbitragem', href: '/ferramentas/arbitragem', desc: 'Simule divisão de stakes entre odds diferentes e entenda riscos operacionais.' },
  { title: 'Calculadora de Dutching', href: '/ferramentas/dutching', desc: 'Distribua stakes entre resultados para visualizar exposição e retorno potencial.' },
];

const verificationItems = [
  'Termos de uso e regras gerais da plataforma.',
  'Política de bônus, requisitos de rollover e restrições de saque.',
  'Métodos de depósito e saque, incluindo eventual disponibilidade de Pix.',
  'Prazo de saque, limites mínimos e máximos e exigências de titularidade.',
  'Canais de suporte, horários de atendimento e qualidade das respostas.',
  'Mercados esportivos disponíveis, modalidades, ligas e tipos de aposta.',
  'Odds oferecidas, formato das cotações e consistência entre eventos.',
  'Limites de aposta, limites por mercado e regras para apostas ao vivo.',
  'Ferramentas de jogo responsável, limites, pausas e autoexclusão.',
  'Disponibilidade regional e regras aplicáveis ao seu local de residência.',
  'Processo de conta, documentos, verificação de identidade e KYC.',
];

const checklistItems = [
  'Li os termos da plataforma?',
  'Entendi as regras do bônus?',
  'Verifiquei métodos de depósito e saque?',
  'Sei quanto posso perder sem comprometer finanças?',
  'Defini uma banca?',
  'Sei calcular retorno e lucro?',
  'Entendi as odds?',
  'Sei onde buscar ajuda se perder controle?',
];

const faqItems = [
  {
    question: 'O que são casas de apostas?',
    answer: 'Casas de apostas são plataformas que oferecem mercados para apostas esportivas online e, em alguns casos, outros produtos. Elas definem regras, odds, métodos de pagamento, limites e processos de verificação próprios. O usuário deve ler os termos diretamente na plataforma antes de criar conta.',
  },
  {
    question: 'Como escolher uma casa de apostas?',
    answer: 'Para escolher uma casa de apostas, compare termos de uso, política de bônus, métodos de depósito e saque, suporte, mercados esportivos, odds, limites, reputação, ferramentas de jogo responsável e disponibilidade regional. Não escolha apenas pelo bônus e não considere nenhuma oferta como garantia de ganho.',
  },
  {
    question: 'Casas de apostas com Pix são melhores?',
    answer: 'Casas de apostas com Pix podem ser convenientes para usuários no Brasil, mas Pix não torna uma plataforma automaticamente melhor. É importante verificar prazos de depósito e saque, titularidade, regras de saque, limites, suporte e condições completas antes de movimentar dinheiro.',
  },
  {
    question: 'O que devo verificar antes de abrir conta em uma casa de apostas?',
    answer: 'Verifique termos de uso, regras de bônus, rollover, odds mínimas, prazo para uso de promoções, métodos de pagamento, limites, suporte, disponibilidade regional, KYC, política de privacidade e recursos de jogo responsável. Também defina previamente uma banca que não comprometa despesas essenciais.',
  },
  {
    question: 'Como funcionam bônus de casas de apostas?',
    answer: 'Bônus podem aparecer como ofertas de boas-vindas, free bets, cashback, apostas grátis ou promoções temporárias. Cada oferta costuma ter requisitos, como rollover, odds mínimas, prazo de utilização, mercados válidos e restrições de saque. Leia sempre os termos antes de aceitar qualquer promoção.',
  },
  {
    question: 'O que é rollover em bônus de apostas?',
    answer: 'Rollover é uma exigência de movimentação associada a um bônus. Em geral, indica quantas vezes determinado valor precisa ser apostado antes que algum saldo promocional ou ganho associado possa ficar disponível para saque. As regras variam por plataforma e promoção.',
  },
  {
    question: 'Odds maiores significam uma aposta melhor?',
    answer: 'Não necessariamente. Odds maiores indicam retorno potencial maior, mas também podem refletir menor probabilidade estimada de ocorrência. Uma decisão responsável considera probabilidade implícita, risco, gestão de banca, regras do mercado e o contexto do evento, não apenas a cotação mais alta.',
  },
  {
    question: 'Como calcular retorno antes de apostar?',
    answer: 'Em odds decimais, o retorno potencial é calculado multiplicando a stake pela odd. O lucro potencial é o retorno menos a stake. A Calculadora de Odds do CalculaBet ajuda a visualizar retorno, lucro e probabilidade implícita sem substituir análise própria nem prever resultados.',
  },
  {
    question: 'O CalculaBet é uma casa de apostas?',
    answer: 'Não. O CalculaBet não aceita apostas, não processa pagamentos, não define odds, não opera jogos e não guarda saldo de usuários. O site oferece ferramentas, calculadoras, comparações informativas e conteúdo educativo para apoiar análise responsável.',
  },
  {
    question: 'O que são links afiliados?',
    answer: 'Links afiliados são links de parceiros que podem gerar comissão para o CalculaBet caso o usuário se cadastre ou realize uma ação qualificada na plataforma parceira. O usuário não deve pagar a mais por isso, e as condições de bônus, conta e saque são definidas pela própria plataforma.',
  },
  {
    question: 'Apostas esportivas são investimento?',
    answer: 'Apostas esportivas não devem ser tratadas como investimento. Elas envolvem risco financeiro, possibilidade de perda integral da stake e não oferecem garantia de retorno. Use apenas valores que você pode perder sem comprometer orçamento, dívidas, contas essenciais ou bem-estar.',
  },
  {
    question: 'Como apostar com responsabilidade?',
    answer: 'Aposte com responsabilidade definindo limites de tempo e dinheiro, separando uma banca, evitando recuperar perdas, lendo regras, usando ferramentas de cálculo e fazendo pausas. Se perceber perda de controle, procure recursos de ajuda e utilize ferramentas de bloqueio ou autoexclusão.',
  },
  {
    question: 'Por que usar uma calculadora de odds?',
    answer: 'Uma calculadora de odds reduz erros manuais e ajuda a entender retorno potencial, lucro líquido e probabilidade implícita antes da aposta. Ela é uma ferramenta educativa: organiza números, mas não prevê resultados e não garante que uma aposta seja adequada.',
  },
  {
    question: 'Como controlar minha banca em casas de apostas?',
    answer: 'Controle a banca separando um valor específico para apostas, definindo stake por percentual conservador, registrando resultados, evitando aumentar valor por emoção e interrompendo quando atingir limites. A gestão de banca serve para reduzir exposição, não para eliminar riscos.',
  },
];

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: 'Casas de Apostas: Como Comparar Plataformas, Bônus e Odds',
      description: 'Compare casas de apostas parceiras, entenda como avaliar bônus, Pix, odds, termos, saque, segurança e use ferramentas do CalculaBet antes de apostar.',
      inLanguage: 'pt-BR',
      isPartOf: {
        '@type': 'WebSite',
        name: 'CalculaBet',
        url: 'https://calculabet.site',
      },
      breadcrumb: {
        '@id': `${canonicalUrl}#breadcrumb`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: 'https://calculabet.site/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Casas de Apostas',
          item: canonicalUrl,
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
};

function SeoSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-3xl p-6 md:p-8" style={{ background: 'rgba(255,255,255,0.024)', border: '1px solid var(--border)' }}>
      <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>{title}</h2>
      <div className="space-y-4 text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
        {children}
      </div>
    </section>
  );
}

function InlineLink({ to, children }) {
  return <Link className="font-semibold underline decoration-cyan-300/40 underline-offset-4 hover:text-cyan-200" style={{ color: '#67e8f9' }} to={to}>{children}</Link>;
}

export default function CasasApostas() {
  const heroPartner = casas.find(casa => casa.id === 'blaze') || casas[0];
  const bannerPartners = casas.filter(casa => Object.keys(casa.banners || {}).length > 0).slice(0, 2);

  return (
    <>
      <SEOHead
        title="Casas de Apostas: Como Comparar Plataformas, Bônus e Odds"
        description="Compare casas de apostas parceiras, entenda como avaliar bônus, Pix, odds, termos, saque, segurança e use ferramentas do CalculaBet antes de apostar."
        canonical={canonicalUrl}
        ogTitle="Casas de Apostas: Compare Plataformas e Ferramentas"
        ogDescription="Veja casas parceiras, entenda critérios de escolha, bônus, odds, gestão de banca e jogo responsável."
        ogType="website"
        schema={pageSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AdNativeBanner />

        <section className="mt-10 mb-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-8 items-center" aria-labelledby="casas-title">
          <div>
            <span className="badge-green badge mb-4">Parceiros aprovados · +18 · Jogo responsável</span>
            <h1 id="casas-title" className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.04em' }}>
              Casas parceiras para comparar com responsabilidade
            </h1>
            <p className="text-base max-w-3xl leading-relaxed" style={{ color: 'var(--text-2)' }}>
              O CalculaBet lista somente plataformas aprovadas para o contexto de apostas esportivas e mantém foco em ferramentas, educação e cálculo. Antes de abrir conta, verifique termos, bônus, regras, licença, disponibilidade regional e requisitos diretamente em cada plataforma.
            </p>
            <div
              className="inline-flex flex-wrap items-center gap-2 mt-4 px-3 py-1.5 rounded-lg text-xs"
              style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', color: '#fbbf24' }}
            >
              ⚠️ Publicidade • Links de afiliado • +18 • Aposte com responsabilidade
            </div>
          </div>

          <div className="rounded-3xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
            <AffiliateBanner partner={heroPartner} placement="casas" preferredSizes={['1400x400', '1200x628', '770x436', '800x360', '728x90']} />
            <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              Banner promocional exibido de forma responsiva. Ofertas e condições podem mudar sem aviso no CalculaBet.
            </p>
          </div>
        </section>

        <AffiliateDisclosure />

        <section className="mt-8" aria-labelledby="grid-parceiros">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                6 plataformas aprovadas
              </p>
              <h2 id="grid-parceiros" className="section-title">Parceiros ativos</h2>
            </div>
            <p className="text-xs max-w-sm" style={{ color: 'var(--text-3)' }}>
              Lista curada para manter o foco em apostas esportivas, ferramentas e uso responsável.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {casas.map(casa => <CasaCard key={casa.id} casa={casa} />)}
          </div>
        </section>

        {bannerPartners.length > 0 && (
          <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5" aria-label="Banners promocionais de parceiros">
            {bannerPartners.map(partner => (
              <div
                key={partner.id}
                className="rounded-2xl p-4"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
              >
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Publicidade • {partner.nome}
                </p>
                <AffiliateBanner partner={partner} placement="content" />
              </div>
            ))}
          </section>
        )}

        <section
          className="rounded-2xl p-6 md:p-8 mt-10"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          aria-labelledby="transparencia-parceiros"
        >
          <h2 id="transparencia-parceiros" className="text-lg font-bold mb-4" style={{ color: 'var(--text-1)' }}>Transparência, termos e jogo responsável</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: '+18', desc: 'Apostas são destinadas exclusivamente a maiores de 18 anos.' },
              { title: 'Afiliado', desc: 'O CalculaBet pode receber comissão caso você se cadastre por links de parceiros.' },
              { title: 'Termos', desc: 'Verifique termos, bônus, regras, licença e disponibilidade diretamente na plataforma parceira.' },
            ].map(item => (
              <div
                key={item.title}
                className="rounded-xl p-4"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}
              >
                <p className="text-sm font-semibold mb-2" style={{ color: '#22d3ee' }}>{item.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed mt-5" style={{ color: 'var(--text-2)' }}>
            {AFFILIATE_DISCLOSURE_FULL} Apostas envolvem riscos financeiros. Não há garantia de ganhos. Use as ferramentas do CalculaBet para análise educacional, defina limites e aposte apenas valores que você pode perder sem comprometer seu orçamento.
          </p>
        </section>

        <article className="mt-16 space-y-8" aria-labelledby="como-escolher">
          <SeoSection id="como-escolher" title="Como escolher uma casa de apostas com mais segurança">
            <p>
              Esta página reúne casas de apostas parceiras e um conteúdo pilar para quem deseja comparar plataformas de apostas com mais critério. O objetivo não é prometer lucro, indicar uma opção como perfeita ou incentivar decisões impulsivas. A proposta é explicar pontos que merecem atenção antes de criar conta em sites de apostas esportivas: bônus, Pix, saque, odds apostas esportivas, gestão de banca, regras, transparência afiliada e jogo responsável.
            </p>
            <p>
              Saber <strong>como escolher uma casa de apostas</strong> começa por uma avaliação completa da plataforma antes de qualquer cadastro. Em vez de olhar apenas para o bônus de boas-vindas ou para uma campanha promocional, compare regras, limites, recursos de controle, métodos de pagamento, suporte e clareza das informações. Boas decisões exigem leitura atenta: termos de uso, política de privacidade, regras de mercados, condições de saque e requisitos de verificação podem mudar de uma plataforma para outra.
            </p>
            <p>
              Ao pesquisar <strong>casas de apostas no Brasil</strong>, confirme se a plataforma está disponível para o seu perfil e localização, quais documentos podem ser solicitados no KYC e quais condições se aplicam a bônus, free bets e promoções. O CalculaBet não afirma que uma parceira é licenciada ou regulamentada sem validação explícita feita diretamente na fonte oficial da plataforma. Por isso, a recomendação institucional é: verifique licença, disponibilidade, termos e regras diretamente no site parceiro antes de criar conta.
            </p>
            <p>
              Também é importante analisar reputação e histórico de atendimento. Pesquise canais de suporte, prazos de resposta, regras de contestação, estabilidade do site e clareza sobre métodos de saque. Uma lista de <strong>melhores casas de apostas</strong> só faz sentido quando os critérios são transparentes, responsáveis e adequados ao usuário. Para iniciantes, a prioridade deve ser entender odds, risco, stake e banca antes de usar qualquer oferta comercial.
            </p>
          </SeoSection>

          <SeoSection id="antes-de-cadastrar" title="O que verificar antes de se cadastrar em uma casa de apostas">
            <p>
              Antes de se cadastrar em <strong>plataformas de apostas</strong>, use um checklist objetivo. Ele reduz decisões por impulso e ajuda a separar publicidade de critérios práticos. Casas de apostas confiáveis tendem a apresentar regras em páginas acessíveis, mas ainda cabe ao usuário conferir detalhes e entender limitações antes de depositar.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {verificationItems.map(item => (
                <div key={item} className="flex gap-3 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(34,211,238,0.12)', color: '#67e8f9' }}>✓</span>
                  <p className="text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <p>
              A etapa de verificação é ainda mais relevante quando há bônus, apostas grátis ou promoções temporárias. Uma oferta pode exigir odds mínimas, mercados específicos, prazo curto de uso ou volume de apostas antes de qualquer saque. Avalie também se o suporte esclarece dúvidas sobre documentos, bloqueios, limite de conta e ferramentas de jogo responsável.
            </p>
          </SeoSection>

          <SeoSection id="pix" title="Casas de apostas com Pix: o que observar">
            <p>
              O Pix se tornou um método popular no Brasil por sua praticidade, mas <strong>casas de apostas com Pix</strong> não são automaticamente melhores. O ponto principal é verificar se a plataforma realmente oferece Pix para depósito e saque no momento do cadastro, quais prazos são informados, quais limites se aplicam e se há exigência de que a chave ou conta bancária esteja no mesmo CPF do titular da conta de apostas.
            </p>
            <p>
              Antes de depositar, confira se existem taxas, valores mínimos, validações adicionais ou bloqueios temporários após bônus. Em saques, algumas plataformas podem exigir KYC concluído, documentos legíveis e conferência de titularidade. Nunca deposite valores essenciais, dinheiro de contas fixas, reservas de emergência ou recursos que você não pode perder. Apostas esportivas online envolvem risco financeiro e não devem comprometer o orçamento doméstico.
            </p>
          </SeoSection>

          <SeoSection id="bonus" title="Como funcionam os bônus de casas de apostas">
            <p>
              <strong>Bônus casas de apostas</strong> podem aparecer como bônus de boas-vindas, free bets, cashback, apostas grátis, odds turbinadas ou promoções temporárias. Eles costumam ser apresentados com destaque, mas a parte decisiva está nos termos: rollover, odds mínimas, mercados elegíveis, prazo de utilização, limites de ganho, regras de saque e restrições por usuário ou região.
            </p>
            <div className="rounded-2xl p-5" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.18)', color: '#fde68a' }}>
              <p className="font-semibold">Bônus não é dinheiro livre. Sempre leia os termos, requisitos e condições antes de usar qualquer oferta.</p>
            </div>
            <p>
              Um bônus grande pode ter regras mais exigentes do que uma promoção menor. Por isso, não escolha uma plataforma apenas pelo valor anunciado. Entenda se o bônus exige depósito, se a aposta grátis retorna apenas lucro ou também stake, quais odds mínimas contam para rollover e o que acontece se você sacar antes de cumprir as condições. Se algo não estiver claro, procure o suporte da plataforma antes de aceitar a promoção.
            </p>
          </SeoSection>

          <SeoSection id="odds" title="Como comparar odds entre casas de apostas">
            <p>
              Odds influenciam diretamente o retorno potencial de uma aposta. Em odds decimais, por exemplo, uma stake de R$ 100 em odd 1.80 tem retorno potencial menor do que a mesma stake em odd 1.90. Pequenas diferenças podem acumular impacto ao longo do tempo, mas odds maiores não significam automaticamente uma aposta melhor: elas podem refletir menor probabilidade estimada, maior incerteza ou simples diferença de margem entre casas.
            </p>
            <p>
              Para comparar <strong>odds apostas esportivas</strong>, entenda probabilidade implícita e use ferramentas antes de decidir. A <InlineLink to="/ferramentas/odds">calculadora de odds</InlineLink> ajuda a visualizar retorno, lucro e probabilidade. O <InlineLink to="/ferramentas/conversor">conversor de odds</InlineLink> facilita a comparação entre formatos decimais, americanos e fracionários. Se quiser aprofundar, leia também <InlineLink to="/blog/como-calcular-odds">como calcular odds</InlineLink> e <InlineLink to="/blog/probabilidade-implicita-odds">probabilidade implícita nas odds</InlineLink>.
            </p>
          </SeoSection>

          <SeoSection id="calculadoras" title="Por que usar calculadoras antes de apostar">
            <p>
              Calculadoras ajudam a entender retorno, lucro, risco e impacto da stake antes de apostar. Elas não preveem resultados, não garantem acertos e não substituem leitura de regras, mas reduzem erro manual e tornam os números mais claros para iniciantes e usuários experientes. Antes de usar sites de apostas esportivas, veja se você sabe calcular retorno, lucro líquido, probabilidade implícita, ROI, cashout e exposição de banca.
            </p>
            <p>
              O CalculaBet reúne <InlineLink to="/ferramentas">ferramentas gratuitas</InlineLink> para diferentes cenários: <InlineLink to="/ferramentas/odds">odds</InlineLink>, <InlineLink to="/ferramentas/multipla">aposta múltipla</InlineLink>, <InlineLink to="/ferramentas/gestao-de-banca">gestão de banca</InlineLink>, <InlineLink to="/ferramentas/roi">ROI</InlineLink> e <InlineLink to="/ferramentas/cashout">cashout</InlineLink>. Use essas páginas para estudar os números antes de abrir conta, aceitar bônus ou fazer uma aposta real.
            </p>
          </SeoSection>

          <SeoSection id="iniciantes" title="Casas de apostas para iniciantes: o que priorizar">
            <p>
              Quem busca <strong>casas de apostas para iniciantes</strong> deve priorizar clareza, não volume de promoções. Interface simples, termos fáceis de consultar, métodos de pagamento transparentes, suporte acessível e ferramentas de controle são mais importantes do que uma oferta chamativa. Também é recomendável evitar começar por múltiplas complexas, mercados muito específicos ou apostas ao vivo sem entender variação de odds.
            </p>
            <p>
              Antes de apostar, leia o guia de <InlineLink to="/blog/apostas-esportivas-para-iniciantes">apostas esportivas para iniciantes</InlineLink>, veja <InlineLink to="/blog/como-calcular-retorno-de-aposta">como calcular retorno de aposta</InlineLink> e pratique com a <InlineLink to="/ferramentas/odds">calculadora de odds</InlineLink>. O foco inicial deve ser compreender stake, odd, retorno, lucro potencial, perda possível e limites pessoais.
            </p>
          </SeoSection>

          <SeoSection id="banca" title="A importância da gestão de banca ao usar casas de apostas">
            <p>
              Gestão de banca é a prática de separar um valor específico para apostas, definir stakes proporcionais e controlar exposição. Banca não é salário, reserva de emergência, dinheiro de aluguel ou recurso essencial. Se a perda de uma quantia compromete contas, saúde financeira ou bem-estar, esse valor não deve ser usado em apostas.
            </p>
            <p>
              Defina percentuais conservadores, registre resultados, evite aumentar stake para recuperar perdas e faça pausas. A <InlineLink to="/ferramentas/gestao-de-banca">ferramenta de gestão de banca</InlineLink> pode ajudar a visualizar limites. Para aprofundar, leia <InlineLink to="/blog/o-que-e-gestao-de-banca">o que é gestão de banca</InlineLink> e <InlineLink to="/blog/criterio-de-kelly-apostas">Critério de Kelly em apostas</InlineLink>. Apostas envolvem risco e <InlineLink to="/jogo-responsavel">jogo responsável</InlineLink> deve vir antes de qualquer decisão.
            </p>
          </SeoSection>

          <SeoSection id="afiliados" title="O que são links afiliados em casas de apostas">
            <p>
              Alguns botões e banners desta página usam <strong>links afiliados apostas</strong>. Isso significa que o CalculaBet pode receber comissão caso você se cadastre por links de parceiros ou realize uma ação qualificada. Essa comissão ajuda a manter ferramentas gratuitas, conteúdo educativo, manutenção técnica e evolução do site. O usuário não deve pagar a mais por isso.
            </p>
            <p>
              Transparência é fundamental: condições de cadastro, bônus, rollover, saque, documentos e disponibilidade são definidas pela plataforma parceira, não pelo CalculaBet. Leia a <InlineLink to="/politica-de-afiliados">política de afiliados</InlineLink> e conheça melhor o projeto na página <InlineLink to="/sobre">sobre o CalculaBet</InlineLink>.
            </p>
          </SeoSection>

          <SeoSection id="calculabet-nao-e-casa" title="O CalculaBet é uma casa de apostas?">
            <p>
              Não. O CalculaBet não é uma casa de apostas. O site não aceita apostas, não processa pagamentos, não define odds, não opera jogos, não guarda saldo de usuários e não decide resultado de eventos. O CalculaBet oferece <InlineLink to="/ferramentas">ferramentas</InlineLink>, calculadoras e conteúdo educativo para ajudar o usuário a entender números, regras, retorno potencial, risco e gestão de banca.
            </p>
            <p>
              Essa diferença é importante: uma plataforma de apostas executa cadastro, depósito, saque, mercados e regras comerciais; o CalculaBet atua como recurso informativo. Saiba mais em <InlineLink to="/sobre">sobre</InlineLink>.
            </p>
          </SeoSection>

          <SeoSection id="evitar-impulso" title="Como evitar escolhas impulsivas em apostas esportivas">
            <p>
              Escolhas impulsivas costumam surgir quando o usuário decide por emoção, tenta recuperar perdas, aposta mais do que planejou ou aceita bônus sem entender as regras. Para reduzir esse risco, defina limites antes de acessar plataformas, leia termos com calma, use calculadoras, evite decisões sob pressão e faça pausas quando perceber irritação, ansiedade ou necessidade de apostar novamente.
            </p>
            <p>
              Não escolha uma casa apenas pelo bônus e não trate apostas como solução financeira. Apostas envolvem risco financeiro e não há garantia de ganhos. Caso sinta perda de controle, visite a página de <InlineLink to="/jogo-responsavel">jogo responsável</InlineLink> e considere ferramentas de bloqueio, limites, autoexclusão e apoio especializado.
            </p>
          </SeoSection>

          <SeoSection id="checklist" title="Checklist antes de abrir conta em uma casa de apostas">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {checklistItems.map(item => (
                <div key={item} className="rounded-2xl p-4 flex items-start gap-3" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.055), rgba(255,255,255,0.02))', border: '1px solid rgba(34,211,238,0.14)' }}>
                  <span className="h-7 w-7 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(34,211,238,0.14)', color: '#67e8f9' }}>✓</span>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{item}</p>
                </div>
              ))}
            </div>
          </SeoSection>

          <SeoSection id="ferramentas-recomendadas" title="Ferramentas recomendadas do CalculaBet">
            <p>
              Antes de criar conta ou apostar, use ferramentas educativas para entender odds, retorno, lucro, banca e risco. Elas são gratuitas, rastreáveis em HTML e não adicionam scripts pesados à página.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {toolCards.map(tool => (
                <Link key={tool.href} to={tool.href} className="group rounded-2xl p-5 transition-transform hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.028)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-1)' }}>{tool.title}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>{tool.desc}</p>
                  <span className="text-xs font-semibold" style={{ color: '#67e8f9' }}>Usar ferramenta →</span>
                </Link>
              ))}
            </div>
          </SeoSection>

          <SeoSection id="guias-recomendados" title="Guias recomendados do blog">
            <p>
              Continue estudando no <InlineLink to="/blog">blog do CalculaBet</InlineLink>. Os guias abaixo existem no site e complementam a comparação entre casas de apostas, odds, banca e análise responsável.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogLinks.map(post => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="rounded-2xl p-5 transition-colors hover:bg-white/[0.04]" style={{ background: 'rgba(255,255,255,0.024)', border: '1px solid rgba(255,255,255,0.075)' }}>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-1)' }}>{post.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{post.desc}</p>
                </Link>
              ))}
            </div>
          </SeoSection>

          <SeoSection id="conclusao" title="Conclusão">
            <p>
              Casas de apostas devem ser avaliadas com cuidado. Bônus precisam ser lidos com atenção, odds e retorno devem ser calculados, gestão de banca é essencial e jogo responsável vem antes de qualquer aposta. O CalculaBet ajuda com ferramentas educativas, conteúdo transparente e interlinks para estudos complementares, mas não garante resultados e não substitui a responsabilidade individual de ler termos e respeitar limites.
            </p>
            <div className="rounded-3xl p-5 md:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.09), rgba(34,211,238,0.07))', border: '1px solid rgba(34,197,94,0.18)' }}>
              <p className="font-semibold" style={{ color: 'var(--text-1)' }}>
                Antes de criar conta ou apostar, use as ferramentas gratuitas do CalculaBet para entender odds, retorno, lucro, banca e risco.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link className="btn-primary" to="/ferramentas">Ver ferramentas</Link>
                <Link className="btn-secondary" to="/ferramentas/odds">Calcular odds</Link>
                <Link className="btn-secondary" to="/jogo-responsavel">Jogo responsável</Link>
              </div>
            </div>
          </SeoSection>
        </article>

        <FAQSection
          className="mt-14"
          items={faqItems}
          title="FAQ sobre casas de apostas"
          eyebrow="Dúvidas frequentes"
          description="Respostas educativas sobre casas de apostas, Pix, bônus, odds, links afiliados e uso responsável. O conteúdo visível corresponde ao schema FAQPage desta página."
        />
      </div>
    </>
  );
}
