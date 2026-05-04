"use client";

import { useStore } from '@/context/StoreContext';

export default function Header() {
  const { cart, setIsCartOpen, setIsLoginModalOpen } = useStore();
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b border-cream sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://z-cdn-media.chatglm.cn/files/ca797491-c9bf-488a-9820-addcd479e5a0.png?auth_key=1877572344-f501c2befc0a44ae819106df531e6083-0-0a355028c19786e4b1375a1ca3e88d90"
            alt="DIDACTIKIDS" 
            className="h-16 md:h-20 lg:h-24 w-auto object-contain" 
          />
        </div>

        <nav className="hidden md:flex gap-6">
          <a href="#inicio" className="text-sm font-medium text-gray-600 hover:text-primary">Inicio</a>
          <a href="#catalogo" className="text-sm font-medium text-gray-600 hover:text-primary">Catálogo</a>
          <a href="#software" className="text-sm font-medium text-gray-600 hover:text-primary">Software</a>
          <a href="#contacto" className="text-sm font-medium text-gray-600 hover:text-primary">Contacto</a>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <button onClick={() => setIsCartOpen(true)} className="relative p-1.5 hover:text-primary cursor-pointer transition-all">
            <i className="material-icons text-xl md:text-2xl">shopping_bag</i>
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          </button>
          <button onClick={() => setIsLoginModalOpen(true)} className="btn-secondary text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 flex items-center gap-1">
            <span className="hidden sm:inline">Mi Cuenta</span>
            <i className="material-icons text-sm sm:hidden">person</i>
          </button>
        </div>
      </div>
    </header>
  );
}
