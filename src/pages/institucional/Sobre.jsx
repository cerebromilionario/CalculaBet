import { Link } from 'react-router-dom';
import SEOHead from '../../components/ui/SEOHead';

export default function Sobre() {
  return (
    <>
      <SEOHead title="Sobre o CalculaBet" description="Conheça a plataforma CalculaBet de ferramentas gratuitas para apostadores brasileiros." canonical="/sobre" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <span className="badge-cyan badge mb-4">Sobre nós</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>Sobre o CalculaBet</h1>
          <p className="text-base" style={{ color: 'var(--text-2)' }}>Ferramentas profissionais para apostadores que levam apostas a sério.</p>
        </div>

        <div className="space-y-8">
          {[
            {
              title: 'Nossa missão',
              content: 'Democratizar o acesso a ferramentas de qualidade para apostadores esportivos brasileiros. Calculadoras de odds, arbitragem, gestão de banca e muito mais — sempre gratuitas, sempre precisas.'
            },
            {
              title: 'Por que o CalculaBet?',
              content: 'Apostadores mais informados tomam melhores decisões. Criamos uma plataforma que combina precisão matemática com uma experiência moderna e acessível, sem necessidade de cadastro ou pagamentos.'
            },
            {
              title: 'Transparência',
              content: 'Mantemos parcerias com casas de apostas e podemos receber comissão através de links de afiliados. Isso é sempre identificado claramente. Nunca recomendamos uma casa apenas pela comissão — avaliamos regulamentação, qualidade e segurança.'
            },
            {
              title: 'Jogo responsável',
              content: 'Levamos isso a sério. Apostas podem ser parte de um entretenimento saudável, mas envolvem risco real. Nunca incentivamos apostas irresponsáveis.'
            },
          ].map((s, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex-shrink-0 w-px" style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.4), transparent)', marginLeft: '2px' }} />
              <div className="pb-2">
                <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--text-1)' }}>{s.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{s.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex gap-3">
          <Link to="/contato" className="btn-primary text-sm">Entrar em contato</Link>
          <Link to="/jogo-responsavel" className="btn-ghost text-sm">Jogo responsável</Link>
        </div>
      </div>
    </>
  );
}
