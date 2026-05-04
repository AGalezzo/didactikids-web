'use client';

import { useStore } from '@/context/StoreContext';

export default function ClientDashboard() {
  const { user } = useStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-[#2C2F5A]">¡Hola, {user?.email}!</h1>
        <p className="text-[#2B2B2B] mt-2">Bienvenido a tu panel de cliente de Didactikids.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAE4DC]">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-[#B23A2A]/10 rounded-full flex items-center justify-center text-[#B23A2A]">
              <span className="material-icons">shopping_bag</span>
            </div>
            <h2 className="text-xl font-bold text-[#2C2F5A]">Mis Pedidos</h2>
          </div>
          <p className="text-[#2B2B2B] mb-4">Aún no tienes pedidos registrados.</p>
          <button className="text-[#B23A2A] font-semibold hover:underline">Ir a la tienda</button>
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
