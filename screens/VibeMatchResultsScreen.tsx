
import React, { useState, useEffect } from 'react';
import { Match } from '../types';

interface VibeMatchResultsScreenProps {
  onBack: () => void;
  onJoin: () => void;
  matches: Match[];
  finalScore: number;
  destination: string;
}

const useCountUp = (target: number, duration: number = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeProgress * target));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);
  return count;
};

const VibeMatchResultsScreen: React.FC<VibeMatchResultsScreenProps> = ({ onBack, onJoin, matches, finalScore, destination }) => {
  const animatedScore = useCountUp(finalScore);
  const [showModal, setShowModal] = useState(false);

  const handleJoinRequest = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-gray font-display overflow-hidden relative text-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-primary/20 to-transparent pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 size-64 bg-primary/10 rounded-full blur-[100px]"></div>

      <header className="sticky top-0 z-50 flex items-center px-6 pt-12 pb-4 justify-between shrink-0">
        <button 
          onClick={onBack}
          className="size-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <h1 className="text-lg font-black tracking-tight uppercase tracking-widest text-primary">Compatibility</h1>
        <div className="size-11"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-8 pt-4 pb-40">
        <div className="text-center mb-10">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-3">Sync Analysis Complete</p>
          <h2 className="text-4xl font-black tracking-tighter leading-tight mb-8">Your {destination} <br/> Synergy Score</h2>
          
          <div className="relative inline-flex items-center justify-center">
             <svg className="size-56 transform -rotate-90">
                <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                <circle 
                  cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray={628} 
                  strokeDashoffset={628 - (628 * animatedScore) / 100}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000 ease-out" 
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl font-black tracking-tighter leading-none">{animatedScore}</span>
                <span className="text-primary text-sm font-black uppercase tracking-widest mt-1">% Match</span>
             </div>
             {/* Glowing Orbs */}
             <div className="absolute -top-2 -right-2 size-6 bg-primary rounded-full blur-md animate-pulse"></div>
          </div>
        </div>

        {/* Synergy Breakdown */}
        <section className="mb-12">
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] mb-6 px-1">Resonance Breakdown</h3>
          <div className="grid grid-cols-1 gap-4">
             {[
               { label: 'Interests Alignment', score: 98, icon: 'auto_awesome', color: '#00b2b2' },
               { label: 'Travel Pace Sync', score: 92, icon: 'bolt', color: '#FFBF00' },
               { label: 'Cultural Vibe Match', score: 87, icon: 'mood', color: '#FF7043' }
             ].map((item) => (
               <div key={item.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[28px] p-5 flex items-center gap-5">
                  <div className="size-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                     <span className="material-symbols-outlined filled-icon">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-sm font-black text-white/90">{item.label}</span>
                       <span className="text-xs font-black" style={{ color: item.color }}>{item.score}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.score}%`, backgroundColor: item.color }}></div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </section>

        {/* Tribe Preview */}
        <section className="mb-12">
          <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] mb-6 px-1">Top Tribe Connections</h3>
          <div className="space-y-4">
            {matches.slice(0, 3).map((match, idx) => (
              <div key={match.id} className="flex items-center gap-5 p-4 rounded-[32px] bg-white text-slate-gray animate-in slide-in-from-right duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                 <div className="relative shrink-0">
                    <img src={match.avatar} className="size-16 rounded-[24px] object-cover" alt={match.name} />
                    <div className="absolute -bottom-1 -right-1 size-7 bg-primary text-white border-4 border-white rounded-full flex items-center justify-center shadow-md">
                       <span className="text-[9px] font-black">{match.compatibility}%</span>
                    </div>
                 </div>
                 <div className="flex-1 min-w-0">
                    <h4 className="text-base font-black truncate">{match.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mt-0.5">{match.travelStyle}</p>
                    <div className="flex gap-1.5 mt-2">
                       {match.interests.slice(0, 2).map((it, i) => (
                         <span key={i} className="text-[8px] font-black uppercase bg-slate-50 text-slate-400 px-2 py-0.5 rounded-md">{it}</span>
                       ))}
                    </div>
                 </div>
                 <span className="material-symbols-outlined text-slate-200">chevron_right</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-8 bg-slate-gray/90 backdrop-blur-2xl border-t border-white/5 z-50 max-w-[450px] mx-auto">
         <button 
           onClick={handleJoinRequest}
           className="w-full h-16 bg-primary text-white font-[900] rounded-[24px] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
         >
           Request to Join Group
           <span className="material-symbols-outlined font-black">group_add</span>
         </button>
      </footer>

      {/* Success Modal */}
      {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-[380px] bg-white rounded-[40px] p-8 pt-12 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-400">
              <div className="relative mb-8 shrink-0">
                <div className="size-24 rounded-full bg-[#e0f7f7] flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="size-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                     <span className="material-symbols-outlined text-white text-4xl font-black">send</span>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Request Sent!</h3>
              <p className="text-slate-500 font-bold text-base leading-relaxed mb-10 px-4">
                We've notified the {destination} group host. You'll hear back within 24 hours.
              </p>

              <button 
                onClick={onJoin}
                className="w-full h-16 bg-primary text-white font-black rounded-[24px] shadow-xl shadow-primary/20 active:scale-[0.97] transition-all text-lg"
              >
                Got it
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default VibeMatchResultsScreen;
