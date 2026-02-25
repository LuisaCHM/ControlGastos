import { useState, useEffect } from 'react';
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from '../services/categoriasService';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const load = () => {
    setLoading(true);
    getCategorias()
      .then(setCategorias)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const openCreate = () => {
    setEditingId(null);
    setNombre('');
    setModalOpen(true);
  };

  const openEdit = (c) => {
    setEditingId(c.id);
    setNombre(c.nombre);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setNombre('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    setError('');
    try {
      if (editingId) {
        await updateCategoria(editingId, { nombre: nombre.trim() });
      } else {
        await createCategoria({ nombre: nombre.trim() });
      }
      closeModal();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;
    try {
      await deleteCategoria(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[160px] items-center justify-center text-sm text-slate-500">
        Cargando categorías...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Categorías</h1>
          <p className="text-sm text-slate-500">
            Define y organiza las categorías que utilizarás para clasificar tus gastos.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/40 hover:-translate-y-0.5 hover:shadow-lg transition-all"
        >
          Nueva categoría
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md shadow-slate-200/80">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Nombre
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categorias.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-10 text-center text-sm text-slate-500">
                  No hay categorías aún. Crea tu primera categoría para empezar a clasificar
                  tus gastos.
                </td>
              </tr>
            ) : (
              categorias.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 text-slate-900 font-medium">{c.nombre}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(c)}
                      className="inline-flex items-center rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100 hover:border-amber-200 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 hover:border-red-200 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-900/30">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              {editingId ? 'Editar categoría' : 'Nueva categoría'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder="Ej. Comida, Transporte"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/40 hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  {editingId ? 'Guardar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
