
import React, { useState } from 'react';

interface SignUpScreenProps {
  onBack: () => void;
  onComplete: () => void;
  onLoginRedirect: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onBack, onComplete, onLoginRedirect }) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-[#fbfaf9] flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center px-4 pt-4 pb-2 justify-between">
        <button 
          onClick={step === 1 ? onBack : () => setStep(step - 1)}
          className="text-[#171212] flex size-12 shrink-0 items-center justify-start active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-bold">arrow_back_ios</span>
        </button>
        <h2 className="text-[#171212] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Create Account
        </h2>
      </div>

      <div className="flex-1 px-6 pt-2 pb-8 overflow-y-auto no-scrollbar">
        {/* Progress Bar */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex gap-6 justify-between items-end">
            <p className="text-[#171212] text-base font-bold leading-normal">Step {step} of 4</p>
            <p className="text-primary text-xs font-bold uppercase tracking-widest leading-normal">
              {step === 1 ? 'Basic Info' : step === 2 ? 'Verification' : step === 3 ? 'Interests' : 'Final Details'}
            </p>
          </div>
          <div className="rounded-full bg-gray-200 h-1.5 overflow-hidden">
            <div 
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out" 
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-8">
          <h2 className="text-[#171212] tracking-tight text-[32px] font-extrabold leading-tight pb-2">
            {step === 1 ? 'Adventure starts with a name' : 'Tell us more'}
          </h2>
          <p className="text-gray-500 text-base font-medium leading-relaxed">
            {step === 1 
              ? "Let's get your travel profile ready for the world." 
              : "We're setting up your personalized adventure experience."}
          </p>
        </div>

        {step === 1 ? (
          <div className="bg-white rounded-xl p-6 soft-shadow flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
              <p className="text-[#171212] text-sm font-bold leading-normal pb-2">Full Name</p>
              <input 
                className="w-full rounded-lg text-[#171212] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-gray-200 bg-white h-14 placeholder:text-gray-400 p-[15px] text-base font-medium transition-all" 
                placeholder="John Doe" 
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#171212] text-sm font-bold leading-normal pb-2">Email Address</p>
              <input 
                className="w-full rounded-lg text-[#171212] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-gray-200 bg-white h-14 placeholder:text-gray-400 p-[15px] text-base font-medium transition-all" 
                placeholder="name@example.com" 
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#171212] text-sm font-bold leading-normal pb-2">Mobile Number</p>
              <input 
                className="w-full rounded-lg text-[#171212] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-gray-200 bg-white h-14 placeholder:text-gray-400 p-[15px] text-base font-medium transition-all" 
                placeholder="+1 123 456 7890" 
                type="tel"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#171212] text-sm font-bold leading-normal pb-2">Create Password</p>
              <div className="relative group">
                <input 
                  className="w-full rounded-lg text-[#171212] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-gray-200 bg-white h-14 placeholder:text-gray-400 p-[15px] pr-12 text-base font-medium transition-all" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: '40%' }}></div>
                </div>
                <span className="text-[10px] font-bold text-amber-500 uppercase">Medium Strength</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in-95 duration-300">
             <span className="material-symbols-outlined text-primary/20 text-[80px] mb-4">more_horiz</span>
             <p className="text-gray-400 font-bold">Flow continues for Step {step}...</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-4">
          <button 
            onClick={handleNext}
            className="w-full h-14 bg-primary text-white rounded-xl font-bold text-lg active:scale-[0.98] transition-transform shadow-lg shadow-primary/20"
          >
            {step === 4 ? 'Complete Profile' : 'Next Step'}
          </button>
          
          <div className="flex justify-center items-center py-4">
            <p className="text-gray-500 text-sm font-medium">
              Already have an account? 
              <button 
                className="text-primary font-bold ml-1 hover:underline cursor-default"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 w-full h-1 pointer-events-none opacity-20">
        <div className="w-full h-full bg-gradient-to-r from-primary via-cyan-400 to-primary"></div>
      </div>
    </div>
  );
};

export default SignUpScreen;
