'use client';

import { useState } from 'react';
import { restockMaterial } from '../app/actions/materialActions';
import { PlusCircle, X, Save } from 'lucide-react';

interface Props {
  id: string;
  name: string;
  unit: string;
}

export default function RestockButton({ id, name, unit }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi wrapper agar popup menutup setelah simpan
  const handleRestock = async (formData: FormData) => {
    await restockMaterial(formData);
    setIsOpen(false); // Tutup popup
  };

  return (
    <div className="relative">
      {/* 1. Tombol Pemicu (Trigger) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-bold bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors"
      >
        <PlusCircle size={16} /> Restock
      </button>

      {/* 2. Popup Modal (Muncul saat isOpen = true) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Header Popup */}
            <div className="bg-slate-50 p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Barang Masuk</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500">
                <X size={20} />
              </button>
            </div>

            {/* Form Restock */}
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-4">
                Menambah stok untuk: <br/>
                <strong className="text-lg text-slate-900">{name}</strong>
              </p>

              <form action={handleRestock}>
                <input type="hidden" name="id" value={id} />
                
                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jumlah Masuk ({unit})</label>
                  <input 
                    name="quantity" 
                    type="number" 
                    min="1"
                    autoFocus
                    placeholder="Contoh: 100" 
                    className="w-full border border-blue-300 p-3 rounded-lg text-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                    required 
                  />
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-lg"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2"
                  >
                    <Save size={18} /> Simpan
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}