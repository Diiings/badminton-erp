'use client';

import { motion } from 'framer-motion';
import { Feather, Ruler, Wind, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Seleksi Bahan Baku (Sorting)",
    description: "Kami hanya menggunakan bulu angsa Grade A yang memiliki ketebalan tulang standar untuk menjamin keawetan.",
    icon: <Feather size={32} />,
  },
  {
    id: 2,
    title: "Computerized Laser Measurement",
    description: "Setiap helai bulu diukur sudut dan kelengkungannya menggunakan laser komputer agar putaran stabil.",
    icon: <Ruler size={32} />,
  },
  {
    id: 3,
    title: "Pengeleman & Pengeringan",
    description: "Menggunakan lem racikan khusus yang tahan suhu panas lapangan indoor, dikeringkan di ruang steril.",
    icon: <Wind size={32} />,
  },
  {
    id: 4,
    title: "Uji Terbang (Flight Test)",
    description: "Setiap 1 slop diambil sampel acak untuk uji kestabilan dan speed check oleh atlet profesional.",
    icon: <CheckCircle size={32} />,
  },
];

export default function FactoryProcess() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
        Proses <span className="text-yellow-500">Quality Control</span> Kami
      </h2>

      <div className="relative">
        {/* Garis Vertikal di tengah */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-700 transform -translate-x-1/2"></div>

        {steps.map((step, index) => (
          <motion.div 
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex items-center mb-12 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Titik Tengah (Dot) */}
            <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-slate-900 z-10 transform -translate-x-1/2 flex items-center justify-center">
               <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>

            {/* Spacer untuk layout desktop kiri/kanan */}
            <div className="hidden md:block w-1/2" />

            {/* Content Box */}
            <div className="flex-1 pl-12 md:pl-0 md:px-12">
              <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:border-yellow-500 transition-colors group">
                <div className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform w-fit">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}