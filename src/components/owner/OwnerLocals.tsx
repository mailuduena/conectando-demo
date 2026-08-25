import React from 'react';
import { motion } from 'motion/react';
import { MovimientoRegistro } from '../../types';
import { LOCALES_DEMO, EMPLEADOS_DEMO, formatPesos } from '../../data/consumerStore';
import {
  Store,
  Wallet,
  ShoppingBag,
  Gift,
  Users,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Percent,
} from 'lucide-react';

interface OwnerLocalsProps {
  movimientos: MovimientoRegistro[];
}

export const OwnerLocals: React.FC<OwnerLocalsProps> = ({ movimientos }) => {
  return (
    <div id="owner-locals-view" className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
          Locales comerciales de la red
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Supervisá el estado, la actividad transaccional y el personal asignado a cada uno de los 4 comercios.
        </p>
      </div>

      {/* Grid of 4 stores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {LOCALES_DEMO.map((local, idx) => {
          const movsLocal = movimientos.filter((m) => m.comercio === local.nombre);
          const cargas = movsLocal.filter((m) => m.tipo === 'carga');
          const compras = movsLocal.filter((m) => m.tipo === 'compra');

          const dineroRecibido = cargas.reduce((sum, m) => sum + (m.importeEntregado || 0), 0);
          const bonificaciones = cargas.reduce((sum, m) => sum + (m.bonificacion || 0), 0);
          const creditoUtilizado = compras.reduce((sum, m) => sum + (m.creditoUtilizado || 0), 0);

          const empleadosAsignados = EMPLEADOS_DEMO.filter(
            (e) => e.comercioAsignado === local.nombre
          );

          return (
            <motion.div
              key={local.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              id={`owner-local-card-${local.id}`}
              className="bg-white rounded-2xl border border-[#15213A]/10 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-[#234A91]/30 transition-all"
            >
              <div>
                {/* Store Header & Badges */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-2xs font-bold"
                      style={{ backgroundColor: local.color || '#15213A' }}
                    >
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
                        {local.nombre}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#15213A]/5 text-[#667085]">
                          {local.codigo}
                        </span>
                        <span className="text-xs font-medium text-[#234A91]">
                          {local.rubro}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#234A91]/10 text-[#234A91] border border-[#234A91]/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {local.estado}
                  </span>
                </div>

                {/* Location string */}
                <div className="flex items-center gap-2 text-xs text-[#667085] bg-[#F7F8FC] px-3 py-2 rounded-xl mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[#667085] shrink-0" />
                  <span>{local.direccion}</span>
                </div>

                {/* Performance Metrics Box */}
                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] block">
                    Rendimiento y movimientos
                  </span>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Cargas */}
                    <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5">
                      <span className="text-[11px] text-[#667085] block">
                        Cargas registradas ({cargas.length})
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#234A91] font-['Outfit',sans-serif] block mt-0.5">
                        {formatPesos(dineroRecibido)}
                      </span>
                      <span className="text-[10px] text-[#D92D8A] font-medium block">
                        +{formatPesos(bonificaciones)} bonif.
                      </span>
                    </div>

                    {/* Compras */}
                    <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5">
                      <span className="text-[11px] text-[#667085] block">
                        Compras registradas ({compras.length})
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#15213A] font-['Outfit',sans-serif] block mt-0.5">
                        {formatPesos(creditoUtilizado)}
                      </span>
                      <span className="text-[10px] text-[#667085] block">
                        Crédito consumido
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Staff */}
              <div className="pt-4 border-t border-[#15213A]/8">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#15213A] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#234A91]" />
                    Personal asignado
                  </span>
                  <span className="text-[#667085]">
                    {empleadosAsignados.length} {empleadosAsignados.length === 1 ? 'cajero' : 'cajeros'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {empleadosAsignados.map((emp) => (
                    <div
                      key={emp.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F8FC] border border-[#15213A]/10 text-xs text-[#15213A] font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#234A91]"></span>
                      <span>{emp.nombre}</span>
                      <span className="text-[10px] text-[#667085]">({emp.codigo})</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
