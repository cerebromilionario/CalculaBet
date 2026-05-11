import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-violet-400 transition-colors">Início</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {i === items.length - 1
            ? <span className="text-gray-300">{item.label}</span>
            : <Link to={item.href} className="hover:text-violet-400 transition-colors">{item.label}</Link>}
        </span>
      ))}
    </nav>
  );
}
