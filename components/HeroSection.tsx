'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image dengan Overlay Gelap */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-bg-badminton.jpg" // Ganti dengan foto gudang/lapangan
          alt="Badminton Factory" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          Kualitas Juara, <br/> 
          <span className="text-yellow-400">Harga Pabrik.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Produsen Shuttlecock Terpercaya & Distributor Sepatu Badminton Premium. Melayani Grosir & Eceran sejak 2010.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <Link href="/products" className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
            Lihat Katalog
          </Link>
          <Link href="/contact" className="border-2 border-white hover:bg-white hover:text-slate-900 font-bold py-3 px-8 rounded-full transition-all">
            Hubungi Kami
          </Link>
        </motion.div>
      </div>
    </section>
  );
}