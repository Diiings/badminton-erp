'use client';

import { useState } from 'react';
import { products } from '../../../data/products'; // Import data dummy tadi
import ProductCard from '../../../components/ProductCard';

export default function ProductsPage() {
  const [filter, setFilter] = useState('All');

  // Logic untuk memfilter produk
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Halaman */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Katalog Produk</h1>
        <p className="text-gray-400">Pilihan terbaik untuk kebutuhan badminton Anda.</p>
        
        {/* Tombol Filter */}
        <div className="flex justify-center gap-4 mt-8">
          {['All', 'Shuttlecock', 'Sepatu'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === cat 
                  ? 'bg-yellow-500 text-slate-900' 
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Produk */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}