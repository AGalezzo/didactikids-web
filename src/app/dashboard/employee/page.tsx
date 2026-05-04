'use client';

export default function EmployeeDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-[#2C2F5A]">Panel de Empleado</h1>
        <p className="text-[#2B2B2B] mt-2">Gestión de inventario y pedidos.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#EAE4DC] p-6 text-center">
        <span className="material-icons text-6xl text-[#EAE4DC] mb-4">construction</span>
        <h2 className="text-xl font-bold text-[#2C2F5A] mb-2">Módulo en construcción</h2>
        <p className="text-[#2B2B2B]">Aquí podrás ver los pedidos entrantes y gestionar el estado del envío.</p>
      </div>
    </div>
  );
}
