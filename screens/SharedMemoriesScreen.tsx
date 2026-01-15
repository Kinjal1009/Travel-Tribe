
import React from 'react';

interface SharedMemoriesScreenProps {
  onBack: () => void;
}

const SharedMemoriesScreen: React.FC<SharedMemoriesScreenProps> = ({ onBack }) => {
  const images = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA6iFw0FntI1Y3azzbgfVxSaUlGPBA5m-alLzIB2_mi4KQ8fjH02FDTdL6DH0ozY6uQ6e2zBT3rpXHLcY_p50LPGDdZoEDn4TSDVL8igpwKNOOOsrL2kyJxTJ8VglcsFmr4XVh5CwuNtz_jDnFFfmCsoQNmK29YPnXAymFSmDhz4Z1bO-IED6uV_2wpGwk4auSDu9NOAcJVLX2zcFDIiGOVG3pBh-3J-9TCNhvFr7fLZUNs2V0TZORPW3AHbMa5t5Zt9XqQepBaug',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA2-RbGHhByOtf8iTRPkqFVmT6td14pzbePsSOUfSRdbfQhVPfByd_zGpoR7ytWnMNh_F5xKKdJ8DGencNAvKah-PHH3Pkh3hMoE_adGVomQaEbbVLHTod2J8LGnhB8hYaub5-N9Cjfs63oIkwZujdnyaX0AO366KbDeSKE7zX3YpmY0AxwrEVCmen4aVPXxQ9AP9e05IgcmXikk9mKoiIntAsz0GoELsqihEtg7cNfVn4yEAHlQE1LVZhs92fcjrbZgdBqaIhq7Q',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC4pIaKdfTnzToNorOTnXvMlrrtjLYuPgPvY8B16ICyQU0N70_vDYENwq3S33x-dp9d5Er4u3XkT9FzQKcDVtHMj0gVDkM-ornDAitIUxqYmYwHytdTkM3KdTTFLBiUYZ3v34XSoLi09b7X-nlmmrXbPBqqrKco87VskQyJEeJAzGzpLCXokdnSS_qoZBBH9CtX5UKBvsMP85V_1ToDxeIJBlyLnXTeJvqZ5m7QJqioBPHQEoaaY7rD6EHmHLn2E3zM3gp5lHsvQA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdWmknYcfPqHEZRyxnu5Tsg0JXwr7p4rU4qaOnO1XHU9G3PgM2t-00M1TGWvATHAv7vVfoItT6WbgGaBnCXw1v3JNnT1-L8_aw03BSCQMbpmLYTzEl9JXKr3n07tAcZJhjY6RRm52fF4y6eJhDqm0tMqe2HrIf1a8vnrNy8OTupvHJjKKp401hdwTsnTfmKo4ePEOTwq3Gy3t5XJAtTSiU7c54Bjsk6KzaCQNiM1353k-4WaaPIHvYb-g2JbuVHd33lfTpPoH-vA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCd5WmmHoWEHyVlOxkHHBMFJx829zC_RaM0ZXwSZIAb-cA4WzTzX95VtA-_ebE8c6lGB9rpOtFTxc7SmG3QN-86BKEpgDMegL_S8h5kcyUE_b8Y0NJ99E9rYt-NG17tEPG6VN7pJ6dzrrVSOPTHUi0dkiU9xLfjFu5Jx8TO0MSiRJRZrrqaAtueUm2Mi-m18xrrVt4_vtyvmE52alK032SYCD2HpHoWHe708pTNyVWzaEL08s0UHjqT060lKiCtK65mxW93dy3WPw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCR9BAmUWukdsun3Yjjffbz4PyZmO38TqZn0ZCTOip042Gc4nFOByAzgWa8ykI11uEVSNYVp4ggORw-UU6APbFQkh6SIkUB0qHXeaABylF3YLTPOkP02HcM0oeXP_rEVGW-mbLTzEH8QgWky34ky_SRblvUGY8ak2PHLUwkSb8n-WKNQCLcczS0GynkaInGXJv8Xub82lH-rV1vqhaYA79aYyNdWdNC9Mi77xxojNNU9N5oCnvUiThL083xsHvmjpiijFdsY03e8A'
  ];

  return (
    <div className="flex flex-col h-full bg-background-light font-body animate-in slide-in-from-right duration-300 overflow-hidden text-slate-gray">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-black/5 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 active:scale-90 transition-all text-slate-gray">
            <span className="material-symbols-outlined font-black">arrow_back</span>
          </button>
          <h1 className="text-lg font-black tracking-tight font-display">Trip Memories</h1>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined cursor-pointer hover:text-primary">share</span>
          <span className="material-symbols-outlined cursor-pointer">more_horiz</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="px-4 py-4">
          <div className="relative overflow-hidden rounded-[32px] h-[260px] bg-cover bg-center group shadow-xl border-4 border-white" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDG43B7jhAzm23EJFqx9CCZ5dGY3t8ppKnf606E0ahc7fygzwEL25ICEIJMYhWxcWQEijl47mlCLcQtulMw8LerFvnzUOO9nyuyU9Tq_2axbj-gKR6jSYqcAcCNnXaCU4HNEDdXk07x8kR26AVbCIZj_vxiUS-CEgzY5untBqEEg6RgTWdlis2VPqeD3w8t_uPwjawv1c_XbYKPY6zvGxX2nXqk0wSLxR9w1yNwiuAWYY4uQII-j0b-_xKE2l0brlsCrEp2D9LanQ")` }}>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="px-3 py-1 bg-primary text-white text-[9px] font-[900] uppercase tracking-[0.2em] rounded-full">Shared Memory</span>
              <h2 className="text-white text-3xl font-black leading-tight mt-2 font-display">Summer in Amalfi</h2>
              <div className="flex items-center justify-between mt-3">
                <p className="text-white/80 text-xs font-bold">128 Photos • 5 Contributors</p>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => <div key={i} className="size-7 rounded-full border-2 border-white bg-slate-200 bg-cover" style={{backgroundImage: `url('https://i.pravatar.cc/100?u=u${i}')`}}></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 flex gap-3">
           <div className="flex-1 bg-white p-5 rounded-[24px] border border-slate-50 shadow-sm text-center">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">New Photos</p>
             <p className="text-2xl font-black text-primary">+14</p>
           </div>
           <div className="flex-1 bg-white p-5 rounded-[24px] border border-slate-50 shadow-sm text-center">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Storage</p>
             <p className="text-2xl font-black text-slate-gray">1.2GB</p>
           </div>
        </div>

        <div className="flex gap-8 px-8 border-b border-slate-50 mb-6 overflow-x-auto no-scrollbar">
          {['Feed', 'Albums', 'Highlights'].map((tab, idx) => (
            <button key={tab} className={`pb-4 text-xs font-[900] uppercase tracking-[0.1em] border-b-2 transition-all ${idx === 0 ? 'border-primary text-primary' : 'border-transparent text-slate-300'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="px-4 grid grid-cols-2 gap-3 pb-24">
          {images.map((src, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden shadow-sm aspect-[4/5] border border-slate-50 group active:scale-95 transition-all">
              <img src={src} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <p className="text-white text-[10px] font-black uppercase tracking-wider">Memory #{idx+1}</p>
              </div>
              <button className="absolute top-3 right-3 size-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                <span className="material-symbols-outlined text-sm">favorite</span>
              </button>
            </div>
          ))}
        </div>
      </main>

      <button className="fixed bottom-10 right-10 size-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center transition-all active:scale-90 z-40">
        <span className="material-symbols-outlined text-[32px] font-black">add_photo_alternate</span>
      </button>
    </div>
  );
};

export default SharedMemoriesScreen;
