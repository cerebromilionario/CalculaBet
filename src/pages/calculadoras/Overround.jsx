import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

// ─── FAQ ────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'O que é margem da casa em apostas?',
    a: 'A margem da casa é a diferença embutida nas odds para garantir vantagem à plataforma. As casas ajustam as cotações de modo que a soma das probabilidades implícitas de todos os resultados ultrapasse 100%. Essa diferença é a margem e representa, em teoria, a parte retida pela casa antes de qualquer pagamento.',
  },
  {
    q: 'O que é overround?',
    a: 'Overround é a soma das probabilidades implícitas de todos os resultados de um mercado. Em um mercado matematicamente justo, essa soma seria exatamente 100%. Quando ultrapassa 100%, o excedente é a margem embutida pelas casas. Por exemplo, se a soma das probabilidades for 105,26%, o overround é 5,26%.',
  },
  {
    q: 'Como calcular a margem da casa pelas odds?',
    a: 'Converta cada odd em probabilidade implícita dividindo 1 pela odd. Por exemplo, odd 1.90 gera 1 ÷ 1.90 = 52,63%. Some todas as probabilidades implícitas dos resultados do mercado. O total acima de 100% é a margem da casa. Se a soma for 105,26%, a margem é 5,26%.',
  },
  {
    q: 'O que significa payout em apostas?',
    a: 'Payout teórico é a proporção do dinheiro apostado que, em teoria, seria devolvida aos apostadores ao longo do tempo. Calcula-se dividindo 1 pela soma das probabilidades implícitas. Se o overround for 105,26%, o payout é 1 ÷ 1,0526 ≈ 94,99%, ou seja, a casa reteria em teoria 5,01% do volume total apostado.',
  },
  {
    q: 'O que são odds justas?',
    a: 'Odds justas são as cotações estimadas sem a margem da casa embutida. Para calculá-las, normaliza-se a probabilidade implícita de cada resultado dividindo-a pela soma total das probabilidades. Depois inverte-se o resultado. Elas representam o preço que existiria em um mercado sem margem, útil para comparação teórica.',
  },
  {
    q: 'Margem menor significa aposta melhor?',
    a: 'Não necessariamente. Margem menor indica que o mercado tende a ser mais competitivo ou que a plataforma está operando com menor vantagem embutida. Mas isso não garante que uma aposta específica tenha valor. É preciso avaliar a probabilidade real do evento, o contexto e outros fatores além da margem.',
  },
  {
    q: 'A calculadora de overround garante lucro?',
    a: 'Não. A calculadora exibe informações matemáticas com base nas odds informadas. Ela não prevê resultados, não recomenda apostas e não garante qualquer retorno. O objetivo é educativo: entender como as casas precificam mercados e como comparar odds de forma objetiva.',
  },
  {
    q: 'Como calcular overround em mercado de 2 resultados?',
    a: 'Some as probabilidades implícitas dos dois resultados. Por exemplo, odds 1.90 e 1.90: (1 ÷ 1.90) + (1 ÷ 1.90) = 52,63% + 52,63% = 105,26%. O overround é 5,26%, e o payout teórico é 1 ÷ 1,0526 ≈ 94,99%.',
  },
  {
    q: 'Como calcular overround em futebol 1X2?',
    a: 'Em futebol 1X2 há três resultados: vitória em casa, empate e vitória fora. Some as probabilidades implícitas dos três. Por exemplo, odds 2.10, 3.40 e 3.60: (1÷2.10) + (1÷3.40) + (1÷3.60) = 47,62% + 29,41% + 27,78% = 104,81%. Margem: 4,81%.',
  },
  {
    q: 'Qual a relação entre overround e probabilidade implícita?',
    a: 'A probabilidade implícita de cada odd é calculada como 1 dividido pela odd. O overround é a soma de todas essas probabilidades implícitas. Em um mercado sem margem, essa soma seria 100%. Qualquer valor acima de 100% indica a presença de margem embutida.',
  },
  {
    q: 'Posso usar essa calculadora para qualquer esporte?',
    a: 'Sim. A calculadora funciona com qualquer mercado que utilize odds decimais, independentemente do esporte ou tipo de evento. Basta inserir todas as odds dos resultados possíveis do mercado analisado. Funciona para futebol, tênis, basquete, e-sports e qualquer outro mercado.',
  },
  {
    q: 'Overround é a mesma coisa que taxa da casa?',
    a: 'São conceitos próximos, mas não idênticos. O overround é a soma das probabilidades implícitas acima de 100%, calculado diretamente pelas odds. A margem efetiva da casa pode variar conforme o volume de apostas em cada resultado. O overround é uma estimativa teórica baseada nas odds publicadas.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ContentCard({ children }) {
  return (
    <section
      className="rounded-2xl p-5 md:p-6"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}
    >
      {children}
    </section>
  );
}

function InfoNote({ children, tone = 'cyan' }) {
  const tones = {
    cyan:  { bg: 'rgba(34,211,238,0.07)',  border: 'rgba(34,211,238,0.18)',  color: '#22d3ee', icon: 'ℹ️' },
    amber: { bg: 'rgba(251,191,36,0.07)',  border: 'rgba(251,191,36,0.2)',   color: '#fbbf24', icon: '⚠️' },
    green: { bg: 'rgba(34,197,94,0.07)',   border: 'rgba(34,197,94,0.18)',   color: '#4ade80', icon: '✓'  },
  };
  const s = tones[tone];
  return (
    <div className="flex gap-3 rounded-2xl p-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <span className="mt-0.5 text-sm flex-shrink-0" aria-hidden="true" style={{ color: s.color }}>{s.icon}</span>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</p>
    </div>
  );
}

// ─── SEO Explanation ─────────────────────────────────────────────────────────

function Explanation() {
  const t = { color: 'var(--text-2)' };
  const h = { color: 'var(--text-1)' };
  const muted = { color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' };

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <span className="badge badge-cyan">Guia educativo</span>
        <h2 className="section-title">Margem da casa e overround: como as odds são precificadas</h2>
        <p className="text-base leading-relaxed" style={t}>
          A calculadora de margem da casa do CalculaBet foi criada para quem deseja entender como as odds são construídas, comparar mercados de forma objetiva e aprender a identificar a margem embutida nas cotações. Ela é uma ferramenta educativa — não prevê resultados nem recomenda apostas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          ['Para que serve', 'Calcular e comparar a margem embutida nas odds de um mercado de apostas.'],
          ['O que entrega', 'Overround, payout teórico, probabilidades implícitas e odds justas por resultado.'],
          ['Para quem', 'Iniciantes que querem aprender probabilidade implícita e usuários que desejam comparar precificações.'],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold mb-2" style={muted}>{title}</p>
            <p className="text-sm leading-relaxed" style={t}>{body}</p>
          </div>
        ))}
      </div>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é margem da casa em apostas?</h2>
        <div className="space-y-3 text-sm leading-relaxed" style={t}>
          <p>
            A margem da casa é a diferença embutida nas odds que garante uma vantagem matemática à plataforma de apostas. Ao contrário de taxas visíveis, ela não é cobrada separadamente: está incorporada diretamente nas cotações publicadas.
          </p>
          <p>
            Em teoria, se um mercado fosse completamente justo, a soma das probabilidades implícitas de todos os resultados seria exatamente 100%. Na prática, as casas ajustam as odds para que essa soma ultrapasse 100%. O excedente é a margem.
          </p>
          <InfoNote>
            Margem não é taxa visível. Ela está embutida nas odds e só pode ser identificada ao calcular a probabilidade implícita de cada resultado e somar os valores.
          </InfoNote>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é overround?</h2>
        <div className="space-y-3 text-sm leading-relaxed" style={t}>
          <p>
            Overround é o nome técnico para a soma das probabilidades implícitas de todos os resultados de um mercado. Em um mercado sem margem, esse valor seria exatamente 1 (ou 100%). Quando ultrapassa 1, a diferença é a margem.
          </p>
          <p>
            Exemplo direto: odds de 1.90 para dois resultados de um mercado geram probabilidades implícitas de 52,63% cada. A soma é 105,26%. O overround é 5,26% — a margem embutida naquele mercado.
          </p>
          <div className="rounded-2xl p-5 overflow-x-auto" style={{ background: '#070711', border: '1px solid var(--border-md)' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-3)' }}>Fórmula</p>
            <code className="text-sm" style={{ color: '#22d3ee' }}>Overround = (1 ÷ odd₁) + (1 ÷ odd₂) + ... + (1 ÷ oddₙ)</code>
            <br />
            <code className="text-sm mt-2 block" style={{ color: '#818cf8' }}>Margem = Overround − 1  (ou em %: Overround% − 100%)</code>
          </div>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como calcular overround passo a passo</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <ol className="space-y-3 list-none">
            {[
              ['1', 'Reúna todas as odds decimais do mercado que deseja analisar.'],
              ['2', 'Para cada odd, calcule a probabilidade implícita: divida 1 pela odd.'],
              ['3', 'Some todas as probabilidades implícitas.'],
              ['4', 'Subtraia 100% do total. O resultado é a margem da casa.'],
              ['5', 'Para o payout, divida 1 pelo total de probabilidades (como decimal).'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(34,211,238,0.12)', color: '#22d3ee' }}>{n}</span>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl p-5" style={{ background: '#070711', border: '1px solid var(--border-md)' }}>
            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)' }}>Exemplo resolvido — Tênis (2 resultados)</p>
            <div className="space-y-1 text-xs" style={{ color: 'var(--text-2)' }}>
              <p>Odd A: 1.90 → 1 ÷ 1.90 = 52,63%</p>
              <p>Odd B: 1.90 → 1 ÷ 1.90 = 52,63%</p>
              <p style={{ color: 'var(--text-1)' }}>Soma: 105,26%</p>
              <p style={{ color: '#22d3ee' }}>Margem: 5,26%</p>
              <p style={{ color: '#4ade80' }}>Payout: 1 ÷ 1,0526 ≈ 94,99%</p>
            </div>
          </div>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é payout teórico?</h2>
        <div className="space-y-3 text-sm leading-relaxed" style={t}>
          <p>
            O payout teórico representa a proporção que, em teoria, seria devolvida ao conjunto de apostadores ao longo do tempo. É calculado como o inverso da soma das probabilidades implícitas.
          </p>
          <div className="rounded-2xl p-5 overflow-x-auto" style={{ background: '#070711', border: '1px solid var(--border-md)' }}>
            <code className="text-sm" style={{ color: '#4ade80' }}>Payout = 1 ÷ Soma das probabilidades implícitas</code>
          </div>
          <p>
            Se a soma das probabilidades for 105,26% (ou 1,0526), o payout é 1 ÷ 1,0526 ≈ 94,99%. Isso significa que, teoricamente, a casa reteria cerca de 5,01% do volume apostado naquele mercado.
          </p>
          <InfoNote tone="amber">
            O payout é teórico e calculado pelas odds publicadas. Na prática, os pagamentos dependem do volume apostado em cada resultado, de regras específicas do mercado e de outros fatores operacionais.
          </InfoNote>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que são odds justas?</h2>
        <div className="space-y-3 text-sm leading-relaxed" style={t}>
          <p>
            Odds justas são cotações estimadas sem a margem embutida. Para calculá-las, normaliza-se a probabilidade implícita de cada resultado dividindo-a pela soma total das probabilidades. Em seguida, inverte-se o valor para obter a odd equivalente.
          </p>
          <div className="rounded-2xl p-5 overflow-x-auto" style={{ background: '#070711', border: '1px solid var(--border-md)' }}>
            <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>Para cada resultado:</p>
            <code className="text-sm block" style={{ color: '#818cf8' }}>Probabilidade normalizada = Prob. implícita ÷ Soma total</code>
            <code className="text-sm block mt-1" style={{ color: '#818cf8' }}>Odd justa = 1 ÷ Probabilidade normalizada</code>
          </div>
          <p>
            As odds justas são úteis como referência para entender o preço teórico do mercado sem a margem. Elas não garantem que uma aposta tenha valor nem que os resultados sejam igualmente prováveis.
          </p>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como usar a calculadora de margem da casa</h2>
        <ol className="space-y-3 list-none">
          {[
            ['1', 'Insira todas as odds decimais do mercado que deseja analisar.'],
            ['2', 'Adicione ou remova resultados conforme o mercado (2 para tênis, 3 para futebol 1X2, etc.).'],
            ['3', 'Opcionalmente, dê um nome a cada resultado para facilitar a leitura.'],
            ['4', 'Clique em "Calcular margem".'],
            ['5', 'Veja a margem, payout, probabilidades implícitas e odds justas.'],
            ['6', 'Compare o resultado com outros mercados, se desejar.'],
          ].map(([n, text]) => (
            <li key={n} className="flex gap-3 text-sm" style={{ color: 'var(--text-2)' }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80' }}>{n}</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Margem menor significa aposta melhor?</h2>
        <div className="space-y-3 text-sm leading-relaxed" style={t}>
          <p>
            Não necessariamente. Uma margem menor pode indicar que o mercado está sendo precificado de forma mais competitiva, mas isso não implica que uma aposta específica tenha valor positivo esperado.
          </p>
          <p>
            Para avaliar se uma aposta tem valor, é preciso comparar a probabilidade implícita da odd com a probabilidade real estimada do evento. Margem não substitui essa análise.
          </p>
          <InfoNote tone="green">
            Margem é uma métrica do mercado como um todo, não de uma seleção específica. Mercados com margem baixa tendem a ter odds mais próximas do valor justo, mas isso não garante valor em nenhuma aposta individual.
          </InfoNote>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Margem da casa, probabilidade implícita e value bet</h2>
        <div className="space-y-3 text-sm leading-relaxed" style={t}>
          <p>
            Entender a margem da casa ajuda a contextualizar outros conceitos matemáticos de apostas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              ['Probabilidade implícita', 'É a probabilidade embutida na odd (1 ÷ odd). Inclui a margem da casa.'],
              ['Odds justas', 'São as odds sem margem, calculadas ao normalizar as probabilidades implícitas.'],
              ['Value bet', 'Ocorre quando a probabilidade real de um evento é maior que a probabilidade implícita da odd, indicando que a odd está acima do valor justo.'],
              ['EV (Valor Esperado)', 'É o retorno médio esperado de uma aposta. Positivo quando a probabilidade real supera a implícita.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <p className="font-semibold text-xs mb-1.5" style={h}>{title}</p>
                <p className="text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p>
            A calculadora de margem da casa é o ponto de partida para entender esses conceitos. Use as ferramentas relacionadas abaixo para aprofundar a análise.
          </p>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Cuidados ao interpretar a margem da casa</h2>
        <div className="space-y-3 text-sm leading-relaxed" style={t}>
          <ul className="space-y-2">
            {[
              'Odds mudam constantemente. A margem calculada reflete apenas as odds no momento da consulta.',
              'Mercados diferentes têm margens diferentes. Comparar mercados distintos pode ser enganoso.',
              'A margem não prevê resultados. Um mercado com margem baixa não é mais previsível.',
              'Regras específicas de cada mercado (void, cancelamento, tempo regular vs. prorrogação) afetam o resultado real.',
              'Apostas envolvem risco financeiro. Use esta calculadora apenas para estudo e análise matemática.',
            ].map(text => (
              <li key={text} className="flex gap-2.5">
                <span className="mt-1 flex-shrink-0" style={{ color: '#fbbf24' }}>·</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <InfoNote tone="amber">
            Conteúdo para maiores de 18 anos. Apostas envolvem risco financeiro real. O CalculaBet é uma plataforma educacional — não é uma casa de apostas e não realiza apostas em nome de ninguém.
          </InfoNote>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Ferramentas relacionadas</h2>
        <p className="text-sm leading-relaxed mb-4" style={t}>
          A análise de margem fica mais completa ao combinar com outras ferramentas do CalculaBet.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            ['/calculadoras/conversor-odds', 'Conversor de Odds', 'Converta odds decimais, americanas e fracionárias e veja a probabilidade implícita de cada formato.'],
            ['/calculadoras/odds', 'Calculadora de Odds', 'Calcule retorno, lucro e ROI de uma aposta individual com base na odd e no valor apostado.'],
            ['/calculadoras/arbitragem', 'Calculadora de Arbitragem', 'Veja se um conjunto de odds cobre todos os resultados com margem matemática positiva.'],
            ['/calculadoras/gestao-banca', 'Gestão de Banca', 'Aprenda a calcular o tamanho ideal de stake usando Kelly Criterion ou percentual fixo.'],
          ].map(([to, title, body]) => (
            <Link key={to} to={to} className="rounded-2xl p-4 transition-all" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
              <p className="text-sm font-semibold mb-1" style={h}>{title} →</p>
              <p className="text-xs leading-relaxed" style={t}>{body}</p>
            </Link>
          ))}
        </div>
      </ContentCard>
    </article>
  );
}

// ─── Examples ────────────────────────────────────────────────────────────────

const EXEMPLOS = {
  dois: [
    { nome: 'Resultado A', odd: '1.90' },
    { nome: 'Resultado B', odd: '1.90' },
  ],
  tres: [
    { nome: 'Casa', odd: '2.10' },
    { nome: 'Empate', odd: '3.40' },
    { nome: 'Fora', odd: '3.60' },
  ],
  multi: [
    { nome: 'Time A', odd: '2.50' },
    { nome: 'Time B', odd: '3.00' },
    { nome: 'Time C', odd: '3.20' },
    { nome: 'Time D', odd: '4.50' },
    { nome: 'Time E', odd: '8.00' },
  ],
};

// ─── Main Calculator ──────────────────────────────────────────────────────────

function parseOdd(v) {
  if (typeof v === 'string') v = v.replace(',', '.');
  return parseFloat(v);
}

function interpretarMargem(margem) {
  if (margem <= 0) {
    return {
      cor: '#22d3ee',
      texto: 'Este mercado não apresenta margem positiva aparente com as odds informadas. Verifique se as odds estão corretas, pois isso pode indicar erro ou situação incomum.',
    };
  }
  if (margem <= 3) {
    return {
      cor: '#4ade80',
      texto: 'Margem baixa. Em geral, mercados com margem menor tendem a ser mais competitivos, mas isso não garante valor em nenhuma aposta específica.',
    };
  }
  if (margem <= 8) {
    return {
      cor: '#fbbf24',
      texto: 'Margem moderada. Esse intervalo é comum em muitos mercados de apostas esportivas.',
    };
  }
  return {
    cor: '#f87171',
    texto: 'Margem alta. Quanto maior a margem, menor tende a ser o payout teórico para o apostador.',
  };
}

export default function Overround() {
  const [resultados, setResultados] = useState([
    { nome: '', odd: '' },
    { nome: '', odd: '' },
  ]);
  const [calculado, setCalculado] = useState(false);
  const [erro, setErro] = useState('');

  const atualizar = (i, campo, valor) => {
    const nova = [...resultados];
    nova[i] = { ...nova[i], [campo]: valor };
    setResultados(nova);
    setCalculado(false);
    setErro('');
  };

  const adicionar = () => {
    setResultados([...resultados, { nome: '', odd: '' }]);
    setCalculado(false);
  };

  const remover = (i) => {
    if (resultados.length <= 2) return;
    setResultados(resultados.filter((_, idx) => idx !== i));
    setCalculado(false);
  };

  const carregarExemplo = (tipo) => {
    setResultados(EXEMPLOS[tipo].map(r => ({ ...r })));
    setCalculado(false);
    setErro('');
  };

  const limpar = () => {
    setResultados([{ nome: '', odd: '' }, { nome: '', odd: '' }]);
    setCalculado(false);
    setErro('');
  };

  const calcular = () => {
    for (let i = 0; i < resultados.length; i++) {
      const v = parseOdd(resultados[i].odd);
      if (!resultados[i].odd || isNaN(v) || v <= 1) {
        setErro(`Resultado ${i + 1}: insira uma odd decimal válida maior que 1.00.`);
        setCalculado(false);
        return;
      }
    }
    setErro('');
    setCalculado(true);
  };

  // Calcular resultados
  const oddsN = resultados.map(r => parseOdd(r.odd));
  const allValid = oddsN.every(o => !isNaN(o) && o > 1);

  let soma = 0, overroundPct = 0, payout = 0, payoutPct = 0;
  let linhas = [];

  if (calculado && allValid) {
    soma = oddsN.reduce((acc, o) => acc + 1 / o, 0);
    overroundPct = (soma - 1) * 100;
    payout = 1 / soma;
    payoutPct = payout * 100;

    linhas = resultados.map((r, i) => {
      const odd = oddsN[i];
      const probImpl = (1 / odd) * 100;
      const probNorm = probImpl / (soma * 100) * 100;
      const oddJusta = 1 / (probNorm / 100);
      return {
        nome: r.nome || `Resultado ${i + 1}`,
        odd,
        probImpl,
        probNorm,
        oddJusta,
      };
    });
  }

  const interpretacao = calculado && allValid ? interpretarMargem(overroundPct) : null;

  return (
    <CalcLayout
      title="Calculadora de Margem da Casa / Overround"
      description="Calcule a margem da casa, overround, payout teórico, probabilidades implícitas e odds justas de qualquer mercado de apostas. Ferramenta educativa gratuita."
      slug="overround"
      faqs={faqs}
      schema={faqSchema}
      explanation={<Explanation />}
    >
      <div className="space-y-6">

        {/* Instrução */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Como preencher</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Insira as odds decimais de todos os resultados do mercado. Para futebol 1X2, use 3 resultados. Para tênis ou over/under, use 2. Você pode adicionar quantos resultados precisar.
          </p>
        </div>

        {/* Exemplos rápidos */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs self-center" style={{ color: 'var(--text-3)' }}>Exemplos:</span>
          <button type="button" onClick={() => carregarExemplo('dois')} className="btn-ghost text-xs px-3 py-1.5">
            2 resultados (tênis)
          </button>
          <button type="button" onClick={() => carregarExemplo('tres')} className="btn-ghost text-xs px-3 py-1.5">
            3 resultados (1X2)
          </button>
          <button type="button" onClick={() => carregarExemplo('multi')} className="btn-ghost text-xs px-3 py-1.5">
            Múltiplos
          </button>
        </div>

        {/* Linhas de resultados */}
        <div className="space-y-3">
          {resultados.map((r, i) => (
            <div key={i} className="flex items-end gap-2 sm:gap-3">
              {/* Nome */}
              <div className="flex-1 min-w-0">
                <label className="label" htmlFor={`nome-${i}`}>
                  {i === 0 ? 'Resultado (nome opcional)' : `Resultado ${i + 1}`}
                </label>
                <input
                  id={`nome-${i}`}
                  type="text"
                  className="input-field"
                  placeholder={['Casa', 'Empate', 'Fora', 'Sim', 'Não', 'Over', 'Under'][i] ?? `Resultado ${i + 1}`}
                  value={r.nome}
                  onChange={e => atualizar(i, 'nome', e.target.value)}
                />
              </div>
              {/* Odd */}
              <div style={{ width: '120px', flexShrink: 0 }}>
                <label className="label" htmlFor={`odd-${i}`}>Odd decimal</label>
                <input
                  id={`odd-${i}`}
                  type="text"
                  inputMode="decimal"
                  className="input-field"
                  placeholder="1.90"
                  value={r.odd}
                  onChange={e => atualizar(i, 'odd', e.target.value)}
                />
              </div>
              {/* Remover */}
              {resultados.length > 2 && (
                <button
                  type="button"
                  aria-label={`Remover resultado ${i + 1}`}
                  onClick={() => remover(i)}
                  className="mb-px p-2.5 rounded-xl transition-colors flex-shrink-0"
                  style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Adicionar resultado */}
        <button
          type="button"
          onClick={adicionar}
          className="text-xs font-medium flex items-center gap-1.5 transition-colors"
          style={{ color: 'var(--cyan)' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar resultado
        </button>

        {/* Erro */}
        {erro && (
          <p className="text-sm rounded-xl px-4 py-3" style={{ color: '#f87171', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.18)' }}>
            {erro}
          </p>
        )}

        {/* Botões de ação */}
        <div className="flex gap-3 flex-wrap">
          <button type="button" onClick={calcular} className="btn-primary flex-1 sm:flex-none">
            Calcular margem
          </button>
          <button type="button" onClick={limpar} className="btn-ghost text-xs px-4 py-2">
            Limpar
          </button>
        </div>

        {/* Resultados */}
        {calculado && allValid && (
          <div className="space-y-4" aria-live="polite">

            {/* Resumo do mercado */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="result-box col-span-1">
                <p className="result-value" style={{ color: interpretacao.cor }}>
                  {overroundPct.toFixed(2)}%
                </p>
                <p className="result-label">Margem da casa</p>
              </div>
              <div className="result-box col-span-1">
                <p className="result-value">{(soma * 100).toFixed(2)}%</p>
                <p className="result-label">Soma probabilidades</p>
              </div>
              <div className="result-box col-span-1">
                <p className="result-value" style={{ color: '#4ade80' }}>{payoutPct.toFixed(2)}%</p>
                <p className="result-label">Payout teórico</p>
              </div>
              <div className="result-box col-span-1">
                <p className="result-value" style={{ color: '#818cf8' }}>{resultados.length}</p>
                <p className="result-label">Resultados</p>
              </div>
            </div>

            {/* Interpretação */}
            <div className="rounded-xl px-4 py-3.5 flex gap-3" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${interpretacao.cor}30` }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: interpretacao.cor }}>●</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{interpretacao.texto}</p>
            </div>

            {/* Tabela por resultado */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {/* Cabeçalho */}
              <div
                className="hidden sm:grid text-xs font-semibold px-4 py-2.5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text-3)',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                  gap: '8px',
                }}
              >
                <span>Resultado</span>
                <span className="text-right">Odd</span>
                <span className="text-right">Prob. implícita</span>
                <span className="text-right">Prob. sem margem</span>
                <span className="text-right">Odd justa</span>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {linhas.map((l, i) => (
                  <div key={i}>
                    {/* Desktop row */}
                    <div
                      className="hidden sm:grid items-center px-4 py-3 text-sm"
                      style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '8px' }}
                    >
                      <span className="font-medium truncate" style={{ color: 'var(--text-1)' }}>{l.nome}</span>
                      <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{l.odd.toFixed(2)}</span>
                      <span className="text-right tabular-nums font-medium" style={{ color: 'var(--text-1)' }}>{l.probImpl.toFixed(2)}%</span>
                      <span className="text-right tabular-nums" style={{ color: '#22d3ee' }}>{l.probNorm.toFixed(2)}%</span>
                      <span className="text-right tabular-nums" style={{ color: '#818cf8' }}>{l.oddJusta.toFixed(2)}</span>
                    </div>

                    {/* Mobile card */}
                    <div className="sm:hidden px-4 py-3 space-y-2">
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-1)' }}>{l.nome}</p>
                      <div className="grid grid-cols-2 gap-y-1 text-xs">
                        <span style={{ color: 'var(--text-3)' }}>Odd informada</span>
                        <span className="text-right tabular-nums" style={{ color: 'var(--text-2)' }}>{l.odd.toFixed(2)}</span>
                        <span style={{ color: 'var(--text-3)' }}>Prob. implícita</span>
                        <span className="text-right tabular-nums font-medium" style={{ color: 'var(--text-1)' }}>{l.probImpl.toFixed(2)}%</span>
                        <span style={{ color: 'var(--text-3)' }}>Prob. sem margem</span>
                        <span className="text-right tabular-nums" style={{ color: '#22d3ee' }}>{l.probNorm.toFixed(2)}%</span>
                        <span style={{ color: 'var(--text-3)' }}>Odd justa</span>
                        <span className="text-right tabular-nums" style={{ color: '#818cf8' }}>{l.oddJusta.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Callout educativo */}
            <div className="rounded-xl px-4 py-3.5" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                <span style={{ color: '#fbbf24' }}>⚠ </span>
                O cálculo mostra a margem embutida nas odds informadas. Ele não prevê resultados, não garante vantagem e não é uma recomendação de aposta. +18.
              </p>
            </div>
          </div>
        )}

        {/* Links relacionados */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <Link to="/calculadoras/conversor-odds" className="btn-ghost text-xs px-3 py-2">Converter odds</Link>
          <Link to="/calculadoras/arbitragem" className="btn-ghost text-xs px-3 py-2">Calculadora de arbitragem</Link>
          <Link to="/calculadoras/gestao-banca" className="btn-ghost text-xs px-3 py-2">Gestão de banca</Link>
        </div>
      </div>
    </CalcLayout>
  );
}
