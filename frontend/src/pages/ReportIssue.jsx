import React, { useState, useRef } from 'react';
import { Mic, UploadCloud, X, MapPin, Image as ImageIcon, Map, ThumbsUp, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Modal from '../components/ui/Modal';
import { mockIssues } from '../utils/mockIssues';

const CATEGORIES = ['Pothole', 'Garbage', 'Water Leakage', 'Streetlight', 'Other'];
const mockDuplicate = mockIssues[0]; // Using the first mock issue for the duplicate check

const ReportIssue = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [submissionState, setSubmissionState] = useState('idle'); // 'idle' | 'success-new' | 'success-duplicate'
  const [description, setDescription] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleMicClick = () => {
    if (isListening) return;
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setDescription((prev) => prev + (prev ? ' ' : '') + '(Simulated voice input...)');
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmitClick = () => {
    setIsModalOpen(true);
  };

  const handleDuplicateConfirm = () => {
    setIsModalOpen(false);
    setSubmissionState('success-duplicate');
  };

  const handleNewReportConfirm = () => {
    setIsModalOpen(false);
    setSubmissionState('success-new');
  };

  const handleResetForm = () => {
    setDescription('');
    setSelectedCategory(null);
    setPreviewUrl(null);
    setIsListening(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setSubmissionState('idle');
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-12 relative px-4 md:px-0">
      <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6 md:mb-8">
        {t('report.title')}
      </h1>

      {submissionState === 'idle' ? (
        <div className="bg-card rounded-2xl border border-border p-4 md:p-6 shadow-sm flex flex-col gap-6 md:gap-8">
          
          {/* Description Section */}
          <section className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-primary">{t('report.description')}</label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue (e.g. 'Large pothole near the college gate')"
                className="w-full min-h-[120px] bg-background border border-border rounded-xl p-4 pr-12 text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y transition-shadow"
              />
              <button
                type="button"
                onClick={handleMicClick}
                className={`absolute bottom-3 right-3 p-2 rounded-full transition-all ${
                  isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse scale-110' 
                    : 'bg-card text-text-secondary hover:text-primary hover:bg-primary/10 border border-border shadow-sm'
                }`}
                title="Voice Input"
              >
                <Mic size={18} />
              </button>
            </div>
          </section>

          {/* Category Section */}
          <section className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-primary">Category (Optional)</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    cat === selectedCategory
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-background border-border text-text-secondary hover:border-primary/50 hover:text-text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-xs text-text-secondary mt-1">
              Our AI will also suggest a category based on your description.
            </p>
          </section>

          {/* Photo Upload Section */}
          <section className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-primary">Photo / Video</label>
            
            {!previewUrl ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-text-secondary bg-background hover:bg-border/20 transition-colors cursor-pointer group"
              >
                <UploadCloud size={28} className="mb-2 opacity-60 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">Drag & drop or click to upload</span>
              </div>
            ) : (
              <div className="relative w-full aspect-[4/3] sm:aspect-video sm:w-72 rounded-xl overflow-hidden border border-border bg-background">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*,video/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </section>

          {/* Location Section */}
          <section className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-primary">Location</label>
            <div className="w-full h-32 bg-background border border-border rounded-xl flex flex-col items-center justify-center text-text-secondary">
              <Map size={24} className="mb-2 opacity-50" />
              <span className="text-sm font-medium opacity-75">Map preview (Leaflet coming soon)</span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              We'll detect your location automatically — you can adjust the pin if needed.
            </p>
          </section>

          {/* Submit Button */}
          <button 
            onClick={handleSubmitClick}
            className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-soft transition-colors mt-2"
          >
            Submit Report
          </button>
        </div>
      ) : (
        /* Confirmation View */
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-20 h-20 rounded-full bg-status-resolved/10 flex items-center justify-center text-status-resolved mb-6">
            <CheckCircle size={40} strokeWidth={2.5} />
          </div>
          
          <h2 className="text-2xl font-extrabold text-text-primary mb-3">
            {submissionState === 'success-duplicate' ? 'Support Added' : 'Report Submitted'}
          </h2>
          
          <p className="text-text-secondary mb-10 max-w-sm">
            {submissionState === 'success-duplicate'
              ? 'Thanks for confirming — your report has been added as support for the existing issue.'
              : 'Your report has been received and will be reviewed shortly.'}
          </p>
          
          <button 
            onClick={() => navigate('/complaints')}
            className="w-full max-w-sm py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-soft transition-colors mb-4"
          >
            View My Complaints
          </button>
          
          <button 
            onClick={handleResetForm}
            className="text-text-secondary hover:text-primary font-medium transition-colors"
          >
            Report Another Issue
          </button>
        </div>
      )}

      {/* Duplicate Check Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Similar issue found nearby"
      >
        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          A similar issue has already been reported in this exact area. Is this the same problem?
        </p>
        
        {/* Compact Issue Card Mock */}
        <div className="bg-background border border-border rounded-xl p-3 flex gap-3 mb-6">
          <div className="w-16 h-16 rounded-lg bg-card border border-border overflow-hidden flex-shrink-0">
            {mockDuplicate.imageUrl ? (
              <img src={mockDuplicate.imageUrl} className="w-full h-full object-cover" alt="Issue thumbnail" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-secondary"><ImageIcon size={20} /></div>
            )}
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <h4 className="font-bold text-sm text-text-primary truncate mb-1">{mockDuplicate.title}</h4>
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1 font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">
                <ThumbsUp size={12} /> {mockDuplicate.upvotes}
              </span>
              <span className="truncate flex items-center gap-1">
                <MapPin size={12} /> {mockDuplicate.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleDuplicateConfirm}
            className="flex-1 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors shadow-sm text-sm"
          >
            Yes, same issue
          </button>
          <button 
            onClick={handleNewReportConfirm}
            className="flex-1 py-2.5 bg-card text-text-primary border border-border font-semibold rounded-xl hover:bg-background transition-colors shadow-sm text-sm"
          >
            No, this is different
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ReportIssue;
