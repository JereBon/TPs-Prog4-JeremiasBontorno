import { useState, useEffect } from 'react';
import { Categoria, CategoriaPayload } from '../types/categoria';

interface Props {
  categoriaEditando: Categoria | null;
  onSubmit: (data: CategoriaPayload) => void;
  onCancelar: () => void;
}

export default function CategoriaForm({ categoriaEditando, onSubmit, onCancelar }: Props) {
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
  }, [categoriaEditando]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ codigo, descripcion, activo });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{categoriaEditando ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
      <div className="form-group">
        <label>Código (formato: ABC-01)</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.toUpperCase())}
          placeholder="MUE-01"
          required
        />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción de la categoría"
          required
        />
      </div>
      <div className="form-group checkbox">
        <label>
          <input
            type="checkbox"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
          />
          Activo
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">{categoriaEditando ? 'Actualizar' : 'Crear'}</button>
        {categoriaEditando && (
          <button type="button" onClick={onCancelar}>Cancelar</button>
        )}
      </div>
    </form>
  );
}
