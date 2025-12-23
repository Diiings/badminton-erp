'use client';

import Image from 'next/image';

interface ProductProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    badge: string | null;
  }
}

export default function ProductCard({ product }: ProductProps) {
  // Format Rupiah
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
      {/* Gambar Produk */}
      <div className="relative h-64 w-full bg-gray-700 overflow-hidden">
        {product.badge && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full z-10">
            {product.badge}
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Info Produk */}
      <div className="p-6">
        <span className="text-sm text-blue-400 font-medium uppercase tracking-wider">{product.category}</span>
        <h3 className="text-xl font-bold text-white mt-1 mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-yellow-400">
            {formatRupiah(product.price)}
          </span>
        </div>

        {/* Tombol Order WA */}
        <a 
          href={`https://wa.me/6281234567890?text=Halo, saya mau pesan ${product.name}`}
          target="_blank"
          className="mt-6 block w-full bg-blue-600 hover:bg-blue-500 text-white text-center font-bold py-3 rounded-lg transition-colors"
        >
          Pesan Sekarang
        </a>
      </div>
    </div>
  );
}