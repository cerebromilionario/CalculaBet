import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS_BANCA = [500, 1000, 2000, 5000, 10000];

const faqs = [
  {
    q: 'O que é o Critério de Kelly em apostas?',
    a: 'O Critério de Kelly é uma fórmula matemática desenvolvida em 1956 por John L. Kelly Jr. na Bell Labs que calcula o percentual ideal da banca a apostar em cada evento para maximizar o crescimento geométrico a longo prazo. A fórmula leva em conta sua estimativa de probabilidade de vitória e a odd disponível — o resultado é o percentual exato que maximiza o crescimento sem arriscar ruína desnecessária.',
  },
  {
    q: 'Como calcular o Kelly Criterion manualmente?',
    a: 'A fórmula é: Kelly % = (p × (o − 1) − (1 − p)) / (o − 1), onde p é sua probabilidade estimada do evento (ex: 0.55 para 55%) e o é a odd decimal (ex: 2.10). Um resultado positivo indica edge — existe valor esperado positivo. Um resultado negativo ou zero indica que a aposta não tem valor esperado positivo e não deve ser realizada. A calculadora acima automatiza esse cálculo em tempo real.',
  },
  {
    q: 'O que é Half-Kelly e por que é amplamente recomendado?',
    a: 'Half-Kelly é apostar 50% do percentual recomendado pelo Kelly puro. A justificativa matemática é clara: erros de estimativa de probabilidade são inevitáveis e o Kelly puro é muito sensível a esses erros. Com Half-Kelly, você captura cerca de 75% do crescimento máximo do Kelly puro enquanto reduz a variância (e o risco de sequências ruins) em aproximadamente 50%. A maioria dos apostadores profissionais usa entre 1/4 e 1/2 do Kelly calculado.',
  },
  {
    q: 'Qual percentual da banca devo apostar por evento?',
    a: 'Apostadores iniciantes: 1-2% por aposta (banca de 50-100 unidades). Apostadores intermediários com edge comprovado: 2-3%. Apostadores avançados com histórico longo: até 5% em apostas de alto edge. Acima de 5%, o risco de ruína aumenta de forma não linear mesmo com edge positivo consistente. A proteção contra sequências de perdas (que ocorrem com qualquer apostador) exige banca suficiente para sobreviver 10-20 perdas consecutivas.',
  },
  {
    q: 'O que é flat betting e quando usar?',
    a: 'Flat betting é apostar sempre o mesmo percentual fixo da banca em todas as apostas, independente da odd ou do edge estimado. É ideal para iniciantes (elimina a necessidade de estimar probabilidades), para apostadores em mercados onde o edge é incerto, e para quem prefere consistência psicológica a otimização matemática. O ponto de partida recomendado é 1-2% da banca por aposta.',
  },
  {
    q: 'Qual a diferença entre banca fixa e banca variável?',
    a: 'Na banca variável (recomendada), o stake é sempre um percentual da banca atual — cresce quando a banca cresce após lucros e diminui automaticamente após perdas, funcionando como proteção automática. Na banca fixa, o valor em reais não muda mesmo que a banca se reduza pela metade, aumentando o risco de ruína em sequências ruins. A banca variável é matematicamente superior em quase todos os cenários de longo prazo.',
  },
  {
    q: 'O Kelly Criterion funciona sem probabilidade estimada?',
    a: 'Não. A qualidade do Kelly depende inteiramente da precisão da estimativa de probabilidade. Se você superestimar seu edge em 5 pontos percentuais, o Kelly pode recomendar stakes muito altos para o risco real. Sem uma estimativa de probabilidade fundamentada (baseada em estatísticas, histórico ou análise estruturada), use flat betting ou percentual fixo — que não dependem de probabilidades estimadas.',
  },
  {
    q: 'Quantas unidades de banca preciso para gestão segura?',
    a: 'A regra mínima é 50 unidades (ex: banca de R$1.000 apostando R$20 por vez = 50 unidades). Com 50 unidades, uma sequência de 10 perdas consecutivas reduz a banca em 20% — recuperável. Com apenas 20 unidades, a mesma sequência reduz 50%. Para apostadores que buscam longevidade séria, 100-200 unidades é o padrão recomendado, o que equivale a apostar 0.5-1% por evento.',
  },
  {
    q: 'Como calcular o risco de ruína?',
    a: 'O risco de ruína depende de três fatores: edge (quanto maior, menor o risco), variância (apostas com odds altas têm variância maior) e tamanho das apostas (quanto menor o %, menor o risco). Uma aproximação simples: R = ((1-e)/(1+e))^U, onde e é o edge e U é o número de unidades de banca. Com edge de 5% e 100 unidades, o risco de ruína é inferior a 1%. Com 20 unidades, sobe para mais de 35%.',
  },
  {
    q: 'Posso usar Kelly em apostas com odds altas (acima de 5.00)?',
    a: 'Sim, mas com cautela redobrada. Apostas com odds altas têm maior variância — mesmo com edge positivo, as sequências de perdas são longas e frequentes. O Kelly puro em uma odd 8.00 com 15% de probabilidade estimada (edge pequeno) pode recomendar stake muito alto para o risco real. Nesses casos, use 1/4 ou 1/3 do Kelly calculado, ou estabeleça um teto fixo de 2-3% independente do que o Kelly recomendar.',
  },
  {
    q: 'Devo usar a mesma estratégia para todos os mercados?',
    a: 'Não. Diferentes mercados têm diferentes níveis de edge e variância. Você pode usar Kelly para mercados onde tem histórico e confiança na estimativa de probabilidade, e flat betting para mercados novos ou incertos. O importante é documentar cada aposta por mercado e revisar o ROI periodicamente — isso permite calibrar o percentual de stake com base em desempenho real, não teórico.',
  },
  {
    q: 'Quando devo revisar e ajustar minha estratégia de gestão de banca?',
    a: 'Revisão formal a cada 100-200 apostas ou ao final de cada mês. Analise: ROI real vs. estimado, drawdown máximo (maior queda da banca em %), taxa de acerto por mercado e se o edge estimado reflete o resultado real. Se o ROI real for consistentemente abaixo do estimado, reduza o percentual de stake até calibrar melhor as estimativas de probabilidade. Se o ROI real superar consistentemente, pode aumentar o percentual — mas com gradualidade.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Gestão de Banca — CalculaBet',
      url: 'https://calculabet.site/calculadoras/gestao-banca',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Calcule o stake ideal para cada aposta usando Kelly Criterion, Half-Kelly, flat betting ou percentual fixo. Gerencie sua banca com disciplina e maximize o crescimento a longo prazo.',
      featureList: [
        'Cálculo de stake pelo Critério de Kelly',
        'Half-Kelly automático com comparação',
        'Flat betting e percentual personalizado',
        'Cálculo de edge e probabilidade implícita',
        'Alerta de risco por nível de percentual',
        'Presets de banca para cálculo rápido',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

function InfoCard({ title, children, tone = 'neutral' }) {
  const colors = {
    cyan: { bg: 'rgba(34,211,238,0.04)', border: 'rgba(34,211,238,0.15)', title: '#22d3ee' },
    violet: { bg: 'rgba(129,140,248,0.04)', border: 'rgba(129,140,248,0.15)', title: '#818cf8' },
    green: { bg: 'rgba(74,222,128,0.04)', border: 'rgba(74,222,128,0.15)', title: '#4ade80' },
    amber: { bg: 'rgba(251,191,36,0.04)', border: 'rgba(251,191,36,0.15)', title: '#fbbf24' },
    red: { bg: 'rgba(248,113,113,0.04)', border: 'rgba(248,113,113,0.15)', title: '#f87171' },
    neutral: { bg: 'rgba(255,255,255,0.02)', border: 'var(--border)', title: 'var(--text-2)' },
  };
  const c = colors[tone] || colors.neutral;
  return (
    <div className="rounded-xl p-5" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      {title && (
        <p className="text-xs font-semibold mb-3" style={{ color: c.title, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{title}</p>
      )}
      <div className="text-sm" style={{ color: 'var(--text-2)' }}>{children}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold mb-4" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      {children}
    </p>
  );
}

function KellyFractionsTable() {
  const rows = [
    { frac: 'Kelly completo (1/1)', pct: '100%', crescimento: 'Máximo teórico', variancia: 'Muito alta', risco: 'Alto', recomendado: 'Não recomendado' },
    { frac: '3/4 Kelly', pct: '75%', crescimento: '95% do máximo', variancia: 'Alta', risco: 'Moderado-alto', recomendado: 'Apostadores experientes' },
    { frac: 'Half-Kelly (1/2)', pct: '50%', crescimento: '75% do máximo', variancia: 'Reduzida ~50%', risco: 'Moderado', recomendado: 'Profissionais' },
    { frac: '1/4 Kelly', pct: '25%', crescimento: '44% do máximo', variancia: 'Baixa', risco: 'Baixo', recomendado: 'Iniciantes com edge' },
    { frac: 'Flat 2%', pct: '—', crescimento: 'Constante', variancia: 'Muito baixa', risco: 'Muito baixo', recomendado: 'Todos os perfis' },
  ];
  const recColors = { 'Não recomendado': '#f87171', 'Apostadores experientes': '#fbbf24', 'Profissionais': '#22d3ee', 'Iniciantes com edge': '#818cf8', 'Todos os perfis': '#4ade80' };
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Fração de Kelly', '% do Kelly', 'Crescimento', 'Variância', 'Risco de ruína', 'Para quem'].map((h, i) => (
              <th key={i} className="text-left px-3 py-3 font-semibold" style={{ color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-3 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{r.frac}</td>
              <td className="px-3 py-3 font-mono" style={{ color: '#22d3ee' }}>{r.pct}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-2)' }}>{r.crescimento}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-2)' }}>{r.variancia}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-2)' }}>{r.risco}</td>
              <td className="px-3 py-3 font-semibold" style={{ color: recColors[r.recomendado] || 'var(--text-2)' }}>{r.recomendado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RuinRiskTable() {
  const rows = [
    { unidades: '20 unidades', pct: '5%/aposta', edge3: '~42%', edge5: '~28%', edge10: '~8%' },
    { unidades: '50 unidades', pct: '2%/aposta', edge3: '~18%', edge5: '~6%', edge10: '<1%' },
    { unidades: '100 unidades', pct: '1%/aposta', edge3: '~3%', edge5: '<1%', edge10: '<0.1%' },
    { unidades: '200 unidades', pct: '0.5%/aposta', edge3: '<1%', edge5: '<0.1%', edge10: '~0%' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Tamanho da banca', 'Stake/aposta', 'Edge 3%', 'Edge 5%', 'Edge 10%'].map((h, i) => (
              <th key={i} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{r.unidades}</td>
              <td className="px-4 py-3 font-mono" style={{ color: '#22d3ee' }}>{r.pct}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: parseFloat(r.edge3) > 20 ? '#f87171' : parseFloat(r.edge3) > 5 ? '#fbbf24' : '#4ade80' }}>{r.edge3}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: parseFloat(r.edge5) > 10 ? '#fbbf24' : '#4ade80' }}>{r.edge5}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>{r.edge10}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DrawdownTable() {
  const rows = [
    { pct: '1%', s5: '~5%', s10: '~10%', s20: '~18%', s30: '~26%' },
    { pct: '2%', s5: '~10%', s10: '~18%', s20: '~33%', s30: '~45%' },
    { pct: '3%', s5: '~14%', s10: '~26%', s20: '~46%', s30: '~59%' },
    { pct: '5%', s5: '~23%', s10: '~40%', s20: '~64%', s30: '~79%' },
  ];
  const cellColor = (val) => {
    const n = parseFloat(val.replace('~', '').replace('%', ''));
    if (n >= 50) return '#f87171';
    if (n >= 30) return '#fbbf24';
    return 'var(--text-2)';
  };
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>% por aposta</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>5 perdas</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>10 perdas</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>20 perdas</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>30 perdas</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-4 py-3 font-semibold" style={{ color: '#22d3ee' }}>{r.pct}</td>
              <td className="px-4 py-3" style={{ color: cellColor(r.s5) }}>{r.s5}</td>
              <td className="px-4 py-3" style={{ color: cellColor(r.s10) }}>{r.s10}</td>
              <td className="px-4 py-3" style={{ color: cellColor(r.s20) }}>{r.s20}</td>
              <td className="px-4 py-3" style={{ color: cellColor(r.s30) }}>{r.s30}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GestaoBancaExplanation() {
  return (
    <article className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      <section>
        <SectionLabel>Fundamento</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Por que gestão de banca é mais importante que escolher vencedores</h2>
        <p className="mb-4">
          Um apostador com taxa de acerto de <strong style={{ color: 'var(--text-1)' }}>55% pode perder toda a banca</strong> se apostar de forma inconsistente. Um apostador com 50% de acerto pode crescer a banca consistentemente se tiver edge nas odds e disciplina na gestão. Esse paradoxo aparente é a realidade matemática das apostas: a <em>forma como você aposta</em> importa tanto quanto <em>o que você aposta</em>.
        </p>
        <p className="mb-4">
          A maioria dos apostadores dedica 90% do tempo pesquisando seleções e praticamente nenhum tempo definindo o tamanho correto de cada aposta. O resultado: mesmo quando acertam mais do que erram, a gestão inadequada corrói o lucro ou amplifica as perdas ao ponto da ruína.
        </p>
        <p className="mb-5">
          Gestão de banca responde a três perguntas fundamentais: quanto apostar em cada evento, como ajustar o stake conforme a banca cresce ou diminui, e como sobreviver às inevitáveis sequências de perdas sem comprometer a capacidade de continuar apostando. Use esta calculadora em conjunto com a{' '}
          <Link to="/calculadoras/roi" className="font-medium" style={{ color: '#22d3ee' }}>Calculadora de ROI</Link>{' '}
          para medir desempenho real e com a{' '}
          <Link to="/calculadoras/odds" className="font-medium" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link>{' '}
          para identificar value bets.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Quanto apostar?', desc: 'Kelly Criterion ou percentual fixo calcula o stake ideal para cada aposta individual.', color: '#22d3ee' },
            { label: 'Como ajustar?', desc: 'Banca variável: o stake cresce com a banca após lucros e diminui automaticamente após perdas.', color: '#818cf8' },
            { label: 'Como sobreviver?', desc: 'Unidades suficientes absorvem sequências de perdas sem comprometer a continuidade.', color: '#4ade80' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${c.color}20` }}>
              <p className="font-semibold text-sm mb-2" style={{ color: c.color }}>{c.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Kelly Criterion</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>A fórmula matemática do stake ideal</h2>
        <p className="mb-4">
          Em 1956, o matemático <strong style={{ color: 'var(--text-1)' }}>John L. Kelly Jr.</strong> publicou na Bell Labs um artigo sobre transmissão de informação que, por acidente, resolveu um problema central do jogo: quanto apostar quando você tem vantagem. A fórmula de Kelly — originalmente desenvolvida para otimizar comunicações de longa distância — provou-se o método matematicamente ótimo para maximizar o crescimento de capital a longo prazo em jogos com edge positivo.
        </p>
        <InfoCard tone="cyan" title="Fórmulas do Kelly Criterion">
          <div className="font-mono text-xs space-y-2" style={{ color: 'var(--text-1)' }}>
            <p>Kelly %    = (p × (o − 1) − (1 − p)) / (o − 1)</p>
            <p>Half-Kelly = Kelly % × 0.5</p>
            <p>Stake      = Banca × Kelly %</p>
            <p>Edge       = p_estimada − (1 / odd)</p>
            <p>Prob. impl.= 1 / odd decimal</p>
          </div>
        </InfoCard>
        <p className="mt-4 mb-4">
          Onde <strong style={{ color: 'var(--text-1)' }}>p</strong> é sua probabilidade estimada do evento (ex: 0.55 para 55%) e <strong style={{ color: 'var(--text-1)' }}>o</strong> é a odd decimal. Se o Kelly calculado for negativo, a aposta não tem valor esperado positivo — apostar seria matematicamente prejudicial à banca no longo prazo.
        </p>
        <p className="mb-5">
          A limitação crítica: Kelly assume que sua estimativa de probabilidade é precisa. Na prática, apostadores tendem a superestimar o edge, o que leva o Kelly puro a recomendar stakes excessivamente altos. Por isso, a maioria dos profissionais usa frações do Kelly calculado:
        </p>
        <KellyFractionsTable />
        <p className="mt-4">
          A linha "<strong style={{ color: '#22d3ee' }}>Half-Kelly</strong>" é o padrão-ouro: captura 75% do crescimento teórico máximo do Kelly puro enquanto reduz a variância pela metade. Para a maioria dos apostadores, é o ponto de equilíbrio ideal entre crescimento e proteção.
        </p>
      </section>

      <section>
        <SectionLabel>Flat betting</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>A estratégia de quem não quer — ou não precisa — calcular probabilidades</h2>
        <p className="mb-5">
          Flat betting não é inferior ao Kelly — é uma estratégia diferente, adequada para contextos diferentes. Quando você não tem confiança suficiente na sua estimativa de probabilidade para usar Kelly de forma confiável, flat betting é a escolha matematicamente mais sólida: evita o risco de superestimar o edge e apostar muito.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <InfoCard tone="green" title="Vantagens do flat betting">
            <ul className="space-y-2 text-xs">
              {[
                'Não requer estimativa de probabilidade',
                'Fácil de executar sem cálculos adicionais',
                'Protege naturalmente contra sequências longas de perdas',
                'Consistência psicológica — sempre o mesmo percentual',
                'Ideal para mercados onde o edge é incerto',
                'Permite comparar desempenho entre mercados',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: '#4ade80' }}>+</span> {p}
                </li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard tone="red" title="Limitações do flat betting">
            <ul className="space-y-2 text-xs">
              {[
                'Não diferencia apostas de edge alto e baixo',
                'Crescimento mais lento que Kelly em condições ideais',
                'Apostas de alta e baixa confiança recebem o mesmo stake',
                'Perde eficiência quando o edge varia muito entre apostas',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: '#f87171' }}>−</span> {p}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>
        <InfoCard tone="neutral">
          <p className="text-xs leading-relaxed">
            <strong style={{ color: 'var(--text-1)' }}>Recomendação prática:</strong> inicie com flat betting de 1-2% enquanto constrói histórico de apostas. Após 200+ apostas com ROI documentado, avalie se seus resultados justificam calibrar para Kelly. Muitos apostadores profissionais com estratégias sistemáticas mantêm flat betting pela vida toda — e obtêm resultados consistentemente superiores a apostadores que usam Kelly com estimativas imprecisas.
          </p>
        </InfoCard>
      </section>

      <section>
        <SectionLabel>Risco de ruína</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Probabilidade de perder toda a banca: o cálculo que todo apostador precisa entender</h2>
        <p className="mb-4">
          O risco de ruína é a probabilidade de que, mesmo apostando com edge positivo, sequências adversas consumam toda a banca antes do edge se realizar. Ele depende de três fatores: o tamanho do edge, o tamanho das apostas e o número de unidades na banca.
        </p>
        <p className="mb-5">
          A tabela abaixo mostra a probabilidade aproximada de ruína (perda de 100% da banca) para diferentes combinações de tamanho de banca e edge, assumindo apostas de tamanho uniforme:
        </p>
        <RuinRiskTable />
        <p className="mt-4 mb-5">
          O dado mais importante: com <strong style={{ color: 'var(--text-1)' }}>apenas 20 unidades</strong> (5% por aposta), mesmo com um edge real de 5%, o risco de ruína é de quase 28%. Com <strong style={{ color: '#4ade80' }}>100 unidades</strong> (1% por aposta), o mesmo edge reduz o risco para menos de 1%.
        </p>
        <p>
          A lição prática: o tamanho da banca (em unidades) é o fator com maior impacto no risco de ruína, superando até mesmo o edge em certas faixas. Apostar pouco em cada evento e ter muitas unidades disponíveis é a proteção mais eficaz contra o risco de ruína.
        </p>
      </section>

      <section>
        <SectionLabel>Sequências de perdas</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>O impacto das sequências adversas: drawdown máximo esperado</h2>
        <p className="mb-4">
          Sequências de perdas são inevitáveis — não são sinal de erro, são estatística. Um apostador com 55% de acerto terá sequências de 5, 8, até 10 perdas consecutivas. A questão não é se isso vai acontecer, mas se sua gestão de banca sobreviverá quando acontecer.
        </p>
        <p className="mb-5">
          A tabela abaixo mostra o drawdown (queda percentual da banca) esperado em função do percentual de aposta e do número de perdas consecutivas:
        </p>
        <DrawdownTable />
        <p className="mt-4 mb-5">
          Com 5% por aposta, 10 perdas consecutivas (evento comum estatisticamente) reduzem a banca em 40%. Recuperar esse nível requer <strong style={{ color: 'var(--text-1)' }}>67% de retorno</strong> sobre o saldo restante — um obstáculo psicológico e financeiro considerável.
        </p>
        <p>
          Com 1-2% por aposta, a mesma sequência resulta em queda de 10-18% — muito mais gerenciável e sem impacto psicológico significativo na tomada de decisão.
        </p>
      </section>

      <section>
        <SectionLabel>Perfis de apostador</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Estratégia ideal por perfil</h2>
        <div className="space-y-3">
          {[
            {
              label: 'Iniciante (menos de 6 meses)',
              color: '#4ade80',
              metodo: 'Flat betting 1-2%',
              unidades: '50-100 unidades',
              foco: 'Documentar apostas, aprender sobre mercados, construir histórico de acerto.',
              evitar: 'Kelly sem histórico de probabilidades, apostas acima de 3% da banca.',
            },
            {
              label: 'Intermediário (6 meses — 2 anos com ROI documentado)',
              color: '#22d3ee',
              metodo: '1/4 Kelly ou flat 1-3%',
              unidades: '100-200 unidades',
              foco: 'Calibrar estimativas de probabilidade com resultados reais. Especializar em 2-3 mercados.',
              evitar: 'Full Kelly, apostas acima de 5%, mudar a estratégia após sequências ruins.',
            },
            {
              label: 'Avançado (histórico longo, edge comprovado)',
              color: '#818cf8',
              metodo: 'Half-Kelly calibrado',
              unidades: '200+ unidades',
              foco: 'Otimizar Kelly por mercado. Manter registros granulares. Revisar mensalmente.',
              evitar: 'Full Kelly em mercados de alta variância, concentração em poucos eventos.',
            },
          ].map((p, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${p.color}20` }}>
              <p className="font-semibold text-sm mb-3" style={{ color: p.color }}>{p.label}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Método recomendado</p>
                  <p style={{ color: 'var(--text-3)' }}>{p.metodo}</p>
                  <p className="font-semibold mb-1 mt-2" style={{ color: 'var(--text-1)' }}>Tamanho de banca</p>
                  <p style={{ color: 'var(--text-3)' }}>{p.unidades}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Foco principal</p>
                  <p style={{ color: 'var(--text-3)' }}>{p.foco}</p>
                  <p className="font-semibold mb-1 mt-2" style={{ color: '#f87171' }}>Evitar</p>
                  <p style={{ color: 'var(--text-3)' }}>{p.evitar}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Erros fatais</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>6 erros de gestão de banca que destroem resultados</h2>
        <div className="space-y-3">
          {[
            {
              title: 'Apostar valor fixo em reais em vez de percentual',
              desc: 'Apostar sempre R$50 independente do saldo da banca significa que, após uma sequência ruim que reduza a banca à metade, você está apostando 2× o percentual original. A banca variável (% da banca atual) é proteção automática: os stakes caem quando a banca cai.',
            },
            {
              title: 'Aumentar o stake para recuperar perdas',
              desc: 'A falácia do apostador: "estou devendo, preciso recuperar mais rápido". Aumentar stakes após perdas é a estratégia oposta à matematicamente correta. O edge não muda com o histórico recente — mas o risco de ruína aumenta dramaticamente com stakes maiores.',
            },
            {
              title: 'Usar Kelly sem estimativas de probabilidade calibradas',
              desc: 'Kelly com probabilidades superestimadas é mais perigoso que flat betting. Se você acha que tem 60% de chance quando a realidade é 52%, o Kelly recomenda stake 4× maior que o correto. Sem histórico longo para calibrar estimativas, use flat betting.',
            },
            {
              title: 'Não separar a banca por tipo de mercado',
              desc: 'Misturar apostas de alto edge com apostas de mercados experimentais dificulta medir o desempenho real de cada estratégia. Mantenha subcategorias na banca: o que você aposta com convicção e o que está testando.',
            },
            {
              title: 'Ignorar o drawdown máximo tolerável',
              desc: 'Defina antes de começar: "se minha banca cair X%, vou parar e revisar". Sem um gatilho de revisão explícito, drawdowns se tornam espirais — mais perdas geram mais apostas emocionais para recuperar, que geram mais perdas.',
            },
            {
              title: 'Não registrar as apostas',
              desc: 'Sem registro detalhado (odd, stake, mercado, resultado, casa), é impossível calcular ROI real, identificar se algum mercado é consistentemente lucrativo ou prejudicial, ou calibrar estimativas de probabilidade. Um simples planilha já é suficiente.',
            },
          ].map((e, i) => (
            <InfoCard key={i} tone="red" title={e.title}>
              <p className="text-xs leading-relaxed">{e.desc}</p>
            </InfoCard>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Regras de ouro</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>5 princípios inegociáveis de gestão profissional</h2>
        <ol className="space-y-3">
          {[
            { n: '1', t: 'Banca separada das finanças pessoais', d: 'Aposte apenas dinheiro que pode perder por completo sem afetar sua qualidade de vida. Quando a banca de apostas é dinheiro "necessário", as decisões deixam de ser racionais — e os resultados pioram em consequência.' },
            { n: '2', t: 'Sempre % da banca, nunca valor fixo em reais', d: 'A banca variável é proteção automática: os stakes crescem quando a banca cresce (aproveitando o momento positivo) e diminuem quando a banca cai (reduzindo exposição no momento negativo).' },
            { n: '3', t: 'Nunca aposte mais de 5% em um único evento', d: 'Mesmo com edge alto, concentrar mais de 5% da banca em um único evento cria risco de destruição irreparável. O edge se realiza ao longo de centenas de apostas — não em uma única.' },
            { n: '4', t: 'Documente cada aposta com todos os detalhes', d: 'Odd, stake, mercado, casa, resultado, probabilidade estimada. Sem dados, é impossível saber se você tem edge real, em quais mercados, e se sua gestão está otimizada.' },
            { n: '5', t: 'Revise e calibre após cada 100-200 apostas', d: 'Compare ROI estimado vs. real por mercado. Ajuste o percentual de stake conforme os resultados. Uma gestão estática que não evolui com o aprendizado desperdiça o principal ativo de um apostador: informação.' },
          ].map((d, i) => (
            <li key={i} className="flex gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{d.n}</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-1)' }}>{d.t}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{d.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionLabel>Jogo responsável</SectionLabel>
        <InfoCard tone="neutral">
          <p className="text-xs leading-relaxed mb-2">
            <strong style={{ color: 'var(--text-1)' }}>Jogo responsável:</strong> gestão de banca disciplinada reduz perdas financeiras, mas não transforma apostas em investimento garantido. Casas de apostas têm margem estrutural positiva — o edge do apostador, quando existe, é pequeno e se realiza no longo prazo com grande variância. Defina limites de tempo e dinheiro antes de cada sessão. Nunca aposte para recuperar perdas. Se sentir que as apostas estão afetando sua vida financeira, profissional ou pessoal, busque ajuda.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            Apoio: <strong style={{ color: 'var(--text-2)' }}>0800 722 2764</strong> (JISA — Jogo Responsável)
          </p>
        </InfoCard>
      </section>

    </article>
  );
}

export default function GestaoBanca() {
  const [banca, setBanca] = useState('');
  const [odd, setOdd] = useState('');
  const [prob, setProb] = useState('');
  const [metodo, setMetodo] = useState('kelly');
  const [pct, setPct] = useState('2');

  const b = parseFloat(banca);
  const o = parseFloat(odd);
  const p = parseFloat(prob) / 100;
  const pctN = parseFloat(pct) / 100;

  const validKelly = b > 0 && o > 1 && p > 0 && p < 1;
  const validFlat = b > 0 && pctN > 0;

  const kellyFrac = validKelly ? (p * (o - 1) - (1 - p)) / (o - 1) : 0;
  const kellyStake = validKelly && kellyFrac > 0 ? b * kellyFrac : 0;
  const halfKelly = kellyStake / 2;
  const quarterKelly = kellyStake / 4;
  const flatStake = validFlat ? b * pctN : 0;

  const probImpl = o > 1 ? (1 / o) * 100 : 0;
  const edge = validKelly ? (p * 100 - probImpl) : null;

  const riskLevel = pctN <= 0.02 ? 'conservador' : pctN <= 0.03 ? 'moderado' : pctN <= 0.05 ? 'arrojado' : 'alto risco';
  const riskColor = pctN <= 0.02 ? '#4ade80' : pctN <= 0.03 ? '#22d3ee' : pctN <= 0.05 ? '#fbbf24' : '#f87171';

  const metodos = [
    { id: 'kelly', label: 'Kelly Criterion', desc: 'Maximiza crescimento' },
    { id: 'flat', label: 'Flat Betting', desc: 'Percentual fixo' },
    { id: 'fixo', label: '% Personalizado', desc: 'Você define' },
  ];

  return (
    <CalcLayout
      title="Calculadora de Gestão de Banca"
      description="Calcule o stake ideal usando Kelly Criterion, Half-Kelly, flat betting ou percentual fixo. Gerencie sua banca com disciplina e maximize o crescimento a longo prazo."
      slug="gestao-banca"
      faqs={faqs}
      schema={schema}
      explanation={<GestaoBancaExplanation />}
    >
      <div className="space-y-6">

        {/* Method selector */}
        <div>
          <p className="label" id="metodo-label">Método de gestão</p>
          <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="metodo-label">
            {metodos.map(m => (
              <button
                key={m.id}
                onClick={() => setMetodo(m.id)}
                aria-pressed={metodo === m.id}
                className="flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-center transition-all duration-150"
                style={{
                  background: metodo === m.id ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${metodo === m.id ? 'rgba(34,211,238,0.25)' : 'var(--border)'}`,
                  color: metodo === m.id ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                <span className="text-xs font-semibold">{m.label}</span>
                <span className="text-xs opacity-60">{m.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Banca */}
        <div>
          <label className="label" htmlFor="gb-banca">Banca atual (R$)</label>
          <div className="flex flex-wrap gap-2 mb-2.5" role="group" aria-label="Valores rápidos de banca">
            {PRESETS_BANCA.map(v => (
              <button
                key={v}
                onClick={() => setBanca(String(v))}
                aria-pressed={banca === String(v)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={{
                  background: banca === String(v) ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${banca === String(v) ? 'rgba(34,211,238,0.4)' : 'var(--border)'}`,
                  color: banca === String(v) ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                R${v.toLocaleString('pt-BR')}
              </button>
            ))}
          </div>
          <input
            id="gb-banca"
            type="number"
            inputMode="decimal"
            className="input-field"
            placeholder="ex: 1000"
            min="0"
            value={banca}
            onChange={e => setBanca(e.target.value)}
            aria-label="Banca atual em reais"
          />
        </div>

        {/* Kelly inputs */}
        {metodo === 'kelly' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="gb-odd">Odd decimal</label>
              <input
                id="gb-odd"
                type="number"
                inputMode="decimal"
                className="input-field"
                placeholder="ex: 2.50"
                step="0.01"
                min="1.01"
                value={odd}
                onChange={e => setOdd(e.target.value)}
                aria-label="Odd decimal da aposta"
              />
              {probImpl > 0 && (
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                  Prob. implícita: <strong style={{ color: '#22d3ee' }}>{probImpl.toFixed(1)}%</strong>
                </p>
              )}
            </div>
            <div>
              <label className="label" htmlFor="gb-prob">Sua probabilidade estimada (%)</label>
              <input
                id="gb-prob"
                type="number"
                inputMode="decimal"
                className="input-field"
                placeholder="ex: 55"
                min="1"
                max="99"
                value={prob}
                onChange={e => setProb(e.target.value)}
                aria-label="Probabilidade estimada em percentual"
              />
              {edge !== null && (
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                  Edge estimado: <strong style={{ color: edge > 0 ? '#4ade80' : '#f87171' }}>
                    {edge > 0 ? '+' : ''}{edge.toFixed(1)}%
                  </strong>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Flat / Fixo slider */}
        {(metodo === 'flat' || metodo === 'fixo') && (
          <div>
            <label className="label" htmlFor="gb-pct">
              Percentual da banca: <strong style={{ color: riskColor }}>{pct}%</strong>
              <span className="ml-2 text-xs font-normal" style={{ color: riskColor }}>({riskLevel})</span>
            </label>
            <input
              id="gb-pct"
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={pct}
              onChange={e => setPct(e.target.value)}
              className="w-full accent-cyan-400 mb-2"
              aria-label={`Percentual da banca: ${pct}%`}
            />
            <div className="flex justify-between text-xs" style={{ color: 'var(--text-3)' }}>
              <span>0.5% conservador</span>
              <span>5% arrojado</span>
              <span>10% alto risco</span>
            </div>
          </div>
        )}

        {/* Results */}
        <div aria-live="polite" aria-atomic="true">
          {metodo === 'kelly' && validKelly && (
            kellyFrac <= 0 ? (
              <div
                className="flex items-start gap-3 px-4 py-4 rounded-xl"
                style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.18)' }}
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold" style={{ background: 'rgba(248,113,113,0.2)', color: '#f87171' }}>!</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#f87171' }}>Sem edge — não aposte</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>
                    Kelly negativo ({(kellyFrac * 100).toFixed(1)}%). A probabilidade implícita da odd ({probImpl.toFixed(1)}%) supera sua estimativa ({prob}%). Esta aposta tem valor esperado negativo.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Destaque Half-Kelly */}
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 rounded-xl"
                  style={{ background: 'rgba(129,140,248,0.05)', border: '1px solid rgba(129,140,248,0.2)' }}
                >
                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                      Half-Kelly recomendado
                    </p>
                    <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
                      R${halfKelly.toFixed(2)}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                      {((kellyFrac / 2) * 100).toFixed(2)}% da banca · 75% do crescimento máximo
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs mb-0.5" style={{ color: 'var(--text-3)' }}>Kelly puro</p>
                    <p className="text-lg font-semibold" style={{ color: '#22d3ee' }}>R${kellyStake.toFixed(2)}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                      1/4 Kelly: <strong style={{ color: '#818cf8' }}>R${quarterKelly.toFixed(2)}</strong>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="result-box">
                    <p className="result-value" style={{ color: '#fbbf24' }}>{(kellyFrac * 100).toFixed(2)}%</p>
                    <p className="result-label">Kelly % da banca</p>
                  </div>
                  <div className="result-box">
                    <p className="result-value" style={{ color: edge > 0 ? '#4ade80' : '#f87171' }}>
                      {edge > 0 ? '+' : ''}{edge !== null ? edge.toFixed(1) : '0'}%
                    </p>
                    <p className="result-label">Edge estimado</p>
                  </div>
                </div>

                <div
                  className="rounded-xl px-4 py-3 text-xs leading-relaxed"
                  style={{ background: 'rgba(129,140,248,0.04)', border: '1px solid rgba(129,140,248,0.12)', color: 'var(--text-3)' }}
                >
                  Kelly puro recomenda <strong style={{ color: '#22d3ee' }}>{(kellyFrac * 100).toFixed(1)}% (R${kellyStake.toFixed(2)})</strong>. Use o <strong style={{ color: '#818cf8' }}>Half-Kelly (R${halfKelly.toFixed(2)})</strong> para reduzir variância preservando 75% do crescimento teórico máximo. Para maior segurança, considere 1/4 Kelly: <strong style={{ color: '#818cf8' }}>R${quarterKelly.toFixed(2)}</strong>.
                </div>
              </div>
            )
          )}

          {(metodo === 'flat' || metodo === 'fixo') && validFlat && (
            <div className="space-y-3">
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 rounded-xl"
                style={{ background: `${riskColor}08`, border: `1px solid ${riskColor}25` }}
              >
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: riskColor, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    Stake recomendado — {riskLevel}
                  </p>
                  <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
                    R${flatStake.toFixed(2)}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                    {pct}% de R${b.toLocaleString('pt-BR')} · {Math.round(100 / parseFloat(pct))} unidades de banca
                  </p>
                </div>
              </div>
              <div
                className="rounded-xl px-4 py-3 text-xs leading-relaxed"
                style={{
                  background: pctN > 0.05 ? 'rgba(248,113,113,0.04)' : pctN > 0.03 ? 'rgba(251,191,36,0.04)' : 'rgba(74,222,128,0.04)',
                  border: `1px solid ${pctN > 0.05 ? 'rgba(248,113,113,0.15)' : pctN > 0.03 ? 'rgba(251,191,36,0.12)' : 'rgba(74,222,128,0.12)'}`,
                  color: 'var(--text-3)',
                }}
              >
                {pctN <= 0.02
                  ? `${pct}% — nível conservador. Com ${Math.round(100 / parseFloat(pct))} unidades, você absorve sequências longas de perdas sem risco de ruína relevante. Recomendado para iniciantes e apostadores em mercados incertos.`
                  : pctN <= 0.05
                    ? `${pct}% — nível moderado. Certifique-se de ter edge documentado antes de usar este percentual. Uma sequência de 15 perdas reduziria a banca em ${(100 - Math.pow(1 - pctN, 15) * 100).toFixed(0)}%.`
                    : `${pct}% — risco elevado. Com este percentual, ${Math.ceil(Math.log(0.5) / Math.log(1 - pctN))} perdas consecutivas reduzem a banca pela metade. Use apenas com edge comprovado e histórico extenso.`}
              </div>
            </div>
          )}

          {!b && (
            <div
              className="rounded-xl flex items-center justify-center py-8"
              style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-3)' }}>Informe a banca para calcular o stake ideal</p>
            </div>
          )}
        </div>

      </div>
    </CalcLayout>
  );
}
