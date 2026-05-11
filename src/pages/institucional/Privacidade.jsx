import SEOHead from '../../components/ui/SEOHead';

export default function Privacidade() {
  return (
    <>
      <SEOHead title="Política de Privacidade" description="Política de privacidade do CalculaBet. Saiba como tratamos seus dados." canonical="/privacidade" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Política de Privacidade</h1>
        <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
          <p className="text-gray-500">Última atualização: janeiro de 2025</p>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Dados coletados</h2>
            <p>O CalculaBet coleta apenas dados estritamente necessários para o funcionamento do site. As calculadoras funcionam inteiramente no seu navegador e <strong className="text-gray-300">nenhum dado de aposta é armazenado nos nossos servidores</strong>.</p>
            <p className="mt-2">Podemos coletar: endereço IP, tipo de navegador e páginas visitadas através de ferramentas de análise (ex: Google Analytics) com finalidade estatística.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Cookies</h2>
            <p>Utilizamos cookies para melhorar a experiência de navegação e para fins analíticos. Você pode desabilitar cookies nas configurações do seu navegador.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Links de afiliados</h2>
            <p>Este site contém links para casas de apostas parceiras. Quando você clica em um link de afiliado, a casa parceira pode usar cookies para rastrear que a visita veio do CalculaBet.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Formulário de contato</h2>
            <p>Os dados fornecidos no formulário de contato (nome e e-mail) são usados exclusivamente para responder à sua mensagem.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. LGPD</h2>
            <p>Respeitamos a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018). Para solicitar acesso, correção ou exclusão de seus dados, entre em contato conosco.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Contato</h2>
            <p>Dúvidas sobre esta política? Entre em contato pela nossa <a href="/contato" className="text-violet-400 hover:underline">página de contato</a>.</p>
          </section>
        </div>
      </div>
    </>
  );
}
