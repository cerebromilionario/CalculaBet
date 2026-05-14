import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import { getCategoryById } from '../../../data/blog/blogData';
import { KELLY_CRITERION_FAQS } from '../../../data/blog/kellyCriterionFaqs';

function Callout({ tone = 'cyan', children }) {
  const tones = {
    cyan: ['rgba(34,211,238,0.08)', 'rgba(34,211,238,0.22)', '#67e8f9'],
    amber: ['rgba(251,191,36,0.09)', 'rgba(251,191,36,0.24)', '#fbbf24'],
    rose: ['rgba(251,113,133,0.09)', 'rgba(251,113,133,0.22)', '#fb7185'],
    green: ['rgba(52,211,153,0.08)', 'rgba(52,211,153,0.22)', '#34d399'],
  };
  const [background, border, color] = tones[tone] || tones.cyan;
  return <div className="rounded-3xl p-5 sm:p-6 leading-relaxed" style={{ background, border: `1px solid ${border}`, color }}>{children}</div>;
}

function ArticleSection({ id, title, children }) {
  return (
    <section id={id} className="mt-12 scroll-mt-28 space-y-5">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>{title}</h2>
      <div className="space-y-5 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>
    </section>
  );
}

function FormulaPanel() {
  return (
    <div className="rounded-3xl p-6 sm:p-8 my-6" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.14), rgba(34,211,238,0.08))', border: '1px solid rgba(251,191,36,0.24)' }}>
      <p className="badge badge-yellow mb-4">Fórmula critério de Kelly</p>
      <div className="text-center rounded-2xl p-6" style={{ background: 'rgba(2,6,23,0.52)', border: '1px solid rgba(255,255,255,0.10)' }}>
        <p className="text-4xl sm:text-5xl font-black tracking-tight text-gradient">f = (bp - q) / b</p>
      </div>
      <dl className="mt-6 grid sm:grid-cols-2 gap-4 text-sm sm:text-base">
        <div className="card-glass p-4"><dt className="font-bold">f</dt><dd style={{ color: 'var(--text-2)' }}>fração da banca a apostar</dd></div>
        <div className="card-glass p-4"><dt className="font-bold">b</dt><dd style={{ color: 'var(--text-2)' }}>odd decimal - 1</dd></div>
        <div className="card-glass p-4"><dt className="font-bold">p</dt><dd style={{ color: 'var(--text-2)' }}>probabilidade estimada de vitória</dd></div>
        <div className="card-glass p-4"><dt className="font-bold">q</dt><dd style={{ color: 'var(--text-2)' }}>probabilidade de perda, ou 1 - p</dd></div>
      </dl>
    </div>
  );
}

function PremiumTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-3xl my-6" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      <table className="w-full text-left text-sm min-w-[760px]">
        <thead style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-1)' }}>
          <tr>{headers.map(header => <th key={header} className="p-4 font-bold">{header}</th>)}</tr>
        </thead>
        <tbody style={{ color: 'var(--text-2)' }}>
          {rows.map(row => (
            <tr key={row[0]} className="border-t border-white/10">
              {row.map(cell => <td key={`${row[0]}-${cell}`} className="p-4 align-top">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const riskCards = [
  ['Probabilidade superestimada', 'Se a chance informada for otimista demais, a stake calculada pode ficar acima do risco real que a pessoa deveria assumir.'],
  ['Volatilidade e sequência negativa', 'Mesmo uma aposta bem calculada pode perder. Sequências ruins fazem parte da variância e podem reduzir a banca rapidamente.'],
  ['Kelly completo agressivo', 'O cálculo integral pode sugerir 8%, 10% ou mais da banca em alguns cenários, algo desconfortável para muitos perfis.'],
  ['Confiança excessiva', 'Transformar a fórmula em certeza pode levar a aumentar stake sem preparo, ignorar limites pessoais e deixar de registrar resultados.'],
];

export default function KellyCriterionArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>
        <header className="grid lg:grid-cols-[1.4fr_0.8fr] gap-8 items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="badge" style={{ color: category?.color || '#fbbf24', borderColor: `${category?.color || '#fbbf24'}35`, background: `${category?.color || '#fbbf24'}10` }}>{category?.name || 'Gestão de Banca'}</span>
              <span className="badge">{post.readingTime}</span>
              <span className="badge">Publicado em 13 de maio de 2026</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-gradient">Critério de Kelly em Apostas: Fórmula, Exemplos e Calculadora</h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--text-2)' }}>O Critério de Kelly é uma fórmula matemática usada para estimar o tamanho ideal de uma aposta em relação à banca. Em apostas esportivas, ele depende de duas entradas sensíveis: a odd decimal disponível e a probabilidade de vitória estimada pelo usuário. Por isso, aparece com frequência em discussões de gestão de banca Kelly, bankroll management e stake ideal apostas.</p>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>Este guia explica o critério de Kelly apostas com foco educativo: fórmula, exemplos, Meio Kelly, Kelly fracionado, riscos, limitações e como usar a <Link to="/ferramentas/gestao-de-banca" className="text-cyan-300 hover:text-cyan-200 font-semibold">calculadora critério de Kelly do CalculaBet</Link>. A fórmula não garante lucro, não prevê resultados e pode ser agressiva se usada sem cuidado.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/ferramentas/gestao-de-banca" className="btn-primary">Abrir calculadora de gestão de banca <BlogIcon name="arrow" className="w-4 h-4" /></Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Ler jogo responsável</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.18)' }} aria-label="Resumo do guia sobre Critério de Kelly">
            <p className="badge badge-yellow mb-4">Guia premium</p>
            <h2 className="text-2xl font-bold">Antes de usar Kelly</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              <li>• Kelly calcula exposição, não resultado.</li>
              <li>• A probabilidade estimada é a parte mais difícil.</li>
              <li>• Meio Kelly pode reduzir volatilidade.</li>
              <li>• Ferramentas ajudam na conta, mas não prometem ganhos.</li>
            </ul>
          </aside>
        </header>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Callout tone="amber"><strong>O Critério de Kelly não garante lucro.</strong> Ele depende da qualidade da probabilidade estimada.</Callout>
          <Callout tone="rose"><strong>Kelly completo pode sugerir stakes agressivas.</strong> Muitos usuários preferem Meio Kelly para reduzir volatilidade.</Callout>
        </div>

        <ArticleSection id="o-que-e" title="O que é o Critério de Kelly?">
          <p>O Critério de Kelly, também conhecido como Kelly Criterion apostas, é um método matemático para calcular qual percentual da banca poderia ser usado em uma aposta quando existe uma vantagem estimada. Ele relaciona banca, odd decimal e probabilidade estimada para transformar uma opinião sobre valor em uma fração de stake.</p>
          <p>A diferença para apostar valor fixo é importante. Na stake fixa, a pessoa pode apostar sempre R$10, independentemente de odd, risco ou probabilidade estimada. Com Kelly, a stake varia: se a vantagem estimada for maior, a fração sugerida aumenta; se a vantagem for pequena, cai; se não houver vantagem, o método pode sugerir não apostar.</p>
          <p>O método ficou conhecido em gestão de capital porque tenta dimensionar exposição de forma proporcional ao valor percebido. Em apostas esportivas, porém, essa lógica só faz sentido quando a probabilidade estimada é tratada com rigor e quando a pessoa entende que nenhuma fórmula elimina perdas.</p>
        </ArticleSection>

        <ArticleSection id="para-que-serve" title="Para que serve o Critério de Kelly em apostas?">
          <p>O critério de Kelly apostas esportivas pode ajudar a organizar decisões que, sem cálculo, seriam tomadas no impulso. Ele conecta odd, probabilidade e banca para estimar uma stake proporcional ao valor percebido, comparar cenários e entender a exposição financeira antes de entrar em um mercado.</p>
          <p>Na prática, Kelly pode responder à pergunta “quanto apostar em cada jogo?” apenas dentro das premissas informadas. Se a odd for 2.00 e sua estimativa for 55%, o resultado será diferente de uma odd 1.70 com estimativa de 62%. Essa relação ajuda a evitar apostas aleatórias, mas não transforma uma estimativa incerta em verdade.</p>
          <Callout tone="cyan">Kelly não prevê resultados. Kelly depende da qualidade da probabilidade estimada. Se a análise inicial estiver ruim, o cálculo final também ficará ruim.</Callout>
        </ArticleSection>

        <ArticleSection id="formula" title="Fórmula do Critério de Kelly">
          <p>A fórmula critério de Kelly mais usada para odds decimais é:</p>
          <FormulaPanel />
          <p>O valor de <strong>b</strong> é o lucro líquido por unidade apostada. Em odd 2.00, b = 1 porque cada R$1 apostado gera R$1 de lucro líquido em caso de acerto. Em odd 2.50, b = 1,50. O <strong>p</strong> é sua probabilidade estimada de vitória em decimal: 55% vira 0,55. O <strong>q</strong> é o complemento: se p = 0,55, q = 0,45.</p>
          <p>Quando <strong>f</strong> é positivo, a fórmula sugere uma fração da banca. Quando é zero ou negativo, a leitura é que não existe vantagem matemática estimada com os dados inseridos. Isso não é uma proibição, mas é um alerta racional: a conta não encontrou edge.</p>
        </ArticleSection>

        <ArticleSection id="exemplo-simples" title="Exemplo simples do Critério de Kelly">
          <p>Imagine uma banca de R$1.000, odd decimal 2.00 e probabilidade estimada de 55%. Nesse caso, b = 1, p = 0,55 e q = 0,45.</p>
          <div className="rounded-3xl p-6 my-6" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' }}>
            <p className="font-mono text-lg sm:text-xl" style={{ color: 'var(--text-1)' }}>f = (1 × 0,55 - 0,45) / 1</p>
            <p className="font-mono text-lg sm:text-xl mt-2" style={{ color: 'var(--text-1)' }}>f = 0,10</p>
            <p className="mt-4" style={{ color: 'var(--text-2)' }}>Resultado: Kelly completo sugere 10% da banca. Com banca de R$1.000, a stake sugerida seria R$100.</p>
          </div>
          <p>Embora a conta seja simples, 10% da banca em uma única aposta pode ser agressivo para muitos usuários. Uma sequência negativa curta já teria impacto relevante. Por isso, muitos preferem Meio Kelly ou Kelly fracionado em vez de seguir o Kelly completo cegamente.</p>
        </ArticleSection>

        <ArticleSection id="meio-kelly" title="O que é Meio Kelly?">
          <p>Meio Kelly usa metade da stake sugerida pelo Kelly completo. Se o cálculo integral indicar 10% da banca, Meio Kelly indica 5%. Com banca de R$1.000, isso reduziria a stake de R$100 para R$50.</p>
          <p>A lógica é conservadora: reduzir volatilidade, diminuir exposição em caso de erro de estimativa e tornar o método mais confortável para quem ainda está aprendendo. Meio Kelly não elimina risco e não garante resultado, mas reconhece uma realidade prática: probabilidades estimadas raramente são perfeitas.</p>
          <PremiumTable headers={['Cenário', 'Fração da banca', 'Stake em banca de R$1.000', 'Observação']} rows={[
            ['Kelly completo', '10%', 'R$100', 'Maior exposição e maior volatilidade.'],
            ['Meio Kelly', '5%', 'R$50', 'Reduz a stake pela metade e suaviza oscilações.'],
            ['1/4 Kelly', '2,5%', 'R$25', 'Mais conservador para estimativas incertas.'],
          ]} />
        </ArticleSection>

        <ArticleSection id="kelly-fracionado" title="O que é Kelly fracionado?">
          <p>Kelly fracionado é qualquer adaptação que usa apenas parte do Kelly completo: 1/2 Kelly, 1/4 Kelly, 1/3 Kelly ou outro percentual definido previamente. A ideia é manter a lógica proporcional da fórmula, mas com exposição menor.</p>
          <p>Essa abordagem é útil porque a incerteza principal não está na conta, e sim na estimativa. Uma odd é objetiva; a banca é objetiva; já a probabilidade estimada depende de análise, dados, contexto e possíveis vieses. Se essa estimativa estiver inflada, o Kelly completo pode amplificar o erro.</p>
        </ArticleSection>

        <ArticleSection id="calculadora" title="Como usar a Calculadora de Gestão de Banca/Kelly do CalculaBet">
          <p>A <Link to="/ferramentas/gestao-de-banca" className="text-cyan-300 hover:text-cyan-200 font-semibold">calculadora Kelly apostas do CalculaBet</Link> foi criada para simular cenários de stake sem fazer conta manual. Ela permite inserir banca, odd e probabilidade estimada, calcular stake sugerida, comparar Kelly completo e Meio Kelly e testar variações antes de qualquer decisão.</p>
          <p>Use a <Link to="/ferramentas/gestao-de-banca" className="text-cyan-300 hover:text-cyan-200 font-semibold">calculadora de gestão de banca</Link> como ferramenta educativa para calcular stake ideal, não como recomendação automática. O CalculaBet não é casa de apostas, não recebe apostas e não promete resultado. A ferramenta de Kelly do CalculaBet apenas aplica fórmulas aos dados informados.</p>
          <div className="rounded-3xl p-6 sm:p-8 my-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(52,211,153,0.08))', border: '1px solid rgba(34,211,238,0.18)' }}>
            <h3 className="text-2xl font-bold">Simule antes de decidir</h3>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Compare Kelly completo, Meio Kelly e percentuais de banca para entender exposição, volatilidade e tamanho de stake.</p>
            <Link to="/ferramentas/gestao-de-banca" className="btn-primary mt-6">Abrir calculadora critério de Kelly <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <ArticleSection id="estimar-probabilidade" title="Como estimar a probabilidade corretamente?">
          <p>A parte mais difícil de como calcular Kelly apostas não é substituir números na fórmula; é estimar <strong>p</strong> com realismo. Se a pessoa superestima a chance de vitória, a stake pode ficar alta demais. Se subestima, pode ignorar cenários que pareciam positivos. Em ambos os casos, o problema nasce antes da calculadora.</p>
          <p>A <Link to="/blog/probabilidade-implicita-odds" className="text-cyan-300 hover:text-cyan-200">probabilidade implícita</Link> da odd pode ser um ponto de partida, mas não deve ser confundida com probabilidade real. Uma odd 2.00 tem probabilidade implícita de 50%, mas isso não significa que o evento “tem exatamente 50%” de acontecer. Mercados incluem margem, informação imperfeita e oscilações.</p>
          <p>Para reduzir erro, use dados, contexto, histórico relevante, leitura de mercado e uma <Link to="/ferramentas/odds" className="text-cyan-300 hover:text-cyan-200">calculadora de odds</Link> para transformar cotações em probabilidade implícita. Ainda assim, mantenha humildade estatística: análise ruim gera cálculo ruim.</p>
        </ArticleSection>

        <ArticleSection id="probabilidade-implicita" title="Critério de Kelly e probabilidade implícita">
          <p>A probabilidade implícita em odds decimais é calculada por <strong>1 / odd × 100</strong>. Em uma odd 2.50, a probabilidade implícita é 40%. O Kelly compara sua probabilidade estimada com o retorno oferecido pela odd. Se você estima 45% para uma odd 2.50, existe uma diferença positiva nas premissas; se estima 38%, a fórmula tende a indicar não apostar.</p>
          <p>Essa relação conecta Kelly com value bet e edge. A pessoa só deveria considerar exposição quando sua estimativa for maior que o patamar exigido pela odd, sempre lembrando que estimativas podem estar erradas. Para analisar resultado passado, complemente com a ferramenta de <Link to="/ferramentas/roi" className="text-cyan-300 hover:text-cyan-200">ROI em apostas</Link>; para múltiplas, use a <Link to="/ferramentas/multipla" className="text-cyan-300 hover:text-cyan-200">calculadora de aposta múltipla</Link> com cautela.</p>
        </ArticleSection>

        <ArticleSection id="nao-apostar" title="Quando o Critério de Kelly sugere não apostar?">
          <p>Quando o valor calculado de <strong>f</strong> é zero ou negativo, o Critério de Kelly sugere não apostar. Isso significa que, com a odd e a probabilidade estimada inseridas, não há vantagem matemática estimada suficiente para justificar exposição da banca.</p>
          <p>Não apostar também pode ser uma decisão racional. Participar de um evento apenas por vontade, torcida ou medo de ficar de fora pode aumentar decisões impulsivas. Se a conta não favorece a entrada, forçar uma aposta contraria o próprio objetivo de gestão de banca apostas.</p>
        </ArticleSection>

        <ArticleSection id="garante-lucro" title="Critério de Kelly garante lucro?">
          <p>Não. O Critério de Kelly não garante lucro. Ele depende da precisão da probabilidade estimada, da amostra, da variância, do comportamento da banca e da disciplina de execução. Mesmo com uma estimativa razoável, perdas podem acontecer em sequência.</p>
          <Callout tone="amber">“O Critério de Kelly calcula exposição com base em premissas. Se a probabilidade estimada estiver errada, a stake sugerida também pode estar errada.”</Callout>
          <p>Kelly é ferramenta de stake, não previsão de resultado. Ele não informa quem vai vencer, não remove risco financeiro e não substitui limites pessoais. O uso responsável exige aceitar que uma boa conta pode perder e que uma aposta vencedora não valida automaticamente uma análise ruim.</p>
        </ArticleSection>

        <ArticleSection id="riscos" title="Riscos do Critério de Kelly">
          <div className="grid sm:grid-cols-2 gap-4">
            {riskCards.map(([title, text]) => <div key={title} className="card-glass p-5"><h3 className="font-bold" style={{ color: 'var(--text-1)' }}>{title}</h3><p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{text}</p></div>)}
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>superestimar probabilidades;</li><li>usar Kelly completo com banca pequena;</li><li>concentrar exposição alta em poucas apostas;</li><li>ignorar volatilidade e sequência negativa;</li><li>aumentar stake sem preparo;</li><li>ignorar gestão emocional;</li><li>tratar a fórmula como garantia;</li><li>não registrar resultados.</li>
          </ul>
        </ArticleSection>

        <ArticleSection id="iniciantes" title="Critério de Kelly para iniciantes: vale a pena?">
          <p>Iniciantes podem estudar o conceito porque ele ensina a relação entre odd, probabilidade e banca. Porém, usar Kelly completo no começo pode ser agressivo. Muitas vezes, stake fixa baixa, percentual pequeno da banca, Meio Kelly ou apenas simulação sem dinheiro real são alternativas mais simples para aprender.</p>
          <p>Antes da fórmula, vem o básico: entender odds, retorno, probabilidade implícita, variância, limites pessoais e <Link to="/jogo-responsavel" className="text-cyan-300 hover:text-cyan-200">apostas responsáveis</Link>. Para complementar, leia <Link to="/blog/apostas-esportivas-para-iniciantes" className="text-cyan-300 hover:text-cyan-200">apostas esportivas para iniciantes</Link> e o guia sobre <Link to="/blog/o-que-e-gestao-de-banca" className="text-cyan-300 hover:text-cyan-200">gestão de banca</Link>.</p>
        </ArticleSection>

        <ArticleSection id="stake-fixa" title="Critério de Kelly vs stake fixa">
          <PremiumTable headers={['Método', 'Como funciona', 'Vantagem', 'Risco', 'Perfil indicado']} rows={[
            ['Stake fixa', 'Usa o mesmo valor por aposta.', 'Simplicidade e previsibilidade.', 'Não ajusta stake ao valor percebido.', 'Iniciantes e controle conservador.'],
            ['Percentual da banca', 'Usa sempre uma porcentagem definida da banca.', 'Acompanha crescimento ou redução da banca.', 'Pode ignorar odd e edge.', 'Usuários que querem regra simples.'],
            ['Kelly completo', 'Calcula fração pela odd e probabilidade estimada.', 'Conecta stake à vantagem percebida.', 'Pode sugerir stakes altas.', 'Usuários experientes e disciplinados.'],
            ['Meio Kelly', 'Usa metade da sugestão do Kelly completo.', 'Reduz volatilidade e erro de estimativa.', 'Ainda depende de probabilidade realista.', 'Quem busca abordagem mais conservadora.'],
          ]} />
        </ArticleSection>

        <ArticleSection id="gestao-banca" title="Critério de Kelly e gestão de banca">
          <p>Kelly é um método dentro da gestão de banca, não um substituto para ela. Gestão de banca inclui orçamento, limites, registro, controle emocional, pausa, revisão de resultados e definição do que não deve ser apostado. A stake sugerida por qualquer fórmula não precisa ser seguida cegamente.</p>
          <p>Use a <Link to="/ferramentas/gestao-de-banca" className="text-cyan-300 hover:text-cyan-200">calculadora de gestão de banca</Link> para simular, mas combine o cálculo com limites pessoais e orientações de <Link to="/jogo-responsavel" className="text-cyan-300 hover:text-cyan-200">jogo responsável</Link>. Conteúdo educativo, ferramentas e simulações não transformam apostas em renda garantida.</p>
        </ArticleSection>

        <ArticleSection id="exemplo-100" title="Exemplo prático com banca de R$100">
          <p>Considere uma banca de R$100, odd 2.50 e probabilidade estimada de 45%. Temos b = 1,50, p = 0,45 e q = 0,55.</p>
          <div className="rounded-3xl p-6 my-6" style={{ background: 'rgba(52,211,153,0.07)', border: '1px solid rgba(52,211,153,0.16)' }}>
            <p className="font-mono text-lg sm:text-xl" style={{ color: 'var(--text-1)' }}>f = (1,50 × 0,45 - 0,55) / 1,50</p>
            <p className="font-mono text-lg sm:text-xl mt-2" style={{ color: 'var(--text-1)' }}>f = (0,675 - 0,55) / 1,50 = 0,0833</p>
            <p className="mt-4" style={{ color: 'var(--text-2)' }}>Kelly completo: aproximadamente 8,33% da banca, ou R$8,33. Meio Kelly: aproximadamente 4,17%, ou R$4,17.</p>
          </div>
          <p>Em banca pequena, uma stake aparentemente baixa em reais pode ser alta em percentual. Por isso, olhar apenas para “R$8,33” pode enganar: a exposição é superior a 8% da banca. Uma stake menor pode ser mais adequada quando há incerteza na estimativa.</p>
        </ArticleSection>

        <ArticleSection id="erros" title="Erros comuns ao usar Kelly em apostas">
          <ul className="list-disc pl-6 space-y-2">
            <li>usar probabilidade inventada ou baseada apenas em torcida;</li><li>confundir probabilidade implícita com probabilidade real;</li><li>apostar Kelly completo sem entender risco;</li><li>não usar Kelly fracionado quando a estimativa é incerta;</li><li>ignorar sequência negativa e volatilidade;</li><li>usar Kelly em múltiplas sem cuidado com a probabilidade conjunta;</li><li>não registrar apostas e resultados;</li><li>aumentar banca por impulso;</li><li>achar que a fórmula garante lucro;</li><li>ignorar limites pessoais.</li>
          </ul>
          <Callout tone="rose"><strong>Aviso responsável:</strong> este conteúdo é apenas educativo, apostas envolvem riscos financeiros, são destinadas a maiores de 18 anos e não há garantia de ganhos. O Critério de Kelly não elimina perdas. Use ferramentas como apoio ao cálculo, não como promessa de resultado, e não aposte dinheiro essencial. Consulte também nossa <Link to="/politica-de-afiliados" className="font-semibold" style={{ color: '#fb7185' }}>política de afiliados</Link>.</Callout>
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão">
          <p>O Critério de Kelly ajuda a calcular stake com base em odd e probabilidade estimada. Ele pode ser útil para conectar valor percebido, banca e exposição, mas exige estimativas realistas e disciplina. Kelly completo pode ser agressivo; Meio Kelly e Kelly fracionado reduzem volatilidade, embora não eliminem risco.</p>
          <p>Use a <Link to="/ferramentas/gestao-de-banca" className="text-cyan-300 hover:text-cyan-200 font-semibold">Calculadora de Gestão de Banca do CalculaBet</Link> para simular o Critério de Kelly, Meio Kelly e diferentes cenários de stake. Depois, continue explorando as <Link to="/ferramentas" className="text-cyan-300 hover:text-cyan-200">ferramentas do CalculaBet</Link> e os guias do <Link to="/blog" className="text-cyan-300 hover:text-cyan-200">blog</Link> com foco educativo e responsável.</p>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        <section className="mt-12" aria-labelledby="faq-kelly">
          <h2 id="faq-kelly" className="text-3xl sm:text-4xl font-bold tracking-tight">Perguntas frequentes sobre Critério de Kelly</h2>
          <div className="mt-6 space-y-3">
            {KELLY_CRITERION_FAQS.map(faq => (
              <details key={faq.question} className="card-glass p-5">
                <summary className="cursor-pointer font-semibold" style={{ color: 'var(--text-1)' }}>{faq.question}</summary>
                <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-12" aria-labelledby="posts-relacionados">
          <h2 id="posts-relacionados" className="section-title">Artigos relacionados</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {relatedPosts.map(item => <BlogCard key={item.slug} post={item} category={getCategoryById(item.category)} />)}
          </div>
        </section>
      )}
    </>
  );
}
