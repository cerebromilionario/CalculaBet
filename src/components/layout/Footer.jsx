import { Link } from 'react-router-dom';
import { calculadoras } from '../../data/casas';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      {/* Jogo responsável banner */}
      <div className="bg-amber-950/50 border-b border-amber-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-amber-400 text-sm font-medium">⚠️ Jogue com Responsabilidade — Apostas envolvem risco. Somente maiores de 18 anos.</span>
          <Link to="/jogo-responsavel" className="text-amber-400/80 hover:text-amber-300 text-xs underline whitespace-nowrap">Saiba mais</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-sm">CB</div>
              <span className="font-bold text-lg text-white">CalculaBet</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ferramentas gratuitas para apostadores brasileiros. Calcule odds, arbitragem, gestão de banca e muito mais.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-800 text-xs text-gray-400">+18</span>
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-800 text-xs text-gray-400">Conteúdo de afiliado</span>
            </div>
          </div>

          {/* Calculadoras */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Calculadoras</h3>
            <ul className="space-y-2">
              {calculadoras.slice(0, 6).map(c => (
                <li key={c.slug}>
                  <Link to={`/calculadoras/${c.slug}`} className="text-sm text-gray-400 hover:text-violet-400 transition-colors">
                    {c.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Mais ferramentas</h3>
            <ul className="space-y-2">
              {calculadoras.slice(6).map(c => (
                <li key={c.slug}>
                  <Link to={`/calculadoras/${c.slug}`} className="text-sm text-gray-400 hover:text-violet-400 transition-colors">
                    {c.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Informações</h3>
            <ul className="space-y-2">
              {[
                { to: '/sobre', label: 'Sobre o CalculaBet' },
                { to: '/contato', label: 'Contato' },
                { to: '/privacidade', label: 'Política de Privacidade' },
                { to: '/termos', label: 'Termos de Uso' },
                { to: '/afiliados', label: 'Política de Afiliados' },
                { to: '/jogo-responsavel', label: 'Jogo Responsável' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-gray-400 hover:text-violet-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} CalculaBet. Todos os direitos reservados.</p>
          <p className="text-xs text-gray-600 text-center">
            Este site pode conter links de afiliados. Consulte nossa{' '}
            <Link to="/afiliados" className="underline hover:text-gray-400">política de afiliados</Link>.
            As apostas são proibidas para menores de 18 anos.
          </p>
        </div>
      </div>
    </footer>
  );
}
