import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMapRoute = location.pathname === '/map';

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-text-primary">
      <TopBar />
      
      <div className="flex flex-1 pt-16">
        {/* Desktop sidebar */}
        <Sidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
        
        {/* Main Content Area */}
        <main 
          className={`flex-1 transition-all duration-300 w-full ${isCollapsed ? 'md:pl-20' : 'md:pl-64'} pb-20 md:pb-0`}
        >
          {isMapRoute ? (
            // Full-bleed for map
            <div className="w-full h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
              <Outlet />
            </div>
          ) : (
            // Standard centered column for other pages
            <div className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-300">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
