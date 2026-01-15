
import React, { useState } from 'react';

interface IdentityVerifyScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

const IdentityVerifyScreen: React.FC<IdentityVerifyScreenProps> = ({ onBack, onNext, onSkip }) => {
  const [selectedDoc, setSelectedDoc] = useState('Passport');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpload = () => {
    setShowSuccess(true);
  };

  return (
    <div className="bg-white font-display antialiased min-h-screen flex flex-col overflow-hidden text-slate-gray animate-in slide-in-from-right duration-300">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="size-20 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-5xl font-black">check</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Upload Successful</h3>
            <p className="text-slate-500 font-bold mb-8">We've received your document and will verify it shortly.</p>
            <button 
              onClick={onNext}
              className="w-full h-16 bg-primary text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all text-lg"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <header className="flex items-center justify-between p-4 z-10">
        <button onClick={onBack} className="flex size-11 items-center justify-center rounded-full hover:bg-slate-50 transition-colors text-slate-gray">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="size-11"></div>
      </header>
      
      <main className="flex-1 overflow-y-auto px-6 pb-8 flex flex-col items-center w-full max-w-lg mx-auto no-scrollbar">
        <div className="w-full flex flex-col items-center text-center py-6 mb-4">
          <div className="relative mb-6">
            <div className="relative flex items-center justify-center">
              <div className="bg-primary/10 p-5 rounded-3xl relative z-10 text-primary">
                <span className="material-symbols-outlined text-5xl">encrypted</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-gray mb-3 tracking-tight">Verify Your Identity</h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[280px] font-bold">
            Unlock the <span className="text-primary font-black">Highest Trust Level</span> within our community by confirming your government ID.
          </p>
        </div>

        <div className="w-full flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between px-1 mb-1">
            <p className="text-xs font-black uppercase tracking-widest text-slate-300">Select Document Type</p>
            <span className="material-symbols-outlined text-slate-300 text-[18px]">info</span>
          </div>
          
          {[
            { icon: 'book_2', title: 'Passport', desc: 'Recommended for global trips' },
            { icon: 'directions_car', title: "Driver's License", desc: 'Standard verification' },
            { icon: 'id_card', title: 'National ID Card', desc: 'Regional government ID' }
          ].map((doc) => {
            const isSelected = selectedDoc === doc.title;
            return (
              <div 
                key={doc.title} 
                onClick={() => setSelectedDoc(doc.title)} 
                className={`group relative flex items-center gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'bg-primary/5 border-primary' : 'bg-white border-slate-100 hover:border-primary/50'}`}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isSelected ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}>
                  <span className="material-symbols-outlined">{doc.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className={`text-base font-black ${isSelected ? 'text-primary' : 'text-slate-gray'}`}>{doc.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-bold">{doc.desc}</p>
                </div>
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary' : 'border-slate-200 bg-white'}`}>
                   {isSelected && <span className="material-symbols-outlined text-[14px] text-white font-black">check</span>}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="p-6 pt-2 bg-white flex flex-col gap-5 items-center z-20 w-full max-w-lg mx-auto">
        <button 
          onClick={handleUpload}
          className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black text-base rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">upload_file</span>
          Upload Document
        </button>
      </footer>
    </div>
  );
};

export default IdentityVerifyScreen;
