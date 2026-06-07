export interface Categoria {
  id: number;
  codigo: string;
  descripcion: string;
  activo: boolean;
}

export interface CategoriaPayload {
  codigo: string;
  descripcion: string;
  activo: boolean;
}
