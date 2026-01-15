
import React, { useState } from 'react';

interface SignUpStep3PhoneProps {
  onBack: () => void;
  onNext: () => void;
}

const SignUpStep3Phone: React.FC<SignUpStep3PhoneProps> = ({ onBack, onNext }) => {
  const [otp, setOtp] = useState('');

  const handleKeypad = (val: string) => {
    if (val === 'back') {
      setOtp(prev => prev.slice(0, -1));
    } else if (otp.length < 4) {
      const next = otp + val;
      setOtp(next);
      if (next.length === 4) {
        setTimeout(onNext, 500);
      }
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-md mx-auto bg-white animate-in slide-in-from-right duration-300">
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full text-slate-900 hover:bg-black/5 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col px-6">
        <div className="mt-4 mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3 font-display">Verify your number</h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-[280px] mx-auto">
            Enter the 4-digit code we just sent to <br/>
            <span className="font-bold text-slate-900">+1 (555) •••-••99</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-10 w-full">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all ${otp.length === i ? 'border-primary shadow-[0_0_15px_rgba(23,161,207,0.3)] bg-white' : 'border-gray-200 bg-slate-50'} text-2xl font-bold text-slate-900`}>
              {otp[i] || (otp.length === i ? <span className="h-8 w-[2px] bg-primary animate-pulse"></span> : '')}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full">
            <span className="material-symbols-outlined text-[18px] text-primary">timer</span>
            <span className="text-sm font-bold text-slate-900">00:45</span>
          </div>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Didn't receive it? <button className="font-bold text-primary hover:underline">Resend</button>
          </p>
        </div>

        <div className="flex-1"></div>

        <div className="pb-8 pt-4">
          <div className="grid grid-cols-3 gap-y-4 gap-x-6">
            {['1','2','3','4','5','6','7','8','9','','0','back'].map((key, idx) => (
              key === '' ? <div key={idx} className="h-16" /> : (
                <button 
                  key={key} 
                  onClick={() => handleKeypad(key)}
                  className="group flex h-16 items-center justify-center rounded-full hover:bg-slate-50 active:bg-slate-100 transition-all"
                >
                  {key === 'back' ? (
                    <span className="material-symbols-outlined text-[28px] text-slate-900">backspace</span>
                  ) : (
                    <span className="text-3xl font-bold text-slate-900">{key}</span>
                  )}
                </button>
              )
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpStep3Phone;
