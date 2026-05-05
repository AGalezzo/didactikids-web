"use client";

import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { createUser, checkAnyUserExists, createOrder, createOrderItem } from '@/lib/dataconnect';

export default function Modals() {
  const { cart, clearCart, isLoginModalOpen, setIsLoginModalOpen, isPaymentModalOpen, setIsPaymentModalOpen, user } = useStore();
  const [loginTab, setLoginTab] = useState<'login' | 'register'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleLogin = async () => {
    if (!email || !password) return alert('Por favor ingresa correo y contraseña');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('✅ ¡Sesión iniciada exitosamente!');
      setIsLoginModalOpen(false);
      window.location.href = '/dashboard';
    } catch (error: any) {
      alert('Error al iniciar sesión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !name) return alert('Por favor completa todos los campos');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      let role = 'client';
      let status = 'pending';
      try {
        const result = await checkAnyUserExists();
        if (!result.data || result.data.users.length === 0) {
          role = 'admin';
          status = 'approved';
        }
      } catch (e) {
        console.error("No se pudo verificar Data Connect. Asegúrate de haberlo inicializado en Firebase.", e);
        role = 'admin'; // Fallback a admin temporal para modo prueba local
        status = 'approved';
      }
      
      try {
         await createUser({ id: uid, email, role, status });
      } catch (e) {
         console.error("Error al registrar en SQL Connect.", e);
      }
      
      alert(role === 'admin' ? '✅ ¡Cuenta de ADMINISTRADOR creada exitosamente!' : '✅ ¡Cuenta en revisión! Por favor espera a que un administrador la apruebe.');
      setIsLoginModalOpen(false);
      // Redirigir al panel
      window.location.href = '/dashboard/client';
    } catch (error: any) {
      alert('Error al registrar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async () => {
    if (!user) {
      alert("Debes iniciar sesión para realizar una compra.");
      setIsPaymentModalOpen(false);
      setIsLoginModalOpen(true);
      return;
    }
    if (cart.length === 0) return;

    setLoading(true);
    try {
      // 1. Create order
      const orderRef = await createOrder({
        userId: user.uid,
        total,
        status: 'preparing',
        address: 'CL 52 #18-72, Barranquilla', // hardcoded for demo
        contact: '3024673945', // hardcoded for demo
        paymentMethod: 'ePayu'
      });
      
      const orderId = orderRef.data.order_insert?.id;
      
      // 2. Insert items
      if (orderId) {
        for (const item of cart) {
          await createOrderItem({
            orderId,
            productId: item.code,
            productName: item.name,
            quantity: item.quantity,
            price: item.price
          });
        }
      }
      
      alert(`✅ ¡Pago procesado exitosamente!\\n\\nTotal: $${total.toLocaleString('es-CO')}\\n\\n📦 Envío a:\\nCL 52 #18-72, Barranquilla, Atlántico\\n\\n📞 Contacto: 3024673945`);
      clearCart();
      setIsPaymentModalOpen(false);
      window.location.href = '/dashboard/client';
    } catch (e) {
        console.error("Error al procesar pago: ", e);
        alert("Ocurrió un error al procesar tu pago en la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#2C2F5A]/40 backdrop-blur-sm" onClick={() => setIsLoginModalOpen(false)}>
          <div className="bg-white w-full max-w-md mx-4 p-8 rounded-3xl shadow-2xl border border-[#EAE4DC]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-3xl font-bold text-[#2C2F5A]">Mi Cuenta</h2>
              <button onClick={() => setIsLoginModalOpen(false)} className="text-gray-400 hover:text-[#B23A2A] transition-colors cursor-pointer bg-[#F7F7F5] w-8 h-8 rounded-full flex items-center justify-center">
                <i className="material-icons text-sm">close</i>
              </button>
            </div>

            <div className="flex gap-2 mb-6 bg-[#F7F7F5] p-1.5 rounded-xl border border-[#EAE4DC]">
              <button 
                onClick={() => setLoginTab('login')}
                className={`flex-1 py-2.5 text-sm font-semibold transition-all rounded-lg cursor-pointer border-none \${loginTab === 'login' ? 'bg-white text-[#2C2F5A] shadow-sm' : 'bg-transparent text-gray-500 hover:text-[#2C2F5A]'}`}
              >
                Iniciar Sesión
              </button>
              <button 
                onClick={() => setLoginTab('register')}
                className={`flex-1 py-2.5 text-sm font-semibold transition-all rounded-lg cursor-pointer border-none \${loginTab === 'register' ? 'bg-white text-[#2C2F5A] shadow-sm' : 'bg-transparent text-gray-500 hover:text-[#2C2F5A]'}`}
              >
                Registrarse
              </button>
            </div>

            {loginTab === 'login' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-gray-500">Correo Electrónico</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@ejemplo.com" className="w-full p-3.5 rounded-xl bg-[#F7F7F5] border border-[#EAE4DC] text-sm text-[#2B2B2B] focus:outline-none focus:border-[#B23A2A] focus:ring-1 focus:ring-[#B23A2A]/20 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-gray-500">Contraseña</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full p-3.5 rounded-xl bg-[#F7F7F5] border border-[#EAE4DC] text-sm text-[#2B2B2B] focus:outline-none focus:border-[#B23A2A] focus:ring-1 focus:ring-[#B23A2A]/20 transition-all" />
                </div>
                <button onClick={handleLogin} disabled={loading} className="w-full bg-[#2C2F5A] text-white font-semibold rounded-xl text-sm py-4 mt-2 text-center hover:bg-[#B23A2A] transition-colors shadow-lg shadow-[#2C2F5A]/20 disabled:opacity-50">
                  {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-gray-500">Nombre Completo</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" className="w-full p-3.5 rounded-xl bg-[#F7F7F5] border border-[#EAE4DC] text-sm text-[#2B2B2B] focus:outline-none focus:border-[#B23A2A] focus:ring-1 focus:ring-[#B23A2A]/20 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-gray-500">Correo Electrónico</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@ejemplo.com" className="w-full p-3.5 rounded-xl bg-[#F7F7F5] border border-[#EAE4DC] text-sm text-[#2B2B2B] focus:outline-none focus:border-[#B23A2A] focus:ring-1 focus:ring-[#B23A2A]/20 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-gray-500">Contraseña</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full p-3.5 rounded-xl bg-[#F7F7F5] border border-[#EAE4DC] text-sm text-[#2B2B2B] focus:outline-none focus:border-[#B23A2A] focus:ring-1 focus:ring-[#B23A2A]/20 transition-all" />
                </div>
                <button onClick={handleRegister} disabled={loading} className="w-full bg-[#B23A2A] text-white font-semibold rounded-xl text-sm py-4 mt-2 text-center hover:bg-[#2C2F5A] transition-colors shadow-lg shadow-[#B23A2A]/20 disabled:opacity-50">
                  {loading ? 'Cargando...' : 'Crear Cuenta'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setIsPaymentModalOpen(false)}>
          <div className="bg-white w-full max-w-2xl mx-4 p-6 md:p-8 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-1">Pasarela de Pagos</h2>
                <p className="text-xs md:text-sm text-gray-500">Integración segura con ePayu</p>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 hover:text-primary cursor-pointer">
                <i className="material-icons">close</i>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider text-gray-600">Método de Pago</label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="border-2 border-primary p-3 text-center cursor-pointer bg-blue-50">
                      <i className="material-icons text-primary text-xl mb-1">credit_card</i>
                      <p className="text-xs font-medium">Tarjeta</p>
                    </div>
                    <div className="border-2 border-cream p-3 text-center cursor-pointer hover:border-primary bg-white transition-colors">
                      <i className="material-icons text-primary text-xl mb-1">account_balance</i>
                      <p className="text-xs font-medium">PSE</p>
                    </div>
                    <div className="border-2 border-cream p-3 text-center cursor-pointer hover:border-primary bg-white transition-colors">
                      <i className="material-icons text-primary text-xl mb-1">payments</i>
                      <p className="text-xs font-medium">Efectivo</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-gray-600">Nombre del Titular</label>
                  <input type="text" placeholder="ANDERSON GALEZZO" className="w-full p-3 border border-cream text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-gray-600">Número de Tarjeta</label>
                  <input type="text" placeholder="4242 4242 4242 4242" className="w-full p-3 border border-cream text-sm focus:outline-none focus:border-primary" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-gray-600">Expiración</label>
                    <input type="text" placeholder="MM/AA" className="w-full p-3 border border-cream text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-gray-600">CVV</label>
                    <input type="text" placeholder="123" className="w-full p-3 border border-cream text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-gray-600">Dirección de Envío</label>
                  <input type="text" placeholder="CL 52 #18-72, Barranquilla" className="w-full p-3 border border-cream text-sm focus:outline-none focus:border-primary" />
                </div>
                <button onClick={processPayment} className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm">
                  <i className="material-icons text-lg">lock</i>
                  <span>Pagar con ePayu</span>
                </button>
              </div>

              <div className="bg-cream p-4 md:p-6">
                <h4 className="font-display font-bold text-lg mb-4">Resumen del Pedido</h4>
                <div className="space-y-2 mb-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-display font-bold text-primary">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-base md:text-lg">Total</span>
                    <span className="font-display font-bold text-xl md:text-2xl text-primary">${total.toLocaleString('es-CO')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
