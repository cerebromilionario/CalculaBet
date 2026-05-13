import { useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import CasasApostas from './pages/CasasApostas';
import Ferramentas from './pages/Ferramentas';
import Blog from './pages/blog/Blog';
import BlogPost from './pages/blog/BlogPost';

// Calculadoras
import CalculadoraOdds from './pages/calculadoras/Odds';
import ApostaSimples from './pages/calculadoras/ApostaSimples';
import MultiplaParlay from './pages/calculadoras/MultiplaParlay';
import Arbitragem from './pages/calculadoras/Arbitragem';
import Dutching from './pages/calculadoras/Dutching';
import Cashout from './pages/calculadoras/Cashout';
import Hedge from './pages/calculadoras/Hedge';
import GestaoBanca from './pages/calculadoras/GestaoBanca';
import Martingale from './pages/calculadoras/Martingale';
import ConversorOdds from './pages/calculadoras/ConversorOdds';
import ROI from './pages/calculadoras/ROI';
import SimuladorLucro from './pages/calculadoras/SimuladorLucro';

// Institucional
import Sobre from './pages/institucional/Sobre';
import Contato from './pages/institucional/Contato';
import ContatoSucesso from './pages/institucional/ContatoSucesso';
import Privacidade from './pages/institucional/Privacidade';
import Termos from './pages/institucional/Termos';
import Afiliados from './pages/institucional/Afiliados';
import JogoResponsavel from './pages/institucional/JogoResponsavel';

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
            <Route path="/calculadoras/hedge" element={<Hedge />} />
            <Route path="/calculadoras/gestao-banca" element={<GestaoBanca />} />
            <Route path="/ferramentas/odds" element={<CalculadoraOdds />} />
            <Route path="/ferramentas/arbitragem" element={<Arbitragem />} />
            <Route path="/ferramentas/dutching" element={<Dutching />} />
            <Route path="/ferramentas/hedge" element={<Hedge />} />
            <Route path="/ferramentas/gestao-de-banca" element={<GestaoBanca />} />
            <Route path="/calculadoras/martingale" element={<Martingale />} />
            <Route path="/calculadoras/conversor-odds" element={<ConversorOdds />} />
            <Route path="/calculadoras/roi" element={<ROI />} />
            <Route path="/calculadoras/simulador-lucro" element={<SimuladorLucro />} />
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
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
