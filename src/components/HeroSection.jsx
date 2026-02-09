import { Calendar, MapPin, Clock } from 'lucide-react';

export default function HeroSection() {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Indonesia Flag Colors Accent */}
          <div className="flex justify-center gap-1 mb-6">
            <div className="w-16 h-2 bg-red-500 rounded-full"></div>
            <div className="w-16 h-2 bg-white rounded-full"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Hari Libur Nasional Indonesia 2026
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
            Kalender lengkap hari libur nasional, cuti bersama, dan libur sekolah di Indonesia
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{today}</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Seluruh Indonesia</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Clock className="h-5 w-5 mr-2" />
              <span>SKB 3 Menteri 2026</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#holidays"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Lihat Kalender
            </a>
            <a
              href="#holidays"
              className="bg-red-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-900 transition-colors border border-red-500"
            >
              Daftar Libur
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
