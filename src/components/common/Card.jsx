import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  className = '',
  padding = 'md',
  glow = false,
  glowColor = 'primary',
  hover = false,
  interactive = false,
  elevated = false,
  gradient = false,
  ...props
}, ref) => {
  const paddings = {
    none: '',
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const glowColors = {
    primary: 'animate-pulse-glow',
    success: 'shadow-glow-success',
    warning: 'shadow-glow-warning',
    error: 'shadow-glow-error',
    teal: 'shadow-glow-teal',
    pink: 'shadow-glow-pink'
  };

  // Base glass style
  const baseClass = elevated ? 'glass-elevated' : 'glass';

  // Hover effect classes
  const hoverClass = hover ? `
    transition-all duration-300 ease-out
    hover:-translate-y-1
    hover:shadow-card-hover
    hover:border-white/12
  ` : '';

  // Interactive (clickable) effect classes
  const interactiveClass = interactive ? `
    cursor-pointer
    transition-all duration-200 ease-out
    hover:bg-white/[0.06]
    hover:border-white/12
    hover:shadow-card-hover
    active:scale-[0.98]
    active:shadow-card
  ` : '';

  // Gradient border effect
  const gradientClass = gradient ? `
    relative
    before:absolute before:inset-0 before:-z-10 before:rounded-2xl
    before:bg-gradient-to-br before:from-accent-primary/20 before:to-accent-secondary/20
    before:opacity-0 before:transition-opacity before:duration-300
    hover:before:opacity-100
  ` : '';

  return (
    <div
      ref={ref}
      className={`
        ${baseClass} rounded-2xl shadow-card
        ${paddings[padding]}
        ${glow ? glowColors[glowColor] : ''}
        ${hoverClass}
        ${interactiveClass}
        ${gradientClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
