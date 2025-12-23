import HeroSection from "../../components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      {/* Section Sementara di bawah Hero */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Kenapa Memilih Kami?</h2>
          <p className="text-gray-600">
            Kami menggunakan bulu angsa pilihan dan teknologi pengerjaan modern untuk menjamin kestabilan terbang shuttlecock.
          </p>
        </div>
      </section>
    </div>
  );
}