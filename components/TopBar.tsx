
import React from 'react';
import { AppTab } from '../types';

interface TopBarProps {
  activeTab: AppTab;
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onSafetyClick?: () => void;
  onNotificationClick?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ activeTab, onLoginClick, isLoggedIn, onSafetyClick, onNotificationClick }) => {
  return (
    <div className="px-6 pt-10 pb-2 bg-transparent sticky top-0 z-30">
      {activeTab === AppTab.EXPLORE ? (
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-[900] text-slate-gray tracking-tight">Travel Tribe</h1>
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <>
                <button 
                  onClick={onSafetyClick}
                  className="size-11 rounded-full bg-red-50 shadow-sm border border-red-100 flex items-center justify-center text-[#d13333] active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[22px] filled-icon">shield</span>
                </button>
                <button 
                  onClick={onNotificationClick}
                  className="size-11 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-gray relative active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[22px]">notifications</span>
                  <span className="absolute top-3 right-3.5 size-2.5 bg-[#FF7043] rounded-full border-2 border-white"></span>
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between h-[44px]">
          <h1 className="text-2xl font-black text-slate-gray tracking-tight">{activeTab}</h1>
        </div>
      )}
    </div>
  );
};

export default TopBar;
