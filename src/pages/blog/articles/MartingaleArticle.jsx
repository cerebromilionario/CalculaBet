import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import { getCategoryById } from '../../../data/blog/blogData';
import { MARTINGALE_FAQS } from '../../../data/blog/martingaleFaqs';

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
}

function Callout({ tone = 'cyan', children }) {
  const tones = {
    cyan: ['rgba(34,211,238,0.08)', 'rgba(34,211,238,0.22)', '#67e8f9'],
    amber: ['rgba(251,191,36,0.10)', 'rgba(251,191,36,0.26)', '#fbbf24'],
    rose: ['rgba(251,113,133,0.10)', 'rgba(251,113,133,0.24)', '#fb7185'],
    green: ['rgba(52,211,153,0.08)', 'rgba(52,211,153,0.22)', '#34d399'],
  };
  const [background, border, color] = tones[tone] || tones.cyan;
  return <div className="rounded-3xl p-5 sm:p-6 leading-relaxed font-medium" style={{ background, border: `1px solid ${border}`, color }}>{children}</div>;
}

function ArticleSection({ id, title, children }) {
  return (
    <section id={id} className="mt-12 scroll-mt-28 space-y-5">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>{title}</h2>
      <div className="space-y-5 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>{children}</div>
    </section>
  );
}

function PremiumTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-3xl my-6" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      <table className="w-full text-left text-sm min-w-[760px]">
        <thead style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-1)' }}>
          <tr>{headers.map(header => <th key={header} className="p-4 font-bold">{header}</th>)}</tr>
        </thead>
        <tbody style={{ color: 'var(--text-2)' }}>
          {rows.map(row => (
            <tr key={row[0]} className="border-t border-white/10">
              {row.map(cell => <td key={`${row[0]}-${cell}`} className="p-4 align-top">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const progressionRows = [
  ['1', 'R$10', 'R$10', 'Vitória na próxima aposta para tentar cobrir R$10'],
  ['2', 'R$20', 'R$30', 'Vitória em odd adequada para cobrir R$30'],
  ['3', 'R$40', 'R$70', 'Vitória em odd adequada para cobrir R$70'],
  ['4', 'R$80', 'R$150', 'Vitória em odd adequada para cobrir R$150'],
  ['5', 'R$160', 'R$310', 'Vitória em odd adequada para cobrir R$310'],
  ['6', 'R$320', 'R$630', 'Vitória em odd adequada para cobrir R$630'],
];

const riskCards = [
  ['Crescimento exponencial', 'Dobrar aposta depois de perder transforma uma stake pequena em exposição alta em poucas rodadas.'],
  ['Banca finita', 'Toda banca apostas tem limite. Se a sequência negativa continuar, a pessoa pode ficar sem saldo antes da vitória esperada.'],
  ['Limite máximo de stake', 'Mesmo com saldo, limites de mercado ou da plataforma podem impedir a próxima etapa da progressão Martingale.'],
  ['Pressão emocional', 'A cada perda, a aposta seguinte fica maior, aumentando ansiedade, pressa e risco de decisões impulsivas.'],
];

const errorItems = [
  'começar com stake alta e reduzir a margem de segurança desde a primeira rodada;',
  'usar banca pequena para uma progressão que exige várias duplicações;',
  'achar que sequência negativa longa não acontece em apostas esportivas;',
  'ignorar limite máximo de aposta, liquidez ou mudanças de mercado;',
  'usar odds abaixo de 2.00 sem ajustar cálculo e sem entender o déficit;',
  'dobrar por emoção, raiva ou tentativa de recuperar perdas rapidamente;',
  'não simular antes quanto a banca precisaria suportar;',
  'não definir limite de parada financeiro e emocional;',
  'acreditar que Martingale garante lucro ou elimina variância;',
  'apostar dinheiro essencial ou valores que afetam despesas pessoais.',
];

export default function MartingaleArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge" style={{ color: category?.color || '#fbbf24', borderColor: `${category?.color || '#fbbf24'}35`, background: `${category?.color || '#fbbf24'}10` }}>{category?.name}</span>
            <span className="badge">{post.readingTime}</span>
            <span className="badge">Publicado em {formatDate(post.date)}</span>
            <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-gradient">Martingale em Apostas: Como Funciona e Por que é Arriscado</h1>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--text-2)' }}>Martingale apostas é uma estratégia conhecida por dobrar a aposta após uma perda. Ela atrai muitos iniciantes por parecer simples: aumentar a stake até que uma vitória recupere o que ficou para trás. O problema é que essa lógica pode gerar risco muito alto para a banca, principalmente quando a sequência negativa dura mais do que o esperado.</p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>Este guia explica como funciona Martingale em apostas esportivas, por que a progressão parece atraente, quais limitações aparecem na prática e como usar a <Link to="/ferramentas/martingale" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora Martingale apostas</Link> do CalculaBet para simular cenários antes de tomar qualquer decisão. O conteúdo é educativo, crítico, matemático e responsável.</p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {['Dobrar após perda', 'Risco exponencial', 'Simulação responsável'].map(item => <div key={item} className="card-glass p-4 text-center font-semibold" style={{ color: 'var(--text-1)' }}>{item}</div>)}
          </div>
        </header>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        <Callout tone="amber">Conteúdo apenas educativo. Apostas envolvem riscos financeiros, são destinadas a maiores de 18 anos, não há garantia de ganhos, Martingale não elimina perdas e ferramentas devem ser usadas como apoio ao cálculo — nunca como promessa de resultado.</Callout>

        <ArticleSection id="o-que-e" title="O que é Martingale em apostas?">
          <p>Martingale em apostas é uma progressão de stake baseada em aumentar o valor apostado depois de uma perda. Na versão mais conhecida, a pessoa começa com uma stake base e, se perde, dobra a próxima aposta. Se perde de novo, dobra novamente. A ideia comum é que, quando finalmente vier uma vitória, o retorno cubra as perdas anteriores e ainda deixe um pequeno saldo positivo.</p>
          <p>A origem do conceito está em jogos de chance, mas alguns usuários tentam aplicar a estratégia Martingale em apostas esportivas. É importante separar a lógica matemática simplificada da realidade do esporte: partidas têm variáveis, odds mudam, mercados têm margem e nenhuma sequência de resultados é garantida.</p>
          <p>Ela é popular entre iniciantes porque parece organizada e fácil de executar. Em vez de analisar probabilidade, gestão de banca, valor esperado e risco, a pessoa enxerga uma regra direta: perdeu, aumenta; ganhou, volta ao início. Essa simplicidade é justamente o ponto que pode esconder o risco Martingale.</p>
        </ArticleSection>

        <ArticleSection id="como-funciona" title="Como funciona a estratégia Martingale?">
          <p>O funcionamento básico é: escolher uma stake inicial, apostar, dobrar a próxima stake em caso de perda e reiniciar a sequência quando ocorrer uma vitória. Exemplo simples com aposta inicial de R$10: depois de uma perda, a próxima aposta seria R$20; depois R$40; depois R$80; depois R$160.</p>
          <p>Ao vencer em uma odd próxima de 2.00, a progressão clássica tenta recuperar as perdas anteriores e obter um lucro equivalente à stake base. Porém, isso depende de três condições que nem sempre existem ao mesmo tempo: banca suficiente para continuar, limites disponíveis para aumentar a stake e ocorrência da vitória antes que a progressão fique inviável.</p>
          <Callout>“Martingale não elimina risco. Ele aumenta a exposição após cada perda.”</Callout>
        </ArticleSection>

        <ArticleSection id="exemplo-pratico" title="Exemplo prático de Martingale">
          <p>A tabela mostra como uma progressão Martingale com stake inicial de R$10 cresce rapidamente. Observe que o valor da próxima aposta fica maior, mas a perda acumulada também aumenta a cada rodada perdida.</p>
          <PremiumTable headers={['Rodada', 'Stake', 'Perda acumulada', 'Resultado necessário para recuperar']} rows={progressionRows} />
          <p>Em apenas seis rodadas, a stake chega a R$320 e a perda acumulada alcança R$630. Uma banca pequena pode acabar rapidamente, e um limite máximo de aposta pode impedir a próxima tentativa mesmo se ainda houver saldo. Esse é o ponto central: a progressão parece controlada no início, mas cresce em velocidade exponencial.</p>
        </ArticleSection>

        <ArticleSection id="parece-funcionar" title="Por que Martingale parece funcionar?">
          <p>Martingale parece funcionar porque muitas sequências de perdas são curtas. Se a pessoa perde uma ou duas vezes e vence logo depois, pode sentir que o método “recuperou” a sequência. A primeira vitória depois de perdas cria sensação de segurança, como se bastasse ter disciplina para dobrar até acertar.</p>
          <p>O problema aparece quando a sequência negativa é maior que o esperado. Em apostas esportivas, resultados improváveis acontecem, favoritos perdem, mercados oscilam e odds refletem incerteza. A falsa confiança surge porque os ciclos curtos são mais frequentes e visíveis, enquanto o ciclo ruim pode demorar a aparecer — mas quando aparece, concentra uma perda grande.</p>
        </ArticleSection>

        <ArticleSection id="riscos" title="Por que Martingale é arriscado?">
          <p>Martingale é arriscado porque a stake cresce de forma exponencial enquanto o lucro potencial por ciclo costuma ser pequeno em relação ao dinheiro exposto. A cada perda, a pessoa precisa colocar mais capital em risco para tentar alcançar o mesmo objetivo inicial. Isso pode pressionar a banca, os limites da casa, a liquidez do mercado e o controle emocional.</p>
          <div className="grid sm:grid-cols-2 gap-4">{riskCards.map(([title, text]) => <div key={title} className="card-glass p-5"><h3 className="font-bold" style={{ color: 'var(--text-1)' }}>{title}</h3><p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{text}</p></div>)}</div>
          <Callout tone="rose">“Martingale pode parecer simples, mas o risco cresce exponencialmente a cada perda.”</Callout>
          <p>Outro fator é que odds nem sempre são 2.00. A margem embutida no mercado afeta o cálculo, e uma odd menor pode fazer com que dobrar a stake não seja suficiente para recuperar a perda acumulada. Por isso, tratar Martingale como método para recuperar perdas apostas é perigoso e incompatível com apostas responsáveis.</p>
        </ArticleSection>

        <ArticleSection id="odds-abaixo" title="O problema das odds abaixo de 2.00">
          <p>O Martingale clássico costuma assumir pagamento próximo de 2.00. Se você aposta R$10, perde, aposta R$20 e vence em odd 2.00, o retorno total é R$40, com lucro líquido de R$20 nessa segunda aposta; isso cobre a perda anterior de R$10 e sobra R$10 antes de considerar outras complexidades.</p>
          <p>Com odds abaixo de 2.00, a conta muda. Em odd 1.80, uma aposta de R$20 gera lucro líquido de R$16, não R$20. Isso pode não cobrir toda a sequência anterior conforme a rodada avança. Para compensar, seria necessário aumentar ainda mais a stake, o que torna a estratégia mais arriscada.</p>
          <p>Como muitas apostas esportivas têm odds variáveis, margem embutida e mercados suspensos ou alterados, a pergunta “martingale funciona?” precisa ser acompanhada de outra: em quais odds, com qual banca, com quais limites e com qual tolerância a perdas?</p>
        </ArticleSection>

        <ArticleSection id="funciona" title="Martingale funciona em apostas esportivas?">
          <p>Matematicamente, a progressão pode recuperar perdas em sequências curtas se houver vitória, banca suficiente e odds compatíveis. Essa frase, porém, tem muitas condições. Na prática, há limites de stake, variação de preço, fechamento de mercado, margem da casa, incerteza esportiva e risco de ruína.</p>
          <p>Portanto, Martingale apostas esportivas não deve ser tratado como estratégia segura, não garante lucro e não deve ser usado para recuperar prejuízos. Ele apenas muda a distribuição do risco: vários ciclos pequenos podem parecer positivos, mas uma sequência negativa longa pode anular muitos ciclos anteriores e causar grande perda.</p>
        </ArticleSection>

        <ArticleSection id="garante-lucro" title="Martingale garante lucro?">
          <p>Não. Nenhuma estratégia garante lucro em apostas. Martingale não prevê resultados, não altera a probabilidade real do evento e não remove a margem do mercado. A estratégia apenas aumenta a exposição depois de perdas, buscando que uma vitória futura cubra o passado.</p>
          <p>Esse desenho cria uma assimetria desconfortável: o lucro potencial por ciclo tende a ser pequeno, enquanto a exposição acumulada pode ficar muito grande. Uma sequência negativa é suficiente para transformar uma rotina aparentemente controlada em perda relevante.</p>
        </ArticleSection>

        <ArticleSection id="calculadora" title="Como usar a Calculadora Martingale do CalculaBet">
          <p>A <Link to="/ferramentas/martingale" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora Martingale</Link> do CalculaBet ajuda a simular Martingale antes de qualquer exposição real. A proposta é educativa: visualizar a progressão, perceber quanto a stake cresce e entender quanto de banca seria necessário para suportar diferentes sequências.</p>
          <div className="rounded-3xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(251,191,36,0.10))', border: '1px solid rgba(103,232,249,0.20)' }}>
            <h3 className="text-2xl font-bold">Simule antes de decidir</h3>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Insira stake inicial, número de rodadas e parâmetros da progressão para visualizar perda acumulada, próxima stake e risco de banca.</p>
            <Link to="/ferramentas/martingale" className="btn-primary mt-5">Abrir ferramenta Martingale do CalculaBet <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>inserir stake inicial;</li><li>definir número de rodadas;</li><li>simular a progressão Martingale;</li><li>visualizar perda acumulada;</li><li>entender quanto de banca seria necessário;</li><li>perceber o risco antes de apostar dinheiro real.</li>
          </ul>
        </ArticleSection>

        <ArticleSection id="banca-100" title="Simulação com banca de R$100">
          <p>Imagine uma banca de R$100 e stake inicial de R$5. A progressão simples seria R$5, R$10, R$20, R$40 e R$80. Somando as quatro primeiras perdas, a perda acumulada já chega a R$75. A próxima stake exigida seria R$80, mas a banca restante não seria suficiente.</p>
          <PremiumTable headers={['Rodada', 'Stake', 'Perda acumulada se perder', 'Observação']} rows={[
            ['1', 'R$5', 'R$5', 'Ainda parece pequeno.'],
            ['2', 'R$10', 'R$15', 'A progressão dobra.'],
            ['3', 'R$20', 'R$35', 'Mais de um terço da banca já ficou exposto.'],
            ['4', 'R$40', 'R$75', 'A banca fica muito pressionada.'],
            ['5', 'R$80', 'R$155', 'A banca de R$100 não suporta continuar.'],
          ]} />
          <Callout tone="amber">“Quanto maior a sequência negativa, maior a stake necessária para continuar a progressão.”</Callout>
        </ArticleSection>

        <ArticleSection id="banca-1000" title="Simulação com banca de R$1.000">
          <p>Com banca de R$1.000 e stake inicial de R$10, a sequência R$10, R$20, R$40, R$80, R$160, R$320 e R$640 parece mais viável no começo. Ainda assim, se todas essas etapas forem perdidas, a perda acumulada chega a R$1.270, acima da banca inicial.</p>
          <p>Isso mostra que uma banca maior não elimina o risco; ela apenas permite suportar algumas rodadas a mais. O crescimento continua exponencial e, em determinado ponto, a progressão exige uma stake que compromete todo o saldo ou ultrapassa limites práticos.</p>
        </ArticleSection>

        <ArticleSection id="risco-ruina" title="Martingale e risco de ruína">
          <p>Risco de ruína é a possibilidade de perder a banca antes da vitória necessária para fechar o ciclo. No Martingale, esse risco é real porque a banca é finita. Não importa se a primeira stake é pequena: se a sequência negativa for longa o suficiente, a progressão alcança um valor impossível de continuar.</p>
          <p>Além da banca, existem limites de stake, limites por mercado, liquidez e mudanças de odds. A estratégia depende de recursos que o usuário nem sempre tem. Por isso, uma simulação deve incluir não apenas “quantas perdas aguento?”, mas também “quanto aceito perder se a progressão falhar?”.</p>
        </ArticleSection>

        <ArticleSection id="emocional" title="Martingale e controle emocional">
          <p>Perder várias vezes seguidas pode gerar ansiedade. Quando a regra manda dobrar a aposta, a pressão emocional aumenta junto com a stake. A pessoa pode agir por desespero, acelerar decisões e abandonar critérios que havia definido antes.</p>
          <Callout tone="rose">“Se você está tentando recuperar perdas, considere parar e revisar seus limites.”</Callout>
          <p>Tentar recuperar perdas é sinal de alerta. Fazer pausas, revisar limites e consultar a página de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link> é mais importante do que continuar uma progressão por impulso.</p>
        </ArticleSection>

        <ArticleSection id="gestao-banca" title="Martingale vs gestão de banca">
          <p>Gestão de banca busca controlar risco, preservar capital e definir stakes antes da emoção do evento. Martingale faz o oposto em momentos de perda: aumenta exposição justamente quando a pessoa pode estar emocionalmente pressionada. Isso pode ir contra uma abordagem conservadora.</p>
          <p>Uma stake apostas deve ser definida com antecedência, considerando orçamento, objetivo educativo, tolerância a perdas e limites pessoais. Use a <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>ferramenta de gestão de banca</Link> e leia o guia sobre <Link to="/blog/o-que-e-gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>gestão de banca</Link> para comparar métodos de controle.</p>
        </ArticleSection>

        <ArticleSection id="stake-fixa" title="Martingale vs stake fixa">
          <p>Comparar Martingale com stake fixa, percentual da banca e Kelly ajuda a entender que cada método lida com risco de forma diferente. Nenhum método garante lucro, mas alguns são mais previsíveis do que uma progressão de perdas.</p>
          <PremiumTable headers={['Método', 'Como funciona', 'Vantagem', 'Risco', 'Perfil']} rows={[
            ['Stake fixa', 'Usa o mesmo valor em cada aposta.', 'Simplicidade e previsibilidade.', 'Não ajusta exposição por probabilidade ou banca.', 'Iniciantes e controle conservador.'],
            ['Percentual da banca', 'Aposta uma porcentagem definida do saldo.', 'Mantém proporção conforme a banca muda.', 'Pode ser mal calibrado se o percentual for alto.', 'Quem busca regra de risco simples.'],
            ['Martingale', 'Dobra depois de perdas.', 'Parece recuperar sequências curtas.', 'Exposição exponencial e risco de ruína.', 'Exige extrema cautela e simulação.'],
            ['Kelly/Meio Kelly', 'Calcula stake por odd e probabilidade estimada.', 'Conecta stake ao valor percebido.', 'Depende de estimativas corretas e pode ser agressivo.', 'Usuários experientes e disciplinados.'],
          ]} />
          <p>Para complementar, veja o guia sobre <Link to="/blog/criterio-de-kelly-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>Critério de Kelly em apostas</Link> e use a <Link to="/ferramentas/gestao-de-banca" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de gestão de banca</Link>.</p>
        </ArticleSection>

        <ArticleSection id="erros" title="Erros comuns ao usar Martingale">
          <ul className="grid sm:grid-cols-2 gap-4">{errorItems.map(item => <li key={item} className="card-glass p-5">{item}</li>)}</ul>
        </ArticleSection>

        <ArticleSection id="seguro" title="Existe forma segura de usar Martingale?">
          <p>Não existe forma sem risco. Simulações podem ajudar a entender exposição, e limites de perda podem reduzir dano, mas isso não transforma a estratégia em segura. A progressão continua vulnerável a sequências negativas, odds ruins e limites práticos.</p>
          <p>Usuários iniciantes devem ter muito cuidado. Se houver impulso de recuperar perdas, a melhor decisão responsável tende a ser parar, revisar a banca e não aumentar a stake por emoção.</p>
        </ArticleSection>

        <ArticleSection id="quando-evitar" title="Quando evitar Martingale?">
          <p>Evite Martingale se sua banca é pequena, se você está tentando recuperar prejuízo, se não entende odds, se não aceita perder a sequência, se a stake necessária compromete orçamento, se sente ansiedade ou perda de controle, ou se está usando dinheiro essencial.</p>
          <p>Também evite se você não simulou a progressão, não definiu limite de parada ou não sabe calcular a diferença entre retorno bruto e lucro líquido. Para revisar conceitos, use a <Link to="/ferramentas/odds" className="font-semibold" style={{ color: '#67e8f9' }}>calculadora de odds</Link>, a ferramenta de <Link to="/ferramentas/roi" className="font-semibold" style={{ color: '#67e8f9' }}>ROI</Link> e o <Link to="/ferramentas/simulador" className="font-semibold" style={{ color: '#67e8f9' }}>simulador de lucro</Link>.</p>
        </ArticleSection>

        <ArticleSection id="responsabilidade" title="Aviso educativo e apostas responsáveis">
          <p>O CalculaBet não é uma casa de apostas, não aceita apostas e não processa pagamentos. O site oferece <Link to="/ferramentas" className="font-semibold" style={{ color: '#67e8f9' }}>ferramentas para apostas</Link>, calculadoras e conteúdo educativo para apoiar entendimento de cenários, não para prometer resultados.</p>
          <p>Apostas envolvem riscos financeiros, são apenas para maiores de 18 anos, não há garantia de ganhos, Martingale não elimina perdas e não deve ser usado para recuperar prejuízos. Não aposte dinheiro essencial. Leia também a <Link to="/politica-de-afiliados" className="font-semibold" style={{ color: '#67e8f9' }}>política de afiliados</Link> e as orientações de <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>apostas responsáveis</Link>.</p>
        </ArticleSection>

        <ArticleSection id="conclusao" title="Conclusão">
          <p>Martingale é baseado em aumentar a stake após perdas. Ele pode parecer simples porque uma vitória em sequência curta dá a sensação de recuperação, mas a matemática mostra que a stake cresce rapidamente. O risco de perda grande é real, especialmente com banca finita, odds abaixo de 2.00, limites de stake e pressão emocional.</p>
          <p>Martingale não garante lucro e não deve ser tratado como método para recuperar perdas. Simular antes ajuda a entender o risco, mas gestão de banca e jogo responsável continuam fundamentais.</p>
          <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.18)' }}>
            <h2 className="text-2xl font-bold">Simule a progressão antes de qualquer decisão</h2>
            <p className="mt-3" style={{ color: 'var(--text-2)' }}>Use a Calculadora Martingale do CalculaBet para simular a progressão de stakes e entender os riscos antes de tomar qualquer decisão.</p>
            <Link to="/ferramentas/martingale" className="btn-primary mt-5">Usar Calculadora Martingale <BlogIcon name="arrow" className="w-4 h-4" /></Link>
          </div>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        <section className="mt-14" aria-labelledby="faq-martingale">
          <p className="badge badge-cyan mb-4">FAQ SEO</p>
          <h2 id="faq-martingale" className="text-3xl font-bold">Perguntas frequentes sobre Martingale apostas</h2>
          <div className="mt-6 space-y-3">{MARTINGALE_FAQS.map(faq => <details key={faq.question} className="card-glass p-5"><summary className="cursor-pointer font-semibold" style={{ color: 'var(--text-1)' }}>{faq.question}</summary><p className="mt-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.answer}</p></details>)}</div>
        </section>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-12" aria-labelledby="posts-relacionados">
          <h2 id="posts-relacionados" className="section-title">Artigos relacionados</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">{relatedPosts.map(item => <BlogCard key={item.slug} post={item} category={getCategoryById(item.category)} />)}</div>
        </section>
      )}
    </>
  );
}
