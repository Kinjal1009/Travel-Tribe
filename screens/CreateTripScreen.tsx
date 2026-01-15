
import React, { useState } from 'react';

interface CreateTripScreenProps {
  onClose: () => void;
  onPublish: (data: {
    title: string;
    budgetRange: { min: number; max: number };
    groupSize: number;
    ageRange: { min: number; max: number };
    activities: string[];
  }) => void;
}

const CreateTripScreen: React.FC<CreateTripScreenProps> = ({ onClose, onPublish }) => {
  const [title, setTitle] = useState('');
  const [groupSize, setGroupSize] = useState('8');
  const [minAge, setMinAge] = useState(21);
  const [maxAge, setMaxAge] = useState(45);
  const [selectedActivities, setSelectedActivities] = useState(['Hiking', 'Culture']);
  
  // Functional budget range selection
  const [budgetMin, setBudgetMin] = useState(1200);
  const [budgetMax, setBudgetMax] = useState(3500);

  const activities = ['Hiking', 'Culture', 'Nightlife', 'Relaxation', 'Gastronomy', 'Adventure'];

  const toggleActivity = (act: string) => {
    setSelectedActivities(prev => 
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  const handlePublish = () => {
    onPublish({
      title,
      budgetRange: { min: budgetMin, max: budgetMax },
      groupSize: parseInt(groupSize) || 1,
      ageRange: { min: minAge, max: maxAge },
      activities: selectedActivities
    });
  };

  return (
    <div className="h-full w-full bg-white flex flex-col font-display animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Fixed Header */}
      <header className="px-6 py-6 flex items-center justify-between bg-white shrink-0 z-20 border-b border-slate-50">
        <button 
          onClick={onClose}
          className="size-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-gray active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-black">close</span>
        </button>
        <h1 className="text-xl font-black text-slate-gray tracking-tight">Create Your Trip</h1>
        <div className="w-11"></div> 
      </header>

      {/* Scrollable Content Area */}
      <main className="flex-1 min-h-0 px-8 py-8 space-y-12 overflow-y-auto no-scrollbar pb-48">
        {/* Trip Title */}
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-300 ml-1 uppercase tracking-[0.2em]">Trip Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-16 px-6 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-primary/10 transition-all text-base font-bold text-slate-gray placeholder:text-slate-200 outline-none" 
            placeholder="e.g. Summer in the Cyclades" 
            type="text"
          />
        </div>

        {/* Budget Range Selection */}
        <div className="space-y-8">
          <div className="flex justify-between items-end px-1">
            <label className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Budget Range</label>
            <span className="text-base font-black text-primary">₹{budgetMin.toLocaleString()} - ₹{budgetMax.toLocaleString()}</span>
          </div>
          <div className="relative pt-2 px-1 flex items-center h-8">
            <div className="absolute h-2 w-full bg-slate-100 rounded-full"></div>
            {/* Functional dual range */}
            <div 
              className="absolute h-2 bg-primary rounded-full" 
              style={{ 
                left: `${(budgetMin / 10000) * 100}%`, 
                right: `${100 - (budgetMax / 10000) * 100}%` 
              }}
            ></div>
            <input 
              type="range" 
              min="0" 
              max="10000" 
              step="100"
              value={budgetMin} 
              onChange={(e) => setBudgetMin(Math.min(parseInt(e.target.value), budgetMax - 500))}
              className="absolute w-full appearance-none bg-transparent pointer-events-none z-20 h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-lg"
            />
            <input 
              type="range" 
              min="0" 
              max="10000" 
              step="100"
              value={budgetMax} 
              onChange={(e) => setBudgetMax(Math.max(parseInt(e.target.value), budgetMin + 500))}
              className="absolute w-full appearance-none bg-transparent pointer-events-none z-20 h-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-300 font-black uppercase tracking-[0.2em] px-1">
            <span>Budget</span>
            <span>Luxury</span>
          </div>
        </div>

        {/* Maximum Group Size */}
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-300 ml-1 uppercase tracking-[0.2em]">Maximum Group Size</label>
          <div className="relative flex items-center">
            <span className="absolute left-6 material-symbols-outlined text-slate-300">group</span>
            <input 
              type="number"
              min="1"
              max="50"
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
              className="w-full h-16 pl-14 pr-6 bg-slate-50 border-none rounded-[24px] focus:ring-4 focus:ring-primary/10 transition-all text-base font-bold text-slate-gray placeholder:text-slate-200 outline-none"
              placeholder="Number of travelers"
            />
          </div>
        </div>

        {/* Target Age Range */}
        <div className="space-y-4">
          <label className="text-xs font-black text-slate-300 ml-1 uppercase tracking-[0.2em]">Target Age Range</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-2">Min Age</span>
              <div className="relative">
                <select 
                  value={minAge}
                  onChange={(e) => setMinAge(parseInt(e.target.value))}
                  className="w-full h-16 px-6 bg-slate-50 border-none rounded-[24px] appearance-none focus:ring-4 focus:ring-primary/10 text-base font-black text-slate-gray outline-none cursor-pointer"
                >
                  {[18, 21, 25, 30, 35, 40].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest ml-2">Max Age</span>
              <div className="relative">
                <select 
                  value={maxAge}
                  onChange={(e) => setMaxAge(parseInt(e.target.value))}
                  className="w-full h-16 px-6 bg-slate-50 border-none rounded-[24px] appearance-none focus:ring-4 focus:ring-primary/10 text-base font-black text-slate-gray outline-none cursor-pointer"
                >
                  {[30, 35, 40, 45, 50, 60].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Activities */}
        <div className="space-y-6">
          <label className="text-xs font-black text-slate-300 ml-1 uppercase tracking-[0.2em]">Primary Activities</label>
          <div className="flex flex-wrap gap-3">
            {activities.map(act => {
              const isActive = selectedActivities.includes(act);
              return (
                <button 
                  key={act}
                  onClick={() => toggleActivity(act)}
                  className={`px-6 py-3.5 rounded-full text-sm font-black transition-all active:scale-95 flex items-center gap-2 border ${
                    isActive 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                      : 'bg-slate-50 text-slate-400 border-transparent hover:border-primary/20'
                  }`}
                >
                  {act} {isActive && <span className="material-symbols-outlined text-[16px] font-black">close</span>}
                </button>
              );
            })}
            <button className="px-6 py-3.5 rounded-full bg-primary/10 text-primary text-sm font-black flex items-center gap-2 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[18px] font-black">add</span> Add More
            </button>
          </div>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="shrink-0 p-8 border-t border-slate-50 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.02)] z-50">
        <button 
          onClick={handlePublish}
          disabled={!title || !groupSize}
          className={`w-full font-black h-16 rounded-[24px] shadow-2xl transition-all flex items-center justify-center gap-3 text-lg ${
            !title || !groupSize ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' : 'bg-primary text-white shadow-primary/30 active:scale-[0.98]'
          }`}
        >
          Publish Trip
          <span className="material-symbols-outlined font-black">rocket_launch</span>
        </button>
      </footer>
    </div>
  );
};

export default CreateTripScreen;
