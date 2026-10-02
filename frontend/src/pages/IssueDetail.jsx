import React from 'react';
import { MapPin, MoreHorizontal, User, Map, ArrowLeft, Send } from 'lucide-react';
import ActionRow from '../components/ui/ActionRow';
import StatusTimeline from '../components/feed/StatusTimeline';
import { mockIssues } from '../utils/mockIssues';
import { categoryStyles, statusStyles, formatLabel } from '../utils/badgeStyles';
import { useLanguage } from '../context/LanguageContext';

import { useParams, useNavigate } from 'react-router-dom';

const mockComments = [
  { id: 1, author: 'Alex D.', time: '1 hour ago', text: 'I hit this pothole yesterday, it completely ruined my tire! Glad someone reported it.' },
  { id: 2, author: 'Sarah K.', time: '45 mins ago', text: 'This road has been ignored for months. Hopefully the city acts fast.' },
  { id: 3, author: 'NagarSetu Admin', time: '10 mins ago', text: 'Thank you for reporting. This has been forwarded to the local public works department.' }
];

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const issue = mockIssues.find(i => i.id === id) || mockIssues[0]; // fallback if not found

  return (
    <div className="w-full max-w-2xl mx-auto pb-8">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-secondary hover:text-primary mb-4 px-2 py-1 transition-colors w-fit"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">{t('issueDetail.back')}</span>
      </button>

      {/* Main Detail Card */}
      <div className="bg-card rounded-2xl border border-border flex flex-col overflow-hidden shadow-sm mb-6">
        
        {/* Header Row */}
        <div className="flex items-center justify-between px-4 md:px-6 pt-5 pb-3">
          <div className="flex items-center gap-2 text-xs md:text-sm text-text-secondary">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={16} />
            </div>
            <span className="font-semibold text-text-primary">{t('issueDetail.citizenReport')}</span>
            <span>•</span>
            <span>{issue.timestamp}</span>
          </div>
          <button className="text-text-secondary hover:bg-background p-1.5 rounded-full transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="px-4 md:px-6 pb-4">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-[11px] md:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${categoryStyles[issue.category] || categoryStyles.other}`}>
              {t(`categories.${issue.category}`)}
            </span>
            <span className={`text-[11px] md:text-xs font-semibold px-2.5 py-1 rounded-full border ${statusStyles[issue.status] || statusStyles.reported}`}>
              {t(`statuses.${issue.status}`)}
            </span>
          </div>

          {/* Full Title */}
          <h1 className="text-xl md:text-2xl font-extrabold text-text-primary mb-2 leading-tight">
            {issue.title}
          </h1>
          
          {/* Full Description */}
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-4">
            {issue.description}
          </p>
        </div>

        {/* Edge-to-Edge Media */}
        {issue.imageUrl && (
          <div className="w-full bg-background border-y border-border">
            <img 
              src={issue.imageUrl} 
              alt={issue.title}
              className="w-full h-auto max-h-[60vh] object-cover"
            />
          </div>
        )}

        {/* Location & Map Preview */}
        <div className="px-4 md:px-6 py-5 border-b border-border">
          <div className="flex items-center gap-1.5 text-sm md:text-base text-text-primary font-semibold mb-3">
            <MapPin size={18} className="text-primary" />
            <span>{issue.location}</span>
          </div>
          <div className="w-full h-32 bg-background border border-border rounded-xl flex flex-col items-center justify-center text-text-secondary">
            <Map size={24} className="mb-2 opacity-50" />
            <span className="text-sm font-medium opacity-75">Map preview (Leaflet coming soon)</span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="px-4 md:px-6 py-2 border-b border-border bg-background/30">
          <StatusTimeline currentStatus={issue.status} />
        </div>

        {/* Bottom Action Row */}
        <div className="px-4 md:px-6 py-4 flex items-center bg-card">
          <ActionRow 
            initialUpvotes={issue.upvotes} 
            initialUserHasUpvoted={issue.userHasUpvoted}
            commentsCount={issue.commentsCount}
          />
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-card rounded-2xl border border-border p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-bold text-text-primary mb-6">Comments ({issue.commentsCount})</h2>
        
        {/* Flat Comment List */}
        <div className="flex flex-col gap-5 mb-8">
          {mockComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-background flex-shrink-0 flex items-center justify-center text-text-secondary mt-1 border border-border">
                <User size={14} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-text-primary">{comment.author}</span>
                  <span className="text-xs text-text-secondary">• {comment.time}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="flex items-end gap-3 pt-4 border-t border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary border border-primary/20">
            <User size={14} />
          </div>
          <div className="flex-1 relative">
            <textarea 
              placeholder={t('issueDetail.addComment')}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-12"
              rows={1}
            />
          </div>
          <button className="p-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors flex-shrink-0" title={t('issueDetail.send')}>
            <Send size={18} />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default IssueDetail;
