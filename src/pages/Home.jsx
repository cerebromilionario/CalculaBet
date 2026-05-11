import { Link } from 'react-router-dom';
import { calculadoras, casas } from '../data/casas';
import SEOHead from '../components/ui/SEOHead';
import CasaCard from '../components/ui/CasaCard';
import AdBanner from '../components/ui/AdBanner';
import FAQSection from '../components/ui/FAQSection';

const faqs = [
  { q: 'O CalculaBet é gratuito?', a: 'Sim, todas as calculadoras são completamente gratuitas. Nos mantemos através de parcerias com casas de apostas regulamentadas.' },
  { q: 'Preciso me cadastrar para usar as calculadoras?', a: 'Não. Todas as ferramentas funcionam direto no seu navegador, sem necessidade de cadastro ou login.' },
  { q: 'As calculadoras funcionam no celular?', a: 'Sim, o CalculaBet foi desenvolvido para funcionar perfeitamente em dispositivos móveis.' },
  { q: 'O que é uma odd decimal?', a: 'Odd decimal representa o retorno total por unidade apostada. Uma odd de 2.50 significa que você recebe R$2,50 para cada R$1,00 apostado.' },
  { q: 'O que é arbitragem em apostas?', a: 'Arbitragem ocorre quando as odds de diferentes casas permitem apostar em todos os resultados e garantir lucro independentemente do resultado.' },
  { q: 'O CalculaBet recomenda que eu aposte?', a: 'Não. O CalculaBet é uma plataforma educacional e de ferramentas. Apostas envolvem risco e são recomendadas apenas para maiores de 18 anos com responsabilidade.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const passos = [
  { n: '1', titulo: 'Escolha a ferramenta', desc: 'Selecione a calculadora adequada para sua necessidade — odds, arbitragem, gestão de banca e mais.' },
  { n: '2', titulo: 'Insira os dados', desc: 'Preencha stake, odds e demais parâmetros. Os cálculos acontecem em tempo real.' },
  { n: '3', titulo: 'Analise os resultados', desc: 'Veja retorno, lucro, ROI e outras métricas para tomar decisões mais informadas.' },
  { n: '4', titulo: 'Aposte com responsabilidade', desc: 'Use os resultados como referência. Nunca aposte mais do que pode perder.' },
];

export default function Home() {
  return (
    <>
      <SEOHead
        title="CalculaBet – Calculadoras gratuitas para apostas esportivas"
        description="Ferramentas gratuitas para apostadores: calculadoras de odds, arbitragem, dutching, cashout, gestão de banca e muito mais. Para apostadores brasileiros."
        canonical="/"
        schema={schema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-900/40 border border-violet-700/50 text-violet-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% gratuito • Sem cadastro
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Ferramentas gratuitas para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400">
                calcular apostas
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
              Calculadoras de odds, arbitragem, dutching, cashout, gestão de banca e muito mais.
              Feito para apostadores brasileiros, focado em transparência e educação.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/calculadoras/odds" className="btn-primary text-base px-8 py-4">
                🎯 Começar agora — é grátis
              </Link>
              <Link to="/casas-apostas" className="btn-secondary text-base px-8 py-4">
                Comparar casas de apostas
              </Link>
            </div>
            <p className="text-xs text-gray-600 mt-4">+18 | Jogue com responsabilidade | Apostas envolvem risco financeiro</p>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner size="leaderboard" />
      </div>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Calculadoras gratuitas</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Todas as ferramentas que você precisa para apostar com mais inteligência. Sem cadastro, sem taxas, sem complicação.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {calculadoras.map(c => (
            <Link
              key={c.slug}
              to={`/calculadoras/${c.slug}`}
              className="card group hover:border-violet-600/60 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors mb-2">{c.nome}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              <div className="mt-4 flex items-center text-violet-400 text-sm font-medium">
                Acessar →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="bg-gray-900/50 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Como usar as calculadoras</h2>
            <p className="text-gray-400">Simples, rápido e sem necessidade de cadastro.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {passos.map(p => (
              <div key={p.n} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-violet-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{p.n}</div>
                <h3 className="font-semibold text-white mb-2">{p.titulo}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casas parceiras */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title mb-2">Melhores casas para começar</h2>
            <p className="text-gray-400 text-sm">Casas regulamentadas com Pix, bons bônus e boa reputação.</p>
          </div>
          <span className="text-xs text-gray-600 border border-gray-700 rounded-lg px-2 py-1">Conteúdo patrocinado</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {casas.map(c => <CasaCard key={c.id} casa={c} />)}
        </div>
        <p className="text-xs text-gray-600 mt-4 text-center">
          Os links acima podem conter referências de afiliados. Consulte nossa{' '}
          <Link to="/afiliados" className="underline hover:text-gray-400">política de afiliados</Link>.
          Apenas para maiores de 18 anos.
        </p>
      </section>

      {/* Responsible gambling banner */}
      <section className="bg-amber-950/30 border-y border-amber-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h2 className="text-lg font-bold text-amber-300 mb-2">⚠️ Jogue com Responsabilidade</h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Apostas esportivas envolvem risco financeiro real. Nunca aposte mais do que pode perder.
            Se sentir que está perdendo o controle, procure ajuda.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <Link to="/jogo-responsavel" className="btn-secondary text-sm py-2">Saiba mais sobre jogo responsável</Link>
            <a href="https://www.gamblingtherapy.org" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-400 hover:underline self-center">Gambling Therapy →</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FAQSection items={faqs} />
      </section>
    </>
  );
}
