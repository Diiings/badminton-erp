import { prisma } from '../../../../lib/prisma';
import { addIngredient, removeIngredient } from '../../../actions/recipeActions';
import { ChefHat, Trash2, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function RecipePage() {
  // 1. REVISI QUERY: Tambahkan "variants: true"
  const products = await prisma.product.findMany({
    where: { type: 'MANUFACTURED' },
    include: {
      variants: true, // <--- INI YANG TADI KETINGGALAN
      recipe: {
        include: {
          materials: {
            include: { material: true } 
          }
        }
      }
    }
  });

  // 2. Ambil Daftar Semua Bahan Baku
  const allMaterials = await prisma.rawMaterial.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-slate-800">Resep Produksi (Bill of Materials)</h2>
      <p className="text-gray-500 mb-8">Tentukan bahan baku apa saja yang dibutuhkan untuk membuat 1 unit produk.</p>

      <div className="grid grid-cols-1 gap-8">
        {products.map((product: any) => {
          // Ambil resep (jika ada)
          const currentRecipe = product.recipe[0]; 
          const ingredients = currentRecipe ? currentRecipe.materials : [];
          
          // Ambil SKU (Safety Check: jika varian kosong, tampilkan strip)
          const skuDisplay = product.variants && product.variants.length > 0 
            ? product.variants[0].sku 
            : '-';

          return (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* HEADER PRODUK */}
              <div className="bg-slate-50 p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <ChefHat size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{product.name}</h3>
                    <p className="text-xs text-gray-500">SKU: {skuDisplay}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded">
                    Resep per 1 Unit (Slop/Pcs)
                  </span>
                </div>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-8">
                {/* KOLOM KIRI: KOMPOSISI */}
                <div>
                  <h4 className="font-bold text-sm text-gray-700 mb-3 uppercase tracking-wider">Komposisi Saat Ini:</h4>
                  {ingredients.length === 0 ? (
                    <p className="text-sm text-red-500 italic bg-red-50 p-3 rounded border border-red-100">
                      Belum ada bahan. Produk ini tidak bisa diproduksi otomatis.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {ingredients.map((item: any) => (
                        <li key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                          <span className="font-medium text-slate-700">
                            {item.quantityNeeded} {item.material.unit} — {item.material.name}
                          </span>
                          {/* Tombol Hapus Bahan */}
                          <form action={async () => {
                            'use server';
                            await removeIngredient(item.id);
                          }}>
                            <button className="text-red-400 hover:text-red-600 p-1 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </form>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* KOLOM KANAN: FORM TAMBAH */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 h-fit">
                  <h4 className="font-bold text-sm text-blue-800 mb-3">Tambah Bahan Baku:</h4>
                  <form action={addIngredient} className="space-y-3">
                    <input type="hidden" name="productId" value={product.id} />
                    
                    <div>
                      <select name="materialId" className="w-full text-sm border border-blue-200 p-2 rounded focus:outline-blue-500 bg-white">
                        {allMaterials.map((m: any) => (
                          <option key={m.id} value={m.id}>
                            {m.name} (Sisa: {m.stock} {m.unit})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex gap-2">
                      <input 
                        name="quantity" 
                        type="number" 
                        placeholder="Jml" 
                        className="w-20 text-sm border border-blue-200 p-2 rounded focus:outline-blue-500" 
                        required 
                      />
                      <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors">
                        <Plus size={16} /> Tambah
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
        
        {products.length === 0 && (
           <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
             <p className="text-gray-500">Belum ada produk tipe "MANUFACTURED" (Pabrik). <br/>Silakan tambah produk Shuttlecock dulu di menu Stok Barang.</p>
           </div>
        )}
      </div>
    </div>
  );
}