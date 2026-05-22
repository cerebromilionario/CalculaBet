import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { mockLiveScores } from '../../data/mockLiveScores';

const statusConfig = {
  scheduled: { label: 'Agendado', color: '#cbd5e1', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.35)' },
  live: { label: 'Ao vivo', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.35)' },
  finished: { label: 'Encerrado', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.35)' },
  postponed: { label: 'Adiado', color: '#fbbf24', bg: 'rgba(251,191,36,0.09)', border: 'rgba(251,191,36,0.28)' },
  cancelled: { label: 'Cancelado', color: '#f87171', bg: 'rgba(248,113,113,0.09)', border: 'rgba(248,113,113,0.28)' },
  unknown: { label: 'Status indisponível', color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.22)' },
};

function scoreLabel(match) {
  if (match.homeScore === null || match.awayScore === null) return 'Placar indisponível';
  return `${match.homeScore} x ${match.awayScore}`;
}

function formatDate(date) {
  if (!date) return null;

  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    }).format(new Date(`${date}T12:00:00`));
  } catch {
    return null;
  }
}

function statusText(status) {
  return statusConfig[status] ?? statusConfig.unknown;
}

export default function TodayMatchesWidget({ fallbackMatches = mockLiveScores }) {
  const [matches, setMatches] = useState([]);
  const [state, setState] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadMatches() {
      try {
        const response = await fetch('/api/live-scores', {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) throw new Error('Live scores request failed');

        const payload = await response.json();
        const nextMatches = Array.isArray(payload?.matches) ? payload.matches.slice(0, 8) : [];

        if (!active) return;

        if (nextMatches.length > 0) {
          setMatches(nextMatches);
          setState('ready');
          setMessage('');
          return;
        }

        setMatches(import.meta.env.DEV ? fallbackMatches.slice(0, 6) : []);
        setState('empty');
        setMessage(payload?.message || 'Sem jogos relevantes para exibir no momento.');
      } catch {
        if (!active) return;
        setMatches(import.meta.env.DEV ? fallbackMatches.slice(0, 6) : []);
        setState('error');
        setMessage('Não foi possível carregar os jogos agora.');
      }
    }

    loadMatches();

    return () => {
      active = false;
      controller.abort();
    };
  }, [fallbackMatches]);

  const hasMatches = matches.length > 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-labelledby="jogos-hoje-heading">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
        <div>
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Futebol
          </p>
          <h2 id="jogos-hoje-heading" className="section-title mb-3">Jogos de hoje e próximos eventos</h2>
          <p style={{ color: 'var(--text-2)', maxWidth: '720px' }}>
            Acompanhe partidas em destaque e use as calculadoras do CalculaBet para entender odds, retorno e gestão de banca.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to="/calculadoras/odds" className="btn-ghost px-4 py-2 text-xs">Calcular odds</Link>
          <Link to="/calculadoras/multipla-parlay" className="btn-ghost px-4 py-2 text-xs">Simular múltipla</Link>
          <Link to="/calculadoras/value-bet" className="btn-ghost px-4 py-2 text-xs">Analisar value bet</Link>
        </div>
      </div>

      {state === 'loading' && (
        <div
          className="rounded-2xl px-4 py-3 text-sm mb-3"
          style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.14)', color: 'var(--text-2)' }}
          role="status"
          aria-live="polite"
        >
          Carregando jogos em destaque...
        </div>
      )}

      {message && !hasMatches && (
        <div
          className="rounded-2xl px-4 py-4 text-sm"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}

      {message && hasMatches && import.meta.env.DEV && (
        <p className="text-xs mb-3" style={{ color: 'var(--text-3)' }}>{message}</p>
      )}

      {hasMatches && (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {matches.map(match => {
          const status = statusText(match.status);
          const date = formatDate(match.date);
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
                  <p className="text-xs" style={{ color: 'var(--text-2)' }}>
                    {date ? `${date} · ` : ''}Horário: {match.startTime || 'A definir'}
                  </p>
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
      )}
    </section>
  );
}
