import { Star } from 'lucide-react';

export default function StarRating({
  rating = 0,
  maxRating = 5,
  onChange,
  readonly = false,
  size = 'md',
  className = ''
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = (index) => {
    if (!readonly && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index)}
          disabled={readonly}
          className={`
            ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
            transition-transform duration-150
          `}
        >
          <Star
            className={`
              ${sizes[size]}
              ${index < rating
                ? 'fill-warning text-warning'
                : 'fill-transparent text-white/20'
              }
              transition-colors duration-150
            `}
          />
        </button>
      ))}
    </div>
  );
}
