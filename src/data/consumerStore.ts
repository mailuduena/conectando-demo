import {
  ConsumidorPerfil,
  MovimientoRegistro,
  BeneficioItem,
  EmpleadoPerfil,
  MedioPagoExterno,
  LocalComercio,
  ReglasPrograma,
} from '../types';

const CONSUMIDOR_STORAGE_KEY = 'conectando_consumidor_perfil';
const MOVIMIENTOS_STORAGE_KEY = 'conectando_consumidor_movimientos';
const REGLAS_STORAGE_KEY = 'conectando_reglas_programa';
const BENEFICIOS_STORAGE_KEY = 'conectando_beneficios_catalogo';

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

export const LOCALES_DEMO: LocalComercio[] = [
  {
    id: 'loc-001',
    codigo: 'LOC-001',
    nombre: 'Panadería Centro',
    rubro: 'Panadería',
    estado: 'Activo',
    direccion: 'Dirección pendiente de definición',
    color: '#234A91',
  },
  {
    id: 'loc-002',
    codigo: 'LOC-002',
    nombre: 'Heladería Centro',
    rubro: 'Heladería',
    estado: 'Activo',
    direccion: 'Dirección pendiente de definición',
    color: '#D92D8A',
  },
  {
    id: 'loc-003',
    codigo: 'LOC-003',
    nombre: 'Panadería Norte',
    rubro: 'Panadería',
    estado: 'Activo',
    direccion: 'Dirección pendiente de definición',
    color: '#F5A623',
  },
  {
    id: 'loc-004',
    codigo: 'LOC-004',
    nombre: 'Panadería Sur',
    rubro: 'Panadería',
    estado: 'Activo',
    direccion: 'Dirección pendiente de definición',
    color: '#15213A',
  },
];

export const EMPLEADOS_DEMO: EmpleadoPerfil[] = [
  {
    id: 'emp-001',
    codigo: 'EMP-001',
    nombre: 'Martín López',
    comercioAsignado: 'Panadería Centro',
    permisos: 'Cargas y compras (sin ajustes)',
    estado: 'Activo',
  },
  {
    id: 'emp-002',
    codigo: 'EMP-002',
    nombre: 'Lucía Fernández',
    comercioAsignado: 'Heladería Centro',
    permisos: 'Cargas y compras (sin ajustes)',
    estado: 'Activo',
  },
  {
    id: 'emp-003',
    codigo: 'EMP-003',
    nombre: 'Carla Gómez',
    comercioAsignado: 'Panadería Norte',
    permisos: 'Cargas y compras (sin ajustes)',
    estado: 'Activo',
  },
  {
    id: 'emp-004',
    codigo: 'EMP-004',
    nombre: 'Diego Ruiz',
    comercioAsignado: 'Panadería Sur',
    permisos: 'Cargas y compras (sin ajustes)',
    estado: 'Activo',
  },
];

export const INITIAL_MOVIMIENTOS: MovimientoRegistro[] = [
  {
    id: 'mov-002',
    tipo: 'compra',
    titulo: 'Compra en local',
    fecha: '24/08/2026',
    hora: '18:15',
    comercio: 'Heladería Centro',
    codigoConsumidor: 'CON-0001',
    nombreConsumidor: 'Sofía Martínez',
    saldoAnterior: 33000,
    saldoPosterior: 25000,
    empleado: 'Lucía Fernández (EMP-002)',
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
    codigoConsumidor: 'CON-0001',
    nombreConsumidor: 'Sofía Martínez',
    saldoAnterior: 0,
    saldoPosterior: 33000,
    empleado: 'Martín López (EMP-001)',
    importeEntregado: 30000,
    bonificacion: 3000,
    creditoAcreditado: 33000,
    estado: 'Completada',
    descripcion: 'Acreditación en efectivo + bonificación promocional',
  },
];

export const INITIAL_REGLAS: ReglasPrograma = {
  porcentajeBonificacion: 10,
  importePorPunto: 1000,
  diasVigenciaBonificacion: 90,
  mesesVigenciaPuntos: 12,
};

export const INITIAL_BENEFICIOS: BeneficioItem[] = [
  {
    id: 'ben-descuento-10',
    tipo: 'descuento',
    titulo: '10 % de descuento',
    subtitulo: 'Aplicable en tu próxima compra',
    descripcion: 'Válido en cualquiera de los 4 comercios de la red sobre el total del ticket.',
    puntosRequeridos: 20,
    categoria: 'Descuentos',
    activo: true,
  },
  {
    id: 'ben-producto-gratis',
    tipo: 'producto',
    titulo: 'Producto seleccionado sin cargo',
    subtitulo: 'Especialidad de la casa',
    descripcion: 'Elegí entre 1/4 kg de helado artesanal o una docena de medialunas de manteca.',
    puntosRequeridos: 40,
    categoria: 'Productos',
    activo: true,
  },
  {
    id: 'ben-sorteo-mensual',
    tipo: 'sorteo',
    titulo: 'Una participación en el sorteo mensual',
    subtitulo: 'Premio acumulado de la red',
    descripcion: 'Sumá una chance para el sorteo mensual de $50.000 en crédito unificado.',
    puntosRequeridos: 10,
    categoria: 'Sorteos',
    activo: true,
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

export const getReglasPrograma = (): ReglasPrograma => {
  try {
    const data = localStorage.getItem(REGLAS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Error al leer reglas desde localStorage', err);
  }
  return INITIAL_REGLAS;
};

export const saveReglasPrograma = (reglas: ReglasPrograma): void => {
  try {
    localStorage.setItem(REGLAS_STORAGE_KEY, JSON.stringify(reglas));
  } catch (err) {
    console.warn('Error al guardar reglas en localStorage', err);
  }
};

export const getBeneficiosCatalogo = (): BeneficioItem[] => {
  try {
    const data = localStorage.getItem(BENEFICIOS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Error al leer beneficios desde localStorage', err);
  }
  return INITIAL_BENEFICIOS;
};

export const saveBeneficiosCatalogo = (beneficios: BeneficioItem[]): void => {
  try {
    localStorage.setItem(BENEFICIOS_STORAGE_KEY, JSON.stringify(beneficios));
  } catch (err) {
    console.warn('Error al guardar beneficios en localStorage', err);
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

export const buscarConsumidorPorCodigo = (codigoIngresado: string): ConsumidorPerfil | null => {
  const perfilActual = getConsumidorPerfil();
  const codigoLimpio = codigoIngresado.trim().toUpperCase();
  if (perfilActual.codigoCliente.toUpperCase() === codigoLimpio) {
    return perfilActual;
  }
  return null;
};

export const registrarCargaPresencial = (
  importeRecibido: number,
  empleado: EmpleadoPerfil,
  consumidor: ConsumidorPerfil
): { nuevoPerfil: ConsumidorPerfil; nuevoMovimiento: MovimientoRegistro } => {
  const reglas = getReglasPrograma();
  const porcentaje = typeof reglas.porcentajeBonificacion === 'number' ? reglas.porcentajeBonificacion : 10;
  const bonificacion = Math.round(importeRecibido * (porcentaje / 100));
  const creditoAcreditado = importeRecibido + bonificacion;

  const saldoAnterior = consumidor.creditoComprado + consumidor.creditoPromocional;
  const nuevoCreditoComprado = consumidor.creditoComprado + importeRecibido;
  const nuevoCreditoPromocional = consumidor.creditoPromocional + bonificacion;
  const saldoPosterior = nuevoCreditoComprado + nuevoCreditoPromocional;

  const now = new Date();
  const diasVigencia = typeof reglas.diasVigenciaBonificacion === 'number' ? reglas.diasVigenciaBonificacion : 90;
  const fechaVigencia = new Date(now.getTime() + diasVigencia * 24 * 60 * 60 * 1000);
  const dd = String(fechaVigencia.getDate()).padStart(2, '0');
  const mm = String(fechaVigencia.getMonth() + 1).padStart(2, '0');
  const yyyy = fechaVigencia.getFullYear();
  const nuevoVencimiento = `${dd}/${mm}/${yyyy}`;

  const nuevoPerfil: ConsumidorPerfil = {
    ...consumidor,
    creditoComprado: nuevoCreditoComprado,
    creditoPromocional: nuevoCreditoPromocional,
    vencimientoPromocional: nuevoVencimiento,
  };

  const fechaStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const horaStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const nuevoMovimiento: MovimientoRegistro = {
    id: `mov-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    tipo: 'carga',
    titulo: 'Carga presencial de crédito',
    fecha: fechaStr,
    hora: horaStr,
    comercio: empleado.comercioAsignado,
    empleado: `${empleado.nombre} (${empleado.codigo})`,
    codigoConsumidor: consumidor.codigoCliente,
    nombreConsumidor: consumidor.nombre,
    importeEntregado: importeRecibido,
    bonificacion: bonificacion,
    creditoAcreditado: creditoAcreditado,
    saldoAnterior: saldoAnterior,
    saldoPosterior: saldoPosterior,
    estado: 'Completada',
    descripcion: `Acreditación presencial en ${empleado.comercioAsignado} (+${porcentaje}% bonificación)`,
  };

  saveConsumidorPerfil(nuevoPerfil);
  const movimientosActuales = getMovimientos();
  saveMovimientos([nuevoMovimiento, ...movimientosActuales]);

  return { nuevoPerfil, nuevoMovimiento };
};

export const registrarCompraLocal = (
  totalCompra: number,
  empleado: EmpleadoPerfil,
  consumidor: ConsumidorPerfil,
  medioPagoExterno?: MedioPagoExterno
): { nuevoPerfil: ConsumidorPerfil; nuevoMovimiento: MovimientoRegistro } => {
  const reglas = getReglasPrograma();
  const importePorPunto = typeof reglas.importePorPunto === 'number' && reglas.importePorPunto > 0 ? reglas.importePorPunto : 1000;

  const saldoTotal = consumidor.creditoComprado + consumidor.creditoPromocional;
  const saldoAnterior = saldoTotal;

  let creditoUtilizado = 0;
  let pagoOtroMedio = 0;
  let nuevoPromocional = consumidor.creditoPromocional;
  let nuevoComprado = consumidor.creditoComprado;

  if (saldoTotal >= totalCompra) {
    creditoUtilizado = totalCompra;
    pagoOtroMedio = 0;
    if (consumidor.creditoPromocional >= totalCompra) {
      nuevoPromocional = consumidor.creditoPromocional - totalCompra;
    } else {
      const resto = totalCompra - consumidor.creditoPromocional;
      nuevoPromocional = 0;
      nuevoComprado = consumidor.creditoComprado - resto;
    }
  } else {
    creditoUtilizado = saldoTotal;
    pagoOtroMedio = totalCompra - saldoTotal;
    nuevoPromocional = 0;
    nuevoComprado = 0;
  }

  const saldoPosterior = nuevoComprado + nuevoPromocional;
  const puntosSumados = Math.floor(totalCompra / importePorPunto);
  const nuevosPuntos = consumidor.puntos + puntosSumados;

  const nuevoPerfil: ConsumidorPerfil = {
    ...consumidor,
    creditoComprado: nuevoComprado,
    creditoPromocional: nuevoPromocional,
    puntos: nuevosPuntos,
  };

  const now = new Date();
  const fechaStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const horaStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const nuevoMovimiento: MovimientoRegistro = {
    id: `mov-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    tipo: 'compra',
    titulo: 'Compra en local',
    fecha: fechaStr,
    hora: horaStr,
    comercio: empleado.comercioAsignado,
    empleado: `${empleado.nombre} (${empleado.codigo})`,
    codigoConsumidor: consumidor.codigoCliente,
    nombreConsumidor: consumidor.nombre,
    totalCompra: totalCompra,
    creditoUtilizado: creditoUtilizado,
    pagoOtroMedio: pagoOtroMedio > 0 ? pagoOtroMedio : undefined,
    medioPagoExterno: pagoOtroMedio > 0 ? medioPagoExterno : undefined,
    puntosObtenidos: puntosSumados,
    saldoAnterior: saldoAnterior,
    saldoPosterior: saldoPosterior,
    estado: 'Completada',
    descripcion: `Compra presencial en ${empleado.comercioAsignado}${
      pagoOtroMedio > 0 ? ` (Saldo: ${formatPesos(creditoUtilizado)} + ${medioPagoExterno || 'Otro medio'}: ${formatPesos(pagoOtroMedio)})` : ''
    }`,
  };

  saveConsumidorPerfil(nuevoPerfil);
  const movimientosActuales = getMovimientos();
  saveMovimientos([nuevoMovimiento, ...movimientosActuales]);

  return { nuevoPerfil, nuevoMovimiento };
};

export const registrarAjusteSaldo = (
  consumidor: ConsumidorPerfil,
  tipoAjuste: 'credito_positivo' | 'credito_negativo',
  importe: number,
  motivo: string,
  movimientoRelacionadoId?: string
): { nuevoPerfil: ConsumidorPerfil; nuevoMovimiento: MovimientoRegistro } => {
  if (importe <= 0) {
    throw new Error('El importe del ajuste debe ser mayor a cero.');
  }

  const saldoAnterior = consumidor.creditoComprado + consumidor.creditoPromocional;
  let nuevoComprado = consumidor.creditoComprado;
  let nuevoPromocional = consumidor.creditoPromocional;

  if (tipoAjuste === 'credito_negativo') {
    if (importe > saldoAnterior) {
      throw new Error(`El ajuste a descontar ($${importe}) supera el saldo disponible total ($${saldoAnterior}).`);
    }
    // Descontar primero del promocional, luego del comprado
    if (consumidor.creditoPromocional >= importe) {
      nuevoPromocional = consumidor.creditoPromocional - importe;
    } else {
      const resto = importe - consumidor.creditoPromocional;
      nuevoPromocional = 0;
      nuevoComprado = Math.max(0, consumidor.creditoComprado - resto);
    }
  } else {
    // Acreditar directamente a crédito comprado (sin vencimiento)
    nuevoComprado = consumidor.creditoComprado + importe;
  }

  const saldoPosterior = nuevoComprado + nuevoPromocional;

  const now = new Date();
  const fechaStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const horaStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const nuevoMovimiento: MovimientoRegistro = {
    id: `ajuste-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    tipo: 'ajuste',
    titulo: tipoAjuste === 'credito_positivo' ? 'Ajuste administrativo a favor' : 'Ajuste administrativo de débito',
    fecha: fechaStr,
    hora: horaStr,
    comercio: 'Administración Central',
    empleado: 'Cuenta administradora demo',
    responsableAjuste: 'Cuenta administradora demo',
    codigoConsumidor: consumidor.codigoCliente,
    nombreConsumidor: consumidor.nombre,
    tipoAjuste: tipoAjuste,
    motivoAjuste: motivo.trim(),
    movimientoRelacionadoId: movimientoRelacionadoId || undefined,
    importeEntregado: tipoAjuste === 'credito_positivo' ? importe : undefined,
    creditoUtilizado: tipoAjuste === 'credito_negativo' ? importe : undefined,
    creditoAcreditado: tipoAjuste === 'credito_positivo' ? importe : undefined,
    saldoAnterior: saldoAnterior,
    saldoPosterior: saldoPosterior,
    puntosObtenidos: 0,
    bonificacion: 0,
    estado: 'Completada',
    descripcion: `Ajuste administrativo: ${motivo.trim()}${
      movimientoRelacionadoId ? ` (Ref. operación: ${movimientoRelacionadoId})` : ''
    }`,
  };

  const nuevoPerfil: ConsumidorPerfil = {
    ...consumidor,
    creditoComprado: nuevoComprado,
    creditoPromocional: nuevoPromocional,
  };

  saveConsumidorPerfil(nuevoPerfil);
  const movimientosActuales = getMovimientos();
  saveMovimientos([nuevoMovimiento, ...movimientosActuales]);

  return { nuevoPerfil, nuevoMovimiento };
};
