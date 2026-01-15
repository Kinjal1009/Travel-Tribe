
import React, { useState } from 'react';

interface SignUpStep1Props {
  onBack: () => void;
  onNext: () => void;
}

const SignUpStep1: React.FC<SignUpStep1Props> = ({ onBack, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex h-full w-full flex-col bg-background-light animate-in slide-in-from-right duration-300">
      {/* Fixed Header */}
      <header className="flex items-center bg-background-light px-4 py-4 justify-between shrink-0 z-50">
        <button 
          onClick={onBack} 
          className="text-slate-gray flex size-12 shrink-0 items-center justify-start active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <h2 className="text-slate-gray text-lg font-black leading-tight tracking-tight flex-1 text-center pr-12 font-display">Create Account</h2>
      </header>
      
      {/* Scrollable Content Container */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-6 min-h-0">
        <div className="mb-10 mt-2">
          <h2 className="text-[#171212] tracking-tight text-[40px] font-[900] leading-[1.1] pb-3 font-display">
            Adventure starts with<br />a name
          </h2>
          <p className="text-slate-gray/50 text-lg font-bold leading-relaxed font-display">
            Let’s get your travel profile ready for the world.
          </p>
        </div>
        
        {/* Form Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-white flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="flex flex-col w-full">
              <p className="text-[#171212] text-sm font-black leading-normal pb-2 ml-1">Full Name</p>
              <input 
                className="form-input flex w-full rounded-2xl text-slate-gray border border-slate-100 bg-white h-16 placeholder:text-slate-200 px-6 text-lg font-bold transition-all focus:ring-4 focus:ring-primary/10 outline-none" 
                placeholder="John Doe" 
                type="text" 
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex flex-col w-full">
              <p className="text-[#171212] text-sm font-black leading-normal pb-2 ml-1">Email Address</p>
              <input 
                className="form-input flex w-full rounded-2xl text-slate-gray border border-slate-100 bg-white h-16 placeholder:text-slate-200 px-6 text-lg font-bold transition-all focus:ring-4 focus:ring-primary/10 outline-none" 
                placeholder="name@example.com" 
                type="email" 
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex flex-col w-full">
              <p className="text-[#171212] text-sm font-black leading-normal pb-2 ml-1">Mobile Number</p>
              <div className="relative flex items-center">
                <input 
                  className="form-input flex w-full rounded-2xl text-slate-gray border border-slate-100 bg-white h-16 placeholder:text-slate-200 px-6 text-lg font-bold transition-all focus:ring-4 focus:ring-primary/10 outline-none" 
                  placeholder="+1 123 456 7890" 
                  type="tel" 
                />
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex flex-col w-full">
              <p className="text-[#171212] text-sm font-black leading-normal pb-2 ml-1">Create Password</p>
              <div className="relative">
                <input 
                  className="form-input flex w-full rounded-2xl text-slate-gray border border-slate-100 bg-white h-16 placeholder:text-slate-200 px-6 pr-14 text-lg font-bold transition-all focus:ring-4 focus:ring-primary/10 outline-none" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"} 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 active:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              <div className="flex items-center gap-3 mt-4 px-1">
                <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden flex gap-1">
                  <div className="h-full bg-[#FF7043] w-1/3 rounded-full"></div>
                  <div className="h-full bg-slate-100 flex-1"></div>
                </div>
                <span className="text-[10px] font-black text-[#FF7043] uppercase tracking-wider whitespace-nowrap">Medium Strength</span>
              </div>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-col gap-6 pb-24">
          <button 
            onClick={onNext} 
            className="w-full h-16 bg-primary text-white font-[900] text-lg rounded-[24px] shadow-2xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Next Step
            <span className="material-symbols-outlined font-black">arrow_forward</span>
          </button>
          
          <div className="text-center">
            <p className="text-slate-gray/40 text-base font-bold">
              Already have an account? 
              <button className="text-primary font-black ml-1.5 hover:underline">Log In</button>
            </p>
          </div>
        </div>
      </main>

      {/* Subtle Background Gradient Accents */}
      <div className="fixed bottom-0 left-0 w-full h-1 pointer-events-none opacity-20 z-10">
        <div className="w-full h-full bg-gradient-to-r from-primary via-[#FF7043] to-primary"></div>
      </div>
    </div>
  );
};

export default SignUpStep1;
