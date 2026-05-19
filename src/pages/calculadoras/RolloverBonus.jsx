import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalcLayout from '../../components/ui/CalcLayout';

// ─── FAQ ────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'O que é rollover em apostas?',
    a: 'Rollover é um requisito de aposta vinculado a bônus ou promoções em plataformas de apostas. Indica quantas vezes determinado valor precisa ser apostado antes que o saldo do bônus possa ser sacado. Por exemplo, um rollover 5x sobre um bônus de R$100 exige R$500 em apostas antes de liberar qualquer saque relacionado àquele bônus. Não significa lucro garantido — é apenas um critério de volume de apostas.',
  },
  {
    q: 'Como calcular rollover de bônus?',
    a: 'A fórmula é: Total exigido = base do rollover × multiplicador. Se o rollover incide apenas sobre o bônus, a base é o valor do bônus. Se incide sobre depósito + bônus, a base é a soma dos dois. Exemplo: bônus R$100, rollover 5x → R$500 exigidos. Com depósito R$100 e bônus R$100, rollover 5x → base R$200 × 5 = R$1.000 exigidos.',
  },
  {
    q: 'O que significa rollover 5x?',
    a: 'Rollover 5x significa que o valor definido como base precisa ser apostado cinco vezes. Se a base é R$100 (bônus), o total exigido é R$500. Se a base é R$200 (depósito + bônus), o total exigido é R$1.000. Não se trata de apostar R$100 cinco vezes separadas — é o volume total acumulado de apostas que deve atingir esse valor.',
  },
  {
    q: 'O que significa rollover 10x?',
    a: 'Rollover 10x exige dez vezes a base em apostas. Com base de R$100, seriam R$1.000 em apostas acumuladas. Com base de R$200, R$2.000. Quanto maior o multiplicador, maior o volume necessário — o que pode aumentar a exposição financeira e exigir mais tempo ou apostas para completar o requisito.',
  },
  {
    q: 'Qual a diferença entre rollover sobre bônus e depósito + bônus?',
    a: 'Rollover apenas sobre o bônus usa somente o valor do bônus como base. Rollover sobre depósito + bônus soma os dois antes de aplicar o multiplicador. Exemplo: bônus R$100, depósito R$100, multiplicador 5x. Sobre bônus: R$100 × 5 = R$500. Sobre depósito + bônus: R$200 × 5 = R$1.000. A diferença é significativa e deve ser verificada diretamente nos termos da promoção.',
  },
  {
    q: 'O que é odd mínima em bônus?',
    a: 'Odd mínima é um requisito de algumas promoções que determina que somente apostas com odd igual ou acima de um valor definido contam para o rollover. Por exemplo, se a odd mínima é 1.50, apostas em eventos com odd menor que 1.50 podem não ser contabilizadas no progresso do requisito. Esse critério varia por plataforma e deve ser verificado nos termos.',
  },
  {
    q: 'Bônus de apostas é dinheiro grátis?',
    a: 'Não. Bônus de apostas geralmente vêm com condições como rollover, odd mínima, prazo e restrições de mercado. Para retirar qualquer valor relacionado ao bônus, é preciso cumprir todos esses requisitos. O descumprimento pode resultar na perda do bônus e de eventuais ganhos associados. Verifique sempre os termos completos antes de aceitar qualquer promoção.',
  },
  {
    q: 'Rollover garante saque?',
    a: 'Não. Completar o rollover é apenas um dos requisitos para solicitar um saque. Podem existir outros critérios como verificação de conta, prazo de processamento, método de pagamento elegível, saldo mínimo e regras específicas da plataforma. Confirme todas as condições diretamente na plataforma antes de participar de qualquer promoção.',
  },
  {
    q: 'A calculadora de rollover garante lucro?',
    a: 'Não. A Calculadora de Rollover de Bônus do CalculaBet realiza cálculos matemáticos com base nos dados inseridos. Ela mostra o volume total exigido, o progresso e a média diária necessária. Não prevê resultados de apostas, não acessa dados externos e não garante lucro, saque ou cumprimento bem-sucedido do rollover.',
  },
  {
    q: 'Como saber quanto falta para cumprir rollover?',
    a: 'Subtraia o valor já apostado do total exigido: Restante = Total exigido − Valor já apostado. A calculadora faz esse cálculo automaticamente e exibe também o progresso percentual e a média diária necessária caso um prazo tenha sido informado.',
  },
  {
    q: 'O que acontece se o prazo acabar?',
    a: 'Se o rollover não for completado dentro do prazo definido pela promoção, o bônus pode ser cancelado e os ganhos associados podem ser perdidos. As consequências variam por plataforma e devem ser verificadas nos termos da promoção. A calculadora permite estimar a média diária necessária para orientar o planejamento — mas não substitui a leitura dos termos.',
  },
  {
    q: 'Todas as apostas contam para rollover?',
    a: 'Não necessariamente. Algumas promoções só contabilizam apostas em mercados específicos, com odds acima de um mínimo, em determinados esportes ou tipos de aposta. Apostas canceladas, apostas no cash-out ou apostas cobertas (hedge) podem não ser contabilizadas. Verifique os termos detalhados da promoção na própria plataforma.',
  },
  {
    q: 'Posso usar qualquer odd para cumprir rollover?',
    a: 'Depende dos termos da promoção. Se houver odd mínima exigida, apostas com odd abaixo desse valor podem não ser contabilizadas no rollover. Alguns bônus definem odds mínimas como 1.50, 1.70 ou 2.00. Verificar esse critério é fundamental antes de começar a apostar para cumprir o requisito.',
  },
  {
    q: 'Rollover alto é arriscado?',
    a: 'Multiplicadores altos exigem maior volume de apostas, o que pode aumentar a exposição financeira, estimular apostas impulsivas e ampliar as perdas potenciais. Não existe garantia de que o bônus será cumprido com resultado positivo. Antes de aceitar uma promoção com rollover alto, avalie se o volume exigido é compatível com seu controle de banca e tolerância ao risco.',
  },
  {
    q: 'Como avaliar uma promoção com responsabilidade?',
    a: 'Leia os termos completos antes de aceitar. Calcule o volume total exigido. Verifique odd mínima, prazo, mercados elegíveis e regras de saque. Avalie se você apostaria esse volume mesmo sem o bônus. Não aposte com dinheiro essencial. Use limites de depósito, tempo e perda nas plataformas. Se houver dificuldade em controlar o comportamento de aposta, acesse recursos de jogo responsável.',
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
    violet:{ bg: 'rgba(167,139,250,0.07)', border: 'rgba(167,139,250,0.2)',  color: '#a78bfa' },
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
        <h2 className="section-title">Calculadora de rollover de bônus em apostas</h2>
        <p className="text-base leading-relaxed" style={t}>
          A Calculadora de Rollover de Bônus do CalculaBet ajuda a entender o volume de apostas exigido por promoções, calcular o progresso e estimar a média diária necessária. Esta ferramenta é exclusivamente educativa — não garante lucro, saque ou cumprimento do rollover.
        </p>
      </header>

      {/* O que é rollover */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é rollover em apostas?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Rollover é um requisito de aposta associado a bônus ou promoções em plataformas de apostas esportivas e cassino. Ele indica quantas vezes um determinado valor precisa ser apostado antes que o saldo do bônus possa ser liberado para saque.
          </p>
          <p>
            O termo "rollover" vem do inglês e pode aparecer também como "requisito de apostas", "wagering requirement" ou simplesmente "turnover". Independentemente do nome, o conceito é o mesmo: existe uma meta de volume de apostas que precisa ser cumprida para que o bônus seja convertido em dinheiro sacável.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            {[
              ['Define volume exigido', 'Estabelece quantas vezes um valor precisa ser apostado para liberar o bônus.'],
              ['Varia por plataforma', 'Multiplicador, base, prazo e odds mínimas dependem dos termos de cada promoção.'],
              ['Não garante lucro', 'Cumprir o rollover não significa lucro — depende dos resultados das apostas.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.10)' }}>
                <p className="text-xs font-semibold mb-1.5" style={{ color: '#22d3ee' }}>{title}</p>
                <p className="text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <InfoNote tone="amber">
            <strong>Bônus não é dinheiro grátis.</strong> Sempre leia termos, requisitos, odds mínimas, prazos e regras de saque antes de aceitar qualquer promoção.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Como calcular rollover */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como calcular rollover de bônus?</h2>
        <div className="space-y-5 text-sm leading-relaxed" style={t}>
          <p>A fórmula central é direta:</p>
          <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.08))', border: '1px solid rgba(103,232,249,0.20)' }}>
            <p className="badge badge-cyan mb-3 text-xs">Fórmula</p>
            <p className="text-lg font-bold font-mono" style={{ color: 'var(--text-1)' }}>Total exigido = Base do rollover × Multiplicador</p>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
              A base pode ser apenas o bônus ou a soma de depósito + bônus, conforme os termos.
            </p>
          </div>
          <p>
            Com bônus de R$100 e rollover 5x sobre apenas o bônus: R$100 × 5 = <span className="font-mono font-medium" style={{ color: '#67e8f9' }}>R$500 exigidos</span>.
          </p>
          <p>
            Com depósito de R$100, bônus de R$100 e rollover 5x sobre depósito + bônus: (R$100 + R$100) × 5 = <span className="font-mono font-medium" style={{ color: '#67e8f9' }}>R$1.000 exigidos</span>.
          </p>
          <p>
            Para calcular o restante, basta subtrair o valor já apostado do total exigido. A calculadora acima realiza todos esses cálculos automaticamente.
          </p>
        </div>
      </ContentCard>

      {/* Rollover sobre bônus vs depósito + bônus */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Rollover sobre bônus ou depósito + bônus</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Essa distinção é uma das mais importantes ao avaliar qualquer promoção. O tipo de rollover determina o tamanho da base e, por consequência, o volume total de apostas exigido.
          </p>
          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <table className="w-full text-left text-xs">
              <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
                <tr>
                  <th className="p-3 font-semibold">Tipo</th>
                  <th className="p-3 font-semibold">Base</th>
                  <th className="p-3 font-semibold">Exemplo 5x</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--text-2)' }}>
                <tr className="border-t border-white/5">
                  <td className="p-3 font-medium" style={{ color: 'var(--text-1)' }}>Apenas bônus</td>
                  <td className="p-3 font-mono">R$100</td>
                  <td className="p-3 font-mono">R$500</td>
                </tr>
                <tr className="border-t border-white/5">
                  <td className="p-3 font-medium" style={{ color: 'var(--text-1)' }}>Depósito + bônus</td>
                  <td className="p-3 font-mono">R$200</td>
                  <td className="p-3 font-mono">R$1.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            O segundo tipo exige o dobro do volume no exemplo acima. Por isso, verificar qual base se aplica é fundamental antes de calcular qualquer projeção. Essa informação está nos termos e condições da promoção.
          </p>
          <InfoNote>
            Promoções com rollover sobre depósito + bônus podem exigir volume muito maior do que aparentam à primeira vista. Leia os termos com atenção.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Odd mínima */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>O que é odd mínima em bônus?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Odd mínima é um requisito que define a cotação mínima que uma aposta precisa ter para ser contabilizada no rollover. Se a odd mínima exigida é 1.50, apostas em eventos com odd 1.30 ou 1.40 podem não contar para o progresso do requisito, independentemente do resultado.
          </p>
          <p>
            Esse critério impede que o usuário aposte em eventos com probabilidade muito alta (odds muito baixas) para cumprir o rollover com menor risco. Na prática, quanto maior a odd mínima exigida, maior o risco por aposta.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              ['Odds ≥ 1.50', 'Comuns em promoções de freebet e bônus de boas-vindas.'],
              ['Odds ≥ 1.70', 'Aumentam o risco por aposta, mas são frequentes em certas promoções.'],
              ['Odds ≥ 2.00', 'Exigem probabilidade estimada abaixo de 50% — ampliam a exposição.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl p-4" style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.10)' }}>
                <p className="text-xs font-semibold mb-1.5" style={{ color: '#fbbf24' }}>{title}</p>
                <p className="text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <InfoNote tone="amber">
            Apostas abaixo da odd mínima podem não contar para o rollover, dependendo dos termos. Verifique sempre as regras da promoção.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Por que rollover alto pode ser arriscado */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Por que rollover alto pode ser arriscado?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Multiplicadores elevados exigem grande volume de apostas. Para cumprir um rollover 20x sobre um bônus de R$100, seria necessário apostar R$2.000 no total. Esse volume pode ampliar significativamente a exposição financeira.
          </p>
          <ul className="list-none space-y-2 mt-2">
            {[
              'Exige mais apostas, aumentando a exposição acumulada ao risco.',
              'Pode estimular decisões impulsivas para cumprir o requisito no prazo.',
              'Apostas feitas apenas para cumprir rollover podem ter análise menos cuidadosa.',
              'Perdas durante o processo não são compensadas pelo valor do bônus em muitos cenários.',
              'Bônus não deve ser tratado como dinheiro grátis — tem custo em termos de risco.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-xs">
                <span style={{ color: '#f87171' }} className="shrink-0 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <InfoNote tone="red">
            Rollovers altos aumentam o volume de apostas exigido e podem estimular comportamento impulsivo. Avalie com cuidado antes de aceitar qualquer promoção.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Como usar a calculadora */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Como usar a Calculadora de Rollover de Bônus do CalculaBet</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>A calculadora calcula o volume exigido, progresso e média diária com base nos dados que você inserir. Siga os passos:</p>
          <ol className="list-none space-y-3 mt-2">
            {[
              ['1', 'Informe o valor do bônus recebido.'],
              ['2', 'Informe o valor do depósito, se o rollover incidir sobre depósito + bônus.'],
              ['3', 'Selecione o tipo de rollover: apenas bônus ou depósito + bônus.'],
              ['4', 'Digite o multiplicador (ex: 5, 10, 20).'],
              ['5', 'Informe o valor já apostado para calcular o restante e o progresso.'],
              ['6', 'Se houver prazo, informe os dias disponíveis para ver a média diária necessária.'],
              ['7', 'Veja o resumo: total exigido, restante, progresso e alertas relevantes.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3 text-xs items-start">
                <span className="rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{n}</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </ContentCard>

      {/* Rollover e jogo responsável */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Rollover e jogo responsável</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Promoções com rollover podem aumentar o tempo de exposição ao jogo e criar pressão para apostar mais do que o planejado. Antes de aceitar qualquer bônus, avalie se o requisito de apostas é compatível com seus limites pessoais.
          </p>
          <ul className="list-none space-y-2 mt-2">
            {[
              'Não aposte apenas para cumprir o rollover — cada aposta envolve risco real.',
              'Defina limites de depósito, tempo e perda antes de começar.',
              'Nunca use dinheiro essencial para despesas pessoais.',
              'Avalie se o requisito de volume é realista para o seu controle de banca.',
              'Faça pausas se sentir pressão emocional ou urgência para cumprir o prazo.',
              'Se perceber dificuldade em parar, acesse recursos de apoio.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-xs">
                <span style={{ color: '#4ade80' }} className="shrink-0 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              ['/jogo-responsavel', 'Jogo responsável'],
              ['/calculadoras/unidade-stake', 'Gestão de stake'],
              ['/calculadoras/gestao-banca', 'Gestão de Banca'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </ContentCard>

      {/* Rollover e casas de apostas */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Rollover e casas de apostas</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Cada plataforma define seus próprios termos de rollover, que podem mudar a qualquer momento. Multiplicadores, odds mínimas, mercados elegíveis, prazos e regras de saque variam de uma promoção para outra e de uma plataforma para outra.
          </p>
          <p>
            O CalculaBet pode receber comissão por links de parceiros, mas não controla os termos, bônus ou condições de nenhuma plataforma. A disponibilidade de qualquer promoção deve ser verificada diretamente no site da casa de apostas.
          </p>
          <p>
            Consulte a lista de <Link to="/casas-apostas" className="font-medium" style={{ color: '#22d3ee' }}>casas de apostas</Link> do CalculaBet para informações sobre plataformas parceiras, e a <Link to="/politica-de-afiliados" className="font-medium" style={{ color: '#22d3ee' }}>política de afiliados</Link> para entender como os links de parceiros funcionam.
          </p>
        </div>
      </ContentCard>

      {/* Erros comuns */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Erros comuns ao avaliar bônus com rollover</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <ul className="list-none space-y-2">
            {[
              'Achar que bônus é dinheiro grátis sem condições.',
              'Ignorar o multiplicador e não calcular o volume total exigido.',
              'Confundir rollover sobre bônus com rollover sobre depósito + bônus.',
              'Não verificar a odd mínima exigida pela promoção.',
              'Não verificar o prazo e descobrir que ele expirou.',
              'Apostar em mercados que não contam para o rollover.',
              'Tentar cumprir o rollover com pressa e tomar decisões impulsivas.',
              'Não considerar o risco financeiro das apostas durante o processo.',
              'Não ler as regras de saque associadas ao bônus.',
              'Aumentar o valor das apostas para cumprir o rollover mais rápido.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-xs">
                <span style={{ color: '#f87171' }} className="shrink-0 mt-0.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </ContentCard>

      {/* Garante saque ou lucro? */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>A calculadora de rollover garante saque ou lucro?</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Não. A calculadora realiza cálculos matemáticos com base nos dados inseridos. Ela mostra o volume total exigido pelo rollover, o valor já apostado, o restante, o progresso percentual e a média diária necessária.
          </p>
          <p>
            O saque após o rollover depende dos termos da plataforma — pode haver outros requisitos como verificação de identidade, saldo mínimo, métodos de pagamento elegíveis e prazos de processamento. O lucro, por sua vez, depende exclusivamente dos resultados das apostas, que envolvem risco financeiro real.
          </p>
          <InfoNote tone="red">
            Apostas envolvem risco financeiro. Nenhuma calculadora, estratégia ou promoção garante lucro ou saque. Jogue com responsabilidade.
          </InfoNote>
        </div>
      </ContentCard>

      {/* Conclusão */}
      <ContentCard>
        <h2 className="text-2xl font-bold mb-4" style={h}>Conclusão</h2>
        <div className="space-y-4 text-sm leading-relaxed" style={t}>
          <p>
            Rollover define o volume de apostas necessário para liberar um bônus. O cálculo depende da base (bônus ou depósito + bônus) e do multiplicador. Odd mínima, prazo e mercados elegíveis podem mudar significativamente o cenário.
          </p>
          <p>
            Antes de aceitar qualquer promoção, calcule o volume total exigido, leia os termos completos e avalie se o requisito é compatível com seus limites de jogo responsável. A calculadora do CalculaBet ajuda a entender os números — a decisão é sempre sua.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              ['/calculadoras/unidade-stake', 'Calculadora de Unidade'],
              ['/calculadoras/gestao-banca', 'Gestão de Banca'],
              ['/calculadoras/odds', 'Calculadora de Odds'],
              ['/calculadoras/value-bet', 'Value Bet / EV'],
              ['/calculadoras/roi', 'ROI em Apostas'],
              ['/blog/o-que-e-unidade-apostas', 'O que é unidade em apostas'],
              ['/blog/o-que-e-gestao-de-banca', 'Gestão de banca'],
              ['/blog/apostas-esportivas-para-iniciantes', 'Guia para iniciantes'],
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

function fmtPct(v, decimals = 1) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + '%';
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EXEMPLO = {
  bonus: '100',
  deposito: '100',
  tipoRollover: 'deposito+bonus',
  multiplicador: '5',
  jaApostado: '300',
  prazo: '7',
  oddMinima: '1.50',
  nomePromocao: 'Bônus de boas-vindas',
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ progresso }) {
  const pct = Math.min(progresso, 100);
  const color = pct >= 100 ? '#4ade80' : pct >= 75 ? '#22d3ee' : pct >= 25 ? '#fbbf24' : '#f87171';
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>Progresso do rollover</span>
        <span className="text-sm font-bold font-mono" style={{ color }}>{fmtPct(pct)}</span>
      </div>
      <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}aa, ${color})` }}
        />
      </div>
    </div>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({ label, value, sub, highlight, tone = 'default' }) {
  const tones = {
    default: { border: 'var(--border)',             bg: 'rgba(255,255,255,0.025)', val: 'var(--text-1)' },
    cyan:    { border: 'rgba(34,211,238,0.25)',     bg: 'rgba(34,211,238,0.06)',  val: '#22d3ee' },
    green:   { border: 'rgba(74,222,128,0.25)',     bg: 'rgba(74,222,128,0.06)',  val: '#4ade80' },
    amber:   { border: 'rgba(251,191,36,0.25)',     bg: 'rgba(251,191,36,0.06)',  val: '#fbbf24' },
    red:     { border: 'rgba(248,113,113,0.25)',    bg: 'rgba(248,113,113,0.06)', val: '#f87171' },
    violet:  { border: 'rgba(167,139,250,0.25)',    bg: 'rgba(167,139,250,0.06)', val: '#a78bfa' },
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

// ─── Main Calculator ──────────────────────────────────────────────────────────

export default function RolloverBonus() {
  const [bonus, setBonus] = useState('');
  const [deposito, setDeposito] = useState('');
  const [tipoRollover, setTipoRollover] = useState('apenas-bonus');
  const [multiplicador, setMultiplicador] = useState('');
  const [jaApostado, setJaApostado] = useState('');
  const [prazo, setPrazo] = useState('');
  const [oddMinima, setOddMinima] = useState('');
  const [nomePromocao, setNomePromocao] = useState('');
  const [calculado, setCalculado] = useState(false);
  const [erro, setErro] = useState('');

  const resetCalc = () => { setCalculado(false); setErro(''); };

  const calcular = () => {
    const b = parseNum(bonus);
    const d = deposito ? parseNum(deposito) : 0;
    const m = parseNum(multiplicador);
    const j = jaApostado ? parseNum(jaApostado) : 0;
    const p = prazo ? parseNum(prazo) : null;
    const o = oddMinima ? parseNum(oddMinima) : null;

    if (!bonus || isNaN(b) || b <= 0) return setErro('Insira um valor de bônus válido.');
    if (deposito && (isNaN(d) || d < 0)) return setErro('Insira um valor de depósito válido.');
    if (!multiplicador || isNaN(m) || m <= 0) return setErro('Insira um multiplicador de rollover válido.');
    if (jaApostado && (isNaN(j) || j < 0)) return setErro('O valor já apostado não pode ser negativo.');
    if (prazo && (isNaN(p) || p <= 0)) return setErro('O prazo deve ser maior que zero.');
    if (oddMinima && (isNaN(o) || o <= 1)) return setErro('A odd mínima deve ser maior que 1,00.');

    setErro('');
    setCalculado(true);
  };

  const limpar = () => {
    setBonus(''); setDeposito(''); setTipoRollover('apenas-bonus'); setMultiplicador('');
    setJaApostado(''); setPrazo(''); setOddMinima(''); setNomePromocao('');
    setCalculado(false); setErro('');
  };

  const carregarExemplo = () => {
    setBonus(EXEMPLO.bonus); setDeposito(EXEMPLO.deposito);
    setTipoRollover(EXEMPLO.tipoRollover); setMultiplicador(EXEMPLO.multiplicador);
    setJaApostado(EXEMPLO.jaApostado); setPrazo(EXEMPLO.prazo);
    setOddMinima(EXEMPLO.oddMinima); setNomePromocao(EXEMPLO.nomePromocao);
    setCalculado(false); setErro('');
  };

  // Computed
  const bVal = parseNum(bonus) || 0;
  const dVal = deposito ? (parseNum(deposito) || 0) : 0;
  const mVal = parseNum(multiplicador) || 0;
  const jVal = jaApostado ? (parseNum(jaApostado) || 0) : 0;
  const pVal = prazo ? (parseNum(prazo) || 0) : 0;
  const oVal = oddMinima ? (parseNum(oddMinima) || 0) : 0;

  const allValid = calculado && bVal > 0 && mVal > 0;

  let baseRollover = 0, totalExigido = 0, restante = 0, progresso = 0, mediaDiaria = 0;

  if (allValid) {
    baseRollover = tipoRollover === 'deposito+bonus' ? dVal + bVal : bVal;
    totalExigido = baseRollover * mVal;
    restante = Math.max(totalExigido - jVal, 0);
    progresso = totalExigido > 0 ? Math.min((jVal / totalExigido) * 100, 100) : 0;
    mediaDiaria = pVal > 0 && restante > 0 ? restante / pVal : 0;
  }

  // Interpretation text
  let interpretacao = '';
  if (allValid) {
    if (progresso >= 100) {
      interpretacao = 'Com os dados inseridos, o rollover estaria completo. Isso não garante saque automático — confira os termos e regras da plataforma.';
    } else if (progresso >= 75) {
      interpretacao = 'Você está próximo de completar o requisito, mas ainda há valor a apostar. Verifique regras, odds mínimas e prazo antes de continuar.';
    } else if (progresso >= 25) {
      interpretacao = 'Você completou parte do rollover, mas ainda há valor relevante a apostar. Acompanhe o progresso e mantenha o controle.';
    } else {
      interpretacao = 'Você ainda está no começo do requisito. Leia os termos completos antes de continuar.';
    }
  }

  // Alerts
  const alertaMultiplicador = mVal >= 10;
  const alertaPrazo = pVal > 0 && pVal <= 3 && restante > 0;
  const alertaMediaAlta = mediaDiaria > 0 && (dVal + bVal) > 0 && mediaDiaria > 0.3 * (dVal + bVal);
  const alertaOddAlta = oVal >= 2;

  return (
    <CalcLayout
      title="Calculadora de Rollover de Bônus: Calcule Requisitos de Aposta"
      description="Use a calculadora de rollover de bônus para entender requisitos de aposta, valor restante, prazo, odds mínimas e riscos antes de usar promoções."
      slug="rollover-bonus"
      faqs={faqs}
      schema={faqSchema}
      explanation={<Explanation />}
    >
      <div className="space-y-6">

        {/* Instrução */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Como usar</p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Informe o bônus, depósito e multiplicador para calcular o total exigido. Preencha os campos opcionais para ver progresso, média diária e alertas.
          </p>
        </div>

        {/* Botão de exemplo */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs" style={{ color: 'var(--text-3)' }}>Carregar exemplo:</span>
          <button type="button" onClick={carregarExemplo} className="btn-ghost text-xs px-3 py-1.5">
            Bônus R$100 + Depósito R$100 — Rollover 5x
          </button>
        </div>

        {/* Campos obrigatórios */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Dados do bônus</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="rb-bonus">Valor do bônus (R$)</label>
              <input
                id="rb-bonus"
                type="text"
                inputMode="decimal"
                className="input-field"
                placeholder="Ex: 100"
                value={bonus}
                onChange={e => { setBonus(e.target.value); resetCalc(); }}
              />
            </div>
            <div>
              <label className="label" htmlFor="rb-deposito">Valor do depósito, opcional (R$)</label>
              <input
                id="rb-deposito"
                type="text"
                inputMode="decimal"
                className="input-field"
                placeholder="Ex: 100"
                value={deposito}
                onChange={e => { setDeposito(e.target.value); resetCalc(); }}
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="rb-tipo">Tipo de rollover</label>
            <select
              id="rb-tipo"
              className="input-field"
              value={tipoRollover}
              onChange={e => { setTipoRollover(e.target.value); resetCalc(); }}
            >
              <option value="apenas-bonus">Rollover apenas sobre o bônus</option>
              <option value="deposito+bonus">Rollover sobre depósito + bônus</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="rb-multiplicador">Multiplicador de rollover</label>
            <div className="space-y-2">
              <input
                id="rb-multiplicador"
                type="text"
                inputMode="decimal"
                className="input-field"
                placeholder="Ex: 5"
                value={multiplicador}
                onChange={e => { setMultiplicador(e.target.value); resetCalc(); }}
              />
              <div className="flex flex-wrap gap-2">
                {['3', '5', '10', '20'].map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => { setMultiplicador(v); resetCalc(); }}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{
                      background: multiplicador === v ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${multiplicador === v ? 'rgba(34,211,238,0.35)' : 'var(--border)'}`,
                      color: multiplicador === v ? '#22d3ee' : 'var(--text-2)',
                    }}
                  >
                    {v}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Campos opcionais */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Dados opcionais</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="rb-ja-apostado">Valor já apostado (R$)</label>
              <input
                id="rb-ja-apostado"
                type="text"
                inputMode="decimal"
                className="input-field"
                placeholder="Ex: 150"
                value={jaApostado}
                onChange={e => { setJaApostado(e.target.value); resetCalc(); }}
              />
            </div>
            <div>
              <label className="label" htmlFor="rb-prazo">Prazo em dias</label>
              <input
                id="rb-prazo"
                type="text"
                inputMode="decimal"
                className="input-field"
                placeholder="Ex: 7"
                value={prazo}
                onChange={e => { setPrazo(e.target.value); resetCalc(); }}
              />
            </div>
            <div>
              <label className="label" htmlFor="rb-odd">Odd mínima exigida</label>
              <input
                id="rb-odd"
                type="text"
                inputMode="decimal"
                className="input-field"
                placeholder="Ex: 1.50"
                value={oddMinima}
                onChange={e => { setOddMinima(e.target.value); resetCalc(); }}
              />
            </div>
            <div>
              <label className="label" htmlFor="rb-nome">Nome da promoção (opcional)</label>
              <input
                id="rb-nome"
                type="text"
                className="input-field"
                placeholder="Ex: Bônus de boas-vindas"
                value={nomePromocao}
                onChange={e => setNomePromocao(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Aviso compliance */}
        <div className="rounded-2xl p-4" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
            <strong style={{ color: '#fbbf24' }}>Aviso:</strong> Bônus e promoções podem estar sujeitos a restrições, regras de elegibilidade, odds mínimas, prazos e requisitos de aposta. Verifique sempre os termos diretamente na plataforma. O CalculaBet não garante disponibilidade de bônus, saque ou lucro.
          </p>
        </div>

        {/* Erro */}
        {erro && (
          <div className="rounded-2xl p-4" style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.18)' }}>
            <p className="text-sm" style={{ color: '#f87171' }}>{erro}</p>
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-primary" onClick={calcular}>Calcular rollover</button>
          <button type="button" className="btn-ghost" onClick={limpar}>Limpar</button>
        </div>

        {/* ── RESULTADOS ── */}
        {allValid && (
          <div className="space-y-6 pt-2">

            {/* Nome da promoção */}
            {nomePromocao && (
              <div className="rounded-2xl p-4" style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.18)' }}>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>Promoção</p>
                <p className="text-base font-semibold mt-1" style={{ color: 'var(--text-1)' }}>{nomePromocao}</p>
              </div>
            )}

            {/* A — Resumo principal */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Resumo do rollover</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Valor do bônus" value={`R$ ${fmtBRL(bVal)}`} />
                {tipoRollover === 'deposito+bonus' && dVal > 0 && (
                  <ResultCard label="Valor do depósito" value={`R$ ${fmtBRL(dVal)}`} />
                )}
                <ResultCard label="Base do rollover" value={`R$ ${fmtBRL(baseRollover)}`} sub={tipoRollover === 'deposito+bonus' ? 'Depósito + bônus' : 'Apenas bônus'} />
                <ResultCard label="Multiplicador" value={`${mVal}×`} />
                <ResultCard label="Total exigido" value={`R$ ${fmtBRL(totalExigido)}`} highlight tone="cyan" />
              </div>
            </div>

            {/* B — Progresso */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Progresso</p>
              <div className="rounded-2xl p-5 space-y-5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--border)' }}>
                <ProgressBar progresso={progresso} />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <ResultCard label="Já apostado" value={`R$ ${fmtBRL(jVal)}`} />
                  <ResultCard
                    label="Restante"
                    value={restante === 0 ? 'Completo' : `R$ ${fmtBRL(restante)}`}
                    highlight
                    tone={restante === 0 ? 'green' : 'amber'}
                  />
                  <ResultCard
                    label="Progresso"
                    value={fmtPct(progresso)}
                    highlight
                    tone={progresso >= 100 ? 'green' : progresso >= 75 ? 'cyan' : progresso >= 25 ? 'amber' : 'red'}
                  />
                </div>
              </div>
            </div>

            {/* C — Prazo */}
            {pVal > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Prazo</p>
                <div className="grid grid-cols-2 gap-3">
                  <ResultCard label="Prazo" value={`${pVal} dia${pVal !== 1 ? 's' : ''}`} />
                  <ResultCard
                    label="Média diária necessária"
                    value={mediaDiaria === 0 ? 'Rollover completo' : `R$ ${fmtBRL(mediaDiaria)}/dia`}
                    highlight
                    tone={mediaDiaria === 0 ? 'green' : alertaMediaAlta ? 'red' : 'amber'}
                  />
                </div>
              </div>
            )}

            {/* D — Odd mínima */}
            {oVal > 1 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Odd mínima</p>
                <div className="rounded-2xl p-4" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.18)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-3)' }}>Odd mínima informada</p>
                  <p className="text-xl font-bold font-mono mb-2" style={{ color: '#fbbf24' }}>{oVal.toFixed(2)}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                    Apostas abaixo de {oVal.toFixed(2)} podem não ser contabilizadas no rollover, dependendo dos termos da promoção. Verifique as regras diretamente na plataforma.
                  </p>
                </div>
              </div>
            )}

            {/* E — Interpretação */}
            <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.14)' }}>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#22d3ee' }}>Interpretação</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{interpretacao}</p>
              {restante > 0 && (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  Com esses dados, seria necessário apostar <strong style={{ color: 'var(--text-1)' }}>R${fmtBRL(totalExigido)}</strong> no total para cumprir o rollover. {jVal > 0 ? `Como R$${fmtBRL(jVal)} já foram apostados, ainda faltam R$${fmtBRL(restante)}.` : ''} Isso não significa lucro ou saque garantido — verifique sempre os termos da promoção.
                </p>
              )}
            </div>

            {/* Alertas de risco */}
            {(alertaMultiplicador || alertaPrazo || alertaMediaAlta || alertaOddAlta) && (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>Alertas</p>
                <div className="space-y-3">
                  {alertaMultiplicador && (
                    <div className="rounded-2xl p-4" style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#f87171' }}>
                        ⚠ Rollover alto pode exigir volume elevado de apostas e aumentar exposição ao risco.
                      </p>
                    </div>
                  )}
                  {alertaPrazo && (
                    <div className="rounded-2xl p-4" style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#f87171' }}>
                        ⚠ Prazo curto pode estimular decisões impulsivas. Avalie com cuidado antes de continuar.
                      </p>
                    </div>
                  )}
                  {alertaMediaAlta && (
                    <div className="rounded-2xl p-4" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#fbbf24' }}>
                        ⚠ A média diária necessária é alta em relação ao valor total do bônus e depósito. Avalie o risco antes de continuar.
                      </p>
                    </div>
                  )}
                  {alertaOddAlta && (
                    <div className="rounded-2xl p-4" style={{ background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#fbbf24' }}>
                        ⚠ Odds mínimas iguais ou superiores a 2.00 podem aumentar o risco de perda por aposta.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Callout obrigatório */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: '#f87171' }}>Bônus não é dinheiro grátis</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Sempre leia termos, requisitos, odds mínimas, prazos e regras de saque. Apostas envolvem risco financeiro. Apenas maiores de 18 anos. Se perceber dificuldade em controlar o comportamento de jogo, acesse{' '}
                <Link to="/jogo-responsavel" style={{ color: '#f87171' }} className="underline underline-offset-2">recursos de jogo responsável</Link>.
              </p>
            </div>

          </div>
        )}

      </div>
    </CalcLayout>
  );
}
