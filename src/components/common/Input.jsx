import { forwardRef, useState } from 'react';

const Input = forwardRef(({
  label,
  error,
  success,
  suffix,
  prefix,
  hint,
  size = 'md',
  variant = 'default',
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizes = {
    sm: 'px-3 py-2.5 text-sm rounded-lg',
    md: 'px-4 py-3.5 text-base rounded-xl',
    lg: 'px-5 py-4 text-lg rounded-xl'
  };

  const variants = {
    default: 'bg-white/5 border-white/10',
    filled: 'bg-white/8 border-transparent',
    ghost: 'bg-transparent border-white/5'
  };

  // Determine state-based styling
  const getStateClasses = () => {
    if (error) {
      return `
        border-error/50
        focus:border-error focus:ring-2 focus:ring-error/20
        focus:shadow-[0_0_20px_rgba(239,68,68,0.15)]
      `;
    }
    if (success) {
      return `
        border-success/50
        focus:border-success focus:ring-2 focus:ring-success/20
        focus:shadow-[0_0_20px_rgba(34,197,94,0.15)]
      `;
    }
    return `
      focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20
      focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]
    `;
  };

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className={`
          text-sm font-medium transition-colors duration-200
          ${isFocused ? 'text-accent-primary' : 'text-text-secondary'}
          ${error ? 'text-error' : ''}
          ${success ? 'text-success' : ''}
        `}>
          {label}
        </label>
      )}
      <div className="relative flex items-center group">
        {prefix && (
          <span className={`
            absolute left-4 transition-colors duration-200
            ${isFocused ? 'text-accent-primary' : 'text-text-muted'}
            ${error ? 'text-error' : ''}
          `}>
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            w-full border text-white placeholder:text-text-muted
            transition-all duration-200 ease-out
            focus:outline-none
            hover:border-white/15 hover:bg-white/[0.06]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5
            ${variants[variant]}
            ${sizes[size]}
            ${prefix ? 'pl-11' : ''}
            ${suffix ? 'pr-14' : ''}
            ${getStateClasses()}
            ${className}
          `}
          {...props}
        />
        {suffix && (
          <span className={`
            absolute right-4 text-sm transition-colors duration-200
            ${isFocused ? 'text-text-secondary' : 'text-text-muted'}
          `}>
            {suffix}
          </span>
        )}

        {/* Focus indicator line */}
        <div className={`
          absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full
          bg-gradient-to-r from-accent-primary to-accent-secondary
          transition-all duration-300 ease-out
          ${isFocused && !error && !success ? 'w-[calc(100%-2rem)] opacity-100' : 'w-0 opacity-0'}
          ${error ? 'bg-error' : ''}
          ${success ? 'bg-success' : ''}
        `} />
      </div>

      {/* Helper text / Error / Success message */}
      {(error || success || hint) && (
        <span className={`
          text-sm transition-all duration-200
          ${error ? 'text-error' : ''}
          ${success ? 'text-success' : ''}
          ${!error && !success ? 'text-text-muted' : ''}
        `}>
          {error || success || hint}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
