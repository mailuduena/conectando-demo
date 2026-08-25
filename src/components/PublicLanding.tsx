import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { LocalComercio } from '../types';
import {
  Wallet,
  ShoppingBag,
  Gift,
  ArrowRight,
  HelpCircle,
  Store,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRightLeft,
  ShieldAlert,
} from 'lucide-react';

interface PublicLandingProps {
  onExploreDemo: () => void;
}

const LOCALES_DEMO: LocalComercio[] = [
  {
    id: 'panaderia-centro',
    nombre: 'Panadería Centro',
    tipo: 'Panadería y Café de especialidad',
    ubicacion: 'Zona Centro - Av. Principal 1420',
    color: '#234A91',
  },
  {
    id: 'heladeria-centro',
    nombre: 'Heladería Centro',
    tipo: 'Helados artesanales y postres',
    ubicacion: 'Zona Centro - Calle Mitre 450',
    color: '#FF4F72',
  },
  {
    id: 'panaderia-norte',
    nombre: 'Panadería Norte',
    tipo: 'Panificados y confitería',
    ubicacion: 'Zona Norte - Boulevard 890',
    color: '#D92D8A',
  },
  {
    id: 'panaderia-sur',
    nombre: 'Panadería Sur',
    tipo: 'Panadería tradicional y meriendas',
    ubicacion: 'Zona Sur - Paseo del Sol 210',
    color: '#F5A623',
  },
];

export const PublicLanding: React.FC<PublicLandingProps> = ({ onExploreDemo }) => {
  const scrollToHowItWorks = () => {
    const section = document.getElementById('seccion-como-funciona');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="public-landing-view" className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-12 sm:pb-16 text-center flex flex-col items-center">
        
        {/* Badge Demo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#234A91]/20 shadow-xs mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#234A91]"></span>
          <span className="text-xs sm:text-sm font-semibold text-[#234A91]">
            Versión demo para presentación
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#15213A] max-w-3xl leading-[1.15] font-['Outfit',sans-serif]"
        >
          Tus beneficios, en todos tus lugares favoritos.
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-5 text-base sm:text-xl text-[#667085] max-w-2xl leading-relaxed"
        >
          Cargá crédito en un local, usalo en cualquiera de los comercios adheridos y sumá puntos con cada compra.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <button
            id="hero-explore-demo-btn"
            onClick={onExploreDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-[#234A91] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-md hover:shadow-lg transition-all min-h-[48px]"
          >
            <span>Explorar la demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-how-it-works-btn"
            onClick={scrollToHowItWorks}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#15213A] bg-[#FFFFFF] hover:bg-[#F7F8FC] border border-[#15213A]/15 active:scale-98 rounded-xl shadow-2xs transition-all min-h-[48px]"
          >
            <HelpCircle className="w-4 h-4 text-[#234A91]" />
            <span>¿Cómo funciona?</span>
          </button>
        </motion.div>

        {/* Visual network badge illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-12 w-full max-w-2xl bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-[#15213A]/8 pb-3.5 mb-4">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-[#234A91]" />
              <span className="text-xs sm:text-sm font-semibold text-[#15213A]">
                Red unificada de 4 comercios
              </span>
            </div>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#F5A623]/15 text-[#B87105]">
              Un solo saldo compartido
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {LOCALES_DEMO.map((local) => (
              <div
                key={local.id}
                className="flex flex-col items-center text-center p-3 rounded-xl bg-[#F7F8FC] border border-[#15213A]/6"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-1.5"
                  style={{ backgroundColor: local.color }}
                >
                  <Store className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#15213A] line-clamp-1">
                  {local.nombre}
                </span>
                <span className="text-[11px] text-[#667085] mt-0.5">Adherido</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3 Steps: ¿Cómo funciona? */}
      <section
        id="seccion-como-funciona"
        className="w-full bg-[#FFFFFF] border-y border-[#15213A]/8 py-12 sm:py-16 px-4 sm:px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#234A91]/8 text-[#234A91] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Experiencia simple
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#15213A] tracking-tight font-['Outfit',sans-serif]">
              ¿Cómo funciona Conectando?
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-2.5">
              Un único circuito ágil pensado para fidelizar a tus clientes en todos tus puntos de venta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {/* Step 1 */}
            <div
              id="step-1-card"
              className="flex flex-col p-6 sm:p-7 rounded-2xl bg-[#F7F8FC] border border-[#15213A]/8 transition-all hover:border-[#234A91]/30"
            >
              <div className="w-12 h-12 rounded-xl bg-[#234A91] text-white flex items-center justify-center mb-5 shadow-xs">
                <Wallet className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#234A91]">
                  Paso 1
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#15213A] mb-2 font-['Outfit',sans-serif]">
                Cargá crédito
              </h3>
              <p className="text-sm text-[#667085] leading-relaxed">
                El cliente acredita saldo en la caja de cualquiera de los locales participantes de manera rápida y segura.
              </p>
            </div>

            {/* Step 2 */}
            <div
              id="step-2-card"
              className="flex flex-col p-6 sm:p-7 rounded-2xl bg-[#F7F8FC] border border-[#15213A]/8 transition-all hover:border-[#FF4F72]/30"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF4F72] text-white flex items-center justify-center mb-5 shadow-xs">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF4F72]">
                  Paso 2
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#15213A] mb-2 font-['Outfit',sans-serif]">
                Comprá en cualquier local
              </h3>
              <p className="text-sm text-[#667085] leading-relaxed">
                Ese mismo saldo queda inmediatamente disponible para utilizar en todos los comercios del mismo dueño.
              </p>
            </div>

            {/* Step 3 */}
            <div
              id="step-3-card"
              className="flex flex-col p-6 sm:p-7 rounded-2xl bg-[#F7F8FC] border border-[#15213A]/8 transition-all hover:border-[#D92D8A]/30"
            >
              <div className="w-12 h-12 rounded-xl bg-[#D92D8A] text-white flex items-center justify-center mb-5 shadow-xs">
                <Gift className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D92D8A]">
                  Paso 3
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#15213A] mb-2 font-['Outfit',sans-serif]">
                Sumá puntos y accedé a beneficios
              </h3>
              <p className="text-sm text-[#667085] leading-relaxed">
                Cada consumo acumula puntos cruzados para canjear por premios, promociones especiales y descuentos exclusivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Mock Stores Section */}
      <section
        id="seccion-locales"
        className="w-full max-w-5xl mx-auto py-12 sm:py-16 px-4 sm:px-6"
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15213A]/6 text-[#15213A] text-xs font-semibold mb-3">
            <Store className="w-3.5 h-3.5" />
            Red de comercios
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#15213A] tracking-tight font-['Outfit',sans-serif]">
            Comercios adheridos a la red
          </h2>
          <p className="text-sm sm:text-base text-[#667085] mt-2">
            Locales de ejemplo integrados bajo la misma cuenta y administración:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {LOCALES_DEMO.map((local, idx) => (
            <div
              key={local.id}
              id={`local-card-${local.id}`}
              className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs"
                      style={{ backgroundColor: local.color }}
                    >
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#15213A] leading-snug">
                        {local.nombre}
                      </h3>
                      <p className="text-xs text-[#667085] mt-0.5">{local.tipo}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#234A91]/8 text-[#234A91] shrink-0">
                    Local 0{idx + 1}
                  </span>
                </div>

                <div className="text-xs text-[#667085] bg-[#F7F8FC] rounded-lg p-2.5 mt-3 border border-[#15213A]/5">
                  <span className="font-medium text-[#172033]">Ubicación:</span> {local.ubicacion}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#15213A]/8 flex items-center justify-between text-xs text-[#234A91] font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#234A91]" />
                  Acepta saldo compartido
                </span>
                <span className="text-[#667085]">Puntos acumulables</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA bottom block */}
        <div className="mt-12 text-center bg-[#FFFFFF] border border-[#234A91]/15 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
            Probá la experiencia de cada participante
          </h3>
          <p className="text-sm text-[#667085] mt-2 max-w-xl">
            Ingresá al selector de roles para recorrer la vista de Consumidor, Empleado y Dueño.
          </p>
          <button
            id="bottom-explore-demo-btn"
            onClick={onExploreDemo}
            className="mt-5 inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#234A91] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-xs transition-all min-h-[48px]"
          >
            <span>Explorar la demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Discreet Demo Disclaimer Notice */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-12">
        <div
          id="public-demo-disclaimer"
          className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#15213A]/5 border border-[#15213A]/10 text-xs sm:text-sm text-[#667085] text-center"
        >
          <ShieldAlert className="w-4 h-4 text-[#15213A]/60 shrink-0" />
          <span>
            Esta aplicación es una demostración. No utiliza dinero ni datos reales.
          </span>
        </div>
      </div>
    </div>
  );
};
