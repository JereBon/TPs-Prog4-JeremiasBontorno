import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
import { Categoria, CategoriaPayload } from '../types/categoria';
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from '../services/categoriaService';
import CategoriaModal from '../components/CategoriaModal';

const columnHelper = createColumnHelper<Categoria>();

export default function CategoriasPage() {
  const queryClient = useQueryClient();
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: categorias = [] } = useQuery({
    queryKey: ['categorias'],
    queryFn: getCategorias,
  });

  const crearMutation = useMutation({
    mutationFn: (data: CategoriaPayload) => createCategoria(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
      setModalAbierto(false);
      setCategoriaEditando(null);
      setError(null);
    },
    onError: () => setError('Error al guardar la categoría. Verificá el formato del código (ej: MUE-01).'),
  });

  const actualizarMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoriaPayload }) => updateCategoria(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
      setModalAbierto(false);
      setCategoriaEditando(null);
      setError(null);
    },
    onError: () => setError('Error al guardar la categoría. Verificá el formato del código (ej: MUE-01).'),
  });

  const eliminarMutation = useMutation({
    mutationFn: (id: number) => deleteCategoria(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categorias'] });
      setError(null);
    },
    onError: () => setError('Error al eliminar la categoría'),
  });

  function handleSubmit(data: CategoriaPayload) {
    if (categoriaEditando) {
      actualizarMutation.mutate({ id: categoriaEditando.id, data });
    } else {
      crearMutation.mutate(data);
    }
  }

  function handleEliminar(id: number) {
    if (!confirm('¿Eliminar esta categoría?')) return;
    eliminarMutation.mutate(id);
  }

  const columns = [
    columnHelper.accessor('codigo', { header: 'Código' }),
    columnHelper.accessor('descripcion', { header: 'Descripción' }),
    columnHelper.accessor('activo', {
      header: 'Activo',
      cell: (info) => (info.getValue() ? 'Sí' : 'No'),
    }),
    columnHelper.display({
      id: 'acciones',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => { setCategoriaEditando(row.original); setModalAbierto(true); }}
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
    data: categorias,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
                No hay categorías registradas
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

      <CategoriaModal
        abierto={modalAbierto}
        categoriaEditando={categoriaEditando}
        onSubmit={handleSubmit}
        onCerrar={() => { setModalAbierto(false); setCategoriaEditando(null); }}
      />
    </div>
  );
}
