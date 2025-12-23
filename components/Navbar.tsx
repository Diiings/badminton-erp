'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              BadmintonIndo
            </span>
          </Link>

          {/* DESKTOP MENU (Hidden di HP) */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition">Tentang Kami</Link>
            <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium transition">Produk</Link>
            <Link href="/factory" className="text-gray-600 hover:text-blue-600 font-medium transition">Pabrik</Link>
            <Link href="/contact" className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              Hubungi Kami
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-blue-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Home</Link>
            <Link href="/products" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Produk</Link>
            <Link href="/factory" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Pabrik</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 rounded-md">Hubungi Kami</Link>
          </div>
        </div>
      )}
    </nav>
  );
}