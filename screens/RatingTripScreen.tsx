
import React, { useState } from 'react';

interface RatingTripScreenProps {
  onBack: () => void;
}

const RatingTripScreen: React.FC<RatingTripScreenProps> = ({ onBack }) => {
  const [rating, setRating] = useState(4);
  const [compValue, setCompValue] = useState(4.5);

  return (
    <div className="flex flex-col h-full bg-background-light font-body animate-in slide-in-from-right duration-300 overflow-hidden">
      <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-black/5 shrink-0">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 active:scale-90 transition-all text-slate-gray"
        >
          <span className="material-symbols-outlined font-black">close</span>
        </button>
        <h1 className="text-lg font-black flex-1 text-center font-display tracking-tight text-slate-gray">Review Your Trip</h1>
        <button onClick={onBack} className="text-primary font-black text-sm pr-2">Skip</button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-8 pt-6 pb-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
            <span className="material-symbols-outlined text-primary text-4xl filled-icon">celebration</span>
          </div>
          <h1 className="text-2xl font-black text-slate-gray font-display">How was your trip?</h1>
          <p className="text-sm text-slate-400 font-bold mt-1">Your feedback helps the community grow.</p>
        </div>

        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 text-center">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6">Overall Experience</h4>
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <span 
                key={s} 
                onClick={() => setRating(s)}
                className={`material-symbols-outlined text-4xl cursor-pointer transition-colors ${s <= rating ? 'text-[#FFBF00] filled-icon' : 'text-slate-100'}`}
              >
                star
              </span>
            ))}
          </div>
          <p className="text-sm font-black text-primary uppercase tracking-widest">Great vibes!</p>
        </section>

        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50">
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <div className="flex flex-col items-center gap-1">
              <p className="text-5xl font-black text-slate-gray tracking-tighter">4.8</p>
              <div className="flex gap-0.5 text-[#FFBF00]">
                {[1, 2, 3, 4].map(s => <span key={s} className="material-symbols-outlined text-[18px] filled-icon">star</span>)}
                <span className="material-symbols-outlined text-[18px]">star_half</span>
              </div>
              <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mt-1">Group average</p>
            </div>
            <div className="flex-1 w-full space-y-3">
              {[
                { label: '5', width: '85%' },
                { label: '4', width: '12%' },
                { label: '3', width: '3%' }
              ].map(bar => (
                <div key={bar.label} className="grid grid-cols-[12px_1fr_30px] items-center gap-4">
                  <span className="text-[10px] font-black text-slate-400">{bar.label}</span>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: bar.width }}></div>
                  </div>
                  <span className="text-[10px] text-slate-300 font-black text-right">{bar.width}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6 px-1">
            <h3 className="text-lg font-black text-slate-gray font-display tracking-tight">Rate fellow travelers</h3>
            <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">4 Travelers</span>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar -mx-1 px-1">
            <div className="flex-shrink-0 w-24 flex flex-col items-center gap-3">
              <div className="relative">
                <img alt="Traveler" className="size-20 rounded-full object-cover border-4 border-white shadow-md" src="https://i.pravatar.cc/150?u=sarah"/>
                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-white shadow-sm">
                  <span className="material-symbols-outlined text-[14px] font-black">check</span>
                </div>
              </div>
              <p className="text-xs font-black text-slate-gray truncate w-full text-center">Sarah J.</p>
            </div>
            <div className="flex-shrink-0 w-24 flex flex-col items-center gap-3 opacity-50 grayscale">
              <div className="relative">
                <img alt="Traveler" className="size-20 rounded-full object-cover border-4 border-white shadow-md" src="https://i.pravatar.cc/150?u=marcus"/>
              </div>
              <p className="text-xs font-black text-slate-gray truncate w-full text-center">Marcus L.</p>
            </div>
            <div className="flex-shrink-0 w-24 flex flex-col items-center gap-3">
              <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-md">
                <span className="text-primary font-black text-xl uppercase">EL</span>
              </div>
              <p className="text-xs font-black text-slate-gray truncate w-full text-center">Elena</p>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm mt-2">
            <div className="flex items-center gap-4 mb-6">
              <img alt="Sarah" className="size-12 rounded-full object-cover shadow-sm" src="https://i.pravatar.cc/150?u=sarah"/>
              <div>
                <p className="text-sm font-black text-slate-gray">Compatibility with Sarah J.</p>
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.1em]">Highly recommended</p>
              </div>
            </div>
            <div className="relative h-2 w-full bg-slate-50 rounded-full flex items-center">
              <div className="absolute h-full bg-primary rounded-full" style={{ width: `${(compValue/5)*100}%` }}></div>
              <input 
                type="range" min="1" max="5" step="0.1" value={compValue} 
                onChange={(e) => setCompValue(parseFloat(e.target.value))}
                className="absolute w-full h-8 opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute size-6 bg-white border-4 border-primary rounded-full shadow-lg pointer-events-none"
                style={{ left: `calc(${(compValue/5)*100}% - 12px)` }}
              ></div>
            </div>
            <div className="flex justify-between mt-4 px-1">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Quiet</span>
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Life of Party</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-black text-slate-gray font-display tracking-tight px-1">Share memories</h3>
          <div className="relative">
            <textarea 
              className="w-full bg-white border-2 border-slate-50 rounded-[28px] p-6 text-sm font-bold text-slate-gray focus:border-primary/20 focus:ring-0 transition-all placeholder:text-slate-200 resize-none" 
              placeholder="Tell us about the highlights, the group dynamics, or anything else..." 
              rows={4}
            />
            <div className="absolute bottom-6 right-6 text-[10px] font-black text-slate-200">0 / 500</div>
          </div>
        </section>

        <footer className="pt-4">
          <button onClick={onBack} className="w-full bg-primary hover:bg-teal-600 text-white font-black py-5 rounded-[24px] shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg">
            <span>Submit Review</span>
            <span className="material-symbols-outlined text-[24px] font-black">send</span>
          </button>
          <p className="text-center text-[10px] font-bold text-slate-300 mt-6 leading-relaxed uppercase tracking-wider">
            Your review will be shared with the community.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default RatingTripScreen;
