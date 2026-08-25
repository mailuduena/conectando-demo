import React from 'react';
import { motion } from 'motion/react';
import { UserRole } from '../types';
import {
  User,
  Store,
  Building2,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void;
  onBackToLanding: () => void;
}

interface RoleOption {
  id: UserRole;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  botonTexto: string;
  icono: React.ElementType;
  accentColor: string;
  badge: string;
}

const ROLES: RoleOption[] = [
  {
    id: 'consumidor',
    titulo: 'Consumidor',
    subtitulo: 'Experiencia del cliente final',
    descripcion: 'Consultá tu saldo, puntos, beneficios y movimientos.',
    botonTexto: 'Ingresar como Consumidor',
    icono: User,
    accentColor: '#234A91',
    badge: 'App de Clientes',
  },
  {
    id: 'empleado',
    titulo: 'Empleado',
    subtitulo: 'Punto de atención en caja',
    descripcion: 'Identificá clientes y registrá operaciones simuladas.',
    botonTexto: 'Ingresar como Empleado',
    icono: Store,
    accentColor: '#D92D8A',
    badge: 'Terminal en Caja',
  },
  {
    id: 'dueno',
    titulo: 'Dueño',
    subtitulo: 'Panel de administración general',
    descripcion: 'Supervisá locales, personas, reglas y movimientos.',
    botonTexto: 'Ingresar como Dueño',
    icono: Building2,
    accentColor: '#15213A',
    badge: 'Control Global',
  },
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  onSelectRole,
  onBackToLanding,
}) => {
  return (
    <div id="role-selector-view" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back button */}
      <button
        id="back-to-landing-btn"
        onClick={onBackToLanding}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#667085] hover:text-[#15213A] mb-6 transition-colors min-h-[44px] px-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la presentación</span>
      </button>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#234A91]/8 text-[#234A91] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Selector de perfiles
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#15213A] tracking-tight font-['Outfit',sans-serif]">
          Elegí un rol para recorrer la demo
        </h1>
        <p className="text-sm sm:text-base text-[#667085] mt-2.5">
          Cada perfil cuenta con su propia vista e interacción adaptada a sus necesidades dentro de la red.
        </p>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {ROLES.map((role, idx) => {
          const IconComponent = role.icono;
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              id={`role-card-${role.id}`}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#15213A]/10 shadow-xs hover:shadow-md hover:border-[#234A91]/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: role.accentColor }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#15213A]/5 text-[#667085]">
                    {role.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
                  {role.titulo}
                </h2>
                <p className="text-xs text-[#234A91] font-medium mt-0.5">
                  {role.subtitulo}
                </p>

                <p className="text-sm text-[#667085] mt-4 leading-relaxed">
                  {role.descripcion}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#15213A]/8">
                <button
                  id={`enter-as-${role.id}-btn`}
                  onClick={() => onSelectRole(role.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-xl shadow-xs transition-all active:scale-98 min-h-[44px]"
                  style={{ backgroundColor: role.accentColor }}
                >
                  <span>{role.botonTexto}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Notice */}
      <div className="mt-10 sm:mt-12 text-center">
        <div
          id="role-selector-disclaimer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15213A]/5 text-xs sm:text-sm text-[#667085] border border-[#15213A]/8"
        >
          <ShieldAlert className="w-4 h-4 text-[#15213A]/60" />
          <span>
            Esta aplicación es una demostración. No utiliza dinero ni datos reales.
          </span>
        </div>
      </div>
    </div>
  );
};
