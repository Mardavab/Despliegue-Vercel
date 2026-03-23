import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { method, query } = req;

  if (method === 'GET') {
    // Obtener por id
    if (query.id) {
      const { data, error } = await supabase
        .from('practica')
        .select('*')
        .eq('id', query.id)
        .single();

      if (error) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      return res.status(200).json(data);
    }

    // Obtener todos
    const { data, error } = await supabase
      .from('practica')
      .select('*');

    if (error) {
      return res.status(500).json({ error: 'Error al obtener datos' });
    }

    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).json({ error: `Método ${method} no permitido` });
}