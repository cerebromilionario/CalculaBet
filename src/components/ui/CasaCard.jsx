export default function CasaCard({ casa }) {
  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: casa.cor }}>
              {casa.nome.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-white text-sm">{casa.nome}</p>
              <div className="flex items-center gap-1">
                {'★'.repeat(Math.floor(casa.avaliacao)).split('').map((s, i) => (
                  <span key={i} className="text-amber-400 text-xs">★</span>
                ))}
                <span className="text-gray-500 text-xs ml-1">{casa.avaliacao}</span>
              </div>
            </div>
          </div>
          {casa.destaque && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-violet-900/50 text-violet-300 border border-violet-700/50">
              {casa.destaque}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 text-right">
          {casa.regulamentada && <span className="text-xs text-emerald-400">✓ Regulamentada</span>}
          {casa.pix && <span className="text-xs text-blue-400">⚡ Pix</span>}
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl px-4 py-3">
        <p className="text-xs text-gray-500 mb-0.5">Bônus</p>
        <p className="text-sm font-semibold text-emerald-400">{casa.bonus}</p>
        <p className="text-xs text-gray-500 mt-0.5">Mín. depósito: {casa.minDeposito}</p>
      </div>
      <a
        href={casa.link}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className="btn-accent justify-center text-sm py-2"
      >
        Abrir conta →
      </a>
      <p className="text-xs text-gray-600 text-center">+18 | Jogue com responsabilidade | Conteúdo patrocinado</p>
    </div>
  );
}
