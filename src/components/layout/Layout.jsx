import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdBanner300x250 from '../ads/AdBanner300x250';

// Institutional pages that should not show ads
const INSTITUTIONAL = [
  '/sobre',
  '/contato',
  '/privacidade',
  '/termos',
  '/afiliados',
  '/jogo-responsavel',
];

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const showAds = !INSTITUTIONAL.some(p => pathname === p || pathname.startsWith(p + '/'));

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      {showAds && (
        <div
          aria-label="Área de publicidade"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          {/* 300×250 display banner — centered */}
          <div className="flex justify-center px-4 py-8">
            <AdBanner300x250 />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
