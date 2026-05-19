import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

// ─── FAQ ────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'O que é cashout justo?',
    a: 'Cashout justo é uma estimativa do valor que faria sentido matematicamente para encerrar uma aposta, calculado com base no retorno potencial original e na probabilidade atual estimada pelo usuário. Não é uma previsão nem uma garantia de decisão correta. É uma referência matemática para comparar com a oferta da casa.',
  },
  {
    q: 'Como calcular cashout justo?',
    a: 'A fórmula simplificada é: Cashout justo = Retorno potencial × Probabilidade atual estimada. O retorno potencial é o valor apostado vezes a odd original. Se o retorno potencial é R$250 e a probabilidade atual estimada é 70%, o cashout justo estimado é R$250 × 0,70 = R$175. Esse modelo é uma aproximação educativa e depende da estimativa de probabilidade do usuário.',
  },
  {
    q: 'O que é cashout manual?',
    a: 'Cashout manual é a tentativa de estimar o valor de uma oferta de cashout sem depender apenas do botão da casa de apostas. O usuário compara a oferta recebida com uma estimativa baseada em retorno potencial e probabilidade atual. Isso pode ajudar a entender se a proposta parece abaixo ou acima de uma estimativa própria.',
  },
  {
    q: 'Qual é a fórmula do cashout justo?',
    a: 'A fórmula usada nesta calculadora é: Cashout justo = (Valor apostado × Odd original) × (Probabilidade atual / 100). Onde: (Valor apostado × Odd original) é o retorno potencial original, e Probabilidade atual é a estimativa do usuário em percentual. Esse cálculo é uma aproximação educativa e não considera todos os fatores da oferta da casa.',
  },
  {
    q: 'Cashout justo garante a melhor decisão?',
    a: 'Não. A calculadora apenas fornece uma referência matemática baseada nos dados inseridos. A probabilidade atual é uma estimativa subjetiva do usuário, o resultado do evento continua incerto, e a decisão de aceitar ou recusar cashout envolve tolerância ao risco, contexto do jogo e fatores que nenhum cálculo consegue capturar completamente.',
  },
  {
    q: 'Cashout vale a pena?',
    a: 'Depende do contexto. Se a oferta está muito abaixo do valor justo estimado, pode não ser matematicamente interessante. Se está próxima ou acima, pode fazer sentido para quem quer reduzir risco. Não existe resposta universal — a decisão envolve matemática, tolerância ao risco e o contexto do evento no momento do cashout.',
  },
  {
    q: 'Como comparar cashout oferecido e valor justo?',
    a: 'Use a Calculadora de Cashout Justo do CalculaBet. Informe valor apostado, odd original, cashout oferecido e probabilidade atual estimada. A calculadora mostra a diferença em reais e em percentual entre a oferta e o valor justo estimado, além de uma interpretação educativa do resultado.',
  },
  {
    q: 'O que significa cashout abaixo do valor justo?',
    a: 'Significa que, com base na probabilidade estimada pelo usuário, a oferta da casa está abaixo do valor que seria esperado matematicamente. Isso não significa que recusar seja a decisão certa — pode haver desconto por margem da casa, risco ou liquidez. A calculadora mostra a diferença; a decisão é do usuário.',
  },
  {
    q: 'O que significa cashout acima do valor justo?',
    a: 'Significa que, com base na probabilidade estimada, a oferta está acima do valor esperado matematicamente com os dados inseridos. Isso pode indicar que a casa precifica o evento de forma diferente ou que sua estimativa de probabilidade é menor do que a da casa. Ainda assim, a decisão envolve risco e tolerância pessoal.',
  },
  {
    q: 'Como estimar probabilidade atual?',
    a: 'A probabilidade atual é uma estimativa subjetiva do usuário sobre a chance do evento apostado se concretizar naquele momento. Pode ser baseada em estatísticas, contexto do jogo, análise técnica ou intuição. Não existe fórmula universal — e estimativas diferentes levam a cashout justo diferentes. Seja conservador nas estimativas para evitar excesso de confiança.',
  },
  {
    q: 'Cashout em múltipla funciona igual?',
    a: 'A lógica matemática é parecida, mas a probabilidade atual de uma múltipla é mais difícil de estimar porque depende da chance de todas as seleções restantes ainda se concretizarem. O risco composto de uma múltipla torna a estimativa de probabilidade mais incerta. Use a calculadora como referência, mas com mais cautela ao estimar probabilidade em múltiplas.',
  },
  {
    q: 'Qual a diferença entre cashout e hedge?',
    a: 'Cashout é a funcionalidade oferecida pela própria casa para encerrar a aposta antecipadamente, com valor calculado pela plataforma. Hedge é uma operação manual de proteção, normalmente apostando em resultado oposto em outra casa com melhores odds. Hedge pode oferecer condições mais favoráveis, mas exige mais trabalho e uma segunda conta. A Calculadora de Hedge do CalculaBet pode ajudar a comparar as opções.',
  },
  {
    q: 'A casa de apostas pode oferecer cashout abaixo do valor justo?',
    a: 'Sim. A casa geralmente inclui uma margem na oferta de cashout, assim como inclui margem nas odds normais. Essa margem representa o custo do serviço de cashout. Por isso, o valor oferecido costuma ser menor do que a estimativa de valor justo — o quanto menor depende da margem aplicada por cada plataforma. Verifique os termos da casa.',
  },
  {
    q: 'A calculadora de cashout justo prevê resultados?',
    a: 'Não. A Calculadora de Cashout Justo / Manual do CalculaBet realiza apenas cálculos matemáticos com base nos dados inseridos pelo usuário. Ela não prevê resultados esportivos, não acessa dados em tempo real, não recomenda aceitar ou recusar cashout e não garante nenhum resultado financeiro.',
  },
  {
    q: 'Quando devo ter cuidado com cashout?',
    a: 'Tenha cuidado quando tomar a decisão por emoção — medo de perder o lucro ou pânico com uma virada — em vez de análise. Evite usar cashout para recuperar perdas ou para apostar novamente imediatamente. Não use dinheiro essencial para despesas. Se perceber perda de controle nas decisões de jogo, acesse recursos de jogo responsável.',
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
    cyan:  { bg: 'rgba(34,211,238,0.07)',  border: 'rgba(34,211,238,0.18)',  color: '#22d3ee' },
    amber: { bg: 'rgba(251,191,36,0.07)',  border: 'rgba(251,191,36,0.2)',   color: '#fbbf24' },
    green: { bg: 'rgba(34,197,94,0.07)',   border: 'rgba(34,197,94,0.18)',   color: '#4ade80' },
    red:   { bg: 'rgba(248,113,113,0.07)', border: 'rgba(248,113,113,0.2)',  color: '#f87171' },
  };
  const s = tones[tone] || tones.cyan;
  return (
    <div className="rounded-2xl p-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</p>
    </div>
  );
}

// ─── SEO Explanation ─────────────────────────────────────────────────────────

function Explanation() {
  const t = { color: 'var(--text-2)' };
  const h = { color: 'var(--text-1)' };

  return (
    <article className="space-y-8">

      <header className="space-y-4">
        <span className="badge badge-cyan">Guia educativo completo</span>
        <h2 className="section-title">Calculadora de cashout justo e manual em apostas</h2>
        <p className="text-base leading-relaxed" style={t}>
          A Calculadora de Cashout Justo / Manual do CalculaBet ajuda a comparar a oferta de cashout da casa com uma estimativa baseada em retorno potencial e probabilidade atual. Esta ferramenta é exclusivamente educativa — não prevê resultados, não recomenda aceitar ou recusar e não garante lucro.
        </p>
      </header>

      {/* O que é cashout justo */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é cashout justo?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Cashout justo é uma estimativa do valor que faria sentido matematicamente para encerrar uma aposta antecipadamente. Ele é calculado com base no retorno potencial original da aposta e na probabilidade atual estimada pelo usuário de que o resultado ainda aconteça.
          </p>
          <p>
            Não é uma previsão do resultado, não é um valor fixo e não é uma garantia de melhor decisão. É apenas uma referência matemática que pode ajudar a comparar com a oferta que a casa apresenta no botão de cashout.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            {[
              ['Baseado em probabilidade', 'O valor justo depende da estimativa de chance atual do usuário.'],
              ['Não é garantia', 'A probabilidade é subjetiva e o resultado é sempre incerto.'],
              ['Referência comparativa', 'Ajuda a ver se a oferta da casa parece abaixo, próxima ou acima da estimativa.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.10)' }}>
                <p className="text-xs font-semibold mb-1.5" style={{ color: '#22d3ee' }}>{title}</p>
                <p className="text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <InfoNote tone="amber">
            Cashout justo é uma estimativa. A calculadora não prevê resultados e não recomenda aceitar ou recusar a oferta. A decisão é sempre do usuário.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Como calcular cashout justo */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como calcular cashout justo?</h2>
        <div className="space-y-5 text-sm leading-relaxed" style={t}>
          <p>A fórmula central usa o retorno potencial original e a probabilidade atual estimada:</p>
          <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.08))', border: '1px solid rgba(103,232,249,0.20)' }}>
            <p className="badge badge-cyan mb-3 text-xs">Fórmula</p>
            <p className="text-lg font-bold font-mono" style={{ color: 'var(--text-1)' }}>Cashout justo = Retorno potencial × Probabilidade atual</p>
            <p className="mt-2 text-xs font-mono" style={{ color: 'var(--text-1)' }}>Retorno potencial = Valor apostado × Odd original</p>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              Exemplo: aposta R$100, odd 2.50, probabilidade atual 70%. Retorno = R$250. Cashout justo = R$250 × 0,70 = R$175.
            </p>
          </div>
          <p>
            Se a casa oferece R$160, a diferença é de <span className="font-mono font-medium" style={{ color: '#f87171' }}>-R$15</span>, ou aproximadamente <span className="font-mono font-medium" style={{ color: '#f87171' }}>-8,57%</span> em relação à estimativa. Esse número ajuda a contextualizar a oferta — mas não determina a decisão correta.
          </p>
        </div>
      </ContentCard>

      {/* O que é cashout manual */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é cashout manual?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Cashout manual é a tentativa de estimar o valor justo de uma oferta de cashout sem depender exclusivamente do número que a casa apresenta. O usuário usa o retorno potencial original e sua própria estimativa de probabilidade para calcular uma referência de comparação.
          </p>
          <p>
            Essa abordagem pode ser útil quando o botão de cashout não está disponível, quando o usuário quer verificar se a oferta parece razoável antes de clicar, ou quando quer comparar a oferta com um hedge manual em outra casa.
          </p>
          <InfoNote>
            A probabilidade atual é uma estimativa subjetiva. Quanto mais conservadora for a estimativa, menor será o cashout justo calculado — e vice-versa.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Cashout oferecido vs cashout justo */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Cashout oferecido pela casa vs cashout justo</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            A oferta de cashout que a casa apresenta pode estar acima, próxima ou abaixo do valor justo estimado. Cada cenário tem uma interpretação diferente:
          </p>
          <div className="space-y-3">
            {[
              ['Oferta acima do justo', 'A casa está oferecendo mais do que a estimativa matemática com os dados inseridos. Pode indicar que a casa precifica a chance atual de forma diferente da sua estimativa.', '#4ade80'],
              ['Oferta próxima do justo', 'Diferença pequena entre oferta e estimativa. Pode indicar uma proposta próxima do valor esperado com sua probabilidade estimada.', '#22d3ee'],
              ['Oferta abaixo do justo', 'A casa está oferecendo menos do que a estimativa. Pode incluir margem, risco ou fatores que a fórmula simplificada não captura.', '#f87171'],
            ].map(([title, body, color]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid rgba(255,255,255,0.07)` }}>
                <p className="text-xs font-semibold mb-1.5" style={{ color }}>{title}</p>
                <p className="text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <InfoNote tone="amber">
            A casa pode incluir margem, risco e critérios internos na oferta. O valor justo estimado é uma referência — não uma promessa de que a oferta deveria ser exatamente esse valor.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Como usar a calculadora */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como usar a Calculadora de Cashout Justo do CalculaBet</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>Passo a passo para usar a ferramenta:</p>
          <ol className="list-none space-y-3">
            {[
              ['1', 'Informe o valor apostado originalmente.'],
              ['2', 'Digite a odd decimal original da aposta.'],
              ['3', 'Informe o valor de cashout que a casa está oferecendo.'],
              ['4', 'Estime a probabilidade atual (%) de que o resultado apostado ainda aconteça.'],
              ['5', 'Veja o cashout justo estimado e o retorno potencial original.'],
              ['6', 'Compare a diferença em reais e percentual entre oferta e estimativa.'],
              ['7', 'Leia a interpretação — e use como apoio, não como decisão automática.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3 text-xs items-start">
                <span className="rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{n}</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </ContentCard>

      {/* Cashout justo e valor esperado */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Cashout justo e valor esperado</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Manter a aposta ativa tem um valor esperado baseado na chance atual estimada e no retorno potencial. Aceitar o cashout transforma um resultado incerto em um valor garantido. Matematicamente, o valor esperado de manter é igual ao cashout justo estimado — mas o resultado real pode ser qualquer coisa entre zero e o retorno potencial.
          </p>
          <p>
            A diferença entre o valor esperado de manter e o cashout oferecido representa o custo de "sair agora". Se a oferta estiver muito abaixo da estimativa, o custo de sair é maior. Se estiver próxima, o custo é pequeno.
          </p>
          <InfoNote>
            EV (valor esperado) não garante resultado individual. Uma aposta com EV positivo pode perder; uma com EV negativo pode ganhar. O cálculo orienta, não determina.
          </InfoNote>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              ['/calculadoras/value-bet', 'Calculadora Value Bet / EV'],
              ['/blog/como-calcular-ev-apostas', 'Como calcular EV em apostas'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </ContentCard>

      {/* Cashout vale a pena */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Cashout vale a pena?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Não existe resposta universal. A decisão depende de fatores que vão além da matemática: contexto do evento, tolerância ao risco, necessidade do dinheiro naquele momento e estado emocional.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['Pode fazer sentido quando...', ['A oferta está próxima ou acima da estimativa', 'O contexto do jogo mudou desfavoravelmente', 'Você quer reduzir variância em uma múltipla longa', 'A situação do evento piorou muito desde a aposta'], '#4ade80'],
              ['Pode não fazer sentido quando...', ['A oferta está muito abaixo da estimativa', 'A decisão é baseada apenas em emoção', 'O objetivo é recuperar perdas com nova aposta', 'O contexto do jogo não mudou significativamente'], '#f87171'],
            ].map(([title, items, color]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-xs font-semibold mb-3" style={{ color }}>{title}</p>
                <ul className="space-y-1.5">
                  {items.map(item => (
                    <li key={item} className="flex gap-2 text-xs items-start">
                      <span className="shrink-0 mt-0.5" style={{ color }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ContentCard>

      {/* Cashout em múltiplas */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Cashout em apostas múltiplas</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Em apostas múltiplas, a probabilidade atual é mais difícil de estimar porque depende da chance de todas as seleções restantes se concretizarem. O risco é composto — se houver 3 seleções restantes, cada uma com 80% de chance, a probabilidade conjunta é 0,80 × 0,80 × 0,80 = 51,2%.
          </p>
          <p>
            Isso torna a estimativa de probabilidade em múltiplas mais incerta e subjetiva. Use a calculadora como referência, mas com mais cautela ao estimar a probabilidade atual em bilhetes compostos.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              ['/calculadoras/multipla-parlay', 'Calculadora de Múltipla'],
              ['/blog/o-que-e-aposta-multipla', 'O que é aposta múltipla'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </ContentCard>

      {/* Cashout e hedge */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Cashout e hedge</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Cashout é uma funcionalidade oferecida pela própria casa para encerrar a aposta antecipadamente. Hedge é uma operação manual de proteção — normalmente apostando em resultado oposto em outra plataforma com odds possivelmente mais favoráveis.
          </p>
          <p>
            A <Link to="/calculadoras/cashout" className="font-medium" style={{ color: '#22d3ee' }}>Calculadora de Cashout</Link> do CalculaBet usa a odd atual para calcular o valor justo de mercado. Esta calculadora de cashout justo usa a probabilidade estimada — uma abordagem diferente que pode ser útil quando a odd atual não está disponível ou quando o usuário quer fazer sua própria estimativa.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              ['/calculadoras/cashout', 'Calculadora de Cashout'],
              ['/calculadoras/hedge', 'Calculadora de Hedge'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </ContentCard>

      {/* Erros comuns */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Erros comuns ao avaliar cashout</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <ul className="list-none space-y-2">
            {[
              'Aceitar por medo sem calcular o valor justo estimado.',
              'Recusar por ganância sem considerar que o contexto do evento mudou.',
              'Superestimar a probabilidade atual por excesso de confiança.',
              'Ignorar valor esperado e decidir apenas por emoção.',
              'Confundir retorno com lucro — retorno inclui o valor apostado.',
              'Usar cashout para recuperar perdas anteriores com nova aposta.',
              'Não entender as regras de cashout da plataforma.',
              'Não considerar a margem da casa na oferta.',
              'Não usar gestão de banca antes e depois do cashout.',
              'Tomar decisão sob pressão emocional de uma virada momentânea.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-xs items-start">
                <span style={{ color: '#f87171' }} className="shrink-0 mt-0.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </ContentCard>

      {/* Garante a melhor decisão */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>A calculadora de cashout justo garante a melhor decisão?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Não. A calculadora realiza cálculos matemáticos com base nos dados inseridos pelo usuário. O cashout justo estimado depende diretamente da probabilidade atual informada — que é subjetiva. Estimativas diferentes geram resultados diferentes.
          </p>
          <p>
            O resultado esportivo continua incerto, independentemente do cálculo. Uma aposta que parece matematicamente favorável manter pode perder; uma oferta de cashout aparentemente abaixo do justo pode ser acertada dependendo do que acontecer no evento.
          </p>
          <InfoNote tone="red">
            Apostas envolvem risco financeiro. Nenhuma calculadora garante lucro, decisão correta ou resultado favorável. Use as ferramentas como apoio ao cálculo.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Cashout e jogo responsável */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Cashout e jogo responsável</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Cashout pode reduzir risco, mas também pode estimular decisões impulsivas — especialmente em jogos ao vivo, onde as emoções são mais intensas e o tempo para decidir é menor.
          </p>
          <ul className="list-none space-y-2">
            {[
              'Não use cashout para perseguir perdas ou "salvar" uma aposta ruim.',
              'Defina limites antes de apostar, não durante o jogo.',
              'Não use dinheiro essencial para despesas pessoais.',
              'Faça pausas quando sentir pressão emocional para decidir.',
              'Se perceber dificuldade em controlar decisões de jogo, busque orientação.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-xs items-start">
                <span style={{ color: '#4ade80' }} className="shrink-0 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              ['/jogo-responsavel', 'Jogo responsável'],
              ['/calculadoras/gestao-banca', 'Gestão de Banca'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </ContentCard>

      {/* Conclusão */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Conclusão</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Cashout justo é uma estimativa matemática baseada em retorno potencial e probabilidade atual. A oferta da casa pode estar acima, próxima ou abaixo dessa estimativa — e cada cenário tem uma interpretação diferente. A calculadora ajuda a entender a diferença, mas não determina a decisão correta.
          </p>
          <p>
            Use a Calculadora de Cashout Justo / Manual do CalculaBet para comparar a oferta da casa com uma estimativa própria e ter mais clareza antes de decidir.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              ['/calculadoras/cashout', 'Calculadora de Cashout'],
              ['/calculadoras/hedge', 'Calculadora de Hedge'],
              ['/calculadoras/value-bet', 'Value Bet / EV'],
              ['/calculadoras/odds', 'Calculadora de Odds'],
              ['/calculadoras/roi', 'ROI em Apostas'],
              ['/blog/cashout-apostas', 'Artigo: Cashout em apostas'],
              ['/blog/como-calcular-ev-apostas', 'Como calcular EV'],
              ['/jogo-responsavel', 'Jogo responsável'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </ContentCard>

    </article>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseNum(v) {
  if (typeof v === 'string') v = v.replace(',', '.');
  return parseFloat(v);
}

function fmtBRL(v) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(v, decimals = 2) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + '%';
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EXEMPLO = {
  valorApostado: '100',
  oddOriginal: '2.50',
  cashoutOferecido: '160',
  probabilidade: '70',
  nomeAposta: 'Time A vence',
};

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({ label, value, sub, highlight, tone = 'default' }) {
  const tones = {
    default: { border: 'var(--border)',          bg: 'rgba(255,255,255,0.025)', val: 'var(--text-1)' },
    cyan:    { border: 'rgba(34,211,238,0.25)',  bg: 'rgba(34,211,238,0.06)',  val: '#22d3ee' },
    green:   { border: 'rgba(74,222,128,0.25)',  bg: 'rgba(74,222,128,0.06)',  val: '#4ade80' },
    amber:   { border: 'rgba(251,191,36,0.25)',  bg: 'rgba(251,191,36,0.06)',  val: '#fbbf24' },
    red:     { border: 'rgba(248,113,113,0.25)', bg: 'rgba(248,113,113,0.06)', val: '#f87171' },
  };
  const s = tones[tone] || tones.default;
  return (
    <div className="rounded-2xl p-4" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
      <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>{label}</p>
      <p className="text-xl font-bold font-mono leading-tight" style={{ color: highlight ? s.val : 'var(--text-1)' }}>{value}</p>
      {sub && <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>{sub}</p>}
    </div>
  );
}

// ─── Comparison Bar ───────────────────────────────────────────────────────────

function ComparisonBar({ oferecido, justo }) {
  const max = Math.max(oferecido, justo) * 1.1;
  const pctOferecido = Math.min((oferecido / max) * 100, 100);
  const pctJusto = Math.min((justo / max) * 100, 100);
  const colorOferecido = oferecido >= justo ? '#4ade80' : '#f87171';

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span style={{ color: 'var(--text-3)' }}>Cashout oferecido</span>
          <span className="font-mono font-semibold" style={{ color: colorOferecido }}>R$ {fmtBRL(oferecido)}</span>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pctOferecido}%`, background: colorOferecido }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span style={{ color: 'var(--text-3)' }}>Cashout justo estimado</span>
          <span className="font-mono font-semibold" style={{ color: '#22d3ee' }}>R$ {fmtBRL(justo)}</span>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pctJusto}%`, background: '#22d3ee' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

export default function CashoutJusto() {
  const [valorApostado, setValorApostado] = useState('');
  const [oddOriginal, setOddOriginal] = useState('');
  const [cashoutOferecido, setCashoutOferecido] = useState('');
  const [probabilidade, setProbabilidade] = useState('');
  const [nomeAposta, setNomeAposta] = useState('');
  const [calculado, setCalculado] = useState(false);
  const [erro, setErro] = useState('');

  const resetCalc = () => { setCalculado(false); setErro(''); };

  const calcular = () => {
    const va = parseNum(valorApostado);
    const odd = parseNum(oddOriginal);
    const co = parseNum(cashoutOferecido);
    const prob = parseNum(probabilidade);

    if (!valorApostado || isNaN(va) || va <= 0) return setErro('Insira um valor apostado válido.');
    if (!oddOriginal || isNaN(odd) || odd <= 1) return setErro('Insira uma odd decimal válida maior que 1.00.');
    if (!cashoutOferecido || isNaN(co) || co < 0) return setErro('Insira um valor de cashout válido.');
    if (!probabilidade || isNaN(prob) || prob <= 0 || prob >= 100) return setErro('Insira uma probabilidade entre 0% e 100%.');

    setErro('');
    setCalculado(true);
  };

  const limpar = () => {
    setValorApostado(''); setOddOriginal(''); setCashoutOferecido('');
    setProbabilidade(''); setNomeAposta('');
    setCalculado(false); setErro('');
  };

  const carregarExemplo = () => {
    setValorApostado(EXEMPLO.valorApostado); setOddOriginal(EXEMPLO.oddOriginal);
    setCashoutOferecido(EXEMPLO.cashoutOferecido); setProbabilidade(EXEMPLO.probabilidade);
    setNomeAposta(EXEMPLO.nomeAposta);
    setCalculado(false); setErro('');
  };

  // Computed
  const va = parseNum(valorApostado) || 0;
  const odd = parseNum(oddOriginal) || 0;
  const co = parseNum(cashoutOferecido) || 0;
  const prob = parseNum(probabilidade) || 0;

  const allValid = calculado && va > 0 && odd > 1 && co >= 0 && prob > 0 && prob < 100;

  let retornoPotencial = 0, lucroPotencial = 0, cashoutJusto = 0;
  let diferenca = 0, descontoPercentual = 0;

  if (allValid) {
    retornoPotencial = va * odd;
    lucroPotencial = va * (odd - 1);
    cashoutJusto = retornoPotencial * (prob / 100);
    diferenca = co - cashoutJusto;
    descontoPercentual = cashoutJusto > 0 ? (diferenca / cashoutJusto) * 100 : 0;
  }

  // Interpretation
  let interpretacao = '';
  let interpreTone = 'cyan';
  if (allValid) {
    if (descontoPercentual > 3) {
      interpretacao = 'A oferta está acima do valor justo estimado com os dados inseridos. Ainda assim, o cálculo depende da probabilidade estimada e não garante que aceitar seja a melhor decisão.';
      interpreTone = 'green';
    } else if (descontoPercentual >= -3) {
      interpretacao = 'A oferta está próxima do valor justo estimado. Pequenas diferenças podem depender da margem da casa, do risco e da sua tolerância à variância.';
      interpreTone = 'cyan';
    } else {
      interpretacao = 'A oferta está abaixo do valor justo estimado com os dados inseridos. Isso pode indicar desconto/margem na proposta de cashout, mas a decisão ainda depende de risco e preferência pessoal.';
      interpreTone = 'amber';
    }
  }

  // Alerts
  const alertaAltaProb = !isNaN(prob) && prob > 90;
  const alertaBaixaProb = !isNaN(prob) && prob > 0 && prob < 10;
  const alertaCashoutAbaixoStake = allValid && co < va;
  const alertaCashoutAcimaRetorno = allValid && co > retornoPotencial;

  const toneInterpretacao = {
    green: { bg: 'rgba(74,222,128,0.06)', border: 'rgba(74,222,128,0.22)', color: '#4ade80' },
    cyan:  { bg: 'rgba(34,211,238,0.06)', border: 'rgba(34,211,238,0.22)', color: '#22d3ee' },
    amber: { bg: 'rgba(251,191,36,0.06)', border: 'rgba(251,191,36,0.22)', color: '#fbbf24' },
  };
  const sInterp = toneInterpretacao[interpreTone] || toneInterpretacao.cyan;

  return (
    <CalcLayout
      title="Calculadora de Cashout Justo: Calcule Valor Manual"
      description="Use a calculadora de cashout justo para comparar a oferta da casa com valor esperado, probabilidade atual e retorno potencial da aposta."
      slug="cashout-justo"
      faqs={faqs}
      schema={faqSchema}
      explanation={<Explanation />}
    >
      <div className="space-y-6">

        {/* Instrução */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Como usar</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Informe os dados da aposta original, o cashout oferecido e sua estimativa de probabilidade atual. A calculadora compara a oferta com uma estimativa de valor justo.
          </p>
        </div>

        {/* Exemplo */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs" style={{ color: 'var(--text-3)' }}>Carregar exemplo:</span>
          <button type="button" onClick={carregarExemplo} className="btn-ghost text-xs px-3 py-1.5">
            R$100 na odd 2.50 — cashout R$160 — prob. 70%
          </button>
        </div>

        {/* Campos da aposta */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Dados da aposta</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="cj-stake">Valor apostado (R$)</label>
              <input id="cj-stake" type="text" inputMode="decimal" className="input-field" placeholder="Ex: 100"
                value={valorApostado} onChange={e => { setValorApostado(e.target.value); resetCalc(); }} />
            </div>
            <div>
              <label className="label" htmlFor="cj-odd">Odd original (decimal)</label>
              <input id="cj-odd" type="text" inputMode="decimal" className="input-field" placeholder="Ex: 2.50"
                value={oddOriginal} onChange={e => { setOddOriginal(e.target.value); resetCalc(); }} />
            </div>
          </div>
        </div>

        {/* Campos do cashout */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Cashout e probabilidade</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="cj-co">Cashout oferecido pela casa (R$)</label>
              <input id="cj-co" type="text" inputMode="decimal" className="input-field" placeholder="Ex: 160"
                value={cashoutOferecido} onChange={e => { setCashoutOferecido(e.target.value); resetCalc(); }} />
            </div>
            <div>
              <label className="label" htmlFor="cj-prob">Probabilidade atual estimada de acerto (%)</label>
              <input id="cj-prob" type="text" inputMode="decimal" className="input-field" placeholder="Ex: 70"
                value={probabilidade} onChange={e => { setProbabilidade(e.target.value); resetCalc(); }} />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="cj-nome">Nome da aposta (opcional)</label>
              <input id="cj-nome" type="text" className="input-field" placeholder="Ex: Time A vence"
                value={nomeAposta} onChange={e => setNomeAposta(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Alertas de validação */}
        {alertaAltaProb && (
          <div className="rounded-2xl p-4" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#fbbf24' }}>
              ⚠ Probabilidades acima de 90% podem gerar excesso de confiança. Verifique se sua estimativa é realista.
            </p>
          </div>
        )}
        {alertaBaixaProb && (
          <div className="rounded-2xl p-4" style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#f87171' }}>
              ⚠ Probabilidade muito baixa indica risco elevado de perda. O resultado ainda é incerto.
            </p>
          </div>
        )}

        {/* Erro */}
        {erro && (
          <div className="rounded-2xl p-4" style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.18)' }}>
            <p className="text-sm" style={{ color: '#f87171' }}>{erro}</p>
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-primary" onClick={calcular}>Calcular cashout justo</button>
          <button type="button" className="btn-ghost" onClick={limpar}>Limpar</button>
        </div>

        {/* ── RESULTADOS ── */}
        {allValid && (
          <div className="space-y-6 pt-2">

            {/* Nome da aposta */}
            {nomeAposta && (
              <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.16)' }}>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>Aposta</p>
                <p className="text-base font-semibold mt-1" style={{ color: 'var(--text-1)' }}>{nomeAposta}</p>
              </div>
            )}

            {/* A — Resumo da aposta */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Resumo da aposta</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <ResultCard label="Valor apostado" value={`R$ ${fmtBRL(va)}`} />
                <ResultCard label="Odd original" value={odd.toFixed(2)} />
                <ResultCard label="Retorno potencial" value={`R$ ${fmtBRL(retornoPotencial)}`} highlight tone="cyan" />
                <ResultCard label="Lucro potencial" value={`R$ ${fmtBRL(lucroPotencial)}`} highlight tone="cyan" />
              </div>
            </div>

            {/* Alertas especiais */}
            {alertaCashoutAbaixoStake && (
              <div className="rounded-2xl p-4" style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }}>
                <p className="text-sm leading-relaxed" style={{ color: '#f87171' }}>
                  ⚠ O cashout oferecido está abaixo do valor apostado. Isso pode ocorrer quando a aposta perdeu valor durante o evento.
                </p>
              </div>
            )}
            {alertaCashoutAcimaRetorno && (
              <div className="rounded-2xl p-4" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)' }}>
                <p className="text-sm leading-relaxed" style={{ color: '#fbbf24' }}>
                  ⚠ O cashout oferecido é maior que o retorno potencial original. Verifique se os dados foram inseridos corretamente.
                </p>
              </div>
            )}

            {/* B — Comparação cashout */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Comparação de cashout</p>
              <div className="rounded-2xl p-5 space-y-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
                <ComparisonBar oferecido={co} justo={cashoutJusto} />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <ResultCard label="Cashout oferecido" value={`R$ ${fmtBRL(co)}`} highlight tone={co >= cashoutJusto ? 'green' : 'amber'} />
                  <ResultCard label="Cashout justo estimado" value={`R$ ${fmtBRL(cashoutJusto)}`} highlight tone="cyan" />
                  <ResultCard
                    label="Diferenca em R$"
                    value={`${diferenca >= 0 ? '+' : ''}R$ ${fmtBRL(Math.abs(diferenca))}`}
                    sub={diferenca >= 0 ? 'Acima da estimativa' : 'Abaixo da estimativa'}
                    highlight
                    tone={diferenca >= 0 ? 'green' : 'red'}
                  />
                  <ResultCard
                    label="Diferenca %"
                    value={`${descontoPercentual >= 0 ? '+' : ''}${fmtPct(Math.abs(descontoPercentual))}`}
                    sub={descontoPercentual >= 0 ? 'Prêmio vs estimativa' : 'Desconto vs estimativa'}
                    highlight
                    tone={descontoPercentual >= 0 ? 'green' : 'red'}
                  />
                </div>
              </div>
            </div>

            {/* C — Probabilidade e EV */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Probabilidade e valor esperado</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Probabilidade estimada" value={fmtPct(prob, 0)} sub="Estimativa do usuario" />
                <ResultCard label="EV de manter aposta" value={`R$ ${fmtBRL(cashoutJusto)}`} sub="= Cashout justo estimado" highlight tone="cyan" />
                <ResultCard label="Valor garantido (aceitar)" value={`R$ ${fmtBRL(co)}`} sub="Cashout oferecido" highlight tone={co >= cashoutJusto ? 'green' : 'amber'} />
              </div>
            </div>

            {/* D — Interpretação */}
            <div className="rounded-2xl p-5 space-y-3" style={{ background: sInterp.bg, border: `1px solid ${sInterp.border}` }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: sInterp.color }}>Interpretação</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{interpretacao}</p>
            </div>

            {/* Callout obrigatório */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: '#22d3ee' }}>Cashout justo é uma estimativa</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                A calculadora não prevê resultados e não recomenda aceitar ou recusar a oferta. A probabilidade atual é estimada pelo usuário e pode ser diferente da avaliação da casa. Apostas envolvem risco financeiro.{' '}
                <Link to="/jogo-responsavel" style={{ color: '#22d3ee' }} className="underline underline-offset-2">Jogo responsável</Link>.
              </p>
            </div>

          </div>
        )}

      </div>
    </CalcLayout>
  );
}
