import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, Map, FileText, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/report', label: t('nav.report'), icon: PlusCircle },
    { path: '/map', label: t('nav.map'), icon: Map },
    { path: '/complaints', label: t('nav.complaints'), icon: FileText },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR (md and up) */}
      <aside 
        className={`hidden md:flex flex-col fixed top-16 left-0 bottom-0 bg-primary border-r border-border transition-all duration-300 z-40 ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="flex-1 py-6 px-3 flex flex-col space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `flex items-center px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-primary-hover text-white font-medium shadow-sm' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
                title={isCollapsed ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={22} className={isActive ? 'text-white' : 'text-white/70 group-hover:text-white transition-colors'} />
                    {!isCollapsed && <span className="ml-4 truncate">{item.label}</span>}
                  </>
                )}
              </NavLink>
            );
          })}

          <div className="h-px bg-white/10 my-6 mx-3"></div>

          {/* Your Impact */}
          <div className={`px-4 py-5 mb-6 ${isCollapsed ? 'hidden' : 'block'}`}>
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-7">Your Impact</h4>
            <div className="space-y-7">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Reports filed</span>
                <span className="text-white font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Upvotes given</span>
                <span className="text-white font-semibold">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions (About & Collapse Toggle) */}
        <div className={`p-4 border-t border-white/10 flex ${isCollapsed ? 'flex-col justify-center items-center gap-4' : 'items-center justify-between'}`}>
          {/* About Link */}
          <button 
            onClick={() => navigate('/about')}
            className={`flex items-center rounded-xl transition-all group text-white/70 hover:text-white ${isCollapsed ? 'p-2 hover:bg-white/10' : 'px-2 py-2'}`}
            title={isCollapsed ? "About NagarSetu" : undefined}
          >
            <Info size={20} className="text-white/70 group-hover:text-white transition-colors flex-shrink-0" />
            {!isCollapsed && <span className="ml-3 truncate font-medium text-sm">About NagarSetu</span>}
          </button>

          {/* Collapse Toggle */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors flex-shrink-0"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV (< md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1f4d38] border-t border-border z-40 flex justify-around items-center pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex flex-col items-center justify-center w-full pt-3 pb-4 px-1 ${
                isActive ? 'text-white' : 'text-white/70'
              } transition-colors`}
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1.5 rounded-full mb-1 transition-colors ${isActive ? 'bg-[#7fb069]' : 'bg-transparent'}`}>
                    <Icon size={22} className={isActive ? 'text-white' : 'text-white/70'} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={`text-[10px] tracking-wide ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
