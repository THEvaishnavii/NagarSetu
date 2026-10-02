import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Activity, 
  CheckCircle,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockIssues } from '../utils/mockIssues';
import { categoryStyles, statusStyles, formatLabel } from '../utils/badgeStyles';
import IssueReviewDrawer from '../components/admin/IssueReviewDrawer';
import { useLanguage } from '../context/LanguageContext';

// Simple stat card component
const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4 shadow-sm">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-sm font-medium text-text-secondary">{title}</h4>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
    </div>
  </div>
);

const AdminDashboard = ({ isOverview = false }) => {
  const { t } = useLanguage();
  // Just visual state for now
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  const [selectedIssue, setSelectedIssue] = useState(null);

  const displayedIssues = isOverview ? mockIssues.slice(0, 5) : mockIssues;

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
            {isOverview ? t('adminDash.titleDash') : t('adminDash.titleIssues')}
          </h1>
          <p className="text-text-secondary mt-1">
            {isOverview ? t('adminDash.descDash') : t('adminDash.descIssues')}
          </p>
        </div>
      </div>

      {/* Stat Cards Row - Only on Dashboard */}
      {isOverview && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title={t('adminDash.totalIssues')} value="1,248" icon={AlertTriangle} colorClass="bg-gray-100 text-gray-600" />
          <StatCard title={t('adminDash.pendingReview')} value="45" icon={Clock} colorClass="bg-status-reported/10 text-status-reported" />
          <StatCard title={t('adminDash.inProgress')} value="112" icon={Activity} colorClass="bg-status-inProgress/10 text-status-inProgress" />
          <StatCard title={t('adminDash.resolvedThisMonth')} value="340" icon={CheckCircle} colorClass="bg-status-resolved/10 text-status-resolved" />
        </div>
      )}

      {/* Filter Bar - Only on All Issues */}
      {!isOverview && (
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm flex flex-col lg:flex-row gap-4 items-end lg:items-center">
          <div className="flex items-center gap-2 text-text-secondary font-medium mr-2">
            <Filter size={18} /> {t('adminDash.filters')}
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto flex-1">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary">
              <option>{t('adminDash.allStatuses')}</option>
              <option>{t('statuses.reported')}</option>
              <option>{t('statuses.acknowledged')}</option>
              <option>{t('statuses.inProgress')}</option>
              <option>{t('statuses.resolved')}</option>
            </select>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary">
              <option>{t('adminDash.allCategories')}</option>
              <option>{t('categories.pothole')}</option>
              <option>{t('categories.garbage')}</option>
              <option>{t('categories.water')}</option>
              <option>{t('categories.streetlight')}</option>
              <option>{t('categories.other')}</option>
            </select>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary">
              <option>{t('adminDash.allDepartments')}</option>
              <option>Public Works</option>
              <option>Sanitation</option>
              <option>Water Board</option>
              <option>Electrical</option>
              <option>Parks & Rec</option>
            </select>
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary">
              <option>{t('adminDash.allTime')}</option>
              <option>{t('adminDash.last7Days')}</option>
              <option>{t('adminDash.last30Days')}</option>
              <option>{t('adminDash.thisYear')}</option>
            </select>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
        {isOverview && (
          <div className="px-6 py-4 border-b border-border bg-background/50">
            <h3 className="font-bold text-text-primary">{t('adminDash.recentReports')}</h3>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-background/50 border-b border-border text-xs uppercase tracking-wider text-text-secondary font-semibold">
                <th className="px-6 py-4">{t('adminDash.thTitle')}</th>
                <th className="px-6 py-4">{t('adminDash.thCategory')}</th>
                <th className="px-6 py-4">{t('adminDash.thStatus')}</th>
                <th className="px-6 py-4">{t('adminDash.thLocation')}</th>
                <th className="px-6 py-4">{t('adminDash.thDept')}</th>
                <th className="px-6 py-4">{t('adminDash.thDate')}</th>
                <th className="px-6 py-4 text-center">{t('adminDash.thVotes')}</th>
                <th className="px-6 py-4 text-center">{t('adminDash.thAction')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {displayedIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-background/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-text-primary truncate max-w-[200px]" title={issue.title}>
                      {issue.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${categoryStyles[issue.category] || categoryStyles.other}`}>
                      {t(`categories.${issue.category}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusStyles[issue.status] || statusStyles.reported}`}>
                      {t(`statuses.${issue.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary truncate max-w-[150px]" title={issue.location}>
                    {issue.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary font-medium">
                    {issue.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {issue.timestamp}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-primary">
                    {issue.upvotes}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => setSelectedIssue(issue)}
                      className="px-4 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      {t('adminDash.open')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer - Only on All Issues */}
        {!isOverview && (
          <div className="border-t border-border bg-card px-6 py-4 flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              {t('adminDash.showing')} <span className="font-semibold text-text-primary">1</span> {t('adminDash.to')} <span className="font-semibold text-text-primary">10</span> {t('adminDash.of')} <span className="font-semibold text-text-primary">1,248</span> {t('adminDash.results')}
            </span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg border border-border text-text-secondary hover:bg-background disabled:opacity-50" disabled>
                <ChevronLeft size={18} />
              </button>
              <button className="px-3 py-1 rounded-lg bg-primary text-white text-sm font-medium">1</button>
              <button className="px-3 py-1 rounded-lg hover:bg-background text-text-secondary text-sm font-medium">2</button>
              <button className="px-3 py-1 rounded-lg hover:bg-background text-text-secondary text-sm font-medium">3</button>
              <span className="px-2 text-text-secondary">...</span>
              <button className="px-3 py-1 rounded-lg hover:bg-background text-text-secondary text-sm font-medium">125</button>
              <button className="p-1.5 rounded-lg border border-border text-text-secondary hover:bg-background">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedIssue && (
        <IssueReviewDrawer 
          issue={selectedIssue} 
          onClose={() => setSelectedIssue(null)} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;
