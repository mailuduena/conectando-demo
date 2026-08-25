import React from 'react';
import { ConsumidorTab } from '../../types';
import { Home, Gift, Receipt, QrCode } from 'lucide-react';

interface ConsumerNavProps {
  activeTab: ConsumidorTab;
  onSelectTab: (tab: ConsumidorTab) => void;
}

interface TabItem {
  id: ConsumidorTab;
  label: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'beneficios', label: 'Beneficios', icon: Gift },
  { id: 'movimientos', label: 'Movimientos', icon: Receipt },
  { id: 'qr', label: 'Mi QR', icon: QrCode },
];

export const ConsumerNav: React.FC<ConsumerNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <>
      {/* Desktop / Tablet navigation bar */}
      <nav
        id="consumer-desktop-nav"
        className="hidden md:flex items-center gap-1.5 p-1.5 bg-[#FFFFFF] rounded-2xl border border-[#15213A]/10 shadow-xs mb-8"
        aria-label="Navegación del consumidor"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`desktop-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                isActive
                  ? 'bg-[#234A91] text-white shadow-xs'
                  : 'text-[#667085] hover:text-[#15213A] hover:bg-[#F7F8FC]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#667085]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav
        id="consumer-mobile-bottom-nav"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-lg border-t border-[#15213A]/10 px-2 py-2 shadow-lg"
        aria-label="Navegación inferior móvil"
      >
        <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`mobile-tab-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all min-h-[48px] ${
                  isActive
                    ? 'text-[#234A91] bg-[#234A91]/8 font-bold'
                    : 'text-[#667085] hover:text-[#15213A]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#234A91]' : 'text-[#667085]'}`} />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#234A91]" />
                  )}
                </div>
                <span className="text-[11px] mt-1 tracking-tight leading-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
