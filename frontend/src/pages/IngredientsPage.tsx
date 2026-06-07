import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
import { Ingrediente, IngredientePayload } from '../types/ingrediente';
import {
  getIngredientes,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
} from '../services/ingredienteService';
import IngredienteModal from '../components/IngredienteModal';

const columnHelper = createColumnHelper<Ingrediente>();

export default function IngredientsPage() {
  const queryClient = useQueryClient();
  const [ingredienteEditando, setIngredienteEditando] = useState<Ingrediente | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: ingredientes = [] } = useQuery({
    queryKey: ['ingredientes'],
    queryFn: getIngredientes,
  });

  const crearMutation = useMutation({
    mutationFn: (data: IngredientePayload) => createIngrediente(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredientes'] });
      setModalAbierto(false);
      setIngredienteEditando(null);
      setError(null);
    },
    onError: () => setError('Error al guardar el ingrediente'),
  });

  const actualizarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<IngredientePayload> }) =>
      updateIngrediente(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredientes'] });
      setModalAbierto(false);
      setIngredienteEditando(null);
      setError(null);
    },
    onError: () => setError('Error al guardar el ingrediente'),
  });

  const eliminarMutation = useMutation({
    mutationFn: (id: number) => deleteIngrediente(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredientes'] });
      setError(null);
    },
    onError: () => setError('Error al eliminar el ingrediente'),
  });

  function handleSubmit(data: IngredientePayload) {
    if (ingredienteEditando) {
      actualizarMutation.mutate({ id: ingredienteEditando.id, data });
    } else {
      crearMutation.mutate(data);
    }
  }

  function handleEliminar(id: number) {
    if (!confirm('¿Eliminar este ingrediente?')) return;
    eliminarMutation.mutate(id);
  }

  const columns = [
    columnHelper.accessor('nombre', { header: 'Nombre' }),
    columnHelper.accessor('descripcion', {
      header: 'Descripción',
      cell: (info) => info.getValue() ?? '-',
    }),
    columnHelper.accessor('es_alergeno', {
      header: 'Alérgeno',
      cell: (info) => (info.getValue() ? 'Sí' : 'No'),
    }),
    columnHelper.display({
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => { setIngredienteEditando(row.original); setModalAbierto(true); }}
            className="text-blue-600 hover:underline text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => handleEliminar(row.original.id)}
            className="text-red-600 hover:underline text-sm"
          >
            Eliminar
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: ingredientes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ingredientes</h1>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nuevo ingrediente
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}

      <table className="w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border border-gray-200 px-4 py-2 text-left font-semibold">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                No hay ingredientes registrados
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border border-gray-200 px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <IngredienteModal
        abierto={modalAbierto}
        ingredienteEditando={ingredienteEditando}
        onSubmit={handleSubmit}
        onCerrar={() => { setModalAbierto(false); setIngredienteEditando(null); }}
      />
    </div>
  );
}
