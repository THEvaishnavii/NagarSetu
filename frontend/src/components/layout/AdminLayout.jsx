import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminTopBar from './AdminTopBar';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AdminTopBar />
      
      <div className="flex flex-1 pt-16">
        <AdminSidebar />
        
        {/* Main Content Area - Admins are desktop focused, fixed 64 margin left */}
        <main className="flex-1 w-full md:pl-64 transition-all duration-300">
          <div className="p-6 md:p-8 w-full max-w-7xl mx-auto animate-in fade-in duration-300">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
