import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate network request
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      
      {/* Left Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex w-[45%] bg-primary relative flex-col justify-between p-12 overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] aspect-square rounded-full bg-white/5 pointer-events-none blur-3xl"></div>
        <div className="absolute top-1/4 right-[-20%] w-96 h-96 rounded-full bg-[#7fb069]/20 pointer-events-none blur-3xl"></div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#7fb069]"></div>
          <span className="text-[#7fb069] text-xs font-bold tracking-widest uppercase">SAFER CITIES, TOGETHER</span>
        </div>

        <div className="relative z-10 mb-24">
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-[1.15]">
            Your report can fix your city.
          </h1>
          <p className="text-lg max-w-md text-white/80 leading-relaxed">
            Join citizens helping report and track local civic issues, one complaint at a time.
          </p>
        </div>

        <div className="relative z-10">
          <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#7fb069] to-white inline-block text-transparent bg-clip-text">
            NagarSetu
          </div>
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md flex flex-col">
          
          {/* Form Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                {isLogin ? 'WELCOME BACK' : 'GET STARTED'}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-text-primary mb-2">
              {isLogin ? 'Sign in to NagarSetu' : 'Create your account'}
            </h2>
            <p className="text-text-secondary text-sm">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Sign up to start reporting issues in your area.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {!isLogin && (
              // NOTE: Admin accounts are provisioned manually; self-registration is strictly for citizens.
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-primary">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:border-primary focus:ring-primary/20'} bg-background focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.fullName && <span className="text-xs text-red-500">{errors.fullName}</span>}
              </div>
            )}

            {/* NOTE: Shared login gate. Backend determines role (citizen vs admin) upon authentication and redirects accordingly. */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-primary">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:border-primary focus:ring-primary/20'} bg-background focus:outline-none focus:ring-2 transition-all`}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-text-primary">Password</label>
                {isLogin && <button type="button" className="text-xs font-medium text-primary hover:underline">Forgot password?</button>}
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:border-primary focus:ring-primary/20'} bg-background focus:outline-none focus:ring-2 transition-all`}
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
            </div>

            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-primary">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500/20' : 'border-border focus:border-primary focus:ring-primary/20'} bg-background focus:outline-none focus:ring-2 transition-all`}
                />
                {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword}</span>}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-4 w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign in' : 'Create Account'}</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>

          </form>

          {/* Toggle */}
          <div className="mt-8 text-center">
            <p className="text-sm text-text-secondary">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={toggleMode}
                className="font-bold text-primary hover:underline ml-1"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Auth;
