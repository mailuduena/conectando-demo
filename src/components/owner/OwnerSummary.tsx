import React from 'react';
import { motion } from 'motion/react';
import { ConsumidorPerfil, MovimientoRegistro, OwnerTab } from '../../types';
import { LOCALES_DEMO, EMPLEADOS_DEMO, formatPesos } from '../../data/consumerStore';
import {
  Users,
  Store,
  Wallet,
  Sparkles,
  ArrowUpRight,
  ShoppingBag,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  Percent,
  CheckCircle2,
  Receipt,
  Gift,
  ShieldCheck,
} from 'lucide-react';

interface OwnerSummaryProps {
  consumidor: ConsumidorPerfil;
  movimientos: MovimientoRegistro[];
  onNavigateTab: (tab: OwnerTab) => void;
  onOpenAdjustment: () => void;
}

export const OwnerSummary: React.FC<OwnerSummaryProps> = ({
  consumidor,
  movimientos,
  onNavigateTab,
  onOpenAdjustment,
}) => {
  // Metrics calculated dynamically from real localStorage
  const totalCargas = movimientos.filter((m) => m.tipo === 'carga');
  const totalCompras = movimientos.filter((m) => m.tipo === 'compra');
  const totalAjustes = movimientos.filter((m) => m.tipo === 'ajuste');

  const dineroRecibido = totalCargas.reduce((sum, m) => sum + (m.importeEntregado || 0), 0);
  const creditoPromocionalEntregado = totalCargas.reduce((sum, m) => sum + (m.bonificacion || 0), 0);
  const creditoAcreditadoTotal = totalCargas.reduce((sum, m) => sum + (m.creditoAcreditado || (m.importeEntregado || 0) + (m.bonificacion || 0)), 0);
  const creditoUtilizadoCompras = totalCompras.reduce((sum, m) => sum + (m.creditoUtilizado || 0), 0);
  const puntosGenerados = movimientos.reduce((sum, m) => sum + (m.puntosObtenidos || 0), 0);

  // Performance per store
  const storeMetrics = LOCALES_DEMO.map((local) => {
    const movsLocal = movimientos.filter((m) => m.comercio === local.nombre);
    const cargasCount = movsLocal.filter((m) => m.tipo === 'carga').length;
    const comprasCount = movsLocal.filter((m) => m.tipo === 'compra').length;
    const dinero = movsLocal.filter((m) => m.tipo === 'carga').reduce((acc, m) => acc + (m.importeEntregado || 0), 0);
    const consumo = movsLocal.filter((m) => m.tipo === 'compra').reduce((acc, m) => acc + (m.creditoUtilizado || 0), 0);
    return {
      ...local,
      totalMovimientos: movsLocal.length,
      cargasCount,
      comprasCount,
      dinero,
      consumo,
    };
  });

  const maxVolume = Math.max(...storeMetrics.map((s) => Math.max(s.dinero, s.consumo, 1000)));

  return (
    <div id="owner-summary-view" className="space-y-6 sm:space-y-8">
      {/* Top Banner / CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-linear-to-r from-[#15213A] to-[#234A91] text-white shadow-md">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-2 backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D92D8A]" />
            <span>Control central de la red</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif]">
            Resumen general del programa
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
            Métricas consolidadas en tiempo real calculadas sobre las operaciones de los 4 comercios.
          </p>
        </div>

        <button
          id="summary-open-adjustment-btn"
          onClick={onOpenAdjustment}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#15213A] hover:bg-[#F7F8FC] active:scale-98 text-sm font-bold shadow-xs transition-all whitespace-nowrap min-h-[44px]"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#D92D8A]" />
          <span>Registrar ajuste</span>
        </button>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {/* KPI 1: Dinero Recibido */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-[#15213A]/10 shadow-xs"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#234A91]/10 text-[#234A91] flex items-center justify-center mb-3">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#667085] block">
            Dinero recibido en cargas
          </span>
          <div className="text-lg sm:text-2xl font-bold text-[#15213A] font-['Outfit',sans-serif] mt-1">
            {formatPesos(dineroRecibido)}
          </div>
          <span className="text-[10px] sm:text-xs text-[#667085] mt-1 block">
            {totalCargas.length} {totalCargas.length === 1 ? 'carga registrada' : 'cargas registradas'}
          </span>
        </motion.div>

        {/* KPI 2: Crédito Promocional */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-[#15213A]/10 shadow-xs"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D92D8A]/10 text-[#D92D8A] flex items-center justify-center mb-3">
            <Percent className="w-5 h-5" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#667085] block">
            Crédito promocional otorgado
          </span>
          <div className="text-lg sm:text-2xl font-bold text-[#D92D8A] font-['Outfit',sans-serif] mt-1">
            {formatPesos(creditoPromocionalEntregado)}
          </div>
          <span className="text-[10px] sm:text-xs text-[#667085] mt-1 block">
            Bonificaciones por carga
          </span>
        </motion.div>

        {/* KPI 3: Crédito Utilizado en Compras */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-[#15213A]/10 shadow-xs"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F5A623]/15 text-[#D97706] flex items-center justify-center mb-3">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#667085] block">
            Crédito utilizado en compras
          </span>
          <div className="text-lg sm:text-2xl font-bold text-[#15213A] font-['Outfit',sans-serif] mt-1">
            {formatPesos(creditoUtilizadoCompras)}
          </div>
          <span className="text-[10px] sm:text-xs text-[#667085] mt-1 block">
            {totalCompras.length} {totalCompras.length === 1 ? 'compra realizada' : 'compras realizadas'}
          </span>
        </motion.div>

        {/* KPI 4: Puntos Acumulados */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-[#15213A]/10 shadow-xs"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#234A91]/10 text-[#234A91] flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#667085] block">
            Puntos generados
          </span>
          <div className="text-lg sm:text-2xl font-bold text-[#234A91] font-['Outfit',sans-serif] mt-1">
            {puntosGenerados} pts
          </div>
          <span className="text-[10px] sm:text-xs text-[#667085] mt-1 block">
            Por compras abonadas con saldo
          </span>
        </motion.div>
      </div>

      {/* Network Counters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div
          onClick={() => onNavigateTab('locales')}
          className="p-4 rounded-2xl bg-white border border-[#15213A]/8 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#234A91]/30 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#15213A]/5 text-[#15213A] flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#667085] block">Locales conectados</span>
              <span className="text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
                {LOCALES_DEMO.length} comercios
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#667085]" />
        </div>

        <div
          onClick={() => onNavigateTab('empleados')}
          className="p-4 rounded-2xl bg-white border border-[#15213A]/8 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#234A91]/30 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#15213A]/5 text-[#15213A] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#667085] block">Cajeros y empleados</span>
              <span className="text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
                {EMPLEADOS_DEMO.length} personas
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#667085]" />
        </div>

        <div
          onClick={() => onNavigateTab('clientes')}
          className="p-4 rounded-2xl bg-white border border-[#15213A]/8 shadow-xs flex items-center justify-between cursor-pointer hover:border-[#234A91]/30 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#15213A]/5 text-[#15213A] flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-[#667085] block">Clientes registrados</span>
              <span className="text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
                1 cuenta demo
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#667085]" />
        </div>
      </div>

      {/* Comparison Grid: Stores Performance & Recent Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Comparison */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#15213A]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#15213A] font-['Outfit',sans-serif]">
                  Actividad por comercio
                </h3>
                <p className="text-xs text-[#667085]">
                  Comparativa de dinero recaudado y compras por sucursal
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('locales')}
                className="text-xs font-bold text-[#234A91] hover:underline"
              >
                Ver locales
              </button>
            </div>

            <div className="space-y-4">
              {storeMetrics.map((store) => {
                const pctDinero = Math.min(100, Math.round((store.dinero / maxVolume) * 100));
                const pctConsumo = Math.min(100, Math.round((store.consumo / maxVolume) * 100));

                return (
                  <div key={store.id} className="p-3.5 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-[#15213A]">{store.nombre}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-[#667085] border border-[#15213A]/5">
                        {store.codigo}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                      <div>
                        <span className="text-[#667085] block">Cargas: {store.cargasCount}</span>
                        <strong className="text-[#234A91]">{formatPesos(store.dinero)}</strong>
                      </div>
                      <div>
                        <span className="text-[#667085] block">Compras: {store.comprasCount}</span>
                        <strong className="text-[#15213A]">{formatPesos(store.consumo)}</strong>
                      </div>
                    </div>

                    {/* CSS Bar */}
                    <div className="w-full h-2 rounded-full bg-white border border-[#15213A]/5 overflow-hidden flex">
                      <div
                        className="h-full bg-[#234A91]"
                        style={{ width: `${Math.max(pctDinero, 4)}%` }}
                        title={`Recaudado: ${formatPesos(store.dinero)}`}
                      />
                      <div
                        className="h-full bg-[#D92D8A]"
                        style={{ width: `${Math.max(pctConsumo, 2)}%` }}
                        title={`Consumo: ${formatPesos(store.consumo)}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#15213A]/8 flex items-center justify-between text-xs text-[#667085]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#234A91]"></span> Dinero recibido
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D92D8A]"></span> Crédito consumido
              </span>
            </div>
          </div>
        </div>

        {/* Recent Operations */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#15213A]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#15213A] font-['Outfit',sans-serif]">
                  Últimos movimientos
                </h3>
                <p className="text-xs text-[#667085]">
                  Historial reciente de la red ({movimientos.length} total)
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('movimientos')}
                className="text-xs font-bold text-[#234A91] hover:underline"
              >
                Ver todos
              </button>
            </div>

            <div className="space-y-3">
              {movimientos.slice(0, 4).map((mov) => {
                const isCarga = mov.tipo === 'carga';
                const isCompra = mov.tipo === 'compra';
                const isAjuste = mov.tipo === 'ajuste';

                return (
                  <div
                    key={mov.id}
                    className="p-3 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs ${
                          isCarga ? 'bg-[#234A91]' : isCompra ? 'bg-[#D92D8A]' : 'bg-[#15213A]'
                        }`}
                      >
                        {isCarga ? '+$' : isCompra ? '-$' : '±'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#15213A]">{mov.titulo}</span>
                          <span className="text-[10px] text-[#667085] font-mono">{mov.id}</span>
                        </div>
                        <span className="text-[11px] text-[#667085] block">
                          {mov.comercio} · {mov.fecha} {mov.hora}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-xs sm:text-sm font-bold font-['Outfit',sans-serif] ${
                          isCarga ? 'text-[#234A91]' : isCompra ? 'text-[#15213A]' : 'text-[#D92D8A]'
                        }`}
                      >
                        {isCarga
                          ? `+${formatPesos(mov.creditoAcreditado || mov.importeEntregado || 0)}`
                          : isCompra
                          ? `-${formatPesos(mov.creditoUtilizado || 0)}`
                          : formatPesos(mov.importeEntregado || mov.creditoUtilizado || 0)}
                      </div>
                      <span className="text-[10px] text-[#667085] block">
                        {mov.nombreConsumidor || 'Sofía M.'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#15213A]/8 text-center">
            <button
              onClick={() => onNavigateTab('movimientos')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#234A91] hover:text-[#15213A] transition-colors"
            >
              <span>Explorar los {movimientos.length} movimientos con filtros</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
