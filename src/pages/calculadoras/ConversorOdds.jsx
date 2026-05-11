import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function decimalToAmericana(d) {
  if (d >= 2) return `+${Math.round((d - 1) * 100)}`;
  return `${Math.round(-100 / (d - 1))}`;
}
function decimalToFrac(d) {
  const num = Math.round((d - 1) * 100);
  const den = 100;
  const g = gcd(num, den);
  return `${num / g}/${den / g}`;
}
function americanaToDecimal(a) {
  const v = parseFloat(a);
  if (v > 0) return 1 + v / 100;
  if (v < 0) return 1 - 100 / v;
  return null;
}

const TIPOS = [
  { id: 'decimal', label: 'Decimal', placeholder: '2.50', ex: 'Odd decimal (ex: 2.50)' },
  { id: 'americana', label: 'Americana', placeholder: '+150', ex: 'Odd americana (ex: +150 ou -120)' },
  { id: 'fraccionaria', label: 'Fracionária', placeholder: '3/2', ex: 'Odd fracionária (ex: 3/2 ou 5/4)' },
  { id: 'probabilidade', label: 'Probabilidade %', placeholder: '40', ex: 'Probabilidade implícita em % (ex: 40)' },
];

const EXEMPLOS = [
  { decimal: 1.50, label: 'Favorito forte' },
  { decimal: 2.00, label: 'Equilíbrio' },
  { decimal: 3.00, label: 'Azarão' },
  { decimal: 5.00, label: 'Grande azarão' },
];

const faqs = [
  {
    q: 'O que é odd decimal e como ler corretamente?',
    a: 'A odd decimal representa o retorno total por unidade apostada, incluindo a devolução do stake. Odd 2.50 significa que para cada R$1,00 apostado você recebe R$2,50 — ou seja, R$1,50 de lucro mais o R$1,00 original. É o formato padrão no Brasil, Europa e Oceania, adotado por todas as casas de apostas brasileiras. Para calcular o lucro: (odd − 1) × stake. Para calcular o retorno total: odd × stake.',
  },
  {
    q: 'Como funciona a odd americana (moneyline)?',
    a: 'A odd americana usa valores positivos e negativos. Um valor positivo (ex: +150) indica quanto você lucra para cada R$100 apostados — +150 significa lucro de R$150 com stake de R$100. Um valor negativo (ex: -120) indica quanto você precisa apostar para lucrar R$100 — -120 significa apostar R$120 para lucrar R$100. É o padrão nos EUA, usado em casas como DraftKings, FanDuel e em mercados de beisebol, basquete e futebol americano.',
  },
  {
    q: 'O que é odd fracionária e por que ela existe?',
    a: 'A odd fracionária surgiu nas corridas de cavalos do Reino Unido no século XIX e persiste como tradição britânica. Ela expressa apenas o lucro em relação ao stake: 3/2 significa "ganhe 3 para cada 2 apostados". Para converter para decimal, some 1 ao resultado da fração: 3/2 = 1,5 + 1 = 2,5. Odds como "evens" (1/1) equivalem a odd decimal 2.00. Embora rara no Brasil, ela aparece em transmissões de corridas e em algumas casas internacionais.',
  },
  {
    q: 'O que é probabilidade implícita de uma odd?',
    a: 'A probabilidade implícita é a chance de vitória que a odd representa, calculada como 1/odd × 100. Odd 2.00 implica 50%, odd 1.50 implica 66,7%, odd 4.00 implica 25%. Ela é crucial para identificar value bets: se você estima que um evento tem 55% de chance real, mas a odd implica apenas 50%, existe um edge positivo de 5%. A soma das probabilidades implícitas de todos os resultados de um mercado sempre ultrapassa 100% — a diferença é a margem da casa.',
  },
  {
    q: 'Como converter odd americana para decimal?',
    a: 'Americana positiva (+X): decimal = 1 + X/100. Exemplo: +150 → 1 + 1,50 = 2,50. Americana negativa (−X): decimal = 1 + 100/X. Exemplo: −120 → 1 + 100/120 = 1,833. A conversão inversa: se decimal ≥ 2,00, americana = +(decimal − 1) × 100. Se decimal < 2,00, americana = −100 ÷ (decimal − 1).',
  },
  {
    q: 'Como converter odd fracionária para decimal?',
    a: 'Fórmula: decimal = (numerador ÷ denominador) + 1. Exemplos: 3/2 → (3÷2) + 1 = 2,50 | 1/4 → (1÷4) + 1 = 1,25 | 5/1 → (5÷1) + 1 = 6,00 | 1/1 (evens) → 1 + 1 = 2,00. A conversão inversa: numerador/denominador = decimal − 1, simplificado pelo MDC.',
  },
  {
    q: 'Qual o formato de odds mais usado no Brasil?',
    a: 'O formato decimal é obrigatório em todas as plataformas de apostas licenciadas no Brasil, conforme regulamentação da Secretaria de Prêmios e Apostas. Odds americanas podem aparecer em mercados norte-americanos (NFL, NBA, MLB) em algumas plataformas. Odds fracionárias são raras no mercado nacional — surgem ocasionalmente em transmissões ao vivo de corridas britânicas.',
  },
  {
    q: 'O que é overround e como calcular a margem de uma casa?',
    a: 'Overround (ou vig/juice) é a margem de lucro da casa: a diferença entre 100% e a soma das probabilidades implícitas de todos os resultados de um mercado. Em um jogo com odds 2.10/3.40/3.60, as probabilidades implícitas são 47,6%/29,4%/27,8% = 104,8%. O overround é 4,8% — para cada R$100 apostados em média, a casa retorna R$95,20. Casas mais eficientes têm overround de 2-3%; casas locais/recreativas chegam a 8-12%.',
  },
  {
    q: 'O que é Closing Line Value (CLV) e por que importa?',
    a: 'Closing Line Value é a comparação entre a odd que você apostou e a odd de fechamento do mercado (momentos antes do evento). Se você apostou a 2.10 e o mercado fechou a 1.90, você bateu a linha de fechamento — isso é considerado um indicador confiável de edge real. Apostadores profissionais com CLV positivo consistente têm probabilidade estatisticamente significativa de lucro a longo prazo. É uma das métricas mais respeitadas na avaliação de habilidade em apostas.',
  },
  {
    q: 'Como identificar uma value bet usando probabilidade implícita?',
    a: 'Uma value bet existe quando sua probabilidade estimada do evento é maior que a probabilidade implícita da odd. Se você estima 60% de chance de vitória e a odd 2.00 implica 50%, o edge é +10%. O valor esperado (EV) por R$100 apostados é: (0,60 × R$100) − (0,40 × R$100) = +R$20 por aposta. Use a Calculadora de Odds para calcular o EV exato de qualquer aposta.',
  },
  {
    q: 'Por que as odds mudam antes do evento?',
    a: 'As odds se movem principalmente por dois motivos: volume de apostas em um lado (a casa ajusta para equilibrar o livro e garantir margem independente do resultado) e informação nova sobre o evento (escalação, lesões, condições climáticas). Odds que caem muito rapidamente geralmente refletem informação de apostadores experientes ("sharp money"). Acompanhar o movimento de odds pode indicar em qual direção o mercado está se posicionando.',
  },
  {
    q: 'Qual a diferença entre casas de apostas "sharp" e "soft"?',
    a: 'Casas "sharp" (como Pinnacle) aceitam apostas grandes de apostadores experientes e têm overround baixo (1-3%). Elas servem como referência de mercado eficiente. Casas "soft" têm margens maiores, limites menores para apostadores bem-sucedidos, mas costumam oferecer bônus e promoções. Para a maioria dos apostadores brasileiros, a estratégia ideal combina as duas: usar as odds da Pinnacle como referência de valor e apostar nas soft books quando a odd estiver acima dessa referência.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Conversor de Odds — CalculaBet',
      url: 'https://calculabet.com.br/calculadoras/conversor-odds',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      description: 'Converta odds entre decimal, americana (moneyline), fracionária e probabilidade implícita instantaneamente. Tabela de conversão, fórmulas e guia completo de formatos de odds.',
      featureList: [
        'Conversão instantânea entre 4 formatos de odds',
        'Cálculo de probabilidade implícita',
        'Exemplos rápidos pré-configurados',
        'Retorno e lucro calculados automaticamente',
        'Tabela de referência completa de conversão',
        'Fórmulas detalhadas para cada conversão',
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

function BookmakerTypesTable() {
  const rows = [
    { tipo: 'Sharp (ex: Pinnacle)', overround: '1–3%', limites: 'Altos', perfil: 'Referência de mercado', melhor: 'Value betting, CLV', cor: '#4ade80' },
    { tipo: 'Soft / Recreativa', overround: '5–10%', limites: 'Baixos para winners', perfil: 'Apostador casual', melhor: 'Bônus, promoções', cor: '#22d3ee' },
    { tipo: 'Exchange (Betfair)', overround: '0% (comissão)', limites: 'Limitado por liquidez', perfil: 'Qualquer perfil', melhor: 'Lay bets, hedge, arb', cor: '#818cf8' },
    { tipo: 'Cripto / Sem KYC', overround: '3–6%', limites: 'Variável', perfil: 'Anonimato, BTC', melhor: 'Mercados alternativos', cor: '#fbbf24' },
    { tipo: 'Pública (Brasil)', overround: '6–12%', limites: 'Padrão regulado', perfil: 'Mercado brasileiro', melhor: 'Acesso nacional, Pix', cor: 'var(--text-2)' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Tipo de casa', 'Overround típico', 'Limites', 'Perfil ideal', 'Melhor para'].map((h, i) => (
              <th key={i} className="text-left px-3 py-3 font-semibold whitespace-nowrap" style={{ color: 'var(--text-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-3 py-3 font-semibold" style={{ color: r.cor }}>{r.tipo}</td>
              <td className="px-3 py-3 font-mono font-semibold" style={{ color: i === 0 ? '#4ade80' : i >= 3 ? '#fbbf24' : 'var(--text-2)' }}>{r.overround}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-2)' }}>{r.limites}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-3)' }}>{r.perfil}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-2)' }}>{r.melhor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OddsMovementTable() {
  const rows = [
    { momento: 'Abertura (48h+ antes)', odds: '2.20 / 3.40 / 3.20', acao: 'Odds preliminares, menor volume', sinal: 'Oportunidade de value early' },
    { momento: '24h antes', odds: '2.15 / 3.50 / 3.30', acao: 'Volume aumenta, sharp money entra', sinal: 'Casa A favorita ganhando apostas' },
    { momento: '2h antes', odds: '2.00 / 3.60 / 3.80', acao: 'Escalação divulgada', sinal: 'Casa A muito favorita após notícia' },
    { momento: '30 min antes', odds: '1.90 / 3.80 / 4.20', acao: 'Pico de volume, mercado eficiente', sinal: 'Mercado convergindo — CLV alto se apostou antes' },
  ];
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
            {['Momento', 'Odds (Casa A / Emp. / Casa B)', 'O que está acontecendo', 'Sinal'].map((h, i) => (
              <th key={i} className="text-left px-3 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <td className="px-3 py-3 font-semibold whitespace-nowrap" style={{ color: 'var(--text-1)' }}>{r.momento}</td>
              <td className="px-3 py-3 font-mono" style={{ color: '#22d3ee' }}>{r.odds}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-2)' }}>{r.acao}</td>
              <td className="px-3 py-3" style={{ color: 'var(--text-3)' }}>{r.sinal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ConversorExplanation() {
  return (
    <article className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>

      <section>
        <SectionLabel>Os três formatos</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Decimal, americana, fracionária: a mesma informação em idiomas diferentes</h2>
        <p className="mb-5">
          Uma odd é, fundamentalmente, uma relação matemática entre risco e retorno. Os três formatos principais representam exatamente a mesma informação — o retorno potencial de uma aposta — mas em convenções que evoluíram independentemente em diferentes mercados e culturas de apostas. Saber converter entre eles é essencial para comparar odds de casas internacionais e aproveitar as melhores linhas disponíveis.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {[
            {
              titulo: 'Decimal',
              origem: 'Europa continental · Brasil',
              exemplo: '2.50',
              cor: '#22d3ee',
              desc: 'Retorno total incluindo o stake. O mais intuitivo: multiplique pelo stake e obtenha exatamente quanto recebe. Padrão no Brasil desde a regulamentação.',
              formula: 'Retorno = Stake × Odd\nLucro = Stake × (Odd − 1)',
            },
            {
              titulo: 'Americana (Moneyline)',
              origem: 'América do Norte',
              exemplo: '+150 / −120',
              cor: '#818cf8',
              desc: 'Valores positivos mostram lucro por R$100. Valores negativos mostram quanto apostar para lucrar R$100. Padrão em esportes americanos (NFL, NBA, MLB).',
              formula: '+X: lucro de R$X por R$100\n−X: aposte R$X para lucrar R$100',
            },
            {
              titulo: 'Fracionária',
              origem: 'Reino Unido · Irlanda',
              exemplo: '3/2',
              cor: '#4ade80',
              desc: 'Expressa apenas o lucro em relação ao stake. Surgiu nas corridas de cavalos britânicas no século XIX. Ainda comum em transmissões britânicas.',
              formula: 'Decimal = (num ÷ den) + 1\nEx: 3/2 → 1.5 + 1 = 2.50',
            },
          ].map((f, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${f.cor}20` }}>
              <p className="text-xs font-semibold mb-1" style={{ color: f.cor, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{f.titulo}</p>
              <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>{f.origem}</p>
              <p className="text-2xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>{f.exemplo}</p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--text-2)' }}>{f.desc}</p>
              <p className="font-mono text-xs px-3 py-2 rounded whitespace-pre-line" style={{ background: `${f.cor}10`, color: f.cor }}>{f.formula}</p>
            </div>
          ))}
        </div>
        <p>
          No Brasil, a Secretaria de Prêmios e Apostas (SPA) exige o uso de odds decimais em todas as plataformas licenciadas. No entanto, entender os outros formatos é útil para acompanhar mercados internacionais, comparar linhas em casas estrangeiras e interpretar conteúdo de apostadores norte-americanos e britânicos.
        </p>
      </section>

      <section>
        <SectionLabel>Tabela de referência</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Conversão rápida: os valores mais comuns em apostas</h2>
        <div className="overflow-x-auto rounded-xl mb-4" style={{ border: '1px solid var(--border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
                {['Decimal', 'Americana', 'Fracionária', 'Prob. implícita', 'Retorno R$100', 'Perfil'].map((h, i) => (
                  <th key={i} className="text-left px-3 py-3 font-semibold" style={{ color: 'var(--text-3)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { dec: '1.20', am: '−500', frac: '1/5', prob: '83.3%', ret: 'R$120', perf: 'Suprafavorito' },
                { dec: '1.50', am: '−200', frac: '1/2', prob: '66.7%', ret: 'R$150', perf: 'Favorito forte' },
                { dec: '1.80', am: '−125', frac: '4/5', prob: '55.6%', ret: 'R$180', perf: 'Favorito leve' },
                { dec: '2.00', am: '+100', frac: '1/1', prob: '50.0%', ret: 'R$200', perf: 'Equilíbrio (evens)' },
                { dec: '2.50', am: '+150', frac: '3/2', prob: '40.0%', ret: 'R$250', perf: 'Leve azarão' },
                { dec: '3.00', am: '+200', frac: '2/1', prob: '33.3%', ret: 'R$300', perf: 'Azarão' },
                { dec: '4.00', am: '+300', frac: '3/1', prob: '25.0%', ret: 'R$400', perf: 'Azarão forte' },
                { dec: '6.00', am: '+500', frac: '5/1', prob: '16.7%', ret: 'R$600', perf: 'Grande azarão' },
                { dec: '10.00', am: '+900', frac: '9/1', prob: '10.0%', ret: 'R$1.000', perf: 'Longshot' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="px-3 py-3 font-bold" style={{ color: '#22d3ee' }}>{row.dec}</td>
                  <td className="px-3 py-3 font-medium" style={{ color: '#818cf8' }}>{row.am}</td>
                  <td className="px-3 py-3" style={{ color: '#4ade80' }}>{row.frac}</td>
                  <td className="px-3 py-3" style={{ color: 'var(--text-2)' }}>{row.prob}</td>
                  <td className="px-3 py-3 font-semibold" style={{ color: 'var(--text-1)' }}>{row.ret}</td>
                  <td className="px-3 py-3" style={{ color: 'var(--text-3)' }}>{row.perf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionLabel>Fórmulas de conversão</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Todas as fórmulas passo a passo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              titulo: 'Decimal → Americana',
              passos: [
                'Se decimal ≥ 2.0 → +(decimal − 1) × 100',
                'Se decimal < 2.0 → −100 ÷ (decimal − 1)',
                'Ex: 2.50 → +(2.50−1)×100 = +150',
                'Ex: 1.50 → −100÷(1.50−1) = −200',
              ],
              cor: '#22d3ee',
            },
            {
              titulo: 'Americana → Decimal',
              passos: [
                'Se positiva (+X) → 1 + X ÷ 100',
                'Se negativa (−X) → 1 + 100 ÷ X',
                'Ex: +150 → 1 + 1.50 = 2.50',
                'Ex: −200 → 1 + 100÷200 = 1.50',
              ],
              cor: '#818cf8',
            },
            {
              titulo: 'Fracionária → Decimal',
              passos: [
                'decimal = (num ÷ den) + 1',
                'Ex: 3/2 → (3÷2) + 1 = 2.50',
                'Ex: 1/4 → (1÷4) + 1 = 1.25',
                'Ex: 1/1 (evens) → 1 + 1 = 2.00',
              ],
              cor: '#4ade80',
            },
            {
              titulo: 'Probabilidade → Decimal',
              passos: [
                'decimal = 100 ÷ probabilidade (%)',
                'Ex: 40% → 100÷40 = 2.50',
                'Ex: 66.7% → 100÷66.7 ≈ 1.50',
                'Ex: 25% → 100÷25 = 4.00',
              ],
              cor: '#fbbf24',
            },
          ].map((f, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${f.cor}20` }}>
              <p className="font-semibold text-sm mb-3" style={{ color: f.cor }}>{f.titulo}</p>
              <ul className="space-y-1.5">
                {f.passos.map((p, j) => (
                  <li key={j} className="font-mono text-xs" style={{ color: j < 2 ? 'var(--text-1)' : 'var(--text-3)' }}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>Probabilidade implícita e margem</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Overround: o custo invisível de apostar</h2>
        <p className="mb-4">
          Toda odd carrega embutida a margem de lucro da casa. Para enxergar essa margem, some as <strong style={{ color: 'var(--text-1)' }}>probabilidades implícitas</strong> de todos os resultados de um mercado. Em um jogo justo sem margem, a soma seria exatamente 100%. Na prática, sempre ultrapassa — e a diferença é o overround.
        </p>
        <InfoCard tone="cyan" title="Exemplo de cálculo de overround — jogo de futebol">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            {[
              { res: 'Casa A ganha', odd: '2.10', prob: '47.6%' },
              { res: 'Empate', odd: '3.40', prob: '29.4%' },
              { res: 'Casa B ganha', odd: '3.60', prob: '27.8%' },
            ].map((r, i) => (
              <div key={i} className="rounded-lg p-3" style={{ background: 'rgba(34,211,238,0.05)' }}>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>{r.res}</p>
                <p className="text-lg font-bold mt-1" style={{ color: '#22d3ee' }}>{r.odd}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>{r.prob}</p>
              </div>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            Soma: 47.6% + 29.4% + 27.8% = <strong style={{ color: '#fbbf24' }}>104.8%</strong> → Overround de <strong style={{ color: '#fbbf24' }}>4.8%</strong> → Para cada R$100 apostados, a casa retorna ~R$95,20 em média.
          </p>
        </InfoCard>
        <p className="mt-4">
          A <Link to="/calculadoras/odds" className="font-medium" style={{ color: '#22d3ee' }}>Calculadora de Odds</Link> calcula o EV de qualquer aposta individual. Para comparar a margem total de uma casa, some as probabilidades implícitas de um mercado completo usando este conversor para cada odd.
        </p>
      </section>

      <section>
        <SectionLabel>Tipos de casa de apostas</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Sharp, soft e exchange: qual usar e quando</h2>
        <p className="mb-5">
          Nem toda casa de apostas é igual em termos de eficiência, margem e tolerância ao apostador vencedor. Entender essas diferenças é tão importante quanto saber converter odds:
        </p>
        <BookmakerTypesTable />
        <p className="mt-4">
          A estratégia mais comum entre apostadores profissionais é usar a Pinnacle (ou Betfair exchange) como <strong style={{ color: 'var(--text-1)' }}>referência de mercado</strong> eficiente e apostar em casas soft quando a odd oferecida está acima da linha de referência. Essa prática — chamada de "line shopping" — é a base do apostador consistentemente lucrativo.
        </p>
      </section>

      <section>
        <SectionLabel>Movimento de odds</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Como as odds se movem e o que isso revela</h2>
        <p className="mb-4">
          As odds não são estáticas. Elas se movem desde a abertura do mercado até o momento do evento, refletindo o fluxo de apostas e a chegada de nova informação. Acompanhar esse movimento é uma fonte valiosa de inteligência sobre onde o "dinheiro inteligente" está posicionado:
        </p>
        <OddsMovementTable />
        <p className="mt-4 mb-4">
          O conceito de <strong style={{ color: 'var(--text-1)' }}>Closing Line Value (CLV)</strong> emerge diretamente do movimento de odds: se você apostou a 2.10 e o mercado fechou a 1.90, você obteve 10% a mais de valor que o mercado final considerava justo. Apostadores com CLV positivo consistente têm probabilidade estatisticamente significativa de serem lucrativos a longo prazo — independente dos resultados de curto prazo.
        </p>
        <p>
          Para maximizar o CLV, aposte assim que identificar uma odd com valor — não espere. Mercados se tornam mais eficientes com o tempo, e as melhores oportunidades costumam aparecer na abertura ou após eventos que ainda não foram totalmente precificados.
        </p>
      </section>

      <section>
        <SectionLabel>Usando o conversor para encontrar value</SectionLabel>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>Da conversão à identificação de value bets</h2>
        <p className="mb-5">
          O conversor de odds é mais do que uma ferramenta de tradução entre formatos. Ele é o primeiro passo do processo de identificação de value bets. O fluxo completo:
        </p>
        <ol className="space-y-3">
          {[
            { n: '1', t: 'Converta a odd para probabilidade implícita', d: 'Odd 2.10 → 1/2.10 × 100 = 47,6%. Essa é a probabilidade de vitória que a casa precisa que exista para ter lucro com aquela odd.' },
            { n: '2', t: 'Estime sua probabilidade real do evento', d: 'Com base em análise própria, estatísticas, histórico recente e fatores contextuais, estime qual a probabilidade real do evento ocorrer. Ex: 55%.' },
            { n: '3', t: 'Compare probabilidades', d: 'Se sua estimativa (55%) é maior que a implícita (47,6%), existe edge positivo de 7,4 pontos percentuais. O valor esperado por R$100 é positivo.' },
            { n: '4', t: 'Calcule o EV e decida o stake', d: 'EV = p_estimada × lucro − (1 − p_estimada) × stake. Use a Calculadora de Odds para o EV exato e a Gestão de Banca para o stake ideal (Kelly ou flat).' },
            { n: '5', t: 'Registre e acompanhe o CLV', d: 'Após o evento, compare a odd que você apostou com a odd de fechamento. Se você consistentemente bate a closing line, tem evidência de edge real.' },
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
          <p className="text-xs leading-relaxed mb-3">
            <strong style={{ color: 'var(--text-1)' }}>Jogo responsável:</strong> entender odds e probabilidades melhora as decisões de apostas, mas não elimina o risco financeiro inerente. Mesmo com edge positivo, a variância é real e perdas de curto prazo são inevitáveis. Estabeleça limites de tempo e valores antes de cada sessão, nunca aposte dinheiro necessário para despesas essenciais e mantenha as apostas como entretenimento com risco gerenciado.
          </p>
          <Link
            to="/jogo-responsavel"
            className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: '#fbbf24' }}
          >
            Leia nosso guia de jogo responsável
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </InfoCard>
      </section>

    </article>
  );
}

export default function ConversorOdds() {
  const [input, setInput] = useState('');
  const [tipo, setTipo] = useState('decimal');

  let decimal = null;
  try {
    if (tipo === 'decimal') { const v = parseFloat(input); if (v > 1) decimal = v; }
    else if (tipo === 'americana') decimal = americanaToDecimal(input);
    else if (tipo === 'fraccionaria') {
      const parts = input.split('/');
      if (parts.length === 2) {
        const n = parseFloat(parts[0]);
        const d = parseFloat(parts[1]);
        if (d > 0 && !isNaN(n)) decimal = 1 + n / d;
      }
    } else if (tipo === 'probabilidade') {
      const p = parseFloat(input);
      if (p > 0 && p < 100) decimal = 100 / p;
    }
  } catch {}

  const valid = decimal && decimal > 1 && isFinite(decimal);

  const conversoes = valid ? [
    { label: 'Decimal', value: decimal.toFixed(3), desc: 'Europa / Brasil' },
    { label: 'Americana', value: decimalToAmericana(decimal), desc: 'EUA / Moneyline' },
    { label: 'Fracionária', value: decimalToFrac(decimal), desc: 'Reino Unido' },
    { label: 'Prob. implícita', value: `${(1 / decimal * 100).toFixed(2)}%`, desc: 'Chance implícita' },
  ] : [];

  const tipoAtual = TIPOS.find(t => t.id === tipo);

  return (
    <CalcLayout
      title="Conversor de Odds"
      description="Converta odds entre decimal, americana (moneyline), fracionária e probabilidade implícita instantaneamente. Tabela completa, fórmulas e guia de overround, CLV e value betting."
      slug="conversor-odds"
      faqs={faqs}
      schema={schema}
      explanation={<ConversorExplanation />}
    >
      <div className="space-y-6">

        {/* Type tabs */}
        <div>
          <p className="label" id="tipo-label">Converter de</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-labelledby="tipo-label">
            {TIPOS.map(t => (
              <button
                key={t.id}
                onClick={() => { setTipo(t.id); setInput(''); }}
                aria-pressed={tipo === t.id}
                className="px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 text-center"
                style={{
                  background: tipo === t.id ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${tipo === t.id ? 'rgba(34,211,238,0.25)' : 'var(--border)'}`,
                  color: tipo === t.id ? '#22d3ee' : 'var(--text-2)',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick examples */}
        {tipo === 'decimal' && (
          <div>
            <p className="text-xs mb-2" style={{ color: 'var(--text-3)' }}>Exemplos rápidos:</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Odds de exemplo">
              {EXEMPLOS.map(ex => (
                <button
                  key={ex.decimal}
                  onClick={() => setInput(String(ex.decimal))}
                  aria-pressed={input === String(ex.decimal)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                  style={{
                    background: input === String(ex.decimal) ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${input === String(ex.decimal) ? 'rgba(34,211,238,0.4)' : 'var(--border)'}`,
                    color: input === String(ex.decimal) ? '#22d3ee' : 'var(--text-2)',
                  }}
                >
                  {ex.decimal} <span style={{ color: 'var(--text-3)' }}>({ex.label})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div>
          <label className="label" htmlFor="conversor-input">{tipoAtual?.ex}</label>
          <input
            id="conversor-input"
            type={tipo === 'fraccionaria' ? 'text' : 'number'}
            className="input-field text-xl font-semibold"
            placeholder={tipoAtual?.placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ letterSpacing: tipo === 'fraccionaria' ? '0.05em' : undefined }}
            aria-label={tipoAtual?.ex}
          />
        </div>

        {/* Results */}
        <div aria-live="polite" aria-atomic="true">
          {valid ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {conversoes.map((c, i) => {
                  const isSource = c.label === tipoAtual?.label || (c.label === 'Prob. implícita' && tipo === 'probabilidade');
                  return (
                    <div
                      key={i}
                      className="result-box"
                      style={{
                        background: isSource ? 'rgba(34,211,238,0.07)' : undefined,
                        borderColor: isSource ? 'rgba(34,211,238,0.25)' : undefined,
                      }}
                    >
                      {isSource && (
                        <p className="text-xs mb-1" style={{ color: '#22d3ee', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Entrada</p>
                      )}
                      <p className="result-value text-lg tabular-nums">{c.value}</p>
                      <p className="result-label">{c.label}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-3)', fontSize: '0.6rem' }}>{c.desc}</p>
                    </div>
                  );
                })}
              </div>
              <div
                className="rounded-xl px-4 py-3 text-xs leading-relaxed"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
              >
                Odd <strong style={{ color: 'var(--text-1)' }}>{decimal.toFixed(3)}</strong> ·
                Retorno de <strong style={{ color: '#22d3ee' }}>R${(decimal * 100).toFixed(2)}</strong> para R$100 apostados ·
                Lucro: <strong style={{ color: '#4ade80' }}>R${((decimal - 1) * 100).toFixed(2)}</strong>
              </div>
            </div>
          ) : (
            <div
              className="rounded-xl flex items-center justify-center py-10"
              style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-3)' }}>Digite uma odd para converter</p>
            </div>
          )}
        </div>

      </div>
    </CalcLayout>
  );
}
