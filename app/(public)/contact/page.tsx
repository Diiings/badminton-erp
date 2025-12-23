import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Hubungi Kami</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Kontak */}
          <div className="space-y-8">
            <div className="bg-slate-800 p-6 rounded-xl flex items-start space-x-4">
              <MapPin className="text-yellow-500 shrink-0" size={24} />
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Alamat Gudang</h3>
                <p className="text-gray-400">Jl. Industri Badminton No. 88, Malang, Jawa Timur, Indonesia.</p>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl flex items-start space-x-4">
              <Phone className="text-yellow-500 shrink-0" size={24} />
              <div>
                <h3 className="text-white font-bold text-lg mb-1">WhatsApp / Telepon</h3>
                <p className="text-gray-400">+62 812-3456-7890 (Admin Grosir)</p>
                <p className="text-gray-400">+62 812-9876-5432 (Retail Sepatu)</p>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl flex items-start space-x-4">
              <Clock className="text-yellow-500 shrink-0" size={24} />
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Jam Operasional</h3>
                <p className="text-gray-400">Senin - Sabtu: 08.00 - 16.00 WIB</p>
                <p className="text-gray-400">Minggu: Libur</p>
              </div>
            </div>
          </div>

          {/* Form Dummy (Hanya Tampilan) */}
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <h3 className="text-slate-900 font-bold text-2xl mb-6">Kirim Pesan</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" placeholder="Nama Anda" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pesan</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" placeholder="Saya tertarik menjadi agen..."></textarea>
              </div>
              <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
                Kirim via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}