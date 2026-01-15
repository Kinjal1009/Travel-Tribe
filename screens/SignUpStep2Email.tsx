
import React from 'react';

interface SignUpStep2EmailProps {
  onBack: () => void;
  onNext: () => void;
}

const SignUpStep2Email: React.FC<SignUpStep2EmailProps> = ({ onBack, onNext }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between p-4 z-10">
        <button onClick={onBack} className="flex size-12 items-center justify-center rounded-full hover:bg-slate-50 active:scale-90 transition-all">
          <span className="material-symbols-outlined text-slate-900" style={{ fontSize: '24px' }}>arrow_back</span>
        </button>
        <div className="flex size-12 items-center justify-center rounded-full text-slate-400">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>help_outline</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 w-full max-w-md mx-auto z-10">
        <div className="w-full flex flex-col items-center justify-center mb-8 relative">
          <div className="absolute size-64 rounded-full border border-primary/10 animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute size-48 rounded-full border border-dashed border-primary/20"></div>
          <div 
            className="size-40 bg-contain bg-center bg-no-repeat relative z-10 drop-shadow-xl" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA4AaF-1MMnYcPFZDAzNWLUXfAQ7uflFxkP3RJ2wYeH4RkdNo70RWrXj_hVjpuUiaTU0frV3CVx24sUfL5VjQuHft92BbUTiz1X3-OwhR25bmo750DqihAuH1cLuaDqhNUtwr-0vzeAEzN4j8A-SPxm_UzFfhUh27y0Bw6wuQbtmBETdJkV9tc-X7FG_iiJU1uaKKK2bfXJ5tkDxDusPRkewQDKK-rvSy7oxyQpRF4ieSeSvfEKXlZNeVuQx17OUsxQ_0APKqt0AA")' }}
          ></div>
        </div>

        <div className="text-center space-y-4 mb-10 w-full">
          <h1 className="text-slate-900 text-[32px] font-bold leading-tight tracking-tight font-display">Check your inbox</h1>
          <div className="px-2">
            <p className="text-slate-500 text-base font-medium leading-relaxed">We've sent a verification link to</p>
            <p className="text-slate-900 text-lg font-bold mt-1">alex.johnson@example.com</p>
            <p className="text-slate-500 text-sm mt-3 font-medium">Please tap the link in that email to verify your account and join the tribe.</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <button onClick={onNext} className="relative w-full overflow-hidden bg-primary text-white text-base font-bold h-14 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group">
            <span className="material-symbols-outlined">mail</span>
            <span>Continues Verification</span>
          </button>
          <button className="w-full bg-transparent border-2 border-slate-100 text-slate-700 font-bold h-14 rounded-xl transition-all hover:bg-slate-50 active:scale-[0.99]">
            Resend Email
          </button>
          <div className="mt-4 flex flex-row items-center justify-center text-sm gap-1.5 font-medium">
            <span className="text-slate-400">Mistyped your email?</span>
            <button className="text-primary font-bold hover:underline">Change Email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpStep2Email;
