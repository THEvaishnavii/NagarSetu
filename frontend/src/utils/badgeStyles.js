export const categoryStyles = {
  pothole: 'text-category-pothole bg-category-pothole/10',
  garbage: 'text-category-garbage bg-category-garbage/10',
  water: 'text-category-water bg-category-water/10',
  streetlight: 'text-category-streetlight bg-category-streetlight/10',
  other: 'text-category-other bg-category-other/10',
};

export const statusStyles = {
  reported: 'text-status-reported bg-status-reported/10 border-status-reported/20',
  acknowledged: 'text-status-acknowledged bg-status-acknowledged/10 border-status-acknowledged/20',
  inProgress: 'text-status-inProgress bg-status-inProgress/10 border-status-inProgress/20',
  resolved: 'text-status-resolved bg-status-resolved/10 border-status-resolved/20',
};

export const formatLabel = (str) => {
  if (!str) return '';
  return str.replace(/([A-Z])/g, ' $1').trim().replace(/^./, (s) => s.toUpperCase());
};
