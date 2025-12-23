import { prisma } from '../../../../lib/prisma';
import AddMaterialForm from '../../../../components/AddMaterialForm'; // Import komponen baru
import RestockButton from '../../../../components/RestockButton';
import { AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MaterialPage() {
  const materials = await prisma.rawMaterial.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Gudang Bahan Baku</h2>

      {/* PANGGIL KOMPONEN FORM DI SINI */}
      <AddMaterialForm />

      {/* TABEL DATA (Tetap Sama) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-slate-600">Nama Bahan</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Stok Saat Ini</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
              <th className="p-4 text-sm font-semibold text-slate-600 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {materials.length === 0 ? (
              <tr><td colSpan={3} className="p-8 text-center text-gray-400">Belum ada bahan baku.</td></tr>
            ) : (
              materials.map((m: any) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{m.name}</td>
                  <td className="p-4 font-bold text-slate-800">
                    {m.stock} <span className="text-gray-500 font-normal text-sm">{m.unit}</span>
                  </td>
                  <td className="p-4">
                    {m.stock <= m.minStock ? (
                      <span className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-100 px-2 py-1 rounded-full w-fit">
                        <AlertTriangle size={12} /> Stok Menipis
                      </span>
                    ) : (
                      <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded-full">
                        Aman
                      </span>
                    )}
                  </td>

                  {/* --- TOMBOL RESTOCK DIPASANG DI SINI --- */}
                  <td className="p-4 text-right">
                    <div className="flex justify-end">
                      <RestockButton id={m.id} name={m.name} unit={m.unit} />
                    </div>
                  </td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}