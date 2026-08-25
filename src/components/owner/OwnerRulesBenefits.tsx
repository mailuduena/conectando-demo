import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BeneficioItem, ReglasPrograma } from '../../types';
import {
  getReglasPrograma,
  saveReglasPrograma,
  getBeneficiosCatalogo,
  saveBeneficiosCatalogo,
  formatPesos,
} from '../../data/consumerStore';
import {
  Sliders,
  Gift,
  Percent,
  Sparkles,
  Ticket,
  CheckCircle2,
  AlertTriangle,
  Info,
  Save,
  RotateCcw,
  ShieldAlert,
  Power,
} from 'lucide-react';

export const OwnerRulesBenefits: React.FC = () => {
  const [subTab, setSubTab] = useState<'reglas' | 'beneficios'>('reglas');

  // Reglas state
  const [reglas, setReglas] = useState<ReglasPrograma>(getReglasPrograma());
  const [reglasGuardadas, setReglasGuardadas] = useState(false);
  const [reglasError, setReglasError] = useState<string | null>(null);

  // Beneficios state
  const [beneficios, setBeneficios] = useState<BeneficioItem[]>(getBeneficiosCatalogo());
  const [beneficiosGuardados, setBeneficiosGuardados] = useState(false);

  useEffect(() => {
    setReglas(getReglasPrograma());
    setBeneficios(getBeneficiosCatalogo());
  }, []);

  const handleGuardarReglas = (e: React.FormEvent) => {
    e.preventDefault();
    setReglasError(null);

    if (reglas.porcentajeBonificacion < 0 || reglas.porcentajeBonificacion > 100) {
      setReglasError('El porcentaje de bonificación debe estar entre 0% y 100%.');
      return;
    }
    if (reglas.importePorPunto <= 0) {
      setReglasError('El importe necesario por cada punto debe ser mayor a $0.');
      return;
    }
    if (reglas.diasVigenciaBonificacion <= 0) {
      setReglasError('Los días de vigencia deben ser mayores a 0.');
      return;
    }
    if (reglas.mesesVigenciaPuntos <= 0) {
      setReglasError('Los meses de vigencia deben ser mayores a 0.');
      return;
    }

    saveReglasPrograma(reglas);
    setReglasGuardadas(true);
    setTimeout(() => setReglasGuardadas(false), 3500);
  };

  const handleToggleBeneficioActivo = (id: string) => {
    const updated = beneficios.map((b) =>
      b.id === id ? { ...b, activo: !b.activo } : b
    );
    setBeneficios(updated);
  };

  const handleUpdateBeneficio = (id: string, field: keyof BeneficioItem, value: any) => {
    const updated = beneficios.map((b) =>
      b.id === id ? { ...b, [field]: value } : b
    );
    setBeneficios(updated);
  };

  const handleGuardarBeneficios = () => {
    saveBeneficiosCatalogo(beneficios);
    setBeneficiosGuardados(true);
    setTimeout(() => setBeneficiosGuardados(false), 3500);
  };

  const getBenefitIcon = (tipo: BeneficioItem['tipo']) => {
    switch (tipo) {
      case 'descuento':
        return <Percent className="w-5 h-5" />;
      case 'producto':
        return <Gift className="w-5 h-5" />;
      case 'sorteo':
        return <Ticket className="w-5 h-5" />;
    }
  };

  return (
    <div id="owner-rules-benefits-view" className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
          Reglas del programa y catálogo
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Configurá los porcentajes de bonificación, factores de conversión de puntos y el catálogo de recompensas de la red.
        </p>
      </div>

      {/* Sub-tab navigation */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-white border border-[#15213A]/10 max-w-md shadow-xs">
        <button
          id="subtab-reglas-btn"
          onClick={() => setSubTab('reglas')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all min-h-[40px] ${
            subTab === 'reglas'
              ? 'bg-[#15213A] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#15213A] hover:bg-[#F7F8FC]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Reglas del programa</span>
        </button>

        <button
          id="subtab-beneficios-btn"
          onClick={() => setSubTab('beneficios')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all min-h-[40px] ${
            subTab === 'beneficios'
              ? 'bg-[#15213A] text-white shadow-xs'
              : 'text-[#667085] hover:text-[#15213A] hover:bg-[#F7F8FC]'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Beneficios y canjes</span>
        </button>
      </div>

      {/* SECCIÓN 1: REGLAS DEL PROGRAMA */}
      {subTab === 'reglas' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Important Rule Notice */}
          <div className="p-4 rounded-2xl bg-[#F5A623]/15 border border-[#F5A623]/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#172033]">
              <strong className="text-[#D97706]">Principio de trazabilidad:</strong> Los cambios que guardes aquí se aplicarán únicamente a las operaciones futuras. No modificarán movimientos anteriores ni saldos previamente otorgados.
            </div>
          </div>

          <form onSubmit={handleGuardarReglas} className="bg-white p-5 sm:p-7 rounded-2xl border border-[#15213A]/10 shadow-xs space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
              Parámetros de bonificaciones y puntos
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* 1. Porcentaje de Bonificación */}
              <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5 space-y-2">
                <label
                  htmlFor="input-regla-bonif"
                  className="block text-xs font-bold uppercase tracking-wider text-[#15213A]"
                >
                  Bonificación por carga presencial (%)
                </label>
                <div className="relative">
                  <input
                    id="input-regla-bonif"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={reglas.porcentajeBonificacion}
                    onChange={(e) =>
                      setReglas({ ...reglas, porcentajeBonificacion: Number(e.target.value) })
                    }
                    className="w-full pl-3 pr-10 py-2.5 text-base font-bold rounded-xl border border-[#15213A]/15 bg-white text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#234A91]"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#667085]">
                    %
                  </span>
                </div>
                <p className="text-[11px] text-[#667085]">
                  Por ejemplo: Con 10%, al cargar $10.000 el cliente recibe $1.000 extra en crédito promocional.
                </p>
              </div>

              {/* 2. Importe por Punto */}
              <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5 space-y-2">
                <label
                  htmlFor="input-regla-pesos-punto"
                  className="block text-xs font-bold uppercase tracking-wider text-[#15213A]"
                >
                  Gasto para sumar 1 punto ($ ARS)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#15213A]">
                    $
                  </span>
                  <input
                    id="input-regla-pesos-punto"
                    type="number"
                    min="100"
                    step="100"
                    value={reglas.importePorPunto}
                    onChange={(e) =>
                      setReglas({ ...reglas, importePorPunto: Number(e.target.value) })
                    }
                    className="w-full pl-8 pr-4 py-2.5 text-base font-bold rounded-xl border border-[#15213A]/15 bg-white text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#234A91]"
                  />
                </div>
                <p className="text-[11px] text-[#667085]">
                  Por ejemplo: Cada $1.000 consumidos con saldo en cualquier local otorgan 1 punto.
                </p>
              </div>

              {/* 3. Días de vigencia del crédito promocional */}
              <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5 space-y-2">
                <label
                  htmlFor="input-regla-vigencia-bonif"
                  className="block text-xs font-bold uppercase tracking-wider text-[#15213A]"
                >
                  Vigencia del crédito promocional (días)
                </label>
                <div className="relative">
                  <input
                    id="input-regla-vigencia-bonif"
                    type="number"
                    min="1"
                    step="1"
                    value={reglas.diasVigenciaBonificacion}
                    onChange={(e) =>
                      setReglas({ ...reglas, diasVigenciaBonificacion: Number(e.target.value) })
                    }
                    className="w-full pl-3 pr-14 py-2.5 text-base font-bold rounded-xl border border-[#15213A]/15 bg-white text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#234A91]"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#667085]">
                    días
                  </span>
                </div>
                <p className="text-[11px] text-[#667085]">
                  El crédito de regalo expira luego de este plazo (el crédito comprado nunca vence).
                </p>
              </div>

              {/* 4. Meses de vigencia de puntos */}
              <div className="p-4 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5 space-y-2">
                <label
                  htmlFor="input-regla-vigencia-puntos"
                  className="block text-xs font-bold uppercase tracking-wider text-[#15213A]"
                >
                  Vigencia de puntos acumulados (meses)
                </label>
                <div className="relative">
                  <input
                    id="input-regla-vigencia-puntos"
                    type="number"
                    min="1"
                    step="1"
                    value={reglas.mesesVigenciaPuntos}
                    onChange={(e) =>
                      setReglas({ ...reglas, mesesVigenciaPuntos: Number(e.target.value) })
                    }
                    className="w-full pl-3 pr-16 py-2.5 text-base font-bold rounded-xl border border-[#15213A]/15 bg-white text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#234A91]"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#667085]">
                    meses
                  </span>
                </div>
                <p className="text-[11px] text-[#667085]">
                  Período durante el cual el cliente puede canjear sus puntos por recompensas.
                </p>
              </div>
            </div>

            {reglasError && (
              <div className="p-3.5 rounded-xl bg-[#FF4F72]/10 border border-[#FF4F72]/30 text-xs font-bold text-[#FF4F72]">
                {reglasError}
              </div>
            )}

            {reglasGuardadas && (
              <div className="p-3.5 rounded-xl bg-[#234A91]/10 border border-[#234A91]/30 flex items-center gap-2 text-xs font-bold text-[#234A91]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Reglas actualizadas correctamente. Se aplicarán a las futuras operaciones en caja.</span>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                id="save-rules-btn"
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#15213A] hover:bg-[#234A91] text-white text-sm font-bold shadow-xs transition-all active:scale-98 min-h-[44px]"
              >
                <Save className="w-4 h-4" />
                <span>Guardar reglas del programa</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* SECCIÓN 2: BENEFICIOS Y CANJES */}
      {subTab === 'beneficios' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-4 rounded-2xl bg-[#234A91]/8 border border-[#234A91]/20 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#234A91] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#172033]">
              <strong className="text-[#234A91]">Gestión del catálogo:</strong> Podés pausar o activar beneficios y ajustar los puntos requeridos. Los cambios se reflejan inmediatamente en la vista del Consumidor.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {beneficios.map((ben) => {
              const isActivo = ben.activo !== false;
              return (
                <div
                  key={ben.id}
                  id={`owner-benefit-editor-${ben.id}`}
                  className={`p-5 rounded-2xl bg-white border shadow-xs flex flex-col justify-between transition-all ${
                    isActivo ? 'border-[#15213A]/10' : 'border-[#15213A]/5 bg-[#F7F8FC] opacity-80'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top toggle & Category */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#15213A]/5 text-[#667085]">
                        {ben.categoria}
                      </span>

                      {/* Active/Inactive switch */}
                      <button
                        type="button"
                        onClick={() => handleToggleBeneficioActivo(ben.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all min-h-[32px] ${
                          isActivo
                            ? 'bg-[#234A91]/10 text-[#234A91] border border-[#234A91]/20'
                            : 'bg-[#FF4F72]/10 text-[#FF4F72] border border-[#FF4F72]/20'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{isActivo ? 'Activo' : 'Pausado'}</span>
                      </button>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#667085] mb-1">
                        Título del beneficio
                      </label>
                      <input
                        type="text"
                        value={ben.titulo}
                        onChange={(e) => handleUpdateBeneficio(ben.id, 'titulo', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-[#15213A]/15 bg-white text-[#15213A]"
                      />
                    </div>

                    {/* Subtitle */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#667085] mb-1">
                        Subtítulo
                      </label>
                      <input
                        type="text"
                        value={ben.subtitulo}
                        onChange={(e) => handleUpdateBeneficio(ben.id, 'subtitulo', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#15213A]/15 bg-white text-[#15213A]"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#667085] mb-1">
                        Descripción de validez
                      </label>
                      <textarea
                        rows={2}
                        value={ben.descripcion}
                        onChange={(e) => handleUpdateBeneficio(ben.id, 'descripcion', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#15213A]/15 bg-white text-[#15213A] resize-none"
                      />
                    </div>

                    {/* Required Points */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#667085] mb-1">
                        Puntos requeridos para el canje
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={ben.puntosRequeridos}
                          onChange={(e) =>
                            handleUpdateBeneficio(ben.id, 'puntosRequeridos', Number(e.target.value))
                          }
                          className="w-full pl-3 pr-12 py-2 text-sm font-bold rounded-xl border border-[#15213A]/15 bg-white text-[#15213A]"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#D92D8A]">
                          pts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {beneficiosGuardados && (
            <div className="p-3.5 rounded-xl bg-[#234A91]/10 border border-[#234A91]/30 flex items-center gap-2 text-xs font-bold text-[#234A91]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Catálogo actualizado con éxito. Las modificaciones ya están disponibles en la vista de clientes.</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              id="save-benefits-btn"
              type="button"
              onClick={handleGuardarBeneficios}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#15213A] hover:bg-[#234A91] text-white text-sm font-bold shadow-xs transition-all active:scale-98 min-h-[44px]"
            >
              <Save className="w-4 h-4" />
              <span>Guardar catálogo de beneficios</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
