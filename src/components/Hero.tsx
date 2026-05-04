"use client";

import { useStore } from '@/context/StoreContext';

export default function Hero() {
  const { setIsLoginModalOpen } = useStore();

  return (
    <section id="inicio" className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
      <img 
        src="https://sfile.chatglm.cn/images-ppt/f279284927dc.jpeg" 
        alt="Educación"
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/50"></div>
      <div className="absolute inset-0 flex items-center shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full">
          <div className="max-w-xl">
            <div className="inline-block border border-primary px-4 py-1.5 mb-4 md:mb-6">
              <span className="text-xs md:text-sm font-medium text-primary">
                NIT: 901.859.229 - 5 • Barranquilla
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 md:mb-4">
              Soluciones<br />
              <span className="text-primary">Educativas</span><br />
              <span className="text-2xl md:text-3xl lg:text-4xl">Premium</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8">
              Material didáctico de alta calidad para instituciones educativas en Colombia
            </p>
            <div className="flex gap-3">
              <a href="#catalogo" className="btn-primary inline-flex items-center text-sm md:text-base py-2 md:py-3 no-underline">
                Ver Catálogo
              </a>
              <button onClick={() => setIsLoginModalOpen(true)} className="btn-secondary text-sm md:text-base py-2 md:py-3">
                Acceso Clientes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
