import React, { Component } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import IssueDetail from './pages/IssueDetail';
import ReportIssue from './pages/ReportIssue';
import MyComplaints from './pages/MyComplaints';
import MapView from './pages/MapView';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import About from './pages/About';
import { useLanguage } from './context/LanguageContext';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 m-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
          <h2 className="text-xl font-bold mb-2">Something went wrong:</h2>
          <pre className="text-sm whitespace-pre-wrap">{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const isAdminPath = location.pathname.startsWith('/admin');

  const toggleAdmin = () => {
    if (isAdminPath) {
      navigate('/');
    } else {
      navigate('/admin');
    }
  };

  // Hide the floating toggle button on standalone pages
  const isStandalonePage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/about';

  return (
    <>
      {/* Floating Toggle Button to switch experiences */}
      {!isStandalonePage && (
        <button 
          onClick={toggleAdmin}
          className="fixed bottom-4 right-4 z-[9999] px-4 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-bold rounded-full shadow-2xl transition-all border border-gray-700 flex items-center gap-2"
          title="Temporary preview toggle"
        >
          {isAdminPath ? t('topbar.switchCitizen') : t('topbar.switchAdmin')}
        </button>
      )}

      <ErrorBoundary>
        <Routes>
          {/* Standalone Routes */}
          <Route path="/login" element={<Auth initialMode="login" />} />
          <Route path="/signup" element={<Auth initialMode="signup" />} />
          <Route path="/about" element={<About />} />

          {/* Citizen Routes wrapped in MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/complaints" element={<MyComplaints />} />
            <Route path="/issue/:id" element={<IssueDetail />} />
          </Route>

          {/* Admin Routes wrapped in AdminLayout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard isOverview={true} />} />
            <Route path="/admin/issues" element={<AdminDashboard isOverview={false} />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
              <h1 className="text-3xl font-bold mb-2">404 - Not Found</h1>
              <button onClick={() => navigate('/')} className="text-primary hover:underline">Return to Home</button>
            </div>
          } />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
