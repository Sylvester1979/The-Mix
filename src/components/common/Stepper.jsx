import { Minus, Plus } from 'lucide-react';

export default function Stepper({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  suffix = '',
  size = 'md',
  className = ''
}) {
  const handleDecrease = () => {
    const newValue = Math.max(min, value - step);
    onChange?.(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, value + step);
    onChange?.(newValue);
  };

  const sizes = {
    sm: {
      button: 'w-8 h-8',
      icon: 'w-4 h-4',
      value: 'text-lg min-w-[60px]'
    },
    md: {
      button: 'w-11 h-11',
      icon: 'w-5 h-5',
      value: 'text-xl min-w-[80px]'
    },
    lg: {
      button: 'w-14 h-14',
      icon: 'w-6 h-6',
      value: 'text-2xl min-w-[100px]'
    }
  };

  const s = sizes[size];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm text-text-secondary font-medium">
          {label}
        </label>
      )}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={value <= min}
          className={`
            ${s.button} rounded-xl bg-white/5 border border-white/10
            flex items-center justify-center
            transition-all duration-200
            hover:bg-white/10 active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed
          `}
        >
          <Minus className={`${s.icon} text-white`} />
        </button>

        <div className={`${s.value} font-bold text-white text-center`}>
          {value}
          {suffix && <span className="text-sm text-text-secondary ml-1">{suffix}</span>}
        </div>

        <button
          type="button"
          onClick={handleIncrease}
          disabled={value >= max}
          className={`
            ${s.button} rounded-xl btn-gradient
            flex items-center justify-center
            shadow-glow-primary
            transition-all duration-200
            hover:shadow-lg active:scale-95
            disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none
          `}
        >
          <Plus className={`${s.icon} text-white`} />
        </button>
      </div>
    </div>
  );
}
