import React from 'react';
import { motion } from 'motion/react';
import { BeneficioItem, ConsumidorPerfil } from '../../types';
import { CATALOGO_BENEFICIOS } from '../../data/consumerStore';
import {
  Gift,
  Percent,
  Sparkles,
  Ticket,
  Lock,
  Info,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

interface ConsumerBenefitsProps {
  perfil: ConsumidorPerfil;
}

export const ConsumerBenefits: React.FC<ConsumerBenefitsProps> = ({ perfil }) => {
  const puntosActuales = perfil.puntos;

  const getIcon = (tipo: BeneficioItem['tipo']) => {
    switch (tipo) {
      case 'descuento':
        return <Percent className="w-5 h-5" />;
      case 'producto':
        return <Gift className="w-5 h-5" />;
      case 'sorteo':
        return <Ticket className="w-5 h-5" />;
    }
  };

  const getColor = (tipo: BeneficioItem['tipo']) => {
    switch (tipo) {
      case 'descuento':
        return '#234A91';
      case 'producto':
        return '#D92D8A';
      case 'sorteo':
        return '#F5A623';
    }
  };

  return (
    <div id="consumer-benefits-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
            Catálogo de beneficios
          </h1>
          <p className="text-sm text-[#667085] mt-0.5">
            Canjeá tus puntos acumulados por descuentos, productos y sorteos.
          </p>
        </div>

        {/* User points pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#FFFFFF] border border-[#D92D8A]/30 shadow-xs self-start sm:self-auto">
          <div className="w-7 h-7 rounded-lg bg-[#D92D8A]/10 flex items-center justify-center text-[#D92D8A]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-[#667085] block leading-none font-medium">
              Tenés disponible
            </span>
            <span className="text-base font-bold text-[#D92D8A] font-['Outfit',sans-serif] leading-tight">
              {puntosActuales} puntos
            </span>
          </div>
        </div>
      </div>

      {/* Simulated Benefits Notice */}
      <div
        id="benefits-simulation-notice"
        className="p-4 rounded-2xl bg-[#234A91]/8 border border-[#234A91]/20 flex items-start gap-3"
      >
        <Info className="w-5 h-5 text-[#234A91] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#172033]">
          <span className="font-bold text-[#234A91]">Demostración de catálogo:</span>{' '}
          Los beneficios son simulados y el canje operativo estará habilitado en una próxima etapa. Podés visualizar tu progreso hacia cada recompensa según tus puntos acumulados.
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {CATALOGO_BENEFICIOS.map((ben, idx) => {
          const puntosFaltantes = Math.max(0, ben.puntosRequeridos - puntosActuales);
          const progresoPct = Math.min(100, Math.round((puntosActuales / ben.puntosRequeridos) * 100));
          const color = getColor(ben.tipo);

          return (
            <motion.div
              key={ben.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              id={`benefit-card-${ben.id}`}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 shadow-xs hover:border-[#15213A]/20 transition-all relative overflow-hidden"
            >
              <div>
                {/* Category & Icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-2xs"
                    style={{ backgroundColor: color }}
                  >
                    {getIcon(ben.tipo)}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F7F8FC] text-[#667085] border border-[#15213A]/6">
                    {ben.categoria}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
                  {ben.titulo}
                </h3>
                <p className="text-xs font-semibold mt-0.5" style={{ color: color }}>
                  {ben.subtitulo}
                </p>

                <p className="text-xs sm:text-sm text-[#667085] mt-3 leading-relaxed">
                  {ben.descripcion}
                </p>
              </div>

              {/* Progress and Action Footer */}
              <div className="mt-6 pt-5 border-t border-[#15213A]/8">
                {/* Progress bar */}
                <div className="mb-3.5">
                  <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                    <span className="text-[#667085]">Progreso ({puntosActuales}/{ben.puntosRequeridos} pts)</span>
                    <span className="font-bold text-[#15213A]">{progresoPct}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#F7F8FC] border border-[#15213A]/8 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progresoPct}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>

                {/* Missing points badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F7F8FC] border border-[#15213A]/6 text-xs text-[#667085]">
                    <Lock className="w-3.5 h-3.5 text-[#667085]" />
                    <span className="font-semibold text-[#172033]">
                      Te faltan {puntosFaltantes} {puntosFaltantes === 1 ? 'punto' : 'puntos'}
                    </span>
                  </div>
                </div>

                {/* Redeem button (disabled) */}
                <button
                  id={`redeem-benefit-${ben.id}-btn`}
                  disabled={true}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-[#667085] bg-[#F7F8FC] border border-[#15213A]/10 cursor-not-allowed opacity-75 min-h-[44px]"
                  title="Los canjes se habilitarán en la próxima versión"
                >
                  <Lock className="w-4 h-4" />
                  <span>Canje no disponible en demo</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* How to accumulate points helper card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 shadow-xs">
        <h3 className="text-sm font-bold text-[#15213A] mb-3 font-['Outfit',sans-serif] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D92D8A]" />
          ¿Cómo sumar más puntos para canjear beneficios?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#667085]">
          <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5">
            <span className="font-bold text-[#15213A] block mb-1">1. Compras con saldo</span>
            Sumás puntos automáticamente con cada compra abonada con tu saldo Conectando.
          </div>
          <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5">
            <span className="font-bold text-[#15213A] block mb-1">2. Bonificaciones</span>
            Las cargas presenciales especiales pueden incluir puntos y crédito promocional extra.
          </div>
          <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5">
            <span className="font-bold text-[#15213A] block mb-1">3. Válido en los 4 locales</span>
            Los puntos se acumulan en una sola cuenta y podés canjearlos en cualquier comercio.
          </div>
        </div>
      </div>
    </div>
  );
};
