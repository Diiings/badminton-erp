import { prisma } from '../../../lib/prisma';
import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic'; // Agar data selalu update tiap detik

export default async function DashboardPage() {
  // 1. HITUNG OMZET (Total Uang Masuk)
  const sales = await prisma.order.aggregate({
    _sum: { totalPrice: true }
  });
  const totalRevenue = sales._sum.totalPrice || 0;

  // 2. HITUNG STOK SHUTTLECOCK (Pabrik)
  const manufacturedProducts = await prisma.product.findMany({
    where: { type: 'MANUFACTURED' },
    include: { variants: true }
  });
  // Logic: Jumlahkan semua stok dari semua varian produk pabrik
  const shuttlecockStock = manufacturedProducts.reduce((acc: number, product: any) => {
    const totalVariantStock = product.variants.reduce((vAcc: number, variant: any) => vAcc + variant.stock, 0);
    return acc + totalVariantStock;
  }, 0);

  // 3. HITUNG STOK RETAIL (Sepatu/Kaos)
  const retailProducts = await prisma.product.findMany({
    where: { type: 'RETAIL' },
    include: { variants: true }
  });
  const retailStock = retailProducts.reduce((acc: number, product: any) => {
    const totalVariantStock = product.variants.reduce((vAcc: number, variant: any) => vAcc + variant.stock, 0);
    return acc + totalVariantStock;
  }, 0);

  // 4. AMBIL 5 TRANSAKSI TERAKHIR
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } }
  });

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-slate-800">Dashboard Overview</h2>
      
      {/* KARTU STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Omzet */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Omzet</h3>
            <p className="text-3xl font-bold text-green-600">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <DollarSign size={24} />
          </div>
        </div>

        {/* Card 2: Stok Shuttlecock */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Gudang Shuttlecock</h3>
            <p className="text-3xl font-bold text-slate-800">
              {shuttlecockStock} <span className="text-sm font-normal text-gray-400">Slop</span>
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Package size={24} />
          </div>
        </div>

        {/* Card 3: Stok Retail */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Stok Retail (Sepatu)</h3>
            <p className="text-3xl font-bold text-slate-800">
              {retailStock} <span className="text-sm font-normal text-gray-400">Item</span>
            </p>
          </div>
          <div className="bg-orange-100 p-3 rounded-full text-orange-600">
            <ShoppingCart size={24} />
          </div>
        </div>
      </div>

      {/* DAFTAR TRANSAKSI TERBARU */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-600" /> Transaksi Terbaru
          </h3>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Pembeli</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Barang</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Total</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Waktu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">Belum ada transaksi penjualan.</td>
              </tr>
            ) : (
              recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-800">{order.customer || 'Umum'}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {order.items.map((item: any) => (
                      <span key={item.id} className="block">
                        {item.quantity}x {item.product.name}
                      </span>
                    ))}
                  </td>
                  <td className="p-4 font-bold text-green-600">
                    Rp {order.totalPrice.toLocaleString('id-ID')}
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('id-ID')}
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