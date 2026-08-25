import React from 'react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { ConsumidorPerfil } from '../../types';
import {
  QrCode,
  ShieldAlert,
  User,
  CheckCircle2,
  Copy,
  Sparkles,
  Info,
} from 'lucide-react';

interface ConsumerQRProps {
  perfil: ConsumidorPerfil;
}

export const ConsumerQR: React.FC<ConsumerQRProps> = ({ perfil }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(perfil.codigoCliente);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="consumer-qr-view" className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
          Mi QR de Identificación
        </h1>
        <p className="text-sm text-[#667085] mt-1">
          Mostrá este código al empleado para identificar tu cuenta.
        </p>
      </div>

      {/* Main QR Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        id="qr-identification-card"
        className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Top Header inside Card */}
        <div className="w-full flex items-center justify-between border-b border-[#15213A]/8 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#234A91] flex items-center justify-center text-white text-xs font-bold">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs text-[#667085] block leading-none">Titular</span>
              <span className="text-sm font-bold text-[#15213A] font-['Outfit',sans-serif]">
                {perfil.nombre}
              </span>
            </div>
          </div>

          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#234A91]/8 text-[#234A91] border border-[#234A91]/15">
            Cuenta activa
          </span>
        </div>

        {/* QR Code Container with High Contrast & Safe Margins */}
        <div
          id="qr-code-canvas-container"
          className="p-5 bg-[#FFFFFF] rounded-2xl border-2 border-dashed border-[#234A91]/30 shadow-inner my-2 flex items-center justify-center"
        >
          <QRCodeSVG
            value={`CONECTANDO:${perfil.codigoCliente}:${perfil.nombre}`}
            size={200}
            bgColor="#FFFFFF"
            fgColor="#15213A"
            level="M"
            includeMargin={false}
          />
        </div>

        {/* Client Code Display */}
        <div className="mt-6 w-full flex flex-col items-center">
          <span className="text-xs text-[#667085] uppercase tracking-wider font-semibold">
            Código de cliente
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-mono font-bold text-[#234A91] tracking-wider">
              {perfil.codigoCliente}
            </span>
            <button
              id="copy-client-code-btn"
              onClick={handleCopyCode}
              aria-label="Copiar código"
              className="p-1.5 rounded-lg text-[#667085] hover:text-[#234A91] hover:bg-[#F7F8FC] transition-colors"
              title="Copiar código"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-[#234A91]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          {copied && (
            <span className="text-[11px] text-[#234A91] font-medium mt-0.5">
              ¡Código copiado al portapapeles!
            </span>
          )}
        </div>

        {/* Subtitle helper */}
        <div className="mt-5 p-3 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5 w-full text-xs text-[#667085] flex items-center justify-center gap-2">
          <QrCode className="w-4 h-4 text-[#234A91] shrink-0" />
          <span>Válido en los 4 locales adheridos</span>
        </div>
      </motion.div>

      {/* Security and Demo Disclaimer Notice */}
      <div
        id="qr-demo-warning-banner"
        className="p-4 rounded-2xl bg-[#15213A]/5 border border-[#15213A]/10 text-xs sm:text-sm text-[#667085] flex items-start gap-3"
      >
        <ShieldAlert className="w-5 h-5 text-[#15213A]/70 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-[#15213A]">Aviso de demostración:</span>{' '}
          Este QR pertenece a una cuenta de demostración y no permite realizar pagos. Se utiliza exclusivamente para que el empleado identifique al cliente en el punto de atención.
        </div>
      </div>
    </div>
  );
};
