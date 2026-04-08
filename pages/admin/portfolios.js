import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function PortfoliosAdmin() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchPortfolios = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    fetch('/api/portfolios', {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPortfolios(data || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const res = await fetch('/api/portfolios', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ title, description, url, image_url: imageUrl }),
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      setUrl('');
      setImageUrl('');
      fetchPortfolios(); // refresh
    } else {
      alert('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (id) => {
    if (confirm("O'chirishni xohlaysizmi?")) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch('/api/portfolios', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchPortfolios();
      }
    }
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-semibold text-white mb-6">Portfolio Boshqaruvi</h1>
        
        <div className="mb-10 bg-gray-800 shadow rounded-lg border border-gray-700 p-6">
          <h2 className="text-lg font-medium text-white mb-4">Yangi qo&apos;shish</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300">Nomi (Title)</label>
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Rasm manzili (URL)</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Loyiha havolasi (Project URL)</label>
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://github.com/..." className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Tavsif (Description)</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"></textarea>
            </div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-cyan-400 hover:bg-cyan-500 focus:outline-none">
              Saqlash
            </button>
          </form>
        </div>

        <h2 className="text-xl font-semibold text-white mb-4">Sizning ishlaringiz</h2>
        {loading ? (
          <p className="text-gray-400">Yuklanmoqda...</p>
        ) : portfolios.length === 0 ? (
          <p className="text-gray-400">Hozircha portfolio yo&apos;q. Yangi qo&apos;shing!</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((item) => (
              <div key={item.id} className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700 flex flex-col">
                {item.image_url && (
                  <div className="h-48 w-full bg-gray-700">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="px-4 py-5 sm:p-6 flex-1">
                  <h3 className="text-lg leading-6 font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">{item.description}</p>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300">Linkni ochish &rarr;</a>
                  )}
                </div>
                <div className="bg-gray-700 px-4 py-3 sm:px-6 flex justify-end">
                  <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 text-sm font-medium">
                    O&apos;chirish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
