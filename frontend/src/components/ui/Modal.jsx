import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-text-secondary hover:bg-background hover:text-text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 md:p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
