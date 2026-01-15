
import React, { useState } from 'react';
import { X } from 'lucide-react';

// Fix: Added missing onSignUp prop to interface
interface AuthScreenProps {
  onLogin: () => void;
  onBack: () => void;
  onSignUp: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onBack, onSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLoginMockAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Semi-transparent Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-gray/60 backdrop-blur-sm"
        onClick={onBack}
      />

      {/* Login Card Pop-up */}
      <div className="relative w-full max-w-[420px] bg-white rounded-[40px] shadow-[0_32px_80px_rgba(0,0,0,0.25)] p-8 pt-10 flex flex-col gap-6 animate-in slide-in-from-bottom-full duration-500 ease-out">
        
        {/* Close Button */}
        <button 
          onClick={onBack}
          className="absolute top-6 right-6 size-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-gray hover:bg-slate-100 transition-colors active:scale-90"
        >
          <X size={20} strokeWidth={3} />
        </button>

        <div className="mb-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-[32px] filled-icon">flight_takeoff</span>
            <h1 className="text-slate-gray text-2xl font-black tracking-tighter">Travel Tribe</h1>
          </div>
          <h2 className="text-slate-gray text-[26px] font-black tracking-tight leading-tight">Welcome back</h2>
          <p className="text-slate-gray/40 text-sm font-bold mt-1">Please enter your details to sign in.</p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-slate-gray text-[10px] font-black uppercase tracking-[0.2em] pb-2 ml-1 opacity-50">Email Address</p>
            <input 
              className="w-full rounded-2xl text-slate-gray focus:outline-none focus:ring-2 focus:ring-primary/30 border border-slate-100 bg-white h-14 placeholder:text-slate-200 px-5 text-base font-semibold transition-all shadow-sm" 
              placeholder="hello@example.com" 
              type="email"
            />
          </div>

          <div>
            <div className="flex justify-between items-center pb-2 ml-1">
              <p className="text-slate-gray text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Password</p>
              <button className="text-primary text-[10px] font-black hover:underline uppercase tracking-wider">Forgot?</button>
            </div>
            <div className="relative">
              <input 
                className="w-full rounded-2xl text-slate-gray focus:outline-none focus:ring-2 focus:ring-primary/30 border border-slate-100 bg-white h-14 placeholder:text-slate-200 px-5 text-base font-semibold transition-all shadow-sm" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"}
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <button 
              onClick={handleLoginMockAction}
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-primary/90 text-white font-black text-lg h-16 rounded-2xl transition-all shadow-[0_8px_25px_rgba(0,178,178,0.25)] active:scale-[0.97] flex items-center justify-center"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <span className="animate-spin size-5 border-2 border-white border-t-transparent rounded-full"></span>
                  <span>Signing in...</span>
                </div>
              ) : 'Log In'}
            </button>
            
            {/* Fix: Wired onClick to onSignUp */}
            <button 
              onClick={onSignUp}
              className="w-full border-2 border-slate-50 text-slate-gray font-black text-lg h-16 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.97] flex items-center justify-center"
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-slate-50"></div>
          <span className="text-slate-gray/20 text-[9px] font-black uppercase tracking-[0.3em]">Social Login</span>
          <div className="h-[1px] flex-1 bg-slate-50"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 h-14 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors active:scale-95 shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span className="text-sm font-black text-slate-gray">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 h-14 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors active:scale-95 shadow-sm">
            <svg className="w-5 h-5 fill-slate-gray" viewBox="0 0 24 24">
              <path d="M17.073 21.321C15.557 23.31 13.516 24 12.193 24c-1.844 0-2.844-1.125-4.594-1.125-1.781 0-3.156 1.094-4.594 1.125-1.5 0-3.344-1.375-4.469-3.469C-2.313 15.657-1.156 10.407 1.469 7.032c1.313-1.688 3.125-2.75 4.969-2.781 1.5 0 2.594 1.031 4.156 1.031 1.469 0 2.188-1.063 4.156-1.063 1.563 0 3.375.844 4.594 2.375-3.188 1.844-2.656 6.344.469 7.625-.719 1.813-1.688 3.563-2.734 5.102zM12.037 4.032c-.031-2.188 1.781-4.031 3.875-4.031.188 2.406-2.125 4.375-3.875 4.031z"></path>
            </svg>
            <span className="text-sm font-black text-slate-gray">Apple</span>
          </button>
        </div>

        <div className="text-center pb-2">
          <p className="text-slate-gray/40 text-[13px] font-bold">
            Don't have an account? 
            {/* Fix: Wired onClick to onSignUp and updated text to make sense for a login screen */}
            <button onClick={onSignUp} className="text-primary font-black hover:underline ml-1">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
