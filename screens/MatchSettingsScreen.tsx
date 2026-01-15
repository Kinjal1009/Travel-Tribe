
import React, { useState } from 'react';

interface PriorityItem {
  id: string;
  label: string;
}

const PRIORITY_OPTIONS: PriorityItem[] = [
  { id: 'interests', label: 'Similar Interests' },
  { id: 'pace', label: 'Travel Pace' },
  { id: 'language', label: 'Language Compatibility' },
  { id: 'budget', label: 'Budget Alignment' },
  { id: 'vibe', label: 'Cultural Vibe' }
];

interface MatchSettingsScreenProps {
  onBack: () => void;
  onSave: (data: { groupSize: number; ageRange: { min: number; max: number }; budgetAlignment: boolean }) => void;
  initialData?: { groupSize: number; ageRange: { min: number; max: number }; budgetAlignment: boolean };
}

const MatchSettingsScreen: React.FC<MatchSettingsScreenProps> = ({ onBack, onSave, initialData }) => {
  const [selectedVibes, setSelectedVibes] = useState<string[]>(['Chill & Relaxed', 'Nightlife']);
  const [groupSize, setGroupSize] = useState(initialData?.groupSize ?? 6);
  const [ageRange, setAgeRange] = useState(initialData?.ageRange ?? { min: 22, max: 35 });
  const [budgetAlignment, setBudgetAlignment] = useState(initialData?.budgetAlignment ?? true);
  
  // State for priority ranking
  const [ranks, setRanks] = useState<string[]>(['interests', 'pace', 'language']);
  const [activeRankIndex, setActiveRankIndex] = useState<number | null>(null);

  const toggleVibe = (vibe: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    );
  };

  const handleAgeMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(parseInt(e.target.value), ageRange.max - 1);
    setAgeRange(prev => ({ ...prev, min: val }));
  };

  const handleAgeMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(parseInt(e.target.value), ageRange.min + 1);
    setAgeRange(prev => ({ ...prev, max: val }));
  };

  const handleRankSelect = (index: number, optionId: string) => {
    const newRanks = [...ranks];
    newRanks[index] = optionId;
    setRanks(newRanks);
    setActiveRankIndex(null);
  };

  const handleSave = () => {
    onSave({ groupSize, ageRange, budgetAlignment });
  };

  return (
    <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-gray-100 h-full flex flex-col animate-in slide-in-from-bottom duration-400 overflow-hidden font-body">
      {/* Header - Standardized Back Arrow */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-background-dark border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex items-center px-[30px] py-4 justify-between">
          <button 
            onClick={onBack} 
            className="text-black dark:text-white flex size-10 items-center justify-start hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-90"
          >
             <span className="material-symbols-outlined text-slate-gray">arrow_back</span>
          </button>
          <h2 className="text-lg font-black leading-tight tracking-tight flex-1 text-center font-display">Match Settings</h2>
          <div className="w-10"></div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        <div className="px-[30px] py-8 space-y-10 pb-40">
          
          {/* General Preferences */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
              <h3 className="text-lg font-black font-display tracking-tight">General Preferences</h3>
            </div>
            
            <div className="bg-white dark:bg-surface-dark rounded-[32px] border border-slate-100 dark:border-slate-800 p-8 space-y-10 shadow-[0_8px_40px_rgba(0,0,0,0.03)]">
              {/* Functional Group Size Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-slate-700 dark:text-slate-300">Group Size Preference</p>
                  <p className="text-primary text-sm font-black">{groupSize < 4 ? '2-4' : groupSize < 8 ? '4-6' : '8-12'} people</p>
                </div>
                <div className="relative h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full flex items-center">
                  <div 
                    className="absolute h-full bg-primary rounded-full" 
                    style={{ width: `${(groupSize / 12) * 100}%` }}
                  ></div>
                  <input 
                    type="range" 
                    min="2" 
                    max="12" 
                    value={groupSize} 
                    onChange={(e) => setGroupSize(parseInt(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-2 z-20"
                  />
                  {/* Thumb Indicator */}
                  <div 
                    className="absolute size-6 bg-white border-2 border-primary rounded-full shadow-md z-10 pointer-events-none"
                    style={{ left: `calc(${(groupSize / 12) * 100}% - 12px)` }}
                  ></div>
                </div>
              </div>

              {/* Age Range - Functional Dual Slider */}
              <div className="space-y-4">
                <p className="text-base font-bold text-slate-700 dark:text-slate-300">Age Range</p>
                <div className="relative h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-8">
                  <div 
                    className="absolute h-full bg-primary rounded-full" 
                    style={{ 
                      left: `${((ageRange.min - 18) / (60 - 18)) * 100}%`, 
                      right: `${100 - ((ageRange.max - 18) / (60 - 18)) * 100}%` 
                    }}
                  ></div>
                  {/* Min Handle */}
                  <div 
                    className="absolute -top-[11px] size-6 bg-white border-2 border-primary rounded-full shadow-md flex flex-col items-center"
                    style={{ left: `calc(${((ageRange.min - 18) / (60 - 18)) * 100}% - 12px)` }}
                  >
                    <span className="mt-8 text-[11px] font-bold text-slate-400">{ageRange.min}</span>
                  </div>
                  {/* Max Handle */}
                  <div 
                    className="absolute -top-[11px] size-6 bg-white border-2 border-primary rounded-full shadow-md flex flex-col items-center"
                    style={{ left: `calc(${((ageRange.max - 18) / (60 - 18)) * 100}% - 12px)` }}
                  >
                    <span className="mt-8 text-[11px] font-bold text-slate-400">{ageRange.max}</span>
                  </div>
                  <input type="range" min="18" max="60" value={ageRange.min} onChange={handleAgeMinChange} className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-2 z-10" />
                  <input type="range" min="18" max="60" value={ageRange.max} onChange={handleAgeMaxChange} className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-2 z-10" />
                </div>
              </div>

              {/* Budget Alignment Toggle */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined filled-icon">payments</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 dark:text-white">Budget Alignment</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">Only show similar budget tiers</p>
                  </div>
                </div>
                <button 
                  onClick={() => setBudgetAlignment(!budgetAlignment)}
                  className={`relative flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-all duration-300 ${budgetAlignment ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  <div className={`h-6 w-6 rounded-full bg-white shadow-lg transition-transform duration-300 ${budgetAlignment ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </section>

          {/* Priority Ranking with Select Capability */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[22px]">format_list_bulleted</span>
              <h3 className="text-lg font-black font-display tracking-tight">Priority Ranking</h3>
            </div>
            <div className="bg-white dark:bg-surface-dark rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-50 dark:divide-slate-800/50 shadow-[0_8px_40px_rgba(0,0,0,0.03)]">
              {ranks.map((rankId, index) => {
                const label = PRIORITY_OPTIONS.find(o => o.id === rankId)?.label;
                const isDropdownOpen = activeRankIndex === index;
                
                return (
                  <div key={index} className="relative">
                    <div 
                      onClick={() => setActiveRankIndex(isDropdownOpen ? null : index)}
                      className={`flex items-center gap-4 p-6 cursor-pointer hover:bg-slate-50/50 transition-colors group ${isDropdownOpen ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex flex-col gap-0.5 opacity-20 shrink-0">
                        <div className="size-1 bg-slate-400 rounded-full"></div>
                        <div className="size-1 bg-slate-400 rounded-full"></div>
                        <div className="size-1 bg-slate-400 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Rank {index + 1}</p>
                        <p className="text-[15px] font-black text-slate-800 dark:text-white">{label}</p>
                      </div>
                      <span className={`material-symbols-outlined text-slate-400 text-[20px] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-primary' : ''}`}>
                        expand_more
                      </span>
                    </div>

                    {/* Rank Selection Dropdown Content */}
                    {isDropdownOpen && (
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {PRIORITY_OPTIONS.filter(opt => !ranks.includes(opt.id) || opt.id === rankId).map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleRankSelect(index, opt.id)}
                            className={`w-full text-left p-3 rounded-xl text-sm font-bold transition-all ${opt.id === rankId ? 'bg-primary text-white' : 'hover:bg-primary/10 text-slate-600'}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Vibe Filters */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[22px] filled-icon">auto_awesome</span>
              <h3 className="text-lg font-black font-display tracking-tight">Vibe Filters</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                'Chill & Relaxed', 'High Energy', 'Cultural Immersion', 'Nightlife', 
                'Adventure Seekers', 'Foodies'
              ].map((vibe) => {
                const isActive = selectedVibes.includes(vibe);
                return (
                  <button 
                    key={vibe} 
                    onClick={() => toggleVibe(vibe)}
                    className={`px-5 py-3 rounded-full text-[13px] font-black transition-all active:scale-95 border ${
                      isActive 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                        : 'bg-white dark:bg-surface-dark border-slate-100 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    {vibe}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-50 max-w-[450px] mx-auto">
        <button 
          onClick={handleSave} 
          className="w-full bg-primary hover:bg-teal-600 text-white font-black h-16 rounded-[24px] shadow-2xl shadow-primary/30 active:scale-[0.98] text-base transition-all flex items-center justify-center"
        >
          Save Details
        </button>
      </footer>
    </div>
  );
};

export default MatchSettingsScreen;
