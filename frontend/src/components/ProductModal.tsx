import { useForm } from '@tanstack/react-form';
import { Producto, ProductoPayload } from '../types/producto';

interface Props {
  abierto: boolean;
  productoEditando: Producto | null;
  onSubmit: (data: ProductoPayload) => void;
  onCerrar: () => void;
}

export default function ProductModal({ abierto, productoEditando, onSubmit, onCerrar }: Props) {
  const form = useForm({
    defaultValues: {
      nombre: productoEditando?.nombre ?? '',
      categoria: productoEditando?.categoria ?? '',
      precio: productoEditando?.precio ?? 0,
      stock: productoEditando?.stock ?? 0,
      stock_minimo: productoEditando?.stock_minimo ?? 0,
      activo: productoEditando?.activo ?? true,
    },
    onSubmit: async ({ value }) => {
      onSubmit({
        ...value,
        precio: Number(value.precio),
        stock: Number(value.stock),
        stock_minimo: Number(value.stock_minimo),
      });
    },
  });

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {productoEditando ? 'Editar Producto' : 'Nuevo Producto'}
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

          <form.Field name="categoria">
            {(field) => (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Categoría (ej: MUE-01)</label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value.toUpperCase())}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="precio">
            {(field) => (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Precio</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="stock">
            {(field) => (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Stock</label>
                <input
                  type="number"
                  min="0"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="stock_minimo">
            {(field) => (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Stock mínimo</label>
                <input
                  type="number"
                  min="0"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as unknown as number)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="activo">
            {(field) => (
              <div className="mb-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activo-prod"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="activo-prod" className="text-sm">Activo</label>
              </div>
            )}
          </form.Field>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {productoEditando ? 'Actualizar' : 'Crear'}
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
