
import React, { useState } from 'react';
import { Camera, ArrowRight } from 'lucide-react';

interface CreateProfileScreenProps {
  onComplete: () => void;
}

const CreateProfileScreen: React.FC<CreateProfileScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="h-full w-full bg-[#faf8f4] flex flex-col px-8 pt-20 pb-12 animate-in fade-in duration-500">
      <div className="flex-1">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-primary' : 'w-4 bg-slate-100'}`}
              />
            ))}
          </div>
          <h2 className="text-[32px] font-black text-slate-gray leading-tight">
            {step === 1 ? 'Build your tribe profile' : step === 2 ? 'What is your vibe?' : 'Final touches'}
          </h2>
          <p className="text-slate-gray/40 font-bold text-base mt-2">
            Let's get to know the traveler behind the screen.
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col items-center">
              <div className="relative group cursor-pointer active:scale-95 transition-transform">
                <div className="size-32 rounded-[48px] bg-white shadow-xl border-4 border-white overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-100 text-[64px] filled-icon">person</span>
                </div>
                <div className="absolute -bottom-2 -right-2 size-10 bg-primary rounded-2xl border-4 border-[#faf8f4] flex items-center justify-center text-white shadow-lg">
                  <Camera size={18} />
                </div>
              </div>
              <p className="text-xs font-black text-primary mt-4 uppercase tracking-widest">Upload Photo</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-slate-gray text-xs font-black uppercase tracking-widest pb-2 ml-1 opacity-70">Full Name</p>
                <input 
                  className="w-full rounded-2xl text-slate-gray focus:outline-none focus:ring-2 focus:ring-primary/30 border border-slate-100 bg-white h-16 placeholder:text-slate-200 px-5 text-base font-semibold transition-all shadow-sm" 
                  placeholder="Marcus Chen" 
                />
              </div>
              <div>
                <p className="text-slate-gray text-xs font-black uppercase tracking-widest pb-2 ml-1 opacity-70">Tell us about yourself</p>
                <textarea 
                  rows={3}
                  className="w-full rounded-2xl text-slate-gray focus:outline-none focus:ring-2 focus:ring-primary/30 border border-slate-100 bg-white p-5 placeholder:text-slate-200 text-base font-semibold transition-all shadow-sm resize-none" 
                  placeholder="Bio..." 
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-2 gap-3">
              {['🏄‍♂️ Surfer', '⛰️ Hiker', '🍷 Foodie', '📸 Photographer', '🌃 Night Owl', '🧘 Zen Master'].map((vibe) => (
                <button 
                  key={vibe}
                  className="h-16 rounded-2xl bg-white border border-slate-50 shadow-sm flex items-center px-4 gap-3 font-bold text-slate-gray active:scale-95 transition-all hover:border-primary/30"
                >
                  <span className="text-lg">{vibe.split(' ')[0]}</span>
                  <span>{vibe.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={() => step < 2 ? setStep(step + 1) : onComplete()}
        className="w-full bg-primary text-white font-black text-lg h-16 rounded-2xl transition-all shadow-[0_8px_25px_rgba(0,178,178,0.25)] active:scale-[0.97] flex items-center justify-center gap-2"
      >
        <span>{step < 2 ? 'Next Step' : 'Launch Adventure'}</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default CreateProfileScreen;
