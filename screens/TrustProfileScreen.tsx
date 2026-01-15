
import React, { useState } from 'react';

interface TrustProfileScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onVerifyVideo: () => void;
  onVerifyIdentity: () => void;
  onVerifySocial: () => void;
  isVerifiedVideo: boolean;
  isVerifiedIdentity: boolean;
  isVerifiedSocial: boolean;
}

const TrustProfileScreen: React.FC<TrustProfileScreenProps> = ({ 
  onBack, 
  onNext, 
  onSkip,
  onVerifyVideo, 
  onVerifyIdentity, 
  onVerifySocial,
  isVerifiedVideo,
  isVerifiedIdentity,
  isVerifiedSocial
}) => {
  const [showSocialPopup, setShowSocialPopup] = useState(false);

  const handleSocialConnect = () => {
    setShowSocialPopup(true);
  };

  const closeSocialPopup = () => {
    setShowSocialPopup(false);
    onVerifySocial();
  };

  return (
    <div className="relative flex h-full min-h-screen w-full max-w-md mx-auto flex-col bg-background-light p-6 pb-10 animate-in slide-in-from-right duration-300">
      {/* Social Popup Modal */}
      {showSocialPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full bg-white rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="size-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">facebook</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Connecting...</h3>
            <p className="text-slate-500 font-bold mb-8">Successfully linking your Facebook account to your Travel Tribe profile.</p>
            <button 
              onClick={closeSocialPopup}
              className="w-full h-14 bg-primary text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Header with Close Icon on Top Right */}
      <div className="flex w-full items-center justify-end pt-4 pb-2">
        <button 
          onClick={onBack} 
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200/50 transition-colors active:scale-90"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-slate-gray text-2xl">close</span>
        </button>
      </div>
      
      <div className="flex flex-col gap-2 mb-8 mt-4">
        <h1 className="text-slate-900 tracking-tight text-[32px] font-black leading-tight font-display">Build Your Trust Profile</h1>
        <p className="text-slate-600 text-base font-bold leading-relaxed opacity-70">
          Verify your identity to earn your Verified Traveler badge and join our trusted community.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-auto">
        {[
          { icon: 'videocam', title: 'Video Verification', desc: 'Self-introduction video', status: isVerifiedVideo, action: onVerifyVideo },
          { icon: 'badge', title: 'Verify Identity Proof', desc: 'Government ID verification', status: isVerifiedIdentity, action: onVerifyIdentity },
          { icon: 'share', title: 'Connect Social Media', desc: 'Link your social accounts', status: isVerifiedSocial, action: handleSocialConnect }
        ].map(item => (
          <div 
            key={item.title} 
            onClick={!item.status ? item.action : undefined}
            className="flex items-center gap-4 bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 transition-all cursor-pointer hover:bg-slate-50 active:scale-[0.99]"
          >
            <div className={`flex items-center justify-center rounded-2xl shrink-0 h-14 w-14 ${item.status ? 'bg-green-50 text-green-500' : 'bg-primary/10 text-primary'}`}>
              <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <p className="text-slate-900 text-[17px] font-black truncate">{item.title}</p>
              <p className="text-slate-400 text-xs font-bold truncate">{item.desc}</p>
            </div>
            <div className="shrink-0 flex items-center justify-center size-10">
              {item.status ? (
                <div className="size-7 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[18px] font-black">check</span>
                </div>
              ) : (
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              )}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 px-2 mt-4 opacity-60">
          <span className="material-symbols-outlined text-slate-400 text-[18px]">shield</span>
          <p className="text-slate-400 text-[11px] font-bold">Your data is encrypted and never shared publicly.</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-6 mt-6">
        <button 
          onClick={onNext} 
          className="w-full flex items-center justify-center rounded-[20px] h-16 bg-primary hover:bg-teal-600 text-white text-lg font-black transition-all shadow-xl shadow-primary/20 active:scale-[0.98]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TrustProfileScreen;
