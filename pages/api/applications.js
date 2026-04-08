import { supabase } from '../../lib/supabaseClient';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  try {
    // Handle CORS preflight
    Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method === 'POST') {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Barcha majburiy maydonlarni to\'ldiring!' });
      }

      const { data, error } = await supabase
        .from('applications')
        .insert([{ name, email, subject, message }]);

      if (error) throw error;
      return res.status(200).json({ message: 'Xabar muvaffaqiyatli yuborildi!' });

    } else if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);

    } else {
      res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}
