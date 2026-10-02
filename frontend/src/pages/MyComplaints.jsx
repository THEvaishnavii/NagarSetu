import React, { useState } from 'react';
import { ArrowBigUp, Clock, Inbox } from 'lucide-react';
import { mockIssues } from '../utils/mockIssues';
import { categoryStyles, statusStyles, formatLabel } from '../utils/badgeStyles';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const STATUS_FILTERS = ['All', 'reported', 'acknowledged', 'inProgress', 'resolved'];

const CompactComplaintCard = ({ issue, onClick, t }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-card rounded-xl border border-border p-4 md:p-5 flex flex-col cursor-pointer hover:border-primary/30 hover:shadow-soft transition-all"
    >
      {/* Top Row: Tags & Date */}
      <div className="flex items-start justify-between mb-2 md:mb-3">
        <div className="flex flex-wrap gap-2">
          <span className={`text-[10px] md:text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${categoryStyles[issue.category] || categoryStyles.other}`}>
            {t(`categories.${issue.category}`)}
          </span>
          <span className={`text-[10px] md:text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusStyles[issue.status] || statusStyles.reported}`}>
            {t(`statuses.${issue.status}`)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-secondary whitespace-nowrap ml-2">
          <Clock size={12} />
          <span>{issue.timestamp}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-bold text-text-primary mb-3 line-clamp-2">
        {issue.title}
      </h3>

      {/* Bottom Row: Read-only Upvotes */}
      <div className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-text-secondary">
        <div className="flex items-center gap-1 bg-background px-2.5 py-1 rounded-full border border-border">
          <ArrowBigUp size={14} className="text-primary" />
          <span>{issue.upvotes}</span>
        </div>
      </div>
    </div>
  );
};

const MyComplaints = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');

  // Client-side filtering logic
  const myComplaints = mockIssues.filter(issue => issue.isMine);
  const filteredComplaints = myComplaints.filter((issue) => {
    if (activeFilter === 'All') return true;
    return issue.status === activeFilter;
  });

  return (
    <div className="w-full max-w-2xl mx-auto pb-12 px-4 md:px-0">
      <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6 md:mb-8">
        {t('complaints.title')}
      </h1>

      {/* Status Filter Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
        {STATUS_FILTERS.map((status) => {
          const label = status === 'All' ? t('complaints.all') : t(`statuses.${status}`);
          const isActive = activeFilter === status;
          
          return (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-soft'
                  : 'bg-card text-text-secondary border-border hover:bg-background hover:text-text-primary'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* List or Empty State */}
      {filteredComplaints.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredComplaints.map((issue) => (
            <CompactComplaintCard 
              key={issue.id} 
              issue={issue} 
              onClick={() => navigate(`/issue/${issue.id}`)}
              t={t}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center bg-card rounded-2xl border border-border shadow-sm mt-2">
          <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-text-secondary mb-4 border border-border">
            <Inbox size={32} className="opacity-50" />
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-1">
            {t('complaints.noComplaints')}
          </h3>
          <p className="text-sm text-text-secondary max-w-sm">
            {t('complaints.noComplaintsDesc')} '{activeFilter === 'All' ? t('complaints.all') : t(`statuses.${activeFilter}`)}' {t('complaints.atTheMoment')}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyComplaints;
