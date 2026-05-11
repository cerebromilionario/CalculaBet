import { Link } from 'react-router-dom';
import SEOHead from '../../components/ui/SEOHead';

const lastUpdated = 'maio de 2026';

const trustCards = [
  {
    label: 'Natureza da plataforma',
    value: 'Ferramentas educativas',
    detail: 'Não somos casa de apostas e não aceitamos depósitos.',
  },
  {
    label: 'Risco financeiro',
    value: 'Sem promessas de lucro',
    detail: 'Cálculos e conteúdos não substituem análise própria.',
  },
  {
    label: 'Transparência comercial',
    value: 'Ads e afiliados',
    detail: 'Links patrocinados podem gerar comissão para o projeto.',
  },
];

const toc = [
  { href: '#aceitacao', label: 'Aceitação dos termos' },
  { href: '#sobre-plataforma', label: 'Sobre a plataforma' },
  { href: '#uso-permitido', label: 'Uso permitido' },
  { href: '#precisao', label: 'Precisão das informações' },
  { href: '#links-afiliados', label: 'Links externos e afiliados' },
  { href: '#propriedade-intelectual', label: 'Propriedade intelectual' },
  { href: '#responsabilidade', label: 'Limitação de responsabilidade' },
  { href: '#jogo-responsavel', label: 'Jogo responsável' },
  { href: '#disponibilidade', label: 'Disponibilidade' },
  { href: '#privacidade', label: 'Privacidade' },
  { href: '#contato', label: 'Contato' },
];

const platformPrinciples = [
  'Disponibilizamos calculadoras, simuladores e materiais educativos para apoiar compreensão matemática e tomada de decisão mais consciente.',
  'Não operamos apostas, não recebemos depósitos, não processamos saques e não mantemos saldo de usuários.',
  'Não garantimos lucros, acertos, retornos positivos, previsões certas ou qualquer resultado financeiro.',
  'O usuário é responsável por conferir dados inseridos, interpretar resultados e decidir se deve ou não utilizar plataformas externas.',
];

const allowedUse = [
  'Utilizar o site para fins pessoais, informativos e educativos.',
  'Compartilhar links para páginas públicas do CalculaBet sem alterar seu conteúdo ou autoria.',
  'Usar as calculadoras de forma razoável, sem sobrecarregar, tentar burlar ou prejudicar a estabilidade da plataforma.',
];

const prohibitedUse = [
  'Executar robôs, scraping abusivo, varreduras automatizadas ou ações que simulem tráfego malicioso.',
  'Explorar falhas técnicas, contornar medidas de segurança ou tentar acessar áreas não públicas.',
  'Copiar, republicar ou vender conteúdo, layouts, textos, marcas ou componentes sem autorização.',
  'Usar a plataforma para fraude, spam, engenharia social, propaganda enganosa ou qualquer finalidade ilícita.',
];

const internalLinks = [
  { to: '/jogo-responsavel', label: 'Jogo Responsável' },
  { to: '/privacidade', label: 'Política de Privacidade' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Termos de Uso do CalculaBet',
    description: 'Termos de Uso do CalculaBet, plataforma de ferramentas educativas, calculadoras e conteúdo informativo sobre apostas esportivas.',
    url: 'https://calculabet.com.br/termos',
    dateModified: '2026-05-11',
    inLanguage: 'pt-BR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CalculaBet',
      url: 'https://calculabet.com.br',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CalculaBet',
      url: 'https://calculabet.com.br',
    },
    about: ['termos de uso', 'calculadoras de apostas', 'links afiliados', 'jogo responsável'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'CalculaBet', item: 'https://calculabet.com.br' },
      { '@type': 'ListItem', position: 2, name: 'Termos de Uso', item: 'https://calculabet.com.br/termos' },
    ],
  },
];

function TermsSection({ id, eyebrow, title, children, accent = 'cyan' }) {
  const accentColor = accent === 'green' ? 'var(--green)' : accent === 'amber' ? 'var(--amber)' : 'var(--cyan)';

  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-3xl p-6 sm:p-8"
      style={{
        background: 'linear-gradient(180deg, rgba(13,13,23,0.9) 0%, rgba(10,10,17,0.82) 100%)',
        border: '1px solid var(--border)',
        boxShadow: '0 18px 60px rgba(0,0,0,0.24)',
      }}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: accentColor }}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-5" style={{ color: 'var(--text-1)' }}>
        {title}
      </h2>
      <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
        {children}
      </div>
    </section>
  );
}

function CheckList({ items, tone = 'cyan' }) {
  const toneStyles = {
    cyan: { bg: 'rgba(34,211,238,0.12)', color: 'var(--cyan)', border: 'rgba(34,211,238,0.22)' },
    green: { bg: 'rgba(34,197,94,0.12)', color: 'var(--green)', border: 'rgba(34,197,94,0.22)' },
    amber: { bg: 'rgba(251,191,36,0.12)', color: 'var(--amber)', border: 'rgba(251,191,36,0.22)' },
  };
  const selected = toneStyles[tone] ?? toneStyles.cyan;

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
            style={{ background: selected.bg, color: selected.color, border: `1px solid ${selected.border}` }}
          >
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoBox({ title, children, tone = 'cyan' }) {
  const styles = {
    cyan: {
      background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.08))',
      border: 'rgba(34,211,238,0.2)',
      color: 'var(--cyan)',
    },
    amber: {
      background: 'linear-gradient(135deg, rgba(251,191,36,0.13), rgba(248,113,113,0.08))',
      border: 'rgba(251,191,36,0.24)',
      color: 'var(--amber)',
    },
    green: {
      background: 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,211,238,0.06))',
      border: 'rgba(34,197,94,0.22)',
      color: 'var(--green)',
    },
  };
  const selected = styles[tone] ?? styles.cyan;

  return (
    <div className="rounded-2xl p-5" style={{ background: selected.background, border: `1px solid ${selected.border}` }}>
      <p className="text-sm font-semibold mb-2" style={{ color: selected.color }}>{title}</p>
      <div className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>
    </div>
  );
}

export default function Termos() {
  return (
    <>
      <SEOHead
        title="Termos de Uso: regras, transparência e responsabilidade"
        description="Leia os Termos de Uso do CalculaBet: regras de utilização, natureza educativa da plataforma, calculadoras, links afiliados, privacidade, limitações e jogo responsável."
        canonical="/termos"
        schema={schema}
      />

      <main>
        <section className="relative overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
          <div aria-hidden="true" className="absolute inset-0">
            <div
              className="absolute left-1/2 top-[-120px] h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(129,140,248,0.1) 42%, transparent 72%)' }}
            />
            <div
              className="absolute -left-24 bottom-[-140px] h-[420px] w-[420px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 68%)' }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-center">
              <div>
                <span className="badge badge-cyan mb-5">Termos · Transparência · Uso responsável</span>
                <h1
                  className="font-bold tracking-tight mb-6"
                  style={{ fontSize: 'clamp(2.35rem, 6vw, 4.7rem)', lineHeight: '1.04', letterSpacing: '-0.05em', color: 'var(--text-1)' }}
                >
                  Termos de Uso claros para uma plataforma mais confiável.
                </h1>
                <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-2)', maxWidth: '720px' }}>
                  Ao utilizar o CalculaBet, você concorda com as condições descritas abaixo. Nosso objetivo é explicar, em linguagem direta, como a plataforma funciona, quais são seus limites e quais responsabilidades continuam com o usuário.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a href="#sumario" className="btn-primary">Ler termos</a>
                  <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsável</Link>
                </div>
              </div>

              <aside
                className="rounded-[2rem] p-6 sm:p-7"
                style={{
                  background: 'rgba(13,13,23,0.78)',
                  border: '1px solid var(--border-md)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.32)',
                  backdropFilter: 'blur(18px)',
                }}
                aria-label="Resumo dos termos"
              >
                <p className="text-sm mb-5" style={{ color: 'var(--text-3)' }}>Última atualização: {lastUpdated}</p>
                <div className="space-y-4">
                  {trustCards.map((card) => (
                    <div key={card.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid var(--border)' }}>
                      <p className="text-xs uppercase tracking-[0.16em] mb-2" style={{ color: 'var(--text-3)' }}>{card.label}</p>
                      <p className="font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{card.value}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{card.detail}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start">
            <aside id="sumario" className="lg:sticky lg:top-24 scroll-mt-28">
              <nav
                className="rounded-3xl p-5"
                style={{ background: 'rgba(13,13,23,0.68)', border: '1px solid var(--border)', boxShadow: '0 18px 50px rgba(0,0,0,0.2)' }}
                aria-label="Sumário dos Termos de Uso"
              >
                <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text-1)' }}>Nesta página</p>
                <ol className="space-y-1">
                  {toc.map((item, index) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-white/[0.04]"
                        style={{ color: 'var(--text-2)' }}
                      >
                        <span className="text-xs tabular-nums" style={{ color: 'var(--text-3)' }}>{String(index + 1).padStart(2, '0')}</span>
                        <span className="group-hover:text-white">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="space-y-6 lg:space-y-8">
              <InfoBox title="Aviso importante sobre risco" tone="amber">
                <p><strong style={{ color: 'var(--text-1)' }}>Apostas envolvem riscos financeiros.</strong> O CalculaBet oferece ferramentas e conteúdo informativo, mas não deve ser interpretado como consultoria financeira, recomendação de aposta ou garantia de retorno.</p>
              </InfoBox>

              <TermsSection id="aceitacao" eyebrow="Concordância" title="1. Aceitação dos termos">
                <p>Ao acessar, navegar ou utilizar qualquer funcionalidade do CalculaBet, você declara que leu, compreendeu e concorda com estes Termos de Uso.</p>
                <p>Se você não concordar com alguma condição, recomendamos interromper o uso da plataforma. O uso contínuo após alterações indica aceitação da versão atualizada.</p>
                <p>Estes termos podem ser atualizados para refletir mudanças de funcionalidades, requisitos legais, práticas de transparência, publicidade, afiliados ou segurança. Recomendamos revisar esta página periodicamente.</p>
              </TermsSection>

              <TermsSection id="sobre-plataforma" eyebrow="Natureza do serviço" title="2. Sobre a plataforma" accent="green">
                <p>O CalculaBet é uma plataforma independente de ferramentas e conteúdo educativo sobre apostas esportivas. Nosso foco é ajudar usuários a compreender cálculos, probabilidades, cenários simulados e conceitos relacionados a gestão de banca e análise de odds.</p>
                <CheckList items={platformPrinciples} tone="green" />
                <InfoBox title="O que não fazemos" tone="green">
                  <p>Não somos uma casa de apostas, não intermediamos apostas, não mantemos contas de jogo e não executamos transações financeiras relacionadas a apostas.</p>
                </InfoBox>
              </TermsSection>

              <TermsSection id="uso-permitido" eyebrow="Conduta do usuário" title="3. Uso permitido">
                <p>Você pode utilizar a plataforma de forma pessoal, razoável, informativa e compatível com a finalidade educativa do projeto.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoBox title="Uso adequado" tone="cyan">
                    <CheckList items={allowedUse} />
                  </InfoBox>
                  <InfoBox title="Uso proibido" tone="amber">
                    <CheckList items={prohibitedUse} tone="amber" />
                  </InfoBox>
                </div>
              </TermsSection>

              <TermsSection id="precisao" eyebrow="Informação e cálculos" title="4. Precisão das informações" accent="amber">
                <p>Calculadoras, simuladores, textos e demais conteúdos são fornecidos “como estão”, com finalidade educativa e informativa. Embora busquemos clareza e qualidade, podem existir erros, atrasos, imprecisões, limitações técnicas ou interpretações incompletas.</p>
                <p>Os resultados dependem dos dados informados pelo usuário e de premissas matemáticas simplificadas. Antes de tomar decisões com impacto financeiro, valide informações, confira regras das plataformas externas e considere sua situação pessoal.</p>
                <InfoBox title="Responsabilidade antes de decidir" tone="amber">
                  <p>Apostas envolvem riscos financeiros. Nunca utilize resultados de simuladores como promessa de lucro, recomendação personalizada ou substituto de avaliação própria.</p>
                </InfoBox>
              </TermsSection>

              <TermsSection id="links-afiliados" eyebrow="Publicidade e parceiros" title="5. Links externos e afiliados">
                <p>O CalculaBet pode exibir anúncios, conteúdos patrocinados, rankings informativos e links para plataformas externas. Alguns desses links podem ser links afiliados, o que significa que podemos receber comissão se você clicar, cadastrar-se ou realizar determinada ação em sites de parceiros.</p>
                <p>Essa relação comercial ajuda a manter o projeto, mas não altera nosso compromisso de transparência: parceiros e plataformas externas possuem regras, termos, políticas de privacidade, requisitos de idade, condições promocionais e critérios próprios.</p>
                <p>Não controlamos sites de terceiros, não somos responsáveis por disponibilidade, ofertas, pagamentos, bônus, contas, atendimento, decisões comerciais ou práticas dessas plataformas.</p>
                <InfoBox title="Transparência comercial" tone="cyan">
                  <p>Ao sair do CalculaBet por um link externo, leia os termos do parceiro antes de criar conta, depositar valores ou utilizar qualquer serviço.</p>
                </InfoBox>
              </TermsSection>

              <TermsSection id="propriedade-intelectual" eyebrow="Conteúdo e marca" title="6. Propriedade intelectual">
                <p>Textos, interfaces, componentes visuais, organização de conteúdo, identidade, marca, design, código e demais elementos do CalculaBet pertencem à plataforma ou a seus respectivos titulares.</p>
                <p>É proibido copiar, reproduzir, distribuir, modificar, vender, espelhar ou explorar comercialmente qualquer parte da plataforma sem autorização prévia e expressa.</p>
                <p>O uso indevido pode violar direitos autorais, direitos marcários e outras normas aplicáveis.</p>
              </TermsSection>

              <TermsSection id="responsabilidade" eyebrow="Limites do serviço" title="7. Limitação de responsabilidade" accent="amber">
                <p>O CalculaBet não se responsabiliza por perdas financeiras, decisões de apostas, resultados negativos, expectativas frustradas, erros de interpretação, instabilidades de terceiros ou qualquer consequência decorrente do uso das informações e ferramentas.</p>
                <p>Cada usuário é responsável por suas escolhas, pelo valor que decide arriscar, pela conferência das informações e pelo cumprimento das leis e regras aplicáveis à sua localização.</p>
                <InfoBox title="Apostas devem ser tratadas como entretenimento" tone="amber">
                  <p>Não aposte para pagar dívidas, recuperar perdas, complementar renda ou resolver problemas financeiros. Se a atividade deixar de ser controlada, busque apoio.</p>
                </InfoBox>
              </TermsSection>

              <TermsSection id="jogo-responsavel" eyebrow="Proteção do usuário" title="8. Jogo responsável" accent="green">
                <p>O conteúdo do CalculaBet é destinado apenas a pessoas maiores de 18 anos. Apostas envolvem risco, podem causar perdas financeiras e devem ser encaradas com cautela.</p>
                <p>Incentivamos o uso de limites, pausas, autocontrole e ferramentas de proteção oferecidas por plataformas reguladas. Se você perceber perda de controle, pressão emocional, dívidas ou impactos na rotina, procure ajuda especializada.</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {internalLinks.map((link) => (
                    <Link key={link.to} to={link.to} className="btn-ghost text-sm">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </TermsSection>

              <TermsSection id="disponibilidade" eyebrow="Evolução do produto" title="9. Disponibilidade da plataforma">
                <p>Podemos atualizar, ajustar, suspender ou remover conteúdos, páginas, calculadoras, simuladores, recursos, anúncios e integrações a qualquer momento, com ou sem aviso prévio.</p>
                <p>Também podem ocorrer períodos de manutenção, instabilidade, erros temporários, indisponibilidade por provedores externos ou mudanças técnicas necessárias para melhorar segurança, desempenho e experiência do usuário.</p>
              </TermsSection>

              <TermsSection id="privacidade" eyebrow="Dados e cookies" title="10. Privacidade">
                <p>Podemos utilizar cookies, tecnologias similares e ferramentas de analytics para compreender uso agregado da plataforma, melhorar experiência, medir desempenho, proteger o site e apoiar publicidade ou afiliados quando aplicável.</p>
                <p>Informações enviadas voluntariamente pelo formulário de contato são tratadas conforme nossa Política de Privacidade. Para detalhes sobre dados, cookies, analytics e direitos do usuário, consulte a página específica.</p>
                <Link to="/privacidade" className="btn-primary mt-2">Ler Política de Privacidade</Link>
              </TermsSection>

              <TermsSection id="contato" eyebrow="Canal oficial" title="11. Contato" accent="green">
                <p>O canal oficial para falar com o CalculaBet é exclusivamente o formulário disponível na página de contato. Por segurança e organização, não exibimos e-mail diretamente nesta página.</p>
                <p>Mensagens enviadas por canais não oficiais, perfis de terceiros ou plataformas externas podem não ser recebidas, reconhecidas ou respondidas pela equipe do projeto.</p>
                <Link to="/contato" className="btn-primary mt-2">Abrir formulário oficial</Link>
              </TermsSection>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
