
import React, { useState } from 'react';

interface NotificationScreenProps {
  onBack: () => void;
  showJoinSuccess?: boolean;
  onChatClick?: () => void;
  onCompleteProfileClick?: () => void;
  isUserVerified?: boolean;
  tripName?: string;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ 
  onBack, 
  showJoinSuccess, 
  onChatClick, 
  onCompleteProfileClick,
  isUserVerified = false,
  tripName
}) => {
  const [showIncompletePopup, setShowIncompletePopup] = useState(false);

  const handleChatRequest = () => {
    if (isUserVerified) {
      onChatClick?.();
    } else {
      setShowIncompletePopup(true);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#101818] dark:text-white min-h-screen flex flex-col animate-in slide-in-from-right duration-300 relative">
      {/* Incomplete Profile Popup */}
      {showIncompletePopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-[2px] animate-in fade-in duration-300">
          <div className="w-full max-w-[380px] bg-white rounded-[40px] p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-400">
            <div className="size-20 rounded-[32px] bg-primary/10 flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-4xl filled-icon">shield</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Trust Verification Required</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8 px-2">
              To join tribe group chats, you need to complete your Trust Profile verification first.
            </p>
            <div className="w-full flex flex-col gap-3">
              <button 
                onClick={onCompleteProfileClick}
                className="w-full h-16 bg-primary text-white font-black rounded-[24px] shadow-xl shadow-primary/20 active:scale-[0.97] transition-all text-lg"
              >
                Complete Profile
              </button>
              <button 
                onClick={() => setShowIncompletePopup(false)}
                className="w-full h-14 bg-transparent text-slate-400 font-bold rounded-[24px] active:scale-[0.97] transition-all text-sm"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 flex items-center border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-2xl cursor-pointer font-bold">arrow_back</span>
          </button>
          <h1 className="text-2xl font-black tracking-tight">Notifications</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
        {showJoinSuccess && (
          <section className="mt-6 px-6 animate-in slide-in-from-top duration-500">
            <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-[32px] border-2 border-primary/20 shadow-lg shadow-primary/5">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-white text-2xl filled-icon">celebration</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Tribe Joined</p>
                    <span className="text-[10px] font-bold text-slate-400">Just now</span>
                  </div>
                  <p className="text-[15px] font-black text-slate-900 dark:text-white mt-1">Request accepted!</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-bold">You joined the {tripName || 'selected tribe'} chat group.</p>
                  <button 
                    onClick={handleChatRequest}
                    className="mt-4 w-full bg-primary text-white py-3.5 rounded-2xl text-sm font-black shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">forum</span>
                    Chat with Tribe
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mt-8">
          <div className="flex items-center justify-between px-6 mb-4">
            <h2 className="text-lg font-black tracking-tight">Requests</h2>
            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">2 New</span>
          </div>
          <div className="space-y-4 px-6">
            <div className="bg-white dark:bg-surface-dark p-5 rounded-[28px] shadow-sm border border-slate-50 dark:border-slate-800">
              <div className="flex gap-4">
                <div className="relative shrink-0">
                  <div 
                    className="h-14 w-14 rounded-full bg-cover bg-center border-2 border-white dark:border-slate-700 shadow-sm" 
                    style={{ backgroundImage: "url('https://i.pravatar.cc/150?u=arjun')" }}
                  ></div>
                  <div className="absolute -bottom-1 -right-1 bg-primary border-2 border-white dark:border-surface-dark size-6 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px] text-white font-black">person_add</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-black text-[15px] text-slate-900 dark:text-white">Arjun Sharma</p>
                    <span className="text-[10px] font-bold text-slate-400">12m ago</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">wants to connect with you for Manali Trek.</p>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-primary text-white py-3 rounded-xl text-xs font-black shadow-lg shadow-primary/20 active:scale-95 transition-all">Accept</button>
                    <button className="flex-1 bg-[#FF9466]/10 text-[#FF9466] py-3 rounded-xl text-xs font-black active:scale-95 transition-all">Decline</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-black tracking-tight px-6 mb-4">Trips</h2>
          <div className="space-y-4 px-6">
            <div className="bg-white dark:bg-surface-dark p-5 rounded-[28px] shadow-sm border-l-4 border-primary border-t border-r border-b border-slate-50 dark:border-slate-800">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl filled-icon">event_available</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Availability Alert</p>
                    <span className="text-[10px] font-bold text-slate-400">3h ago</span>
                  </div>
                  <p className="text-[15px] font-black text-slate-900 dark:text-white mt-1">Spot available on <span className="underline decoration-primary/40">Jaipur Heritage Trip!</span></p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Last chance to grab a spot!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotificationScreen;
