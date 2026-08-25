import React from 'react';
import { motion } from 'motion/react';
import { UserRole } from '../types';
import {
  User,
  Store,
  Building2,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Layers,
  Sparkles,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';

interface RoleWelcomeProps {
  role: UserRole;
  onBackToRoles: () => void;
  onBackToLanding: () => void;
}

interface RoleDetail {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  icono: React.ElementType;
  accentColor: string;
  badge: string;
  aspectosClave: string[];
}

const ROLE_DETAILS: Record<UserRole, RoleDetail> = {
  consumidor: {
    titulo: 'Consumidor',
    subtitulo: 'Portal del cliente',
    descripcion: 'Consultá tu saldo disponible, puntos acumulados, beneficios canjeables y el historial de tus movimientos en los 4 comercios.',
    icono: User,
    accentColor: '#234A91',
    badge: 'Espacio de Cliente',
    aspectosClave: [
      'Visualización de saldo único compartido',
      'Acumulación y canje de puntos por local',
      'Historial unificado de cargas y consumos',
      'Acceso a promociones y beneficios exclusivos',
    ],
  },
  empleado: {
    titulo: 'Empleado',
    subtitulo: 'Terminal de atención y cobro',
    descripcion: 'Identificá clientes, consultá su saldo en tiempo real y registrá operaciones simuladas de carga y débito en tu punto de venta.',
    icono: Store,
    accentColor: '#D92D8A',
    badge: 'Terminal de Caja',
    aspectosClave: [
      'Búsqueda o identificación rápida de clientes',
      'Validación y débito de saldo en caja',
      'Registro de recargas en el local',
      'Asignación automática de puntos de compra',
    ],
  },
  dueno: {
    titulo: 'Dueño',
    subtitulo: 'Consola de gestión y supervisión',
    descripcion: 'Supervisá el estado de los cuatro locales, administrá personas, configurá las reglas de beneficios y auditá todos los movimientos cruzados.',
    icono: Building2,
    accentColor: '#15213A',
    badge: 'Administración General',
    aspectosClave: [
      'Visión consolidada de los 4 comercios de la red',
      'Balance de crédito circulante e intercambios',
      'Configuración de reglas de puntos y premios',
      'Supervisión de personal y auditoría de transacciones',
    ],
  },
};

export const RoleWelcome: React.FC<RoleWelcomeProps> = ({
  role,
  onBackToRoles,
  onBackToLanding,
}) => {
  const detail = ROLE_DETAILS[role];
  const IconComponent = detail.icono;

  return (
    <div id="role-welcome-view" className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top navigation actions */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <button
          id="welcome-back-to-roles-btn"
          onClick={onBackToRoles}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#234A91] hover:text-[#15213A] transition-colors min-h-[44px] px-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al selector de roles</span>
        </button>

        <button
          id="welcome-back-to-landing-btn"
          onClick={onBackToLanding}
          className="text-xs sm:text-sm font-medium text-[#667085] hover:text-[#15213A] transition-colors min-h-[44px] px-2 flex items-center"
        >
          Inicio
        </button>
      </div>

      {/* Main Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-[#FFFFFF] border border-[#15213A]/10 rounded-2xl p-6 sm:p-9 shadow-sm"
      >
        {/* Role Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#15213A]/8 pb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xs shrink-0"
              style={{ backgroundColor: detail.accentColor }}
            >
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#15213A]/6 text-[#15213A]">
                  {detail.badge}
                </span>
                <span className="text-xs font-medium text-[#667085]">
                  Rol activo
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
                Bienvenido al espacio de {detail.titulo}
              </h1>
            </div>
          </div>
        </div>

        {/* Role Description */}
        <div className="mt-6">
          <p className="text-base text-[#172033] leading-relaxed">
            {detail.descripcion}
          </p>
        </div>

        {/* Scheduled Module Notice */}
        <div
          id="next-step-notice-card"
          className="mt-6 p-5 rounded-xl bg-[#F7F8FC] border border-[#234A91]/20 flex items-start gap-3.5"
        >
          <div className="w-9 h-9 rounded-lg bg-[#234A91]/10 flex items-center justify-center text-[#234A91] shrink-0 mt-0.5">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#15213A]">
              Este espacio se completará en el próximo paso.
            </h3>
            <p className="text-xs sm:text-sm text-[#667085] mt-1 leading-relaxed">
              Las funciones operativas de este perfil (formularios de carga, escáner, transacciones y paneles analíticos) están programadas para la siguiente etapa de desarrollo.
            </p>
          </div>
        </div>

        {/* Preview of planned features for this role */}
        <div className="mt-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-3">
            Funcionalidades previstas para este rol
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {detail.aspectosClave.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F8FC]/60 border border-[#15213A]/5 text-xs text-[#172033]"
              >
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: detail.accentColor }}
                />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-8 pt-6 border-t border-[#15213A]/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="welcome-return-roles-action-btn"
            onClick={onBackToRoles}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#234A91] hover:bg-[#15213A] active:scale-98 rounded-xl shadow-xs transition-all min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al selector de roles</span>
          </button>

          <button
            id="welcome-return-landing-secondary-btn"
            onClick={onBackToLanding}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#172033] bg-[#FFFFFF] hover:bg-[#F7F8FC] border border-[#15213A]/15 active:scale-98 rounded-xl transition-all min-h-[44px]"
          >
            <span>Ir a la presentación</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Discreet Demo Disclaimer */}
      <div className="mt-8 text-center">
        <div
          id="welcome-demo-disclaimer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#15213A]/5 text-xs text-[#667085] border border-[#15213A]/8"
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
