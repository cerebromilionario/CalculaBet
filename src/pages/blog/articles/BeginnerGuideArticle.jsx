import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import { getCategoryById } from '../../../data/blog/blogData';
import { BEGINNER_GUIDE_FAQS } from '../../../data/blog/beginnerGuideFaqs';

const glossary = [
  ['Odd', 'Cotação que indica o retorno potencial de uma aposta vencedora.'],
  ['Stake', 'Valor apostado em um palpite específico.'],
  ['Banca', 'Dinheiro separado exclusivamente para apostas, fora de despesas essenciais.'],
  ['Retorno', 'Valor total potencial recebido em caso de acerto, incluindo a stake.'],
  ['Lucro', 'Ganho líquido potencial, calculado como retorno menos valor apostado.'],
  ['Probabilidade implícita', 'Chance sugerida pela odd após conversão matemática.'],
  ['Aposta simples', 'Bilhete com uma única seleção.'],
  ['Aposta múltipla', 'Bilhete que combina duas ou mais seleções.'],
  ['Parlay', 'Termo em inglês para aposta múltipla ou combinada.'],
  ['Cashout', 'Encerramento antecipado de uma aposta por valor oferecido.'],
  ['Hedge', 'Aposta ou ajuste usado para reduzir exposição em determinado cenário.'],
  ['Surebet', 'Situação matemática em que odds de casas diferentes sugerem arbitragem, com riscos operacionais.'],
  ['Arbitragem', 'Distribuição de stakes em resultados diferentes buscando cobrir todos os cenários matemáticos.'],
  ['Dutching', 'Divisão de stake entre vários resultados para equilibrar retornos potenciais.'],
  ['ROI', 'Retorno sobre o total apostado em determinado período.'],
  ['Yield', 'Métrica percentual parecida com ROI, usada para medir eficiência sobre volume apostado.'],
  ['Value bet', 'Aposta em que a probabilidade estimada pelo usuário é maior que a probabilidade implícita da odd.'],
  ['Edge', 'Vantagem estimada pelo usuário em relação à cotação disponível.'],
  ['Overround', 'Soma das probabilidades implícitas acima de 100%, refletindo margem do mercado.'],
  ['Margem da casa', 'Diferença embutida nas odds que favorece a casa no longo prazo.'],
  ['Mercado', 'Tipo de aposta disponível, como vencedor, gols, handicap ou escanteios.'],
  ['Linha', 'Número usado como referência em mercados, como over/under 2.5 gols.'],
  ['Handicap', 'Mercado que aplica vantagem ou desvantagem virtual a uma equipe ou atleta.'],
  ['Over/under', 'Mercado sobre ficar acima ou abaixo de uma linha definida.'],
  ['Ambas marcam', 'Mercado em que as duas equipes precisam marcar ao menos um gol.'],
  ['Pré-live', 'Aposta feita antes do evento começar.'],
  ['Ao vivo', 'Aposta feita durante o evento, com odds em rápida mudança.'],
  ['Void/anulada', 'Aposta cancelada conforme regra do mercado, normalmente com devolução da stake.'],
];

const returnRows = [
  ['R$10', '1.50', 'R$15', 'R$5', '66,67%'],
  ['R$10', '2.00', 'R$20', 'R$10', '50%'],
  ['R$25', '2.40', 'R$60', 'R$35', '41,67%'],
  ['R$50', '3.00', 'R$150', 'R$100', '33,33%'],
];

const tools = [
  ['Calculadora de Odds', '/ferramentas/odds', 'Calcule retorno, lucro e probabilidade implícita.'],
  ['Conversor de Odds', '/ferramentas/conversor', 'Compare formatos decimal, fracionário e americano.'],
  ['Calculadora de Aposta Múltipla', '/ferramentas/multipla', 'Entenda odd combinada, retorno e risco de múltiplas.'],
  ['Gestão de Banca', '/ferramentas/gestao-de-banca', 'Simule percentuais de stake e limites por aposta.'],
  ['Calculadora de ROI', '/ferramentas/roi', 'Analise resultado histórico com lucro líquido e volume apostado.'],
  ['Calculadora de Cashout', '/ferramentas/cashout', 'Compare oferta de cashout com retorno potencial e cenários.'],
];

const relatedToolLinks = [
  ['Arbitragem', '/ferramentas/arbitragem'],
  ['Dutching', '/ferramentas/dutching'],
  ['Hedge', '/ferramentas/hedge'],
];

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
}

function ArticleSection({ id, title, children }) {
  return (
    <section id={id} className="mt-12 scroll-mt-28">
      <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>{title}</h2>
      <div className="mt-5 space-y-5 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>
    </section>
  );
}

function Callout({ tone = 'cyan', children }) {
  const styles = tone === 'amber'
    ? { background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.18)' }
    : tone === 'rose'
      ? { background: 'rgba(251,113,133,0.08)', border: '1px solid rgba(251,113,133,0.18)' }
      : { background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.16)' };
  return <div className="rounded-3xl p-5 my-7 leading-relaxed" style={styles}>{children}</div>;
}

function FormulaBox({ title, formula, example }) {
  return (
    <div className="rounded-3xl p-5" style={{ background: 'rgba(15,23,42,0.72)', border: '1px solid rgba(34,211,238,0.18)' }}>
      <p className="badge badge-cyan mb-3">Fórmula</p>
      <h3 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>{title}</h3>
      <code className="block mt-4 text-lg sm:text-xl font-semibold text-cyan-200 whitespace-normal">{formula}</code>
      <p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--text-2)' }}>{example}</p>
    </div>
  );
}

export default function BeginnerGuideArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>
        <header className="relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8" style={{ background: `linear-gradient(135deg, ${category?.color || '#22d3ee'}1f, rgba(15,23,42,0.82))`, border: `1px solid ${category?.color || '#22d3ee'}30` }}>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge" style={{ color: category?.color || '#22d3ee', borderColor: `${category?.color || '#22d3ee'}35`, background: `${category?.color || '#22d3ee'}10` }}>{category?.name}</span>
            <span className="badge">{post.readingTime}</span>
            <span className="badge">Publicado em {formatDate(post.date)}</span>
            <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">Apostas Esportivas para Iniciantes: Glossário Completo e Guia de Primeiros Passos</h1>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Apostas esportivas para iniciantes podem parecer confusas porque envolvem termos, cálculos e riscos financeiros. Odds, retorno, lucro, banca e stake aparecem em quase todo conteúdo sobre o tema, mas nem sempre são explicados com calma. Este guia educativo organiza os primeiros passos, mostra fórmulas básicas e reforça que apostar exige responsabilidade.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/ferramentas/odds" className="btn-primary">Usar calculadora de odds <BlogIcon name="arrow" className="w-4 h-4" /></Link>
            <Link to="/jogo-responsavel" className="btn-ghost">Ler jogo responsável</Link>
          </div>
        </header>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <Callout tone="rose">
          <strong>Aviso educativo +18:</strong> o CalculaBet não é uma casa de apostas, não aceita apostas e não processa pagamentos. Este conteúdo é apenas educativo e destinado apenas a maiores de 18 anos. Apostas envolvem riscos financeiros, não garantem ganhos, não são investimento seguro e não devem usar dinheiro essencial. Use ferramentas como apoio ao cálculo, não como promessa de resultado.
        </Callout>

        <section className="mt-10 grid md:grid-cols-3 gap-4" aria-label="Resumo do guia">
          {[
            ['Entenda os números', 'Aprenda o que é odd, retorno, lucro e probabilidade implícita antes de interpretar qualquer bilhete.'],
            ['Controle o risco', 'Banca, stake e limites existem para organizar exposição, não para garantir lucro.'],
            ['Use ferramentas', 'Calculadoras reduzem erro manual e ajudam a simular cenários, mas não preveem partidas.'],
          ].map(([title, text]) => (
            <div key={title} className="card-glass p-5">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>{title}</h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{text}</p>
            </div>
          ))}
        </section>

        <ArticleSection id="o-que-sao" title="O que são apostas esportivas?">
          <p>Apostas esportivas são palpites com valor financeiro sobre eventos esportivos. Em vez de apenas assistir a uma partida, o usuário escolhe um mercado e assume risco sobre um resultado possível. Esse mercado pode ser o vencedor do jogo, empate, total de gols, escanteios, cartões, pontos, sets, rounds, desempenho de atletas ou outras linhas oferecidas.</p>
          <p>A diferença entre assistir esporte e apostar é que a aposta transforma uma opinião em exposição financeira. Mesmo quando uma equipe parece favorita, o resultado esportivo continua incerto: lesões, decisões táticas, clima, expulsões, pressão, variância e erros mudam o jogo. Por isso, o primeiro passo é entender que odds indicam retorno potencial, não certeza.</p>
          <p>Também é importante separar informação esportiva de decisão financeira. Saber escalações, forma recente ou histórico de confronto pode ajudar a contextualizar um evento, mas nenhum dado elimina a incerteza. Para iniciantes, o objetivo inicial deve ser compreender a linguagem dos mercados, aprender os cálculos básicos e reconhecer limites pessoais antes de considerar qualquer aposta real.</p>
        </ArticleSection>

        <ArticleSection id="como-funcionam" title="Como funcionam as apostas esportivas?">
          <p>O funcionamento básico é simples: o usuário escolhe um evento, seleciona um mercado, analisa uma odd, define uma stake e aguarda o resultado. Se a seleção for vencedora conforme as regras do mercado, há retorno. Se não for, a stake pode ser perdida. Em casos específicos, uma aposta pode ser anulada ou ter regras próprias.</p>
          <p>Um exemplo: em uma partida de futebol, você poderia escolher o mercado de vencedor, ambas marcam ou over/under de gols. A odd mostra quanto aquele resultado pagaria em caso de acerto. A stake é o valor apostado. O retorno só acontece se o resultado escolhido vencer; a cotação nunca deve ser confundida com previsão garantida.</p>
          <p>Na prática, cada mercado tem regras próprias. Uma aposta em resultado final pode considerar apenas o tempo regulamentar; uma aposta em classificação pode incluir prorrogação ou pênaltis; uma linha de gols pode ser anulada em certos números inteiros. Antes de apostar, leia as regras da casa e entenda exatamente qual evento precisa acontecer para o bilhete ser vencedor.</p>
        </ArticleSection>

        <ArticleSection id="odd" title="O que é odd?">
          <p>Odd é a cotação de uma aposta. No Brasil, as odds decimais são as mais comuns porque mostram diretamente o retorno total potencial para cada R$1 apostado. Uma odd 2.00 significa que cada R$1 retorna R$2 em caso de acerto; uma odd 1.50 retorna R$1,50 para cada R$1.</p>
          <p>Além do retorno potencial, a odd carrega uma probabilidade implícita. Quanto menor a odd, maior a probabilidade sugerida matematicamente. Quanto maior a odd, maior o retorno potencial e menor a probabilidade implícita. Uma odd alta pode chamar atenção, mas normalmente representa um cenário menos provável; por isso, ela não é automaticamente melhor. Para <Link to="/ferramentas/odds" className="text-cyan-300 hover:text-cyan-200">calcular odds</Link> sem erro manual, use a <Link to="/ferramentas/odds" className="text-cyan-300 hover:text-cyan-200">calculadora de odds</Link> ou a <Link to="/ferramentas/odds" className="text-cyan-300 hover:text-cyan-200">ferramenta de odds do CalculaBet</Link>.</p>
        </ArticleSection>

        <ArticleSection id="retorno" title="Como calcular o retorno de uma aposta">
          <FormulaBox title="Retorno total" formula="Retorno = Valor apostado × Odd" example="Exemplo: R$10 × 2.00 = R$20 de retorno total potencial." />
          <p>O retorno de aposta inclui o valor apostado. Se você aposta R$10 em uma odd 2.00 e acerta, o retorno total potencial é R$20. Isso não significa lucro de R$20, porque os R$10 originais fazem parte desse valor.</p>
          <div className="overflow-x-auto rounded-3xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className="w-full text-sm text-left">
              <thead style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-1)' }}><tr>{['Stake', 'Odd', 'Retorno', 'Lucro', 'Prob. implícita'].map(header => <th key={header} className="p-4">{header}</th>)}</tr></thead>
              <tbody>{returnRows.map(row => <tr key={row.join('-')} className="border-t border-white/10">{row.map(cell => <td key={cell} className="p-4" style={{ color: 'var(--text-2)' }}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </ArticleSection>

        <ArticleSection id="lucro" title="Como calcular o lucro de uma aposta">
          <FormulaBox title="Lucro líquido potencial" formula="Lucro = Valor apostado × (Odd - 1)" example="Exemplo: R$10 × (2.00 - 1) = R$10 de lucro potencial; retorno total: R$20." />
          <Callout tone="amber"><strong>Retorno não é a mesma coisa que lucro.</strong> Sempre confira o cálculo antes de tomar qualquer decisão. O retorno inclui o valor apostado; lucro é o ganho líquido acima da stake.</Callout>
          <p>Essa diferença é um dos erros mais comuns entre iniciantes. Em uma aposta de R$10 na odd 2.00, o retorno total potencial é R$20, mas o lucro em apostas seria R$10. Em uma aposta de R$25 na odd 2.40, o retorno seria R$60 e o lucro seria R$35.</p>
          <p>Quando o usuário confunde retorno com lucro, ele pode superestimar resultados e tomar decisões mais arriscadas. Por isso, sempre confira se a conta que você está analisando mostra o valor bruto retornado ou apenas o ganho líquido. Essa distinção também ajuda no registro de apostas, no cálculo de ROI e na leitura de desempenho ao longo do tempo.</p>
        </ArticleSection>

        <ArticleSection id="calculadora-odds" title="Como usar a Calculadora de Odds do CalculaBet">
          <div className="rounded-[1.75rem] p-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(59,130,246,0.06))', border: '1px solid rgba(34,211,238,0.2)' }}>
            <p className="badge badge-cyan mb-3">Ferramenta recomendada</p>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Simule antes de avançar</h3>
            <p className="mt-3">A <Link to="/ferramentas/odds" className="text-cyan-300 hover:text-cyan-200">Calculadora de Odds do CalculaBet</Link> ajuda a calcular retorno, calcular lucro, estimar probabilidade implícita, entender melhor a odd, evitar erro manual e simular diferentes valores de aposta.</p>
            <Link to="/ferramentas/odds" className="btn-primary mt-5">Abrir calculadora de odds <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
          <Callout><strong>Ferramentas ajudam no cálculo, mas não preveem resultados.</strong> A função da calculadora é tornar os números claros, não indicar o que vai acontecer em campo.</Callout>
        </ArticleSection>

        <ArticleSection id="probabilidade" title="O que é probabilidade implícita?">
          <p>Probabilidade implícita é a chance sugerida matematicamente pela odd. Em odds decimais, a fórmula é: <strong>1 / odd × 100</strong>. Uma odd 2.00 equivale a 50%; uma odd 1.50 equivale a 66,67%; uma odd 3.00 equivale a 33,33%.</p>
          <p>Essa probabilidade não é garantia de resultado. Ela é uma forma de traduzir a cotação em percentual, considerando que o mercado também pode incluir margem. Comparar a probabilidade implícita com sua própria estimativa exige cuidado: estimativas pessoais podem estar erradas, enviesadas por torcida ou baseadas em amostras pequenas. Para se aprofundar, leia o guia sobre <Link to="/blog/probabilidade-implicita-odds" className="text-cyan-300 hover:text-cyan-200">probabilidade implícita nas odds</Link> ou simule na <Link to="/ferramentas/odds" className="text-cyan-300 hover:text-cyan-200">ferramenta de odds</Link>.</p>
        </ArticleSection>

        <ArticleSection id="stake-banca" title="O que é stake?">
          <p>Stake é o valor apostado em uma seleção. Em uma aposta de R$10, a stake é R$10. Ela pode ser fixa, quando o mesmo valor é usado em várias apostas, ou variável, quando muda conforme banca, risco percebido, odd ou método de gestão. Para iniciantes, o mais importante é não apostar valores aleatórios nem aumentar stake por emoção.</p>
          <p>A stake precisa conversar com a banca. Apostar R$50 pode ser pequeno para uma banca de R$5.000, mas enorme para uma banca de R$100. Sem essa proporção, a decisão deixa de ser cálculo e vira exposição financeira desorganizada.</p>
        </ArticleSection>

        <ArticleSection id="banca" title="O que é banca?">
          <p>Banca é o dinheiro separado exclusivamente para apostas. Ela não deve ser salário, aluguel, alimentação, dinheiro de contas essenciais, reserva de emergência ou valor destinado a dívidas. A banca deve ser uma quantia que você poderia perder sem comprometer a vida financeira.</p>
          <p>Se esse valor não existe, o passo responsável é não apostar. O conteúdo do CalculaBet pode ser usado para estudar e simular cálculos sem colocar dinheiro em risco. Veja também a ferramenta de <Link to="/ferramentas/gestao-de-banca" className="text-cyan-300 hover:text-cyan-200">gestão de banca</Link> e as orientações de <Link to="/jogo-responsavel" className="text-cyan-300 hover:text-cyan-200">jogo responsável</Link>.</p>
        </ArticleSection>

        <ArticleSection id="gestao-banca" title="O que é gestão de banca?">
          <p>Gestão de banca é o conjunto de regras para controlar quanto apostar, quando parar, qual percentual usar por stake e como registrar resultados. Ela ajuda no controle de risco e reduz decisões impulsivas, mas não garante lucro. Apostas continuam sujeitas a variância e perda.</p>
          <p>Um iniciante pode estudar percentuais pequenos, como 1% ou 2% da banca por aposta, apenas como referência educativa. O essencial é definir limites antes de apostar e não mudá-los no calor do evento. Leia o artigo sobre <Link to="/blog/o-que-e-gestao-de-banca" className="text-cyan-300 hover:text-cyan-200">o que é gestão de banca</Link> e use a <Link to="/ferramentas/gestao-de-banca" className="text-cyan-300 hover:text-cyan-200">calculadora de gestão de banca</Link>.</p>
          <Callout tone="rose"><strong>Apostas esportivas envolvem risco financeiro e não devem ser tratadas como fonte garantida de renda.</strong></Callout>
        </ArticleSection>

        <ArticleSection id="tipos" title="Tipos básicos de apostas esportivas">
          <h3 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Aposta simples</h3>
          <p>Aposta simples é uma aposta em um único resultado. Ela é mais fácil para iniciantes porque o cálculo é direto: stake multiplicada pela odd para retorno e stake multiplicada por odd menos 1 para lucro. Antes de avançar para formatos complexos, entenda bem a aposta simples.</p>
          <h3 className="text-2xl font-bold pt-2" style={{ color: 'var(--text-1)' }}>Aposta múltipla</h3>
          <p>A <Link to="/blog/o-que-e-aposta-multipla" className="text-cyan-300 hover:text-cyan-200">aposta múltipla</Link> combina duas ou mais seleções. Em geral, todas precisam acertar para o bilhete retornar. As odds são multiplicadas, então o retorno potencial cresce, mas o risco também. Use a <Link to="/ferramentas/multipla" className="text-cyan-300 hover:text-cyan-200">calculadora de aposta múltipla</Link> para entender a odd combinada.</p>
          <h3 className="text-2xl font-bold pt-2" style={{ color: 'var(--text-1)' }}>Apostas ao vivo</h3>
          <p>Apostas ao vivo acontecem durante o evento. As odds mudam rapidamente conforme placar, tempo, estatísticas e interrupções. Para iniciantes, esse ambiente pode aumentar decisões impulsivas porque há pressão de tempo.</p>
          <h3 className="text-2xl font-bold pt-2" style={{ color: 'var(--text-1)' }}>Cashout</h3>
          <p><Link to="/blog/cashout-apostas" className="text-cyan-300 hover:text-cyan-200">Cashout</Link> é encerrar a aposta antes do fim por um valor oferecido. Esse valor pode subir, cair ou desaparecer. Não é garantia de melhor decisão. A <Link to="/ferramentas/cashout" className="text-cyan-300 hover:text-cyan-200">calculadora de cashout</Link> ajuda a comparar oferta, retorno e exposição.</p>
        </ArticleSection>

        <ArticleSection id="glossario" title="Glossário básico de apostas esportivas">
          <p>Este glossário apostas esportivas reúne termos de apostas esportivas que aparecem em artigos, ferramentas e páginas educativas. As definições são curtas para consulta rápida.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {glossary.map(([term, definition]) => (
              <div key={term} className="card-glass p-5">
                <h3 className="font-bold" style={{ color: 'var(--text-1)' }}>{term}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{definition}</p>
              </div>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection id="erros" title="Erros comuns de iniciantes em apostas esportivas">
          <ul className="grid md:grid-cols-2 gap-3 list-none p-0">
            {['Apostar sem entender odds.', 'Confundir retorno com lucro.', 'Apostar valores altos demais.', 'Tentar recuperar perdas.', 'Fazer múltiplas enormes por impulso.', 'Não controlar banca.', 'Seguir palpites sem entender risco.', 'Apostar emocionalmente.', 'Não ler regras da casa.', 'Ignorar jogo responsável.', 'Achar que odd alta é sempre melhor.', 'Acreditar em lucro garantido.'].map(item => (
              <li key={item} className="rounded-2xl p-4" style={{ background: 'rgba(251,113,133,0.07)', border: '1px solid rgba(251,113,133,0.14)' }}>{item}</li>
            ))}
          </ul>
        </ArticleSection>

        <ArticleSection id="responsabilidade" title="Como começar com mais responsabilidade">
          <p>O melhor início é estudar conceitos antes de apostar. Use simuladores e calculadoras, defina limites, separe uma banca pequena, registre apostas, evite pressa e nunca use dinheiro essencial. Um registro simples pode incluir data, esporte, mercado, odd, stake, retorno, lucro ou prejuízo e o motivo da escolha. Esse hábito ajuda a aprender com dados, não com memória seletiva.</p>
          <p>Se perceber perda de controle, necessidade de recuperar prejuízo, ansiedade ou impacto financeiro, faça pausas e procure ajuda. Tentar recuperar perdas costuma aumentar a exposição justamente quando a pessoa está mais emocional. Responsabilidade inclui aceitar que não apostar, encerrar uma sessão ou reduzir frequência pode ser a decisão correta.</p>
          <p>O CalculaBet mantém uma página específica de <Link to="/jogo-responsavel" className="text-cyan-300 hover:text-cyan-200">jogo responsável</Link> com orientações sobre limites, sinais de alerta e uso consciente. A decisão mais responsável às vezes é não apostar.</p>
        </ArticleSection>

        <ArticleSection id="ferramentas" title="Quais ferramentas ajudam iniciantes?">
          <div className="grid md:grid-cols-2 gap-4">
            {tools.map(([title, href, text]) => (
              <Link key={href} to={href} className="card-glass p-5 hover:border-cyan-400/30">
                <h3 className="font-bold" style={{ color: 'var(--text-1)' }}>{title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{text}</p>
              </Link>
            ))}
          </div>
          <p>Depois do básico, ferramentas para apostas como <Link to="/ferramentas/arbitragem" className="text-cyan-300 hover:text-cyan-200">arbitragem</Link>, <Link to="/ferramentas/dutching" className="text-cyan-300 hover:text-cyan-200">dutching</Link> e <Link to="/ferramentas/hedge" className="text-cyan-300 hover:text-cyan-200">hedge</Link> podem ajudar a entender cenários mais avançados, sempre com cautela.</p>
          <div className="flex flex-wrap gap-2">{relatedToolLinks.map(([label, href]) => <Link key={href} to={href} className="badge hover:border-cyan-400/40">{label}</Link>)}</div>
        </ArticleSection>

        <ArticleSection id="investimento" title="Apostas esportivas são investimento?">
          <p>Não devem ser tratadas como investimento seguro. Investimentos regulados têm características, riscos e objetivos diferentes. Apostas esportivas dependem de eventos incertos, podem gerar perdas e não oferecem garantia de lucro. Mesmo pessoas experientes podem errar análises, interpretar odds de forma equivocada ou enfrentar variância.</p>
          <p>Por isso, o enquadramento mais responsável é entretenimento com risco financeiro, nunca renda garantida. Se a aposta deixa de ser compatível com lazer, orçamento e limites pessoais, é sinal de alerta.</p>
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão">
          <p>Um guia de apostas esportivas para iniciantes precisa começar pelos fundamentos: o que é odd, como calcular retorno de aposta, diferença entre retorno e lucro, stake apostas, banca, probabilidade implícita, aposta simples, aposta múltipla, cashout e jogo responsável. Sem esses conceitos, qualquer palpite vira uma decisão financeira mal compreendida.</p>
          <p>As calculadoras do CalculaBet ajudam a visualizar números, reduzir erro manual e apoiar o entendimento de cenários. Ainda assim, apostas envolvem risco financeiro e ferramentas não preveem resultados. Comece pela <Link to="/ferramentas/odds" className="text-cyan-300 hover:text-cyan-200">Calculadora de Odds do CalculaBet</Link> para entender retorno, lucro e probabilidade implícita antes de avançar para outras <Link to="/ferramentas" className="text-cyan-300 hover:text-cyan-200">ferramentas</Link>.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/ferramentas/odds" className="btn-primary">Começar pela Calculadora de Odds <BlogIcon name="arrow" className="w-4 h-4" /></Link>
            <Link to="/blog" className="btn-ghost">Ver mais artigos</Link>
          </div>
          <p className="text-sm pt-3">Transparência: conheça também a <Link to="/politica-de-afiliados" className="text-cyan-300 hover:text-cyan-200">política de afiliados</Link> e a página <Link to="/sobre" className="text-cyan-300 hover:text-cyan-200">sobre o CalculaBet</Link>.</p>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        <section className="mt-14" aria-labelledby="faq-iniciantes">
          <p className="badge badge-cyan mb-4">FAQ SEO</p>
          <h2 id="faq-iniciantes" className="text-3xl font-bold">Perguntas frequentes sobre apostas esportivas para iniciantes</h2>
          <div className="mt-6 space-y-3">
            {BEGINNER_GUIDE_FAQS.map(faq => (
              <details key={faq.question} className="card-glass p-5">
                <summary className="cursor-pointer font-semibold" style={{ color: 'var(--text-1)' }}>{faq.question}</summary>
                <p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-12" aria-labelledby="posts-relacionados">
          <h2 id="posts-relacionados" className="section-title">Artigos relacionados</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {relatedPosts.map(item => <BlogCard key={item.slug} post={item} category={getCategoryById(item.category)} />)}
          </div>
        </section>
      )}
    </>
  );
}
