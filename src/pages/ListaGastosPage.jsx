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

  if (loading) return <p className="text-slate-600">Cargando gastos...</p>;
  if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Lista de gastos</h1>
        <Link
          to="/gastos/nuevo"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Registrar gasto
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Monto</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Fecha</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Categoría</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Descripción</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-600 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {gastos.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No hay gastos. <Link to="/gastos/nuevo" className="text-blue-600 hover:underline">Registrar el primero</Link>.
                </td>
              </tr>
            ) : (
              gastos.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-800 font-medium">{formatMoney(Number(g.monto))}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(g.fecha)}</td>
                  <td className="px-4 py-3 text-slate-600">{g.categorias?.nombre ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{g.descripcion || '-'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
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
  );
}
