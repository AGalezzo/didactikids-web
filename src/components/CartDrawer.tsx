"use client";

import { useStore } from '@/context/StoreContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, clearCart, setIsPaymentModalOpen } = useStore();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const proceedToPayment = () => {
    if (cart.length === 0) {
      alert('⚠️ Tu carrito está vacío');
      return;
    }
    setIsCartOpen(false);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          onClick={() => setIsCartOpen(false)}
        />
      )}
      <div 
        className={`fixed right-0 top-0 w-80 md:w-96 h-full bg-white shadow-xl z-[60] transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="font-display text-xl md:text-2xl font-bold text-primary">Carrito</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
              <i className="material-icons">close</i>
            </button>
          </div>

          <div className="space-y-3 mb-6 flex-1 overflow-y-auto pr-2">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <i className="material-icons text-6xl text-cream mb-3">shopping_bag</i>
                <p className="text-gray-500 text-sm">Tu carrito está vacío</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-cream">
                  <div className="flex-1">
                    <h5 className="font-display font-bold text-xs md:text-sm text-gray-900">{item.name}</h5>
                    <p className="text-[10px] md:text-xs text-gray-600 mt-0.5">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-base md:text-lg text-primary">
                      ${(item.price * item.quantity).toLocaleString('es-CO')}
                    </p>
                    <button 
                      onClick={() => removeFromCart(index)} 
                      className="text-[10px] md:text-xs text-gray-500 hover:text-primary mt-0.5 transition-colors cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-cream pt-4 shrink-0">
            <div className="flex justify-between items-center mb-4">
              <span className="font-display font-bold text-lg">Total</span>
              <span className="font-display font-bold text-2xl text-primary">
                ${total.toLocaleString('es-CO')}
              </span>
            </div>
            <button onClick={proceedToPayment} className="btn-primary w-full py-3 mb-2 text-sm text-center block">
              Proceder al Pago
            </button>
            <button onClick={clearCart} className="w-full text-gray-500 py-2 text-xs hover:text-primary transition-colors cursor-pointer bg-transparent border-none">
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
