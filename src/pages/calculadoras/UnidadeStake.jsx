import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

// ─── FAQ ────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'O que é unidade em apostas?',
    a: 'Unidade é uma forma de padronizar o valor apostado em relação à banca total. Em vez de decidir aleatoriamente o valor de cada aposta, o usuário define uma unidade — normalmente um percentual fixo da banca — e usa esse valor como referência para todas as apostas. Isso ajuda a controlar a exposição e evitar apostas impulsivas.',
  },
  {
    q: 'O que é stake fixa?',
    a: 'Stake fixa é a estratégia de apostar sempre o mesmo valor ou percentual definido da banca, independentemente da odd, do evento ou do resultado anterior. É uma das formas mais simples de gestão de banca e ajuda a manter disciplina, mas não garante lucro nem elimina o risco financeiro das apostas.',
  },
  {
    q: 'Como calcular uma unidade de aposta?',
    a: 'A fórmula é simples: Unidade = Banca × (Percentual / 100). Por exemplo, com banca de R$1.000 e percentual de 1%, a unidade vale R$10. Com 2%, vale R$20. A calculadora acima faz esse cálculo automaticamente.',
  },
  {
    q: 'Quanto devo apostar por jogo?',
    a: 'Não existe valor universal. Depende da banca, do perfil de risco e do controle pessoal de cada pessoa. Percentuais menores reduzem a exposição por aposta e deixam mais margem para sequências negativas. Percentuais altos aumentam o risco e podem comprometer a banca mais rapidamente. Essa ferramenta é educativa e não faz recomendações personalizadas.',
  },
  {
    q: 'O que significa apostar 1% da banca?',
    a: 'Apostar 1% da banca significa usar como stake 1% do valor total disponível para apostas. Com banca de R$1.000, 1% equivale a R$10 por aposta. Com R$500, equivale a R$5. É um percentual frequentemente citado em contextos educativos como conservador, mas nenhum percentual garante resultados positivos.',
  },
  {
    q: 'O que significa apostar 2% da banca?',
    a: 'Apostar 2% da banca significa usar como stake 2% do total disponível. Com banca de R$1.000, são R$20 por aposta. Percentuais acima de 1% aumentam o impacto de cada resultado sobre a banca total e exigem maior atenção ao controle de perdas consecutivas.',
  },
  {
    q: 'Stake fixa garante lucro?',
    a: 'Não. Stake fixa é uma ferramenta de organização e controle de banca, não uma estratégia que garante lucro. O resultado das apostas depende de odds, probabilidades, variância e fatores externos que nenhuma forma de gestão consegue controlar completamente.',
  },
  {
    q: 'Qual a diferença entre stake fixa e Kelly?',
    a: 'Stake fixa usa um percentual definido sem considerar odds ou probabilidade do evento. O Critério de Kelly usa a odd e uma estimativa de probabilidade para sugerir o tamanho da stake. Kelly pode ser mais eficiente quando a estimativa de probabilidade é precisa, mas também pode sugerir exposição agressiva. Stake fixa é mais simples e previsível para iniciantes.',
  },
  {
    q: 'Qual a diferença entre unidade e banca?',
    a: 'Banca é o valor total separado para apostas. Unidade é o valor de cada aposta individual, calculado como percentual da banca. A banca diminui ou aumenta conforme os resultados; a unidade deve ser recalculada periodicamente para acompanhar a banca atual.',
  },
  {
    q: 'Posso usar stake fixa com banca pequena?',
    a: 'Sim. Stake fixa funciona com qualquer tamanho de banca. Com banca pequena, os valores de cada unidade serão menores, mas a lógica de controle é a mesma. O importante é manter a disciplina de usar sempre o percentual definido e não apostar dinheiro essencial para despesas pessoais.',
  },
  {
    q: 'Como calcular unidade com banca de R$100?',
    a: 'Com banca de R$100: 0,5% = R$0,50 por aposta; 1% = R$1,00; 2% = R$2,00; 5% = R$5,00. Insira esses valores na calculadora para ver o cálculo completo e entender a exposição de cada percentual.',
  },
  {
    q: 'Como calcular unidade com banca de R$1.000?',
    a: 'Com banca de R$1.000: 0,5% = R$5,00 por aposta; 1% = R$10,00; 2% = R$20,00; 3% = R$30,00; 5% = R$50,00. Use a calculadora para ver quantas apostas perdidas cada percentual representa em relação ao total da banca.',
  },
  {
    q: 'É perigoso apostar 5% da banca?',
    a: 'Percentuais acima de 5% por aposta aumentam significativamente o impacto de cada resultado na banca total. Com 5%, uma sequência de 20 perdas consecutivas pode esgotar a banca. Isso não é previsão — é matemática. Percentuais altos amplificam tanto ganhos quanto perdas, e devem ser considerados com atenção ao risco.',
  },
  {
    q: 'A calculadora de unidade prevê resultados?',
    a: 'Não. A Calculadora de Unidade / Stake Fixa do CalculaBet realiza apenas cálculos matemáticos de percentual e valor com base nos dados inseridos. Ela não prevê resultados esportivos, não recomenda apostas, não acessa dados externos e não garante qualquer retorno financeiro.',
  },
  {
    q: 'Como usar stake fixa com responsabilidade?',
    a: 'Defina a banca e o percentual antes de apostar. Não mude as regras após uma perda. Não use dinheiro essencial para despesas. Aceite que perdas fazem parte do risco. Faça pausas quando sentir pressão emocional. Revise a banca periodicamente. Se perceber perda de controle, busque orientação na página de jogo responsável.',
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

// ─── Perfil helper ────────────────────────────────────────────────────────────

function interpretarPerfil(pct) {
  if (pct <= 0.5) return { cor: '#22d3ee',  perfil: 'Muito conservador', texto: 'Exposição muito baixa por aposta. Pode ajudar a manter a banca por mais tempo, mas não elimina risco nem garante lucro.' };
  if (pct <= 1)   return { cor: '#4ade80',  perfil: 'Conservador',       texto: 'Percentual frequentemente citado como conservador em contextos educativos. Não representa recomendação personalizada.' };
  if (pct <= 2)   return { cor: '#fbbf24',  perfil: 'Moderado',          texto: 'Exposição maior por aposta. Exige atenção ao controle emocional e à sequência de resultados.' };
  if (pct <= 5)   return { cor: '#fb923c',  perfil: 'Agressivo',         texto: 'Impacto relevante por aposta. Uma sequência de perdas pode reduzir a banca rapidamente.' };
  return           { cor: '#f87171',  perfil: 'Muito agressivo',  texto: 'Percentuais acima de 5% aumentam muito o risco de comprometer a banca em poucas perdas consecutivas.' };
}

// ─── SEO Explanation ─────────────────────────────────────────────────────────

function Explanation() {
  const t = { color: 'var(--text-2)' };
  const h = { color: 'var(--text-1)' };

  return (
    <article className="space-y-8">

      <header className="space-y-4">
        <span className="badge badge-cyan">Guia educativo completo</span>
        <h2 className="section-title">Calculadora de unidade e stake fixa em apostas</h2>
        <p className="text-base leading-relaxed" style={t}>
          A calculadora de unidade do CalculaBet ajuda a calcular o valor de uma unidade de aposta com base na sua banca e no percentual definido. O conteúdo abaixo explica os conceitos, fórmulas e exemplos práticos. Esta ferramenta é exclusivamente educativa — não prevê resultados, não recomenda apostas e não garante lucro.
        </p>
      </header>

      {/* O que é unidade */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é unidade em apostas?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Unidade é uma forma de padronizar o valor apostado em relação à banca total. Em vez de escolher aleatoriamente o quanto colocar em cada aposta, o apostador define uma unidade — normalmente um percentual fixo da banca — e usa esse valor como referência consistente.
          </p>
          <p>
            Essa abordagem ajuda a evitar apostas impulsivas, facilita o registro de resultados e torna mais fácil comparar desempenho ao longo do tempo. Ao registrar resultados em unidades em vez de valores absolutos em reais, fica mais simples analisar se a estratégia está funcionando, independentemente do tamanho da banca.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            {[
              ['Padroniza apostas', 'Usa um percentual fixo da banca como referência, independentemente do evento ou da odd.'],
              ['Facilita o registro', 'Anotações em unidades são comparáveis mesmo quando a banca muda de tamanho.'],
              ['Não garante lucro', 'Unidade é uma ferramenta de controle, não uma previsão de resultado.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.10)' }}>
                <p className="text-xs font-semibold mb-1.5" style={{ color: '#22d3ee' }}>{title}</p>
                <p className="text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <InfoNote>
            Unidade ajuda a padronizar apostas e controlar exposição, mas não prevê resultados nem garante lucro. Apostas envolvem risco financeiro.
          </InfoNote>
        </div>
      </ContentCard>

      {/* O que é stake fixa */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é stake fixa?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Stake fixa é a estratégia de apostar sempre o mesmo valor ou percentual definido da banca, independentemente da odd, do evento ou do resultado anterior. É uma das formas mais simples de <Link to="/calculadoras/gestao-banca" className="font-medium" style={{ color: '#22d3ee' }}>gestão de banca</Link> e ajuda iniciantes a entender exposição e controle.
          </p>
          <p>
            Com stake fixa, você define o percentual uma vez — por exemplo, 1% da banca — e usa esse valor em todas as apostas, sem aumentar após uma derrota nem reduzir após uma vitória. Isso evita o comportamento de dobrar a aposta para recuperar perdas, que costuma ser arriscado.
          </p>
          <InfoNote tone="amber">
            <strong>Importante:</strong> stake fixa não garante lucro. Ela apenas organiza o tamanho das apostas. O resultado depende de odds, acertos, mercados e variância.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Como calcular */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como calcular uma unidade de aposta?</h2>
        <div className="space-y-5 text-sm leading-relaxed" style={t}>
          <p>A fórmula é direta:</p>
          <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.08))', border: '1px solid rgba(103,232,249,0.20)' }}>
            <p className="badge badge-cyan mb-3 text-xs">Fórmula</p>
            <p className="text-lg font-bold font-mono" style={{ color: 'var(--text-1)' }}>Unidade = Banca × (Percentual / 100)</p>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              Exemplo: Banca R$1.000 × 1% = R$10 por unidade.
            </p>
          </div>
          <p>
            Se o usuário quiser apostar mais de uma unidade por evento, multiplica o valor da unidade pela quantidade: <span className="font-mono font-medium" style={{ color: '#67e8f9' }}>Stake total = Unidade × Quantidade de unidades</span>.
          </p>
        </div>
      </ContentCard>

      {/* Quanto apostar */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Quanto apostar por jogo?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Não existe um valor universal correto. O tamanho ideal da stake depende da banca, do perfil de risco, da tolerância a perdas e do controle pessoal de cada pessoa. Os percentuais abaixo são apenas referências educativas — não representam recomendações financeiras.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['0,5%', 'Muito baixa exposição. Perde menos por sequência negativa.'],
              ['1%', 'Exposição baixa. Mais apostas cabem na banca antes de esgotar.'],
              ['2%', 'Exposição moderada. Impacto maior de cada resultado.'],
              ['5%', 'Exposição alta. Sequências negativas afetam a banca rapidamente.'],
            ].map(([pct, desc]) => (
              <div key={pct} className="flex gap-3 rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                <span className="font-bold font-mono text-sm shrink-0 pt-0.5" style={{ color: '#67e8f9' }}>{pct}</span>
                <span className="text-xs leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
          <InfoNote tone="amber">
            Percentuais são referências educativas. Nenhum percentual garante resultados positivos. Esta ferramenta não faz recomendações personalizadas.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Exemplos */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Exemplo com banca de R$100</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <table className="w-full text-left text-xs">
              <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
                <tr>
                  <th className="p-3 font-semibold">Percentual</th>
                  <th className="p-3 font-semibold">Valor por aposta</th>
                  <th className="p-3 font-semibold">Apostas até zerar</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-2)' }}>
                {[['0,5%', 'R$0,50', '~200'], ['1%', 'R$1,00', '~100'], ['2%', 'R$2,00', '~50'], ['5%', 'R$5,00', '~20']].map(([p, v, a]) => (
                  <tr key={p} className="border-t border-white/5">
                    <td className="p-3 font-mono font-medium" style={{ color: 'var(--text-1)' }}>{p}</td>
                    <td className="p-3 font-mono">{v}</td>
                    <td className="p-3">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Com banca pequena, tentar crescer rápido com percentuais altos pode comprometer a banca em poucas perdas consecutivas. Stake fixa ajuda a visualizar limites com clareza.</p>
        </div>
      </ContentCard>

      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Exemplo com banca de R$1.000</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <table className="w-full text-left text-xs">
              <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
                <tr>
                  <th className="p-3 font-semibold">Percentual</th>
                  <th className="p-3 font-semibold">Valor por aposta</th>
                  <th className="p-3 font-semibold">Apostas até zerar</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-2)' }}>
                {[['0,5%', 'R$5,00', '~200'], ['1%', 'R$10,00', '~100'], ['2%', 'R$20,00', '~50'], ['3%', 'R$30,00', '~33'], ['5%', 'R$50,00', '~20']].map(([p, v, a]) => (
                  <tr key={p} className="border-t border-white/5">
                    <td className="p-3 font-mono font-medium" style={{ color: 'var(--text-1)' }}>{p}</td>
                    <td className="p-3 font-mono">{v}</td>
                    <td className="p-3">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ContentCard>

      {/* Stake fixa vs Kelly */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Stake fixa vs Critério de Kelly</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            O <Link to="/blog/criterio-de-kelly-apostas" className="font-medium" style={{ color: '#22d3ee' }}>Critério de Kelly</Link> é uma fórmula que usa a odd e uma estimativa de probabilidade para sugerir o tamanho da stake. Stake fixa usa um percentual definido, sem depender de probabilidade estimada.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['Stake fixa', ['Simples e previsível', 'Não depende de probabilidade estimada', 'Fácil de manter com disciplina', 'Não considera o valor esperado da aposta']],
              ['Critério de Kelly', ['Usa odd e probabilidade estimada', 'Pode sugerir exposição maior ou menor', 'Mais eficiente quando a estimativa é precisa', 'Pode ser agressivo com estimativas imprecisas']],
            ].map(([title, items]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                <p className="font-semibold text-xs mb-3" style={{ color: 'var(--text-1)' }}>{title}</p>
                <ul className="space-y-1.5">
                  {items.map(item => <li key={item} className="flex gap-2 text-xs"><span style={{ color: '#22d3ee' }}>→</span>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p>
            Para calcular stakes usando Kelly, use a <Link to="/calculadoras/gestao-banca" className="font-medium" style={{ color: '#22d3ee' }}>Calculadora de Gestão de Banca</Link>. Ambos os métodos não garantem lucro.
          </p>
        </div>
      </ContentCard>

      {/* Stake fixa e gestão */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Stake fixa e gestão de banca</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            <Link to="/calculadoras/gestao-banca" className="font-medium" style={{ color: '#22d3ee' }}>Gestão de banca</Link> envolve limites, registro, controle emocional e definição de exposição. Stake fixa é uma das formas mais simples de implementar gestão de banca — mas não é a única.
          </p>
          <p>
            Para completar a gestão, é importante também registrar resultados, calcular <Link to="/calculadoras/roi" className="font-medium" style={{ color: '#22d3ee' }}>ROI</Link> periodicamente e revisar a banca atual para ajustar o valor de cada unidade conforme necessário.
          </p>
          <InfoNote tone="amber">
            Stake fixa não deve ser usada para recuperar perdas. Aumentar a aposta após derrota para compensar o prejuízo é um erro comum que aumenta o risco.
          </InfoNote>
          <div className="flex flex-wrap gap-2">
            <Link to="/calculadoras/gestao-banca" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.15)' }}>
              Calculadora de Gestão de Banca →
            </Link>
            <Link to="/blog/o-que-e-gestao-de-banca" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              O que é gestão de banca →
            </Link>
          </div>
        </div>
      </ContentCard>

      {/* Erros comuns */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Erros comuns ao definir stake</h2>
        <div className="space-y-3 text-sm leading-relaxed" style={t}>
          <ul className="space-y-2.5">
            {[
              'Apostar valor aleatório sem definir percentual antes.',
              'Aumentar a stake após perder para tentar recuperar o prejuízo.',
              'Usar percentual alto demais por impaciência ou confiança excessiva.',
              'Não separar a banca de apostas do dinheiro pessoal.',
              'Não registrar apostas, odds e resultados.',
              'Mudar o percentual da unidade a cada aposta sem critério definido.',
              'Apostar dinheiro essencial para contas, alimentação ou moradia.',
              'Confundir confiança em um palpite com vantagem matemática real.',
              'Não revisar e ajustar a unidade quando a banca muda muito.',
              'Ignorar limites de tempo e valor definidos antes de apostar.',
            ].map((text, i) => (
              <li key={i} className="flex gap-2.5 text-xs">
                <span style={{ color: '#f87171', flexShrink: 0 }}>✗</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </ContentCard>

      {/* Garante lucro */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>A calculadora de unidade garante lucro?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Não. A Calculadora de Unidade / Stake Fixa do CalculaBet realiza apenas cálculos matemáticos de percentual e valor com base nos dados inseridos. Ela não prevê resultados esportivos, não indica qual aposta fazer e não garante qualquer retorno financeiro.
          </p>
          <InfoNote tone="amber">
            Apostas envolvem risco financeiro real. Nenhuma calculadora, estratégia ou ferramenta elimina esse risco ou transforma apostas em investimento seguro. +18. O CalculaBet não é uma casa de apostas.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Responsabilidade */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como usar stake fixa com responsabilidade</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <ul className="space-y-2.5">
            {[
              'Defina o percentual da unidade antes de apostar, sem pressão emocional.',
              'Não use dinheiro essencial — salário, contas, alimentação ou compromissos.',
              'Respeite o limite definido mesmo após uma sequência negativa.',
              'Revise a banca periodicamente e ajuste o valor da unidade se necessário.',
              'Aceite que perdas fazem parte do risco de apostas esportivas.',
              'Faça pausas quando perceber ansiedade, pressa ou irritação.',
              'Busque ajuda se perceber dificuldade em controlar apostas.',
            ].map((text, i) => (
              <li key={i} className="flex gap-2.5 text-xs">
                <span style={{ color: '#4ade80', flexShrink: 0 }}>✓</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link to="/jogo-responsavel" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: '#fbbf24', background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.15)' }}>
              Jogo responsável →
            </Link>
            <Link to="/calculadoras/gestao-banca" className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
              Calculadora de Gestão de Banca →
            </Link>
          </div>
        </div>
      </ContentCard>

      {/* Conclusão */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Conclusão</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Definir uma unidade de aposta é um passo simples e eficaz para organizar a exposição e evitar decisões impulsivas. A stake fixa padroniza o valor por aposta, facilita o registro de resultados e ajuda a manter disciplina ao longo do tempo.
          </p>
          <p>
            Use a Calculadora de Unidade / Stake Fixa para calcular rapidamente o valor da sua unidade com base na banca e no percentual definido — e entender de forma visual quanto representa cada percentual em relação ao total disponível.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              ['/calculadoras/gestao-banca', 'Gestão de Banca'],
              ['/calculadoras/roi', 'ROI em Apostas'],
              ['/calculadoras/value-bet', 'Value Bet / EV'],
              ['/calculadoras/martingale', 'Simulador Martingale'],
              ['/blog/apostas-esportivas-para-iniciantes', 'Guia para iniciantes'],
              ['/blog/o-que-e-gestao-de-banca', 'O que é gestão de banca'],
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

// ─── Main Calculator ──────────────────────────────────────────────────────────

const EXEMPLO = { banca: '1000', percentual: '1', unidades: '1', nome: 'Stake fixa conservadora' };

const REF_PCTS = [0.5, 1, 2, 3, 5];

export default function UnidadeStake() {
  const [banca, setBanca] = useState('');
  const [percentual, setPercentual] = useState('');
  const [unidades, setUnidades] = useState('1');
  const [nome, setNome] = useState('');
  const [calculado, setCalculado] = useState(false);
  const [erro, setErro] = useState('');

  const calcular = () => {
    const b = parseNum(banca);
    const p = parseNum(percentual);
    const u = parseNum(unidades) || 1;
    if (!banca || isNaN(b) || b <= 0) return setErro('Insira uma banca válida.');
    if (!percentual || isNaN(p) || p <= 0 || p > 100) return setErro('Insira um percentual entre 0,1% e 100%.');
    if (isNaN(u) || u <= 0) return setErro('Insira uma quantidade de unidades válida.');
    setErro('');
    setCalculado(true);
  };

  const limpar = () => {
    setBanca(''); setPercentual(''); setUnidades('1'); setNome('');
    setCalculado(false); setErro('');
  };

  const carregarExemplo = () => {
    setBanca(EXEMPLO.banca); setPercentual(EXEMPLO.percentual);
    setUnidades(EXEMPLO.unidades); setNome(EXEMPLO.nome);
    setCalculado(false); setErro('');
  };

  // Computed
  const b = parseNum(banca);
  const p = parseNum(percentual);
  const u = parseNum(unidades) || 1;
  const allValid = calculado && !isNaN(b) && b > 0 && !isNaN(p) && p > 0 && !isNaN(u) && u > 0;

  let unidade = 0, stakeTotal = 0, percentualTotal = 0, bancaRestante = 0, apostasAteZerar = 0;
  let perfil = null;

  if (allValid) {
    unidade = b * (p / 100);
    stakeTotal = unidade * u;
    percentualTotal = p * u;
    bancaRestante = b - stakeTotal;
    apostasAteZerar = Math.floor(b / stakeTotal);
    perfil = interpretarPerfil(p);
  }

  const alertaAlto = !isNaN(p) && p > 10;

  return (
    <CalcLayout
      title="Calculadora de Unidade: Calcule Stake Fixa em Apostas"
      description="Use a calculadora de unidade para calcular stake fixa, percentual da banca e quanto apostar por jogo com mais controle e responsabilidade."
      slug="unidade-stake"
      faqs={faqs}
      schema={faqSchema}
      explanation={<Explanation />}
    >
      <div className="space-y-6">

        {/* Instrução */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Como usar</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Insira sua banca total e o percentual que deseja usar por aposta. A calculadora mostra o valor de cada unidade, a stake total e a exposição da banca.
          </p>
        </div>

        {/* Botão de exemplo */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs self-center" style={{ color: 'var(--text-3)' }}>Carregar exemplo:</span>
          <button type="button" onClick={carregarExemplo} className="btn-ghost text-xs px-3 py-1.5">
            Banca R$1.000 — 1% por aposta
          </button>
        </div>

        {/* Campos */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="us-banca">Banca total (R$)</label>
            <input
              id="us-banca"
              type="text"
              inputMode="decimal"
              className="input-field"
              placeholder="Ex: 1000"
              value={banca}
              onChange={e => { setBanca(e.target.value); setCalculado(false); setErro(''); }}
            />
          </div>
          <div>
            <label className="label" htmlFor="us-pct">Percentual da banca por aposta (%)</label>
            <input
              id="us-pct"
              type="text"
              inputMode="decimal"
              className="input-field"
              placeholder="Ex: 1"
              value={percentual}
              onChange={e => { setPercentual(e.target.value); setCalculado(false); setErro(''); }}
            />
          </div>
          <div>
            <label className="label" htmlFor="us-unidades">Quantidade de unidades (opcional)</label>
            <input
              id="us-unidades"
              type="text"
              inputMode="decimal"
              className="input-field"
              placeholder="Ex: 1"
              value={unidades}
              onChange={e => { setUnidades(e.target.value); setCalculado(false); setErro(''); }}
            />
          </div>
          <div>
            <label className="label" htmlFor="us-nome">Nome da estratégia (opcional)</label>
            <input
              id="us-nome"
              type="text"
              className="input-field"
              placeholder="Ex: Stake fixa conservadora"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </div>
        </div>

        {/* Alerta percentual alto */}
        {alertaAlto && (
          <div className="rounded-2xl p-4" style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.18)' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#f87171' }}>
              ⚠ Percentuais acima de 10% por aposta representam exposição muito alta e podem comprometer a banca rapidamente.
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
          <button type="button" className="btn-primary" onClick={calcular}>Calcular unidade</button>
          <button type="button" className="btn-ghost" onClick={limpar}>Limpar</button>
        </div>

        {/* ── RESULTADOS ── */}
        {allValid && (
          <div className="space-y-5 pt-2">

            {/* Nome da estratégia */}
            {nome && (
              <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)' }}>
                <p className="text-xs font-semibold" style={{ color: '#22d3ee' }}>Estratégia: <span style={{ color: 'var(--text-1)' }}>{nome}</span></p>
              </div>
            )}

            {/* A — Resumo principal */}
            <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.10), rgba(129,140,248,0.07))', border: '1px solid rgba(103,232,249,0.18)' }}>
              <p className="text-xs font-semibold mb-4" style={{ color: '#67e8f9', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Resumo principal</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  ['Banca total', `R$ ${fmtBRL(b)}`, 'var(--text-1)'],
                  ['Percentual por unidade', fmtPct(p), '#67e8f9'],
                  ['Valor de 1 unidade', `R$ ${fmtBRL(unidade)}`, '#22d3ee'],
                  ['Qtd. de unidades', u % 1 === 0 ? u.toString() : u.toFixed(2), 'var(--text-1)'],
                  ['Stake total', `R$ ${fmtBRL(stakeTotal)}`, '#4ade80'],
                ].map(([label, value, color]) => (
                  <div key={label} className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>{label}</p>
                    <p className="text-lg font-bold font-mono" style={{ color }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* B — Exposição */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold mb-4" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Exposição da banca</p>
              <div className="space-y-3">
                {[
                  ['Percentual total exposto', fmtPct(Math.min(percentualTotal, 100)), percentualTotal > 20 ? '#f87171' : percentualTotal > 10 ? '#fb923c' : '#fbbf24'],
                  ['Banca restante se perder', `R$ ${fmtBRL(Math.max(bancaRestante, 0))}`, bancaRestante < 0 ? '#f87171' : '#4ade80'],
                  ['Apostas desse valor na banca (aprox.)', `~${apostasAteZerar}`, '#67e8f9'],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex justify-between items-center py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <span className="text-sm" style={{ color: 'var(--text-2)' }}>{label}</span>
                    <span className="text-sm font-bold font-mono" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4 leading-relaxed" style={{ color: 'var(--text-3)' }}>
                "Apostas desse valor na banca" é um dado educativo — mostra quantas apostas perdidas consecutivamente equivaleriam ao total da banca. Não é previsão.
              </p>
            </div>

            {/* C — Perfil */}
            {perfil && (
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${perfil.cor}30` }}>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Perfil da exposição</p>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ background: `${perfil.cor}15`, color: perfil.cor, border: `1px solid ${perfil.cor}30` }}>
                    {perfil.perfil}
                  </span>
                  <span className="text-sm font-mono font-bold" style={{ color: perfil.cor }}>{fmtPct(p)} por aposta</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{perfil.texto}</p>
              </div>
            )}

            {/* D — Tabela de referência */}
            {!isNaN(b) && b > 0 && (
              <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold mb-4" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Tabela de referência — banca R${fmtBRL(b)}</p>
                <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                  <table className="w-full text-left text-xs">
                    <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <tr>
                        <th className="p-3 font-semibold">Percentual</th>
                        <th className="p-3 font-semibold">Valor da stake</th>
                        <th className="p-3 font-semibold">Perfil</th>
                        <th className="p-3 font-semibold hidden sm:table-cell">Observação</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: 'var(--text-2)' }}>
                      {REF_PCTS.map(pRef => {
                        const ip = interpretarPerfil(pRef);
                        const val = b * (pRef / 100);
                        const isAtual = Math.abs(pRef - p) < 0.001;
                        return (
                          <tr key={pRef} className="border-t border-white/5" style={isAtual ? { background: 'rgba(34,211,238,0.06)' } : {}}>
                            <td className="p-3 font-mono font-medium" style={{ color: isAtual ? '#67e8f9' : 'var(--text-1)' }}>
                              {pRef}%{isAtual && <span className="ml-1.5 text-xs" style={{ color: '#67e8f9' }}>← atual</span>}
                            </td>
                            <td className="p-3 font-mono">R$ {fmtBRL(val)}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: `${ip.cor}15`, color: ip.cor }}>
                                {ip.perfil}
                              </span>
                            </td>
                            <td className="p-3 hidden sm:table-cell text-xs" style={{ color: 'var(--text-3)' }}>
                              {['~200 apostas na banca', '~100 apostas na banca', '~50 apostas na banca', '~33 apostas na banca', '~20 apostas na banca'][REF_PCTS.indexOf(pRef)]}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-3)' }}>
                  Perfis são referências educativas. Nenhum percentual garante lucro ou elimina risco de perdas.
                </p>
              </div>
            )}

            {/* E — Interpretação textual */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Interpretação</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Com uma banca de <strong style={{ color: 'var(--text-1)' }}>R$ {fmtBRL(b)}</strong> e stake de <strong style={{ color: '#67e8f9' }}>{fmtPct(p)}</strong>, cada unidade vale <strong style={{ color: '#22d3ee' }}>R$ {fmtBRL(unidade)}</strong>.
                {u > 1 && <> Usando {u} {u === 1 ? 'unidade' : 'unidades'}, a stake total por aposta é <strong style={{ color: '#4ade80' }}>R$ {fmtBRL(stakeTotal)}</strong> ({fmtPct(percentualTotal)} da banca).</>}
                {' '}A banca restante após uma perda seria <strong style={{ color: bancaRestante >= 0 ? 'var(--text-1)' : '#f87171' }}>R$ {fmtBRL(Math.max(bancaRestante, 0))}</strong>.
                {nome && <> Estratégia definida: <em style={{ color: '#67e8f9' }}>{nome}</em>.</>}
              </p>
            </div>

            {/* Callout obrigatório */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.18)' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#fbbf24' }}>
                <strong>Stake fixa ajuda a controlar exposição, mas não garante lucro e não elimina perdas.</strong> Apostas envolvem risco financeiro real. Apenas maiores de 18 anos. O CalculaBet não é uma casa de apostas.
              </p>
            </div>

          </div>
        )}
      </div>
    </CalcLayout>
  );
}
