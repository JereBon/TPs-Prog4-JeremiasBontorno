import { Categoria, CategoriaPayload } from '../types/categoria';

const BASE_URL = 'http://localhost:8000/categorias';

export async function getCategorias(): Promise<Categoria[]> {
  const res = await fetch(`${BASE_URL}/?limit=50`);
  if (!res.ok) throw new Error('Error al obtener categorías');
  return res.json();
}

export async function createCategoria(data: CategoriaPayload): Promise<Categoria> {
  const res = await fetch(`${BASE_URL}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return res.json();
}

export async function updateCategoria(id: number, data: CategoriaPayload): Promise<Categoria> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar categoría');
  return res.json();
}

export async function deleteCategoria(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar categoría');
}
