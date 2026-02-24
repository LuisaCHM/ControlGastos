import { supabase } from './supabase';

export async function getDashboardData() {
  const { data, error } = await supabase
    .from('gastos')
    .select(`
      monto,
      categoria_id,
      categorias (id, nombre)
    `);
  if (error) throw error;

  const byCategoria = {};
  for (const row of data || []) {
    const nombre = row.categorias?.nombre ?? 'Sin categoría';
    if (!byCategoria[nombre]) byCategoria[nombre] = { nombre, total: 0 };
    byCategoria[nombre].total += Number(row.monto);
  }
  return Object.values(byCategoria).sort((a, b) => b.total - a.total);
}
