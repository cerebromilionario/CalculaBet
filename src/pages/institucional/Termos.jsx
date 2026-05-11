import SEOHead from '../../components/ui/SEOHead';

export default function Termos() {
  return (
    <>
      <SEOHead title="Termos de Uso" description="Termos de uso do CalculaBet." canonical="/termos" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Termos de Uso</h1>
        <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
          <p className="text-gray-500">Última atualização: janeiro de 2025</p>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">1. Aceitação dos termos</h2>
            <p>Ao acessar e utilizar o CalculaBet, você concorda com estes Termos de Uso. Se não concordar, não utilize o serviço.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">2. Natureza do serviço</h2>
            <p>O CalculaBet é uma plataforma de ferramentas educacionais e informativas. <strong className="text-gray-300">Não somos uma casa de apostas e não operamos jogos de azar.</strong> Não coletamos apostas nem administramos fundos.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">3. Uso das calculadoras</h2>
            <p>As calculadoras são fornecidas para fins informativos e educacionais. Os resultados são baseados nas informações inseridas pelo usuário. <strong className="text-gray-300">O CalculaBet não se responsabiliza por decisões de apostas tomadas com base nos resultados das calculadoras.</strong></p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">4. Restrição de idade</h2>
            <p>Este site é destinado exclusivamente a maiores de 18 anos. Apostas esportivas são proibidas para menores de idade no Brasil.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">5. Conteúdo de afiliados</h2>
            <p>Parte do conteúdo é patrocinado. Links para casas de apostas podem ser links de afiliados. Consulte nossa Política de Afiliados.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">6. Limitação de responsabilidade</h2>
            <p>O CalculaBet não garante a exatidão, completude ou atualidade das informações apresentadas. As apostas envolvem risco financeiro e o usuário é o único responsável por suas decisões.</p>
          </section>
        </div>
      </div>
    </>
  );
}
