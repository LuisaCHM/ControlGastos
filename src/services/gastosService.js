import { supabase } from './supabase';

export async function getGastos() {
  const { data, error } = await supabase
    .from('gastos')
    .select(`
      *,
      categorias (id, nombre)
    `)
    .order('fecha', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createGasto({ monto, fecha, descripcion, categoria_id }) {
  const { data, error } = await supabase
    .from('gastos')
    .insert([{ monto, fecha, descripcion, categoria_id }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateGasto(id, { monto, fecha, descripcion, categoria_id }) {
  const { data, error } = await supabase
    .from('gastos')
    .update({ monto, fecha, descripcion, categoria_id })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteGasto(id) {
  const { error } = await supabase.from('gastos').delete().eq('id', id);
  if (error) throw error;
}

export async function getGastoById(id) {
  const { data, error } = await supabase
    .from('gastos')
    .select(`
      *,
      categorias (id, nombre)
    `)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}
