import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-slate-800 mb-4">
        Bienvenido a Control Gastos
      </h1>
      <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
        Gestiona tus gastos por categorías y visualiza resúmenes en el dashboard.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/gastos/nuevo"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Registrar gasto
        </Link>
        <Link
          to="/gastos"
          className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition"
        >
          Ver gastos
        </Link>
        <Link
          to="/categorias"
          className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition"
        >
          Categorías
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
