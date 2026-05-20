import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import FAQSection from '../../../components/ui/FAQSection';
import { getCategoryById } from '../../../data/blog/blogData';
import { APOSTA_MULTIPLA_FAQS } from '../../../data/blog/apostaMultiplaFaqs';

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

const faqItems = APOSTA_MULTIPLA_FAQS.map(f => ({ q: f.question, a: f.answer }));

export default function ApostaMultiplaArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#a78bfa', borderColor: `${category?.color || '#a78bfa'}35`, background: `${category?.color || '#a78bfa'}10` }}>{category?.name || 'Apostas Multiplas'}</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        {/* Header */}
        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div>
            <p className="badge badge-cyan mb-5">Guia educativo — aposta multipla, odds combinadas e regras</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">
              Aposta Multipla Tem que Acertar Tudo? Entenda Antes de Apostar
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Uma duvida comum entre iniciantes. A multipla combina duas ou mais selecoes; na maioria dos casos TODAS precisam vencer para a aposta pagar. Existem detalhes como void, cashout e apostas de sistema. Use a{' '}
              <Link to="/calculadoras/multipla-parlay" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Aposta Multipla</Link> para entender os numeros antes de apostar.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/multipla-parlay" className="btn-primary">
                Usar Calculadora de Multipla <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsavel</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.17)' }} aria-label="Pontos essenciais sobre aposta multipla">
            <p className="badge mb-4" style={{ color: '#a78bfa', borderColor: 'rgba(167,139,250,0.30)', background: 'rgba(167,139,250,0.10)' }}>Resposta rapida</p>
            <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text-1)' }}>O essencial sobre multiplas</h2>
            <div className="space-y-4">
              {[
                ['Acertar tudo', 'Na multipla comum, uma selecao perdida derruba todo o bilhete.'],
                ['Odds multiplicadas', 'A odd final e o produto das odds de todas as selecoes.'],
                ['Jogo anulado', 'Selecao void pode virar odd 1.00 — verifique as regras da casa.'],
              ].map(([title, body]) => (
                <div key={title} className="card-glass p-4">
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{body}</p>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <Callout tone="amber">
          <strong>Conteudo educativo:</strong> apostas envolvem riscos financeiros, sao destinadas apenas a maiores de 18 anos. Nao ha garantia de ganhos e multiplas podem ampliar o risco. Calculadoras nao preveem resultados — use como apoio ao calculo. Consulte nossas orientacoes de{' '}
          <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsavel</Link>.
        </Callout>

        {/* Secao 1 */}
        <ArticleSection id="multipla-acertar-tudo" title="Aposta multipla tem que acertar tudo?">
          <p>
            Sim, na maioria dos casos, todas as selecoes de uma aposta multipla precisam ser vencedoras para o bilhete ser pago. Se uma selecao perder, a multipla perde. Se todas vencerem, a multipla vence.
          </p>
          <p>
            A odd final do bilhete e o produto de todas as odds das selecoes. Quanto mais selecoes, maior o retorno potencial — mas tambem maior o risco, pois mais condicoes precisam ser cumpridas ao mesmo tempo.
          </p>
          <Callout tone="amber">
            Em uma aposta multipla comum, uma unica selecao perdida normalmente derruba toda a aposta.
          </Callout>
        </ArticleSection>

        {/* Secao 2 */}
        <ArticleSection id="o-que-e-multipla" title="O que e uma aposta multipla?">
          <p>
            Uma aposta multipla combina duas ou mais selecoes no mesmo bilhete. Ela tambem e chamada de aposta combinada ou parlay. O retorno depende do acerto de todas as selecoes, e as odds sao multiplicadas entre si para formar a odd combinada final.
          </p>
          <p>
            O risco cresce a cada selecao adicionada, porque cada evento e mais uma condicao que precisa ser cumprida. Veja o{' '}
            <Link to="/blog/o-que-e-aposta-multipla" className="font-semibold" style={{ color: '#67e8f9' }}>artigo completo sobre aposta multipla</Link> para uma explicacao detalhada.
          </p>
        </ArticleSection>

        {/* Secao 3 */}
        <ArticleSection id="errar-uma-selecao" title="O que acontece se eu errar uma selecao?">
          <p>
            Se uma selecao perder, a aposta multipla comum e perdida inteira. As demais selecoes acertadas nao salvam o bilhete. O resultado da multipla depende do conjunto completo de selecoes.
          </p>
          <div className="rounded-3xl p-5 my-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--text-1)' }}>Selecao 1:</strong> Venceu{' '}
              <span style={{ color: '#4ade80' }}>checkmark</span>
            </p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--text-1)' }}>Selecao 2:</strong> Venceu{' '}
              <span style={{ color: '#4ade80' }}>checkmark</span>
            </p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>
              <strong style={{ color: 'var(--text-1)' }}>Selecao 3:</strong> Perdeu{' '}
              <span style={{ color: '#f87171' }}>X</span>
            </p>
            <p className="text-sm font-semibold mt-3" style={{ color: '#f87171' }}>Resultado: A multipla perde.</p>
          </div>
        </ArticleSection>

        {/* Secao 4 */}
        <ArticleSection id="jogo-anulado" title="O que acontece se um jogo for anulado ou void?">
          <p>
            Quando uma selecao e anulada, em muitos casos ela recebe odd 1.00 e e retirada do calculo. A multipla continua com as demais selecoes e o retorno potencial e recalculado com a odd combinada restante. As regras variam por plataforma.
          </p>
          <FormulaBox
            label="Exemplo com jogo anulado"
            formula="1.80 x 1.00 x 1.50 = 2.70 (a odd 2.00 foi anulada)"
            note="O retorno potencial e recalculado com a odd combinada restante. Regras exatas dependem da plataforma."
          />
          <Callout tone="cyan">
            Regras de void, cancelamento e eventos adiados podem variar. Consulte sempre os termos da casa antes de apostar.
          </Callout>
        </ArticleSection>

        {/* Secao 5 */}
        <ArticleSection id="calcular-odd-multipla" title="Como calcular a odd de uma aposta multipla">
          <FormulaBox
            label="Odd combinada"
            formula="Odd combinada = Odd 1 x Odd 2 x Odd 3..."
            note="Multiplique as odds de todas as selecoes para obter a odd final do bilhete."
          />
          <FormulaBox
            label="Retorno potencial"
            formula="Retorno = Valor apostado x Odd combinada"
          />
          <FormulaBox
            label="Lucro potencial"
            formula="Lucro = Retorno potencial - Valor apostado"
          />
          <p>
            Exemplo: Odd 1.50 x Odd 2.00 x Odd 1.80 = 5.40. Com R$10: retorno R$54, lucro R$44.
          </p>
        </ArticleSection>

        {/* Secao 6 */}
        <ArticleSection id="calculadora-multipla" title="Use a Calculadora de Aposta Multipla do CalculaBet">
          <p>
            A <Link to="/calculadoras/multipla-parlay" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Aposta Multipla</Link> do CalculaBet calcula a odd combinada, o retorno potencial e o lucro estimado automaticamente. E uma ferramenta educativa — nao preve resultados nem garante ganhos.
          </p>
          <ol className="list-none space-y-3 mt-4">
            {[
              ['1', 'Acesse a Calculadora de Aposta Multipla.'],
              ['2', 'Insira o valor da aposta.'],
              ['3', 'Digite as odds de cada selecao.'],
              ['4', 'Veja a odd combinada calculada automaticamente.'],
              ['5', 'Confira o retorno potencial e o lucro estimado.'],
              ['6', 'Simule cenarios antes de decidir.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3 text-sm sm:text-base items-start">
                <span className="rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{n}</span>
                <span style={{ color: 'var(--text-2)' }}>{text}</span>
              </li>
            ))}
          </ol>
          <CtaBox
            href="/calculadoras/multipla-parlay"
            title="Calcule odds combinadas antes de apostar"
            desc="Use a Calculadora de Aposta Multipla do CalculaBet para calcular retorno e lucro potencial sem erro manual."
            btnLabel="Abrir calculadora de multipla"
          />
        </ArticleSection>

        {/* Secao 7 */}
        <ArticleSection id="por-que-multiplas-atraem" title="Por que multiplas parecem atraentes?">
          <p>
            Com uma stake pequena, as odds multiplicadas podem gerar um retorno potencial alto. Por isso as apostas multiplas costumam ser populares. Mas a chance de acertar todas as selecoes diminui a cada evento adicionado — mesmo que cada selecao individualmente pareca provavel.
          </p>
          <p>
            Retorno alto nao significa aposta melhor. Significa que o risco acumulado e maior.
          </p>
          <Callout tone="amber">
            Quanto mais selecoes voce adiciona, maior pode ser a odd final — mas maior tambem e a dificuldade de acertar tudo.
          </Callout>
        </ArticleSection>

        {/* Secao 8 */}
        <ArticleSection id="exemplo-pratico-multipla" title="Exemplo pratico: multipla com 3 selecoes">
          <div className="rounded-3xl p-5 my-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Valor apostado:</strong> R$20</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Time A vence:</strong> odd 1.60</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Mais de 2.5 gols:</strong> odd 1.90</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Time B vence:</strong> odd 2.10</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Odd combinada:</strong> 1.60 x 1.90 x 2.10 = 6.38</p>
            <p className="text-sm font-semibold mt-3" style={{ color: '#22d3ee' }}>Retorno potencial: R$127,60</p>
            <p className="text-sm font-semibold" style={{ color: '#22d3ee' }}>Lucro potencial: R$107,60</p>
          </div>
          <p>
            Se as 3 selecoes vencerem, o bilhete e pago. Se uma perder, a aposta e perdida. Se uma for anulada, depende das regras da plataforma.
          </p>
          <DataTable
            headers={['Cenario', 'Resultado da multipla']}
            rows={[
              ['Todas as 3 selecoes vencem', 'Multipla vence — retorno potencial pago'],
              ['Uma selecao perde', 'Multipla perde — stake perdida'],
              ['Uma selecao e anulada', 'Depende das regras da casa (normalmente odd 1.00)'],
            ]}
          />
        </ArticleSection>

        {/* Secao 9 */}
        <ArticleSection id="cashout-multipla" title="Aposta multipla com cashout: muda alguma coisa?">
          <p>
            Algumas casas oferecem cashout em apostas multiplas. Ele pode aparecer antes de todas as selecoes terminarem. Aceitar o cashout encerra o bilhete pelo valor oferecido pela plataforma naquele momento. Isso nao altera a regra basica da multipla — o cashout e uma opcao adicional, nao uma garantia de lucro.
          </p>
          <p>
            Para calcular o valor justo de um cashout, consulte a{' '}
            <Link to="/calculadoras/cashout" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Cashout</Link>,
            a <Link to="/calculadoras/cashout-justo" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Cashout Justo</Link>
            {' '}ou o guia de <Link to="/blog/cashout-manual" className="font-semibold" style={{ color: '#67e8f9' }}>cashout manual</Link>.
          </p>
        </ArticleSection>

        {/* Secao 10 */}
        <ArticleSection id="multipla-sem-acertar-tudo" title="Existe aposta multipla que nao precisa acertar tudo?">
          <p>
            Apostas de sistema, como Trixie, Yankee ou Lucky 15, combinam multiplas menores dentro de um bilhete maior. Isso pode permitir algum erro dependendo do formato. Mas esses nao sao a multipla simples tradicional. Sao formatos mais complexos, com regras proprias, e podem nao estar disponiveis em todas as plataformas.
          </p>
        </ArticleSection>

        {/* Secao 11 */}
        <ArticleSection id="multipla-vs-simples" title="Aposta multipla e mais arriscada que aposta simples?">
          <p>
            Geralmente sim. Em uma aposta simples, apenas um resultado precisa acertar. Em uma multipla, todas as selecoes precisam acertar. A probabilidade combinada tende a ser menor do que a probabilidade de cada selecao individualmente. O retorno potencial pode ser maior, mas a probabilidade de acerto e menor.
          </p>
          <p>
            Iniciantes devem ter cautela com apostas multiplas. Use a{' '}
            <Link to="/calculadoras/odds" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Odds</Link> para entender probabilidades e veja o guia de{' '}
            <Link to="/blog/como-calcular-retorno-de-aposta" className="font-semibold" style={{ color: '#67e8f9' }}>como calcular retorno de aposta</Link>.
          </p>
        </ArticleSection>

        {/* Secao 12 */}
        <ArticleSection id="erros-comuns-multipla" title="Erros comuns em apostas multiplas">
          <ul className="list-none space-y-2 mt-2">
            {[
              'Adicionar selecoes demais para inflar a odd combinada.',
              'Olhar apenas para o retorno potencial sem avaliar o risco.',
              'Nao calcular a odd combinada antes de apostar.',
              'Achar que multipla e uma forma facil de ganhar.',
              'Nao entender que uma selecao perdida derruba todo o bilhete.',
              'Ignorar regras de jogo anulado ou adiado.',
              'Usar multiplas para tentar recuperar perdas anteriores.',
              'Apostar por emocao ou impulsividade.',
              'Nao ter gestao de banca definida antes de apostar.',
              'Nao conferir os termos da casa antes de montar o bilhete.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#f87171' }}>X</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        {/* FAQ */}
        <section id="faq" className="mt-12 scroll-mt-28">
          <h2 className="text-3xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-1)' }}>Perguntas frequentes sobre aposta multipla</h2>
          <FAQSection items={faqItems} eyebrow="FAQ" />
        </section>

        {/* Conclusao */}
        <ArticleSection id="conclusao" title="Conclusao">
          <p>
            Na multipla comum, e preciso acertar todas as selecoes. Uma selecao perdida derruba o bilhete inteiro. Selecao void normalmente vira odd 1.00 — mas depende das regras da plataforma. As odds multiplicadas aumentam o retorno potencial e o risco ao mesmo tempo. Use a calculadora para entender os numeros antes de apostar.
          </p>
          <CtaBox
            href="/calculadoras/multipla-parlay"
            title="Simule sua aposta multipla antes de apostar"
            desc="Use a Calculadora de Aposta Multipla do CalculaBet para calcular odds combinadas, retorno e lucro potencial com clareza."
            btnLabel="Abrir calculadora de multipla"
          />
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              ['/calculadoras/multipla-parlay', 'Calculadora de Multipla'],
              ['/calculadoras/odds', 'Calculadora de Odds'],
              ['/calculadoras/cashout', 'Calculadora de Cashout'],
              ['/calculadoras/cashout-justo', 'Cashout Justo'],
              ['/calculadoras/gestao-banca', 'Gestao de Banca'],
              ['/calculadoras/unidade-stake', 'Calculadora de Unidade'],
              ['/calculadoras/roi', 'ROI em Apostas'],
              ['/blog/o-que-e-aposta-multipla', 'O que e aposta multipla'],
              ['/blog/como-calcular-retorno-de-aposta', 'Como calcular retorno'],
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

      {/* Artigos relacionados */}
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
