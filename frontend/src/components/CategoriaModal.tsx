import { useState, useEffect } from 'react';
import { Categoria, CategoriaPayload } from '../types/categoria';

interface Props {
  abierto: boolean;
  categoriaEditando: Categoria | null;
  onSubmit: (data: CategoriaPayload) => void;
  onCerrar: () => void;
}

export default function CategoriaModal({ abierto, categoriaEditando, onSubmit, onCerrar }: Props) {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (categoriaEditando) {
      setCodigo(categoriaEditando.codigo);
      setDescripcion(categoriaEditando.descripcion);
      setActivo(categoriaEditando.activo);
    } else {
      setCodigo('');
      setDescripcion('');
      setActivo(true);
    }
  }, [categoriaEditando, abierto]);

  if (!abierto) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ codigo, descripcion, activo });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Código (ej: MUE-01)</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.toUpperCase())}
              placeholder="MUE-01"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Descripción</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción de la categoría"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6 flex items-center gap-2">
            <input
              type="checkbox"
              id="activo"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="activo" className="text-sm">Activo</label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {categoriaEditando ? 'Actualizar' : 'Crear'}
            </button>
            <button
              type="button"
              onClick={onCerrar}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
