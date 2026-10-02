import React, { useState } from 'react';
import FeedList from '../components/feed/FeedList';
import { mockIssues } from '../utils/mockIssues';
import { Filter, ChevronDown } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const [activeSort, setActiveSort] = useState(t('home.sortNewest'));
  
  const sortOptions = [t('home.sortNewest'), t('home.sortUpvoted'), t('home.sortNearest')];

  return (
    <div className="w-full max-w-2xl mx-auto pb-8">
      {/* Page Header / Filters */}
      <div className="mb-6 sticky top-16 z-30 bg-background/95 backdrop-blur py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Sort Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveSort(opt)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-sm font-medium transition-colors border ${
                  activeSort === opt
                    ? 'bg-primary text-white border-primary shadow-soft'
                    : 'bg-card text-text-secondary border-border hover:bg-background hover:text-text-primary'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Category Filter Dropdown (Mock) */}
          <button className="flex items-center justify-center gap-2 px-4 py-1.5 bg-card border border-border rounded-xl text-sm font-medium text-text-primary shadow-sm hover:bg-background transition-colors w-fit">
            <Filter size={14} className="text-text-secondary" />
            <span>{t('home.allCategories')}</span>
            <ChevronDown size={14} className="text-text-secondary ml-1" />
          </button>
        </div>
      </div>

      {/* Feed */}
      <FeedList issues={mockIssues} />

      {/* Load More Button */}
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-2.5 bg-card border border-border rounded-full font-medium text-text-primary shadow-sm hover:border-primary/50 hover:text-primary transition-colors">
          {t('home.loadMore')}
        </button>
      </div>
    </div>
  );
};

export default Home;
