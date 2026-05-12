import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const faqs = [
  {
    q: 'O que é a estratégia Martingale em apostas esportivas?',
    a: 'Martingale é um sistema de progressão negativa onde o apostador dobra o stake após cada derrota. A premissa é que, quando eventualmente vencer, o lucro cobre todas as perdas anteriores mais o valor do stake inicial. O nome vem de "martingal", um tipo de arreio usado em corridas de cavalos na França do século XVIII e associado posteriormente a casinos de Monte Carlo. A lógica superficial parece convincente, mas a matemática demonstra que o sistema é insustentável em qualquer escala prática.',
  },
  {
    q: 'Por que o Martingale não funciona a longo prazo?',
    a: 'Por dois motivos irrefutáveis. Primeiro, o stake cresce exponencialmente (2^n) enquanto o lucro máximo permanece constante — o stake inicial. Após 10 derrotas partindo de R$10, você precisaria apostar R$10.240 para lucrar R$10. Segundo, o Martingale não altera o valor esperado de cada aposta: se a odd tem margem da casa, cada aposta individual continua com EV negativo, e nenhum sistema de progressão pode mudar isso. O Martingale apenas redistribui o risco no tempo.',
  },
  {
    q: 'Qual a probabilidade real de sequências longas de perdas?',
    a: 'Em apostas com odd 2.00 (50% de probabilidade implícita), a chance de 5 derrotas consecutivas é 3,1%, de 8 derrotas é 0,39% e de 10 derrotas é 0,097%. Esses números parecem pequenos, mas um apostador que faz 30 apostas por semana terá completado mais de 1.500 apostas em um ano — o suficiente para que sequências de 8-10 derrotas sejam estatisticamente quase certas de ocorrer em algum momento.',
  },
  {
    q: 'O limite de apostas das casas interfere no Martingale?',
    a: 'Sim, de forma definitiva. Casas de apostas brasileiras têm limites máximos por mercado que variam de R$5.000 a R$50.000. Em um Martingale começando com R$50, a 8ª aposta seria R$6.400 — próxima ou acima do limite de muitas casas. Quando o stake atinge o limite, você não pode mais dobrar e o sistema colapsa com todo o prejuízo acumulado, sem possibilidade de recuperação.',
  },
  {
    q: 'O que é a Falácia do Apostador e como ela explica o Martingale?',
    a: 'A Falácia do Apostador é a crença errônea de que eventos passados independentes afetam o resultado de eventos futuros — "devo ganhar logo porque já perdi 5 vezes". Em apostas com odd 2.00, a probabilidade de vitória na 6ª aposta é exatamente 50%, independente do histórico. O Martingale explora esse viés cognitivo: parece que você está "acumulando crédito" a cada derrota, mas matematicamente cada aposta é um evento independente com o mesmo valor esperado.',
  },
  {
    q: 'Existe alguma variação do Martingale que seja mais segura?',
    a: 'Variantes como Anti-Martingale (dobra após vitórias), D\'Alembert (incremento linear), Fibonacci (sequência de Fibonacci) e Labouchère (cancelamento de lista) crescem mais lentamente. Nenhuma altera o valor esperado negativo de apostas com margem da casa. O Anti-Martingale é o mais defensivo porque limita a exposição nas fases ruins — mas a proteção real vem de edge positivo, não do sistema de progressão.',
  },
  {
    q: 'Por que nenhum sistema de apostas pode garantir lucro?',
    a: 'O Teorema do Apostador, demonstrado matematicamente, estabelece que qualquer sistema de apostas em jogos com EV negativo inevitavelmente resulta em ruína com probabilidade 1, dado tempo suficiente. A razão: o valor esperado total é a soma dos valores esperados individuais. Se cada aposta tem EV negativo, qualquer combinação delas — em qualquer ordem ou tamanho — também tem EV negativo. Sistemas como Martingale não criam valor, apenas mudam o perfil de risco: pequenas vitórias frequentes vs. grandes perdas raras.',
  },
  {
    q: 'O que é o Teorema da Ruína do Apostador?',
    a: 'É uma demonstração matemática formal que mostra que, em qualquer jogo com valor esperado negativo (onde a casa tem vantagem), a probabilidade de um apostador com banca finita eventualmente perder toda a banca é 1 — ou seja, ruína é certa, apenas uma questão de tempo. Mesmo com valor esperado zero (jogo justo), a probabilidade de ruína também é 1 para uma banca finita contra um adversário com banca maior. Apenas com EV positivo consistente a ruína pode ser evitada.',
  },
  {
    q: 'Apostas com odds mais altas tornam o Martingale mais seguro?',
    a: 'Não — na prática, piora. Com odds altas (ex: 5.00 com 20% de probabilidade), a progressão não dobra o stake a cada derrota: você precisa de um stake suficiente para cobrir todas as perdas acumuladas e ainda lucrar o stake inicial. Com odd 5.00, a proporção de cobertura é stake × 1.25 após cada derrota para equilibrar. Mas a maior variância de odds altas significa sequências de perdas ainda mais longas e frequentes, exacerbando o problema exponencial.',
  },
  {
    q: 'Casas de apostas detectam o uso do Martingale?',
    a: 'Sistemas automatizados de detecção de padrões identificam facilmente o dobramento de stakes em sequência. Muitas casas limitam proativamente contas que exibem padrões de recuperação de perdas — não porque o Martingale seja lucrativo para o apostador, mas porque viola os termos de uso relacionados a sistemas de apostas. Ironicamente, a casa tem todo o interesse em deixar o Martingale acontecer até o limite — onde o sistema colapsa a favor da casa.',
  },
  {
    q: 'Como o Anti-Martingale difere do Martingale original?',
    a: 'No Anti-Martingale, você dobra o stake após vitórias (e retorna ao stake inicial após derrotas). A lógica inversa é: aproveitar as boas sequências e limitar o prejuízo nas fases ruins. O Anti-Martingale é menos explosivo em perdas, mas também não cria edge positivo. Em termos de gestão de banca, é superior ao Martingale, mas ainda inferior ao Kelly Criterion ou flat betting com value bets reais.',
  },
  {
    q: 'Qual a alternativa profissional ao Martingale?',
    a: 'A alternativa é abandonar a ideia de recuperar perdas e focar em encontrar edge positivo. Kelly Criterion ou flat betting de 1-3% da banca por aposta, combinados com value bets identificados com a Calculadora de Odds, criam a única estrutura matematicamente sustentável. A diferença fundamental: em vez de tentar "recuperar" perdas inevitáveis, você constrói um processo onde o edge positivo se realiza ao longo de centenas de apostas.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Martingale — CalculaBet',
      url: 'https://calculabet.com.br/calculadoras/martingale',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Simule a estratégia Martingale e visualize o crescimento exponencial do risco após derrotas consecutivas. Calculadora educativa com análise matemática completa dos perigos do Martingale.',
      featureList: [
        'Simulação de sequências de Martingale até 20 rodadas',
        'Detecção automática de ponto de esgotamento da banca',
        'Cálculo de risco total acumulado e ROI do risco',
        'Visualização linha a linha do crescimento exponencial',
        'Análise educativa comparativa com alternativas',
        'Probabilidade de sequências adversas por odd',
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
    red: { bg: 'rgba(248,113,113,0.04)', border: 'rgba(248,113,113,0.18)', title: '#f87171' },
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

function VariantsComparisonTable() {
  const rows = [
    {
      nome: 'Martingale',
      progressao: 'Dobra após derrota',
      velocidade: 'Exponencial (2^n)',
      bancaRisco: 'Extremo',
      limiteAtinge: '~7–10 apostas',
      avaliacao: 'Não recomendado',
      cor: '#f87171',
    },
    {
      nome: 'Anti-Martingale',
      progressao: 'Dobra após vitória',
      velocidade: 'Exponencial controlado',
      bancaRisco: 'Baixo (perdas fixas)',
      limiteAtinge: 'Nunca (volta ao base)',
      avaliacao: 'Defensivo',
      cor: '#fbbf24',
    },
    {
      nome: "D'Alembert",
      progressao: '+1 unidade após derrota',
      velocidade: 'Linear',
      bancaRisco: 'Moderado',
      limiteAtinge: '~20–30 apostas',
      avaliacao: 'Mais lento que Martingale',
      cor: '#fbbf24',
    },
    {
      nome: 'Fibonacci',
      progressao: 'Sequência de Fibonacci',
      velocidade: 'Sub-exponencial',
      bancaRisco: 'Alto',
      limiteAtinge: '~12–15 apostas',
      avaliacao: 'Melhor que Martingale',
      cor: '#fbbf24',
    },
    {
      nome: 'Labouchère',
      progressao: 'Cancelamento de lista',
      velocidade: 'Variável',
      bancaRisco: 'Moderado-alto',
      limiteAtinge: 'Depende da lista',
      avaliacao: 'Complexo, EV igual',
      cor: '#818cf8',
    },
    {
      nome: 'Flat Betting',
      progressao: 'Sem progressão',
      velocidade: 'Nenhuma',
      bancaRisco: 'Mínimo',
      limiteAtinge: 'Nunca',
      avaliacao: 'Recomendado',
      cor: '#4ade80',
    },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Sistema', 'Progressão', 'Velocidade', 'Risco de banca', 'Atinge limite em', 'Avaliação'].map((h, i) => (
              <th key={i} className="text-left px-3 py-3 font-semibold whitespace-nowrap" style={{ color: 'var(--text-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-3 py-3 font-semibold whitespace-nowrap" style={{ color: r.cor }}>{r.nome}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-2)' }}>{r.progressao}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-2)' }}>{r.velocidade}</td>
              <td className="px-3 py-3 font-medium" style={{ color: r.bancaRisco === 'Extremo' ? '#f87171' : r.bancaRisco === 'Alto' ? '#fbbf24' : r.bancaRisco === 'Mínimo' ? '#4ade80' : 'var(--text-2)' }}>{r.bancaRisco}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-3)' }}>{r.limiteAtinge}</td>
              <td className="px-3 py-3 font-semibold" style={{ color: r.cor }}>{r.avaliacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SurvivalProbTable() {
  const rows = [
    { apostas: '10', b20: '82%', b50: '97%', b100: '>99%' },
    { apostas: '50', b20: '35%', b50: '86%', b100: '98%' },
    { apostas: '100', b20: '12%', b50: '74%', b100: '95%' },
    { apostas: '200', b20: '1%', b50: '55%', b100: '90%' },
    { apostas: '500', b20: '<0.1%', b50: '22%', b100: '74%' },
    { apostas: '1000', b20: '~0%', b50: '5%', b100: '55%' },
  ];
  const cellColor = (v) => {
    const n = parseFloat(v.replace('>','').replace('<','').replace('%','').replace('~',''));
    if (n >= 90) return '#4ade80';
    if (n >= 60) return '#22d3ee';
    if (n >= 30) return '#fbbf24';
    return '#f87171';
  };
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Apostas feitas</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Banca 20 unid.</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Banca 50 unid.</th>
            <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>Banca 100 unid.</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{r.apostas} apostas</td>
              <td className="px-4 py-3 font-semibold" style={{ color: cellColor(r.b20) }}>{r.b20}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: cellColor(r.b50) }}>{r.b50}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: cellColor(r.b100) }}>{r.b100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MartingaleExplanation() {
  return (
    <article className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      <section>
        <div
          className="flex items-start gap-4 p-5 rounded-xl"
          style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)' }}
        >
          <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold" style={{ background: 'rgba(248,113,113,0.2)', color: '#f87171' }}>!</span>
          <div>
            <p className="font-semibold mb-1.5" style={{ color: '#f87171' }}>Calculadora exclusivamente educativa</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
              O CalculaBet não recomenda o uso do Martingale como estratégia de apostas. Esta ferramenta existe para demonstrar matematicamente os riscos antes que você considere qualquer sistema de progressão de stakes.
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionLabel>Origem e história</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>O Martingale: de 1700 à tela do celular</h2>
        <p className="mb-4">
          O termo "martingal" aparece em registros franceses do século XVIII associado a um estilo de jogar — mas a estratégia em si é anterior: apostadores em corridas de cavalos da França pré-revolucionária já dobravam as apostas após derrotas como forma de "recuperar o que era deles". O nome ganhou associação definitiva com os cassinos de Monte Carlo no século XIX, onde a estratégia era considerada infalível por leigos e evidentemente ruinosa por matemáticos.
        </p>
        <p className="mb-4">
          O matemático francês <strong style={{ color: 'var(--text-1)' }}>Jean le Rond d'Alembert</strong> foi um dos primeiros a analisar formalmente sistemas de apostas — incluindo variações do Martingale. Sua conclusão foi inequívoca: nenhum sistema de progressão de stakes pode converter um jogo com vantagem da casa em um jogo favorável ao apostador. O raciocínio é que a vantagem matemática da casa está em <em>cada aposta individual</em>, e nenhuma ordem ou tamanho de apostas muda essa vantagem.
        </p>
        <p>
          Dois séculos depois, em 1956, John L. Kelly Jr. demonstrou formalmente qual seria a aposta ótima em um jogo com edge positivo — o oposto do Martingale. Onde o Martingale tenta "recuperar" de um EV negativo apostando mais, o Kelly aproveita um EV positivo apostando na proporção exata do edge.
        </p>
      </section>

      <section>
        <SectionLabel>Por que parece funcionar</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>A Falácia do Apostador: o mecanismo psicológico por trás do Martingale</h2>
        <p className="mb-4">
          O Martingale persiste não porque funciona, mas porque explora com precisão cirúrgica um dos vieses cognitivos mais resistentes ao raciocínio humano: a <strong style={{ color: 'var(--text-1)' }}>Falácia do Apostador</strong>. Esse viés é a crença de que eventos independentes se influenciam mutuamente — que "depois de 5 cara, cara é improvável e coroa é esperada".
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <InfoCard tone="red" title="O que o apostador acredita">
            <ul className="space-y-2 text-xs">
              {[
                '"Já perdi 4 vezes, estatisticamente devo ganhar logo"',
                '"Estou acumulando crédito com cada derrota"',
                '"A probabilidade de 6 derrotas seguidas é minúscula"',
                '"Quando ganhar, recupero tudo — o sistema é matemático"',
              ].map((p, i) => <li key={i} className="flex items-start gap-2"><span style={{ color: '#f87171' }}>—</span> <em>{p}</em></li>)}
            </ul>
          </InfoCard>
          <InfoCard tone="green" title="O que a matemática demonstra">
            <ul className="space-y-2 text-xs">
              {[
                'Cada aposta é um evento independente — sem memória',
                'A probabilidade da 6ª aposta é idêntica à da 1ª',
                'Sequências raras ocorrem com certeza no longo prazo',
                'O stake cresce 2^n, o lucro máximo permanece constante',
              ].map((p, i) => <li key={i} className="flex items-start gap-2"><span style={{ color: '#4ade80' }}>+</span> {p}</li>)}
            </ul>
          </InfoCard>
        </div>
        <p>
          A armadilha é sutil: o Martingale <em>funciona</em> na maioria das vezes (qualquer aposta com chance razoável de vitória termina com lucro na maioria das sessões curtas). Isso cria um falso senso de validação. O problema é que as raras ocasiões em que falha — as sequências longas — eliminam todos os lucros acumulados e muito mais.
        </p>
      </section>

      <section>
        <SectionLabel>Matemática do problema</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Por que nenhum sistema pode superar o valor esperado negativo</h2>
        <p className="mb-4">
          Esta é a demonstração central que qualquer apostador precisa entender antes de adotar qualquer sistema de progressão. O <strong style={{ color: 'var(--text-1)' }}>Teorema da Aditividade do Valor Esperado</strong> estabelece que o EV total de uma série de apostas é a soma dos EVs individuais, independente da ordem, tamanho ou sistema que conecta as apostas:
        </p>
        <InfoCard tone="cyan" title="Prova da invariância do EV">
          <div className="font-mono text-xs space-y-2" style={{ color: 'var(--text-1)' }}>
            <p>EV de uma aposta = p × (odd − 1) × stake − (1−p) × stake</p>
            <p>= stake × [p × (odd − 1) − (1−p)]</p>
            <p>Com odd 1.90 e prob. real 50%:</p>
            <p>EV = stake × [0.5 × 0.90 − 0.50] = stake × (−0.05)</p>
            <p>EV total (N apostas) = soma dos EVs individuais</p>
            <p>= −0.05 × (stake1 + stake2 + ... + stakeN)</p>
          </div>
        </InfoCard>
        <p className="mt-4 mb-4">
          Observe: o EV total é proporcional à <strong style={{ color: 'var(--text-1)' }}>soma dos stakes</strong>, independente de como são distribuídos. Dobrar o stake após cada derrota (Martingale) aumenta a soma total dos stakes apostados — e portanto aumenta a magnitude absoluta da perda esperada, mesmo que o EV percentual por aposta seja constante.
        </p>
        <p>
          Em outras palavras: o Martingale não apenas não resolve o problema do EV negativo — ele o amplifica ao expor mais capital ao mesmo EV negativo por unidade.
        </p>
      </section>

      <section>
        <SectionLabel>Crescimento exponencial</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>A assimetria fatal: risco cresce, lucro não</h2>
        <p className="mb-4">
          A tabela abaixo mostra a progressão real do risco no Martingale partindo de R$10, com a coluna de "lucro se ganhar" permanecendo constante. É a demonstração visual mais clara do problema:
        </p>
        <div className="overflow-x-auto rounded-xl mb-4" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                {['Derrota', 'Stake', 'Total arriscado', 'Lucro se ganhar', 'ROI do risco'].map((h, i) => (
                  <th key={i} className={`px-4 py-3 font-semibold ${i > 0 ? 'text-right' : 'text-left'}`} style={{ color: 'var(--text-3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1,2,3,4,5,6,7,8,10,12,15].map((n, i) => {
                const stake = 10 * Math.pow(2, n - 1);
                const total = 10 * (Math.pow(2, n) - 1);
                const roi = (10 / total * 100);
                const danger = n >= 6;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: danger ? 'rgba(248,113,113,0.03)' : 'transparent' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: danger ? '#f87171' : 'var(--text-2)' }}>{n}ª</td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums" style={{ color: danger ? '#f87171' : 'var(--text-1)' }}>R${stake.toLocaleString('pt-BR')}</td>
                    <td className="px-4 py-3 text-right tabular-nums" style={{ color: danger ? '#f87171' : 'var(--text-2)' }}>R${total.toLocaleString('pt-BR')}</td>
                    <td className="px-4 py-3 text-right tabular-nums" style={{ color: '#4ade80' }}>R$10</td>
                    <td className="px-4 py-3 text-right" style={{ color: 'var(--text-3)' }}>{roi.toFixed(roi < 0.01 ? 4 : roi < 0.1 ? 3 : 2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p>
          Na 15ª derrota, você precisaria apostar R$163.840 para lucrar R$10 — um ROI do risco total de 0,006%. Em qualquer outro contexto financeiro, essa seria a definição de uma operação insana.
        </p>
      </section>

      <section>
        <SectionLabel>Sobrevivência estatística</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Probabilidade de sobreviver ao Martingale: a contagem regressiva</h2>
        <p className="mb-4">
          A tabela abaixo mostra a probabilidade de <em>não</em> atingir a ruína após N apostas de Martingale, para diferentes tamanhos de banca (em unidades do stake inicial). Com odd 2.00 (50% de probabilidade de vitória em cada aposta):
        </p>
        <SurvivalProbTable />
        <p className="mt-4 mb-4">
          Com 20 unidades de banca (ex: R$1.000 começando com R$50), após 200 apostas a probabilidade de ainda estar no jogo é de apenas 1%. Um apostador regular que faz 10 apostas por semana chegará a 200 apostas em menos de 5 meses.
        </p>
        <p>
          O dado mais revelador: <strong style={{ color: 'var(--text-1)' }}>mesmo com 100 unidades de banca</strong> (banca de R$5.000 para stake inicial de R$50), após 1.000 apostas a probabilidade de sobrevivência é de apenas 55%. O sistema tem data de validade matematicamente previsível.
        </p>
      </section>

      <section>
        <SectionLabel>Limites das casas</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>O golpe final: por que as casas não precisam banir o Martingale</h2>
        <p className="mb-4">
          Existe um mito persistente de que casas de apostas limitam contas que usam Martingale porque a estratégia é lucrativa. A realidade é oposta: <strong style={{ color: 'var(--text-1)' }}>as casas têm interesse financeiro em deixar o Martingale acontecer</strong> — porque o sistema colapsa precisamente no momento em que o apostador precisa do maior stake, que frequentemente excede os limites de aposta da casa.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            { titulo: 'Stake R$50, partindo de R$1', derrota: '6ª derrota', stake: 'R$64', contexto: 'Ainda dentro dos limites para a maioria das casas.' },
            { titulo: 'Stake R$500, partindo de R$10', derrota: '6ª derrota', stake: 'R$640', contexto: 'Começando a se aproximar de limites em mercados secundários.' },
            { titulo: 'Stake R$5.120, partindo de R$100', derrota: '6ª derrota', stake: 'R$6.400', contexto: 'Ultrapassa o limite máximo de muitas casas brasileiras.' },
          ].map((c, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(248,113,113,0.03)', border: '1px solid rgba(248,113,113,0.12)' }}>
              <p className="font-semibold text-xs mb-1" style={{ color: '#f87171' }}>{c.titulo}</p>
              <p className="text-xs mb-1" style={{ color: 'var(--text-1)' }}>{c.derrota}: <strong>{c.stake}</strong></p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>{c.contexto}</p>
            </div>
          ))}
        </div>
        <p>
          Quando o limite é atingido, o apostador está no pior momento possível: acumulou a maior perda da sessão e não pode executar o próximo passo do sistema. O resultado é sempre perda total do acumulado, sem possibilidade de recuperação pela estratégia.
        </p>
      </section>

      <section>
        <SectionLabel>Comparação de sistemas</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Martingale e suas variantes: comparação honesta</h2>
        <p className="mb-5">
          Vários sistemas de progressão são apresentados como "versões melhoradas" do Martingale. Nenhum resolve o problema fundamental do EV negativo, mas alguns têm perfis de risco significativamente diferentes:
        </p>
        <VariantsComparisonTable />
        <p className="mt-4">
          A única linha verde na tabela é o Flat Betting — não porque seja um "sistema", mas precisamente porque recusa a ideia de progressão. Sem progressão, não há crescimento exponencial de risco. A proteção real vem de edge positivo, não de como o stake é distribuído.
        </p>
      </section>

      <section>
        <SectionLabel>O que usar no lugar</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Alternativas matematicamente superiores</h2>
        <p className="mb-5">
          A mudança de paradigma é simples: em vez de tentar recuperar perdas de apostas com EV negativo, construa um processo onde o EV é positivo. Isso muda toda a estrutura:
        </p>
        <div className="space-y-3">
          {[
            {
              titulo: 'Kelly Criterion — para apostadores com estimativas de probabilidade',
              desc: 'Aposta o percentual da banca proporcional ao edge positivo real. Cresce a banca geometricamente quando o edge existe e se realiza. Não recupera perdas passadas — constrói crescimento futuro. Use a',
              link: { to: '/calculadoras/gestao-banca', label: 'Calculadora de Gestão de Banca' },
              tone: 'green',
            },
            {
              titulo: 'Flat Betting — para todos os perfis',
              desc: 'Stake fixo como percentual da banca (1-3%). Sem progressão, sem risco exponencial. Protege naturalmente contra sequências longas de perdas. A única variável que importa é encontrar value bets consistentes. Veja o guia em',
              link: { to: '/calculadoras/gestao-banca', label: 'Gestão de Banca' },
              tone: 'cyan',
            },
            {
              titulo: 'Value Bets — a base de qualquer estratégia sustentável',
              desc: 'Qualquer sistema de stake é neutro sem edge positivo. A prioridade é identificar apostas com probabilidade real acima da implícita na odd. Use a',
              link: { to: '/calculadoras/odds', label: 'Calculadora de Odds' },
              tone: 'violet',
            },
          ].map((a, i) => (
            <InfoCard key={i} tone={a.tone} title={a.titulo}>
              <p className="text-xs leading-relaxed">
                {a.desc}{' '}
                {a.link && (
                  <Link to={a.link.to} className="font-medium" style={{ color: a.tone === 'green' ? '#4ade80' : a.tone === 'cyan' ? '#22d3ee' : '#818cf8' }}>
                    {a.link.label} →
                  </Link>
                )}
              </p>
            </InfoCard>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Jogo responsável</SectionLabel>
        <InfoCard tone="neutral">
          <p className="text-xs leading-relaxed mb-2">
            <strong style={{ color: 'var(--text-1)' }}>Jogo responsável:</strong> sistemas de recuperação de perdas como o Martingale aumentam a exposição financeira em momentos de sequência negativa — exatamente quando a pressão emocional é maior e as decisões menos racionais. Se você percebe que está aumentando apostas para "recuperar o que perdeu", isso é um sinal de alerta. Estabeleça limites de perda por sessão antes de apostar e respeite-os rigidamente, independente do estado emocional.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            Apoio gratuito: <strong style={{ color: 'var(--text-2)' }}>0800 722 2764</strong> (JISA — Jogo Responsável)
          </p>
        </InfoCard>
      </section>

    </article>
  );
}

export default function Martingale() {
  const [stakeInicial, setStakeInicial] = useState('');
  const [rodadas, setRodadas] = useState('8');
  const [banca, setBanca] = useState('');

  const s = parseFloat(stakeInicial);
  const r = Math.min(parseInt(rodadas) || 1, 20);
  const b = parseFloat(banca);
  const valid = s > 0 && r >= 1;

  const rows = valid ? Array.from({ length: r }, (_, i) => {
    const stake = s * Math.pow(2, i);
    const acumulado = s * (Math.pow(2, i + 1) - 1);
    const percBanca = b > 0 ? (acumulado / b) * 100 : null;
    return { rodada: i + 1, stake, acumulado, lucro: s, percBanca };
  }) : [];

  const maxRisco = rows[rows.length - 1]?.acumulado ?? 0;
  const proxStake = valid ? s * Math.pow(2, r) : 0;
  const bancaEsgotadaIdx = b > 0 ? rows.findIndex(row => row.acumulado > b) : -1;

  return (
    <CalcLayout
      title="Calculadora de Martingale"
      description="Simule a estratégia Martingale e visualize o crescimento exponencial do risco após derrotas consecutivas. Calculadora educativa com análise matemática dos perigos de qualquer sistema de progressão."
      slug="martingale"
      faqs={faqs}
      schema={schema}
      explanation={<MartingaleExplanation />}
    >
      <div className="space-y-6">

        {/* Warning */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)' }}
        >
          <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold" style={{ background: 'rgba(248,113,113,0.2)', color: '#f87171' }}>!</span>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Calculadora exclusivamente educativa. O CalculaBet <strong style={{ color: '#f87171' }}>não recomenda</strong> o uso do Martingale como estratégia de apostas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="mart-stake">Stake inicial (R$)</label>
            <input
              id="mart-stake"
              type="number"
              inputMode="decimal"
              className="input-field"
              placeholder="ex: 10"
              min="1"
              value={stakeInicial}
              onChange={e => setStakeInicial(e.target.value)}
              aria-label="Stake inicial para simulação do Martingale"
            />
          </div>
          <div>
            <label className="label" htmlFor="mart-banca">
              Banca disponível (R$) <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>— opcional</span>
            </label>
            <input
              id="mart-banca"
              type="number"
              inputMode="decimal"
              className="input-field"
              placeholder="ex: 500"
              min="0"
              value={banca}
              onChange={e => setBanca(e.target.value)}
              aria-label="Banca total disponível (opcional)"
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="mart-rodadas">
            Derrotas consecutivas a simular: <strong style={{ color: '#22d3ee' }}>{r}</strong>
          </label>
          <input
            id="mart-rodadas"
            type="range"
            min="1"
            max="20"
            value={rodadas}
            onChange={e => setRodadas(e.target.value)}
            className="w-full accent-cyan-400 mb-1"
            aria-label={`Número de derrotas consecutivas: ${r}`}
          />
          <div className="flex justify-between text-xs" style={{ color: 'var(--text-3)' }}>
            <span>1 derrota</span><span>10</span><span>20 derrotas</span>
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {valid ? (
            <>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="result-box">
                  <p className="result-value" style={{ color: '#f87171' }}>
                    R${maxRisco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="result-label">Risco total acumulado</p>
                </div>
                <div className="result-box">
                  <p className="result-value" style={{ color: '#4ade80' }}>R${s.toFixed(2)}</p>
                  <p className="result-label">Lucro se ganhar (sempre fixo)</p>
                </div>
              </div>

              {bancaEsgotadaIdx >= 0 && (
                <div
                  className="flex items-start gap-3 px-4 py-3 rounded-xl mb-3"
                  style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)' }}
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold" style={{ background: 'rgba(248,113,113,0.25)', color: '#f87171' }}>!</span>
                  <p className="text-xs leading-relaxed" style={{ color: '#f87171' }}>
                    Com banca de R${b.toLocaleString('pt-BR')}, sua banca seria esgotada na <strong>{bancaEsgotadaIdx + 1}ª derrota</strong> — antes de completar as {r} rodadas simuladas.
                  </p>
                </div>
              )}

              <div className="rounded-xl overflow-hidden mb-3" style={{ border: '1px solid var(--border)' }}>
                <div
                  className="grid grid-cols-4 px-4 py-2.5"
                  style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}
                >
                  {['Derrota', 'Stake', 'Total arriscado', 'Lucro se ganhar'].map((h, i) => (
                    <p key={h} className={`text-xs font-semibold ${i > 0 ? 'text-right' : ''}`} style={{ color: 'var(--text-3)' }}>{h}</p>
                  ))}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {rows.map((row, i) => {
                    const warning = i >= 6;
                    const esgotada = b > 0 && row.acumulado > b;
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-4 px-4 py-3"
                        style={{
                          borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                          background: esgotada ? 'rgba(248,113,113,0.08)' : warning ? 'rgba(248,113,113,0.02)' : 'transparent',
                        }}
                      >
                        <p className="text-xs font-medium" style={{ color: esgotada ? '#f87171' : warning ? '#fbbf24' : 'var(--text-2)' }}>
                          {row.rodada}ª{esgotada ? ' — esgotada' : ''}
                        </p>
                        <p className="text-xs text-right font-semibold tabular-nums" style={{ color: esgotada ? '#f87171' : 'var(--text-1)' }}>
                          R${row.stake.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-right tabular-nums" style={{ color: esgotada ? '#f87171' : warning ? '#fbbf24' : 'var(--text-2)' }}>
                          R${row.acumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          {row.percBanca !== null && (
                            <span className="ml-1" style={{ color: 'var(--text-3)' }}>({row.percBanca.toFixed(0)}%)</span>
                          )}
                        </p>
                        <p className="text-xs text-right tabular-nums" style={{ color: '#4ade80' }}>
                          R${row.lucro.toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="rounded-xl px-4 py-3 text-xs leading-relaxed"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
              >
                Após {r} derrotas consecutivas, a {r + 1}ª aposta seria{' '}
                <strong style={{ color: '#f87171' }}>R${proxStake.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>{' '}
                para lucrar <strong style={{ color: '#4ade80' }}>R${s.toFixed(2)}</strong>.{' '}
                ROI do risco total acumulado: <strong>{(s / maxRisco * 100).toFixed(3)}%</strong>.
              </div>
            </>
          ) : (
            <div
              className="rounded-xl flex items-center justify-center py-8"
              style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-3)' }}>Informe o stake inicial para simular o Martingale</p>
            </div>
          )}
        </div>

      </div>
    </CalcLayout>
  );
}
