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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map(product => (
              <div key={product.code} className="bg-white rounded-3xl overflow-hidden border border-[#EAE4DC] hover:shadow-2xl hover:shadow-[#B23A2A]/10 hover:-translate-y-2 transition-all duration-300 group">
                <div className="h-48 md:h-56 bg-[#F7F7F5] flex items-center justify-center relative overflow-hidden group-hover:bg-[#EAE4DC] transition-colors duration-300">
                  <i className="material-icons text-[100px] text-[#2C2F5A]/10 group-hover:scale-110 transition-transform duration-500">inventory_2</i>
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-[#2C2F5A] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wider shadow-sm border border-[#EAE4DC]">
                    {product.code}
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h4 className="font-display font-bold text-lg text-[#2C2F5A] mb-2 line-clamp-1">{product.name}</h4>
                  <p className="text-[#2B2B2B] text-sm mb-6 leading-relaxed line-clamp-2 min-h-[2.5rem]">{product.description}</p>
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">Precio</span>
                      <div className="font-display font-bold text-2xl text-[#B23A2A]">
                        ${product.price.toLocaleString('es-CO')}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-12 h-12 rounded-full bg-[#EAE4DC] text-[#2C2F5A] flex items-center justify-center hover:bg-[#B23A2A] hover:text-white transition-all duration-300 shadow-sm"
                    >
                      <i className="material-icons">add_shopping_cart</i>
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
