import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MovimientoRegistro, TipoMovimiento } from '../../types';
import { formatPesos } from '../../data/consumerStore';
import {
  Receipt,
  ArrowDownLeft,
  ArrowUpRight,
  Gift,
  SlidersHorizontal,
  Store,
  User,
  Clock,
  CheckCircle2,
  Inbox,
  Filter,
} from 'lucide-react';

interface ConsumerMovementsProps {
  movimientos: MovimientoRegistro[];
}

interface FilterOption {
  id: TipoMovimiento;
  label: string;
  count?: number;
}

export const ConsumerMovements: React.FC<ConsumerMovementsProps> = ({ movimientos }) => {
  const [activeFilter, setActiveFilter] = useState<TipoMovimiento>('todos');

  const filteredMovimientos = movimientos.filter((mov) => {
    if (activeFilter === 'todos') return true;
    return mov.tipo === activeFilter;
  });

  const FILTERS: FilterOption[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'carga', label: 'Cargas' },
    { id: 'compra', label: 'Compras' },
    { id: 'canje', label: 'Canjes' },
    { id: 'ajuste', label: 'Ajustes' },
  ];

  return (
    <div id="consumer-movements-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
            Historial de movimientos
          </h1>
          <p className="text-sm text-[#667085] mt-0.5">
            Registro unificado de todas tus cargas, consumos y beneficios en la red.
          </p>
        </div>

        <div className="text-xs text-[#667085] bg-[#FFFFFF] border border-[#15213A]/10 px-3 py-1.5 rounded-full self-start sm:self-auto shadow-2xs">
          Total de registros: <span className="font-bold text-[#15213A]">{movimientos.length}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
        <div className="flex items-center gap-1.5 p-1 bg-[#FFFFFF] rounded-xl border border-[#15213A]/10 shadow-2xs">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.id;
            const count =
              f.id === 'todos'
                ? movimientos.length
                : movimientos.filter((m) => m.tipo === f.id).length;

            return (
              <button
                key={f.id}
                id={`filter-btn-${f.id}`}
                onClick={() => setActiveFilter(f.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap min-h-[40px] ${
                  isActive
                    ? 'bg-[#234A91] text-white shadow-2xs'
                    : 'text-[#667085] hover:text-[#15213A] hover:bg-[#F7F8FC]'
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#F7F8FC] text-[#667085]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Movements List or Empty State */}
      {filteredMovimientos.length > 0 ? (
        <div className="space-y-3">
          {filteredMovimientos.map((mov, idx) => {
            const isCarga = mov.tipo === 'carga';
            const isCompra = mov.tipo === 'compra';
            const isCanje = mov.tipo === 'canje';

            return (
              <motion.div
                key={mov.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                id={`movement-card-${mov.id}`}
                className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-5 shadow-xs hover:border-[#15213A]/20 transition-all flex flex-col gap-4"
              >
                {/* Top Row: Icon + Title + Status + Amount */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs ${
                        isCarga
                          ? 'bg-[#234A91]'
                          : isCompra
                          ? 'bg-[#FF4F72]'
                          : 'bg-[#D92D8A]'
                      }`}
                    >
                      {isCarga ? (
                        <ArrowDownLeft className="w-5 h-5" />
                      ) : isCompra ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <Gift className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-[#15213A] font-['Outfit',sans-serif]">
                          {mov.titulo}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isCarga
                              ? 'bg-[#234A91]/10 text-[#234A91]'
                              : isCompra
                              ? 'bg-[#FF4F72]/10 text-[#FF4F72]'
                              : 'bg-[#D92D8A]/10 text-[#D92D8A]'
                          }`}
                        >
                          {isCarga ? 'Carga' : isCompra ? 'Compra' : 'Canje'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#667085] mt-1">
                        <Clock className="w-3.5 h-3.5 text-[#667085]" />
                        <span>{mov.fecha} a las {mov.hora} hs</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Amount */}
                  <div className="text-right">
                    {isCarga ? (
                      <div>
                        <span className="text-lg sm:text-xl font-bold text-[#234A91] font-['Outfit',sans-serif] block">
                          +{formatPesos(mov.creditoAcreditado || 0)}
                        </span>
                        <span className="text-[11px] font-semibold text-[#234A91] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {mov.estado}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-lg sm:text-xl font-bold text-[#15213A] font-['Outfit',sans-serif] block">
                          -{formatPesos(mov.creditoUtilizado || 0)}
                        </span>
                        <span className="text-[11px] font-semibold text-[#15213A] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#234A91]" />
                          {mov.estado}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Breakdown Box */}
                <div className="bg-[#F7F8FC] rounded-xl p-3.5 border border-[#15213A]/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[#667085] block">Comercio:</span>
                    <span className="font-bold text-[#172033] flex items-center gap-1 mt-0.5">
                      <Store className="w-3.5 h-3.5 text-[#234A91]" />
                      {mov.comercio}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#667085] block">Atendido por:</span>
                    <span className="font-bold text-[#172033] flex items-center gap-1 mt-0.5">
                      <User className="w-3.5 h-3.5 text-[#667085]" />
                      {mov.empleado}
                    </span>
                  </div>

                  {isCarga && (
                    <>
                      <div>
                        <span className="text-[#667085] block">Importe entregado:</span>
                        <span className="font-medium text-[#172033] mt-0.5 block">
                          {formatPesos(mov.importeEntregado || 0)}
                        </span>
                      </div>

                      <div>
                        <span className="text-[#667085] block">Bonificación acreditada:</span>
                        <span className="font-bold text-[#F5A623] mt-0.5 block">
                          +{formatPesos(mov.bonificacion || 0)}
                        </span>
                      </div>
                    </>
                  )}

                  {isCompra && (
                    <>
                      <div>
                        <span className="text-[#667085] block">Total ticket:</span>
                        <span className="font-medium text-[#172033] mt-0.5 block">
                          {formatPesos(mov.totalCompra || 0)}
                        </span>
                      </div>

                      <div>
                        <span className="text-[#667085] block">Puntos sumados:</span>
                        <span className="font-bold text-[#D92D8A] mt-0.5 block">
                          +{mov.puntosObtenidos || 0} puntos
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div
          id="movements-empty-state"
          className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-10 text-center flex flex-col items-center justify-center shadow-xs"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#F7F8FC] border border-[#15213A]/8 flex items-center justify-center text-[#667085] mb-4">
            <Inbox className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
            No hay movimientos registrados en esta categoría
          </h3>
          <p className="text-xs sm:text-sm text-[#667085] mt-1 max-w-sm">
            Actualmente no tenés registros clasificados como{' '}
            <span className="font-semibold text-[#15213A]">{activeFilter}</span>.
          </p>
          <button
            id="reset-filter-btn"
            onClick={() => setActiveFilter('todos')}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-[#234A91] bg-[#234A91]/8 hover:bg-[#234A91]/15 transition-colors min-h-[40px]"
          >
            Ver todos los movimientos
          </button>
        </div>
      )}
    </div>
  );
};
