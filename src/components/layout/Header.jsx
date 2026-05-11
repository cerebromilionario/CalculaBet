import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { calculadoras } from '../../data/casas';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-sm">CB</div>
            <span className="font-bold text-lg text-white group-hover:text-violet-400 transition-colors">CalculaBet</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <div className="relative" onMouseEnter={() => setCalcOpen(true)} onMouseLeave={() => setCalcOpen(false)}>
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-sm font-medium">
                Calculadoras
                <svg className={`w-4 h-4 transition-transform ${calcOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {calcOpen && (
                <div className="absolute top-full left-0 w-72 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-2 grid grid-cols-1 gap-0.5">
                  {calculadoras.map(c => (
                    <Link
                      key={c.slug}
                      to={`/calculadoras/${c.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={() => setCalcOpen(false)}
                    >
                      <span>{c.icon}</span>
                      <span className="text-sm text-gray-300 hover:text-white">{c.nome}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <NavLink to="/casas-apostas" className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-violet-400' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>
              Casas de Apostas
            </NavLink>
            <NavLink to="/sobre" className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-violet-400' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}>
              Sobre
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/calculadoras/odds" className="btn-primary text-sm py-2 px-4">
              Começar agora
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 space-y-1">
          <p className="text-xs text-gray-500 uppercase font-semibold px-3 mb-2">Calculadoras</p>
          {calculadoras.map(c => (
            <Link
              key={c.slug}
              to={`/calculadoras/${c.slug}`}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <span>{c.icon}</span>
              <span className="text-sm text-gray-300">{c.nome}</span>
            </Link>
          ))}
          <div className="border-t border-gray-800 pt-3 mt-3 space-y-1">
            <Link to="/casas-apostas" className="block px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-gray-800" onClick={() => setMobileOpen(false)}>Casas de Apostas</Link>
            <Link to="/sobre" className="block px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-gray-800" onClick={() => setMobileOpen(false)}>Sobre</Link>
          </div>
        </div>
      )}
    </header>
  );
}
