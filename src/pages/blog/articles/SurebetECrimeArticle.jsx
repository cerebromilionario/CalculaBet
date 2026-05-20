import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import FAQSection from '../../../components/ui/FAQSection';
import { getCategoryById } from '../../../data/blog/blogData';
import { SUREBET_E_CRIME_FAQS } from '../../../data/blog/surebetECrimeFaqs';

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

const faqItems = SUREBET_E_CRIME_FAQS.map(f => ({ q: f.question, a: f.answer }));

export default function SurebetECrimeArticle({ post, category, relatedPosts }) {
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

        {/* Aviso legal */}
        <Callout tone="amber">
          <strong>Aviso:</strong> Este conteudo e apenas informativo e educativo. Nao constitui aconselhamento juridico. Regras, leis e politicas de plataformas podem mudar. Em caso de duvida legal, consulte um profissional qualificado.
        </Callout>

        {/* Header */}
        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div>
            <p className="badge badge-cyan mb-5">Guia educativo — surebet, legalidade, regras e riscos</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">
              Surebet e Crime? Legalidade, Regras das Casas e Riscos
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              A duvida "surebet e crime?" aparece com frequencia e precisa ser tratada com cuidado. Existe diferenca entre crime, violacao de termos de uso e politica interna de plataforma. Este artigo nao e aconselhamento juridico — e um guia educativo sobre riscos, regras e responsabilidade. Use a{' '}
              <Link to="/calculadoras/arbitragem" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Arbitragem</Link> do CalculaBet para entender a matematica. Siga sempre os termos das plataformas.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/arbitragem" className="btn-primary">
                Calculadora de Arbitragem <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
              <Link to="/jogo-responsavel" className="btn-secondary">
                Jogo Responsavel <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-3xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>Neste artigo</p>
              {[
                ['#resposta-rapida', 'Resposta rapida: surebet e crime?'],
                ['#o-que-e-surebet', 'O que e surebet'],
                ['#por-que-perguntam', 'Por que perguntam se e crime'],
                ['#lei-termos-politica', 'Lei, termos de uso e politica da casa'],
                ['#viola-termos', 'Surebet pode violar termos?'],
                ['#o-que-da-problema', 'O que pode dar problema'],
                ['#conta-limitada', 'Conta limitada: o que significa'],
                ['#multipla-conta', 'Multi-conta e dados falsos'],
                ['#garante-lucro', 'Surebet garante lucro?'],
                ['#calcular-responsavel', 'Como calcular com responsabilidade'],
                ['#exemplo', 'Exemplo matematico'],
                ['#brasil', 'Surebet no Brasil'],
                ['#jogo-responsavel', 'Surebet e jogo responsavel'],
                ['#gestao-banca', 'Surebet e gestao de banca'],
                ['#checklist', 'Checklist antes de calcular'],
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
        <ArticleSection id="resposta-rapida" title="Resposta rapida: surebet e crime?">
          <p>
            Nao e adequado dar uma resposta absoluta sem considerar a legislacao aplicavel, a jurisdicao e o caso concreto. Em geral, calcular arbitragem com odds publicamente disponiveis e uma analise matematica. Porem, a forma como a estrategia e executada pode violar termos de uso da plataforma ou envolver condutas proibidas.
          </p>
          <Callout tone="cyan">
            Existe diferenca entre uma conduta ser crime e uma pratica violar os termos de uma plataforma. As duas situacoes sao diferentes e podem ou nao coincidir.
          </Callout>
          <p>
            Calcular odds nao e a mesma coisa que praticar fraude. Violar termos da casa nao e necessariamente crime. Mas usar dados falsos, multiplas contas, ocultar identidade ou metodos proibidos pode gerar problemas serios — tanto com a plataforma quanto potencialmente legais. Em duvida juridica, consulte um profissional qualificado.
          </p>
          <Callout tone="amber">
            Este conteudo e informativo e nao substitui aconselhamento juridico.
          </Callout>
        </ArticleSection>

        {/* O que e surebet */}
        <ArticleSection id="o-que-e-surebet" title="O que e surebet?">
          <p>
            Surebet, tambem chamada de arbitragem esportiva, e uma situacao em que as odds de um mercado permitem cobrir todos os resultados de um evento com retorno matematico positivo. Isso acontece quando a soma das probabilidades implicitas de todas as selecoes fica abaixo de 100%.
          </p>
          <p>
            A matematica e objetiva: se 1/odd_A + 1/odd_B ficar abaixo de 1, existe uma margem teorica. Na pratica, executar essa operacao envolve riscos operacionais reais como mudancas de odds, limites de aposta e regras das plataformas.
          </p>
          <p>
            O artigo{' '}
            <Link to="/blog/o-que-e-surebet" style={{ color: '#67e8f9' }}>O que e Surebet</Link>{' '}
            explica a tecnica em detalhes. A{' '}
            <Link to="/calculadoras/arbitragem" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Arbitragem</Link>{' '}
            do CalculaBet ajuda a verificar a matematica de cada cenario.
          </p>
        </ArticleSection>

        {/* Por que perguntam */}
        <ArticleSection id="por-que-perguntam" title="Por que as pessoas perguntam se surebet e crime?">
          <p>A pergunta surge por algumas razoes comuns:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>A arbitragem parece "garantir" retorno matematico, o que gera suspeita sobre se isso seria "justo" ou "permitido";</li>
            <li>Algumas casas podem limitar ou encerrar contas associadas a padroes de apostas sistematicas;</li>
            <li>Ha confusao entre estrategia matematica, violacao de termos e crime;</li>
            <li>Termos de plataformas podem ser complexos e variar muito;</li>
            <li>O mercado de apostas tem regras especificas e que podem mudar com o tempo;</li>
            <li>Ha desinformacao circulando sobre o que e permitido ou nao.</li>
          </ul>
          <p>
            Entender as camadas diferentes — lei, termos de uso e politica interna — e o primeiro passo para avaliar a situacao com clareza.
          </p>
        </ArticleSection>

        {/* Lei, termos, politica */}
        <ArticleSection id="lei-termos-politica" title="Diferenca entre lei, termos de uso e politica da casa">
          <p>
            Sao tres camadas distintas que frequentemente sao confundidas. Entende-las separadamente e fundamental:
          </p>
          <DataTable
            headers={['Camada', 'O que e', 'Exemplo', 'Consequencia possivel']}
            rows={[
              ['Lei', 'Norma juridica aplicavel ao pais ou jurisdicao', 'Legislacao sobre jogos, fraude, identidade', 'Sancao penal, administrativa ou civil'],
              ['Termos de uso', 'Contrato privado aceito ao criar conta', 'Clausulas sobre multiplas contas, arbitragem, abuso de odds', 'Limitacao, cancelamento ou encerramento de conta'],
              ['Politica interna', 'Criterios de risco e compliance da plataforma', 'Limite de stake, revisao por volume, KYC', 'Restricao de conta, revisao de apostas, bloqueio'],
            ]}
          />
          <p>
            Uma pratica pode violar termos de uso sem ser crime. Pode ser crime sem necessariamente estar citada nos termos. Ou pode ser bloqueada por politica interna sem ser nem crime nem violacao explicita dos termos. As tres situacoes existem de forma independente.
          </p>
          <Callout tone="amber">
            O CalculaBet nao controla nem interpreta os termos de cada plataforma. Verifique sempre as regras diretamente na casa de apostas que voce usa.
          </Callout>
        </ArticleSection>

        {/* Viola termos */}
        <ArticleSection id="viola-termos" title="Surebet pode violar termos das casas?">
          <p>
            Pode, dependendo dos termos de cada plataforma. Algumas casas proibem explicitamente praticas de arbitragem. Outras podem nao usar o termo "surebet", mas ter clausulas amplas sobre comportamento considerado irregular, abuso de odds, sistemas automatizados ou padroes suspeitos.
          </p>
          <p>
            O usuario precisa ler os termos oficiais de cada plataforma antes de operar. Nao assumir que o que e permitido em uma casa e permitido em outra.
          </p>
          <Callout tone="red">
            Nao tente burlar regras, limites, verificacoes ou termos das plataformas. O resultado pode ser perda de conta, saldo e eventuais complicacoes.
          </Callout>
          <p>
            Alem de surebet em si, praticas como multiplas contas, automacoes, uso de VPN para contornar restricoes geograficas e dados falsos sao frequentemente proibidas e geram riscos maiores.
          </p>
        </ArticleSection>

        {/* O que da problema */}
        <ArticleSection id="o-que-da-problema" title="O que pode dar problema em surebet?">
          <p>E util separar os tipos de risco envolvidos:</p>

          <p className="font-semibold mt-4" style={{ color: 'var(--text-1)' }}>Riscos operacionais</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Odds mudarem antes de concluir todas as apostas;</li>
            <li>Limite de stake atingido em uma das casas;</li>
            <li>Uma aposta ser aceita e outra recusada;</li>
            <li>Evento ser cancelado ou mercado ser declarado void;</li>
            <li>Mercado errado escolhido por engano;</li>
            <li>Erro de digitacao no valor da stake;</li>
            <li>Regras diferentes entre casas para o mesmo mercado;</li>
            <li>Atraso na atualizacao de odds.</li>
          </ul>

          <p className="font-semibold mt-4" style={{ color: 'var(--text-1)' }}>Riscos de termos de uso</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Pratica de arbitragem proibida pela plataforma;</li>
            <li>Padroes de aposta classificados como irregulares;</li>
            <li>Uso de sistemas automatizados proibidos;</li>
            <li>Verificacao de conta com documentacao inadequada.</li>
          </ul>

          <p className="font-semibold mt-4" style={{ color: 'var(--text-1)' }}>Riscos potencialmente mais serios</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Uso de multiplas contas;</li>
            <li>Uso de dados ou identidade falsa;</li>
            <li>Tentativas de contornar verificacoes de compliance;</li>
            <li>Automacoes ou acesso nao autorizado.</li>
          </ul>
        </ArticleSection>

        {/* Conta limitada */}
        <ArticleSection id="conta-limitada" title="Conta limitada em apostas: o que significa?">
          <p>
            Algumas plataformas podem limitar o valor maximo de aposta ou restringir mercados especificos por criterios internos de risco e compliance. Isso nao significa necessariamente uma acusacao de crime — e uma decisao comercial ou de gestao de risco da plataforma.
          </p>
          <p>
            A limitacao pode afetar significativamente a execucao de estrategias como surebet, ja que impede apostar o valor calculado como ideal para cobertura. Regras e criterios variam muito de uma plataforma para outra.
          </p>
          <p>
            Em caso de limitacao, o caminho correto e contatar o suporte da plataforma e verificar os termos. Nao tentar contornar a limitacao por meios alternativos.
          </p>
        </ArticleSection>

        {/* Multi-conta */}
        <ArticleSection id="multipla-conta" title="Multi-conta, dados falsos e VPN: por que evitar">
          <p>
            Algumas praticas devem ser evitadas nao apenas por questoes eticas, mas por gerarem riscos reais:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Multiplas contas:</strong> criar mais de uma conta na mesma plataforma geralmente viola os termos. Pode resultar em encerramento de todas as contas e perda de saldo;</li>
            <li><strong>Dados falsos:</strong> cadastrar informacoes incorretas viola termos de uso e pode gerar problemas de verificacao de identidade (KYC) e possivelmente implicacoes legais sobre uso de identidade falsa;</li>
            <li><strong>Tentar ocultar localizacao ou identidade:</strong> algumas plataformas proibem o uso de tecnicas para contornar restricoes geograficas ou de verificacao;</li>
            <li><strong>Automacoes proibidas:</strong> usar bots ou sistemas automatizados pode violar termos e ser detectado pelas plataformas.</li>
          </ul>
          <Callout tone="red">
            O CalculaBet nao ensina, incentiva nem orienta praticas que violem termos de plataformas, legislacao aplicavel ou principios eticos de uso responsavel.
          </Callout>
        </ArticleSection>

        {/* Garante lucro */}
        <ArticleSection id="garante-lucro" title="Surebet garante lucro?">
          <p>
            Nao. Surebet indica uma oportunidade de arbitragem matematica, mas nao garante lucro na pratica. Varios fatores podem impedir que o resultado calculado se concretize:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Odds podem mudar entre o calculo e a execucao;</li>
            <li>Uma das apostas pode nao ser aceita;</li>
            <li>Limite de stake pode impedir a divisao ideal;</li>
            <li>Evento pode ser cancelado ou mercado declarado void;</li>
            <li>Regras de void podem variar entre as casas envolvidas;</li>
            <li>Verificacao ou restricao de conta pode impedir a operacao.</li>
          </ul>
          <Callout tone="amber">
            Surebet e uma oportunidade matematica, mas nao uma garantia pratica de lucro. O calculo e necessario, mas nao suficiente.
          </Callout>
        </ArticleSection>

        {/* Calcular responsavel */}
        <ArticleSection id="calcular-responsavel" title="Como calcular surebet com responsabilidade">
          <p>
            A{' '}
            <Link to="/calculadoras/arbitragem" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Arbitragem</Link>{' '}
            do CalculaBet ajuda a entender a matematica da surebet de forma rapida e precisa:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Verifica se a soma das probabilidades implicitas e menor que 100%;</li>
            <li>Calcula a margem de arbitragem teorica;</li>
            <li>Sugere a divisao proporcional das stakes;</li>
            <li>Estima o retorno em cada cenario coberto.</li>
          </ul>
          <p>
            Mas calcular e apenas o primeiro passo. Antes de qualquer operacao, e fundamental:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Ler os termos da plataforma onde voce vai apostar;</li>
            <li>Confirmar que as odds ainda estao disponiveis;</li>
            <li>Verificar limites de stake;</li>
            <li>Entender as regras de void e cancelamento;</li>
            <li>Usar informacoes verdadeiras e respeitar as regras da conta.</li>
          </ul>
          <CtaBox
            href="/calculadoras/arbitragem"
            title="Calculadora de Arbitragem"
            desc="Use a Calculadora de Arbitragem do CalculaBet para entender a matematica da surebet, sempre respeitando as regras das plataformas e apostando com responsabilidade."
            btnLabel="Abrir Calculadora de Arbitragem"
          />
        </ArticleSection>

        {/* Exemplo */}
        <ArticleSection id="exemplo" title="Exemplo matematico de surebet">
          <p>
            Para ilustrar o calculo matematico, veja um exemplo simples com dois resultados:
          </p>
          <DataTable
            headers={['Selecao', 'Odd', 'Probabilidade implicita']}
            rows={[
              ['Resultado A', '2.10', '1 / 2.10 = 47,62%'],
              ['Resultado B', '2.10', '1 / 2.10 = 47,62%'],
              ['Soma total', '—', '95,24%'],
            ]}
          />
          <FormulaBox
            label="Verificacao de arbitragem"
            formula="Soma = 1/2.10 + 1/2.10 = 0,9524"
            note="Soma menor que 1 (95,24%) indica possivel margem de arbitragem de 4,76%. Isso significa que, em teoria, e possivel cobrir os dois resultados com retorno positivo."
          />
          <p>
            Na pratica, antes de executar, e preciso confirmar que as odds ainda estao disponiveis, que os limites de stake permitem a divisao calculada e que os termos da plataforma nao restringem a operacao.
          </p>
          <p>
            Use a{' '}
            <Link to="/calculadoras/arbitragem" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Arbitragem</Link>{' '}
            e tambem a{' '}
            <Link to="/calculadoras/overround" style={{ color: '#67e8f9' }}>Calculadora de Overround</Link>{' '}
            para analisar a margem da casa em qualquer mercado.
          </p>
        </ArticleSection>

        {/* Brasil */}
        <ArticleSection id="brasil" title="Surebet no Brasil: cuidado com respostas absolutas">
          <p>
            O mercado de apostas no Brasil passou e continua passando por mudancas regulatorias. Regras, licencas e restricoes podem variar com o tempo. Afirmar categoricamente que "surebet e legal" ou "surebet e ilegal" no Brasil sem considerar a situacao atual, a plataforma especifica e o comportamento do usuario seria irresponsavel.
          </p>
          <p>
            O que se pode dizer com mais seguranca:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>O calculo matematico de arbitragem e uma analise numerica de odds publicas;</li>
            <li>A execucao pode envolver termos e politicas de plataformas que variam;</li>
            <li>Praticas como dados falsos, multiplas contas ou automacoes proibidas geram riscos independentemente da legalidade da surebet em si;</li>
            <li>A situacao juridica pode mudar com novas regulamentacoes.</li>
          </ul>
          <Callout tone="amber">
            Para duvidas legais especificas, consulte um profissional juridico qualificado. Este artigo nao substitui orientacao juridica.
          </Callout>
        </ArticleSection>

        {/* Jogo responsavel */}
        <ArticleSection id="jogo-responsavel" title="Surebet e jogo responsavel">
          <p>
            Mesmo calculos matematicos envolvem exposicao financeira real. Gestao e responsabilidade sao essenciais:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Nao aposte dinheiro essencial para despesas pessoais;</li>
            <li>Nao use arbitragem para tentar recuperar perdas anteriores;</li>
            <li>Nao aumente stakes por ansiedade ou confianca excessiva no calculo;</li>
            <li>Parar e uma opcao valida se houver perda de controle;</li>
            <li>Use os limites de deposito, tempo e perda oferecidos pelas plataformas.</li>
          </ul>
          <p>
            Apostas envolvem risco financeiro independentemente da estrategia utilizada. Consulte a pagina{' '}
            <Link to="/jogo-responsavel" style={{ color: '#67e8f9' }} className="font-semibold">Jogo Responsavel</Link>{' '}
            do CalculaBet para recursos e orientacoes.
          </p>
        </ArticleSection>

        {/* Gestao banca */}
        <ArticleSection id="gestao-banca" title="Surebet e gestao de banca">
          <p>
            Distribuir stakes em surebet nao elimina o risco total da banca. Limites e recusas podem desequilibrar a operacao calculada. Boas praticas de gestao:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Nao concentre grande parte da banca em uma unica operacao de surebet;</li>
            <li>Defina limites de stake por operacao baseados na banca total;</li>
            <li>Registre todas as operacoes para acompanhar historico real;</li>
            <li>Use stake compativel com a banca disponivel, nao com o potencial de lucro calculado;</li>
            <li>Nao aumente stakes apos sequencias de sucesso ou fracasso.</li>
          </ul>
          <p>
            Use a{' '}
            <Link to="/calculadoras/gestao-banca" style={{ color: '#67e8f9' }} className="font-semibold">Calculadora de Gestao de Banca</Link>{' '}
            e a{' '}
            <Link to="/calculadoras/unidade-stake" style={{ color: '#67e8f9' }}>Calculadora de Unidade / Stake Fixa</Link>{' '}
            do CalculaBet para definir limites com mais precisao. O artigo{' '}
            <Link to="/blog/planilha-gestao-de-banca-apostas" style={{ color: '#67e8f9' }}>Planilha de Gestao de Banca</Link>{' '}
            mostra como registrar e acompanhar operacoes.
          </p>
        </ArticleSection>

        {/* Surebet, Dutching e Arbitragem */}
        <ArticleSection id="dutching-diferenca" title="Surebet, Dutching e Arbitragem: cuidado para nao confundir">
          <p>
            Termos relacionados que geram confusao:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Surebet / Arbitragem esportiva:</strong> condicao matematica em que a soma das probabilidades implicitas fica abaixo de 100%, permitindo cobertura de todos os resultados com margem positiva;</li>
            <li><strong>Dutching:</strong> tecnica de distribuicao de stake entre resultados selecionados, que pode ou nao gerar arbitragem;</li>
            <li>Nem todo dutching e surebet — dutching pode ser usado sem existir margem de arbitragem.</li>
          </ul>
          <p>
            O artigo{' '}
            <Link to="/blog/dutching-ou-surebet" style={{ color: '#67e8f9' }}>Dutching ou Surebet</Link>{' '}
            compara os dois conceitos em detalhes. Use a{' '}
            <Link to="/calculadoras/dutching" style={{ color: '#67e8f9' }}>Calculadora de Dutching</Link>{' '}
            e a{' '}
            <Link to="/calculadoras/arbitragem" style={{ color: '#67e8f9' }}>Calculadora de Arbitragem</Link>{' '}
            para simular cada caso.
          </p>
        </ArticleSection>

        {/* Checklist */}
        <ArticleSection id="checklist" title="Checklist antes de tentar calcular uma surebet">
          <p>Antes de qualquer operacao, verifique cada item:</p>
          <div className="rounded-3xl p-6 my-4 space-y-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
            {[
              'Li os termos da plataforma onde vou apostar?',
              'As odds ainda estao disponiveis nas plataformas?',
              'Todos os resultados do mercado estao cobertos?',
              'As apostas sao do mesmo mercado e evento?',
              'Existe limite de stake que pode afetar o calculo?',
              'Entendo as regras de void e cancelamento de cada plataforma?',
              'Estou usando dados verdadeiros nas plataformas?',
              'Estou respeitando as regras oficiais da plataforma?',
              'A stake total cabe na minha banca sem comprometer dinheiro essencial?',
              'Estou tomando essa decisao por calculo ou por impulso?',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-md flex-shrink-0" style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)' }} />
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{item}</p>
              </div>
            ))}
          </div>
        </ArticleSection>

        {/* Erros comuns */}
        <ArticleSection id="erros-comuns" title="Erros comuns sobre surebet e legalidade">
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Achar que violar termos de uso e automaticamente crime;</li>
            <li>Achar que tudo que nao e crime e permitido pela plataforma;</li>
            <li>Ignorar os termos de uso da plataforma ao criar conta;</li>
            <li>Usar multiplas contas para ampliar operacoes;</li>
            <li>Usar dados falsos ou incorretos no cadastro;</li>
            <li>Tentar burlar limites de stake por meios alternativos;</li>
            <li>Achar que surebet nao tem risco por ser matematicamente favoravel;</li>
            <li>Nao confirmar que as odds ainda estao disponiveis antes de apostar;</li>
            <li>Nao verificar regras de void antes de executar;</li>
            <li>Acreditar que lucro garantido matematicamente significa lucro garantido na pratica;</li>
            <li>Tratar arbitragem como renda segura ou substituicao de renda.</li>
          </ul>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        {/* FAQ */}
        <section id="faq" className="mt-12 scroll-mt-28">
          <h2 className="text-3xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-1)' }}>Perguntas frequentes sobre surebet e legalidade</h2>
          <FAQSection items={faqItems} eyebrow="FAQ" />
        </section>

        {/* Conclusao */}
        <ArticleSection id="conclusao" title="Conclusao">
          <p>
            A pergunta "surebet e crime?" nao tem resposta absoluta sem considerar legislacao, plataforma e comportamento do usuario. O que se sabe: calcular arbitragem e matematica; a execucao pode envolver termos, regras e riscos que variam por plataforma; praticas como dados falsos, multiplas contas e automacoes proibidas devem ser evitadas; surebet nao garante lucro; e calculadora e ferramenta de analise, nao de contorno de regras.
          </p>
          <p>
            Em caso de duvida juridica, consulte um profissional qualificado. Para entender a matematica, use as ferramentas do CalculaBet. Para apostar com responsabilidade, siga as regras das plataformas e os principios de jogo responsavel.
          </p>
          <CtaBox
            href="/calculadoras/arbitragem"
            title="Calculadora de Arbitragem"
            desc="Use a Calculadora de Arbitragem do CalculaBet para entender a matematica da surebet, sempre respeitando os termos das plataformas e os principios de jogo responsavel."
            btnLabel="Abrir Calculadora de Arbitragem"
          />
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              ['/calculadoras/arbitragem', 'Calculadora de Arbitragem'],
              ['/calculadoras/dutching', 'Calculadora de Dutching'],
              ['/calculadoras/odds', 'Calculadora de Odds'],
              ['/calculadoras/overround', 'Calculadora de Overround'],
              ['/calculadoras/odds-justas', 'Odds Justas'],
              ['/calculadoras/gestao-banca', 'Gestao de Banca'],
              ['/calculadoras/unidade-stake', 'Unidade / Stake Fixa'],
              ['/calculadoras/roi', 'ROI em Apostas'],
              ['/blog/o-que-e-surebet', 'O que e Surebet'],
              ['/blog/calculadora-surebet-excel', 'Surebet no Excel'],
              ['/blog/dutching-ou-surebet', 'Dutching ou Surebet'],
              ['/blog/overround-apostas', 'Overround em apostas'],
              ['/blog/planilha-gestao-de-banca-apostas', 'Planilha de Gestao de Banca'],
              ['/blog/apostas-esportivas-para-iniciantes', 'Guia para iniciantes'],
              ['/jogo-responsavel', 'Jogo Responsavel'],
              ['/casas-apostas', 'Casas de apostas'],
              ['/termos-de-uso', 'Termos de uso'],
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
