import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import FAQSection from '../../../components/ui/FAQSection';
import { getCategoryById } from '../../../data/blog/blogData';
import { ODDS_JUSTAS_FAQS } from '../../../data/blog/oddsJustasFaqs';

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
    : tone === 'green'
    ? { background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }
    : { background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)' };
  return <div className="rounded-3xl p-5 my-7 leading-relaxed" style={styles}>{children}</div>;
}

function FormulaBox({ label, formula, children }) {
  return (
    <div className="rounded-3xl p-6 my-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.08))', border: '1px solid rgba(103,232,249,0.20)' }}>
      <p className="badge badge-cyan mb-4">{label}</p>
      <p className="text-xl sm:text-2xl font-bold leading-relaxed font-mono" style={{ color: 'var(--text-1)' }}>{formula}</p>
      {children && <div className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>}
    </div>
  );
}

function ExampleBox({ title, color = '#22d3ee', bg = 'rgba(34,211,238,0.06)', border = 'rgba(34,211,238,0.18)', children }) {
  return (
    <div className="rounded-3xl p-6 my-6" style={{ background: bg, border: `1px solid ${border}` }}>
      <p className="font-bold text-sm mb-4" style={{ color }}>{title}</p>
      <div className="space-y-2 text-sm sm:text-base leading-relaxed font-mono" style={{ color: 'var(--text-2)' }}>{children}</div>
    </div>
  );
}

function Row({ label, value, valueColor, className = '' }) {
  return (
    <div className={`flex justify-between items-center py-2 border-b ${className}`} style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <span style={{ color: 'var(--text-3)' }}>{label}</span>
      <span className="font-semibold font-mono" style={{ color: valueColor || 'var(--text-1)' }}>{value}</span>
    </div>
  );
}

const faqItems = ODDS_JUSTAS_FAQS.map(f => ({ q: f.question, a: f.answer }));

export default function OddsJustasArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#22d3ee', borderColor: `${category?.color || '#22d3ee'}35`, background: `${category?.color || '#22d3ee'}10` }}>{category?.name || 'Odds e Probabilidades'}</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        {/* Header */}
        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div>
            <p className="badge badge-cyan mb-5">Guia educativo — matemática e exemplos práticos</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">
              Odds Justas: Como Calcular a Odd sem Margem da Casa
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              As odds exibidas pelas casas de apostas geralmente incluem uma margem embutida. Odds justas são uma estimativa matemática de quanto seria cada cotação sem essa margem — um ponto de referência para entender melhor a precificação do mercado. Este guia explica a fórmula, mostra exemplos de 2 resultados e futebol 1X2, e apresenta a <Link to="/calculadoras/odds-justas" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Odds Justas</Link> do CalculaBet. O conteúdo é educativo: odds justas não preveem resultados nem garantem lucro.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/odds-justas" className="btn-primary">
                Usar Calculadora de Odds Justas <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsável</Link>
            </div>
          </div>

          <aside className="rounded-3xl p-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.10), rgba(129,140,248,0.07))', border: '1px solid rgba(103,232,249,0.18)' }}>
            <p className="badge badge-cyan mb-4">Fórmula resumida</p>
            <div className="space-y-1 text-sm font-mono" style={{ color: 'var(--text-2)' }}>
              <Row label="Prob. implícita" value="1 / odd" />
              <Row label="Soma" value="Σ (1 / odd)" />
              <Row label="Prob. justa" value="Prob. impl. / Soma" />
              <Row label="Odd justa" value="1 / Prob. justa" valueColor="#67e8f9" />
            </div>
            <p className="mt-5 text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              Todos os resultados do mesmo mercado devem ser incluídos no cálculo.
            </p>
          </aside>
        </header>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <Callout tone="amber">
          <strong>Importante:</strong> conteúdo apenas educativo, indicado para maiores de 18 anos. Apostas envolvem riscos financeiros. Odds justas não preveem resultados nem garantem lucro. Use ferramentas como apoio ao cálculo, nunca como promessa de ganhos. Leia nossas orientações de{' '}
          <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.
        </Callout>

        {/* ── Seção 1 ── */}
        <ArticleSection id="o-que-sao" title="O que são odds justas?">
          <p>
            Odds justas são uma estimativa matemática das cotações que existiriam em um mercado de apostas se a casa não adicionasse sua margem operacional. Também são chamadas de <strong>odds sem margem</strong> ou <strong>odds normalizadas</strong>.
          </p>
          <p>
            Na prática, quando uma casa de apostas monta um mercado, ela ajusta as cotações de forma que a soma das probabilidades implícitas ultrapasse 100%. Essa diferença acima de 100% é a margem — conhecida como overround. As odds justas representam uma tentativa de reverter esse ajuste, redistribuindo a margem proporcionalmente entre os resultados.
          </p>
          <p>
            Entender odds justas ajuda a interpretar mercados, comparar casas e estudar a precificação das odds. Mas é importante deixar claro o que elas <em>não</em> são:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Não são previsão do resultado do evento.</li>
            <li>Não revelam a probabilidade real de cada resultado.</li>
            <li>Não indicam automaticamente que uma aposta tem valor.</li>
            <li>Não garantem lucro em hipótese alguma.</li>
          </ul>
          <Callout>
            <strong>Odds justas mostram uma estimativa sem margem, mas não indicam automaticamente que uma aposta tem valor esperado positivo.</strong>
          </Callout>
          <p>
            Um exemplo simples: em um mercado equilibrado com duas opções, se a casa oferece odds de 1.90 para cada resultado, as odds justas estimadas ficam próximas de 2.00 para cada lado — porque parte do desconto entre 2.00 e 1.90 representa a margem embutida.
          </p>
        </ArticleSection>

        {/* ── Seção 2 ── */}
        <ArticleSection id="diferenca-oferecida-justa" title="Qual a diferença entre odd oferecida e odd justa?">
          <p>
            A <strong>odd oferecida</strong> é a cotação que aparece na plataforma da casa de apostas. É o número que você usa para calcular retorno e lucro se o palpite for vencedor. Ela já inclui a margem operacional da casa.
          </p>
          <p>
            A <strong>odd justa</strong> é uma estimativa matemática de quanto seria a cotação sem essa margem. Depende de todas as odds do mesmo mercado e representa uma referência de precificação sem o desconto comercial.
          </p>
          <div className="overflow-x-auto rounded-3xl my-4" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
            <table className="w-full text-left text-sm">
              <thead style={{ background: 'rgba(255,255,255,0.06)' }}>
                <tr>
                  <th className="p-4">Conceito</th>
                  <th className="p-4">O que significa</th>
                  <th className="p-4">Para que serve</th>
                  <th className="p-4">Limitação</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-2)' }}>
                <tr className="border-t border-white/10">
                  <td className="p-4 font-semibold" style={{ color: 'var(--text-1)' }}>Odd oferecida</td>
                  <td className="p-4">Cotação exibida pela casa, com margem embutida</td>
                  <td className="p-4">Calcular retorno e lucro potencial de uma aposta</td>
                  <td className="p-4">Inclui desconto em relação à odd justa</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-4 font-semibold" style={{ color: '#67e8f9' }}>Odd justa</td>
                  <td className="p-4">Estimativa sem a margem da casa</td>
                  <td className="p-4">Entender precificação e comparar mercados</td>
                  <td className="p-4">Estimativa baseada nas odds do mercado, não na realidade do evento</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Em geral, quanto maior a margem da casa, maior a diferença entre odd oferecida e odd justa. Essa diferença é o custo implícito de apostar naquele mercado.
          </p>
        </ArticleSection>

        {/* ── Seção 3 ── */}
        <ArticleSection id="por-que-casas-colocam-margem" title="Por que as casas de apostas colocam margem nas odds?">
          <p>
            As casas de apostas ajustam as odds para garantir margem operacional independentemente do resultado. Em vez de oferecer cotações que reflitam exatamente as probabilidades do mercado, elas reduzem ligeiramente cada odd, de forma que a soma das probabilidades implícitas ultrapasse 100%.
          </p>
          <p>
            Essa margem — o overround — é o que sustenta o modelo de negócios das plataformas. Por isso, em mercados competitivos com muita liquidez, a margem costuma ser menor. Em mercados menos negociados, pode ser maior. O CalculaBet não publica margens de casas específicas, mas entender o conceito ajuda a ler qualquer mercado com mais clareza.
          </p>
          <p>
            O cálculo de odds justas é essencialmente o processo de reverter essa margem — estimando como seriam as cotações sem o ajuste comercial.
          </p>
        </ArticleSection>

        {/* ── Seção 4 ── */}
        <ArticleSection id="formula-passo-a-passo" title="Como calcular odds justas passo a passo">
          <p>O processo é direto. Você precisa apenas de todas as odds do mesmo mercado e de uma calculadora simples — ou da <Link to="/calculadoras/odds-justas" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Odds Justas</Link> do CalculaBet.</p>

          <div className="space-y-3 my-4">
            {[
              ['Passo 1', 'Colete todas as odds do mesmo mercado (ex.: Casa, Empate, Fora em um jogo de futebol).'],
              ['Passo 2', 'Calcule a probabilidade implícita de cada odd: Prob. impl. = 1 / odd.'],
              ['Passo 3', 'Some todas as probabilidades implícitas para encontrar o overround.'],
              ['Passo 4', 'Normalize cada probabilidade dividindo pelo overround total.'],
              ['Passo 5', 'Converta a probabilidade normalizada em odd justa: odd justa = 1 / prob. normalizada.'],
            ].map(([step, desc]) => (
              <div key={step} className="flex gap-4 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="font-bold text-sm shrink-0" style={{ color: '#67e8f9' }}>{step}</span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{desc}</span>
              </div>
            ))}
          </div>

          <FormulaBox label="Probabilidade implícita">
            {'Prob. impl. = 1 / odd'}
          </FormulaBox>

          <FormulaBox label="Soma das probabilidades (overround)">
            {'Soma = Σ (1 / odd) para todos os resultados'}
          </FormulaBox>

          <FormulaBox label="Probabilidade justa (normalizada)">
            {'Prob. justa = Prob. impl. / Soma'}
          </FormulaBox>

          <FormulaBox label="Odd justa" formula="Odd justa = 1 / Prob. justa">
            <p>Equivalente a: Odd justa = Soma / Prob. impl.</p>
          </FormulaBox>

          <Callout>
            <strong>Para calcular corretamente, use todas as odds do mesmo mercado.</strong> Omitir qualquer resultado torna o cálculo impreciso.
          </Callout>
        </ArticleSection>

        {/* ── Seção 5 ── */}
        <ArticleSection id="exemplo-2-resultados" title="Exemplo de odds justas em mercado de 2 resultados">
          <p>
            Imagine um mercado de handicap asiático ou um jogo de tênis em que há apenas dois resultados possíveis, com odds simétricas de 1.90 para cada lado.
          </p>

          <ExampleBox title="Mercado: 2 resultados — odd 1.90 / 1.90">
            <Row label="Resultado A — odd oferecida" value="1.90" />
            <Row label="Resultado B — odd oferecida" value="1.90" />
            <Row label="Prob. impl. A = 1 / 1.90" value="52,63%" />
            <Row label="Prob. impl. B = 1 / 1.90" value="52,63%" />
            <Row label="Soma (overround)" value="105,26%" valueColor="#fbbf24" />
            <Row label="Margem da casa" value="≈ 5,26%" valueColor="#fbbf24" />
          </ExampleBox>

          <p>Com o overround calculado, normalizamos as probabilidades:</p>

          <ExampleBox title="Normalização e odds justas" color="#34d399" bg="rgba(34,197,94,0.06)" border="rgba(34,197,94,0.18)">
            <Row label="Prob. justa A = 52,63 / 105,26" value="50,00%" />
            <Row label="Prob. justa B = 52,63 / 105,26" value="50,00%" />
            <Row label="Odd justa A = 1 / 0,50" value="2.00" valueColor="#34d399" />
            <Row label="Odd justa B = 1 / 0,50" value="2.00" valueColor="#34d399" />
          </ExampleBox>

          <p>
            A odd oferecida de 1.90 fica abaixo da odd justa estimada de 2.00. Essa diferença de 0.10 representa a parcela da margem embutida neste resultado. O mercado cobra, matematicamente, 5,26% de overround distribuído proporcionalmente entre os dois lados.
          </p>
        </ArticleSection>

        {/* ── Seção 6 ── */}
        <ArticleSection id="exemplo-futebol-1x2" title="Exemplo de odds justas em futebol 1X2">
          <p>
            No futebol, o mercado 1X2 sempre tem três resultados: vitória do time mandante (Casa), empate e vitória do visitante (Fora). Ignorar o empate torna o cálculo incorreto.
          </p>

          <ExampleBox title="Mercado 1X2 — odds oferecidas">
            <Row label="Casa — odd oferecida" value="2.10" />
            <Row label="Empate — odd oferecida" value="3.40" />
            <Row label="Fora — odd oferecida" value="3.60" />
          </ExampleBox>

          <ExampleBox title="Probabilidades implícitas e overround" color="#fbbf24" bg="rgba(251,191,36,0.06)" border="rgba(251,191,36,0.18)">
            <Row label="Prob. impl. Casa = 1 / 2.10" value="47,62%" />
            <Row label="Prob. impl. Empate = 1 / 3.40" value="29,41%" />
            <Row label="Prob. impl. Fora = 1 / 3.60" value="27,78%" />
            <Row label="Soma (overround)" value="104,81%" valueColor="#fbbf24" />
            <Row label="Margem da casa" value="≈ 4,81%" valueColor="#fbbf24" />
          </ExampleBox>

          <ExampleBox title="Probabilidades justas e odds justas" color="#34d399" bg="rgba(34,197,94,0.06)" border="rgba(34,197,94,0.18)">
            <Row label="Prob. justa Casa = 47,62 / 104,81" value="≈ 45,43%" />
            <Row label="Prob. justa Empate = 29,41 / 104,81" value="≈ 28,06%" />
            <Row label="Prob. justa Fora = 27,78 / 104,81" value="≈ 26,50%" />
            <Row label="Odd justa Casa = 1 / 0,4543" value="≈ 2.20" valueColor="#34d399" />
            <Row label="Odd justa Empate = 1 / 0,2806" value="≈ 3.56" valueColor="#34d399" />
            <Row label="Odd justa Fora = 1 / 0,2650" value="≈ 3.77" valueColor="#34d399" />
          </ExampleBox>

          <div className="overflow-x-auto rounded-3xl my-4" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
            <table className="w-full text-left text-sm">
              <thead style={{ background: 'rgba(255,255,255,0.06)' }}>
                <tr>
                  <th className="p-4">Resultado</th>
                  <th className="p-4">Odd oferecida</th>
                  <th className="p-4">Prob. implícita</th>
                  <th className="p-4">Prob. justa</th>
                  <th className="p-4" style={{ color: '#67e8f9' }}>Odd justa</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-2)' }}>
                <tr className="border-t border-white/10">
                  <td className="p-4">Casa</td>
                  <td className="p-4">2.10</td>
                  <td className="p-4">47,62%</td>
                  <td className="p-4">45,43%</td>
                  <td className="p-4 font-bold" style={{ color: '#67e8f9' }}>≈ 2.20</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-4">Empate</td>
                  <td className="p-4">3.40</td>
                  <td className="p-4">29,41%</td>
                  <td className="p-4">28,06%</td>
                  <td className="p-4 font-bold" style={{ color: '#67e8f9' }}>≈ 3.56</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="p-4">Fora</td>
                  <td className="p-4">3.60</td>
                  <td className="p-4">27,78%</td>
                  <td className="p-4">26,50%</td>
                  <td className="p-4 font-bold" style={{ color: '#67e8f9' }}>≈ 3.77</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Perceba que em todos os resultados a odd justa é maior que a odd oferecida. Isso é o esperado: a margem da casa reduz as cotações abaixo do nível justo.
          </p>
        </ArticleSection>

        {/* ── Seção 7 ── */}
        <ArticleSection id="como-usar-calculadora" title="Como usar a Calculadora de Odds Justas do CalculaBet">
          <p>
            A <Link to="/calculadoras/odds-justas" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Odds Justas</Link> do CalculaBet faz todo o processo acima automaticamente. Você insere as odds e ela calcula o overround, as probabilidades implícitas, as probabilidades normalizadas e as odds justas estimadas de cada resultado em segundos.
          </p>

          <div className="space-y-3 my-5">
            {[
              ['1. Acesse a ferramenta', <>Use a <Link to="/calculadoras/odds-justas" style={{ color: '#67e8f9' }}>calculadora de odds justas online</Link> diretamente no CalculaBet.</>],
              ['2. Insira todos os resultados', 'Adicione um campo para cada resultado do mercado. Para futebol 1X2, use três campos. Para over/under, dois campos.'],
              ['3. Digite as odds oferecidas', 'Informe a cotação exibida pela casa para cada resultado.'],
              ['4. Veja as probabilidades implícitas', 'A ferramenta calcula automaticamente a probabilidade implícita de cada odd.'],
              ['5. Confira o overround', 'O resumo do mercado mostra a margem total e o payout teórico.'],
              ['6. Veja as probabilidades normalizadas', 'Cada probabilidade é ajustada para remover a margem proporcionalmente.'],
              ['7. Compare odd oferecida com odd justa', 'A tabela mostra a diferença em pontos e em percentual para cada resultado.'],
            ].map(([step, desc]) => (
              <div key={step} className="flex gap-4 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="font-bold text-sm shrink-0" style={{ color: '#67e8f9' }}>{step}</span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{desc}</span>
              </div>
            ))}
          </div>

          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.16), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.20)' }}>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Calcule odds justas agora</h2>
            <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Use a <strong>ferramenta de odds justas do CalculaBet</strong> para remover a margem da casa e comparar odds oferecidas com odds justas estimadas.
            </p>
            <Link to="/calculadoras/odds-justas" className="btn-primary mt-5">
              Abrir Calculadora de Odds Justas <BlogIcon name="arrow" className="w-4 h-4" />
            </Link>
          </div>
        </ArticleSection>

        {/* ── Seção 8 ── */}
        <ArticleSection id="odds-justas-e-overround" title="Odds justas e overround: qual a relação?">
          <p>
            Overround e odds justas são conceitos profundamente ligados: um é o ponto de partida, o outro é o resultado. O <strong>overround</strong> é a soma das probabilidades implícitas de todos os resultados de um mercado — o número que costuma ultrapassar 100% e que indica a existência de margem.
          </p>
          <p>
            As <strong>odds justas</strong> são calculadas a partir desse overround: você o usa para normalizar as probabilidades e, com isso, estimar as cotações sem a margem.
          </p>
          <p>
            O fluxo é sempre: calcular overround → normalizar probabilidades → converter em odds justas. Portanto, entender o overround é indispensável para entender odds justas.
          </p>
          <p>
            Para calcular o overround de um mercado ou analisar o payout teórico, use também a <Link to="/calculadoras/overround" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Margem da Casa (Overround)</Link> do CalculaBet. E se quiser aprofundar o conceito, leia o artigo <Link to="/blog/overround-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>O que é Overround em Apostas Esportivas</Link>.
          </p>
        </ArticleSection>

        {/* ── Seção 9 ── */}
        <ArticleSection id="odds-justas-e-probabilidade-implicita" title="Odds justas e probabilidade implícita">
          <p>
            A probabilidade implícita é o passo intermediário que conecta a odd oferecida à odd justa. Sem ela, não é possível calcular odds justas.
          </p>
          <p>
            O processo começa convertendo cada odd em probabilidade implícita usando a fórmula 1 / odd. Esse valor em percentual mostra o que a cotação "sugere" como chance do resultado. A soma dessas probabilidades revela o overround. Normalizar essas probabilidades para somar 100% e inverter o resultado produz as odds justas.
          </p>
          <p>
            A diferença fundamental entre probabilidade implícita e probabilidade justa é que a implícita inclui a margem da casa — por isso sua soma passa de 100% — enquanto a probabilidade justa é uma estimativa sem margem.
          </p>
          <p>
            Para aprofundar, leia o guia <Link to="/blog/probabilidade-implicita-odds" className="font-semibold" style={{ color: '#67e8f9' }}>O que é Probabilidade Implícita nas Odds</Link> ou use a <Link to="/calculadoras/odds" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Odds</Link> para converter cotações em probabilidade rapidamente.
          </p>
        </ArticleSection>

        {/* ── Seção 10 ── */}
        <ArticleSection id="odds-justas-e-value-bet" title="Odds justas e value bet">
          <p>
            Um <Link to="/blog/value-bet-o-que-e" className="font-semibold" style={{ color: '#67e8f9' }}>value bet</Link> acontece quando a sua estimativa de probabilidade para um resultado é maior do que a probabilidade implícita da odd oferecida. Odds justas entram nessa análise como referência de precificação sem margem.
          </p>
          <p>
            Se uma odd oferecida estiver acima da odd justa estimada para aquele resultado, isso pode chamar atenção — mas não é suficiente para confirmar um value bet. A odd justa é calculada a partir das próprias odds do mercado, sem considerar informações externas como escalações, histórico ou contexto da partida.
          </p>
          <p>
            Para identificar um value bet real, você precisa de uma estimativa própria de probabilidade — independente das odds oferecidas — e compará-la com a probabilidade implícita da cotação.
          </p>
          <Callout>
            <strong>Odd acima da odd justa pode ser um sinal interessante, mas não substitui análise de probabilidade.</strong>
          </Callout>
          <p>
            Para calcular o valor esperado de uma aposta com sua estimativa de probabilidade, use a <Link to="/calculadoras/value-bet" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Value Bet / EV</Link>. Para entender como calcular EV na prática, leia também o guia <Link to="/blog/como-calcular-ev-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>Como Calcular EV em Apostas Esportivas</Link>.
          </p>
        </ArticleSection>

        {/* ── Seção 11 ── */}
        <ArticleSection id="odd-justa-vs-odd-real" title="Odd justa é a mesma coisa que odd real?">
          <p>
            Não exatamente. A odd justa é uma estimativa matemática baseada nas odds do mercado — ela usa o overround disponível para recalcular cotações sem margem. Mas isso não significa que ela revela a probabilidade real do evento.
          </p>
          <p>
            A probabilidade real de um evento esportivo depende de fatores que as odds do mercado não capturam completamente: escalação, forma, condição de campo, motivação, lesões, contexto da competição e centenas de outras variáveis. O mercado tenta precificar esses fatores, mas não é perfeito.
          </p>
          <p>
            A odd justa remove a camada comercial da casa, mas não remove a incerteza do evento em si. Por isso, ela serve como referência de mercado sem margem, não como revelação da probabilidade verdadeira.
          </p>
        </ArticleSection>

        {/* ── Seção 12 ── */}
        <ArticleSection id="odds-justas-garantem-lucro" title="Odds justas garantem lucro?">
          <p>
            Não. Odds justas não garantem lucro em nenhuma circunstância. Elas são uma ferramenta de análise matemática, não uma previsão de resultado.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Odds justas não preveem qual resultado vai acontecer.</li>
            <li>Não eliminam o risco financeiro das apostas.</li>
            <li>Não indicam automaticamente uma aposta com valor esperado positivo.</li>
            <li>Não consideram contexto, escalações, forma ou qualquer dado externo.</li>
          </ul>
          <Callout tone="amber">
            <strong>Ferramentas ajudam a entender números, mas não transformam apostas em renda garantida.</strong>
          </Callout>
          <p>
            Apostas esportivas envolvem incerteza por natureza. Usar odds justas como ferramenta educativa é legítimo; tratar o resultado como garantia é um equívoco que pode levar a decisões impulsivas.
          </p>
        </ArticleSection>

        {/* ── Seção 13 ── */}
        <ArticleSection id="quando-usar-odds-justas" title="Quando usar odds justas?">
          <p>Há situações em que calcular odds justas é particularmente útil como ponto de análise:</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              ['Comparar mercados', 'Entender qual mercado tem menor margem embutida em relação às odds justas estimadas.'],
              ['Estudar overround', 'Entender quanto de margem está embutido nas cotações de diferentes casas.'],
              ['Complementar análise de EV', 'Ter referência de precificação sem margem antes de comparar com sua estimativa de probabilidade.'],
              ['Comparar odds entre casas', 'Para o mesmo evento, ver qual casa oferece cotações mais próximas das odds justas estimadas.'],
              ['Analisar mercados 1X2', 'Garantir que o empate seja incluído no cálculo do mercado de futebol.'],
              ['Aprender sobre margem', 'Entender matematicamente como a margem é distribuída entre resultados.'],
            ].map(([title, desc]) => (
              <div key={title} className="card-glass p-5">
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4">
            Para comparar casas de apostas e encontrar as melhores opções disponíveis, explore também a página de <Link to="/casas-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>casas de apostas</Link>. Para converter formatos de odds rapidamente, use o <Link to="/calculadoras/conversor-odds" className="font-semibold" style={{ color: '#67e8f9' }}>Conversor de Odds</Link>.
          </p>
        </ArticleSection>

        {/* ── Seção 14 ── */}
        <ArticleSection id="erros-comuns" title="Erros comuns ao calcular odds justas">
          <p>Ao estudar ou calcular odds justas, alguns erros recorrentes comprometem o resultado:</p>
          <ul className="space-y-3 mt-3">
            {[
              'Usar odds de mercados diferentes — por exemplo, misturar handicap com 1X2.',
              'Esquecer um resultado possível — especialmente o empate no futebol 1X2.',
              'Usar odds desatualizadas — odds mudam ao longo do dia e antes do evento.',
              'Confundir odd justa com previsão — ela não revela o resultado mais provável.',
              'Achar que odd justa garante lucro — não garante e nunca deve ser usada com essa expectativa.',
              'Misturar odds de casas diferentes sem propósito claro — isso pode distorcer a referência do mercado.',
              'Não entender probabilidade implícita — etapa sem a qual o cálculo não funciona.',
              'Ignorar gestão de banca ao apostar — <Link to="/calculadoras/gestao-banca">calcular odds justas não substitui gestão de risco</Link>.',
              'Apostar com base apenas em diferença entre odd oferecida e odd justa — sem análise de probabilidade própria.',
              'Agir por emoção após calcular a margem — o número não deve disparar decisões impulsivas.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="font-bold shrink-0 text-sm mt-0.5" style={{ color: '#f87171' }}>✕</span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </ArticleSection>

        {/* ── Seção 15 ── */}
        <ArticleSection id="interpretar-com-responsabilidade" title="Como interpretar odds justas com responsabilidade">
          <p>
            Odds justas são uma ferramenta de análise matemática. Para usá-las de forma responsável:
          </p>
          <ul className="space-y-3 mt-3">
            {[
              'Use como referência de mercado, não como certeza de resultado.',
              'Compare com outras métricas — probabilidade estimada, contexto, histórico.',
              'Evite decisões impulsivas baseadas apenas na diferença entre odd oferecida e odd justa.',
              'Nunca aposte dinheiro essencial para contas, alimentação, moradia ou compromissos.',
              'Defina limites de banca antes de apostar — para isso, use a Calculadora de Gestão de Banca.',
              'Faça pausas se perceber ansiedade ou pressão emocional.',
              'O resultado esportivo continua incerto mesmo após calcular odds justas.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="font-bold shrink-0 text-sm mt-0.5" style={{ color: '#34d399' }}>✓</span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5">
            Para aprofundar práticas de gestão de risco, leia sobre <Link to="/calculadoras/gestao-banca" className="font-semibold" style={{ color: '#67e8f9' }}>Gestão de Banca</Link> e consulte a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>Jogo Responsável</Link> do CalculaBet.
          </p>
        </ArticleSection>

        {/* ── Seção 16 — Conclusão ── */}
        <ArticleSection id="conclusao" title="Conclusão">
          <p>
            Odds justas são uma estimativa matemática das cotações que existiriam sem a margem operacional da casa de apostas. O cálculo exige todas as odds do mesmo mercado, usa probabilidades implícitas como base, normaliza essas probabilidades para remover o overround e converte o resultado de volta em cotações.
          </p>
          <p>
            A odd justa ajuda a entender a precificação de um mercado, comparar casas e complementar estudos de value bet. Mas ela não prevê resultados, não revela a probabilidade real de eventos esportivos e não garante lucro em nenhuma circunstância.
          </p>
          <p>
            A <Link to="/calculadoras/odds-justas" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Odds Justas</Link> do CalculaBet automatiza esse processo: você insere as odds do mercado e ela retorna o overround, o payout teórico e a estimativa de odd justa para cada resultado, com a diferença em relação à odd oferecida.
          </p>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.16), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.20)' }}>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Calcule odds sem margem da casa</h2>
            <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Use a <strong>Calculadora de Odds Justas do CalculaBet</strong> para calcular odds sem margem, comparar mercados e entender melhor a precificação das odds.
            </p>
            <Link to="/calculadoras/odds-justas" className="btn-primary mt-5">
              Abrir Calculadora de Odds Justas <BlogIcon name="arrow" className="w-4 h-4" />
            </Link>
          </div>
        </ArticleSection>

        <Callout tone="amber">
          <strong>Aviso de compliance:</strong> este artigo é educativo e destinado a maiores de 18 anos. Apostas esportivas envolvem riscos financeiros reais. Odds justas não preveem resultados nem garantem lucro. Ferramentas devem ser usadas como apoio ao cálculo, nunca como promessa de ganho. O CalculaBet não é uma casa de apostas. Consulte sempre as regras, termos, licença e disponibilidade da plataforma escolhida. Em caso de dificuldade com controle de apostas, acesse a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.
        </Callout>
      </article>

      {/* FAQ */}
      <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

      <FAQSection faqItems={faqItems} title="Perguntas frequentes sobre odds justas" />

      {/* Artigos relacionados */}
      {relatedPosts?.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-1)' }}>Artigos relacionados</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map(related => (
              <BlogCard key={related.slug} post={related} category={getCategoryById(related.category)} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
