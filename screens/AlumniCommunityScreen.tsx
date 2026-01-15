
import React from 'react';

interface AlumniCommunityScreenProps {
  onBack: () => void;
}

const AlumniCommunityScreen: React.FC<AlumniCommunityScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-background-light font-body animate-in slide-in-from-right duration-300 overflow-hidden text-slate-gray">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-black/5 shrink-0">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 active:scale-90 transition-all text-slate-gray"
        >
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </button>
        <h1 className="text-lg font-black flex-1 text-center font-display tracking-tight text-slate-gray">Alumni Community</h1>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 text-slate-400">
          <span className="material-symbols-outlined font-black">settings</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-12">
        <div className="p-6">
          <div className="flex flex-col overflow-hidden rounded-[40px] shadow-lg bg-white border border-slate-50">
            <div className="w-full aspect-[16/9] relative">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCRBTCorXMqzn0q_tesJ8g_ZGlD6kAD3VaGpk4BTscJeKRS4SlqeR4KGDVFlnG2xXTZ54QZjT-Ldt8R9DzoE8n5vwVk83Ozi05WGvWJ4ttdXtWdd3GJK1VVbsTeyqbS5o9oSJkH_4Sa4x5pScDH75dGshcavY9_VIDmvVtog-aZ2LPlDXLxh3pHTQhFHtXyUgw556Sg16VEapETWuA6cfxDZeCq31JFj-Esg3XvE7h7vWz7mpAvkiTQbM4dqcWMacVQudq0RO97w" className="w-full h-full object-cover" alt="Alumni" />
              <div className="absolute top-5 right-5 bg-[#FF7043] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                Exclusive
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-gray font-display tracking-tight mb-2">Join Alumni Community</h2>
                <p className="text-slate-400 font-bold text-sm leading-relaxed">
                  The journey doesn't end here. Stay connected with your travel tribe and unlock lifetime perks.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: 'loyalty', text: '15% off all future expeditions' },
                  { icon: 'groups', text: 'Access to local meetup chapters' },
                  { icon: 'visibility', text: 'Early bird itinerary access' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-sm font-black text-slate-600">
                    <span className="material-symbols-outlined text-primary text-[20px] filled-icon">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <button className="w-full h-16 bg-primary hover:bg-teal-600 text-white rounded-[24px] font-black flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-primary/20">
                Join Now
                <span className="material-symbols-outlined text-[20px] font-black">bolt</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 pb-4 flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight font-display text-slate-gray">Recent Memories</h2>
          <button className="text-primary text-sm font-black uppercase tracking-widest">View All</button>
        </div>

        <div className="px-6 space-y-6">
          {[
            {
              name: 'Sarah Jenkins',
              meta: 'Post-Trip: Bali Expedition • 2h ago',
              text: "Missing these incredible views from last week in Bali! Already counting down until our next group reunion. Who's in? 🥥🌴",
              avatar: 'https://i.pravatar.cc/100?u=sarah',
              imgs: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuB12X5tmJhmRFt-uCR1P26prZcmwESVdISspe10RLgiqELpz8ASkbnnNUGnUqoiBVsyCufvTE-dUygKxE2QqFDbAiDiwycJ6951rk50Txmna2210jV7IUh4LjpARj2zOHIrmc9Sq3PCQc3FkarvAcqMk_GTIu3N05BuVMH3MSTCpQxQ_tAtMgkWHp7j9MK1TRPYnvnrfd35pwYTOIIYB-msyzgwr5OzVlB0-lGpxCFWLnzL4kj58w49rTyQXPdS1KUo4ka4XBSCEQ',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBOMAtQsFfOCc09prBki3HnFFXhfC4FhHiM7oY3Ed07Ht7ApIDS9zng3S4Voqb4ZLSxjKRUCnZOHO1Z684-Xvk7DRG4IyV4PZR8YOVzku8MtZs0kSx3nXEXu-O3_rbFuxXDcwu3llQR1UhwdT2MEcA1cmqZl5isfjHvUIEKpEbYUKXy3edBIuaQ1zC36vKHvem1FJIkfxg0oItVKsxEFfC1x-ogbveZHYlEMtC-DVHFn2YpSdxoltw_sBzo-iU2B-1UVyouH_FiPQ'
              ],
              likes: 24,
              comments: 8
            },
            {
              name: 'Marcus Chen',
              meta: 'Post-Trip: Tokyo Neon • 5h ago',
              text: 'Reunion brunch in NYC next weekend? Tagging everyone from the Tokyo group! 🍜 🍱',
              avatar: 'https://i.pravatar.cc/100?u=marcus',
              imgs: [],
              likes: 12,
              comments: 15
            }
          ].map((post, idx) => (
            <div key={idx} className="bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden p-6 space-y-4">
              <div className="flex items-center gap-4">
                <img src={post.avatar} className="size-11 rounded-full border-2 border-primary/20 shadow-sm" alt={post.name}/>
                <div className="flex-1">
                  <p className="text-sm font-black font-display text-slate-gray">{post.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{post.meta}</p>
                </div>
                <span className="material-symbols-outlined text-slate-200">more_horiz</span>
              </div>
              <p className="text-sm font-bold leading-relaxed text-slate-600">{post.text}</p>
              {post.imgs.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4 rounded-2xl overflow-hidden">
                  <img src={post.imgs[0]} className="aspect-square object-cover" />
                  <div className="grid grid-rows-2 gap-2">
                    <img src={post.imgs[1]} className="aspect-video object-cover rounded-tr-2xl" />
                    <div className="relative aspect-video rounded-br-2xl overflow-hidden">
                       <img src={post.imgs[1]} className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50" />
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white font-black">+2</span>
                       </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-slate-400 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[20px] text-[#FF7043] filled-icon">favorite</span>
                    <span className="text-xs font-black">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    <span className="text-xs font-black">{post.comments}</span>
                  </button>
                </div>
                <button className="text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AlumniCommunityScreen;
