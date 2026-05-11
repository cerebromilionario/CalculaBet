import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const faqs = [
  {
    q: 'Como calcular arbitragem em apostas esportivas?',
    a: 'Converta cada odd em probabilidade implícita usando 1 dividido pela odd. Depois, some todas as probabilidades. Se o total ficar abaixo de 1, ou 100%, há uma margem matemática positiva antes de considerar limites, mudanças de odds e regras das casas.',
  },
  {
    q: 'O que significa margem abaixo de 100% na calculadora de arbitragem?',
    a: 'Significa que as odds combinadas estão pagando mais do que a soma das probabilidades implícitas dos resultados. Na prática, isso indica uma oportunidade teórica de distribuir stakes entre todos os resultados para obter retorno semelhante em qualquer cenário.',
  },
  {
    q: 'A calculadora garante lucro em uma arbitragem?',
    a: 'A calculadora mostra o resultado matemático com base nos números informados, mas não garante lucro real. Odds podem mudar, apostas podem ser limitadas, mercados podem ter regras diferentes e erros de digitação podem alterar completamente o resultado.',
  },
  {
    q: 'Quais odds devo comparar para encontrar uma sure bet?',
    a: 'Compare odds do mesmo evento, do mesmo mercado e com regras equivalentes. Por exemplo, vencedor do jogo em duas casas diferentes. Evite misturar mercados parecidos, como vencedor no tempo regulamentar com classificado, porque eles não cobrem os mesmos resultados.',
  },
  {
    q: 'Como dividir a banca em uma arbitragem?',
    a: 'A divisão ideal busca equilibrar o retorno de cada resultado. A fórmula usada é stake do resultado = banca total ÷ (odd do resultado × margem). Assim, resultados com odds menores recebem stakes maiores e resultados com odds maiores recebem stakes menores.',
  },
  {
    q: 'Vale a pena usar arbitragem em apostas?',
    a: 'Vale como estudo de precificação, probabilidades e comparação de odds, mas deve ser usada com cautela. A margem costuma ser pequena e pode desaparecer com taxas, limites, atraso na confirmação das apostas ou diferenças nas regras do mercado.',
  },
  {
    q: 'Qual é a diferença entre arbitragem, dutching e hedge?',
    a: 'Arbitragem busca cobrir todos os resultados com margem positiva usando odds desalinhadas. Dutching distribui stakes entre vários resultados para controlar retorno. Hedge é uma proteção parcial ou total contra exposição já existente.',
  },
  {
    q: 'Posso fazer arbitragem com três resultados?',
    a: 'Sim. A mesma lógica vale para dois, três ou mais resultados, desde que todos os desfechos possíveis do mercado estejam cobertos. Em futebol, por exemplo, um mercado 1X2 exige considerar casa, empate e visitante.',
  },
  {
    q: 'Quais são os erros mais comuns ao calcular arbitragem?',
    a: 'Os erros mais comuns são comparar mercados diferentes, esquecer o empate, usar odds desatualizadas, não considerar limites de aposta, arredondar stakes de forma agressiva e apostar sem conferir regras de cancelamento ou void.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

function ContentCard({ children, className = '' }) {
  return (
    <section
      className={`rounded-2xl p-5 md:p-6 ${className}`}
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}
    >
      {children}
    </section>
  );
}

function InfoNote({ children, tone = 'cyan', className = '' }) {
  const tones = {
    cyan: { bg: 'rgba(34,211,238,0.07)', border: 'rgba(34,211,238,0.18)', color: '#22d3ee', icon: 'ℹ️' },
    amber: { bg: 'rgba(251,191,36,0.07)', border: 'rgba(251,191,36,0.2)', color: '#fbbf24', icon: '⚠️' },
    green: { bg: 'rgba(34,197,94,0.07)', border: 'rgba(34,197,94,0.18)', color: '#4ade80', icon: '✓' },
  };
  const selected = tones[tone];

  return (
    <div className={`flex gap-3 rounded-2xl p-4 ${className}`} style={{ background: selected.bg, border: `1px solid ${selected.border}` }}>
      <span className="mt-0.5 text-sm" aria-hidden="true" style={{ color: selected.color }}>{selected.icon}</span>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</p>
    </div>
  );
}

function Explanation() {
  const textStyle = { color: 'var(--text-2)' };
  const titleStyle = { color: 'var(--text-1)' };
  const mutedTitle = { color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' };

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <span className="badge badge-cyan">Guia educativo premium</span>
        <h2 className="section-title">Calculadora de arbitragem: encontre a margem, divida as stakes e entenda o risco</h2>
        <p className="text-base leading-relaxed" style={textStyle}>
          A calculadora de arbitragem do CalculaBet foi criada para quem deseja analisar odds de forma objetiva, comparar preços entre casas e entender se um conjunto de cotações cobre todos os resultados com margem matemática favorável. Ela é útil antes de apostar, durante a comparação de mercados e também como ferramenta educativa para aprender probabilidade implícita, distribuição de banca e interpretação de ROI.
        </p>
        <p className="text-sm leading-relaxed" style={textStyle}>
          Em vez de depender de intuição, você informa as odds de cada resultado e a banca total disponível para a simulação. A ferramenta calcula a margem do mercado, identifica se há arbitragem teórica, mostra o retorno percentual e sugere quanto alocar em cada seleção para equilibrar o resultado. O objetivo é dar clareza matemática — não prometer lucro nem incentivar apostas sem planejamento.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          ['Quando usar', 'Ao comparar odds do mesmo mercado em casas diferentes antes de tomar qualquer decisão.'],
          ['O que entrega', 'Margem total, status da oportunidade, ROI estimado e distribuição proporcional das stakes.'],
          ['Para quem serve', 'Iniciantes que querem aprender a lógica e usuários avançados que precisam validar cálculos rapidamente.'],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold mb-2" style={mutedTitle}>{title}</p>
            <p className="text-sm leading-relaxed" style={textStyle}>{body}</p>
          </div>
        ))}
      </div>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={titleStyle}>Como funciona a arbitragem em apostas</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={textStyle}>
          <p>
            Arbitragem, também chamada de sure bet, acontece quando odds disponíveis para todos os resultados de um mesmo mercado geram uma soma de probabilidades implícitas inferior a 100%. Isso pode ocorrer porque casas diferentes ajustam preços em ritmos diferentes, recebem volumes distintos de apostas ou interpretam informações de mercado de formas divergentes.
          </p>
          <p>
            A lógica é simples: cada odd decimal representa uma probabilidade implícita aproximada. Uma odd 2.00 equivale a 50%; uma odd 3.00 equivale a 33,33%; uma odd 1.80 equivale a 55,56%. Quando a soma dessas probabilidades fica abaixo de 100%, sobra uma diferença positiva que pode representar margem de arbitragem antes dos riscos operacionais.
          </p>
          <InfoNote>
            A calculadora considera odds decimais e não verifica regras específicas de cada casa. Sempre confirme se o mercado, o período do jogo, critérios de liquidação, void e limites de aposta são equivalentes.
          </InfoNote>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={titleStyle}>Fórmula matemática usada</h2>
        <div className="space-y-5">
          <div className="rounded-2xl p-5 overflow-x-auto" style={{ background: '#070711', border: '1px solid var(--border-md)' }}>
            <p className="text-sm font-semibold mb-3" style={titleStyle}>1) Margem da arbitragem</p>
            <code className="text-sm md:text-base" style={{ color: '#22d3ee' }}>Margem = (1 ÷ odd₁) + (1 ÷ odd₂) + ... + (1 ÷ oddₙ)</code>
            <p className="text-xs mt-3" style={textStyle}>Se Margem &lt; 1, existe arbitragem teórica. Em porcentagem, basta multiplicar por 100.</p>
          </div>
          <div className="rounded-2xl p-5 overflow-x-auto" style={{ background: '#070711', border: '1px solid var(--border-md)' }}>
            <p className="text-sm font-semibold mb-3" style={titleStyle}>2) Stake por resultado</p>
            <code className="text-sm md:text-base" style={{ color: '#4ade80' }}>Stakeᵢ = Banca total ÷ (Oddᵢ × Margem)</code>
            <p className="text-xs mt-3" style={textStyle}>Essa distribuição procura igualar o retorno bruto de todos os resultados cobertos.</p>
          </div>
          <div className="rounded-2xl p-5 overflow-x-auto" style={{ background: '#070711', border: '1px solid var(--border-md)' }}>
            <p className="text-sm font-semibold mb-3" style={titleStyle}>3) Lucro estimado</p>
            <code className="text-sm md:text-base" style={{ color: '#818cf8' }}>Lucro = Banca total × (1 ÷ Margem − 1)</code>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              ['Oddᵢ', 'cotação decimal do resultado analisado.'],
              ['Margem', 'soma dos inversos das odds, também chamada de book percentual.'],
              ['Banca total', 'valor máximo reservado para a simulação, não recomendação de aposta.'],
              ['Stakeᵢ', 'valor proporcional sugerido para cada resultado.'],
            ].map(([term, desc]) => (
              <div key={term} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
                <dt className="font-semibold mb-1" style={titleStyle}>{term}</dt>
                <dd style={textStyle}>{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={titleStyle}>Exemplo prático resolvido</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={textStyle}>
          <p>
            Imagine um jogo de tênis com apenas dois resultados possíveis. A Casa A oferece odd 2.10 para o Jogador 1 e a Casa B oferece odd 2.05 para o Jogador 2. Com uma banca simulada de R$ 1.000, o cálculo seria:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              ['Probabilidade 1', '1 ÷ 2.10 = 47,62%'],
              ['Probabilidade 2', '1 ÷ 2.05 = 48,78%'],
              ['Margem total', '96,40%'],
            ].map(([title, body]) => (
              <div key={title} className="result-box text-left">
                <p className="result-label">{title}</p>
                <p className="text-lg font-bold mt-1" style={titleStyle}>{body}</p>
              </div>
            ))}
          </div>
          <p>
            Como 96,40% é menor que 100%, a ferramenta indicaria uma arbitragem teórica. A distribuição aproximada seria R$ 494,04 no Jogador 1 e R$ 505,96 no Jogador 2. O retorno bruto ficaria próximo de R$ 1.037,49 em qualquer cenário, com lucro estimado de R$ 37,49 antes de eventuais impactos operacionais.
          </p>
          <InfoNote tone="green">
            Interprete o resultado como uma simulação matemática. Antes de executar qualquer operação real, confira se as odds ainda existem, se há limite suficiente e se o mercado é exatamente o mesmo nas duas casas.
          </InfoNote>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={titleStyle}>Exemplos realistas de uso</h2>
        <div className="space-y-4">
          {[
            ['Apostas simples com dois resultados', 'Mercados como tênis, basquete sem empate ou vencedor de set costumam ter dois lados. Nesse cenário, a arbitragem é mais fácil de visualizar: basta comparar a melhor odd para cada competidor e somar os inversos.'],
            ['Futebol com três resultados', 'No mercado 1X2, é obrigatório cobrir vitória do mandante, empate e vitória do visitante. Se você esquecer o empate, o cálculo fica incompleto e pode gerar uma falsa sensação de proteção.'],
            ['Mercados com regras parecidas, mas não iguais', '“Classifica para a próxima fase” não é o mesmo que “vence no tempo regulamentar”. A calculadora não sabe a regra do mercado; por isso, a validação humana é indispensável.'],
            ['Arredondamento de stakes', 'Se a ferramenta sugerir R$ 123,47 e a casa aceitar apenas valores inteiros, refaça a conta com o valor arredondado ou deixe uma margem de segurança. Pequenos ajustes podem reduzir ou eliminar a vantagem.'],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <h3 className="font-semibold mb-2" style={titleStyle}>{title}</h3>
              <p className="text-sm leading-relaxed" style={textStyle}>{body}</p>
            </div>
          ))}
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={titleStyle}>Educação: banca, risco, probabilidades e boas práticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['Gestão de banca', 'Defina um orçamento separado, pequeno e compatível com sua realidade. Nunca use dinheiro destinado a contas, dívidas ou despesas essenciais.'],
            ['Análise de risco', 'A margem de arbitragem pode ser menor que o risco de odds mudarem, apostas serem recusadas ou regras divergirem. Margens muito apertadas exigem atenção redobrada.'],
            ['Probabilidades', 'Odds são preços, não certezas. Entender probabilidade implícita ajuda a comparar mercados sem confundir valor esperado com garantia de resultado operacional.'],
            ['Erros comuns', 'Não misture casas, períodos ou mercados diferentes sem conferir regras. Evite pressa: oportunidades pequenas não justificam decisões impulsivas.'],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="font-semibold mb-2" style={titleStyle}>{title}</h3>
              <p className="text-sm leading-relaxed" style={textStyle}>{body}</p>
            </div>
          ))}
        </div>
        <InfoNote tone="amber" className="mt-5">
          Conteúdo exclusivo para maiores de 18 anos. Apostas envolvem risco financeiro e podem causar perdas. Use as ferramentas do CalculaBet para estudo e planejamento, não como promessa de retorno.
        </InfoNote>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={titleStyle}>Continue aprendendo com ferramentas relacionadas</h2>
        <p className="text-sm leading-relaxed mb-5" style={textStyle}>
          A arbitragem fica mais clara quando combinada com outras análises. Compare odds, simule distribuição em múltiplos resultados e estude proteção de exposição antes de tomar decisões.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            ['/calculadoras/conversor-odds', 'Converter odds', 'Transforme odds decimais em probabilidade para validar cotações rapidamente.'],
            ['/calculadoras/dutching', 'Calcular dutching', 'Distribua stakes em vários resultados e compare com a lógica de arbitragem.'],
            ['/calculadoras/hedge', 'Simular hedge', 'Entenda como proteger uma posição já aberta sem confundir com sure bet.'],
            ['/calculadoras/gestao-banca', 'Aprender gestão de banca', 'Defina limites, unidades e critérios mais sustentáveis de exposição.'],
          ].map(([to, title, body]) => (
            <Link key={to} to={to} className="rounded-2xl p-4 transition-all" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
              <p className="text-sm font-semibold mb-1" style={titleStyle}>{title} →</p>
              <p className="text-xs leading-relaxed" style={textStyle}>{body}</p>
            </Link>
          ))}
        </div>
      </ContentCard>
    </article>
  );
}

export default function Arbitragem() {
  const [odds, setOdds] = useState(['', '']);
  const [banca, setBanca] = useState('');

  const atualizar = (i, v) => { const o = [...odds]; o[i] = v; setOdds(o); };
  const adicionar = () => setOdds([...odds, '']);
  const remover = (i) => odds.length > 2 && setOdds(odds.filter((_, idx) => idx !== i));

  const oddsN = odds.map(o => parseFloat(o)).filter(o => o > 1);
  const bancaN = parseFloat(banca);
  const valid = oddsN.length === odds.length && oddsN.length >= 2 && bancaN > 0;

  const margem = valid ? oddsN.reduce((acc, o) => acc + 1 / o, 0) : null;
  const isArb = valid && margem < 1;
  const lucroGarantido = isArb ? bancaN * (1 / margem - 1) : 0;
  const stakes = valid && isArb ? oddsN.map(o => bancaN / (o * margem)) : [];

  return (
    <CalcLayout
      title="Calculadora de Arbitragem Online"
      description="Calcule arbitragem em apostas, veja a margem das odds, distribua stakes por resultado e aprenda a interpretar sure bets com segurança e jogo responsável."
      slug="arbitragem"
      faqs={faqs}
      schema={faqSchema}
      explanation={<Explanation />}
    >
      <div className="space-y-6">
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Como preencher</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Insira a melhor odd decimal para cada resultado do mesmo mercado e informe a banca total da simulação. Para futebol 1X2, use três resultados; para esportes sem empate, use dois.
          </p>
        </div>

        <div className="space-y-3">
          {odds.map((o, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="label" htmlFor={`odd-${i}`}>Resultado {i + 1} — Odd decimal</label>
                <input id={`odd-${i}`} type="number" className="input-field" placeholder="2.10" step="0.01" min="1.01" inputMode="decimal" value={o} onChange={e => atualizar(i, e.target.value)} />
              </div>
              {odds.length > 2 && (
                <button
                  type="button"
                  aria-label={`Remover resultado ${i + 1}`}
                  onClick={() => remover(i)}
                  className="mb-px p-2.5 rounded-xl transition-colors"
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

        <div>
          <label className="label" htmlFor="banca-arbitragem">Banca total da simulação (R$)</label>
          <input id="banca-arbitragem" type="number" className="input-field" placeholder="1000" min="0" inputMode="decimal" value={banca} onChange={e => setBanca(e.target.value)} />
        </div>

        {valid && (
          <div className="space-y-3" aria-live="polite">
            <div
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
              style={{
                background: isArb ? 'rgba(34,197,94,0.06)' : 'rgba(248,113,113,0.06)',
                border: `1px solid ${isArb ? 'rgba(34,197,94,0.2)' : 'rgba(248,113,113,0.2)'}`,
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                style={{ background: isArb ? 'rgba(34,197,94,0.15)' : 'rgba(248,113,113,0.15)' }}
              >
                {isArb ? '✓' : '✗'}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: isArb ? '#4ade80' : 'var(--red)' }}>
                  {isArb ? 'Arbitragem teórica encontrada' : 'Sem arbitragem nesta combinação'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>
                  Margem: {margem ? (margem * 100).toFixed(2) : 0}% {isArb ? '(< 100%)' : '(≥ 100%)'}
                </p>
              </div>
            </div>

            {isArb && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="result-box">
                    <p className="result-value">R${lucroGarantido.toFixed(2)}</p>
                    <p className="result-label">Lucro estimado</p>
                  </div>
                  <div className="result-box">
                    <p className="result-value" style={{ color: '#818cf8' }}>{((lucroGarantido / bancaN) * 100).toFixed(2)}%</p>
                    <p className="result-label">ROI matemático</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <div className="px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-2)' }}>Distribuição sugerida de stakes</p>
                  </div>
                  <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                    {stakes.map((s, i) => (
                      <div key={i} className="flex justify-between items-center px-4 py-3">
                        <span className="text-xs" style={{ color: 'var(--text-2)' }}>
                          Resultado {i + 1} · odd {parseFloat(odds[i]).toFixed(2)}
                        </span>
                        <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--text-1)' }}>
                          R${s.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
                  Simulação educativa. Confirme odds, limites, regras do mercado e arredondamentos antes de qualquer decisão. +18.
                </p>
              </>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
          <Link to="/calculadoras/conversor-odds" className="btn-ghost text-xs px-3 py-2">Compare odds</Link>
          <Link to="/calculadoras/gestao-banca" className="btn-ghost text-xs px-3 py-2">Aprenda gestão</Link>
          <Link to="/calculadoras/dutching" className="btn-ghost text-xs px-3 py-2">Outras ferramentas</Link>
        </div>
      </div>
    </CalcLayout>
  );
}
