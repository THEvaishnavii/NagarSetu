import React from 'react';
import IssueCard from './IssueCard';

const FeedList = ({ issues }) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="py-12 text-center text-text-secondary bg-card rounded-xl border border-border">
        No issues found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {issues.map((issue) => (
        <IssueCard 
          key={issue.id} 
          issue={issue} 
        />
      ))}
    </div>
  );
};

export default FeedList;
