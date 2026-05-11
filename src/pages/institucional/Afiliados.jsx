import { Link } from 'react-router-dom';
import SEOHead from '../../components/ui/SEOHead';
import Icon from '../../components/ui/Icons';

const pageSections = [
  { id: 'links-afiliados', label: 'Links afiliados' },
  { id: 'transparencia-editorial', label: 'Transparência editorial' },
  { id: 'publicidade', label: 'Publicidade' },
  { id: 'plataformas-externas', label: 'Plataformas externas' },
  { id: 'responsabilidade', label: 'Responsabilidade do usuário' },
  { id: 'jogo-responsavel', label: 'Jogo responsável' },
  { id: 'monetizacao', label: 'Como a monetização ajuda' },
];

const trustCards = [
  {
    icon: 'info',
    title: 'Transparência comercial',
    text: 'Alguns links podem gerar comissão sem custo adicional para você.',
  },
  {
    icon: 'calculator',
    title: 'Ferramentas gratuitas',
    text: 'A receita ajuda a manter calculadoras, simuladores e conteúdos acessíveis.',
  },
  {
    icon: 'warning',
    title: 'Sem promessa de ganhos',
    text: 'Apostas envolvem risco e devem ser tratadas como entretenimento.',
  },
];

const externalChecks = [
  'Termos e condições atualizados',
  'Regras de bônus e requisitos de aposta',
  'Licenças, autorizações e reputação',
  'Métodos de pagamento, taxas e prazos',
  'Disponibilidade regional e restrições de idade',
];

function SectionIcon({ children, tone = 'cyan' }) {
  const tones = {
    cyan: 'from-cyan-400/20 to-indigo-400/15 text-cyan-300 border-cyan-300/15',
    green: 'from-emerald-400/20 to-cyan-400/10 text-emerald-300 border-emerald-300/15',
    amber: 'from-amber-400/20 to-orange-400/10 text-amber-300 border-amber-300/15',
    violet: 'from-violet-400/20 to-cyan-400/10 text-violet-300 border-violet-300/15',
  };

  return (
    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-gradient-to-br ${tones[tone]}`} aria-hidden="true">
      {children}
    </span>
  );
}

function NumberBadge({ children }) {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-cyan-200">
      {children}
    </span>
  );
}

export default function Afiliados() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Política de Afiliados do CalculaBet',
    description: 'Entenda como o CalculaBet utiliza links afiliados, publicidade, parcerias comerciais e critérios de transparência editorial.',
    url: 'https://calculabet.com.br/afiliados',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CalculaBet',
      url: 'https://calculabet.com.br',
    },
    inLanguage: 'pt-BR',
  };

  return (
    <>
      <SEOHead
        title="Política de Afiliados: transparência comercial e publicidade"
        description="Veja como o CalculaBet trabalha com links afiliados, publicidade, plataformas parceiras, transparência editorial e jogo responsável."
        canonical="/afiliados"
        schema={schema}
      />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
          <div className="absolute right-[-12rem] top-64 h-72 w-72 rounded-full bg-violet-500/10 blur-[90px]" />
          <div className="absolute bottom-32 left-[-10rem] h-80 w-80 rounded-full bg-emerald-400/10 blur-[100px]" />
        </div>

        <section className="px-4 pt-28 pb-14 sm:px-6 lg:px-8 lg:pt-32" aria-labelledby="affiliate-policy-title">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                  Política de Afiliados
                </div>
                <h1 id="affiliate-policy-title" className="max-w-4xl text-4xl font-bold tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                  Monetização transparente para uma plataforma mais útil e confiável.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
                  O CalculaBet oferece ferramentas e conteúdo educativo sobre apostas esportivas. Alguns links nesta plataforma podem gerar comissão para nós, sem custo adicional para o usuário.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/calculadoras/odds" className="btn-primary px-6 py-3">
                    Explorar ferramentas
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </Link>
                  <Link to="/jogo-responsavel" className="btn-ghost px-6 py-3">
                    Ler sobre jogo responsável
                  </Link>
                </div>
              </div>

              <aside className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl" aria-label="Resumo de transparência comercial">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#080812]/80 p-6">
                  <div className="flex items-start gap-4">
                    <SectionIcon tone="cyan">
                      <Icon name="info" className="w-5 h-5" />
                    </SectionIcon>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Disclosure</p>
                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">Como mantemos a página gratuita</h2>
                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        Receitas de publicidade e afiliação podem financiar infraestrutura, pesquisa, manutenção técnica e melhorias de conteúdo. Isso não transforma o CalculaBet em casa de apostas: não aceitamos apostas, depósitos ou saques.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {trustCards.map(card => (
                      <div key={card.title} className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                        <span className="mt-0.5 text-cyan-300" aria-hidden="true"><Icon name={card.icon} className="w-4 h-4" /></span>
                        <div>
                          <p className="text-sm font-semibold text-white">{card.title}</p>
                          <p className="mt-1 text-sm leading-6 text-gray-400">{card.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-24 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Sumário da política de afiliados">
            <nav className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
              <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Nesta página</p>
              <ol className="space-y-1">
                {pageSections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-gray-400 transition hover:bg-white/[0.04] hover:text-white">
                      <NumberBadge>{index + 1}</NumberBadge>
                      <span>{section.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="space-y-5">
            <section id="links-afiliados" className="scroll-mt-24 rounded-[2rem] border border-white/10 bg-[#0b0b14]/80 p-6 shadow-xl shadow-black/20 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <SectionIcon tone="green"><Icon name="external" className="w-5 h-5" /></SectionIcon>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">Relação comercial</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">O que são links afiliados?</h2>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-gray-400 sm:text-base">
                    <p>
                      Links afiliados são links rastreáveis usados para identificar quando um usuário chega a uma plataforma parceira a partir do CalculaBet. Se a pessoa realiza uma ação elegível, como cadastro ou outra atividade prevista no programa do parceiro, o CalculaBet pode receber uma comissão.
                    </p>
                    <p>
                      Essa comissão não aumenta o preço, taxa ou custo para o usuário. Ela é uma forma de remuneração comercial entre empresas e ajuda a manter calculadoras, simuladores e conteúdos educativos disponíveis gratuitamente.
                    </p>
                    <p>
                      Sempre que possível, buscamos deixar clara a existência de relação comercial para que você entenda quando uma indicação pode gerar receita para a plataforma.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="transparencia-editorial" className="scroll-mt-24 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <SectionIcon tone="cyan"><Icon name="check" className="w-5 h-5" /></SectionIcon>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Critérios e independência</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Transparência editorial</h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                      <h3 className="font-semibold text-white">Conteúdo com foco em utilidade</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-400">Nosso conteúdo deve priorizar clareza, contexto e valor prático para quem quer entender cálculos, probabilidades, odds e gestão de risco.</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5">
                      <h3 className="font-semibold text-white">Parceria não é recomendação absoluta</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-400">Uma parceria comercial não significa que determinada plataforma será ideal para todos os perfis. Cada usuário deve avaliar termos, riscos e adequação por conta própria.</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5 md:col-span-2">
                      <h3 className="font-semibold text-white">Informações podem mudar</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-400">Bônus, odds, condições promocionais, métodos de pagamento, disponibilidade regional e requisitos de cadastro podem ser alterados por terceiros sem aviso prévio. Antes de tomar qualquer decisão, verifique as informações diretamente na plataforma externa.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="publicidade" className="scroll-mt-24 rounded-[2rem] border border-white/10 bg-[#0b0b14]/80 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <SectionIcon tone="violet"><Icon name="info" className="w-5 h-5" /></SectionIcon>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-200">Anúncios e patrocínios</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Publicidade</h2>
                  <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
                    O CalculaBet pode exibir anúncios, banners patrocinados, links promocionais ou seções com conteúdo comercial identificado. Essas iniciativas podem aparecer em páginas institucionais, ferramentas, listas de plataformas, guias educativos ou espaços reservados para mídia.
                  </p>
                  <div className="mt-5 rounded-2xl border border-violet-300/15 bg-violet-300/[0.06] p-5 text-sm leading-6 text-violet-100">
                    Conteúdos promocionais devem ser apresentados de maneira contextual, sem pressão indevida e sem promessa de lucro. Nosso objetivo é informar a existência de parceiros ou ofertas, não induzir decisões impulsivas.
                  </div>
                </div>
              </div>
            </section>

            <section id="plataformas-externas" className="scroll-mt-24 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                <div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <SectionIcon tone="amber"><Icon name="external" className="w-5 h-5" /></SectionIcon>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-200">Terceiros</p>
                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Plataformas externas possuem regras próprias</h2>
                      <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
                        O CalculaBet não controla operações, pagamentos, contas, promoções, limites, verificações, licenciamento, atendimento ou decisões comerciais de plataformas externas. Ao sair do nosso site, você passa a interagir com serviços independentes, sujeitos a políticas próprias.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/[0.08] bg-black/20 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-300">Verifique antes de usar</h3>
                  <ul className="mt-4 space-y-3">
                    {externalChecks.map(item => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-gray-400">
                        <Icon name="check" className="mt-1 w-4 h-4 text-emerald-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section id="responsabilidade" className="scroll-mt-24 rounded-[2rem] border border-red-300/10 bg-red-950/[0.08] p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <SectionIcon tone="amber"><Icon name="warning" className="w-5 h-5" /></SectionIcon>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-200">Risco e decisão individual</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Responsabilidade do usuário</h2>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-gray-400 sm:text-base">
                    <p>
                      Decisões financeiras, cadastros, depósitos, saques, apostas e uso de bônus são de responsabilidade exclusiva do usuário. O CalculaBet disponibiliza ferramentas e conteúdo educativo, mas não realiza consultoria financeira, não aceita apostas e não garante resultados.
                    </p>
                    <p>
                      Apostas esportivas envolvem risco real de perda. Não existe cálculo, estratégia, bônus, odds ou ferramenta capaz de eliminar esse risco ou assegurar lucro. Use qualquer informação como apoio educacional, nunca como garantia de retorno.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="jogo-responsavel" className="scroll-mt-24 rounded-[2rem] border border-emerald-300/10 bg-emerald-950/[0.08] p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <SectionIcon tone="green"><Icon name="warning" className="w-5 h-5" /></SectionIcon>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-200">Proteção do usuário</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Jogo responsável</h2>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-gray-400 sm:text-base">
                    <p>
                      O conteúdo do CalculaBet é destinado apenas a maiores de 18 anos. Apostas devem ser tratadas como entretenimento, com limites conscientes de tempo e dinheiro, nunca como fonte de renda ou solução para problemas financeiros.
                    </p>
                    <p>
                      Se apostar deixar de ser uma atividade controlada, causar ansiedade, dívidas, isolamento ou dificuldade de parar, considere buscar ajuda especializada e utilizar ferramentas de limite, pausa ou autoexclusão disponíveis nas plataformas reguladas.
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/jogo-responsavel" className="btn-primary px-5 py-2.5 text-sm">Jogo Responsável</Link>
                    <Link to="/termos" className="btn-ghost px-5 py-2.5 text-sm">Termos de Uso</Link>
                    <Link to="/privacidade" className="btn-ghost px-5 py-2.5 text-sm">Política de Privacidade</Link>
                    <Link to="/sobre" className="btn-ghost px-5 py-2.5 text-sm">Sobre</Link>
                  </div>
                </div>
              </div>
            </section>

            <section id="monetizacao" className="scroll-mt-24 rounded-[2rem] border border-white/10 bg-[#0b0b14]/80 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <SectionIcon tone="cyan"><Icon name="calculator" className="w-5 h-5" /></SectionIcon>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Sustentabilidade da plataforma</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Como a monetização ajuda o CalculaBet</h2>
                  <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
                    Manter uma plataforma gratuita exige desenvolvimento, revisão de conteúdo, hospedagem, monitoramento, melhorias de acessibilidade, manutenção de calculadoras e evolução constante da experiência do usuário. Receitas de afiliados e publicidade ajudam a financiar esse trabalho de forma sustentável.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {['Manter ferramentas gratuitas', 'Melhorar conteúdo e UX', 'Investir em infraestrutura'].map(item => (
                      <div key={item} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-sm font-medium text-gray-200">
                        <Icon name="check" className="mb-3 w-4 h-4 text-cyan-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.12] via-white/[0.04] to-violet-400/[0.10] p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">Compromisso final</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Ferramentas úteis, conteúdo claro e transparência comercial.</h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 sm:text-base">
                    Nosso objetivo é oferecer ferramentas úteis e conteúdo transparente para ajudar usuários a entender melhor os cálculos, probabilidades e riscos envolvidos nas apostas esportivas, sempre sem prometer ganhos ou incentivar decisões irresponsáveis.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link to="/calculadoras/odds" className="btn-primary px-6 py-3">
                    Explorar ferramentas
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </Link>
                  <Link to="/jogo-responsavel" className="btn-ghost px-6 py-3">Ler sobre jogo responsável</Link>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
