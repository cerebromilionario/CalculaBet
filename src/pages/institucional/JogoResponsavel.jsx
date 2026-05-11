import SEOHead from '../../components/ui/SEOHead';

const sinais = [
  'Apostar mais do que pode perder',
  'Apostar para recuperar perdas anteriores',
  'Mentir sobre quanto aposta',
  'Neglicenciar obrigações por causa de apostas',
  'Sentir ansiedade ou irritação quando não pode apostar',
  'Pedir dinheiro emprestado para apostar',
  'Não conseguir parar mesmo querendo',
];

const ajuda = [
  { nome: 'Jogadores Anônimos Brasil', link: 'https://www.jogadoresanonimos.com.br', desc: 'Grupos de apoio gratuitos em todo o Brasil' },
  { nome: 'Gambling Therapy', link: 'https://www.gamblingtherapy.org', desc: 'Apoio online gratuito em português' },
  { nome: 'CVV', link: 'https://www.cvv.org.br', desc: 'Centro de Valorização da Vida — crise emocional' },
];

export default function JogoResponsavel() {
  return (
    <>
      <SEOHead title="Jogo Responsável" description="Informações sobre jogo responsável e como apostar com segurança." canonical="/jogo-responsavel" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Jogo Responsável</h1>
          <p className="text-gray-400">Apostas podem ser divertidas, mas envolvem risco real. Conheça seus limites.</p>
        </div>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <div className="bg-amber-950/30 border border-amber-700/40 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-amber-300 mb-3">Regras de ouro</h2>
            <ul className="space-y-2">
              <li>✅ Aposte apenas o que pode perder sem comprometer seu orçamento</li>
              <li>✅ Estabeleça um limite de perdas antes de começar</li>
              <li>✅ Nunca aposte para recuperar perdas ("tilt")</li>
              <li>✅ Faça pausas regulares</li>
              <li>✅ Não aposte sob influência de álcool ou emoções fortes</li>
              <li>✅ Trate como entretenimento, não como fonte de renda</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold text-white mb-3">Sinais de alerta</h2>
            <p className="mb-3">Se você reconhecer algum destes comportamentos, busque ajuda:</p>
            <ul className="space-y-2">
              {sinais.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">⚠️</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold text-white mb-4">Onde buscar ajuda</h2>
            <div className="space-y-3">
              {ajuda.map((a, i) => (
                <a key={i} href={a.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{a.nome}</p>
                    <p className="text-xs text-gray-500">{a.desc}</p>
                  </div>
                  <span className="text-violet-400 text-sm">→</span>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-white font-semibold mb-2">+18 — Apenas maiores de 18 anos</p>
            <p className="text-xs text-gray-500">Apostas esportivas são proibidas para menores de idade no Brasil. Se você conhece alguém menor que está apostando, denuncie às autoridades responsáveis.</p>
          </div>
        </div>
      </div>
    </>
  );
}
