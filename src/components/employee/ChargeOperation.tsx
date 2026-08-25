import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ConsumidorPerfil, EmpleadoPerfil, MovimientoRegistro } from '../../types';
import {
  formatPesos,
  registrarCargaPresencial,
} from '../../data/consumerStore';
import {
  ArrowDownLeft,
  CheckCircle2,
  AlertCircle,
  User,
  Sparkles,
} from 'lucide-react';

interface ChargeOperationProps {
  consumidor: ConsumidorPerfil;
  empleado: EmpleadoPerfil;
  onSuccess: (nuevoPerfil: ConsumidorPerfil, nuevoMovimiento: MovimientoRegistro) => void;
  onCancel: () => void;
  onNewOperation: () => void;
}

type Step = 'ingreso' | 'revision' | 'confirmacion';

export const ChargeOperation: React.FC<ChargeOperationProps> = ({
  consumidor,
  empleado,
  onSuccess,
  onCancel,
  onNewOperation,
}) => {
  const [paso, setPaso] = useState<Step>('ingreso');
  const [montoInput, setMontoInput] = useState<string>('5000');
  const [errorInput, setErrorInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultado, setResultado] = useState<{
    nuevoPerfil: ConsumidorPerfil;
    nuevoMovimiento: MovimientoRegistro;
  } | null>(null);

  const saldoAnterior = consumidor.creditoComprado + consumidor.creditoPromocional;
  const montoNumerico = parseFloat(montoInput) || 0;
  const bonificacion = Math.round(montoNumerico * 0.1);
  const creditoTotalAcreditar = montoNumerico + bonificacion;
  const saldoNuevoEstimado = saldoAnterior + creditoTotalAcreditar;

  const handlePasoRevision = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorInput(null);

    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      setErrorInput('El importe debe ser mayor a cero.');
      return;
    }

    setPaso('revision');
  };

  const handleConfirmarCarga = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = registrarCargaPresencial(montoNumerico, empleado, consumidor);
      setResultado(res);
      setPaso('confirmacion');
      onSuccess(res.nuevoPerfil, res.nuevoMovimiento);
    } catch (err) {
      console.error(err);
      setErrorInput('Ocurrió un error al registrar la carga.');
      setPaso('ingreso');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="charge-operation-view" className="max-w-xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-[#15213A]/8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#234A91] flex items-center justify-center text-white shadow-xs">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
              Registrar carga presencial
            </h1>
            <p className="text-xs text-[#667085]">
              Paso {paso === 'ingreso' ? '1 de 3' : paso === 'revision' ? '2 de 3' : '3 de 3'}
            </p>
          </div>
        </div>

        {paso !== 'confirmacion' && (
          <button
            id="cancel-charge-btn"
            onClick={onCancel}
            className="text-xs font-semibold text-[#667085] hover:text-[#15213A] p-2 min-h-[44px] flex items-center"
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Consumer Quick Badge */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#234A91]/10 flex items-center justify-center text-[#234A91] font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-[#15213A] block font-['Outfit',sans-serif]">
              {consumidor.nombre}
            </span>
            <span className="text-xs font-mono text-[#234A91]">
              {consumidor.codigoCliente}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-[#667085] block">Saldo actual</span>
          <span className="text-sm font-bold text-[#15213A]">
            {formatPesos(saldoAnterior)}
          </span>
        </div>
      </div>

      {/* PASO 1: INGRESO DEL IMPORTE */}
      {paso === 'ingreso' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-6 sm:p-7 shadow-xs"
        >
          <form onSubmit={handlePasoRevision} className="space-y-6">
            <div>
              <label
                htmlFor="input-monto-carga"
                className="block text-xs font-bold uppercase tracking-wider text-[#15213A] mb-2"
              >
                Importe entregado por el cliente ($ ARS)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-[#15213A]">
                  $
                </span>
                <input
                  id="input-monto-carga"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  value={montoInput}
                  onChange={(e) => {
                    setMontoInput(e.target.value);
                    setErrorInput(null);
                  }}
                  placeholder="0"
                  autoFocus
                  className="w-full pl-9 pr-4 py-3.5 text-2xl font-bold rounded-xl border border-[#15213A]/15 bg-[#F7F8FC] text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#234A91] min-h-[52px]"
                />
              </div>
            </div>

            {/* Quick shortcuts */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#667085]">Atajos:</span>
              {[2000, 5000, 10000, 20000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setMontoInput(String(val))}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F7F8FC] hover:bg-[#234A91]/10 text-[#172033] border border-[#15213A]/10 transition-colors min-h-[36px]"
                >
                  +{formatPesos(val)}
                </button>
              ))}
            </div>

            {/* Fixed 10% bonus explanation card */}
            <div className="p-4 rounded-xl bg-[#234A91]/8 border border-[#234A91]/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#234A91] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#F5A623]" />
                  Bonificación automática fija (10%)
                </span>
                <span className="text-[#234A91] font-bold">
                  +{formatPesos(bonificacion)}
                </span>
              </div>
              <p className="text-xs text-[#667085] leading-relaxed">
                El empleado no puede modificar este porcentaje. El importe entregado suma a crédito comprado y la bonificación suma a crédito promocional (vence a los 90 días).
              </p>
            </div>

            {errorInput && (
              <div className="p-3.5 rounded-xl bg-[#FF4F72]/10 border border-[#FF4F72]/30 flex items-center gap-2.5 text-xs text-[#FF4F72] font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorInput}</span>
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                id="charge-step1-cancel-btn"
                type="button"
                onClick={onCancel}
                className="flex-1 py-3.5 px-4 text-sm font-semibold text-[#172033] bg-[#FFFFFF] hover:bg-[#F7F8FC] border border-[#15213A]/15 rounded-xl transition-all min-h-[48px]"
              >
                Volver
              </button>
              <button
                id="charge-step1-continue-btn"
                type="submit"
                disabled={montoNumerico <= 0}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-[#234A91] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
              >
                <span>Revisar operación</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* PASO 2: REVISIÓN */}
      {paso === 'revision' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6"
        >
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
              Revisá los datos antes de confirmar
            </h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Verificá el importe y los saldos calculados para la cuenta.
            </p>
          </div>

          <div className="space-y-3 bg-[#F7F8FC] rounded-2xl p-4 sm:p-5 border border-[#15213A]/8 text-xs sm:text-sm">
            <div className="flex justify-between py-1.5 border-b border-[#15213A]/5">
              <span className="text-[#667085]">Consumidor:</span>
              <span className="font-bold text-[#15213A]">{consumidor.nombre} ({consumidor.codigoCliente})</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#15213A]/5">
              <span className="text-[#667085]">Comercio emisor:</span>
              <span className="font-bold text-[#15213A]">{empleado.comercioAsignado}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#15213A]/5">
              <span className="text-[#667085]">Empleado a cargo:</span>
              <span className="font-bold text-[#15213A]">{empleado.nombre} ({empleado.codigo})</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#15213A]/5">
              <span className="text-[#667085]">Importe recibido:</span>
              <span className="font-bold text-[#15213A]">{formatPesos(montoNumerico)}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#15213A]/5">
              <span className="text-[#667085]">Bonificación (10%):</span>
              <span className="font-bold text-[#F5A623]">+{formatPesos(bonificacion)}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#15213A]/5">
              <span className="text-[#667085]">Total a acreditar:</span>
              <span className="font-bold text-[#234A91] text-base">+{formatPesos(creditoTotalAcreditar)}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-[#15213A]/5">
              <span className="text-[#667085]">Saldo anterior:</span>
              <span className="font-medium text-[#667085]">{formatPesos(saldoAnterior)}</span>
            </div>

            <div className="flex justify-between py-2 pt-3 font-bold">
              <span className="text-[#15213A] text-sm">Nuevo saldo estimado:</span>
              <span className="text-[#234A91] text-lg font-['Outfit',sans-serif]">
                {formatPesos(saldoNuevoEstimado)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              id="charge-step2-back-btn"
              type="button"
              onClick={() => setPaso('ingreso')}
              className="w-full sm:flex-1 py-3.5 px-4 text-sm font-semibold text-[#172033] bg-[#FFFFFF] hover:bg-[#F7F8FC] border border-[#15213A]/15 rounded-xl transition-all min-h-[48px]"
            >
              Volver y corregir
            </button>

            <button
              id="charge-step2-confirm-btn"
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmarCarga}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-[#234A91] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-xs transition-all min-h-[48px]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Registrando...' : 'Confirmar carga'}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* PASO 3: CONFIRMACIÓN */}
      {paso === 'confirmacion' && resultado && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-6 sm:p-8 shadow-sm text-center space-y-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#234A91]/10 text-[#234A91] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
              Carga registrada correctamente
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              El saldo y el movimiento han sido guardados permanentemente en la cuenta.
            </p>
          </div>

          <div className="bg-[#F7F8FC] rounded-2xl p-5 border border-[#15213A]/8 text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-[#667085]">Saldo anterior:</span>
              <span className="font-medium text-[#667085]">{formatPesos(resultado.nuevoMovimiento.saldoAnterior || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#667085]">Importe recibido:</span>
              <span className="font-bold text-[#15213A]">{formatPesos(resultado.nuevoMovimiento.importeEntregado || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#667085]">Bonificación acreditada:</span>
              <span className="font-bold text-[#F5A623]">+{formatPesos(resultado.nuevoMovimiento.bonificacion || 0)}</span>
            </div>
            <div className="pt-2 border-t border-[#15213A]/8 flex justify-between font-bold text-sm">
              <span className="text-[#15213A]">Saldo nuevo total:</span>
              <span className="text-[#234A91] text-lg font-['Outfit',sans-serif]">
                {formatPesos(resultado.nuevoPerfil.creditoComprado + resultado.nuevoPerfil.creditoPromocional)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              id="charge-step3-back-consumer-btn"
              type="button"
              onClick={onCancel}
              className="w-full sm:flex-1 py-3.5 px-4 text-sm font-semibold text-[#172033] bg-[#FFFFFF] hover:bg-[#F7F8FC] border border-[#15213A]/15 rounded-xl transition-all min-h-[48px]"
            >
              Volver al consumidor
            </button>

            <button
              id="charge-step3-new-operation-btn"
              type="button"
              onClick={onNewOperation}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-[#234A91] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-xs transition-all min-h-[48px]"
            >
              <span>Nueva operación</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
