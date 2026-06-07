import { Ingrediente, IngredientePayload } from '../types/ingrediente';

const BASE_URL = 'http://localhost:8000/ingredientes';

export async function getIngredientes(): Promise<Ingrediente[]> {
  const res = await fetch(`${BASE_URL}/`);
  if (!res.ok) throw new Error('Error al obtener ingredientes');
  return res.json();
}

export async function createIngrediente(data: IngredientePayload): Promise<Ingrediente> {
  const res = await fetch(`${BASE_URL}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear ingrediente');
  return res.json();
}

export async function updateIngrediente(id: number, data: Partial<IngredientePayload>): Promise<Ingrediente> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar ingrediente');
  return res.json();
}

export async function deleteIngrediente(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar ingrediente');
}
