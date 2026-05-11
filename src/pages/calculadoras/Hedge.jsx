import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const PRESETS_STAKE = [10, 25, 50, 100, 200, 500];

const faqs = [
  {
    q: 'O que é hedge em apostas esportivas?',
    a: 'Hedge é a prática de apostar no resultado oposto de uma posição existente para proteger o capital ou garantir lucro independente do desfecho. O termo vem do mercado financeiro, onde "hedging" significa reduzir exposição a risco. Em apostas, você usa uma segunda aposta — geralmente em outra casa — para cobrir o lado oposto da sua posição original, travando um resultado financeiro conhecido antes que o evento termine.',
  },
  {
    q: 'Como funciona a fórmula do hedge?',
    a: 'A fórmula base é: Stake hedge = (Stake original × Odd original) ÷ Odd hedge. Isso equaliza o retorno bruto dos dois lados, garantindo o mesmo resultado financeiro em qualquer desfecho. Por exemplo: stake R$100 a odd 4.00 — retorno bruto R$400. Com odd de hedge 1.60, stake hedge = 400 ÷ 1.60 = R$250. Total investido = R$350. Lucro garantido = R$400 − R$350 = R$50 em qualquer resultado.',
  },
  {
    q: 'Hedge sempre garante lucro?',
    a: 'Não necessariamente. O lucro garantido pelo hedge depende da relação entre as duas odds. Se a odd original era baixa quando você apostou e a odd de hedge também é baixa, a soma das probabilidades implícitas pode ultrapassar 100% (margem da casa), resultando em lucro garantido negativo — ou seja, você limita a perda mas não garante lucro. Use a calculadora para ver o resultado exato antes de executar qualquer hedge.',
  },
  {
    q: 'Qual a diferença entre hedge e cashout?',
    a: 'Cashout é fechar a aposta diretamente na casa original, que determina o valor a pagar e embutiu sua margem de lucro nesse valor. Hedge é você mesmo apostar no lado oposto, geralmente em outra casa, controlando completamente o stake e as condições. O cashout é imediato e simples; o hedge manual exige pesquisa de odds e conta ativa em outra plataforma, mas costuma oferecer condições significativamente melhores — especialmente quando a margem do cashout ultrapassa 8%.',
  },
  {
    q: 'Quando é melhor fazer hedge do que cashout?',
    a: 'Calcule o cashout justo com a Calculadora de Cashout: (Stake × Odd original) ÷ Odd atual. Se o cashout oferecido pela casa for inferior ao justo em mais de 8%, o hedge manual em outra casa quase sempre é mais vantajoso. Para apostas de alto valor (acima de R$200), a diferença pode ser significativa o suficiente para justificar o trabalho extra de encontrar e executar o hedge manualmente.',
  },
  {
    q: 'O que é hedge parcial e como calcular?',
    a: 'Hedge parcial é apostar um valor menor que o stake completo de hedge no lado oposto. Em vez de travar o mesmo lucro nos dois resultados, você mantém parte da exposição original: se a aposta original vencer, o lucro é maior; se o hedge vencer, o lucro é menor (ou ainda há pequena perda). A calculadora mostra automaticamente os dois cenários — ajuste o stake de hedge para qualquer valor inferior ao recomendado e veja como o perfil de risco/retorno muda.',
  },
  {
    q: 'Como fazer hedge na última seleção de uma múltipla?',
    a: 'Este é o uso mais comum e lucrativo do hedge. Após acertar todas as seleções menos a última, calcule: Stake hedge = (Stake múltipla × Odd combinada total) ÷ Odd da última seleção no lado oposto. Exemplo: múltipla R$50 a odd 15.00 (retorno R$750), última seleção tem odd oposta de 1.40. Stake hedge = 750 ÷ 1.40 = R$535,71. Total investido = R$585,71. Lucro garantido de R$164,29 qualquer que seja o resultado da última seleção.',
  },
  {
    q: 'Posso fazer hedge na mesma casa de apostas?',
    a: 'Tecnicamente sim, mas não é recomendado por dois motivos. Primeiro, a casa cobra margem nos dois lados simultaneamente, tornando o hedge menos eficiente que em casas diferentes. Segundo, padrões consistentes de apostas em lados opostos na mesma conta podem ser identificados como suspeitos e levar a limitação de conta. O ideal é sempre usar casas diferentes: a original para a aposta inicial e outra com boa liquidez para o hedge.',
  },
  {
    q: 'O hedge prejudica minha conta nas casas de apostas?',
    a: 'O hedge em uma casa diferente não é detectável pela casa original, pois são contas separadas. O que pode gerar atenção é um padrão consistente de apostas no lado oposto na mesma casa. Se você precisar hedgear na mesma plataforma ocasionalmente, isso raramente causa problema. Porém, se fizer isso sistematicamente ou em combinação com bônus, a conta pode ser limitada. A regra geral: use sempre casas diferentes para cada lado do hedge.',
  },
  {
    q: 'Qual a diferença entre hedge e arbitragem?',
    a: 'Arbitragem (arb) é identificar uma oportunidade lucrativa antes de apostar — você encontra odds divergentes entre casas e aposta nos dois lados simultaneamente, garantindo lucro desde o início. Hedge é uma reação: você já tem uma posição aberta e decide protegê-la depois que as odds mudaram a seu favor. Arbitragem requer pesquisa constante e execução rápida. Hedge é mais flexível e pode ser executado quando você identificar a oportunidade. Ambos usam a mesma lógica matemática de equalização de retornos.',
  },
  {
    q: 'Hedge ao vivo é possível? Como funciona?',
    a: 'Sim, e é um dos usos mais poderosos. Durante o jogo, as odds flutuam constantemente com base nos eventos — gols, expulsões, lesões, escanteios. Se sua aposta original está "ganhando" (a odd do lado oposto caiu significativamente), você pode fazer hedge ao vivo para travar o lucro antes do fim. Aja rápido: odds ao vivo mudam em segundos. Tenha a calculadora aberta, saiba exatamente o stake de hedge necessário e execute imediatamente ao encontrar a odd desejada.',
  },
  {
    q: 'Existem custos ocultos no hedge que devo considerar?',
    a: 'Sim: (1) Spread entre odds de compra e venda em exchanges como Betfair — a odd que você vê pode não ser a odd que consegue; (2) Comissão de exchange (geralmente 2-5% sobre o lucro) que reduz o retorno efetivo; (3) Variação de odds durante a execução — entre calcular e apostar, a odd pode mudar, especialmente em mercados ao vivo; (4) Requisitos mínimos de stake em algumas casas; (5) Atrasos no processamento de apostas ao vivo. Sempre calcule com margem de segurança de 5-10% sobre o stake de hedge teórico.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Hedge — CalculaBet',
      url: 'https://calculabet.com.br/calculadoras/hedge',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Calcule o stake ideal para fazer hedge em apostas esportivas, proteger sua banca ou garantir lucro independente do resultado.',
      featureList: [
        'Cálculo automático de stake de hedge',
        'Exibição do lucro garantido em ambos os cenários',
        'ROI da operação de hedge',
        'Suporte a hedge parcial',
        'Presets de stake rápidos',
        'Análise de ponto de equilíbrio',
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

function HedgeTypesGrid() {
  const types = [
    {
      label: 'Hedge completo',
      tone: 'green',
      color: '#4ade80',
      desc: 'Stake calculado para equalizar o retorno nos dois resultados. Lucro idêntico qualquer que seja o desfecho. Risco eliminado por completo.',
      quando: 'Lucro já significativo e você quer garantir sem risco',
    },
    {
      label: 'Hedge parcial',
      tone: 'amber',
      color: '#fbbf24',
      desc: 'Stake menor que o completo. Reduz o risco sem eliminar totalmente — um lado rende mais, o outro rende menos. Equilíbrio personalizado.',
      quando: 'Quer manter parte da exposição original com algum lucro garantido',
    },
    {
      label: 'Hedge ao vivo',
      tone: 'cyan',
      color: '#22d3ee',
      desc: 'Executado durante o evento em resposta a mudanças de placar ou situação. Requer rapidez e preparação prévia. Odds mudam em segundos.',
      quando: 'Sua aposta está ganhando após um evento significativo no jogo',
    },
    {
      label: 'Hedge cruzado',
      tone: 'violet',
      color: '#818cf8',
      desc: 'Hedge em múltiplos mercados correlacionados ou em exchanges usando posições de lay. Técnica avançada que combina princípios de hedge e dutching.',
      quando: 'Posições complexas em múltiplos mercados ou apostas de exchange',
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {types.map((t, i) => (
        <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${t.color}20` }}>
          <p className="text-sm font-semibold mb-2" style={{ color: t.color }}>{t.label}</p>
          <p className="text-xs mb-3" style={{ color: 'var(--text-2)', lineHeight: '1.6' }}>{t.desc}</p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            <span style={{ color: t.color }}>Quando usar:</span> {t.quando}
          </p>
        </div>
      ))}
    </div>
  );
}

function BreakEvenTable() {
  const rows = [
    { oo: '2.00', oh: '2.00', sh: '= stake orig.', lg: 'R$0', roi: '0%', class: 'Neutro' },
    { oo: '3.00', oh: '1.60', sh: '1.875× stake', lg: 'Positivo', roi: '+6.3%', class: 'Favorável' },
    { oo: '4.00', oh: '1.40', sh: '2.857× stake', lg: 'Positivo', roi: '+14.3%', class: 'Muito favorável' },
    { oo: '5.00', oh: '1.30', sh: '3.846× stake', lg: 'Positivo', roi: '+20%', class: 'Excelente' },
    { oo: '2.00', oh: '2.80', sh: '0.714× stake', lg: 'Negativo', roi: '−12.5%', class: 'Limita perda' },
    { oo: '3.00', oh: '3.50', sh: '0.857× stake', lg: 'Negativo', roi: '−6.7%', class: 'Limita perda' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Odd original', 'Odd hedge', 'Stake hedge', 'Lucro garantido', 'ROI', 'Classificação'].map((h, i) => (
              <th key={i} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-4 py-3 font-mono font-semibold" style={{ color: '#22d3ee' }}>{r.oo}</td>
              <td className="px-4 py-3 font-mono" style={{ color: 'var(--text-2)' }}>{r.oh}</td>
              <td className="px-4 py-3" style={{ color: 'var(--text-2)' }}>{r.sh}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: r.lg === 'Positivo' ? '#4ade80' : r.lg === 'Negativo' ? '#f87171' : 'var(--text-3)' }}>{r.lg}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: r.roi.startsWith('+') ? '#4ade80' : r.roi.startsWith('-') || r.roi.startsWith('−') ? '#f87171' : 'var(--text-3)' }}>{r.roi}</td>
              <td className="px-4 py-3" style={{ color: 'var(--text-3)' }}>{r.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MultiplaHedgeTable() {
  const rows = [
    { sel: '4 seleções', oddComb: '15.00', stake: 'R$50', lastOdd: '1.25', stakeH: 'R$600', lucro: '+R$150', roi: '+25%' },
    { sel: '3 seleções', oddComb: '8.00', stake: 'R$100', lastOdd: '1.40', stakeH: 'R$571', lucro: '+R$29', roi: '+4.3%' },
    { sel: '4 seleções', oddComb: '12.00', stake: 'R$50', lastOdd: '1.80', stakeH: 'R$333', lucro: '+R$17', roi: '+4.4%' },
    { sel: '5 seleções', oddComb: '25.00', stake: 'R$20', lastOdd: '1.50', stakeH: 'R$333', lucro: '+R$167', roi: '+47.7%' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Múltipla', 'Odd combinada', 'Stake orig.', 'Odd hedge final', 'Stake hedge', 'Lucro garantido', 'ROI'].map((h, i) => (
              <th key={i} className="text-left px-3 py-3 font-semibold" style={{ color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-3 py-3 font-medium" style={{ color: 'var(--text-1)' }}>{r.sel}</td>
              <td className="px-3 py-3 font-mono font-semibold" style={{ color: '#22d3ee' }}>{r.oddComb}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-2)' }}>{r.stake}</td>
              <td className="px-3 py-3 font-mono" style={{ color: 'var(--text-2)' }}>{r.lastOdd}</td>
              <td className="px-3 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{r.stakeH}</td>
              <td className="px-3 py-3 font-semibold" style={{ color: '#4ade80' }}>{r.lucro}</td>
              <td className="px-3 py-3 font-semibold" style={{ color: '#4ade80' }}>{r.roi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HedgeExplanation() {
  return (
    <article className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      <section>
        <SectionLabel>Conceito fundamental</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>O que é hedge em apostas esportivas?</h2>
        <p className="mb-4">
          <strong style={{ color: 'var(--text-1)' }}>Hedge</strong> é a prática de apostar no resultado oposto de uma posição existente para proteger o capital ou garantir lucro independente do desfecho. O conceito vem do mercado financeiro: produtores de commodities usam contratos futuros para "hedgear" a variação de preço, garantindo uma receita mínima independente das flutuações de mercado. Em apostas esportivas, a lógica é idêntica — você usa uma segunda aposta para cobrir o lado oposto, travando um resultado financeiro conhecido antes que o evento termine.
        </p>
        <p className="mb-4">
          A janela de oportunidade para hedge se abre quando as odds mudam após a sua aposta original. Se você apostou em um time a 4.00 e, por lesão do adversário ou bom desempenho, a odd caiu para 1.50, o lado oposto (antes cotado a, digamos, 1.30) agora pode estar a 2.80. Essa divergência cria espaço para hedge lucrativo.
        </p>
        <p>
          O hedge não é arbitragem. <Link to="/calculadoras/arbitragem" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Arbitragem</Link> é identificar a oportunidade antes de apostar — você nunca tem exposição. Hedge é uma reação a uma posição existente: você já apostou, as odds mudaram, e agora decide como gerenciar o risco. Ambos usam a mesma matemática, mas contextos e objetivos diferentes.
        </p>
      </section>

      <section>
        <SectionLabel>Tipos de hedge</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>As quatro formas de hedge</h2>
        <p className="mb-5">
          Não existe apenas uma forma de fazer hedge. Dependendo do seu objetivo — eliminar risco totalmente, reduzir parcialmente ou proteger posições complexas — a abordagem muda:
        </p>
        <HedgeTypesGrid />
        <p className="mt-5">
          A calculadora acima suporta hedge completo e parcial diretamente. Para hedge cruzado em exchanges, aplique a mesma fórmula usando as odds de lay da exchange.
        </p>
      </section>

      <section>
        <SectionLabel>Matemática do hedge</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Fórmulas e princípio de equalização</h2>
        <p className="mb-4">
          O princípio do hedge é simples: igualar o retorno bruto das duas apostas. Quando o retorno da aposta original iguala o retorno da aposta de hedge, o lucro (ou prejuízo) é idêntico independente de qual lado vencer.
        </p>
        <InfoCard tone="cyan" title="Fórmulas fundamentais">
          <div className="font-mono text-xs space-y-2" style={{ color: 'var(--text-1)' }}>
            <p>Retorno original       = Stake original × Odd original</p>
            <p>Stake hedge            = Retorno original ÷ Odd hedge</p>
            <p>Total investido        = Stake original + Stake hedge</p>
            <p>Lucro se orig. ganha   = Retorno original − Total investido</p>
            <p>Lucro se hedge ganha   = (Stake hedge × Odd hedge) − Total investido</p>
            <p>ROI da operação        = (Lucro mínimo ÷ Total investido) × 100</p>
          </div>
        </InfoCard>
        <p className="mt-4 mb-5">
          Note que "lucro se hedge ganha" é sempre igual a "lucro se original ganha" quando o stake hedge é calculado pela fórmula — é exatamente esse o objetivo. Qualquer stake diferente gera retornos assimétricos (hedge parcial).
        </p>
        <p className="mb-4">
          A tabela abaixo mostra como a relação entre as duas odds determina a viabilidade do hedge:
        </p>
        <BreakEvenTable />
        <p className="mt-4">
          A regra prática: quanto maior a odd original em relação à odd de hedge, maior o lucro garantido. Quando as odds são iguais nos dois lados, o lucro é zero (você cobre o spread, mas não ganha nem perde). Quando a odd de hedge supera a original, o hedge gera perda garantida — nesse caso, considere apenas hedge parcial para limitar o prejuízo.
        </p>
      </section>

      <section>
        <SectionLabel>Hedge em múltiplas</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>A estratégia mais lucrativa: última seleção</h2>
        <p className="mb-4">
          O cenário de maior impacto prático do hedge ocorre em <strong style={{ color: 'var(--text-1)' }}>apostas múltiplas</strong>. Quando você acerta todas as seleções menos a última, o retorno potencial está imobilizado nessa única variável. A odd combinada acumulada representa seu "papel" — e o hedge na última seleção é como converter esse papel em dinheiro real, com lucro garantido.
        </p>
        <p className="mb-5">
          Use a <Link to="/calculadoras/multipla-parlay" className="font-medium transition-colors" style={{ color: '#22d3ee' }}>Calculadora de Múltipla</Link> para obter a odd combinada exata e insira-a como "odd original" nesta calculadora. A odd de hedge é a odd do resultado oposto da última seleção.
        </p>
        <MultiplaHedgeTable />
        <p className="mt-4">
          Observe o último exemplo: R$20 apostados em uma múltipla de 5 seleções a odd 25.00. Com as 4 primeiras acertadas, um hedge a odd 1.50 na última gera lucro garantido de R$167 — 8,35× o stake original. Mesmo que a última seleção perca, você sai no lucro.
        </p>
      </section>

      <section>
        <SectionLabel>Hedge ao vivo</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Proteção em tempo real</h2>
        <p className="mb-4">
          O hedge ao vivo é o uso mais dinâmico e potencialmente lucrativo da estratégia, mas exige preparação e velocidade. Durante um evento, as odds flutuam continuamente em resposta a gols, expulsões, lesões, escanteios e até mudanças de dinâmica de jogo. Cada evento cria uma janela de oportunidade — às vezes de segundos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InfoCard tone="green" title="Quando agir">
            <ul className="space-y-2 text-xs">
              {[
                'Seu time fez o gol e está vencendo — odd do adversário caiu',
                'Jogador chave do adversário foi expulso',
                'Placar está 2×0 e faltam 15 min',
                'Última seleção da múltipla está ganhando no intervalo',
                'Evento climático adverso ao favorito',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: '#4ade80' }}>+</span> {p}
                </li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard tone="red" title="Riscos ao vivo">
            <ul className="space-y-2 text-xs">
              {[
                'Odds mudam em segundos — calcule antes de buscar',
                'Spread ao vivo é maior que pré-jogo',
                'Plataformas suspendem mercados em momentos críticos',
                'Decisões emocionais geram hedges mal calculados',
                'Gol anulado por VAR pode reverter a posição',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: '#f87171' }}>—</span> {p}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>
        <p>
          Protocolo recomendado para hedge ao vivo: (1) Defina antes do jogo qual odd de hedge seria aceitável — ex: "vou hedgear se o adversário cair abaixo de 1.80". (2) Tenha a calculadora aberta com stake original e odd original já preenchidos. (3) Quando a odd alvo aparecer, apenas insira a odd de hedge e execute imediatamente.
        </p>
      </section>

      <section>
        <SectionLabel>Custos e eficiência</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Custos ocultos do hedge que reduzem o lucro real</h2>
        <p className="mb-5">
          O cálculo teórico do hedge assume que você consegue exatamente as odds que vê. Na prática, há fatores que reduzem o lucro efetivo — conhecê-los evita surpresas e permite planejar com realismo:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: 'Comissão de exchange',
              desc: 'Betfair e outras exchanges cobram 2-5% sobre o lucro líquido de cada aposta vencedora. Em um hedge de R$500 com lucro de R$50, a comissão de 5% retira R$2,50 — reduzindo o ROI real.',
              tone: 'amber',
            },
            {
              title: 'Spread bid/ask',
              desc: 'Em exchanges, existe diferença entre a melhor odd disponível de back e lay. Se a odd teórica é 1.80 mas a melhor disponível é 1.75, seu stake de hedge precisa ser recalculado com 1.75.',
              tone: 'amber',
            },
            {
              title: 'Deslizamento de odds',
              desc: 'Entre calcular e executar, a odd pode mudar — especialmente ao vivo. Calcule com a odd real do momento da execução, não a odd que viu 30 segundos antes.',
              tone: 'red',
            },
            {
              title: 'Liquidez insuficiente',
              desc: 'Em mercados menos líquidos, seu stake de hedge pode não ser totalmente preenchido à odd desejada. Parte do hedge fica em aberto, aumentando o risco residual.',
              tone: 'red',
            },
          ].map((c, i) => (
            <InfoCard key={i} tone={c.tone} title={c.title}>
              <p className="text-xs leading-relaxed">{c.desc}</p>
            </InfoCard>
          ))}
        </div>
        <p className="mt-5">
          Regra prática: adicione uma margem de segurança de 5-10% ao stake de hedge calculado para compensar esses fatores. Se o cálculo indica R$200, execute R$210-220. Isso garante cobertura mesmo com pequenas variações de odds.
        </p>
      </section>

      <section>
        <SectionLabel>Comparação de estratégias</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Hedge vs. Cashout: quando cada um é melhor</h2>
        <p className="mb-5">
          Hedge e cashout têm o mesmo objetivo — sair de uma posição existente — mas funcionam de formas diferentes. A escolha certa depende do valor da aposta, da margem da casa e da urgência:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <InfoCard tone="cyan" title="Hedge manual">
            <ul className="space-y-2 text-xs">
              {[
                'Você controla 100% do stake e das condições',
                'Pode encontrar odds melhores em outra casa',
                'Sem margem adicional da casa original',
                'Ideal para apostas acima de R$100',
                'Requer conta ativa em outra plataforma',
                'Melhor resultado matemático na maioria dos casos',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: '#22d3ee' }}>+</span> {p}
                </li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard tone="violet" title="Cashout">
            <ul className="space-y-2 text-xs">
              {[
                'Um clique — instantâneo e simples',
                'Disponível diretamente ao vivo na plataforma',
                'A casa define o valor com margem embutida',
                'Ideal para apostas pequenas ou urgentes',
                'Não requer conta em outra casa',
                'Margem típica: 8-15% sobre o valor justo',
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ color: '#818cf8' }}>+</span> {p}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>
        <InfoCard tone="neutral">
          <p className="text-xs leading-relaxed">
            <strong style={{ color: 'var(--text-1)' }}>Regra prática:</strong> calcule o cashout justo com a{' '}
            <Link to="/calculadoras/cashout" className="font-medium" style={{ color: '#22d3ee' }}>Calculadora de Cashout</Link>
            {' '}e compare com a oferta da casa. Se a margem cobrada ultrapassar 8%, o hedge manual em outra plataforma quase sempre gera resultado superior. Para apostas abaixo de R$50, o cashout pode ser a escolha mais prática mesmo com margem maior.
          </p>
        </InfoCard>
      </section>

      <section>
        <SectionLabel>Erros comuns</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Erros que eliminam o lucro do hedge</h2>
        <div className="space-y-3">
          {[
            {
              title: 'Calcular com odds que já mudaram',
              desc: 'Você viu uma odd de 1.60 para hedge, calculou o stake, mas ao executar a odd já era 1.55. O lucro garantido calculado não será o real. Sempre execute imediatamente após calcular ou recalcule na hora da execução.',
            },
            {
              title: 'Não considerar a comissão de exchange',
              desc: 'Em exchanges com comissão de 5%, um lucro teórico de R$30 vira R$28,50. Em hedges de alto valor, a comissão pode representar 10-20% do lucro total. Inclua no cálculo antes de decidir.',
            },
            {
              title: 'Hedgear na mesma casa para apostas repetidas',
              desc: 'Fazer hedge na mesma plataforma ocasionalmente é inofensivo. Mas um padrão sistemático de apostas em lados opostos na mesma conta sinaliza atividade suspeita e pode levar a limitação de conta. Use sempre plataformas diferentes.',
            },
            {
              title: 'Hedge emocional sem cálculo',
              desc: 'Fazer hedge por ansiedade, sem calcular se a operação é matematicamente vantajosa, frequentemente resulta em hedge que apenas aumenta o prejuízo total. Calcule sempre antes de agir.',
            },
          ].map((e, i) => (
            <InfoCard key={i} tone="red" title={e.title}>
              <p className="text-xs leading-relaxed">{e.desc}</p>
            </InfoCard>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Guia de decisão</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>5 perguntas para decidir se vale a pena hedgear</h2>
        <ol className="space-y-3">
          {[
            {
              n: '1',
              t: 'As odds mudaram o suficiente para hedge lucrativo?',
              d: 'Calcule: se a soma das probabilidades implícitas das duas odds for abaixo de 100%, existe margem positiva. Se for acima de 100%, o hedge gera perda — considere apenas se o objetivo é limitar risco, não garantir lucro.',
            },
            {
              n: '2',
              t: 'O lucro garantido justifica o trabalho e os custos?',
              d: 'Para apostas abaixo de R$50, a diferença entre hedge e cashout raramente justifica o esforço de abrir outra conta e executar manualmente. Para valores acima de R$200, a diferença pode ser significativa.',
            },
            {
              n: '3',
              t: 'Existe liquidez suficiente na odd de hedge?',
              d: 'Verifique se o mercado tem volume suficiente para absorver seu stake de hedge na odd desejada. Em mercados pequenos ou ao vivo em momentos críticos, a odd pode não estar disponível pelo valor total.',
            },
            {
              n: '4',
              t: 'O evento ainda está em fase de odds estáveis?',
              d: 'Em momentos de alta volatilidade ao vivo (primeiros 5 min após um gol, pênalti em disputa, VAR revisando gol), odds mudam tão rápido que o cálculo pode ser inválido antes de executar. Espere a estabilização.',
            },
            {
              n: '5',
              t: 'Qual é o custo de oportunidade de hedgear?',
              d: 'Ao hedgear, você está abrindo mão do lucro máximo (se a aposta original vencer) em troca de segurança. Se sua avaliação de que o resultado favorável vai ocorrer ainda é sólida e o lucro potencial é muito superior ao garantido, esperar pode ser a decisão racional.',
            },
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
            <strong style={{ color: 'var(--text-1)' }}>Jogo responsável:</strong> hedge e outras estratégias de proteção reduzem o risco em apostas específicas, mas não eliminam o risco estrutural das apostas esportivas. Casas de apostas têm margem positiva no longo prazo. Estabeleça limites claros de banca, nunca aposte valores que comprometam necessidades essenciais e utilize as ferramentas de autoexclusão disponíveis nas plataformas.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            Central de apoio: <strong style={{ color: 'var(--text-2)' }}>0800 722 2764</strong> (JISA — Jogo Responsável)
          </p>
        </InfoCard>
      </section>

    </article>
  );
}

export default function Hedge() {
  const [stake, setStake] = useState('');
  const [oddOriginal, setOddOriginal] = useState('');
  const [oddHedge, setOddHedge] = useState('');

  const s = parseFloat(stake);
  const oo = parseFloat(oddOriginal);
  const oh = parseFloat(oddHedge);
  const valid = s > 0 && oo > 1 && oh > 1;

  const retornoOriginal = valid ? s * oo : 0;
  const stakeHedge = valid ? retornoOriginal / oh : 0;
  const totalInvestido = valid ? s + stakeHedge : 0;
  const lucroSeOriginalGanha = valid ? retornoOriginal - totalInvestido : 0;
  const lucroSeHedgeGanha = valid ? stakeHedge * oh - totalInvestido : 0;
  const lucroMinimo = valid ? Math.min(lucroSeOriginalGanha, lucroSeHedgeGanha) : 0;
  const lucroMaximo = valid ? Math.max(lucroSeOriginalGanha, lucroSeHedgeGanha) : 0;
  const roi = valid ? (lucroMinimo / totalInvestido) * 100 : 0;

  const tendencia = valid
    ? lucroMinimo > 0
      ? { label: 'Hedge lucrativo', color: '#4ade80' }
      : lucroMinimo === 0
      ? { label: 'Neutro (break-even)', color: 'var(--text-3)' }
      : { label: 'Limita perda', color: '#fbbf24' }
    : null;

  return (
    <CalcLayout
      title="Calculadora de Hedge"
      description="Calcule o stake ideal para fazer hedge e proteger sua aposta — garanta lucro ou limite perdas independente do resultado. Hedge completo, parcial e em múltiplas."
      slug="hedge"
      faqs={faqs}
      schema={schema}
      explanation={<HedgeExplanation />}
    >
      <div className="space-y-6">

        {/* Stake */}
        <div>
          <label className="label" htmlFor="hedge-stake">Stake original (R$)</label>
          <div className="flex flex-wrap gap-2 mb-2.5" role="group" aria-label="Valores rápidos de stake">
            {PRESETS_STAKE.map(p => (
              <button
                key={p}
                onClick={() => setStake(String(p))}
                aria-pressed={stake === String(p)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
                style={{
                  background: stake === String(p) ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${stake === String(p) ? 'rgba(34,211,238,0.4)' : 'var(--border)'}`,
                  color: stake === String(p) ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                R${p}
              </button>
            ))}
          </div>
          <input
            id="hedge-stake"
            type="number"
            className="input-field"
            placeholder="ex: 100"
            min="0"
            value={stake}
            onChange={e => setStake(e.target.value)}
            aria-label="Stake original em reais"
          />
        </div>

        {/* Odds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="hedge-odd-orig">Odd original (sua aposta)</label>
            <input
              id="hedge-odd-orig"
              type="number"
              className="input-field"
              placeholder="ex: 4.00"
              step="0.01"
              min="1.01"
              value={oddOriginal}
              onChange={e => setOddOriginal(e.target.value)}
              aria-label="Odd da aposta original"
            />
            {oo > 1 && s > 0 && (
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                Retorno potencial: <strong style={{ color: '#22d3ee' }}>R${(s * oo).toFixed(2)}</strong>
              </p>
            )}
          </div>
          <div>
            <label className="label" htmlFor="hedge-odd-hedge">Odd para hedge (lado oposto)</label>
            <input
              id="hedge-odd-hedge"
              type="number"
              className="input-field"
              placeholder="ex: 1.80"
              step="0.01"
              min="1.01"
              value={oddHedge}
              onChange={e => setOddHedge(e.target.value)}
              aria-label="Odd do lado oposto para fazer hedge"
            />
            {oh > 1 && (
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                Prob. implícita: <strong style={{ color: '#22d3ee' }}>{((1 / oh) * 100).toFixed(1)}%</strong>
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        <div aria-live="polite" aria-atomic="true">
          {valid ? (
            <div className="space-y-3">
              {/* Stake de hedge em destaque */}
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 rounded-xl"
                style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}
              >
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                    Stake recomendado para hedge
                  </p>
                  <p className="text-3xl font-bold tabular-nums" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
                    R${stakeHedge.toFixed(2)}
                  </p>
                  {tendencia && (
                    <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: tendencia.color, display: 'inline-block' }} />
                      <span style={{ color: tendencia.color }}>{tendencia.label}</span>
                    </span>
                  )}
                </div>
                <div className="sm:text-right">
                  <p className="text-xs mb-0.5" style={{ color: 'var(--text-3)' }}>Total investido</p>
                  <p className="text-lg font-semibold" style={{ color: 'var(--text-1)' }}>R${totalInvestido.toFixed(2)}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                    ROI: <strong style={{ color: roi >= 0 ? '#4ade80' : '#f87171' }}>{roi >= 0 ? '+' : ''}{roi.toFixed(1)}%</strong>
                  </p>
                </div>
              </div>

              {/* 3 métricas */}
              <div className="grid grid-cols-3 gap-3">
                <div className="result-box">
                  <p className="result-value" style={{ color: lucroSeOriginalGanha >= 0 ? '#4ade80' : 'var(--red)' }}>
                    {lucroSeOriginalGanha >= 0 ? '+' : ''}R${lucroSeOriginalGanha.toFixed(2)}
                  </p>
                  <p className="result-label">Se original ganha</p>
                </div>
                <div className="result-box">
                  <p className="result-value" style={{ color: lucroSeHedgeGanha >= 0 ? '#4ade80' : 'var(--red)' }}>
                    {lucroSeHedgeGanha >= 0 ? '+' : ''}R${lucroSeHedgeGanha.toFixed(2)}
                  </p>
                  <p className="result-label">Se hedge ganha</p>
                </div>
                <div className="result-box">
                  <p className="result-value" style={{ color: lucroMinimo >= 0 ? '#4ade80' : '#fbbf24' }}>
                    {lucroMinimo >= 0 ? '+' : ''}R${lucroMinimo.toFixed(2)}
                  </p>
                  <p className="result-label">Mínimo garantido</p>
                </div>
              </div>

              <div
                className="rounded-xl px-4 py-3 text-xs leading-relaxed"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
              >
                {lucroMinimo >= 0
                  ? `Hedge garante lucro de R$${lucroMinimo.toFixed(2)} em qualquer resultado. Aguardar sem hedge pode render até R$${lucroMaximo.toFixed(2)} se acertar — mas com risco de perda total de R$${s.toFixed(2)}.`
                  : `Hedge limita a perda máxima para R$${Math.abs(lucroMinimo).toFixed(2)}. Sem hedge, a perda total seria R$${s.toFixed(2)} caso perca. As odds não favorecem lucro garantido nesta operação.`}
              </div>
            </div>
          ) : (
            <div
              className="rounded-xl flex items-center justify-center py-10"
              style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha stake e as duas odds para calcular o hedge</p>
            </div>
          )}
        </div>

      </div>
    </CalcLayout>
  );
}
