export type UserRole = 'consumidor' | 'empleado' | 'dueno';

export type AppView = 'landing' | 'roles' | 'welcome' | 'consumidor' | 'empleado' | 'dueno';

export type ConsumidorTab = 'inicio' | 'beneficios' | 'movimientos' | 'qr';

export type OwnerTab = 'resumen' | 'locales' | 'clientes' | 'empleados' | 'movimientos' | 'reglas_beneficios';

export type TipoMovimiento = 'todos' | 'carga' | 'compra' | 'canje' | 'ajuste';

export type MedioPagoExterno = 'Efectivo' | 'Tarjeta' | 'Transferencia' | 'Otro';

export interface LocalComercio {
  id: string;
  codigo?: string;
  nombre: string;
  rubro?: string;
  tipo?: string;
  ubicacion?: string;
  estado?: 'Activo' | 'Inactivo';
  direccion?: string;
  color?: string;
}

export interface EmpleadoPerfil {
  id: string;
  codigo: string;
  nombre: string;
  comercioAsignado: string;
  permisos: string;
  estado?: 'Activo' | 'Inactivo';
}

export interface ConsumidorPerfil {
  nombre: string;
  codigoCliente: string;
  creditoComprado: number;
  creditoPromocional: number;
  vencimientoPromocional: string;
  puntos: number;
  telefono: string;
  email: string;
}

export interface MovimientoRegistro {
  id: string;
  tipo: 'carga' | 'compra' | 'canje' | 'ajuste';
  titulo: string;
  fecha: string;
  hora: string;
  comercio: string;
  empleado: string;
  importeEntregado?: number;
  bonificacion?: number;
  creditoAcreditado?: number;
  totalCompra?: number;
  creditoUtilizado?: number;
  saldoAnterior?: number;
  saldoPosterior?: number;
  pagoOtroMedio?: number;
  medioPagoExterno?: MedioPagoExterno;
  codigoConsumidor?: string;
  nombreConsumidor?: string;
  puntosObtenidos?: number;
  estado: 'Completada' | 'Pendiente' | 'Cancelada';
  descripcion?: string;
  motivoAjuste?: string;
  movimientoRelacionadoId?: string;
  responsableAjuste?: string;
  tipoAjuste?: 'credito_positivo' | 'credito_negativo';
}

export interface BeneficioItem {
  id: string;
  tipo: 'descuento' | 'producto' | 'sorteo';
  titulo: string;
  subtitulo: string;
  descripcion: string;
  puntosRequeridos: number;
  categoria: string;
  activo: boolean;
}

export interface ReglasPrograma {
  porcentajeBonificacion: number;
  importePorPunto: number;
  diasVigenciaBonificacion: number;
  mesesVigenciaPuntos: number;
}

