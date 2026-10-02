export const mockMyComplaints = [
  {
    id: 'my-1',
    title: 'Streetlight out on MG Road',
    category: 'streetlight',
    status: 'reported',
    timestamp: '2 hours ago',
    upvotes: 1,
  },
  {
    id: 'my-2',
    title: 'Garbage dump overflowing near Central Park',
    category: 'garbage',
    status: 'inProgress',
    timestamp: '3 days ago',
    upvotes: 14,
  },
  {
    id: 'my-3',
    title: 'Pothole causing accidents on 4th Cross',
    category: 'pothole',
    status: 'resolved',
    timestamp: '1 week ago',
    upvotes: 42,
  },
  {
    id: 'my-4',
    title: 'Leaking water pipe in Sector 4',
    category: 'water',
    status: 'reported',
    timestamp: 'Just now',
    upvotes: 0,
  },
  {
    id: 'my-5',
    title: 'Fallen tree blocking the sidewalk',
    category: 'other',
    status: 'resolved',
    timestamp: '2 months ago',
    upvotes: 8,
  }
  // Note: No "acknowledged" status items to test the empty state
];
