import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import FAQSection from '../../../components/ui/FAQSection';
import { getCategoryById } from '../../../data/blog/blogData';
import { ROLLOVER_APOSTAS_FAQS } from '../../../data/blog/rolloverApostasFaqs';

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

const faqItems = ROLLOVER_APOSTAS_FAQS.map(f => ({ q: f.question, a: f.answer }));

export default function RolloverApostasArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#fb923c', borderColor: `${category?.color || '#fb923c'}35`, background: `${category?.color || '#fb923c'}10` }}>{category?.name || 'Bônus e Promoções'}</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        {/* Header */}
        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div>
            <p className="badge badge-cyan mb-5">Guia educativo — bônus, rollover e requisitos</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">
              Rollover em Apostas: O Que É, Como Calcular e Cuidados com Bônus
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Muitas promoções de apostas incluem condições que definem o quanto você precisa apostar antes de qualquer saque relacionado ao bônus. O <strong>rollover</strong> é um dos requisitos mais importantes dessas promoções — e também um dos mais mal compreendidos. Este guia explica a fórmula, traz exemplos práticos e apresenta a{' '}
              <Link to="/calculadoras/rollover-bonus" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Rollover de Bônus</Link> do CalculaBet. Conteúdo educativo: bônus não é dinheiro grátis e apostas envolvem risco financeiro.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/rollover-bonus" className="btn-primary">
                Usar Calculadora de Rollover <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsável</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(251,146,60,0.07)', border: '1px solid rgba(251,146,60,0.17)' }} aria-label="Pontos essenciais sobre rollover">
            <p className="badge mb-4" style={{ color: '#fb923c', borderColor: 'rgba(251,146,60,0.30)', background: 'rgba(251,146,60,0.10)' }}>Três pontos essenciais</p>
            <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text-1)' }}>Antes de aceitar um bônus</h2>
            <div className="space-y-4">
              {[
                ['Calcule o total exigido', 'Base × multiplicador define o volume de apostas necessário.'],
                ['Leia as condições', 'Odd mínima, prazo e mercados elegíveis mudam o cenário.'],
                ['Bônus tem custo', 'Cumprir rollover não garante lucro nem saque automático.'],
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
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>Rollover é o volume de apostas exigido para liberar bônus ou saldo promocional. A conta básica é valor base do bônus multiplicado pelo requisito (ex.: 100 × 5x). O cálculo ajuda no planejamento, mas não transforma bônus em lucro garantido.</p>
        </section>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <Callout tone="amber">
          <strong>Conteúdo educativo:</strong> apostas envolvem riscos financeiros, são destinadas apenas a maiores de 18 anos. Não há garantia de ganhos, saque ou cumprimento do rollover. Bônus não é dinheiro grátis — sempre leia os termos. Use as ferramentas como apoio ao cálculo, não como promessa de resultado. Consulte nossas orientações de{' '}
          <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.
        </Callout>

        {/* O que é rollover */}
        <ArticleSection id="o-que-e-rollover" title="O que é rollover em apostas?">
          <p>
            Rollover é um requisito de apostas associado a bônus ou promoções em plataformas de apostas esportivas e cassino. Ele indica quantas vezes um determinado valor precisa ser apostado antes que o saldo do bônus possa ser convertido em saldo disponível para saque.
          </p>
          <p>
            O termo pode aparecer também como "requisito de apostas", "wagering requirement" ou "turnover". Independentemente do nome, o conceito é o mesmo: existe uma meta de volume de apostas que precisa ser cumprida para que o bônus seja liberado.
          </p>
          <p>
            O rollover pode incidir apenas sobre o valor do bônus, ou sobre a soma de depósito e bônus. O multiplicador indica quantas vezes esse valor precisa ser apostado. Além disso, podem existir restrições de odd mínima, prazo de validade e mercados elegíveis — tudo definido nos termos de cada promoção.
          </p>
          <Callout tone="amber">
            <strong>Bônus não é dinheiro grátis.</strong> Sempre leia os termos antes de participar de qualquer promoção.
          </Callout>
        </ArticleSection>

        {/* Como funciona */}
        <ArticleSection id="como-funciona-rollover" title="Como funciona o rollover de bônus?">
          <p>
            O processo começa quando o usuário recebe ou ativa uma promoção que inclui bônus. A plataforma define uma base de cálculo — que pode ser só o bônus ou o depósito somado ao bônus — e aplica um multiplicador sobre essa base.
          </p>
          <p>
            A partir daí, apenas apostas que atendam aos critérios da promoção são contabilizadas no progresso do rollover. Apostas canceladas, apostas feitas com cashout, apostas em mercados excluídos ou apostas com odds abaixo do mínimo podem não contar.
          </p>
          <p>
            O usuário precisa acompanhar três variáveis principais: o valor total exigido, o quanto já foi apostado e o prazo restante. Essas informações normalmente estão disponíveis no painel da conta na plataforma — e podem ser estimadas com uma{' '}
            <Link to="/calculadoras/rollover-bonus" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de rollover</Link>.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            {[
              ['Volume exigido', 'Calculado pela base vezes o multiplicador definido na promoção.'],
              ['Apostas válidas', 'Nem toda aposta conta — verifique odds mínimas e mercados elegíveis.'],
              ['Prazo', 'Muitos bônus têm validade. Não cumprir no prazo pode cancelar o benefício.'],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl p-4" style={{ background: 'rgba(251,146,60,0.04)', border: '1px solid rgba(251,146,60,0.12)' }}>
                <p className="font-semibold text-sm mb-2" style={{ color: '#fb923c' }}>{t}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{b}</p>
              </div>
            ))}
          </div>
        </ArticleSection>

        {/* Como calcular */}
        <ArticleSection id="como-calcular-rollover" title="Como calcular rollover em apostas?">
          <p>O cálculo parte de uma fórmula direta:</p>
          <FormulaBox
            label="Fórmula do rollover"
            formula="Total exigido = Base do rollover × Multiplicador"
            note="A base pode ser apenas o bônus ou a soma de depósito + bônus, conforme os termos da promoção."
          />
          <p>
            <strong>Exemplo 1 — rollover sobre o bônus:</strong> bônus de R$100 com rollover 5x. Total exigido = R$100 × 5 = <strong style={{ color: '#67e8f9' }}>R$500</strong>.
          </p>
          <p>
            <strong>Exemplo 2 — rollover sobre depósito + bônus:</strong> depósito de R$100, bônus de R$100, rollover 5x. Base = R$200. Total exigido = R$200 × 5 = <strong style={{ color: '#67e8f9' }}>R$1.000</strong>.
          </p>
          <p>
            A diferença entre os dois tipos pode dobrar o volume necessário. Por isso, entender qual base a promoção usa é tão importante quanto conhecer o multiplicador.
          </p>
          <CtaBox
            href="/calculadoras/rollover-bonus"
            title="Calcule rollover online"
            desc="Use a Calculadora de Rollover de Bônus do CalculaBet para calcular total exigido, valor restante e média diária sem erro manual."
            btnLabel="Abrir calculadora de rollover"
          />
        </ArticleSection>

        {/* Rollover sobre bônus vs depósito + bônus */}
        <ArticleSection id="tipos-de-rollover" title="Rollover sobre bônus vs depósito + bônus">
          <p>
            Essa distinção é uma das mais importantes ao avaliar qualquer promoção. O tipo de rollover determina a base de cálculo e, por consequência, o volume total de apostas exigido.
          </p>
          <DataTable
            headers={['Tipo de rollover', 'Base usada', 'Exemplo (5x)', 'Total exigido']}
            rows={[
              ['Apenas bônus', 'Valor do bônus', 'Bônus R$100', 'R$500'],
              ['Depósito + bônus', 'Depósito + bônus', 'R$100 + R$100 = R$200', 'R$1.000'],
            ]}
          />
          <p>
            Como mostra a tabela, com o mesmo multiplicador de 5x, o rollover sobre depósito + bônus exige o dobro do volume. Iniciantes frequentemente se surpreendem com o volume real exigido quando não verificam esse detalhe nos termos.
          </p>
          <Callout>
            Antes de aceitar um bônus, confira se o rollover incide apenas sobre o bônus ou sobre a soma com o depósito. Essa informação está nos termos e condições da promoção.
          </Callout>
        </ArticleSection>

        {/* O que significa 3x, 5x, 10x, 20x */}
        <ArticleSection id="rollover-multiplicadores" title="O que significa rollover 3x, 5x, 10x ou 20x?">
          <p>
            O número indica o multiplicador do requisito. Quanto maior o multiplicador, maior o volume de apostas necessário para cumprir a condição.
          </p>
          <DataTable
            headers={['Bônus', 'Rollover', 'Total a apostar (base = bônus)']}
            rows={[
              ['R$100', '3x', 'R$300'],
              ['R$100', '5x', 'R$500'],
              ['R$100', '10x', 'R$1.000'],
              ['R$100', '20x', 'R$2.000'],
            ]}
          />
          <p>
            Um rollover 10x exige o dobro do volume de um rollover 5x, usando a mesma base. Com base de depósito + bônus, os valores sobem ainda mais. Um rollover 20x sobre uma base de R$200 exige R$4.000 em apostas acumuladas.
          </p>
          <Callout tone="amber">
            <strong>Quanto maior o multiplicador, maior tende a ser o volume necessário e a exposição ao risco.</strong> Avalie com cuidado antes de aceitar promoções com rollover alto.
          </Callout>
        </ArticleSection>

        {/* Como usar a calculadora */}
        <ArticleSection id="calculadora-rollover" title="Como usar a Calculadora de Rollover de Bônus do CalculaBet">
          <p>
            A <Link to="/calculadoras/rollover-bonus" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Rollover de Bônus</Link> do CalculaBet foi criada para ajudar a entender o volume exigido, acompanhar progresso e estimar a média diária necessária. É uma ferramenta educativa — não prevê resultados nem garante saque.
          </p>
          <ol className="list-none space-y-3 mt-4">
            {[
              ['1', 'Informe o valor do bônus recebido.'],
              ['2', 'Informe o valor do depósito, se o rollover incidir sobre depósito + bônus.'],
              ['3', 'Selecione o tipo de rollover: apenas bônus ou depósito + bônus.'],
              ['4', 'Digite o multiplicador de rollover (ex: 5, 10, 20).'],
              ['5', 'Informe quanto já foi apostado para calcular o restante e o progresso.'],
              ['6', 'Se houver prazo, informe os dias disponíveis para ver a média diária necessária.'],
              ['7', 'Adicione a odd mínima, se existir, para visualizar o alerta correspondente.'],
              ['8', 'Veja o resumo: total exigido, restante, progresso percentual e barra de progresso.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3 text-sm sm:text-base items-start">
                <span className="rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{n}</span>
                <span style={{ color: 'var(--text-2)' }}>{text}</span>
              </li>
            ))}
          </ol>
          <CtaBox
            href="/calculadoras/rollover-bonus"
            title="Calcule o rollover antes de apostar"
            desc="Use a calculadora de rollover de bônus apostas para entender o volume necessário antes de participar de qualquer promoção."
            btnLabel="Abrir calculadora de rollover de bônus"
          />
        </ArticleSection>

        {/* Exemplo prático bônus R$100 */}
        <ArticleSection id="exemplo-bonus-100" title="Exemplo prático de rollover com bônus de R$100">
          <p>Considere o seguinte cenário:</p>
          <div className="rounded-3xl p-5 my-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Bônus:</strong> R$100</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Tipo:</strong> Rollover apenas sobre o bônus</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Multiplicador:</strong> 5x</p>
            <p className="text-sm font-semibold mt-3" style={{ color: '#22d3ee' }}>Total exigido: R$100 × 5 = R$500</p>
          </div>
          <p>
            Para cumprir esse rollover, seria necessário acumular R$500 em apostas válidas. Se a promoção exige odd mínima de 1.50 e prazo de 7 dias, o usuário precisaria apostar em média R$71,43 por dia em apostas com odd igual ou superior a 1.50.
          </p>
          <p>
            Isso não significa lucro. Significa que o usuário colocou R$500 em risco. O resultado final das apostas pode ser positivo, negativo ou zero — dependendo exclusivamente dos eventos apostados e dos resultados reais.
          </p>
          <Callout tone="amber">
            Cumprir rollover não garante lucro nem saque automático. Verifique sempre as condições de saque nos termos da promoção.
          </Callout>
        </ArticleSection>

        {/* Exemplo depósito + bônus */}
        <ArticleSection id="exemplo-deposito-bonus" title="Exemplo prático com depósito + bônus">
          <p>Com o mesmo multiplicador, mas com base diferente:</p>
          <div className="rounded-3xl p-5 my-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Depósito:</strong> R$100</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Bônus:</strong> R$100</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Tipo:</strong> Rollover sobre depósito + bônus</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Multiplicador:</strong> 5x</p>
            <p className="text-sm font-semibold mt-3" style={{ color: '#22d3ee' }}>Base: R$100 + R$100 = R$200 &rarr; Total exigido: R$200 × 5 = R$1.000</p>
          </div>
          <p>
            O requisito dobra em relação ao exemplo anterior. Muitos iniciantes se confundem quando comparam promoções de tipos diferentes sem verificar qual base está sendo usada. Por isso, a{' '}
            <Link to="/calculadoras/rollover-bonus" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de rollover do CalculaBet</Link> permite selecionar o tipo de base antes de calcular.
          </p>
        </ArticleSection>

        {/* Quanto falta */}
        <ArticleSection id="quanto-falta-rollover" title="Como saber quanto ainda falta para cumprir rollover?">
          <p>A fórmula do valor restante é simples:</p>
          <FormulaBox
            label="Valor restante"
            formula="Restante = Total exigido − Valor já apostado"
            note="Se o restante for zero ou negativo, o rollover está matematicamente completo. Confirme as condições de saque na plataforma."
          />
          <p>Exemplo:</p>
          <DataTable
            headers={['Campo', 'Valor']}
            rows={[
              ['Total exigido', 'R$1.000'],
              ['Já apostado', 'R$300'],
              ['Restante', 'R$700'],
              ['Progresso', '30%'],
            ]}
          />
          <p>
            Acompanhar o progresso evita surpresas. Algumas plataformas mostram esse dado no painel da conta. Se não mostrar, a{' '}
            <Link to="/calculadoras/rollover-bonus" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora pode estimar</Link> o restante e calcular a média diária necessária com base no prazo informado.
          </p>
        </ArticleSection>

        {/* Odd mínima */}
        <ArticleSection id="odd-minima-bonus" title="O que é odd mínima em bônus?">
          <p>
            Odd mínima é um critério que define a cotação mínima que uma aposta precisa ter para ser contabilizada no progresso do rollover. Se a odd mínima exigida é 1.50, apostas em eventos com odd 1.30 ou 1.40 podem não contar, independentemente do resultado.
          </p>
          <p>
            Esse critério impede que o usuário aposte em eventos com probabilidade muito alta (odds muito baixas) para cumprir o rollover com menor risco percebido. Na prática, quanto maior a odd mínima, maior o risco individual de cada aposta.
          </p>
          <DataTable
            headers={['Odd mínima', 'Probabilidade implícita', 'Impacto']}
            rows={[
              ['1.50', '66,67%', 'Comum em freebets e bônus de boas-vindas.'],
              ['1.70', '58,82%', 'Risco moderado — exclui apostas de alto favorito.'],
              ['2.00', '50,00%', 'Exige odds de eventos equilibrados — risco mais alto por aposta.'],
            ]}
          />
          <Callout tone="amber">
            <strong>Antes de apostar, verifique se a odd escolhida atende ao mínimo exigido.</strong> Apostas abaixo da odd mínima podem não contar para o rollover.
          </Callout>
        </ArticleSection>

        {/* Prazo */}
        <ArticleSection id="prazo-rollover" title="Prazo do rollover: por que isso importa?">
          <p>
            Muitos bônus têm prazo de validade — normalmente entre 7 e 30 dias, dependendo da promoção. Se o rollover não for completado nesse período, o bônus pode ser cancelado e os ganhos associados podem ser perdidos.
          </p>
          <p>
            Prazos curtos podem criar pressão para apostar com mais frequência ou com valores maiores do que o planejado. Apostar com pressa para cumprir um requisito é um comportamento que aumenta o risco de decisões impulsivas.
          </p>
          <p>
            A média diária necessária ajuda a entender se o requisito é realista. Exemplo: restante de R$700 em 7 dias exige uma média de R$100 por dia em apostas válidas. Se esse valor for incompatível com seu controle de banca, o bônus pode não fazer sentido para a sua situação.
          </p>
          <Callout tone="red">
            <strong>Prazo curto pode estimular decisões impulsivas.</strong> Avalie se o volume diário necessário é compatível com seus limites antes de aceitar a promoção.
          </Callout>
        </ArticleSection>

        {/* Todas as apostas contam */}
        <ArticleSection id="apostas-que-contam" title="Todas as apostas contam para rollover?">
          <p>
            Não necessariamente. O que conta depende das regras de cada promoção. Apostas em mercados específicos, com odds abaixo do mínimo, em cassino quando o bônus é esportivo, ou apostas cobertas (hedge) podem não ser contabilizadas.
          </p>
          <ul className="list-none space-y-2 mt-3">
            {[
              'Apostas canceladas ou adiadas podem não contar.',
              'Apostas em cash-out parcial ou total podem ter regras específicas.',
              'Apostas em mercados excluídos pela promoção não contam.',
              'Apostas com odds abaixo do mínimo exigido podem ser ignoradas.',
              'Apostas cobertas (hedge) podem ser excluídas por alguns termos.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#f87171' }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Callout>
            Verifique os termos detalhados da promoção para saber quais mercados, tipos de aposta e odds são aceitos para o rollover.
          </Callout>
        </ArticleSection>

        {/* Garante saque? */}
        <ArticleSection id="rollover-garante-saque" title="Rollover garante saque?">
          <p>
            Não. Completar o rollover pode ser apenas uma das condições para solicitar um saque. Dependendo da plataforma, podem existir outras exigências, como verificação de identidade (KYC), saldo mínimo, limite de saque, prazo de processamento e métodos de pagamento elegíveis.
          </p>
          <p>
            Além disso, o resultado financeiro após o rollover depende dos resultados das apostas — que podem ser positivos, negativos ou neutros. Cumprir o requisito de volume não cria saldo automaticamente: ele apenas libera a possibilidade de saque, sujeita a todas as outras condições.
          </p>
          <Callout tone="red">
            Cumprir rollover não garante lucro nem saque automático. Confirme todas as condições diretamente na plataforma.
          </Callout>
        </ArticleSection>

        {/* Bônus é dinheiro grátis? */}
        <ArticleSection id="bonus-dinheiro-gratis" title="Bônus de apostas é dinheiro grátis?">
          <p>
            Não deve ser tratado como dinheiro grátis. Bônus de apostas geralmente vêm com condições: rollover, odd mínima, prazo, mercados elegíveis e regras de saque. Para retirar qualquer valor relacionado ao bônus, é preciso cumprir todos esses requisitos.
          </p>
          <p>
            Em muitos casos, o processo de cumprir o rollover envolve colocar um volume significativo em risco. Se as apostas durante esse processo resultarem em perdas, o saldo final pode ser menor do que o valor do depósito original — mesmo que o bônus tenha sido recebido.
          </p>
          <Callout tone="amber">
            <strong>Se uma promoção parece simples demais, leia os termos com ainda mais atenção.</strong> Bônus altos costumam vir com rollover alto.
          </Callout>
        </ArticleSection>

        {/* Rollover alto é arriscado? */}
        <ArticleSection id="rollover-alto-risco" title="Rollover alto é arriscado?">
          <p>
            Multiplicadores altos exigem volume maior de apostas, o que naturalmente aumenta a exposição financeira. Para cumprir um rollover 20x sobre uma base de R$100, seria necessário apostar R$2.000 em apostas válidas.
          </p>
          <ul className="list-none space-y-2 mt-3">
            {[
              'Exige volume elevado de apostas, aumentando a exposição acumulada.',
              'Pode estimular decisões impulsivas para cumprir o requisito no prazo.',
              'Apostas feitas apenas para cumprir rollover podem ter análise menos cuidadosa.',
              'Perdas durante o processo não são compensadas pelo valor do bônus em muitos cenários.',
              'Pode levar à tentativa de recuperar perdas, aumentando ainda mais o risco.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#f87171' }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              ['/jogo-responsavel', 'Jogo responsável'],
              ['/calculadoras/unidade-stake', 'Calculadora de Stake'],
              ['/calculadoras/gestao-banca', 'Gestão de Banca'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-sm px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>
        </ArticleSection>

        {/* Rollover e gestão de banca */}
        <ArticleSection id="rollover-gestao-banca" title="Rollover e gestão de banca">
          <p>
            Aceitar um bônus com rollover não deve suspender as regras de gestão de banca. Apostar valores maiores do que o habitual apenas para acelerar o cumprimento do rollover é um dos erros mais comuns — e pode comprometer a banca de forma desproporcional ao benefício do bônus.
          </p>
          <p>
            Usar <Link to="/calculadoras/unidade-stake" className="font-semibold" style={{ color: '#67e8f9' }}>stake fixa ou unitária</Link> durante o período de rollover ajuda a manter o controle. Calcule o total exigido, estime quantas apostas serão necessárias com sua stake habitual e verifique se o prazo é realista antes de aceitar a promoção.
          </p>
          <p>
            A <Link to="/calculadoras/gestao-banca" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de gestão de banca</Link> pode ajudar a definir limites compatíveis com o seu controle. Use as ferramentas em conjunto para tomar decisões mais informadas.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              ['/calculadoras/unidade-stake', 'Calculadora de Unidade'],
              ['/calculadoras/gestao-banca', 'Gestão de Banca'],
              ['/blog/o-que-e-unidade-apostas', 'O que é unidade em apostas'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-sm px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>
        </ArticleSection>

        {/* Rollover e casas de apostas */}
        <ArticleSection id="rollover-casas-apostas" title="Rollover e casas de apostas">
          <p>
            Cada plataforma define seus próprios termos de rollover, que podem mudar a qualquer momento. Multiplicadores, odds mínimas, mercados elegíveis, prazos e regras de saque variam de uma promoção para outra e de uma plataforma para outra.
          </p>
          <p>
            O CalculaBet pode receber comissão por links de parceiros, mas não controla os termos, bônus ou condições de nenhuma plataforma. A disponibilidade de qualquer promoção deve ser verificada diretamente no site da casa de apostas. Confira a{' '}
            <Link to="/politica-de-afiliados" className="font-semibold" style={{ color: '#67e8f9' }}>política de afiliados</Link> para entender como os links de parceiros funcionam.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              ['/casas-apostas', 'Casas de Apostas'],
              ['/politica-de-afiliados', 'Política de Afiliados'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-sm px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>
        </ArticleSection>

        {/* Erros comuns */}
        <ArticleSection id="erros-comuns-rollover" title="Erros comuns ao avaliar bônus com rollover">
          <ul className="list-none space-y-2 mt-2">
            {[
              'Achar que bônus é dinheiro grátis sem condições.',
              'Não calcular o volume total exigido antes de aceitar.',
              'Confundir rollover sobre bônus com rollover sobre depósito + bônus.',
              'Ignorar a odd mínima e apostar em mercados que não contam.',
              'Não verificar o prazo de validade da promoção.',
              'Apostar em mercados excluídos pela promoção.',
              'Usar cashout sem verificar se a aposta contará para o rollover.',
              'Tentar cumprir rollover com pressa e tomar decisões impulsivas.',
              'Aumentar o valor das apostas para cumprir o requisito mais rápido.',
              'Não considerar que o resultado pode ser negativo durante o processo.',
              'Não ler as regras de saque associadas ao bônus.',
              'Tentar recuperar perdas apostando ainda mais para cumprir o rollover.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#f87171' }}>✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ArticleSection>

        {/* Como avaliar com responsabilidade */}
        <ArticleSection id="avaliar-promocao-responsabilidade" title="Como avaliar uma promoção com responsabilidade">
          <p>Antes de aceitar qualquer bônus com rollover, passe por este checklist:</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {[
              'Qual é o valor do bônus?',
              'O rollover é sobre bônus ou depósito + bônus?',
              'Qual é o multiplicador?',
              'Existe odd mínima exigida?',
              'Quais mercados são elegíveis?',
              'Qual é o prazo de validade?',
              'Existe limite de saque?',
              'O volume exigido é realista para minha banca?',
              'Estou apostando por decisão própria ou por pressão?',
              'Li os termos oficiais da promoção?',
            ].map((item, i) => (
              <div key={i} className="flex gap-3 rounded-2xl p-3.5 text-sm" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
                <span className="shrink-0 font-mono font-bold" style={{ color: '#22d3ee' }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ color: 'var(--text-2)' }}>{item}</span>
              </div>
            ))}
          </div>
          <Callout tone="green">
            Use a <Link to="/calculadoras/rollover-bonus" className="font-semibold" style={{ color: '#4ade80' }}>Calculadora de Rollover de Bônus do CalculaBet</Link> para calcular o volume exigido, o restante e a média diária — antes de aceitar qualquer promoção.
          </Callout>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        {/* FAQ */}
        <section id="faq" className="mt-12 scroll-mt-28">
          <h2 className="text-3xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-1)' }}>Perguntas frequentes sobre rollover em apostas</h2>
          <FAQSection items={faqItems} eyebrow="FAQ" />
        </section>

        {/* Conclusão */}
        <ArticleSection id="conclusao" title="Conclusão">
          <p>
            Rollover define o volume de apostas necessário para liberar um bônus. O cálculo depende da base escolhida — apenas o bônus ou depósito + bônus — e do multiplicador. Odd mínima, prazo e mercados elegíveis podem alterar significativamente o cenário real.
          </p>
          <p>
            Bônus não é dinheiro grátis. Antes de aceitar qualquer promoção, calcule o volume total exigido, verifique os termos completos e avalie se o requisito é compatível com seus limites de jogo responsável e controle de banca.
          </p>
          <CtaBox
            href="/calculadoras/rollover-bonus"
            title="Calcule o rollover antes de participar"
            desc="Use a Calculadora de Rollover de Bônus do CalculaBet para calcular o volume necessário, acompanhar progresso e avaliar se os requisitos fazem sentido antes de participar de uma promoção."
            btnLabel="Abrir calculadora de rollover"
          />
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              ['/calculadoras/rollover-bonus', 'Calculadora de Rollover'],
              ['/calculadoras/unidade-stake', 'Calculadora de Unidade'],
              ['/calculadoras/gestao-banca', 'Gestão de Banca'],
              ['/calculadoras/odds', 'Calculadora de Odds'],
              ['/calculadoras/value-bet', 'Value Bet / EV'],
              ['/calculadoras/roi', 'ROI em Apostas'],
              ['/blog/o-que-e-unidade-apostas', 'O que é unidade'],
              ['/blog/como-calcular-ev-apostas', 'Como calcular EV'],
              ['/blog/apostas-esportivas-para-iniciantes', 'Guia para iniciantes'],
              ['/jogo-responsavel', 'Jogo responsável'],
              ['/blog', 'Ver todos os artigos'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
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
