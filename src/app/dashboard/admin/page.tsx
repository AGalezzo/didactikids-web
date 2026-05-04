'use client';

import { useEffect, useState } from 'react';
import { getAllUsers, updateUserStatus, updateUserRole } from '@/lib/dataconnect';
import { useStore } from '@/context/StoreContext';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res.data) {
        setUsers(res.data.users);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    if (!confirm('¿Seguro que quieres aprobar a este usuario?')) return;
    try {
      await updateUserStatus({ id, status: 'approved' });
      fetchUsers();
    } catch (e) {
      alert('Error al aprobar');
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('¿Seguro que quieres rechazar a este usuario?')) return;
    try {
      await updateUserStatus({ id, status: 'rejected' });
      fetchUsers();
    } catch (e) {
      alert('Error al rechazar');
    }
  };
  
  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      await updateUserRole({ id, role: newRole });
      fetchUsers();
    } catch (e) {
      alert('Error al cambiar rol');
    }
  };

  if (loading) return <div>Cargando panel de administrador...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-[#2C2F5A]">Panel de Administrador</h1>
        <p className="text-[#2B2B2B] mt-2">Gestiona las solicitudes de registro y tu equipo.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#EAE4DC] overflow-hidden">
        <div className="p-6 border-b border-[#EAE4DC]">
          <h2 className="text-xl font-bold text-[#B23A2A]">Usuarios en la plataforma</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F7F5] text-[#2C2F5A] text-sm uppercase tracking-wide">
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Rol</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4DC]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#F7F7F5]/50 transition-colors">
                  <td className="p-4 text-[#2B2B2B]">{u.email}</td>
                  <td className="p-4">
                    <select 
                      value={u.role} 
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      disabled={u.id === user?.uid}
                      className="bg-transparent border border-[#EAE4DC] rounded p-1 text-sm text-[#2B2B2B]"
                    >
                      <option value="client">Cliente</option>
                      <option value="employee">Empleado</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      \${u.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      \${u.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
                      \${u.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {u.status === 'pending' ? 'Pendiente' : u.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {u.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(u.id)} className="text-sm bg-[#2C2F5A] text-white px-3 py-1.5 rounded-lg hover:bg-[#B23A2A] transition-colors">Aprobar</button>
                        <button onClick={() => handleReject(u.id)} className="text-sm border border-[#B23A2A] text-[#B23A2A] px-3 py-1.5 rounded-lg hover:bg-[#B23A2A] hover:text-white transition-colors">Rechazar</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
