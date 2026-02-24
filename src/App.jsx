import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegistrarGastoPage from './pages/RegistrarGastoPage';
import ListaGastosPage from './pages/ListaGastosPage';
import CategoriasPage from './pages/CategoriasPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="gastos" element={<ListaGastosPage />} />
          <Route path="gastos/nuevo" element={<RegistrarGastoPage />} />
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
