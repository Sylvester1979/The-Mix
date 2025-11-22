import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  suffix,
  prefix,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-sm text-text-secondary font-medium">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-4 text-text-muted">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-white/5 border border-white/10 rounded-xl
            px-4 py-3.5 text-white placeholder:text-text-muted
            transition-all duration-200
            focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20
            ${prefix ? 'pl-10' : ''}
            ${suffix ? 'pr-12' : ''}
            ${error ? 'border-error focus:border-error focus:ring-error/20' : ''}
            ${className}
          `}
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 text-text-secondary text-sm">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <span className="text-sm text-error">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
