
import React from 'react';

interface SignUpStep4ProfileProps {
  onBack: () => void;
  onNext: () => void;
}

const SignUpStep4Profile: React.FC<SignUpStep4ProfileProps> = ({ onBack, onNext }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light animate-in slide-in-from-right duration-300">
      <nav className="sticky top-0 z-50 flex items-center bg-background-light px-4 py-4 justify-between border-b border-gray-100">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
          <span className="material-symbols-outlined text-[#121716]">chevron_left</span>
        </button>
        <h2 className="text-[#121716] text-lg font-bold flex-1 text-center font-display">Set Up Your Profile</h2>
        <div className="flex w-12 items-center justify-end">
          <p className="text-primary text-sm font-bold tracking-tight shrink-0">Step 4 of 4</p>
        </div>
      </nav>

      <main className="max-w-md mx-auto pb-32">
        <header className="px-6 pt-8 pb-4">
          <h1 className="text-[#121716] tracking-tight text-[32px] font-bold leading-tight font-display">Tell us about yourself</h1>
          <p className="text-[#67837c] text-base font-normal leading-relaxed mt-2">Help us find your perfect travel tribe by sharing a bit about your journey style.</p>
        </header>

        <section className="px-6 space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-5">
            <label className="flex flex-col w-full">
              <p className="text-[#121716] text-sm font-semibold pb-2">Full Name</p>
              <input className="form-input flex w-full rounded-lg border border-[#dde4e2] bg-white h-12 placeholder:text-[#a0afac] px-4 text-base" placeholder="How should we call you?" type="text" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col">
                <p className="text-[#121716] text-sm font-semibold pb-2">Age</p>
                <div className="relative flex items-center">
                  <input className="form-input w-full rounded-lg border border-[#dde4e2] bg-white h-12 px-4" placeholder="24" type="number" />
                  <span className="material-symbols-outlined absolute right-3 text-[#67837c] text-xl">calendar_today</span>
                </div>
              </label>
              <label className="flex flex-col">
                <p className="text-[#121716] text-sm font-semibold pb-2">Home Base</p>
                <div className="relative flex items-center">
                  <input className="form-input w-full rounded-lg border border-[#dde4e2] bg-white h-12 px-4" placeholder="City" type="text" />
                  <span className="material-symbols-outlined absolute right-3 text-[#67837c] text-xl">location_on</span>
                </div>
              </label>
            </div>
            <button className="flex items-center justify-center gap-2 w-full py-2 text-primary font-semibold text-sm hover:bg-primary/5 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-lg">my_location</span>
              Use current location
            </button>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#121716]">Travel Interests</h3>
              <span className="text-xs font-medium text-[#67837c] bg-gray-100 px-2 py-1 rounded-full">Pick 3 or more</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: 'terrain', label: 'Hiking', active: true },
                { icon: 'restaurant', label: 'Foodie', active: false },
                { icon: 'photo_camera', label: 'Photography', active: false },
                { icon: 'nightlife', label: 'Nightlife', active: false },
                { icon: 'museum', label: 'Museums', active: false },
                { icon: 'surfing', label: 'Surfing', active: false }
              ].map(item => (
                <div key={item.label} className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border transition-all ${item.active ? 'bg-[#29a385] text-white shadow-lg border-transparent' : 'bg-white text-slate-700 border-[#dde4e2] hover:border-primary'}`}>
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-100 max-w-md mx-auto z-50">
        <button onClick={onNext} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
          Continue <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};

export default SignUpStep4Profile;
