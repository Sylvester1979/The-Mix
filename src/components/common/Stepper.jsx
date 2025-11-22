import { Minus, Plus } from 'lucide-react';
import { useState, useCallback } from 'react';

export default function Stepper({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  suffix = '',
  size = 'md',
  haptic = true,
  className = ''
}) {
  const [isAnimating, setIsAnimating] = useState(null); // 'increase' | 'decrease' | null

  const handleDecrease = useCallback(() => {
    const newValue = Math.max(min, value - step);
    if (newValue !== value) {
      setIsAnimating('decrease');
      onChange?.(newValue);
      if (haptic && navigator.vibrate) {
        navigator.vibrate(10);
      }
      setTimeout(() => setIsAnimating(null), 150);
    }
  }, [value, min, step, onChange, haptic]);

  const handleIncrease = useCallback(() => {
    const newValue = Math.min(max, value + step);
    if (newValue !== value) {
      setIsAnimating('increase');
      onChange?.(newValue);
      if (haptic && navigator.vibrate) {
        navigator.vibrate(10);
      }
      setTimeout(() => setIsAnimating(null), 150);
    }
  }, [value, max, step, onChange, haptic]);

  const sizes = {
    sm: {
      button: 'w-9 h-9',
      icon: 'w-4 h-4',
      value: 'text-lg min-w-[60px]'
    },
    md: {
      button: 'w-12 h-12',
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
      <div className="flex items-center justify-center gap-4">
        {/* Decrease button */}
        <button
          type="button"
          onClick={handleDecrease}
          disabled={value <= min}
          className={`
            ${s.button} rounded-xl bg-white/5 border border-white/10
            flex items-center justify-center
            transition-all duration-150 ease-out
            hover:bg-white/10 hover:border-white/15 hover:scale-105
            active:scale-95 active:bg-white/15
            disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/5
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50
            group
          `}
        >
          <Minus className={`
            ${s.icon} text-white
            transition-transform duration-150
            group-hover:scale-110
            group-active:scale-90
          `} />
        </button>

        {/* Value display */}
        <div className={`
          ${s.value} font-bold text-white text-center
          transition-transform duration-150 ease-out
          ${isAnimating === 'increase' ? 'scale-110' : ''}
          ${isAnimating === 'decrease' ? 'scale-90' : ''}
        `}>
          <span className="tabular-nums">{value}</span>
          {suffix && <span className="text-sm text-text-secondary ml-1 font-medium">{suffix}</span>}
        </div>

        {/* Increase button */}
        <button
          type="button"
          onClick={handleIncrease}
          disabled={value >= max}
          className={`
            ${s.button} rounded-xl btn-gradient
            flex items-center justify-center
            shadow-glow-primary
            transition-all duration-150 ease-out
            hover:shadow-glow-primary-lg hover:scale-105 hover:brightness-110
            active:scale-95 active:brightness-95
            disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50
            group
          `}
        >
          <Plus className={`
            ${s.icon} text-white
            transition-transform duration-150
            group-hover:scale-110 group-hover:rotate-90
            group-active:scale-90
          `} />
        </button>
      </div>
    </div>
  );
}
