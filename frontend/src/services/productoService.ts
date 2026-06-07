import { Producto } from '../types/producto';

const BASE_URL = 'http://localhost:8000/productos';

export async function getProductos(): Promise<Producto[]> {
  const res = await fetch(`${BASE_URL}/?limit=50`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}
