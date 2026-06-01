import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
const CasasApostas = lazy(() => import('./pages/CasasApostas'));
const Ferramentas = lazy(() => import('./pages/Ferramentas'));
const Blog = lazy(() => import('./pages/blog/Blog'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));

// Calculadoras
const CalculadoraOdds = lazy(() => import('./pages/calculadoras/Odds'));
const ApostaSimples = lazy(() => import('./pages/calculadoras/ApostaSimples'));
const MultiplaParlay = lazy(() => import('./pages/calculadoras/MultiplaParlay'));
const Arbitragem = lazy(() => import('./pages/calculadoras/Arbitragem'));
const Dutching = lazy(() => import('./pages/calculadoras/Dutching'));
const Cashout = lazy(() => import('./pages/calculadoras/Cashout'));
const CashoutJusto = lazy(() => import('./pages/calculadoras/CashoutJusto'));
const Hedge = lazy(() => import('./pages/calculadoras/Hedge'));
const GestaoBanca = lazy(() => import('./pages/calculadoras/GestaoBanca'));
const Martingale = lazy(() => import('./pages/calculadoras/Martingale'));
const ConversorOdds = lazy(() => import('./pages/calculadoras/ConversorOdds'));
const ROI = lazy(() => import('./pages/calculadoras/ROI'));
const SimuladorLucro = lazy(() => import('./pages/calculadoras/SimuladorLucro'));
const Overround = lazy(() => import('./pages/calculadoras/Overround'));
const ValueBet = lazy(() => import('./pages/calculadoras/ValueBet'));
const OddsJustas = lazy(() => import('./pages/calculadoras/OddsJustas'));
const UnidadeStake = lazy(() => import('./pages/calculadoras/UnidadeStake'));
const RolloverBonus = lazy(() => import('./pages/calculadoras/RolloverBonus'));

// Institucional
const Sobre = lazy(() => import('./pages/institucional/Sobre'));
const Contato = lazy(() => import('./pages/institucional/Contato'));
const ContatoSucesso = lazy(() => import('./pages/institucional/ContatoSucesso'));
const Privacidade = lazy(() => import('./pages/institucional/Privacidade'));
const Termos = lazy(() => import('./pages/institucional/Termos'));
const Afiliados = lazy(() => import('./pages/institucional/Afiliados'));
const JogoResponsavel = lazy(() => import('./pages/institucional/JogoResponsavel'));

function RouteFallback() {
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      role="status"
      aria-live="polite"
      style={{ color: 'var(--text-2)' }}
    >
      Carregando...
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-4">🎯</p>
      <h1 className="text-3xl font-bold text-white mb-4">Página não encontrada</h1>
      <p className="text-gray-400 mb-8">Esta aposta não existe. Tente uma das nossas calculadoras.</p>
      <a href="/" className="btn-primary">Voltar ao início</a>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/casas-apostas" element={<CasasApostas />} />
            <Route path="/ferramentas" element={<Ferramentas />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/calculadoras/odds" element={<CalculadoraOdds />} />
            <Route path="/calculadoras/aposta-simples" element={<ApostaSimples />} />
            <Route path="/calculadoras/multipla-parlay" element={<MultiplaParlay />} />
            <Route path="/calculadoras/arbitragem" element={<Arbitragem />} />
            <Route path="/calculadoras/dutching" element={<Dutching />} />
            <Route path="/calculadoras/cashout" element={<Cashout />} />
            <Route path="/calculadoras/cashout-justo" element={<CashoutJusto />} />
            <Route path="/calculadoras/hedge" element={<Hedge />} />
            <Route path="/calculadoras/gestao-banca" element={<GestaoBanca />} />
            <Route path="/ferramentas/odds" element={<CalculadoraOdds />} />
            <Route path="/ferramentas/conversor" element={<ConversorOdds />} />
            <Route path="/ferramentas/multipla" element={<MultiplaParlay />} />
            <Route path="/ferramentas/roi" element={<ROI />} />
            <Route path="/ferramentas/arbitragem" element={<Arbitragem />} />
            <Route path="/ferramentas/dutching" element={<Dutching />} />
            <Route path="/ferramentas/cashout" element={<Cashout />} />
            <Route path="/ferramentas/hedge" element={<Hedge />} />
            <Route path="/ferramentas/gestao-de-banca" element={<GestaoBanca />} />
            <Route path="/ferramentas/martingale" element={<Martingale />} />
            <Route path="/ferramentas/simulador" element={<SimuladorLucro />} />
            <Route path="/calculadoras/martingale" element={<Martingale />} />
            <Route path="/calculadoras/conversor-odds" element={<ConversorOdds />} />
            <Route path="/calculadoras/roi" element={<ROI />} />
            <Route path="/calculadoras/simulador-lucro" element={<SimuladorLucro />} />
            <Route path="/calculadoras/overround" element={<Overround />} />
            <Route path="/calculadoras/value-bet" element={<ValueBet />} />
            <Route path="/calculadoras/odds-justas" element={<OddsJustas />} />
            <Route path="/calculadoras/unidade-stake" element={<UnidadeStake />} />
            <Route path="/calculadoras/rollover-bonus" element={<RolloverBonus />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/contato/sucesso" element={<ContatoSucesso />} />
            <Route path="/politica-de-privacidade" element={<Privacidade />} />
            <Route path="/privacidade" element={<Navigate to="/politica-de-privacidade" replace />} />
            <Route path="/termos-de-uso" element={<Termos />} />
            <Route path="/termos" element={<Navigate to="/termos-de-uso" replace />} />
            <Route path="/politica-de-afiliados" element={<Afiliados />} />
            <Route path="/afiliados" element={<Navigate to="/politica-de-afiliados" replace />} />
            <Route path="/jogo-responsavel" element={<JogoResponsavel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
