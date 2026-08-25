import React from 'react';
import { Logo } from './Logo';
import { AppView, UserRole } from '../types';
import { Sparkles, Users, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  selectedRole: UserRole | null;
  onNavigate: (view: AppView, role?: UserRole | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  selectedRole,
  onNavigate,
}) => {
  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#15213A]/8 px-4 sm:px-6 lg:px-8 py-3.5 transition-all"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Logo & Demo tag */}
        <div className="flex items-center gap-3">
          <Logo
            size="md"
            onClick={() => onNavigate('landing', null)}
          />
          <div
            id="demo-version-badge-header"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#234A91]/10 text-[#234A91] border border-[#234A91]/20 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#234A91] animate-pulse"></span>
            Versión demo
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentView !== 'landing' && (
            <button
              id="header-nav-home-btn"
              onClick={() => onNavigate('landing', null)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#172033] hover:text-[#234A91] hover:bg-[#F7F8FC] rounded-lg transition-colors min-h-[44px] min-w-[44px] justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-[#667085]" />
              <span className="hidden sm:inline">Inicio</span>
            </button>
          )}

          {currentView === 'landing' ? (
            <button
              id="header-nav-roles-btn"
              onClick={() => onNavigate('roles')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#234A91] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-xs transition-all min-h-[44px]"
            >
              <Users className="w-4 h-4" />
              <span>Explorar demo</span>
            </button>
          ) : currentView === 'welcome' && (
            <button
              id="header-nav-switch-role-btn"
              onClick={() => onNavigate('roles')}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#234A91] bg-[#234A91]/8 hover:bg-[#234A91]/15 rounded-xl transition-colors min-h-[44px]"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Cambiar rol</span>
              <span className="sm:hidden">Roles</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
