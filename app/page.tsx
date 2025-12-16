import { TrackingSearch } from "@/components/tracking-search"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 text-slate-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 sm:py-20 md:py-24 relative">

        <TrackingSearch />
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
