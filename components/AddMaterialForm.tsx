'use client'; // Wajib ada karena kita pakai useState

import { useState } from 'react';
import { addMaterial } from '../app/actions/materialActions'; // Import server action
import { Layers, Plus, X } from 'lucide-react';

export default function AddMaterialForm() {
  const [isOpen, setIsOpen] = useState(false);

  // Wrapper agar form menutup otomatis setelah submit
  const handleSubmit = async (formData: FormData) => {
    await addMaterial(formData);
    setIsOpen(false); // Tutup form setelah simpan
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm mb-6"
      >
        <Plus size={18} /> Tambah Bahan Baru
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800">
          <Layers size={18} className="text-blue-600" /> Input Bahan Mentah
        </h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-red-500 transition-colors bg-gray-50 p-1 rounded-full hover:bg-red-50"
        >
          <X size={20} />
        </button>
      </div>

      <form action={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-slate-600">Nama Bahan</label>
          <input name="name" type="text" placeholder="Contoh: Bulu Angsa Grade A" className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-600">Satuan</label>
          <select name="unit" className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="Helai">Helai</option>
            <option value="Pcs">Pcs</option>
            <option value="Kg">Kg</option>
            <option value="Liter">Liter</option>
            <option value="Meter">Meter</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-600">Stok Awal</label>
          <input name="stock" type="number" placeholder="0" className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-slate-600">Alert Minimum Stok</label>
          <div className="flex gap-2 items-center">
             <input name="minStock" type="number" placeholder="100" className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
             <span className="text-xs text-gray-400">*Peringatan jika kurang</span>
          </div>
        </div>
        <button type="submit" className="col-span-2 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-all mt-2">
          Simpan Data
        </button>
      </form>
    </div>
  );
}