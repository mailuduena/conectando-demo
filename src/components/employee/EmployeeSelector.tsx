import React from 'react';
import { motion } from 'motion/react';
import { EmpleadoPerfil } from '../../types';
import { EMPLEADOS_DEMO } from '../../data/consumerStore';
import {
  Store,
  User,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface EmployeeSelectorProps {
  onSelectEmployee: (employee: EmpleadoPerfil) => void;
  onBackToRoles: () => void;
}

export const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({
  onSelectEmployee,
  onBackToRoles,
}) => {
  return (
    <div id="employee-selector-view" className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back button */}
      <button
        id="employee-selector-back-btn"
        onClick={onBackToRoles}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#15213A] mb-6 transition-colors min-h-[44px] px-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al selector de roles</span>
      </button>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D92D8A]/10 text-[#D92D8A] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Terminal de atención en caja
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#15213A] tracking-tight font-['Outfit',sans-serif]">
          Elegí una cuenta de empleado
        </h1>
        <p className="text-sm sm:text-base text-[#667085] mt-2 leading-relaxed">
          Seleccioná un perfil de atención para acceder a la terminal de caja con su comercio asignado.
        </p>
      </div>

      {/* Notice about assigned stores */}
      <div
        id="employee-assigned-store-notice"
        className="mb-8 p-4 rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 shadow-xs flex items-start gap-3 text-xs sm:text-sm text-[#667085]"
      >
        <Info className="w-5 h-5 text-[#234A91] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#15213A]">Aclaración de demostración:</strong> En el sistema definitivo, cada empleado ingresará únicamente al comercio que tenga asignado.
        </p>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {EMPLEADOS_DEMO.map((emp, idx) => {
          const colors = ['#234A91', '#D92D8A', '#F5A623', '#15213A'];
          const empColor = colors[idx % colors.length];
          return (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              id={`employee-card-${emp.id}`}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 shadow-xs hover:shadow-md hover:border-[#D92D8A]/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-2xs"
                    style={{ backgroundColor: empColor }}
                  >
                    <User className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#15213A]/5 text-[#15213A]">
                    {emp.codigo}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
                  {emp.nombre}
                </h2>

                <div className="mt-3 p-3 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5">
                  <span className="text-[11px] text-[#667085] block font-medium">
                    Comercio asignado:
                  </span>
                  <span className="text-sm font-bold text-[#172033] flex items-center gap-1.5 mt-0.5">
                    <Store className="w-4 h-4 text-[#234A91]" />
                    {emp.comercioAsignado}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-[#667085]">
                  <div className="flex items-center gap-1.5 text-[#172033]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#234A91]" />
                    <span>Puede registrar cargas y compras</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#667085]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#667085] ml-1 mr-0.5"></span>
                    <span>No puede realizar ajustes</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#15213A]/8">
                <button
                  id={`select-employee-${emp.id}-btn`}
                  onClick={() => onSelectEmployee(emp)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#D92D8A] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-xs transition-all min-h-[44px]"
                >
                  <span>Ingresar a la terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Discreet Demo Notice */}
      <div className="mt-10 text-center">
        <div
          id="employee-selector-disclaimer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15213A]/5 text-xs text-[#667085] border border-[#15213A]/8"
        >
          <ShieldAlert className="w-4 h-4 text-[#15213A]/60" />
          <span>
            Esta aplicación es una demostración. No utiliza dinero ni datos reales.
          </span>
        </div>
      </div>
    </div>
  );
};
