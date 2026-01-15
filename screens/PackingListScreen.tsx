
import React, { useState } from 'react';

interface PackingListScreenProps {
  onBack: () => void;
  tripName?: string;
}

interface PackingItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  assignee?: string;
  quantity: number;
}

const PackingListScreen: React.FC<PackingListScreenProps> = ({ onBack, tripName }) => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Essentials');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemAssignee, setNewItemAssignee] = useState('Myself');

  const [items, setItems] = useState<PackingItem[]>([
    { id: '1', name: 'Passport & ID', category: 'Essentials', checked: true, quantity: 1 },
    { id: '2', name: 'Travel Insurance', category: 'Essentials', checked: true, quantity: 1 },
    { id: '3', name: 'First-aid kit', category: 'Essentials', checked: false, assignee: 'Sarah', quantity: 1 },
    { id: '4', name: 'Rain Jacket (Hard shell)', category: 'Clothing', checked: false, quantity: 1 },
    { id: '5', name: 'Hiking Boots', category: 'Clothing', checked: false, quantity: 1 },
    { id: '6', name: 'Portable Speaker', category: 'Electronics', checked: false, assignee: 'Mike', quantity: 1 },
    { id: '7', name: 'Printed Road Map', category: 'Navigation', checked: false, quantity: 1 },
  ]);

  const categories = ['Essentials', 'Clothing', 'Electronics', 'Activities', 'Navigation'];
  
  const checkedCount = items.filter(i => i.checked).length;
  const progress = Math.round((checkedCount / items.length) * 100);

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleSaveItem = () => {
    if (!newItemName.trim()) return;
    const newItem: PackingItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: newItemCategory,
      checked: false,
      assignee: newItemAssignee === 'Myself' ? undefined : newItemAssignee,
      quantity: newItemQuantity
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemCategory('Essentials');
    setNewItemQuantity(1);
    setNewItemAssignee('Myself');
    setShowAddItem(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#f1f2f4] font-body animate-in slide-in-from-right duration-300 overflow-hidden text-slate-gray">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center justify-center size-10 rounded-full active:scale-90 transition-transform">
              <span className="material-symbols-outlined font-black">arrow_back</span>
            </button>
            <h2 className="text-xl font-black tracking-tight">{tripName || 'Jaipur Trip'}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="size-8 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-[10px] font-black text-white">S</div>
              <div className="size-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-black text-white">ME</div>
              <div className="size-8 rounded-full border-2 border-white bg-[#d9a14d] flex items-center justify-center text-[10px] font-black text-white">M</div>
            </div>
            <button className="flex items-center justify-center size-10 rounded-full bg-slate-50 border border-slate-100">
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-black font-display">Packing List</h1>
              <p className="text-slate-400 font-bold text-sm">Real-time group sync active</p>
            </div>
            <div className="text-right">
              <span className="text-primary text-2xl font-black">{progress}%</span>
              <p className="text-slate-400 font-bold text-xs">{checkedCount} of {items.length} items</p>
            </div>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Destination Insight Card */}
        <div className="px-6 py-2">
          <div className="relative overflow-hidden flex flex-col gap-4 rounded-[28px] bg-slate-900 p-7 shadow-xl">
            <div className="flex justify-between items-start">
              <div className="z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">cloudy_snowing</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Destination Insight</span>
                </div>
                <h3 className="text-white text-xl font-black leading-tight tracking-tight">Vibrant weather in Jaipur</h3>
                <p className="text-slate-400 text-sm mt-2 max-w-[220px] font-medium leading-relaxed">It's sunny! Don't forget breathable cottons and sunglasses for the fort visits.</p>
              </div>
              <div className="absolute -right-6 -top-6 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[140px] text-white">wb_sunny</span>
              </div>
            </div>
            <button className="z-10 flex items-center justify-center rounded-2xl h-12 px-6 bg-primary/20 hover:bg-primary/30 text-primary gap-2 text-sm font-black transition-all w-fit">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>Add suggested gear</span>
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="px-6 pt-10">
          <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6 ml-1">Categories</h3>
          <div className="flex flex-col gap-4">
            {categories.map(cat => (
              <details key={cat} className="flex flex-col rounded-[28px] bg-white border border-slate-50 overflow-hidden group shadow-sm" open={cat === 'Essentials' || cat === 'Navigation'}>
                <summary className="flex cursor-pointer items-center justify-between p-6 list-none active:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`size-11 rounded-2xl flex items-center justify-center ${
                      cat === 'Essentials' ? 'bg-primary/10 text-primary' : 
                      cat === 'Clothing' ? 'bg-blue-50 text-blue-500' : 
                      cat === 'Electronics' ? 'bg-purple-50 text-purple-500' : 
                      cat === 'Activities' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'
                    }`}>
                      <span className="material-symbols-outlined text-[24px] filled-icon">
                        {cat === 'Essentials' ? 'fact_check' : cat === 'Clothing' ? 'apparel' : cat === 'Electronics' ? 'devices' : cat === 'Activities' ? 'kayaking' : 'map'}
                      </span>
                    </div>
                    <span className="text-slate-gray font-black text-base">{cat}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-open:rotate-180 transition-transform font-black">expand_more</span>
                </summary>
                <div className="px-6 pb-6 flex flex-col gap-5 border-t border-slate-50 pt-6">
                  {items.filter(i => i.category === cat).map(item => (
                    <label key={item.id} className="flex items-center justify-between group/item cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center">
                          <input 
                            type="checkbox"
                            checked={item.checked} 
                            onChange={() => toggleItem(item.id)}
                            className="size-6 rounded-lg border-2 border-slate-100 bg-transparent text-primary focus:ring-primary focus:ring-offset-0 transition-all checked:border-primary" 
                          />
                        </div>
                        <span className={`text-[15px] font-black transition-all ${item.checked ? 'text-slate-300 line-through decoration-primary/30' : 'text-slate-gray'}`}>
                          {item.name} {item.quantity > 1 && <span className="text-[10px] text-slate-300 ml-1">x{item.quantity}</span>}
                        </span>
                      </div>
                      {item.assignee && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d9a14d]/5 border border-[#d9a14d]/20">
                          <div className="size-5 rounded-full bg-[#d9a14d] flex items-center justify-center text-[9px] font-black text-white">{item.assignee[0]}</div>
                          <span className="text-[9px] font-black text-[#d9a14d] uppercase tracking-wider">{item.assignee}'s bringing</span>
                        </div>
                      )}
                    </label>
                  ))}
                  {items.filter(i => i.category === cat).length === 0 && (
                    <p className="text-slate-300 text-xs font-bold italic ml-1">No items added yet</p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowAddItem(true)}
        className="fixed bottom-8 right-8 size-16 bg-primary text-white rounded-[24px] shadow-2xl shadow-primary/40 flex items-center justify-center transition-all active:scale-90 z-40"
      >
        <span className="material-symbols-outlined text-[32px] font-black">add</span>
      </button>

      {/* Add New Item Modal View */}
      {showAddItem && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-bottom duration-400">
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shrink-0">
            <div className="flex items-center justify-between px-6 h-20 max-w-md mx-auto">
              <button onClick={() => setShowAddItem(false)} className="flex items-center justify-center size-11 rounded-full text-slate-gray active:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined font-black">close</span>
              </button>
              <h2 className="text-xl font-black tracking-tight font-display">Add New Item</h2>
              <button 
                onClick={handleSaveItem}
                className="text-primary font-black text-base px-5 py-2.5 bg-primary/10 rounded-full transition-all active:scale-95"
              >
                Save
              </button>
            </div>
          </header>
          
          <main className="flex-1 max-w-md mx-auto w-full px-8 py-10 overflow-y-auto no-scrollbar">
            <div className="space-y-12">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-1">Item Name</label>
                <input 
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full text-2xl font-black border-0 border-b-2 border-slate-100 focus:border-primary focus:ring-0 px-1 py-4 bg-transparent transition-colors placeholder:text-slate-100 text-slate-gray outline-none" 
                  placeholder="e.g. Navigation Map" 
                  type="text"
                  autoFocus
                />
              </div>

              <div className="space-y-5">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-1">Category</label>
                <div className="flex flex-wrap gap-2.5">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setNewItemCategory(cat)}
                      className={`px-6 py-3 rounded-full border-2 transition-all text-sm font-black ${newItemCategory === cat ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' : 'bg-white text-slate-400 border-slate-100 hover:border-primary/20'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8 pt-4">
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[28px] border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined filled-icon">group</span>
                    </div>
                    <div>
                      <p className="font-black text-slate-gray text-base leading-none">Shared Item</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-wide">Others can see this</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox"/>
                    <div className="w-14 h-8 bg-slate-200 rounded-full peer-checked:bg-primary transition-all p-1">
                      <div className="size-6 bg-white rounded-full transition-all translate-x-0 peer-checked:translate-x-6 shadow-md"></div>
                    </div>
                  </label>
                </div>

                <div className="px-1 space-y-3">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] ml-1">Assign to someone</label>
                  <div className="relative">
                    <select 
                      value={newItemAssignee}
                      onChange={(e) => setNewItemAssignee(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-[24px] px-6 py-4 appearance-none focus:ring-4 focus:ring-primary/10 text-slate-gray font-black text-base outline-none cursor-pointer"
                    >
                      <option value="Myself">Myself</option>
                      <option value="Sarah">Sarah</option>
                      <option value="Mike">Mike</option>
                      <option value="Unassigned">Unassigned</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                      <span className="material-symbols-outlined font-black">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center">
                      <span className="material-symbols-outlined filled-icon">inventory_2</span>
                    </div>
                    <span className="font-black text-slate-gray text-base">Quantity</span>
                  </div>
                  <div className="flex items-center gap-5 bg-slate-50 rounded-full p-1.5 border border-slate-100 shadow-inner">
                    <button 
                      onClick={() => setNewItemQuantity(Math.max(1, newItemQuantity - 1))}
                      className="size-10 flex items-center justify-center bg-white rounded-full shadow-sm text-slate-gray active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-lg font-black">remove</span>
                    </button>
                    <span className="font-black text-xl min-w-[24px] text-center text-slate-gray">{newItemQuantity}</span>
                    <button 
                      onClick={() => setNewItemQuantity(newItemQuantity + 1)}
                      className="size-10 flex items-center justify-center bg-primary text-white rounded-full shadow-md active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-lg font-black">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          
          <footer className="p-10 pb-12 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">
            Tap Save to update list
          </footer>
        </div>
      )}
    </div>
  );
};

export default PackingListScreen;
