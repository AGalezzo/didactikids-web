'use client';

import { useStore } from '@/context/StoreContext';

export default function PendingDashboard() {
  const { logOut } = useStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F5] p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 text-center border border-[#EAE4DC]">
        <div className="w-20 h-20 bg-[#EAE4DC] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-icons text-4xl text-[#B23A2A]">hourglass_empty</span>
        </div>
        <h1 className="text-2xl font-display font-bold text-[#2C2F5A] mb-4">Cuenta en Revisión</h1>
        <p className="text-[#2B2B2B] mb-8 leading-relaxed">
          Tu registro se ha completado, pero necesita ser aprobado por un administrador antes de que puedas acceder al catálogo premium y realizar pedidos.
          Te enviaremos un correo cuando tu cuenta esté lista.
        </p>
        <button 
          onClick={logOut}
          className="w-full btn-secondary rounded-xl py-3"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
