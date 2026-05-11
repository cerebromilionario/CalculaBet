import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { calculadoras } from '../../data/casas';
import Icon from '../ui/Icons';

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(6,6,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="CalculaBet — página inicial">
            <div className="relative w-8 h-8 flex-shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)', color: '#06060a' }}
                aria-hidden="true"
              >
                CB
              </div>
              <div
                className="absolute inset-0 rounded-lg blur-md opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #818cf8)' }}
                aria-hidden="true"
              />
            </div>
            <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text-1)' }}>
              CalculaBet
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
            <div
              className="relative"
              onMouseEnter={() => setCalcOpen(true)}
              onMouseLeave={() => setCalcOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: calcOpen ? 'var(--text-1)' : 'var(--text-2)' }}
                aria-expanded={calcOpen}
                aria-haspopup="true"
              >
                Calculadoras
                <Icon name="chevronDown" className={`w-3.5 h-3.5 transition-transform duration-200 ${calcOpen ? 'rotate-180' : ''}`} />
              </button>

              {calcOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[540px] rounded-2xl p-3 shadow-2xl"
                  style={{
                    background: 'rgba(10,10,18,0.98)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(24px)',
                  }}
                  role="menu"
                >
                  <p className="text-xs font-semibold px-3 pb-2" style={{ color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Ferramentas
                  </p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {calculadoras.map(c => (
                      <Link
                        key={c.slug}
                        to={`/calculadoras/${c.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150"
                        style={{ color: 'var(--text-2)' }}
                        role="menuitem"
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(34,211,238,0.05)';
                          e.currentTarget.style.color = 'var(--text-1)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text-2)';
                        }}
                      >
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(255,255,255,0.04)', color: '#22d3ee' }}
                        >
                          <Icon name={c.icon} className="w-4 h-4" />
                        </span>
                        <p className="text-xs font-medium leading-tight">{c.nome}</p>
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
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={({ isActive }) => ({ color: isActive ? 'var(--text-1)' : 'var(--text-2)' })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/calculadoras/odds" className="btn-primary text-sm">
              Começar grátis
              <Icon name="arrowRight" className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400/50"
            style={{ color: 'var(--text-2)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: 'rgba(6,6,10,0.98)',
            backdropFilter: 'blur(24px)',
            borderColor: 'rgba(255,255,255,0.06)',
            maxHeight: 'calc(100dvh - 64px)',
            overflowY: 'auto',
          }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Menu mobile">
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
                  <span className="w-6 h-6 flex items-center justify-center flex-shrink-0" style={{ color: '#22d3ee' }}>
                    <Icon name={c.icon} className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-medium">{c.nome}</span>
                </Link>
              ))}
            </div>
            <div className="border-t pt-3 mt-3 space-y-0.5" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {[
                { to: '/casas-apostas', label: 'Casas de Apostas' },
                { to: '/sobre', label: 'Sobre' },
                { to: '/contato', label: 'Contato' },
                { to: '/jogo-responsavel', label: 'Jogo Responsável' },
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
            <div className="pt-3 pb-2">
              <Link
                to="/calculadoras/odds"
                className="btn-primary w-full text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Começar grátis
              </Link>
            </div>
            <p className="text-center pb-2" style={{ color: 'var(--text-3)', fontSize: '0.625rem' }}>
              +18 · Apenas para maiores de idade
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
