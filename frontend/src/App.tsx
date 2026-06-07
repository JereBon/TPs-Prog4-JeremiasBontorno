import { useState, useEffect } from 'react';
import { Categoria, CategoriaPayload } from './types/categoria';
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from './services/categoriaService';
import CategoriaForm from './components/CategoriaForm';
import CategoriaList from './components/CategoriaList';

export default function App() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
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

  async function handleSubmit(data: CategoriaPayload) {
    try {
      if (categoriaEditando) {
        await updateCategoria(categoriaEditando.id, data);
        setCategoriaEditando(null);
      } else {
        await createCategoria(data);
      }
      setError(null);
      cargarCategorias();
    } catch {
      setError('Error al guardar la categoría. Verificá que el código tenga el formato correcto (ej: MUE-01).');
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

  return (
    <div className="container">
      <h1>Gestión de Categorías</h1>
      {error && <p className="error">{error}</p>}
      <CategoriaForm
        categoriaEditando={categoriaEditando}
        onSubmit={handleSubmit}
        onCancelar={() => setCategoriaEditando(null)}
      />
      <hr />
      <h2>Categorías registradas</h2>
      <CategoriaList
        categorias={categorias}
        onEditar={setCategoriaEditando}
        onEliminar={handleEliminar}
      />
    </div>
  );
}
