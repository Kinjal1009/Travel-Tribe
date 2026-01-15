import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Destination } from '../types';

interface CommunityAdventuresScreenProps {
  onBack: () => void;
  onSelectTrip?: (trip: any) => void;
  userTrips?: Destination[];
}

const CommunityAdventuresScreen: React.FC<CommunityAdventuresScreenProps> = ({ onBack, onSelectTrip, userTrips = [] }) => {
  const defaultTrips: Destination[] = [
    {
      id: 'comm-1',
      name: 'Udaipur City of Lakes',
      country: 'India',
      days: 5,
      matchScore: 98,
      imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
      price: 18500,
      groupSize: 10,
      category: 'Culture'
    },
    {
      id: 'comm-2',
      name: 'Munnar Tea Walk',
      country: 'India',
      days: 4,
      matchScore: 92,
      imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800',
      price: 9500,
      groupSize: 12,
      category: 'Zen'
    },
    {
      id: 'comm-3',
      name: 'Rishikesh Rafting',
      country: 'India',
      days: 3,
      matchScore: 95,
      imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=400',
      price: 6000,
      groupSize: 15,
      category: 'Adventure'
    }
  ];

  const allAdventures = [...userTrips, ...defaultTrips];

  return (
    <div className="h-full w-full bg-white flex flex-col animate-in fade-in duration-300 overflow-hidden">
      {/* Sticky Header with Search */}
      <header className="px-4 py-3 bg-white border-b border-slate-100 flex items-center gap-3 sticky top-0 z-50">
        <button onClick={onBack} className="p-2 text-slate-gray hover:bg-slate-50 rounded-full active:scale-90 transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </div>
          <input
            type="text"
            placeholder="Search community adventures..."
            className="w-full h-[56px] pl-12 pr-12 rounded-[20px] border-none bg-slate-50 text-slate-gray placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-base"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
            <span className="material-symbols-outlined text-[22px]">tune</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Trips Created by You Section */}
        <section className="mt-6">
          <div className="flex items-center justify-between px-6 mb-4">
            <h2 className="text-xl font-black text-slate-gray tracking-tight">Trips Created by You</h2>
            <button className="text-primary text-sm font-black uppercase tracking-wider">View All</button>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 pb-4">
            {userTrips.length === 0 ? (
              <div className="flex items-center justify-center w-full py-10 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100 mx-2">
                <p className="text-slate-400 font-bold text-sm italic">No trips created yet.</p>
              </div>
            ) : (
              userTrips.map(trip => (
                <div 
                  key={trip.id} 
                  className="min-w-[280px] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm cursor-pointer hover:border-primary/30 transition-all" 
                  onClick={() => onSelectTrip?.(trip)}
                >
                  <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url("${trip.imageUrl}")` }}></div>
                  <div className="p-5">
                    <h4 className="font-black text-lg text-slate-gray">{trip.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 font-bold">{trip.groupSize || trip.maxGroupSize || 0} Travelers • Aug 12</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black tracking-widest uppercase rounded-lg">ACTIVE</span>
                      <span className="text-primary font-black text-base">₹{trip.price}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {/* Sample Draft if no user trips */}
            {userTrips.length === 0 && (
              <div className="min-w-[280px] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm opacity-60">
                <div className="h-40 w-full bg-slate-100 flex items-center justify-center">
                   <span className="material-symbols-outlined text-slate-200 text-5xl">image</span>
                </div>
                <div className="p-5">
                  <h4 className="font-black text-lg text-slate-gray">Draft: Ladakh 2024</h4>
                  <p className="text-xs text-slate-400 mt-1 font-bold">Planning mountain trek</p>
                  <div className="mt-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-black tracking-widest uppercase rounded-lg">DRAFT</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Community Adventures Section */}
        <section className="mt-8 px-6 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-gray tracking-tight">Community Adventures</h2>
            <div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl cursor-pointer">
              <span className="text-xs font-black uppercase tracking-widest">Trending</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </div>
          </div>

          <div className="space-y-8">
            {allAdventures.map((trip) => (
              <div 
                key={trip.id}
                onClick={() => onSelectTrip?.(trip)}
                className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm group cursor-pointer animate-in zoom-in-95 duration-500"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <img 
                    alt={trip.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={trip.imageUrl}
                  />
                  <div className="absolute top-5 left-5">
                    <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-sm p-1.5 pr-4 rounded-full shadow-lg">
                      <img alt="Host" className="size-8 rounded-full border-2 border-white shadow-sm" src={`https://i.pravatar.cc/100?u=${trip.id}`} />
                      <span className="text-xs font-black text-slate-gray">Host: {trip.id.startsWith('user') ? 'You' : 'Aarav'}</span>
                    </div>
                  </div>
                  <button 
                    className="absolute top-5 right-5 size-11 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-gray shadow-lg active:scale-90 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart size={22} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                  </button>
                  {trip.id.startsWith('ind') && (
                    <div className="absolute bottom-5 left-5 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      Community Pick
                    </div>
                  )}
                </div>
                <div className="p-7">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-gray tracking-tight leading-tight">{trip.name}</h3>
                      <div className="flex items-center gap-2 text-slate-400 text-sm mt-2 font-bold">
                        <span className="material-symbols-outlined text-[18px]">group</span>
                        <span>{trip.maxGroupSize || trip.groupSize} slots • {trip.id.startsWith('user') ? '0' : '5'} joined</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {trip.price && <p className="text-primary font-black text-3xl tracking-tighter">₹{trip.price.toLocaleString()}</p>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5 mt-6">
                    {trip.activities ? trip.activities.map(act => (
                       <span key={act} className="px-4 py-2 bg-slate-50 text-[11px] font-black text-slate-600 tracking-wider uppercase rounded-xl">{act}</span>
                    )) : (
                      <>
                        <span className="px-4 py-2 bg-slate-50 text-[11px] font-black text-slate-600 tracking-wider uppercase rounded-xl">🏮 Culture</span>
                        <span className="px-4 py-2 bg-slate-50 text-[11px] font-black text-slate-600 tracking-wider uppercase rounded-xl">🕉️ Spiritual</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommunityAdventuresScreen;