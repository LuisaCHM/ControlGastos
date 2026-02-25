import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            Control de gastos simple y claro
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold leading-tight tracking-tight">
              <span className="block text-slate-900">
                Mantén tus finanzas
              </span>
              <span className="block bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                organizadas en un solo lugar.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl">
              Registra tus gastos por categoría, identifica patrones de consumo y
              consulta un resumen claro en el dashboard para tomar mejores decisiones.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/gastos/nuevo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all"
            >
              Registrar un gasto ahora
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 transition-all"
            >
              Ver resumen en dashboard
            </Link>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 text-left">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 shadow-sm">
              <dt className="text-xs font-medium text-slate-500">Control mensual</dt>
              <dd className="mt-1 text-lg font-semibold text-slate-900">
                Sin sorpresas
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 shadow-sm">
              <dt className="text-xs font-medium text-slate-500">Categorías</dt>
              <dd className="mt-1 text-lg font-semibold text-slate-900">
                Totalmente personalizadas
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 shadow-sm col-span-2 sm:col-span-1">
              <dt className="text-xs font-medium text-slate-500">Visión general</dt>
              <dd className="mt-1 text-lg font-semibold text-slate-900">
                Resumen por categoría
              </dd>
            </div>
          </dl>
        </div>

        <aside className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-violet-500/10 blur-2xl" />
          <div className="relative h-full rounded-3xl border border-slate-100 bg-white/90 shadow-2xl shadow-slate-200/80 p-6 sm:p-7 flex flex-col gap-5">
            <header className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Resumen rápido
                </p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">
                  Tu panorama de gastos
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-100">
                En control
              </span>
            </header>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
                <dt className="text-xs font-medium text-slate-500">
                  Gasto del mes
                </dt>
                <dd className="mt-1 text-xl font-semibold text-slate-900">
                  € 0,00
                </dd>
                <p className="mt-1 text-[11px] text-slate-500">
                  Registra tus primeros gastos para ver el total.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
                <dt className="text-xs font-medium text-slate-500">
                  Categorías activas
                </dt>
                <dd className="mt-1 text-xl font-semibold text-slate-900">
                  0
                </dd>
                <p className="mt-1 text-[11px] text-slate-500">
                  Crea categorías para clasificar tus gastos.
                </p>
              </div>
            </dl>

            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-600">
              <p className="font-medium text-slate-800 mb-0.5">
                ¿Por dónde empiezo?
              </p>
              <p>
                Crea una categoría (por ejemplo, <span className="font-semibold">Comida</span> o{' '}
                <span className="font-semibold">Transporte</span>) y luego registra tu primer
                gasto. El dashboard se actualizará automáticamente.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                to="/categorias"
                className="inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
              >
                Gestionar categorías
              </Link>
              <Link
                to="/gastos"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                Ver lista de gastos
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
