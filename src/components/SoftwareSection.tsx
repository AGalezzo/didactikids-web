"use client";

import { useStore } from '@/context/StoreContext';

export default function SoftwareSection() {
  const { addToCart } = useStore();

  return (
    <section id="software" className="py-8 md:py-12 bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-6 md:mb-8">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-2">Software Educativo</h3>
          <p className="text-gray-600 text-xs md:text-sm">Plataformas digitales para el aprendizaje moderno</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white overflow-hidden border border-cream hover:shadow-lg hover:-translate-y-1 transition-all">
            <img 
              src="https://sfile.chatglm.cn/images-ppt/d05bbd216a73.png" 
              alt="Plataforma Educativa"
              className="w-full h-48 md:h-56 object-cover" 
            />
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-display font-bold text-lg md:text-xl">Plataforma Digital</h4>
                <span className="bg-primary text-white px-2 py-0.5 text-xs font-medium">Popular</span>
              </div>
              <p className="text-gray-600 mb-4 text-xs md:text-sm leading-relaxed">
                Más de 5000 actividades educativas interactivas para niños de 3 a 12 años.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-display font-bold text-xl md:text-2xl text-primary">$1,200,000</span>
                  <span className="text-xs text-gray-600">/año</span>
                </div>
                <button 
                  onClick={() => addToCart({ name: 'Plataforma Educativa Digital', price: 1200000, code: 'SOFT-01', category: 'software', description: 'Plataforma Digital' })}
                  className="btn-primary text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden border border-cream hover:shadow-lg hover:-translate-y-1 transition-all">
            <img 
              src="https://sfile.chatglm.cn/images-ppt/2e82d8e8be8e.png" 
              alt="Juegos Educativos"
              className="w-full h-48 md:h-56 object-cover" 
            />
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-display font-bold text-lg md:text-xl">Juegos Educativos</h4>
                <span className="bg-secondary text-white px-2 py-0.5 text-xs font-medium">Nuevo</span>
              </div>
              <p className="text-gray-600 mb-4 text-xs md:text-sm leading-relaxed">
                Colección de 5 plataformas con juegos educativos interactivos. Matemáticas, ciencias y más.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-display font-bold text-xl md:text-2xl text-primary">$890,000</span>
                  <span className="text-xs text-gray-600">/año</span>
                </div>
                <button 
                  onClick={() => addToCart({ name: 'Paquete de Juegos Educativos', price: 890000, code: 'SOFT-02', category: 'software', description: 'Juegos Educativos' })}
                  className="btn-primary text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
