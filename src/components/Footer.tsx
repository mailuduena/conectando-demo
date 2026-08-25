import React from 'react';
import { Logo } from './Logo';
import { AppView, UserRole } from '../types';

interface FooterProps {
  onNavigate: (view: AppView, role?: UserRole | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      id="main-app-footer"
      className="w-full bg-[#FFFFFF] border-t border-[#15213A]/8 py-8 px-4 sm:px-6 mt-auto"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Logo size="sm" onClick={() => onNavigate('landing', null)} />
          <span className="text-xs text-[#667085]">
            Red de saldos y beneficios para comercios del mismo dueño
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-[#667085]">
          <button
            onClick={() => onNavigate('landing', null)}
            className="hover:text-[#234A91] transition-colors min-h-[44px] px-2 flex items-center"
          >
            Presentación
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('roles')}
            className="hover:text-[#234A91] transition-colors min-h-[44px] px-2 flex items-center"
          >
            Selector de roles
          </button>
        </div>
      </div>
    </footer>
  );
};
