import { Link } from 'react-router-dom';
import SEOHead from '../../components/ui/SEOHead';
import Icon from '../../components/ui/Icons';
import { calculadoras } from '../../data/casas';

const oferta = [
  {
    title: 'Calculadoras de apostas',
    desc: 'Ferramentas para retorno potencial, lucro líquido, ROI, múltiplas, cashout, hedge e outros cenários comuns.',
    icon: 'calculator',
    link: '/calculadoras/aposta-simples',
  },
  {
    title: 'Conversores de odds',
    desc: 'Conversão entre odds decimais, americanas, fracionárias e probabilidade implícita para facilitar comparações.',
    icon: 'conversor-odds',
    link: '/calculadoras/conversor-odds',
  },
  {
    title: 'Simuladores',
    desc: 'Modelos para visualizar projeções, sequências de resultados e impactos de diferentes estratégias na banca.',
    icon: 'simulador-lucro',
    link: '/calculadoras/simulador-lucro',
  },
  {
    title: 'Gestão de banca',
    desc: 'Recursos para dimensionar stakes, aplicar limites e entender como volatilidade e risco afetam o longo prazo.',
    icon: 'gestao-banca',
    link: '/calculadoras/gestao-banca',
  },
  {
    title: 'Conteúdo educativo',
    desc: 'Explicações claras sobre probabilidades, valor esperado, margem da casa, risco e leitura crítica dos números.',
    icon: 'info',
    link: '/calculadoras/odds',
  },
  {
    title: 'Guias e recursos futuros',
    desc: 'Guias para iniciantes, comparações, checklists e melhorias contínuas para apoiar decisões mais conscientes.',
    icon: 'arrowRight',
    link: '/casas-apostas',
  },
];

const naoSomos = [
  'Não somos uma casa de apostas e não operamos apostas.',
  'Não aceitamos depósitos, palpites pagos ou qualquer tipo de aposta dentro da plataforma.',
  'Não garantimos ganhos, retornos positivos ou resultados futuros.',
  'Não oferecemos previsões infalíveis nem prometemos lucro com apostas esportivas.',
  'Não substituímos a análise individual, o controle financeiro e a responsabilidade de cada usuário.',
];

const beneficios = [
  'Ferramentas gratuitas e sem cadastro obrigatório',
  'Cálculos rápidos para cenários de aposta simples e avançados',
  'Interface simples, responsiva e pensada para celular',
  'Conteúdo educativo com linguagem direta e sem promessas irreais',
  'Foco em clareza, transparência e uso consciente das apostas',
  'Experiência moderna para usuários, afiliados e parceiros comerciais',
];

const calculadorasPrincipais = calculadoras.filter(c => [
  'odds',
  'aposta-simples',
  'conversor-odds',
  'gestao-banca',
  'roi',
  'simulador-lucro',
].includes(c.slug));

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre o CalculaBet',
    description: 'Página institucional do CalculaBet, plataforma independente de ferramentas, educação e cálculo para apostas esportivas responsáveis.',
    url: 'https://calculabet.site/sobre',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CalculaBet',
      url: 'https://calculabet.site',
    },
    about: {
      '@type': 'Organization',
      name: 'CalculaBet',
      url: 'https://calculabet.site',
      description: 'Plataforma independente de calculadoras de odds, gestão de banca, simulações e educação sobre probabilidades em apostas esportivas.',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'CalculaBet', item: 'https://calculabet.site' },
      { '@type': 'ListItem', position: 2, name: 'Sobre', item: 'https://calculabet.site/sobre' },
    ],
  },
];

function SectionHeader({ id, eyebrow, title, children }) {
  return (
    <div className="max-w-3xl mb-8">
      {eyebrow && (
        <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="section-title mb-4">{title}</h2>
      {children && <p className="text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</p>}
    </div>
  );
}

export default function Sobre() {
  return (
    <>
      <SEOHead
        title="Sobre o CalculaBet: ferramentas, educação e apostas responsáveis"
        description="Conheça o CalculaBet, plataforma independente com calculadoras de odds, gestão de banca, simuladores e conteúdo educativo para apostas esportivas responsáveis."
        canonical="/sobre"
        schema={schema}
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
          <div aria-hidden="true" className="absolute inset-0">
            <div
              className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(129,140,248,0.08) 38%, transparent 70%)' }}
            />
            <div
              className="absolute right-0 bottom-0 h-[360px] w-[360px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 68%)' }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-center">
              <div>
                <span className="badge-cyan badge mb-5">Sobre o CalculaBet · Plataforma independente</span>
                <h1
                  className="font-bold tracking-tight mb-6"
                  style={{ fontSize: 'clamp(2.35rem, 6vw, 4.6rem)', lineHeight: '1.06', letterSpacing: '-0.045em', color: 'var(--text-1)' }}
                >
                  Ferramentas para entender melhor os números por trás das apostas.
                </h1>
                <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-2)', maxWidth: '680px' }}>
                  O CalculaBet é uma plataforma independente de calculadoras de odds, gestão de banca, análise de risco,
                  simulações e educação sobre probabilidades. Nosso foco é ajudar usuários adultos a interpretar cenários
                  com mais clareza, sem promessas de lucro e sem incentivar apostas irresponsáveis.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/#calculadoras" className="btn-primary px-7 py-3.5">
                    Ver calculadoras
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </Link>
                  <Link to="/jogo-responsavel" className="btn-ghost px-7 py-3.5">
                    Jogo responsável
                  </Link>
                </div>
              </div>

              <aside
                className="rounded-3xl p-5 sm:p-6"
                style={{ background: 'rgba(13,13,23,0.82)', border: '1px solid var(--border)', boxShadow: '0 24px 80px rgba(0,0,0,0.32)' }}
                aria-label="Resumo institucional"
              >
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { value: '100%', label: 'foco educacional' },
                    { value: '+18', label: 'apenas adultos' },
                    { value: '0', label: 'apostas aceitas' },
                    { value: '12', label: 'ferramentas' },
                  ].map(item => (
                    <div key={item.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                      <p className="text-2xl font-bold text-gradient-cyan">{item.value}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl p-5" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(34,211,238,0.1)', color: '#22d3ee' }}>
                      <Icon name="info" className="w-5 h-5" />
                    </span>
                    <h2 className="text-base font-semibold" style={{ color: 'var(--text-1)' }}>Plataforma de cálculo, não de apostas</h2>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                    Você usa nossas ferramentas para estudar probabilidades, comparar cenários e organizar decisões. As apostas, quando realizadas, acontecem fora do CalculaBet e sob responsabilidade do usuário.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Quem somos / Missão */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="card-glass p-6 md:p-8">
              <span className="badge mb-4">Quem somos</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
                Uma plataforma independente para decisões mais informadas.
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
                Criamos o CalculaBet para reunir ferramentas práticas que ajudam apostadores a enxergar o lado matemático das apostas esportivas. Em vez de palpites prontos, entregamos calculadoras, conversores, simuladores e conteúdos que explicam como odds, probabilidade, margem e risco se relacionam.
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Acreditamos que tecnologia e educação reduzem decisões impulsivas. Por isso, nossa comunicação prioriza clareza, responsabilidade e transparência editorial.
              </p>
            </article>

            <article className="rounded-2xl p-6 md:p-8" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(129,140,248,0.07))', border: '1px solid rgba(34,211,238,0.14)' }}>
              <span className="badge-cyan badge mb-4">Missão</span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
                Traduzir números complexos em informação útil e responsável.
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Nossa missão é ajudar usuários a entenderem melhor os cálculos por trás das apostas esportivas para que tomem decisões mais informadas, conscientes e compatíveis com seus próprios limites. Não buscamos estimular volume de apostas: buscamos melhorar a compreensão sobre probabilidade, risco e gestão.
              </p>
            </article>
          </div>
        </section>

        {/* O que oferecemos */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20" aria-labelledby="oferecemos-heading">
          <SectionHeader id="oferecemos-heading" eyebrow="O que oferecemos" title="Recursos para calcular, aprender e comparar cenários.">
            A plataforma combina ferramentas gratuitas, explicações objetivas e links internos para que você explore cada etapa da análise com autonomia.
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {oferta.map(item => (
              <Link
                key={item.title}
                to={item.link}
                className="group rounded-2xl p-5 transition-all duration-200"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <span className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.14)', color: '#22d3ee' }}>
                  <Icon name={item.icon} className="w-5 h-5" />
                </span>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-1)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Calculadoras principais */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20" aria-labelledby="calculadoras-principais-heading">
          <div className="rounded-3xl p-6 md:p-8" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">
              <div>
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Links internos úteis
                </p>
                <h2 id="calculadoras-principais-heading" className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
                  Comece pelas ferramentas mais usadas
                </h2>
              </div>
              <Link to="/#calculadoras" className="btn-ghost w-full sm:w-auto">Ver todas</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {calculadorasPrincipais.map(c => (
                <Link key={c.slug} to={`/calculadoras/${c.slug}`} className="flex items-start gap-3 rounded-2xl p-4 transition-colors" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.04)', color: '#22d3ee' }}>
                    <Icon name={c.icon} className="w-4 h-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{c.nome}</span>
                    <span className="block text-xs leading-relaxed mt-1" style={{ color: 'var(--text-3)' }}>{c.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* O que não somos */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20" aria-labelledby="nao-somos-heading">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-stretch">
            <div className="rounded-3xl p-6 md:p-8" style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.16)' }}>
              <span className="badge mb-4" style={{ color: '#fca5a5', borderColor: 'rgba(248,113,113,0.24)', background: 'rgba(248,113,113,0.08)' }}>Importante</span>
              <h2 id="nao-somos-heading" className="section-title mb-4">O que o CalculaBet não é</h2>
              <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Esta seção existe para evitar dúvidas: nosso papel é fornecer ferramentas, educação e referências. O resultado de qualquer aposta depende de variáveis externas, decisões individuais e risco real.
              </p>
            </div>
            <div className="card p-5 md:p-6">
              <ul className="space-y-3" role="list">
                {naoSomos.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171' }}>×</span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Transparência */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20" aria-labelledby="transparencia-heading">
          <div className="rounded-3xl p-6 md:p-8" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.08), rgba(34,211,238,0.04))', border: '1px solid rgba(251,191,36,0.18)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8">
              <div>
                <span className="badge-amber badge mb-4">Independência e transparência</span>
                <h2 id="transparencia-heading" className="section-title mb-4">Publicidade deve ser clara, não escondida.</h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  O CalculaBet pode exibir anúncios, links afiliados, links patrocinados e recomendações comerciais. Quando isso acontecer, nosso compromisso é identificar a natureza comercial de forma transparente e preservar a clareza editorial do conteúdo educativo e das ferramentas.
                </p>
              </div>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                <p>
                  Podemos receber comissões quando um usuário acessa uma plataforma parceira por meio de determinados links. Essa remuneração ajuda a manter ferramentas gratuitas, mas não altera cálculos, fórmulas ou avisos de risco exibidos no site.
                </p>
                <p>
                  Antes de se cadastrar em qualquer plataforma externa, verifique diretamente no site parceiro os termos, bônus, requisitos de aposta, limites, regras promocionais, licenças, métodos de pagamento e políticas de jogo responsável.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Link to="/politica-de-afiliados" className="badge">Política de Afiliados</Link>
                  <Link to="/termos-de-uso" className="badge">Termos de Uso</Link>
                  <Link to="/politica-de-privacidade" className="badge">Privacidade</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jogo responsável */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20" aria-labelledby="jogo-responsavel-heading">
          <div className="rounded-3xl p-6 md:p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <span className="badge-amber badge mb-4">+18 · Risco real</span>
                <h2 id="jogo-responsavel-heading" className="section-title mb-4">Jogo responsável vem antes de qualquer cálculo.</h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Apostas envolvem risco financeiro e emocional. Nenhuma calculadora elimina a possibilidade de perda. Use a plataforma como apoio educativo, nunca como justificativa para apostar acima dos seus limites.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Apenas maiores de 18 anos devem acessar conteúdos de apostas.',
                  'Aposte somente valores que pode perder sem prejudicar seu orçamento.',
                  'Não trate apostas como renda garantida, investimento seguro ou solução financeira.',
                  'Se sentir perda de controle, interrompa o uso e busque ajuda especializada.',
                ].map(item => (
                  <div key={item} className="rounded-2xl p-4" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.13)' }}>
                    <Icon name="warning" className="w-5 h-5 mb-3 text-amber-300" />
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link to="/jogo-responsavel" className="inline-flex items-center gap-2 mt-6 text-sm font-semibold" style={{ color: '#22d3ee' }}>
              Ler nossa página de Jogo Responsável
              <Icon name="arrowRight" className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Por que usar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20" aria-labelledby="beneficios-heading">
          <SectionHeader id="beneficios-heading" eyebrow="Por que usar a plataforma" title="Clareza, velocidade e responsabilidade em uma experiência moderna." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {beneficios.map(item => (
              <div key={item} className="flex items-start gap-3 rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80' }}>
                  <Icon name="check" className="w-3.5 h-3.5" />
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-24">
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(129,140,248,0.12), rgba(34,197,94,0.08))', border: '1px solid rgba(34,211,238,0.18)' }}>
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.34), transparent)' }} />
            <p className="badge-cyan badge mb-5">Ferramentas gratuitas</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.035em' }}>
              Explore nossas ferramentas gratuitas e entenda melhor os cálculos por trás das suas apostas.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Use o CalculaBet para estudar odds, risco, banca e cenários possíveis com mais transparência. Aposte apenas se for maior de idade, com limites definidos e sem expectativa de renda garantida.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/#calculadoras" className="btn-primary px-7 py-3.5">
                Ver calculadoras
                <Icon name="arrowRight" className="w-4 h-4" />
              </Link>
              <Link to="/jogo-responsavel" className="btn-ghost px-7 py-3.5">
                Ler sobre jogo responsável
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
