import FactoryProcess from '../../../components/FactoryProcess';

export default function FactoryPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Kecil */}
      <div className="bg-slate-800 py-16 text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Dapur Produksi</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Melihat lebih dekat bagaimana kami mengubah bulu angsa mentah menjadi shuttlecock kelas turnamen.
        </p>
      </div>

      {/* Komponen Timeline */}
      <FactoryProcess />

      {/* Statistik Kapasitas (Section Tambahan) */}
      <section className="py-16 bg-blue-900/20 mt-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-yellow-500 mb-2">10.000</div>
            <div className="text-gray-300 text-sm">Slop / Bulan</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-500 mb-2">50+</div>
            <div className="text-gray-300 text-sm">Pengrajin Ahli</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-500 mb-2">15</div>
            <div className="text-gray-300 text-sm">Tahun Pengalaman</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-500 mb-2">100%</div>
            <div className="text-gray-300 text-sm">Garansi Retur</div>
          </div>
        </div>
      </section>
    </div>
  );
}