import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';
import { getSeoFaqsForPage, toLegacyFaq } from '../../data/seoFaqs.jsx';

const PRESETS_BANCA = [100, 200, 500, 1000, 2000, 5000];

const faqs = [
  {
    q: 'O que é arbitragem em apostas esportivas?',
    a: 'Arbitragem esportiva — também chamada de sure bet, arb ou aposta certa — é uma estratégia que aproveita divergências entre as odds de diferentes casas de apostas para cobrir todos os resultados possíveis de um evento e garantir lucro independente do desfecho. Ela é possível porque cada casa usa modelos preditivos distintos, o que eventualmente cria momentos em que o mercado combinado é ineficiente. Esses momentos geram margens abaixo de 100%, sinalizando oportunidade de lucro sem risco matemático.',
  },
  {
    q: 'Como calcular se existe arbitragem em um evento?',
    a: 'O teste é simples: some os inversos (probabilidades implícitas) das odds de cada resultado. Se o total for menor que 1 (ou 100%), existe arbitragem. Exemplo: odds 2.15 e 1.85 em um jogo de dois resultados geram 1/2.15 + 1/1.85 = 0.465 + 0.541 = 1.006. Como 1.006 > 1, não há arb. Se fossem 2.20 e 1.95: 0.455 + 0.513 = 0.968. Como 0.968 < 1, há arbitragem de 3.3%. Nossa calculadora faz esse cálculo automaticamente ao inserir as odds.',
  },
  {
    q: 'Quanto posso ganhar com arbitragem?',
    a: 'O lucro típico por oportunidade varia entre 0,5% e 5% da banca aplicada. Oportunidades acima de 3% são raras e geralmente indicam erro de precificação (erro de odd), evento com alta incerteza ou mercado específico de nicho. A maioria das arbs confiáveis fica entre 1% e 2,5%. Com uma banca de R$2.000 e 1,5% de ROI médio por oportunidade, um arbitragista que executa duas operações por dia pode gerar R$60 diários — mas isso exige disciplina, velocidade e boas condições de conta.',
  },
  {
    q: 'A arbitragem em apostas é legal no Brasil?',
    a: 'A pergunta envolve interpretação legal, termos contratuais e regras regulatórias que podem mudar. Arbitragem é uma estratégia matemática de comparação de odds, mas isso não significa que toda execução prática seja aceita pelas casas ou esteja livre de restrições. Plataformas podem limitar contas, recusar apostas ou aplicar regras próprias. Este conteúdo é educativo e não é aconselhamento jurídico; verifique a legislação vigente, os termos das casas e orientação profissional se necessário.',
  },
  {
    q: 'Qual a diferença entre arbitragem e value bet?',
    a: 'Arbitragem cobre todos os resultados de um evento em casas diferentes, garantindo lucro independente do desfecho — o lucro é imediato e certo. Value bet é uma aposta em uma única odd que você acredita estar acima do valor justo: a vantagem existe no longo prazo, mas no curto prazo há variância alta. Arbitragem tem ROI menor e mais previsível; value bet tem ROI potencial maior, mas exige habilidade analítica e tolerância a oscilações. As estratégias não são excludentes.',
  },
  {
    q: 'Como distribuir a banca em uma arbitragem de 3 resultados?',
    a: 'A fórmula é: Stake de cada resultado = Banca total ÷ (Odd do resultado × Margem total). Exemplo com odds 2.15, 3.40 e 4.10 e banca de R$1.000: margem = 1/2.15 + 1/3.40 + 1/4.10 = 0.997. Stake resultado 1: 1000 ÷ (2.15 × 0.997) = R$466. Stake resultado 2: 1000 ÷ (3.40 × 0.997) = R$295. Stake resultado 3: 1000 ÷ (4.10 × 0.997) = R$244. A calculadora faz isso automaticamente para qualquer número de resultados.',
  },
  {
    q: 'Onde encontrar oportunidades de arbitragem?',
    a: 'As melhores oportunidades surgem em eventos com odds equilibradas entre casas, especialmente tênis ATP/WTA, basquete NBA, futebol de ligas menores e e-sports. Ferramentas como OddsPortal, RebelBetting, BetBurger e OddsJam monitoram divergências entre dezenas de casas em tempo real. Também é possível fazer varredura manual comparando odds de 3 a 5 casas para o mesmo evento. No Brasil, divergências podem ocorrer entre diferentes plataformas; compare sempre os termos, limites e disponibilidade diretamente em cada casa.',
  },
  {
    q: 'Qual é o maior risco da arbitragem?',
    a: 'O maior risco operacional é ter uma odd cancelada ou significativamente alterada depois de já ter apostado no outro lado do evento. Isso deixa você com uma posição descoberta — uma aposta sem cobertura. Outros riscos incluem: erro de stake (digitar valor errado), limitação de conta pelas casas, evento cancelado com políticas de reembolso diferentes por casa, e falta de fundos em uma das contas no momento de executar a operação. Todos esses riscos podem ser mitigados com planejamento e execução rápida.',
  },
  {
    q: 'O que é uma arbitragem de 2 vias e de 3 vias?',
    a: 'Arbitragem de 2 vias (two-way arb) cobre dois resultados: comum em tênis, basquete americano (sem empate) e mercados especiais como Over/Under. Arbitragem de 3 vias (three-way arb) cobre três resultados: vitória da equipe A, empate e vitória da equipe B, típica do futebol. A arb de 3 vias exige capital maior para distribuir entre três pontas e é mais difícil de executar rapidamente, mas costuma oferecer mais oportunidades pela maior complexidade de precificação.',
  },
  {
    q: 'Por que as casas de apostas limitam arbitragistas?',
    a: 'Casas de apostas operam com margem embutida nas odds (overround) para garantir lucro independente do resultado. Apostadores que exploram sistematicamente as divergências entre casas removem essa margem do modelo de negócio da casa. Por isso, casas tradicionais (chamadas de "soft books") identificam padrões de comportamento de arbitragistas — apostas em mercados divergentes, valores próximos do limite, horários específicos — e reduzem os limites de apostas ou encerram a conta.',
  },
  {
    q: 'Como minimizar o risco de limitação de conta?',
    a: 'As principais práticas são: variar os valores de stake (evitar valores redondos e exatos repetidamente), apostar ocasionalmente em mercados sem relação com arbitragem, não apostar exclusivamente nas odds mais altas disponíveis, distribuir o volume entre o maior número possível de casas, e usar também plataformas com regras claras para volume elevado. Verifique sempre políticas, limites e termos antes de apostar.',
  },
  {
    q: 'O que é margem (overround) em apostas?',
    a: 'Margem ou overround é o percentual que uma casa de apostas adiciona ao mercado para garantir lucro independente do resultado. Em um evento de moeda justa (50%/50%), as odds justas seriam 2.00 para cada lado. Se a casa oferecer 1.91 para cada lado, a soma das probabilidades implícitas é 52,4% + 52,4% = 104,8% — uma margem de 4,8% sobre o mercado. Em arbitragem, você busca que a soma de probabilidades de diferentes casas fique abaixo de 100%, eliminando essa margem.',
  },
  ...getSeoFaqsForPage('arbitragem').map(toLegacyFaq),
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Arbitragem — CalculaBet',
      url: 'https://calculabet.site/calculadoras/arbitragem',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description:
        'Calculadora gratuita de arbitragem esportiva (sure bet): identifique se há oportunidade, calcule a distribuição de stakes e veja o lucro garantido independente do resultado. Educativa e sem cadastro.',
      featureList: [
        'Detecção automática de arbitragem (sure bet)',
        'Cálculo de margem total',
        'Distribuição de stakes por resultado',
        'Lucro garantido e ROI percentual',
        'Suporte a 2, 3 ou mais resultados',
        'Retorno por resultado calculado individualmente',
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

/* ─── Shared UI components ─────────────────────────────── */

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

function MarginTable() {
  const rows = [
    { range: 'Acima de 100%', label: 'Sem arbitragem', desc: 'Casa(s) com margem normal. Nenhuma oportunidade.', color: '#f87171' },
    { range: '99,0% – 100%', label: 'Margem apertada', desc: 'Mercado quase eficiente. Lucro < 1%, difícil de ser vantajoso.', color: '#fbbf24' },
    { range: '97,5% – 99,0%', label: 'Arbitragem válida', desc: 'ROI de 1% a 2,5%. Faixa mais comum de arbs confiáveis.', color: '#4ade80' },
    { range: '95,0% – 97,5%', label: 'Boa oportunidade', desc: 'ROI de 2,5% a 5%. Raro, mas acontece em eventos voláteis.', color: '#4ade80' },
    { range: 'Abaixo de 95%', label: 'Verificar com cuidado', desc: 'ROI acima de 5% quase sempre indica erro de odd ou evento suspeito.', color: '#fbbf24' },
  ];

  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Margem total', 'Classificação', 'O que significa'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <td className="px-4 py-3 font-mono font-semibold" style={{ color: r.color }}>{r.range}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{r.label}</td>
              <td className="px-4 py-3" style={{ color: 'var(--text-3)' }}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main explanation component (SEO content) ─────────── */

function ArbExplanation() {
  const risks = [
    { title: 'Odd cancelada ou alterada', desc: 'Uma casa pode remover ou alterar a odd após você já ter apostado no outro lado, deixando você com posição descoberta em um único resultado.' },
    { title: 'Erro de stake na execução', desc: 'Digitar o valor errado em uma das pontas desequilibra a cobertura. Um stake R$50 maior ou menor já pode transformar lucro em prejuízo dependendo da margem.' },
    { title: 'Limitação de conta', desc: 'Casas tradicionais ("soft books") monitoram padrões de arbitragistas e frequentemente reduzem limites ou encerram contas após identificação do perfil.' },
    { title: 'Evento cancelado', desc: 'Se o evento for cancelado, as políticas de reembolso podem diferir entre casas: uma reembolsa e outra não, deixando uma ponta exposta.' },
    { title: 'Diferença de fuso horário', desc: 'Em transmissões ao vivo com delay, as odds podem ser movidas antes de você conseguir fechar o outro lado, especialmente em mercados in-play.' },
    { title: 'Fundos insuficientes', desc: 'Precisar de capital simultâneo em múltiplas contas pode ser difícil de gerenciar. Sem fundos disponíveis, a oportunidade some antes de você poder executar.' },
  ];


  return (
    <article className="space-y-12 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      {/* ── Intro ── */}
      <section className="space-y-5">
        <SectionLabel>Guia completo da ferramenta</SectionLabel>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
          Calculadora de arbitragem (sure bet): identifique e calcule lucro garantido
        </h2>
        <p>
          A <strong style={{ color: 'var(--text-1)' }}>calculadora de arbitragem esportiva</strong> é uma ferramenta educativa que analisa as odds de diferentes casas de apostas para o mesmo evento e determina automaticamente se existe uma oportunidade de sure bet — e, caso exista, como distribuir a banca para garantir retorno positivo independente do resultado final.
        </p>
        <p>
          A arbitragem funciona porque diferentes casas de apostas têm analistas, algoritmos e estratégias de precificação distintos. Essas diferenças criam momentos em que o mercado combinado é matematicamente ineficiente: a soma das probabilidades implícitas das odds fica abaixo de 100%, criando uma "janela" que pode ser explorada. Esta calculadora detecta essa janela em segundos e mostra exatamente quanto apostar em cada resultado.
        </p>
        <p>
          Use a ferramenta para verificar uma oportunidade que encontrou manualmente, simular cenários antes de executar, entender a matemática por trás da estratégia ou aprender como funciona a distribuição de stakes em arbitragens de 2, 3 ou mais resultados.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoCard title="O que calcula" tone="cyan">
            <p>Margem total das odds, detecção automática de sure bet, distribuição de stakes, lucro garantido em R$ e ROI percentual por operação.</p>
          </InfoCard>
          <InfoCard title="Quando usar" tone="violet">
            <p>Antes de executar uma arb encontrada manualmente ou em scanner, para verificar a margem, confirmar os stakes e entender o retorno real de cada ponta.</p>
          </InfoCard>
          <InfoCard title="Para quem é" tone="green">
            <p>Apostadores que querem explorar ineficiências de mercado de forma educada, com cálculo preciso e visibilidade completa do risco e retorno antes de apostar.</p>
          </InfoCard>
        </div>
      </section>

      {/* ── Math ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Como identificar e calcular uma arbitragem</h2>
        <p>
          A matemática da arbitragem é direta. O ponto central é a <strong style={{ color: 'var(--text-1)' }}>margem total</strong>, calculada somando as probabilidades implícitas de todos os resultados. Probabilidade implícita de uma odd é simplesmente o inverso da odd decimal: 1 ÷ odd.
        </p>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(15,23,42,0.55)', border: '1px solid var(--border)' }}>
          <div className="space-y-3 font-mono text-xs md:text-sm" style={{ color: 'var(--text-1)' }}>
            <p><span style={{ color: '#22d3ee' }}>Margem</span>          = 1÷Odd₁ + 1÷Odd₂ + … + 1÷Oddₙ</p>
            <p><span style={{ color: '#4ade80' }}>Arb existe se</span>   Margem {'<'} 1 (ou {'<'} 100%)</p>
            <p><span style={{ color: '#4ade80' }}>Lucro garantido</span> = Banca × (1÷Margem − 1)</p>
            <p><span style={{ color: '#818cf8' }}>Stake resultado N</span>= Banca ÷ (OddN × Margem)</p>
            <p><span style={{ color: '#fbbf24' }}>ROI</span>             = (Lucro ÷ Banca) × 100</p>
          </div>
        </div>

        <InfoCard title="Exemplo resolvido — jogo de futebol com 3 resultados" tone="violet">
          <p>Evento: Time A vs Time B. Odds de diferentes casas: Time A ganha (Casa A: <strong style={{ color: 'var(--text-1)' }}>2.15</strong>), Empate (Casa B: <strong style={{ color: 'var(--text-1)' }}>3.40</strong>), Time B ganha (Casa C: <strong style={{ color: 'var(--text-1)' }}>4.10</strong>). Banca: <strong style={{ color: 'var(--text-1)' }}>R$1.000</strong>.</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Margem:</strong> 1/2.15 + 1/3.40 + 1/4.10 = 0.4651 + 0.2941 + 0.2439 = <strong style={{ color: '#4ade80' }}>0.9971 (99,7%)</strong> ✓</p>
          <p><strong style={{ color: 'var(--text-1)' }}>Lucro garantido:</strong> R$1.000 × (1/0.9971 − 1) = <strong style={{ color: '#4ade80' }}>R$2,91</strong></p>
          <p><strong style={{ color: 'var(--text-1)' }}>Stakes:</strong> R$466 (Time A) · R$294 (Empate) · R$244 (Time B) — qualquer que seja o resultado, o retorno líquido é R$2,91.</p>
        </InfoCard>

        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Resultado', 'Odd (casa)', 'Prob. implícita', 'Stake (R$1.000)', 'Retorno se ganhar'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { res: 'Time A ganha', odd: '2.15 — Casa A',   pct: '46,5%', stake: 'R$466', ret: 'R$1.002,90' },
                { res: 'Empate',       odd: '3.40 — Casa B',   pct: '29,4%', stake: 'R$294', ret: 'R$1.002,90' },
                { res: 'Time B ganha', odd: '4.10 — Casa C', pct: '24,4%', stake: 'R$244', ret: 'R$1.002,90' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{row.res}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{row.odd}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#22d3ee' }}>{row.pct}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#4ade80' }}>{row.stake}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#818cf8' }}>{row.ret}</td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(74,222,128,0.04)', borderTop: '1px solid rgba(74,222,128,0.12)' }}>
                <td className="px-4 py-3 font-bold" style={{ color: 'var(--text-1)' }}>Total apostado</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-3)' }}>—</td>
                <td className="px-4 py-3 font-bold" style={{ color: '#4ade80' }}>99,7% ✓</td>
                <td className="px-4 py-3 font-bold" style={{ color: '#4ade80' }}>R$1.004</td>
                <td className="px-4 py-3 font-bold" style={{ color: '#4ade80' }}>Lucro: R$2,91</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
          Neste exemplo, independente do resultado do jogo, o retorno líquido é sempre R$2,91 (ROI ≈ 0,29%). Um arb pequeno, mas matematicamente garantido.
        </p>
      </section>

      {/* ── Margin table ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Interpretando a margem: o que cada faixa significa</h2>
        <p>
          Nem toda margem abaixo de 100% é igualmente interessante. A tabela abaixo ajuda a interpretar a margem total calculada pela ferramenta e decidir se a oportunidade vale ser executada:
        </p>
        <MarginTable />
        <InfoCard title="Por que arbs acima de 5% são suspeitas?" tone="amber">
          <p>Oportunidades com ROI muito alto geralmente indicam uma das três situações: (1) erro de precificação de uma casa, que será corrigido em minutos; (2) odd de evento suspeito ou manipulado; (3) erro no registro da odd (ex: placar equivocado, partida errada). Antes de executar arbs acima de 3% a 4%, verifique a qualidade da odd nas duas fontes e confirme o evento.</p>
        </InfoCard>
      </section>

      {/* ── Types ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Tipos de arbitragem: 2 vias, 3 vias e cross-market</h2>
        <p>
          O tipo de arbitragem varia conforme o número de resultados possíveis no evento escolhido:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoCard title="Arbitragem de 2 vias" tone="cyan">
            <p>Cobre dois resultados: típica em tênis, basquete americano (sem empate) e mercados binários como Over/Under. Mais fácil de executar rapidamente por ter apenas duas pontas.</p>
          </InfoCard>
          <InfoCard title="Arbitragem de 3 vias" tone="violet">
            <p>Cobre três resultados: vitória A, empate e vitória B. Comum no futebol. Exige capital maior por ter três pontas a cobrir, mas oferece mais oportunidades pela complexidade de precificação.</p>
          </InfoCard>
          <InfoCard title="Cross-market arb" tone="green">
            <p>Combina mercados diferentes do mesmo evento (ex: resultado 1×2 em uma casa e handicap em outra) para criar a cobertura. Mais complexa e exige conhecimento profundo dos mercados envolvidos.</p>
          </InfoCard>
        </div>
        <p>
          A calculadora desta página suporta arbitragens com 2 ou mais resultados. Basta adicionar quantos resultados precisar e inserir a melhor odd disponível em qualquer casa para cada um.
        </p>
      </section>

      {/* ── Arb vs Value ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Arbitragem vs. value bet: qual abordagem escolher</h2>
        <p>
          As duas estratégias exploram ineficiências de mercado, mas com lógicas diferentes. Entender a distinção é fundamental para escolher a abordagem certa para seu perfil:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-5" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}>
            <p className="text-xs font-semibold mb-4" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Arbitragem (Sure Bet)</p>
            <ul className="space-y-2.5">
              {[
                'Lucro garantido independente do resultado',
                'ROI por operação: 0,5% a 5% (mais previsível)',
                'Requer contas simultâneas em múltiplas casas',
                'Execução rápida é essencial (janelas de minutos)',
                'Maior risco de limitação de conta',
                'Capital maior para lucro absoluto significativo',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: '#22d3ee' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-5" style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.15)' }}>
            <p className="text-xs font-semibold mb-4" style={{ color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Value Bet</p>
            <ul className="space-y-2.5">
              {[
                'Lucro esperado positivo a longo prazo',
                'ROI potencial maior (5–15%+ para bons apostadores)',
                'Requer apenas uma conta, uma seleção por vez',
                'Menor risco de limitação de conta',
                'Alta variância no curto prazo',
                'Exige habilidade de precificação e análise',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: '#4ade80' }}>→</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p>
          Para identificar value bets com base em probabilidade estimada, use a{' '}
          <Link to="/calculadoras/odds" className="font-medium" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link>.
          Para proteger uma posição aberta quando parte de uma arbitragem já foi executada, veja a{' '}
          <Link to="/calculadoras/hedge" className="font-medium" style={{ color: '#22d3ee' }}>Calculadora de Hedge</Link>.
        </p>
      </section>

      {/* ── Step by step ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Passo a passo para executar uma arbitragem</h2>
        <p>
          A execução correta é tão importante quanto identificar a oportunidade. Uma arb mal executada pode transformar lucro em prejuízo. Siga este processo:
        </p>
        <ol className="space-y-3 list-none">
          {[
            { n: '1', t: 'Identifique o evento e as odds', d: 'Busque eventos com odds equilibradas entre casas. Tênis, basquete e futebol de ligas internacionais são boas fontes. Ferramentas como OddsPortal ou RebelBetting agilizam a busca.' },
            { n: '2', t: 'Verifique a margem nesta calculadora', d: 'Insira as odds e confirme que a margem está abaixo de 100%. Prefira arbs com margem abaixo de 98,5% para ter margem de segurança caso uma odd mude levemente durante a execução.' },
            { n: '3', t: 'Defina a banca e veja a distribuição', d: 'Com a banca definida, a calculadora mostra exatamente quanto apostar em cada resultado. Anote os valores antes de começar.' },
            { n: '4', t: 'Confirme saldos disponíveis em todas as contas', d: 'Antes de executar qualquer aposta, confirme que você tem o saldo necessário em cada casa. Falta de fundos durante a execução é um dos erros mais comuns.' },
            { n: '5', t: 'Execute o lado menor primeiro', d: 'Comece pelo resultado com menor liquidez (geralmente a odd mais alta). Isso minimiza exposição caso a odd do outro lado mude antes de você concluir a operação.' },
            { n: '6', t: 'Registre e monitore', d: 'Após fechar todas as pontas, registre a operação com stakes reais, odds confirmadas, casas e lucro esperado. O monitoramento do ROI acumulado é essencial para avaliar a estratégia a longo prazo.' },
          ].map(d => (
            <li key={d.n} className="flex gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{d.n}</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-1)' }}>{d.t}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{d.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Risks ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Riscos práticos que todo arbitragista deve conhecer</h2>
        <p>
          Apesar do lucro matematicamente garantido quando a margem está abaixo de 100%, a arbitragem tem riscos operacionais reais que podem transformar uma oportunidade em prejuízo. Conhecê-los é o primeiro passo para mitigá-los:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {risks.map((r, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.1)' }}>
              <p className="font-semibold text-sm mb-1.5" style={{ color: '#f87171' }}>{r.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Account protection ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Como minimizar o risco de limitação de conta</h2>
        <p>
          A limitação de conta por casas de apostas é o maior obstáculo operacional para arbitragistas de longo prazo. Não existe fórmula infalível, mas as práticas abaixo reduzem significativamente a velocidade de identificação:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Práticas que ajudam" tone="green">
            <ul className="space-y-2 list-disc pl-4">
              <li>Varie os valores de stake: evite padrões de apostas redondas e exatas repetidamente.</li>
              <li>Faça apostas ocasionais fora de contexto de arbitragem para diversificar o histórico da conta.</li>
              <li>Distribua o volume entre o maior número possível de casas (mínimo 4 a 6).</li>
              <li>Use plataformas com regras claras para volume elevado e verifique políticas, limites e termos antes de apostar.</li>
              <li>Registre cada operação para identificar em quais casas o perfil de conta ainda está ativo.</li>
            </ul>
          </InfoCard>
          <InfoCard title="O que acelera a limitação" tone="red">
            <ul className="space-y-2 list-disc pl-4">
              <li>Apostar sempre nas odds mais altas disponíveis no mercado (padrão claro de arbitragista).</li>
              <li>Apostas próximas do limite máximo da casa de forma recorrente.</li>
              <li>Alto volume em um único esporte ou tipo de mercado.</li>
              <li>Apostas exclusivamente em momentos de divergência de odds.</li>
              <li>Saldo sempre zerado (depositar, apostar, sacar em ciclo).</li>
            </ul>
          </InfoCard>
        </div>
      </section>

      {/* ── Responsible gaming ── */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Jogo responsável e avisos importantes</h2>
        <InfoCard title="+18 · Conteúdo educativo · Jogo responsável" tone="amber">
          <p>
            Este conteúdo é destinado exclusivamente a maiores de 18 anos. As simulações desta calculadora são educativas e não constituem recomendação financeira, garantia de lucro ou aconselhamento de investimento. Apostas esportivas envolvem risco financeiro real, incluindo perda total do capital apostado.
          </p>
          <p>
            Mesmo na arbitragem — que tem lucro matemático em condições ideais — existem riscos operacionais descritos nesta página. Se apostas esportivas estiverem afetando sua vida financeira ou pessoal, procure ajuda. Acesse nossa página de{' '}
            <Link to="/jogo-responsavel" style={{ color: '#fbbf24', fontWeight: 600 }}>jogo responsável</Link>
            {' '}para recursos e orientações disponíveis no Brasil.
          </p>
        </InfoCard>
      </section>

      {/* ── CTAs ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Ferramentas complementares</h2>
        <p>
          Complete sua análise com as calculadoras relacionadas à estratégia de arbitragem:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { to: '/calculadoras/hedge', label: 'Calculadora de Hedge', desc: 'Proteja uma posição aberta apostando no resultado oposto para reduzir exposição.' },
            { to: '/calculadoras/dutching', label: 'Dutching', desc: 'Distribua o stake entre múltiplos resultados para garantir o mesmo lucro em qualquer desfecho.' },
            { to: '/calculadoras/odds', label: 'Calculadora de Odds', desc: 'Converta odds entre formatos e calcule valor esperado para identificar value bets.' },
            { to: '/calculadoras/gestao-banca', label: 'Gestão de Banca', desc: 'Planeje o stake ideal por operação usando Kelly, flat ou percentual fixo da banca.' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-2xl p-4 block transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
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

/* ─── Page component ───────────────────────────────────── */

export default function Arbitragem() {
  const [odds, setOdds] = useState(['', '']);
  const [banca, setBanca] = useState('');
  const [labels, setLabels] = useState(['Resultado 1', 'Resultado 2']);

  const atualizar = (i, v) => { const o = [...odds]; o[i] = v; setOdds(o); };
  const atualizarLabel = (i, v) => { const l = [...labels]; l[i] = v; setLabels(l); };
  const adicionar = () => { setOdds([...odds, '']); setLabels([...labels, `Resultado ${odds.length + 1}`]); };
  const remover = i => {
    if (odds.length <= 2) return;
    setOdds(odds.filter((_, idx) => idx !== i));
    setLabels(labels.filter((_, idx) => idx !== i));
  };

  const oddsN = odds.map(o => parseFloat(o));
  const bancaN = parseFloat(banca);
  const todasPreenchidas = oddsN.every(o => o > 1) && oddsN.length >= 2;
  const valid = todasPreenchidas && bancaN > 0;

  const margem = todasPreenchidas ? oddsN.reduce((acc, o) => acc + 1 / o, 0) : null;
  const isArb = valid && margem !== null && margem < 1;
  const lucroGarantido = isArb ? bancaN * (1 / margem - 1) : 0;
  const roi = isArb ? (lucroGarantido / bancaN) * 100 : 0;
  const stakes = isArb ? oddsN.map(o => bancaN / (o * margem)) : [];

  return (
    <CalcLayout
      title="Calculadora de Arbitragem Online"
      description="Calcule arbitragem esportiva (sure bet) grátis: detecte oportunidades automaticamente, veja a distribuição de stakes por resultado e o lucro garantido independente do desfecho. Educativa e sem cadastro."
      slug="arbitragem"
      faqs={faqs}
      schema={schema}
      explanation={<ArbExplanation />}
    >
      <div className="space-y-6">

        {/* Info banner */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            Insira a <strong style={{ color: 'var(--text-1)' }}>melhor odd disponível</strong> para cada resultado (em casas diferentes), informe sua banca e veja se existe arbitragem — e como distribuir os stakes.
          </p>
        </div>

        {/* Outcomes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0">Resultados e odds por casa ({odds.length})</label>
            <button
              type="button"
              onClick={adicionar}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: 'var(--cyan)' }}
              aria-label="Adicionar resultado"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar resultado
            </button>
          </div>
          <div className="space-y-3">
            {odds.map((o, i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 bg-transparent text-xs font-semibold outline-none"
                    style={{ color: 'var(--text-2)' }}
                    value={labels[i]}
                    onChange={e => atualizarLabel(i, e.target.value)}
                    placeholder={`Resultado ${i + 1}`}
                    aria-label={`Nome do resultado ${i + 1}`}
                  />
                  {odds.length > 2 && (
                    <button
                      type="button"
                      onClick={() => remover(i)}
                      className="p-1.5 rounded-lg transition-colors flex-shrink-0"
                      style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)' }}
                      aria-label={`Remover resultado ${i + 1}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    className="input-field flex-1"
                    placeholder="ex: 2.10"
                    step="0.01"
                    min="1.01"
                    inputMode="decimal"
                    value={o}
                    onChange={e => atualizar(i, e.target.value)}
                    aria-label={`Odd decimal do resultado ${i + 1}`}
                  />
                  {parseFloat(o) > 1 && (
                    <div
                      className="px-2.5 py-2 rounded-lg text-xs font-medium flex-shrink-0"
                      style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)', color: '#22d3ee' }}
                      aria-label={`Probabilidade implícita: ${((1 / parseFloat(o)) * 100).toFixed(1)}%`}
                    >
                      {((1 / parseFloat(o)) * 100).toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Margin preview */}
        {todasPreenchidas && margem !== null && (
          <div
            className="flex items-center justify-between rounded-xl px-4 py-3"
            style={{
              background: margem < 1 ? 'rgba(34,197,94,0.06)' : 'rgba(248,113,113,0.06)',
              border: `1px solid ${margem < 1 ? 'rgba(34,197,94,0.2)' : 'rgba(248,113,113,0.2)'}`,
            }}
            aria-live="polite"
          >
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                {margem < 1 ? '✓ Arbitragem detectada' : '✗ Sem arbitragem'}
              </p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: margem < 1 ? '#4ade80' : '#f87171' }}>
                {(margem * 100).toFixed(2)}%
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                {margem < 1
                  ? `Abaixo de 100% — oportunidade de ${((1 / margem - 1) * 100).toFixed(2)}% de retorno`
                  : 'Precisa ser abaixo de 100% para existir sure bet'}
              </p>
            </div>
          </div>
        )}

        {/* Banca */}
        <div>
          <label className="label" htmlFor="banca-arb">Banca total (R$)</label>
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
            id="banca-arb"
            type="number"
            className="input-field"
            placeholder="ex: 1000"
            min="0"
            inputMode="decimal"
            value={banca}
            onChange={e => setBanca(e.target.value)}
          />
        </div>

        {/* Results */}
        {valid && (
          <div className="space-y-3" aria-live="polite">
            {isArb ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="result-box">
                    <p className="result-value" style={{ color: '#4ade80' }}>R${lucroGarantido.toFixed(2)}</p>
                    <p className="result-label">Lucro garantido</p>
                  </div>
                  <div className="result-box">
                    <p className="result-value" style={{ color: '#818cf8' }}>{roi.toFixed(2)}%</p>
                    <p className="result-label">ROI</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>Distribuição de stakes por resultado</p>
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>Total: R${stakes.reduce((a, b) => a + b, 0).toFixed(2)}</p>
                  </div>
                  <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                    {stakes.map((st, i) => (
                      <div key={i} className="flex justify-between items-center px-4 py-3">
                        <div>
                          <p className="text-xs font-medium" style={{ color: 'var(--text-1)' }}>{labels[i]}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>odd {parseFloat(odds[i]).toFixed(2)} · retorno R${(st * parseFloat(odds[i])).toFixed(2)}</p>
                        </div>
                        <span className="text-sm font-bold tabular-nums" style={{ color: '#22d3ee' }}>
                          R${st.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl px-4 py-3 text-xs" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
                  Independente do resultado, o retorno líquido é{' '}
                  <strong style={{ color: '#4ade80' }}>R${lucroGarantido.toFixed(2)}</strong>
                  {' '}sobre uma banca de{' '}
                  <strong style={{ color: 'var(--text-1)' }}>R${bancaN.toFixed(2)}</strong>.
                  Margem: <strong style={{ color: 'var(--text-1)' }}>{(margem * 100).toFixed(2)}%</strong>.
                </div>
              </>
            ) : (
              <div
                className="rounded-xl px-4 py-4 text-center"
                style={{ background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.15)' }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: '#f87171' }}>Sem oportunidade de arbitragem</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                  Margem atual: <strong>{(margem * 100).toFixed(2)}%</strong> — precisa estar abaixo de 100% para existir sure bet. Tente encontrar odds mais altas em outras casas para os resultados com probabilidade implícita maior.
                </p>
              </div>
            )}
          </div>
        )}

        {!valid && !todasPreenchidas && (
          <div
            className="rounded-xl flex items-center justify-center py-8"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm text-center px-4" style={{ color: 'var(--text-3)' }}>
              Preencha as odds decimais de cada resultado (mínimo 1.01) para verificar se há arbitragem
            </p>
          </div>
        )}

        {todasPreenchidas && !bancaN && (
          <div
            className="rounded-xl flex items-center justify-center py-5"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>
              Informe a banca total para ver a distribuição de stakes e o lucro garantido
            </p>
          </div>
        )}
      </div>
    </CalcLayout>
  );
}
