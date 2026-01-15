
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#0df2f2]/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-20%] h-[400px] w-[400px] rounded-full bg-[#0df2f2]/5 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        <div className="mb-10 relative">
          <div className="absolute inset-0 rounded-[32px] bg-[#0df2f2]/20 blur-xl scale-110"></div>
          <div className="relative flex items-center justify-center w-32 h-32 rounded-[32px] bg-white shadow-xl ring-1 ring-black/5">
            <span className="material-symbols-outlined text-[#0df2f2] text-[64px] filled-icon">
              flight_takeoff
            </span>
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#ffab91] ring-2 ring-white"></div>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-slate-gray tracking-tight mb-1">
          Travel Tribe
        </h1>
        <p className="text-slate-400 text-lg font-medium tracking-wide">
          Connect. Explore. Belong.
        </p>
      </div>

      <div className="absolute bottom-12 text-slate-300 text-sm font-medium tracking-widest">
        v2.4.0
      </div>
    </div>
  );
};

export default SplashScreen;
