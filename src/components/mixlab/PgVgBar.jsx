export default function PgVgBar({
  pgPercent = 50,
  vgPercent = 50,
  className = ''
}) {
  return (
    <div className={`${className}`}>
      <div className="flex justify-between text-sm font-medium mb-2">
        <span className="text-info">PG {pgPercent}%</span>
        <span className="text-success">VG {vgPercent}%</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden flex bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-info to-info/80 transition-all duration-500"
          style={{ width: `${pgPercent}%` }}
        />
        <div
          className="h-full bg-gradient-to-r from-success/80 to-success transition-all duration-500"
          style={{ width: `${vgPercent}%` }}
        />
      </div>
    </div>
  );
}
