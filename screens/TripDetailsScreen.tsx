
import React from 'react';

interface TripDetailsScreenProps {
  trip: any;
  onBack: () => void;
  onEnroll?: (trip: any) => void;
  isLoggedIn?: boolean;
  onStartAuth?: () => void;
}

const TripDetailsScreen: React.FC<TripDetailsScreenProps> = ({ 
  trip, 
  onBack, 
  onEnroll,
  isLoggedIn = false,
  onStartAuth
}) => {
  if (!trip) return null;

  const handleEnrollClick = () => {
    if (isLoggedIn) {
      onEnroll?.(trip);
    } else {
      onStartAuth?.();
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#101818] dark:text-white transition-colors duration-200 min-h-screen relative animate-in slide-in-from-bottom duration-500">
      {/* Top App Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#0000000a] dark:border-[#ffffff1a] max-w-[450px] mx-auto">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 active:scale-90 transition-all">
               <span className="material-symbols-outlined text-slate-gray">arrow_back</span>
            </button>
            <h2 className="text-lg font-black leading-tight tracking-tight">{trip.name}</h2>
          </div>
          <div className="flex gap-4">
            <span className="material-symbols-outlined cursor-pointer hover:text-red-500 transition-colors">favorite</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">share</span>
          </div>
        </div>
      </div>

      <main className="pb-40 pt-16 no-scrollbar overflow-y-auto h-full">
        {/* Hero Header */}
        <div className="px-4 py-3">
          <div 
            className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-[40px] min-h-[440px] shadow-2xl" 
            style={{ 
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%), url("${trip.imageUrl}")` 
            }}
          >
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  {trip.category || 'Spiritual'}
                </span>
                <span className="bg-[#FFBF00] px-4 py-1.5 rounded-full text-black text-[10px] font-black uppercase tracking-[0.2em]">
                  Highly Rated
                </span>
              </div>
              <h1 className="text-white text-3xl font-black leading-tight tracking-tight font-display">
                {trip.name}
              </h1>
              <div className="flex items-center gap-1.5 mt-3 text-white/90">
                <span className="material-symbols-outlined text-[18px] filled-icon">location_on</span>
                <p className="text-sm font-black tracking-wide">{trip.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Stats */}
        <div className="flex gap-4 px-6 py-4 overflow-x-auto no-scrollbar">
          <div className="flex-1 min-w-[120px] flex flex-col items-center gap-1.5 rounded-[28px] p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
            <span className="material-symbols-outlined text-primary text-[28px] filled-icon">calendar_today</span>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Duration</p>
            <p className="text-base font-black text-slate-900 dark:text-white">{trip.days} Days</p>
          </div>
          <div className="flex-1 min-w-[120px] flex flex-col items-center gap-1.5 rounded-[28px] p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
            <span className="material-symbols-outlined text-primary text-[28px] filled-icon">payments</span>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Price</p>
            <p className="text-base font-black text-slate-900 dark:text-white">₹{trip.price || '1,200'}</p>
          </div>
          <div className="flex-1 min-w-[120px] flex flex-col items-center gap-1.5 rounded-[28px] p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
            <span className="material-symbols-outlined text-primary text-[28px] filled-icon">group</span>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em]">Group Size</p>
            <p className="text-base font-black text-slate-900 dark:text-white">{trip.groupSize || '10'} Max</p>
          </div>
        </div>

        {/* Group Vibe Section */}
        <div className="px-6 pt-6">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-[32px] p-8 border-2 border-dashed border-primary/20 relative overflow-hidden">
             <div className="absolute -top-10 -right-10 size-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">The Vibe Check</h2>
                <p className="text-sm text-slate-500 font-bold mt-1">Compatibility based on your profile</p>
              </div>
              <div className="bg-primary text-white font-black text-xl px-4 py-2 rounded-2xl shadow-lg shadow-primary/20">
                {trip.matchScore || '94'}%
              </div>
            </div>
            
            <div className="flex items-center gap-5 mb-6 relative z-10">
              <div className="flex -space-x-4">
                {[1,2,3].map(i => (
                  <img 
                    key={i}
                    alt="Avatar" 
                    className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-sm" 
                    src={`https://i.pravatar.cc/150?u=${trip.id}${i}`}
                  />
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[12px] font-black text-slate-400">
                  +5
                </div>
              </div>
              <p className="text-xs font-black text-primary tracking-wide">8 members already joined</p>
            </div>
            
            <div className="flex flex-wrap gap-2.5 relative z-10">
              <span className="bg-[#FF7043]/10 text-[#FF7043] border border-[#FF7043]/20 px-4 py-2 rounded-xl text-[11px] font-black tracking-wider uppercase">Yoga Enthusiasts</span>
              <span className="bg-[#FF7043]/10 text-[#FF7043] border border-[#FF7043]/20 px-4 py-2 rounded-xl text-[11px] font-black tracking-wider uppercase">Adventure Seekers</span>
              <span className="bg-[#FF7043]/10 text-[#FF7043] border border-[#FF7043]/20 px-4 py-2 rounded-xl text-[11px] font-black tracking-wider uppercase">Zen Vibes</span>
            </div>
          </div>
        </div>

        {/* Itinerary Header */}
        <h2 className="px-8 pb-4 pt-10 text-[24px] font-black leading-tight tracking-tight text-slate-900 dark:text-white font-display">The Journey</h2>
        
        {/* Itinerary Cards */}
        <div className="px-6 space-y-6">
          {/* Day 1 */}
          <div className="relative pl-10 group">
            <div className="absolute left-4 top-2 bottom-0 w-[2px] bg-primary/10 group-last:bottom-auto group-last:h-4"></div>
            <div className="absolute left-1.5 top-2 size-5 rounded-full border-4 border-background-light dark:border-background-dark bg-primary z-10 shadow-sm"></div>
            
            <div className="bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden shadow-sm border border-slate-50 dark:border-slate-700 transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer">
              <div className="flex p-5 gap-5">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-50">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdWVfIUKzcGsES41tQ8F5VEkTKnwB5eAvkZMEgG7eOxhp5bM9gkO64EakK7H_yfyEG2zIJYfeRC6DVbkbnhtEMg9wH24gHR0rTX5_UEc8eYDjoiCN3BlW_fvSxC19bfdM5F1wqRQN6QBidU-4BnX3C9LS5g_L46gmpbtcYGpioKJnEa9vSh_z-TK20L-9VpQMGSWNCPiuQLKgJ0K3ibGhqKB_OIj2qZ5w1vRixfO9M0nXdXr5cDKEVqjY-Hwse6G_u5AZ7NzmMqw" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Day 1</p>
                    <span className="material-symbols-outlined text-slate-300 text-[18px]">expand_more</span>
                  </div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white mb-1 leading-tight tracking-tight">Arrival & Ritual</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">Check-in to our boutique villa and enjoy a welcome circle with refreshments.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="relative pl-10 group">
            <div className="absolute left-4 top-2 bottom-0 w-[2px] bg-primary/10"></div>
            <div className="absolute left-1.5 top-2 size-5 rounded-full border-4 border-background-light dark:border-background-dark bg-primary z-10 shadow-sm"></div>
            
            <div className="bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden shadow-sm border border-slate-50 dark:border-slate-700 transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer">
              <div className="flex p-5 gap-5">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-50">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEy1p8mB3eT5b23zvoNwH71_kwWsOqBw_Cdrv9qoG9Li6rNJgm4ldiog9EO9Axrxw1K4q_8pbemPtk9H6n60_0bPk8cOR7GMY-li-mKouvCV9HwXW2Pe1mtLqG21DvNNJJL_0OetJZ6iSZxTD-Qt4yuTClJRMKn6xNdbhrrTSGX3k2NY6Ej3unYozNV6_TcprmMOSn7qVST4EG7SgOJyM6xq9ik5SdgLzE9ZlzHNk8sJDFa6vzOQzvoQlyD6zGXuWDilBPVB1RAw" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Day 2</p>
                    <span className="material-symbols-outlined text-slate-300 text-[18px]">expand_more</span>
                  </div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white mb-1 leading-tight tracking-tight">Temple Sacred Walk</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">Purification ceremony followed by a local lunch amidst the rice terraces.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Description */}
        <div className="p-10 pb-0">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight font-display">About the Location</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 italic font-medium">
            "{trip.country === 'Japan' ? 'Kyoto is the heart of Japanese culture, a city of 2,000 temples and shrines where the past lives on in the present.' : 'The rhythms of local life are set by the temple bells and the scent of jasmine fills the air in every garden.'}"
          </p>
          <div className="flex items-center gap-5 p-5 bg-white dark:bg-slate-800 rounded-[28px] border border-slate-50 dark:border-slate-700 shadow-sm">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[28px] filled-icon">map</span>
            </div>
            <div>
              <p className="text-base font-black text-slate-900 dark:text-white">{trip.name} Hub</p>
              <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">Centrally located district</p>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-2xl border-t border-slate-100 dark:border-slate-800 pb-10 pt-5 max-w-[450px] mx-auto">
        <div className="px-8 flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Price</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter font-display">₹{trip.price || '1,200'}</p>
          </div>
          <button 
            onClick={handleEnrollClick}
            className="flex-1 bg-primary hover:bg-teal-600 text-white font-black py-5 rounded-[24px] shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsScreen;
