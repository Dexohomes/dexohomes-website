
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const AdminHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <span className="text-brand-yellow">Dexo</span>homes Admin
      </h1>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Logged in as <strong>{user?.username}</strong>
        </span>
        <Button variant="outline" onClick={logout} size="sm">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
