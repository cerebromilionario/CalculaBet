export default function AdBanner({ size = 'leaderboard', label = 'Publicidade' }) {
  const sizes = {
    leaderboard: 'h-24 w-full',
    rectangle: 'h-64 w-full max-w-sm',
    skyscraper: 'h-96 w-40',
  };
  return (
    <div className={`ad-placeholder ${sizes[size]} my-4`}>
      <div className="text-center">
        <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">{label}</p>
        <p className="text-gray-700 text-xs">Espaço para banner Adsterra/AdSense</p>
      </div>
    </div>
  );
}
