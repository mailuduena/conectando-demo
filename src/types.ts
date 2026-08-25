export type UserRole = 'consumidor' | 'empleado' | 'dueno';

export type AppView = 'landing' | 'roles' | 'welcome' | 'consumidor';

export type ConsumidorTab = 'inicio' | 'beneficios' | 'movimientos' | 'qr';

export type TipoMovimiento = 'todos' | 'carga' | 'compra' | 'canje' | 'ajuste';

export interface LocalComercio {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  color: string;
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
  puntosObtenidos?: number;
  estado: 'Completada' | 'Pendiente' | 'Cancelada';
  descripcion?: string;
}

export interface BeneficioItem {
  id: string;
  tipo: 'descuento' | 'producto' | 'sorteo';
  titulo: string;
  subtitulo: string;
  descripcion: string;
  puntosRequeridos: number;
  categoria: string;
}

