export type UserRole = 'consumidor' | 'empleado' | 'dueno';

export type AppView = 'landing' | 'roles' | 'welcome';

export interface LocalComercio {
  id: string;
  nombre: string;
  tipo: string;
  ubicacion: string;
  color: string;
}
