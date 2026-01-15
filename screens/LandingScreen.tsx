
import React from 'react';

interface LandingScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
  onBack: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onLogin, onSignUp, onBack }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-background-light">
      <div className="absolute inset-0 z-0 h-[60vh]">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYRdrzrgu3B0RcE5Hlrb_TVkN74Sn8_PDBaGvyxp5PQDQfq3y-q7WdXrxrUGhYJB7PZdh12r5obpxRZUdw-3rr3jEdnc4RchL6_XKNxNvZY1K_ACaGgsR3Islb2aNJ2s6QT5HKtBB9fdwb_57jjci62kUt40fKvpN-DWCJa6iaHXfA1eV5m467GAhHFUqxuKys5jzQb0-uda__97djAjQDltbd5rR1CCAX_dt1rxlts6hKHgmvRsICxv_Fuv5D5n-5uQ17fZSZGg")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background-light"></div>
        </div>
      </div>
      
      {/* Top Bar with Back Button - High Visibility */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-start">
        <button 
          onClick={onBack} 
          className="flex size-11 items-center justify-center rounded-full bg-white shadow-xl text-slate-900 border border-slate-100 active:scale-90 transition-transform"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-4 pb-12 pt-40">
        <div className="w-full max-w-[480px] text-center mb-8">
          <h1 className="text-white text-[44px] font-black tracking-tighter leading-tight drop-shadow-2xl font-display">
            Travel Tribe
          </h1>
          <p className="text-white text-lg font-black drop-shadow-lg opacity-90">
            Travel is better together.
          </p>
        </div>
        
        <div className="w-full max-w-[480px] glass-card rounded-[32px] shadow-2xl p-8 flex flex-col gap-2 border border-white/20">
          <div className="mb-4">
            <h2 className="text-slate-900 text-[28px] font-black tracking-tight">Welcome back</h2>
            <p className="text-slate-400 text-sm font-bold mt-1">Please enter your details to sign in.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="flex flex-col w-full">
                <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] pb-2 ml-1 opacity-60">Email Address</p>
                <input 
                  className="form-input flex w-full rounded-2xl text-slate-900 focus:outline-0 focus:ring-4 focus:ring-primary/10 border border-slate-100 bg-white h-16 placeholder:text-slate-200 px-5 text-base font-bold transition-all shadow-sm" 
                  placeholder="hello@example.com" 
                  type="email"
                />
              </label>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="flex flex-col w-full">
                <div className="flex justify-between items-center pb-2 ml-1">
                  <p className="text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Password</p>
                  <button className="text-primary text-[11px] font-black hover:underline uppercase tracking-wider">Forgot?</button>
                </div>
                <div className="relative flex w-full items-stretch">
                  <input 
                    className="form-input flex w-full rounded-2xl text-slate-900 focus:outline-0 focus:ring-4 focus:ring-primary/10 border border-slate-100 bg-white h-16 placeholder:text-slate-200 px-5 text-base font-bold transition-all shadow-sm" 
                    placeholder="••••••••" 
                    type="password"
                  />
                  <button className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </label>
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
              <button 
                onClick={onLogin}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black h-16 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-[0.98] text-lg"
              >
                Log In
              </button>
              <button 
                onClick={onSignUp}
                className="w-full bg-transparent hover:bg-slate-50 border-2 border-slate-100 text-slate-900 font-black h-16 rounded-2xl transition-all active:scale-[0.98] text-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 my-6">
            <div className="h-[1px] flex-1 bg-slate-100"></div>
            <span className="text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">OR</span>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2.5 h-14 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors shadow-sm bg-white active:scale-95">
              <svg className="size-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-sm font-black text-slate-900">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2.5 h-14 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors shadow-sm bg-white active:scale-95">
              <svg className="size-5 fill-slate-900" viewBox="0 0 24 24">
                <path d="M17.073 21.321C15.557 23.31 13.516 24 12.193 24c-1.844 0-2.844-1.125-4.594-1.125-1.781 0-3.156 1.094-4.594 1.125-1.5 0-3.344-1.375-4.469-3.469C-2.313 15.657-1.156 10.407 1.469 7.032c1.313-1.688 3.125-2.75 4.969-2.781 1.5 0 2.594 1.031 4.156 1.031 1.469 0 2.188-1.063 4.156-1.063 1.563 0 3.375.844 4.594 2.375-3.188 1.844-2.656 6.344.469 7.625-.719 1.813-1.688 3.563-2.734 5.102zM12.037 4.032c-.031-2.188 1.781-4.031 3.875-4.031.188 2.406-2.125 4.375-3.875 4.031z"></path>
              </svg>
              <span className="text-sm font-black text-slate-900">Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
