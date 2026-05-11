import SEOHead from '../../components/ui/SEOHead';
import { Link } from 'react-router-dom';

export default function Sobre() {
  return (
    <>
      <SEOHead title="Sobre o CalculaBet" description="Conheça o CalculaBet, plataforma de ferramentas gratuitas para apostadores brasileiros." canonical="/sobre" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Sobre o CalculaBet</h1>
        <div className="prose-custom space-y-6 text-gray-400 leading-relaxed">
          <p>O <strong className="text-white">CalculaBet</strong> é uma plataforma brasileira de ferramentas gratuitas para apostadores esportivos. Nascemos com um objetivo simples: democratizar o acesso a calculadoras de qualidade, explicações claras e informações transparentes sobre apostas esportivas.</p>
          <h2 className="text-xl font-bold text-white">Nossa missão</h2>
          <p>Acreditamos que apostadores mais informados tomam melhores decisões. Por isso, oferecemos calculadoras de odds, arbitragem, gestão de banca, cashout e muito mais, sempre de graça e sem necessidade de cadastro.</p>
          <h2 className="text-xl font-bold text-white">Transparência como princípio</h2>
          <p>O CalculaBet mantém parcerias com casas de apostas e pode receber comissão quando você se cadastra por nossos links. Isso é claramente indicado em todo conteúdo patrocinado. Nunca recomendamos uma casa por comissão mais alta — apenas por qualidade, segurança e relevância para o apostador brasileiro.</p>
          <h2 className="text-xl font-bold text-white">Jogo responsável</h2>
          <p>Levamos jogo responsável a sério. Apostas podem ser divertidas e até lucrativas, mas envolvem risco real. Nunca incentivamos apostas irresponsáveis. Leia nossa página de <Link to="/jogo-responsavel" className="text-violet-400 hover:underline">jogo responsável</Link>.</p>
          <h2 className="text-xl font-bold text-white">Contato</h2>
          <p>Dúvidas, sugestões ou parcerias? Acesse nossa página de <Link to="/contato" className="text-violet-400 hover:underline">contato</Link>.</p>
        </div>
      </div>
    </>
  );
}
