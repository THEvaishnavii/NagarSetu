import React from 'react';
import { Check, CircleDashed } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const STEPS = [
  { id: 'reported', colorClass: 'text-status-reported border-status-reported bg-status-reported/10' },
  { id: 'acknowledged', colorClass: 'text-status-acknowledged border-status-acknowledged bg-status-acknowledged/10' },
  { id: 'inProgress', colorClass: 'text-status-inProgress border-status-inProgress bg-status-inProgress/10' },
  { id: 'resolved', colorClass: 'text-status-resolved border-status-resolved bg-status-resolved/10' }
];

const StatusTimeline = ({ currentStatus }) => {
  const { t } = useLanguage();
  const currentIndex = STEPS.findIndex(s => s.id === currentStatus);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="py-6 px-2 w-full max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row relative justify-between gap-6 sm:gap-0">
        
        {/* Absolute Background Connector Lines */}
        <div className="hidden sm:block absolute top-[15px] left-8 right-8 h-0.5 bg-border -z-10"></div>
        <div className="sm:hidden absolute left-[15px] top-8 bottom-8 w-0.5 bg-border -z-10"></div>

        {STEPS.map((step, index) => {
          const isCompleted = index <= activeIndex;
          const isCurrent = index === activeIndex;
          const isFuture = index > activeIndex;

          return (
            <div key={step.id} className="flex sm:flex-col items-center sm:justify-start gap-4 sm:gap-2 relative z-0 flex-1">
              
              {/* Dynamic filled connector line extending to the left */}
              {isCompleted && index > 0 && (
                 <>
                   {/* Desktop Line */}
                   <div className="hidden sm:block absolute top-[15px] right-1/2 left-[-50%] h-0.5 -z-10 bg-primary opacity-30"></div>
                   {/* Mobile Line */}
                   <div className="sm:hidden absolute bottom-1/2 top-[-50%] left-[15px] w-0.5 -z-10 bg-primary opacity-30"></div>
                 </>
              )}

              {/* Icon Circle */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all bg-card
                ${isFuture ? 'border-dashed border-border text-text-secondary opacity-50' : step.colorClass}
                ${isCurrent ? 'ring-4 ring-background shadow-soft scale-110' : ''}
              `}>
                 {isCompleted ? <Check size={16} strokeWidth={3} className={isCurrent ? '' : 'opacity-75'} /> : <CircleDashed size={16} />}
              </div>
              
              {/* Text & Timestamps */}
              <div className="flex flex-col sm:items-center text-left sm:text-center mt-0 sm:mt-1">
                <span className={`text-sm font-bold ${isFuture ? 'text-text-secondary opacity-50' : 'text-text-primary'}`}>
                  {t(`statuses.${step.id}`)}
                </span>
                <span className={`text-[10px] mt-0.5 ${isFuture ? 'text-transparent' : 'text-text-secondary'}`}>
                  {isCompleted ? 'Oct 12, 10:00 AM' : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
