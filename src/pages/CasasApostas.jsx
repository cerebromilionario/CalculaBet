import SEOHead from '../components/ui/SEOHead';
import CasaCard from '../components/ui/CasaCard';
import { casas } from '../data/casas';
import AdBanner from '../components/ui/AdBanner';

export default function CasasApostas() {
  return (
    <>
      <SEOHead
        title="Melhores Casas de Apostas para Brasileiros"
        description="Compare as melhores casas de apostas regulamentadas no Brasil com Pix, bônus e boas odds. Escolha com segurança."
        canonical="/casas-apostas"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AdBanner size="leaderboard" />
        <div className="text-center mb-12 mt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Melhores Casas de Apostas para Brasileiros</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Selecionamos casas regulamentadas, com Pix disponível e boa reputação no mercado brasileiro.
            Confira os bônus e escolha a melhor para começar.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs">
            ⚠️ Conteúdo patrocinado | +18 | Jogue com responsabilidade
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {casas.map(c => <CasaCard key={c.id} casa={c} />)}
        </div>
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-4">Como escolher uma casa de apostas no Brasil</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <h3 className="font-semibold text-white mb-2">✅ O que verificar</h3>
              <ul className="space-y-1">
                <li>• Regulamentação pela SPA (Secretaria de Prêmios e Apostas)</li>
                <li>• Disponibilidade de Pix para depósito e saque</li>
                <li>• Odds competitivas nos principais mercados</li>
                <li>• Suporte em português</li>
                <li>• Termos claros do bônus de boas-vindas</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">⚠️ Red flags</h3>
              <ul className="space-y-1">
                <li>• Sites sem licença brasileira</li>
                <li>• Saques muito lentos ou bloqueados</li>
                <li>• Odds significativamente piores que a média</li>
                <li>• Suporte inexistente ou em idioma estrangeiro</li>
                <li>• Bônus com rollover abusivo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
