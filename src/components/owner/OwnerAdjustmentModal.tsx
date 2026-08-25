import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ConsumidorPerfil, MovimientoRegistro } from '../../types';
import {
  formatPesos,
  registrarAjusteSaldo,
} from '../../data/consumerStore';
import {
  SlidersHorizontal,
  PlusCircle,
  MinusCircle,
  AlertCircle,
  CheckCircle2,
  User,
  Info,
  X,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface OwnerAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  consumidor: ConsumidorPerfil;
  movimientos: MovimientoRegistro[];
  onAdjustmentComplete: (nuevoPerfil: ConsumidorPerfil, nuevoMovimiento: MovimientoRegistro) => void;
}

type AdjustmentStep = 'formulario' | 'revision' | 'exito';

export const OwnerAdjustmentModal: React.FC<OwnerAdjustmentModalProps> = ({
  isOpen,
  onClose,
  consumidor,
  movimientos,
  onAdjustmentComplete,
}) => {
  const [paso, setPaso] = useState<AdjustmentStep>('formulario');
  const [tipoAjuste, setTipoAjuste] = useState<'credito_positivo' | 'credito_negativo'>('credito_negativo');
  const [montoInput, setMontoInput] = useState<string>('5500');
  const [motivo, setMotivo] = useState<string>('Corrección de carga accidental');
  const [movimientoRelacionadoId, setMovimientoRelacionadoId] = useState<string>('mov-001');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultado, setResultado] = useState<{
    nuevoPerfil: ConsumidorPerfil;
    nuevoMovimiento: MovimientoRegistro;
  } | null>(null);

  if (!isOpen) return null;

  const saldoDisponibleTotal = consumidor.creditoComprado + consumidor.creditoPromocional;
  const montoNumerico = parseFloat(montoInput) || 0;

  // Calculo de saldo nuevo
  let nuevoSaldoEstimado = saldoDisponibleTotal;
  let deduccionPromocional = 0;
  let deduccionComprado = 0;

  if (tipoAjuste === 'credito_positivo') {
    nuevoSaldoEstimado = saldoDisponibleTotal + montoNumerico;
  } else {
    nuevoSaldoEstimado = Math.max(0, saldoDisponibleTotal - montoNumerico);
    if (consumidor.creditoPromocional >= montoNumerico) {
      deduccionPromocional = montoNumerico;
    } else {
      deduccionPromocional = consumidor.creditoPromocional;
      deduccionComprado = montoNumerico - consumidor.creditoPromocional;
    }
  }

  const handleValidarYRevisar = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      setErrorMsg('El importe del ajuste debe ser mayor a $0.');
      return;
    }

    if (!motivo.trim()) {
      setErrorMsg('El motivo del ajuste es obligatorio para mantener la trazabilidad.');
      return;
    }

    if (tipoAjuste === 'credito_negativo' && montoNumerico > saldoDisponibleTotal) {
      setErrorMsg(
        `El importe a descontar (${formatPesos(montoNumerico)}) no puede superar el saldo total disponible (${formatPesos(saldoDisponibleTotal)}).`
      );
      return;
    }

    setPaso('revision');
  };

  const handleConfirmarAjuste = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = registrarAjusteSaldo(
        consumidor,
        tipoAjuste,
        montoNumerico,
        motivo,
        movimientoRelacionadoId.trim() || undefined
      );

      setResultado(res);
      setPaso('exito');
      onAdjustmentComplete(res.nuevoPerfil, res.nuevoMovimiento);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Ocurrió un error al procesar el ajuste.');
      setPaso('formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setPaso('formulario');
    setErrorMsg(null);
    setIsSubmitting(false);
    setResultado(null);
    onClose();
  };

  return (
    <div
      id="owner-adjustment-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#15213A]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        id="owner-adjustment-modal-container"
        className="w-full max-w-lg bg-[#FFFFFF] rounded-2xl border border-[#15213A]/10 shadow-2xl overflow-hidden my-6"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#15213A]/8 bg-[#F7F8FC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#15213A] text-white flex items-center justify-center shadow-xs">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
                Registrar ajuste administrativo
              </h2>
              <p className="text-xs text-[#667085]">
                {paso === 'formulario'
                  ? 'Paso 1: Configurar ajuste'
                  : paso === 'revision'
                  ? 'Paso 2: Revisar y confirmar'
                  : 'Ajuste completado'}
              </p>
            </div>
          </div>

          <button
            id="close-adjustment-modal-btn"
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#667085] hover:text-[#15213A] hover:bg-[#15213A]/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {/* PASO 1: FORMULARIO */}
          {paso === 'formulario' && (
            <form onSubmit={handleValidarYRevisar} className="space-y-5">
              {/* Account details badge */}
              <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#15213A]/8 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#234A91]/10 text-[#234A91] flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#15213A] block">
                      {consumidor.nombre} ({consumidor.codigoCliente})
                    </span>
                    <span className="text-[11px] text-[#667085]">
                      Saldo actual: <strong className="text-[#15213A]">{formatPesos(saldoDisponibleTotal)}</strong> (Comprado: {formatPesos(consumidor.creditoComprado)} | Promocional: {formatPesos(consumidor.creditoPromocional)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Adjustment Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#15213A] mb-2">
                  Tipo de ajuste
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    id="type-credit-btn"
                    onClick={() => {
                      setTipoAjuste('credito_positivo');
                      setErrorMsg(null);
                    }}
                    className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all min-h-[64px] ${
                      tipoAjuste === 'credito_positivo'
                        ? 'border-[#234A91] bg-[#234A91]/8 text-[#234A91] shadow-xs'
                        : 'border-[#15213A]/10 bg-white text-[#667085] hover:bg-[#F7F8FC]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                      <PlusCircle className="w-4 h-4 text-[#234A91]" />
                      <span>Acreditar crédito (+)</span>
                    </div>
                    <span className="text-[11px] text-[#667085]">Suma a crédito comprado</span>
                  </button>

                  <button
                    type="button"
                    id="type-debit-btn"
                    onClick={() => {
                      setTipoAjuste('credito_negativo');
                      setErrorMsg(null);
                    }}
                    className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all min-h-[64px] ${
                      tipoAjuste === 'credito_negativo'
                        ? 'border-[#FF4F72] bg-[#FF4F72]/8 text-[#FF4F72] shadow-xs'
                        : 'border-[#15213A]/10 bg-white text-[#667085] hover:bg-[#F7F8FC]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                      <MinusCircle className="w-4 h-4 text-[#FF4F72]" />
                      <span>Descontar crédito (-)</span>
                    </div>
                    <span className="text-[11px] text-[#667085]">Debita saldo disponible</span>
                  </button>
                </div>
              </div>

              {/* Amount input */}
              <div>
                <label
                  htmlFor="input-ajuste-monto"
                  className="block text-xs font-bold uppercase tracking-wider text-[#15213A] mb-1.5"
                >
                  Importe del ajuste ($ ARS)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-[#15213A]">
                    $
                  </span>
                  <input
                    id="input-ajuste-monto"
                    type="number"
                    min="1"
                    step="1"
                    value={montoInput}
                    onChange={(e) => {
                      setMontoInput(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 text-lg font-bold rounded-xl border border-[#15213A]/15 bg-[#F7F8FC] text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#15213A] min-h-[48px]"
                  />
                </div>
                {tipoAjuste === 'credito_negativo' && (
                  <p className="text-[11px] text-[#667085] mt-1">
                    Se debitará primero el crédito promocional (${formatPesos(consumidor.creditoPromocional)}) y luego el crédito comprado.
                  </p>
                )}
              </div>

              {/* Mandatory Reason */}
              <div>
                <label
                  htmlFor="input-ajuste-motivo"
                  className="block text-xs font-bold uppercase tracking-wider text-[#15213A] mb-1.5"
                >
                  Motivo del ajuste <span className="text-[#FF4F72]">*</span>
                </label>
                <input
                  id="input-ajuste-motivo"
                  type="text"
                  value={motivo}
                  onChange={(e) => {
                    setMotivo(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="Ej: Corrección por carga accidental en caja"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#15213A]/15 bg-[#F7F8FC] text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#15213A] min-h-[44px]"
                  required
                />
              </div>

              {/* Optional Related Movement */}
              <div>
                <label
                  htmlFor="input-ajuste-ref-mov"
                  className="block text-xs font-bold uppercase tracking-wider text-[#15213A] mb-1.5"
                >
                  Movimiento relacionado (opcional)
                </label>
                <div className="space-y-2">
                  <select
                    id="select-ajuste-ref-mov"
                    value={movimientoRelacionadoId}
                    onChange={(e) => setMovimientoRelacionadoId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#15213A]/15 bg-[#F7F8FC] text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#15213A] min-h-[44px]"
                  >
                    <option value="">-- Sin referencia a movimiento --</option>
                    {movimientos.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.id} - {m.tipo.toUpperCase()} - {m.titulo} ({m.fecha} {m.hora})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rules reminder */}
              <div className="p-3.5 rounded-xl bg-[#15213A]/5 border border-[#15213A]/8 text-xs text-[#667085] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#15213A] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-[#15213A]">Regla de trazabilidad:</strong> El ajuste nunca borra operaciones anteriores. Se registrará un nuevo movimiento administrativo inmutable. Los ajustes no generan bonificación ni puntos.
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-[#FF4F72]/10 border border-[#FF4F72]/30 flex items-center gap-2 text-xs text-[#FF4F72] font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="flex-1 py-3 px-4 text-sm font-semibold text-[#172033] bg-[#FFFFFF] hover:bg-[#F7F8FC] border border-[#15213A]/15 rounded-xl transition-all min-h-[44px]"
                >
                  Cancelar
                </button>
                <button
                  id="submit-review-adjustment-btn"
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#15213A] hover:bg-[#234A91] active:scale-98 rounded-xl shadow-xs transition-all min-h-[44px]"
                >
                  <span>Revisar ajuste</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* PASO 2: REVISIÓN */}
          {paso === 'revision' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-[#15213A] font-['Outfit',sans-serif]">
                  Confirmación de la operación
                </h3>
                <p className="text-xs text-[#667085] mt-0.5">
                  Verificá los detalles antes de aplicar el cambio al saldo del cliente.
                </p>
              </div>

              <div className="space-y-2.5 bg-[#F7F8FC] rounded-2xl p-4 sm:p-5 border border-[#15213A]/8 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-[#15213A]/5">
                  <span className="text-[#667085]">Consumidor:</span>
                  <span className="font-bold text-[#15213A]">{consumidor.nombre} ({consumidor.codigoCliente})</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#15213A]/5">
                  <span className="text-[#667085]">Tipo de ajuste:</span>
                  <span
                    className={`font-bold ${
                      tipoAjuste === 'credito_positivo' ? 'text-[#234A91]' : 'text-[#FF4F72]'
                    }`}
                  >
                    {tipoAjuste === 'credito_positivo' ? '+ Acreditar crédito' : '- Descontar crédito'}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#15213A]/5">
                  <span className="text-[#667085]">Importe a ajustar:</span>
                  <span className="font-bold text-[#15213A] text-base">{formatPesos(montoNumerico)}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#15213A]/5">
                  <span className="text-[#667085]">Motivo obligatorio:</span>
                  <span className="font-semibold text-[#15213A] text-right max-w-[200px]">{motivo}</span>
                </div>

                {movimientoRelacionadoId && (
                  <div className="flex justify-between py-1 border-b border-[#15213A]/5">
                    <span className="text-[#667085]">Operación relacionada:</span>
                    <span className="font-mono font-bold text-[#234A91]">{movimientoRelacionadoId}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-[#15213A]/5">
                  <span className="text-[#667085]">Responsable:</span>
                  <span className="font-medium text-[#15213A]">Cuenta administradora demo</span>
                </div>

                <div className="flex justify-between py-1 border-b border-[#15213A]/5">
                  <span className="text-[#667085]">Saldo actual anterior:</span>
                  <span className="font-medium text-[#667085]">{formatPesos(saldoDisponibleTotal)}</span>
                </div>

                <div className="flex justify-between py-2 pt-3 font-bold">
                  <span className="text-[#15213A] text-sm">Nuevo saldo estimado:</span>
                  <span
                    className={`text-lg font-['Outfit',sans-serif] ${
                      tipoAjuste === 'credito_positivo' ? 'text-[#234A91]' : 'text-[#15213A]'
                    }`}
                  >
                    {formatPesos(nuevoSaldoEstimado)}
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-[#FF4F72]/10 border border-[#FF4F72]/30 flex items-center gap-2 text-xs text-[#FF4F72] font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPaso('formulario')}
                  className="w-full sm:flex-1 py-3 px-4 text-sm font-semibold text-[#172033] bg-[#FFFFFF] hover:bg-[#F7F8FC] border border-[#15213A]/15 rounded-xl transition-all min-h-[44px]"
                >
                  Volver a editar
                </button>

                <button
                  id="confirm-execute-adjustment-btn"
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmarAjuste}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#15213A] hover:bg-[#234A91] active:scale-98 rounded-xl shadow-xs transition-all min-h-[44px] disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? 'Aplicando...' : 'Confirmar ajuste'}</span>
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: ÉXITO */}
          {paso === 'exito' && resultado && (
            <div className="text-center space-y-5 py-2">
              <div className="w-14 h-14 rounded-2xl bg-[#234A91]/10 text-[#234A91] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
                  Ajuste registrado con éxito
                </h3>
                <p className="text-xs sm:text-sm text-[#667085] mt-1">
                  Se generó un nuevo movimiento administrativo y se actualizó el saldo del consumidor.
                </p>
              </div>

              <div className="bg-[#F7F8FC] rounded-2xl p-4 border border-[#15213A]/8 text-left space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-[#667085]">ID del movimiento:</span>
                  <span className="font-mono font-bold text-[#15213A]">{resultado.nuevoMovimiento.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Saldo anterior:</span>
                  <span className="font-medium text-[#667085]">{formatPesos(resultado.nuevoMovimiento.saldoAnterior || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Monto ajustado:</span>
                  <span
                    className={`font-bold ${
                      resultado.nuevoMovimiento.tipoAjuste === 'credito_positivo' ? 'text-[#234A91]' : 'text-[#FF4F72]'
                    }`}
                  >
                    {resultado.nuevoMovimiento.tipoAjuste === 'credito_positivo' ? '+' : '-'}
                    {formatPesos(resultado.nuevoMovimiento.importeEntregado || resultado.nuevoMovimiento.creditoUtilizado || 0)}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#15213A]/8 flex justify-between font-bold text-sm">
                  <span className="text-[#15213A]">Nuevo saldo disponible:</span>
                  <span className="text-[#234A91] text-base font-['Outfit',sans-serif]">
                    {formatPesos(resultado.nuevoPerfil.creditoComprado + resultado.nuevoPerfil.creditoPromocional)}
                  </span>
                </div>
              </div>

              <button
                id="close-adjustment-success-btn"
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#15213A] hover:bg-[#234A91] rounded-xl shadow-xs transition-all min-h-[44px]"
              >
                Cerrar y actualizar vista
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
