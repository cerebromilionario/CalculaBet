export default function AdBanner({ size = 'leaderboard' }) {
  const sizes = {
    leaderboard: 'h-20 w-full',
    rectangle:   'h-56 w-full',
    skyscraper:  'h-80 w-36',
  };
  return (
    <div className={`ad-placeholder ${sizes[size]}`}>
      <div className="text-center space-y-1">
        <p style={{ color: 'var(--text-3)', fontSize: '0.6875rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Publicidade
        </p>
        <p style={{ color: 'rgba(255,255,255,0.12)', fontSize: '0.75rem' }}>
          Adsterra · Google AdSense
        </p>
      </div>
    </div>
  );
}
