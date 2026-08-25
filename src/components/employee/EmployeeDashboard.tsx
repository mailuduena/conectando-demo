import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EmpleadoPerfil, ConsumidorPerfil } from '../../types';
import {
  getConsumidorPerfil,
  formatPesos,
} from '../../data/consumerStore';
import { EmployeeSelector } from './EmployeeSelector';
import { IdentifyConsumer } from './IdentifyConsumer';
import { ChargeOperation } from './ChargeOperation';
import { PurchaseOperation } from './PurchaseOperation';
import {
  Store,
  User,
  ArrowDownLeft,
  ShoppingBag,
  ShieldAlert,
  Search,
  ArrowLeft,
} from 'lucide-react';

interface EmployeeDashboardProps {
  onBackToRoles: () => void;
  onBackToLanding: () => void;
}

type EmployeeView = 'selector_empleado' | 'panel_inicial' | 'identificar' | 'ficha_consumidor' | 'carga' | 'compra';

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({
  onBackToRoles,
  onBackToLanding,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmpleadoPerfil | null>(null);
  const [currentView, setCurrentView] = useState<EmployeeView>('selector_empleado');
  const [activeConsumer, setActiveConsumer] = useState<ConsumidorPerfil | null>(null);

  const handleSelectEmployee = (emp: EmpleadoPerfil) => {
    setSelectedEmployee(emp);
    setCurrentView('panel_inicial');
    setActiveConsumer(null);
  };

  const handleConsumerFound = (consumidor: ConsumidorPerfil) => {
    setActiveConsumer(consumidor);
    setCurrentView('ficha_consumidor');
  };

  const handleOperationSuccess = (nuevoPerfil: ConsumidorPerfil) => {
    setActiveConsumer(nuevoPerfil);
  };

  const handleNewOperation = () => {
    setActiveConsumer(null);
    setCurrentView('identificar');
  };

  if (!selectedEmployee || currentView === 'selector_empleado') {
    return (
      <EmployeeSelector
        onSelectEmployee={handleSelectEmployee}
        onBackToRoles={onBackToRoles}
      />
    );
  }

  const saldoTotalConsumidor = activeConsumer
    ? activeConsumer.creditoComprado + activeConsumer.creditoPromocional
    : 0;

  return (
    <div id="employee-dashboard-root" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20">
      {/* Top Employee Header Banner */}
      <div className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#15213A] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-[#15213A] font-['Outfit',sans-serif]">
                {selectedEmployee.nombre}
              </h2>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-[#15213A]/6 text-[#15213A]">
                {selectedEmployee.codigo}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#234A91] flex items-center gap-1 mt-0.5">
              <Store className="w-3.5 h-3.5" />
              {selectedEmployee.comercioAsignado}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            id="employee-change-account-btn"
            onClick={() => {
              setSelectedEmployee(null);
              setCurrentView('selector_empleado');
              setActiveConsumer(null);
            }}
            className="text-xs font-semibold text-[#667085] hover:text-[#15213A] bg-[#F7F8FC] hover:bg-[#15213A]/10 px-3 py-2 rounded-xl transition-colors min-h-[40px] flex items-center"
          >
            Cambiar empleado
          </button>
          <button
            id="employee-return-roles-top-btn"
            onClick={onBackToRoles}
            className="text-xs font-semibold text-[#234A91] bg-[#234A91]/8 hover:bg-[#234A91]/15 px-3 py-2 rounded-xl transition-colors min-h-[40px] flex items-center"
          >
            Roles
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: PANEL INICIAL */}
      {currentView === 'panel_inicial' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-6 text-center max-w-xl mx-auto"
        >
          <div className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-6 sm:p-9 shadow-xs space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#D92D8A]/10 text-[#D92D8A] mx-auto flex items-center justify-center shadow-2xs">
              <Store className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
                Terminal activa en caja
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif] mt-1">
                Hola, {selectedEmployee.nombre.split(' ')[0]}
              </h1>
              <p className="text-sm text-[#667085] mt-2 leading-relaxed">
                Punto de venta asignado a <strong className="text-[#15213A]">{selectedEmployee.comercioAsignado}</strong>.
              </p>
            </div>

            <div className="pt-2">
              <button
                id="panel-identify-consumer-btn"
                onClick={() => setCurrentView('identificar')}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-bold text-white bg-[#234A91] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-md transition-all min-h-[52px]"
              >
                <Search className="w-5 h-5" />
                <span>Identificar consumidor</span>
              </button>
            </div>
          </div>

          <div
            id="employee-simulated-ops-notice"
            className="p-4 rounded-xl bg-[#15213A]/5 border border-[#15213A]/8 text-xs sm:text-sm text-[#667085] flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-[#15213A]/70" />
            <span>Todas las operaciones de esta versión son simuladas.</span>
          </div>
        </motion.div>
      )}

      {/* SUB-VIEW 2: IDENTIFICACIÓN DEL CONSUMIDOR */}
      {currentView === 'identificar' && (
        <div>
          <button
            id="identify-back-to-home-btn"
            onClick={() => setCurrentView('panel_inicial')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#15213A] mb-5 transition-colors min-h-[44px] px-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al panel inicial</span>
          </button>

          <IdentifyConsumer onConsumerIdentified={handleConsumerFound} />
        </div>
      )}

      {/* SUB-VIEW 3: FICHA DEL CONSUMIDOR ENCONTRADO */}
      {currentView === 'ficha_consumidor' && activeConsumer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {/* Header Action */}
          <div className="flex items-center justify-between">
            <button
              id="consumer-sheet-back-search-btn"
              onClick={() => {
                setActiveConsumer(null);
                setCurrentView('identificar');
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#234A91] hover:text-[#15213A] transition-colors min-h-[44px] px-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Buscar otro consumidor</span>
            </button>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#234A91]/8 text-[#234A91]">
              Cuenta identificada
            </span>
          </div>

          {/* Consumer Info Card */}
          <div className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#15213A]/8 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#234A91] text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-xs">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
                    {activeConsumer.nombre}
                  </h1>
                  <span className="text-sm font-mono font-bold text-[#234A91]">
                    {activeConsumer.codigoCliente}
                  </span>
                </div>
              </div>

              {/* Total Balance Big Pill */}
              <div className="bg-[#F7F8FC] border border-[#15213A]/8 rounded-2xl p-4 text-left sm:text-right">
                <span className="text-xs text-[#667085] block font-medium">Saldo total disponible</span>
                <span className="text-2xl sm:text-3xl font-bold text-[#234A91] font-['Outfit',sans-serif] block mt-0.5">
                  {formatPesos(saldoTotalConsumidor)}
                </span>
              </div>
            </div>

            {/* Breakdown & Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
              {/* Comprado */}
              <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5">
                <span className="text-xs text-[#667085] block">Crédito comprado</span>
                <span className="text-lg font-bold text-[#15213A] mt-0.5 block font-['Outfit',sans-serif]">
                  {formatPesos(activeConsumer.creditoComprado)}
                </span>
                <span className="text-[11px] text-[#667085] mt-0.5 block">Sin vencimiento</span>
              </div>

              {/* Promocional */}
              <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#F5A623]/30">
                <span className="text-xs text-[#15213A] font-semibold block">Crédito promocional</span>
                <span className="text-lg font-bold text-[#F5A623] mt-0.5 block font-['Outfit',sans-serif]">
                  {formatPesos(activeConsumer.creditoPromocional)}
                </span>
                <span className="text-[11px] text-[#667085] mt-0.5 block">
                  Vence: {activeConsumer.vencimientoPromocional}
                </span>
              </div>

              {/* Puntos */}
              <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#D92D8A]/30">
                <span className="text-xs text-[#15213A] font-semibold block">Puntos acumulados</span>
                <span className="text-lg font-bold text-[#D92D8A] mt-0.5 block font-['Outfit',sans-serif]">
                  {activeConsumer.puntos} puntos
                </span>
                <span className="text-[11px] text-[#667085] mt-0.5 block">Fidelización red</span>
              </div>
            </div>

            {/* Action Buttons: Registrar Carga vs Registrar Compra */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7 pt-6 border-t border-[#15213A]/8">
              {/* Registrar Carga */}
              <button
                id="action-register-charge-btn"
                onClick={() => setCurrentView('carga')}
                className="flex items-center justify-between p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#234A91] hover:bg-[#234A91]/5 active:scale-98 transition-all text-left shadow-xs min-h-[72px]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#234A91] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <ArrowDownLeft className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-base font-bold text-[#15213A] block font-['Outfit',sans-serif]">
                      Registrar carga
                    </span>
                    <span className="text-xs text-[#667085]">
                      Recarga presencial (+10% bonificación)
                    </span>
                  </div>
                </div>
              </button>

              {/* Registrar Compra */}
              <button
                id="action-register-purchase-btn"
                onClick={() => setCurrentView('compra')}
                className="flex items-center justify-between p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#D92D8A] hover:bg-[#D92D8A]/5 active:scale-98 transition-all text-left shadow-xs min-h-[72px]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#D92D8A] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-base font-bold text-[#15213A] block font-['Outfit',sans-serif]">
                      Registrar compra
                    </span>
                    <span className="text-xs text-[#667085]">
                      Débito en caja y suma de puntos
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SUB-VIEW 4: OPERACIÓN DE CARGA */}
      {currentView === 'carga' && activeConsumer && (
        <ChargeOperation
          consumidor={activeConsumer}
          empleado={selectedEmployee}
          onSuccess={handleOperationSuccess}
          onCancel={() => setCurrentView('ficha_consumidor')}
          onNewOperation={handleNewOperation}
        />
      )}

      {/* SUB-VIEW 5: OPERACIÓN DE COMPRA */}
      {currentView === 'compra' && activeConsumer && (
        <PurchaseOperation
          consumidor={activeConsumer}
          empleado={selectedEmployee}
          onSuccess={handleOperationSuccess}
          onCancel={() => setCurrentView('ficha_consumidor')}
          onNewOperation={handleNewOperation}
        />
      )}
    </div>
  );
};
