import { forwardRef } from 'react';

const Toggle = forwardRef(({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <label className={`flex items-center justify-between cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
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
        <div className="
          w-12 h-7 bg-white/10 rounded-full
          peer-checked:bg-accent-primary
          transition-colors duration-200
          after:content-['']
          after:absolute after:top-0.5 after:left-0.5
          after:bg-white after:rounded-full
          after:h-6 after:w-6
          after:transition-transform after:duration-200
          peer-checked:after:translate-x-5
          after:shadow-md
        " />
      </div>
    </label>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
