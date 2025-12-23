import Link from 'next/link';
import { LayoutDashboard, Package, Layers, ShoppingCart, Users, ChefHat, Factory } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* SIDEBAR KIRI (Tetap) */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-yellow-500">ERP System</h1>
          <p className="text-xs text-gray-400">Badminton Factory v1.0</p>
        </div>
        
        <nav className="mt-6 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg text-white">
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          <Link href="/dashboard/products" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition">
            <Package size={20} />
            <span>Stok Barang</span>
          </Link>
          <Link href="/dashboard/materials" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition">
            <Layers size={20} />
            <span>Bahan Baku (Pabrik)</span>
          </Link>
          <Link href="/dashboard/recipes" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition">
            <ChefHat size={20} />
            <span>Resep Produksi</span>
          </Link>
          <Link href="/dashboard/production" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition">
            <Factory size={20} />
            <span>Jalankan Produksi</span>
          </Link>
          <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition">
            <ShoppingCart size={20} />
            <span>Penjualan</span>
          </Link>
          <Link href="/dashboard/users" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition">
            <Users size={20} />
            <span>Karyawan</span>
          </Link>
        </nav>
      </aside>

      {/* KONTEN UTAMA (Berubah-ubah) */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}