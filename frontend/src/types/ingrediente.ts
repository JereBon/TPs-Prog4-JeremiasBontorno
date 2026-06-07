export interface Ingrediente {
  id: number;
  nombre: string;
  descripcion: string | null;
  es_alergeno: boolean;
}

export interface IngredientePayload {
  nombre: string;
  descripcion: string | null;
  es_alergeno: boolean;
}
