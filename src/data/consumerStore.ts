import { ConsumidorPerfil, MovimientoRegistro, BeneficioItem } from '../types';

const CONSUMIDOR_STORAGE_KEY = 'conectando_consumidor_perfil';
const MOVIMIENTOS_STORAGE_KEY = 'conectando_consumidor_movimientos';

export const INITIAL_CONSUMIDOR: ConsumidorPerfil = {
  nombre: 'Sofía Martínez',
  codigoCliente: 'CON-0001',
  creditoComprado: 22000,
  creditoPromocional: 3000,
  vencimientoPromocional: '22/11/2026',
  puntos: 8,
  telefono: '11 0000-0000',
  email: 'sofia.demo@conectando.app',
};

export const INITIAL_MOVIMIENTOS: MovimientoRegistro[] = [
  {
    id: 'mov-002',
    tipo: 'compra',
    titulo: 'Compra en local',
    fecha: '24/08/2026',
    hora: '18:15',
    comercio: 'Heladería Centro',
    empleado: 'Lucía Fernández',
    totalCompra: 8000,
    creditoUtilizado: 8000,
    puntosObtenidos: 8,
    estado: 'Completada',
    descripcion: 'Consumo presencial en caja',
  },
  {
    id: 'mov-001',
    tipo: 'carga',
    titulo: 'Carga presencial de crédito',
    fecha: '24/08/2026',
    hora: '10:30',
    comercio: 'Panadería Centro',
    empleado: 'Martín López',
    importeEntregado: 30000,
    bonificacion: 3000,
    creditoAcreditado: 33000,
    estado: 'Completada',
    descripcion: 'Acreditación en efectivo + bonificación promocional',
  },
];

export const CATALOGO_BENEFICIOS: BeneficioItem[] = [
  {
    id: 'ben-descuento-10',
    tipo: 'descuento',
    titulo: '10 % de descuento',
    subtitulo: 'Aplicable en tu próxima compra',
    descripcion: 'Válido en cualquiera de los 4 comercios de la red sobre el total del ticket.',
    puntosRequeridos: 20,
    categoria: 'Descuentos',
  },
  {
    id: 'ben-producto-gratis',
    tipo: 'producto',
    titulo: 'Producto seleccionado sin cargo',
    subtitulo: 'Especialidad de la casa',
    descripcion: 'Elegí entre 1/4 kg de helado artesanal o una docena de medialunas de manteca.',
    puntosRequeridos: 40,
    categoria: 'Productos',
  },
  {
    id: 'ben-sorteo-mensual',
    tipo: 'sorteo',
    titulo: 'Una participación en el sorteo mensual',
    subtitulo: 'Premio acumulado de la red',
    descripcion: 'Sumá una chance para el sorteo mensual de $50.000 en crédito unificado.',
    puntosRequeridos: 10,
    categoria: 'Sorteos',
  },
];

export const getConsumidorPerfil = (): ConsumidorPerfil => {
  try {
    const data = localStorage.getItem(CONSUMIDOR_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Error al leer consumidor desde localStorage', err);
  }
  return INITIAL_CONSUMIDOR;
};

export const saveConsumidorPerfil = (perfil: ConsumidorPerfil): void => {
  try {
    localStorage.setItem(CONSUMIDOR_STORAGE_KEY, JSON.stringify(perfil));
  } catch (err) {
    console.warn('Error al guardar consumidor en localStorage', err);
  }
};

export const getMovimientos = (): MovimientoRegistro[] => {
  try {
    const data = localStorage.getItem(MOVIMIENTOS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Error al leer movimientos desde localStorage', err);
  }
  return INITIAL_MOVIMIENTOS;
};

export const saveMovimientos = (movimientos: MovimientoRegistro[]): void => {
  try {
    localStorage.setItem(MOVIMIENTOS_STORAGE_KEY, JSON.stringify(movimientos));
  } catch (err) {
    console.warn('Error al guardar movimientos en localStorage', err);
  }
};

export const formatPesos = (monto: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(monto);
};
