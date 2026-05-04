"use client";

import { useStore } from '@/context/StoreContext';
import { products } from '@/lib/data';

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'aseo', name: 'Aseo' },
  { id: 'cocina', name: 'Cocina' },
  { id: 'antropometrico', name: 'Antropométricos' },
  { id: 'apoyo', name: 'Apoyo' },
  { id: 'lenceria', name: 'Lencería' },
  { id: 'mobiliario', name: 'Mobiliario' },
  { id: 'emergencia', name: 'Emergencia' },
  { id: 'pedagogico', name: 'Pedagógico' }
];

export default function ProductGrid() {
  const { currentCategory, setCurrentCategory, addToCart } = useStore();

  const filteredProducts = currentCategory === 'all' 
    ? products 
    : products.filter(p => p.category === currentCategory);

  return (
    <>
      <section className="bg-white py-3 md:py-4 sticky top-[68px] md:top-[76px] lg:top-[84px] z-40 border-b border-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-tab ${currentCategory === cat.id ? 'active' : 'inactive'}`}
                onClick={() => setCurrentCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-1">Catálogo</h3>
              <p className="text-gray-600 text-xs md:text-sm">Productos de alta calidad</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-display font-bold text-xl md:text-2xl text-primary">{filteredProducts.length}</span>
              <span className="text-xs md:text-sm text-gray-500">productos</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <div key={product.code} className="bg-white overflow-hidden border border-cream hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="h-32 md:h-40 bg-cream flex items-center justify-center relative">
                  <i className="material-icons text-[80px] md:text-[100px] text-white/60">inventory_2</i>
                  <div className="absolute top-2 left-2 bg-primary text-white px-2 py-0.5 text-[10px] md:text-xs font-medium">
                    {product.code}
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h4 className="font-display font-bold text-sm md:text-base text-gray-900 mb-1.5">{product.name}</h4>
                  <p className="text-gray-600 text-[11px] md:text-xs mb-3 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="font-display font-bold text-lg md:text-xl text-primary">
                      ${product.price.toLocaleString('es-CO')}
                    </div>
                    <button 
                      onClick={() => addToCart(product)} 
                      className="btn-primary text-[10px] md:text-xs py-1.5 md:py-2 px-2.5 md:px-3.5"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
