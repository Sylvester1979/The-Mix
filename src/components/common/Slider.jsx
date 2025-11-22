import { forwardRef } from 'react';

const Slider = forwardRef(({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  suffix = '',
  showValue = true,
  onChange,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <label className="text-sm text-text-secondary font-medium">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-semibold text-accent-primary">
              {value}{suffix}
            </span>
          )}
        </div>
      )}
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 cursor-pointer"
        {...props}
      />
      <div className="flex justify-between text-xs text-text-muted">
        <span>{min}{suffix}</span>
        <span>{max}{suffix}</span>
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
