import { PrismaClient } from '@prisma/client';
import { addProduct } from "../../../actions/productActions";
import { Package, Plus } from 'lucide-react';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'; 

export default async function ProductListPage() {
  // 1. AMBIL DATA (Tanpa orderBy createdAt dulu)
  const products = await prisma.product.findMany({
    include: {
      variants: true, 
    },
    // Kita hapus orderBy sementara karena kolom createdAt belum ada di schema
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Manajemen Stok Produk</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          Total Item: {products.length}
        </span>
      </div>

      {/* FORM INPUT TETAP SAMA */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h3 className="font-bold mb-4 text-lg flex items-center gap-2">
          <Plus size={18} /> Tambah Produk Baru
        </h3>
        
        <form action={addProduct} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Produk</label>
              <input name="name" type="text" placeholder="Contoh: Shuttlecock Gold" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kategori</label>
              <select name="category" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="MANUFACTURED">Shuttlecock (Produksi)</option>
                <option value="RETAIL">Sepatu (Retail)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
             <div>
              <label className="block text-sm font-medium mb-1">SKU (Kode)</label>
              <input name="sku" type="text" placeholder="SC-GOLD-01" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
              <input name="price" type="number" placeholder="120000" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stok Awal</label>
              <input name="stock" type="number" placeholder="100" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
          </div>

          <button type="submit" className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 w-full transition-colors">
            + Simpan ke Database
          </button>
        </form>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-sm text-gray-600">Nama Produk</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Kategori</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Harga Dasar</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Total Stok</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  <Package className="mx-auto mb-2 opacity-50" size={32} />
                  Belum ada data. Silakan input di atas.
                </td>
              </tr>
            ) : (
              // FIX: Menambahkan ': any' agar TypeScript tidak error
              products.map((product: any) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{product.name}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      product.type === 'MANUFACTURED' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {product.type === 'MANUFACTURED' ? 'Pabrik' : 'Retail'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">
                    Rp {product.basePrice.toLocaleString('id-ID')}
                  </td>
                  <td className="p-4 font-bold text-slate-800">
                    {/* FIX: Menambahkan tipe untuk acc dan curr */}
                    {product.variants.reduce((acc: number, curr: any) => acc + curr.stock, 0)} Pcs
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
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