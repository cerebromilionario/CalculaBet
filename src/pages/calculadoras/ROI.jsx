import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const faqs = [
  {
    q: 'O que é ROI em apostas esportivas?',
    a: 'ROI (Return on Investment — Retorno sobre Investimento) é o percentual de retorno em relação ao total apostado num determinado período. A fórmula é: ROI = (Lucro líquido / Total apostado) × 100. Se você apostou R$2.000 e teve R$2.180 de retorno, seu ROI é +9%. Um ROI positivo sustentado ao longo de centenas de apostas é evidência de edge real sobre as casas de apostas.',
  },
  {
    q: 'Qual é um bom ROI em apostas esportivas?',
    a: 'Apostadores recreativos ficam tipicamente entre −5% e −15%, pois as margens das casas consomem esse valor. Apostadores disciplinados sem edge real costumam ficar entre −2% e +2%. Apostadores com edge genuíno alcançam de +5% a +12%. Profissionais em tempo integral raramente ultrapassam +15% a +20% de forma sustentada, pois o volume necessário para sustentar esse ROI é muito alto e casas de apostas começam a limitar contas. ROI acima de 25% em amostras grandes é estatisticamente extraordinário.',
  },
  {
    q: 'Qual a diferença entre ROI e yield em apostas?',
    a: 'Na prática, ROI e yield são calculados da mesma forma e expressam o mesmo conceito: lucro percentual sobre o total apostado. A diferença está na origem: ROI vem da linguagem financeira (Return on Investment) e yield do inglês esportivo (rendimento percentual por aposta). Alguns puristas diferenciam: yield seria o ROI por aposta individual, enquanto ROI seria o acumulado do período. Na CalculaBet, tratamos os dois como equivalentes.',
  },
  {
    q: 'Quantas apostas preciso para que o ROI seja estatisticamente confiável?',
    a: 'Depende do ROI esperado e do nível de confiança desejado. Para detectar um ROI de +5% com 95% de confiança, são necessárias aproximadamente 400 apostas. Para ROI de +10%, em torno de 200 apostas. Com menos de 100 apostas, um ROI positivo pode ser simplesmente sorte — a variância domina o sinal. A regra prática dos apostadores profissionais é: abaixo de 300 apostas, nenhuma conclusão firme sobre habilidade.',
  },
  {
    q: 'O que é CLV e como ele se relaciona com o ROI?',
    a: 'CLV (Closing Line Value) é a diferença entre a odd na qual você apostou e a odd final de fechamento do mercado. Se você apostou a 2.20 numa partida que fechou a 2.00, você teve CLV positivo. CLV é considerado um indicador antecedente de ROI a longo prazo: apostadores que consistentemente batem a linha de fechamento tendem a ter ROI positivo. É mais difícil de manipular do que o ROI de curto prazo, pois não depende dos resultados dos jogos.',
  },
  {
    q: 'Como calcular o ROI por mercado separadamente?',
    a: 'Para calcular o ROI por mercado, some os stakes e retornos apenas das apostas naquele tipo: ROI_mercado = (Retornos_mercado − Stakes_mercado) / Stakes_mercado × 100. Por exemplo, você pode ter ROI +8% em Dupla Chance e ROI −5% em Over/Under. Segmentar o ROI por mercado, liga e horário revela onde está seu edge real — e onde você está perdendo dinheiro.',
  },
  {
    q: 'Como o tamanho da odd afeta o ROI e o win rate necessário?',
    a: 'Existe uma relação direta entre a odd e o win rate necessário para ter ROI neutro: win rate break-even = 1 / odd. A odd 2.00 exige 50% de acertos; a odd 1.70 exige 58.8%; a odd 3.00 exige apenas 33.3%. Por isso, apostadores de odds altas podem ter win rate baixo e ainda ser lucrativos. O ROI é a métrica que unifica essas comparações independentemente do perfil de odd.',
  },
  {
    q: 'Devo incluir apostas com bônus no cálculo do ROI?',
    a: 'Depende do objetivo da análise. Para medir seu edge real sobre as casas, exclua os bônus — eles mascaram a habilidade real e não são sustentáveis. Para medir o retorno financeiro total, inclua. O ideal é calcular os dois: ROI bruto (com bônus) e ROI líquido (sem bônus). Apostadores profissionais geralmente reportam o ROI sem bônus, pois bônus se esgotam e mudam ao longo do tempo.',
  },
  {
    q: 'O que é o ROI ajustado pela variância?',
    a: 'O ROI bruto pode ser enganoso em amostras pequenas porque a variância dos resultados cria oscilações. Um ajuste comum é calcular o intervalo de confiança do ROI: com 200 apostas e ROI de +5%, o intervalo de 95% pode ser entre −2% e +12%, o que mostra que o ROI real pode ser negativo. Ferramentas como o teste z ou simulação de Monte Carlo permitem estimar a probabilidade de que um ROI positivo seja fruto de habilidade, não de sorte.',
  },
  {
    q: 'Como o fechamento de contas pelas casas afeta o ROI?',
    a: 'Apostadores com ROI muito positivo frequentemente têm contas limitadas ou fechadas pelas casas de apostas. Isso cria um viés de sobrevivência: apenas os apostadores "medianos" permanecem com acesso pleno. Para apostadores profissionais, o gerenciamento de contas (account management) se torna parte essencial da estratégia — distribuindo volume entre várias casas, apostando em exchanges onde não há restrições, e usando contas de pessoas confiáveis de forma ética e legal.',
  },
  {
    q: 'ROI positivo significa que vou lucrar sempre?',
    a: 'Não. ROI positivo significa que, em média e no longo prazo, você tem expectativa positiva. Mas a variância cria sequências de perdas mesmo para apostadores com edge real. Um apostador com ROI +5% pode ter 20 apostas seguidas perdendo — não por falta de habilidade, mas pela distribuição natural de resultados. Por isso a gestão de banca é inseparável do ROI: sem banca suficiente para absorver a variância, mesmo um apostador com edge genuíno pode falir.',
  },
  {
    q: 'O que fazer quando o ROI está negativo por muito tempo?',
    a: 'Primeiro, verifique o tamanho da amostra: com menos de 200 apostas, ROI negativo não é conclusivo. Se a amostra for grande, analise por segmento: mercado, liga, horário, tipo de odd. Muitas vezes o ROI global é negativo porque um segmento específico está destruindo o retorno dos demais. Se após análise profunda o ROI continuar negativo em todos os segmentos com amostra suficiente, pode ser necessário rever a metodologia de seleção, migrar para outros mercados ou reduzir o stake até encontrar o edge real.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de ROI em Apostas — CalculaBet',
      url: 'https://calculabet.site/calculadoras/roi',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Calcule o ROI (Retorno sobre Investimento) das suas apostas esportivas, track win rate e meça sua performance real como apostador.',
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

/* ─── Helpers ─── */
function InfoCard({ title, children, tone = 'neutral' }) {
  const colors = {
    cyan:    { bg: 'rgba(34,211,238,0.04)',   border: 'rgba(34,211,238,0.15)',   title: '#22d3ee' },
    violet:  { bg: 'rgba(129,140,248,0.04)',  border: 'rgba(129,140,248,0.15)',  title: '#818cf8' },
    green:   { bg: 'rgba(74,222,128,0.04)',   border: 'rgba(74,222,128,0.15)',   title: '#4ade80' },
    amber:   { bg: 'rgba(251,191,36,0.04)',   border: 'rgba(251,191,36,0.15)',   title: '#fbbf24' },
    red:     { bg: 'rgba(248,113,113,0.04)',  border: 'rgba(248,113,113,0.18)',  title: '#f87171' },
    neutral: { bg: 'rgba(255,255,255,0.02)',  border: 'var(--border)',           title: 'var(--text-2)' },
  };
  const c = colors[tone] || colors.neutral;
  return (
    <div className="rounded-xl p-5" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      {title && (
        <p className="text-xs font-semibold mb-3" style={{ color: c.title, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {title}
        </p>
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

/* ─── Unique Visual Component 1: ROI por perfil e mercado ─── */
function ROIBenchmarkTable() {
  const rows = [
    { perfil: 'Recreativo casual',      mercados: 'Resultado final, BTTS',         roi: '−8% a −15%',  cor: '#f87171', nivel: 'Negativo' },
    { perfil: 'Apostador semi-sério',   mercados: 'Over/Under, Dupla Chance',      roi: '−3% a +2%',   cor: '#fbbf24', nivel: 'Limiar' },
    { perfil: 'Value bettor iniciante', mercados: 'Handicap Asiático, Mercados 2ª linha', roi: '+3% a +7%', cor: '#4ade80', nivel: 'Positivo' },
    { perfil: 'Apostador consistente',  mercados: 'Nicho especializado',           roi: '+5% a +12%',  cor: '#4ade80', nivel: 'Sólido' },
    { perfil: 'Profissional experiente',mercados: 'Múltiplos mercados com modelo', roi: '+10% a +20%', cor: '#22d3ee', nivel: 'Profissional' },
    { perfil: 'Trader esportivo',       mercados: 'Exchanges, mercados ao vivo',   roi: '+15% a +30%', cor: '#818cf8', nivel: 'Elite' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Perfil', 'Mercados típicos', 'ROI esperado', 'Nível'].map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{r.perfil}</td>
              <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{r.mercados}</td>
              <td className="px-4 py-3 font-bold" style={{ color: r.cor }}>{r.roi}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: `${r.cor}18`, color: r.cor }}>
                  {r.nivel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Unique Visual Component 2: Amostra vs Confiabilidade do ROI ─── */
function SampleReliabilityTable() {
  const rows = [
    { apostas: '< 50',    confianca: 'Nenhuma',    roi5: '—',    roi10: '—',    leitura: 'Apenas ruído estatístico' },
    { apostas: '50–100',  confianca: 'Muito baixa', roi5: '—',    roi10: 'Fraca', leitura: 'Pode ser sorte ou azar' },
    { apostas: '100–200', confianca: 'Baixa',      roi5: 'Fraca', roi10: 'Razoável', leitura: 'Tendências iniciais visíveis' },
    { apostas: '200–400', confianca: 'Razoável',   roi5: 'Razoável', roi10: 'Boa', leitura: 'ROI começa a ser significativo' },
    { apostas: '400–600', confianca: 'Boa',        roi5: 'Boa',  roi10: 'Alta', leitura: 'Edge genuíno se confirma' },
    { apostas: '600–1000',confianca: 'Alta',       roi5: 'Alta', roi10: 'Muito alta', leitura: 'Conclusões firmes possíveis' },
    { apostas: '> 1000',  confianca: 'Muito alta', roi5: 'Muito alta', roi10: 'Quase certa', leitura: 'Análise por segmento confiável' },
  ];
  const colorMap = { '—': 'var(--text-3)', 'Fraca': '#f87171', 'Razoável': '#fbbf24', 'Boa': '#4ade80', 'Alta': '#22d3ee', 'Muito alta': '#818cf8', 'Quase certa': '#818cf8', 'Nenhuma': '#f87171', 'Muito baixa': '#f87171' };
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['N.º de apostas', 'Confiança geral', 'Detectar ROI +5%', 'Detectar ROI +10%', 'Interpretação'].map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-4 py-3 font-bold" style={{ color: 'var(--text-1)' }}>{r.apostas}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: colorMap[r.confianca] || 'var(--text-2)' }}>{r.confianca}</td>
              <td className="px-4 py-3" style={{ color: colorMap[r.roi5] || 'var(--text-2)' }}>{r.roi5}</td>
              <td className="px-4 py-3" style={{ color: colorMap[r.roi10] || 'var(--text-2)' }}>{r.roi10}</td>
              <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{r.leitura}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Unique Visual Component 3: Break-even por faixa de odd ─── */
function BreakEvenOddsTable() {
  const rows = [
    { odd: '1.40–1.60', breakEven: '62.5–71.4%', tipico: 'Favoritos claros, dupla chance',    dificuldade: 'Alta', cor: '#f87171' },
    { odd: '1.61–1.90', breakEven: '52.6–62.1%', tipico: 'Favoritos, resultado 1X2',          dificuldade: 'Alta', cor: '#f87171' },
    { odd: '1.91–2.10', breakEven: '47.6–52.4%', tipico: 'Mercados equilibrados, Over 2.5',   dificuldade: 'Média', cor: '#fbbf24' },
    { odd: '2.11–2.50', breakEven: '40.0–47.4%', tipico: 'Azarões leves, mercados de nicho',  dificuldade: 'Média', cor: '#fbbf24' },
    { odd: '2.51–3.50', breakEven: '28.6–39.8%', tipico: 'Azarões, over/under 3.5',           dificuldade: 'Média-baixa', cor: '#4ade80' },
    { odd: '3.51–6.00', breakEven: '16.7–28.5%', tipico: 'Grandes azarões, antepost',         dificuldade: 'Baixa', cor: '#4ade80' },
    { odd: '> 6.00',    breakEven: '< 16.7%',    tipico: 'Azarões extremos, acumuladores',    dificuldade: 'Muito baixa', cor: '#22d3ee' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Faixa de odd', 'Win rate break-even', 'Mercados típicos', 'Dif. de superar edge'].map(h => (
              <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-4 py-3 font-bold" style={{ color: 'var(--text-1)' }}>{r.odd}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: r.cor }}>{r.breakEven}</td>
              <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{r.tipico}</td>
              <td className="px-4 py-3">
                <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ background: `${r.cor}18`, color: r.cor }}>
                  {r.dificuldade}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Explanation ─── */
function ROIExplanation() {
  return (
    <article className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      <section>
        <SectionLabel>Fundamentos</SectionLabel>
        <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>O que é ROI em apostas esportivas?</h2>
        <p className="mb-4">
          <strong style={{ color: 'var(--text-1)' }}>ROI</strong> — sigla para <em>Return on Investment</em>, ou Retorno sobre Investimento — é a métrica central para avaliar a performance de um apostador ao longo do tempo. Diferentemente do lucro absoluto, o ROI é percentual, o que permite comparar apostadores que trabalham com bancas de tamanhos diferentes.
        </p>
        <p className="mb-4">
          A fórmula é direta: <strong style={{ color: 'var(--text-1)' }}>ROI = (Lucro líquido ÷ Total apostado) × 100</strong>. Se você apostou R$5.000 em um mês e obteve R$5.350 de retorno total, seu ROI é +7%. Isso significa que cada real apostado rendeu, em média, R$0,07 de lucro.
        </p>
        <p className="mb-4">
          No contexto de apostas esportivas, o ROI também é frequentemente chamado de <strong style={{ color: 'var(--text-1)' }}>yield</strong> — especialmente no universo anglófono do tipster. Ambos os termos são equivalentes para fins práticos, embora alguns analistas usem "yield" especificamente para o retorno por aposta individual e "ROI" para o acumulado do período.
        </p>
        <p>
          O ROI é a resposta à pergunta mais importante que um apostador pode fazer: <em>"Tenho edge real sobre as casas de apostas ou estou apostando no prejuízo?"</em> Um ROI positivo sustentado em centenas de apostas é evidência de habilidade genuína; um ROI positivo em dezenas de apostas pode ser simplesmente sorte.
        </p>
      </section>

      <section>
        <SectionLabel>Fórmulas</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Como calcular o ROI passo a passo</h2>
        <div className="rounded-xl p-5 mb-5" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.15)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Fórmulas essenciais</p>
          <div className="space-y-2 font-mono text-xs" style={{ color: 'var(--text-1)' }}>
            <p>ROI (%) = (Lucro líquido / Total apostado) × 100</p>
            <p>Lucro líquido = Total retornado − Total apostado</p>
            <p>Win rate (%) = (Apostas ganhas / Total apostas) × 100</p>
            <p>Break-even win rate = 1 / Odd decimal × 100</p>
            <p>Odd implícita = 1 / Probabilidade implícita</p>
          </div>
        </div>
        <p className="mb-4">
          Exemplo prático: em um mês, você fez 40 apostas. Cada aposta tinha stake de R$50. Total apostado: R$2.000. Você ganhou 22 apostas com odds médias de 2.05, recebendo em média R$102.50 por aposta ganha. Total recebido: 22 × R$102.50 = R$2.255. Lucro líquido: R$255. ROI: (255 / 2.000) × 100 = <strong style={{ color: '#4ade80' }}>+12.75%</strong>. Win rate: 22/40 = 55%.
        </p>
        <InfoCard tone="violet" title="ROI vs. Lucro absoluto">
          <p>
            Um apostador que aposta R$100 por jogo e tem ROI +8% lucra R$8 por R$100 apostados. Outro que aposta R$1.000 por jogo com ROI +4% lucra R$40 por R$100 apostados — mais lucro absoluto, menor ROI. O ROI permite a comparação justa entre perfis com stakes diferentes. Para crescimento da banca, o ROI é a métrica correta; para planejamento financeiro, use tanto o ROI quanto o lucro absoluto projetado.
          </p>
        </InfoCard>
      </section>

      <section>
        <SectionLabel>Benchmarks por perfil</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>ROI esperado por perfil de apostador e mercado</h2>
        <p className="mb-5">
          O ROI não existe em isolamento: ele depende do tipo de mercado apostado, do volume, da disciplina de registro e, principalmente, do edge real de cada apostador. A tabela abaixo cruza perfil com mercados típicos e a faixa de ROI realista para cada categoria:
        </p>
        <ROIBenchmarkTable />
        <p className="mt-5">
          A coluna "mercados típicos" é indicativa, não prescritiva. O que importa não é o mercado em si, mas a capacidade do apostador de identificar valor naquele mercado — o que exige especialização profunda, acesso a informações e modelagem estatística no nível mais alto.
        </p>
      </section>

      <section>
        <SectionLabel>Amostra e significância</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Quando o ROI é estatisticamente confiável?</h2>
        <p className="mb-4">
          A maior armadilha do ROI é confundir variância de curto prazo com habilidade real. Apostas esportivas são eventos binários com alta variância — a diferença entre um apostador lucrativo e um perdedor, em pequenas amostras, é estatisticamente indistinguível. Esta tabela mapeia o número de apostas necessário para detectar diferentes níveis de ROI com confiabilidade:
        </p>
        <SampleReliabilityTable />
        <p className="mt-5 mb-4">
          A implicação prática é clara: um apostador com ROI +20% em 30 apostas não "provou" nada. Pode ser apenas sorte. Um apostador com ROI +7% em 700 apostas, por outro lado, quase certamente tem edge real — a probabilidade de um apostador sem edge gerar esse resultado por acaso é inferior a 5%.
        </p>
        <InfoCard tone="amber" title="A falácia da pequena amostra">
          <p>
            Com 50 apostas, um apostador sem nenhum edge tem aproximadamente 30% de chance de mostrar ROI positivo simplesmente pelo acaso. Isso significa que, numa comunidade de 100 apostadores sem habilidade, 30 teriam ROI positivo em suas primeiras 50 apostas — e alguns desses se convenceriam erroneamente de que encontraram um "sistema". Aguardar volume suficiente antes de tirar conclusões é uma das habilidades mais importantes de um apostador sério.
          </p>
        </InfoCard>
      </section>

      <section>
        <SectionLabel>Win rate e odds</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>A relação entre win rate, odds e ROI</h2>
        <p className="mb-4">
          Win rate alto não equivale a ROI positivo. O que determina a lucratividade é a combinação do win rate com as odds médias apostadas. Um apostador com win rate de 70% apostando em odds de 1.30 tem ROI negativo: 0.70 × 1.30 − 1 = −9%. Outro com win rate de 40% e odds médias de 2.70 tem ROI positivo: 0.40 × 2.70 − 1 = +8%.
        </p>
        <p className="mb-5">
          O conceito central é o <strong style={{ color: 'var(--text-1)' }}>break-even win rate</strong>: o percentual mínimo de acertos para que o ROI seja zero. Qualquer win rate acima desse número com aquela odd gera ROI positivo; abaixo, gera prejuízo.
        </p>
        <BreakEvenOddsTable />
        <p className="mt-5">
          Note que apostas em odds muito baixas (1.40–1.60) exigem um win rate de 63–71% para ser lucrativas. Isso é extremamente difícil de manter, pois as casas de apostas precificam favoritos com margem elevada. Apostadores experientes frequentemente migram para faixas de odd entre 1.90 e 2.50, onde o break-even é mais acessível e a margem das casas tende a ser menor em termos percentuais.
        </p>
      </section>

      <section>
        <SectionLabel>Indicador avançado</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>CLV: o indicador antecedente do ROI</h2>
        <p className="mb-4">
          O ROI é um indicador <em>lagging</em> — ele mede o que já aconteceu. Para apostadores que querem entender se estão no caminho certo <em>antes</em> de acumular centenas de resultados, existe o <strong style={{ color: 'var(--text-1)' }}>CLV (Closing Line Value)</strong>.
        </p>
        <p className="mb-4">
          O CLV mede a diferença entre a odd na qual você apostou e a odd de fechamento do mercado (última odd antes do início do evento). Se você apostou 2.30 num jogo que fechou a 2.00, você capturou CLV positivo de +15% (2.30 / 2.00 − 1). A lógica é que a odd de fechamento reflete as informações mais completas do mercado — apostadores que consistentemente batem a linha de fechamento estão explorando informações ou modelos melhores que os da casa.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <InfoCard tone="cyan" title="CLV positivo consistente">
            <p>
              Apostador consistentemente bate a linha de fechamento em +3% ou mais. Mesmo que os resultados de curto prazo sejam negativos, a expectativa de longo prazo é ROI positivo. O mercado está "confirmando" que as apostas tinham valor no momento da colocação.
            </p>
          </InfoCard>
          <InfoCard tone="red" title="CLV negativo consistente">
            <p>
              Apostador perde consistentemente para a linha de fechamento — aposta a 2.00 em jogos que fecham a 2.20. Mesmo que os resultados de curto prazo sejam positivos (sorte), a expectativa de longo prazo é ROI negativo. Os resultados vão convergir para o negativo com mais volume.
            </p>
          </InfoCard>
        </div>
        <p>
          CLV positivo com ROI negativo de curto prazo indica que você está no caminho certo — continue. CLV negativo com ROI positivo de curto prazo indica que você está apostando com desvantagem e tendo sorte — reavalie a metodologia.
        </p>
      </section>

      <section>
        <SectionLabel>Segmentação</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Como analisar o ROI por segmento</h2>
        <p className="mb-4">
          O ROI global esconde informações valiosas. Um apostador com ROI +2% pode ter ROI +15% no Over/Under da Premier League e ROI −12% em resultados da Serie A — dois mercados com comportamentos completamente distintos. Segmentar o ROI é a forma de identificar onde está o edge real e onde o dinheiro está sendo desperdiçado.
        </p>
        <p className="mb-5">
          As dimensões recomendadas para segmentação são: mercado (resultado, over/under, handicap, ambas marcam), liga/competição, faixa de odd, dia da semana, horário da aposta em relação ao início do jogo, e casa de apostas utilizada.
        </p>
        <ol className="space-y-3 list-none">
          {[
            { n: '1', t: 'Registre antes do resultado', d: 'Anote stake, odd, mercado e casa de apostas antes do jogo começar. Registrar após saber o resultado cria viés de confirmação — você "esquece" as apostas perdidas.' },
            { n: '2', t: 'Separe por mercado e liga', d: 'ROI no Over/Under pode ser completamente diferente do ROI em resultado final. Identificar onde seu edge é maior é o passo mais importante para melhorar o desempenho.' },
            { n: '3', t: 'Use o mesmo critério para todos os períodos', d: 'Compare meses usando a mesma metodologia. Se você mudou o processo de análise, mantenha as amostras separadas para não misturar duas estratégias diferentes.' },
            { n: '4', t: 'Calcule o ROI por casa de apostas', d: 'Algumas casas oferecem melhores odds em determinados mercados. Você pode ter ROI positivo numa casa e negativo em outra pelo mesmo mercado — isso revela qual casa usar para cada tipo de aposta.' },
            { n: '5', t: 'Monitore o ROI pelo tempo de antecedência', d: 'Apostas feitas 48h antes do jogo têm perfil de edge diferente das feitas 30min antes. O timing de entrada no mercado é uma variável que muitos apostadores ignoram.' },
          ].map((d, i) => (
            <li key={i} className="flex gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{d.n}</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-1)' }}>{d.t}</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>{d.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionLabel>Variância e gestão de banca</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>ROI positivo não garante lucro sem gestão de banca</h2>
        <p className="mb-4">
          Um apostador com ROI +8% pode ter sequências de 15–20 apostas perdidas consecutivas. Isso não é anomalia — é estatística normal. A questão é ter banca suficiente para atravessar esses períodos sem falir antes que o edge se manifeste no longo prazo.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {[
            { stake: '2% por aposta', drawdown: '~30% em sequência ruim', risco: 'Baixo', cor: '#4ade80', obs: 'Recomendado para apostadores em desenvolvimento' },
            { stake: '5% por aposta', drawdown: '~60% em sequência ruim', risco: 'Médio-alto', cor: '#fbbf24', obs: 'Requer edge bem documentado em 300+ apostas' },
            { stake: '10% por aposta', drawdown: '~90% em sequência ruim', risco: 'Ruína provável', cor: '#f87171', obs: 'Praticamente garante falência em algum momento' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${c.cor}22` }}>
              <p className="font-semibold text-sm mb-1" style={{ color: c.cor }}>{c.stake}</p>
              <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-1)' }}>Drawdown: {c.drawdown}</p>
              <p className="text-xs mb-1" style={{ color: c.cor }}>Risco: {c.risco}</p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{c.obs}</p>
            </div>
          ))}
        </div>
        <p>
          Use a <Link to="/calculadoras/gestao-banca" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Gestão de Banca</Link> para determinar o stake ideal baseado no seu ROI e Kelly Criterion. Use o <Link to="/calculadoras/simulador-lucro" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Simulador de Lucro</Link> para visualizar a distribuição de resultados possíveis com seu ROI atual.
        </p>
      </section>

      <section>
        <SectionLabel>Erros comuns</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Erros que distorcem o ROI calculado</h2>
        <div className="space-y-3">
          {[
            { t: 'Registrar seletivamente', d: 'Incluir apenas apostas ganhas ou "lembrar" de registrar perdedoras com menos frequência é o viés mais comum. Um ROI calculado sobre amostra incompleta é inútil para análise real.', tone: 'red' },
            { t: 'Incluir bônus como ROI real', d: 'Bônus de boas-vindas, freebets e promoções inflam temporariamente o ROI. Se você inclui R$500 em bônus numa amostra de R$3.000 apostados, o ROI sobe artificialmente 16 pontos percentuais.', tone: 'red' },
            { t: 'Comparar ROIs de períodos diferentes', d: 'ROI de um mês (40 apostas) comparado com o de seis meses (300 apostas) mistura amostras de confiabilidades completamente distintas. Use sempre o número de apostas como referência, não o tempo.', tone: 'amber' },
            { t: 'Ignorar a margem das casas no benchmark', d: 'Diferentes casas têm margens diferentes (2%–8%). Um ROI de −2% na Pinnacle pode ser melhor do que ROI de +1% em casas com margem de 8%, porque na primeira você está perdendo menos para a casa.', tone: 'amber' },
            { t: 'Mudar de estratégia com base em 30 apostas', d: 'Abandonar ou adotar uma estratégia com base em ROI de curto prazo é uma das formas mais eficientes de destruir resultados. A variância em 30 apostas é enorme — qualquer estratégia com edge real parece "não funcionar" em algum momento.', tone: 'neutral' },
          ].map((e, i) => (
            <InfoCard key={i} tone={e.tone} title={e.t}>
              <p>{e.d}</p>
            </InfoCard>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Ferramentas relacionadas</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)' }}>Calculadoras para complementar sua análise de ROI</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: '/calculadoras/simulador-lucro', label: 'Simulador de Lucro' },
            { to: '/calculadoras/gestao-banca',    label: 'Gestão de Banca' },
            { to: '/calculadoras/odds',             label: 'Calculadora de Odds' },
            { to: '/calculadoras/aposta-simples',   label: 'Aposta Simples' },
            { to: '/calculadoras/multipla-parlay',  label: 'Múltipla / Parlay' },
            { to: '/calculadoras/martingale',       label: 'Martingale' },
            { to: '/calculadoras/conversor-odds',   label: 'Conversor de Odds' },
            { to: '/calculadoras/arbitragem',       label: 'Arbitragem' },
          ].map((l, i) => (
            <Link
              key={i}
              to={l.to}
              className="flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-medium transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,211,238,0.3)'; e.currentTarget.style.color = '#22d3ee'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)'; }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Jogo responsável</SectionLabel>
        <InfoCard tone="neutral">
          <p className="text-xs leading-relaxed mb-3">
            <strong style={{ color: 'var(--text-1)' }}>Jogo responsável:</strong> ROI positivo não é garantido nem para apostadores experientes. Apostas esportivas envolvem risco financeiro real. Defina limites de perda antes de apostar, nunca aposte mais do que pode perder, e trate as apostas como entretenimento. Se sentir que as apostas estão afetando negativamente sua vida financeira, emocional ou social, busque ajuda.
          </p>
          <Link
            to="/jogo-responsavel"
            className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: '#fbbf24' }}
          >
            Leia nosso guia de jogo responsável
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </InfoCard>
      </section>

    </article>
  );
}

/* ─── Main component ─── */
export default function ROI() {
  const [apostas, setApostas] = useState([{ stake: '', retorno: '', label: '' }]);

  const adicionar = () => setApostas([...apostas, { stake: '', retorno: '', label: '' }]);
  const atualizar = (i, campo, v) => { const a = [...apostas]; a[i][campo] = v; setApostas(a); };
  const remover = (i) => apostas.length > 1 && setApostas(apostas.filter((_, idx) => idx !== i));

  const validas = apostas.filter(a => parseFloat(a.stake) > 0);
  const totalStake = validas.reduce((acc, a) => acc + parseFloat(a.stake), 0);
  const totalRetorno = validas.reduce((acc, a) => acc + (parseFloat(a.retorno) || 0), 0);
  const lucroLiquido = totalRetorno - totalStake;
  const roi = totalStake > 0 ? (lucroLiquido / totalStake) * 100 : 0;
  const ganhasReais = validas.filter(a => parseFloat(a.retorno) > 0).length;
  const winRate = validas.length > 0 ? (ganhasReais / validas.length) * 100 : 0;
  const oddMedia = ganhasReais > 0 ? validas.filter(a => parseFloat(a.retorno) > 0).reduce((acc, a) => acc + parseFloat(a.retorno) / parseFloat(a.stake), 0) / ganhasReais : 0;
  const valid = totalStake > 0;

  const nivelROI = roi >= 12 ? { label: 'Profissional', cor: '#22d3ee' }
    : roi >= 5 ? { label: 'Consistente', cor: '#4ade80' }
    : roi >= 0 ? { label: 'Equilibrado', cor: '#fbbf24' }
    : { label: 'Negativo', cor: '#f87171' };

  const mensagemAmostra = validas.length < 50
    ? `Amostra muito pequena (${validas.length} apostas). Alta variância — sem conclusões confiáveis.`
    : validas.length < 200
    ? `Amostra pequena (${validas.length} apostas). Variância ainda elevada; aguarde 200+ apostas.`
    : validas.length < 500
    ? `Amostra razoável (${validas.length} apostas). ROI de ${roi.toFixed(1)}% começa a ser significativo.`
    : `Amostra sólida (${validas.length} apostas). ROI de ${roi.toFixed(1)}% é estatisticamente relevante.`;

  return (
    <CalcLayout
      title="Calculadora de ROI em Apostas"
      description="Calcule o ROI (Retorno sobre Investimento) das suas apostas esportivas, acompanhe win rate e meça sua performance real como apostador."
      slug="roi"
      faqs={faqs}
      schema={schema}
      explanation={<ROIExplanation />}
    >
      <div className="space-y-6">

        {/* Lista de apostas */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0" id="apostas-label">Apostas ({apostas.length} registradas)</label>
            <button
              onClick={adicionar}
              aria-label="Adicionar nova aposta"
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: 'var(--cyan)' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar aposta
            </button>
          </div>
          <div className="space-y-2.5" role="list" aria-labelledby="apostas-label">
            {apostas.map((a, i) => {
              const s = parseFloat(a.stake);
              const r = parseFloat(a.retorno);
              const lucro = s > 0 ? (r || 0) - s : null;
              const ganhou = lucro !== null && lucro >= 0;
              return (
                <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }} role="listitem">
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
                    <div>
                      <label className="label text-xs mb-1.5" htmlFor={`stake-${i}`}>Stake #{i + 1} (R$)</label>
                      <input
                        id={`stake-${i}`}
                        type="number"
                        inputMode="decimal"
                        className="input-field"
                        placeholder="ex: 100"
                        min="0"
                        value={a.stake}
                        onChange={e => atualizar(i, 'stake', e.target.value)}
                        aria-label={`Stake da aposta ${i + 1} em reais`}
                      />
                    </div>
                    <div>
                      <label className="label text-xs mb-1.5" htmlFor={`retorno-${i}`}>Retorno (R$, 0 se perdeu)</label>
                      <input
                        id={`retorno-${i}`}
                        type="number"
                        inputMode="decimal"
                        className="input-field"
                        placeholder="0"
                        min="0"
                        value={a.retorno}
                        onChange={e => atualizar(i, 'retorno', e.target.value)}
                        aria-label={`Retorno da aposta ${i + 1} em reais`}
                      />
                    </div>
                    {apostas.length > 1 && (
                      <button
                        onClick={() => remover(i)}
                        aria-label={`Remover aposta ${i + 1}`}
                        className="p-2.5 rounded-xl transition-colors mb-px"
                        style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {lucro !== null && a.retorno !== '' && (
                    <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }} aria-live="polite">
                      <span style={{ color: ganhou ? '#4ade80' : '#f87171' }} aria-hidden="true">{ganhou ? '●' : '●'}</span>{' '}
                      {ganhou ? 'Ganhou' : 'Perdeu'}{' '}
                      <strong style={{ color: ganhou ? '#4ade80' : '#f87171' }}>
                        {lucro >= 0 ? '+' : ''}R${lucro.toFixed(2)}
                      </strong>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Resultados */}
        {valid ? (
          <div className="space-y-3" aria-live="polite" aria-label="Resultados do cálculo de ROI">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="result-box">
                <p className="result-value text-lg">R${totalStake.toFixed(2)}</p>
                <p className="result-label">Total apostado</p>
              </div>
              <div className="result-box">
                <p className="result-value text-lg">R${totalRetorno.toFixed(2)}</p>
                <p className="result-label">Total retornado</p>
              </div>
              <div className="result-box">
                <p className="result-value text-lg" style={{ color: lucroLiquido >= 0 ? '#4ade80' : '#f87171' }}>
                  {lucroLiquido >= 0 ? '+' : ''}R${lucroLiquido.toFixed(2)}
                </p>
                <p className="result-label">Lucro líquido</p>
              </div>
              <div className="result-box">
                <p className="result-value text-lg" style={{ color: roi >= 0 ? '#818cf8' : '#f87171' }}>
                  {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
                </p>
                <p className="result-label">ROI</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value">{winRate.toFixed(1)}%</p>
                <p className="result-label">Win rate ({ganhasReais}/{validas.length})</p>
              </div>
              {oddMedia > 0 && (
                <div className="result-box">
                  <p className="result-value">{oddMedia.toFixed(2)}</p>
                  <p className="result-label">Odd média (ganhas)</p>
                </div>
              )}
              <div className="result-box">
                <p className="result-value" style={{ color: nivelROI.cor }}>{nivelROI.label}</p>
                <p className="result-label">Nível estimado</p>
              </div>
            </div>

            <div
              className="rounded-xl px-4 py-3 text-xs leading-relaxed"
              style={{
                background: roi >= 0 ? 'rgba(74,222,128,0.04)' : 'rgba(248,113,113,0.04)',
                border: `1px solid ${roi >= 0 ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)'}`,
                color: 'var(--text-3)',
              }}
              aria-live="polite"
            >
              {mensagemAmostra}
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
            aria-label="Adicione apostas para calcular o ROI"
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Adicione apostas com stake para calcular o ROI</p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
