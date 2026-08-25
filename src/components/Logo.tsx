import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <div
      id="brand-logo-container"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''} ${className}`}
    >
      {/* Isotipo: 4 elementos redondeados interconectados representando los 4 locales */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Líneas de conexión entre los 4 locales */}
          <path
            d="M14 14L34 14M34 14L34 34M34 34L14 34M14 34L14 14M14 14L34 34M34 14L14 34"
            stroke="#15213A"
            strokeOpacity="0.12"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M14 14L34 14M34 14L34 34M34 34L14 34M14 34L14 14"
            stroke="#234A91"
            strokeOpacity="0.35"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Local 1: Superior Izquierdo (Azul) */}
          <circle cx="14" cy="14" r="7" fill="#234A91" />
          <circle cx="14" cy="14" r="3" fill="#FFFFFF" fillOpacity="0.9" />

          {/* Local 2: Superior Derecho (Coral) */}
          <circle cx="34" cy="14" r="7" fill="#FF4F72" />
          <circle cx="34" cy="14" r="3" fill="#FFFFFF" fillOpacity="0.9" />

          {/* Local 3: Inferior Derecho (Magenta) */}
          <circle cx="34" cy="34" r="7" fill="#D92D8A" />
          <circle cx="34" cy="34" r="3" fill="#FFFFFF" fillOpacity="0.9" />

          {/* Local 4: Inferior Izquierdo (Ámbar) */}
          <circle cx="14" cy="34" r="7" fill="#F5A623" />
          <circle cx="14" cy="34" r="3" fill="#FFFFFF" fillOpacity="0.9" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold tracking-tight text-[#15213A] leading-none font-['Outfit',sans-serif] ${textSizes[size]}`}
          >
            Conectando
          </span>
        </div>
      )}
    </div>
  );
};
