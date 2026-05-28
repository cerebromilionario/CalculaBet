import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import FAQSection from '../../../components/ui/FAQSection';
import { getCategoryById } from '../../../data/blog/blogData';
import { PLANILHA_GESTAO_BANCA_FAQS } from '../../../data/blog/planilhaGestaoBancaFaqs';

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
}

function ArticleSection({ id, title, children }) {
  return (
    <section id={id} className="mt-12 scroll-mt-28">
      <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>{title}</h2>
      <div className="mt-5 space-y-5 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>
    </section>
  );
}

function Callout({ tone = 'cyan', children }) {
  const styles = tone === 'amber'
    ? { background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.18)' }
    : tone === 'red'
    ? { background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.18)' }
    : tone === 'green'
    ? { background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }
    : { background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)' };
  return <div className="rounded-3xl p-5 my-7 leading-relaxed" style={styles}>{children}</div>;
}

function FormulaBox({ label, formula, note }) {
  return (
    <div className="rounded-3xl p-6 my-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.08))', border: '1px solid rgba(103,232,249,0.20)' }}>
      <p className="badge badge-cyan mb-4">{label}</p>
      <p className="text-xl sm:text-2xl font-bold leading-relaxed font-mono" style={{ color: 'var(--text-1)' }}>{formula}</p>
      {note && <div className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{note}</div>}
    </div>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-3xl my-4" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      <table className="w-full text-left">
        <thead style={{ background: 'rgba(255,255,255,0.06)' }}>
          <tr>{headers.map(h => <th key={h} className="p-4 text-sm font-semibold">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-white/10" style={{ color: 'var(--text-2)' }}>
              {row.map((cell, j) => (
                <td key={j} className="p-4 text-sm" style={j === 0 ? { color: 'var(--text-1)', fontWeight: '600', fontFamily: 'monospace' } : {}}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CtaBox({ title, desc, href, btnLabel }) {
  return (
    <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.16), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.20)' }}>
      <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>{title}</h2>
      <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-2)' }}>{desc}</p>
      <Link to={href} className="btn-primary mt-5">{btnLabel} <BlogIcon name="arrow" className="w-4 h-4" /></Link>
    </div>
  );
}

const faqItems = PLANILHA_GESTAO_BANCA_FAQS.map(f => ({ q: f.question, a: f.answer }));

export default function PlanilhaGestaoBancaArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#fbbf24', borderColor: `${category?.color || '#fbbf24'}35`, background: `${category?.color || '#fbbf24'}10` }}>{category?.name || 'Gestao de Banca'}</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        {/* Header */}
        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div>
            <p className="badge badge-cyan mb-5">Guia pratico — planilha, registro de apostas e controle de banca</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">
              Planilha de Gestao de Banca: O Que Registrar para Controlar suas Apostas
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Muitos apostadores nao sabem se estao evoluindo ou apenas lembram dos ganhos. Registrar apostas ajuda a enxergar banca, volume, ROI e padroes com mais clareza. Uma planilha nao garante lucro — mas organiza os dados para decisoes mais informadas. Este guia mostra o que registrar, quais colunas usar e como as ferramentas do CalculaBet apoiam o controle. Conteudo educativo: apostas envolvem risco financeiro.{' '}
              <Link to="/calculadoras/gestao-banca" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Gestao de Banca</Link>.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/gestao-banca" className="btn-primary">
                Usar Calculadora de Banca <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
              <Link to="/calculadoras/roi" className="btn-ghost">Calculadora de ROI</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.17)' }} aria-label="Pontos essenciais sobre planilha de banca">
            <p className="badge mb-4" style={{ color: '#fbbf24', borderColor: 'rgba(251,191,36,0.30)', background: 'rgba(251,191,36,0.10)' }}>Tres pontos essenciais</p>
            <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text-1)' }}>Antes de montar sua planilha</h2>
            <div className="space-y-4">
              {[
                ['Registre tudo', 'Apenas ganhos distorcem analise. Perdas fazem parte do historico real.'],
                ['Use unidades', 'Padronizar stake em unidades facilita comparacao entre periodos.'],
                ['Planilha nao garante lucro', 'Ela organiza dados — nao melhora probabilidades.'],
              ].map(([title, body]) => (
                <div key={title} className="card-glass p-4">
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{body}</p>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <section id="resposta-rapida" className="mt-10 rounded-3xl p-5" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.18)' }}>
          <p className="badge badge-cyan mb-3">Resposta rapida</p>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>Uma planilha de gestão de banca organiza stake, odd, resultado, lucro/prejuízo e ROI em histórico único. Esse registro ajuda a medir disciplina e identificar padrões de risco ao longo do tempo. Controle de banca melhora processo, mas não garante ganhos.</p>
        </section>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <Callout tone="amber">
          <strong>Conteudo educativo:</strong> apostas envolvem riscos financeiros, sao destinadas apenas a maiores de 18 anos. Planilha e calculadoras nao garantem lucro nem eliminam perdas. Use como apoio ao calculo e a analise. Consulte nossas orientacoes de{' '}
          <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsavel</Link>.
        </Callout>

        {/* Para que serve */}
        <ArticleSection id="para-que-serve-planilha" title="Para que serve uma planilha de gestao de banca?">
          <p>
            Uma planilha de gestao de banca organiza o historico de apostas, acompanha a evolucao da banca e permite calcular indicadores como ROI, stake media e taxa de acerto. Sem registro, a memoria tende a superestimar ganhos e minimizar perdas — o que distorce a leitura real do desempenho.
          </p>
          <p>
            Alem de registrar resultados, a planilha ajuda a controlar exposicao, evitar impulsividade e identificar padroes de risco. Ela nao substitui analise esportiva, gestao emocional ou boas praticas — mas complementa tudo isso com dados concretos.
          </p>
          <p>
            Para calcular stake, unidade e exposicao antes de cada aposta, use a{' '}
            <Link to="/calculadoras/gestao-banca" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Gestao de Banca</Link> do CalculaBet em conjunto com sua planilha. Para um guia amplo sobre o tema, veja nosso{' '}
            <Link to="/blog/o-que-e-gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>artigo completo sobre gestao de banca</Link>.
          </p>
          <Callout tone="cyan">
            Uma planilha nao melhora uma aposta ruim, mas ajuda a enxergar numeros com mais clareza.
          </Callout>
        </ArticleSection>

        {/* O que registrar */}
        <ArticleSection id="o-que-registrar" title="O que registrar em uma planilha de apostas?">
          <p>Quanto mais completo e consistente o registro, mais util sera a analise. Os campos essenciais sao:</p>
          <ul className="list-none space-y-2 mt-3">
            {[
              ['Data', 'quando a aposta foi feita'],
              ['Esporte e liga', 'contexto do evento'],
              ['Evento', 'os times ou competidores'],
              ['Mercado', 'tipo de aposta (resultado, gols, handicap, etc.)'],
              ['Selecao', 'o que foi apostado'],
              ['Casa de apostas', 'onde foi registrada'],
              ['Odd', 'cotacao usada'],
              ['Stake em R$', 'valor apostado em reais'],
              ['Stake em unidades', 'valor padronizado em relacao a banca'],
              ['Resultado', 'green, red, push ou void'],
              ['Retorno recebido', 'valor recebido em caso de vitoria'],
              ['Lucro/Prejuizo', 'impacto financeiro da aposta'],
              ['Banca antes e depois', 'evolucao da banca'],
              ['ROI acumulado', 'desempenho geral do periodo'],
              ['Observacoes', 'motivo da aposta e notas relevantes'],
            ].map(([term, desc], i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#22d3ee' }}>•</span>
                <span><strong style={{ color: 'var(--text-1)' }}>{term}</strong> — {desc}</span>
              </li>
            ))}
          </ul>
        </ArticleSection>

        {/* Modelo de colunas */}
        <ArticleSection id="modelo-colunas" title="Modelo de colunas para planilha de gestao de banca">
          <p>Este modelo resume as colunas mais uteis e o que cada uma representa:</p>
          <DataTable
            headers={['Coluna', 'O que registrar', 'Por que importa']}
            rows={[
              ['Data', 'Dia da aposta', 'Permite analisar desempenho por periodo'],
              ['Odd', 'Cotacao usada', 'Base para calcular retorno e ROI'],
              ['Stake (R$)', 'Valor apostado em reais', 'Mostra exposicao financeira'],
              ['Stake (unidades)', 'Stake em proporcao da banca', 'Facilita comparar apostas de bancas diferentes'],
              ['Resultado', 'Green / Red / Push / Void', 'Organiza historico de desempenho'],
              ['Lucro/Prejuizo', 'Resultado financeiro da aposta', 'Mostra impacto real na banca'],
              ['Banca apos', 'Saldo depois da aposta', 'Acompanha evolucao da banca'],
              ['ROI', 'Retorno sobre volume apostado', 'Mede eficiencia do periodo'],
            ]}
          />
        </ArticleSection>

        {/* Stake e unidade */}
        <ArticleSection id="registrar-stake-unidade" title="Como registrar stake e unidade">
          <p>
            Stake e o valor apostado em cada aposta. Unidade e uma forma de padronizar esse valor em relacao a banca — o que facilita comparar apostas feitas em momentos diferentes, independente do valor absoluto em reais.
          </p>
          <FormulaBox
            label="Valor de 1 unidade"
            formula="1 unidade = Banca total x Percentual definido"
            note="Exemplo: banca R$1.000, 1% por unidade — 1 unidade = R$10. Uma aposta de R$20 equivale a 2 unidades."
          />
          <p>
            Registrar em unidades permite identificar se a stake esta aumentando ou se mantem proporcional, mesmo quando a banca cresce ou cai. Use a{' '}
            <Link to="/calculadoras/unidade-stake" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Unidade</Link> do CalculaBet para calcular o valor de cada unidade conforme sua banca atual. Para entender o conceito em profundidade, veja o artigo{' '}
            <Link to="/blog/o-que-e-unidade-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>o que e unidade em apostas</Link>.
          </p>
        </ArticleSection>

        {/* Odds e retorno */}
        <ArticleSection id="registrar-odds-retorno" title="Como registrar odds e retorno">
          <FormulaBox
            label="Retorno potencial"
            formula="Retorno = Stake x Odd"
            note="O retorno inclui a stake original. Se apostou R$50 na odd 2.20, o retorno potencial e R$110."
          />
          <FormulaBox
            label="Lucro potencial"
            formula="Lucro = Stake x (Odd - 1)"
            note="O lucro e apenas o ganho liquido, sem incluir a stake. Exemplo: R$50 x 1.20 = R$60 de lucro."
          />
          <p>
            Registrar a odd usada permite revisar decisoes passadas e calcular ROI com precisao. Use a{' '}
            <Link to="/calculadoras/odds" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Odds</Link> para conferir retorno e lucro rapidamente. Para entender os calculos em detalhe, veja{' '}
            <Link to="/blog/como-calcular-retorno-de-aposta" className="font-semibold" style={{ color: '#67e8f9' }}>como calcular retorno de aposta</Link>.
          </p>
        </ArticleSection>

        {/* Lucro ou prejuizo */}
        <ArticleSection id="calcular-lucro-prejuizo" title="Como calcular lucro ou prejuizo na planilha">
          <FormulaBox label="Aposta vencedora" formula="Lucro = Stake x (Odd - 1)" />
          <FormulaBox label="Aposta perdida" formula="Prejuizo = -Stake" />
          <FormulaBox label="Aposta anulada (void)" formula="Lucro/Prejuizo = 0 (salvo regras especificas)" />
          <p>
            Exemplo: stake de R$50 na odd 2.20. Se vencer: lucro = R$50 x 1.20 = <strong style={{ color: '#67e8f9' }}>R$60</strong>. Se perder: prejuizo = <strong style={{ color: '#f87171' }}>-R$50</strong>.
          </p>
          <Callout tone="amber">
            <strong>Confundir retorno com lucro e um dos erros mais comuns.</strong> Retorno e stake + lucro. Lucro e apenas o ganho liquido.
          </Callout>
        </ArticleSection>

        {/* ROI */}
        <ArticleSection id="calcular-roi-planilha" title="Como calcular ROI na planilha">
          <FormulaBox
            label="ROI"
            formula="ROI = (Lucro liquido / Total apostado) x 100"
            note="Exemplo: total apostado R$1.000, lucro liquido R$80, ROI = 8%."
          />
          <p>
            ROI mede eficiencia em relacao ao volume apostado. Um ROI positivo em poucas apostas pode ser variancia — amostras maiores sao mais representativas do desempenho real. Para calcular automaticamente, use a{' '}
            <Link to="/calculadoras/roi" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de ROI</Link> do CalculaBet. Para entender o indicador em profundidade, veja o artigo sobre{' '}
            <Link to="/blog/roi-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>ROI em apostas</Link>.
          </p>
          <CtaBox
            href="/calculadoras/roi"
            title="Calcule seu ROI online"
            desc="Use a Calculadora de ROI do CalculaBet para medir seu desempenho em apostas sem formulas manuais."
            btnLabel="Abrir calculadora de ROI"
          />
        </ArticleSection>

        {/* Banca antes e depois */}
        <ArticleSection id="banca-antes-depois" title="Como acompanhar banca antes e depois da aposta">
          <p>
            Registrar a banca antes e depois de cada aposta mostra o impacto real de cada resultado. Isso ajuda a perceber se a banca esta crescendo, estavel ou em queda — e se o tamanho das apostas esta proporcional ao momento.
          </p>
          <div className="rounded-3xl p-5 my-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Banca antes:</strong> R$1.000</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Stake:</strong> R$20</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Resultado:</strong> -R$20 (red)</p>
            <p className="text-sm font-semibold mt-3" style={{ color: '#22d3ee' }}>Banca depois: R$980</p>
          </div>
          <p>
            Acompanhar esse dado ajuda a evitar aumentar a stake por impulso apos perdas ou ganhos. Se a banca cair muito, o valor de cada unidade tambem muda — o que deve ser refletido no registro.
          </p>
        </ArticleSection>

        {/* Green red push void */}
        <ArticleSection id="green-red-push-void" title="Resultado: green, red, push e void">
          <p>Manter consistencia nos termos usados para resultado e essencial para a planilha funcionar bem:</p>
          <DataTable
            headers={['Termo', 'Significado', 'Impacto na planilha']}
            rows={[
              ['Green', 'Aposta vencedora', 'Lucro = Stake x (Odd - 1)'],
              ['Red', 'Aposta perdida', 'Prejuizo = -Stake'],
              ['Push', 'Devolvida sem lucro', 'Lucro/Prejuizo = 0'],
              ['Void', 'Anulada pela plataforma', 'Geralmente sem impacto financeiro'],
              ['Cashout', 'Encerramento antecipado', 'Registrar valor recebido e diferenca'],
            ]}
          />
          <p>
            Cada plataforma pode usar nomes diferentes — o importante e manter o mesmo padrao ao longo de todo o historico para que os calculos sejam consistentes.
          </p>
        </ArticleSection>

        {/* Cashout */}
        <ArticleSection id="registrar-cashout" title="Como registrar cashout na planilha">
          <p>
            Cashout tem regras proprias e deve ser registrado separadamente de apostas que aguardaram o resultado final. Registre:
          </p>
          <ul className="list-none space-y-2 mt-3">
            {[
              'Valor apostado original',
              'Valor recebido no cashout',
              'Diferenca em relacao ao valor apostado (positiva ou negativa)',
              'Motivo do cashout (ex: cenario mudou, reducao de risco)',
              'Se foi cashout parcial ou total',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#22d3ee' }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              ['/calculadoras/cashout', 'Calculadora de Cashout'],
              ['/calculadoras/cashout-justo', 'Cashout Justo / Manual'],
              ['/blog/cashout-manual', 'Artigo: cashout manual'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-sm px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} &rarr;
              </Link>
            ))}
          </div>
        </ArticleSection>

        {/* Multipla */}
        <ArticleSection id="registrar-multipla" title="Como registrar aposta multipla na planilha">
          <p>
            Apostas multiplas precisam de campos extras para o registro ser util. Registre:
          </p>
          <ul className="list-none space-y-2 mt-3">
            {[
              'Odd combinada da multipla',
              'Numero de selecoes no bilhete',
              'Stake total apostada',
              'Resultado final (green ou red)',
              'Observacao sobre qual selecao foi perdida ou anulada, se aplicavel',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#22d3ee' }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              ['/calculadoras/multipla-parlay', 'Calculadora de Multipla'],
              ['/blog/aposta-multipla-tem-que-acertar-tudo', 'Artigo: multipla tem que acertar tudo?'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-sm px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} &rarr;
              </Link>
            ))}
          </div>
        </ArticleSection>

        {/* Exemplo preenchido */}
        <ArticleSection id="exemplo-planilha-preenchida" title="Exemplo de planilha preenchida">
          <p>Veja como ficaria uma semana de apostas registradas com consistencia:</p>
          <DataTable
            headers={['Data', 'Evento', 'Odd', 'Stake', 'Resultado', 'Lucro/Prej.', 'Banca']}
            rows={[
              ['12/05', 'Time A vs Time B', '2.10', 'R$20', 'Green', '+R$22', 'R$1.022'],
              ['13/05', 'Time C vs Time D', '1.75', 'R$30', 'Red', '-R$30', 'R$992'],
              ['14/05', 'Time E vs Time F', '3.00', 'R$15', 'Void', 'R$0', 'R$992'],
              ['15/05', 'Time G vs Time H', '1.90', 'R$25', 'Cashout', '+R$10', 'R$1.002'],
              ['16/05', 'Multipla 3 sel.', '5.40', 'R$10', 'Red', '-R$10', 'R$992'],
            ]}
          />
          <p>
            Com esse historico, e possivel calcular: total apostado (R$100), lucro liquido (-R$8), ROI (-8%) e banca final (R$992). O registro incluindo apostas perdidas e void e o que torna a analise valida.
          </p>
        </ArticleSection>

        {/* Indicadores */}
        <ArticleSection id="indicadores-uteis" title="Indicadores uteis para acompanhar">
          <p>Alem do registro linha a linha, calcule periodicamente esses indicadores:</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {[
              'Total apostado no periodo',
              'Lucro/prejuizo liquido',
              'ROI percentual',
              'Numero de apostas',
              'Taxa de acerto (green/total)',
              'Odd media das apostas',
              'Stake media por aposta',
              'Maior perda registrada',
              'Maior ganho registrado',
              'Sequencia maxima de perdas',
              'Banca atual vs banca inicial',
            ].map((item, i) => (
              <div key={i} className="flex gap-3 rounded-2xl p-3.5 text-sm" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
                <span className="shrink-0 font-mono font-bold" style={{ color: '#22d3ee' }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ color: 'var(--text-2)' }}>{item}</span>
              </div>
            ))}
          </div>
          <Callout>
            Nenhum indicador garante desempenho futuro. Eles descrevem o passado e ajudam a identificar padroes — mas apostas sempre envolvem incerteza.
          </Callout>
        </ArticleSection>

        {/* Planilha vs calculadoras */}
        <ArticleSection id="planilha-vs-calculadoras" title="Planilha ou calculadoras online?">
          <DataTable
            headers={['Ferramenta', 'Vantagem', 'Limitacao', 'Melhor uso']}
            rows={[
              ['Planilha', 'Historico continuo e personalizavel', 'Exige disciplina e pode ter erro de formula', 'Registro e analise de longo prazo'],
              ['Calculadoras online', 'Calculos rapidos e sem erro de formula', 'Nao guardam historico automaticamente', 'Simular antes de registrar cada aposta'],
            ]}
          />
          <p>As duas ferramentas se complementam. Use a planilha para o historico e as calculadoras para os calculos antes de cada aposta:</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              ['/calculadoras/gestao-banca', 'Gestao de Banca'],
              ['/calculadoras/unidade-stake', 'Calculadora de Unidade'],
              ['/calculadoras/roi', 'ROI em Apostas'],
              ['/calculadoras/odds', 'Calculadora de Odds'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-sm px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} &rarr;
              </Link>
            ))}
          </div>
        </ArticleSection>

        {/* Erros comuns */}
        <ArticleSection id="erros-comuns-planilha" title="Erros comuns em planilhas de apostas">
          <ul className="list-none space-y-2 mt-2">
            {[
              'Registrar apenas apostas vencedoras e ignorar perdas.',
              'Nao registrar odds, dificultando o calculo de retorno e ROI.',
              'Nao calcular o total apostado para medir exposicao real.',
              'Confundir retorno (stake + lucro) com lucro liquido.',
              'Nao separar stake de tipos diferentes de aposta.',
              'Mudar o valor de uma unidade sem anotar a mudanca no historico.',
              'Nao registrar cashout de forma separada do resultado normal.',
              'Nao atualizar a banca apos cada aposta.',
              'Usar a planilha para justificar apostas impulsivas.',
              'Apagar historico negativo para melhorar aparencia do ROI.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#f87171' }}>&#x2715;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Callout tone="amber">
            <strong>Registrar apenas ganhos distorce sua analise.</strong> O historico so e util se for completo — incluindo perdas, voids e cashouts.
          </Callout>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        {/* FAQ */}
        <section id="faq" className="mt-12 scroll-mt-28">
          <h2 className="text-3xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-1)' }}>Perguntas frequentes sobre planilha de gestao de banca</h2>
          <FAQSection items={faqItems} eyebrow="FAQ" />
        </section>

        {/* Conclusao */}
        <ArticleSection id="conclusao" title="Conclusao">
          <p>
            Uma planilha de gestao de banca e uma das ferramentas mais simples e uteis para quem aposta com alguma regularidade. Registrar stake, odds, resultado, lucro e banca de forma consistente permite calcular ROI, identificar padroes e tomar decisoes mais informadas.
          </p>
          <p>
            A planilha nao garante lucro, nao melhora probabilidades e nao elimina o risco financeiro das apostas. Mas reduz confusao, organiza dados e ajuda a evitar decisoes baseadas apenas em memoria ou emocao.
          </p>
          <Callout tone="green">
            Controle nao e garantia de lucro. E uma forma de reduzir confusao e decisoes impulsivas — o que ja e um avanaco importante.
          </Callout>
          <CtaBox
            href="/calculadoras/gestao-banca"
            title="Calcule sua gestao de banca antes de apostar"
            desc="Use as calculadoras do CalculaBet para apoiar sua planilha: calcule unidade, ROI, odds e exposicao antes de registrar seus resultados."
            btnLabel="Abrir calculadora de gestao de banca"
          />
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              ['/calculadoras/gestao-banca', 'Calculadora de Gestao de Banca'],
              ['/calculadoras/unidade-stake', 'Calculadora de Unidade'],
              ['/calculadoras/roi', 'Calculadora de ROI'],
              ['/calculadoras/odds', 'Calculadora de Odds'],
              ['/calculadoras/cashout', 'Calculadora de Cashout'],
              ['/calculadoras/cashout-justo', 'Cashout Justo'],
              ['/calculadoras/multipla-parlay', 'Aposta Multipla'],
              ['/calculadoras/value-bet', 'Value Bet / EV'],
              ['/blog/o-que-e-gestao-de-banca', 'O que e gestao de banca'],
              ['/blog/o-que-e-unidade-apostas', 'O que e unidade'],
              ['/blog/roi-apostas', 'ROI em apostas'],
              ['/blog/cashout-manual', 'Cashout manual'],
              ['/blog/apostas-esportivas-para-iniciantes', 'Guia para iniciantes'],
              ['/jogo-responsavel', 'Jogo responsavel'],
              ['/blog', 'Ver todos os artigos'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} &rarr;
              </Link>
            ))}
          </div>
        </ArticleSection>

      </article>

      {/* Related posts */}
      {relatedPosts?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-1)' }}>Artigos relacionados</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPosts.map(p => (
              <BlogCard key={p.slug} post={p} category={getCategoryById(p.category)} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
