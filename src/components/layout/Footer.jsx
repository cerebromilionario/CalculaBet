import { Link } from 'react-router-dom';
import { calculadoras } from '../../data/casas';

const footerLinks = {
  Ferramentas: calculadoras.slice(0, 6).map(c => ({ label: c.nome, to: `/calculadoras/${c.slug}` })),
  'Mais ferramentas': calculadoras.slice(6).map(c => ({ label: c.nome, to: `/calculadoras/${c.slug}` })),
  Plataforma: [
    { label: 'Casas de Apostas', to: '/casas-apostas' },
    { label: 'Sobre o CalculaBet', to: '/sobre' },
    { label: 'Contato', to: '/contato' },
  ],
  Legal: [
    { label: 'Política de Privacidade', to: '/politica-de-privacidade' },
    { label: 'Termos de Uso', to: '/termos-de-uso' },
    { label: 'Política de Afiliados', to: '/politica-de-afiliados' },
    { label: 'Jogo Responsável', to: '/jogo-responsavel' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>

      {/* Responsible gambling strip */}
      <div
        role="note"
        aria-label="Aviso de jogo responsável"
        style={{ background: 'rgba(251,191,36,0.04)', borderBottom: '1px solid rgba(251,191,36,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
              style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.25)', color: '#fbbf24' }}
              aria-label="Conteúdo para maiores de 18 anos"
            >
              +18
            </span>
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>
              Apostas envolvem risco financeiro. Jogue com responsabilidade. Apenas maiores de 18 anos.
            </span>
          </div>
          <Link
            to="/jogo-responsavel"
            className="text-xs font-medium flex-shrink-0 transition-colors hover:opacity-80"
            style={{ color: 'rgba(251,191,36,0.65)' }}
          >
            Saiba mais →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">

          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group" aria-label="CalculaBet — página inicial">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #818cf8)', color: '#06060a' }}
                aria-hidden="true"
              >
                CB
              </div>
              <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text-1)' }}>
                CalculaBet
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)', maxWidth: '240px' }}>
              Ferramentas profissionais gratuitas para apostadores brasileiros.
              Calcule, analise e decida com inteligência.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge text-xs">+18</span>
              <span
                className="badge text-xs"
                style={{ color: '#fbbf24', background: 'rgba(251,191,36,0.06)', borderColor: 'rgba(251,191,36,0.15)' }}
              >
                Afiliado
              </span>
              <span className="badge text-xs">100% Gratuito</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)', maxWidth: '220px' }}>
              Este site pode receber comissão por cliques em links de parceiros. Verifique sempre licença e termos das casas.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-semibold mb-4" style={{ color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {title}
              </p>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-xs transition-colors hover:text-[var(--text-1)]"
                      style={{ color: 'var(--text-2)' }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} CalculaBet. Todos os direitos reservados.
            Plataforma educacional — não incentivamos apostas.
          </p>
          <p className="text-xs text-center" style={{ color: 'var(--text-3)' }}>
            Links de afiliados —{' '}
            <Link to="/politica-de-afiliados" className="underline underline-offset-2 hover:opacity-80">
              Política de afiliados
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
