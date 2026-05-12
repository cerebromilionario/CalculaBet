import { Link } from 'react-router-dom';

export default function AffiliateDisclosure({ compact = false }) {
  if (compact) {
    return (
      <p className="text-xs" style={{ color: 'var(--text-3)' }}>
        <span
          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium mr-1"
          style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)', color: '#fbbf24' }}
        >
          Patrocinado
        </span>
        Este site contém links de afiliados. Leia nossa{' '}
        <Link
          to="/politica-de-afiliados"
          className="underline underline-offset-2"
          style={{ color: 'var(--text-2)' }}
        >
          política de afiliados
        </Link>
        .
      </p>
    );
  }

  return (
    <div
      className="flex items-start gap-3 rounded-xl px-4 py-3"
      style={{ background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.10)' }}
    >
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#fbbf24' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
        <strong style={{ color: 'var(--text-2)' }}>Aviso de publicidade:</strong>{' '}
        Este site pode receber comissão por cliques ou cadastros via links de parceiros.
        Isso não afeta nossa análise. Verifique sempre licença, termos e disponibilidade na sua região antes de se cadastrar.{' '}
        <Link to="/politica-de-afiliados" className="underline underline-offset-2 hover:opacity-80" style={{ color: 'var(--text-2)' }}>
          Política de afiliados
        </Link>
        .
      </p>
    </div>
  );
}
