import { useState, useEffect } from 'react';
import { getDashboardData } from '../services/dashboardService';

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardData()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const formatMoney = (n) =>
    new Intl.NumberFormat('es', { style: 'currency', currency: 'EUR' }).format(n);
  const total = data.reduce((s, d) => s + d.total, 0);

  if (loading) {
    return (
      <div className="flex min-h-[160px] items-center justify-center text-sm text-slate-500">
        Cargando dashboard...
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
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Dashboard de gastos por categoría
        </h1>
        <p className="text-sm text-slate-500">
          Visualiza cuánto estás gastando en cada categoría y el total acumulado.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-violet-500/10 px-4 py-3 shadow-md shadow-slate-200/80">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Total general
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {formatMoney(total)}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Suma de todos los gastos registrados en tus categorías.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Categorías activas
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {data.length}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Número de categorías con al menos un gasto registrado.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Categoría más alta
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {data.length === 0
              ? 'Sin datos aún'
              : data.reduce((max, row) => (row.total > max.total ? row : max), data[0]).nombre}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            La categoría donde más has gastado en el periodo actual.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md shadow-slate-200/80">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Categoría
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Total gastado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-10 text-center text-sm text-slate-500">
                  No hay gastos todavía. A medida que registres movimientos, verás aquí el
                  detalle por categoría.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.nombre} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 text-slate-900 font-medium">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sky-500" />
                      {row.nombre}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-800 font-semibold">
                    {formatMoney(row.total)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
