import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Image as ImageIcon, MapPin } from 'lucide-react';
import { mockIssues } from '../utils/mockIssues';
import { categoryStyles, statusStyles, formatLabel } from '../utils/badgeStyles';

// Fix Vite + react-leaflet default marker icon issue
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Base coordinates for Sangli
const BASE_LAT = 16.8524;
const BASE_LNG = 74.5815;

// Utility to generate a deterministic pseudo-random offset based on a string ID
const getFuzzedCoordinates = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const latOffset = ((hash % 100) / 100 - 0.5) * 0.04;
  const lngOffset = (((hash >> 4) % 100) / 100 - 0.5) * 0.04;
  return [BASE_LAT + latOffset, BASE_LNG + lngOffset];
};

const categoryColorHex = {
  pothole: '#EF4444',
  garbage: '#F59E0B',
  water: '#3B82F6',
  streetlight: '#10B981',
  other: '#8B5CF6',
};

const getCustomIcon = (category) => {
  const hex = categoryColorHex[category] || categoryColorHex.other;
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${hex};
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
};

const CATEGORIES = ['Pothole', 'Garbage', 'Water Leakage', 'Streetlight', 'Other'];

// Mini card for the right panel list
const MiniIssueCard = ({ issue, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-background border border-border p-3 rounded-xl cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all"
  >
    <h4 className="font-bold text-sm text-text-primary mb-2 line-clamp-2 leading-snug">
      {issue.title}
    </h4>
    <div className="flex flex-wrap gap-1.5 mt-auto">
      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${categoryStyles[issue.category] || categoryStyles.other}`}>
        {issue.category}
      </span>
      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${statusStyles[issue.status] || statusStyles.reported}`}>
        {formatLabel(issue.status)}
      </span>
    </div>
  </div>
);

import { useNavigate } from 'react-router-dom';

const MapView = () => {
  const navigate = useNavigate();
  
  const [activeCategories, setActiveCategories] = useState(
    CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
  );

  const visibleIssues = useMemo(() => {
    return mockIssues.filter(issue => {
      const label = formatLabel(issue.category);
      const mappedLabel = label === 'Water' ? 'Water Leakage' : label;
      return activeCategories[mappedLabel] !== false;
    });
  }, [activeCategories]);

  const toggleCategory = (cat) => {
    setActiveCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Recent reports for the right panel (taking top 4 from mock data)
  const recentReports = mockIssues.slice(0, 4);

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      
      {/* Map Section */}
      <div className="flex-1 min-h-[50vh] md:min-h-0 relative z-0">
        <MapContainer 
          center={[BASE_LAT, BASE_LNG]} 
          zoom={13} 
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Reposition zoom control to bottom right */}
          <div className="leaflet-bottom leaflet-right mb-16 mr-4 sm:mb-4"></div>

          {visibleIssues.map((issue) => {
            const coords = getFuzzedCoordinates(issue.id);
            const icon = getCustomIcon(issue.category);

            return (
              <Marker key={issue.id} position={coords} icon={icon}>
                <Popup className="custom-popup">
                  <div className="w-[200px] flex flex-col gap-2 p-1">
                    <div className="w-full h-24 bg-border rounded-lg overflow-hidden flex-shrink-0">
                      {issue.imageUrl ? (
                        <img src={issue.imageUrl} className="w-full h-full object-cover" alt="Issue thumbnail" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-secondary"><ImageIcon size={24} /></div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-1.5 mt-1">
                      <h4 className="font-bold text-sm text-text-primary leading-tight">{issue.title}</h4>
                      <div className="flex flex-wrap gap-1">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${categoryStyles[issue.category] || categoryStyles.other}`}>
                          {issue.category}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${statusStyles[issue.status] || statusStyles.reported}`}>
                          {formatLabel(issue.status)}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate(`/issue/${issue.id}`)}
                      className="mt-1 w-full py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white font-semibold text-xs rounded-lg transition-colors text-center"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Right Sidebar Panel */}
      <div className="w-full md:w-[320px] lg:w-[360px] flex-shrink-0 bg-card border-t md:border-t-0 md:border-l border-border flex flex-col overflow-y-auto">
        
        {/* Filters Section */}
        <div className="p-4 md:p-6 border-b border-border">
          <h3 className="text-base font-bold text-text-primary mb-3">Filter Map</h3>
          <div className="flex flex-col gap-2.5">
            {CATEGORIES.map(cat => {
              const key = Object.keys(categoryColorHex).find(k => k.toLowerCase().includes(cat.split(' ')[0].toLowerCase())) || 'other';
              const colorHex = categoryColorHex[key];
              const isActive = activeCategories[cat];
              
              return (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={isActive} 
                    onChange={() => toggleCategory(cat)}
                    className="hidden"
                  />
                  <div 
                    className="w-4 h-4 rounded-full border-2 transition-all flex-shrink-0"
                    style={{ 
                      backgroundColor: isActive ? colorHex : 'transparent',
                      borderColor: colorHex
                    }}
                  />
                  <span className={`text-sm font-medium transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                    {cat}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="p-4 md:p-6 flex-1 bg-background/50">
          <h3 className="text-base font-bold text-text-primary mb-3">Recent Reports</h3>
          <div className="flex flex-col gap-3">
            {recentReports.map(issue => (
              <MiniIssueCard 
                key={issue.id} 
                issue={issue} 
                onClick={() => navigate(`/issue/${issue.id}`)} 
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapView;
