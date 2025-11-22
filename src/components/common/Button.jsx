import { forwardRef, useState } from 'react';

const variants = {
  primary: `
    btn-gradient text-white shadow-glow-primary
    hover:shadow-glow-primary-lg hover:brightness-110
    active:brightness-95
  `,
  secondary: `
    bg-white/5 text-white border border-white/10
    hover:bg-white/10 hover:border-white/15
    active:bg-white/8
    shadow-inner-glow
  `,
  ghost: `
    bg-transparent text-white
    hover:bg-white/5
    active:bg-white/8
  `,
  danger: `
    bg-error-muted text-error border border-error/30
    hover:bg-error/25 hover:border-error/40 hover:shadow-glow-error
    active:bg-error/20
  `,
  success: `
    bg-success-muted text-success border border-success/30
    hover:bg-success/25 hover:border-success/40 hover:shadow-glow-success
    active:bg-success/20
  `,
  outline: `
    bg-transparent text-accent-primary border border-accent-primary/50
    hover:bg-accent-primary/10 hover:border-accent-primary
    active:bg-accent-primary/15
  `,
  teal: `
    bg-accent-teal text-white shadow-glow-teal
    hover:bg-accent-teal-hover hover:shadow-glow-teal
    active:brightness-95
  `
};

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs rounded-lg',
  sm: 'px-3 py-2 text-sm rounded-lg',
  md: 'px-4 py-3 text-base rounded-xl',
  lg: 'px-6 py-4 text-lg rounded-xl',
  xl: 'px-8 py-5 text-xl rounded-2xl'
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  ripple = true,
  className = '',
  ...props
}, ref) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (ripple && !disabled && !loading) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const newRipple = {
        x,
        y,
        size,
        id: Date.now()
      };

      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }

    props.onClick?.(e);
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden
        font-semibold transition-all duration-200 ease-out
        transform-gpu
        active:scale-[0.97] active:transition-transform active:duration-75
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        flex items-center justify-center gap-2
        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {ripples.map(({ x, y, size, id }) => (
        <span
          key={id}
          className="absolute rounded-full bg-white/20 pointer-events-none animate-[ripple_0.6s_ease-out]"
          style={{
            left: x,
            top: y,
            width: size,
            height: size,
          }}
        />
      ))}

      {/* Loading spinner */}
      {loading && (
        <svg
          className="animate-spin h-5 w-5 flex-shrink-0"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Icon left */}
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
      )}

      {/* Content */}
      <span className={loading ? 'opacity-70' : ''}>
        {children}
      </span>

      {/* Icon right */}
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
