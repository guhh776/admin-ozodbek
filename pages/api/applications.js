import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle form submission from frontend
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Barcha majburiy maydonlarni to\'ldiring!' });
    }

    const { data, error } = await supabase
      .from('applications')
      .insert([{ name, email, subject, message }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Xabar muvaffaqiyatli yuborildi!' });
  } else if (req.method === 'GET') {
    // List applications in the admin panel
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
