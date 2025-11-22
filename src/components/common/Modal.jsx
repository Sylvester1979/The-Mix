import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showClose = true,
  size = 'md',
  variant = 'default',
  showDivider = true,
  className = ''
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full mx-4'
  };

  const variants = {
    default: 'bg-bg-secondary',
    elevated: 'glass-elevated bg-bg-secondary/95',
    glass: 'glass'
  };

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop with fade animation */}
      <div
        className={`
          absolute inset-0 bg-black/70 backdrop-blur-sm
          transition-opacity duration-200 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Ambient glow effect */}
      <div
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-96 h-96 rounded-full
          bg-accent-primary/10 blur-[100px]
          pointer-events-none
          transition-opacity duration-300
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Modal content */}
      <div
        className={`
          relative w-full ${sizes[size]} ${className}
          ${variants[variant]}
          border border-white/10 rounded-t-3xl sm:rounded-2xl
          shadow-2xl shadow-black/50
          max-h-[90vh] overflow-hidden
          transition-all duration-200 ease-out
          ${isAnimating
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          }
        `}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className={`
            flex items-center justify-between p-4
            ${showDivider ? 'border-b border-white/10' : ''}
          `}>
            {title && (
              <h2 className="text-lg font-semibold text-white">{title}</h2>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="
                  p-2 rounded-xl
                  hover:bg-white/10 active:bg-white/15
                  transition-all duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50
                  group
                "
              >
                <X className="
                  w-5 h-5 text-text-secondary
                  group-hover:text-white group-hover:rotate-90
                  transition-all duration-200
                " />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
