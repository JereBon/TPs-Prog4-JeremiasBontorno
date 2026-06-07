import { Categoria } from '../types/categoria';

interface Props {
  categorias: Categoria[];
  onEditar: (categoria: Categoria) => void;
  onEliminar: (id: number) => void;
}

export default function CategoriaList({ categorias, onEditar, onEliminar }: Props) {
  if (categorias.length === 0) {
    return <p>No hay categorías registradas.</p>;
  }

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>ID</th>
          <th>Código</th>
          <th>Descripción</th>
          <th>Activo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((cat) => (
          <tr key={cat.id}>
            <td>{cat.id}</td>
            <td>{cat.codigo}</td>
            <td>{cat.descripcion}</td>
            <td>{cat.activo ? 'Sí' : 'No'}</td>
            <td>
              <button onClick={() => onEditar(cat)}>Editar</button>
              <button onClick={() => onEliminar(cat.id)} className="btn-eliminar">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
