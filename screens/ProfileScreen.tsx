
import React from 'react';

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

interface MatchSettings {
  groupSize: number;
  ageRange: { min: number; max: number };
  budgetAlignment: boolean;
  hasConfigured: boolean;
}

interface ProfileScreenProps {
  profileImage: string | null;
  userBio: string;
  userInterests: string[];
  emergencyContact: EmergencyContact;
  matchSettings: MatchSettings;
  onEditClick: () => void;
  onAddBio: () => void;
  onSelectInterests: () => void;
  onVerifyClick: () => void;
  onEmergencyDetailsClick: () => void;
  onSafetyCenterClick: () => void;
  isSafetySetupComplete?: boolean;
  isVerifiedVideo: boolean;
  isVerifiedIdentity: boolean;
  isVerifiedSocial: boolean;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  profileImage, 
  userBio,
  userInterests,
  emergencyContact,
  matchSettings,
  onEditClick, 
  onAddBio, 
  onSelectInterests, 
  onVerifyClick,
  onEmergencyDetailsClick,
  onSafetyCenterClick,
  isSafetySetupComplete = false,
  isVerifiedVideo,
  isVerifiedIdentity,
  isVerifiedSocial
}) => {
  const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuB73dsEcCajhGWp1neNQgNxm_GoP-OaQturmgptw5gs8HeUvNeujECZtoDL_JplACz9sL_mlyz5pupcNLx7Umtaix0Z4rA5sAq6C6bA-4G9v9pYBAVQsAqn1DHIgMpVONj4TEZGjMQ0OLS8d9dZ14T6t2bnOyEvn7Qgem8hpNWqznkj_TNN11JBFrMq1Y-cP892_LLEz9Iig5KoG0tiXzB_e0IzQMCk0RmixQdwRf9qGV71NJj4tH6a28n3tIowWG5ohC8tEYbQig";

  const isFullyVerified = isVerifiedVideo && isVerifiedIdentity && isVerifiedSocial;
  const hasAnyBadge = isVerifiedVideo || isVerifiedIdentity || isVerifiedSocial;

  const hasBio = userBio && userBio.trim().length > 0;
  const hasInterests = userInterests && userInterests.length > 0;
  const hasEmergency = emergencyContact && emergencyContact.name.trim().length > 0;
  const hasMatchSettings = matchSettings.hasConfigured;

  const showCompleteProfile = !hasBio || !hasInterests || !hasEmergency || !hasMatchSettings;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen">
      {/* Header - No Settings Icon */}
      <header className="flex items-center justify-between px-6 pt-10 pb-4 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
        <h1 className="text-[32px] font-black text-slate-900 dark:text-white tracking-tight">Profile</h1>
        <div className="flex items-center gap-3">
          <button className="size-11 rounded-full bg-white dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-90 transition-transform">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
        {/* Profile Info */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <div className="h-32 w-32 rounded-[48px] border-[5px] border-white dark:border-surface-dark shadow-xl overflow-hidden bg-[#e8c8b0] flex items-center justify-center">
              <img 
                alt="Profile" 
                className="h-full w-full object-cover" 
                src={profileImage || defaultImage} 
              />
            </div>
            <button 
              onClick={onEditClick}
              className="absolute bottom-1 right-1 h-10 w-10 bg-primary rounded-full border-4 border-background-light dark:border-background-dark flex items-center justify-center shadow-lg transform transition hover:scale-110 active:scale-95"
            >
              <span className="material-symbols-outlined text-white text-[20px] font-bold">edit</span>
            </button>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-[28px] font-black text-slate-900 dark:text-white tracking-tight">Alex Johnson</h2>
              {isFullyVerified && (
                <span className="material-symbols-outlined text-primary text-[24px] filled-icon">verified</span>
              )}
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-3">Backpacker • 12 Trips</p>
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-1.5 bg-white/50 dark:bg-black/10 px-3 py-0.5 rounded-full">
                <span className="text-xs text-slate-400 font-bold">alex.johnson@example.com</span>
                <span className="material-symbols-outlined text-green-500 text-[16px] font-black filled-icon">check_circle</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/50 dark:bg-black/10 px-3 py-0.5 rounded-full">
                <span className="text-xs text-slate-400 font-bold">+1 (555) 123-4567</span>
                <span className="material-symbols-outlined text-green-500 text-[16px] font-black filled-icon">check_circle</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVE BADGES */}
        {hasAnyBadge && (
          <div className="mb-10">
            <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.25em] px-1 mb-5">Active Badges</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {isVerifiedIdentity && (
                <div className="shrink-0 w-[110px] bg-white dark:bg-surface-dark rounded-[32px] border border-slate-100 dark:border-slate-800 p-5 flex flex-col items-center justify-center gap-3 shadow-sm relative transition-transform active:scale-95">
                  <div className="absolute top-3 right-3 flex items-center justify-center size-5 bg-[#22c55e] rounded-full border-2 border-white dark:border-surface-dark">
                    <span className="material-symbols-outlined text-white text-[10px] font-black">check</span>
                  </div>
                  <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[24px] filled-icon">shield</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-900 dark:text-white whitespace-nowrap uppercase tracking-tighter">ID Verified</span>
                </div>
              )}
              {isVerifiedVideo && (
                <div className="shrink-0 w-[110px] bg-white dark:bg-surface-dark rounded-[32px] border border-slate-100 dark:border-slate-800 p-5 flex flex-col items-center justify-center gap-3 shadow-sm relative transition-transform active:scale-95">
                  <div className="absolute top-3 right-3 flex items-center justify-center size-5 bg-[#22c55e] rounded-full border-2 border-white dark:border-surface-dark">
                    <span className="material-symbols-outlined text-white text-[10px] font-black">check</span>
                  </div>
                  <div className="size-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[24px] filled-icon">videocam</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-900 dark:text-white whitespace-nowrap uppercase tracking-tighter">Video Intro</span>
                </div>
              )}
              {isVerifiedSocial && (
                <div className="shrink-0 w-[110px] bg-white dark:bg-surface-dark rounded-[32px] border border-slate-100 dark:border-slate-800 p-5 flex flex-col items-center justify-center gap-3 shadow-sm relative transition-transform active:scale-95">
                  <div className="absolute top-3 right-3 flex items-center justify-center size-5 bg-[#22c55e] rounded-full border-2 border-white dark:border-surface-dark">
                    <span className="material-symbols-outlined text-white text-[10px] font-black">check</span>
                  </div>
                  <div className="size-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-[24px] filled-icon">link</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-900 dark:text-white whitespace-nowrap uppercase tracking-tighter">Social Connect</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Verification Status Card */}
        {!isFullyVerified && (
          <div className="mb-10">
            <div className="bg-primary rounded-[36px] p-8 text-white shadow-xl shadow-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[120px]">verified</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Verification Status</p>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                    <span className="material-symbols-outlined text-sm font-black">bolt</span>
                    <span className="text-[11px] font-black tracking-tight">+20%</span>
                  </div>
                </div>
                <h3 className="text-[26px] font-black leading-tight tracking-tight mb-4">Build Your Trust Profile</h3>
                <p className="text-white/80 text-[15px] font-bold leading-relaxed mb-8">
                  Boost your Trust Score and get your Verified Traveler badge by completing your identity verification.
                </p>
                <button 
                  onClick={onVerifyClick}
                  className="w-full bg-white text-primary font-black h-16 rounded-[24px] shadow-lg active:scale-[0.98] transition-all text-base flex items-center justify-center gap-2"
                >
                  Complete Verification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT ME SECTION (Card View for Filled Details) */}
        {(hasBio || hasInterests || hasEmergency || hasMatchSettings) && (
          <div className="space-y-4 mb-10">
            <h3 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] px-2 mb-4">About Me</h3>
            
            {hasBio && (
              <div className="bg-white dark:bg-surface-dark p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm relative animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Travel Bio</p>
                  <button onClick={onAddBio} className="text-primary active:scale-90 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                </div>
                <p className="text-[15px] font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">"{userBio}"</p>
              </div>
            )}

            {hasInterests && (
              <div className="bg-white dark:bg-surface-dark p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm relative animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Travel Interests</p>
                  <button onClick={onAddBio} className="text-primary active:scale-90 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userInterests.map(interest => (
                    <span key={interest} className="px-4 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl text-[11px] font-black uppercase tracking-wider">{interest}</span>
                  ))}
                </div>
              </div>
            )}

            {hasMatchSettings && (
              <div className="bg-white dark:bg-surface-dark p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm relative animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Matching Preferences</p>
                  <button onClick={onSelectInterests} className="text-primary active:scale-90 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Group Size</p>
                    <p className="text-base font-black text-slate-900 dark:text-white">{matchSettings.groupSize} People</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Age Range</p>
                    <p className="text-base font-black text-slate-900 dark:text-white">{matchSettings.ageRange.min}-{matchSettings.ageRange.max}</p>
                  </div>
                </div>
              </div>
            )}

            {hasEmergency && (
              <div className="bg-white dark:bg-surface-dark p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm relative animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[11px] font-black text-red-500 uppercase tracking-[0.2em]">Emergency Contact</p>
                  <button onClick={onEmergencyDetailsClick} className="text-red-500 active:scale-90 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                    <span className="material-symbols-outlined filled-icon">favorite</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-black text-slate-900 dark:text-white truncate">{emergencyContact.name}</p>
                    <p className="text-xs text-slate-400 font-bold mt-0.5 truncate">{emergencyContact.relationship} • {emergencyContact.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* COMPLETE YOUR PROFILE SECTION (Remaining items) */}
        {showCompleteProfile && (
          <div className="mb-10">
            <h3 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] px-2 mb-4">Complete Your Profile</h3>
            <div className="bg-white dark:bg-surface-dark rounded-[36px] overflow-hidden shadow-sm border border-slate-50 dark:border-slate-800 divide-y divide-slate-50 dark:divide-slate-800">
              
              {!hasBio && (
                <button 
                  onClick={onAddBio}
                  className="w-full flex items-center gap-5 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left group"
                >
                  <div className="h-12 w-12 rounded-[20px] bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[26px] filled-icon">person</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black text-slate-900 dark:text-white">Add Bio & Interests</p>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">Tell us about your travel style</p>
                  </div>
                  <span className="material-symbols-outlined text-primary font-black group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              )}

              {!hasMatchSettings && (
                <button 
                  onClick={onSelectInterests}
                  className="w-full flex items-center gap-5 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left group"
                >
                  <div className="h-12 w-12 rounded-[20px] bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[26px] filled-icon">extension</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black text-slate-900 dark:text-white">Match Settings</p>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">Help us suggest better tribes</p>
                  </div>
                  <span className="material-symbols-outlined text-primary font-black group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              )}

              {!hasEmergency && (
                <button 
                  onClick={onEmergencyDetailsClick}
                  className="w-full flex items-center gap-5 p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left group"
                >
                  <div className="h-12 w-12 rounded-[20px] bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[26px] filled-icon">favorite</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black text-slate-900 dark:text-white">Emergency Details</p>
                    <p className="text-xs text-slate-400 font-bold mt-0.5">Essential for safety during trips</p>
                  </div>
                  <span className="material-symbols-outlined text-primary font-black group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* External Links */}
        <div className="space-y-4 pt-4">
          <button 
            onClick={onSafetyCenterClick}
            className="w-full flex items-center gap-4 px-6 py-5 rounded-[28px] bg-white dark:bg-surface-dark border border-slate-50 dark:border-slate-800 shadow-sm transition-all active:scale-[0.99] text-left"
          >
            <div className="size-11 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <span className="material-symbols-outlined text-[22px] filled-icon">verified_user</span>
            </div>
            <span className="flex-1 text-base font-black text-slate-800 dark:text-white">Safety Center</span>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </button>

          <button className="w-full flex items-center gap-4 px-6 py-5 rounded-[28px] bg-white dark:bg-surface-dark border border-slate-50 dark:border-slate-800 shadow-sm transition-all active:scale-[0.99] text-left">
            <div className="size-11 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-[22px] filled-icon">help</span>
            </div>
            <span className="flex-1 text-base font-black text-slate-800 dark:text-white">Support & Feedback</span>
            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfileScreen;
