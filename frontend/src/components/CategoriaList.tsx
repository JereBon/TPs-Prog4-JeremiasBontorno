import { Categoria } from '../types/categoria';

interface Props {
  categorias: Categoria[];
  onEditar: (categoria: Categoria) => void;
  onEliminar: (id: number) => void;
}

export default function CategoriaList({ categorias, onEditar, onEliminar }: Props) {
  if (categorias.length === 0) {
    return <p className="text-gray-500 mt-4">No hay categorías registradas.</p>;
  }

  return (
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Código</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Descripción</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Activo</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((cat) => (
          <tr key={cat.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{cat.id}</td>
            <td className="border border-gray-300 px-4 py-2">{cat.codigo}</td>
            <td className="border border-gray-300 px-4 py-2">{cat.descripcion}</td>
            <td className="border border-gray-300 px-4 py-2">{cat.activo ? 'Sí' : 'No'}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => onEditar(cat)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onEliminar(cat.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
