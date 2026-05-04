'use client';

import { useStore } from '@/context/StoreContext';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthReady, logOut } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isAuthReady && !user) {
      router.push('/');
    }
  }, [user, isAuthReady, router]);

  if (!isAuthReady || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B23A2A]"></div>
      </div>
    );
  }

  // Si estamos en la página de pending, no mostrar sidebar
  if (pathname === '/dashboard/pending') {
      return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col md:flex-row">
      {/* Sidebar Mobile Toggle */}
      <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <Link href="/" className="font-display font-bold text-xl text-[#B23A2A]">Didactikids</Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[#2C2F5A]">
          <span className="material-icons">menu</span>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`\${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white shadow-lg flex-shrink-0 z-10 transition-all`}>
        <div className="p-6 hidden md:block">
          <Link href="/" className="font-display font-bold text-2xl text-[#B23A2A]">Didactikids</Link>
          <p className="text-xs text-gray-500 mt-1">Panel de Control</p>
        </div>
        <nav className="mt-2 md:mt-6 px-4 space-y-2 pb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 ml-2">Menú</p>
          
          <Link href="/dashboard" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all \${pathname === '/dashboard/admin' || pathname === '/dashboard/client' ? 'bg-[#B23A2A]/10 text-[#B23A2A] font-semibold' : 'text-[#2B2B2B] hover:bg-[#EAE4DC] hover:text-[#2C2F5A]'}`}>
             <span className="material-icons text-lg">dashboard</span>
             <span>Inicio</span>
          </Link>
          
          <button onClick={logOut} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-[#2B2B2B] hover:bg-[#EAE4DC] hover:text-[#2C2F5A] mt-8">
             <span className="material-icons text-lg">logout</span>
             <span>Cerrar Sesión</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
