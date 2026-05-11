import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

const faqs = [
  {
    q: 'Como calcular uma aposta múltipla ou parlay?',
    a: 'Para calcular uma múltipla, multiplique todas as odds decimais válidas e depois multiplique o resultado pelo valor apostado. Exemplo: 1.80 × 2.10 × 1.65 = odd total 6.237. Com R$50 de stake, o retorno potencial é R$311,85 e o lucro potencial é R$261,85.',
  },
  {
    q: 'O que significa odd total na múltipla?',
    a: 'Odd total é a cotação combinada da aposta. Ela representa o multiplicador aplicado sobre a stake caso todas as seleções sejam vencedoras. Quanto maior a odd total, maior o retorno potencial e, normalmente, menor a probabilidade implícita de acerto.',
  },
  {
    q: 'Qual é a diferença entre aposta simples e aposta múltipla?',
    a: 'Na aposta simples, você depende de apenas um evento ou mercado. Na múltipla, duas ou mais seleções entram no mesmo bilhete e todas precisam acertar. A múltipla aumenta o retorno potencial, mas também concentra o risco.',
  },
  {
    q: 'Se uma seleção da múltipla perder, eu perco tudo?',
    a: 'Em uma múltipla tradicional, sim. Se uma seleção for perdida, todo o bilhete perde. Algumas casas podem tratar eventos cancelados como odd 1.00, mas isso depende das regras do operador. Sempre consulte o regulamento antes de apostar.',
  },
  {
    q: 'Como interpretar a probabilidade implícita de cada odd?',
    a: 'Em odds decimais, a probabilidade implícita aproximada é 1 dividido pela odd, multiplicado por 100. Uma odd 2.00 indica cerca de 50%; uma odd 1.50 indica cerca de 66,7%. Essa conta não remove margem da casa, mas ajuda a comparar preços.',
  },
  {
    q: 'Vale a pena usar calculadora de múltipla antes de apostar?',
    a: 'Sim, como ferramenta educativa e de conferência. Ela ajuda a entender retorno, lucro, odd combinada e exposição de risco antes de confirmar um bilhete. A calculadora não prevê resultados nem garante lucro.',
  },
  {
    q: 'Quantas seleções devo colocar em uma múltipla?',
    a: 'Não existe número ideal universal. Quanto mais seleções, maior tende a ser a odd total e menor tende a ser a chance de todas acontecerem. Para uso responsável, muitas pessoas preferem múltiplas menores e stakes proporcionais à banca.',
  },
  {
    q: 'A calculadora funciona com odds americanas ou fracionárias?',
    a: 'Esta página usa odds decimais, que são o padrão mais comum no Brasil. Se você tiver odds americanas ou fracionárias, use primeiro o Conversor de Odds da CalculaBet e depois insira os valores decimais aqui.',
  },
  {
    q: 'A calculadora de parlay considera impostos, bônus ou cash out?',
    a: 'Não. O cálculo principal considera odd decimal e stake. Impostos, promoções, free bets, limites, regras de cash out e void podem alterar o resultado real conforme as condições da casa de apostas.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Calculadora de Múltipla / Parlay',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: 'https://calculabet.com.br/calculadoras/multipla-parlay',
      description: 'Calculadora gratuita para estimar odd total, retorno potencial e lucro potencial de apostas múltiplas em odds decimais.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ],
};

export default function MultiplaParlay() {
  const [selecoes, setSelecoes] = useState([{ odd: '' }, { odd: '' }]);
  const [stake, setStake] = useState('');

  const atualizar = (i, v) => {
    const s = [...selecoes];
    s[i].odd = v;
    setSelecoes(s);
  };
  const adicionar = () => setSelecoes([...selecoes, { odd: '' }]);
  const remover = i => selecoes.length > 2 && setSelecoes(selecoes.filter((_, idx) => idx !== i));

  const oddsValidas = selecoes.map(s => parseFloat(s.odd)).filter(o => o > 1);
  const oddTotal = oddsValidas.reduce((acc, o) => acc * o, 1);
  const stakeNumerica = parseFloat(stake);
  const valid = oddsValidas.length === selecoes.length && selecoes.length >= 2 && stakeNumerica > 0;
  const retorno = valid ? stakeNumerica * oddTotal : 0;
  const lucro = valid ? retorno - stakeNumerica : 0;
  const probabilidadeCombinada = valid ? (1 / oddTotal) * 100 : 0;

  return (
    <CalcLayout
      title="Calculadora de Múltipla / Parlay Online"
      description="Calcule odd total, retorno potencial, lucro potencial e probabilidade implícita de uma aposta múltipla em odds decimais. Ferramenta gratuita, educativa e sem cadastro."
      slug="multipla-parlay"
      faqs={faqs}
      schema={schema}
      explanation={
        <article className="space-y-10 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
          <section className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-cyan">Guia completo</span>
              <span className="badge">Odds decimais</span>
              <span className="badge badge-amber">+18 • jogo responsável</span>
            </div>
            <h2 className="section-title">Calculadora de múltipla: entenda seu bilhete antes de confirmar</h2>
            <p>
              A Calculadora de Múltipla / Parlay da CalculaBet foi criada para transformar um cálculo que parece simples em uma análise clara, rápida e confiável. Em vez de multiplicar odds manualmente, conferir valores em planilhas ou aceitar o número exibido no cupom sem entender a lógica, você informa as odds decimais de cada seleção, adiciona a stake e visualiza a odd total, o retorno potencial, o lucro potencial e a probabilidade implícita aproximada do bilhete.
            </p>
            <p>
              A ferramenta é útil sempre que você estiver montando uma aposta combinada com duas ou mais seleções: jogos de futebol, mercados de escanteios, tênis, basquete, e-sports ou qualquer outro evento que trabalhe com odds decimais. Ela também ajuda quem está aprendendo a interpretar odds, comparar cenários e perceber como uma única seleção adicional pode alterar bastante a relação entre retorno e risco. O objetivo não é estimular apostas maiores, e sim dar contexto para uma decisão mais informada.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl p-4" style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.16)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>Conferência rápida</h3>
                <p>Veja se a odd combinada e o retorno fazem sentido antes de registrar o bilhete.</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: 'rgba(129,140,248,0.06)', border: '1px solid rgba(129,140,248,0.16)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>Leitura de risco</h3>
                <p>Entenda que odds maiores podem significar menor probabilidade implícita de acerto.</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.16)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>Uso educativo</h3>
                <p>Compare alternativas sem promessa de lucro, previsão de resultado ou recomendação de aposta.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="section-title">Como funciona uma aposta múltipla ou parlay</h2>
            <p>
              Uma aposta múltipla, também chamada de parlay, acumulada ou combinada, reúne duas ou mais seleções em um único bilhete. A principal característica é que todas as seleções precisam ser vencedoras para que o bilhete seja pago. Se uma delas perder, a múltipla tradicional perde integralmente. Por isso, o retorno potencial cresce quando você adiciona seleções, mas a dificuldade de acerto também aumenta.
            </p>
            <p>
              A lógica matemática é multiplicativa. Cada odd decimal funciona como um multiplicador. Uma seleção com odd 1.80 multiplica a stake por 1.80; se ela for combinada com outra de odd 2.00, o multiplicador passa a ser 3.60. Ao incluir uma terceira seleção de odd 1.50, a odd total vira 5.40. Esse efeito é poderoso, mas deve ser interpretado com cautela: adicionar uma seleção apenas para “aumentar a odd” pode piorar a qualidade do bilhete se o mercado não tiver valor para você.
            </p>
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
              <h3 className="font-semibold mb-3" style={{ color: 'var(--text-1)' }}>Interpretação dos resultados</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong style={{ color: 'var(--text-1)' }}>Odd total:</strong> multiplicador final do bilhete, calculado pela multiplicação das odds individuais.</li>
                <li><strong style={{ color: 'var(--text-1)' }}>Retorno total:</strong> valor potencial que voltaria para você se todas as seleções fossem vencedoras, incluindo a stake.</li>
                <li><strong style={{ color: 'var(--text-1)' }}>Lucro potencial:</strong> retorno total menos o valor apostado.</li>
                <li><strong style={{ color: 'var(--text-1)' }}>Probabilidade implícita:</strong> estimativa aproximada derivada das odds, sem remover a margem da casa.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="section-title">Fórmula da calculadora de múltipla</h2>
            <p>
              A fórmula usada pela calculadora é direta e transparente. Ela considera odds no formato decimal, que é o padrão mais comum em sites de apostas no Brasil. Caso você tenha odds americanas ou fracionárias, converta primeiro para decimal usando o nosso <Link to="/calculadoras/conversor-odds" className="font-semibold" style={{ color: 'var(--cyan)' }}>Conversor de Odds</Link>.
            </p>
            <div className="rounded-2xl p-5 overflow-x-auto" style={{ background: 'rgba(6,6,10,0.55)', border: '1px solid var(--border)' }}>
              <p className="text-base font-semibold mb-3" style={{ color: 'var(--text-1)' }}>Odd total = O₁ × O₂ × O₃ × ... × Oₙ</p>
              <p className="text-base font-semibold mb-3" style={{ color: 'var(--text-1)' }}>Retorno potencial = Stake × Odd total</p>
              <p className="text-base font-semibold" style={{ color: 'var(--text-1)' }}>Lucro potencial = Retorno potencial − Stake</p>
            </div>
            <p>
              Na fórmula, <strong style={{ color: 'var(--text-1)' }}>O</strong> representa cada odd decimal inserida na múltipla, <strong style={{ color: 'var(--text-1)' }}>n</strong> representa o número de seleções e <strong style={{ color: 'var(--text-1)' }}>stake</strong> é o valor apostado. A probabilidade implícita aproximada da múltipla pode ser estimada por <strong style={{ color: 'var(--text-1)' }}>(1 ÷ odd total) × 100</strong>.
            </p>
            <div className="rounded-2xl p-5" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.16)' }}>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>Exemplo resolvido</h3>
              <p>
                Imagine três seleções com odds 1.75, 2.20 e 1.60, usando stake de R$40. A odd total é 1.75 × 2.20 × 1.60 = 6.16. O retorno potencial é R$40 × 6.16 = R$246,40. O lucro potencial é R$246,40 − R$40 = R$206,40. A probabilidade implícita aproximada do bilhete é 1 ÷ 6.16 × 100 = 16,23%.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="section-title">Exemplos práticos de uso</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>Exemplo 1: múltipla conservadora</h3>
                <p>Seleções em 1.40, 1.55 e 1.65 geram odd total 3.58. Com R$30, o retorno potencial seria R$107,42. Apesar das odds individuais menores, ainda é necessário que as três seleções acertem.</p>
              </div>
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>Exemplo 2: bilhete equilibrado</h3>
                <p>Odds 1.80, 1.95 e 2.05 formam odd total 7.20. Uma stake de R$25 teria retorno potencial de R$180, com lucro potencial de R$155. É um cenário com retorno maior e risco acumulado maior.</p>
              </div>
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>Exemplo 3: seleção extra no bilhete</h3>
                <p>Uma múltipla em odd 4.00 vira 5.60 ao adicionar uma seleção de 1.40. O retorno aumenta 40%, mas o bilhete agora depende de mais um resultado. A pergunta correta é se essa seleção realmente melhora a aposta.</p>
              </div>
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>Exemplo 4: comparação com aposta simples</h3>
                <p>Se uma seleção é sua principal análise, talvez faça sentido comparar o retorno dela como aposta simples. Use a <Link to="/calculadoras/aposta-simples" className="font-semibold" style={{ color: 'var(--cyan)' }}>Calculadora de Aposta Simples</Link> para visualizar o cenário isolado.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="section-title">Gestão de banca, risco e boas práticas</h2>
            <p>
              Apostas múltiplas podem parecer atraentes porque pequenas stakes podem gerar retornos potenciais altos. Esse é exatamente o motivo para analisá-las com disciplina. Uma gestão de banca saudável começa pela definição de um orçamento que não comprometa despesas pessoais, seguida de limites por aposta e revisão periódica dos resultados. Nunca use múltiplas como tentativa de recuperar perdas, porque isso tende a aumentar a exposição em momentos de menor clareza.
            </p>
            <p>
              Também é importante separar probabilidade de desejo. Um bilhete com cinco seleções “prováveis” não se torna automaticamente seguro. Mesmo seleções com odds baixas podem falhar, e a multiplicação de eventos reduz a chance combinada. Antes de confirmar, pergunte: eu entendo todos os mercados? A stake está dentro do meu plano? O retorno compensa o risco acumulado? Existe alternativa melhor em aposta simples, dutching, hedge ou simplesmente não apostar?
            </p>
            <div className="rounded-2xl p-5" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.18)' }}>
              <h3 className="font-semibold mb-3" style={{ color: '#fbbf24' }}>Erros comuns ao montar múltiplas</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Adicionar seleções sem análise apenas para arredondar a odd total.</li>
                <li>Ignorar a probabilidade implícita e olhar somente para o retorno potencial.</li>
                <li>Aumentar stake depois de perdas recentes ou por impulso emocional.</li>
                <li>Combinar mercados altamente correlacionados sem entender as regras da casa.</li>
                <li>Confundir retorno total com lucro líquido.</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link to="/calculadoras/gestao-banca" className="btn-ghost">Aprenda gestão de banca</Link>
              <Link to="/calculadoras/odds" className="btn-ghost">Compare probabilidades</Link>
              <Link to="/calculadoras/roi" className="btn-ghost">Avalie seu ROI</Link>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="section-title">Aviso de responsabilidade e uso consciente</h2>
            <p>
              Esta página tem finalidade educativa e informativa. A CalculaBet não garante resultados, não oferece aconselhamento financeiro e não recomenda que você aposte. Apostas envolvem risco de perda financeira e devem ser tratadas como entretenimento adulto, nunca como fonte de renda. Use apenas se você tiver 18 anos ou mais, respeite as leis aplicáveis ao seu local e procure ajuda se perceber perda de controle, urgência para recuperar prejuízos ou impacto no seu bem-estar.
            </p>
            <div className="rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.18)' }}>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: '#f87171' }}>Jogo responsável é prioridade</h3>
                <p>Defina limites, evite decisões impulsivas e pare se a atividade deixar de ser recreativa.</p>
              </div>
              <Link to="/jogo-responsavel" className="btn-ghost flex-shrink-0">Ver orientações</Link>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="section-title">Continue explorando a CalculaBet</h2>
            <p>
              Depois de calcular sua múltipla, você pode aprofundar a análise com outras ferramentas gratuitas. Compare odds, simule cenários de lucro, entenda arbitragem, avalie cash out ou organize sua banca. Também há espaço preparado para futuras recomendações e parceiros, sempre com comunicação transparente e sem promessas de retorno.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link to="/calculadoras/conversor-odds" className="rounded-xl p-4 transition-all" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)', color: 'var(--text-1)' }}>Converter odds americanas, fracionárias e decimais →</Link>
              <Link to="/calculadoras/simulador-lucro" className="rounded-xl p-4 transition-all" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)', color: 'var(--text-1)' }}>Simular lucro em diferentes cenários →</Link>
              <Link to="/calculadoras/dutching" className="rounded-xl p-4 transition-all" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)', color: 'var(--text-1)' }}>Distribuir stake com dutching →</Link>
              <Link to="/afiliados" className="rounded-xl p-4 transition-all" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)', color: 'var(--text-1)' }}>Conhecer oportunidades para parceiros →</Link>
            </div>
          </section>
        </article>
      }
    >
      <div className="space-y-6">
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.16)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Insira pelo menos duas odds decimais. A calculadora atualiza a probabilidade implícita de cada seleção e, ao informar a stake, mostra a odd combinada, o retorno potencial e o lucro potencial.
          </p>
        </div>

        <div className="space-y-2.5">
          {selecoes.map((selecao, i) => {
            const oddAtual = parseFloat(selecao.odd);
            const id = `odd-selecao-${i}`;

            return (
              <div key={i} className="flex flex-col sm:flex-row sm:items-end gap-3">
                <div className="flex-1">
                  <label className="label" htmlFor={id}>Seleção {i + 1} — Odd decimal</label>
                  <input
                    id={id}
                    type="number"
                    className="input-field"
                    placeholder="1.80"
                    step="0.01"
                    min="1.01"
                    inputMode="decimal"
                    value={selecao.odd}
                    onChange={e => atualizar(i, e.target.value)}
                  />
                </div>
                {oddAtual > 1 && (
                  <div className="sm:mb-px px-2.5 py-2 rounded-lg text-xs font-medium flex-shrink-0" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.15)', color: '#22d3ee' }}>
                    Prob. implícita: {((1 / oddAtual) * 100).toFixed(1)}%
                  </div>
                )}
                {selecoes.length > 2 && (
                  <button
                    type="button"
                    onClick={() => remover(i)}
                    className="sm:mb-px p-2.5 rounded-xl transition-colors"
                    style={{ color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
                    aria-label={`Remover seleção ${i + 1}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={adicionar} className="text-xs font-medium flex items-center gap-1.5 transition-colors" style={{ color: 'var(--cyan)' }}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar seleção ({selecoes.length} selecionadas)
        </button>

        <div>
          <label className="label" htmlFor="stake-multipla">Stake (R$)</label>
          <input
            id="stake-multipla"
            type="number"
            className="input-field"
            placeholder="50"
            min="0"
            inputMode="decimal"
            value={stake}
            onChange={e => setStake(e.target.value)}
          />
        </div>

        {valid ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="result-box">
                <p className="result-value" style={{ color: '#22d3ee' }}>{oddTotal.toFixed(3)}</p>
                <p className="result-label">Odd total</p>
              </div>
              <div className="result-box">
                <p className="result-value">R${retorno.toFixed(2)}</p>
                <p className="result-label">Retorno total</p>
              </div>
              <div className="result-box">
                <p className="result-value" style={{ color: '#4ade80' }}>R${lucro.toFixed(2)}</p>
                <p className="result-label">Lucro potencial</p>
              </div>
            </div>
            <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--text-2)' }}>
                Probabilidade implícita aproximada da múltipla: <strong style={{ color: 'var(--text-1)' }}>{probabilidadeCombinada.toFixed(2)}%</strong>. Esse percentual é apenas uma leitura matemática das odds e não representa garantia de acerto.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl flex items-center justify-center py-8 px-4 text-center" style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border)' }}>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>Preencha todas as odds com valores acima de 1.00 e informe uma stake positiva.</p>
          </div>
        )}

        <div className="rounded-xl p-4" style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.16)' }}>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            <strong style={{ color: '#f87171' }}>Aviso +18:</strong> apostas envolvem riscos e podem causar perdas financeiras. Use esta calculadora apenas para fins educativos, com orçamento definido e sem expectativa de lucro garantido.
          </p>
        </div>
      </div>
    </CalcLayout>
  );
}
