
import React, { useState } from 'react';

interface BioSetupScreenProps {
  onBack: () => void;
  onSave: (data: { bio: string; interests: string[] }) => void;
  initialBio?: string;
  initialInterests?: string[];
}

const BioSetupScreen: React.FC<BioSetupScreenProps> = ({ onBack, onSave, initialBio = '', initialInterests = [] }) => {
  const [bio, setBio] = useState(initialBio);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests.length > 0 ? initialInterests : ['Hiking']);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Spontaneous']);

  const toggleInterest = (label: string) => {
    setSelectedInterests(prev => 
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const toggleStyle = (label: string) => {
    setSelectedStyles(prev => 
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const interests = [
    { icon: 'terrain', label: 'Hiking' },
    { icon: 'restaurant', label: 'Foodie' },
    { icon: 'photo_camera', label: 'Photography' },
    { icon: 'nightlife', label: 'Nightlife' },
    { icon: 'museum', label: 'Museums' },
    { icon: 'surfing', label: 'Surfing' },
    { icon: 'history_edu', label: 'History' },
    { icon: 'spa', label: 'Wellness' },
    { icon: 'camping', label: 'Camping' }
  ];

  const travelStyles = [
    { icon: 'person', label: 'Solo Traveler' },
    { icon: 'groups', label: 'Group Trips' },
    { icon: 'attach_money', label: 'Budget' },
    { icon: 'diamond', label: 'Luxury' },
    { icon: 'bolt', label: 'Fast-paced' },
    { icon: 'bed', label: 'Relaxed' },
    { icon: 'rocket_launch', label: 'Spontaneous' },
    { icon: 'event_note', label: 'Planned' }
  ];

  const handleContinue = () => {
    onSave({ bio, interests: selectedInterests });
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light animate-in slide-in-from-right duration-300 text-slate-gray">
      <nav className="sticky top-0 z-50 flex items-center bg-background-light/95 backdrop-blur-md px-6 py-4 justify-between border-b border-gray-100">
        <button 
          onClick={onBack}
          className="flex size-11 shrink-0 items-center justify-center -ml-2 rounded-full hover:bg-gray-100 cursor-pointer active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-slate-gray">arrow_back</span>
        </button>
        <h2 className="text-slate-gray text-lg font-black leading-tight tracking-tight flex-1 text-center font-display">Set Up Bio</h2>
        <div className="size-11 -mr-2"></div>
      </nav>

      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        <header className="px-6 pt-8 pb-4">
          <p className="text-slate-gray/50 text-base font-bold leading-relaxed mt-2">Help us find your perfect travel tribe by sharing a bit about your journey style.</p>
        </header>

        <section className="px-6 space-y-8">
          <div className="bg-white p-5 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 space-y-5">
            <label className="flex flex-col w-full">
              <p className="text-slate-gray text-[10px] font-black uppercase tracking-[0.2em] pb-2 ml-1 opacity-40">Full Name</p>
              <input 
                className="form-input flex w-full rounded-2xl text-slate-gray border border-slate-100 bg-white h-14 placeholder:text-slate-200 px-5 text-base font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                placeholder="How should we call you?" 
                type="text"
                defaultValue="Alex Johnson"
              />
            </label>
            <div className="flex flex-col gap-2">
              <p className="text-slate-gray text-[10px] font-black uppercase tracking-[0.2em] pb-2 ml-1 opacity-40">Bio</p>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="form-input w-full rounded-2xl text-slate-gray border border-slate-100 bg-white p-5 placeholder:text-slate-200 text-base font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none" 
                placeholder="Tell the tribe a bit about your past adventures..." 
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-lg font-black text-slate-gray font-display">Travel Interests</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Pick 3 or more</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {interests.map((item) => {
                const isActive = selectedInterests.includes(item.label);
                return (
                  <div 
                    key={item.label}
                    onClick={() => toggleInterest(item.label)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full cursor-pointer border transition-all active:scale-95 ${
                      isActive 
                        ? 'bg-[#29a385] text-white shadow-lg shadow-[#29a385]/20 border-transparent' 
                        : 'bg-white text-slate-400 border-slate-100 hover:border-primary/50'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isActive ? 'filled-icon' : ''}`}>{item.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-wider">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-lg font-black text-slate-gray font-display">Traveling Style</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Your Vibe</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {travelStyles.map((item) => {
                const isActive = selectedStyles.includes(item.label);
                return (
                  <div 
                    key={item.label}
                    onClick={() => toggleStyle(item.label)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full cursor-pointer border transition-all active:scale-95 ${
                     isActive 
                        ? 'bg-[#29a385] text-white shadow-lg shadow-[#29a385]/20 border-transparent' 
                        : 'bg-white text-slate-400 border-slate-100 hover:border-primary/50'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isActive ? 'filled-icon' : ''}`}>{item.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-wider">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-6 border-t border-slate-50 max-w-[450px] mx-auto z-50">
        <button 
          onClick={handleContinue}
          className="w-full bg-primary hover:bg-primary/90 text-white font-black h-16 rounded-[20px] shadow-xl shadow-primary/20 transition-all flex items-center justify-center active:scale-[0.98] text-lg"
        >
          Continue
        </button>
      </footer>
    </div>
  );
};

export default BioSetupScreen;
