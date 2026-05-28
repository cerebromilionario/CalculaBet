import { Link } from 'react-router-dom';
import BlogCard from '../../../components/blog/BlogCard';
import BlogIcon from '../../../components/blog/BlogIcon';
import ArticleAffiliateBanner from '../../../components/ui/ArticleAffiliateBanner';
import FAQSection from '../../../components/ui/FAQSection';
import { getCategoryById } from '../../../data/blog/blogData';
import { CASHOUT_MANUAL_FAQS } from '../../../data/blog/cashoutManualFaqs';

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
    : tone === 'red'
    ? { background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.18)' }
    : tone === 'green'
    ? { background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }
    : { background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)' };
  return <div className="rounded-3xl p-5 my-7 leading-relaxed" style={styles}>{children}</div>;
}

function FormulaBox({ label, formula, note }) {
  return (
    <div className="rounded-3xl p-6 my-6" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(129,140,248,0.08))', border: '1px solid rgba(103,232,249,0.20)' }}>
      <p className="badge badge-cyan mb-4">{label}</p>
      <p className="text-xl sm:text-2xl font-bold leading-relaxed font-mono" style={{ color: 'var(--text-1)' }}>{formula}</p>
      {note && <div className="mt-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>{note}</div>}
    </div>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-3xl my-4" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      <table className="w-full text-left">
        <thead style={{ background: 'rgba(255,255,255,0.06)' }}>
          <tr>{headers.map(h => <th key={h} className="p-4 text-sm font-semibold">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-white/10" style={{ color: 'var(--text-2)' }}>
              {row.map((cell, j) => (
                <td key={j} className="p-4 text-sm" style={j === 0 ? { color: 'var(--text-1)', fontWeight: '600', fontFamily: 'monospace' } : {}}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CtaBox({ title, desc, href, btnLabel }) {
  return (
    <div className="rounded-3xl p-6 mt-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.16), rgba(52,211,153,0.10))', border: '1px solid rgba(103,232,249,0.20)' }}>
      <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>{title}</h2>
      <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-2)' }}>{desc}</p>
      <Link to={href} className="btn-primary mt-5">{btnLabel} <BlogIcon name="arrow" className="w-4 h-4" /></Link>
    </div>
  );
}

const faqItems = CASHOUT_MANUAL_FAQS.map(f => ({ q: f.question, a: f.answer }));

export default function CashoutManualArticle({ post, category, relatedPosts }) {
  return (
    <>
      <article className="rounded-[2rem] p-6 sm:p-8 lg:p-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.058), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.09)' }}>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="badge" style={{ color: category?.color || '#fb7185', borderColor: `${category?.color || '#fb7185'}35`, background: `${category?.color || '#fb7185'}10` }}>{category?.name || 'Cashout e Hedge'}</span>
          <span className="badge">{post.readingTime}</span>
          <span className="badge">Publicado em {formatDate(post.date)}</span>
          <span className="badge">Atualizado em {formatDate(post.updatedAt)}</span>
        </div>

        {/* Header */}
        <header className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-start">
          <div>
            <p className="badge badge-cyan mb-5">Guia educativo — cashout manual, valor justo e comparação</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-gradient">
              Cashout Manual: Como Calcular se a Oferta da Casa Vale a Pena
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Cashout permite encerrar uma aposta antes do resultado final. A maioria dos apostadores aceita ou recusa a oferta por emoção, sem comparar números. O cashout manual tenta comparar o valor oferecido com uma estimativa matemática usando a fórmula retorno potencial × probabilidade. Este guia mostra a fórmula, exemplos práticos e a{' '}
              <Link to="/calculadoras/cashout-justo" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Cashout Justo / Manual</Link> do CalculaBet. Conteúdo educativo e responsável: apostas envolvem risco e a calculadora não prevê resultados.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/calculadoras/cashout-justo" className="btn-primary">
                Usar Calculadora de Cashout Justo <BlogIcon name="arrow" className="w-4 h-4" />
              </Link>
              <Link to="/jogo-responsavel" className="btn-ghost">Jogo responsável</Link>
            </div>
          </div>
          <aside className="rounded-3xl p-6" style={{ background: 'rgba(251,113,133,0.07)', border: '1px solid rgba(251,113,133,0.17)' }} aria-label="Pontos essenciais sobre cashout manual">
            <p className="badge mb-4" style={{ color: '#fb7185', borderColor: 'rgba(251,113,133,0.30)', background: 'rgba(251,113,133,0.10)' }}>Três pontos essenciais</p>
            <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text-1)' }}>Antes de aceitar ou recusar cashout</h2>
            <div className="space-y-4">
              {[
                ['Calcule o cashout justo', 'Retorno potencial × probabilidade atual estimada define o valor de referência.'],
                ['Compare a oferta da casa', 'A diferença entre o valor oferecido e o justo indica se há desconto ou favorabilidade.'],
                ['Probabilidade é a chave', 'A qualidade do cálculo depende da qualidade da estimativa de probabilidade.'],
              ].map(([title, body]) => (
                <div key={title} className="card-glass p-4">
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-1)' }}>{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{body}</p>
                </div>
              ))}
            </div>
          </aside>
        </header>

        <Callout tone="amber">
          <strong>Conteúdo educativo:</strong> apostas envolvem riscos financeiros, são destinadas apenas a maiores de 18 anos. Não há garantia de ganhos e cashout não elimina riscos. A calculadora não prevê resultados — use como apoio matemático. Consulte nossas orientações de{' '}
          <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#fbbf24' }}>jogo responsável</Link>.
        </Callout>

        <section id="resposta-rapida" className="mt-10 rounded-3xl p-5" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.18)' }}>
          <p className="badge badge-cyan mb-3">Resposta rapida</p>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>Cashout manual compara a oferta da casa com uma estimativa de valor justo da aposta naquele momento. A referência comum usa retorno potencial multiplicado por uma probabilidade atual estimada. É apoio de cálculo: não existe decisão automática nem previsão do resultado final.</p>
        </section>

        <ArticleAffiliateBanner postSlug={post.slug} placement="mid-article" />

        {/* O que é cashout */}
        <ArticleSection id="o-que-e-cashout" title="O que é cashout em apostas?">
          <p>
            Cashout é um recurso disponível em algumas plataformas de apostas que permite encerrar uma aposta antes do resultado final. A casa oferece um valor pelo encerramento antecipado, que pode ser maior ou menor do que o valor apostado originalmente.
          </p>
          <p>
            O valor do cashout muda durante o evento conforme as condições do jogo se alteram. Se a aposta estiver favorável, o valor tende a ser mais alto; se estiver desfavorável, pode ser menor do que o valor apostado. Nem todas as apostas têm cashout disponível, e as regras variam de acordo com a plataforma e o mercado.
          </p>
          <p>
            Para entender melhor como cashout funciona em geral, consulte o artigo{' '}
            <Link to="/blog/cashout-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>Cashout em Apostas</Link> ou use a{' '}
            <Link to="/calculadoras/cashout" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Cashout</Link> do CalculaBet.
          </p>
        </ArticleSection>

        {/* O que é cashout manual */}
        <ArticleSection id="o-que-e-cashout-manual" title="O que é cashout manual?">
          <p>
            Cashout manual é a prática de estimar por conta própria se uma oferta de cashout parece financeiramente justa. Em vez de aceitar ou recusar apenas pela intuição ou emoção do momento, o usuário compara o valor oferecido pela casa com uma estimativa calculada.
          </p>
          <p>
            Essa estimativa usa o retorno potencial original da aposta e uma probabilidade atual estimada pelo próprio usuário. O resultado não substitui análise nem garante a melhor decisão — é apenas um número de referência para comparar com o que a casa está oferecendo.
          </p>
          <p>
            Cashout manual não é uma previsão de resultado. Não é uma recomendação de aceitar ou recusar. É uma ferramenta de comparação matemática que depende da qualidade da estimativa de probabilidade informada.
          </p>
          <Callout>
            Cashout manual não decide por você. Ele apenas ajuda a comparar números.
          </Callout>
        </ArticleSection>

        {/* O que é cashout justo */}
        <ArticleSection id="o-que-e-cashout-justo" title="O que é cashout justo?">
          <p>
            Cashout justo é uma estimativa matemática do valor que faria sentido para encerrar a aposta, com base na probabilidade atual de vitória. Ele considera o retorno potencial original da aposta e multiplica pela probabilidade atual estimada pelo usuário.
          </p>
          <p>
            A qualidade dessa estimativa depende diretamente da qualidade da probabilidade informada. Uma estimativa otimista demais resulta em cashout justo alto; uma estimativa conservadora pode fazer a oferta da casa parecer mais favorável do que realmente é.
          </p>
          <p>
            Exemplo direto: retorno potencial de R$250 e probabilidade atual de 70% resultam em cashout justo de R$250 × 0,70 = R$175. Se a casa oferece R$160, a oferta está R$15 abaixo do valor justo estimado com essas premissas.
          </p>
        </ArticleSection>

        {/* Fórmula */}
        <ArticleSection id="formula-cashout-justo" title="Fórmula do cashout justo">
          <p>
            O cálculo do cashout justo parte de fórmulas diretas que podem ser aplicadas manualmente ou pela calculadora:
          </p>
          <FormulaBox
            label="Cashout justo"
            formula="Cashout justo = Retorno potencial × Probabilidade atual estimada"
          />
          <FormulaBox
            label="Retorno potencial"
            formula="Retorno potencial = Valor apostado × Odd original"
          />
          <FormulaBox
            label="Lucro potencial"
            formula="Lucro potencial = Valor apostado × (Odd original - 1)"
          />
          <FormulaBox
            label="Diferença"
            formula="Diferença = Cashout oferecido - Cashout justo"
          />
          <p>
            Uma diferença negativa indica que o cashout oferecido está abaixo da estimativa. Uma diferença positiva indica que está acima. Em ambos os casos, a interpretação depende da confiança na estimativa de probabilidade e do perfil de risco do usuário.
          </p>
        </ArticleSection>

        {/* Exemplo prático */}
        <ArticleSection id="exemplo-pratico" title="Exemplo prático de cashout manual">
          <p>Considere o seguinte cenário:</p>
          <div className="rounded-3xl p-5 my-4 space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Valor apostado:</strong> R$100</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Odd original:</strong> 2.50</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Retorno potencial:</strong> R$250</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Cashout oferecido:</strong> R$160</p>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}><strong style={{ color: 'var(--text-1)' }}>Probabilidade atual estimada:</strong> 70%</p>
            <p className="text-sm font-semibold mt-3" style={{ color: '#22d3ee' }}>Cashout justo = R$250 × 70% = R$175</p>
            <p className="text-sm font-semibold" style={{ color: '#22d3ee' }}>Diferença = R$160 - R$175 = -R$15</p>
            <p className="text-sm font-semibold" style={{ color: '#22d3ee' }}>Desconto = 8,57%</p>
          </div>
          <p>
            Com essas premissas, a oferta está R$15 abaixo do cashout justo estimado. Isso não significa que recusar seja sempre a melhor decisão: o resultado real depende da probabilidade verdadeira e do risco que o usuário está disposto a aceitar. Se a probabilidade estimada de 70% estiver errada para cima, a oferta pode ser mais razoável do que o cálculo sugere.
          </p>
          <CtaBox
            href="/calculadoras/cashout-justo"
            title="Calcule cashout justo online"
            desc="Use a Calculadora de Cashout Justo / Manual do CalculaBet para comparar a oferta da casa com uma estimativa de valor justo."
            btnLabel="Abrir calculadora de cashout justo"
          />
        </ArticleSection>

        {/* Como usar a calculadora */}
        <ArticleSection id="como-usar-calculadora" title="Como usar a Calculadora de Cashout Justo / Manual do CalculaBet">
          <p>
            A <Link to="/calculadoras/cashout-justo" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Cashout Justo / Manual</Link> do CalculaBet foi criada para ajudar a comparar a oferta da casa com uma estimativa de valor justo. É uma ferramenta educativa — não prevê resultados nem garante que aceitar ou recusar seja a decisão correta.
          </p>
          <ol className="list-none space-y-3 mt-4">
            {[
              ['1', 'Acesse a Calculadora de Cashout Justo / Manual.'],
              ['2', 'Informe o valor apostado.'],
              ['3', 'Digite a odd original da aposta.'],
              ['4', 'Informe o cashout oferecido pela casa.'],
              ['5', 'Estime a probabilidade atual de acerto.'],
              ['6', 'Veja o retorno potencial original calculado.'],
              ['7', 'Compare o cashout oferecido com o cashout justo estimado.'],
              ['8', 'Analise a diferença em reais e o desconto percentual.'],
              ['9', 'Use o resultado apenas como apoio matemático, não como recomendação.'],
            ].map(([n, text]) => (
              <li key={n} className="flex gap-3 text-sm sm:text-base items-start">
                <span className="rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(34,211,238,0.15)', color: '#22d3ee' }}>{n}</span>
                <span style={{ color: 'var(--text-2)' }}>{text}</span>
              </li>
            ))}
          </ol>
          <CtaBox
            href="/calculadoras/cashout-justo"
            title="Compare a oferta com o valor justo estimado"
            desc="Insira os dados da sua aposta e veja se a oferta da casa está próxima, acima ou abaixo do cashout justo calculado."
            btnLabel="Abrir calculadora de cashout justo"
          />
        </ArticleSection>

        {/* Cashout oferecido vs justo */}
        <ArticleSection id="cashout-oferecido-vs-justo" title="Cashout oferecido pela casa vs cashout justo">
          <p>
            A casa de apostas define o valor do cashout com base em seus próprios modelos, que podem incorporar margem, risco de exposição, liquidez do mercado e critérios internos. Por isso, o valor oferecido frequentemente está abaixo do cashout justo estimado — assim como as odds originais já incorporam a margem da casa.
          </p>
          <p>
            Em alguns casos, a oferta pode estar próxima ou acima do cashout justo estimado, especialmente quando a probabilidade estimada pelo usuário é conservadora ou quando o mercado está mais favorável. A tabela abaixo resume as situações possíveis:
          </p>
          <DataTable
            headers={['Situação', 'O que pode indicar', 'Cuidado']}
            rows={[
              ['Oferta abaixo do justo', 'Possível desconto ou margem da casa', 'Depende da probabilidade estimada'],
              ['Oferta próxima do justo', 'Equilíbrio aproximado pelas premissas', 'Ainda há incerteza no resultado'],
              ['Oferta acima do justo', 'Oferta favorável com essas premissas', 'Verificar se dados inseridos estão corretos'],
            ]}
          />
        </ArticleSection>

        {/* Cashout vale a pena */}
        <ArticleSection id="cashout-vale-a-pena" title="Cashout vale a pena?">
          <p>
            Não existe resposta universal. Cashout pode fazer sentido para reduzir risco quando o cenário mudou desfavoravelmente. Pode fazer sentido quando a oferta está próxima ou acima do cashout justo estimado. Pode não fazer sentido quando a oferta está muito abaixo da estimativa e o risco restante ainda parece administrável.
          </p>
          <p>
            A decisão também depende de fatores pessoais: tamanho da banca, tolerância ao risco, contexto emocional no momento, importância do evento e objetivos de curto e longo prazo. A mesma oferta pode ser boa para um usuário e ruim para outro, dependendo de cada situação.
          </p>
          <Callout>
            Cashout vale a pena apenas dentro de um contexto. A mesma oferta pode ser boa para um usuário e ruim para outro.
          </Callout>
        </ArticleSection>

        {/* Estimar probabilidade */}
        <ArticleSection id="estimar-probabilidade" title="Como estimar a probabilidade atual?">
          <p>
            Estimar a probabilidade atual é a parte mais difícil e mais subjetiva do cálculo de cashout manual. A estimativa pode considerar o placar atual do evento, o tempo restante, o desempenho das equipes ou participantes durante o evento, o contexto esportivo e a própria análise do usuário.
          </p>
          <p>
            Superestimar a probabilidade de vitória torna o cashout justo otimista demais, fazendo qualquer oferta parecer um desconto. Subestimar pode fazer a oferta da casa parecer mais favorável do que realmente é. Não existe método perfeito para estimar probabilidade ao vivo.
          </p>
          <p>
            A qualidade do cálculo de cashout manual depende diretamente da qualidade da estimativa de probabilidade. Por isso, a calculadora é um apoio matemático — e não um oráculo.
          </p>
        </ArticleSection>

        {/* Cashout e valor esperado */}
        <ArticleSection id="cashout-e-valor-esperado" title="Cashout e valor esperado">
          <p>
            Manter a aposta significa aceitar o resultado incerto: perder tudo ou receber o retorno potencial. Aceitar o cashout significa converter essa incerteza em um valor definido agora. O valor esperado ajuda a comparar esses dois cenários matematicamente.
          </p>
          <p>
            Se o cashout oferecido está próximo do valor esperado calculado com base na probabilidade estimada, a oferta parece equilibrada. Se estiver muito abaixo, a decisão de aceitar representa um custo em relação à estimativa. O valor esperado não garante o resultado individual de nenhuma aposta.
          </p>
          <p>
            Para aprofundar o conceito de valor esperado em apostas, consulte{' '}
            <Link to="/calculadoras/value-bet" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Value Bet / EV</Link>,{' '}
            <Link to="/blog/como-calcular-ev-apostas" className="font-semibold" style={{ color: '#67e8f9' }}>Como Calcular EV em Apostas</Link> e{' '}
            <Link to="/blog/value-bet-o-que-e" className="font-semibold" style={{ color: '#67e8f9' }}>O que é Value Bet</Link>.
          </p>
        </ArticleSection>

        {/* Cashout em aposta simples */}
        <ArticleSection id="cashout-aposta-simples" title="Cashout em aposta simples">
          <p>
            Em uma aposta simples, o cálculo de cashout manual é mais direto. Existe uma única odd, um único retorno potencial e uma única probabilidade atual a estimar. Isso torna a aplicação da fórmula mais transparente e a estimativa de probabilidade mais fácil de fazer.
          </p>
          <p>
            Para calcular o retorno potencial de uma aposta simples, use a{' '}
            <Link to="/calculadoras/odds" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Odds</Link>. Para entender melhor como calcular o retorno de uma aposta, consulte o artigo{' '}
            <Link to="/blog/como-calcular-retorno-de-aposta" className="font-semibold" style={{ color: '#67e8f9' }}>Como Calcular o Retorno de uma Aposta</Link>.
          </p>
        </ArticleSection>

        {/* Cashout em aposta múltipla */}
        <ArticleSection id="cashout-aposta-multipla" title="Cashout em aposta múltipla">
          <p>
            Em uma aposta múltipla, o cashout manual é mais complexo. Várias seleções afetam a probabilidade combinada, e o retorno potencial é mais alto porque as odds são multiplicadas. Uma única seleção pendente pode alterar muito o valor do cashout.
          </p>
          <p>
            O cashout justo pode ser calculado para a múltipla usando a mesma fórmula, mas a estimativa de probabilidade precisa considerar todas as seleções restantes. Decisões de cashout em múltiplas são frequentemente influenciadas por medo de perder o bilhete inteiro ou por ganância de manter uma odd alta.
          </p>
          <p>
            Para simular apostas múltiplas, use a{' '}
            <Link to="/calculadoras/multipla-parlay" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Aposta Múltipla</Link>. Para entender melhor o conceito, consulte{' '}
            <Link to="/blog/o-que-e-aposta-multipla" className="font-semibold" style={{ color: '#67e8f9' }}>O que é Aposta Múltipla</Link>.
          </p>
        </ArticleSection>

        {/* Cashout vs hedge */}
        <ArticleSection id="cashout-vs-hedge" title="Cashout e hedge: qual a diferença?">
          <p>
            Cashout é uma oferta da própria casa para encerrar a aposta por um valor definido pela plataforma. O usuário não precisa abrir nova aposta: apenas aceita ou recusa. Hedge é uma cobertura feita manualmente, apostando em uma direção oposta em outro mercado ou plataforma para ajustar a exposição.
          </p>
          <p>
            Cashout é mais simples de executar, mas o valor pode incluir a margem da casa. Hedge oferece mais controle sobre o valor de cobertura, mas exige cálculo detalhado, nova aposta e odds disponíveis no momento.
          </p>
          <p>
            Para calcular hedge manualmente, use a{' '}
            <Link to="/calculadoras/hedge" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Hedge</Link>. Para cashout, use a{' '}
            <Link to="/calculadoras/cashout" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Cashout</Link>.
          </p>
        </ArticleSection>

        {/* Erros comuns */}
        <ArticleSection id="erros-comuns-cashout" title="Erros comuns ao avaliar cashout">
          <ul className="list-none space-y-2 mt-2">
            {[
              'Aceitar cashout sem comparar com valor estimado.',
              'Recusar cashout apenas por ganância ou excesso de confiança.',
              'Superestimar a probabilidade atual de acerto.',
              'Subestimar o risco restante na aposta.',
              'Confundir retorno com lucro potencial.',
              'Ignorar o valor esperado na decisão.',
              'Decidir no impulso durante transmissão ao vivo.',
              'Usar cashout para tentar recuperar perdas anteriores.',
              'Acreditar que a calculadora prevê o resultado do evento.',
              'Não considerar banca e tolerância ao risco antes de decidir.',
              'Comparar cashout oferecido com stake em vez de retorno potencial.',
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm sm:text-base items-start" style={{ color: 'var(--text-2)' }}>
                <span className="shrink-0 mt-1" style={{ color: '#f87171' }}>✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ArticleSection>

        {/* Cashout e jogo responsável */}
        <ArticleSection id="cashout-jogo-responsavel" title="Cashout e jogo responsável">
          <p>
            Cashout pode reduzir exposição em alguns cenários, especialmente quando o cenário mudou e o risco percebido aumentou. No entanto, também pode estimular decisões impulsivas e frequentes que comprometem a banca no longo prazo.
          </p>
          <p>
            Não use cashout para tentar recuperar perdas de apostas anteriores. Defina seus limites antes de apostar. Não aposte com dinheiro essencial para despesas pessoais. Se sentir que perdeu o controle das decisões, busque ajuda.
          </p>
          <p>
            Para orientações sobre uso responsável, acesse a página de{' '}
            <Link to="/jogo-responsavel" className="font-semibold" style={{ color: '#67e8f9' }}>jogo responsável</Link>. Para ferramentas de controle financeiro, use a{' '}
            <Link to="/calculadoras/gestao-banca" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Gestão de Banca</Link> e a{' '}
            <Link to="/calculadoras/unidade-stake" className="font-semibold" style={{ color: '#67e8f9' }}>Calculadora de Unidade / Stake</Link>.
          </p>
        </ArticleSection>

        <ArticleAffiliateBanner postSlug={post.slug} placement="pre-faq" />

        {/* FAQ */}
        <section id="faq" className="mt-12 scroll-mt-28">
          <h2 className="text-3xl font-bold tracking-tight mb-8" style={{ color: 'var(--text-1)' }}>Perguntas frequentes sobre cashout manual e cashout justo</h2>
          <FAQSection items={faqItems} eyebrow="FAQ" />
        </section>

        {/* Conclusão */}
        <ArticleSection id="conclusao" title="Conclusão">
          <p>
            Cashout manual é uma abordagem para comparar a oferta da casa com um valor justo estimado matematicamente. A fórmula usa o retorno potencial multiplicado pela probabilidade atual estimada. Uma oferta abaixo do valor justo pode indicar desconto da casa; uma oferta próxima ou acima avalia o risco de cada usuário.
          </p>
          <p>
            A ferramenta não prevê resultados. A probabilidade é uma estimativa do usuário, não um dado garantido. A responsabilidade e a gestão de banca são essenciais para qualquer decisão de cashout.
          </p>
          <CtaBox
            href="/calculadoras/cashout-justo"
            title="Compare a oferta de cashout com o valor justo estimado"
            desc="Use a Calculadora de Cashout Justo / Manual do CalculaBet para comparar a oferta da casa com uma estimativa matemática antes de tomar uma decisão."
            btnLabel="Abrir calculadora de cashout justo"
          />
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              ['/calculadoras/cashout-justo', 'Calculadora de Cashout Justo'],
              ['/calculadoras/cashout', 'Calculadora de Cashout'],
              ['/calculadoras/value-bet', 'Value Bet / EV'],
              ['/calculadoras/hedge', 'Calculadora de Hedge'],
              ['/calculadoras/gestao-banca', 'Gestão de Banca'],
              ['/calculadoras/unidade-stake', 'Calculadora de Unidade'],
              ['/calculadoras/multipla-parlay', 'Aposta Múltipla'],
              ['/calculadoras/roi', 'ROI em Apostas'],
              ['/blog/cashout-apostas', 'Cashout em Apostas'],
              ['/blog/como-calcular-ev-apostas', 'Como calcular EV'],
              ['/blog/value-bet-o-que-e', 'O que é value bet'],
              ['/jogo-responsavel', 'Jogo responsável'],
              ['/blog', 'Ver todos os artigos'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--text-2)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                {label} →
              </Link>
            ))}
          </div>
        </ArticleSection>

      </article>

      {/* Related posts */}
      {relatedPosts?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-1)' }}>Artigos relacionados</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPosts.map(p => (
              <BlogCard key={p.slug} post={p} category={getCategoryById(p.category)} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
