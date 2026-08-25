import React from 'react';
import { motion } from 'motion/react';
import { ConsumidorPerfil, MovimientoRegistro, ConsumidorTab } from '../../types';
import { formatPesos } from '../../data/consumerStore';
import {
  Wallet,
  Sparkles,
  QrCode,
  Gift,
  ArrowRight,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  Info,
  Calendar,
  ChevronRight,
  Receipt,
  Store,
} from 'lucide-react';

interface ConsumerHomeProps {
  perfil: ConsumidorPerfil;
  movimientos: MovimientoRegistro[];
  onNavigateTab: (tab: ConsumidorTab) => void;
}

export const ConsumerHome: React.FC<ConsumerHomeProps> = ({
  perfil,
  movimientos,
  onNavigateTab,
}) => {
  const saldoTotal = perfil.creditoComprado + perfil.creditoPromocional;
  const ultimosMovimientos = movimientos.slice(0, 3);

  return (
    <div id="consumer-home-view" className="space-y-6">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
            Hola, {perfil.nombre.split(' ')[0]}
          </h1>
          <p className="text-sm text-[#667085] mt-0.5">
            Este es el resumen de tu cuenta.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#15213A]/10 text-xs text-[#667085] self-start sm:self-auto shadow-2xs">
          <span className="font-semibold text-[#15213A]">Código:</span>
          <span className="font-mono font-medium text-[#234A91]">{perfil.codigoCliente}</span>
        </div>
      </div>

      {/* Main Balance & Points Bento Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Balance Card (Span 2) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          id="main-balance-card"
          className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-[#15213A] to-[#234A91] text-white p-6 sm:p-7 shadow-md flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 -mb-12 w-36 h-36 rounded-full bg-[#FF4F72]/10 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white backdrop-blur-xs">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">
                  Saldo disponible
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white border border-white/10">
                Red 4 locales
              </span>
            </div>

            <div className="mt-3">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-['Outfit',sans-serif]">
                {formatPesos(saldoTotal)}
              </span>
            </div>

            {/* Breakdown */}
            <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Comprado */}
              <div className="bg-white/10 rounded-xl p-3.5 backdrop-blur-xs border border-white/10">
                <span className="text-xs text-white/70 block">Crédito comprado</span>
                <span className="text-lg sm:text-xl font-bold text-white mt-0.5 block font-['Outfit',sans-serif]">
                  {formatPesos(perfil.creditoComprado)}
                </span>
                <span className="text-[11px] text-white/60 mt-1 block">Sin vencimiento</span>
              </div>

              {/* Promocional */}
              <div className="bg-white/10 rounded-xl p-3.5 backdrop-blur-xs border border-[#F5A623]/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/80 font-medium">Crédito promocional</span>
                  <span className="w-2 h-2 rounded-full bg-[#F5A623]"></span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-[#F5A623] mt-0.5 block font-['Outfit',sans-serif]">
                  {formatPesos(perfil.creditoPromocional)}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-white/70 mt-1">
                  <Calendar className="w-3 h-3 text-[#F5A623]" />
                  <span>Vence el {perfil.vencimientoPromocional}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clarification note */}
          <div className="mt-5 flex items-start gap-2 bg-black/20 rounded-xl p-3 text-xs text-white/85 border border-white/10">
            <Info className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
            <p className="leading-snug">
              El crédito promocional se utiliza primero cuando está próximo a vencer.
            </p>
          </div>
        </motion.div>

        {/* Points Card (Col 1) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          id="consumer-points-card"
          className="rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#D92D8A]/10 flex items-center justify-center text-[#D92D8A]">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#D92D8A]/10 text-[#D92D8A]">
                Fidelización
              </span>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-[#667085]">
              Puntos acumulados
            </h3>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
                {perfil.puntos}
              </span>
              <span className="text-sm font-semibold text-[#667085]">puntos</span>
            </div>

            <p className="text-xs text-[#667085] mt-3 leading-relaxed">
              Sumás 1 punto por cada $1.000 gastados en compras con tu saldo Conectando.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#15213A]/8">
            <button
              id="home-explore-benefits-card-btn"
              onClick={() => onNavigateTab('beneficios')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#D92D8A] bg-[#D92D8A]/10 hover:bg-[#D92D8A]/15 active:scale-98 rounded-xl transition-all min-h-[44px]"
            >
              <Gift className="w-4 h-4" />
              <span>Explorar catálogo de premios</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Quick Access Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          id="home-quick-qr-btn"
          onClick={() => onNavigateTab('qr')}
          className="flex items-center justify-between p-5 rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 hover:border-[#234A91]/40 shadow-xs hover:shadow-sm transition-all text-left group min-h-[64px]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#234A91] text-white flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-xs">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#15213A] block font-['Outfit',sans-serif]">
                Ver mi QR
              </span>
              <span className="text-xs text-[#667085]">
                Mostralo en caja para identificarte
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#667085] group-hover:text-[#234A91] group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>

        <button
          id="home-quick-benefits-btn"
          onClick={() => onNavigateTab('beneficios')}
          className="flex items-center justify-between p-5 rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 hover:border-[#D92D8A]/40 shadow-xs hover:shadow-sm transition-all text-left group min-h-[64px]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#D92D8A] text-white flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-xs">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#15213A] block font-['Outfit',sans-serif]">
                Explorar beneficios
              </span>
              <span className="text-xs text-[#667085]">
                Revisá descuentos y premios disponibles
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#667085] group-hover:text-[#D92D8A] group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>
      </div>

      {/* Recent Movements Section */}
      <div className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-5 border-b border-[#15213A]/8 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#15213A]/5 flex items-center justify-center text-[#15213A]">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
                Últimos movimientos
              </h2>
              <span className="text-xs text-[#667085]">Actividad reciente en los comercios</span>
            </div>
          </div>

          <button
            id="home-view-all-movements-btn"
            onClick={() => onNavigateTab('movimientos')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#234A91] hover:text-[#15213A] transition-colors p-2 min-h-[44px]"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Movements list cards */}
        <div className="space-y-3">
          {ultimosMovimientos.map((mov) => {
            const isCarga = mov.tipo === 'carga';
            return (
              <div
                key={mov.id}
                id={`recent-mov-${mov.id}`}
                className="p-4 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#15213A]/15 transition-all"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white shadow-2xs ${
                      isCarga ? 'bg-[#234A91]' : 'bg-[#FF4F72]'
                    }`}
                  >
                    {isCarga ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#15213A]">
                        {mov.titulo}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCarga
                            ? 'bg-[#234A91]/10 text-[#234A91]'
                            : 'bg-[#FF4F72]/10 text-[#FF4F72]'
                        }`}
                      >
                        {isCarga ? 'Carga' : 'Compra'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#667085] mt-1 flex-wrap">
                      <span className="inline-flex items-center gap-1 font-medium text-[#172033]">
                        <Store className="w-3 h-3 text-[#667085]" />
                        {mov.comercio}
                      </span>
                      <span>•</span>
                      <span>{mov.fecha}, {mov.hora}</span>
                      <span>•</span>
                      <span>Atendió: {mov.empleado}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:self-center pl-13 sm:pl-0">
                  {isCarga ? (
                    <div>
                      <span className="text-base font-bold text-[#234A91] block font-['Outfit',sans-serif]">
                        +{formatPesos(mov.creditoAcreditado || 0)}
                      </span>
                      {mov.bonificacion && (
                        <span className="text-[11px] text-[#F5A623] font-medium block">
                          Incluye bonif. +{formatPesos(mov.bonificacion)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="text-base font-bold text-[#15213A] block font-['Outfit',sans-serif]">
                        -{formatPesos(mov.creditoUtilizado || 0)}
                      </span>
                      {mov.puntosObtenidos && (
                        <span className="text-[11px] text-[#D92D8A] font-semibold block">
                          +{mov.puntosObtenidos} pts sumados
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
