import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MovimientoRegistro, TipoMovimiento } from '../../types';
import { formatPesos, LOCALES_DEMO, EMPLEADOS_DEMO } from '../../data/consumerStore';
import {
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  SlidersHorizontal,
  Gift,
  Calendar,
  Clock,
  User,
  Store,
  CheckCircle2,
  FileSpreadsheet,
  Info,
  ChevronDown,
} from 'lucide-react';

interface OwnerMovementsProps {
  movimientos: MovimientoRegistro[];
  onOpenAdjustment: () => void;
}

export const OwnerMovements: React.FC<OwnerMovementsProps> = ({
  movimientos,
  onOpenAdjustment,
}) => {
  const [tipoFiltro, setTipoFiltro] = useState<TipoMovimiento>('todos');
  const [comercioFiltro, setComercioFiltro] = useState<string>('todos');
  const [empleadoFiltro, setEmpleadoFiltro] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  // Filter logic
  const movimientosFiltrados = useMemo(() => {
    return movimientos.filter((m) => {
      // Tipo
      if (tipoFiltro !== 'todos' && m.tipo !== tipoFiltro) {
        return false;
      }
      // Comercio
      if (comercioFiltro !== 'todos' && m.comercio !== comercioFiltro) {
        return false;
      }
      // Empleado
      if (empleadoFiltro !== 'todos' && !m.empleado.toLowerCase().includes(empleadoFiltro.toLowerCase())) {
        return false;
      }
      // Busqueda de texto (id, cliente, codigo, descripcion, motivo)
      if (busqueda.trim()) {
        const query = busqueda.toLowerCase().trim();
        const matchId = m.id.toLowerCase().includes(query);
        const matchCliente = m.nombreConsumidor?.toLowerCase().includes(query);
        const matchCodigo = m.codigoConsumidor?.toLowerCase().includes(query);
        const matchDesc = m.descripcion?.toLowerCase().includes(query);
        const matchMotivo = m.motivoAjuste?.toLowerCase().includes(query);
        if (!matchId && !matchCliente && !matchCodigo && !matchDesc && !matchMotivo) {
          return false;
        }
      }
      return true;
    });
  }, [movimientos, tipoFiltro, comercioFiltro, empleadoFiltro, busqueda]);

  const getTipoBadge = (tipo: MovimientoRegistro['tipo'], tipoAjuste?: string) => {
    switch (tipo) {
      case 'carga':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#234A91]/10 text-[#234A91] border border-[#234A91]/20">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Carga
          </span>
        );
      case 'compra':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#D92D8A]/10 text-[#D92D8A] border border-[#D92D8A]/20">
            <ArrowDownLeft className="w-3.5 h-3.5" />
            Compra
          </span>
        );
      case 'canje':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F5A623]/15 text-[#D97706] border border-[#F5A623]/30">
            <Gift className="w-3.5 h-3.5" />
            Canje
          </span>
        );
      case 'ajuste':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#15213A]/10 text-[#15213A] border border-[#15213A]/20">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {tipoAjuste === 'credito_positivo' ? 'Ajuste (+)' : 'Ajuste (-)'}
          </span>
        );
    }
  };

  return (
    <div id="owner-movements-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#15213A] font-['Outfit',sans-serif]">
            Auditoría de movimientos
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1">
            Registro inmutable y trazabilidad completa de todas las transacciones de la red.
          </p>
        </div>

        <button
          id="movements-open-adjustment-btn"
          onClick={onOpenAdjustment}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15213A] text-white hover:bg-[#234A91] text-xs sm:text-sm font-bold shadow-xs transition-all self-start sm:self-auto min-h-[44px]"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#D92D8A]" />
          <span>Registrar ajuste</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#15213A]/10 shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="search-movements-input"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por ID, nombre de cliente, código CON o motivo de ajuste..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F8FC] border border-[#15213A]/10 text-xs sm:text-sm text-[#15213A] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-[#234A91] min-h-[44px]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Tipo Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#667085] mb-1">
              Tipo de operación
            </label>
            <select
              id="filter-movement-type"
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value as TipoMovimiento)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#15213A]/10 bg-[#F7F8FC] text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#234A91] min-h-[40px]"
            >
              <option value="todos">Todos los tipos</option>
              <option value="carga">Cargas presenciales</option>
              <option value="compra">Compras en comercio</option>
              <option value="canje">Canjes de beneficios</option>
              <option value="ajuste">Ajustes administrativos</option>
            </select>
          </div>

          {/* Comercio Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#667085] mb-1">
              Comercio
            </label>
            <select
              id="filter-movement-store"
              value={comercioFiltro}
              onChange={(e) => setComercioFiltro(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#15213A]/10 bg-[#F7F8FC] text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#234A91] min-h-[40px]"
            >
              <option value="todos">Todos los comercios</option>
              {LOCALES_DEMO.map((loc) => (
                <option key={loc.id} value={loc.nombre}>
                  {loc.nombre} ({loc.codigo})
                </option>
              ))}
              <option value="Administración Central">Administración Central</option>
            </select>
          </div>

          {/* Empleado Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#667085] mb-1">
              Operador / Cajero
            </label>
            <select
              id="filter-movement-employee"
              value={empleadoFiltro}
              onChange={(e) => setEmpleadoFiltro(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#15213A]/10 bg-[#F7F8FC] text-[#15213A] focus:outline-none focus:ring-2 focus:ring-[#234A91] min-h-[40px]"
            >
              <option value="todos">Todos los operadores</option>
              {EMPLEADOS_DEMO.map((emp) => (
                <option key={emp.id} value={emp.nombre}>
                  {emp.nombre} ({emp.codigo})
                </option>
              ))}
              <option value="Cuenta administradora demo">Cuenta administradora demo</option>
            </select>
          </div>
        </div>

        {/* Counter and reset */}
        <div className="flex items-center justify-between text-xs text-[#667085] pt-1">
          <span>
            Mostrando <strong>{movimientosFiltrados.length}</strong> de {movimientos.length} movimientos
          </span>
          {(tipoFiltro !== 'todos' || comercioFiltro !== 'todos' || empleadoFiltro !== 'todos' || busqueda) && (
            <button
              onClick={() => {
                setTipoFiltro('todos');
                setComercioFiltro('todos');
                setEmpleadoFiltro('todos');
                setBusqueda('');
              }}
              className="text-[#234A91] font-bold hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Movements List / Cards */}
      <div className="space-y-3.5">
        {movimientosFiltrados.length === 0 ? (
          <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-[#15213A]/10 text-[#667085]">
            <Info className="w-8 h-8 text-[#667085] mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold">No se encontraron movimientos con los filtros aplicados.</p>
          </div>
        ) : (
          movimientosFiltrados.map((mov, idx) => {
            const isCarga = mov.tipo === 'carga';
            const isCompra = mov.tipo === 'compra';
            const isAjuste = mov.tipo === 'ajuste';

            return (
              <motion.div
                key={mov.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                id={`owner-movement-row-${mov.id}`}
                className="bg-white rounded-2xl border border-[#15213A]/10 shadow-xs p-4 sm:p-5 hover:border-[#15213A]/25 transition-all space-y-3"
              >
                {/* Upper line: Badge, Title, ID, Time, Amount */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    {getTipoBadge(mov.tipo, mov.tipoAjuste)}
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#15213A]">
                        {mov.titulo}
                      </h4>
                      <span className="font-mono text-[11px] text-[#667085]">
                        ID: {mov.id}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-xs text-[#667085]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {mov.fecha} · {mov.hora}
                      </span>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-base sm:text-lg font-bold font-['Outfit',sans-serif] ${
                          isCarga
                            ? 'text-[#234A91]'
                            : isCompra
                            ? 'text-[#15213A]'
                            : mov.tipoAjuste === 'credito_positivo'
                            ? 'text-[#234A91]'
                            : 'text-[#FF4F72]'
                        }`}
                      >
                        {isCarga && `+${formatPesos(mov.creditoAcreditado || mov.importeEntregado || 0)}`}
                        {isCompra && `-${formatPesos(mov.creditoUtilizado || 0)}`}
                        {isAjuste && (
                          mov.tipoAjuste === 'credito_positivo'
                            ? `+${formatPesos(mov.importeEntregado || 0)}`
                            : `-${formatPesos(mov.creditoUtilizado || 0)}`
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#15213A]/5 text-xs text-[#667085]">
                  <div className="flex items-center gap-2">
                    <Store className="w-3.5 h-3.5 text-[#234A91] shrink-0" />
                    <span>Comercio: <strong className="text-[#15213A]">{mov.comercio}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#234A91] shrink-0" />
                    <span>Cliente: <strong className="text-[#15213A]">{mov.nombreConsumidor || 'Sofía Martínez'} ({mov.codigoConsumidor || 'CON-0001'})</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#234A91] shrink-0" />
                    <span>Operador: <strong className="text-[#15213A]">{mov.empleado}</strong></span>
                  </div>
                </div>

                {/* Additional metadata box for specific operation details */}
                <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#15213A]/5 text-xs space-y-1">
                  {isCarga && (
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span>Efectivo entregado: <strong className="text-[#15213A]">{formatPesos(mov.importeEntregado || 0)}</strong></span>
                      <span>Bonificación: <strong className="text-[#D92D8A]">+{formatPesos(mov.bonificacion || 0)}</strong></span>
                      <span>Saldo: <span className="text-[#667085]">{formatPesos(mov.saldoAnterior || 0)}</span> → <strong className="text-[#15213A]">{formatPesos(mov.saldoPosterior || 0)}</strong></span>
                    </div>
                  )}

                  {isCompra && (
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span>Total compra: <strong className="text-[#15213A]">{formatPesos(mov.totalCompra || 0)}</strong></span>
                      <span>Puntos sumados: <strong className="text-[#D92D8A]">+{mov.puntosObtenidos || 0} pts</strong></span>
                      {mov.pagoOtroMedio && (
                        <span>Medio externo: <strong className="text-[#15213A]">{mov.medioPagoExterno} ({formatPesos(mov.pagoOtroMedio)})</strong></span>
                      )}
                      <span>Saldo: <span className="text-[#667085]">{formatPesos(mov.saldoAnterior || 0)}</span> → <strong className="text-[#15213A]">{formatPesos(mov.saldoPosterior || 0)}</strong></span>
                    </div>
                  )}

                  {isAjuste && (
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span>Motivo administrativo: <strong className="text-[#15213A]">{mov.motivoAjuste}</strong></span>
                        {mov.movimientoRelacionadoId && (
                          <span>Ref. movimiento: <strong className="font-mono text-[#234A91]">{mov.movimientoRelacionadoId}</strong></span>
                        )}
                        <span>Saldo: <span className="text-[#667085]">{formatPesos(mov.saldoAnterior || 0)}</span> → <strong className="text-[#15213A]">{formatPesos(mov.saldoPosterior || 0)}</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
