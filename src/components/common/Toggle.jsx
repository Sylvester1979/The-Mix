import { forwardRef } from 'react';

const Toggle = forwardRef(({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}, ref) => {
  const sizes = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'h-4 w-4',
      translate: 'peer-checked:after:translate-x-4'
    },
    md: {
      track: 'w-12 h-7',
      thumb: 'h-6 w-6',
      translate: 'peer-checked:after:translate-x-5'
    },
    lg: {
      track: 'w-14 h-8',
      thumb: 'h-7 w-7',
      translate: 'peer-checked:after:translate-x-6'
    }
  };

  const colors = {
    primary: 'peer-checked:bg-accent-primary peer-checked:shadow-glow-primary',
    success: 'peer-checked:bg-success peer-checked:shadow-glow-success',
    teal: 'peer-checked:bg-accent-teal peer-checked:shadow-glow-teal',
    pink: 'peer-checked:bg-accent-pink peer-checked:shadow-glow-pink'
  };

  const s = sizes[size];

  return (
    <label className={`
      flex items-center justify-between cursor-pointer
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${className}
    `}>
      <div className="flex flex-col">
        {label && (
          <span className="text-white font-medium">{label}</span>
        )}
        {description && (
          <span className="text-sm text-text-muted">{description}</span>
        )}
      </div>
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <div className={`
          ${s.track} bg-white/10 rounded-full
          ${colors[color]}
          transition-all duration-250 ease-out
          after:content-['']
          after:absolute after:top-0.5 after:left-0.5
          after:bg-white after:rounded-full
          after:${s.thumb}
          after:transition-all after:duration-250 after:ease-out
          ${s.translate}
          after:shadow-md
          peer-focus-visible:ring-2 peer-focus-visible:ring-accent-primary/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-primary
          peer-checked:after:shadow-lg
          hover:bg-white/15
          peer-checked:hover:brightness-110
        `} />

        {/* Glow effect when checked */}
        <div className={`
          absolute inset-0 rounded-full
          bg-accent-primary/30 blur-md
          transition-opacity duration-250
          ${checked ? 'opacity-100' : 'opacity-0'}
          pointer-events-none
        `} />
      </div>
    </label>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
