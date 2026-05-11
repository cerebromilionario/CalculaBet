import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-1.5 mb-8" aria-label="Breadcrumb">
      <Link
        to="/"
        className="text-xs font-medium transition-colors"
        style={{ color: 'var(--text-3)' }}
        onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
        onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
      >
        Início
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <svg className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--text-3)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {i === items.length - 1
            ? <span className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>{item.label}</span>
            : <Link
                to={item.href}
                className="text-xs font-medium transition-colors"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-2)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
              >
                {item.label}
              </Link>
          }
        </span>
      ))}
    </nav>
  );
}
