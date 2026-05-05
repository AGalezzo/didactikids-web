'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { getUser } from '@/lib/dataconnect';

export default function DashboardIndex() {
  const router = useRouter();
  const { user } = useStore();

  useEffect(() => {
    async function checkRole() {
      if (!user) {
        router.push('/');
        return;
      }
      try {
        const result = await getUser({ id: user.uid });
        if (result.data && result.data.user) {
          let { role, status } = result.data.user;
          
          // Fallback para asegurar que el dueño siempre sea admin
          if (
            user.email === 'ventas@didactikids.co' || 
            user.email === 'ventas@didactikids.com' ||
            (user.email && user.email.includes('galezzoanderson'))
          ) {
            if (role !== 'admin' || status !== 'approved') {
              try {
                const { updateUserRole, updateUserStatus } = await import('@/lib/dataconnect');
                await updateUserRole({ id: user.uid, role: 'admin' });
                await updateUserStatus({ id: user.uid, status: 'approved' });
                role = 'admin';
                status = 'approved';
              } catch (e) {
                console.error("Error auto-promoting owner to admin", e);
              }
            }
          }
          
          if (status === 'pending') {
            router.push('/dashboard/pending');
          } else if (role === 'admin') {
            router.push('/dashboard/admin');
          } else if (role === 'employee') {
            router.push('/dashboard/employee');
          } else {
            router.push('/dashboard/client');
          }
        } else {
            // Fallback just in case
            router.push('/dashboard/client');
        }
      } catch (e) {
        console.error("Error fetching user role", e);
        router.push('/');
      }
    }
    checkRole();
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F5]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B23A2A]"></div>
    </div>
  );
}
