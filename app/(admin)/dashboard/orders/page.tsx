import { prisma } from '../../../../lib/prisma';
import { createOrder } from '../../../actions/orderActions';
import { ShoppingCart, DollarSign, History } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function OrderPage() {
  // Ambil produk yang ada stoknya saja
  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { name: 'asc' }
  });

  // Ambil 5 riwayat penjualan terakhir
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } }
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* KOLOM KIRI: FORM KASIR */}
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
            <ShoppingCart /> Input Penjualan Baru
          </h2>

          <form action={createOrder} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Produk</label>
              <select name="productId" className="w-full border p-3 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none">
                {products.map((p: any) => (
                  <option key={p.id} value={p.id} disabled={p.variants[0].stock <= 0}>
                    {p.name} — Rp {p.basePrice.toLocaleString('id-ID')} (Sisa: {p.variants[0].stock})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Jumlah Beli</label>
                <input name="quantity" type="number" min="1" placeholder="1" className="w-full border p-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Pembeli</label>
                <input name="customer" type="text" placeholder="Optional" className="w-full border p-3 rounded-lg" />
              </div>
            </div>

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 text-lg transition-all shadow-lg hover:shadow-xl">
              <DollarSign /> PROSES BAYAR
            </button>
          </form>
        </div>
      </div>

      {/* KOLOM KANAN: RIWAYAT TERAKHIR */}
      <div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <History size={20} /> Transaksi Terakhir
          </h3>
          
          <div className="space-y-4">
            {recentOrders.length === 0 && <p className="text-gray-400 text-sm">Belum ada penjualan.</p>}
            
            {recentOrders.map((order: any) => (
              <div key={order.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{order.customer}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <span className="text-green-600 font-bold text-sm">
                    +Rp {order.totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="mt-1">
                   {order.items.map((item: any) => (
                     <span key={item.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mr-1">
                       {item.quantity}x {item.product.name}
                     </span>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}