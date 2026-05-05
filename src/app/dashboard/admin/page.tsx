'use client';

import { useEffect, useState } from 'react';
import { getAllUsers, updateUserStatus, updateUserRole, getProducts, createProduct } from '@/lib/dataconnect';
import { products as localProducts } from '@/lib/data';
import { useStore } from '@/context/StoreContext';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'products'>('users');
  const [loading, setLoading] = useState(true);
  const { user } = useStore();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resUsers, resProducts] = await Promise.all([
        getAllUsers(),
        getProducts()
      ]);
      if (resUsers.data) setUsers(resUsers.data.users);
      if (resProducts.data) setDbProducts(resProducts.data.products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Replace fetchUsers references with fetchData
  const fetchUsers = fetchData;

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

  const handleImportProducts = async () => {
    if (!confirm('¿Seguro que deseas importar los productos del catálogo local? Esto agregará productos a tu base de datos.')) return;
    
    setLoading(true);
    let imported = 0;
    try {
      for (const p of localProducts) {
        // Skip if product already in DB (check by id)
        if (dbProducts.find(dbp => dbp.id === p.code)) continue;
        
        await createProduct({
          id: p.code,
          name: p.name,
          description: p.description,
          category: p.category,
          price: p.price,
          stock: 100, // default
          code: p.code
        });
        imported++;
      }
      alert(`¡Se importaron ${imported} productos exitosamente!`);
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Error importando productos.');
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando panel de administrador...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-[#2C2F5A]">Panel de Administrador</h1>
        <p className="text-[#2B2B2B] mt-2">Gestiona las solicitudes de registro y tu equipo.</p>
      </div>

      <div className="flex gap-4 border-b border-[#EAE4DC] pb-4">
        <button 
          onClick={() => setActiveTab('users')}
          className={`font-semibold px-4 py-2 rounded-lg transition-colors \${activeTab === 'users' ? 'bg-[#2C2F5A] text-white' : 'bg-white text-[#2C2F5A] hover:bg-[#F7F7F5] border border-[#EAE4DC]'}`}
        >
          Usuarios
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`font-semibold px-4 py-2 rounded-lg transition-colors \${activeTab === 'products' ? 'bg-[#2C2F5A] text-white' : 'bg-white text-[#2C2F5A] hover:bg-[#F7F7F5] border border-[#EAE4DC]'}`}
        >
          Catálogo de Productos
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#EAE4DC] overflow-hidden">
        {activeTab === 'users' && (
          <>
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
      </>
    )}

        {activeTab === 'products' && (
          <>
            <div className="p-6 border-b border-[#EAE4DC] flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#B23A2A]">Productos en Base de Datos ({dbProducts.length})</h2>
              {dbProducts.length < localProducts.length && (
                <button onClick={handleImportProducts} className="bg-[#B23A2A] text-white px-4 py-2 rounded-lg hover:bg-[#8A2B1F] transition-colors text-sm font-semibold flex items-center gap-2">
                  <span className="material-icons text-sm">cloud_download</span>
                  Importar Catálogo
                </button>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F7F7F5] text-[#2C2F5A] text-sm uppercase tracking-wide">
                    <th className="p-4 font-semibold">Código</th>
                    <th className="p-4 font-semibold">Nombre</th>
                    <th className="p-4 font-semibold">Categoría</th>
                    <th className="p-4 font-semibold">Precio</th>
                    <th className="p-4 font-semibold">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE4DC]">
                  {dbProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F7F7F5]/50 transition-colors text-sm">
                      <td className="p-4 text-gray-500 font-mono">{p.code}</td>
                      <td className="p-4 font-semibold text-[#2C2F5A]">{p.name}</td>
                      <td className="p-4 text-gray-500 capitalize">{p.category}</td>
                      <td className="p-4 text-[#2B2B2B]">${p.price.toLocaleString('es-CO')}</td>
                      <td className="p-4 text-[#2B2B2B]">{p.stock}</td>
                    </tr>
                  ))}
                  {dbProducts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        No hay productos en la base de datos. ¡Haz clic en Importar Catálogo para iniciar!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
