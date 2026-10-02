import React, { useState, useRef } from 'react';
import { 
  X, MapPin, ArrowBigUp, MessageCircle, 
  Sparkles, UploadCloud, CheckCircle 
} from 'lucide-react';
import { categoryStyles, statusStyles, formatLabel } from '../../utils/badgeStyles';

const IssueReviewDrawer = ({ issue, onClose }) => {
  const [localStatus, setLocalStatus] = useState(issue?.status || 'reported');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef(null);

  if (!issue) return null;

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      
      // Keep success state visible for 1.5s, then close drawer
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <>
      {/* Dimmed Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-card shadow-2xl z-[101] flex flex-col animate-in slide-in-from-right duration-300 border-l border-border">
        
        {/* Header (Sticky) */}
        <div className="flex items-start justify-between p-6 border-b border-border bg-card/95 backdrop-blur z-10 sticky top-0">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${categoryStyles[issue.category] || categoryStyles.other}`}>
                {issue.category}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[localStatus] || statusStyles.reported}`}>
                {formatLabel(localStatus)}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-text-primary leading-tight pr-4">
              {issue.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-background hover:bg-border/50 text-text-secondary hover:text-text-primary rounded-full transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {/* Main Info */}
          <div>
            <div className="flex items-center gap-1.5 text-sm text-text-secondary font-medium mb-3">
              <MapPin size={16} className="text-primary" />
              <span>{issue.location}</span>
            </div>
            <p className="text-text-primary leading-relaxed">
              {issue.description || 'No description provided.'}
            </p>
          </div>

          {/* Media & Map Grid */}
          <div className="flex flex-col sm:flex-row gap-4">
            {issue.imageUrl && (
              <div className="w-full sm:w-[60%] h-48 rounded-xl overflow-hidden border border-border">
                <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className={`w-full ${issue.imageUrl ? 'sm:w-[40%]' : ''} h-48 bg-background border border-border rounded-xl flex flex-col items-center justify-center text-text-secondary relative overflow-hidden`}>
              <div 
                className="absolute inset-0 opacity-20" 
                style={{
                  backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              ></div>
              <MapPin size={32} className="text-text-secondary/50 mb-2 z-10" />
              <span className="text-sm font-medium opacity-75 z-10">Map preview</span>
            </div>
          </div>

          {/* Stats Read-only */}
          <div className="flex items-center gap-3 border-y border-border py-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border text-sm font-semibold text-text-primary">
              <ArrowBigUp size={18} className="text-primary" />
              <span>{issue.upvotes} Upvotes</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border text-sm font-semibold text-text-primary">
              <MessageCircle size={18} className="text-text-secondary" />
              <span>{issue.commentsCount || 0} Comments</span>
            </div>
          </div>

          {/* AI-Generated Brief */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 relative overflow-hidden">
            <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
              <Sparkles size={16} />
              <span>AI-Generated Brief</span>
            </div>
            <p className="text-sm text-text-primary leading-relaxed mb-3">
              This issue highlights a severe {issue.category} problem at {issue.location}, currently {formatLabel(localStatus).toLowerCase()} but unassigned. It has garnered significant community attention with {issue.upvotes} upvotes and multiple comments indicating urgent safety and livability concerns.
            </p>
            <p className="text-[10px] text-text-secondary/70 uppercase tracking-wide">
              Generated from description, comments, & history. May not reflect real-time updates.
            </p>
          </div>

        </div>

        {/* Action / Footer Area (Sticky) */}
        <div className="border-t border-border bg-card p-6 flex flex-col gap-5 sticky bottom-0 z-10">
          
          {isSaved ? (
            // Inline Save Confirmation
            <div className="flex flex-col items-center justify-center py-6 text-status-resolved animate-in zoom-in-95 duration-200">
              <CheckCircle size={40} className="mb-2" />
              <p className="font-bold text-lg">Changes saved successfully</p>
              <p className="text-sm text-text-secondary">Returning to dashboard...</p>
            </div>
          ) : (
            // Form Controls
            <div className="animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row gap-5 mb-5">
                {/* Status Dropdown */}
                <div className="w-full sm:w-1/3">
                  <label className="block text-sm font-bold text-text-primary mb-2">Update Status</label>
                  <select 
                    value={localStatus}
                    onChange={(e) => setLocalStatus(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary font-medium shadow-sm"
                  >
                    <option value="reported">Reported</option>
                    <option value="acknowledged">Acknowledged</option>
                    <option value="inProgress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                {/* Internal Notes */}
                <div className="w-full sm:w-2/3">
                  <label className="block text-sm font-bold text-text-primary mb-2">Internal Notes</label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add private notes for staff..."
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-primary resize-none h-11 shadow-sm"
                  />
                </div>
              </div>

              {/* Conditional Proof of Resolution */}
              {localStatus === 'resolved' && (
                <div className="mb-5 animate-in slide-in-from-top-2 fade-in duration-300">
                  <label className="block text-sm font-bold text-text-primary mb-2">Upload Proof of Resolution</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-text-secondary bg-background hover:bg-border/20 transition-colors cursor-pointer group"
                  >
                    <UploadCloud size={24} className="mb-1 opacity-60 group-hover:text-primary transition-colors" />
                    <span className="text-xs font-medium">Drag & drop or click to upload photo</span>
                  </div>
                  <input type="file" className="hidden" ref={fileInputRef} />
                </div>
              )}

              {/* Save Button */}
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-soft transition-colors flex items-center justify-center gap-2"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default IssueReviewDrawer;
