import React from 'react';
import { MapPin, MoreHorizontal, User } from 'lucide-react';
import ActionRow from '../ui/ActionRow';
import { useNavigate } from 'react-router-dom';
import { categoryStyles, statusStyles, formatLabel } from '../../utils/badgeStyles';
import { useLanguage } from '../../context/LanguageContext';

const IssueCard = ({ issue }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div 
      onClick={() => navigate(`/issue/${issue.id}`)}
      className="bg-[#f7f9f7] rounded-2xl border border-[#e5ebe5] p-4 md:p-5 flex flex-col gap-3 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all shadow-sm"
    >
      
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 rounded-full bg-[#e2e6e2] flex items-center justify-center text-gray-500">
            <User size={16} />
          </div>
          <span className="font-semibold text-gray-900">{t('issueDetail.citizenReport')}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">{issue.timestamp}</span>
        </div>
        <button 
          onClick={(e) => e.stopPropagation()} 
          className="text-gray-400 hover:bg-[#e2e6e2] p-1.5 rounded-full transition-colors"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-1">
        <span className={`text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${categoryStyles[issue.category] || categoryStyles.other}`}>
          {t(`categories.${issue.category}`)}
        </span>
        <span className={`text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusStyles[issue.status] || statusStyles.reported}`}>
          {t(`statuses.${issue.status}`)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1 leading-tight">
        {issue.title}
      </h3>
      
      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
        <MapPin size={16} className="text-gray-400" />
        <span className="truncate">{issue.location}</span>
      </div>

      {/* Description Snippet */}
      <p className="text-gray-700 leading-relaxed text-sm md:text-base mt-1">
        {issue.description}
      </p>

      {/* Media & Actions Grid */}
      <div className="flex flex-col md:flex-row gap-4 mt-2">
        
        {/* Main Image */}
        {issue.imageUrl && (
          <div className="w-full md:w-[65%] h-56 md:h-64 rounded-xl overflow-hidden border border-black/5 flex-shrink-0">
            <img 
              src={issue.imageUrl} 
              alt={issue.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Right Side: Map & Actions */}
        <div className={`w-full flex flex-col gap-4 ${issue.imageUrl ? 'md:w-[35%]' : ''}`}>
          
          {/* Map Box */}
          <div className="flex-1 bg-[#e8ece8] rounded-xl border border-black/5 p-2 flex flex-col relative overflow-hidden min-h-[160px]">
            {/* Map Grid Pattern SVG using CSS */}
            <div 
              className="absolute inset-0 opacity-40" 
              style={{
                backgroundImage: 'linear-gradient(to right, #ffffff 2.5px, transparent 2.5px), linear-gradient(to bottom, #ffffff 2.5px, transparent 2.5px)',
                backgroundSize: '30px 30px',
                transform: 'rotate(20deg) scale(1.5)'
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center pb-8">
              <MapPin size={36} className="text-[#ea4335] drop-shadow-md" fill="#ea4335" color="white" strokeWidth={1} />
            </div>
            
            {/* Location Pill inside Map */}
            <div className="mt-auto bg-white/95 backdrop-blur-sm rounded-lg p-2.5 flex items-center gap-2 text-xs font-medium text-gray-700 z-10 shadow-sm border border-black/5">
              <MapPin size={14} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{issue.location}</span>
            </div>
          </div>

          {/* Action Row - bottom right */}
          <div className="flex justify-end">
            <ActionRow 
              initialUpvotes={issue.upvotes} 
              initialUserHasUpvoted={issue.userHasUpvoted}
              commentsCount={issue.commentsCount}
            />
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default IssueCard;
