import { useForm } from '@tanstack/react-form';
import { Ingrediente, IngredientePayload } from '../types/ingrediente';

interface Props {
  abierto: boolean;
  ingredienteEditando: Ingrediente | null;
  onSubmit: (data: IngredientePayload) => void;
  onCerrar: () => void;
}

export default function IngredienteModal({ abierto, ingredienteEditando, onSubmit, onCerrar }: Props) {
  const form = useForm({
    defaultValues: {
      nombre: ingredienteEditando?.nombre ?? '',
      descripcion: ingredienteEditando?.descripcion ?? '',
      es_alergeno: ingredienteEditando?.es_alergeno ?? false,
    },
    onSubmit: async ({ value }) => {
      onSubmit({
        nombre: value.nombre,
        descripcion: value.descripcion || null,
        es_alergeno: value.es_alergeno,
      });
    },
  });

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {ingredienteEditando ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="nombre">
            {(field) => (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Nombre</label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="descripcion">
            {(field) => (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Descripción</label>
                <input
                  type="text"
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="es_alergeno">
            {(field) => (
              <div className="mb-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="es_alergeno"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="es_alergeno" className="text-sm">Es alérgeno</label>
              </div>
            )}
          </form.Field>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {ingredienteEditando ? 'Actualizar' : 'Crear'}
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
