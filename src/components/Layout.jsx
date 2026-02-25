import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <nav className="bg-white shadow-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold text-slate-800">
              Control Gastos
            </Link>

            <div className="hidden sm:flex gap-6">
              <Link to="/" className="hover:text-blue-600 font-medium">
                Inicio
              </Link>
              <Link to="/gastos" className="hover:text-blue-600 font-medium">
                Gastos
              </Link>
              <Link to="/categorias" className="hover:text-blue-600 font-medium">
                Categorías
              </Link>
              <Link to="/dashboard" className="hover:text-blue-600 font-medium">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 mt-6">
        <Outlet />
      </main>
    </div>
  );
}