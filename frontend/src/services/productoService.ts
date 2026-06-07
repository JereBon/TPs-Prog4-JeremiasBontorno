import { Producto, ProductoPayload } from '../types/producto';

const BASE_URL = 'http://localhost:8000/productos';

export async function getProductos(): Promise<Producto[]> {
  const res = await fetch(`${BASE_URL}/?limit=50`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function createProducto(data: ProductoPayload): Promise<Producto> {
  const res = await fetch(`${BASE_URL}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
}

export async function updateProducto(id: number, data: ProductoPayload): Promise<Producto> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return res.json();
}

export async function deleteProducto(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar producto');
}
