'use client';

import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '@/lib/dataconnect';

export default function EmployeeDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data.orders);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus });
      alert("Estado del pedido actualizado");
      fetchOrders();
    } catch (e) {
      console.error(e);
      alert("Error al actualizar el estado");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-[#2C2F5A]">Panel de Empleado</h1>
        <p className="text-[#2B2B2B] mt-2">Gestión de inventario y pedidos entrantes.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#EAE4DC] p-6">
        <h2 className="text-xl font-bold text-[#2C2F5A] mb-4">Gestión de Pedidos</h2>
        
        {loading ? (
          <p className="text-[#2B2B2B]">Cargando pedidos...</p>
        ) : orders.length === 0 ? (
          <p className="text-[#2B2B2B]">No hay pedidos registrados en el sistema.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAE4DC] text-sm text-gray-500">
                  <th className="pb-3 font-medium">ID Pedido</th>
                  <th className="pb-3 font-medium">Fecha</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Dirección</th>
                  <th className="pb-3 font-medium text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-[#EAE4DC]/50 hover:bg-[#F7F7F5]/50 transition-colors">
                    <td className="py-4 text-xs font-mono text-gray-500">{order.id.slice(0, 8)}</td>
                    <td className="py-4 text-[#2C2F5A] font-medium">
                      {new Date(order.createdAt).toLocaleDateString('es-CO')}
                    </td>
                    <td className="py-4 font-semibold text-[#2C2F5A]">
                      ${order.total.toLocaleString('es-CO')}
                    </td>
                    <td className="py-4 text-gray-500">
                      {order.address}
                    </td>
                    <td className="py-4 text-right">
                      <select 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#B23A2A] focus:border-[#B23A2A] block w-full p-2.5"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="preparing">Preparando</option>
                        <option value="shipped">Enviado</option>
                        <option value="delivered">Entregado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
