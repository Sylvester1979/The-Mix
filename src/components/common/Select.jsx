import { forwardRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({
  label,
  options = [],
  error,
  success,
  hint,
  placeholder = 'Select...',
  size = 'md',
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizes = {
    sm: 'px-3 py-2.5 text-sm rounded-lg pr-10',
    md: 'px-4 py-3.5 text-base rounded-xl pr-12',
    lg: 'px-5 py-4 text-lg rounded-xl pr-14'
  };

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
      <div className="relative group">
        <select
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
            w-full bg-white/5 border border-white/10 text-white
            appearance-none cursor-pointer
            transition-all duration-200 ease-out
            focus:outline-none
            hover:border-white/15 hover:bg-white/[0.06]
            disabled:opacity-50 disabled:cursor-not-allowed
            ${sizes[size]}
            ${getStateClasses()}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-bg-secondary text-text-muted">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-bg-secondary text-white py-2"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className={`
          absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5
          pointer-events-none
          transition-all duration-200
          ${isFocused ? 'text-accent-primary rotate-180' : 'text-text-muted'}
          ${error ? 'text-error' : ''}
        `} />

        {/* Focus indicator line */}
        <div className={`
          absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full
          bg-gradient-to-r from-accent-primary to-accent-secondary
          transition-all duration-300 ease-out
          ${isFocused && !error && !success ? 'w-[calc(100%-2rem)] opacity-100' : 'w-0 opacity-0'}
        `} />
      </div>
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

Select.displayName = 'Select';

export default Select;
