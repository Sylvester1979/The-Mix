export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'primary',
  showLabel = false,
  label,
  size = 'md',
  animated = false,
  striped = false,
  glow = false,
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    primary: 'bg-accent-gradient',
    success: 'bg-success-gradient',
    warning: 'bg-warning-gradient',
    error: 'bg-error-gradient',
    info: 'bg-info',
    teal: 'bg-gradient-to-r from-accent-teal to-accent-primary',
    vivid: 'bg-accent-gradient-vivid'
  };

  const glowColors = {
    primary: 'shadow-glow-primary',
    success: 'shadow-glow-success',
    warning: 'shadow-glow-warning',
    error: 'shadow-glow-error',
    info: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]',
    teal: 'shadow-glow-teal',
    vivid: 'shadow-glow-primary'
  };

  const sizes = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-secondary font-medium">{label}</span>
          {showLabel && (
            <span className="text-sm font-semibold text-white tabular-nums">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`
        w-full bg-white/10 rounded-full overflow-hidden
        ${sizes[size]}
        ${glow ? 'shadow-inner' : ''}
      `}>
        <div
          className={`
            ${sizes[size]} ${colors[color]} rounded-full
            transition-all duration-500 ease-out
            relative overflow-hidden
            ${glow ? glowColors[color] : ''}
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          {percentage > 0 && percentage < 100 && (
            <div className="
              absolute inset-0
              bg-gradient-to-r from-transparent via-white/20 to-transparent
              animate-shimmer
            " />
          )}

          {/* Striped pattern */}
          {striped && (
            <div
              className="
                absolute inset-0
                bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]
                animate-[shimmer_1s_linear_infinite]
              "
              style={{ backgroundSize: '28.28px 100%' }}
            />
          )}

          {/* Completion glow burst */}
          {percentage >= 100 && (
            <div className="
              absolute inset-0
              bg-gradient-to-r from-white/0 via-white/30 to-white/0
              animate-pulse
            " />
          )}
        </div>
      </div>
    </div>
  );
}
