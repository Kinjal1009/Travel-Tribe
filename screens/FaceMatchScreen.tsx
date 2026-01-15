
import React, { useState } from 'react';

interface FaceMatchScreenProps {
  onBack: () => void;
  onNext: () => void;
  title?: string;
  subtitle?: string;
  isVideo?: boolean;
}

const FaceMatchScreen: React.FC<FaceMatchScreenProps> = ({ 
  onBack, 
  onNext, 
  title = "Center your face", 
  subtitle = "Blink to capture",
  isVideo = false
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCapture = () => {
    if (isVideo) {
      setShowSuccess(true);
    } else {
      onNext();
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-background-dark font-display overflow-hidden text-white animate-in slide-in-from-right duration-300">
      {/* Video Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="size-20 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-5xl font-black">cloud_upload</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Upload Successful</h3>
            <p className="text-slate-500 font-bold mb-8">Your self-introduction video has been uploaded for verification.</p>
            <button 
              onClick={onNext}
              className="w-full h-16 bg-primary text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all text-lg"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOiLP06ZagLGqKpPDPuOcQDB0QGaAqxDtbKVInzA9h6rz9ep2YZ71r5Wr2IpcJ-HyVnK1oO9FBL6RYnUhzdG118DCn2Wk944-4vO9W99smQAh8lwdEwvZRcOWCXqkkAU3_qQj1hvnj7PmnFnisYMcD2lhoV0-WTcnpV6GubirZfww2EoWRuAwdwdN59BDGIgNHpIqspLMrdwUCSJ89Tdn9BFJ0Q4FpQ9eY-mlYyCPNmzpy6ruiwpF4SE9ciHUVt1pkZwvg8i8Ikg")' }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        <div className="flex items-center justify-between p-6">
          <button onClick={onBack} className="flex items-center justify-center size-11 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 border border-white/10 active:scale-90 transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-xs font-black text-white tracking-widest uppercase">{isVideo ? 'Recording' : 'Camera'}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative w-full">
          <div className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-white">
            <span className="material-symbols-outlined text-[18px] filled-icon">lock</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Encrypted Stream</span>
          </div>
          
          <div className="relative flex items-center justify-center">
            <div className="relative size-72 rounded-full ring-8 ring-primary/20 bg-cover bg-center overflow-hidden flex items-center justify-center"
                 style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbR2CNPQt3A0y0xlQnwBkz4OyRV6pgvQvYNWu6Fd3ctaOjJjkJaPuxOkbjNPFmnqaoxSKcIJgyCWxGnAPMjsk80Y7OuZnK3BO280eWuXLqEbDMcLBaFCvUlrxEg4NDITVKOh8tw8-IGhcRC7k7KNrubJaJDs2y7GLVOyAcK9EnQhXboTGN-jOzyINykvIy89kbZszB1GZPxa1IMPiiw36wKUCrh-jaLBhZ28-fwgBIbUOo-tbH0HfqYe_rvvakAzUApVO551wcwg")' }}>
              <div className="absolute inset-0 bg-black/10"></div>
              {!isVideo && <span className="material-symbols-outlined text-white/30 text-[120px] animate-pulse">face</span>}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="size-64 rounded-full border-[6px] border-primary border-t-transparent animate-spin duration-[3000ms]"></div>
                </div>
              )}
            </div>
            
            <svg className="absolute size-80 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"></circle>
              <circle cx="50" cy="50" r="45" fill="none" stroke="#00b2b2" strokeWidth="3" strokeDasharray="283" strokeDashoffset="80" strokeLinecap="round" className="transition-all duration-1000"></circle>
            </svg>
          </div>

          <div className="mt-12 text-center space-y-2 px-8">
            <h1 className="text-white text-3xl font-black leading-tight tracking-tight drop-shadow-lg font-display">{title}</h1>
            <p className="text-white/80 text-lg font-bold animate-pulse">{subtitle}</p>
          </div>

          <button 
            onClick={handleCapture}
            className="mt-10 flex items-center justify-center size-20 rounded-full bg-white/10 border-4 border-white/20 backdrop-blur-sm active:bg-white/30 transition-all z-30 group"
          >
            <div className={`size-14 rounded-full bg-white group-hover:scale-90 transition-all ${isVideo ? 'bg-red-500 scale-90 rounded-2xl' : ''}`}></div>
          </button>
        </div>

        <div className="w-full p-6 z-30">
          <div className="relative overflow-hidden bg-white rounded-[32px] p-6 shadow-2xl border border-white/5">
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center size-12 rounded-2xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[24px] filled-icon">verified_user</span>
              </div>
              <div className="flex-1 pt-0.5">
                <h3 className="text-slate-900 text-base font-black leading-tight mb-1">Privacy Guarantee</h3>
                <p className="text-slate-400 text-xs font-bold leading-relaxed">
                  {isVideo 
                    ? "This video is only used for trust verification and is never stored permanently on our public servers."
                    : "This photo will be used to update your public profile picture."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceMatchScreen;
