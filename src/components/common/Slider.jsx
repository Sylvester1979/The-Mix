import { forwardRef, useMemo } from 'react';

const Slider = forwardRef(({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  suffix = '',
  showValue = true,
  showRange = true,
  showProgress = true,
  color = 'primary',
  onChange,
  className = '',
  ...props
}, ref) => {
  // Calculate percentage for progress fill
  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const colors = {
    primary: {
      value: 'text-accent-primary',
      glow: 'shadow-glow-primary'
    },
    success: {
      value: 'text-success',
      glow: 'shadow-glow-success'
    },
    warning: {
      value: 'text-warning',
      glow: 'shadow-glow-warning'
    },
    teal: {
      value: 'text-accent-teal',
      glow: 'shadow-glow-teal'
    }
  };

  const colorStyles = colors[color] || colors.primary;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <label className="text-sm text-text-secondary font-medium">
              {label}
            </label>
          )}
          {showValue && (
            <span className={`
              text-sm font-bold tabular-nums
              ${colorStyles.value}
              transition-all duration-150
            `}>
              {value}{suffix}
            </span>
          )}
        </div>
      )}

      {/* Slider container with progress track */}
      <div className="relative group">
        {/* Progress fill background */}
        {showProgress && (
          <div
            className="
              absolute top-1/2 left-0 h-1.5 -translate-y-1/2
              bg-accent-gradient rounded-full
              pointer-events-none
              transition-all duration-100
            "
            style={{ width: `${percentage}%` }}
          />
        )}

        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="
            w-full h-2 cursor-pointer
            relative z-10
            focus:outline-none
          "
          {...props}
        />
      </div>

      {/* Range labels */}
      {showRange && (
        <div className="flex justify-between text-xs text-text-muted font-medium">
          <span className="tabular-nums">{min}{suffix}</span>
          <span className="tabular-nums">{max}{suffix}</span>
        </div>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
