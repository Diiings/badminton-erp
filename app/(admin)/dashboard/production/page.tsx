import { prisma } from '../../../../lib/prisma';
import { runProduction } from '../../../actions/productionActions';
import { Factory, ArrowRight, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProductionPage() {
  // Ambil produk yang punya resep saja
  const products = await prisma.product.findMany({
    where: { type: 'MANUFACTURED' },
    include: {
      variants: true,
      recipe: {
        include: {
          materials: { include: { material: true } }
        }
      }
    }
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
        <Factory /> Jalankan Produksi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product: any) => {
          const hasRecipe = product.recipe.length > 0 && product.recipe[0].materials.length > 0;

          return (
            <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">Stok Saat Ini: <span className="font-bold text-blue-600">{product.variants[0]?.stock || 0}</span> Unit</p>
                </div>
                {!hasRecipe && (
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-bold">
                    Resep Kosong
                  </span>
                )}
              </div>

              {hasRecipe ? (
                <form action={runProduction} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <input type="hidden" name="productId" value={product.id} />
                  
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Mau Produksi Berapa?</label>
                    <div className="flex gap-2">
                      <input 
                        name="quantity" 
                        type="number" 
                        min="1"
                        placeholder="Jumlah (misal: 10)" 
                        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-blue-500" 
                        required 
                      />
                      <span className="flex items-center text-sm font-bold text-gray-500">Slop</span>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                    <Factory size={18} />
                    Proses Produksi
                  </button>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    *Otomatis memotong stok bahan baku
                  </p>
                </form>
              ) : (
                <div className="text-center py-6 text-gray-400 text-sm">
                  <AlertTriangle className="mx-auto mb-2 opacity-50" />
                  Anda belum mengatur resep untuk produk ini.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}