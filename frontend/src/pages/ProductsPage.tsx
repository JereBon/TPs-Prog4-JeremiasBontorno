import { useState, useEffect } from 'react';
import { Producto } from '../types/producto';
import { getProductos } from '../services/productoService';

export default function ProductsPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .catch(() => setError('No se pudo conectar con el servidor'));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}

      {productos.length === 0 && !error ? (
        <p className="text-gray-500">No hay productos registrados.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Categoría</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Precio</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Stock</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Activo</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{p.id}</td>
                <td className="border border-gray-300 px-4 py-2">{p.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{p.categoria}</td>
                <td className="border border-gray-300 px-4 py-2">${p.precio}</td>
                <td className="border border-gray-300 px-4 py-2">{p.stock}</td>
                <td className="border border-gray-300 px-4 py-2">{p.activo ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
