"use client";

import { useStore } from '@/context/StoreContext';

export default function Footer() {
  const { setIsLoginModalOpen } = useStore();

  return (
    <footer id="contacto" className="bg-gray-900 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <img 
                src="https://z-cdn-media.chatglm.cn/files/ca797491-c9bf-488a-9820-addcd479e5a0.png?auth_key=1877572344-f501c2befc0a44ae819106df531e6083-0-0a355028c19786e4b1375a1ca3e88d90"
                alt="DIDACTIKIDS" 
                className="h-16 md:h-20 lg:h-24 w-auto object-contain brightness-200" 
              />
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Tienda online oficial de material didáctico premium para instituciones educativas.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-base md:text-lg mb-3">Enlaces</h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li><a href="#inicio" className="hover:text-primary transition-all">Inicio</a></li>
              <li><a href="#catalogo" className="hover:text-primary transition-all">Catálogo</a></li>
              <li><a href="#software" className="hover:text-primary transition-all">Software</a></li>
              <li><button onClick={() => setIsLoginModalOpen(true)} className="hover:text-primary transition-all">Mi Cuenta</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-base md:text-lg mb-3">Categorías</h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li>Elementos de Aseo</li>
              <li>Elementos de Cocina</li>
              <li>Mobiliario</li>
              <li>Material Pedagógico</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-base md:text-lg mb-3">Contacto</h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <i className="material-icons text-sm text-primary">location_on</i>
                <span>CL 52 #18-72, Barranquilla</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="material-icons text-sm text-primary">phone</i>
                <span>3024673945</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="material-icons text-sm text-primary">email</i>
                <span className="text-[10px] md:text-xs">didactikids_sas@hotmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
            <p className="text-gray-500 text-[10px] md:text-xs">
              © {new Date().getFullYear()} DIDACTIKIDS S.A.S. Todos los derechos reservados • NIT: 901.859.229 - 5
            </p>
            <div className="flex items-center gap-1">
              <i className="material-icons text-gray-500 text-xs">lock</i>
              <span className="text-gray-500 text-[10px] md:text-xs">Powered by ePayu</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
