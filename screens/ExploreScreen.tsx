
import React, { useState } from 'react';
import { RECOMMENDED_DESTINATIONS, TRENDING_SPOTS } from '../constants';
import { Destination } from '../types';

interface ExploreScreenProps {
  onSeeAll?: () => void;
  onStartAuth?: () => void;
  onSelectTrip?: (trip: Destination) => void;
  isLoggedIn?: boolean;
}

const ExploreScreen: React.FC<ExploreScreenProps> = ({ onSeeAll, onStartAuth, onSelectTrip, isLoggedIn }) => {
  const [activeChip, setActiveChip] = useState('For You');

  const chips = [
    { label: 'For You', icon: 'auto_awesome' },
    { label: 'Adventure', icon: 'hiking' },
    { label: 'Zen', icon: 'spa' },
    { label: 'Party', icon: 'nightlife' },
  ];

  return (
    <div className="px-6 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {!isLoggedIn && (
        <div className="mb-8 p-6 bg-primary rounded-[32px] text-white shadow-xl shadow-primary/10 relative overflow-hidden group active:scale-[0.98] transition-all cursor-pointer" onClick={onStartAuth}>
          <div className="absolute -right-4 -top-4 size-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-1">Start your adventure</h3>
            <p className="text-white/80 text-xs font-bold mb-4">Join 12,000+ travelers today.</p>
            <button className="h-10 px-6 bg-white text-primary rounded-xl font-black text-sm active:scale-95 transition-all">
              Join the Tribe
            </button>
          </div>
          <span className="absolute right-6 bottom-6 material-symbols-outlined text-white/20 text-[64px] filled-icon">flight_takeoff</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-8 mt-2">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary">
          <span className="material-symbols-outlined text-[24px]">explore</span>
        </div>
        <input
          type="text"
          placeholder="Where does your vibe take you?"
          className="w-full h-[64px] pl-14 pr-14 rounded-[24px] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-slate-gray placeholder:text-slate-gray/30 focus:ring-1 focus:ring-primary/20 transition-all font-semibold text-lg"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-gray/40">
          <span className="material-symbols-outlined text-[24px]">search</span>
        </div>
      </div>

      {/* Chips */}
      <div className="flex gap-3 mb-10 overflow-x-auto no-scrollbar py-2 -mx-2 px-2">
        {chips.map((chip) => {
          const isActive = activeChip === chip.label;
          return (
            <button
              key={chip.label}
              onClick={() => setActiveChip(chip.label)}
              className={`flex h-[48px] shrink-0 items-center justify-center gap-x-2 rounded-[20px] px-6 transition-all font-bold text-base ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white border border-slate-50 text-slate-gray shadow-sm'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'filled-icon' : ''}`}>{chip.icon}</span>
              <p>{chip.label}</p>
            </button>
          );
        })}
      </div>

      {/* Recommended Section */}
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-[26px] font-black leading-[1.1] tracking-tight text-slate-gray">
          Recommended<br />for your Vibe
        </h2>
        <button 
          onClick={onSeeAll}
          className="text-primary text-sm font-black flex items-center gap-1 mb-1"
        >
          See all <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      {/* Recommended Cards */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {RECOMMENDED_DESTINATIONS.map((dest, idx) => (
          <div 
            key={dest.id} 
            onClick={() => onSelectTrip?.(dest)}
            className={`relative flex flex-col gap-3 rounded-[24px] overflow-hidden bg-white shadow-sm border border-slate-50 group cursor-pointer transition-transform active:scale-95 ${idx === 1 ? 'mt-8' : idx === 2 ? '-mt-8' : ''}`}
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              <img
                src={dest.imageUrl}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 flex h-8 items-center justify-center gap-x-1 rounded-xl bg-white/90 backdrop-blur-sm px-2.5">
                <span className="material-symbols-outlined text-[#FFBF00] text-sm font-bold filled-icon">star</span>
                <p className="text-slate-gray text-[10px] font-black leading-none">{dest.matchScore}% Match</p>
              </div>
            </div>
            <div className="p-4 pt-0">
              <h3 className="text-base font-black text-slate-gray leading-tight truncate">{dest.name}</h3>
              <p className="text-[11px] text-slate-gray/50 font-bold mt-0.5">{dest.country} • {dest.days} days</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trending Section */}
      <h2 className="text-xs font-black tracking-[0.2em] uppercase text-slate-gray/30 mb-6 px-1">
        Trending Spots
      </h2>
      <div className="flex gap-5 pb-10 overflow-x-auto no-scrollbar">
        {TRENDING_SPOTS.map((spot) => (
          <div key={spot.id} className="flex flex-col items-center shrink-0 gap-3">
            <div className="size-[72px] rounded-full overflow-hidden border-2 border-white shadow-md hover:ring-2 hover:ring-primary transition-all cursor-pointer">
              <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-black text-slate-gray/60 tracking-wide uppercase">{spot.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreScreen;
