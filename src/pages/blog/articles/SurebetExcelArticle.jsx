import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import FAQSection from '../../../components/ui/FAQSection';
import { getCategoryById } from '../../../data/blog/blogData';
import { SUREBET_EXCEL_FAQS } from '../../../data/blog/surebetExcelFaqs';

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

const faqItems = SUREBET_EXCEL_FAQS.map(f => ({ q: f.question, a: f.answer }));

export default function SurebetExcelArticle({ post, category, relatedPosts }) {
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
            <p className="badge badge-cyan mb-5">Guia pratico — surebet, Excel, formula e calculadora online</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">
              Calculadora Surebet no Excel: Formula e Alternativa Online
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Muitas pessoas buscam uma calculadora surebet no Excel para entender a matematica da arbitragem. A planilha ajuda a compreender as formulas, mas exige cuidado com odds que mudam rapidamente, erros de digitacao e regras das plataformas. Este artigo mostra a formula, exemplos praticos e apresenta a{' '}
              <Link to="/calculadoras/arbitragem" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Arbitragem</Link> do CalculaBet como alternativa online. Conteudo educativo: nao ha garantia de lucro.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/arbitragem" className="btn-primary">
                Usar Calculadora de Arbitragem <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsavel</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.17)' }} aria-label="Pontos essenciais sobre calculadora surebet">
            <p className="badge mb-4" style={{ color: '#34d399', borderColor: 'rgba(52,211,153,0.30)', background: 'rgba(52,211,153,0.10)' }}>Guia pratico</p>
            <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text-1)' }}>O essencial antes de comecar</h2>
            <div className="space-y-4">
              {[
                ['Formula principal', 'Soma as probabilidades implicitas das odds. Se < 100%, ha arbitragem matematica.'],
                ['Divisao de stakes', 'Cada resultado recebe uma parte proporcional da banca total.'],
                ['Riscos operacionais', 'Odds mudam, limites existem — planilha nao elimina esses riscos.'],
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
          <strong>Conteudo educativo:</strong> apostas envolvem riscos financeiros, sao destinadas apenas a maiores de 18 anos. Nao ha garantia de ganhos e surebet envolve riscos operacionais. Calculadoras mostram matematica, nao garantem execucao. Respeite os termos das plataformas. Consulte nossas orientacoes de{' '}
          <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsavel</Link>.
        </Callout>

        {/* O que e calculadora surebet */}
        <ArticleSection id="o-que-e-calculadora-surebet" title="O que e uma calculadora surebet?">
          <p>
            Uma calculadora surebet ajuda a verificar se existe arbitragem entre odds disponíveis em diferentes fontes. Ela compara as odds de resultados diferentes, calcula a soma das probabilidades implícitas e, se essa soma for menor que 100%, pode haver arbitragem matematica. Ela também calcula como dividir a stake entre os resultados.
          </p>
          <p>
            Para um guia mais completo sobre o conceito, acesse o{' '}
            <Link to="/blog/o-que-e-surebet" className="font-semibold" style={{ color: '#67e8f9' }}>guia completo sobre surebet</Link>. Para calcular diretamente, use a{' '}
            <Link to="/calculadoras/arbitragem" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Arbitragem</Link> do CalculaBet.
          </p>
        </ArticleSection>

        {/* Quando existe surebet */}
        <ArticleSection id="quando-existe-surebet" title="Quando existe uma surebet?">
          <FormulaBox
            label="Formula basica (2 resultados)"
            formula="Soma = 1 / Odd A + 1 / Odd B"
            note="Se a soma for menor que 1 (menos de 100%), existe arbitragem matematica com essas odds."
          />
          <div className="rounded-3xl p-5 my-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Odd A:</strong> 2.10</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Odd B:</strong> 2.10</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>1 / 2.10 =</strong> 47,62%</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>1 / 2.10 =</strong> 47,62%</p>
            <p className="text-sm font-semibold mt-3" style={{ color: '#22d3ee' }}>Soma: 95,24%</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Margem de arbitragem:</strong> 4,76%</p>
          </div>
          <Callout tone="cyan">
            Uma soma abaixo de 100% indica uma oportunidade matematica, mas nao elimina riscos operacionais.
          </Callout>
        </ArticleSection>

        {/* Formula Excel 2 resultados */}
        <ArticleSection id="formula-excel-2-resultados" title="Formula da surebet no Excel">
          <FormulaBox
            label="Soma de probabilidades implicitas"
            formula="=1/A2+1/B2"
            note="A2 = odd do resultado A, B2 = odd do resultado B. Se o resultado for menor que 1, ha arbitragem matematica."
          />
          <FormulaBox
            label="Em percentual"
            formula="=(1/A2+1/B2)*100"
            note="Se o resultado for menor que 100, existe surebet matematica com essas odds."
          />
          <FormulaBox
            label="Verificacao automatica"
            formula='=SE(D2<1;"Sim";"Nao")'
            note='Retorna Sim se a soma for menor que 1. Em Excel PT-BR use ponto e virgula; em outras configuracoes use virgula.'
          />
          <p>
            Atencao a configuracao regional: no Excel em portugues, use ponto e virgula (;) como separador de argumentos nas funcoes. Em outras configuracoes pode ser necessario usar virgula.
          </p>
          <Callout tone="amber">
            Surebet no Excel ajuda a entender a matematica, mas nao elimina riscos operacionais.
          </Callout>
        </ArticleSection>

        {/* Divisao de stakes */}
        <ArticleSection id="divisao-de-stakes" title="Como calcular a divisao de stakes em uma surebet">
          <FormulaBox
            label="Stake por resultado"
            formula="Stake A = Banca total x (1 / Odd A) / Soma"
          />
          <div className="rounded-3xl p-5 my-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Banca total:</strong> R$100</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Odd A:</strong> 2.10 / <strong style={{ color: 'var(--text-1)' }}>Odd B:</strong> 2.10</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Soma:</strong> 0,9524</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Stake A:</strong> 100 x 0,4762 / 0,9524 = R$50,00</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Stake B:</strong> 100 x 0,4762 / 0,9524 = R$50,00</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Retorno em qualquer resultado:</strong> R$50 x 2.10 = R$105,00</p>
            <p className="text-sm font-semibold mt-3" style={{ color: '#22d3ee' }}>Lucro aproximado: R$5,00 (5%)</p>
          </div>
        </ArticleSection>

        {/* Planilha Excel 2 resultados */}
        <ArticleSection id="planilha-excel-2-resultados" title="Exemplo de calculadora surebet no Excel para 2 resultados">
          <DataTable
            headers={['Campo', 'Celula', 'Valor / Formula']}
            rows={[
              ['Banca total', 'A2', '100'],
              ['Odd A', 'B2', '2.10'],
              ['Odd B', 'C2', '2.10'],
              ['Soma implicita', 'D2', '=1/B2+1/C2'],
              ['Existe surebet?', 'E2', '=SE(D2<1;"Sim";"Nao")'],
              ['Stake A', 'F2', '=$A$2*(1/B2)/$D$2'],
              ['Stake B', 'G2', '=$A$2*(1/C2)/$D$2'],
              ['Retorno A', 'H2', '=F2*B2'],
              ['Retorno B', 'I2', '=G2*C2'],
            ]}
          />
          <p>
            Esta e uma versao simples para fins educativos. Ela nao considera mudancas de odds entre o calculo e a execucao, limites de stake das casas ou arredondamento de centavos. E util para aprender a matematica da arbitragem.
          </p>
        </ArticleSection>

        {/* Surebet 3 resultados */}
        <ArticleSection id="surebet-3-resultados" title="Formula para surebet com 3 resultados">
          <FormulaBox
            label="Futebol 1X2"
            formula="Soma = 1/Odd_Casa + 1/Odd_Empate + 1/Odd_Fora"
            note="Se a soma for menor que 1, ha arbitragem matematica no mercado de tres resultados."
          />
          <FormulaBox
            label="No Excel"
            formula="=1/A2+1/B2+1/C2"
            note="A2 = odd da casa, B2 = odd do empate, C2 = odd do visitante."
          />
          <FormulaBox
            label="Stake por resultado"
            formula="Stake = Banca total x (1 / Odd do resultado) / Soma"
          />
          <p>
            Exemplo: Casa 3.10, Empate 3.40, Fora 3.20 — 1/3.10 + 1/3.40 + 1/3.20 = 0,3226 + 0,2941 + 0,3125 = 0,9292 (menor que 1, surebet matematica).
          </p>
        </ArticleSection>

        {/* Calculadora de Arbitragem CalculaBet */}
        <ArticleSection id="calculadora-arbitragem-calculabet" title="Como usar a Calculadora de Arbitragem do CalculaBet">
          <p>
            A <Link to="/calculadoras/arbitragem" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Arbitragem</Link> do CalculaBet realiza as mesmas operacoes da planilha sem necessidade de montar formulas manualmente.
          </p>
          <ol className="list-none space-y-3 mt-4">
            {[
              ['1', 'Acesse a Calculadora de Arbitragem.'],
              ['2', 'Informe a banca total.'],
              ['3', 'Digite as odds dos resultados.'],
              ['4', 'Veja se a soma das probabilidades fica abaixo de 100%.'],
              ['5', 'Confira a divisao de stakes calculada automaticamente.'],
              ['6', 'Analise retorno e lucro potencial estimado.'],
              ['7', 'Use apenas como apoio matematico — verifique odds antes de qualquer decisao.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3 text-sm sm:text-base items-start">
                <span className="rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{n}</span>
                <span style={{ color: 'var(--text-2)' }}>{text}</span>
              </li>
            ))}
          </ol>
          <CtaBox
            href="/calculadoras/arbitragem"
            title="Calcule surebet online sem planilha"
            desc="Use a Calculadora de Arbitragem do CalculaBet para calcular divisao de stakes e verificar arbitragem matematicamente."
            btnLabel="Abrir calculadora de arbitragem"
          />
        </ArticleSection>

        {/* Excel vs calculadora online */}
        <ArticleSection id="excel-vs-calculadora-online" title="Excel ou calculadora online: qual usar?">
          <DataTable
            headers={['Metodo', 'Vantagem', 'Limitacao', 'Melhor uso']}
            rows={[
              ['Excel / Planilha', 'Estudo da matematica e personalizacao', 'Erros manuais, configuracao regional, nao atualiza odds', 'Aprender formulas e criar modelos proprios'],
              ['Calculadora online', 'Rapidez e menos risco de erro', 'Depende dos dados inseridos corretamente', 'Simulacoes rapidas antes de decidir'],
            ]}
          />
        </ArticleSection>

        {/* Riscos planilha surebet */}
        <ArticleSection id="riscos-planilha-surebet" title="Riscos de usar planilha para surebet">
          <ul className="list-none space-y-2 mt-3">
            {[
              'Odds podem mudar rapidamente entre o calculo e a execucao.',
              'Erro de digitacao pode invalidar todo o calculo.',
              'Arredondamento de stake pode alterar o retorno esperado.',
              'Limites de aposta podem impedir colocar a stake calculada.',
              'Regras das casas variam e podem afetar o resultado.',
              'Contas podem ter restricoes individuais.',
              'Apostas podem ser anuladas por adiamento ou eventos nao realizados.',
              'A planilha nao acessa odds em tempo real.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#f87171' }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Callout tone="amber">
            Odds mudam, limites existem e erros de digitacao podem invalidar o calculo.
          </Callout>
        </ArticleSection>

        {/* Surebet Excel garante lucro */}
        <ArticleSection id="surebet-excel-garante-lucro" title="Surebet no Excel garante lucro?">
          <p>
            Nao. A formula apenas mostra se existe arbitragem matematica com as odds informadas no momento do calculo. Se as odds mudarem antes da execucao, o calculo pode ficar invalido. Se a stake nao for aceita, o cenario muda. Se uma aposta for anulada, o resultado muda. Nao existe lucro garantido.
          </p>
          <Callout tone="red">
            Calculadoras mostram numeros; elas nao garantem execucao perfeita nem lucro.
          </Callout>
        </ArticleSection>

        {/* Erros comuns */}
        <ArticleSection id="erros-comuns-surebet-excel" title="Erros comuns ao calcular surebet no Excel">
          <ul className="list-none space-y-2 mt-2">
            {[
              'Esquecer um resultado no calculo.',
              'Usar odds de mercados diferentes sem perceber.',
              'Misturar virgula e ponto decimal nas formulas.',
              'Copiar formula errada sem travar referencia da banca.',
              'Nao verificar se as odds ainda estao validas antes de apostar.',
              'Ignorar limites de stake das casas.',
              'Achar que soma abaixo de 100% elimina todos os riscos.',
              'Nao ler os termos e regras das plataformas.',
              'Nao considerar arredondamento de centavos nas stakes.',
              'Calcular uma vez e nao atualizar quando odds mudam.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#f87171' }}>&#10005;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ArticleSection>

        {/* Surebet e gestao de banca */}
        <ArticleSection id="surebet-gestao-banca" title="Surebet e gestao de banca">
          <p>
            Mesmo com calculo matematico, e importante controlar a exposicao. Nao coloque toda a banca em uma operacao. Evite decisoes impulsivas. Nao use dinheiro essencial para despesas pessoais. Registre operacoes e resultados para avaliar sua gestao ao longo do tempo.
          </p>
          <p>
            Use ferramentas complementares:{' '}
            <Link to="/calculadoras/gestao-banca" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Gestao de Banca</Link>,{' '}
            <Link to="/calculadoras/unidade-stake" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Unidade de Stake</Link>. Consulte tambem as orientacoes de{' '}
            <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>jogo responsavel</Link>.
          </p>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        {/* FAQ */}
        <section id="faq" className="mt-12 scroll-mt-28">
          <h2 className="text-3xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-1)' }}>Perguntas frequentes sobre calculadora surebet</h2>
          <FAQSection items={faqItems} eyebrow="FAQ" />
        </section>

        {/* Conclusao */}
        <ArticleSection id="conclusao" title="Conclusao">
          <p>
            E possivel construir uma calculadora surebet no Excel usando a formula que soma as probabilidades implicitas. Se a soma for menor que 100%, pode haver arbitragem matematica. A divisao de stakes exige calculo cuidadoso. Planilhas tem riscos de erros. A calculadora online do CalculaBet simplifica a simulacao. Responsabilidade e essencial.
          </p>
          <CtaBox
            href="/calculadoras/arbitragem"
            title="Calcule surebet com a Calculadora de Arbitragem"
            desc="Use a Calculadora de Arbitragem do CalculaBet para calcular surebet, dividir stakes e avaliar cenarios com mais praticidade."
            btnLabel="Abrir calculadora de arbitragem"
          />
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              ['/calculadoras/arbitragem', 'Calculadora de Arbitragem'],
              ['/calculadoras/odds', 'Calculadora de Odds'],
              ['/calculadoras/overround', 'Calculadora de Overround'],
              ['/calculadoras/odds-justas', 'Odds Justas'],
              ['/calculadoras/dutching', 'Calculadora de Dutching'],
              ['/calculadoras/gestao-banca', 'Gestao de Banca'],
              ['/calculadoras/unidade-stake', 'Calculadora de Unidade'],
              ['/calculadoras/roi', 'ROI em Apostas'],
              ['/blog/o-que-e-surebet', 'O que e Surebet'],
              ['/blog/overround-apostas', 'Overround em apostas'],
              ['/blog/probabilidade-implicita-odds', 'Probabilidade implicita'],
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
