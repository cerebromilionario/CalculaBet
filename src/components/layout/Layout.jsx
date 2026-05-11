import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
