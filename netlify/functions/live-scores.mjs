const CACHE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=300, s-maxage=900',
};

const PRIORITY_LEAGUES = [
  { id: '4351', name: 'Brazilian Serie A', priority: 1 },
  { id: '4404', name: 'Brazilian Serie B', priority: 2 },
  { id: '4355', name: 'Copa do Brasil', priority: 3 },
  { id: '4501', name: 'Copa Libertadores', priority: 4 },
  { id: '4502', name: 'Copa Sudamericana', priority: 5 },
  { id: '4480', name: 'UEFA Champions League', priority: 6 },
  { id: '4481', name: 'UEFA Europa League', priority: 7 },
  { id: '4328', name: 'English Premier League', priority: 8 },
  { id: '4335', name: 'Spanish La Liga', priority: 9 },
  { id: '4332', name: 'Italian Serie A', priority: 10 },
  { id: '4331', name: 'German Bundesliga', priority: 11 },
  { id: '4334', name: 'French Ligue 1', priority: 12 },
  { id: '4571', name: 'FIFA Club World Cup', priority: 13 },
];

const PRIORITY_LEAGUE_IDS = new Map(PRIORITY_LEAGUES.map(league => [league.id, league.priority]));
const PRIORITY_LEAGUE_NAMES = new Map(PRIORITY_LEAGUES.map(league => [league.name.toLowerCase(), league.priority]));
const PRIORITY_LEAGUE_ALIASES = [
  ['brasileirão série a', 1],
  ['brasileirao serie a', 1],
  ['campeonato brasileiro série a', 1],
  ['brazilian serie a', 1],
  ['brasileirão série b', 2],
  ['brasileirao serie b', 2],
  ['campeonato brasileiro série b', 2],
  ['brazilian serie b', 2],
  ['copa do brasil', 3],
  ['copa libertadores', 4],
  ['copa conmebol libertadores', 4],
  ['conmebol libertadores', 4],
  ['copa sudamericana', 5],
  ['copa sul-americana', 5],
  ['conmebol sudamericana', 5],
  ['uefa champions league', 6],
  ['champions league', 6],
  ['uefa europa league', 7],
  ['europa league', 7],
  ['english premier league', 8],
  ['premier league', 8],
  ['spanish la liga', 9],
  ['la liga', 9],
  ['laliga', 9],
  ['italian serie a', 10],
  ['serie a', 10],
  ['german bundesliga', 11],
  ['bundesliga', 11],
  ['french ligue 1', 12],
  ['ligue 1', 12],
  ['fifa club world cup', 13],
  ['club world cup', 13],
  ['fifa world cup', 14],
  ['uefa european championship', 15],
  ['copa america', 16],
];
const PRIORITY_LEAGUE_ALIASES_MAP = new Map(PRIORITY_LEAGUE_ALIASES.map(([name, priority]) => [normalizeLeagueName(name), priority]));
const BRAZIL_LEAGUE_PRIORITIES = new Set([1, 2, 3, 4, 5]);
const LIVE_STATUSES = new Set(['1H', 'HT', '2H', 'ET', 'P', 'BT']);
const FINISHED_STATUSES = new Set(['FT', 'AET', 'PEN']);
const POSTPONED_STATUSES = new Set(['PST', 'POST']);
const CANCELLED_STATUSES = new Set(['CANC', 'ABD', 'WO', 'AWD', 'SUSP', 'INT']);

function getApiKey() {
  return globalThis.Netlify?.env?.get('THESPORTSDB_API_KEY') ?? process.env.THESPORTSDB_API_KEY ?? '';
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: CACHE_HEADERS });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeTime(value) {
  if (!value || value === '00:00:00') return null;
  return String(value).slice(0, 5);
}

function normalizeScore(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeStatus(event) {
  const raw = String(event.strStatus || event.strProgress || '').trim().toUpperCase();

  if (LIVE_STATUSES.has(raw)) return 'live';
  if (FINISHED_STATUSES.has(raw) || raw.includes('FINAL')) return 'finished';
  if (POSTPONED_STATUSES.has(raw)) return 'postponed';
  if (CANCELLED_STATUSES.has(raw)) return 'cancelled';
  if (raw === 'NS' || raw === 'TBD' || !raw) return 'scheduled';

  return 'unknown';
}

function normalizeLeagueName(name) {
  return String(name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function normalizeEvent(event) {
  return {
    id: String(event.idEvent || event.idLiveScore || `${event.strHomeTeam}-${event.strAwayTeam}-${event.dateEvent}`),
    league: event.strLeague || 'Competição',
    homeTeam: event.strHomeTeam || 'Mandante',
    awayTeam: event.strAwayTeam || 'Visitante',
    startTime: normalizeTime(event.strEventTime || event.strTime) || 'A definir',
    date: event.dateEvent || null,
    status: normalizeStatus(event),
    elapsed: event.strProgress || null,
    homeScore: normalizeScore(event.intHomeScore),
    awayScore: normalizeScore(event.intAwayScore),
  };
}

function priorityFor(event) {
  const id = String(event.idLeague || '');
  const normalizedName = normalizeLeagueName(event.strLeague || event.league);

  return PRIORITY_LEAGUE_IDS.get(id)
    ?? PRIORITY_LEAGUE_NAMES.get(String(event.strLeague || event.league || '').toLowerCase())
    ?? PRIORITY_LEAGUE_ALIASES_MAP.get(normalizedName)
    ?? 99;
}

function isPriorityEvent(event) {
  return priorityFor(event) < 99;
}

function isBrazilPriority(match) {
  return BRAZIL_LEAGUE_PRIORITIES.has(priorityFor(match));
}

function timeValue(match) {
  if (!match.startTime || match.startTime === 'A definir') return Number.MAX_SAFE_INTEGER;
  const [hours, minutes] = String(match.startTime).split(':').map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return Number.MAX_SAFE_INTEGER;
  return (hours * 60) + minutes;
}

function logFilter(source, before, after) {
  if (process.env.NODE_ENV === 'development') {
    console.info(`[live-scores] ${source}: ${before} received, ${after} after priority filter`);
  }
}

function uniqueEvents(events) {
  const seen = new Set();
  return events.filter(event => {
    if (seen.has(event.id)) return false;
    seen.add(event.id);
    return true;
  });
}

function sortEvents(a, b) {
  if (a.status === 'live' && b.status !== 'live') return -1;
  if (a.status !== 'live' && b.status === 'live') return 1;
  if (a.status === 'finished' && b.status !== 'finished') return 1;
  if (a.status !== 'finished' && b.status === 'finished') return -1;
  if (isBrazilPriority(a) !== isBrazilPriority(b)) return isBrazilPriority(a) ? -1 : 1;

  return priorityFor(a) - priorityFor(b)
    || String(a.date || '').localeCompare(String(b.date || ''))
    || timeValue(a) - timeValue(b);
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = new Error(`TheSportsDB returned ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

async function getPremiumLiveScores(apiKey) {
  const data = await fetchJson('https://www.thesportsdb.com/api/v2/json/livescore/soccer', {
    headers: { 'X-API-KEY': apiKey },
  });
  const events = Array.isArray(data?.livescores) ? data.livescores : Array.isArray(data?.events) ? data.events : [];
  const filteredEvents = events.filter(event => String(event.strSport || '').toLowerCase() === 'soccer' && isPriorityEvent(event));
  logFilter('thesportsdb-v2-livescore', events.length, filteredEvents.length);

  return filteredEvents
    .sort((a, b) => priorityFor(a) - priorityFor(b))
    .map(normalizeEvent);
}

async function getEventsByDay(apiKey, date) {
  const url = new URL(`https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsday.php`);
  url.searchParams.set('d', date);
  url.searchParams.set('s', 'Soccer');

  const data = await fetchJson(url);
  const events = Array.isArray(data?.events) ? data.events : [];
  const filteredEvents = events.filter(isPriorityEvent);
  logFilter('thesportsdb-v1-eventsday', events.length, filteredEvents.length);

  return filteredEvents
    .sort((a, b) => priorityFor(a) - priorityFor(b))
    .map(normalizeEvent);
}

async function getNextLeagueEvents(apiKey) {
  const batches = [];

  for (const league of PRIORITY_LEAGUES.slice(0, 5)) {
    try {
      const data = await fetchJson(`https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnextleague.php?id=${league.id}`);
      const events = Array.isArray(data?.events) ? data.events : [];
      batches.push(...events);
    } catch {
      // Keep the response resilient when a league endpoint is limited or empty.
    }
  }

  return batches
    .filter(isPriorityEvent)
    .sort((a, b) => priorityFor(a) - priorityFor(b))
    .map(normalizeEvent);
}

export default async () => {
  const apiKey = getApiKey().trim();

  if (!apiKey) {
    return jsonResponse({
      ok: false,
      source: 'none',
      message: 'Sem jogos relevantes para exibir no momento.',
      matches: [],
    });
  }

  try {
    const liveMatches = await getPremiumLiveScores(apiKey);
    if (liveMatches.length > 0) {
      return jsonResponse({
        ok: true,
        source: 'thesportsdb-v2-livescore',
        matches: uniqueEvents(liveMatches).sort(sortEvents).slice(0, 6),
      });
    }
  } catch {
    // V2 livescore is premium-only. Fall through to the V1 schedule endpoint.
  }

  try {
    const date = todayISO();
    let matches = await getEventsByDay(apiKey, date);
    let source = 'thesportsdb-v1-eventsday';

    if (matches.length === 0) {
      matches = await getNextLeagueEvents(apiKey);
      source = 'thesportsdb-v1-eventsnextleague';
    }

    return jsonResponse({
      ok: matches.length > 0,
      source,
      message: matches.length > 0 ? undefined : 'Não há jogos relevantes para exibir no momento.',
      matches: uniqueEvents(matches).sort(sortEvents).slice(0, 6),
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      source: 'thesportsdb',
      message: 'Não foi possível carregar os jogos agora.',
      matches: [],
    }, error.status && error.status < 500 ? 200 : 502);
  }
};
