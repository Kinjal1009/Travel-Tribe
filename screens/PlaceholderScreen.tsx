
import React from 'react';
import { AppTab } from '../types';

interface PlaceholderScreenProps {
  tab: AppTab;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ tab }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center animate-in zoom-in-95 duration-300">
      <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          {tab === AppTab.MY_TRIPS && '✈️'}
          {tab === AppTab.WALLET && '💳'}
          {tab === AppTab.CHAT && '💬'}
          {tab === AppTab.PROFILE && '👤'}
        </div>
      </div>
      <h2 className="text-2xl font-black text-slate-gray mb-2">{tab} Content</h2>
      <p className="text-slate-400 font-bold text-sm leading-relaxed">
        We're working on your {tab.toLowerCase()} details. Soon you'll be able to manage everything here!
      </p>
    </div>
  );
};

export default PlaceholderScreen;
