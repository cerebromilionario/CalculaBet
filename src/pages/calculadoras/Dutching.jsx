import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';
import { getSeoFaqsForPage, toLegacyFaq } from '../../data/seoFaqs.jsx';

const PRESETS_BANCA = [100, 200, 500, 1000, 2000, 5000];

/* ─── FAQ content ───────────────────────────────────────── */

const faqs = [
  {
    q: 'O que é dutching em apostas esportivas?',
    a: 'Dutching é uma estratégia que distribui o stake entre múltiplas seleções do mesmo evento de forma proporcional às suas odds, garantindo que o retorno total seja exatamente igual independente de qual das seleções cobertas vencer. Se você cobrir o Time A e o empate com dutching, receberá o mesmo valor em ambos os casos. O nome é atribuído ao apostador americano Dutch Schultz, que popularizou a técnica em corridas de cavalos nos anos 1920 e 1930.',
  },
  {
    q: 'Como calcular o stake de cada seleção no dutching?',
    a: 'O cálculo tem três passos: (1) Some as probabilidades implícitas de todas as seleções que você quer cobrir: Total = 1/Odd₁ + 1/Odd₂ + 1/Odd₃. (2) Calcule o stake de cada seleção: Stake N = Banca ÷ (OddN × Total). (3) Verifique o retorno: Retorno = Banca ÷ Total. Exemplo com odds 2.20, 3.10 e 4.50 e banca de R$500: Total = 0.455 + 0.323 + 0.222 = 1.000. Stake₁ = 500 ÷ (2.20 × 1.000) = R$227. Stake₂ = R$161. Stake₃ = R$111.',
  },
  {
    q: 'Qual a diferença entre dutching e arbitragem?',
    a: 'As estratégias têm lógicas diferentes. Na arbitragem, você cobre todos os resultados possíveis do evento, geralmente em casas diferentes, e garante lucro matemático independente do desfecho — porque a margem combinada é menor que 100%. No dutching, você escolhe quais resultados cobrir (geralmente em uma única casa) e equaliza o retorno entre eles. Se uma seleção não coberta vencer, você perde. O dutching não exige lucro garantido; ele garante exposição equalizada nas seleções de sua escolha.',
  },
  {
    q: 'O dutching sempre gera lucro?',
    a: 'Não. Na maioria das aplicações, o dutching resulta em retorno menor que a banca investida, porque as odds das casas já embutem margem (overround). A soma das probabilidades implícitas normalmente supera 100%, então o retorno calculado (Banca ÷ Total) é menor que a banca. Para o dutching ser lucrativo, a soma das probabilidades implícitas das seleções escolhidas precisa ser menor que 100% — o que só ocorre quando as odds estão acima do valor justo (value bets).',
  },
  {
    q: 'Quando o dutching é vantajoso?',
    a: 'O dutching tem valor analítico em três cenários: (1) quando você identificou múltiplas seleções com odds subavaliadas no mesmo evento e quer capturar o edge combinado com exposição equalizada; (2) quando quer cobrir dois resultados prováveis sem se comprometer com apenas um; (3) quando usa como cashout manual de uma posição aberta — apostando nos resultados opostos para proteger parte do lucro ou limitar a perda.',
  },
  {
    q: 'Qual a diferença entre dutching completo e dutching parcial?',
    a: 'No dutching completo, você cobre todas as seleções possíveis do evento — similar à arbitragem, mas dentro da mesma casa. Você nunca perde, mas o retorno depende da margem da casa. No dutching parcial, você cobre apenas as seleções que considera mais prováveis e deixa os outsiders descobertos. Isso reduz o custo total da operação e melhora o ROI se uma seleção coberta vencer, mas cria exposição a perda total se um resultado não coberto ocorrer.',
  },
  {
    q: 'Como usar dutching em exchanges como o Betfair?',
    a: 'Exchanges como Betfair são ideais para dutching porque as odds são formadas pelo mercado de apostadores, resultando em spreads menores e preços mais próximos do valor justo. O Betfair tem uma ferramenta nativa de dutching que calcula os stakes automaticamente. O ponto de atenção é a comissão sobre os lucros (geralmente 5%), que deve ser incorporada ao cálculo: o retorno efetivo é Retorno × (1 − 0.05). Em exchanges, o dutching também é usado como estratégia de trading para montar posições em múltiplos preços.',
  },
  {
    q: 'Quantas seleções é ideal colocar em um dutching?',
    a: 'O número ideal depende do contexto, mas na prática 2 a 4 seleções é a faixa mais eficiente. Com mais seleções, a soma das probabilidades implícitas cresce rapidamente, o que aumenta a margem efetiva contra você e reduz o retorno garantido. Incluir outsiders com probabilidade implícita abaixo de 15% raramente vale o custo, pois eles consomem pouco stake mas inflam o total implícito, piorando o ROI das seleções principais.',
  },
  {
    q: 'Dutching é permitido nas casas de apostas?',
    a: 'Sim, dutching é completamente permitido. Você está fazendo múltiplas apostas no mesmo evento dentro da mesma casa — algo perfeitamente legal e comum. Diferente da arbitragem entre casas (que pode gerar limitação de conta), o dutching é mais discreto. As casas não têm como identificar facilmente que você está equalizando retornos, já que cada aposta parece independente do ponto de vista delas.',
  },
  {
    q: 'Como o dutching se compara ao hedge?',
    a: 'O hedge é feito geralmente depois de uma aposta já estar aberta, para reduzir a exposição ou garantir parte do lucro de um bilhete em andamento. O dutching é planejado antes de apostar, para equalizar o retorno entre múltiplas seleções desde o início. Em termos matemáticos, o dutching é uma forma de hedge preventivo. Use a Calculadora de Hedge para cenários em que você já tem uma aposta aberta e quer proteger a posição.',
  },
  {
    q: 'O que é a soma das probabilidades implícitas no dutching?',
    a: 'A soma das probabilidades implícitas (Total = 1/Odd₁ + 1/Odd₂ + …) é o indicador central do dutching. Ela determina o retorno: quanto menor essa soma, maior o retorno em relação à banca. Abaixo de 100% significa dutching lucrativo (como arbitragem parcial). Exatamente 100% significa retorno igual à banca. Acima de 100% — a situação normal com odds de casas com margem — significa retorno menor que a banca. A calculadora exibe essa soma em tempo real conforme você insere as odds.',
  },
  {
    q: 'Posso usar dutching em corridas de cavalos?',
    a: 'Sim — corridas de cavalos são, historicamente, a aplicação mais clássica do dutching. Com vários cavalos competindo, um apostador analítico pode selecionar 3 a 6 favoritos reais e distribuir a banca proporcionalmente, garantindo o mesmo retorno se qualquer um deles vencer. Em corridas com campo grande, o dutching parcial (cobrindo os principais favoritos) é especialmente popular em exchanges como Betfair, onde as odds tendem a ser mais precisas do que nas casas tradicionais.',
  },
  ...getSeoFaqsForPage('dutching').map(toLegacyFaq),
];

/* ─── Schema ─────────────────────────────────────────────── */

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Dutching — CalculaBet',
      url: 'https://calculabet.site/calculadoras/dutching',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Calculadora gratuita de dutching: distribua a banca entre múltiplas seleções com retorno equalizado, calcule stakes proporcionais, lucro, ROI e soma de probabilidades implícitas. Educativa e sem cadastro.',
      featureList: [
        'Cálculo de stakes proporcionais por seleção',
        'Retorno garantido equalizado',
        'Lucro ou prejuízo líquido',
        'ROI percentual da operação',
        'Soma de probabilidades implícitas em tempo real',
        'Barra visual de distribuição da banca',
        'Suporte a 2 ou mais seleções',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.answerText || item.a },
      })),
    },
  ],
};

/* ─── Shared UI ──────────────────────────────────────────── */

function InfoCard({ title, children, tone = 'cyan' }) {
  const palette = {
    cyan:   ['rgba(34,211,238,0.06)',  'rgba(34,211,238,0.16)',  '#22d3ee'],
    violet: ['rgba(129,140,248,0.06)', 'rgba(129,140,248,0.16)', '#818cf8'],
    green:  ['rgba(74,222,128,0.06)',  'rgba(74,222,128,0.16)',  '#4ade80'],
    amber:  ['rgba(251,191,36,0.06)',  'rgba(251,191,36,0.18)',  '#fbbf24'],
    red:    ['rgba(248,113,113,0.06)', 'rgba(248,113,113,0.18)', '#f87171'],
  }[tone];
  return (
    <div className="rounded-2xl p-5" style={{ background: palette[0], border: `1px solid ${palette[1]}` }}>
      <p className="text-xs font-semibold mb-3" style={{ color: palette[2], textTransform: 'uppercase', letterSpacing: '0.07em' }}>{title}</p>
      <div className="space-y-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      {children}
    </p>
  );
}

function ImplicitSumTable() {
  const rows = [
    { range: 'Abaixo de 95%',   label: 'Dutching muito lucrativo',    lucro: '> +5%',    color: '#4ade80', note: 'Raro — quase sempre indica erro de odd ou mercado especial.' },
    { range: '95% – 98%',       label: 'Dutching lucrativo',          lucro: '+2% a +5%', color: '#4ade80', note: 'Você tem edge real combinado nas seleções escolhidas.' },
    { range: '98% – 100%',      label: 'Dutching quase neutro',       lucro: '0% a +2%',  color: '#fbbf24', note: 'Retorno próximo da banca. Pode valer com edge muito marginal.' },
    { range: 'Exatamente 100%', label: 'Retorno igual à banca',       lucro: '0%',        color: '#fbbf24', note: 'Nenhum lucro, nenhuma perda. Apenas equalização de exposição.' },
    { range: '100% – 106%',     label: 'Retorno menor que a banca',   lucro: '−6% a 0%',  color: '#f87171', note: 'Situação normal com casas com margem. Perda está na margem embutida.' },
    { range: 'Acima de 106%',   label: 'Margem alta',                 lucro: '< −6%',     color: '#f87171', note: 'Odds com muita margem ou muitas seleções de baixo valor.' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Soma das prob. implícitas', 'Classificação', 'ROI esperado', 'Contexto'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <td className="px-4 py-3 font-mono font-semibold" style={{ color: r.color, whiteSpace: 'nowrap' }}>{r.range}</td>
              <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{r.label}</td>
              <td className="px-4 py-3 font-bold" style={{ color: r.color }}>{r.lucro}</td>
              <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-3)' }}>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonTable() {
  const strategies = [
    {
      name: 'Dutching',
      color: '#22d3ee',
      items: [
        'Cobre seleções à sua escolha',
        'Uma única casa de apostas',
        'Retorno igual para qualquer seleção coberta',
        'Perda total se resultado não coberto vencer',
        'Menor risco de limitação de conta',
        'ROI depende do edge nas odds',
        'Ideal: value bets múltiplas no mesmo evento',
      ],
    },
    {
      name: 'Arbitragem',
      color: '#4ade80',
      items: [
        'Cobre todos os resultados do evento',
        'Requer múltiplas casas diferentes',
        'Lucro garantido independente do resultado',
        'Risco operacional (odd cancelada, erro de stake)',
        'Maior risco de limitação de conta',
        'ROI fixo pela margem de arbitragem',
        'Ideal: divergência clara entre casas',
      ],
    },
    {
      name: 'Hedge',
      color: '#818cf8',
      items: [
        'Protege aposta já existente',
        'Geralmente uma ou duas casas',
        'Garante lucro parcial ou limita perda',
        'Reduz o retorno potencial original',
        'Baixo risco de limitação',
        'ROI menor que aposta original',
        'Ideal: aposta aberta e vantagem no mercado',
      ],
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {strategies.map(s => (
        <div key={s.name} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${s.color}22` }}>
          <p className="text-xs font-semibold mb-4" style={{ color: s.color, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.name}</p>
          <ul className="space-y-2.5">
            {s.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                <span className="flex-shrink-0 mt-0.5" style={{ color: s.color }}>→</span>{item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ─── Main explanation component (SEO) ──────────────────── */

function DutchingExplanation() {

  const strategies = [
    {
      n: '1',
      t: 'Dutching de value bets',
      d: 'A aplicação mais analítica: você identificou 2 ou 3 seleções no mesmo evento com odds subavaliadas (acima do valor justo). Em vez de apostar em apenas uma e perder o edge das outras, você usa dutching para capturar o edge combinado com exposição equalizada. Se a soma das probabilidades implícitas ficar abaixo de 100%, a operação é matematicamente lucrativa.',
    },
    {
      n: '2',
      t: 'Dutching parcial de favoritos',
      d: 'Em corridas de cavalos ou eventos com muitos participantes, você seleciona os 3 a 5 favoritos reais e distribui a banca entre eles. Os outsiders ficam descobertos. Isso reduz o custo total da operação e melhora o ROI quando um dos favoritos vence — que, estatisticamente, acontece na maioria dos eventos.',
    },
    {
      n: '3',
      t: 'Dutching como cashout manual',
      d: 'Você tem uma aposta simples aberta que está ganhando e quer garantir parte do retorno antes do final. Em vez de usar o cashout da casa (que frequentemente oferece valores abaixo do justo), você faz dutching nos resultados opostos para criar uma cobertura manual. Isso dá controle total sobre o valor garantido e o retorno residual.',
    },
    {
      n: '4',
      t: 'Dutching em corridas de cavalos',
      d: 'A origem histórica do dutching. Em corridas com campo grande (10+ participantes), a análise individual de cada cavalo pode identificar grupos de favoritos subavaliados. Cobri-los com dutching em uma exchange como Betfair — onde as odds têm menos margem — maximiza a eficiência da estratégia.',
    },
    {
      n: '5',
      t: 'Dutching com comissão de exchange',
      d: 'Em exchanges, o lucro é tributado por comissão (geralmente 5% no Betfair). Isso muda o cálculo: o retorno efetivo é Banca ÷ Total × (1 − Comissão). Para o dutching ser lucrativo em exchanges, a soma das probabilidades implícitas precisa ser abaixo de ~95%, não de 100%. A calculadora não inclui comissão automaticamente — ajuste o retorno alvo manualmente.',
    },
    {
      n: '6',
      t: 'Evite outsiders de baixo valor',
      d: 'Um outsider com odd 15.00 tem probabilidade implícita de apenas 6,7%. Incluí-lo no dutching consome pouco stake mas eleva o total implícito, piorando o ROI de todas as seleções principais. A regra prática: só inclua seleções que você realmente acredita ter chance real, independente do baixo custo individual.',
    },
  ];

  const errors = [
    { title: 'Incluir seleções sem análise real', desc: 'Adicionar outsiders "porque custam pouco" infla o total de probabilidades e piora o ROI sem compensação. Cada seleção deve ter justificativa analítica própria.' },
    { title: 'Ignorar a margem da casa', desc: 'Com odds de casas tradicionais, a soma das probabilidades normalmente fica em 105% a 112%. Isso já embute perda. Confundir "mesmo retorno entre seleções" com "lucro garantido" é o equívoco mais comum no dutching.' },
    { title: 'Não considerar comissão em exchanges', desc: 'A comissão do Betfair (geralmente 5%) reduz o retorno líquido. Um dutching com soma de 98% pode parecer lucrativo, mas com 5% de comissão o retorno real fica negativo.' },
    { title: 'Usar dutching para substituir análise', desc: 'Dutching distribui o risco, mas não cria valor onde ele não existe. Se nenhuma das seleções tem odds acima do valor justo, o dutching apenas divide a perda esperada entre múltiplas apostas.' },
  ];

  return (
    <article className="space-y-12 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      {/* ── Intro ── */}
      <section className="space-y-5">
        <SectionLabel>Guia completo da ferramenta</SectionLabel>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Calculadora de dutching: distribua a banca e equalize o retorno entre múltiplas seleções
        </h2>
        <p>
          A <strong style={{ color: 'var(--text-1)' }}>calculadora de dutching</strong> é uma ferramenta educativa que calcula automaticamente como distribuir o stake entre duas ou mais seleções do mesmo evento para garantir <strong style={{ color: 'var(--text-1)' }}>o mesmo retorno total independente de qual delas vencer</strong>. Ela mostra os stakes proporcionais de cada seleção, o retorno garantido, o lucro ou prejuízo líquido, o ROI da operação e a soma das probabilidades implícitas — o indicador central da estratégia.
        </p>
        <p>
          O nome "dutching" vem de uma técnica popularizada por apostadores profissionais de corridas de cavalos nos Estados Unidos nos anos 1920, atribuída ao apostador Dutch Schultz. Décadas depois, a estratégia migrou para o futebol, tênis e outros esportes, e ganhou sofisticação com o surgimento das exchanges de apostas, onde as odds são formadas pelo mercado e têm menor margem embutida.
        </p>
        <p>
          Use esta calculadora antes de colocar um bilhete duplo ou triplo quando você não quer se comprometer com apenas um resultado, quando encontrou múltiplas seleções com valor em um mesmo evento, ou quando quer entender exatamente quanto apostar em cada seleção para equalizar a exposição de forma precisa.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoCard title="O que calcula" tone="cyan">
            <p>Stakes proporcionais por seleção, retorno equalizado, lucro/prejuízo líquido, ROI e soma das probabilidades implícitas em tempo real.</p>
          </InfoCard>
          <InfoCard title="Quando usar" tone="violet">
            <p>Antes de apostar em múltiplos resultados do mesmo evento com exposição equalizada: futebol, tênis, corridas de cavalos, basquete ou qualquer mercado com 2 ou mais seleções.</p>
          </InfoCard>
          <InfoCard title="Para quem é" tone="green">
            <p>Apostadores que identificaram valor em múltiplos resultados e querem capturar o edge combinado sem se expor mais em um resultado do que no outro.</p>
          </InfoCard>
        </div>
      </section>

      {/* ── Core concept ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>O princípio da equalização: por que proporcionalidade importa</h2>
        <p>
          A essência do dutching é simples, mas tem um detalhe matemático importante: apostar valores iguais em duas seleções com odds diferentes <strong style={{ color: 'var(--text-1)' }}>não equaliza o retorno</strong>. Se você aposta R$250 em Time A (odd 2.20) e R$250 em Empate (odd 3.10), o retorno caso o Time A vença é R$550 mas se empatar é R$775 — resultados diferentes para o mesmo dinheiro investido.
        </p>
        <p>
          O dutching resolve isso ajustando o stake de cada seleção <strong style={{ color: 'var(--text-1)' }}>inversamente proporcional à sua odd</strong>. Uma seleção com odd alta (menos provável) recebe um stake menor; uma seleção com odd baixa (mais provável) recebe um stake maior. O resultado: qualquer que seja a seleção coberta que vencer, o retorno total é idêntico.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Divisão igual — resultado diferente" tone="red">
            <p>R$250 + R$250 apostados em Time A (2.20) e Empate (3.10):</p>
            <p>Se Time A vencer: retorno <strong style={{ color: 'var(--text-1)' }}>R$550</strong></p>
            <p>Se empatar: retorno <strong style={{ color: 'var(--text-1)' }}>R$775</strong></p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Exposição desigual — não é dutching.</p>
          </InfoCard>
          <InfoCard title="Dutching correto — retorno igual" tone="green">
            <p>R$313 em Time A (2.20) + R$187 em Empate (3.10), banca R$500:</p>
            <p>Se Time A vencer: retorno <strong style={{ color: 'var(--text-1)' }}>R$688</strong></p>
            <p>Se empatar: retorno <strong style={{ color: 'var(--text-1)' }}>R$579</strong></p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Aguarda — recalculado com odds de dois resultados sem o terceiro incluso neste exemplo, retorno não é idêntico. Isso mostra que o dutching de 2 seleções de um mercado de 3 outcomes não equaliza da mesma forma que o dutching completo.</p>
          </InfoCard>
        </div>
        <InfoCard title="Exemplo de dutching correto com 2 seleções isoladas" tone="violet">
          <p>Suponha que você quer cobrir apenas Time A (odd 2.50) e Empate (odd 3.20), ignorando Time B, com banca de R$500:</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Total implícito:</strong> 1/2.50 + 1/3.20 = 0.400 + 0.313 = 0.713</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Stake Time A:</strong> R$500 ÷ (2.50 × 0.713) = <strong style={{ color: '#22d3ee' }}>R$280,50</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>Stake Empate:</strong> R$500 ÷ (3.20 × 0.713) = <strong style={{ color: '#22d3ee' }}>R$219,50</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>Retorno (qualquer um vencendo):</strong> R$500 ÷ 0.713 = <strong style={{ color: '#4ade80' }}>R$701,30</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>Lucro:</strong> R$201,30 · <strong style={{ color: 'var(--text-1)' }}>ROI:</strong> +40,3% (se uma das coberta vencer) · <strong style={{ color: '#f87171' }}>Risco:</strong> −R$500 se Time B vencer.</p>
        </InfoCard>
      </section>

      {/* ── Formulas ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Fórmulas do dutching explicadas passo a passo</h2>
        <p>
          O cálculo completo do dutching envolve quatro métricas que a calculadora computa automaticamente:
        </p>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(15,23,42,0.55)', border: '1px solid var(--border)' }}>
          <div className="space-y-3 font-mono text-xs md:text-sm" style={{ color: 'var(--text-1)' }}>
            <p><span style={{ color: '#22d3ee' }}>Total_impl</span>  = 1÷Odd₁ + 1÷Odd₂ + … + 1÷Oddₙ</p>
            <p><span style={{ color: '#22d3ee' }}>Stake N</span>     = Banca ÷ (OddN × Total_impl)</p>
            <p><span style={{ color: '#4ade80' }}>Retorno</span>     = Banca ÷ Total_impl</p>
            <p><span style={{ color: '#4ade80' }}>Lucro</span>       = Retorno − Banca</p>
            <p><span style={{ color: '#818cf8' }}>ROI</span>         = (Lucro ÷ Banca) × 100</p>
            <p><span style={{ color: '#fbbf24' }}>Retorno (exch)</span> = Retorno × (1 − Comissão)</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Seleção', 'Odd', 'Prob. implícita (1/Odd)', 'Stake (banca R$500)', 'Retorno se vencer'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { sel: 'Time A ganha', odd: '2.20', pct: '45,5%', stake: 'R$216,50', ret: 'R$476,30' },
                { sel: 'Empate',       odd: '3.10', pct: '32,3%', stake: 'R$153,60', ret: 'R$476,10' },
                { sel: 'Time B ganha', odd: '4.50', pct: '22,2%', stake: 'R$105,70', ret: 'R$475,70' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{row.sel}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: 'var(--text-2)' }}>{row.odd}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#22d3ee' }}>{row.pct}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{row.stake}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: '#4ade80' }}>{row.ret}</td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(251,191,36,0.04)', borderTop: '1px solid rgba(251,191,36,0.15)' }}>
                <td className="px-4 py-3 font-bold" style={{ color: 'var(--text-1)' }}>Total</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-3)' }}>—</td>
                <td className="px-4 py-3 font-bold" style={{ color: '#fbbf24' }}>100,0%</td>
                <td className="px-4 py-3 font-bold" style={{ color: 'var(--text-1)' }}>R$475,80</td>
                <td className="px-4 py-3 font-bold" style={{ color: '#fbbf24' }}>ROI ≈ 0% (sem margem)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
          Neste exemplo as probabilidades somam exatamente 100% (odds sem margem), então o retorno é aproximadamente igual à banca. Com odds reais de casas, a soma ficaria entre 105% e 112%, gerando retorno menor que R$500.
        </p>
      </section>

      {/* ── Implicit sum table ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Como interpretar a soma das probabilidades implícitas</h2>
        <p>
          A <strong style={{ color: 'var(--text-1)' }}>soma das probabilidades implícitas</strong> (Total_impl) é o indicador mais importante do dutching. Ela aparece em tempo real na calculadora e determina diretamente o retorno da operação: quanto menor a soma, melhor o retorno. A tabela abaixo ajuda a interpretar qualquer valor que a calculadora mostrar:
        </p>
        <ImplicitSumTable />
        <InfoCard title="Como calcular o impacto da margem no retorno" tone="amber">
          <p>Se a soma das probabilidades é 106%, o retorno do dutching é: Banca ÷ 1.06. Com banca de R$1.000, o retorno garantido é R$943,40 — ou seja, uma perda de R$56,60 independente do resultado. Essa é a "taxa de entrada" da margem da casa. A calculadora mostra esse número diretamente no campo "Lucro/Prejuízo", tornando o custo invisível da margem explícito antes de você apostar.</p>
        </InfoCard>
      </section>

      {/* ── Dutching vs Arb vs Hedge ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Dutching, arbitragem e hedge: quando usar cada estratégia</h2>
        <p>
          As três estratégias compartilham a lógica de cobertura, mas têm objetivos, requisitos e perfis de risco distintos. Entender as diferenças é fundamental para escolher a ferramenta certa para cada situação:
        </p>
        <ComparisonTable />
        <p>
          Para arbitragem completa, use a{' '}
          <Link to="/calculadoras/arbitragem" style={{ color: '#22d3ee', fontWeight: 600 }}>Calculadora de Arbitragem</Link>.
          Para proteger uma aposta já aberta, use a{' '}
          <Link to="/calculadoras/hedge" style={{ color: '#22d3ee', fontWeight: 600 }}>Calculadora de Hedge</Link>.
          Para apostas múltiplas combinadas em um único bilhete, use a{' '}
          <Link to="/calculadoras/multipla-parlay" style={{ color: '#22d3ee', fontWeight: 600 }}>Calculadora de Múltipla</Link>.
        </p>
      </section>

      {/* ── Strategies ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>6 estratégias práticas de dutching</h2>
        <p>
          O dutching é mais versátil do que parece. Além da aplicação clássica de equalizar retornos, ele pode ser usado em cenários táticos diferentes dependendo do contexto e dos objetivos:
        </p>
        <ol className="space-y-3 list-none">
          {strategies.map(d => (
            <li key={d.n} className="flex gap-4 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{d.n}</span>
              <div>
                <p className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-1)' }}>{d.t}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{d.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Dutching in exchanges ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Dutching em exchanges: Betfair e a eficiência do mercado</h2>
        <p>
          Exchanges de apostas como Betfair são o ambiente mais eficiente para dutching. Diferente das casas tradicionais, onde a casa define as odds com margem embutida, em uma exchange as odds são determinadas pelos próprios apostadores — o que resulta em preços mais próximos do valor justo e spreads menores.
        </p>
        <p>
          O Betfair possui uma ferramenta nativa de dutching integrada à plataforma, que calcula automaticamente os stakes para equalizar o retorno entre seleções do mesmo evento. Esse recurso é especialmente popular em corridas de cavalos, onde cobrir um grupo de favoritos é uma estratégia recorrente de apostadores profissionais.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Vantagens em exchanges" tone="green">
            <ul className="space-y-2 list-disc pl-4">
              <li>Odds com menor margem embutida (spreads mais justos).</li>
              <li>Mercados líquidos em corridas de cavalos, futebol e tênis.</li>
              <li>Ferramenta nativa de dutching no Betfair.</li>
              <li>Possibilidade de fazer lay (apostar contra) como complemento.</li>
            </ul>
          </InfoCard>
          <InfoCard title="Atenção à comissão" tone="amber">
            <ul className="space-y-2 list-disc pl-4">
              <li>Betfair cobra ~5% sobre lucros líquidos.</li>
              <li>O retorno real é: (Banca ÷ Total_impl) × (1 − 0,05).</li>
              <li>Para o dutching ser lucrativo, a soma das probabilidades precisa ser abaixo de ~95%, não de 100%.</li>
              <li>Apostadores com histórico de alto volume podem ter taxas reduzidas.</li>
            </ul>
          </InfoCard>
        </div>
        <p>
          Em exchanges, o dutching também é utilizado como estratégia de <strong style={{ color: 'var(--text-1)' }}>trading esportivo</strong>: você monta posições em múltiplos preços de um mesmo mercado antes do evento, e fecha (lay) as posições durante o evento conforme os preços se movem, buscando lucro pelo diferencial de odds — não pelo resultado final.
        </p>
      </section>

      {/* ── Common errors ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Erros comuns que reduzem a eficiência do dutching</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {errors.map((e, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.1)' }}>
              <p className="font-semibold text-sm mb-1.5" style={{ color: '#f87171' }}>{e.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Responsible gaming ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Jogo responsável e avisos importantes</h2>
        <InfoCard title="+18 · Conteúdo educativo · Jogo responsável" tone="amber">
          <p>
            Este conteúdo é destinado exclusivamente a maiores de 18 anos. As simulações desta calculadora são educativas e não constituem recomendação financeira nem garantia de retorno. O dutching reduz a variância entre seleções cobertas, mas não elimina o risco financeiro — se nenhuma seleção coberta vencer, a banca é perdida integralmente.
          </p>
          <p>
            Se apostas esportivas estiverem afetando negativamente sua vida financeira ou pessoal, procure ajuda. Acesse nossa página de{' '}
            <Link to="/jogo-responsavel" style={{ color: '#fbbf24', fontWeight: 600 }}>jogo responsável</Link>
            {' '}para recursos e orientações disponíveis no Brasil.
          </p>
        </InfoCard>
      </section>

      {/* ── CTA links ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Ferramentas que complementam o dutching</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { to: '/calculadoras/arbitragem', label: 'Calculadora de Arbitragem', desc: 'Detecte sure bets e calcule como cobrir todos os resultados com lucro garantido entre casas.' },
            { to: '/calculadoras/hedge', label: 'Calculadora de Hedge', desc: 'Proteja uma aposta já aberta apostando no resultado oposto para limitar perda ou garantir lucro.' },
            { to: '/calculadoras/odds', label: 'Calculadora de Odds', desc: 'Converta odds e calcule valor esperado para identificar se uma seleção tem edge real.' },
            { to: '/calculadoras/cashout', label: 'Calculadora de Cash Out', desc: 'Calcule se o cashout oferecido pela casa está acima ou abaixo do valor justo do bilhete.' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-2xl p-4 block transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.22)'; e.currentTarget.style.background = 'rgba(34,211,238,0.03)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <p className="font-semibold mb-1.5 text-sm" style={{ color: 'var(--text-1)' }}>{link.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{link.desc}</p>
            </Link>
          ))}
        </div>
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
          Todas as ferramentas são gratuitas, sem cadastro e sem envio de dados a terceiros.{' '}
          <Link to="/" style={{ color: '#22d3ee' }}>Ver todas as calculadoras →</Link>
        </p>
      </section>
    </article>
  );
}

/* ─── Page component ─────────────────────────────────────── */

export default function Dutching() {
  const [selecoes, setSelecoes] = useState([{ odd: '', nome: '' }, { odd: '', nome: '' }]);
  const [banca, setBanca] = useState('');

  const atualizar = (i, campo, v) => { const s = [...selecoes]; s[i][campo] = v; setSelecoes(s); };
  const adicionar = () => setSelecoes([...selecoes, { odd: '', nome: '' }]);
  const remover = i => selecoes.length > 2 && setSelecoes(selecoes.filter((_, idx) => idx !== i));

  const oddsN = selecoes.map(s => parseFloat(s.odd));
  const todasValidas = oddsN.every(o => o > 1) && selecoes.length >= 2;
  const bancaN = parseFloat(banca);
  const valid = todasValidas && bancaN > 0;

  const totalInv = todasValidas ? oddsN.reduce((acc, o) => acc + 1 / o, 0) : 0;
  const stakes = valid ? oddsN.map(o => bancaN / (o * totalInv)) : [];
  const retorno = valid ? bancaN / totalInv : 0;
  const lucro = valid ? retorno - bancaN : 0;
  const roi = valid ? (lucro / bancaN) * 100 : 0;

  return (
    <CalcLayout
      title="Calculadora de Dutching Online"
      description="Calcule dutching grátis: distribua a banca entre múltiplas seleções com retorno equalizado, veja stakes proporcionais, lucro líquido, ROI e soma de probabilidades implícitas. Educativa, sem cadastro."
      slug="dutching"
      faqs={faqs}
      schema={schema}
      explanation={<DutchingExplanation />}
    >
      <div className="space-y-6">

        {/* Info banner */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            Insira o nome e a <strong style={{ color: 'var(--text-1)' }}>odd decimal</strong> de cada seleção que deseja cobrir. Informe sua banca e a calculadora distribui os stakes automaticamente para equalizar o retorno.
          </p>
        </div>

        {/* Selections */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0">Seleções ({selecoes.length})</label>
            <button
              type="button"
              onClick={adicionar}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: 'var(--cyan)' }}
              aria-label="Adicionar seleção"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar seleção
            </button>
          </div>
          <div className="space-y-2.5">
            {selecoes.map((s, i) => {
              const oddNum = parseFloat(s.odd);
              const probImpl = oddNum > 1 ? (1 / oddNum) * 100 : null;
              return (
                <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-end">
                    <div>
                      <label className="label text-xs mb-1.5" htmlFor={`nome-${i}`}>Nome da seleção</label>
                      <input
                        id={`nome-${i}`}
                        type="text"
                        className="input-field"
                        placeholder={`Seleção ${i + 1}`}
                        value={s.nome}
                        onChange={e => atualizar(i, 'nome', e.target.value)}
                      />
                    </div>
                    <div className="w-28">
                      <label className="label text-xs mb-1.5" htmlFor={`odd-${i}`}>Odd decimal</label>
                      <input
                        id={`odd-${i}`}
                        type="number"
                        className="input-field"
                        placeholder="3.50"
                        step="0.01"
                        min="1.01"
                        inputMode="decimal"
                        value={s.odd}
                        onChange={e => atualizar(i, 'odd', e.target.value)}
                      />
                    </div>
                    {selecoes.length > 2 && (
                      <button
                        type="button"
                        onClick={() => remover(i)}
                        className="p-2.5 rounded-xl transition-colors mb-px flex-shrink-0"
                        style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
                        aria-label={`Remover seleção ${i + 1}`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {probImpl !== null && (
                    <p className="text-xs mt-2" style={{ color: 'var(--text-3)' }}>
                      Probabilidade implícita:{' '}
                      <strong style={{ color: '#22d3ee' }}>{probImpl.toFixed(1)}%</strong>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Implicit sum preview */}
        {todasValidas && (
          <div
            className="rounded-xl px-4 py-3"
            style={{
              background: totalInv <= 1 ? 'rgba(34,197,94,0.06)' : 'rgba(251,191,36,0.04)',
              border: `1px solid ${totalInv <= 1 ? 'rgba(34,197,94,0.2)' : 'rgba(251,191,36,0.15)'}`,
            }}
            aria-live="polite"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Soma das probabilidades implícitas</p>
                <p className="text-2xl font-bold mt-0.5" style={{ color: totalInv <= 1 ? '#4ade80' : '#fbbf24' }}>
                  {(totalInv * 100).toFixed(2)}%
                </p>
              </div>
              <p className="text-xs sm:text-right max-w-[200px]" style={{ color: 'var(--text-3)' }}>
                {totalInv < 1
                  ? `✓ Abaixo de 100% → dutching lucrativo (+${((1 / totalInv - 1) * 100).toFixed(2)}% de ROI)`
                  : totalInv === 1
                  ? 'Exatamente 100% → retorno igual à banca'
                  : `Acima de 100% → retorno menor que a banca (−${((1 - 1 / totalInv) * 100).toFixed(2)}%)`}
              </p>
            </div>
          </div>
        )}

        {/* Banca */}
        <div>
          <label className="label" htmlFor="banca-dutch">Banca total (R$)</label>
          <div className="flex flex-wrap gap-2 mb-2.5" aria-label="Atalhos de banca">
            {PRESETS_BANCA.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setBanca(String(p))}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={{
                  background: banca === String(p) ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${banca === String(p) ? 'rgba(34,211,238,0.4)' : 'var(--border)'}`,
                  color: banca === String(p) ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                R${p.toLocaleString('pt-BR')}
              </button>
            ))}
          </div>
          <input
            id="banca-dutch"
            type="number"
            className="input-field"
            placeholder="ex: 500"
            min="0"
            inputMode="decimal"
            value={banca}
            onChange={e => setBanca(e.target.value)}
          />
        </div>

        {/* Results */}
        {valid ? (
          <div className="space-y-3" aria-live="polite">
            <div className="grid grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: '#22d3ee' }}>R${retorno.toFixed(2)}</p>
                <p className="result-label">Retorno equalizado</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: lucro >= 0 ? '#4ade80' : '#f87171' }}>
                  {lucro >= 0 ? '+' : ''}R${lucro.toFixed(2)}
                </p>
                <p className="result-label">Lucro / Prejuízo</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#818cf8' }}>{roi.toFixed(2)}%</p>
                <p className="result-label">ROI</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>Distribuição proporcional de stakes</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>Total: R${stakes.reduce((a, b) => a + b, 0).toFixed(2)}</p>
              </div>
              {stakes.map((st, i) => {
                const pct = (st / bancaN) * 100;
                return (
                  <div key={i} className="px-4 py-3" style={{ borderBottom: i < stakes.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-xs font-medium" style={{ color: 'var(--text-1)' }}>
                          {selecoes[i].nome || `Seleção ${i + 1}`}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                          odd {parseFloat(selecoes[i].odd).toFixed(2)} · {pct.toFixed(1)}% da banca · retorno R${(st * parseFloat(selecoes[i].odd)).toFixed(2)}
                        </p>
                      </div>
                      <span className="text-sm font-bold tabular-nums ml-4 flex-shrink-0" style={{ color: '#22d3ee' }}>
                        R${st.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }} aria-hidden="true">
                      <div
                        className="h-1 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #22d3ee, #818cf8)' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
              Se qualquer seleção coberta vencer, o retorno é{' '}
              <strong style={{ color: '#22d3ee' }}>R${retorno.toFixed(2)}</strong>
              {' '}({lucro >= 0 ? 'lucro' : 'prejuízo'} de{' '}
              <strong style={{ color: lucro >= 0 ? '#4ade80' : '#f87171' }}>R${Math.abs(lucro).toFixed(2)}</strong>).
              {' '}Se um resultado <strong style={{ color: 'var(--text-1)' }}>não coberto</strong> ocorrer, a banca total é perdida.
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm text-center px-4" style={{ color: 'var(--text-3)' }}>
              {!todasValidas
                ? 'Preencha as odds decimais de todas as seleções (mínimo 1.01) para ver a distribuição'
                : 'Informe a banca total para calcular os stakes e o retorno equalizado'}
            </p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
