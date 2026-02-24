import { supabase } from './supabase';

export async function getCategorias() {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nombre');
  if (error) throw error;
  return data;
}

export async function createCategoria({ nombre }) {
  const { data, error } = await supabase
    .from('categorias')
    .insert([{ nombre }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCategoria(id, { nombre }) {
  const { data, error } = await supabase
    .from('categorias')
    .update({ nombre })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCategoria(id) {
  const { error } = await supabase.from('categorias').delete().eq('id', id);
  if (error) throw error;
}

export async function getCategoriaById(id) {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}
