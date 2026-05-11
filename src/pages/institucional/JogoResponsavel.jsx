import { Link } from 'react-router-dom';
import SEOHead from '../../components/ui/SEOHead';
import Icon from '../../components/ui/Icons';

const principios = [
  {
    title: 'Entretenimento, não renda',
    text: 'Uma aposta pode fazer parte de um momento de lazer, mas nunca deve ser tratada como salário, investimento seguro ou solução para problemas financeiros.',
  },
  {
    title: 'Decisão informada',
    text: 'Entender odds, probabilidade, margem e gestão de banca ajuda a enxergar riscos com mais clareza — sem transformar incerteza em promessa.',
  },
  {
    title: 'Controle antes da aposta',
    text: 'Limites devem ser definidos antes de qualquer decisão. Quando o limite chega, a atitude responsável é parar, não tentar compensar.',
  },
];

const regras = [
  {
    title: 'Aposte apenas o que pode perder',
    text: 'Nunca use dinheiro reservado para aluguel, alimentação, contas, dívidas, saúde, educação ou compromissos familiares.',
    icon: 'gestao-banca',
  },
  {
    title: 'Defina limites claros',
    text: 'Estabeleça limites de valor, tempo e frequência antes de começar. O limite precisa ser realista e respeitado.',
    icon: 'calculator',
  },
  {
    title: 'Não persiga prejuízos',
    text: 'Tentar recuperar perdas rapidamente aumenta a chance de decisões impulsivas e de perdas ainda maiores.',
    icon: 'warning',
  },
  {
    title: 'Faça pausas regulares',
    text: 'Pausas reduzem impulsividade, ajudam a revisar decisões e evitam que a aposta vire uma atividade automática.',
    icon: 'cashout',
  },
  {
    title: 'Evite apostar emocionalmente',
    text: 'Ansiedade, euforia, raiva, frustração e pressão social prejudicam o julgamento e elevam o risco.',
    icon: 'info',
  },
  {
    title: 'Não aposte sob efeito de álcool ou drogas',
    text: 'Substâncias podem reduzir autocontrole, distorcer percepção de risco e dificultar a decisão de parar.',
    icon: 'warning',
  },
  {
    title: 'Não trate como investimento garantido',
    text: 'Apostas envolvem variância, margem da casa e risco real de perda. Nenhuma ferramenta elimina a incerteza.',
    icon: 'roi',
  },
];

const sinais = [
  'Apostar valores maiores ou por mais tempo do que havia planejado.',
  'Esconder apostas, extratos, perdas ou tempo gasto em plataformas.',
  'Sentir ansiedade, irritação ou culpa após perdas relacionadas a apostas.',
  'Tentar recuperar prejuízos rapidamente com novas apostas.',
  'Comprometer contas, reserva de emergência, crédito ou finanças pessoais.',
  'Perceber impacto em relacionamentos, trabalho, estudos ou rotina familiar.',
  'Sentir dificuldade de fazer pausas mesmo quando existe vontade de parar.',
];

const ferramentas = [
  {
    title: 'Limites de depósito',
    text: 'Definem um teto de valor que pode ser depositado em determinado período, ajudando a proteger o orçamento.',
  },
  {
    title: 'Pausas temporárias',
    text: 'Permitem interromper o acesso por um período curto para reduzir impulsividade e reavaliar hábitos.',
  },
  {
    title: 'Autoexclusão',
    text: 'Bloqueia o acesso à conta por prazo definido ou prolongado quando a pessoa percebe perda de controle.',
  },
  {
    title: 'Limites de tempo',
    text: 'Ajudam a controlar duração de sessões e evitam que a atividade ocupe espaço excessivo na rotina.',
  },
];

const platformPoints = [
  'Oferecemos calculadoras e conteúdos educativos para apoiar entendimento matemático.',
  'Não aceitamos apostas, depósitos, saques ou qualquer transação de jogo.',
  'Não garantimos lucros, resultados, retornos positivos ou “métodos infalíveis”.',
  'Não recomendamos apostar para resolver dívidas, complementar renda ou recuperar perdas.',
  'Mantemos avisos sobre risco, maioridade e uso consciente das ferramentas.',
];

const featuredCalculators = [
  { label: 'Gestão de Banca', to: '/calculadoras/gestao-banca', desc: 'Planeje limites proporcionais à sua banca.' },
  { label: 'Conversor de Odds', to: '/calculadoras/conversor-odds', desc: 'Entenda formatos de odds e probabilidade implícita.' },
  { label: 'ROI em Apostas', to: '/calculadoras/roi', desc: 'Avalie desempenho com cautela, sem promessas.' },
  { label: 'Aposta Simples', to: '/calculadoras/aposta-simples', desc: 'Simule retorno potencial antes de decidir.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Jogo Responsável',
  description: 'Guia educativo sobre jogo responsável, limites, sinais de alerta, maioridade, ferramentas de autocontrole e uso consciente das calculadoras do CalculaBet.',
  url: 'https://calculabet.com.br/jogo-responsavel',
  isPartOf: {
    '@type': 'WebSite',
    name: 'CalculaBet',
    url: 'https://calculabet.com.br',
  },
  inLanguage: 'pt-BR',
  about: ['jogo responsável', 'apostas conscientes', 'autocontrole em apostas', 'maiores de 18 anos'],
};

function SectionHeader({ eyebrow, title, children, align = 'left', id }) {
  return (
    <div className={align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80 mb-3">{eyebrow}</p>
      )}
      <h2 id={id} className="section-title">{title}</h2>
      {children && <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-400">{children}</p>}
    </div>
  );
}

export default function JogoResponsavel() {
  return (
    <>
      <SEOHead
        title="Jogo Responsável: apostas conscientes, limites e ajuda"
        description="Guia de jogo responsável do CalculaBet: entenda riscos das apostas, defina limites, reconheça sinais de alerta, conheça ferramentas de autocontrole e use calculadoras com consciência."
        canonical="/jogo-responsavel"
        schema={schema}
      />

      <main className="overflow-hidden">
        <section className="relative border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(129,140,248,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" aria-hidden="true" />
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-3xl" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/8 px-3 py-1.5 text-xs font-semibold text-amber-200 mb-6">
                  <span className="h-2 w-2 rounded-full bg-amber-300" aria-hidden="true" />
                  +18 · Informação educativa · Risco financeiro real
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.055em] leading-[0.98] text-white mb-6">
                  Jogo responsável começa antes da primeira aposta.
                </h1>
                <p className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-2xl mb-8">
                  As apostas devem ser entretenimento, nunca uma fonte garantida de renda. O CalculaBet existe para educar, explicar cálculos e reforçar decisões mais conscientes — sem promessas de lucro.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#regras" className="btn-primary">Ver regras conscientes</a>
                  <a href="#ajuda" className="btn-ghost">Buscar apoio</a>
                </div>
              </div>

              <aside className="card-glass p-6 md:p-8 relative">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-400/10 blur-2xl" aria-hidden="true" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-300/10 border border-cyan-300/20 flex items-center justify-center text-cyan-200 mb-6">
                    <Icon name="warning" className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Compromisso do CalculaBet</h2>
                  <p className="text-sm leading-relaxed text-gray-400 mb-6">
                    Nossas ferramentas ajudam a compreender cenários matemáticos, mas não removem o risco. Se apostar deixar de ser uma escolha controlada, a prioridade deve ser parar e procurar apoio.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                      <p className="text-2xl font-bold text-white">0</p>
                      <p className="text-[11px] text-gray-500 mt-1">apostas aceitas</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                      <p className="text-2xl font-bold text-white">+18</p>
                      <p className="text-[11px] text-gray-500 mt-1">somente adultos</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                      <p className="text-2xl font-bold text-white">100%</p>
                      <p className="text-[11px] text-gray-500 mt-1">educativo</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="conceito-title">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <SectionHeader eyebrow="Conceito" title="O que é jogo responsável" id="conceito-title">
              Jogo responsável é o conjunto de atitudes, limites e recursos que reduzem riscos financeiros, emocionais e sociais relacionados a apostas. Ele parte de uma premissa simples: apostar não pode comprometer sua segurança, sua saúde ou suas relações.
            </SectionHeader>
            <div className="grid sm:grid-cols-3 gap-4">
              {principios.map((item) => (
                <article key={item.title} className="card p-5">
                  <h3 className="text-base font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="regras" className="bg-white/[0.015] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SectionHeader eyebrow="Prática diária" title="Regras básicas de apostas conscientes" align="center">
              Estas regras não aumentam a chance de lucro. Elas existem para proteger seu orçamento, sua rotina e sua capacidade de tomar decisões com calma.
            </SectionHeader>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
              {regras.map((regra) => (
                <article key={regra.title} className="card p-5 md:p-6 hover:shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
                  <div className="w-11 h-11 rounded-xl bg-cyan-300/8 border border-cyan-300/14 text-cyan-200 flex items-center justify-center mb-5">
                    <Icon name={regra.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{regra.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{regra.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="sinais-title">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
            <div className="card-glass p-6 md:p-8 border-red-300/10 bg-red-400/[0.025]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300/80 mb-3">Atenção cuidadosa</p>
              <h2 id="sinais-title" className="section-title">Sinais de alerta</h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-400">
                Reconhecer um sinal de alerta não significa julgamento ou culpa. Significa que talvez seja hora de pausar, conversar com alguém de confiança e buscar orientação adequada.
              </p>
              <div className="mt-6 rounded-2xl border border-amber-300/15 bg-amber-300/6 p-4">
                <p className="text-sm font-semibold text-amber-100 mb-1">Se houver perda de controle, pare de apostar.</p>
                <p className="text-xs leading-relaxed text-amber-100/70">A prioridade deve ser segurança financeira, saúde emocional e apoio profissional quando necessário.</p>
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3" aria-label="Possíveis sinais de comportamento problemático com apostas">
              {sinais.map((sinal) => (
                <li key={sinal} className="flex gap-3 rounded-2xl border border-white/7 bg-white/[0.025] p-4">
                  <span className="mt-0.5 h-6 w-6 rounded-full bg-red-400/10 border border-red-300/20 text-red-200 flex items-center justify-center flex-shrink-0">
                    <Icon name="warning" className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-gray-300">{sinal}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white/[0.015] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-6">
            <article className="card p-6 md:p-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-300/10 border border-amber-300/18 text-amber-200 flex items-center justify-center mb-5">
                <span className="font-bold text-sm">+18</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Menores de idade não podem apostar</h2>
              <p className="text-sm leading-relaxed text-gray-400 mb-4">
                Conteúdos relacionados a apostas são destinados exclusivamente a maiores de 18 anos. Menores não devem acessar plataformas de apostas, criar contas, usar documentos de terceiros ou participar indiretamente por meio de adultos.
              </p>
              <p className="text-sm leading-relaxed text-gray-400">
                Famílias e responsáveis devem considerar ferramentas de controle parental, bloqueio de sites, supervisão de dispositivos e conversas claras sobre riscos financeiros e emocionais.
              </p>
            </article>

            <article className="card p-6 md:p-8">
              <div className="w-12 h-12 rounded-2xl bg-green-300/10 border border-green-300/18 text-green-200 flex items-center justify-center mb-5">
                <Icon name="check" className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Ferramentas de autocontrole</h2>
              <p className="text-sm leading-relaxed text-gray-400 mb-6">
                Plataformas reguladas costumam oferecer recursos de proteção. Antes de apostar, verifique quais ferramentas estão disponíveis, como ativá-las e se os prazos de alteração são adequados para sua segurança.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {ferramentas.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-white/[0.025] border border-white/7 p-4">
                    <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="ajuda" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="ajuda-title">
          <div className="grid lg:grid-cols-[1fr_0.95fr] gap-8 items-start">
            <div>
              <SectionHeader eyebrow="Apoio" title="Quando buscar ajuda" id="ajuda-title">
                Se você sente que perdeu controle, está escondendo perdas ou apostando para aliviar ansiedade, procure apoio. Falar cedo com alguém de confiança ou com um profissional pode evitar danos maiores.
              </SectionHeader>
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/7 bg-white/[0.025] p-5">
                  <h3 className="font-bold text-white mb-2">Converse com alguém</h3>
                  <p className="text-sm leading-relaxed text-gray-400">Compartilhar a situação com uma pessoa de confiança pode reduzir isolamento e facilitar decisões práticas.</p>
                </div>
                <div className="rounded-2xl border border-white/7 bg-white/[0.025] p-5">
                  <h3 className="font-bold text-white mb-2">Considere apoio profissional</h3>
                  <p className="text-sm leading-relaxed text-gray-400">Psicólogos, serviços de saúde e grupos de apoio podem ajudar a lidar com impulsividade, ansiedade e consequências financeiras.</p>
                </div>
              </div>
            </div>

            <aside className="card-glass p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-3">Espaço para recursos verificados</h3>
              <p className="text-sm leading-relaxed text-gray-400 mb-5">
                Esta área está preparada para receber organizações de apoio, linhas de ajuda e recursos externos. Antes da publicação, confirme nome, URL, disponibilidade, idioma, abrangência geográfica e se o serviço está ativo.
              </p>
              <div className="space-y-3">
                {['Organização de apoio validada', 'Linha de ajuda verificada', 'Recurso público ou profissional confirmado'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-4">
                    <Icon name="external" className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-gray-500">
                Não listamos organizações sem verificação editorial. Em situação de risco imediato à vida ou à integridade física, procure serviços de emergência da sua localidade.
              </p>
            </aside>
          </div>
        </section>

        <section className="bg-white/[0.015] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
              <SectionHeader eyebrow="Transparência" title="Sobre o CalculaBet">
                O CalculaBet é uma plataforma educativa de cálculos para apostas esportivas. Nosso papel é explicar números, riscos e cenários possíveis — não incentivar apostas irresponsáveis.
              </SectionHeader>
              <div className="card p-6 md:p-8">
                <ul className="space-y-4">
                  {platformPoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-0.5 h-6 w-6 rounded-full bg-green-300/10 border border-green-300/20 text-green-200 flex items-center justify-center flex-shrink-0">
                        <Icon name="check" className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-sm leading-relaxed text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/sobre" className="btn-ghost">Sobre</Link>
                  <Link to="/termos" className="btn-ghost">Termos de uso</Link>
                  <Link to="/afiliados" className="btn-ghost">Política de Afiliados</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="ferramentas-title">
          <SectionHeader eyebrow="Aprendizado" title="Use as calculadoras com consciência" align="center" id="ferramentas-title">
            Calculadoras ajudam a visualizar números, mas não substituem limites pessoais, análise de risco e responsabilidade financeira.
          </SectionHeader>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {featuredCalculators.map((calc) => (
              <Link key={calc.to} to={calc.to} className="card p-5 group hover:border-cyan-300/20">
                <h3 className="font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">{calc.label}</h3>
                <p className="text-sm leading-relaxed text-gray-500 mb-4">{calc.desc}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300/80">
                  Acessar ferramenta <Icon name="arrowRight" className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/10 via-violet-300/8 to-transparent p-8 md:p-12 text-center">
            <div className="absolute inset-x-16 -top-24 h-48 bg-cyan-300/10 blur-3xl" aria-hidden="true" />
            <div className="relative max-w-3xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80 mb-4">Navegação responsável</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.04em] text-white mb-5">
                Use nossas ferramentas para entender melhor os cálculos e tomar decisões mais conscientes.
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-gray-300 mb-8">
                Antes de qualquer aposta, defina orçamento, reconheça riscos e lembre-se: nenhuma análise garante resultado. Se a atividade deixar de ser controlada, pare e busque apoio.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link to="/calculadoras/gestao-banca" className="btn-primary">Começar pela gestão de banca</Link>
                <Link to="/termos" className="btn-ghost">Ler termos e avisos</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
