import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

export default function Tooltip({
  children,
  content,
  position = 'top',
  showIcon = false,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  // Adjust position if tooltip goes off screen
  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltip = tooltipRef.current.getBoundingClientRect();
      const container = containerRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      let newPosition = position;

      // Check if tooltip goes off screen and adjust
      if (position === 'top' && container.top - tooltip.height < 10) {
        newPosition = 'bottom';
      } else if (position === 'bottom' && container.bottom + tooltip.height > viewport.height - 10) {
        newPosition = 'top';
      } else if (position === 'left' && container.left - tooltip.width < 10) {
        newPosition = 'right';
      } else if (position === 'right' && container.right + tooltip.width > viewport.width - 10) {
        newPosition = 'left';
      }

      setTooltipPosition(newPosition);
    }
  }, [isVisible, position]);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-bg-tertiary border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-bg-tertiary border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-bg-tertiary border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-bg-tertiary border-y-transparent border-l-transparent'
  };

  if (!content) return children;

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onTouchStart={() => setIsVisible(true)}
      onTouchEnd={() => setTimeout(() => setIsVisible(false), 2000)}
    >
      {children}

      {showIcon && (
        <Info className="w-4 h-4 ml-1 text-text-muted cursor-help" />
      )}

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-[9999] ${positionClasses[tooltipPosition]}
            px-3 py-2 max-w-xs
            bg-bg-tertiary text-white text-sm
            rounded-lg shadow-2xl border border-white/20
            animate-in fade-in zoom-in-95 duration-150
            pointer-events-none
          `}
          style={{
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)'
          }}
          role="tooltip"
        >
          {content}
          {/* Arrow */}
          <div
            className={`
              absolute w-0 h-0
              border-[6px]
              ${arrowClasses[tooltipPosition]}
            `}
          />
        </div>
      )}
    </div>
  );
}

// Wrapper component for form fields with tooltip
export function TooltipWrapper({ children, tooltip, className = '' }) {
  if (!tooltip) return children;

  return (
    <Tooltip content={tooltip} position="top" className={className}>
      <div className="w-full">{children}</div>
    </Tooltip>
  );
}
