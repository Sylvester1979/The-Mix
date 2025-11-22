import { Star } from 'lucide-react';
import { useState } from 'react';

export default function StarRating({
  rating = 0,
  maxRating = 5,
  onChange,
  readonly = false,
  size = 'md',
  showValue = false,
  allowHalf = false,
  className = ''
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const handleClick = (index) => {
    if (!readonly && onChange) {
      // Allow toggle off if clicking same rating
      const newRating = rating === index + 1 ? 0 : index + 1;
      onChange(newRating);
    }
  };

  const handleMouseEnter = (index) => {
    if (!readonly) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="flex gap-0.5"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: maxRating }).map((_, index) => {
          const isFilled = index < displayRating;
          const isHovered = hoverRating > 0 && index < hoverRating;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              disabled={readonly}
              className={`
                relative
                ${readonly ? 'cursor-default' : 'cursor-pointer'}
                transition-all duration-150 ease-out
                ${!readonly ? 'hover:scale-125 active:scale-110' : ''}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-warning/50 rounded
                group
              `}
            >
              {/* Background star (empty) */}
              <Star
                className={`
                  ${sizes[size]}
                  fill-transparent text-white/20
                  transition-all duration-150
                  ${!readonly && !isFilled ? 'group-hover:text-warning/40' : ''}
                `}
              />

              {/* Foreground star (filled) - overlays the background */}
              <Star
                className={`
                  ${sizes[size]}
                  absolute inset-0
                  fill-warning text-warning
                  transition-all duration-200 ease-out
                  ${isFilled ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                  ${isHovered ? 'drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : ''}
                `}
              />

              {/* Sparkle effect on hover */}
              {!readonly && isHovered && (
                <span className="
                  absolute inset-0 rounded-full
                  bg-warning/20 blur-sm
                  animate-pulse
                " />
              )}
            </button>
          );
        })}
      </div>

      {/* Rating value display */}
      {showValue && (
        <span className="text-sm font-medium text-text-secondary tabular-nums ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
