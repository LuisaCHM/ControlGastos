import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Inicio' },
    { to: '/gastos', label: 'Gastos' },
    { to: '/categorias', label: 'Categorías' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      <nav className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-violet-500 shadow-md shadow-indigo-500/30 flex items-center justify-center text-white text-sm font-semibold">
                CG
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-slate-950 transition-colors">
                  Control Gastos
                </span>
                <span className="text-xs text-slate-500">
                  Tu dinero, bajo control
                </span>
              </div>
            </Link>

            <div className="hidden sm:flex items-center gap-1 rounded-full bg-slate-100/80 px-1 py-1 border border-slate-200 shadow-sm">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-white text-sky-700 shadow-sm border border-sky-100'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="sm:hidden inline-flex items-center justify-center rounded-full p-2.5 border border-slate-200 bg-white/80 shadow-sm text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-white transition-colors"
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-slate-700" />
                <span className="block h-0.5 w-4 rounded-full bg-slate-500" />
                <span className="block h-0.5 w-3.5 rounded-full bg-slate-400" />
              </div>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    [
                      'block rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/70 border border-slate-100/80 px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}