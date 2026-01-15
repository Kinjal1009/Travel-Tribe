
import React, { useState } from 'react';

interface SafetySetupScreenProps {
  onBack: () => void;
  onSave: (data: { name: string; relationship: string; phone: string }) => void;
  initialData?: { name: string; relationship: string; phone: string };
}

const SafetySetupScreen: React.FC<SafetySetupScreenProps> = ({ onBack, onSave, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [relationship, setRelationship] = useState(initialData?.relationship || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [shareLocation, setShareLocation] = useState(false);
  const [enableSOS, setEnableSOS] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (val.length <= 10) {
      setPhone(val);
    }
  };

  const handleSave = () => {
    if (phone.length === 10) {
      setShowPopup(true);
      setTimeout(() => {
        onSave({ name, relationship, phone });
      }, 1500);
    }
  };

  const isFormValid = phone.length === 10 && name.trim().length > 0;

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light animate-in slide-in-from-right duration-300 text-slate-gray">
      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[30px] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full bg-white rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="size-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl filled-icon">check_circle</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Successfully saved</h3>
            <p className="text-slate-500 font-bold">Your safety preferences have been updated.</p>
          </div>
        </div>
      )}

      {/* Top App Bar */}
      <nav className="sticky top-0 z-50 flex items-center bg-background-light/95 backdrop-blur-md px-[30px] py-4 justify-between border-b border-gray-100">
        <button 
          onClick={onBack}
          className="flex size-11 shrink-0 items-center justify-center -ml-2 rounded-full hover:bg-gray-100 cursor-pointer active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-slate-gray">arrow_back</span>
        </button>
        <h2 className="text-slate-gray text-lg font-black leading-tight tracking-tight flex-1 text-center font-display">Safety Setup</h2>
        <div className="w-11"></div>
      </nav>

      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* Header Text */}
        <header className="px-[30px] pt-6 pb-4">
          <p className="text-slate-gray/50 text-base font-bold leading-relaxed">
            We prioritize your trust. Add a contact we can reach if something unexpected happens.
          </p>
        </header>

        {/* Content Sections */}
        <section className="px-[30px] space-y-6">
          {/* Trusted Contact Card */}
          <div className="bg-white p-6 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 text-primary p-2.5 rounded-2xl">
                <span className="material-symbols-outlined text-[22px] filled-icon">shield_person</span>
              </div>
              <h3 className="text-lg font-black text-slate-gray font-display">Trusted Contact</h3>
            </div>

            <label className="flex flex-col w-full">
              <p className="text-slate-gray text-[10px] font-black uppercase tracking-[0.2em] pb-2 ml-1 opacity-40">Full Name</p>
              <div className="relative flex items-center">
                <span className="absolute left-4 material-symbols-outlined text-slate-200 text-[20px]">person</span>
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input flex w-full rounded-2xl text-slate-gray border border-slate-100 bg-white h-14 placeholder:text-slate-200 pl-12 pr-4 text-base font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                  placeholder="Full Name" 
                  type="text" 
                />
              </div>
            </label>

            <label className="flex flex-col w-full">
              <p className="text-slate-gray text-[10px] font-black uppercase tracking-[0.2em] pb-2 ml-1 opacity-40">Relationship</p>
              <div className="relative flex items-center">
                <span className="absolute left-4 material-symbols-outlined text-slate-200 text-[20px]">favorite</span>
                <input 
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="form-input flex w-full rounded-2xl text-slate-gray border border-slate-100 bg-white h-14 placeholder:text-slate-200 pl-12 px-5 text-base font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                  placeholder="e.g. Partner, Parent, Friend" 
                  type="text" 
                />
              </div>
            </label>

            <label className="flex flex-col w-full">
              <p className="text-slate-gray text-[10px] font-black uppercase tracking-[0.2em] pb-2 ml-1 opacity-40">Phone Number</p>
              <div className="relative flex items-center">
                <div className="absolute left-4 flex items-center gap-1 border-r border-slate-100 pr-3 mr-3 h-6">
                  <span className="text-sm font-black text-slate-gray">+91</span>
                  <span className="material-symbols-outlined text-[16px] text-slate-300">expand_more</span>
                </div>
                <input 
                  value={phone}
                  onChange={handlePhoneChange}
                  className="form-input flex w-full rounded-2xl text-slate-gray border border-slate-100 bg-white h-14 placeholder:text-slate-200 pl-24 px-5 text-base font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                  placeholder="10 digit number" 
                  type="tel" 
                />
              </div>
              {phone.length > 0 && phone.length < 10 && (
                <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">Phone number must be exactly 10 digits</p>
              )}
            </label>

            <button className="flex items-center justify-center gap-2 w-full py-4 text-primary border border-dashed border-primary/30 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary/5 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add another contact
            </button>
          </div>

          {/* Safety Features */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-black text-slate-gray font-display px-1">Safety Features</h3>
            <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-50 divide-y divide-slate-50">
              {/* Feature 1: Share Location */}
              <div className="p-6 flex items-start gap-4">
                <div className="bg-blue-50 text-blue-500 p-2.5 rounded-2xl shrink-0">
                  <span className="material-symbols-outlined text-[22px]">location_on</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-base font-black text-slate-gray">Share Live Location</p>
                    <button 
                      onClick={() => setShareLocation(!shareLocation)}
                      className={`relative flex h-6 w-11 cursor-pointer items-center rounded-full p-1 transition-colors ${shareLocation ? 'bg-primary' : 'bg-slate-200'}`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${shareLocation ? 'translate-x-5' : ''}`}></div>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold leading-normal">
                    Automatically share your location with trusted contacts during active trips.
                  </p>
                </div>
              </div>
              {/* Feature 2: SOS */}
              <div className="p-6 flex items-start gap-4">
                <div className="bg-red-50 text-red-500 p-2.5 rounded-2xl shrink-0">
                  <span className="material-symbols-outlined text-[22px]">sos</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-base font-black text-slate-gray">Enable SOS Button</p>
                    <button 
                      onClick={() => setEnableSOS(!enableSOS)}
                      className={`relative flex h-6 w-11 cursor-pointer items-center rounded-full p-1 transition-colors ${enableSOS ? 'bg-primary' : 'bg-slate-200'}`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${enableSOS ? 'translate-x-5' : ''}`}></div>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold leading-normal">
                    Adds a quick-access emergency button to your home screen dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md px-[30px] py-6 border-t border-slate-50 max-w-[450px] mx-auto z-50">
        <button 
          onClick={handleSave}
          disabled={!isFormValid}
          className={`w-full font-black h-16 rounded-[20px] shadow-xl transition-all flex items-center justify-center active:scale-[0.98] text-lg ${isFormValid ? 'bg-primary text-white shadow-primary/20' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
        >
          Save Safety Preferences
        </button>
      </footer>
    </div>
  );
};

export default SafetySetupScreen;
