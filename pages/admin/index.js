import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        setApplications(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-semibold text-white mb-6">Kelib tushgan arizalar</h1>
        
        {loading ? (
          <p className="text-gray-400">Yuklanmoqda...</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-400">Hozircha arizalar yo&apos;q.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((app) => (
              <div key={app.id} className="bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-700">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-white mb-1">
                    {app.name}
                  </h3>
                  <div className="text-sm font-mono text-cyan-400 mb-4">{app.email}</div>
                  
                  {app.subject && (
                    <div className="mb-2">
                      <span className="text-xs text-gray-400 uppercase">Mavzu:</span>
                      <p className="text-sm text-gray-200">{app.subject}</p>
                    </div>
                  )}
                  
                  <div>
                    <span className="text-xs text-gray-400 uppercase">Xabar:</span>
                    <p className="text-sm text-gray-200 mt-1 whitespace-pre-wrap">{app.message}</p>
                  </div>
                </div>
                <div className="bg-gray-700 px-4 py-4 sm:px-6">
                  <div className="text-xs text-gray-400">
                    Sana: {new Date(app.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
