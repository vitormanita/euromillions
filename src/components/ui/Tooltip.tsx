import { useState, type ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none"
          role="tooltip"
        >
          <div className="bg-lottery-blue text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            {content}
          </div>
          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-lottery-blue rotate-45" />
        </div>
      )}
    </div>
  );
}
