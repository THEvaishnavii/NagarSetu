import React, { useState } from 'react';
import { Bell, User, LogOut, FileText, Settings, Plus, Globe, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/logo.png';

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4 md:px-6 shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center min-w-max">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 group transition-opacity hover:opacity-90">
          <img src={logo} alt="NagarSetu Logo" className="h-90 w-9 object-contain" />
          <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#7fb069] to-[#1f4d38] inline-block text-transparent bg-clip-text">
            NagarSetu
          </span>
        </button>
      </div>

      {/* Center: Search Bar (Desktop/Tablet) */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full rounded-xl bg-[#1f4d38] p-[1px] shadow-[0_0_12px_rgba(127,176,105,0.3)] group hover:shadow-[0_0_16px_rgba(127,176,105,0.5)] transition-all duration-300">
          <div className="absolute inset-y-0 left-[1.5px] pl-3.5 flex items-center pointer-events-none z-10">
            <Search size={18} className="text-text-secondary opacity-60 group-focus-within:opacity-100 group-focus-within:text-[#1f4d38] transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder={t('topbar.search') || "Search issues by title or location..."}
            className="w-full rounded-xl py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:bg-white transition-all h-full block"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button onClick={() => navigate('/report')} className="hidden lg:flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-colors shadow-soft">
          <Plus size={18} className="mr-1.5" />
          {t('topbar.reportBtn')}
        </button>

        {/* Language Dropdown */}
        <div className="relative group flex items-center h-full">
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

        <button className="p-2 text-text-secondary hover:text-primary hover:bg-background rounded-full transition-colors relative">
          <Bell size={22} />
          {/* Unread indicator */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card box-content"></span>
        </button>

        {/* User Avatar Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center w-9 h-9 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <User size={20} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-card rounded-xl shadow-soft border border-border py-1 flex flex-col z-50">
              <a href="#profile" className="px-4 py-2 text-sm text-text-primary hover:bg-background flex items-center gap-3">
                <Settings size={16} className="text-text-secondary" /> Profile
              </a>
              <a href="#my-complaints" className="px-4 py-2 text-sm text-text-primary hover:bg-background flex items-center gap-3">
                <FileText size={16} className="text-text-secondary" /> My Complaints
              </a>
              <div className="h-px bg-border my-1 mx-2"></div>
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

export default TopBar;
