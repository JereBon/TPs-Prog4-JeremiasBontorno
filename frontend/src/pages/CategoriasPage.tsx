import { useState, useEffect } from 'react';
import { Categoria, CategoriaPayload } from '../types/categoria';
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from '../services/categoriaService';
import CategoriaList from '../components/CategoriaList';
import CategoriaModal from '../components/CategoriaModal';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cargarCategorias() {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch {
      setError('No se pudo conectar con el servidor');
    }
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  function handleEditar(categoria: Categoria) {
    setCategoriaEditando(categoria);
    setModalAbierto(true);
  }

  async function handleSubmit(data: CategoriaPayload) {
    try {
      if (categoriaEditando) {
        await updateCategoria(categoriaEditando.id, data);
      } else {
        await createCategoria(data);
      }
      setError(null);
      setModalAbierto(false);
      setCategoriaEditando(null);
      cargarCategorias();
    } catch {
      setError('Error al guardar la categoría. Verificá el formato del código (ej: MUE-01).');
    }
  }

  async function handleEliminar(id: number) {
    if (!confirm('¿Eliminar esta categoría?')) return;
    try {
      await deleteCategoria(id);
      setError(null);
      cargarCategorias();
    } catch {
      setError('Error al eliminar la categoría');
    }
  }

  function handleCerrarModal() {
    setModalAbierto(false);
    setCategoriaEditando(null);
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nueva categoría
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}

      <CategoriaList
        categorias={categorias}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />

      <CategoriaModal
        abierto={modalAbierto}
        categoriaEditando={categoriaEditando}
        onSubmit={handleSubmit}
        onCerrar={handleCerrarModal}
      />
    </div>
  );
}
