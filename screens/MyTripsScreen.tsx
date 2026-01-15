
import React, { useState } from 'react';
import { RECOMMENDED_DESTINATIONS } from '../constants';
import { Destination } from '../types';

interface MyTripsScreenProps {
  onCreateTrip: () => void;
  onItineraryClick?: () => void;
  onChatClick?: () => void;
  onNotificationClick: () => void;
  onUpcomingTripClick: (trip: Destination) => void;
  profileImage?: string | null;
  bookedTrips: Destination[];
}

const MyTripsScreen: React.FC<MyTripsScreenProps> = ({ 
  onCreateTrip, 
  onItineraryClick, 
  onChatClick, 
  onNotificationClick, 
  onUpcomingTripClick,
  profileImage,
  bookedTrips 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const isButtonDisabled = searchQuery.trim().length === 0;

  return (
    <div className="flex flex-col h-full bg-background-light animate-in fade-in duration-500 font-display">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background-light/90 backdrop-blur-md px-6 pt-10 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full border-2 border-white bg-slate-100 shadow-sm flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url('${profileImage}')` }}
              ></div>
            ) : (
              <span className="material-symbols-outlined text-slate-300 text-[24px] filled-icon">person</span>
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Welcome back</p>
            <h1 className="text-lg font-black text-slate-gray leading-none">Alex Rivera</h1>
          </div>
        </div>
        <button 
          onClick={onNotificationClick}
          className="size-11 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-gray relative active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[24px]">notifications</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Start an Adventure Section */}
        <section className="px-6 pt-2">
          <div className="bg-white rounded-[40px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-50 relative">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 pr-4">
                <h2 className="text-[26px] font-black text-slate-gray tracking-tight leading-tight">Start an Adventure</h2>
                <p className="text-slate-400 text-sm font-bold mt-1 leading-snug">Plan your next destination and invite friends.</p>
              </div>
              <div className="bg-[#e0f7f7] size-14 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[36px] filled-icon">flight_takeoff</span>
              </div>
            </div>
            
            <div className="relative group mb-5">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[22px]">search</span>
              </div>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full h-16 pl-14 pr-5 bg-slate-50 border-none rounded-[24px] focus:ring-2 focus:ring-primary/20 text-base font-bold text-slate-gray placeholder:text-slate-300 transition-all" 
                placeholder="Search for a city, country..." 
                type="text"
              />
            </div>

            <button 
              onClick={onCreateTrip}
              disabled={isButtonDisabled}
              className={`w-full font-black h-16 rounded-[24px] transition-all flex items-center justify-center gap-3 text-base shadow-xl ${
                isButtonDisabled 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' 
                : 'bg-primary text-white shadow-primary/20 active:scale-[0.98]'
              }`}
            >
              <span className="material-symbols-outlined text-[24px] font-black">add_circle</span>
              Create a New Trip
            </button>
          </div>
        </section>

        {/* Active Journey Section */}
        <section className="mt-10">
          <div className="flex items-center justify-between px-8 mb-5">
            <h2 className="text-xl font-black text-slate-gray tracking-tight">Active Journey</h2>
            <div className="flex items-center gap-2 bg-[#e0f7f7] px-4 py-1.5 rounded-full">
              <span className="text-primary text-[10px] font-black uppercase tracking-widest">Live Status</span>
              <span className="size-2 bg-primary rounded-full"></span>
            </div>
          </div>
          
          <div className="px-6">
            <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-50">
              <div 
                className="relative h-64 w-full bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800')" }}
              >
                <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                  Currently Traveling
                </div>
                
                {/* Map Pin Card Overlay */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-3 rounded-[24px] shadow-lg border border-slate-100">
                  <div className="size-14 rounded-2xl bg-blue-50/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ 
                      backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', 
                      backgroundSize: '10px 10px' 
                    }}></div>
                    <span className="material-symbols-outlined text-primary text-[28px] filled-icon relative z-10">location_on</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-baseline mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-gray tracking-tight">Live in Jaipur</h3>
                    <p className="text-slate-400 text-[15px] font-bold mt-1">Rajasthan Royalty & Architecture</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900 font-black text-[17px]">Day 2 <span className="text-slate-300 font-bold ml-1">of 5</span></p>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-10 mt-2">
                  <div className="bg-primary h-full rounded-full w-[40%] transition-all duration-1000 ease-in-out"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={onItineraryClick}
                    className="flex items-center justify-center gap-3 h-16 rounded-[24px] bg-slate-50 text-slate-gray font-black text-base hover:bg-slate-100 transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[24px] text-primary">calendar_today</span>
                    Itinerary
                  </button>
                  <button 
                    onClick={onChatClick}
                    className="flex items-center justify-center gap-3 h-16 rounded-[24px] bg-slate-50 text-slate-gray font-black text-base hover:bg-slate-100 transition-all relative active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[24px] text-primary">chat</span>
                    Group Chat
                    <span className="absolute -top-1.5 -right-1.5 size-6 rounded-full bg-[#FF7043] text-[11px] text-white flex items-center justify-center font-black border-2 border-white">
                      5
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Trips Section */}
        {bookedTrips.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center justify-between px-8 mb-5">
              <h2 className="text-xl font-black text-slate-gray tracking-tight">Upcoming Trips</h2>
              <span className="text-primary text-[10px] font-black uppercase tracking-widest">{bookedTrips.length} Booked</span>
            </div>
            <div className="flex gap-5 overflow-x-auto no-scrollbar px-6 pb-4">
              {bookedTrips.map((trip) => (
                <div 
                  key={trip.id}
                  onClick={() => onUpcomingTripClick(trip)}
                  className="min-w-[280px] bg-white rounded-[32px] overflow-hidden shadow-md border border-slate-50 active:scale-[0.98] transition-all group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={trip.imageUrl} 
                      alt={trip.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg">
                      Confirmed
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-black text-slate-gray truncate">{trip.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{trip.country} • {trip.days} Days</p>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex -space-x-2">
                         {[1,2,3].map(i => <div key={i} className="size-7 rounded-full border-2 border-white bg-slate-100 bg-cover" style={{backgroundImage: `url('https://i.pravatar.cc/100?u=u${i}')`}}></div>)}
                      </div>
                      <span className="text-primary font-black text-sm">View Summary</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Explore More Trips Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between px-8 mb-6">
            <h2 className="text-xl font-black text-slate-gray tracking-tight">Explore more trip</h2>
            <button className="text-primary text-sm font-black flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
          
          <div className="flex gap-5 overflow-x-auto no-scrollbar px-6 pb-6">
            {RECOMMENDED_DESTINATIONS.map((dest) => (
              <div 
                key={dest.id}
                className="min-w-[280px] bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-50 group cursor-pointer active:scale-[0.98] transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={dest.imageUrl} 
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm border border-white/20">
                    <span className="material-symbols-outlined text-[#FFBF00] text-sm filled-icon">star</span>
                    <span className="text-[10px] font-black text-slate-gray">{dest.matchScore}% Vibe Match</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-black text-slate-gray truncate">{dest.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        <span className="text-[11px] font-bold uppercase tracking-wider">{dest.country}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Duration</p>
                      <div className="flex items-center gap-1 text-primary mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        <span className="text-xs font-black">{dest.days} Days</span>
                      </div>
                    </div>
                    <button className="size-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[24px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyTripsScreen;
