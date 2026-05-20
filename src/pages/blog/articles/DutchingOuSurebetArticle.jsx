import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import FAQSection from '../../../components/ui/FAQSection';
import { getCategoryById } from '../../../data/blog/blogData';
import { DUTCHING_OU_SUREBET_FAQS } from '../../../data/blog/dutchingOuSurebetFaqs';

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

const faqItems = DUTCHING_OU_SUREBET_FAQS.map(f => ({ q: f.question, a: f.answer }));

export default function DutchingOuSurebetArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#34d399', borderColor: `${category?.color || '#34d399'}35`, background: `${category?.color || '#34d399'}10` }}>{category?.name || 'Arbitragem e Dutching'}</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        {/* Header */}
        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div>
            <p className="badge badge-cyan mb-5">Guia comparativo — dutching, surebet, arbitragem e calculadoras</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">
              Dutching ou Surebet: Diferenca e Quando Cada Calculo Faz Sentido
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Dutching e Surebet envolvem distribuir stakes entre resultados, mas tem objetivos diferentes. Surebet busca arbitragem matematica. Dutching distribui exposicao. Nenhum metodo elimina todos os riscos. Use a{' '}
              <Link to="/calculadoras/dutching" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Dutching</Link> e a{' '}
              <Link to="/calculadoras/arbitragem" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Arbitragem</Link> do CalculaBet para simular cenarios. Conteudo educativo: nao ha garantia de lucro.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/dutching" className="btn-primary">
                Calculadora de Dutching <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
              <Link to="/calculadoras/arbitragem" className="btn-secondary">
                Calculadora de Arbitragem <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-3xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Neste artigo</p>
              {[
                ['#resposta-rapida', 'Diferenca rapida: Dutching vs Surebet'],
                ['#o-que-e-dutching', 'O que e Dutching?'],
                ['#o-que-e-surebet', 'O que e Surebet?'],
                ['#identificar-surebet', 'Como identificar uma Surebet'],
                ['#calculo-dutching', 'Como calcular Dutching'],
                ['#dutching-nao-e-surebet', 'Dutching nao e sempre Surebet'],
                ['#calculadora-dutching', 'Calculadora de Dutching'],
                ['#calculadora-arbitragem', 'Calculadora de Arbitragem'],
                ['#exemplo-comparativo', 'Exemplo comparativo'],
                ['#tabela-comparativa', 'Tabela comparativa'],
                ['#riscos-dutching', 'Riscos do Dutching'],
                ['#riscos-surebet', 'Riscos da Surebet'],
                ['#gestao-de-banca', 'Gestao de banca'],
                ['#iniciantes', 'Qual faz sentido para iniciantes'],
                ['#erros-comuns', 'Erros comuns'],
                ['#faq', 'FAQ'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="block text-sm py-1 leading-snug" style={{ color: 'var(--text-2)' }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </header>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        {/* Resposta rapida */}
        <ArticleSection id="resposta-rapida" title="Resposta rapida: qual a diferenca entre Dutching e Surebet?">
          <p>
            Os dois conceitos envolvem distribuir stakes entre resultados de um mercado, mas partem de objetivos diferentes. Aqui esta a diferenca direta:
          </p>
          <DataTable
            headers={['Conceito', 'Objetivo', 'Quando faz sentido', 'Principal risco']}
            rows={[
              ['Dutching', 'Distribuir stake entre resultados cobertos', 'Equilibrar retorno em cenarios especificos', 'Resultado nao coberto acontece'],
              ['Surebet', 'Arbitragem matematica em todos os resultados', 'Soma das prob. implicitas abaixo de 100%', 'Riscos operacionais na execucao'],
            ]}
          />
          <Callout tone="cyan">
            <strong>Dutching e distribuicao de stake; Surebet e arbitragem matematica.</strong> Os dois podem parecer parecidos, mas tem propositos diferentes.
          </Callout>
        </ArticleSection>

        {/* O que e Dutching */}
        <ArticleSection id="o-que-e-dutching" title="O que e Dutching?">
          <p>
            Dutching e uma tecnica de apostas que consiste em distribuir a stake entre dois ou mais resultados de um mesmo mercado. O objetivo pode ser equilibrar o retorno em cada cenario coberto, reduzir a exposicao a um unico resultado ou simular diferentes estrategias de cobertura.
          </p>
          <p>
            A tecnica nao exige que exista arbitragem matematica. E possivel usar dutching em qualquer mercado, independentemente da soma das probabilidades implicitas. Se a soma for maior que 100%, pode haver prejudizo mesmo cobrindo varios resultados, dependendo das odds.
          </p>
          <p>
            O resultado final depende das odds escolhidas, dos resultados cobertos e da distribuicao das stakes. Se o resultado nao coberto acontecer, a operacao perde. Dutching reduz concentracao em um unico resultado, mas nao elimina o risco financeiro.
          </p>
          <Callout tone="amber">
            Dutching distribui exposicao. Isso pode ser util em algumas estrategias, mas cobertura parcial nao e o mesmo que garantia de retorno.
          </Callout>
          <p>
            Use a{' '}
            <Link to="/calculadoras/dutching" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Dutching</Link>{' '}
            do CalculaBet para simular a divisao de stakes, visualizar o retorno em cada cenario coberto e entender a exposicao aos resultados nao cobertos. O artigo{' '}
            <Link to="/blog/o-que-e-dutching" style={{ color: '#67e8f9' }}>O que e Dutching</Link>{' '}
            explica a tecnica em profundidade.
          </p>
        </ArticleSection>

        {/* O que e Surebet */}
        <ArticleSection id="o-que-e-surebet" title="O que e Surebet?">
          <p>
            Surebet, tambem chamada de aposta segura ou arbitragem esportiva, e uma situacao em que as odds de um mercado permitem cobrir todos os resultados com retorno matematico positivo. Isso acontece quando a soma das probabilidades implicitas de todas as selecoes fica abaixo de 100%.
          </p>
          <p>
            Uma surebet pode ocorrer em odds de uma unica plataforma ou combinando odds de plataformas diferentes. A logica matematica e identica: se a soma for menor que 1 (menos de 100%), existe margem de arbitragem.
          </p>
          <p>
            Importante: o calculo matematico nao elimina os riscos operacionais. Odds mudam rapidamente, limites de aposta podem ser atingidos, apostas podem nao ser aceitas e regras de void ou cancelamento podem afetar o resultado real.
          </p>
          <Callout tone="red">
            Surebet nao e renda garantida. E uma condicao matematica que ainda envolve riscos de execucao.
          </Callout>
          <p>
            Use a{' '}
            <Link to="/calculadoras/arbitragem" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Arbitragem</Link>{' '}
            do CalculaBet para verificar se as odds formam uma oportunidade de arbitragem. O artigo{' '}
            <Link to="/blog/o-que-e-surebet" style={{ color: '#67e8f9' }}>O que e Surebet</Link>{' '}
            cobre o tema em detalhes.
          </p>
        </ArticleSection>

        {/* Como identificar surebet */}
        <ArticleSection id="identificar-surebet" title="Como identificar uma Surebet?">
          <p>
            A verificacao matematica e direta. Some as probabilidades implicitas de todos os resultados do mercado. Se a soma for menor que 1, pode existir arbitragem.
          </p>
          <FormulaBox
            label="Formula de verificacao de Surebet"
            formula="Soma = 1/odd_A + 1/odd_B + 1/odd_C ..."
            note={<>Se Soma &lt; 1 (menos de 100%), ha possivel margem de arbitragem. Quanto menor a soma, maior a margem teorica.</>}
          />
          <p>Exemplo com dois resultados:</p>
          <DataTable
            headers={['Selecao', 'Odd', 'Probabilidade implicita']}
            rows={[
              ['Resultado A', '2.10', '1 / 2.10 = 47,62%'],
              ['Resultado B', '2.10', '1 / 2.10 = 47,62%'],
              ['Soma total', '—', '95,24%'],
            ]}
          />
          <p>
            Com soma de 95,24%, ha uma margem matematica de 4,76%. Isso indica possivel arbitragem. O proximo passo e calcular como dividir as stakes para capturar essa margem em ambos os cenarios.
          </p>
          <Callout tone="cyan">
            Soma abaixo de 100% indica oportunidade matematica, mas nao elimina riscos de execucao como mudanca de odds ou limites de aposta.
          </Callout>
          <p>
            A{' '}
            <Link to="/calculadoras/arbitragem" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Arbitragem</Link>{' '}
            e a{' '}
            <Link to="/calculadoras/overround" style={{ color: '#67e8f9' }}>Calculadora de Overround</Link>{' '}
            do CalculaBet automatizam essa verificacao e ajudam a visualizar a margem da casa.
          </p>
        </ArticleSection>

        {/* Como calcular Dutching */}
        <ArticleSection id="calculo-dutching" title="Como funciona o calculo de Dutching?">
          <p>
            Para calcular dutching, o apostador define a stake total que deseja distribuir e as odds dos resultados que quer cobrir. A divisao proporcional das stakes e feita de forma que o retorno seja equilibrado em cada cenario coberto.
          </p>
          <FormulaBox
            label="Peso de cada selecao no Dutching"
            formula="Peso_A = 1 / odd_A"
            note="Stake de cada selecao = (Peso_A / Soma dos pesos) x Stake total"
          />
          <p>Exemplo com stake total de R$100:</p>
          <DataTable
            headers={['Selecao', 'Odd', 'Peso (1/odd)', 'Stake calculada']}
            rows={[
              ['Resultado A', '3.00', '0,333', 'R$50,00'],
              ['Resultado B', '4.00', '0,250', 'R$37,50'],
              ['Resultado C (nao coberto)', '6.00', '—', '—'],
            ]}
          />
          <p>
            Neste exemplo, se A vencer, o retorno e R$150. Se B vencer, o retorno e R$150. Se C vencer, a operacao perde R$87,50 (stake A + stake B). O resultado nao coberto continua sendo um risco real.
          </p>
          <p>
            Note tambem que neste exemplo as stakes somam apenas R$87,50. Isso porque o apostador decidiu nao cobrir C. A{' '}
            <Link to="/calculadoras/dutching" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Dutching</Link>{' '}
            do CalculaBet permite simular diferentes combinacoes de resultados e visualizar o retorno em cada cenario.
          </p>
        </ArticleSection>

        {/* Dutching nao e sempre Surebet */}
        <ArticleSection id="dutching-nao-e-surebet" title="Dutching nao e sempre Surebet">
          <p>
            Esse e um dos erros mais comuns: confundir a tecnica de distribuicao de stakes com a condicao matematica de arbitragem. Dutching e o metodo; surebet e o resultado quando a soma das probabilidades implicitas fica abaixo de 100%.
          </p>
          <p>
            E possivel usar dutching sem existir surebet. Nesse caso, o apostador esta distribuindo a stake entre resultados para equilibrar o retorno, mas nao ha garantia matematica de lucro. Se as odds nao gerarem margem positiva, pode haver prejudizo mesmo que o resultado coberto aconteca.
          </p>
          <Callout tone="cyan">
            Todo calculo de surebet envolve distribuicao de stakes, mas nem todo dutching e uma surebet.
          </Callout>
          <p>
            Para verificar se ha arbitragem, calcule a soma das probabilidades implicitas. Se a soma for menor que 1, ha possivel surebet. Se for maior ou igual a 1, ha apenas cobertura parcial sem garantia matematica de lucro.
          </p>
        </ArticleSection>

        {/* Calculadora Dutching */}
        <ArticleSection id="calculadora-dutching" title="Quando usar a Calculadora de Dutching do CalculaBet">
          <p>
            A{' '}
            <Link to="/calculadoras/dutching" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Dutching</Link>{' '}
            do CalculaBet e indicada quando o apostador quer:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Cobrir dois ou mais resultados de um mercado;</li>
            <li>Equilibrar o retorno entre os cenarios cobertos;</li>
            <li>Simular diferentes combinacoes de odds;</li>
            <li>Calcular quanto apostar em cada selecao sem erro manual;</li>
            <li>Visualizar claramente qual resultado nao esta coberto e qual e o risco associado.</li>
          </ul>
          <p>
            A ferramenta nao acessa odds de plataformas externas. O apostador insere os dados manualmente e a calculadora realiza os calculos de distribuicao proporcional automaticamente. Isso reduz erros e facilita a comparacao de cenarios antes de decidir.
          </p>
          <CtaBox
            href="/calculadoras/dutching"
            title="Calculadora de Dutching"
            desc="Use a Calculadora de Dutching do CalculaBet para dividir sua stake entre multiplos resultados e entender a exposicao de cada cenario."
            btnLabel="Abrir Calculadora de Dutching"
          />
        </ArticleSection>

        {/* Calculadora Arbitragem */}
        <ArticleSection id="calculadora-arbitragem" title="Quando usar a Calculadora de Arbitragem do CalculaBet">
          <p>
            A{' '}
            <Link to="/calculadoras/arbitragem" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Arbitragem</Link>{' '}
            do CalculaBet e indicada quando o apostador quer:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Verificar se a soma das probabilidades implicitas e menor que 100%;</li>
            <li>Calcular a margem de arbitragem disponivel;</li>
            <li>Definir a divisao de stakes para cobrir todos os resultados;</li>
            <li>Estimar o retorno em cada cenario;</li>
            <li>Reduzir erros de calculo manual em situacoes de surebet.</li>
          </ul>
          <p>
            A calculadora nao garante que a oportunidade ainda existira no momento da execucao. Odds mudam constantemente, e os calculos precisam ser verificados antes de cada operacao. A ferramenta e um apoio ao calculo, nao uma promessa de resultado.
          </p>
          <CtaBox
            href="/calculadoras/arbitragem"
            title="Calculadora de Arbitragem"
            desc="Use a Calculadora de Arbitragem do CalculaBet para verificar se as odds formam uma possivel surebet e calcular a divisao de stakes automaticamente."
            btnLabel="Abrir Calculadora de Arbitragem"
          />
        </ArticleSection>

        {/* Exemplo comparativo */}
        <ArticleSection id="exemplo-comparativo" title="Exemplo comparativo: Dutching vs Surebet">
          <p>
            Para entender a diferenca na pratica, veja dois cenarios com o mesmo mercado de tres resultados:
          </p>

          <p className="font-semibold" style={{ color: 'var(--text-1)' }}>Cenario 1 — Dutching sem surebet</p>
          <DataTable
            headers={['Selecao', 'Odd', 'Stake', 'Retorno se vencer', 'Obs.']}
            rows={[
              ['Resultado A', '2.50', 'R$57,14', 'R$142,86', 'Coberto'],
              ['Resultado B', '3.00', 'R$47,62', 'R$142,86', 'Coberto'],
              ['Resultado C', '5.00', 'Nao apostado', '—', 'NAO coberto'],
            ]}
          />
          <p>
            Stake total distribuida: R$104,76. O apostador cobre A e B. Se C acontecer, perde R$104,76. A soma das probabilidades implicitas seria: 1/2.50 + 1/3.00 + 1/5.00 = 0,40 + 0,333 + 0,20 = 0,933 (93,3%). Ha margem da casa. Dutching equilibra retorno em A e B, mas nao e uma surebet porque C nao esta coberto.
          </p>

          <p className="font-semibold mt-6" style={{ color: 'var(--text-1)' }}>Cenario 2 — Surebet (dois resultados)</p>
          <DataTable
            headers={['Selecao', 'Odd', 'Probabilidade implicita', 'Soma']}
            rows={[
              ['Resultado A', '2.10', '47,62%', '—'],
              ['Resultado B', '2.10', '47,62%', '95,24%'],
            ]}
          />
          <p>
            Soma = 95,24%. Ha margem matematica de 4,76%. Com stake total de R$100, a calculadora distribui R$50 em A e R$50 em B. Em qualquer resultado, o retorno e R$105. Isso e uma surebet: todos os resultados estao cobertos e ha margem positiva matematica.
          </p>
          <Callout tone="green">
            Mesmo no Cenario 2, os riscos operacionais continuam: odds podem mudar antes da execucao, limites podem impedir a aposta e regras de void podem alterar o resultado final.
          </Callout>
        </ArticleSection>

        {/* Tabela comparativa */}
        <ArticleSection id="tabela-comparativa" title="Tabela comparativa entre Dutching e Surebet">
          <DataTable
            headers={['Criterio', 'Dutching', 'Surebet']}
            rows={[
              ['Objetivo', 'Distribuir stake entre resultados selecionados', 'Cobrir todos os resultados com margem positiva'],
              ['Cobre todos os resultados?', 'Nao necessariamente', 'Sim (por definicao)'],
              ['Lucro garantido matematicamente?', 'Nao', 'Somente se a soma das prob. for menor que 100%'],
              ['Usa soma de prob. abaixo de 100%?', 'Pode ou nao', 'Sim, e requisito'],
              ['Principal risco', 'Resultado nao coberto acontecer', 'Riscos operacionais na execucao'],
              ['Ferramenta recomendada', 'Calculadora de Dutching', 'Calculadora de Arbitragem'],
              ['Perfil de uso', 'Cobertura parcial, diversificacao', 'Arbitragem, cobertura total'],
              ['Complexidade basica', 'Media', 'Media a alta (operacionalmente)'],
            ]}
          />
        </ArticleSection>

        {/* Riscos Dutching */}
        <ArticleSection id="riscos-dutching" title="Riscos do Dutching">
          <p>Dutching reduz a concentracao em um unico resultado, mas nao elimina o risco financeiro. Os principais riscos sao:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Resultado nao coberto acontecer:</strong> a operacao perde o total apostado nos cenarios cobertos;</li>
            <li><strong>Odds insuficientes:</strong> mesmo cobrindo multiplos resultados, se as odds forem baixas, pode haver prejudizo;</li>
            <li><strong>Erro na divisao de stakes:</strong> calculo manual errado distorce o equilibrio de retorno;</li>
            <li><strong>Excesso de confianca:</strong> cobertura parcial pode gerar sensacao falsa de seguranca;</li>
            <li><strong>Mercados complexos:</strong> quanto mais resultados possiveis, maior a dificuldade de cobrir todos;</li>
            <li><strong>Confundir cobertura com garantia:</strong> cobrir dois de tres resultados nao elimina o risco do terceiro;</li>
            <li><strong>Falta de gestao de banca:</strong> operar sem controle de stake pode ampliar perdas ao longo do tempo.</li>
          </ul>
        </ArticleSection>

        {/* Riscos Surebet */}
        <ArticleSection id="riscos-surebet" title="Riscos da Surebet">
          <p>Mesmo quando a matematica indica arbitragem, a execucao envolve riscos operacionais que podem impedir o resultado calculado:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Odds mudam rapidamente:</strong> a janela de arbitragem pode fechar antes da execucao;</li>
            <li><strong>Limite de aposta:</strong> a plataforma pode nao aceitar o valor necessario;</li>
            <li><strong>Aposta nao aceita:</strong> a plataforma pode recusar uma ou mais selecoes;</li>
            <li><strong>Erro de calculo:</strong> divisao incorreta de stakes distorce a margem;</li>
            <li><strong>Regras de void:</strong> se um evento for cancelado, a aposta pode ser anulada e a cobertura desfeita;</li>
            <li><strong>Verificacao de conta:</strong> contas podem ser suspensas ou restringidas por volume;</li>
            <li><strong>Restricoes de plataforma:</strong> algumas plataformas possuem regras sobre apostas combinadas ou de cobertura.</li>
          </ul>
          <p>
            O artigo{' '}
            <Link to="/blog/calculadora-surebet-excel" style={{ color: '#67e8f9' }}>Calculadora Surebet no Excel</Link>{' '}
            mostra como calcular a formula manualmente. Para apostar de forma responsavel, consulte{' '}
            <Link to="/jogo-responsavel" style={{ color: '#67e8f9' }}>Jogo Responsavel</Link>.
          </p>
        </ArticleSection>

        {/* Gestao de banca */}
        <ArticleSection id="gestao-de-banca" title="Dutching, Surebet e gestao de banca">
          <p>
            Independentemente da estrategia, ambas envolvem exposicao financeira real. Gestao de banca adequada e essencial para qualquer apostador que utilize dutching ou surebet de forma recorrente.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Defina um limite de stake por operacao em relacao a banca total;</li>
            <li>Nao concentre grande parte da banca em uma unica operacao, mesmo que o calculo seja favoravel;</li>
            <li>Revise periodicamente os resultados para avaliar se a estrategia esta sendo executada corretamente;</li>
            <li>Nao use estrategias de cobertura para tentar recuperar perdas anteriores;</li>
            <li>Registre todas as operacoes para acompanhar o historico real.</li>
          </ul>
          <p>
            Use a{' '}
            <Link to="/calculadoras/gestao-banca" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Gestao de Banca</Link>{' '}
            e a{' '}
            <Link to="/calculadoras/unidade-stake" style={{ color: '#67e8f9' }}>Calculadora de Unidade / Stake Fixa</Link>{' '}
            do CalculaBet para definir e calcular os limites de stake com mais precisao. O artigo{' '}
            <Link to="/blog/o-que-e-unidade-apostas" style={{ color: '#67e8f9' }}>O que e unidade em apostas</Link>{' '}
            explica como padronizar o tamanho das apostas.
          </p>
        </ArticleSection>

        {/* Iniciantes */}
        <ArticleSection id="iniciantes" title="Qual faz mais sentido para iniciantes?">
          <p>
            Nenhuma das duas estrategias e indicada como ponto de partida. Antes de usar dutching ou surebet, o apostador precisa entender os conceitos fundamentais: o que sao odds, como calcular probabilidade implicita, como definir stake e como funciona gestao de banca.
          </p>
          <p>
            Dutching pode parecer simples porque basta distribuir stakes, mas o risco dos resultados nao cobertos e real e frequentemente subestimado. Surebet parece matematicamente segura, mas os riscos operacionais sao significativos e dificultosum para quem esta comecando.
          </p>
          <p>
            O recomendado e simular primeiro, sem dinheiro real. Use as calculadoras para entender como as formulas funcionam, o que cada parametro afeta e quais riscos existem antes de qualquer operacao com banca real.
          </p>
          <Callout tone="amber">
            Ferramentas ajudam no calculo, mas nao substituem o entendimento dos riscos. Simule antes de apostar.
          </Callout>
          <p>
            O artigo{' '}
            <Link to="/blog/apostas-esportivas-para-iniciantes" style={{ color: '#67e8f9' }}>Apostas esportivas para iniciantes</Link>{' '}
            cobre os fundamentos necessarios antes de explorar estrategias como dutching ou surebet. Use tambem a{' '}
            <Link to="/calculadoras/odds" style={{ color: '#67e8f9' }}>Calculadora de Odds</Link>{' '}
            para praticar os calculos basicos.
          </p>
        </ArticleSection>

        {/* Erros comuns */}
        <ArticleSection id="erros-comuns" title="Erros comuns ao comparar Dutching e Surebet">
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Achar que Dutching sempre garante lucro porque cobre varios resultados;</li>
            <li>Achar que Surebet nao tem risco porque o calculo e matematicamente favoravel;</li>
            <li>Esquecer o resultado nao coberto no dutching;</li>
            <li>Misturar odds de mercados diferentes sem verificar se sao equivalentes;</li>
            <li>Nao considerar os limites de aposta das plataformas;</li>
            <li>Nao verificar regras de void antes de executar;</li>
            <li>Calcular stakes manualmente sem usar uma calculadora e nao verificar o resultado;</li>
            <li>Apostar por impulso ao encontrar uma possivel arbitragem sem confirmar os numeros;</li>
            <li>Ignorar gestao de banca por confiar excessivamente no calculo;</li>
            <li>Usar qualquer das estrategias para tentar recuperar perdas anteriores.</li>
          </ul>
          <Callout tone="red">
            Calculo correto nao elimina riscos operacionais ou financeiros. A execucao e sempre parte do risco.
          </Callout>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        {/* FAQ */}
        <section id="faq" className="mt-12 scroll-mt-28">
          <h2 className="text-3xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-1)' }}>Perguntas frequentes sobre Dutching e Surebet</h2>
          <FAQSection items={faqItems} eyebrow="FAQ" />
        </section>

        {/* Conclusao */}
        <ArticleSection id="conclusao" title="Conclusao">
          <p>
            Dutching e uma tecnica de distribuicao de stake entre resultados selecionados. Surebet e uma condicao de arbitragem matematica em que todos os resultados podem ser cobertos com margem positiva. Os dois conceitos se relacionam, mas nao sao equivalentes. Todo calculo de surebet usa logica de dutching, mas nem todo dutching e uma surebet.
          </p>
          <p>
            Nenhum metodo elimina todos os riscos. Dutching deixa resultados nao cobertos em aberto. Surebet envolve riscos operacionais de execucao. Calcular corretamente e um requisito, mas nao uma garantia. Gestao de banca, simulacao previa e leitura dos termos das plataformas sao parte essencial de qualquer operacao.
          </p>
          <p>
            O CalculaBet oferece ferramentas gratuitas para simular ambas as estrategias. Nenhuma ferramenta substitui o entendimento dos riscos ou garante resultados. Use como apoio ao calculo, nao como promessa.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <CtaBox
              href="/calculadoras/dutching"
              title="Calculadora de Dutching"
              desc="Divida stakes entre multiplos resultados e visualize o retorno e risco de cada cenario."
              btnLabel="Abrir Calculadora de Dutching"
            />
            <CtaBox
              href="/calculadoras/arbitragem"
              title="Calculadora de Arbitragem"
              desc="Verifique se as odds formam uma possivel surebet e calcule a divisao de stakes automaticamente."
              btnLabel="Abrir Calculadora de Arbitragem"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              ['/calculadoras/dutching', 'Calculadora de Dutching'],
              ['/calculadoras/arbitragem', 'Calculadora de Arbitragem'],
              ['/calculadoras/odds', 'Calculadora de Odds'],
              ['/calculadoras/overround', 'Calculadora de Overround'],
              ['/calculadoras/odds-justas', 'Odds Justas'],
              ['/calculadoras/gestao-banca', 'Gestao de Banca'],
              ['/calculadoras/unidade-stake', 'Unidade / Stake Fixa'],
              ['/calculadoras/roi', 'ROI em Apostas'],
              ['/blog/o-que-e-dutching', 'O que e Dutching'],
              ['/blog/o-que-e-surebet', 'O que e Surebet'],
              ['/blog/calculadora-surebet-excel', 'Surebet no Excel'],
              ['/blog/overround-apostas', 'Overround em apostas'],
              ['/blog/odds-justas', 'Odds justas'],
              ['/blog/apostas-esportivas-para-iniciantes', 'Guia para iniciantes'],
              ['/blog/o-que-e-unidade-apostas', 'O que e unidade'],
              ['/casas-apostas', 'Casas de apostas'],
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
