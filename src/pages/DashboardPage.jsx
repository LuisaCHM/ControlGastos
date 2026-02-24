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

  if (loading) return <p className="text-slate-600">Cargando dashboard...</p>;
  if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard - Gastos por categoría</h1>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Categoría</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-600 uppercase">Total gastado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-slate-500">
                  No hay gastos. Los totales por categoría aparecerán aquí.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.nombre} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-800 font-medium">{row.nombre}</td>
                  <td className="px-4 py-3 text-right text-slate-700 font-medium">
                    {formatMoney(row.total)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {data.length > 0 && (
        <div className="mt-4 p-4 bg-slate-100 rounded-lg font-semibold text-slate-800">
          Total general: {formatMoney(total)}
        </div>
      )}
    </div>
  );
}
