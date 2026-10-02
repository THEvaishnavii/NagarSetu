import React, { useState } from 'react';
import { ArrowBigUp, MessageCircle } from 'lucide-react';

const ActionRow = ({ initialUpvotes, initialUserHasUpvoted, commentsCount }) => {
  const [hasUpvoted, setHasUpvoted] = useState(initialUserHasUpvoted);
  const [votes, setVotes] = useState(initialUpvotes);

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (hasUpvoted) {
      setVotes((v) => v - 1);
      setHasUpvoted(false);
    } else {
      setVotes((v) => v + 1);
      setHasUpvoted(true);
    }
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Vote/Endorse Pill */}
      <button 
        onClick={handleUpvote}
        className={`flex items-center justify-center gap-2 px-3 py-2 min-w-[64px] rounded-xl border text-sm font-semibold transition-all shadow-sm ${
          hasUpvoted 
            ? 'bg-primary/10 border-primary/20 text-primary' 
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <ArrowBigUp size={18} fill={hasUpvoted ? 'currentColor' : 'none'} strokeWidth={hasUpvoted ? 1.5 : 2} />
        <span>{votes}</span>
      </button>

      {/* Comment Pill */}
      <button className="flex items-center justify-center gap-2 px-3 py-2 min-w-[64px] rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-sm font-semibold transition-all shadow-sm">
        <MessageCircle size={18} strokeWidth={2} />
        <span>{commentsCount}</span>
      </button>
    </div>
  );
};

export default ActionRow;
