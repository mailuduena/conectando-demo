import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ConsumidorPerfil, MovimientoRegistro } from '../../types';
import { formatPesos } from '../../data/consumerStore';
import {
  User,
  Wallet,
  Sparkles,
  SlidersHorizontal,
  FileText,
  Calendar,
  Phone,
  Mail,
  Info,
  CheckCircle2,
  X,
  History,
  ArrowUpRight,
} from 'lucide-react';

interface OwnerCustomersProps {
  consumidor: ConsumidorPerfil;
  movimientos: MovimientoRegistro[];
  onOpenAdjustment: () => void;
}

export const OwnerCustomers: React.FC<OwnerCustomersProps> = ({
  consumidor,
  movimientos,
  onOpenAdjustment,
}) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const saldoTotal = consumidor.creditoComprado + consumidor.creditoPromocional;
  const movimientosConsumidor = movimientos.filter(
    (m) => !m.codigoConsumidor || m.codigoConsumidor === consumidor.codigoCliente
  );

  const ultimaActividad = movimientosConsumidor.length > 0
    ? `${movimientosConsumidor[0].fecha} ${movimientosConsumidor[0].hora}`
    : 'Sin movimientos registrados';

  return (
    <div id="owner-customers-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
            Cuentas de clientes
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1">
            Gestión y consulta de saldos, puntos y actividad de los consumidores de la red.
          </p>
        </div>

        <button
          id="customer-action-adjustment-btn"
          onClick={onOpenAdjustment}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15213A] text-white hover:bg-[#234A91] text-xs sm:text-sm font-bold shadow-xs transition-all self-start sm:self-auto min-h-[44px]"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#D92D8A]" />
          <span>Ajustar saldo de cliente</span>
        </button>
      </div>

      {/* Demo Notice */}
      <div className="p-4 rounded-2xl bg-[#234A91]/8 border border-[#234A91]/20 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#234A91] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#172033]">
          <strong className="text-[#234A91]">Demostración de cuenta unificada:</strong> En esta versión se utiliza una cuenta principal representativa (<strong>{consumidor.nombre}</strong>) para demostrar el circuito completo entre consumidor, terminal de empleados y administración.
        </div>
      </div>

      {/* Customer Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        id="owner-customer-main-card"
        className="bg-white rounded-2xl border border-[#15213A]/10 shadow-xs p-5 sm:p-7 space-y-6"
      >
        {/* Customer Basic Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#15213A]/8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#234A91] to-[#15213A] text-white flex items-center justify-center font-bold text-xl shadow-xs font-['Outfit',sans-serif]">
              {consumidor.nombre.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
                  {consumidor.nombre}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#234A91]/10 text-[#234A91] border border-[#234A91]/20">
                  {consumidor.codigoCliente}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#667085] mt-1">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {consumidor.telefono}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {consumidor.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="view-customer-statement-btn"
              onClick={() => setShowHistoryModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F7F8FC] hover:bg-[#15213A]/5 text-[#15213A] text-xs font-bold border border-[#15213A]/10 transition-all min-h-[44px]"
            >
              <History className="w-4 h-4 text-[#234A91]" />
              <span>Ver extracto ({movimientosConsumidor.length})</span>
            </button>
          </div>
        </div>

        {/* Financial and Points Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Saldo Total */}
          <div className="p-4 rounded-xl bg-[#234A91]/8 border border-[#234A91]/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#234A91] block">
              Saldo total disponible
            </span>
            <div className="text-2xl font-bold text-[#15213A] font-['Outfit',sans-serif] mt-1">
              {formatPesos(saldoTotal)}
            </div>
            <span className="text-[11px] text-[#667085] mt-1 block">
              Unificado para los 4 comercios
            </span>
          </div>

          {/* Desglose Crédito */}
          <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#15213A]/8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] block">
              Composición del saldo
            </span>
            <div className="text-xs space-y-1 mt-2">
              <div className="flex justify-between">
                <span className="text-[#667085]">Crédito comprado:</span>
                <strong className="text-[#15213A]">{formatPesos(consumidor.creditoComprado)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#667085]">Crédito promocional:</span>
                <strong className="text-[#D92D8A]">{formatPesos(consumidor.creditoPromocional)}</strong>
              </div>
              <div className="text-[10px] text-[#667085] pt-1">
                Vence prom.: {consumidor.vencimientoPromocional}
              </div>
            </div>
          </div>

          {/* Puntos y Actividad */}
          <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#15213A]/8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] block">
              Puntos y movimientos
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-[#D92D8A] font-['Outfit',sans-serif]">
                {consumidor.puntos}
              </span>
              <span className="text-xs font-semibold text-[#667085]">puntos acumulados</span>
            </div>
            <div className="text-[11px] text-[#667085] mt-2">
              Última actividad: <strong className="text-[#15213A]">{ultimaActividad}</strong>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Customer Full Statement Modal */}
      {showHistoryModal && (
        <div
          id="customer-statement-modal-backdrop"
          className="fixed inset-0 z-50 bg-[#15213A]/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            id="customer-statement-modal"
            className="w-full max-w-2xl bg-white rounded-2xl border border-[#15213A]/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#15213A]/8 bg-[#F7F8FC]">
              <div>
                <h3 className="text-base font-bold text-[#15213A] font-['Outfit',sans-serif]">
                  Extracto de movimientos: {consumidor.nombre}
                </h3>
                <p className="text-xs text-[#667085] font-mono">
                  Código: {consumidor.codigoCliente} · {movimientosConsumidor.length} operaciones
                </p>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#667085] hover:text-[#15213A] hover:bg-[#15213A]/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {movimientosConsumidor.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#15213A]">{m.titulo}</span>
                      <span className="font-mono text-[10px] text-[#667085]">({m.id})</span>
                    </div>
                    <div className="text-[11px] text-[#667085] mt-0.5">
                      {m.comercio} · {m.fecha} {m.hora} · {m.empleado}
                    </div>
                    {m.motivoAjuste && (
                      <div className="text-[11px] text-[#D92D8A] font-medium mt-1">
                        Motivo ajuste: {m.motivoAjuste}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-sm text-[#15213A] font-['Outfit',sans-serif]">
                      {m.tipo === 'carga' && `+${formatPesos(m.creditoAcreditado || m.importeEntregado || 0)}`}
                      {m.tipo === 'compra' && `-${formatPesos(m.creditoUtilizado || 0)}`}
                      {m.tipo === 'ajuste' && (
                        m.tipoAjuste === 'credito_positivo'
                          ? `+${formatPesos(m.importeEntregado || 0)}`
                          : `-${formatPesos(m.creditoUtilizado || 0)}`
                      )}
                    </div>
                    <div className="text-[10px] text-[#667085]">
                      Saldo post: {formatPesos(m.saldoPosterior || 0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-[#15213A]/8 bg-[#F7F8FC] flex justify-end">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#15213A] hover:bg-[#234A91] rounded-xl transition-all"
              >
                Cerrar extracto
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
