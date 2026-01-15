import React from 'react';
import { AppTab } from '../types';

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  isLoggedIn: boolean;
  profileImage?: string | null;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, isLoggedIn, profileImage }) => {
  const tabs = [
    { id: AppTab.EXPLORE, icon: 'explore', label: 'Explore', restricted: false },
    { id: AppTab.MY_TRIPS, icon: 'map', label: 'My Trips', restricted: true },
    { id: AppTab.WALLET, icon: 'account_balance_wallet', label: 'Wallet', restricted: true },
    { id: AppTab.CHAT, icon: 'forum', label: 'Chat', badge: true, restricted: true },
    { id: AppTab.PROFILE, icon: 'person', label: 'Profile', restricted: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[450px] mx-auto bg-white/95 backdrop-blur-2xl border-t border-slate-gray/5 px-4 pb-8 pt-3 flex items-center justify-between z-50">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isLocked = !isLoggedIn && tab.restricted;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            disabled={isLocked}
            className={`flex flex-col items-center justify-center flex-1 gap-1 transition-all duration-300 ${isActive ? 'text-primary' : 'text-slate-gray/40'} ${isLocked ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <div className={`relative h-8 flex items-center justify-center w-12 rounded-full mb-0.5 transition-colors ${isActive ? 'bg-primary/10' : ''}`}>
              {tab.id === AppTab.PROFILE && profileImage && !isLocked ? (
                <div 
                  className={`size-6 rounded-full bg-cover bg-center border-2 ${isActive ? 'border-primary' : 'border-slate-200'}`}
                  style={{ backgroundImage: `url('${profileImage}')` }}
                />
              ) : (
                <span className={`material-symbols-outlined text-[24px] ${isActive ? 'filled-icon' : ''}`}>
                  {isLocked ? 'lock_open' : tab.icon}
                </span>
              )}
              {tab.badge && !isActive && !isLocked && (
                <span className="absolute top-1 right-3 flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7043]"></span>
                </span>
              )}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-primary' : 'text-slate-gray/40'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;