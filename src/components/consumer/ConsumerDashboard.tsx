import React, { useState, useEffect } from 'react';
import { ConsumidorTab, ConsumidorPerfil, MovimientoRegistro } from '../../types';
import {
  getConsumidorPerfil,
  getMovimientos,
} from '../../data/consumerStore';
import { ConsumerNav } from './ConsumerNav';
import { ConsumerHome } from './ConsumerHome';
import { ConsumerBenefits } from './ConsumerBenefits';
import { ConsumerMovements } from './ConsumerMovements';
import { ConsumerQR } from './ConsumerQR';
import { ShieldAlert } from 'lucide-react';

interface ConsumerDashboardProps {
  onBackToRoles: () => void;
  onBackToLanding: () => void;
}

export const ConsumerDashboard: React.FC<ConsumerDashboardProps> = ({
  onBackToRoles,
  onBackToLanding,
}) => {
  const [activeTab, setActiveTab] = useState<ConsumidorTab>('inicio');
  const [perfil, setPerfil] = useState<ConsumidorPerfil>(getConsumidorPerfil);
  const [movimientos, setMovimientos] = useState<MovimientoRegistro[]>(getMovimientos);

  useEffect(() => {
    // Reload data if storage changes
    setPerfil(getConsumidorPerfil());
    setMovimientos(getMovimientos());
  }, [activeTab]);

  return (
    <div id="consumer-dashboard-root" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28 md:pb-12">
      {/* Top Banner / Role breadcrumb */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <button
            id="consumer-back-roles-btn"
            onClick={onBackToRoles}
            className="text-xs sm:text-sm font-semibold text-[#234A91] hover:text-[#15213A] transition-colors p-1.5 -ml-1.5 rounded-lg hover:bg-[#234A91]/8 flex items-center gap-1.5 min-h-[44px]"
          >
            <span>← Selector de roles</span>
          </button>
          <span className="text-[#667085] text-xs hidden sm:inline">•</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#234A91]/10 text-[#234A91] hidden sm:inline">
            Panel del Consumidor
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-[#667085] hidden md:inline">
            {perfil.email}
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <ConsumerNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Tab Content */}
      <main id="consumer-tab-content-area" className="w-full">
        {activeTab === 'inicio' && (
          <ConsumerHome
            perfil={perfil}
            movimientos={movimientos}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'beneficios' && (
          <ConsumerBenefits perfil={perfil} />
        )}

        {activeTab === 'movimientos' && (
          <ConsumerMovements movimientos={movimientos} />
        )}

        {activeTab === 'qr' && (
          <ConsumerQR perfil={perfil} />
        )}
      </main>

      {/* Bottom Global Disclaimer */}
      <div className="mt-12 text-center">
        <div
          id="consumer-bottom-disclaimer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15213A]/5 border border-[#15213A]/8 text-xs text-[#667085]"
        >
          <ShieldAlert className="w-4 h-4 text-[#15213A]/60 shrink-0" />
          <span>
            Esta aplicación es una demostración. No utiliza dinero ni datos reales.
          </span>
        </div>
      </div>
    </div>
  );
};
