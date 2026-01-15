
import React, { useState } from 'react';

interface VibeMatchResultsScreenProps {
  onBack: () => void;
  onJoin: () => void;
  onCompleteProfile?: () => void;
  isProfileIncomplete?: boolean;
  score?: number;
}

const VibeMatchResultsScreen: React.FC<VibeMatchResultsScreenProps> = ({ 
  onBack, 
  onJoin, 
  onCompleteProfile,
  isProfileIncomplete = false,
  score = 92 
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleJoinClick = () => {
    // Logic updated: authentication check moved to Trip Details screen
    setShowPopup(true);
  };

  // SVG Gauge calculations
  const radius = 70; // Reduced radius slightly to avoid clipping with stroke
  const strokeWidth = 14;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#faf8f4] text-slate-900 font-display min-h-screen flex flex-col animate-in fade-in duration-700 relative overflow-x-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" style={{ 
        backgroundImage: `radial-gradient(#00b2b2 0.5px, transparent 0.5px), radial-gradient(#00b2b2 0.5px, #faf8f4 0.5px)`,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}></div>

      {/* Success Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-[2px] animate-in fade-in duration-300">
          <div className="w-full max-w-[380px] max-h-[85dvh] bg-white rounded-[40px] p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-400 overflow-y-auto no-scrollbar">
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mb-8 shrink-0"></div>
            
            <div className="relative mb-8 shrink-0">
              <div className="size-24 rounded-full bg-[#e0f7f7] flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="size-16 rounded-full bg-primary flex items-center justify-center shadow-lg transform -rotate-3">
                   <span className="material-symbols-outlined text-white text-4xl font-black">send</span>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 size-8 rounded-full bg-white flex items-center justify-center shadow-md">
                <div className="size-6 rounded-full bg-primary flex items-center justify-center border-2 border-white">
                  <span className="material-symbols-outlined text-white text-[14px] font-black">check</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Request Sent!</h3>
            <p className="text-slate-500 font-bold text-base leading-relaxed mb-10 px-4">
              Your request has been sent to the group admin. You'll hear back soon!
            </p>

            <div className="w-full flex flex-col gap-4 mt-auto">
              <button 
                onClick={onJoin}
                className="w-full h-16 bg-primary text-white font-black rounded-[24px] shadow-xl shadow-primary/20 active:scale-[0.97] transition-all text-lg"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-[#faf8f4]/90 backdrop-blur-md p-5 justify-between border-b border-slate-100/30">
        <button 
          onClick={onBack}
          className="flex size-11 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-gray text-lg font-black leading-tight tracking-tight flex-1 text-center font-display">Compatibility Results</h2>
        <button className="flex size-11 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-primary text-[24px]">share</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-40">
        {/* Score Hero Section */}
        <div className="px-6 py-12 flex flex-col items-center justify-center">
          <h4 className="text-primary text-xs font-black uppercase tracking-[0.25em] mb-12">YOU'RE A GREAT MATCH!</h4>
          
          <div className="relative flex items-center justify-center w-64 h-64">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {/* Background Track */}
              <circle 
                cx="100" cy="100" r={radius}
                fill="none"
                stroke="rgba(0,178,178,0.1)"
                strokeWidth={strokeWidth}
              />
              {/* Foreground Progress */}
              <circle 
                cx="100" cy="100" r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-primary transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[20px] font-black text-slate-gray leading-none tracking-tighter">{score}%</span>
              <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] mt-3">GROUP SCORE</span>
            </div>
          </div>
        </div>

        {/* Why you fit section */}
        <div className="px-8 py-6">
          <h3 className="text-slate-gray text-xl font-black mb-6 tracking-tight font-display">Why you fit</h3>
          <div className="flex gap-3 flex-wrap">
            <div className="flex h-12 items-center justify-center gap-x-2 rounded-2xl bg-primary text-white px-6 shadow-sm">
              <span className="material-symbols-outlined text-[20px] filled-icon">restaurant</span>
              <p className="text-sm font-black">Foodies</p>
            </div>
            <div className="flex h-12 items-center justify-center gap-x-2 rounded-2xl bg-[#FF7043] text-white px-6 shadow-sm">
              <span className="material-symbols-outlined text-[20px] filled-icon">wb_sunny</span>
              <p className="text-sm font-black">Early Birds</p>
            </div>
            <div className="flex h-12 items-center justify-center gap-x-2 rounded-2xl bg-white text-slate-600 px-6 shadow-sm border border-slate-100">
              <span className="material-symbols-outlined text-[20px] filled-icon">hiking</span>
              <p className="text-sm font-black">Hikers</p>
            </div>
            <div className="flex h-12 items-center justify-center gap-x-2 rounded-2xl bg-white text-slate-600 px-6 shadow-sm border border-slate-100">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              <p className="text-sm font-black">Art Lovers</p>
            </div>
          </div>
        </div>

        {/* Your Travel Tribe section */}
        <div className="px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-slate-gray text-xl font-black tracking-tight font-display">Your Travel Tribe</h3>
            <button className="text-primary text-sm font-black uppercase tracking-widest">See all</button>
          </div>
          
          <div className="grid grid-cols-2 gap-5">
            {[
              { 
                name: 'Sarah Jenkins', 
                loc: 'Digital Nomad • NYC', 
                match: '88% MATCH', 
                img: 'https://i.pravatar.cc/150?u=sarah_j', 
                icons: ['coffee', 'landscape', 'flight'],
                isNew: false
              },
              { 
                name: 'Marcus Chen', 
                loc: 'Art Director • London', 
                match: '94% MATCH', 
                img: 'https://i.pravatar.cc/150?u=marcus_c', 
                icons: ['palette', 'camera', 'wine_bar'],
                isNew: false
              }
            ].map((user) => (
              <div key={user.name} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-50 flex flex-col gap-4 relative overflow-hidden transition-all hover:shadow-md active:scale-[0.98]">
                <div className={`absolute top-4 right-4 ${user.isNew ? 'bg-slate-100 text-slate-400' : 'bg-primary/10 text-primary'} text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter`}>
                  {user.match}
                </div>
                <div className="w-16 h-16 rounded-[24px] overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <img className="w-full h-full object-cover" alt={user.name} src={user.img}/>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-gray font-black text-base leading-tight truncate">{user.name}</p>
                  <p className="text-slate-400 text-xs font-bold leading-tight">{user.loc}</p>
                </div>
                <div className="flex gap-2.5 pt-2">
                  {user.icons.map(icon => (
                    <span key={icon} className="material-symbols-outlined text-[18px] text-primary/60">{icon}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] p-6 bg-gradient-to-t from-[#faf8f4] via-[#faf8f4] to-transparent z-50">
        <button 
          onClick={handleJoinClick}
          className="w-full bg-primary text-white font-black h-16 rounded-[24px] shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all text-lg"
        >
          <span className="material-symbols-outlined text-[24px] filled-icon">forum</span>
          Join Group
        </button>
      </footer>
    </div>
  );
};

export default VibeMatchResultsScreen;
