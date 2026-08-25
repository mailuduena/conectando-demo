import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ConsumidorPerfil } from '../../types';
import { buscarConsumidorPorCodigo } from '../../data/consumerStore';
import {
  QrCode,
  Search,
  User,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ScanLine,
} from 'lucide-react';

interface IdentifyConsumerProps {
  onConsumerIdentified: (consumidor: ConsumidorPerfil) => void;
}

export const IdentifyConsumer: React.FC<IdentifyConsumerProps> = ({
  onConsumerIdentified,
}) => {
  const [metodo, setMetodo] = useState<'codigo' | 'scan'>('codigo');
  const [codigoInput, setCodigoInput] = useState('CON-0001');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const found = buscarConsumidorPorCodigo(codigoInput);
    if (found) {
      onConsumerIdentified(found);
    } else {
      setErrorMsg('No encontramos un consumidor con ese código');
    }
  };

  const handleSimulateScan = () => {
    setErrorMsg(null);
    setIsScanning(true);
    setScanSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      setTimeout(() => {
        const found = buscarConsumidorPorCodigo('CON-0001');
        if (found) {
          onConsumerIdentified(found);
        }
      }, 700);
    }, 1200);
  };

  return (
    <div id="identify-consumer-view" className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
          Identificar consumidor
        </h1>
        <p className="text-sm text-[#667085] mt-1">
          Ingresá el código del cliente o utilizá el escaneo rápido simulado.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center p-1 bg-[#FFFFFF] rounded-2xl border border-[#15213A]/10 shadow-xs">
        <button
          id="tab-identify-code-btn"
          onClick={() => {
            setMetodo('codigo');
            setErrorMsg(null);
          }}
          className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
            metodo === 'codigo'
              ? 'bg-[#234A91] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#15213A] hover:bg-[#F7F8FC]'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Ingresar código</span>
        </button>

        <button
          id="tab-identify-scan-btn"
          onClick={() => {
            setMetodo('scan');
            setErrorMsg(null);
          }}
          className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
            metodo === 'scan'
              ? 'bg-[#234A91] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#15213A] hover:bg-[#F7F8FC]'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Escanear QR</span>
        </button>
      </div>

      {/* Method 1: Manual Code Input */}
      {metodo === 'codigo' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-6 sm:p-7 shadow-xs"
        >
          <form onSubmit={handleManualSearch} className="space-y-5">
            <div>
              <label
                htmlFor="input-codigo-cliente"
                className="block text-xs font-bold uppercase tracking-wider text-[#15213A] mb-2"
              >
                Código del consumidor
              </label>
              <div className="relative">
                <input
                  id="input-codigo-cliente"
                  type="text"
                  value={codigoInput}
                  onChange={(e) => {
                    setCodigoInput(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="Ej: CON-0001"
                  autoFocus
                  className="w-full px-4 py-3.5 text-base sm:text-lg font-mono font-bold rounded-xl border border-[#15213A]/15 bg-[#F7F8FC] text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#234A91] focus:border-transparent transition-all placeholder:text-[#667085]/50 min-h-[48px]"
                />
              </div>
              <p className="text-xs text-[#667085] mt-1.5">
                Podés escribir en mayúsculas o minúsculas (Ej: <span className="font-mono text-[#234A91]">con-0001</span> o <span className="font-mono text-[#234A91]">CON-0001</span>).
              </p>
            </div>

            {errorMsg && (
              <div
                id="search-error-message"
                className="p-3.5 rounded-xl bg-[#FF4F72]/10 border border-[#FF4F72]/30 flex items-center gap-2.5 text-xs sm:text-sm text-[#FF4F72] font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              id="search-consumer-submit-btn"
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#234A91] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-xs transition-all min-h-[48px]"
            >
              <Search className="w-4 h-4" />
              <span>Buscar consumidor</span>
            </button>
          </form>
        </motion.div>
      )}

      {/* Method 2: Simulated QR Scan */}
      {metodo === 'scan' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-6 sm:p-8 shadow-xs text-center flex flex-col items-center"
        >
          {/* Visual Scanner Area */}
          <div className="relative w-48 h-48 rounded-2xl bg-[#15213A] border-2 border-[#234A91]/40 flex flex-col items-center justify-center text-white overflow-hidden shadow-inner my-2">
            {isScanning ? (
              <div className="flex flex-col items-center gap-3">
                <ScanLine className="w-12 h-12 text-[#FF4F72] animate-pulse" />
                <span className="text-xs font-semibold text-white/90">
                  Escaneando código...
                </span>
                <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF4F72] animate-pulse w-full"></div>
                </div>
              </div>
            ) : scanSuccess ? (
              <div className="flex flex-col items-center gap-2 text-[#234A91] bg-white p-4 rounded-xl shadow-sm">
                <CheckCircle2 className="w-10 h-10 text-[#234A91]" />
                <span className="text-xs font-bold text-[#15213A]">
                  Escaneo simulado completado
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <QrCode className="w-12 h-12 text-white/80" />
                <span className="text-xs text-white/70">
                  Simulador de lector QR
                </span>
              </div>
            )}

            {/* Visual Corner Markers */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#FF4F72]"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#FF4F72]"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#FF4F72]"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#FF4F72]"></div>
          </div>

          <p className="text-xs text-[#667085] mt-4 max-w-sm">
            La simulación no accede a la cámara de tu dispositivo. Al presionar el botón se detectará la cuenta de demostración.
          </p>

          <button
            id="simulate-scan-action-btn"
            type="button"
            disabled={isScanning}
            onClick={handleSimulateScan}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#D92D8A] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-xs transition-all min-h-[48px]"
          >
            <ScanLine className="w-4 h-4" />
            <span>{isScanning ? 'Escaneando...' : 'Iniciar escaneo simulado'}</span>
          </button>
        </motion.div>
      )}

      {/* Helper demo account pill */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 shadow-xs flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#234A91]/10 flex items-center justify-center text-[#234A91] font-bold">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[#667085] block">Consumidor de prueba:</span>
            <span className="font-bold text-[#15213A]">Sofía Martínez</span>
          </div>
        </div>
        <button
          onClick={() => {
            setMetodo('codigo');
            setCodigoInput('CON-0001');
            const found = buscarConsumidorPorCodigo('CON-0001');
            if (found) onConsumerIdentified(found);
          }}
          className="font-mono font-bold text-xs text-[#234A91] bg-[#234A91]/8 hover:bg-[#234A91]/15 px-3 py-1.5 rounded-lg transition-colors min-h-[36px] flex items-center"
        >
          CON-0001 (Auto-cargar)
        </button>
      </div>
    </div>
  );
};
