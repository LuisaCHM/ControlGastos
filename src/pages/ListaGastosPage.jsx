import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGastos, deleteGasto } from '../services/gastosService';

export default function ListaGastosPage() {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    getGastos()
      .then(setGastos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este gasto?')) return;
    try {
      await deleteGasto(id);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const formatMoney = (n) =>
    new Intl.NumberFormat('es', { style: 'currency', currency: 'EUR' }).format(n);
  const formatDate = (d) => new Date(d).toLocaleDateString('es-ES');

  if (loading) {
    return (
      <div className="flex min-h-[160px] items-center justify-center text-sm text-slate-500">
        Cargando gastos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Lista de gastos
          </h1>
          <p className="text-sm text-slate-500">
            Revisa y gestiona todos los movimientos registrados por categoría y fecha.
          </p>
        </div>
        <Link
          to="/gastos/nuevo"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/40 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Registrar nuevo gasto
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md shadow-slate-200/80">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Monto
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Categoría
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Descripción
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gastos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">
                    No hay gastos registrados todavía.{' '}
                    <Link
                      to="/gastos/nuevo"
                      className="font-medium text-sky-600 hover:text-sky-700 hover:underline"
                    >
                      Registrar el primero
                    </Link>
                    .
                  </td>
                </tr>
              ) : (
                gastos.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-900 font-semibold">
                      {formatMoney(Number(g.monto))}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      {formatDate(g.fecha)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {g.categorias?.nombre ?? 'Sin categoría'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {g.descripcion || <span className="text-slate-400 text-xs">Sin descripción</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(g.id)}
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
      </div>
    </div>
  );
}
