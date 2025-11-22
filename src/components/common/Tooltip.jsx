import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  // Calculate tooltip position relative to viewport
  const calculatePosition = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current?.getBoundingClientRect();
    const tooltipWidth = tooltip?.width || 200;
    const tooltipHeight = tooltip?.height || 40;
    const gap = 8; // Gap between trigger and tooltip

    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let newPosition = position;
    let top = 0;
    let left = 0;

    // Check if default position works, otherwise flip
    if (position === 'top' && container.top - tooltipHeight - gap < 10) {
      newPosition = 'bottom';
    } else if (position === 'bottom' && container.bottom + tooltipHeight + gap > viewport.height - 10) {
      newPosition = 'top';
    } else if (position === 'left' && container.left - tooltipWidth - gap < 10) {
      newPosition = 'right';
    } else if (position === 'right' && container.right + tooltipWidth + gap > viewport.width - 10) {
      newPosition = 'left';
    }

    // Calculate coordinates based on final position
    switch (newPosition) {
      case 'top':
        top = container.top - tooltipHeight - gap;
        left = container.left + container.width / 2 - tooltipWidth / 2;
        break;
      case 'bottom':
        top = container.bottom + gap;
        left = container.left + container.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = container.top + container.height / 2 - tooltipHeight / 2;
        left = container.left - tooltipWidth - gap;
        break;
      case 'right':
        top = container.top + container.height / 2 - tooltipHeight / 2;
        left = container.right + gap;
        break;
      default:
        break;
    }

    // Ensure tooltip stays within viewport horizontally
    if (left < 10) left = 10;
    if (left + tooltipWidth > viewport.width - 10) {
      left = viewport.width - tooltipWidth - 10;
    }

    // Ensure tooltip stays within viewport vertically
    if (top < 10) top = 10;
    if (top + tooltipHeight > viewport.height - 10) {
      top = viewport.height - tooltipHeight - 10;
    }

    setTooltipPosition(newPosition);
    setCoords({ top, left });
  }, [position]);

  // Recalculate position when visibility changes or on scroll/resize
  useEffect(() => {
    if (isVisible) {
      calculatePosition();

      // Recalculate on scroll or resize
      const handleUpdate = () => calculatePosition();
      window.addEventListener('scroll', handleUpdate, true);
      window.addEventListener('resize', handleUpdate);

      return () => {
        window.removeEventListener('scroll', handleUpdate, true);
        window.removeEventListener('resize', handleUpdate);
      };
    }
  }, [isVisible, calculatePosition]);

  // Recalculate after tooltip renders to get accurate dimensions
  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      calculatePosition();
    }
  }, [isVisible, calculatePosition]);

  const arrowPositionStyles = {
    top: {
      bottom: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: '6px solid rgba(26, 26, 46, 0.95)',
      borderBottom: 'none'
    },
    bottom: {
      top: '-6px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderBottom: '6px solid rgba(26, 26, 46, 0.95)',
      borderTop: 'none'
    },
    left: {
      right: '-6px',
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: '6px solid transparent',
      borderBottom: '6px solid transparent',
      borderLeft: '6px solid rgba(26, 26, 46, 0.95)',
      borderRight: 'none'
    },
    right: {
      left: '-6px',
      top: '50%',
      transform: 'translateY(-50%)',
      borderTop: '6px solid transparent',
      borderBottom: '6px solid transparent',
      borderRight: '6px solid rgba(26, 26, 46, 0.95)',
      borderLeft: 'none'
    }
  };

  if (!content) return children;

  // Tooltip element to be rendered in portal
  const tooltipElement = isVisible ? (
    <div
      ref={tooltipRef}
      className="
        fixed z-[99999]
        px-3 py-2 max-w-xs
        bg-bg-tertiary/95 text-white text-sm
        rounded-lg shadow-2xl border border-white/20
        animate-in fade-in zoom-in-95 duration-150
        pointer-events-none
      "
      style={{
        top: coords.top,
        left: coords.left,
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)'
      }}
      role="tooltip"
    >
      {content}
      {/* Arrow */}
      <div
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          ...arrowPositionStyles[tooltipPosition]
        }}
      />
    </div>
  ) : null;

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

      {/* Render tooltip in a portal to escape stacking contexts */}
      {createPortal(tooltipElement, document.body)}
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
