import { forwardRef } from 'react';

const Card = forwardRef(({
  children,
  className = '',
  padding = 'md',
  glow = false,
  ...props
}, ref) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div
      ref={ref}
      className={`
        glass rounded-2xl shadow-card
        ${paddings[padding]}
        ${glow ? 'animate-pulse-glow' : ''}
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
