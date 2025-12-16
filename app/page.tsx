import { TrackingSearch } from "@/components/tracking-search"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 text-slate-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 sm:py-20 md:py-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-400/10 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />

        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            Track Your Journey
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-light">
            Premium real-time tracking for your valued shipments.
          </p>
        </div>

        <TrackingSearch />
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-3">Real-Time Updates</h3>
            <p className="text-slate-600 leading-relaxed">Get instant updates on your shipment status as it moves across our premium network.</p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-orange-200/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-3">Reliable Service</h3>
            <p className="text-slate-600 leading-relaxed">Trusted delivery partner network ensuring your package arrives safely across India.</p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-3">Full Visibility</h3>
            <p className="text-slate-600 leading-relaxed">Complete journey tracking from origin to destination with detailed insights.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/30 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-500 text-sm font-medium">
            <p>&copy; 2025 Moto Club Automotive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
