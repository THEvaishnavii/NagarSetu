import React, { useState } from 'react';
import { User, Globe, LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const AdminTopBar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-6 shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-2 group transition-opacity hover:opacity-90">
          <img src={logo} alt="NagarSetu Logo" className="h-90 w-9 object-contain" />
          <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#7fb069] to-primary inline-block text-transparent bg-clip-text">
            NagarSetu Admin
          </span>
        </button>
      </div>

      {/* Right: Actions & Admin Avatar */}
      <div className="flex items-center space-x-4">
        {/* Language Dropdown */}
        <div className="relative group flex items-center h-full mr-2">
          <button className="flex items-center gap-1 text-text-secondary hover:text-primary px-2 py-2 rounded-full font-semibold uppercase text-sm transition-colors">
            <Globe size={18} />
            <span className="hidden sm:inline">{language}</span>
          </button>
          
          <div className="absolute right-0 top-full mt-1 bg-card border border-border shadow-soft rounded-xl flex flex-col overflow-hidden invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 w-32 z-50">
            <button onClick={() => setLanguage('en')} className={`px-4 py-2.5 text-sm text-left transition-colors ${language === 'en' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-background text-text-primary'}`}>English</button>
            <button onClick={() => setLanguage('hi')} className={`px-4 py-2.5 text-sm text-left transition-colors ${language === 'hi' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-background text-text-primary'}`}>हिंदी (Hindi)</button>
            <button onClick={() => setLanguage('mr')} className={`px-4 py-2.5 text-sm text-left transition-colors ${language === 'mr' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-background text-text-primary'}`}>मराठी (Marathi)</button>
          </div>
        </div>

        <div className="relative flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-md text-text-primary">Admin User</div>
          </div>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
          >
            <User size={20} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-soft border border-border py-1 flex flex-col z-50">
              <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 text-left w-full transition-colors">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;
