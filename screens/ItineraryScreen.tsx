
import React from 'react';

interface ItineraryScreenProps {
  onBack: () => void;
}

const ItineraryScreen: React.FC<ItineraryScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-background-light animate-in slide-in-from-right duration-500 font-display overflow-hidden">
      {/* Header - Glass Effect */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 pt-10 pb-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="size-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-gray active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-slate-gray leading-none">Kyoto Day 3</h1>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Ongoing Trip</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-amber-500">
            <span className="material-symbols-outlined text-[20px] filled-icon">wb_sunny</span>
            <span className="text-sm font-black text-slate-gray">22°C</span>
          </div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Clear Sky</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-12">
        {/* Active Item Card */}
        <div className="bg-white rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-slate-50 overflow-hidden">
          <div className="relative h-60 w-full">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMHXOvn0emDBH5_3GsHiVKwnGaLbM4b3mjmt_ISDuGI4uXpP84e1eQAyY8uu2eyty4JLqnXCSU7obH8pewt47CwfRZrS20MdMlYRy3agbZiNYm-5RD03reORZDaIrno1XDAbfxESK8de_b_OcVHyvNK4A1kMtXrxuon8tN_gi5x-Nr6JZG1JJGHcEbvuOrv9QKzFsK9P2slbLthnbKFzzMG0CDIOZbeJ4Tk9vmWPeZeeyR_n5GObEiQAtIh7hbgTP2BD0cauuYmQ" 
              className="w-full h-full object-cover" 
              alt="Fushimi Inari"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <span className="bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Active Now</span>
              <button className="bg-white/20 backdrop-blur-md size-10 rounded-2xl flex items-center justify-center text-white border border-white/30">
                <span className="material-symbols-outlined text-[20px]">near_me</span>
              </button>
            </div>
          </div>
          
          <div className="p-7">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-gray tracking-tight">Fushimi Inari-taisha</h2>
                <p className="text-sm text-slate-400 font-bold mt-1">Thousands of vermilion torii gates</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-1">Ends in</p>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black text-primary">45</span>
                  <span className="text-2xl font-black text-slate-200">:</span>
                  <span className="text-2xl font-black text-primary">00</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img 
                      key={i} 
                      className="size-9 rounded-full border-2 border-white shadow-sm object-cover" 
                      src={`https://i.pravatar.cc/100?u=user${i}`} 
                    />
                  ))}
                  <div className="size-9 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-400">+1</div>
                </div>
                <span className="text-xs font-black text-slate-gray">5/6 Nearby</span>
              </div>
              <button className="bg-primary text-white px-6 py-2.5 rounded-2xl text-sm font-black shadow-lg shadow-primary/20 active:scale-95 transition-all">
                Check-in
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="space-y-6">
          <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] px-1">Timeline</h3>
          
          <div className="relative space-y-6 pl-4">
            {/* Connecting Line */}
            <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

            {/* Past Item */}
            <div className="relative flex items-start gap-6 group">
              <div className="size-10 rounded-full bg-[#9CC09E]/20 flex items-center justify-center z-10 shrink-0 border-4 border-background-light">
                <span className="material-symbols-outlined text-[#9CC09E] text-[20px] font-black">check_circle</span>
              </div>
              <div className="flex-1 bg-white/50 border border-slate-50 rounded-[28px] p-5 opacity-60">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-slate-gray">Tea Ceremony</h4>
                  <span className="text-[10px] font-black text-slate-300">09:00 AM</span>
                </div>
                <p className="text-xs text-slate-400 font-bold">Traditional Urasenke style ceremony</p>
              </div>
            </div>

            {/* Current Item Indicator */}
            <div className="relative flex items-start gap-6 group">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center z-10 shrink-0 border-4 border-background-light shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-white text-[20px] font-black">location_on</span>
              </div>
              <div className="flex-1 bg-white border-l-4 border-primary rounded-[28px] p-5 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-slate-gray text-base">Fushimi Inari-taisha</h4>
                  <span className="text-[11px] font-black text-primary">11:30 AM</span>
                </div>
                <p className="text-xs text-slate-400 font-bold">Hiking the mountain trail</p>
              </div>
            </div>

            {/* Future Item */}
            <div className="relative flex items-start gap-6 group">
              <div className="size-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10 shrink-0 border-4 border-background-light">
                <span className="material-symbols-outlined text-slate-300 text-[20px]">schedule</span>
              </div>
              <div className="flex-1 bg-white border border-slate-50 rounded-[28px] p-5">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-slate-gray">Nishiki Market Lunch</h4>
                  <span className="text-[10px] font-black text-slate-300">01:30 PM</span>
                </div>
                <p className="text-xs text-slate-400 font-bold">Exploring Kyoto's Kitchen</p>
              </div>
            </div>

            {/* Future Item 2 */}
            <div className="relative flex items-start gap-6 group">
              <div className="size-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10 shrink-0 border-4 border-background-light">
                <span className="material-symbols-outlined text-slate-300 text-[20px]">directions_walk</span>
              </div>
              <div className="flex-1 bg-white border border-slate-50 rounded-[28px] p-5">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-black text-slate-gray">Gion District Walk</h4>
                  <span className="text-[10px] font-black text-slate-300">03:30 PM</span>
                </div>
                <p className="text-xs text-slate-400 font-bold">Geisha district photography tour</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItineraryScreen;
