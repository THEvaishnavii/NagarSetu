import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight, CheckCircle, UploadCloud, MapPin, Search, FileAudio, FileText, Activity } from 'lucide-react';
import logo from '../assets/logo.png';

const HERO_STAGES = [
  {
    id: 'reported',
    label: 'REPORTED',
    colorClass: 'text-status-reported border-status-reported/20 bg-status-reported/10',
    bgImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=150&q=80',
    progressFill: 1
  },
  {
    id: 'acknowledged',
    label: 'ACKNOWLEDGED',
    colorClass: 'text-status-acknowledged border-status-acknowledged/20 bg-status-acknowledged/10',
    bgImage: 'https://images.unsplash.com/photo-1515162704518-e37452d3eb03?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1515162704518-e37452d3eb03?auto=format&fit=crop&w=150&q=80',
    progressFill: 2
  },
  {
    id: 'inProgress',
    label: 'IN PROGRESS',
    colorClass: 'text-status-inProgress border-status-inProgress/20 bg-status-inProgress/10',
    bgImage: 'https://images.unsplash.com/photo-1541888081696-6e4215903b46?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1541888081696-6e4215903b46?auto=format&fit=crop&w=150&q=80',
    progressFill: 3
  },
  {
    id: 'resolved',
    label: 'RESOLVED',
    colorClass: 'text-status-resolved border-status-resolved/20 bg-status-resolved/10',
    bgImage: 'https://images.unsplash.com/photo-1605370281486-1d1ddce55577?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1605370281486-1d1ddce55577?auto=format&fit=crop&w=150&q=80',
    progressFill: 4
  }
];

const About = () => {
  const navigate = useNavigate();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStageIndex((prev) => (prev + 1) % HERO_STAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeStage = HERO_STAGES[currentStageIndex];

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
      
      {/* 1. STANDALONE HEADER */}
      <header className="sticky top-0 z-50 bg-card border-b border-border h-16 flex items-center justify-between px-4 md:px-8 shadow-sm">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 group transition-opacity hover:opacity-90">
          <img src={logo} alt="NagarSetu Logo" className="h-9 w-9 object-contain" />
          <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#7fb069] to-[#1f4d38] inline-block text-transparent bg-clip-text">
            NagarSetu
          </span>
        </button>
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
            Home
          </button>
          {/* Visual-only placeholder toggle as requested */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background text-text-secondary cursor-not-allowed opacity-80" title="Placeholder UI">
            <Globe size={16} />
            <span className="text-sm font-bold">EN</span>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="px-4 md:px-8 py-16 md:py-240 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-start text-left">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-primary text-xs md:text-sm font-bold tracking-widest uppercase">CIVIC ISSUE REPORTING PLATFORM</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#173f30] leading-[1.1] mb-6">
            Better city start with you.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed max-w-xl">
            Report potholes, garbage, broken streetlights, water leakage, and drainage issues in your area — and follow every report until it's resolved.
          </p>
          <button onClick={() => navigate('/report')} className="bg-[#173f30] hover:bg-[#2a6b4f] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-all flex items-center gap-2 group">
            Report an Issue
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-4 text-sm text-text-secondary font-medium opacity-80">Photo and voice reporting supported</p>
        </div>

        {/* Hero Mockup Image + Floating Card */}
        <div className="flex-1 relative w-full aspect-square max-h-[500px]">
          {/* Animated Background Images */}
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative bg-gray-100">
            {HERO_STAGES.map((stage, idx) => (
              <img 
                key={stage.id}
                src={stage.bgImage} 
                alt="Civic improvement stage" 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${idx === currentStageIndex ? 'opacity-100' : 'opacity-0'}`} 
              />
            ))}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>
      </section>

      {/* 3. STAT STRIP */}
      <section className="bg-[#173f30] text-white py-12 px-4 w-full">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="pt-6 md:pt-0 md:px-8 w-full md:w-auto">
            <div className="text-4xl md:text-5xl font-extrabold mb-2">6</div>
            <div className="text-white/70 font-medium text-sm md:text-base uppercase tracking-wide">Issue categories tracked</div>
          </div>
          <div className="pt-6 md:pt-0 md:px-8 w-full md:w-auto">
            <div className="text-4xl md:text-5xl font-extrabold mb-2">4</div>
            <div className="text-white/70 font-medium text-sm md:text-base uppercase tracking-wide">Status stages</div>
          </div>
          <div className="pt-6 md:pt-0 md:px-8 w-full md:w-auto">
            <div className="text-4xl md:text-5xl font-extrabold mb-2 text-[#7fb069]">AI</div>
            <div className="text-white/70 font-medium text-sm md:text-base uppercase tracking-wide">Department routing</div>
          </div>
        </div>
      </section>

      {/* 4. "HOW AN ISSUE GETS RESOLVED" */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#173f30] mb-4">How an issue gets resolved</h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-16">
          Every report follows a transparent path from submission to resolution.
        </p>
        
        <div className="flex flex-col md:flex-row items-start justify-between relative gap-8 md:gap-4">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-6 left-12 right-12 h-[2px] border-t-2 border-dashed border-border -z-10"></div>
          {/* Connector Line (Mobile) */}
          <div className="md:hidden absolute left-6 top-12 bottom-12 w-[2px] border-l-2 border-dashed border-border -z-10"></div>
          
          {[
            { num: 1, title: 'Report an issue', desc: 'Describe the problem, add a photo or voice note, and pin its location.' },
            { num: 2, title: 'Community support', desc: "Nearby citizens upvote if they're affected too, so it's not filed as a duplicate." },
            { num: 3, title: 'Department reviews', desc: 'The relevant municipal department verifies the issue and updates its status.' },
            { num: 4, title: 'Issue resolved', desc: 'Get updates until the issue is fixed, with proof shared at the end.' }
          ].map((step) => (
            <div key={step.num} className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center w-full md:w-1/4 gap-4 md:gap-0 relative z-10 bg-background md:bg-transparent">
              <div className="w-12 h-12 bg-white border-4 border-[#173f30] text-[#173f30] font-extrabold text-xl rounded-full flex items-center justify-center mb-0 md:mb-6 flex-shrink-0 shadow-sm">
                {step.num}
              </div>
              <div>
                <h4 className="font-bold text-lg text-text-primary mb-2">{step.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed px-0 md:px-4">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. "BUILT FOR CLEANER, SAFER CITIES" */}
      <section className="bg-white py-20 px-4 border-t border-border w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#173f30] mb-4">Built for cleaner, safer cities</h2>
            <p className="text-lg text-text-secondary max-w-2xl">
              Everything you need to report effectively and hold your city accountable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: UploadCloud, title: 'Support a report', desc: 'Upvote an existing issue instead of filing a duplicate.' },
              { icon: MapPin, title: 'Live issue map', desc: 'See reported issues near you on a live map.' },
              { icon: FileAudio, title: 'Photo & voice reports', desc: 'Add evidence quickly with photos or a voice description.' },
              { icon: Activity, title: 'AI-assisted routing', desc: 'AI helps classify issues and suggest the right department — never makes final decisions.' },
              { icon: FileText, title: 'Admin briefs', desc: 'Officials get a concise, AI-generated summary of each issue.' },
              { icon: CheckCircle, title: 'Status tracking', desc: 'Follow every stage from report to confirmed resolution.' }
            ].map((feature, i) => (
              <div key={i} className="bg-background rounded-2xl p-6 md:p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#7fb069]/20 flex items-center justify-center text-[#173f30] mb-6">
                  <feature.icon size={24} />
                </div>
                <h4 className="font-bold text-lg text-text-primary mb-3">{feature.title}</h4>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLOSING CTA BAND */}
      <section className="bg-[#173f30] text-white py-16 px-4 w-full text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Seen a civic issue today?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            It takes under a minute to report it, and your neighbours' support helps get it resolved faster.
          </p>
          <button onClick={() => navigate('/report')} className="bg-[#7fb069] hover:bg-[#6c9c58] text-[#173f30] px-8 py-4 rounded-xl font-bold text-lg shadow-sm transition-colors mx-auto flex items-center gap-2">
            Report an Issue
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#0f2a20] text-white/80 py-12 px-4 w-full">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
            <div className="flex flex-col gap-4 max-w-sm">
              <div className="flex items-center gap-2">
                <img src={logo} alt="NagarSetu Logo" className="h-8 w-8 object-contain grayscale opacity-80" />
                <span className="text-xl font-bold tracking-tight text-white">NagarSetu</span>
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                A student-built platform for reporting and tracking local civic issues. This is a college prototype, not an official government service.
              </p>
            </div>
            
            <div>
              <button onClick={() => navigate('/')} className="font-bold text-white hover:text-[#7fb069] transition-colors">
                Home
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© 2026 NagarSetu</p>
            <p className="italic">Built by students, for the city.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default About;
