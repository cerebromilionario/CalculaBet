import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { calculadoras } from '../../data/casas';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setCalcOpen(false);
  }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(6,6,10,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-8 h-8 flex-shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)',
                  color: '#06060a',
                }}
              >
                CB
              </div>
              <div
                className="absolute inset-0 rounded-lg blur-md opacity-40 group-hover:opacity-70 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #818cf8)' }}
              />
            </div>
            <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text-1)' }}>
              CalculaBet
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Calculadoras dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCalcOpen(true)}
              onMouseLeave={() => setCalcOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: calcOpen ? 'var(--text-1)' : 'var(--text-2)' }}
              >
                Calculadoras
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200"
                  style={{ transform: calcOpen ? 'rotate(180deg)' : 'none' }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {calcOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[520px] rounded-2xl p-3 shadow-2xl"
                  style={{
                    background: 'rgba(11,11,18,0.98)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    {calculadoras.map(c => (
                      <Link
                        key={c.slug}
                        to={`/calculadoras/${c.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group"
                        style={{ color: 'var(--text-2)' }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                          e.currentTarget.style.color = 'var(--text-1)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text-2)';
                        }}
                      >
                        <span className="text-base flex-shrink-0 w-6 text-center">{c.icon}</span>
                        <div>
                          <p className="text-xs font-medium leading-tight">{c.nome}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {[
              { to: '/casas-apostas', label: 'Casas' },
              { to: '/sobre', label: 'Sobre' },
            ].map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors`
                }
                style={({ isActive }) => ({
                  color: isActive ? 'var(--text-1)' : 'var(--text-2)',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/calculadoras/odds" className="btn-primary text-sm">
              Começar grátis
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl transition-colors"
            style={{ color: 'var(--text-2)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen
              ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: 'rgba(6,6,10,0.98)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <p className="text-xs font-semibold px-3 py-2" style={{ color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Calculadoras
            </p>
            <div className="grid grid-cols-2 gap-0.5">
              {calculadoras.map(c => (
                <Link
                  key={c.slug}
                  to={`/calculadoras/${c.slug}`}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors"
                  style={{ color: 'var(--text-2)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-sm">{c.icon}</span>
                  <span className="text-xs font-medium">{c.nome}</span>
                </Link>
              ))}
            </div>
            <div className="border-t pt-3 mt-3 space-y-0.5" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {[
                { to: '/casas-apostas', label: 'Casas de Apostas' },
                { to: '/sobre', label: 'Sobre' },
                { to: '/contato', label: 'Contato' },
              ].map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ color: 'var(--text-2)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="pt-3 pb-1">
              <Link to="/calculadoras/odds" className="btn-primary w-full text-sm" onClick={() => setMobileOpen(false)}>
                Começar grátis
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
