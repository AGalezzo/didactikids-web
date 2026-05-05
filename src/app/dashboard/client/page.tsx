'use client';

import { useStore } from '@/context/StoreContext';
import { useEffect, useState } from 'react';
import { getOrdersByUser } from '@/lib/dataconnect';

export default function ClientDashboard() {
  const { user } = useStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getOrdersByUser({ userId: user.uid }).then(res => {
        setOrders(res.data.orders);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-[#2C2F5A]">¡Hola, {user?.email}!</h1>
        <p className="text-[#2B2B2B] mt-2">Bienvenido a tu panel de cliente de Didactikids.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAE4DC] md:col-span-2">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-[#B23A2A]/10 rounded-full flex items-center justify-center text-[#B23A2A]">
              <span className="material-icons">shopping_bag</span>
            </div>
            <h2 className="text-xl font-bold text-[#2C2F5A]">Mis Pedidos</h2>
          </div>
          
          {loading ? (
            <p className="text-[#2B2B2B]">Cargando tus pedidos...</p>
          ) : orders.length === 0 ? (
            <div>
              <p className="text-[#2B2B2B] mb-4">Aún no tienes pedidos registrados.</p>
              <button className="text-[#B23A2A] font-semibold hover:underline" onClick={() => window.location.href = '/'}>Ir a la tienda</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#EAE4DC] text-sm text-gray-500">
                    <th className="pb-3 font-medium">Fecha</th>
                    <th className="pb-3 font-medium">Estado</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium text-right">Dirección</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-[#EAE4DC]/50 hover:bg-[#F7F7F5]/50 transition-colors">
                      <td className="py-4 text-[#2C2F5A] font-medium">
                        {new Date(order.createdAt).toLocaleDateString('es-CO')}
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold 
                          \${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                          \${order.status === 'preparing' ? 'bg-blue-100 text-blue-700' : ''}
                          \${order.status === 'shipped' ? 'bg-purple-100 text-purple-700' : ''}
                          \${order.status === 'delivered' ? 'bg-green-100 text-green-700' : ''}
                        `}>
                          {order.status === 'pending' && 'Pendiente'}
                          {order.status === 'preparing' && 'Preparando'}
                          {order.status === 'shipped' && 'Enviado'}
                          {order.status === 'delivered' && 'Entregado'}
                        </span>
                      </td>
                      <td className="py-4 font-semibold text-[#2C2F5A]">
                        ${order.total.toLocaleString('es-CO')}
                      </td>
                      <td className="py-4 text-right text-gray-500">
                        {order.address}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAE4DC]">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-[#2C2F5A]/10 rounded-full flex items-center justify-center text-[#2C2F5A]">
              <span className="material-icons">person</span>
            </div>
            <h2 className="text-xl font-bold text-[#2C2F5A]">Mi Perfil</h2>
          </div>
          <div className="space-y-2 text-[#2B2B2B]">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Estado:</strong> <span className="text-green-600 font-semibold">Cuenta Aprobada</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
