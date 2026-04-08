import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <span className="text-xl font-bold text-cyan-400">Ozodbek Admin</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/admin" className={`${router.pathname === '/admin' ? 'border-cyan-400 text-white' : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Arizalar (Applications)
                </Link>
                <Link href="/admin/portfolios" className={`${router.pathname === '/admin/portfolios' ? 'border-cyan-400 text-white' : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Portfolio Boshqaruvi
                </Link>
                <a href="/" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                  Saytga o&apos;tish
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
