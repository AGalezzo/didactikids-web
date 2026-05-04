'use client';

import { useStore } from '@/context/StoreContext';

export default function Hero() {
  const { user, setIsLoginModalOpen } = useStore();

  return (
    <section className="relative bg-[#F7F7F5] overflow-hidden min-h-[80vh] flex items-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#EAE4DC] rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#B23A2A]/10 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-block border border-[#2C2F5A]/20 px-4 py-1.5 mb-2 rounded-full bg-white/50 backdrop-blur-sm">
            <span className="text-xs md:text-sm font-medium text-[#2C2F5A]">
              NIT: 901.859.229 - 5 • Colombia
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-[#2C2F5A] leading-tight">
            Aprender nunca fue tan <span className="text-[#B23A2A] italic">divertido</span>
          </h1>
          <p className="text-lg md:text-xl text-[#2B2B2B] font-body leading-relaxed max-w-2xl mx-auto">
            Descubre nuestra selección exclusiva de materiales didácticos, institucionales y dotación para espacios educativos. Calidad premium para el desarrollo integral.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button 
              className="bg-[#B23A2A] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#2C2F5A] transition-all duration-300 shadow-lg shadow-[#B23A2A]/30 transform hover:-translate-y-1"
              onClick={() => {
                document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar Catálogo
            </button>
            {!user ? (
              <button 
                className="bg-transparent border-2 border-[#2C2F5A] text-[#2C2F5A] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#2C2F5A] hover:text-white transition-all duration-300"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Acceso Institucional
              </button>
            ) : (
              <button 
                className="bg-transparent border-2 border-[#2C2F5A] text-[#2C2F5A] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#2C2F5A] hover:text-white transition-all duration-300"
                onClick={() => window.location.href = '/dashboard'}
              >
                Ir a mi Panel
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
