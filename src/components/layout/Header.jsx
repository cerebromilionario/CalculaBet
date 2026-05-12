import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { calculadoras } from '../../data/casas';
import Icon from '../ui/Icons';

/* ─── Mega menu groups ─── */
const MEGA_GROUPS = [
  {
    label: 'Odds & Apostas',
    color: '#22d3ee',
    slugs: ['odds', 'aposta-simples', 'multipla-parlay'],
  },
  {
    label: 'Arbitragem & Lucro',
    color: '#4ade80',
    slugs: ['arbitragem', 'dutching', 'cashout', 'hedge'],
  },
  {
    label: 'Gestão & Estratégia',
    color: '#818cf8',
    slugs: ['gestao-banca', 'martingale'],
  },
  {
    label: 'Análise & Conversão',
    color: '#fbbf24',
    slugs: ['roi', 'simulador-lucro', 'conversor-odds'],
  },
];

/* ─── Sobre dropdown links ─── */
const SOBRE_LINKS = [
  { to: '/sobre',            label: 'Sobre o CalculaBet' },
  { to: '/jogo-responsavel', label: 'Jogo Responsável' },
  { to: '/contato',          label: 'Contato' },
  null,
  { to: '/politica-de-privacidade',      label: 'Privacidade' },
  { to: '/termos-de-uso',           label: 'Termos de Uso' },
  { to: '/politica-de-afiliados',        label: 'Política de Afiliados' },
];

/* ─── Chevron icon ─── */
function Chevron({ open }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ─── Arrow right icon ─── */
function ArrowRight({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Header() {
  const [mobileOpen,            setMobileOpen]            = useState(false);
  const [ferramentasOpen,       setFerramentasOpen]       = useState(false);
  const [sobreOpen,             setSobreOpen]             = useState(false);
  const [mobileToolsOpen,       setMobileToolsOpen]       = useState(false);
  const [scrolled,              setScrolled]              = useState(false);
  const { pathname } = useLocation();

  /* Close everything on route change */
  useEffect(() => {
    const id = window.setTimeout(() => {
      setMobileOpen(false);
      setMobileToolsOpen(false);
    }, 0);

    return () => window.clearTimeout(id);
  }, [pathname]);

  /* Scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Escape key closes all */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'Escape') {
        setFerramentasOpen(false);
        setSobreOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, []);

  return (
    <>
      {/* ── Main header bar ── */}
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
            <Link
              to="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              aria-label="CalculaBet — página inicial"
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)', color: '#06060a' }}
                  aria-hidden="true"
                >
                  CB
                </div>
                <div
                  className="absolute inset-0 rounded-lg blur-md opacity-25 group-hover:opacity-50 transition-opacity pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, #22d3ee, #818cf8)' }}
                  aria-hidden="true"
                />
              </div>
              <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text-1)' }}>
                CalculaBet
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-0.5" aria-label="Navegação principal">

              {/* Início */}
              <NavLink
                to="/"
                end
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                style={({ isActive }) => ({ color: isActive ? 'var(--text-1)' : 'var(--text-2)' })}
              >
                Início
              </NavLink>

              {/* Ferramentas — NavLink + mega menu on hover */}
              <div
                className="relative"
                onMouseEnter={() => setFerramentasOpen(true)}
                onMouseLeave={() => setFerramentasOpen(false)}
              >
                <NavLink
                  to="/ferramentas"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={({ isActive }) => ({
                    color: ferramentasOpen || isActive ? 'var(--text-1)' : 'var(--text-2)',
                  })}
                  aria-expanded={ferramentasOpen}
                  aria-haspopup="true"
                >
                  Ferramentas
                  <Chevron open={ferramentasOpen} />
                </NavLink>

                {/* Mega menu */}
                <div
                  aria-label="Menu de ferramentas"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    paddingTop: '8px',
                    width: '640px',
                    opacity: ferramentasOpen ? 1 : 0,
                    pointerEvents: ferramentasOpen ? 'auto' : 'none',
                    transform: `translateX(-50%) translateY(${ferramentasOpen ? '0px' : '-6px'})`,
                    transition: 'opacity 0.18s ease, transform 0.18s ease',
                  }}
                >
                  <div
                    className="rounded-2xl p-5 shadow-2xl"
                    style={{
                      background: 'rgba(9,9,16,0.99)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(24px)',
                    }}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {MEGA_GROUPS.map(group => {
                        const tools = calculadoras.filter(c => group.slugs.includes(c.slug));
                        return (
                          <div key={group.label}>
                            <p
                              className="text-xs font-semibold mb-2.5 px-2"
                              style={{
                                color: group.color,
                                letterSpacing: '0.07em',
                                textTransform: 'uppercase',
                              }}
                            >
                              {group.label}
                            </p>
                            <div className="space-y-0.5">
                              {tools.map(t => (
                                <Link
                                  key={t.slug}
                                  to={`/calculadoras/${t.slug}`}
                                  className="flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-150"
                                  style={{ color: 'var(--text-2)' }}
                                  onMouseEnter={e => {
                                    e.currentTarget.style.background = `${group.color}10`;
                                    e.currentTarget.style.color = 'var(--text-1)';
                                  }}
                                  onMouseLeave={e => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-2)';
                                  }}
                                >
                                  <span
                                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${group.color}18`, color: group.color }}
                                    aria-hidden="true"
                                  >
                                    <Icon name={t.icon} className="w-3.5 h-3.5" />
                                  </span>
                                  <span className="text-xs font-medium">{t.nome}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer row */}
                    <div
                      className="flex items-center justify-between mt-5 pt-4"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                        12 ferramentas gratuitas · sem cadastro
                      </p>
                      <Link
                        to="/ferramentas"
                        className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-150"
                        style={{ color: '#22d3ee' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#67e8f9'}
                        onMouseLeave={e => e.currentTarget.style.color = '#22d3ee'}
                      >
                        Ver todas as ferramentas
                        <ArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Casas */}
              <NavLink
                to="/casas-apostas"
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                style={({ isActive }) => ({ color: isActive ? 'var(--text-1)' : 'var(--text-2)' })}
              >
                Casas
              </NavLink>

              {/* Sobre dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSobreOpen(true)}
                onMouseLeave={() => setSobreOpen(false)}
              >
                <button
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={{ color: sobreOpen ? 'var(--text-1)' : 'var(--text-2)' }}
                  aria-expanded={sobreOpen}
                  aria-haspopup="true"
                >
                  Sobre
                  <Chevron open={sobreOpen} />
                </button>

                <div
                  aria-label="Menu sobre"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    paddingTop: '8px',
                    minWidth: '200px',
                    opacity: sobreOpen ? 1 : 0,
                    pointerEvents: sobreOpen ? 'auto' : 'none',
                    transform: `translateY(${sobreOpen ? '0px' : '-6px'})`,
                    transition: 'opacity 0.18s ease, transform 0.18s ease',
                  }}
                >
                  <div
                    className="rounded-xl py-1.5 shadow-2xl"
                    style={{
                      background: 'rgba(9,9,16,0.99)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(24px)',
                    }}
                    role="menu"
                  >
                    {SOBRE_LINKS.map((item, i) =>
                      item === null ? (
                        <div
                          key={`sep-${i}`}
                          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '4px 0' }}
                          role="separator"
                        />
                      ) : (
                        <Link
                          key={item.to}
                          to={item.to}
                          role="menuitem"
                          className="block px-4 py-2 text-xs font-medium transition-all duration-150"
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
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <Link to="/calculadoras/odds" className="btn-primary text-sm">
                Calcular agora
                <ArrowRight />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              style={{ color: mobileOpen ? 'var(--text-1)' : 'var(--text-2)' }}
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className="md:hidden fixed inset-0 z-40"
        style={{
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-menu"
        className="md:hidden fixed top-0 right-0 bottom-0 z-50 flex flex-col"
        style={{
          width: 'clamp(280px, 85vw, 320px)',
          background: 'rgba(8,8,14,0.99)',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        aria-hidden={!mobileOpen}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Link
            to="/"
            className="flex items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
            aria-label="CalculaBet — página inicial"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)', color: '#06060a' }}
              aria-hidden="true"
            >
              CB
            </div>
            <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--text-1)' }}>
              CalculaBet
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--text-3)' }}
            aria-label="Fechar menu"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer body — scrollable */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5" aria-label="Menu mobile">

          {/* Início */}
          <NavLink
            to="/"
            end
            onClick={() => setMobileOpen(false)}
            className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={({ isActive }) => ({
              background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
              color: isActive ? '#22d3ee' : 'var(--text-2)',
            })}
          >
            Início
          </NavLink>

          {/* Ferramentas expandable */}
          <div>
            <div className="flex items-center gap-1">
              <NavLink
                to="/ferramentas"
                onClick={() => setMobileOpen(false)}
                className="flex-1 flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={({ isActive }) => ({
                  background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
                  color: isActive ? '#22d3ee' : 'var(--text-2)',
                })}
              >
                Ferramentas
              </NavLink>
              <button
                onClick={() => setMobileToolsOpen(v => !v)}
                className="p-2 rounded-lg flex-shrink-0 transition-colors duration-150"
                style={{ color: mobileToolsOpen ? '#22d3ee' : 'var(--text-3)' }}
                aria-label={mobileToolsOpen ? 'Recolher ferramentas' : 'Expandir ferramentas'}
                aria-expanded={mobileToolsOpen}
              >
                <Chevron open={mobileToolsOpen} />
              </button>
            </div>

            {mobileToolsOpen && (
              <div
                className="mt-1 ml-4 pl-3 space-y-3 py-2"
                style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}
              >
                {MEGA_GROUPS.map(group => (
                  <div key={group.label}>
                    <p
                      className="text-xs font-semibold px-2 pb-1.5"
                      style={{ color: group.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                    >
                      {group.label}
                    </p>
                    {calculadoras
                      .filter(c => group.slugs.includes(c.slug))
                      .map(t => (
                        <Link
                          key={t.slug}
                          to={`/calculadoras/${t.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150"
                          style={{ color: 'var(--text-2)' }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
                        >
                          <span
                            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                            style={{ color: group.color }}
                            aria-hidden="true"
                          >
                            <Icon name={t.icon} className="w-3.5 h-3.5" />
                          </span>
                          {t.nome}
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Casas */}
          <NavLink
            to="/casas-apostas"
            onClick={() => setMobileOpen(false)}
            className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
            style={({ isActive }) => ({
              background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
              color: isActive ? '#22d3ee' : 'var(--text-2)',
            })}
          >
            Casas
          </NavLink>

          {/* Sobre section */}
          <div
            className="pt-3 mt-2 space-y-0.5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <p
              className="px-3 pb-1 text-xs font-semibold"
              style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              Sobre
            </p>
            {SOBRE_LINKS.filter(Boolean).map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Drawer footer */}
        <div
          className="flex-shrink-0 px-4 py-5 space-y-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Link
            to="/calculadoras/odds"
            onClick={() => setMobileOpen(false)}
            className="btn-primary w-full text-sm"
          >
            Calcular agora
            <ArrowRight />
          </Link>
          <p className="text-center text-xs" style={{ color: 'var(--text-3)' }}>
            +18 · 100% gratuito · sem cadastro
          </p>
        </div>
      </div>
    </>
  );
}
