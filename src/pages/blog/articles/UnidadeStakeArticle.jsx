import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import FAQSection from '../../../components/ui/FAQSection';
import { getCategoryById } from '../../../data/blog/blogData';
import { UNIDADE_STAKE_FAQS } from '../../../data/blog/unidadeStakeFaqs';

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

function TableRow({ cols, header = false }) {
  const Tag = header ? 'th' : 'td';
  return (
    <tr className={header ? '' : 'border-t border-white/10'} style={header ? { background: 'rgba(255,255,255,0.06)' } : { color: 'var(--text-2)' }}>
      {cols.map((col, i) => (
        <Tag key={i} className="p-4 text-sm" style={header ? {} : (i === 0 ? { color: 'var(--text-1)', fontWeight: '600', fontFamily: 'monospace' } : {})}>{col}</Tag>
      ))}
    </tr>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-3xl my-4" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      <table className="w-full text-left">
        <thead><TableRow cols={headers} header /></thead>
        <tbody>{rows.map((r, i) => <TableRow key={i} cols={r} />)}</tbody>
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

const faqItems = UNIDADE_STAKE_FAQS.map(f => ({ q: f.question, a: f.answer }));

export default function UnidadeStakeArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#fbbf24', borderColor: `${category?.color || '#fbbf24'}35`, background: `${category?.color || '#fbbf24'}10` }}>{category?.name || 'Gestão de Banca'}</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        {/* Header */}
        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div>
            <p className="badge badge-cyan mb-5">Guia educativo — controle de banca e stake</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">
              O que é Unidade em Apostas e Como Calcular sua Stake
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Muitos iniciantes apostam valores aleatórios, sem uma regra clara sobre quanto colocar em cada jogo. Usar <strong>unidades de aposta</strong> e <strong>stake fixa</strong> é uma forma simples de organizar a exposição — definindo um percentual fixo da banca para cada aposta. Este guia explica a fórmula, traz exemplos com R$100, R$500 e R$1.000, e apresenta a <Link to="/calculadoras/unidade-stake" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Unidade / Stake Fixa</Link> do CalculaBet. Conteúdo educativo: stake fixa não garante lucro nem elimina risco.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/unidade-stake" className="btn-primary">
                Usar Calculadora de Unidade <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsável</Link>
            </div>
          </div>

          <aside className="rounded-3xl p-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.10), rgba(129,140,248,0.07))', border: '1px solid rgba(103,232,249,0.18)' }}>
            <p className="badge badge-cyan mb-4">Fórmula resumida</p>
            <p className="text-lg font-bold font-mono mb-4" style={{ color: 'var(--text-1)' }}>Unidade = Banca × %</p>
            <div className="space-y-2 text-sm" style={{ color: 'var(--text-2)' }}>
              {[
                ['Banca R$1.000 · 1%', 'R$10 por aposta'],
                ['Banca R$500 · 2%', 'R$10 por aposta'],
                ['Banca R$100 · 1%', 'R$1 por aposta'],
              ].map(([ex, res]) => (
                <div key={ex} className="flex justify-between items-center py-1.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <span style={{ color: 'var(--text-3)' }}>{ex}</span>
                  <span className="font-semibold font-mono" style={{ color: '#67e8f9' }}>{res}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              Percentuais são referências educativas. Não representam recomendação personalizada.
            </p>
          </aside>
        </header>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <Callout tone="amber">
          <strong>Importante:</strong> conteúdo apenas educativo, indicado para maiores de 18 anos. Apostas envolvem riscos financeiros. Stake fixa e unidade não garantem lucro nem eliminam perdas. Não use dinheiro essencial. Leia nossas orientações de{' '}
          <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.
        </Callout>

        {/* ── 1 ── */}
        <ArticleSection id="o-que-e-unidade" title="O que é unidade em apostas?">
          <p>
            Unidade em apostas é um valor padrão usado para medir e padronizar o tamanho de cada aposta em relação à banca total. Em vez de escolher aleatoriamente quanto colocar em cada jogo, o apostador define uma unidade — geralmente um percentual fixo da banca — e usa esse valor como referência consistente.
          </p>
          <p>
            Por exemplo: se a banca é R$1.000 e 1 unidade equivale a 1%, então 1 unidade vale R$10. Se a banca for R$500 e a unidade for 2%, cada aposta de 1 unidade corresponde a R$10 também. O valor absoluto muda conforme a banca, mas o controle proporcional permanece.
          </p>
          <p>
            Usar unidades facilita o registro de resultados. Em vez de dizer "ganhei R$50", o apostador pode dizer "ganhei 5 unidades". Isso torna mais fácil comparar desempenho independentemente do tamanho da banca — especialmente útil ao calcular <Link to="/calculadoras/roi" className="font-semibold" style={{ color: '#67e8f9' }}>ROI</Link>.
          </p>
          <Callout>
            <strong>Unidade não é garantia de lucro. É apenas uma forma de organizar o tamanho das apostas.</strong>
          </Callout>
        </ArticleSection>

        {/* ── 2 ── */}
        <ArticleSection id="o-que-e-stake" title="O que é stake em apostas?">
          <p>
            Stake é o valor efetivamente apostado em uma aposta específica. Pode ser baseado em 1 unidade, em 2 unidades ou em qualquer múltiplo definido pelo apostador. Stake não deve ser escolhida por impulso ou emoção — deve seguir o plano de gestão definido antes da aposta.
          </p>
          <p>
            É importante entender a diferença entre três conceitos que se confundem frequentemente:
          </p>
          <DataTable
            headers={['Conceito', 'Significado', 'Exemplo']}
            rows={[
              ['Banca', 'Dinheiro total separado para apostas', 'R$1.000'],
              ['Unidade', 'Valor padrão por aposta (% da banca)', '1% da banca = R$10'],
              ['Stake', 'Valor colocado em uma aposta específica', '2 unidades = R$20'],
            ]}
          />
          <p>
            A banca é o total disponível. A unidade é o padrão calculado sobre ela. A stake é o valor real de cada aposta, que pode ser de 1 ou mais unidades conforme o plano definido.
          </p>
        </ArticleSection>

        {/* ── 3 ── */}
        <ArticleSection id="o-que-e-stake-fixa" title="O que é stake fixa?">
          <p>
            Stake fixa é a estratégia de apostar sempre o mesmo valor ou percentual da banca, independentemente da odd, do evento ou do resultado anterior. É uma das formas mais simples de <Link to="/calculadoras/gestao-banca" className="font-semibold" style={{ color: '#67e8f9' }}>gestão de banca</Link> e costuma ser recomendada em contextos educativos para quem está aprendendo.
          </p>
          <p>
            Com stake fixa, você define o percentual uma vez — por exemplo, 2% da banca — e usa esse valor em todas as apostas. Após uma derrota, a stake permanece igual. Após uma vitória, também. Isso evita o comportamento de dobrar apostas para recuperar perdas, que costuma amplificar o risco.
          </p>
          <p>
            Exemplo: banca de R$500, stake fixa de 2%. Cada aposta = R$500 × 2% = <strong style={{ color: '#67e8f9' }}>R$10</strong>. Mesmo após 3 derrotas seguidas, a próxima aposta ainda é R$10.
          </p>
          <Callout tone="amber">
            <strong>Stake fixa ajuda a controlar exposição, mas não garante lucro e não elimina perdas.</strong>
          </Callout>
        </ArticleSection>

        {/* ── 4 ── */}
        <ArticleSection id="como-calcular-unidade" title="Como calcular unidade de aposta">
          <p>
            A fórmula é direta e pode ser aplicada a qualquer tamanho de banca:
          </p>
          <FormulaBox label="Fórmula da unidade" formula="Unidade = Banca × (Percentual / 100)">
            <p>Exemplo: Banca R$1.000 × (1 / 100) = <strong>R$10 por unidade</strong></p>
          </FormulaBox>
          <p>
            Se o apostador quiser usar mais de uma unidade por aposta, basta multiplicar o valor da unidade pela quantidade:
          </p>
          <FormulaBox label="Stake total" formula="Stake = Unidade × Quantidade de unidades">
            <p>Exemplo: R$10 × 2 unidades = <strong>R$20 de stake total</strong></p>
          </FormulaBox>
          <p>
            O percentual deve ser escolhido antes de apostar, sem pressão emocional, e deve fazer sentido para o perfil de risco e para o tamanho da banca disponível.
          </p>
        </ArticleSection>

        {/* ── 5 ── */}
        <ArticleSection id="calculadora" title="Como usar a Calculadora de Unidade / Stake Fixa do CalculaBet">
          <p>
            A <Link to="/calculadoras/unidade-stake" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Unidade / Stake Fixa</Link> do CalculaBet automatiza todos os cálculos. Você insere os dados e ela calcula instantaneamente o valor da unidade, a stake total, a exposição da banca e mostra uma tabela de referência com diferentes percentuais.
          </p>
          <div className="space-y-3 my-5">
            {[
              ['1. Acesse a ferramenta', <>Abra a <Link to="/calculadoras/unidade-stake" style={{ color: '#67e8f9' }}>calculadora stake fixa</Link> no CalculaBet.</>],
              ['2. Informe sua banca total', 'Digite o valor disponível para apostas em reais.'],
              ['3. Escolha o percentual', 'Digite o percentual que deseja usar por aposta (ex: 1 para 1%).'],
              ['4. Defina as unidades', 'Informe quantas unidades quer usar por aposta (padrão: 1).'],
              ['5. Veja o valor da unidade', 'A calculadora mostra automaticamente quanto vale 1 unidade.'],
              ['6. Confira a stake total', 'Se usar mais de 1 unidade, veja o valor total a ser apostado.'],
              ['7. Analise a exposição', 'Veja quanto da banca está sendo exposto e quantas apostas cabem no total.'],
              ['8. Use como apoio educativo', 'O resultado não indica qual aposta fazer nem garante resultado.'],
            ].map(([step, desc]) => (
              <div key={step} className="flex gap-4 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="font-bold text-sm shrink-0" style={{ color: '#67e8f9' }}>{step}</span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{desc}</span>
              </div>
            ))}
          </div>
          <CtaBox
            title="Calcule sua unidade agora"
            desc="Use a Calculadora de Unidade / Stake Fixa do CalculaBet para calcular quanto vale sua unidade com base na banca e entender sua exposição antes de apostar."
            href="/calculadoras/unidade-stake"
            btnLabel="Abrir Calculadora de Unidade"
          />
        </ArticleSection>

        {/* ── 6 ── */}
        <ArticleSection id="quanto-apostar" title="Quanto apostar por jogo?">
          <p>
            Não existe uma resposta universal. A quantidade certa a apostar por jogo depende da banca, do perfil de risco, da experiência, dos limites pessoais e da tolerância a sequências negativas. O que parece pequeno para uma banca grande pode ser muito para uma banca menor.
          </p>
          <p>
            Percentuais menores deixam mais margem para sequências negativas sem comprometer a banca rapidamente. Percentuais maiores amplificam o impacto de cada resultado — tanto positivo quanto negativo.
          </p>
          <Callout>
            <strong>Quanto apostar por jogo deve ser definido antes da aposta, não no impulso e não depois de uma sequência de perdas ou ganhos.</strong>
          </Callout>
          <p>
            Os percentuais abaixo são referências educativas — não representam recomendação personalizada nem indicam qual valor é melhor para cada situação.
          </p>
        </ArticleSection>

        {/* ── 7 ── */}
        <ArticleSection id="exemplo-100" title="Exemplo com banca de R$100">
          <p>
            Com uma banca pequena, a diferença entre percentuais fica mais visível em valores absolutos baixos. É especialmente importante não tentar crescer rápido com percentuais altos — o risco de comprometer a banca em poucos jogos aumenta muito.
          </p>
          <DataTable
            headers={['Percentual', 'Valor da unidade', 'Apostas na banca (aprox.)', 'Perfil educativo']}
            rows={[
              ['0,5%', 'R$0,50', '~200', 'Muito conservador'],
              ['1%', 'R$1,00', '~100', 'Conservador'],
              ['2%', 'R$2,00', '~50', 'Moderado'],
              ['3%', 'R$3,00', '~33', 'Agressivo'],
              ['5%', 'R$5,00', '~20', 'Muito agressivo'],
            ]}
          />
          <p>
            A coluna "apostas na banca" mostra quantas apostas perdidas consecutivamente equivaleriam ao total da banca. É um dado educativo, não uma previsão de quantas apostas serão perdidas.
          </p>
        </ArticleSection>

        {/* ── 8 ── */}
        <ArticleSection id="exemplo-500" title="Exemplo com banca de R$500">
          <p>
            Com R$500, os valores ficam mais confortáveis para apostas de baixo risco. Ainda assim, percentuais altos podem comprometer a banca rapidamente em uma sequência negativa.
          </p>
          <DataTable
            headers={['Percentual', 'Valor da unidade', 'Apostas na banca (aprox.)']}
            rows={[
              ['0,5%', 'R$2,50', '~200'],
              ['1%', 'R$5,00', '~100'],
              ['2%', 'R$10,00', '~50'],
              ['3%', 'R$15,00', '~33'],
              ['5%', 'R$25,00', '~20'],
            ]}
          />
          <p>
            Controle emocional é especialmente importante durante sequências negativas. Aumentar a stake depois de perder para "recuperar" é um dos erros mais comuns e pode acelerar o esvaziamento da banca.
          </p>
        </ArticleSection>

        {/* ── 9 ── */}
        <ArticleSection id="exemplo-1000" title="Exemplo com banca de R$1.000">
          <p>
            Com uma banca de R$1.000, os valores absolutos ficam mais representativos. 1% equivale a R$10 por aposta — um valor de referência muito citado em contextos educativos.
          </p>
          <DataTable
            headers={['Percentual', 'Valor da unidade', 'Apostas na banca (aprox.)']}
            rows={[
              ['0,5%', 'R$5,00', '~200'],
              ['1%', 'R$10,00', '~100'],
              ['2%', 'R$20,00', '~50'],
              ['3%', 'R$30,00', '~33'],
              ['5%', 'R$50,00', '~20'],
            ]}
          />
          <p>
            Use a <Link to="/calculadoras/unidade-stake" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de unidade</Link> para explorar diferentes bancas e percentuais e entender visualmente como cada combinação afeta a exposição.
          </p>
        </ArticleSection>

        {/* ── 10 ── */}
        <ArticleSection id="stake-1-pct" title="Stake de 1% da banca: como funciona?">
          <p>
            Stake de 1% é um exemplo educativo frequentemente citado por representar exposição baixa por aposta. Com 1%, são necessárias 100 apostas perdidas consecutivamente para esgotar a banca — o que dá mais margem de tempo para analisar resultados e ajustar estratégia.
          </p>
          <p>
            Com banca de R$1.000, 1% = R$10. Com R$500, R$5. Com R$100, R$1. O valor muda, mas a proporção é sempre a mesma. Isso torna mais fácil manter consistência ao longo do tempo.
          </p>
          <p>
            Importante: 1% não garante nenhum resultado. É apenas uma faixa usada como referência educativa por reduzir o impacto de cada aposta individual na banca total.
          </p>
        </ArticleSection>

        {/* ── 11 ── */}
        <ArticleSection id="stake-2-pct" title="Stake de 2% da banca: quando faz sentido?">
          <p>
            Stake de 2% já representa o dobro da exposição por aposta em relação a 1%. Com banca de R$1.000, são R$20 por jogo. Uma sequência de 10 derrotas consecutivas com 2% equivale a 20% de perda na banca.
          </p>
          <p>
            Não existe uma resposta sobre quando 2% "faz sentido" — isso depende do perfil, da tolerância a perdas e do controle emocional de cada pessoa. O que é mais importante é não usar nenhum percentual para tentar recuperar prejuízo anterior.
          </p>
          <Callout tone="amber">
            <strong>Não use stake para tentar recuperar perdas.</strong> Aumentar o percentual depois de uma sequência negativa amplifica o risco e costuma piorar a situação.
          </Callout>
        </ArticleSection>

        {/* ── 12 ── */}
        <ArticleSection id="stake-5-pct" title="Apostar 5% da banca é arriscado?">
          <p>
            Percentuais acima de 5% por aposta aumentam significativamente o impacto de cada resultado na banca. Com 5%, uma sequência de 20 derrotas consecutivas esgota a banca — o que pode acontecer mais facilmente do que parece, especialmente em mercados com alta variância.
          </p>
          <p>
            Isso não é julgamento sobre 5% ser "certo" ou "errado" — é matemática. Percentuais altos amplificam tanto ganhos quanto perdas. Quem usa percentuais altos precisa estar consciente do impacto e aceitar o risco correspondente.
          </p>
          <p>
            Para quem está aprendendo ou trabalhando com bancas menores, percentuais mais conservadores costumam dar mais tempo para entender o comportamento das odds, do mercado e da própria tomada de decisão.
          </p>
        </ArticleSection>

        {/* ── 13 ── */}
        <ArticleSection id="fixa-vs-variavel" title="Unidade fixa vs stake variável">
          <p>
            Existem duas abordagens principais para definir o tamanho de cada aposta: usar sempre o mesmo percentual (stake fixa) ou variar conforme a análise (stake variável).
          </p>
          <DataTable
            headers={['Método', 'Como funciona', 'Vantagem', 'Risco']}
            rows={[
              ['Stake fixa', 'Mesmo % sempre, independente do evento', 'Simples, previsível, fácil de controlar', 'Não considera variação de confiança entre apostas'],
              ['Stake variável', 'Percentual muda conforme análise', 'Pode ser mais flexível', 'Exige disciplina; pode levar a exageros'],
            ]}
          />
          <p>
            Para iniciantes, a stake fixa costuma ser mais indicada por ser mais simples de manter. A stake variável exige mais experiência e disciplina para não ser influenciada por emoção.
          </p>
        </ArticleSection>

        {/* ── 14 ── */}
        <ArticleSection id="fixa-vs-kelly" title="Stake fixa vs Critério de Kelly">
          <p>
            O <Link to="/blog/criterio-de-kelly-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>Critério de Kelly</Link> é uma fórmula que usa a odd e uma estimativa de probabilidade para sugerir o tamanho ideal da stake. A stake fixa usa um percentual definido sem depender de qualquer estimativa de probabilidade.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            {[
              ['Stake fixa', ['Simples e previsível', 'Não depende de probabilidade estimada', 'Fácil de manter', 'Menos sensível a erros de estimativa']],
              ['Critério de Kelly', ['Usa odd e probabilidade estimada', 'Pode sugerir exposição maior ou menor', 'Mais eficiente com estimativas precisas', 'Pode ser agressivo com estimativas imprecisas']],
            ].map(([title, items]) => (
              <div key={title} className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="font-bold mb-3 text-base" style={{ color: 'var(--text-1)' }}>{title}</h3>
                <ul className="space-y-2">
                  {items.map(item => <li key={item} className="flex gap-2 text-sm"><span style={{ color: '#22d3ee' }}>→</span>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4">
            Para calcular stakes usando Kelly, use a <Link to="/calculadoras/gestao-banca" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Gestão de Banca</Link>. Ambos os métodos não garantem lucro.
          </p>
        </ArticleSection>

        {/* ── 15 ── */}
        <ArticleSection id="unidade-roi-registro" title="Unidade, ROI e registro de apostas">
          <p>
            Uma das vantagens de trabalhar com unidades é facilitar o registro e a análise de resultados. Ao anotar apostas em unidades, é possível comparar desempenho mesmo quando a banca muda de tamanho ao longo do tempo.
          </p>
          <p>
            O <Link to="/calculadoras/roi" className="font-semibold" style={{ color: '#67e8f9' }}>ROI</Link> (retorno sobre investimento) mede o desempenho em relação ao volume apostado. Combinado com o registro em unidades, ele oferece uma visão mais clara sobre se uma estratégia está funcionando — mas não prevê resultados futuros nem garante continuidade.
          </p>
          <p>
            Para registrar apostas com mais detalhes, inclua: data, evento, mercado, odd, stake (em R$ e em unidades), resultado e lucro/prejuízo. Quanto mais completo o registro, mais útil a análise posterior.
          </p>
        </ArticleSection>

        {/* ── 16 ── */}
        <ArticleSection id="unidade-martingale" title="Unidade e Martingale: por que tomar cuidado">
          <p>
            O <Link to="/calculadoras/martingale" className="font-semibold" style={{ color: '#67e8f9' }}>Martingale</Link> é uma estratégia que aumenta a stake após cada derrota, geralmente dobrando o valor, com o objetivo de recuperar perdas em uma vitória. Esse comportamento contradiz diretamente a lógica da stake fixa.
          </p>
          <p>
            Em uma sequência negativa, o Martingale exige apostas cada vez maiores. Com banca de R$100 e stake inicial de R$5: após 3 derrotas, a próxima aposta seria R$40 — ou seja, 40% da banca original. A progressão pode esgotar a banca rapidamente.
          </p>
          <Callout tone="amber">
            <strong>Tentar recuperar perdas aumentando a stake é um sinal de alerta.</strong> Use a <Link to="/calculadoras/martingale" style={{ color: '#fbbf24' }}>Calculadora de Martingale</Link> para simular a progressão e entender o risco matemático real.
          </Callout>
        </ArticleSection>

        {/* ── 17 ── */}
        <ArticleSection id="erros-comuns" title="Erros comuns ao calcular stake">
          <ul className="space-y-3 mt-2">
            {[
              'Apostar valor aleatório sem definir percentual previamente.',
              'Mudar a stake por impulso ou por confiança excessiva em um palpite.',
              'Aumentar a stake depois de perder para tentar recuperar o prejuízo.',
              'Usar percentual alto demais sem considerar o impacto de sequências negativas.',
              'Não separar a banca de apostas do dinheiro pessoal.',
              'Usar dinheiro essencial — salário, aluguel, contas ou alimentação.',
              'Não registrar apostas, odds e resultados.',
              'Ignorar o impacto acumulado de uma sequência negativa.',
              'Confundir confiança em um palpite com vantagem matemática real.',
              'Achar que stake fixa garante lucro ou transforma apostas em renda.',
              'Não revisar a banca e ajustar a unidade quando ela mudar muito.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="font-bold shrink-0 text-sm mt-0.5" style={{ color: '#f87171' }}>✕</span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </ArticleSection>

        {/* ── 18 ── */}
        <ArticleSection id="responsabilidade" title="Como usar unidade com responsabilidade">
          <ul className="space-y-3 mt-2">
            {[
              'Defina a banca e o percentual antes de apostar, sem pressão.',
              'Use apenas dinheiro que pode perder sem comprometer despesas pessoais.',
              'Respeite o percentual definido mesmo após sequências negativas.',
              'Revise a banca periodicamente e ajuste o valor da unidade quando necessário.',
              'Registre todas as apostas para analisar desempenho com dados reais.',
              'Faça pausas quando sentir ansiedade, irritação ou pressa.',
              'Busque ajuda se perceber dificuldade em parar ou controlar apostas.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="font-bold shrink-0 text-sm mt-0.5" style={{ color: '#34d399' }}>✓</span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5">
            Para orientações completas sobre controle e limites, consulte a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>Jogo Responsável</Link> do CalculaBet e leia o guia sobre <Link to="/blog/o-que-e-gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>Gestão de Banca</Link>.
          </p>
        </ArticleSection>

        {/* ── 19 — Conclusão ── */}
        <ArticleSection id="conclusao" title="Conclusão">
          <p>
            Definir uma unidade de aposta é um passo simples e eficaz para organizar a exposição. A fórmula é direta: unidade = banca × percentual. Stake fixa aplica esse valor de forma consistente, sem variar por emoção ou resultado anterior.
          </p>
          <p>
            Percentuais menores deixam mais margem para sequências negativas. Percentuais maiores amplificam tanto ganhos quanto perdas. Nenhum percentual garante lucro — stake fixa é uma ferramenta de controle, não de previsão.
          </p>
          <p>
            A <Link to="/calculadoras/unidade-stake" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Unidade / Stake Fixa</Link> do CalculaBet facilita esse processo: você insere a banca e o percentual, e ela mostra instantaneamente o valor da unidade, a stake total, a exposição e uma tabela de referência com diferentes percentuais.
          </p>
          <CtaBox
            title="Calcule quanto vale sua unidade"
            desc="Use a Calculadora de Unidade / Stake Fixa do CalculaBet para calcular sua unidade com base na banca e entender sua exposição antes de apostar."
            href="/calculadoras/unidade-stake"
            btnLabel="Abrir Calculadora de Unidade"
          />
        </ArticleSection>

        <Callout tone="amber">
          <strong>Aviso de compliance:</strong> este artigo é educativo e destinado a maiores de 18 anos. Apostas esportivas envolvem riscos financeiros reais. Stake fixa e unidade não garantem lucro nem preveem resultados. Não use dinheiro essencial para contas, alimentação, moradia ou compromissos. O CalculaBet não é uma casa de apostas. Para orientações sobre controle e limites, acesse a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.
        </Callout>
      </article>

      {/* FAQ */}
      <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

      <FAQSection items={faqItems} title="Perguntas frequentes sobre unidade e stake" eyebrow="FAQ" />

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
