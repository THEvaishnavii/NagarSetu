import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListTodo, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const AdminSidebar = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const ADMIN_NAV_ITEMS = [
    { path: '/admin', label: t('adminNav.dashboard'), icon: LayoutDashboard },
    { path: '/admin/issues', label: t('adminNav.allIssues'), icon: ListTodo },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed top-16 left-0 bottom-0 w-64 bg-primary text-white border-r border-primary-hover shadow-lg z-40">
      <div className="flex-1 py-6 px-4 flex flex-col space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 px-3">
          {t('adminNav.municipalOps')}
        </div>
        
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'} 
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-primary-hover text-white font-semibold shadow-sm' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className={isActive ? 'text-white' : 'text-white/70 group-hover:text-white transition-colors'} />
                  <span className="ml-4">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}

        {/* Placeholder for future items */}
        <div className="pt-6 pb-2">
          <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 px-3">
            {t('adminNav.system')}
          </div>
          <button disabled className="w-full flex items-center px-4 py-3 rounded-xl text-white/40 cursor-not-allowed">
            <span className="w-5 h-5 rounded bg-white/20 mr-4"></span>
            <span>{t('adminNav.departments')}</span>
          </button>
          <button disabled className="w-full flex items-center px-4 py-3 rounded-xl text-white/40 cursor-not-allowed mt-1">
            <span className="w-5 h-5 rounded bg-white/20 mr-4"></span>
            <span>{t('adminNav.settings')}</span>
          </button>
        </div>
      </div>

      {/* Bottom Actions (About) */}
      <div className="p-4 border-t border-white/10 flex items-center">
        {/* About Link */}
        <button 
          onClick={() => navigate('/about')}
          className="flex items-center rounded-xl transition-all group text-white/70 hover:text-white px-2 py-2 w-full"
          title="About NagarSetu"
        >
          <Info size={20} className="text-white/70 group-hover:text-white transition-colors flex-shrink-0" />
          <span className="ml-3 truncate font-medium text-sm">About NagarSetu</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
