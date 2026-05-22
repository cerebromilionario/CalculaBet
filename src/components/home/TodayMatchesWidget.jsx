import { Link } from 'react-router-dom';
import { mockLiveScores } from '../../data/mockLiveScores';

const statusConfig = {
  scheduled: { label: 'Não iniciado', color: '#cbd5e1', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.35)' },
  live: { label: 'Ao vivo', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.35)' },
  finished: { label: 'Encerrado', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.35)' },
};

function scoreLabel(match) {
  if (match.homeScore === null || match.awayScore === null) return 'Placar indisponível';
  return `${match.homeScore} x ${match.awayScore}`;
}

export default function TodayMatchesWidget({ matches = mockLiveScores }) {
  // TODO(api): substituir mock por dados externos (API-Football, SportMonks, football-data.org ou TheSportsDB).
  // TODO(api): se houver chave privada, fazer chamada via backend/serverless e nunca expor a API key no frontend.
  // TODO(api): adicionar cache em camada server/API route para reduzir latência e proteger limites de requisição.

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-labelledby="jogos-hoje-heading">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
        <div>
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Ao vivo
          </p>
          <h2 id="jogos-hoje-heading" className="section-title mb-3">Jogos de hoje</h2>
          <p style={{ color: 'var(--text-2)', maxWidth: '720px' }}>
            Acompanhe partidas em andamento e use as calculadoras do CalculaBet para entender odds, retorno e gestão de banca.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to="/calculadoras/odds" className="btn-ghost px-4 py-2 text-xs">Calcular odds</Link>
          <Link to="/calculadoras/multipla-parlay" className="btn-ghost px-4 py-2 text-xs">Simular múltipla</Link>
          <Link to="/calculadoras/value-bet" className="btn-ghost px-4 py-2 text-xs">Analisar value bet</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {matches.map(match => {
          const status = statusConfig[match.status] ?? statusConfig.scheduled;
          return (
            <article
              key={match.id}
              className="rounded-2xl p-4 sm:p-5"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {match.league}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-2)' }}>Horário: {match.startTime}</p>
                </div>
                <span
                  className="text-[11px] font-semibold rounded-full px-2.5 py-1"
                  style={{ color: status.color, background: status.bg, border: `1px solid ${status.border}` }}
                >
                  {status.label}
                </span>
              </div>

              <div className="space-y-2 mb-5">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{match.homeTeam}</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>vs</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{match.awayTeam}</p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{scoreLabel(match)}</p>
                <Link to="/calculadoras/odds" className="text-xs font-semibold" style={{ color: '#22d3ee' }}>
                  Calcular odds
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
