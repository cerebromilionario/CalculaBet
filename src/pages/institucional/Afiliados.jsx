import SEOHead from '../../components/ui/SEOHead';

export default function Afiliados() {
  return (
    <>
      <SEOHead title="Política de Afiliados" description="Como o CalculaBet trabalha com afiliados de casas de apostas." canonical="/afiliados" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Política de Afiliados</h1>
        <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-4 mb-8 text-sm text-amber-300">
          ⚠️ Transparência: Este site pode conter links de afiliados. Isso significa que podemos receber uma comissão quando você se cadastra em uma casa de apostas através dos nossos links.
        </div>
        <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">Como funciona nossa relação com afiliados</h2>
            <p>O CalculaBet mantém parcerias com casas de apostas regulamentadas. Quando um visitante clica em um link de afiliado e se cadastra na casa parceira, podemos receber uma comissão.</p>
            <p className="mt-2">Essa comissão é o que nos permite manter o site gratuito e sem anúncios invasivos.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Nossos princípios</h2>
            <ul className="space-y-2">
              <li>• Nunca recomendamos uma casa apenas pela comissão mais alta</li>
              <li>• Avaliamos regulamentação, odds, métodos de pagamento e reputação</li>
              <li>• Identificamos claramente todo conteúdo patrocinado</li>
              <li>• Não escondemos que somos afiliados</li>
              <li>• Removemos parceiros que se tornarem problemáticos para os usuários</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Identificação de conteúdo patrocinado</h2>
            <p>Conteúdo patrocinado é identificado com as etiquetas <strong className="text-gray-300">"Conteúdo patrocinado"</strong>, <strong className="text-gray-300">"Parceiro"</strong> ou <strong className="text-gray-300">"Publicidade"</strong>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Independência editorial</h2>
            <p>Nossas calculadoras e conteúdo educacional são independentes de qualquer parceria comercial. Não modificamos resultados de calculadoras em favor de casas parceiras.</p>
          </section>
        </div>
      </div>
    </>
  );
}
