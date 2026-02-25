import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGasto } from '../services/gastosService';
import { getCategorias } from '../services/categoriasService';

export default function RegistrarGastoPage() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    monto: '',
    fecha: new Date().toISOString().slice(0, 10),
    descripcion: '',
    categoria_id: '',
  });

  useEffect(() => {
    getCategorias()
      .then(setCategorias)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.monto || !form.fecha || !form.categoria_id) {
      setError('Monto, fecha y categoría son obligatorios.');
      return;
    }
    try {
      await createGasto({
        monto: Number(form.monto),
        fecha: form.fecha,
        descripcion: form.descripcion || null,
        categoria_id: Number(form.categoria_id),
      });
      navigate('/gastos');
    } catch (err) {
      setError(err.message || 'Error al guardar el gasto.');
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
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Registrar nuevo gasto
        </h1>
        <p className="text-sm text-slate-500">
          Completa la información del movimiento para mantener tus finanzas al día.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl space-y-5 rounded-2xl border border-slate-100 bg-slate-50/60 p-5 sm:p-6 shadow-md shadow-slate-200/70"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
              Monto
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.monto}
              onChange={(e) => setForm({ ...form, monto: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
              Fecha
            </label>
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Categoría
          </label>
          <select
            value={form.categoria_id}
            onChange={(e) => setForm({ ...form, categoria_id: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Descripción
          </label>
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            placeholder="Añade un detalle breve (opcional)"
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/40 hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Guardar gasto
          </button>
          <button
            type="button"
            onClick={() => navigate('/gastos')}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
