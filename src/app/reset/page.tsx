'use client';
import { useEffect } from 'react';
import { deleteAllUsers } from '@/lib/dataconnect';

export default function ResetPage() {
  useEffect(() => {
    deleteAllUsers().then(() => {
      alert("✅ Todos los usuarios han sido borrados de la base de datos SQL.");
      window.location.href = '/';
    }).catch(err => {
      console.error(err);
      alert("❌ Error al borrar usuarios.");
    });
  }, []);

  return <div>Borrando usuarios...</div>;
}
