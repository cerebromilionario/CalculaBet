import { Link } from 'react-router-dom';

export default function ResponsibleGamingNotice({ variant = 'banner' }) {
  if (variant === 'inline') {
    return (
      <div
        className="flex items-center gap-2.5 rounded-xl px-4 py-3"
        style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.10)' }}
      >
        <span
          className="text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0"
          style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}
          aria-label="+18 anos"
        >
          +18
        </span>
        <p className="text-xs" style={{ color: 'var(--text-3)' }}>
          Apostas envolvem risco financeiro. Apenas maiores de 18 anos.{' '}
          <Link to="/jogo-responsavel" className="underline underline-offset-2" style={{ color: 'var(--text-2)' }}>
            Jogo responsável
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <section
      aria-label="Aviso de jogo responsável"
      style={{ background: 'rgba(251,191,36,0.03)', borderTop: '1px solid rgba(251,191,36,0.08)', borderBottom: '1px solid rgba(251,191,36,0.08)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5"
            style={{ background: 'rgba(251,191,36,0.10)', border: '1px solid rgba(251,191,36,0.20)' }}
            aria-hidden="true"
          >
            <svg className="w-6 h-6" style={{ color: '#fbbf24' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#fbbf24' }}>Jogue com Responsabilidade</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>
            Apostas esportivas envolvem risco financeiro real. Defina limites, nunca aposte
            mais do que pode perder e busque ajuda se necessário.
          </p>
          <p className="text-xs mb-6" style={{ color: 'var(--text-3)' }}>
            Proibido para menores de 18 anos. O CalculaBet é uma plataforma educacional de ferramentas —
            não recomendamos nem incentivamos apostas.
          </p>
          <Link to="/jogo-responsavel" className="btn-ghost text-sm">
            Saiba mais sobre jogo responsável
          </Link>
        </div>
      </div>
    </section>
  );
}
