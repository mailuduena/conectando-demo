import React from 'react';
import { motion } from 'motion/react';
import { MovimientoRegistro } from '../../types';
import { EMPLEADOS_DEMO, formatPesos } from '../../data/consumerStore';
import {
  Users,
  Store,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Activity,
  Info,
} from 'lucide-react';

interface OwnerEmployeesProps {
  movimientos: MovimientoRegistro[];
}

export const OwnerEmployees: React.FC<OwnerEmployeesProps> = ({ movimientos }) => {
  return (
    <div id="owner-employees-view" className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
          Personal y cajeros asignados
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Supervisá los empleados asignados a los 4 comercios y el volumen de operaciones procesadas por cada uno.
        </p>
      </div>

      {/* Security Note */}
      <div className="p-4 rounded-2xl bg-[#15213A]/5 border border-[#15213A]/10 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#234A91] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#172033]">
          <strong className="text-[#15213A]">Política de permisos:</strong> Los empleados en caja pueden registrar cargas presenciales y cobros con saldo. Los ajustes de saldo y correcciones son una atribución exclusiva del rol Dueño / Administrador.
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {EMPLEADOS_DEMO.map((emp, idx) => {
          // Calculate operations processed by this employee
          const opsEmpleado = movimientos.filter((m) =>
            m.empleado.toLowerCase().includes(emp.nombre.toLowerCase()) ||
            m.empleado.includes(emp.codigo)
          );

          const cargas = opsEmpleado.filter((m) => m.tipo === 'carga').length;
          const compras = opsEmpleado.filter((m) => m.tipo === 'compra').length;

          return (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              id={`owner-employee-card-${emp.id}`}
              className="bg-white rounded-2xl border border-[#15213A]/10 shadow-xs p-5 sm:p-6 flex flex-col justify-between hover:border-[#234A91]/30 transition-all"
            >
              <div>
                {/* Employee Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#234A91]/10 text-[#234A91] flex items-center justify-center font-bold text-lg font-['Outfit',sans-serif]">
                      {emp.nombre.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#15213A] font-['Outfit',sans-serif]">
                        {emp.nombre}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono font-bold text-[#234A91] px-2 py-0.5 rounded-md bg-[#234A91]/8">
                          {emp.codigo}
                        </span>
                        <span className="text-xs text-[#667085]">
                          Cajero / Atención
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#234A91]/10 text-[#234A91] border border-[#234A91]/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {emp.estado || 'Activo'}
                  </span>
                </div>

                {/* Assigned Store */}
                <div className="flex items-center gap-2.5 text-xs text-[#15213A] bg-[#F7F8FC] p-3 rounded-xl mb-4 border border-[#15213A]/5">
                  <Store className="w-4 h-4 text-[#234A91]" />
                  <span>
                    Comercio asignado: <strong>{emp.comercioAsignado}</strong>
                  </span>
                </div>

                {/* Permissions badge */}
                <div className="flex items-center gap-2 text-xs text-[#667085] mb-4">
                  <Lock className="w-3.5 h-3.5 text-[#667085]" />
                  <span>Permisos: <strong className="text-[#15213A]">{emp.permisos}</strong></span>
                </div>
              </div>

              {/* Activity Stats */}
              <div className="pt-4 border-t border-[#15213A]/8 bg-white">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#15213A] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#D92D8A]" />
                    Operaciones procesadas
                  </span>
                  <span className="font-bold text-[#234A91]">
                    {opsEmpleado.length} total
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#F7F8FC] text-[#667085]">
                    Cargas: <strong className="text-[#15213A]">{cargas}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F7F8FC] text-[#667085]">
                    Compras: <strong className="text-[#15213A]">{compras}</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
