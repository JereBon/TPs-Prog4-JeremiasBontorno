export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  stock_minimo: number;
  activo: boolean;
}

export interface ProductoPayload {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  stock_minimo: number;
  activo: boolean;
}
