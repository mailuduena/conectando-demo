import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ConsumidorPerfil,
  MovimientoRegistro,
  OwnerTab,
  UserRole,
} from '../../types';
import {
  getConsumidorPerfil,
  getMovimientos,
} from '../../data/consumerStore';
import { OwnerSummary } from './OwnerSummary';
import { OwnerLocals } from './OwnerLocals';
import { OwnerCustomers } from './OwnerCustomers';
import { OwnerEmployees } from './OwnerEmployees';
import { OwnerMovements } from './OwnerMovements';
import { OwnerRulesBenefits } from './OwnerRulesBenefits';
import { OwnerAdjustmentModal } from './OwnerAdjustmentModal';
import {
  LayoutDashboard,
  Store,
  Users,
  UserCheck,
  Receipt,
  Sliders,
  SlidersHorizontal,
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Menu,
  X,
} from 'lucide-react';

interface OwnerDashboardProps {
  onBackToRoles: () => void;
  onBackToLanding: () => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  onBackToRoles,
  onBackToLanding,
}) => {
  const [activeTab, setActiveTab] = useState<OwnerTab>('resumen');
  const [consumidor, setConsumidor] = useState<ConsumidorPerfil>(getConsumidorPerfil());
  const [movimientos, setMovimientos] = useState<MovimientoRegistro[]>(getMovimientos());
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync state
  const refreshData = () => {
    setConsumidor(getConsumidorPerfil());
    setMovimientos(getMovimientos());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleAdjustmentComplete = (nuevoPerfil: ConsumidorPerfil, nuevoMovimiento: MovimientoRegistro) => {
    setConsumidor(nuevoPerfil);
    setMovimientos(getMovimientos());
  };

  const navItems: { id: OwnerTab; label: string; icon: React.ElementType }[] = [
    { id: 'resumen', label: 'Resumen general', icon: LayoutDashboard },
    { id: 'locales', label: 'Locales (4)', icon: Store },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'empleados', label: 'Empleados (4)', icon: UserCheck },
    { id: 'movimientos', label: 'Movimientos', icon: Receipt },
    { id: 'reglas_beneficios', label: 'Reglas y beneficios', icon: Sliders },
  ];

  return (
    <div id="owner-dashboard-container" className="w-full min-h-screen bg-[#F7F8FC] flex flex-col">
      {/* Top Header / Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#15213A]/10 px-4 sm:px-6 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Role Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#15213A] text-white flex items-center justify-center shadow-xs">
              <Building2 className="w-5 h-5 text-[#D92D8A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#15213A] font-['Outfit',sans-serif]">
                  Panel del Dueño
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#15213A]/10 text-[#15213A]">
                  Cuenta administradora demo
                </span>
              </div>
              <span className="text-[11px] text-[#667085] hidden sm:block">
                Supervisión y control unificado de los 4 comercios
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Adjustment CTA */}
            <button
              id="owner-header-ajuste-btn"
              onClick={() => setIsAdjustmentModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#15213A] hover:bg-[#234A91] rounded-xl shadow-xs transition-all active:scale-98 min-h-[40px]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D92D8A]" />
              <span className="hidden sm:inline">Registrar ajuste</span>
              <span className="sm:hidden">Ajuste</span>
            </button>

            {/* Back to Roles Button */}
            <button
              id="owner-back-to-roles-btn"
              onClick={onBackToRoles}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#172033] hover:text-[#234A91] hover:bg-[#F7F8FC] border border-[#15213A]/10 rounded-xl transition-colors min-h-[40px]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#667085]" />
              <span className="hidden md:inline">Volver al selector de roles</span>
              <span className="md:hidden">Roles</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="owner-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#172033] hover:bg-[#F7F8FC] border border-[#15213A]/10 min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside
          id="owner-desktop-sidebar"
          className="hidden lg:flex flex-col w-64 shrink-0 space-y-4"
        >
          {/* Navigation Card */}
          <div className="bg-white rounded-2xl border border-[#15213A]/10 shadow-xs p-3 space-y-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-[#15213A] text-white shadow-xs'
                      : 'text-[#667085] hover:text-[#15213A] hover:bg-[#F7F8FC]'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#D92D8A]' : 'text-[#667085]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Adjustment Action in Sidebar */}
          <div className="p-4 rounded-2xl bg-linear-to-br from-[#15213A] to-[#234A91] text-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold">
              <SlidersHorizontal className="w-4 h-4 text-[#D92D8A]" />
              <span>Ajustes de saldo</span>
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed">
              Correcciones y acreditaciones de saldo directas con trazabilidad administrativa inmutable.
            </p>
            <button
              id="sidebar-open-adjustment-btn"
              onClick={() => setIsAdjustmentModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-white text-[#15213A] hover:bg-[#F7F8FC] active:scale-98 text-xs font-bold transition-all min-h-[38px]"
            >
              Registrar nuevo ajuste
            </button>
          </div>

          {/* Demo Disclaimer Box */}
          <div className="p-3.5 rounded-2xl bg-[#15213A]/5 border border-[#15213A]/8 text-[11px] text-[#667085] flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-[#234A91] shrink-0 mt-0.5" />
            <span>
              Este panel utiliza datos simulados almacenados localmente.
            </span>
          </div>
        </aside>

        {/* Mobile Navigation Drawer / Tabs */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white rounded-2xl border border-[#15213A]/10 shadow-md p-3 space-y-1"
          >
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                    isActive
                      ? 'bg-[#15213A] text-white shadow-xs'
                      : 'text-[#667085] hover:text-[#15213A] hover:bg-[#F7F8FC]'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-[#D92D8A]' : 'text-[#667085]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Mobile Horizontal Tabs when menu closed */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all min-h-[38px] ${
                  isActive
                    ? 'bg-[#15213A] text-white shadow-xs'
                    : 'bg-white text-[#667085] border border-[#15213A]/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'resumen' && (
              <OwnerSummary
                key="resumen"
                consumidor={consumidor}
                movimientos={movimientos}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenAdjustment={() => setIsAdjustmentModalOpen(true)}
              />
            )}

            {activeTab === 'locales' && (
              <OwnerLocals
                key="locales"
                movimientos={movimientos}
              />
            )}

            {activeTab === 'clientes' && (
              <OwnerCustomers
                key="clientes"
                consumidor={consumidor}
                movimientos={movimientos}
                onOpenAdjustment={() => setIsAdjustmentModalOpen(true)}
              />
            )}

            {activeTab === 'empleados' && (
              <OwnerEmployees
                key="empleados"
                movimientos={movimientos}
              />
            )}

            {activeTab === 'movimientos' && (
              <OwnerMovements
                key="movimientos"
                movimientos={movimientos}
                onOpenAdjustment={() => setIsAdjustmentModalOpen(true)}
              />
            )}

            {activeTab === 'reglas_beneficios' && (
              <OwnerRulesBenefits
                key="reglas_beneficios"
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Adjustment Modal */}
      <OwnerAdjustmentModal
        isOpen={isAdjustmentModalOpen}
        onClose={() => setIsAdjustmentModalOpen(false)}
        consumidor={consumidor}
        movimientos={movimientos}
        onAdjustmentComplete={handleAdjustmentComplete}
      />
    </div>
  );
};
